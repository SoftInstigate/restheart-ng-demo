//our root app component
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Service } from './service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, JsonPipe, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [
    FormsModule,
    AsyncPipe,
    JsonPipe,
    DatePipe,
    HttpClientModule
],
    providers: [ Service ]
})
export class AppComponent implements OnInit {
  data: Observable<Array<any>>;
  size: Observable<any>;
  page: number = 1;

  newMsg = { from: null, message: null };

  constructor(private service: Service) {}

  load() {
    this.size = this.service.size();
    this.data = this.service.get(this.page);
  }

  ngOnInit() {
    this.load();
  }

  postMessage() {
    this.service
      .post(this.newMsg)
      .pipe(tap(() => (this.newMsg = { from: null, message: null })))
      .subscribe((resp) => this.load());
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
