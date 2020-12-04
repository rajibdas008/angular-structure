import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ChatService } from '@gintaa/shared/services/chat.service';
import { Subscription } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import { CommonHttpService, LoggerService } from '@gintaa/shared';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material';
import { ChatAttachImageComponent } from '@gintaa/chat/chat-attach-image/chat-attach-image.component';
import { faSlideshare } from '@fortawesome/free-brands-svg-icons';
import * as moment from 'moment';
@Component({
  selector: 'app-user-msg',
  templateUrl: './user-msg.component.html',
  styleUrls: ['./user-msg.component.scss']
})
export class UserMsgComponent implements OnInit, AfterViewInit, OnDestroy {

  chatHistoryMsg: any = [];
  chatMsgSub$: Subscription;
  scrollUp$: Subscription;
  loggedInUserId: string = null;
  defaultPage = -1;
  page = this.defaultPage;
  defaultSize = 10;
  isEndOfChatHistory: boolean = false;

  constructor(
    private chatService: ChatService, 
    private httpService: CommonHttpService,
    public matDialog: MatDialog,
    private logger: LoggerService
    ) { }

  ngOnInit() {
    this.chatMsgSub$ = this.chatService.chatHistorySubject$
    .subscribe((response) => {
      if(!response.isPaginatedData){
        this.resetChatMessages();
      }
         
      this.logger.log({
        message:`History Response:::${response}`
      });
      this.page = response.messages.next;
       this.loggedInUserId = response.isOfferOwner ? response.ownerId : response.initiatorId;
      const messages =  this.chatService.formatMessage(response.messages.messages);
      this.chatHistoryMsg = this.prepareChatHistoryMessages(messages);
      this.logger.log({
        message:this.chatHistoryMsg
      }); 
    });
     this.getChatMessageEvents();
  }

  ngAfterViewInit() {   
    this.scrollUp$ = this.chatService.chatScrollUp.subscribe((res)=>{
       if(res == 'up'){
         this.loadMoreChat();
       }
    })
  }

  ngOnDestroy() {
    this.page = this.defaultPage;
    if(this.chatMsgSub$) {
      this.chatMsgSub$.unsubscribe();
    }
    if(this.scrollUp$) {
      this.scrollUp$.unsubscribe();
    }
    this.isEndOfChatHistory = false;
  }

  getChatMessageEvents(){
    this.chatService.chatMessagePrivate.subscribe((msg)=>{
      this.logger.log({
        message:msg
      });
      msg.messageTime = new Date().toISOString();
      //this.chatHistoryMsg.push(res);
      //this.chatHistoryMsg.push({ msg: [{...msg}] });
      this.setTodayMessages(msg);  
      this.chatService.scrollToChatBottom();
    },(err)=>{
      this.logger.log({
        message:err
      });
    });
    this.chatService.chatSenderMessage.subscribe((msg)=> {
      this.logger.log({
        message:`chatSenderMessage response:::${msg}`
      });      
      //this.chatHistoryMsg.push({ msg: [{...msg}] });
      this.setTodayMessages(msg); 
      this.setDeliveredAndReadFlag(msg.messageId,'Sent'); 
      this.chatService.scrollToChatBottom(); 
    },(err)=>{
      this.logger.log({
        message:err
      });
    },
    () => {
      
    });
    this.chatService.chatMessageDelivered.subscribe((msg)=>{
      this.logger.log({
        message:`delivered${msg}`
      });  
      this.setDeliveredAndReadFlag(msg.messageId,'Delivered'); 
      this.logger.log({
        message:this.chatHistoryMsg
      });   
    },(err)=>{
      this.logger.log({
        message:err
      });
    });

    this.chatService.chatMessageRead.subscribe((msg)=>{
      this.logger.log({
        message:`read ${msg}`
      });  
      this.setDeliveredAndReadFlag(msg.messageId,'Read');
      this.logger.log({
        message:this.chatHistoryMsg
      });      
    },(err)=>{
      this.logger.log({
        message:err
      });
    });
  }

