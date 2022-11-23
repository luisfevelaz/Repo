import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registro = new FormGroup({
    nombre: new FormControl('',Validators.maxLength(30)),
    email: new FormControl('',Validators.email),
    password: new FormControl('',Validators.minLength(3))
  });

  constructor() { }

  ngOnInit(): void {
  }

  enviarRegistro(){
    
    
  }

}
