import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardOrgComponent } from './dashboard/dashboard-org/dashboard-org.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardContentComponent } from './dashboard/dashboard-content/dashboard-content.component';
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import { SidebarOrganizationComponent } from './sidebar/sidebar-organization/sidebar-organization.component';
import { SidebarCompetitorComponent } from './sidebar/sidebar-competitor/sidebar-competitor.component';
import { SidebarCheckerComponent } from './sidebar/sidebar-checker/sidebar-checker.component';
import { NavbarLightComponent } from './navbar-light/navbar-light.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardOrgComponent,
    HomeComponent,
    ContactComponent,
    ProfileComponent,
    DashboardComponent,
    DashboardContentComponent,
    DashboardNavbarComponent,
    SidebarOrganizationComponent,
    SidebarCompetitorComponent,
    SidebarCheckerComponent,
    NavbarLightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
