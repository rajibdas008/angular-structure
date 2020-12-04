import { ImageResponse } from './ImageResponse';

export class AddressResponse {
    addressId?: string;
    addressLine?: string;
    lat?: number;
    lng?: number;
    flatNo?: string;
    landmark?: string;
    area?: string;
    annotation?: string;
    zip?: string;
    city?: string;
    state?: string;
    country?: string;
    cityId?: string;
    stateId?: string;
    countryId?: string;
    default?: boolean;
}

export class ProfileIncomplete {
    openModalVal?: string;
    source?: string;
    fields?: string[];
    emailTransactionId?: string;
    mobileTransactionId?: string;
    email?: string;
    phone?: string;
    chatOwner?: boolean;
}

export class UserProfileResponse {
    chatUUID: string;
    profileId: string;
    userId: string;
    name: string;
    email: string;
    lastUpdatedEmail: string;
    mblNo: string;
    mobile: string;
    lastUpdatedMobile: string;
    dob: string;
    age: string;
    gender: string;
    emailVerified: boolean;
    mobileVerified: boolean;
    userVerified?: boolean;
    images: ImageResponse[];
    address: AddressResponse[];
    profileComplete: string;
    displayName: string;
    profileCompletionScore?: number;

    constructor() {
        this.emailVerified = false;
        this.mobileVerified = false;
    }
}
