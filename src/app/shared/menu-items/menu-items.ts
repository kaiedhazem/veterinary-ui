import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'my-pets', type: 'link', name: 'My Pets', icon: 'tab' },
  { state: 'my-appointments', type: 'link', name: 'My appointments', icon: 'tab' },
  { state: 'my-treatments', type: 'link', name: 'My treatments', icon: 'tab' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
