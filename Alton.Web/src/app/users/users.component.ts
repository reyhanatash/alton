import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

}
