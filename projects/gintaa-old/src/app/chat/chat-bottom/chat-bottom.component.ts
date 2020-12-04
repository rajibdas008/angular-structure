import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '@gintaa/shared/services/chat.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-chat-bottom',
  templateUrl: './chat-bottom.component.html',
  styleUrls: ['./chat-bottom.component.scss']
})
export class ChatBottomComponent implements OnInit {
  @ViewChild('message',{ static: false}) message: any;
  typingSubject:Subject<string> = new Subject();
  isTyping:boolean = false;
  constructor(private shareChatService: ChatService, private chatService: ChatService) { }

  ngOnInit() {
    this.getChatMessageEvents();
  }

  sendMessage() {
    const message = this.message.nativeElement.value;
    console.log(" message typed: ",message);
    this.shareChatService.sendMessage(message);
    //this.message.setValue('');
    this.message.nativeElement.value = '';
  }
  
  startTyping(){
    this.typingSubject.next(this.message.nativeElement.value);
  }

  getChatMessageEvents() {
    this.typingSubject.pipe(
      debounceTime(500)
    ).subscribe((res)=>{
      this.chatService.startTyping();
    },(err)=>{
      console.log(err);
    })
    this.chatService.chatMessagePrivate.subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    })


    this.chatService.chatMessageTyping.subscribe((msg)=>{
      if(msg && msg!=''){
        this.isTyping = true;
      } else {
       this.isTyping = false;
      }
       
     },(err)=>{
       console.log(err);
     });
 
 
     this.chatService.chatMessagePrivate.subscribe((msg)=>{
       console.log(msg);
       //this.chatHistoryMsg.push(res);
       this.isTyping = false;
     },(err)=>{
       console.log(err);
     });
  }

}
