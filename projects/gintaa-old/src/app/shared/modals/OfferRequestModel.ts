import {ImageModel} from './ImageModel';

export class OfferRequestModel {
    itemName: string;
    itemDescription?: string;
    itemCondition?: string;
    barterType?: string;
    itemSpecification?: string;
    location?: string;
    offerTags?: string[];
    categoryId?: number;
    model?: string;
    manufacturer?: string;
    profileId?: string;
    offerImages?: ImageModel[];
    offerId?: string;
    hiddenPeriod?: any;
}