  showTime(utcDateTime: string){
    if(utcDateTime){
      const locatDateTime = moment.utc(utcDateTime).toDate();
      const localTime = moment(locatDateTime).format('h:m a'); 
      return localTime;
    }
  }

  previewDocument(doc: any): void {
    this.httpService.previewOfferDocument(doc).subscribe(results => {
      FileSaver.saveAs(results, doc.orgName);
    });
  }

  openImageViewModal(name: string, images: [], isVideo: boolean) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-chat-view-component';
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    dialogConfig.height = '500px';
    dialogConfig.width = '700px';
    dialogConfig.data = { files: images, name, isVideo };
    const modalDialog: MatDialogRef<ChatAttachImageComponent, any> = this.matDialog.open(ChatAttachImageComponent, dialogConfig);
  }

  setDeliveredAndReadFlag(messageId: string, meesageSentType: string){
    this.chatHistoryMsg.map((item: any)=>{
      item.msg.map((itemChild)=>{
        if(itemChild.messageId === messageId) {
          if(meesageSentType === 'Sent'){
            itemChild.isSent = true;
          } else if(meesageSentType === 'Delivered'){
            itemChild.delivered = true;
         } else if(meesageSentType === 'Read'){
          itemChild.readFlag = true;
         }
        }
      })
    })
  }

  setTodayMessages(messageObject: any){
    const object = {
       ...messageObject,
       isSent:false,
       delivered: false,
       readFlag: false,
    }
    let obj = this.chatHistoryMsg.find((item)=> item.key === 'Today');
    if(obj && Object.keys(obj).length>0){
      obj.msg.push(messageObject)
    } else {
      const todayObj = {
        key: 'Today',
        msg: [messageObject]
      }
      this.chatHistoryMsg.push(todayObj);
    }
  }

  getChatHistory(page:number = this.page, size = this.defaultSize){
    const roomId: string = this.chatService.chatConnect.roomId;
    this.chatService.getChatMessagesByRoomId(roomId,{page, size})
    .subscribe((res: any)=> {
      if(res.payload.next == -1){
        this.isEndOfChatHistory = true;
      }
      this.logger.log({
        moduleName: 'CHAT_USER_MESSAGE',
        message: 'Response getOwnerChatHistory:::',
        messageObj: res
      });
      // this.chatService.chatHistorySubject.next({...res.payload, isOfferOwner });
      this.chatService.chatHistorySubject.next({messages: res.payload, isOfferOwner: this.chatService.chatConnect.isOfferOwner, ownerId: this.chatService.chatConnect.offerOwnerId, initiatorId: this.chatService.chatConnect.senderId, isPaginatedData: true});    
    },(error)=>{
      this.logger.log({
        message:error
      });
    });
  }

  loadMoreChat(){
    //this.page ++;
    if(!this.isEndOfChatHistory){
      this.getChatHistory();
    }
  }

  prepareChatHistoryMessages(newMessages){
      if(this.chatHistoryMsg.length === 0){
        return newMessages;
      }
      const firstKey = this.chatHistoryMsg[0].key;
      const findObj = newMessages.find((item)=> item.key === firstKey)
      if(findObj){
        this.chatHistoryMsg[0].msg = [...findObj.msg, ...this.chatHistoryMsg[0].msg]
        newMessages.splice(newMessages.length-1, 1);
        return [...newMessages, ...this.chatHistoryMsg];
      } else {
        return [...newMessages, ...this.chatHistoryMsg];
      }
  }

  resetChatMessages(){
    this.chatHistoryMsg = [];
    this.page = this.defaultPage;
    this.chatService.scrollToChatBottom();
    // if(this.scrollUp$) {
    //   this.scrollUp$.unsubscribe();
    // }
  }

}
