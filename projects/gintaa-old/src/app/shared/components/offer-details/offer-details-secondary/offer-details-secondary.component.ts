import { Component, OnInit } from '@angular/core';
import { CommonHttpService, SharedService } from '@gintaa/shared';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-offer-details-secondary',
  templateUrl: './offer-details-secondary.component.html',
  styleUrls: ['./offer-details-secondary.component.scss']
})
export class OfferDetailsSecondaryComponent implements OnInit {

  constructor(
    public sharedService: SharedService,
    private httpService: CommonHttpService) { }

  ngOnInit() {
  }

  previewDocument(doc: any): void {
    this.httpService.previewOfferDocument(doc).subscribe(results => {
      FileSaver.saveAs(results, doc.orgName);
    });
  }

}
