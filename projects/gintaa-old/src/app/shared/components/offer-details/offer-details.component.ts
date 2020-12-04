import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { SharedService, TitleTagService } from '@gintaa/shared';
import { CanComponentDeactivate } from '@gintaa/shared/guards/can.deactivate.guard';
// import { GtagCategory, GtagAction } from '../common/module/gtag/gtag.interfaces';
// import { Gtag } from '../common/module/gtag/gtag.service';
import { Offer } from '@gintaa/shared/modals';
import { Observable, Subject, Subscription } from 'rxjs';
import { ChatService } from '@gintaa/shared/services/chat.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ChatComponent } from '@gintaa/chat/chat/chat.component';
import * as uuid from 'uuid';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { LoggerService } from '@gintaa/shared/services/logger.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss']
})
export class OfferDetailsComponent implements OnInit, OnDestroy, CanComponentDeactivate {

  // gtagCategory = GtagCategory;
  // gtagAction = GtagAction;
  // gtagParam = { event_label: 'Clicked on Get Started' };
  private componentDestroyed$: Subject<void> = new Subject<void>();

  offerDetail: Offer;
  userName: string;
  itemType: string = null;
  pageIndex = 1;
  userId: string;
  roomId: string;
  public isChatDialogOpen: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public sharedService: SharedService,
    private authService: AuthService,
    private chatService: ChatService,
    private titleTagService: TitleTagService,
    public matDialog: MatDialog,
    private logger: LoggerService
    // private gtag: Gtag
  ) { }


  ngOnInit() {
    // this.activatedRoute.data.subscribe((data: { offerDetail: Offer, Offer[]] }) => {
    this.activatedRoute.data.subscribe((data: { offerDetail: Offer}) => {
      // const [offerDetails, otherOffers]: [Offer, Offer[]] = data.offerDetail;
      const offerDetails = data.offerDetail;
      this.logger.log({
        message: `offer detail result::${offerDetails}`
      })
      this.offerDetail = offerDetails;
      this.sharedService.offerDetailsFetched.next(offerDetails);
      // const userName: string = offerDetails.user.fName;
      // this.sharedService.otherOfferDetails.next({userName , userOffers: otherOffers});
      // this.logger.log({message:('offer detail response::', this.offerDetail);
      // this.gtag.event(GtagAction.view, {
      //   event_category: GtagCategory.offer,
      //   event_label: this.offerDetail.name,
      // });
    },
    (errorResponse) => { }
    );

    this.chatService.chatConnectSubject.subscribe((res)=>{
      this.logger.log({
        message:`response in chat connect:::${res}`
      });
      this.openChatModal(res);
    })
    this.chatService.chatClickedSub$
      .pipe(
          takeUntil(this.componentDestroyed$)
      ).subscribe((value)=>{
        this.logger.log({
          message:`response in chat connect:::${value}`
        });
        this.chatNow(value);
      })
  }

  openChatModal(res: any) {
    this.logger.log({
      message: `Hello:::${this.isChatDialogOpen}`
    });
    if (this.isChatDialogOpen) {
      return;
    }    
    this.isChatDialogOpen = true;
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = `chat-component-${this.offerDetail.offerId}-${uuid.v4()}`;
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    //dialogConfig.backdropClass = 'image-dialog-class';
    dialogConfig.height = '670px';
    dialogConfig.width = '1170px';
    dialogConfig.data = { res };
    let modalDialog = this.matDialog.open(ChatComponent, dialogConfig);

    modalDialog.afterClosed().subscribe((results) => {
      this.isChatDialogOpen = false;
      this.logger.log({
        message: `Chat Dialog closed result: ${JSON.stringify(results)}`
      });
      this.chatService.leaveCurrentRoom();
      this.chatService.disconnect();
   });
  }

  createRoom(isOfferOwner: boolean){
    this.chatService.getHistory(this.offerDetail.offerId).subscribe((res: any)=> {
      this.chatService.setAllRoomUserDetails([res.payload]);
      //this.chatService.chatHistorySubject.next({...res.payload, isOfferOwner });
      this.roomId = res.payload.roomId;
      this.getChatHistory(res.payload, isOfferOwner);
          
    },(error)=>{
      this.logger.log({message:error});
    });
  }

  getChatHistory(input: any, isOfferOwner: boolean) {
    this.chatService.getChatMessagesByRoomId(this.roomId)
    .subscribe((res: any)=> {
      this.logger.log({
        message:`Response getOwnerChatHistory:::${res}`
      });
      this.chatService.chatHistorySubject.next({messages: res.payload, isOfferOwner, initiatorId: input.initiatorId}); 
      this.chatService.chatInitiate({...input, isOfferOwner });     
    },(error)=>{
      this.logger.log({
        message: error
      });
    });
  }
  
  chatNow(value: boolean) {        
    this.createRoom(value)
  } 

  isOwner(): boolean {
    return this.authService.isAuthenticated() && this.offerDetail && this.offerDetail.currentUserOfferOwner;
  }

  isViewer(): boolean {
    return !this.authService.isAuthenticated()
    || (this.authService.isAuthenticated() && this.offerDetail && !this.offerDetail.currentUserOfferOwner);
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this.titleTagService.removeSeo();
    // return true
  }

  ngOnDestroy() { 
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
   }
}


