import { Routes } from '@angular/router';
import { LoginComponent } from './user-registration/login/login.component';
import { AdminAuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'users',
        loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
        canActivate: [AdminAuthGuard],
        data: { roles: [1] }
    },
];
