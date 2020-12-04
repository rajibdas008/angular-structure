import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DealComponent } from '@gintaa/deals/deal/deal.component';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { UserProfileIncompleteService } from '@gintaa/shared';

@Component({
  selector: 'app-viewer-send-deal',
  templateUrl: './viewer-send-deal.component.html',
  styleUrls: ['./viewer-send-deal.component.scss'],
})
export class ViewerSendDealComponent implements OnInit {
  offerId: string;
  // @Output() clickedChatBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public matDialog: MatDialog,
    public authService: AuthService,
    public sharedService: SharedService,
    private profileIncompleteService: UserProfileIncompleteService,
    private router: Router) {}

  ngOnInit() {
    this.sharedService.chatDealClicked.subscribe((value) => {
      if(value) {
        this.profileIncompleteService.openDealModal();
      }
    })
  }

  // openModal() {
  //   const dialogConfig: MatDialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'image-component';
  //   dialogConfig.position = {
  //     top: '0px',
  //     right: '0px',
  //   };
  //   // dialogConfig.backdropClass = 'image-dialog-class';
  //   dialogConfig.height = '670px';
  //   dialogConfig.width = '1170px';
  //   dialogConfig.data = { input: { source: 'dummy' } };

  //   const modalDialog = this.matDialog.open(ChatComponent, dialogConfig);
  // }
  openDeal() {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
      return;
    }
    this.profileIncompleteService.checkUserProfile('deal');
    //this.profileIncompleteService.openDealModal();
  }
  

  chatNow(){
    if(this.authService.isAuthenticated()) {
      this.profileIncompleteService.checkUserProfile('chat', false);
    } else {
      this.router.navigate(['/login']);
    }
  }   
}
