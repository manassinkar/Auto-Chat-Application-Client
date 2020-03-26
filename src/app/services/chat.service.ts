import { PusherService } from './pusher.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public sessionID:number = 0;
  private _url = 'http://localhost:3000';
  private _channel : any;
  constructor(public http: HttpClient, private _pusher : PusherService) {
    this._channel = this._pusher.getPusher().subscribe('chat-bot');
  }


  sendMessage( message : string) : Observable<any>{
    const sessionID = this.sessionID;
    const param = {
      type: 'human',
      message,
      sessionID
    };
    return this.http.post(`${this._url}/chat/message`, param)
  }

  getChannel(){
    return this._channel;
  }
}