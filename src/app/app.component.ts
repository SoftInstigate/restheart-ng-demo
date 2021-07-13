//our root app component
import { Component, NgModule, OnInit, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  data: Observable<Array<any>>;
  size: Observable<any>;
  page: number = 1;
  
  newMessage = { from: 'your nickname', message: 'RESTHeart rocks' };
  
  constructor(private service: Service) { 
  }
  
  load() {
     this.size = this.service.size();
     this.data = this.service.get(this.page);
  }
  
  ngOnInit() {
    this.load();
  }
  
  postMessage() {
    this.service.post(this.newMessage)
    .subscribe(resp => this.load());
  }
  
  pageUp() {
    this.page++;
    this.load();
  }
  
  pageDown() {
    this.page--;
    this.load();
  }
}