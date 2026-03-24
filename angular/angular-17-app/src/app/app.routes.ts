import { Routes } from '@angular/router';
import { User } from './user/user'
import { Login } from './login/login'
import { Lifecycle } from './lifecycle/lifecycle';
import { RxjsDemo } from './rxjs-demo/rxjs-demo';
import { FormsDemo } from './forms-demo/forms-demo';
import { authGuard } from './auth-guard'

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'user', component: User, canActivate: [authGuard]}, // protected
  { path: 'lifecycle', component: Lifecycle },
  { path: 'rxjs', component: RxjsDemo},
  { path: 'forms', component: FormsDemo },
  { path: '**', redirectTo: 'login'} // fallback
];
