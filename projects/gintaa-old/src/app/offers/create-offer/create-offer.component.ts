import { Location, LocationStrategy } from "@angular/common";
import { HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";
// import { GtagAction, GtagCategory } from '@gintaa/common/module/gtag/gtag.interfaces';
// import { Gtag } from '@gintaa/common/module/gtag/gtag.service';
import { CommonHttpService, FormErrorService, OfferService, SharedService, ErrorScrollingService, LoggerService } from "@gintaa/shared";
import { FileUploadRequest, Offer, Response, UploadResponse, AddressResponse } from "@gintaa/shared/modals";
import { CanComponentDeactivate } from '@gintaa/shared/guards/can.deactivate.guard';
import { LoadingScreenService } from '@gintaa/shared/components/loading-screen/loading-screen.service';
import * as FileSaver from 'file-saver';
import { ConvertTime12To24Pipe } from '@gintaa/shared/pipes/convert-time12-to24.pipe';

@Component({
  selector: "app-create-offer",
  templateUrl: "./create-offer.component.html",
  styleUrls: ["./create-offer.component.scss"]
})
export class CreateOfferComponent implements OnInit, AfterViewInit, OnDestroy, CanComponentDeactivate {

  // gtagCategory = GtagCategory;
  // gtagAction = GtagAction;

  createOfferForm: FormGroup;
  isOfferEdit: boolean = false;
  offerType: string = null;
  submitted: boolean = false;
  isClicked: boolean = false;
  documentfiles = [];
  offerDocuments: UploadResponse[] = [];
  uploadNewOffeDocument: UploadResponse[] = [];
  offer: Offer;
  @ViewChild("documentUpload", { static: false }) documentUpload: ElementRef;
  @ViewChild("form", { static: false }) documentUploadForm: ElementRef;
  previewUrl: string = null;
  isMoneySelected: boolean = false;
  offerTypes = ['Item', 'Service'];
  @ViewChild("createOfferContainer", { static: false }) createOfferContainer: ElementRef;

  chips = [
    { name: "MONDAY", state: false },
    { name: "TUESDAY", state: false },
    { name: "WEDNESDAY", state: false },
    { name: "THURSDAY", state: false },
    { name: "FRIDAY", state: false },
    { name: "SATURDAY", state: false },
    { name: "SUNDAY", state: false },
  ];

  selectedChips: any[] = [];
  draftSelectedChips: any[] = [];
  isDraftSelected: boolean;
  isBackButtonPressed: boolean;
  draftOfferId: string = null;
  isPostOffer: boolean = false;
  isDraftOffer: boolean;
  enableForDraft: boolean = false;
  isResetForm: boolean = false;
  oldCategoryId: string = '3';

  constructor(    
    private httpService: CommonHttpService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private offerService: OfferService,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private formErrorService: FormErrorService,
    private loadingScreenService: LoadingScreenService,
    private errorScrollService: ErrorScrollingService,
    private logger: LoggerService,
    private convertTimePipe: ConvertTime12To24Pipe
    // private gtag: Gtag
  ) {
    const url: string = this.router.url;
    //this.offer = new Offer();
    this.locationStrategy.onPopState(() => {
      if (url.indexOf('offer-live') > 0) {
        this.isBackButtonPressed = true;
        return false;
      }
    });

    this.createForm();
  }


  ngAfterViewInit(): void {
    const createOfferSectionRect = this.createOfferContainer.nativeElement.getBoundingClientRect();
    // const createOfferSectionHeight = createOfferSectionRect.height - createOfferSectionRect.top;
    const createOfferSectionHeight = createOfferSectionRect.height;
    this.logger.log({
      moduleName: 'createoffercomponent height',
      message: createOfferSectionHeight,
      messageObj: createOfferSectionRect
    });
    this.sharedService.offerSectionHeight.next(createOfferSectionHeight);
  }

  createForm() {
    this.createOfferForm = this.formBuilder.group({
      offerType: ["", [Validators.required]],
      name: ["", { validators: [Validators.required, Validators.minLength(8)], updateOn: "blur" }],
      description: ["", { validators: [Validators.required], updateOn: "blur" }],
      categoryId: ["", { validators: [Validators.required], updateOn: "blur" }],
      facets: [[]],
      customTags: [[]],
      documents: [[]],
      images: [[]],
      videos: [[]],
      exchangeMode: ["", { validators: Validators.required, updateOn: "blur" }],
      desire: ["", { validators: Validators.required }],
      location: ["", { validators: Validators.required, updateOn: "blur" }],
    });
  }

  ngOnInit() {
    this.route.params
    .subscribe((params: Params) => {
      if(Object.keys(params).length) {
        this.draftOfferId = params['id'];
        this.offerType = params['type'];
        if(this.draftOfferId && this.offerType) {
          this.extractDraftOfferRouteParams();          
        }
      }
    });

    if(!this.draftOfferId) {
      this.createOfferForm.get("offerType").setValue("Item");
      this.offerType = this.createOfferForm.get("offerType").value; 
      this.getAllRootCategories();
      this.addDynamicFormControls(this.offerType);
    }   
    
    if(!this.isResetForm) {
      this.createOfferForm.get("offerType").valueChanges.subscribe((value) => {
        this.offerType = value;
        this.addDynamicFormControls(this.offerType);
        this.createOfferForm.get("categoryId").setValue("");
        this.createOfferForm.get("categoryId").updateValueAndValidity();
        this.getAllRootCategories();
        this.createOfferForm.markAsPristine();
        this.enableForDraft = false;
      });
    }
    
    this.createOfferForm.valueChanges
    .subscribe(value => {
      if (this.createOfferForm.dirty) {
        this.enableForDraft = true;
      }
    });

    // this.sharedService.offerDocumentPresent.subscribe((files) => {
    //   if (files.length) {
    //   const file = this.documentfiles.pop();
    //   this.uploadFile(file);
    //   }
    // });    
  }

  uploadDocumentFile(files: any) {
    if (files.length) {
      const file = this.documentfiles.pop();
      this.uploadFile(file);
    }
  }

  extractDraftOfferRouteParams() {
    this.route.data
    .subscribe(
      (data: { offerData: Offer }) => {
        const draftOfferDetails: Offer = data.offerData;
        if(draftOfferDetails) {
          this.draftOfferId = draftOfferDetails.draftOfferId;
          this.offerType = draftOfferDetails.offerType;
          if (!this.offerType) { return; }
          this.isOfferEdit = true;
          this.sharedService.offerDefaultAddressChange.next(draftOfferDetails.location);
          //this.sharedService.draftOfferMedia.next(draftOfferDetails);
          if(draftOfferDetails.documents.length > 0) {
            draftOfferDetails.documents = this.modifyResultDocuments(draftOfferDetails.documents)
          }
          if (draftOfferDetails.offerType  === 'Service') {
          // populate selected chips
          this.selectedChips = [];
          if (draftOfferDetails.availableDays) {
            this.isDraftSelected = true;
            this.selectedChips = draftOfferDetails.availableDays;
          }
          this.chips.forEach(
            (sourceChip) => {
              this.selectedChips.forEach(
                (selectedChip) => {
                  if (sourceChip.name === selectedChip) {
                    sourceChip.state = true;
                  }
                });
            });
        }
        this.addDynamicFormControls(this.offerType);
        this.getAllRootCategories();
        this.createOfferForm.markAsPristine();
        this.enableForDraft = false;
        this.createOfferForm.patchValue(draftOfferDetails);
      }
    },
    (errorResponse: any) => {
      errorResponse = errorResponse.error;
    });
  }

  // getDraftOfferById(draftOfferId: string) {
  //   this.httpService.getDraftOfferById(draftOfferId)
  //   .pipe(
  //     map((response: Response) => response.payload ? response.payload : null)
  //   )
  //   .subscribe(
  //     (result) => {
  //         this.sharedService.offerDefaultAddressChange.next(result.location);
  //         this.sharedService.draftOfferMedia.next(result);
  //         if(result.documents.length > 0) {
  //           result.documents = this.modifyResultDocuments(result.documents)
  //         }
  //         if (result.offerType  === 'Service') {
  //         // populate selected chips
  //         this.selectedChips = [];
  //         if (result.availableDays) {
  //           this.isDraftSelected = true;
  //           this.selectedChips = result.availableDays;
  //         }
  //         this.chips.forEach(
  //           (sourceChip) => {
  //             this.selectedChips.forEach(
  //               (selectedChip) => {
  //                 if (sourceChip.name === selectedChip) {
  //                   sourceChip.state = true;
  //                 }
  //               });
  //           });
  //       }
  //       this.createOfferForm.patchValue(result);
  //     },
  //     (errorResponse) => {
  //       errorResponse = errorResponse.error;
  //     }
  //   );
  // }

  modifyResultDocuments(documents: any) {
    documents.forEach((document) => {
      document['previewUrl'] = document.orgName;
      this.offerDocuments.push(document);
    });
    return this.offerDocuments;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.createOfferForm.controls;
  }  

  getAllRootCategories() {
    this.httpService.findAllCategories(this.offerType).subscribe((result) => {
      this.sharedService.rootCategory.next(result);
    });
  }

  onDocumentSubmit() {
    this.documentfiles = [];
    const documentUpload = this.documentUpload.nativeElement;
    documentUpload.onchange = () => {
      this.uploadDocument(documentUpload);
    };
    documentUpload.click();
  }

  uploadDocument(fileUpload: any) {
    for (let index = 0; index < fileUpload.files.length; index++) {
      const file = fileUpload.files[index];
      this.documentfiles.push({ data: file, inProgress: false, progress: 0 });
    }
    this.uploadFiles();
  }

  updateDraftOfferDocument(imageUpload: any) {
    const formData = new FormData();
    formData.append("file", imageUpload.data);
    formData.append("draftId", this.draftOfferId);
    formData.append("displayIndex", "0");

    this.httpService.updateDraftOfferDocuments(formData)
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
        //this.uploading = false;
        return of(`${imageUpload.data.name} upload failed.`);  
      }))
    .subscribe((event) => {
       if (typeof (event) === 'object') {
        const responseBody = event.body;
        if (responseBody.success && responseBody.payload) {
          this.offerDocuments = [];
          //this.offer.documents = null;
          const result = responseBody.payload;
          // collect documents
          if (result.documents && result.documents.length > 0) {
            result.documents.forEach((document) => {
              document['previewUrl'] = document.orgName;
              this.offerDocuments.push(document);                           
            });
            this.createOfferForm
              .get("documents")
              .setValue(this.offerDocuments, { emitEvent: false }); 
          }
          if (this.documentfiles.length) {
              this.uploadDocumentFile(this.documentfiles);
            //this.sharedService.offerDocumentPresent.next(this.documentfiles);
          }
        }
        // this.createOfferForm
        //       .get("documents")
        //       .setValue(this.offerDocuments, { emitEvent: false });
        this.documentUploadForm.nativeElement.reset();
      }
    },
    (errorResp) => {
      //this.uploading = false;
      console.log('Error Update document::', errorResp);
    });
  }

  uploadOfferDocument(file: any) { 
    const formData = new FormData();
    formData.append("file", file.data);
    file.inProgress = true;
    this.httpService
      .uploadOfferDocument(formData)
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
      )
      .subscribe((event: any) => {
        if (typeof event === "object") {
          const responseBody = event.body;
          if (responseBody.success && responseBody.payload) {
            const documentReq: FileUploadRequest = {
              name: responseBody.payload.sourceName,
              id: responseBody.payload.id,
              previewUrl: file.data.name,
              displayIndex: '0',
            };
            const documents = documentReq;
            //this.sendCreateOfferReq();
            //this.offer.documents = documentReq;
            //this.uploadNewOffeDocument.push(this.offer.documents);
            this.uploadNewOffeDocument.push(documents as any);
            this.offerDocuments = [...this.uploadNewOffeDocument];
            //this.offerDocuments.push(this.offer.documents);
            this.createOfferForm.get("documents").setValue(this.offerDocuments, { emitEvent: false });
          }
          this.documentUploadForm.nativeElement.reset();
        }
      });
  }

  uploadFiles() {
    this.documentUpload.nativeElement.value = "";
    this.offerDocuments = [];
    if (this.documentfiles.length && this.draftOfferId) {
      const file = this.documentfiles.pop();
      this.uploadFile(file);
    }  else {
      if(this.documentfiles.length) {
        this.documentfiles.forEach((file, index) => {
          this.uploadFile(file);
        });
      }
    }    
  }

  uploadFile(file) {
    if(this.draftOfferId) {
      this.updateDraftOfferDocument(file);
    } else {
      this.uploadOfferDocument(file);
    }
    
  }

  deleteDocument(resource: any, index: number) {
    //const resourceName = this.offerDocuments[0].name;
    const resourceId = resource.id;
    const draftOfferId = this.draftOfferId;
    if (!resourceId) {
      return;
    }
    if (draftOfferId) {
      this.httpService
        .removeDraftOfferDocuments({ draftOfferId, resourceId })
        .subscribe(
          (responseBody) => {
            const result = responseBody.payload;
            this.previewUrl = null;
            this.offerDocuments = [];
            result.documents = this.modifyResultDocuments(result.documents);
          },
          (errorResponse) => {}
        );
    } else {
      this.uploadNewOffeDocument.splice(index, 1);
      this.offerDocuments = [...this.uploadNewOffeDocument];
      //this.offerDocuments.splice(index, 1);
      this.documentfiles.splice(index, 1);
      this.documentUploadForm.nativeElement.reset();
    }
  }

  isItem() {
    return this.offerType === "Item";
  }

  isService() {
    return this.offerType === "Service";
  }

  setExchange(exchange: string) {
    this.isMoneySelected = false;
    if (exchange === "Anything") {
      this.createOfferForm.get("desire").clearValidators();
    } else {
      this.createOfferForm.get("desire").setValidators(Validators.required);
      if (exchange === "Money") {
        this.isMoneySelected = true;
      }
    }
    this.createOfferForm.controls.exchangeMode.setValue(exchange);
    this.createOfferForm.get("desire").setValue("");
    this.createOfferForm.get("desire").updateValueAndValidity();
  }

  selectedCustomTags(selectedTags: string[] = []) {
    this.createOfferForm.get("customTags").setValue(selectedTags);
    this.createOfferForm.get("customTags").updateValueAndValidity();
  }

  submitOffer() {
    this.submitted = true;
    this.isClicked = true;
    if(this.createOfferForm.controls.exchangeMode.value === 'Anything') {
      this.createOfferForm.get("desire").clearValidators();
      this.createOfferForm.get("desire").updateValueAndValidity();
     }
    this.addDynamicOfferRequestControls();
    if (!this.offerService.getMediaList().length) {
      const errorObj = {
        param : 'image',
        reason : 'Please upload at least one image'
      };
      this.sharedService.offerApiError.next([errorObj]);
      this.isClicked = false;
      this.errorScrollService.scrollToError('.upload_progress .text-danger');
      return;
    }
    if (this.createOfferForm.invalid) {
      setTimeout(() => {
        this.isClicked = false;
        this.errorScrollService.scrollToError('.profile_start .text-danger');
        return;
      }, 300);
    } else {
      if(this.draftOfferId) {
        this.createOfferForm.removeControl("documents");
        this.createOfferForm.removeControl("images");
        this.createOfferForm.removeControl("videos");
        this.createOfferForm.removeControl("offerId");
         this.createOfferForm.addControl(
           "draftId",
           this.formBuilder.control(this.draftOfferId)
         );
       }
       if (this.isItem()) {
         this.saveNewItem();
       } else {
         this.saveNewService();
       }
    }
  }
  saveNewService() {
    this.isPostOffer = true;
    this.loadingScreenService.startLoading();
    this.httpService
      .postDraftServiceOffer(this.createOfferForm.value)
      .pipe(
        map((response: Response) =>
          response.payload ? response.payload : null
        ),
        finalize(() => this.loadingScreenService.stopLoading())
      )
      .subscribe(
        (result) => {
          if (result) {
            // this.gtag.event(GtagAction.post_service, {
            //   event_category: GtagCategory.offer,
            //   event_label: this.createOfferForm.controls.name.value
            // });
            if(this.draftOfferId) {
              this.router.navigate(['../../publishing-offer', result.offerId], { relativeTo: this.route });
            } else {
              this.router.navigate(['publishing-offer', result.offerId], { relativeTo: this.route });
            }
          }
        },
        (errorResponse) => {
          console.log('Offer Service Creation errro response:::', errorResponse);
          this.isPostOffer = false;
          this.isClicked = false;
          if(this.draftOfferId) {
            this.createOfferForm.addControl("documents", this.formBuilder.control(this.offerDocuments));
            const images = this.sharedService.offerMedia.getValue();
            this.createOfferForm.addControl("images", this.formBuilder.control(images));
            const videos = this.sharedService.offerVideoMedia.getValue();
            this.createOfferForm.addControl("videos", this.formBuilder.control(videos));
            this.createOfferForm.addControl("offerId", this.formBuilder.control(this.draftOfferId));
            this.createOfferForm.removeControl("draftId");
           }
          this.formErrorService.processError(
            errorResponse,
            this.createOfferForm.controls
          );
        }
      );
  }
  saveNewItem() {    
    this.isPostOffer = true;
    this.loadingScreenService.startLoading();
    this.httpService
      .postDraftItemOffer(this.createOfferForm.value)
      .pipe(
        map((response: Response) =>
          response.payload ? response.payload : null
        ),
        finalize(() => this.loadingScreenService.stopLoading())
      )
      .subscribe(
        (result) => {
          // redirect
          if (result) {
            // this.gtag.event(GtagAction.post_item, {
            //   event_category: GtagCategory.offer,
            //   event_label: this.createOfferForm.controls.name.value
            // });
            if(this.draftOfferId) {
              this.router.navigate(['../../publishing-offer', result.offerId], { relativeTo: this.route });
            } else {
              this.router.navigate(['publishing-offer', result.offerId], { relativeTo: this.route });
            }
          }
        },
        (errorResponse) => {
          console.log('Offer Service post error response', errorResponse);
          this.isClicked = false;          
          this.isPostOffer = false;
          if(this.draftOfferId) {
            this.createOfferForm.addControl("documents", this.formBuilder.control(this.offerDocuments));
            const images = this.sharedService.offerMedia.getValue();
            this.createOfferForm.addControl("images", this.formBuilder.control(images));
            const videos = this.sharedService.offerVideoMedia.getValue();
            this.createOfferForm.addControl("videos", this.formBuilder.control(videos));
            this.createOfferForm.addControl("offerId", this.formBuilder.control(this.draftOfferId));
            this.createOfferForm.removeControl("draftId");
           }
          this.formErrorService.processError(
            errorResponse,
            this.createOfferForm.controls
          );
        }
      );
  }

  onReset() {
    this.submitted = false;
    this.isResetForm = true;
    this.createOfferForm.get("offerType").setValue("Item");
    this.createOfferForm.get("documents").setValue([]);
    this.createOfferForm.get("images").setValue([]);
    this.createOfferForm.get("videos").setValue([]);
    this.createOfferForm.reset(this.createOfferForm.value);
    this.location.back();
  }

  addDynamicFormControls(offerType) {
    if (offerType === "Item") {
      this.createOfferForm.addControl(
        "unitOfferValuation",
        this.formBuilder.control("", {
          validators: [Validators.required, Validators.pattern("^[0-9]*$")],
          updateOn: "blur",
        })
      );
      this.createOfferForm.addControl(
        "itemCondition",
        this.formBuilder.control("", Validators.required)
      );
      this.createOfferForm.addControl(
        "quantity",
        this.formBuilder.control("1", Validators.required)
      );
      this.createOfferForm.removeControl("startTime");
      this.createOfferForm.removeControl("endTime");
      this.createOfferForm.removeControl("startDate");
      this.createOfferForm.removeControl("endDate");
      this.createOfferForm.removeControl("availableDays");
    } else {
      this.createOfferForm.removeControl("unitOfferValuation");
      this.createOfferForm.removeControl("itemCondition");
      this.createOfferForm.removeControl("quantity");
      this.createOfferForm.addControl(
        "startTime",
        this.formBuilder.control("", {
          validators: [Validators.required],
          updateOn: "blur",
        })
      );
      this.createOfferForm.addControl(
        "endTime",
        this.formBuilder.control("", Validators.required)
      );
      this.createOfferForm.addControl(
        "availableDays",
        this.formBuilder.control([], {validators: [Validators.required], updateOn: 'blur'})
      );
      this.createOfferForm.addControl(
        "startDate",
        this.formBuilder.control("10-10-2020")
      );
      this.createOfferForm.addControl(
        "endDate",
        this.formBuilder.control("11-10-2020")
      );
    }
  }

  // service related functions

  changeSelected(chip?: any) {
      const index = this.selectedChips.indexOf(chip.name);    
      if (!chip.state) {
        this.selectedChips.splice(index, 1);
      } else {
        this.selectedChips.push(chip.name);
      }
      //if(this.isDraftSelected) {
      if(this.draftOfferId) {
        this.selectedChips = [...this.selectedChips, chip];
        this.draftSelectedChips = this.selectedChips.filter(chip => chip.state === true)
        .reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
        .map(({ name }) => name);
        if(JSON.stringify(this.selectedChips) !== JSON.stringify(this.draftSelectedChips)) {
          this.enableForDraft = true;
        }        
        this.createOfferForm.get('availableDays').setValue(this.draftSelectedChips);
      } else {
        this.createOfferForm.get('availableDays').setValue(this.selectedChips);
      }
      this.createOfferForm.get('availableDays').updateValueAndValidity();
  }

  toggleItem(event: MatCheckboxChange) {
    if (event.checked) {
      this.chips.map((chip) => {
        chip.state = true;
        return chip;
      });
    } else {
      this.chips.map((chip) => {
        chip.state = false;
        return chip;
      });
    }
  }

  getAllChipState() {
    return this.chips.every((chip) => chip.state === true);
  }

  public startTimeChange(time: string) {
    const startTime = this.convertTimePipe.transform(time);
    this.createOfferForm.controls.startTime.setValue(startTime);
  }

  public endTimeChange(time: string) {
    const endTime = this.convertTimePipe.transform(time);
    this.createOfferForm.controls.endTime.setValue(endTime);
  }

  addDynamicOfferRequestControls() {
    //const categoryId: string = this.offerService.getLeafNodeCategoryId() || "3";
    const categoryId: string = this.offerService.getCurrentNodeCategoryId() || null;
    this.oldCategoryId = categoryId; 
    this.createOfferForm.get("categoryId").setValue(categoryId);
    this.createOfferForm.get("categoryId").updateValueAndValidity();
    if (this.offerService.getFinalTags().length) {
      this.createOfferForm
        .get("facets")
        .setValue(this.offerService.getFinalTags());
      //this.createOfferForm.get("facets").updateValueAndValidity();
    } else {
      this.createOfferForm
        .get("facets")
        .setValue([]);
      //this.createOfferForm.get("facets").updateValueAndValidity();
    }
    this.createOfferForm.get("facets").updateValueAndValidity();
    const images = this.sharedService.offerMedia.getValue();
    if(images.length > 0 && !this.draftOfferId) {
      this.enableForDraft = true;
    }
    const videos = this.sharedService.offerVideoMedia.getValue();
    if(videos.length > 0 && !this.draftOfferId) {
      this.enableForDraft = true;
    }
    let location: AddressResponse = this.sharedService.offerDefaultAddressChange.getValue();
    location = location && Object.keys(location).length ? location : null;
    if(location) {
      location.cityId = location.city || 'NA';
      location.countryId = location.country || 'NA';
      location.stateId = location.state || 'NA';
    }    
    console.log('Location value1232323::::', location);
    if(this.createOfferForm.contains('images')) {
      this.createOfferForm.get("images").setValue(images, { emitEvent: false });
    }  
    if(this.createOfferForm.contains('videos')) {
      this.createOfferForm.get("videos").setValue(videos, { emitEvent: false });
    }   
    this.createOfferForm
      .get("location")
      .setValue(location, { emitEvent: false });
  }

  public previewDocument(doc: any): void {
    this.httpService.previewOfferDocument(doc).subscribe(results => {
      FileSaver.saveAs(results, doc.orgName);
    });
  }

  canDeactivate() {
    if (this.isBackButtonPressed) {
      this.isBackButtonPressed = false;
      return false;
    }
    const images = this.sharedService.offerMedia.getValue();
    if (images.length > 0 && !this.draftOfferId) {
      this.enableForDraft = true;
    }
    const videos = this.sharedService.offerVideoMedia.getValue();
    if(videos.length > 0 && !this.draftOfferId) {
      this.enableForDraft = true;
    }
    const currentCategoryId: string = this.offerService.getCurrentNodeCategoryId() || "3";
    if(this.oldCategoryId !== currentCategoryId && !this.enableForDraft) {
      this.enableForDraft = true;
    }
    if(this.isPostOffer || !this.enableForDraft || this.isResetForm) {
      return true;
    }
    this.isDraftOffer = false;
    this.addDynamicOfferRequestControls();
    this.loadingScreenService.startLoading();
    if (this.draftOfferId && this.isOfferEdit) {
      this.createOfferForm.addControl(
        'offerId',
        this.formBuilder.control(this.draftOfferId)
      );
      if (this.isItem()) {
        // this.gtag.event(GtagAction.update_draft_item, {
        //   event_category: GtagCategory.offer,
        //   event_label: this.createOfferForm.controls.name.value
        // });
        return this.offerService.updateDraftOffer(this.createOfferForm.value).pipe(map(() => true));
      } else {
        // this.gtag.event(GtagAction.update_draft_service, {
        //   event_category: GtagCategory.offer,
        //   event_label: this.createOfferForm.controls.name.value
        // });
        return this.offerService.updateServiceOffer(this.createOfferForm.value).pipe(map(() => true));
      }
    } else {
      if (this.isItem()) {
        // this.gtag.event(GtagAction.create_draft_item, {
        //   event_category: GtagCategory.offer,
        //   event_label: this.createOfferForm.controls.name.value
        // });
        return this.offerService.createDraftOffer(this.createOfferForm.value).pipe(map(() => true));
      } else  {
        // this.gtag.event(GtagAction.create_draft_service, {
        //   event_category: GtagCategory.offer,
        //   event_label: this.createOfferForm.controls.name.value
        // });
        return this.offerService.createServiceOffer(this.createOfferForm.value).pipe(map(() => true));
      }
    }
  }

  // @HostListener('window:beforeunload', ['$event'])
  // doSomething($event: any) {
  //   if (this.canDeactivate()) {
  //     //return true;
  //     $event.returnValue = "This message is displayed to the user in IE and Edge when they navigate without using Angular routing (type another URL/close the browser/etc)";
  // }
  //   //return this.offerService.createDraftOffer(this.createOfferForm.value).pipe(map(() => true))
  // }

  ngOnDestroy() {
    this.sharedService.offerMedia.next([]);
    this.sharedService.offerMedia.complete();
    this.sharedService.offerVideoMedia.next([]);
    this.sharedService.offerVideoMedia.complete();
  }
}
