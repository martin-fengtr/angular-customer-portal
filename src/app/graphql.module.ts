import { NgModule } from '@angular/core';
import { ApolloClientOptions, ApolloLink, InMemoryCache, Observable } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { environment } from '@env/environment';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

const uri = environment.apiUrl;

const fetchAccessToken = async (refreshToken: string) => {
  try {
    const result = await fetch(uri, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${refreshToken}`,
      },
      body: JSON.stringify({
        query: `
        mutation {
          tokenRefresh {
            accessToken
            refreshToken
          }
        }
        `,
      }),
    });
    return result.json();
  } catch (e) {
    throw new Error('Failed to fetch fresh access token');
  }
};

export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  const token = localStorage.getItem('token');
  const authLink = setContext(() => ({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  const refreshToken = localStorage.getItem('refreshToken');
  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (refreshToken) {
      graphQLErrors
        ?.filter((error) => error.extensions?.exception?.status === 401)
        .forEach(() => {
          return new Observable((observer) => {
            fetchAccessToken(refreshToken)
              .then((response) => {
                if (response) {
                  const { accessToken, refreshToken } = response.data.tokenRefresh;
                  localStorage.setItem('token', accessToken);
                  localStorage.setItem('refreshToken', refreshToken);
                  operation.setContext(({ headers = {} }) => ({
                    headers: {
                      ...headers,
                      authorization: `Bearer ${accessToken}`,
                    },
                  }));
                }
              })
              .then(() => {
                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                };
                forward(operation).subscribe(subscriber);
              })
              .catch((error) => {
                observer.error(error);
                // router to login
              });
          });
        });
    }
  });

  const link = ApolloLink.from([authLink, errorLink, httpLink.create({ uri })]);

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
