export class AddOfferRequest {
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
    images?: string[];
    offerId?: string;
    hiddenPeriod?: any;
}
