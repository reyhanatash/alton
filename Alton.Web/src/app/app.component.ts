import { Component } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotifierModule } from 'angular-notifier';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, NavbarComponent,NotifierModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alton.Web';

  isLogin: boolean = false;

  constructor(private router: Router) {

    router.events.subscribe((event: Event) => {
      let url = location.pathname.split('?')[0];
      if (event instanceof NavigationEnd) {
        if (url == "/") {
          this.isLogin = false;
          return;
        }
        this.isLogin = true;
      }
    })
  }
}