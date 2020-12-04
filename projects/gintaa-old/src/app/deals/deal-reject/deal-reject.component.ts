import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DealService } from '@gintaa/shared/services/deal.service';

@Component({
  selector: 'app-reject-popup',
  templateUrl: './deal-reject.component.html',
  styleUrls: ['./deal-reject.component.scss']
})
export class DealRejectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DealRejectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dealService: DealService) { }

  ngOnInit() {
  }

  cancel(): void {
    this.dialogRef.close('cancel');
  }

  reject(event){
    const input = {
      dealRefId: this.data.dealRefId,
      comment: event.value,
    }
    this.dealService.rejectDeal(input).subscribe(()=>{
      this.dialogRef.close('reject');
    })
  }

}
