import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'footer-item',
  templateUrl: './footer-item.component.html',
  styleUrls: ['./footer-item.component.scss'],
})
export class FooterItemComponent implements OnInit {
  @Input() spacer: boolean;

  constructor() {
    this.spacer = false;
  }

  ngOnInit(): void {}
}
