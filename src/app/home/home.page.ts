import { ChatService } from '../services/chat.service';
import { ChatModel } from './../../models/chatModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild(IonContent,{ static: false }) content: IonContent;
  chats : ChatModel[] = [];
  message : string;
  sending : boolean;
  recieving : boolean;

  constructor(private chatService : ChatService) {
  }
  ngOnInit()
  {
    this.chatService.getChannel().bind('chat',data =>
    {
      if(data.type !== 'bot')
      {
        data.isMe = true;
        this.sending = false;
        this.recieving = true;
      }
      else
      {
        this.sending = true;
        this.recieving = false;
      }
      if(data.message.includes('Stay Hungry'))
      {
        this.sending = false;
        this.recieving = false;
      }
      this.chats.push(data);
      this.content.scrollToBottom();
    });
    this.recieving = false;
    this.sending = false;
  }
  sendMessage() {
    this.sending = true;
    this.recieving = false;
    if(this.message!==undefined && this.message!=='')
    {
      this.chatService.sendMessage(this.message)
      .subscribe(resp => {
        this.chatService.sessionID = resp.sessionID;
        this.message = '';
        this.sending = false;
        this.recieving = false;
      }, err => {
        this.sending = false;
        this.recieving = false;
      });
    }
    else
    {
      this.sending = false;
      this.recieving = false;
    }
  }
}
