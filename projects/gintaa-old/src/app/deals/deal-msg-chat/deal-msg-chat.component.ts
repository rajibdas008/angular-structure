import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-deal-msg-chat',
  templateUrl: './deal-msg-chat.component.html',
  styleUrls: ['./deal-msg-chat.component.scss']
})
export class DealMsgChatComponent implements OnInit {

  @Input() comment: string;
  @Input() dealButton: string;
  @Output() updatedComment = new EventEmitter<string>();
  @Output() dealSubmitted = new EventEmitter<string>();

  dealButtonName: string;
  showDealBlockButton = false;
  showRequestToUpdateButton = false;
  showRequestToUpdateSection = false;

  constructor() { }

  ngOnInit() {
    if (this.dealButton) {
      switch (this.dealButton) {
        case 'INITIATE_DEAL_BUTTON':
          this.dealButtonName = 'Send Deal';
          this.showDealBlockButton = true;
          break;
        case 'UPDATE_DEAL_BUTTON':
          this.dealButtonName = 'Update Deal';
          this.showDealBlockButton = true;
          break;
          case 'REQUEST_TO_UPDATE_BUTTON':
            this.dealButtonName = '';
            this.showDealBlockButton = false;
            this.showRequestToUpdateButton = true;
            this.showRequestToUpdateSection = false;
            break;
        default:
          this.dealButtonName = 'Initiate Deal';
          this.showDealBlockButton = true;
          break;
      }
    }
  }

  public onCommentUpdate(newComment: string) {
    this.comment = newComment;
    this.updatedComment.emit(newComment);
  }

  onRequestToUpdate() {
    this.showRequestToUpdateButton = false;
    this.showRequestToUpdateSection = true;
  }

  onSubmitDeal() {
    this.dealSubmitted.emit();
  }

}
