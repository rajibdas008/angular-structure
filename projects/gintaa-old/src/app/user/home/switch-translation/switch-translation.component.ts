import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-translation',
  templateUrl: './switch-translation.component.html',
  styleUrls: ['./switch-translation.component.scss']
})
export class SwitchTranslationComponent implements OnInit {

  fullName = 'Soumyadip';

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
