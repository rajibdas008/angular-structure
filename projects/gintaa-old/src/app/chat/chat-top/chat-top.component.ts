import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoggerService } from '@gintaa/shared';
import { ChatService } from '@gintaa/shared/services/chat.service';

@Component({
  selector: 'app-chat-top',
  templateUrl: './chat-top.component.html',
  styleUrls: ['./chat-top.component.scss']
})
export class ChatTopComponent implements OnInit {
  @Output() chatSidebarClose = new EventEmitter();
  chatAllUsers: any = [];

  constructor(public chatService: ChatService, private logger: LoggerService) { }

  ngOnInit() {
    this.getChatMessageEvents();
    this.chatAllUsers = this.chatService.getAllRoomUserDetails();
  }

  getChatMessageEvents() { }

  switchRoom(room) {
    //this.chatSidebarClose.emit();
    this.chatService.leaveCurrentRoom();
    setTimeout(()=>{
       this.getOwnerChatHistory(room, true); 
    },100)
  }

  getOwnerChatHistory(room: any, isOfferOwner: boolean) {
    const roomId: string = room.roomId;
    this.chatService.getChatMessagesByRoomId(roomId)
    .subscribe((res: any) => {
      this.logger.log({
        moduleName: 'CHAT_USER_MESSAGE',
        message: 'Response getOwnerChatHistory:::',
        messageObj: res
      });
      this.chatService.chatHistorySubject.next({messages: res.payload, isOfferOwner, ownerId: room.ownerId});
      this.chatService.chatInitiate({...room, isOfferOwner });
    }, (error) => {
      console.log(error);
    });
  }

}
