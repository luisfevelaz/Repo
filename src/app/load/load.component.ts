import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styles: [
  ]
})
export class LoadComponent implements OnInit {

  error: string;
  dragAreaClass: string;
  draggedFiles: any;

  constructor() { }

  ngOnInit(): void {
  }

  saveFiles(files: FileList) {

    if (files.length > 1) this.error = "Only one file at time allow";
    else {
      this.error = "";
      console.log(files[0].size,files[0].name,files[0].type);
      this.draggedFiles = files;
      console.log(files);
    }
  }

  onFileChange(event){

    let files = event.target.files;
    if (files.length > 0) {
      for (let file of files) {
        console.log(JSON.stringify(file.name));
        
      }
    }
  }

}
