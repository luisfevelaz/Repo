import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public _MessageService: MessageService, private _router: Router) { }

  ngOnInit(): void {
  }
  subir = new FormGroup({
    mensaje: new FormControl('',Validators.minLength(3)),
    name: new FormControl(''),
    last: new FormControl(''),
    email: new FormControl('',Validators.email)
 });
  contactForm() {
    const formData = new FormData();

    if(this.subir.get("email").value.length > 0 && this.subir.get("mensaje").value.length > 0 && 
    this.subir.get("last").value.length > 0 && this.subir.get("name").value.length > 0){
      this._MessageService.sendMessage({mensaje: this.subir.get('mensaje').value,name: this.subir.get('name').value,last: this.subir.get('last').value,email: this.subir.get('email').value}).subscribe(() => {
      })
      console.log("enviado");
      Swal.fire(
        'Contacto',
        'Mensaje enviado correctamente',
        'success'
      )
      this._router.navigate(['/home']);
    }else{
      Swal.fire(
        '¡Llenar todos los campos para comunicarte con nosotros!',
        'Intento fallido',
        'error'
      )
    }
    
  }
}
