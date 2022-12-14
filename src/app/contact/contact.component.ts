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
    email: new FormControl('')
 });
  contactForm() {
    const formData = new FormData();
    
    console.log(this.subir.get('mensaje').value);
    this._MessageService.sendMessage({mensaje: this.subir.get('mensaje').value,name: this.subir.get('name').value,last: this.subir.get('last').value,email: this.subir.get('email').value}).subscribe(() => {
    })
    console.log("enviado");
    Swal.fire(
      'Contacto',
      'Mensaje enviado correctamente',
      'success'
    )
    this._router.navigate(['/home']);
    }
}
