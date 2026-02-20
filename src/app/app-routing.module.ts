import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { CustomerHomeComponent } from './components/customer/customer-home.component';
import { AdminDashboardComponent as AdminDashboardComponentAlias } from './components/admin/admin-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { GuestGuard } from './guards/guest.guard';
const routes: Routes = [
  { path: 'login', component: LoginComponent , canActivate: [GuestGuard]},
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard]},
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'customer-home', 
    component: CustomerHomeComponent ,
    
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }