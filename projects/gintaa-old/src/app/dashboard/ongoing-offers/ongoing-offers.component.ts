import { Component, OnInit } from '@angular/core';
import { ChatService } from '@gintaa/shared/services/chat.service';
import { map } from 'rxjs/operators';
import { LoggerService } from '@gintaa/shared/services/logger.service';
@Component({
  selector: 'app-ongoing-offers',
  templateUrl: './ongoing-offers.component.html',
  styleUrls: ['./ongoing-offers.component.scss']
})
export class OngoingOffersComponent implements OnInit {
  offerCommunications: any = [];
  page = 0;
  totalSize = 100;
  ongoingOfferCommunicationCount: number = 0;
  status = 'ALL';
  showPage = 0;
  defaultLimit = 10;
  showLimit = 10;
  allOfferCommunications: any = [];
  currentOfferCommunications: any = [];
  showOfferCommunications: any = [];
  isCheckedReceivedOffers = true;
  isCheckedSentOffers = true;
  constructor(private chatService: ChatService, private logger: LoggerService) { }

  ngOnInit() {
    this.status = 'ALL';
    this.ongoingOfferCommunications();
  }

  ongoingOfferCommunications() {
    const page = this.page;
    const size = this.totalSize;
    this.chatService.getOngoingChatCommunications({page, size})
    .pipe(
      map(response => response.payload ? response.payload : [])
    )
    .subscribe((response) => {
      this.allOfferCommunications = response;
      this.ongoingOfferCommunicationCount = response.length;
      this.getCurrentOffers();
      this.getShowableOffers();
      // for temporary check
      //this.offerCommunications.push('1601790537629');
    })
  }

  chatNowOwner(offer: {offerId, offerName, offerImage, owner}) {
    // const oferId = '1600266184205';
    if(offer.owner)
    this.getAllChatRoomDetails(offer.offerId);
    else
    this.createRoom(offer)
  }

  getAllChatRoomDetails(offerId: string) {
    this.chatService.getAllChatRooms(offerId)
    .subscribe((res: any)=> {
      console.log('Response:::', res);
      this.getOwnerChatHistory(res.payload, true);    
    },(error)=>{
      console.log(error);
    });
  }

  getOwnerChatHistory(response: any[], isOfferOwner: boolean) {
    // const chatIndex = response.length-1;
    const chatIndex = 0;
    const roomId: string = response[chatIndex].roomId
    this.chatService.getChatMessagesByRoomId(roomId)
    .subscribe((res: any) => {
      this.logger.log({
        moduleName: 'CHAT_USER_MESSAGE',
        message: 'Response getOwnerChatHistory:::',
        messageObj: res
      });
      this.chatService.setAllRoomUserDetails(response);
      this.chatService.chatHistorySubject.next({messages: res.payload, isOfferOwner, ownerId: response[chatIndex].ownerId});
      this.chatService.chatInitiate({...response[chatIndex], isOfferOwner });
    }, (error) => {
      console.log(error);
    });
  }

  loadMoreItems(){
    this.showPage = this.showLimit;
    this.showLimit = this.showLimit + this.defaultLimit; 
    this.getShowableOffers();
  }

  isShowLoadMore(): boolean {
    return this.showOfferCommunications.length === this.showLimit;
  }

  createRoom(offer: {offerId, offerName, offerImage, owner}){
    this.chatService.getHistory(offer.offerId).subscribe((res: any)=> {
      this.chatService.setAllRoomUserDetails([res.payload]);
      //this.chatService.chatHistorySubject.next({...res.payload, isOfferOwner });
      this.getChatHistory(res.payload, offer.owner);
          
    },(error)=>{
      this.logger.log({message:error});
    });
  }

  getChatHistory(input: any, isOfferOwner: boolean) {
    this.chatService.getChatMessagesByRoomId(input.roomId)
    .subscribe((res: any) => {
      this.logger.log({
        moduleName: 'CHAT_USER_MESSAGE',
        message: 'Response getOwnerChatHistory:::',
        messageObj: res
      });
      this.chatService.chatHistorySubject.next({messages: res.payload, isOfferOwner, initiatorId: input.initiatorId});
      this.chatService.chatInitiate({...input, isOfferOwner });
    }, (error) => {
      this.logger.log({
        message: error
      });
    });
  }

  getCurrentOffers(){
    this.status = this.getStatus();
     this.currentOfferCommunications = this.allOfferCommunications.filter((item)=>{
        if(this.status === 'SENT'){
          return item.owner === false;
        } if (this.status === 'RECEIVED'){
          return item.owner === true;
        } else if (this.status === 'ALL'){
          return true;
        } else {
          return false;
        }
     })
  }

  getShowableOffers(){
    const items = this.currentOfferCommunications.slice(this.showPage,this.showLimit);
    this.showOfferCommunications = [...this.showOfferCommunications , ...items];
  }

  filterOffers(status,event){
    this.showOfferCommunications = [];
    this.showPage = 0;
    this.showLimit = this.defaultLimit;
    this.status = status;
    if (status === 'RECEIVED') {
      this.isCheckedReceivedOffers = event.target.checked ? true : false;
    } else if (status === 'SENT') {
      this.isCheckedSentOffers = event.target.checked ? true : false;
    }
    this.getCurrentOffers();
    this.getShowableOffers();
  }

  getStatus() {
    if (this.isCheckedReceivedOffers && this.isCheckedSentOffers) {
      return 'ALL';
    } else if (this.isCheckedReceivedOffers && !this.isCheckedSentOffers) {
      return 'RECEIVED';
    } else if (!this.isCheckedReceivedOffers && this.isCheckedSentOffers) {
      return 'SENT';
    } else {
      return 'UNKNOWN';
    }
  }
}
