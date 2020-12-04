import {ImageResponse} from './ImageResponse';

export class OfferResponse {
    itemName: string;
    itemDescription?: string;
    itemCondition?: string;
    barterType?: string;
    itemSpecification?: string;
    location?: string;
    tags?: string[];
    categoryId?: number;
    model?: string;
    manufacturer?: string;
    profileId?: string;
    images?: ImageResponse[];
    offerId?: string;
    hiddenPeriod?: any;
}
