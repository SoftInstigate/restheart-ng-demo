
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class Service {
  url = 'https://demo.restheart.org/messages';

  constructor(private http: HttpClient) {
  }

  public get(page: number = 1): Observable<Array<any>> {
    return this.http.get<Array<any>>(`${this.url}?pagesize=5&page=${page}`);
  }

  public size(): Observable<any> {
    return this.http.get(`${this.url}/_size`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  public post(data: any): Observable<any> {
    const _data = {
      message: data.message,
      from: data.from
    };

    return this.http.post(this.url, _data);
  }
}
