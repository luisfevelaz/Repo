import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl('',Validators.minLength(3))
  });
  
  url='http://192.168.100.6:3000/login'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  enviarLogin(){
    console.log("Login");
    
    let body: any = {
      username: this.login.get("email").value,
      password: this.login.get("password").value
    };

    this.http.post(this.url,body,{responseType: 'text'}).subscribe((result) => {
      console.log(result);
      
    });
    
  }

}
