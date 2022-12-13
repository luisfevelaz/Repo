import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params, RoutesRecognized} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-showpdf',
  templateUrl: './showpdf.component.html',
  styleUrls: ['./showpdf.component.css']
})
export class ShowpdfComponent implements OnInit {
  // pdfSource: string =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSource: SafeResourceUrl;

  pdfURL: string = "https://piperepo-mx.s3.amazonaws.com/"

  idPDF: string
  url='http://192.168.100.80:3000/documentoID'
  nombre: string = "No hay nombre registrado";
  autor: string = "desconocido";
  categoria: string = "desconocida";
  ruta: string = "desconocida";

  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,private sanitizer: DomSanitizer) {
    this.pdfSource = this.sanitizer.bypassSecurityTrustResourceUrl("https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf");
  }

  ngOnInit(): void {
    // this.id$ = this.activatedRoute.paramMap.pipe(map(paramMap=>paramMap.get('id')));
    // console.log(this.id$);
    this.idPDF = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idPDF);
    this.http.post(this.url,{id: this.idPDF},{responseType: 'text'}).subscribe((result) => {
      console.log(result);
      let resp = JSON.parse(result);

      if(resp.response == 200){
        this.nombre = resp.documento.nombre;
        this.autor = resp.documento.autor;
        this.categoria = resp.documento.materia;
        this.ruta = resp.documento.ruta;
        
        this.pdfSource = this.sanitizer.bypassSecurityTrustResourceUrl(`https://piperepo-mx.s3.amazonaws.com/${this.ruta}`)
      }
    });

    
  }

}
