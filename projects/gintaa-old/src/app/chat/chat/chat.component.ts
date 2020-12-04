import { Component, OnInit, Output, EventEmitter, Input, Inject, AfterViewInit, HostListener, OnDestroy, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, ProgressSpinnerMode, ThemePalette } from '@angular/material';
import { SharedService } from '@gintaa/shared';
import { Offer } from '@gintaa/shared/modals';
import { ChatService } from '@gintaa/shared/services/chat.service';
import { Subscription } from 'rxjs';
 
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  offerId: string;
  socketConfig: any;
  socketEndpoint: string;
  socket: any;
  chatContainer: HTMLElement;
  connectObj: any;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  progressSubscription: Subscription;

  @ViewChild('progressBar', {static: false}) progressBar: ElementRef

  constructor(
    public dialogRef: MatDialogRef<any>, 
    private sharedService: SharedService,
    private chatService: ChatService,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  

  ngOnInit() {
    this.connectObj = this.data.res;
    this.sharedService.offerDetailsFetched.subscribe((offerDetails: Offer) => {
      if (offerDetails) {
        this.chatService.offerDetail = offerDetails;
      }
    });
  }

  ngAfterViewInit() {
    this.chatService.scrollToChatBottom();
    this.progressBar.nativeElement.style.display = 'none';
    this.progressSubscription = this.chatService.progressStatus.pipe().subscribe(
      (status: boolean) => {
        this.progressBar.nativeElement.style.display = status ? 'block' : 'none';
        this._changeDetectorRef.detectChanges();
      }
    );  
  }

  ngOnDestroy(): void {
    this.progressSubscription.unsubscribe();
  }

  onDialogClose() {
   this.dialogRef.close('chat_popup_closed..');
  }

  onScrollDown() {
    console.log('scrolled down!!');
  }
 
  onScrollUp() {
    console.log('scrolled up!!');
    this.chatService.chatScrollUp.next('up');
  }

}
