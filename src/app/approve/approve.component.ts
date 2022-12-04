import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  url='http://192.168.100.80:3000/';
  items: Array<any>;
  showItems: Boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  obtenerDocumentos(){
    this.http.get(this.url+"documentoCompleto").subscribe((result) => {
      console.log(result);
      // let resp = JSON.parse(result);
      if(result['response'] == 200){
        this.items = result['results'];
        this.showItems = true;
      }
    });
  }

  aprobarDocumento(itemId: any,decision: Number){
    let body = {
      id: itemId,
      aprobado: decision
    }

    this.http.put(this.url+"documentoAprobado",body,{responseType: 'text'}).subscribe((result) => {
      console.log(result);
      let resp = JSON.parse(result);
      if(resp.response == 200){
        this.obtenerDocumentos();
      }
    });
  }

}
