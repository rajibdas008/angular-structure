import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';

import { Constants } from '@gintaa/constants';
import { DealComponent } from '../../deals/deal/deal.component';
import { AuthService } from '@gintaa/shared/services/auth/auth.service';
import { DealService } from '@gintaa/shared/services/deal.service';
import { LoggerService } from '@gintaa/shared';
@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.scss']
})
export class DealsComponent implements OnInit {
  logConsole = true;
  isCheckedReceivedDeals = true;
  isChekedSendDeals = true;
  highlightClass: Array<boolean> = [];
  deals: any = [];
  page = 0;
  dealResCount = 0;
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  startDate = '';
  endDate = '';

  maxToday: any;
  minEndDate: any;

  selectedStartDate: any = new FormControl(new Date());
  selectedEndDate: any = new FormControl(new Date());
  showCustomDate = false;
  constructor(
      private dealService: DealService,
      private authService: AuthService,
      private fireAuth: AngularFireAuth,
      public matDialog: MatDialog,
      private logger: LoggerService
    ) {
    this.fireAuth.authState.subscribe(async (user) => {
      if (user) {
          // console.log('user setFirebaseUser:::', user);
          if (!this.authService.getSignInInput()) {
            this.authService.setFirebaseUser(user);
          }
          this.getAllDeal();
      }
    });
   }

