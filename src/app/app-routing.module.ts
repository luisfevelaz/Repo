import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { ContactComponent } from './contact/contact.component';
import { ShowpdfComponent } from './showpdf/showpdf.component';
import { DocumentsComponent } from './documents/documents.component';
import { ApproveComponent } from './approve/approve.component';
import { PasosComponent } from './pasos/pasos.component';


const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch: 'full'},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'home/:id/:username', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent},
  {path: 'editProfile', component: EditProfileComponent},
  {path: 'uploadDocuments', component: UploadDocumentsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'showpdf/:id', component: ShowpdfComponent},
  {path: 'documents', component: DocumentsComponent},
  {path: 'approve', component: ApproveComponent},
  {path: 'pasos', component: PasosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
