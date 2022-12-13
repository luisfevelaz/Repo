import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Correcto: boolean;

  registro = new FormGroup({
    nombre: new FormControl('',Validators.maxLength(30)),
    email: new FormControl('',Validators.email),
    password: new FormControl('',Validators.minLength(3))
  });

  url='http://192.168.100.80:3000/user'
  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  enviarRegistro(data:any){
    console.log("entra");
    console.log(this.Correcto);
    
    let body: any = {
      nombre: this.registro.get("nombre").value,
      apellidoP: null,
      apellidoM: null,
      isAdmin: 0,
      username: this.registro.get("email").value,
      password: this.registro.get("password").value
    };

    if(this.registro.get("email").value.length > 0 && this.registro.get("password").value.length > 0 && 
    this.registro.get("nombre").value.length > 0){
      this.Correcto = true;
      console.log("entra2");
      this.http.post(this.url,body,{responseType: 'text'}).subscribe((result) => {
        console.log("entra3");
        console.log(result);
        let resp = JSON.parse(result);
      });
      
    }else{
      this.Correcto = false;
    }
    console.log(this.Correcto);    
  }

}
