import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Offer, SocialShare } from '@gintaa/shared/modals';
import { environment } from '@gintaa/env';

@Injectable({
    providedIn: 'root'
})

export class SocialService {
    private socialShare: Subject<SocialShare> = new Subject<SocialShare>();
    socialShare$: Observable<SocialShare> = this.socialShare.asObservable();

    constructor() {   }    

    getSocialDetail(offerDetail: Offer): SocialShare {
        const socialShare = {} as SocialShare;
        socialShare.shareUrl = this.getShareUrl(offerDetail);
        const imgUrl = this.getImageUrl(offerDetail);
        if (imgUrl) {
          socialShare.imageUrl = imgUrl;
        }
        socialShare.description = offerDetail.description;
        socialShare.title = offerDetail.name;
        return socialShare;
    }

    prepareSocialDetail(offerDetail: Offer) {
        const socialShare = this.getSocialDetail(offerDetail);
        this.socialShare.next(socialShare);
    }

    private getImageUrl(offerDetail: Offer): string {
        return offerDetail.images && offerDetail.images.length ? offerDetail.images[0].url : '';
    }

    private getShareUrl(offerDetail: Offer): string {
        return `${environment.WEBSITE_URL}/offer-details/share/${offerDetail.seOId}`;
    }
}
