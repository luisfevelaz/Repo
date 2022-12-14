import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  url='http://192.168.100.80:3000/';

  edit = new FormGroup({
    nombre: new FormControl('',Validators.maxLength(30)),
    usuario: new FormControl('',Validators.email),
    password: new FormControl('',Validators.minLength(3))
  });

  constructor(private http: HttpClient, private _router: Router) {
    this.http.post(this.url+'userData',{idUser: localStorage.getItem('id')},{responseType: 'text'}).subscribe((result) => {
      console.log(result);
      let resp = JSON.parse(result);

      this.edit.setValue({
        nombre: resp.userInfo.nombre,
        usuario: resp.userInfo.username,
        password: resp.userInfo.contra
      })
      
    });

   }

  ngOnInit(): void {
  }

  enviarEdit(){
    let body: any = {
      nombre: this.edit.get("nombre").value,
      username: this.edit.get("usuario").value,
      password: this.edit.get("password").value
    };


    if(this.edit.get("nombre").value.length > 0 && this.edit.get("usuario").value.length > 0 && 
    this.edit.get("password").value.length > 0){
      this.http.put(this.url+'user',body,{responseType: 'text'}).subscribe((result) => {
        console.log(result); 
          localStorage.setItem('user',body.username);
          localStorage.setItem('nombre',body.nombre);
          Swal.fire(
            '¡Cambios guardados!',
            'Se ha actualizado tu informacion',
            'success'
          )
          this._router.navigateByUrl('/');
      });
    }else{
      Swal.fire(
        '¡Llenar todos los campos para actualizar tu informacion!',
        'Intento fallido',
        'error'
      )
    }


    
  }

}
