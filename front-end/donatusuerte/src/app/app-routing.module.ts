import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { DashboardOrgComponent } from './dashboard-org/dashboard-org.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes =
[
  { path: '', component: HomeComponent },
  { path: 'dashboard-organization', component: DashboardOrgComponent, canActivate:[AuthGuard] },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
