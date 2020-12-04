import {ImageModel} from "./ImageModel";

class AddressModel {
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

export  class UserProfileModel {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    mblNo: string;
    mobile: string;
    dob: string;
    age: string;
    sex: string;
    images: ImageModel[];
    address: AddressModel[]
}
