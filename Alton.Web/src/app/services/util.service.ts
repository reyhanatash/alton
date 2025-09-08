import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


export const RoleMap = new Map([
  ['QE5#AGj@@UV+!Ad2@!msuv6!', 1], //admin
  ["M)tCXD%Y@uEQTj*@FLmuD)P$", 2], //user
])

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private readonly notifier: NotifierService;
  url = environment.url;
  constructor(
    private router: Router,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService;
  }

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
    this.notifier.notify(type, message);
  }

  checkUserLogin() {
    let secret = localStorage.getItem('secret');
    let token = localStorage.getItem('atoken');
    if (secret && token) {
      return true;
    }
    return false;
  }

}