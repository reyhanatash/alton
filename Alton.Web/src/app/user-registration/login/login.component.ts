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


  login(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    setTimeout(async () => {
      let model = {
        username: this.username,
        password: this.password
      }
      try {
        let data = await this.userService.login(model).toPromise();
        console.log(data);
        this.loading = false;
      } catch (error) {
        this.utilService.showNotify("خطا", "error");
        this.loading = false;
      }

    }, 2000);
  }



}
