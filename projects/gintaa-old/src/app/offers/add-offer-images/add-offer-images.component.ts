import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { CommonHttpService, OfferService, SharedService } from '@gintaa/shared';
import { Constants } from '@gintaa/constants';
import { ImageComponent } from '@gintaa/shared/components/image/image.component';
import { FileUploadRequest, ImageResponse, Offer, UploadResponse, MediaResponse } from '@gintaa/shared/modals';
import { environment } from '@gintaa/env';

@Component({
  selector: 'app-add-offer-images',
  templateUrl: './add-offer-images.component.html',
  styleUrls: ['./add-offer-images.component.scss']
})
export class AddOfferImagesComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('mediaUpload', { static: false }) mediaUpload: ElementRef;
  uploading = false;
  offerImages: UploadResponse[] = [];
  offerVedios: UploadResponse[] = [];
  uploadNewOfferImage: UploadResponse[] = [];
  uploadNewOfferVideo: UploadResponse[] = [];
  draftOfferId: string;
  files: any = [];
  imageFiles: any =[];
  videoFiles: any = [];
  medialist: any = [];
  mediaForm: FormGroup;
  mediaSub$: Subscription;
  imageVideoLimit: boolean = false;
  isBrowser = false;
  sticky: boolean = false;
  elementPosition: any;
  //private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private httpService: CommonHttpService,
    private sharedService: SharedService,
    private offerService: OfferService,
    public matDialog: MatDialog,
    private formBuilder: FormBuilder,    
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.offerImages = [];
      this.offerVedios = [];
      this.createFormGrp();
  } 

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.offerImages = [];
    this.offerVedios = [];
    //this.mediaSub$ = this.sharedService.draftOfferMedia$.subscribe((result: any) => {
    this.mediaSub$ = this.route.data.subscribe((data: { offerData: Offer }) => {
      const result: Offer = data.offerData;
      this.uploading = false;
      this.offerImages.length = 0;
      this.offerVedios.length = 0;
      if (result) {
        this.loadDraftOffer(result);
      }
    });
    this.sharedService.offerApiError.subscribe((errorResponse) => {
      if (errorResponse && errorResponse.length) {
        const reason = errorResponse[0].reason;
        this.mediaForm.controls.fileInput.setErrors({ serverError: reason });
      }
    });
    this.sharedService.offerSectionHeight.subscribe((height) => {
      this.elementPosition = height;
    })
  }

  createFormGrp() {
    this.mediaForm = this.formBuilder.group({
      fileInput: ['', Validators.required]
    });
  }

  uploadDraftFile(files: any) {
    if (files.length) {
        const file = this.files.pop();
        this.uploadMediaFile(file);
      }
  }

  private loadDraftOffer(result: any) {
    this.draftOfferId = result.draftOfferId;     
    if (result.images && result.images.length > 0) {
      result.images.forEach((image, index) => {
        image.displayIndex = '0';
        delete image.type;
        image["type"] = "image"; 
        this.offerImages.push(image);
      });
    }
    if (result.videos && result.videos.length > 0) {
        result.videos.forEach(video => {
          this.offerVedios.push(video);
        });
    }
    this.prepareMediaList();
    if (this.files.length) {
    this.uploadDraftFile(this.files);
    }
  }

  ngAfterViewInit(): void {
    this.mediaUpload.nativeElement.value = '';
  }

  uploadMedia() {
    if (this.draftOfferId) {
      // clear previous files
      this.files = [];
    }
    this.imageFiles = [];
    this.videoFiles = [];
    this.uploadNewOfferImage = [];
    this.uploadNewOfferVideo = [];
    const upload = this.mediaUpload.nativeElement as HTMLInputElement;
    upload.onchange = ($event) => {
      this.separateImageVideoFiles(upload.files, $event);
    };
    upload.click();
  }

  separateImageVideoFiles(files: any, event: any) {
    if(files.length) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileType = file.type.split('.').pop().toLowerCase();
        const fileName = file.name;
        if(fileType.includes('video')) {
          this.videoFiles.push({ data: file, inProgress: false, progress: 0});
        } else {
          this.imageFiles.push(file);
        }   
    }    
    this.imageVideoLimit = this.checkUploadImageVideoLimit();  
    if(this.imageFiles.length && !this.imageVideoLimit) {
      this.openModal(this.imageFiles, event);
    }
    if(!this.imageFiles.length && this.videoFiles.length && !this.imageVideoLimit) {
      this.files = [...this.files, ...this.videoFiles];
      this.uploadMediaFiles();
    }
    //this.openModal(this.imageFiles, event);
  }
}

  checkUploadImageVideoLimit(): boolean {
    const addedImage = this.offerImages;
    const addedVedio = this.offerVedios;
    const uploadImages = this.imageFiles;
    const uploadVedios = this.videoFiles;
    const totalImageLength: number = addedImage.length + parseInt(uploadImages.length);
    const totalVedioLength: number = addedVedio.length + uploadVedios.length;
    if(totalImageLength > environment.imageLimit || totalVedioLength > environment.vedioLimit) {
      return true;
    }
    return false;
  }

  openModal(files: any, $event: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '800px';
    dialogConfig.data = { files, event: $event };
    this.mediaUpload.nativeElement.value = '';
    const modalDialog = this.matDialog.open(ImageComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(results => {
      if (results.files) {
        for(let index = 0; index < results.files.length; index++) {
            const file = results.files[index];
            this.files.push({ data: file, inProgress: false, progress: 0});
          }
          if(this.videoFiles.length) {
            this.files = [...this.files, ...this.videoFiles]; 
          }
          // need to check the length              
          this.uploadMediaFiles();
      }
    });
  }  

  uploadMediaFiles() {
    const fileUpload = this.mediaUpload.nativeElement as HTMLInputElement;
    fileUpload.value = '';
    this.offerImages = [];
    this.offerVedios = [];
    if (this.files.length && this.draftOfferId) {
      const file = this.files.pop();
      this.uploadMediaFile(file);
    } else {
      // used for first time upload image 
      if(this.files.length) {
        this.files.forEach((file, index) => {
          this.uploadMediaFile(file);
        });
      }      
    }    
  }

  uploadMediaFile(upload: any) {
    let isImage: number = 1;
    this.uploading = true;
    const type = upload.data.type.split('.').pop().toLowerCase();
    for (const index in Constants.IMAGE_EXT_WHITE_LIST) {
        if (type === Constants.IMAGE_EXT_WHITE_LIST[index]) {
          isImage = 2;
          break;
        }
      }
    for (const index in Constants.VIDEO_EXT_WHITE_LIST) {
        if (type === Constants.VIDEO_EXT_WHITE_LIST[index]) {
          isImage = 3;
          break;
        }
      }
    if (isImage === 1) {
        this.uploading = false;
        this.mediaForm.reset();
        return;
      }
    if (this.draftOfferId) {
        if (isImage === 2) {
          this.updateDraftOfferImage(upload); 
        } else {
          this.updateDraftOfferVedios(upload);
        }
      } else {
        if (isImage === 2) {
          this.uploadOfferImage(upload);    
        } else {
          this.uploadOfferVedio(upload);
        }
      }
  }

  /**
   * update draft offer image
   */

  updateDraftOfferImage(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('draftId', this.draftOfferId);
    formData.append('displayIndex', '0');
    this.httpService.updateDraftOfferImages(formData)
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
          //file.inProgress = false;  
          this.uploading = false;
          return of(`${file.data.name} upload failed.`);  
        }))
      .subscribe(event => {
        if (typeof (event) === 'object') {
          const responseBody = event.body;
          if (responseBody.success && responseBody.payload) {
            this.offerImages = [];
            this.offerVedios = [];
            const result = responseBody.payload;            
            if (result.images && result.images.length > 0) {
              result.images.forEach(img => {
                this.offerImages.push(img); 
              });
              const imageIdArr: MediaResponse[] = this.offerImages.map(({id}) => {
                return {"id": id}
              });
              this.sharedService.offerMedia.next(imageIdArr);
            }
            if (result.videos && result.videos.length > 0) {
              result.videos.forEach(video => {
                this.offerVedios.push(video); 
              });
              const videoIdArr: MediaResponse[] = this.offerVedios.map(({id}) => {
                return {"id": id}
              });
              this.sharedService.offerVideoMedia.next(videoIdArr);
            }
            this.prepareMediaList()
            if (this.files.length) {
                this.uploadDraftFile(this.files);
            }
            this.uploading = false;
          }
          this.mediaForm.reset();
        }
      },
        (errorResp) => {
          this.uploading = false;
        });
  }

  updateDraftOfferVedios(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    formData.append('draftId', this.draftOfferId);
    formData.append('displayIndex', '0');
    this.httpService.updateDraftOfferVedios(formData)
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
        //file.inProgress = false;  
        this.uploading = false;
        return of(`${file.data.name} upload failed.`);  
      }))
      .subscribe(event => {
        if (typeof (event) === 'object') {
          const responseBody = event.body;
          if (responseBody.success && responseBody.payload) {
            this.offerImages = [];
            this.offerVedios = [];
            const result = responseBody.payload;
            if (result.images && result.images.length > 0) {
              result.images.forEach(img => {
                this.offerImages.push(img); 
              });              
              const imageIdArr: MediaResponse[] = this.offerImages.map(({id}) => {
                return {"id": id}
              });
              this.sharedService.offerMedia.next(imageIdArr);
            }
            if (result.videos && result.videos.length > 0) {
              result.videos.forEach(vedio => {
                this.offerVedios.push(vedio);
              });
              const videoIdArr: MediaResponse[] = this.offerVedios.map(({id}) => {
                return {"id": id}
              });
              this.sharedService.offerVideoMedia.next(videoIdArr);
            }
            this.prepareMediaList();
            if (this.files.length) {
              this.uploadDraftFile(this.files);
          }
            this.uploading = false;
          }
          this.mediaForm.reset();
        }
      },
        (errorResp) => {
          this.uploading = false;
        });
  }
  
  uploadOfferImage(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    this.httpService.uploadOfferImages(formData)
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
        //file.inProgress = false;  
        this.uploading = false;
        return of(`${file.data.name} upload failed.`);  
      }))
      .subscribe((event: any) => {      
        if (typeof (event) === 'object') {   
          const responseBody = event.body;          
          if (responseBody.success && responseBody.payload) {
            const imageReq: FileUploadRequest = {
              name: responseBody.payload.sourceName,
              id: responseBody.payload.id
            };            
            const reader = new FileReader();
            reader.readAsDataURL(file.data);
            reader.onload = (event: any) => {
              //imageReq['url'] = event.target.result;
              imageReq['url'] = reader.result;
            }
            //imageReq['id'] = uid();
            //file['id'] = imageReq['id'];
            file['id'] = imageReq.id;
            //const images: any = imageReq;
            //this.sendOfferImageReq(images);
            this.uploadNewOfferImage.push(imageReq as any);
            this.offerImages = [...this.uploadNewOfferImage];
            this.prepareMediaList()
            const imageIdArr: MediaResponse[] = this.offerImages.map(({id}) => {
              return {"id": id}
            });
            this.sharedService.offerMedia.next(imageIdArr);
            this.uploading = false;
          }
          this.mediaForm.reset();
        } 
      });

  }

  uploadOfferVedio(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    this.httpService.uploadOfferVedios(formData)
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
                  file.progress = Math.round(event.loaded * 100 / event.total);
                  break;
            case HttpEventType.Response:
                  return event;
          }
        }),
        tap(message => {}),
        last(),
        catchError((error: HttpErrorResponse) => {
          //file.inProgress = false;
          //file.canRetry = true;
          return of(`${file.data.name} upload failed.`);
        })
      ).subscribe(
         (event: any) => {
        if (typeof (event) === 'object') {
          const response = event.body;
          if (response.success && response.payload) {
            const vedioReq: FileUploadRequest = {
              name: response.payload.sourceName,
              id: response.payload.id
            };
            var reader = new FileReader();
            reader.readAsDataURL(file.data);
            reader.onload = (event) => {
              vedioReq['url'] = (<FileReader>event.target).result;
            }
            //vedioReq['id'] = uid();
            //file['id'] = vedioReq['id'];
            file['id'] = vedioReq.id;
            const vedios = vedioReq as any;
            this.uploadNewOfferVideo.push(vedios);
            this.offerVedios = [...this.uploadNewOfferVideo];
            this.prepareMediaList();
            const videoIdArr: MediaResponse[] = this.offerVedios.map(({id}) => {
              return {"id": id}
            });
            this.sharedService.offerVideoMedia.next(videoIdArr);
            this.uploading = false;
            //this.sendOfferVedioReq(vedios);
          }
          this.mediaForm.reset();
        }
      });
  }
  
  removeImage(image: ImageResponse, index: number) {    
    //const resourceName = image.name;
    const resourceId = image.id;
    const draftOfferId = this.draftOfferId;
    if(draftOfferId) {
    this.httpService
      .removeDraftOfferImages({ draftOfferId, resourceId })
      .subscribe(
        (responseBody) => {
          const result = responseBody.payload;
          this.offerImages = [];
          if (result.images && result.images.length > 0) {
            result.images.forEach(img => {
              this.offerImages.push(img);
            });
          }
          const imageIdArr: MediaResponse[] = this.offerImages.map(({id}) => {
            return {"id": id}
          });
          this.sharedService.offerMedia.next(imageIdArr);
          this.prepareMediaList();
          this.mediaForm.reset();
        },
        (errorResponse) => {});
      } else {        
        //this.uploadNewOfferImage.splice(index, 1);
        if(this.imageVideoLimit) {
          this.uploadNewOfferImage = [...this.offerImages];
        }
        this.uploadNewOfferImage = this.uploadNewOfferImage.filter(item => item.id !== image.id);
        this.offerImages = [...this.uploadNewOfferImage];
        this.files = this.files.filter(file => file.id !== image.id);
        const imageIdArr: MediaResponse[] = this.offerImages.map(({id}) => {
          return {"id": id}
        });
        this.sharedService.offerMedia.next(imageIdArr);
        this.prepareMediaList();
      }

  }

  removeVideo(video: ImageResponse, index: number) {
    //const resourceName = video.name;
    const resourceId: string = video.id;
    const draftOfferId = this.draftOfferId;
    if(draftOfferId) {
    this.httpService
      .removeDraftOfferVideos({ draftOfferId, resourceId })
      .subscribe(
        (responseBody) => {
          const result = responseBody.payload;
          this.offerVedios = [];
          if (result.videos && result.videos.length > 0) {
            result.videos.forEach((v: UploadResponse) => {
              this.offerVedios.push(v);
            });
          }
          const videoIdArr: MediaResponse[] = this.offerVedios.map(({id}) => {
            return {"id": id}
          });
          this.sharedService.offerVideoMedia.next(videoIdArr);
          this.prepareMediaList();
          this.mediaForm.reset();
        },
        (errorResponse) => {});
      } else {
        if(this.imageVideoLimit) {
          this.uploadNewOfferVideo = [...this.offerVedios];
        }
        this.uploadNewOfferVideo = this.uploadNewOfferVideo.filter(item => item.id !== video.id);
        //this.uploadNewOfferVideo.splice(index, 1);
        this.offerVedios = [...this.uploadNewOfferVideo];
        //this.files.splice(index, 1);
        this.files = this.files.filter(file => file.id !== video.id);
        const videoIdArr: MediaResponse[] = this.offerVedios.map(({id}) => {
          return {"id": id}
        });
        this.sharedService.offerVideoMedia.next(videoIdArr);
        this.prepareMediaList();
      }
  }

  prepareMediaList() {
    // prepare common list for medias
    this.medialist = [];
    this.offerImages.forEach(
      (img, index) => {
        img.type = 'image';
        img.displayIndex = (index + 1).toString();
        this.medialist.push(img);
      }
    );
    this.offerVedios.forEach(
      (video, index) => {
        video.type = 'video';
        video.displayIndex = (index + 1).toString();
        this.medialist.push(video);
      }
    );
    this.offerService.setMediaList(this.medialist);
  }

  @HostListener('window:scroll')
  handleScroll() {
    const windowScroll = window.pageYOffset;
    this.sticky = windowScroll >= this.elementPosition;
  }

  ngOnDestroy(): void {
    if(this.mediaSub$) 
     this.mediaSub$.unsubscribe();
  }

}
