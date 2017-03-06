import { Http } from '@angular/http';  
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';

import { Facebook } from 'ionic-native';

@Injectable()
export class FacebookService {
  APP_ID: number = 1251164514938336;
  
  constructor(private http: Http) {
	  
  }
  
  init() {
	Facebook.browserInit(this.APP_ID, "v2.8");
  }
}