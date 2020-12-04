import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatVideoModule } from 'mat-video';
import { ChaatCallSmallViewComponent } from './chaat-call-small-view/chaat-call-small-view.component';
import { ChatAttachImageComponent } from './chat-attach-image/chat-attach-image.component';
import { ChatAudioCallComponent } from './chat-audio-call/chat-audio-call.component';
import { ChatBottomComponent } from './chat-bottom/chat-bottom.component';
import { ReplyUserComponent } from './chat-bottom/reply-user/reply-user.component';
import { ChatCallSelectUserComponent } from './chat-call-select-user/chat-call-select-user.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ReplyComponent } from './chat-container/reply/reply.component';
import { UserMsgComponent } from './chat-container/user-msg/user-msg.component';
import { ChatSidebarComponent } from './chat-sidebar/chat-sidebar.component';
import { ChatTopComponent } from './chat-top/chat-top.component';
import { ChatVideoCallComponent } from './chat-video-call/chat-video-call.component';
import { ChatViewImageComponent } from './chat-view-image/chat-view-image.component';
import { ChatComponent } from './chat/chat.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChatOfferComponent } from './chat-offer/chat-offer.component';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [
    ChatComponent,
    ChatTopComponent,
    ChatBottomComponent,
    ChatContainerComponent,
    ReplyUserComponent,
    UserMsgComponent,
    ReplyComponent,
    ChatViewImageComponent,
    ChatAttachImageComponent,
    ChatAudioCallComponent, 
    ChaatCallSmallViewComponent,
    ChatVideoCallComponent, 
    ChatCallSelectUserComponent,
    ChatSidebarComponent,
    ChatOfferComponent,    
  ],
  exports: [
    ChatComponent,
    ChatSidebarComponent,
    ChatAttachImageComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatSlideToggleModule,
    CarouselModule,
    MatDatepickerModule,
    MatVideoModule,
    MatProgressBarModule,
    InfiniteScrollModule,
    RouterModule
  ],
  entryComponents: [ChatComponent, ChatSidebarComponent, ChatAttachImageComponent, ChatOfferComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatModule { }
