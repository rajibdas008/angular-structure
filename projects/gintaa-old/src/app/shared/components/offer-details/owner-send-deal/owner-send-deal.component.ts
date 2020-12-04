import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-owner-send-deal',
  templateUrl: './owner-send-deal.component.html',
  styleUrls: ['./owner-send-deal.component.scss']
})
export class OwnerSendDealComponent implements OnInit {
  offerId: string = null;
  roomUserDetails: any = [];
  @Output() ownerClickedChatBtn: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    public matDialog: MatDialog,
    private chatService: ChatService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
      this.offerId = this.route.snapshot.params.id;
      this.getAllChatRoomDetails();
  }

  getAllChatRoomDetails() {
    this.chatService.getAllChatRooms(this.offerId)
    .subscribe((res: any)=> {
      console.log('Response:::', res);
      this.getOwnerChatHistory(res.payload);    
    },(error)=>{
      console.log(error);
    });
  }

  getOwnerChatHistory(rooms: any[]) {
    this.roomUserDetails = [];
    rooms.map((item: any)=>{
       this.roomUserDetails.push({initiatorDisplayImage: item.initiatorDisplayImage, initiatorDisplayName: item.initiatorDisplayName, ownerDisplayImage: item.ownerDisplayImage, ownerDisplayName: item.ownerDisplayName});
    })
  }

  // chatNow() {
  //   this.ownerClickedChatBtn.emit(true);
  // }
}
