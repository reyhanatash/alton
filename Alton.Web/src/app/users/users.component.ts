import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { UserService } from '../services/user.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any = [];

  constructor(
    private userService: UserService,
    private utilService: UtilService
  ) { }

  async ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    let resposnse = await this.userService.getUsers().toPromise();
    this.users = resposnse;
  }

}
