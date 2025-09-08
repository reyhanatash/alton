import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { UtilService } from '../../services/util.service';
import { TableModule } from 'primeng/table';
import { CodeService } from '../../services/code.service';
import { GeneratePasswordComponent } from '../../components/change-password/change-password.component';
import { DialogModule } from 'primeng/dialog';
import { NotifierService } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12,
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10,
    },
  },
  theme: "material",
  behaviour: {
    autoHide: 5000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: false,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease",
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: "ease",
    },
    overlap: 150,
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NotifierModule.withConfig(customNotifierOptions),
    TableModule,
    GeneratePasswordComponent,
    DialogModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NotifierModule,
    TableModule,
    GeneratePasswordComponent,
    DialogModule,
  ],
  providers: [
    UserService,
    UtilService,
    CodeService,
    NotifierService
  ]
})
export class SharedModule { }