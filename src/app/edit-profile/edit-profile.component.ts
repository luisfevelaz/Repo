import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

  constructor(private http: HttpClient) {
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
    console.log("Hola");

    let body: any = {
      nombre: this.edit.get("nombre").value,
      username: this.edit.get("usuario").value,
      password: this.edit.get("password").value
    };

    this.http.put(this.url+'user',body,{responseType: 'text'}).subscribe((result) => {
      console.log(result);
      let resp = JSON.parse(result);

      if(resp.response == 200){
        //hacer algo para mandar un alert de éxito
        
      }
      
    });
    
  }

}
