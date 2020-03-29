import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatModel } from '../../models/chatModel';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public sending: boolean = false;
  public recieving: boolean = false;
  public sessionID:number = 0;
  public chats: ChatModel[] = [];
  private _url = environment.server;

  private _channel : any;
  constructor(
    public http: HttpClient,
    public socket: Socket,
    public storage: Storage
  ) {
  }

  async init()
  {
    this.chats = [];
    this.socket.disconnect();
    this.socket.connect();
    let token = await this.storage.get('token');
    this.socket.emit('init',token);
    this.socket.on('push',(chat) =>
    {
      if(chat.isMe)
      {
        this.sending = false;
        this.recieving = true;
      }
      else
      {
        this.sending = true;
        this.recieving = false;
      }
      this.chats.push(chat);
    });
    this.socket.on('end',() =>
    {
      this.disconnect();
      this.sending = false;
      this.recieving = false;
    });
  }

  disconnect()
  {
    this.socket.disconnect();
  }

  messageNew(message)
  {
    this.socket.emit('messageNew',message);
  }

  messageOld(message)
  {
    this.socket.emit('messageOld',message);
  }
}