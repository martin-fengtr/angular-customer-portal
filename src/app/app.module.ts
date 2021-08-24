import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { GraphQLModule } from '@app/graphql.module';
import { AuthModule } from '@auth/auth.module';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { AuthLayoutComponent } from '@components/layout/auth-layout/auth-layout.component';
import { FooterComponent } from '@components/layout/main-layout/footer/footer.component';
import { FooterItemComponent } from '@components/layout/main-layout/footer/footer-item/footer-item.component';
import { HeaderComponent } from '@components/layout/main-layout/header/header.component';
import { MainLayoutComponent } from '@components/layout/main-layout/main-layout.component';
import { SidebarComponent } from '@components/layout/main-layout/sidebar/sidebar.component';
import { SidebarItemComponent } from '@components/layout/main-layout/sidebar/sidebar-item/sidebar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    HeaderComponent,
    FooterComponent,
    FooterItemComponent,
    SidebarComponent,
    SidebarItemComponent,
    DashboardComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, GraphQLModule, AuthModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
