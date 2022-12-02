import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showpdf',
  templateUrl: './showpdf.component.html',
  styleUrls: ['./showpdf.component.css']
})
export class ShowpdfComponent implements OnInit {
  public pdfSource: string =  "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  constructor() { }

  ngOnInit(): void {
  }

}
