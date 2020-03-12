import { ChatService } from '../services/chat.service';
import { ChatModel } from './../../models/chatModel';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  chats : ChatModel[] = [];
  message : string;
  sending : boolean;

  constructor(private _chat : ChatService) {
  }
  ngOnInit()
  {
    this._chat.getChannel().bind('chat',data =>
    {
      if(data.type !== 'bot')
      {
        data.isMe = true;
      };
      this.chats.push(data);
    });
  }
  sendMessage() {
    this.sending = true;
    console.log(this.message);
    if(this.message!==undefined && this.message!=='')
    {
      this._chat.sendMessage(this.message)
      .subscribe(resp => {
        this.message = '';
        this.sending = false;
      }, err => {
        this.sending = false;
      });
    }
    else
    {
      this.sending = false;
    }
  }
}
