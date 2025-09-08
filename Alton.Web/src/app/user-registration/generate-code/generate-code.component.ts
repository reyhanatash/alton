import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { NgForm } from '@angular/forms';
import { CodeService } from './../../services/code.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-generate-code',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './generate-code.component.html',
  styleUrl: './generate-code.component.css'
})
export class GenerateCodeComponent {

  constructor(
    private codeService: CodeService,
    private utilService: UtilService
  ) {

  }

  codeType = '';
  idTemp = '';
  loading = false;
  code = null;



  async generateCode(form: NgForm) {
    if (form.invalid) return;
    this.loading = true;
    let model = {
      id: -1,
      codeType: +this.codeType,
      idTemp: +this.idTemp
    }
    try {
      let response: any = await this.codeService.generateCode(model).toPromise();
      this.loading = false;
      this.code = response['code'];
      this.utilService.showNotify("success", "success");
    } catch (error) {
      this.utilService.showNotify("An error has occured", "error");
      this.loading = false;
    }
  }


}
