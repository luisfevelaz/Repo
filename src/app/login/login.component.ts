import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  enviarLogin(){
    
  }

}
