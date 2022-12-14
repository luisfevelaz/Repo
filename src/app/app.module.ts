import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NabvarLoginComponent } from './nabvar-login/nabvar-login.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { ContactComponent } from './contact/contact.component';
import { ShowpdfComponent } from './showpdf/showpdf.component';
import { DocumentsComponent } from './documents/documents.component';
import { ApproveComponent } from './approve/approve.component';
import { PasosComponent } from './pasos/pasos.component';
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    NabvarLoginComponent,
    RegisterComponent,
    AboutComponent,
    EditProfileComponent,
    UploadDocumentsComponent,
    ContactComponent,
    ShowpdfComponent,
    DocumentsComponent,
    ApproveComponent,
    PasosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
