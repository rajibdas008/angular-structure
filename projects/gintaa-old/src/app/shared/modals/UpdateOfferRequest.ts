import {ImageModificationRequest} from './ImageModificationRequest';
import {TagModificationRequest} from './TagModificationRequest';

export class UpdateOfferRequest {
    itemName: string;
    itemDescription?: string;
    itemCondition?: string;
    barterType?: string;
    itemSpecification?: string;
    location?: string;
    tags?: TagModificationRequest;
    categoryId?: number;
    model?: string;
    manufacturer?: string;
    profileId?: string;
    images?: ImageModificationRequest;
    offerId?: string;
    hiddenPeriod?: any;
}
