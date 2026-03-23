import { Routes } from '@angular/router';
import { User } from './user/user'
import { Login } from './login/login'
import { authGuard } from './auth-guard'

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'user', component: User, canActivate: [authGuard]}, // protected
  { path: '**', redirectTo: 'login'} // fallback
];
