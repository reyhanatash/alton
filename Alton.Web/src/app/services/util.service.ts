import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export const RoleMap = new Map([
  ['QE5#AGj@@UV+!Ad2@!msuv6!', 1], //admin
  ['Sx^#)ZHB3&7$h$UdBnJCubw8', 2], //user
])

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  url = environment.url;
  constructor(
    private router: Router,
  ) {
    // this.notifier = notifier;
  }
  notifier: any;

  getUserType() {
    let secret: any = localStorage.getItem('secret');
    return RoleMap.get(secret) || -1;
  }

  checkSecret(secret: string) {
    return RoleMap.get(secret) || -1;
  }

  getPath(usertype: number) {
    if (usertype != -1) {
      let navigatePoll = new Map([
        [1, "/users"],
        [2, "/generate-code"],
      ]);
      this.router.navigate([navigatePoll.get(usertype)]);
    }
  }

  showNotify(message: string, type: string) {
    // this.notifier.notify(type, message);
  }

}