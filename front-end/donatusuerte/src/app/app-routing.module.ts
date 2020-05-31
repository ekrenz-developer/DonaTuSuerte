import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { DashboardOrgComponent } from './dashboard/dashboard-org/dashboard-org.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const routes: Routes =
[
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'dashboard-organization', component: DashboardOrgComponent, canActivate:[AuthGuard] },
  { path: 'sign-in', component: SignInComponent , canActivate:[AuthGuard]},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
