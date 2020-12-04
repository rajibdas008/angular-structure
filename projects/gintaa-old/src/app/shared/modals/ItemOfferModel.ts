import { UploadRequest } from './UploadRequest';
import { OfferUser } from './OfferUser';

export class ItemOffer {
  offerType: string;
  draftOfferId?: string;
  // added offerId because of API issue, need to remove later
  offerId?: string;
  name?: string;
  totalOfferValuation?: string;
  unitOfferValuation?: string;
  description?: string;
  itemCondition?: string;
  desire?: string;
  exchangeMode?: string;
  quantity?: number;
  activeSince?: string;
  documents?: any;
  images?: any;
  location?: any;
  offervalue?: string;
  facets?: any[];
  categoryId?: string;
  videos?: any;
  seOId?: string;
  user?: OfferUser;

  constructor() {
    this.offerType = 'Item';
  }
}
