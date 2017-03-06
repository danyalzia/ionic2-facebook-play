import { Http } from '@angular/http';  
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';

@Injectable()
export class GraphService {

  private accessToken = '1251164514938336|6dODHW2dONnKoBmT-Kd-mXztFCY';

  private url = 'https://graph.facebook.com/';
  private query = `?access_token=${this.accessToken}&date_format=U&fields=`;

  constructor(private http: Http) { }

  getPosts(pageName, fields): Observable<any[]> {
    let url = this.url + pageName + this.query + fields;
	console.log(url);
	
	// get the "data" array of "posts"
    return this.http
        .get(url)
        .map(response => response.json().posts.data);
   }
}