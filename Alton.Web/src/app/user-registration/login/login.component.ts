import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { NgForm } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  loading = false;

  constructor(
    private userService: UserService,
    private utilService: UtilService
  ) { }


  async login(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    let model = {
      username: this.username,
      password: this.password
    }
    try {
      let response: any = await this.userService.login(model).toPromise();
      this.loading = false;
      localStorage.setItem("atoken", response.token);
      localStorage.setItem("secret", response.secretCode);
      let userType = this.utilService.getUserType();
      this.utilService.getPath(userType);

    } catch (error) {
      this.utilService.showNotify("An error has occured", "error");
      this.loading = false;
    }
  }

}