export interface OfferStat {
    // firstCreationDate: string;
    // lastCreationDate?: string;
    // totalDraftOffers: number;
    // totalCreatedOffers: number;
    // totalLiveOffers: number;
    // totalRejectedOffers: number;
    // totalCompletedOffers: number;
    // totalOffersInDeal: number;
    // totalOffers: number;
    adminReviewPendingOfferCounts: number;
    draftOfferCounts: number;
    failedOfferCounts: number;
    newOfferCounts: number;
    publishedOfferCounts: number; 
}

export interface OfferDealStat {
    acceptedDeals: number;
    cancelledDeals: number;
    closedDeals: number;
    onGoingReceivedOffers: number;
    onGoingSentOffers: number;
    receivedDeals: number;
    rejectedDeals: number;
    sentDeals: number;
}