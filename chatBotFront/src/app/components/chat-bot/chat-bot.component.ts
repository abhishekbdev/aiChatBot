import { Component } from '@angular/core';
import { Message } from '../../interfaces/message';
import { ChatBotService } from '../../services/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {

  public message: string = ''
  public messages: Message[] = []
  constructor(private chatBotService: ChatBotService){}

  public sendMessage(){
    this.messages.push({
      user: 'user',
      message: this.message
    })
    this.chatBotService.sendMessage(this.message).subscribe((data:any)=>{
      this.messages.push(data)
     this.message = ''
      
    })
  }
}
