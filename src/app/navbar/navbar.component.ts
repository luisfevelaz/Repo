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
    this.name = localStorage.getItem("user")
  }

  readLocalStorageValue(){
    if(localStorage.getItem('user')){
      this.name = localStorage.getItem('nombre');
      return true;
    }else{
      return false;
    }
  }

  readAdmin(){
    if(localStorage.getItem("admin") == "1"){
      return true;
    }
    return false;
  }
  
  deleteLocalStorageValue(){
    localStorage.clear();
  }

  readLoggedUser(){
    if(localStorage.getItem('user')){
      return true;
    }
    return false;
  }

}
