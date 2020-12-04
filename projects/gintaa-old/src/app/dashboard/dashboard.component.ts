import { AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from '../shared/services/chat.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material';
import { ChatComponent } from '@gintaa/chat/chat/chat.component';
import * as uuid from 'uuid';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentInit, OnDestroy {

  @ViewChild('profile', {static: false}) public profile: ElementRef;
  @ViewChild('transaction', {static: false}) public transaction: ElementRef;
  @ViewChild('deals', {static: false}) public deals: ElementRef;
  @ViewChild('ongoing', {static: false}) public ongoing: ElementRef;
  @ViewChild('offers', {static: false}) public offers: ElementRef;
  userTypeSubscription: any;
  userType: string;
  fragment: string;
  subscription: Subscription;
  isDashboard = new Set();
  modalDialog: MatDialogRef<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatService,
    public matDialog: MatDialog) {
      this.isDashboard.add('transaction');
      this.userTypeSubscription = this.activatedRoute.paramMap.subscribe(params => {
        this.userType = params.get('type');
        console.log(this.userType);
      });
    }

  ngOnInit() {
    this.activatedRoute.fragment.subscribe(fragment => {
      this.fragment = fragment;
    });

    this.chatService.chatConnectSubject.subscribe((res) => {
      console.log('response in dashboard chat connect:::', res);
      if(!this.modalDialog)
        this.openChatModal(res);
   });
  }

  ngAfterContentInit(): void {
    this.subscription = this.activatedRoute.fragment.subscribe(fragment => {
      if (fragment) {
        this.fragment = fragment;
        let customScroll = true;
        if (this.fragment === 'offers') {
          customScroll = false;
        }
        // setTimeout(() => this.scrollToAnchor(), 10);
        console.log('calling scrollToElement', fragment);

        // set the active fragment
        this.isDashboard.clear();
        this.isDashboard.add(fragment);
        setTimeout(() => this.scrollToElement(this.fragment, customScroll), 10);
      } else {
        setTimeout(() => this.isDashboard.add('transaction'), 10);
      }
    });
  }

  onMenuItemsClick(event: any, item: string): void {
    // reset
    // Object.keys(this.isDashboard).length = 0;
    event.stopPropagation();
    this.isDashboard.clear();
    switch (item) {
      case 'deals': {
        this.isDashboard.add('deals');
        this.scrollToElement('deals');
        break;
      }
      case 'ongoing': {
        this.isDashboard.add('ongoing');
        this.scrollToElement('ongoing');
        break;
      }
      case 'offers': {
        this.isDashboard.add('offers');
        this.scrollToElement('offers', false);
        break;
      }
      default: {
        this.isDashboard.add('transaction');
        this.scrollToElement('transaction');
        break;
      }
    }
  }

  ngOnDestroy() {
    this.userTypeSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  // callRedirect() {
  //   this.httpService.doRedirect()
  //       .subscribe(
  //           (data) => {
  //             console.log(`response from redirect: ${JSON.stringify(data)}`);
  //             this.router.navigate(['/profile']);
  //           },
  //           (errResponse) => {
  //             console.log(`Error from redirect: ${JSON.stringify(errResponse)}`);
  //             this.router.navigate(['/profile']);
  //           });
  // }

  scrollToElement(item: string, start: boolean = true): void {
    // console.log('[scrolling into ]', item, start, this.isDashboard);
    if (!item) {
      return null;
    }

    // select the active class [ !! overwritting angular default behaviour]

    if (start) {
      const $element = this[item].nativeElement;
      $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    } else {
      if (item === 'offers') {
        // const {offsetX, offsetY} = this[item].nativeElement.getBoundingClientRect();
        const offsetTransactionHeight = this.transaction.nativeElement.offsetHeight;
        const offsetDealHeight = this.deals.nativeElement.offsetHeight;
        const offsetOngoingOffersHeight = this.ongoing.nativeElement.offsetHeight;
        const offsetTop = this[item].nativeElement.offsetTop;

        const ongoingOfferFixedHeight = 600;
        const offersFixedPaddingTop = 150;
        // tslint:disable-next-line: max-line-length
        // console.log('[scrolling to:] ', offsetTop, offsetTransactionHeight, offsetOngoingOffersHeight, offsetDealHeight, '+ fixed', ongoingOfferFixedHeight, '- fixed padding', offersFixedPaddingTop);

        window.scroll({
          top: offsetTop + offsetDealHeight /* + offsetOngoingOffersHeight + ongoingOfferFixedHeight - offersFixedPaddingTop */,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        const $element = this[item].nativeElement;
        $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
      }
    }
  }

  openChatModal(res: any) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = `chat-component-${uuid.v4()}`;
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    //dialogConfig.backdropClass = 'image-dialog-class';
    dialogConfig.height = '670px';
    dialogConfig.width = '1170px';
    dialogConfig.data = { res };
    this.modalDialog = this.matDialog.open(ChatComponent, dialogConfig);

    this.modalDialog.afterClosed().subscribe((results) => {
      console.log(
        `Chat Dialog closed result: ${JSON.stringify(results)}`
      );
      this.chatService.leaveCurrentRoom();
      this.chatService.disconnect();
      this.modalDialog = undefined;
   });
  }
}
