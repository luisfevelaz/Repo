import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  name: String = "Usuario";

  constructor() { }

  ngOnInit(): void {
  }

  readLocalStorageValue(){
    if(localStorage.getItem('username') != undefined){
      return true;
    }else{
      return false;
    }
  }

}
