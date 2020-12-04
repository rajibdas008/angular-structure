export interface DealStateData {
    sourcePage: string;
    status: string;
    dealId?: string;
}

export interface DealDialogState {
    dealInitiated: boolean;
}

export interface DealInjectOffer {
    offerId: string;
    offerType: string;
    quantity: number;
    name: string;
    image: string;
    description: string;
    selected?: boolean;
    selectedCount?: number;
}

export interface DealCurrentUserInfo {
    name: string;
    image: string;
    id: string;
    isOnline: boolean;
}

export interface InjectDialogData {
    user: {
      name: string,
      image: string,
      id: string,
      isOnline: boolean
    };
    myOffers: DealInjectOffer[];
    currentOffer: DealInjectOffer;
    dealId?: string;
}

export interface InitiateDealRequestObject {
    amountCurrency?: string;
    comments?: string;
    dealRefNo?: string;
    destinationOfferDetails?: Array<any>;
    dropToGintaaJunction?: boolean;
    expiryDate?: string;
    gintaaJunctionId?: string;
    meetingDate?: string;
    meetingStartTime?: string;
    meetingEndTime?: string;
    includeInsurance?: boolean;
    includeShipping?: boolean;
    requestedAmount?: number;
    sourceOfferDetails: Array<any>;
}

export interface DealResponseErrorObj {
    showError: boolean;
    code: number;
    message: string;
    success: boolean;
    payload?: Array<any> | any;
}

export interface DealUpdateReqFormat {
    comments?: string;
    dealRefId: string;
}

export interface DealDetailsOfferImage {
    displayIndex: string;
    id: string;
    name: string;
    orgName: string;
    url: string;
}

export interface DealDetailsOffer {
    images: DealDetailsOfferImage[];
    offerCount: number;
    offerId: string;
    offerName: string;
    offerType: string;
}

interface GintaaJunctionContactInfo {
    phoneNumbers: string[];
}

interface JunctionDetailsView {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    openTime: string;
    closeTime: string;
    contactInformation?: GintaaJunctionContactInfo;
    currentState?: string;
    imageURLs?: string[];
    [key: string]: any;
}

export interface DealDetailsFormat {
    amountCurrency?: string;
    dealRefId: string;
    dealSentTimeStamp: string;
    dealStatus: {
        dealStatus: string,
        dealStatusDesc: string
    };
    partiallyClosedBy?: string;
    dropToGintaaJunction?: boolean;
    includeInsurance?: boolean;
    includeShipping?: boolean;
    junctionDetailsView?: JunctionDetailsView;
    junctionView?: JunctionDetailsView; // DUPLICATE as backend changed the format later
    meetingDate?: string;
    meetingEndTime?: string;
    meetingStartTime?: string;
    offeredOffers?: DealDetailsOffer[];
    receiver: {
        imageUrl: string,
        name: string
    };
    requestedAmount?: number;
    requestedOffers?: DealDetailsOffer[];
    sender: {
        imageUrl: string,
        name: string
    };
    expiryDatetime?: string;
    comments?: string;
    requestedUpdate?: boolean;
    requestedUpdateComment?: string;
    defaultDeliveryOption?: {
        doorStepDelivery: boolean,
        gintaJunction: boolean,
        selfPickup: boolean,
    };
    offeredAmount?: number;
}

export interface DealSnapshotTransaction {
    status: string;
    datetime: string;
    amount: number;
    comments?: string;
}

export interface DealSnapshot {
    dealRefId: string;
    sender: string;
    receiver: string;
    junctionDetails?: Array<any>;
    dealCreationTimestamp: string;
    transactionStates: DealSnapshotTransaction[];
}

export interface GintaaJunction {
    id: string;
    name: string;
    address: string;
    imageUrl: string; // need to remove
    imageURLs?: string[];
    latitude: any;
    longitude: any;
    contactInformation?: GintaaJunctionContactInfo;
    openTime?: string;
    closeTime?: string;
    currentState?: string;
    distance?: any;
    [key: string]: any;
}

export interface DealResponseHttp {
    success?: boolean;
    code?: number;
    message?: string;
    payload?: any;
    error?: any;
    [key: string]: any;
}

export interface CurrentLocation {
    available?: boolean;
    _lat: string;
    _lng: string;
}

export interface AGMMapMarker {
    id?: string;
    lat: string;
    lng: string;
    label: string;
    draggable?: boolean;
    name?: string;
}
