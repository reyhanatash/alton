import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminAuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    {
        path: 'users',
        loadComponent: () => import('./components/users/users.component').then(m => m.UsersComponent),
        canActivate: [AdminAuthGuard],
        data: { roles: [1] }
    },
    {
        path: 'generate-code',
        loadComponent: () => import('./components/generate-code/generate-code.component').then(m => m.GenerateCodeComponent),
    },
    {
        path: 'assign-code/:id',
        loadComponent: () => import('./components/assign-code/assign-code.component').then(m => m.AssignCodeComponent),
        canActivate: [AdminAuthGuard],
        data: { roles: [1] }
    },
];
