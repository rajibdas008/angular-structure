import { InitiateDealRequestObject, DealUpdateReqFormat } from '@gintaa/shared/modals';

export const dealServiceMockData = {
    initiateDeal: {
        reqPayload: {
            amountCurrency: 'INR',
            comments: 'this is a test comment',
            dealRefNo: '12345678',
            destinationOfferDetails: [],
            dropToGintaaJunction: false,
            expiryDate: '2020-01-01',
            gintaaJunctionId: '',
            includeInsurance: true,
            includeShipping: false,
            requestedAmount: 1200,
            sourceOfferDetails: [],
        },
        mockSuccessResponse: {
            success: true,
            code: 200,
            message: 'Done Successfully',
            payload: null
        },
        mockErrorResponse: {},
    },
};
