import { ImageModificationRequest } from './ImageModificationRequest';

class AddressRequest {
    addressLine: string;
    lat: number;
    lng: number;
    flatNo: string;
    landmark: string;
    area: string;
    annotation: string;
    zip: string;
    city: string;
    state: string;
    country: string;
}

export class UserProfileUpdateRequest {
    userId: string;
    // firstName: string;
    // lastName: string;
    name: string;
    email: string;
    mblNo: string;
    mobile: string;
    dob: string;
    age: string;
    gender: string;
    images: ImageModificationRequest[];
    address: AddressRequest[];
    lastUpdatedEmail: string;
    lastUpdatedMobile: string;
}
