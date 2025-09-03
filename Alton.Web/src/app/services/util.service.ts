import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


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
    notifier: NotifierService,
  ) {
    this.notifier = notifier;
  }
  notifier: any;

  checkUserType() {
    let secret: any = localStorage.getItem('txcd94Hg_doH63');
    return RoleMap.get(secret) || -1;
  }

  checkSecret(secret: string) {
    return RoleMap.get(secret) || -1;
  }

  getPath(usertype: number) {
    if (usertype != -1) {
      let navigatePoll = new Map([
        [1, "/"],
      ]);
      this.router.navigate([navigatePoll.get(usertype)]);
    }
  }

  showNotify(message: string, type: string) {
    this.notifier.notify(type, message);
  }
}