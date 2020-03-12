import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from "pusher-js";

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  public _pusher : any;
  constructor(public http: HttpClient) { 
    this._pusher = new Pusher("8ccc66c5b6743e31f532", {
      cluster: "ap2",
      encrypted: true
    });
  }
  getPusher(){
    return this._pusher;
  }
}
