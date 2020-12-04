import { Component, OnInit } from '@angular/core';
import { FooterMetaData, FooterService, FooterType } from '@gintaa/shared';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerMeta: FooterMetaData;

  constructor(private footerService: FooterService) {
    footerService.footerChangeEvent.subscribe(
      (footerMeta: FooterMetaData) => {
        this.footerMeta = footerMeta;
        //console.log(`this.footerMeta ::: ${JSON.stringify(this.footerMeta)}`);
      }
    );
  }

  ngOnInit() {
    const footerMeta: FooterMetaData  = {
      hideFooter: false,
      footerType: FooterType.DEFAULT
    };
    this.footerService.notifyFooterChange(footerMeta);
  }

}
