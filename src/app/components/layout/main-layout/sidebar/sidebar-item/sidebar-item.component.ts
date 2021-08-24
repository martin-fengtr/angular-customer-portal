import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class SidebarItemComponent implements OnInit {
  @Input() separator: boolean;
  @Input() active: boolean;
  @Input() link: string;
  @Output() action: EventEmitter<MouseEvent>;

  constructor(private router: Router) {
    this.separator = false;
    this.active = false;
    this.link = '';
    this.action = new EventEmitter();
  }

  ngOnInit(): void {}

  onClick(event: MouseEvent): void {
    if (this.link) {
      void this.router.navigate([this.link]);
    } else {
      this.action.emit(event);
    }
  }
}
