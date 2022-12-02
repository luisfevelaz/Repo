import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params, RoutesRecognized} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showpdf',
  templateUrl: './showpdf.component.html',
  styleUrls: ['./showpdf.component.css']
})
export class ShowpdfComponent implements OnInit {
  public pdfSource: string =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  idPDF: string
  url='http://192.168.100.6:3000/documentoID'
  nombre: string = "Nombre";
  autor: string = "autor";
  categoria: string = "categoria";
  ruta: string = "ruta";
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient) {
    
  }

  ngOnInit(): void {
    // this.id$ = this.activatedRoute.paramMap.pipe(map(paramMap=>paramMap.get('id')));
    // console.log(this.id$);
    this.idPDF = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idPDF);
    this.http.post(this.url,{id: this.idPDF},{responseType: 'text'}).subscribe((result) => {
      console.log(result);
      let resp = JSON.parse(result);

      this.nombre = resp.documento.nombre;
      this.autor = resp.documento.autor;
      this.categoria = resp.documento.materia;
      this.ruta = resp.documento.ruta;
      
    });

    
  }

}
