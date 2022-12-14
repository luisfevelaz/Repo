import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


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

  url='http://192.168.100.6:3000/user'
  
  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }
  
  enviarRegistro(data:any){
    console.log("entra");
    
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
      this.http.post(this.url,body,{responseType: 'text'}).subscribe((result) => {
        console.log(result);
        let resp = JSON.parse(result);
        Swal.fire(
          '¡Gracias por registrarte con nosotros!',
          'Registro exitoso',
          'success'
        )
        this._router.navigate(['/home']);
      });
      
    }else{
      Swal.fire(
        'Datos incorrectos',
        'Intento de registro fallido',
        'error'
      )
    }
  }

}
