import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NotifierModule, NotifierService } from 'angular-notifier';
import { TableModule } from 'primeng/table';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    NotifierService,
    NotifierModule,
    TableModule
  ]
};
