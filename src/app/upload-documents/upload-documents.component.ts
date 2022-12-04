import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.css']
})
export class UploadDocumentsComponent implements OnInit {

  url='http://192.168.100.80:3000/uploadDocs';

  inputFile: File;
  
  subir = new FormGroup({
     nombre: new FormControl('',Validators.minLength(3)),
     materia: new FormControl()

  });

  constructor(private http: HttpClient) { }

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
    // console.log(this.inputFile);

    const formData = new FormData();

    formData.append("file", this.inputFile);
    formData.append("nombre", this.subir.get('nombre').value);
    formData.append("materia", this.subir.get('materia').value);
    formData.append("idUser", localStorage.getItem('id'));
    formData.append("autor", localStorage.getItem('user'));

    this.http.post(this.url,formData,{responseType: 'text'}).subscribe((result) => {
      console.log(result);
            
    });    

    
  }

}
