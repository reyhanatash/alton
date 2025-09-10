import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CodeService } from '../../services/code.service';
import { UtilService } from '../../services/util.service';
import { SharedModule } from '../../shared/shared.module';

import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assign-code',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './assign-code.component.html',
  styleUrl: './assign-code.component.css'
})
export class AssignCodeComponent {

  constructor(
    private codeService: CodeService,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  count: any;
  loading = false;
  userId: number = 0;

  async assignCode(form: NgForm) {
    if (form.invalid) return;
    this.userId = this.activatedRoute.snapshot.params['id'];

    if (!this.count) {
      this.utilService.showNotify("Enter code assignment limit", "error");
      return;
    }
    this.loading = true;

    let model = {
      count: +this.count,
      userId: +this.userId
    }
    try {
       await this.codeService.assignCode(model).toPromise();
      this.loading = false;
      this.count = null;
      this.utilService.showNotify("Successfully assigned", "success");
    } catch (error) {
      this.utilService.showNotify("An error has occured", "error");
      this.loading = false;
    }
  }
}