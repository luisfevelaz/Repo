import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  url='http://192.168.100.80:3000/documento'
  items: Array<any>;
  showItems: Boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((result) => {
      console.log(result);
      // let resp = JSON.parse(result);
      if(result['response'] == 200){
        this.items = result['results'];
        this.showItems = true;
      }
    });

  }

}
