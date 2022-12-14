import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {

  url='http://192.168.100.80:3000/uploadDocs';

  inputFile: File;
  // Correct: boolean = null;

  
  subir = new FormGroup({
     nombre: new FormControl('',Validators.minLength(3)),
     materia: new FormControl(),
     ruta: new FormControl()
  });

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
  }

  readFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList[0]);
      this.inputFile = fileList[0];
      
    }
  }

  uploadFile(){
    if(this.subir.get("nombre").value.length > 0 && this.subir.get("materia").value != null && 
    this.subir.get("ruta").value != null){
      const formData = new FormData();
  
      formData.append("file", this.inputFile);
      formData.append("nombre", this.subir.get('nombre').value);
      formData.append("materia", this.subir.get('materia').value);
      formData.append("idUser", localStorage.getItem('id'));
      formData.append("autor", localStorage.getItem('user'));
  
      this.http.post(this.url,formData,{responseType: 'text'}).subscribe((result) => {
        console.log(result);
        Swal.fire(
          '¡Gracias por tu aporte a la comunidad!',
          'Pronto podras ver en "documentos" si tu solicitud fue aceptada',
          'success'
        )
        this._router.navigate(['/home']);
      });    
    }else{
      Swal.fire(
        'Datos incorrectos',
        'Intento fallido',
        'error'
      )
    }
  }

}
