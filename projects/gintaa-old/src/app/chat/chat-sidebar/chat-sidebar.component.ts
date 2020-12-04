import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { LoggerService, SharedService } from '@gintaa/shared';
import { ChatService } from '@gintaa/shared/services/chat.service';
import { forkJoin, from, Observable, of, Subscription } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { ChatAttachImageComponent } from '../chat-attach-image/chat-attach-image.component';
import { ChatOfferComponent } from '../chat-offer/chat-offer.component';
@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit,AfterViewInit, OnDestroy {

  @Output() chatSidebarClose = new EventEmitter();
  @Input() connect: any = null;

  documentfiles = [];
  @ViewChild("documentUpload", { static: false }) documentUpload: ElementRef;
  @ViewChild("documentUploadForm", { static: false }) documentUploadForm: ElementRef;

  chatImageFiles = [];
  @ViewChild("imageUpload", { static: false }) imageUpload: ElementRef;
  @ViewChild("imageUploadForm", { static: false }) imageUploadForm: ElementRef;

  chatVideoFiles = [];
  @ViewChild("videoUpload", { static: false }) videoUpload: ElementRef;
  @ViewChild("videoUploadForm", { static: false }) videoUploadForm: ElementRef;

  fileUploadSub$: Subscription;

  constructor(
    private chatService: ChatService,
    private sharedService: SharedService, 
    private route: ActivatedRoute,
    public matDialog: MatDialog,
    private logger: LoggerService) { }
  
  ngOnInit() {  }

  ngAfterViewInit(): void {
    this.imageUpload.nativeElement.value = '';
    this.videoUpload.nativeElement.value = '';
  }


  uploadDocument() {
    this.documentfiles = [];
    const documentUpload = this.documentUpload.nativeElement;
    documentUpload.onchange = () => {
      this.uploadDocumentFiles(documentUpload);
    };
    documentUpload.click();
  }

  uploadDocumentFiles(fileUpload: any) {
    this.logger.log({
      moduleName : 'Chat SideBar Upload Document:::',
      message: `File Details::::${fileUpload}`
    });
    for (let index = 0; index < fileUpload.files.length; index++) {
      const file = fileUpload.files[index];
      this.documentfiles.push({ data: file, inProgress: false, progress: 0 });
    }
    if(this.documentfiles.length) {
      this.documentfiles.forEach((file) => {
        this.uploadDocumentFile(file);
      });
    }
  }

  private uploadDocumentFile(file: any) {
    const formData = new FormData();
    formData.append("file", file.data);
    file.inProgress = true;
    this.chatService.uploadChatDocument(formData)
    .pipe(
      map((event) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            file.progress = Math.round((event.loaded * 100) / event.total);
            break;
          case HttpEventType.Response:
            return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        file.inProgress = false;
        return of(`${file.data.name} upload failed.`);
      })
    ).subscribe((event: any) => {
      if (typeof event === "object") {
        const response = event.body;
        if (response.success && response.payload) {
          this.logger.log({
            moduleName : 'Chat SideBar Response documents::::',
            message: `Response File Details::::${response.payload}`
          });
          const messageType = 'FILE';
          const messageId = uuid.v4();
          const documentReq: any = {
            name: response.payload.originalFileName,
            docId: response.payload.documentId,
            senderId: response.payload.userId,
            uploadTime: response.payload.uploadTime,
            messageBody: response.payload.documentUrl,
            messageType: messageType,
            messageId: messageId
          };
          this.chatService.emit('private_message', documentReq);
          this.chatService.chatSenderMessage.next(documentReq);
        }
        this.documentUploadForm.nativeElement.value = '';
      }
    });
  }

  uploadChatImage() {   
    this.chatImageFiles = [];    
    const upload = this.imageUpload.nativeElement as HTMLInputElement;
    upload.onchange = ($event) => {
      this.openChatImageModal(upload.files, $event);
    };
    upload.click();
  }

  uploadMediaFile(element: any, isVideo?: boolean): Observable<any> {
    const formData = new FormData();
    formData.append('file', element.file);
    if(isVideo) {
      return this.chatService.uploadChatVideo(formData)
      .pipe(  
        map(event => {  
          switch (event.type) {  
            case HttpEventType.UploadProgress:  
              //file.progress = Math.round(event.loaded * 100 / event.total);  
              break;  
            case HttpEventType.Response:  
              return event;  
          }  
        }),  
        catchError((error: HttpErrorResponse) => {
          return of(`${element.file.name} upload failed.`);
        }));
    } else {
        return this.chatService.uploadChatImage(formData)
        .pipe(  
          map(event => {  
            switch (event.type) {  
              case HttpEventType.UploadProgress:  
                //file.progress = Math.round(event.loaded * 100 / event.total);  
                break;  
              case HttpEventType.Response:  
                return event;  
            }  
          }),  
          catchError((error: HttpErrorResponse) => {
            return of(`${element.file.name} upload failed.`);
          }));
    }
  }

  openChatImageModal(files: any, $event: any, isVideo?: boolean) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-chat-component';
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    dialogConfig.height = '500px';
    dialogConfig.width = '700px';
    dialogConfig.data = { files, event: $event, isVideo };
    const modalDialog: MatDialogRef<ChatAttachImageComponent, any> = this.matDialog.open(ChatAttachImageComponent, dialogConfig);
    
    modalDialog.afterClosed().subscribe(result => {
      if(isVideo) {
        this.videoUpload.nativeElement.value = '';
      } else {
        this.imageUpload.nativeElement.value = '';
      }
      if(result.closeImagePopUp) {
        return false;
      }
      this.chatService.startProgressBar();
      const mediaMsg = result.msg;
      const uploadfiles = from(result.files);
      const filesObs$ = uploadfiles.pipe(mergeMap(file => forkJoin(this.uploadMediaFile(file, isVideo))));
      this.fileUploadSub$ = filesObs$.subscribe(
        (events: any) => {
          if (typeof (events) === 'object') {
            events.forEach(event => {
              const response = event.body;         
              if (response.success && response.payload) {
                  response.payload['url'] = response.payload.documentUrl;
                  if(isVideo) {
                    this.chatVideoFiles.push(response.payload.documentUrl);                    
                  } else {
                    this.chatImageFiles.push(response.payload.documentUrl);
                  }
              }
            });  
          }
        },
        (error: any) => {
          this.logger.log({
            message: `Error:::${error}`
          });
        },
        () => {
           this.chatService.stopProgressBar();
           const connectObj = this.connect.connectObj;
           const mediaFiles = isVideo ? this.chatVideoFiles : this.chatImageFiles;
           this.chatService.sendImageMessage(mediaMsg, mediaFiles, connectObj, isVideo);
        });
    });
  }

  openOfferModal() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'offer-chat-component';
    dialogConfig.position = {
      top: '0px',
      right: '0px',
    };
    // dialogConfig.backdropClass = 'image-dialog-class';
    dialogConfig.height = 'auto';
    dialogConfig.width = '1170px';
    dialogConfig.data = {
        name: 'CHAT_OFFER',
    };
    const modalDialog = this.matDialog.open(ChatOfferComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      if(results.closeOfferPopUp) {
        return false;
      }
      const connectObj = this.connect.connectObj;
      const offersObj = results;
      this.chatService.sendOfferMessage(offersObj, connectObj);      
    });
  }

  openDeal() {
    this.sharedService.chatDealClicked.next(true);
  }

  uploadChatVideo() {
    this.chatVideoFiles = []; 
    const upload = this.videoUpload.nativeElement as HTMLInputElement;
    upload.onchange = ($event) => {
      this.openChatImageModal(upload.files, $event, true);
    };
    upload.click();
  }

  close(){
    this.chatSidebarClose.emit();
  }

  ngOnDestroy() {
    if(this.fileUploadSub$) {
      this.fileUploadSub$.unsubscribe();
    }
  }

}
