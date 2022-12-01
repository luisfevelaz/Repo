import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'home/:id/:username', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'editProfile', component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
