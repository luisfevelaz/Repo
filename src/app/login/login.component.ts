import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl('',Validators.minLength(3)),
    nombre: new FormControl('',Validators.maxLength(30))
    //falta validator de nombre
  });
  
  url='http://192.168.100.80:3000/login'
  // url='http://192.168.100.80:3000/login'

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }

  enviarLogin(){
    console.log("Login");
    
    let body: any = {
      username: this.login.get("email").value,
      password: this.login.get("password").value,
      nombre: this.login.get("nombre").value
    };

    this.http.post(this.url,body,{responseType: 'text'}).subscribe((result) => {
      console.log(result);
      let resp = JSON.parse(result);

      if(resp.response == 200){
        localStorage.clear();
        localStorage.setItem('id',resp.idUser);
        localStorage.setItem('user',resp.username);
        localStorage.setItem('nombre',resp.nombre);
        localStorage.setItem('admin',resp.isAdmin);
        this._router.navigate(['/home'],resp.idUser);
      }
      
    });
    
  }

}