  ngOnInit() {
    const currentdate = new Date();
    this.maxToday = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate());
    this.logger.log({
      moduleName: 'DASHBOARD_DEALS',
      message: 'updated max date: ' + this.maxToday,
    });
  }

  getAllDeal(refreshDeals: boolean = false) {
    let input: any = {
      status: Constants.DEAL_FILTER_TYPE_ALL,
      page: this.page,
      size: Constants.PAGE_SIZE,
      type: this.getDealType()
    };
    if (this.startDate !== '') {
      input = { ...input, startDate: this.startDate };
    }
    if (this.endDate !== '') {
      input = { ...input, endDate: this.endDate };
    }
    if (refreshDeals) {
      const loadCount = (this.page + 1) * Constants.PAGE_SIZE;
      input = { ...input, page: 0, size: loadCount };
    }
    if (input.type === Constants.DEAL_FILTER_TYPE_UNKNOWN) {
      this.deals = [];
    } else {
      this.dealService.getAllDeal(input)
        .pipe(
          map((res: any) => {
            const result = res.payload || null;
            const finalResult = result.map((row) => {
              const offeredOffers = row.offeredOffers;
              const requestedOffers = row.requestedOffers;
              const requestedAmount = row.requestedAmount || 0;
              const offeredAmount = row.offeredAmount || 0;
              row.dealType = row.callerIsReceiver ? 'Received' : 'Sent';
              row.dealUser = row.callerIsReceiver ? row.sender.name : row.receiver.name;
              row.offeredOffers = row.callerIsReceiver ? requestedOffers : offeredOffers;
              row.requestedOffers = row.callerIsReceiver ? offeredOffers : requestedOffers;
              row.requestedAmount = row.callerIsReceiver ? requestedAmount : 0;
              row.offeredAmount = row.callerIsReceiver ? 0 : requestedAmount;

              row.dealValue = row.dealValue || 0;
              return row;
            });
            return finalResult;
          })
        )
        .subscribe((res) => {
            this.dealResCount = res.length;
            if (refreshDeals) {
              this.deals = [...res];
            } else {
              this.deals = [...this.deals, ...res];
            }

            this.logger.log({
              logType: 'info',
              moduleName: 'DEAL DASHBOARD',
              message: 'All available deals',
              messageObj: this.deals,
            });
        }, (error) => {
          // failing silently for now
          // console.log(error);
        });
    }
  }

  changeDealType(type: string, event: any) {
    this.deals = [];
    if (type === 'Received') {
      this.isCheckedReceivedDeals = event.target.checked ? true : false;
    } else if (type === 'Sent') {
      this.isChekedSendDeals = event.target.checked ? true : false;
    }
    this.getAllDeal();
  }

  getDealType() {
    if (this.isCheckedReceivedDeals && this.isChekedSendDeals) {
      return Constants.DEAL_FILTER_TYPE_ALL;
    } else if (this.isCheckedReceivedDeals && !this.isChekedSendDeals) {
      return Constants.DEAL_FILTER_TYPE_RECEIVED;
    } else if (!this.isCheckedReceivedDeals && this.isChekedSendDeals) {
      return Constants.DEAL_FILTER_TYPE_SENT;
    } else {
      return Constants.DEAL_FILTER_TYPE_UNKNOWN;
    }
  }

  isShowLoadMore(): boolean {
    return this.dealResCount === Constants.PAGE_SIZE;
  }

  loadMoreItems() {
    this.page++;
    this.getAllDeal();
  }

  openDealDialog(dealRefId: string, dealStatus: string, dealType: string) {
    console.log('[opening deal]', dealRefId, dealStatus, dealType);
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'deal-component';
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    // dialogConfig.backdropClass = 'image-dialog-class';
    dialogConfig.height = 'auto';
    dialogConfig.width = '1170px';

    if (dealRefId) {
      if ((
          dealStatus === Constants.DEAL_STATUS_INITIATED
          || dealStatus === Constants.DEAL_STATUS_UPDATED
          || dealStatus === Constants.DEAL_STATUS_UPDATE_REQUESTED
        ) && dealType === 'Sent') {
        dialogConfig.data = {
          sourcePage: 'VIEW_OFFER',
          status: 'DEAL_CREATED',
          dealId: dealRefId
        };

        const modalDialog = this.matDialog.open(DealComponent, dialogConfig);
        modalDialog.afterClosed().subscribe((results) => {
          this.getAllDeal(true);
        });
      } else if ((
            dealStatus === Constants.DEAL_STATUS_INITIATED
            || dealStatus === Constants.DEAL_STATUS_UPDATED
            || dealStatus === Constants.DEAL_STATUS_UPDATE_REQUESTED
        )  && dealType === 'Received') {
        dialogConfig.data = {
          sourcePage: 'VIEW_OFFER',
          status: 'DEAL_RECEIVED',
          dealId: dealRefId
        };

        const modalDialog = this.matDialog.open(DealComponent, dialogConfig);
        modalDialog.afterClosed().subscribe((results) => {
          this.getAllDeal(true);
        });
      } else if (dealStatus === Constants.DEAL_STATUS_ACCEPTED || dealStatus === Constants.DEAL_STATUS_PARTIAL_CLOSED) {
        dialogConfig.data = {
          sourcePage: 'DASHBOARD_CLOSE_DEAL',
          status: 'DEAL_CLOSE_INITIATED',
          dealId: dealRefId
        };

        const modalDialog = this.matDialog.open(DealComponent, dialogConfig);
        modalDialog.afterClosed().subscribe((results) => {
          this.getAllDeal(true);
        });
      } else if (dealStatus === Constants.DEAL_STATUS_CLOSED) {
        dialogConfig.data = {
          sourcePage: 'CLOSE_DEAL',
          status: 'DEAL_CLOSED',
          dealId: dealRefId
        };

        const modalDialog = this.matDialog.open(DealComponent, dialogConfig);
        modalDialog.afterClosed().subscribe((results) => {
          this.getAllDeal(true);
        });
      }
    }
  }

  onFormSubmit() {}

  onChangeDateFilter(value: any) {
    if (this.logConsole) { console.log('[dashboard] onChangeDateFilter', value); }
    this.showCustomDate = false;
    const date = new Date();
    if (parseInt(value, 10) === 1) {
      this.startDate = '';
      this.endDate = '';
      this.getAllDeal(true);
    } else if (parseInt(value, 10) === 2) {
      this.endDate = this.getDateFormat(date);
      this.startDate = this.getDateFormat(new Date(date.setDate(date.getDate() - 7)));
      this.getAllDeal(true);
    } else if (parseInt(value, 10) === 3) {
      this.endDate = this.getDateFormat(date);
      this.startDate = this.getDateFormat(new Date(date.setDate(date.getDate() - 30)));
      this.getAllDeal(true);
    } else if (parseInt(value, 10) === 4) {
      if (this.logConsole) { console.log('[dashboard] custom date selected', value); }
      this.startDate = '';
      this.endDate = '';
      this.showCustomDate = true;
    }
  }

  getDateFormat(value: any) {
    const dd = String(value.getDate()).padStart(2, '0');
    const mm = String(value.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = value.getFullYear();
    return yyyy + mm + dd;
  }

  dateValueChange(value: any, type: string) {
    const date = new Date(value);
    if (type === 'Start') {
      // setting min value for the end date accordingly
      this.minEndDate = date;
      this.startDate = this.getDateFormat(date);
    } else if (type === 'End') {
      this.endDate = this.getDateFormat(date);
    }
    this.getAllDeal(true);
  }

}
