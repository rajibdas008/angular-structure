import { OfferUser } from './OfferUser';

export class ServiceOffer {
  offerType: string;
  draftOfferId?: string;
  // added offerId because of API issue, need to remove later
  offerId?: string;
  name?: string;
  totalOfferValuation?: string;
  unitOfferValuation?: string;
  description?: string;
  desire?: string;
  exchangeMode?: string;
  documents?: any;
  images?: any;
  location?: any;
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  availableDays?: string[];
  itemCondition?: string;
  activeSince?: string;
  offervalue?: string;
  facets?: any[];
  categoryId?: string;
  videos?: any;
  seOId?: string;
  user?: OfferUser;

  constructor() {
    this.offerType = 'Service';
  }
}
