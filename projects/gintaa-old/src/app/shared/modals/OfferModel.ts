import { OfferUser } from './OfferUser';

export interface Offer {
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
  currentUserOfferOwner?: boolean;
  condition?: string;
  documents?: any;
  images?: any;
  location?: any;
  offervalue?: string;
  category?: any;
  facets?: any[];
  availableDays?: string[];
  startTime?: string;
  endTime?: string;
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  videos?: any;
  seOId?: string;
  user?: OfferUser;
}

export interface UserOffer {
  Item?: Offer[];
  Service?: Offer[];
}
