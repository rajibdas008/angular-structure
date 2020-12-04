import { Component, OnInit, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import {
  DealStateData, InjectDialogData, DealResponseErrorObj,
  SaveRatingRequestObject, RatingContext
} from '@gintaa/shared/modals';
import { DealService } from '@gintaa/shared/services/deal.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {

  @Input() data: InjectDialogData;
  @Output() dialogClosed = new EventEmitter<any>();
  @Output() showUserRating = new EventEmitter<DealStateData>();

  logConsole = true;
  debugMode = false;

  userStatus = 'offline';
  defaultImage = 'assets/images/no-image.svg';

  userFullName: string;
  userOneProfileImage: string;
  userTwoProfileImage: string;
  currentUserId: string;

  ratingContexts: RatingContext[] = [];
  ratingConfig = {
    value: '1',
    totalstars: '5',
    checkedcolor: 'red',
    uncheckedcolor: 'black',
    size: '55px',
    readonly: false,
  };

  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };

  constructor(
    private dealService: DealService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const loggedUser = localStorage.getItem('user');
      if (loggedUser) {
        this.currentUserId =  (JSON.parse(loggedUser).userId) ? JSON.parse(loggedUser).userId : null;
      }
    }
  }

  ngOnInit() {
    // setting test data [if in debugMode]
    this.setDebugPoints();

    if (this.data && this.data.dealId) {
      this.setInitialDetails();
      this.getRatingsConfig();
    }
  }

  setInitialDetails() {
    // setting user's image and status
    this.dealService.getDealDetails(this.data.dealId).subscribe((response: any) => {
      console.log('[DEAL DETAILS]', response.payload);
      if (response.payload) {
        this.userOneProfileImage = (response.payload.receiver.imageUrl) ? response.payload.receiver.imageUrl : this.defaultImage;
        this.userTwoProfileImage = (response.payload.sender.imageUrl) ? response.payload.sender.imageUrl : this.defaultImage;
        if (this.currentUserId === response.payload.sender.id) {
          this.userFullName = response.payload.receiver.name;
        } else {
          this.userFullName = response.payload.sender.name;
        }
      }
    }, error => {
      if (error && error.error) {
        this.setErrorObject(error.error);
      }
    });
  }

  getRatingsConfig() {
    this.dealService.getRatingConfig().subscribe((response: any) => {
      console.log(response);
      if (response.payload && response.code === 200) {
        response.payload.forEach(context => {
          this.ratingContexts.push({
            ...context,
            selectedRating: 1,
            questions: [],
          });
        });
      }
    }, error => {
      if (error && error.error) {
        this.setErrorObject(error.error);
      }
    });
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent}, contextId: string) {
    console.log(`[DEAL RATING] New Value: ${$event.newValue} - ${contextId}`);
    this.resetErrorObject();
    this.dealService.getQuestionsForRatingContext(contextId, $event.newValue)
      .subscribe((response: any) => {
        if (response && response.code === 200) {
          // TODO - reset the object is nothing comes
          if (response.payload.length === 0) {
            this.resetRatingAnswers(contextId);
          }

          response.payload.forEach((context, index) => {
            console.log('[QUESTIONS]', context);
            const selectedContextId = context.contextId;

            // reset questions first
            this.ratingContexts[index].questions = [];
            this.ratingContexts[index].selectedRating = $event.newValue;

            this.ratingContexts.forEach((ratingContext) => {
              if (ratingContext.contextId === selectedContextId) {
                // by default all the answers will be in not selected state
                // pushing false
                const allFalseArray = [];
                context.options.forEach(element => {
                  allFalseArray.push(false);
                });

                this.ratingContexts[index].questions.push({
                  ...context,
                  answer: '',
                  answerCharLeft: context.answerCharLimit,
                  selectedOptions: [...allFalseArray],
                });
              }
            });
          });
        }

        console.log('[ratingContexts]', this.ratingContexts);
      });
  }

  resetRatingAnswers(contextId: string) {
    this.ratingContexts.forEach((ratingContext, index) => {
      if (ratingContext.contextId === contextId) {
        this.ratingContexts[index].questions = [];
      }
    });
  }

  setDebugPoints() {
    if (this.debugMode === true) {
      console.log('%c ALERT!! YOU ARE USING THIS IN DEBUG MODE.. ', 'background: #D32F2F; color: #FFCDD2');
      if (!this.data) {
        this.data = {
          dealId: 'c6e2f0a9-4cbe-495d-a4c3-5c95a98ba07f',
          user: null,
          myOffers: null,
          currentOffer: null
        };
      } else if (!this.data || !this.data.dealId) {
        this.data.dealId = 'c6e2f0a9-4cbe-495d-a4c3-5c95a98ba07f';
      }
    }
  }

  onDialogClose() {
    if (this.logConsole) { console.log('[emitted] onDialogClose'); }
    this.dialogClosed.emit();
  }

  setErrorObject(error: DealResponseErrorObj) {
    console.log('[DEAL RATING] error:', error);
    let errorMsg = error.message;
    if (!error.message) {
      if (error.payload[0]) {
        errorMsg = error.payload[0].errorDetailedReason;
      } else if (error.payload.errorDetailedReason) {
        errorMsg = error.payload.errorDetailedReason;
      } else {
        errorMsg = 'Error occurd while fetching deal details';
      }
    }
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: true,
      code: error.code,
      message: errorMsg
    };
  }

  resetErrorObject() {
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: false,
      code: 200,
      message: ''
    };
  }

  saveUserRating() {
    console.log('[RATING OBJ]', this.ratingContexts);

    // discrepency in comment post API
    this.ratingContexts.forEach(context => {
      if (context.ratingId) {
        const requestBody: SaveRatingRequestObject = {
          contextId: context.contextId,
          resourceId: this.data.dealId,
          rating: context.selectedRating,
          questionCommentsAndAnswers: [],
        };
        context.questions.forEach(questions => {

          // adding selected answers
          const answersArray = [];
          questions.selectedOptions.forEach((ans, index) => {
            if (ans) {
              answersArray.push(questions.options[index]);
            }
          });

          requestBody.questionCommentsAndAnswers.push({
            comments: questions.answer,
            questionId: questions.questionId,
            answers: answersArray,
          });
        });

        this.dealService.saveDealUserRating(requestBody)
          .subscribe((response: any) => {
            console.log('[DEAL REVIEW SAVED]', response);
            if (response.status === 200) {
              // NOTE: we should not close the POPUP here
              // as there can be multiple calls as of now
              this.onDialogClose();
            }
          }, error => {
            if (error && error.error) {
              this.setErrorObject(error.error);
            }
          });
      }
    });
  }

}
