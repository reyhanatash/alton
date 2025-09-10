import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  users: any = [];
  showChangePasswordModal: boolean = false;
  showAssignCodeModal: boolean = false;
  selectedUserId: any;

  constructor(
    private userService: UserService,
    private utilService: UtilService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    let resposnse = await this.userService.getUsers().toPromise();
    this.users = resposnse;
  }

  selectedUser(user: any, type: number) {
    switch (type) {
      case 1:
        this.showChangePasswordModal = true;
        this.selectedUserId = user['id'];
        break;
      case 2:
        this.showAssignCodeModal = true;
        this.selectedUserId = user['id'];
        break;
    }
  }

  gotoAssign(id: number) {
    this.router.navigate(['/assign-code/' + id]);
  }

  closeModal(type: number) {
    switch (type) {
      case 1:
        this.showChangePasswordModal = false;
        break;
      case 2:
        this.showAssignCodeModal = false;
        break;
    }
  }
}