import { Component } from '@angular/core';
import { ChatModel } from '../../models/chatModel';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public chats: ChatModel[] = [];
  public message: string;
  public sending: boolean = false;
  constructor() {}

  sendMessage()
  {

  }
}
