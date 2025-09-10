import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { NgForm } from '@angular/forms';
import { UtilService } from '../../services/util.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class GeneratePasswordComponent {

  constructor(
    private utilService: UtilService,
    private userService: UserService
  ) { }

  oldPassword: any;
  newPassword: any;
  confirmPassword: any;
  loading = false;
  @Input() username: string = '';

  @Output() closeModal = new EventEmitter<string>();

  async changePassword(form: NgForm) {
    if (form.invalid) return;
    if (this.newPassword !== this.confirmPassword) {
      this.utilService.showNotify('The new password and its confirmation are not the same.', 'error');
      return;
    }

    let regexp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    let passwordTest = regexp.test(this.newPassword);
    if (!passwordTest) {
      this.utilService.showNotify("The new password must be at least 8 characters long and contain a combination of numbers, uppercase and lowercase letters, and special characters.", "error");
      return;
    }
    this.loading = true;
    let model = {
      username: this.username,
      newPassword: this.newPassword,
      oldPassword: this.oldPassword
    }
    try {
      await this.userService.changePassword(model).toPromise();
      this.closeModal.emit("1");
      this.utilService.showNotify("success", "success");
      this.oldPassword = null;
      this.newPassword = null;
      this.confirmPassword = null;
      this.loading = false;
    } catch (error) {
      this.utilService.showNotify("An error has occured", "error");
      this.loading = false;
    }
  }

}
