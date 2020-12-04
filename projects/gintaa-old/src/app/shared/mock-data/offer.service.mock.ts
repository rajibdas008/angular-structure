export const offerServiceMockData = {
    getLoginUserPostedOffer: {
        requestData: {
            params:"?page=1&size=10",
            token: "eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..2lWrw3IiJFi_eJ8dySsDcA.L6fAGPuxELtdG4pcZv43Gj1nZ2JnmKIUKs_SIUHLJzZbCyIjywqtEe24Izp6fEaadD3b8sItQqrvYVXxsa7qqCZV26RziSuW37wesWr1FBpp8Finb_Ac8pvx5Tg4A4BEAaPpDEX6O23gQXD5gh0E5KRoYcbQHj71fv4v5XZsih_HH9JagumwC8JSb7MuPu9c.rdoniVBsZL2GVbuGSY-1zQ"
          },
        responseData: {
            successRes:{
                success: true,
                code: 200,
                message: "All offers fetched successfully",
                payload: []
            },
            errorRes: {
                "success": false,
                "code": 500,
                "message": "Gintaa internal server occurred",
                "payload": null
            }
        }
    },
    getAllRecentOffers: {
        requestData: {
            params:"?page=1&size=10"
          },
        responseData: {
            successRes:{
                "success": true,
                "code": 200,
                "message": "All offers fetched successfully",
                "payload": [
                    {
                        "offerId": "1594731953787",
                        "seOId": "nikon-camera-dslr-d5300-oid-1594731953787",
                        "name": "Nikon Camera dslr d5300",
                        "description": "Image quality, connectivity and creative control come together in this lightweight, full-featured DX-format DSLR. The new EXPEED 4 is our fastest image processor to date and complements the 24.2-megapixel CMOS. With its 39-point autofocus, improved white balance and wide sensitivity range, the D5300 lets you shoot stunning photos and Full HD movies. It’s our first DSLR to feature a built-in Wi-Fi®, so you can instantly transfer your photos*. Its GPS function saves location information to your images. A crystal-clear 3.2-inch LCD vari-angle monitor lets you shoot at any angle. With so many innovative features, the D5300 adds new dimensions to photography.",
                        "desire": "Bike",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 22.4661325,
                            "lng": 88.4051064,
                            "zip": "700029",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "Garia",
                            "districtId": "",
                            "stateId": "West Bengal",
                            "countryId": "",
                            "annotation": "Home",
                            "addressLine": "Garia"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "36c71f89-a382-4608-880d-830ec42d4a28",
                            "type": "Item",
                            "label": "Electronics & Home Appliances10",
                            "description": "Electronics & Home Appliances10",
                            "leafNode": false,
                            "breadcrumbs": [
                                "Electronics & Home Appliances10"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "36c71f89-a382-4608-880d-830ec42d4a28",
                                    "label": "Electronics & Home Appliances10"
                                }
                            ],
                            "tags": [],
                            "vertical": null,
                            "synonyms": [
                                "Electronics",
                                "Home Appliances",
                                "Device",
                                "Machine",
                                "Piece of equipment"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1593610562741.jpg",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Electronics-Home-Appliances10_36c71f89-a382-4608-880d-830ec42d4a28",
                            "url": null
                        },
                        "totalOfferValuation": 7500,
                        "unitOfferValuation": 750,
                        "images": [
                            {
                                "id": null,
                                "name": "1594731953851.jpg",
                                "orgName": "17.jpg",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/I/36c71f89-a382-4608-880d-830ec42d4a28/2020/7/14/1594731953787/nikon-camera-dslr-d5300-oid-1594731953787-GINIOF-e5a041d3-b717-4582-81b1-9b0fc3a8b6da-1.jpg1594731953851.jpg",
                                "keywords": null,
                                "displayIndex": "1"
                            }
                        ],
                        "videos": [
                            {
                                "id": null,
                                "name": "1594731954038.mp4",
                                "orgName": "SampleVideo_1280x720_1mb.mp4",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/I/36c71f89-a382-4608-880d-830ec42d4a28/2020/7/14/1594731953787/nikon-camera-dslr-d5300-oid-1594731953787-GINIOF-7fe10c7c-1136-461e-b018-54b8cd43dd6d-1.mp41594731954038.mp4",
                                "displayIndex": "1"
                            }
                        ],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "Today",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": "Brand",
                                "values": [
                                    "Nikon"
                                ]
                            },
                            {
                                "name": "Sensor",
                                "label": "Sensor",
                                "values": [
                                    "CMOS"
                                ]
                            },
                            {
                                "name": "Mega Pixel",
                                "label": "Mega Pixel",
                                "values": [
                                    "64"
                                ]
                            },
                            {
                                "name": "Color",
                                "label": "Color",
                                "values": [
                                    "Red"
                                ]
                            },
                            {
                                "name": "Viewfinder",
                                "label": "Viewfinder",
                                "values": [
                                    "Pentaprism"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f070e2b48f77f7169d9eab8",
                            "fName": "Lipan",
                            "lName": "Biswas"
                        },
                        "currentUserOfferOwner": false,
                        "quantity": 10,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594722647316",
                        "seOId": "motor-bike-service-oid-1594722647316",
                        "name": "Motor bike service",
                        "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
                        "desire": "2 wheels 1 handle and no oil",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 0,
                            "lng": 0,
                            "zip": "743297",
                            "regionId": "string",
                            "subregionId": "string",
                            "cityId": "string",
                            "districtId": "string",
                            "stateId": "string",
                            "countryId": "string",
                            "annotation": "string",
                            "addressLine": "string"
                        },
                        "offerType": "Service",
                        "category": {
                            "categoryId": null,
                            "type": null,
                            "label": null,
                            "description": null,
                            "leafNode": null,
                            "breadcrumbs": [],
                            "hierarchy": [],
                            "tags": [],
                            "vertical": null,
                            "synonyms": [],
                            "imagePath": null,
                            "fullSearchScore": null,
                            "completionSearchScore": null,
                            "seoId": null,
                            "url": null
                        },
                        "totalOfferValuation": 0,
                        "unitOfferValuation": 0,
                        "images": [
                            {
                                "id": null,
                                "name": "1594722647387.jpg",
                                "orgName": "17.jpg",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/S/string/2020/7/14/1594722647316/motor-bike-service-oid-1594722647316-GINIOF-562175ca-ffd8-4372-a2b2-ff3126c1a137-1.jpg1594722647387.jpg",
                                "keywords": null,
                                "displayIndex": "1"
                            }
                        ],
                        "videos": [
                            {
                                "id": null,
                                "name": "1594722647641.mp4",
                                "orgName": "SampleVideo_1280x720_1mb.mp4",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/S/string/2020/7/14/1594722647316/motor-bike-service-oid-1594722647316-GINIOF-3c42b7a1-e35d-447f-9c50-780cac36b4c5-1.mp41594722647641.mp4",
                                "displayIndex": "1"
                            }
                        ],
                        "documents": [
                            {
                                "id": null,
                                "name": "1594722647852.pdf",
                                "orgName": "Offer.pdf",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/S/string/2020/7/14/1594722647316/motor-bike-service-oid-1594722647316-GINIOF-2eaee3f5-ee3b-4282-8b15-95d2cf88dd2f-1.pdf1594722647852.pdf",
                                "displayIndex": "1"
                            }
                        ],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "Today",
                        "facets": null,
                        "user": {
                            "profileId": "5f070e2b48f77f7169d9eab8",
                            "fName": "Lipan",
                            "lName": "Biswas"
                        },
                        "currentUserOfferOwner": false,
                        "startTime": "12:00:00",
                        "endTime": "23:56:00",
                        "startDate": "04-05-2020",
                        "endDate": "04-04-2021",
                        "availableDays": [
                            "SUNDAY"
                        ]
                    },
                    {
                        "offerId": "1594722286462",
                        "seOId": "nikon-camera-dslr-d5300-oid-1594722286462",
                        "name": "Nikon Camera dslr d5300",
                        "description": "Image quality, connectivity and creative control come together in this lightweight, full-featured DX-format DSLR. The new EXPEED 4 is our fastest image processor to date and complements the 24.2-megapixel CMOS. With its 39-point autofocus, improved white balance and wide sensitivity range, the D5300 lets you shoot stunning photos and Full HD movies. It’s our first DSLR to feature a built-in Wi-Fi®, so you can instantly transfer your photos*. Its GPS function saves location information to your images. A crystal-clear 3.2-inch LCD vari-angle monitor lets you shoot at any angle. With so many innovative features, the D5300 adds new dimensions to photography.",
                        "desire": "Bike",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 22.4661325,
                            "lng": 88.4051064,
                            "zip": "700029",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "Garia",
                            "districtId": "",
                            "stateId": "West Bengal",
                            "countryId": "",
                            "annotation": "Home",
                            "addressLine": "Garia"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "36c71f89-a382-4608-880d-830ec42d4a28",
                            "type": "Item",
                            "label": "Electronics & Home Appliances10",
                            "description": "Electronics & Home Appliances10",
                            "leafNode": false,
                            "breadcrumbs": [
                                "Electronics & Home Appliances10"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "36c71f89-a382-4608-880d-830ec42d4a28",
                                    "label": "Electronics & Home Appliances10"
                                }
                            ],
                            "tags": [],
                            "vertical": null,
                            "synonyms": [
                                "Electronics",
                                "Home Appliances",
                                "Device",
                                "Machine",
                                "Piece of equipment"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1593610562741.jpg",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Electronics-Home-Appliances10_36c71f89-a382-4608-880d-830ec42d4a28",
                            "url": null
                        },
                        "totalOfferValuation": 7500,
                        "unitOfferValuation": 750,
                        "images": [
                            {
                                "id": null,
                                "name": "1594722286560.jpg",
                                "orgName": "17.jpg",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/I/36c71f89-a382-4608-880d-830ec42d4a28/2020/7/14/1594722286462/nikon-camera-dslr-d5300-oid-1594722286462-GINIOF-f73c1ff8-846e-46b3-9668-eeec89b0ab9f-1.jpg1594722286560.jpg",
                                "keywords": null,
                                "displayIndex": "1"
                            }
                        ],
                        "videos": [
                            {
                                "id": null,
                                "name": "1594722286805.mp4",
                                "orgName": "SampleVideo_1280x720_1mb.mp4",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/I/36c71f89-a382-4608-880d-830ec42d4a28/2020/7/14/1594722286462/nikon-camera-dslr-d5300-oid-1594722286462-GINIOF-c90b93c5-9b55-4eb0-add0-77742c01aa71-1.mp41594722286805.mp4",
                                "displayIndex": "1"
                            }
                        ],
                        "documents": [
                            {
                                "id": null,
                                "name": "1594722286973.pdf",
                                "orgName": "Offer.pdf",
                                "url": "https://gintaa-dev.s3.ap-south-1.amazonaws.com/I/36c71f89-a382-4608-880d-830ec42d4a28/2020/7/14/1594722286462/nikon-camera-dslr-d5300-oid-1594722286462-GINIOF-7f5cd753-c228-47f9-be18-95d8e4c93cf5-1.pdf1594722286973.pdf",
                                "displayIndex": "1"
                            }
                        ],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "Today",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": "Brand",
                                "values": [
                                    "Nikon"
                                ]
                            },
                            {
                                "name": "Sensor",
                                "label": "Sensor",
                                "values": [
                                    "CMOS"
                                ]
                            },
                            {
                                "name": "Mega Pixel",
                                "label": "Mega Pixel",
                                "values": [
                                    "64"
                                ]
                            },
                            {
                                "name": "Color",
                                "label": "Color",
                                "values": [
                                    "Red"
                                ]
                            },
                            {
                                "name": "Viewfinder",
                                "label": "Viewfinder",
                                "values": [
                                    "Pentaprism"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f070e2b48f77f7169d9eab8",
                            "fName": "Lipan",
                            "lName": "Biswas"
                        },
                        "currentUserOfferOwner": false,
                        "quantity": 10,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594706736341",
                        "seOId": "redmi-note-3-oid-1594706736341",
                        "name": "Redmi Note 3",
                        "description": "Good condition mobile , only battery is damaged,rest is fine.Sorry i forgot to mention that the screen is also broken and the speaker also sometimes does not work mind it sometimes oo and yes i warranty is expired and I alos lost the headphone and charger of the mobile.Thanks for Buying",
                        "desire": "New IPhone",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 23.45,
                            "lng": 23.45,
                            "zip": "700118",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "",
                            "districtId": "",
                            "stateId": "",
                            "countryId": "",
                            "annotation": "home",
                            "addressLine": "Rahara"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "type": "Item",
                            "label": "Used Mobile",
                            "description": "Used Mobile",
                            "leafNode": true,
                            "breadcrumbs": [
                                "Electronics & Appliances",
                                "Mobile",
                                "Used Mobile"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                    "label": "Electronics & Appliances"
                                },
                                {
                                    "categoryId": "33972d9f-86d3-4b56-95f6-e2b584b5da09",
                                    "label": "Mobile"
                                },
                                {
                                    "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                                    "label": "Used Mobile"
                                }
                            ],
                            "tags": [
                                {
                                    "tagId": "fae9d3ae-244e-46f5-ad77-3a02d5a48d29",
                                    "name": null,
                                    "description": null,
                                    "label": "RAM",
                                    "values": [
                                        "2GB",
                                        "4GB",
                                        "6GB",
                                        "8GB",
                                        "16GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "5d35b7b6-05e9-472f-9fda-516f47e67de0",
                                    "name": null,
                                    "description": null,
                                    "label": "Brand",
                                    "values": [
                                        "Apple",
                                        "Google",
                                        "Samsung",
                                        "Xiomi",
                                        "Oppo",
                                        "One plus 7",
                                        "Redmi",
                                        "Realme"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "a4d400a5-6ef1-406e-97e2-8a901b76ff25",
                                    "name": null,
                                    "description": null,
                                    "label": "Internal Storage",
                                    "values": [
                                        "32GB",
                                        "64GB",
                                        "128GB",
                                        "256GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "3dbd4479-3c98-4b7e-ba14-9abcbdc68558",
                                    "name": null,
                                    "description": null,
                                    "label": "Battery Capacity",
                                    "values": [
                                        "<1000mh",
                                        "1000mh-2000mh",
                                        "2000mh-3000mh",
                                        "3000mh-4000mh",
                                        "4000mh-5000mh"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "75b7c77f-1f73-427d-8836-ec2e113e0a9e",
                                    "name": null,
                                    "description": null,
                                    "label": "Operating System",
                                    "values": [
                                        "iOS",
                                        "Android",
                                        "Windows"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "11bd76bb-2ff4-4bfc-97a6-d5a85d686ec0",
                                    "name": null,
                                    "description": null,
                                    "label": "Screen Size",
                                    "values": [
                                        "<4inch",
                                        "4inch-5inch",
                                        "5inch-6inch",
                                        "6inhc>"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "189894b4-5a7e-444d-9d13-399c20006d40",
                                    "name": null,
                                    "description": null,
                                    "label": "Sim Type",
                                    "values": [
                                        "Nano",
                                        "Micro",
                                        "Normal"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "62f54c64-5a40-452c-9cbb-b2a0bfed9864",
                                    "name": null,
                                    "description": null,
                                    "label": "Primary Camera",
                                    "values": [
                                        "3MP",
                                        "5MP",
                                        "8MP",
                                        "12 MP",
                                        "48MP",
                                        "64MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "6ec73e52-0518-46f3-a6fb-fd8c831aaadd",
                                    "name": null,
                                    "description": null,
                                    "label": "Secondary Camera",
                                    "values": [
                                        "2MP",
                                        "5MP",
                                        "3MP",
                                        "8MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "9673a569-42d4-4f9c-9c8e-cf91f141a241",
                                    "name": null,
                                    "description": null,
                                    "label": "Connectivity",
                                    "values": [
                                        "3G",
                                        "4G",
                                        "2G",
                                        "5G"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "b8399c08-5e90-4450-96d5-73ce851bdb21",
                                    "name": null,
                                    "description": null,
                                    "label": "Colour",
                                    "values": [
                                        "BLACK",
                                        "WHTE",
                                        "BLUE",
                                        "RED",
                                        "YELLOW"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                }
                            ],
                            "vertical": {
                                "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                "label": "Electronics & Appliances"
                            },
                            "synonyms": [
                                "mobile",
                                "phone"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1589525140335.net-compress-image%20%281%29",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "url": "/Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4"
                        },
                        "totalOfferValuation": 10000,
                        "unitOfferValuation": 10000,
                        "images": [],
                        "videos": [],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "Today",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": null,
                                "values": [
                                    "Redmi"
                                ]
                            },
                            {
                                "name": "Colour",
                                "label": null,
                                "values": [
                                    "RED"
                                ]
                            },
                            {
                                "name": "Operating System",
                                "label": null,
                                "values": [
                                    "Android"
                                ]
                            },
                            {
                                "name": "Ram",
                                "label": null,
                                "values": [
                                    "2GB"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f0c2dad3938b613581405bd",
                            "fName": null,
                            "lName": null
                        },
                        "currentUserOfferOwner": false,
                        "quantity": null,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594705772407",
                        "seOId": "redmi-note-3-oid-1594705772407",
                        "name": "Redmi Note 3",
                        "description": "Good condition mobile , only battery is damaged,rest is fine.Sorry i forgot to mention that the screen is also broken and the speaker also sometimes does not work mind it sometimes oo and yes i warranty is expired and I alos lost the headphone and charger of the mobile.Thanks for Buying",
                        "desire": "New IPhone",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 23.45,
                            "lng": 23.45,
                            "zip": "700118",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "",
                            "districtId": "",
                            "stateId": "",
                            "countryId": "",
                            "annotation": "home",
                            "addressLine": "Rahara"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "type": "Item",
                            "label": "Used Mobile",
                            "description": "Used Mobile",
                            "leafNode": true,
                            "breadcrumbs": [
                                "Electronics & Appliances",
                                "Mobile",
                                "Used Mobile"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                    "label": "Electronics & Appliances"
                                },
                                {
                                    "categoryId": "33972d9f-86d3-4b56-95f6-e2b584b5da09",
                                    "label": "Mobile"
                                },
                                {
                                    "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                                    "label": "Used Mobile"
                                }
                            ],
                            "tags": [
                                {
                                    "tagId": "fae9d3ae-244e-46f5-ad77-3a02d5a48d29",
                                    "name": null,
                                    "description": null,
                                    "label": "RAM",
                                    "values": [
                                        "2GB",
                                        "4GB",
                                        "6GB",
                                        "8GB",
                                        "16GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "5d35b7b6-05e9-472f-9fda-516f47e67de0",
                                    "name": null,
                                    "description": null,
                                    "label": "Brand",
                                    "values": [
                                        "Apple",
                                        "Google",
                                        "Samsung",
                                        "Xiomi",
                                        "Oppo",
                                        "One plus 7",
                                        "Redmi",
                                        "Realme"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "a4d400a5-6ef1-406e-97e2-8a901b76ff25",
                                    "name": null,
                                    "description": null,
                                    "label": "Internal Storage",
                                    "values": [
                                        "32GB",
                                        "64GB",
                                        "128GB",
                                        "256GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "3dbd4479-3c98-4b7e-ba14-9abcbdc68558",
                                    "name": null,
                                    "description": null,
                                    "label": "Battery Capacity",
                                    "values": [
                                        "<1000mh",
                                        "1000mh-2000mh",
                                        "2000mh-3000mh",
                                        "3000mh-4000mh",
                                        "4000mh-5000mh"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "75b7c77f-1f73-427d-8836-ec2e113e0a9e",
                                    "name": null,
                                    "description": null,
                                    "label": "Operating System",
                                    "values": [
                                        "iOS",
                                        "Android",
                                        "Windows"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "11bd76bb-2ff4-4bfc-97a6-d5a85d686ec0",
                                    "name": null,
                                    "description": null,
                                    "label": "Screen Size",
                                    "values": [
                                        "<4inch",
                                        "4inch-5inch",
                                        "5inch-6inch",
                                        "6inhc>"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "189894b4-5a7e-444d-9d13-399c20006d40",
                                    "name": null,
                                    "description": null,
                                    "label": "Sim Type",
                                    "values": [
                                        "Nano",
                                        "Micro",
                                        "Normal"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "62f54c64-5a40-452c-9cbb-b2a0bfed9864",
                                    "name": null,
                                    "description": null,
                                    "label": "Primary Camera",
                                    "values": [
                                        "3MP",
                                        "5MP",
                                        "8MP",
                                        "12 MP",
                                        "48MP",
                                        "64MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "6ec73e52-0518-46f3-a6fb-fd8c831aaadd",
                                    "name": null,
                                    "description": null,
                                    "label": "Secondary Camera",
                                    "values": [
                                        "2MP",
                                        "5MP",
                                        "3MP",
                                        "8MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "9673a569-42d4-4f9c-9c8e-cf91f141a241",
                                    "name": null,
                                    "description": null,
                                    "label": "Connectivity",
                                    "values": [
                                        "3G",
                                        "4G",
                                        "2G",
                                        "5G"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "b8399c08-5e90-4450-96d5-73ce851bdb21",
                                    "name": null,
                                    "description": null,
                                    "label": "Colour",
                                    "values": [
                                        "BLACK",
                                        "WHTE",
                                        "BLUE",
                                        "RED",
                                        "YELLOW"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                }
                            ],
                            "vertical": {
                                "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                "label": "Electronics & Appliances"
                            },
                            "synonyms": [
                                "mobile",
                                "phone"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1589525140335.net-compress-image%20%281%29",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "url": "/Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4"
                        },
                        "totalOfferValuation": 10000,
                        "unitOfferValuation": 10000,
                        "images": [],
                        "videos": [],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "Today",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": null,
                                "values": [
                                    "Redmi"
                                ]
                            },
                            {
                                "name": "Colour",
                                "label": null,
                                "values": [
                                    "RED"
                                ]
                            },
                            {
                                "name": "Operating System",
                                "label": null,
                                "values": [
                                    "Android"
                                ]
                            },
                            {
                                "name": "Ram",
                                "label": null,
                                "values": [
                                    "2GB"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f0c2dad3938b613581405bd",
                            "fName": null,
                            "lName": null
                        },
                        "currentUserOfferOwner": false,
                        "quantity": null,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594703177738",
                        "seOId": "redmi-note-3-oid-1594703177738",
                        "name": "Redmi Note 3",
                        "description": "Good condition mobile , only battery is damaged,rest is fine.Sorry i forgot to mention that the screen is also broken and the speaker also sometimes does not work mind it sometimes oo and yes i warranty is expired and I alos lost the headphone and charger of the mobile.Thanks for Buying",
                        "desire": "New IPhone",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 23.45,
                            "lng": 23.45,
                            "zip": "700118",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "",
                            "districtId": "",
                            "stateId": "",
                            "countryId": "",
                            "annotation": "home",
                            "addressLine": "Rahara"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "type": "Item",
                            "label": "Used Mobile",
                            "description": "Used Mobile",
                            "leafNode": true,
                            "breadcrumbs": [
                                "Electronics & Appliances",
                                "Mobile",
                                "Used Mobile"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                    "label": "Electronics & Appliances"
                                },
                                {
                                    "categoryId": "33972d9f-86d3-4b56-95f6-e2b584b5da09",
                                    "label": "Mobile"
                                },
                                {
                                    "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                                    "label": "Used Mobile"
                                }
                            ],
                            "tags": [
                                {
                                    "tagId": "fae9d3ae-244e-46f5-ad77-3a02d5a48d29",
                                    "name": null,
                                    "description": null,
                                    "label": "RAM",
                                    "values": [
                                        "2GB",
                                        "4GB",
                                        "6GB",
                                        "8GB",
                                        "16GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "5d35b7b6-05e9-472f-9fda-516f47e67de0",
                                    "name": null,
                                    "description": null,
                                    "label": "Brand",
                                    "values": [
                                        "Apple",
                                        "Google",
                                        "Samsung",
                                        "Xiomi",
                                        "Oppo",
                                        "One plus 7",
                                        "Redmi",
                                        "Realme"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "a4d400a5-6ef1-406e-97e2-8a901b76ff25",
                                    "name": null,
                                    "description": null,
                                    "label": "Internal Storage",
                                    "values": [
                                        "32GB",
                                        "64GB",
                                        "128GB",
                                        "256GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "3dbd4479-3c98-4b7e-ba14-9abcbdc68558",
                                    "name": null,
                                    "description": null,
                                    "label": "Battery Capacity",
                                    "values": [
                                        "<1000mh",
                                        "1000mh-2000mh",
                                        "2000mh-3000mh",
                                        "3000mh-4000mh",
                                        "4000mh-5000mh"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "75b7c77f-1f73-427d-8836-ec2e113e0a9e",
                                    "name": null,
                                    "description": null,
                                    "label": "Operating System",
                                    "values": [
                                        "iOS",
                                        "Android",
                                        "Windows"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "11bd76bb-2ff4-4bfc-97a6-d5a85d686ec0",
                                    "name": null,
                                    "description": null,
                                    "label": "Screen Size",
                                    "values": [
                                        "<4inch",
                                        "4inch-5inch",
                                        "5inch-6inch",
                                        "6inhc>"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "189894b4-5a7e-444d-9d13-399c20006d40",
                                    "name": null,
                                    "description": null,
                                    "label": "Sim Type",
                                    "values": [
                                        "Nano",
                                        "Micro",
                                        "Normal"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "62f54c64-5a40-452c-9cbb-b2a0bfed9864",
                                    "name": null,
                                    "description": null,
                                    "label": "Primary Camera",
                                    "values": [
                                        "3MP",
                                        "5MP",
                                        "8MP",
                                        "12 MP",
                                        "48MP",
                                        "64MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "6ec73e52-0518-46f3-a6fb-fd8c831aaadd",
                                    "name": null,
                                    "description": null,
                                    "label": "Secondary Camera",
                                    "values": [
                                        "2MP",
                                        "5MP",
                                        "3MP",
                                        "8MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "9673a569-42d4-4f9c-9c8e-cf91f141a241",
                                    "name": null,
                                    "description": null,
                                    "label": "Connectivity",
                                    "values": [
                                        "3G",
                                        "4G",
                                        "2G",
                                        "5G"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "b8399c08-5e90-4450-96d5-73ce851bdb21",
                                    "name": null,
                                    "description": null,
                                    "label": "Colour",
                                    "values": [
                                        "BLACK",
                                        "WHTE",
                                        "BLUE",
                                        "RED",
                                        "YELLOW"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                }
                            ],
                            "vertical": {
                                "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                "label": "Electronics & Appliances"
                            },
                            "synonyms": [
                                "mobile",
                                "phone"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1589525140335.net-compress-image%20%281%29",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "url": "/Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4"
                        },
                        "totalOfferValuation": 10000,
                        "unitOfferValuation": 10000,
                        "images": [],
                        "videos": [],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "Today",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": null,
                                "values": [
                                    "Redmi"
                                ]
                            },
                            {
                                "name": "Colour",
                                "label": null,
                                "values": [
                                    "RED"
                                ]
                            },
                            {
                                "name": "Operating System",
                                "label": null,
                                "values": [
                                    "Android"
                                ]
                            },
                            {
                                "name": "Ram",
                                "label": null,
                                "values": [
                                    "2GB"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f0c2dad3938b613581405bd",
                            "fName": null,
                            "lName": null
                        },
                        "currentUserOfferOwner": false,
                        "quantity": null,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594701776012",
                        "seOId": "redmi-note-3-oid-1594701776012",
                        "name": "Redmi Note 3",
                        "description": "Good condition mobile , only battery is damaged,rest is fine.Sorry i forgot to mention that the screen is also broken and the speaker also sometimes does not work mind it sometimes oo and yes i warranty is expired and I alos lost the headphone and charger of the mobile.Thanks for Buying",
                        "desire": "New IPhone",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 23.45,
                            "lng": 23.45,
                            "zip": "700118",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "",
                            "districtId": "",
                            "stateId": "",
                            "countryId": "",
                            "annotation": "home",
                            "addressLine": "Rahara"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "type": "Item",
                            "label": "Used Mobile",
                            "description": "Used Mobile",
                            "leafNode": true,
                            "breadcrumbs": [
                                "Electronics & Appliances",
                                "Mobile",
                                "Used Mobile"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                    "label": "Electronics & Appliances"
                                },
                                {
                                    "categoryId": "33972d9f-86d3-4b56-95f6-e2b584b5da09",
                                    "label": "Mobile"
                                },
                                {
                                    "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                                    "label": "Used Mobile"
                                }
                            ],
                            "tags": [
                                {
                                    "tagId": "fae9d3ae-244e-46f5-ad77-3a02d5a48d29",
                                    "name": null,
                                    "description": null,
                                    "label": "RAM",
                                    "values": [
                                        "2GB",
                                        "4GB",
                                        "6GB",
                                        "8GB",
                                        "16GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "5d35b7b6-05e9-472f-9fda-516f47e67de0",
                                    "name": null,
                                    "description": null,
                                    "label": "Brand",
                                    "values": [
                                        "Apple",
                                        "Google",
                                        "Samsung",
                                        "Xiomi",
                                        "Oppo",
                                        "One plus 7",
                                        "Redmi",
                                        "Realme"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "a4d400a5-6ef1-406e-97e2-8a901b76ff25",
                                    "name": null,
                                    "description": null,
                                    "label": "Internal Storage",
                                    "values": [
                                        "32GB",
                                        "64GB",
                                        "128GB",
                                        "256GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "3dbd4479-3c98-4b7e-ba14-9abcbdc68558",
                                    "name": null,
                                    "description": null,
                                    "label": "Battery Capacity",
                                    "values": [
                                        "<1000mh",
                                        "1000mh-2000mh",
                                        "2000mh-3000mh",
                                        "3000mh-4000mh",
                                        "4000mh-5000mh"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "75b7c77f-1f73-427d-8836-ec2e113e0a9e",
                                    "name": null,
                                    "description": null,
                                    "label": "Operating System",
                                    "values": [
                                        "iOS",
                                        "Android",
                                        "Windows"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "11bd76bb-2ff4-4bfc-97a6-d5a85d686ec0",
                                    "name": null,
                                    "description": null,
                                    "label": "Screen Size",
                                    "values": [
                                        "<4inch",
                                        "4inch-5inch",
                                        "5inch-6inch",
                                        "6inhc>"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "189894b4-5a7e-444d-9d13-399c20006d40",
                                    "name": null,
                                    "description": null,
                                    "label": "Sim Type",
                                    "values": [
                                        "Nano",
                                        "Micro",
                                        "Normal"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "62f54c64-5a40-452c-9cbb-b2a0bfed9864",
                                    "name": null,
                                    "description": null,
                                    "label": "Primary Camera",
                                    "values": [
                                        "3MP",
                                        "5MP",
                                        "8MP",
                                        "12 MP",
                                        "48MP",
                                        "64MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "6ec73e52-0518-46f3-a6fb-fd8c831aaadd",
                                    "name": null,
                                    "description": null,
                                    "label": "Secondary Camera",
                                    "values": [
                                        "2MP",
                                        "5MP",
                                        "3MP",
                                        "8MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "9673a569-42d4-4f9c-9c8e-cf91f141a241",
                                    "name": null,
                                    "description": null,
                                    "label": "Connectivity",
                                    "values": [
                                        "3G",
                                        "4G",
                                        "2G",
                                        "5G"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "b8399c08-5e90-4450-96d5-73ce851bdb21",
                                    "name": null,
                                    "description": null,
                                    "label": "Colour",
                                    "values": [
                                        "BLACK",
                                        "WHTE",
                                        "BLUE",
                                        "RED",
                                        "YELLOW"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                }
                            ],
                            "vertical": {
                                "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                "label": "Electronics & Appliances"
                            },
                            "synonyms": [
                                "mobile",
                                "phone"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1589525140335.net-compress-image%20%281%29",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "url": "/Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4"
                        },
                        "totalOfferValuation": 10000,
                        "unitOfferValuation": 10000,
                        "images": [],
                        "videos": [],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "Today",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": null,
                                "values": [
                                    "Redmi"
                                ]
                            },
                            {
                                "name": "Colour",
                                "label": null,
                                "values": [
                                    "RED"
                                ]
                            },
                            {
                                "name": "Operating System",
                                "label": null,
                                "values": [
                                    "Android"
                                ]
                            },
                            {
                                "name": "Ram",
                                "label": null,
                                "values": [
                                    "2GB"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f0c2dad3938b613581405bd",
                            "fName": null,
                            "lName": null
                        },
                        "currentUserOfferOwner": false,
                        "quantity": null,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594663146515",
                        "seOId": "redmi-note-3-oid-1594663146515",
                        "name": "Redmi Note 3",
                        "description": "Good condition mobile , only battery is damaged,rest is fine.Sorry i forgot to mention that the screen is also broken and the speaker also sometimes does not work mind it sometimes oo and yes i warranty is expired and I alos lost the headphone and charger of the mobile.Thanks for Buying",
                        "desire": "New IPhone",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 23.45,
                            "lng": 23.45,
                            "zip": "700118",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "",
                            "districtId": "",
                            "stateId": "",
                            "countryId": "",
                            "annotation": "home",
                            "addressLine": "Rahara"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "type": "Item",
                            "label": "Used Mobile",
                            "description": "Used Mobile",
                            "leafNode": true,
                            "breadcrumbs": [
                                "Electronics & Appliances",
                                "Mobile",
                                "Used Mobile"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                    "label": "Electronics & Appliances"
                                },
                                {
                                    "categoryId": "33972d9f-86d3-4b56-95f6-e2b584b5da09",
                                    "label": "Mobile"
                                },
                                {
                                    "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                                    "label": "Used Mobile"
                                }
                            ],
                            "tags": [
                                {
                                    "tagId": "fae9d3ae-244e-46f5-ad77-3a02d5a48d29",
                                    "name": null,
                                    "description": null,
                                    "label": "RAM",
                                    "values": [
                                        "2GB",
                                        "4GB",
                                        "6GB",
                                        "8GB",
                                        "16GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "5d35b7b6-05e9-472f-9fda-516f47e67de0",
                                    "name": null,
                                    "description": null,
                                    "label": "Brand",
                                    "values": [
                                        "Apple",
                                        "Google",
                                        "Samsung",
                                        "Xiomi",
                                        "Oppo",
                                        "One plus 7",
                                        "Redmi",
                                        "Realme"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "a4d400a5-6ef1-406e-97e2-8a901b76ff25",
                                    "name": null,
                                    "description": null,
                                    "label": "Internal Storage",
                                    "values": [
                                        "32GB",
                                        "64GB",
                                        "128GB",
                                        "256GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "3dbd4479-3c98-4b7e-ba14-9abcbdc68558",
                                    "name": null,
                                    "description": null,
                                    "label": "Battery Capacity",
                                    "values": [
                                        "<1000mh",
                                        "1000mh-2000mh",
                                        "2000mh-3000mh",
                                        "3000mh-4000mh",
                                        "4000mh-5000mh"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "75b7c77f-1f73-427d-8836-ec2e113e0a9e",
                                    "name": null,
                                    "description": null,
                                    "label": "Operating System",
                                    "values": [
                                        "iOS",
                                        "Android",
                                        "Windows"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "11bd76bb-2ff4-4bfc-97a6-d5a85d686ec0",
                                    "name": null,
                                    "description": null,
                                    "label": "Screen Size",
                                    "values": [
                                        "<4inch",
                                        "4inch-5inch",
                                        "5inch-6inch",
                                        "6inhc>"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "189894b4-5a7e-444d-9d13-399c20006d40",
                                    "name": null,
                                    "description": null,
                                    "label": "Sim Type",
                                    "values": [
                                        "Nano",
                                        "Micro",
                                        "Normal"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "62f54c64-5a40-452c-9cbb-b2a0bfed9864",
                                    "name": null,
                                    "description": null,
                                    "label": "Primary Camera",
                                    "values": [
                                        "3MP",
                                        "5MP",
                                        "8MP",
                                        "12 MP",
                                        "48MP",
                                        "64MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "6ec73e52-0518-46f3-a6fb-fd8c831aaadd",
                                    "name": null,
                                    "description": null,
                                    "label": "Secondary Camera",
                                    "values": [
                                        "2MP",
                                        "5MP",
                                        "3MP",
                                        "8MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "9673a569-42d4-4f9c-9c8e-cf91f141a241",
                                    "name": null,
                                    "description": null,
                                    "label": "Connectivity",
                                    "values": [
                                        "3G",
                                        "4G",
                                        "2G",
                                        "5G"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "b8399c08-5e90-4450-96d5-73ce851bdb21",
                                    "name": null,
                                    "description": null,
                                    "label": "Colour",
                                    "values": [
                                        "BLACK",
                                        "WHTE",
                                        "BLUE",
                                        "RED",
                                        "YELLOW"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                }
                            ],
                            "vertical": {
                                "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                "label": "Electronics & Appliances"
                            },
                            "synonyms": [
                                "mobile",
                                "phone"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1589525140335.net-compress-image%20%281%29",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "url": "/Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4"
                        },
                        "totalOfferValuation": 10000,
                        "unitOfferValuation": 10000,
                        "images": [],
                        "videos": [],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "1 Day ago",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": null,
                                "values": [
                                    "Redmi"
                                ]
                            },
                            {
                                "name": "Colour",
                                "label": null,
                                "values": [
                                    "RED"
                                ]
                            },
                            {
                                "name": "Operating System",
                                "label": null,
                                "values": [
                                    "Android"
                                ]
                            },
                            {
                                "name": "Ram",
                                "label": null,
                                "values": [
                                    "2GB"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f0c2dad3938b613581405bd",
                            "fName": null,
                            "lName": null
                        },
                        "currentUserOfferOwner": false,
                        "quantity": null,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594663146515",
                        "seOId": "redmi-note-3-oid-1594663146515",
                        "name": "Redmi Note 3",
                        "description": "Good condition mobile , only battery is damaged,rest is fine.Sorry i forgot to mention that the screen is also broken and the speaker also sometimes does not work mind it sometimes oo and yes i warranty is expired and I alos lost the headphone and charger of the mobile.Thanks for Buying",
                        "desire": "New IPhone",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 23.45,
                            "lng": 23.45,
                            "zip": "700118",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "",
                            "districtId": "",
                            "stateId": "",
                            "countryId": "",
                            "annotation": "home",
                            "addressLine": "Rahara"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "type": "Item",
                            "label": "Used Mobile",
                            "description": "Used Mobile",
                            "leafNode": true,
                            "breadcrumbs": [
                                "Electronics & Appliances",
                                "Mobile",
                                "Used Mobile"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                    "label": "Electronics & Appliances"
                                },
                                {
                                    "categoryId": "33972d9f-86d3-4b56-95f6-e2b584b5da09",
                                    "label": "Mobile"
                                },
                                {
                                    "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                                    "label": "Used Mobile"
                                }
                            ],
                            "tags": [
                                {
                                    "tagId": "fae9d3ae-244e-46f5-ad77-3a02d5a48d29",
                                    "name": null,
                                    "description": null,
                                    "label": "RAM",
                                    "values": [
                                        "2GB",
                                        "4GB",
                                        "6GB",
                                        "8GB",
                                        "16GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "5d35b7b6-05e9-472f-9fda-516f47e67de0",
                                    "name": null,
                                    "description": null,
                                    "label": "Brand",
                                    "values": [
                                        "Apple",
                                        "Google",
                                        "Samsung",
                                        "Xiomi",
                                        "Oppo",
                                        "One plus 7",
                                        "Redmi",
                                        "Realme"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "a4d400a5-6ef1-406e-97e2-8a901b76ff25",
                                    "name": null,
                                    "description": null,
                                    "label": "Internal Storage",
                                    "values": [
                                        "32GB",
                                        "64GB",
                                        "128GB",
                                        "256GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "3dbd4479-3c98-4b7e-ba14-9abcbdc68558",
                                    "name": null,
                                    "description": null,
                                    "label": "Battery Capacity",
                                    "values": [
                                        "<1000mh",
                                        "1000mh-2000mh",
                                        "2000mh-3000mh",
                                        "3000mh-4000mh",
                                        "4000mh-5000mh"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "75b7c77f-1f73-427d-8836-ec2e113e0a9e",
                                    "name": null,
                                    "description": null,
                                    "label": "Operating System",
                                    "values": [
                                        "iOS",
                                        "Android",
                                        "Windows"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "11bd76bb-2ff4-4bfc-97a6-d5a85d686ec0",
                                    "name": null,
                                    "description": null,
                                    "label": "Screen Size",
                                    "values": [
                                        "<4inch",
                                        "4inch-5inch",
                                        "5inch-6inch",
                                        "6inhc>"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "189894b4-5a7e-444d-9d13-399c20006d40",
                                    "name": null,
                                    "description": null,
                                    "label": "Sim Type",
                                    "values": [
                                        "Nano",
                                        "Micro",
                                        "Normal"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "62f54c64-5a40-452c-9cbb-b2a0bfed9864",
                                    "name": null,
                                    "description": null,
                                    "label": "Primary Camera",
                                    "values": [
                                        "3MP",
                                        "5MP",
                                        "8MP",
                                        "12 MP",
                                        "48MP",
                                        "64MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "6ec73e52-0518-46f3-a6fb-fd8c831aaadd",
                                    "name": null,
                                    "description": null,
                                    "label": "Secondary Camera",
                                    "values": [
                                        "2MP",
                                        "5MP",
                                        "3MP",
                                        "8MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "9673a569-42d4-4f9c-9c8e-cf91f141a241",
                                    "name": null,
                                    "description": null,
                                    "label": "Connectivity",
                                    "values": [
                                        "3G",
                                        "4G",
                                        "2G",
                                        "5G"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "b8399c08-5e90-4450-96d5-73ce851bdb21",
                                    "name": null,
                                    "description": null,
                                    "label": "Colour",
                                    "values": [
                                        "BLACK",
                                        "WHTE",
                                        "BLUE",
                                        "RED",
                                        "YELLOW"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                }
                            ],
                            "vertical": {
                                "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                "label": "Electronics & Appliances"
                            },
                            "synonyms": [
                                "mobile",
                                "phone"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1589525140335.net-compress-image%20%281%29",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "url": "/Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4"
                        },
                        "totalOfferValuation": 10000,
                        "unitOfferValuation": 10000,
                        "images": [],
                        "videos": [],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "1 Day ago",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": null,
                                "values": [
                                    "Redmi"
                                ]
                            },
                            {
                                "name": "Colour",
                                "label": null,
                                "values": [
                                    "RED"
                                ]
                            },
                            {
                                "name": "Operating System",
                                "label": null,
                                "values": [
                                    "Android"
                                ]
                            },
                            {
                                "name": "Ram",
                                "label": null,
                                "values": [
                                    "2GB"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f0c2dad3938b613581405bd",
                            "fName": null,
                            "lName": null
                        },
                        "currentUserOfferOwner": false,
                        "quantity": null,
                        "itemCondition": "Used"
                    },
                    {
                        "offerId": "1594663146515",
                        "seOId": "redmi-note-3-oid-1594663146515",
                        "name": "Redmi Note 3",
                        "description": "Good condition mobile , only battery is damaged,rest is fine.Sorry i forgot to mention that the screen is also broken and the speaker also sometimes does not work mind it sometimes oo and yes i warranty is expired and I alos lost the headphone and charger of the mobile.Thanks for Buying",
                        "desire": "New IPhone",
                        "exchangeMode": "Anything",
                        "location": {
                            "lat": 23.45,
                            "lng": 23.45,
                            "zip": "700118",
                            "regionId": "",
                            "subregionId": "",
                            "cityId": "",
                            "districtId": "",
                            "stateId": "",
                            "countryId": "",
                            "annotation": "home",
                            "addressLine": "Rahara"
                        },
                        "offerType": "Item",
                        "category": {
                            "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "type": "Item",
                            "label": "Used Mobile",
                            "description": "Used Mobile",
                            "leafNode": true,
                            "breadcrumbs": [
                                "Electronics & Appliances",
                                "Mobile",
                                "Used Mobile"
                            ],
                            "hierarchy": [
                                {
                                    "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                    "label": "Electronics & Appliances"
                                },
                                {
                                    "categoryId": "33972d9f-86d3-4b56-95f6-e2b584b5da09",
                                    "label": "Mobile"
                                },
                                {
                                    "categoryId": "882ad229-ca88-436b-9476-0ed1d3a9dab4",
                                    "label": "Used Mobile"
                                }
                            ],
                            "tags": [
                                {
                                    "tagId": "fae9d3ae-244e-46f5-ad77-3a02d5a48d29",
                                    "name": null,
                                    "description": null,
                                    "label": "RAM",
                                    "values": [
                                        "2GB",
                                        "4GB",
                                        "6GB",
                                        "8GB",
                                        "16GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "5d35b7b6-05e9-472f-9fda-516f47e67de0",
                                    "name": null,
                                    "description": null,
                                    "label": "Brand",
                                    "values": [
                                        "Apple",
                                        "Google",
                                        "Samsung",
                                        "Xiomi",
                                        "Oppo",
                                        "One plus 7",
                                        "Redmi",
                                        "Realme"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "a4d400a5-6ef1-406e-97e2-8a901b76ff25",
                                    "name": null,
                                    "description": null,
                                    "label": "Internal Storage",
                                    "values": [
                                        "32GB",
                                        "64GB",
                                        "128GB",
                                        "256GB"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "3dbd4479-3c98-4b7e-ba14-9abcbdc68558",
                                    "name": null,
                                    "description": null,
                                    "label": "Battery Capacity",
                                    "values": [
                                        "<1000mh",
                                        "1000mh-2000mh",
                                        "2000mh-3000mh",
                                        "3000mh-4000mh",
                                        "4000mh-5000mh"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "75b7c77f-1f73-427d-8836-ec2e113e0a9e",
                                    "name": null,
                                    "description": null,
                                    "label": "Operating System",
                                    "values": [
                                        "iOS",
                                        "Android",
                                        "Windows"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "11bd76bb-2ff4-4bfc-97a6-d5a85d686ec0",
                                    "name": null,
                                    "description": null,
                                    "label": "Screen Size",
                                    "values": [
                                        "<4inch",
                                        "4inch-5inch",
                                        "5inch-6inch",
                                        "6inhc>"
                                    ],
                                    "allowCompletionSearch": false,
                                    "allowFullSearch": false
                                },
                                {
                                    "tagId": "189894b4-5a7e-444d-9d13-399c20006d40",
                                    "name": null,
                                    "description": null,
                                    "label": "Sim Type",
                                    "values": [
                                        "Nano",
                                        "Micro",
                                        "Normal"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "62f54c64-5a40-452c-9cbb-b2a0bfed9864",
                                    "name": null,
                                    "description": null,
                                    "label": "Primary Camera",
                                    "values": [
                                        "3MP",
                                        "5MP",
                                        "8MP",
                                        "12 MP",
                                        "48MP",
                                        "64MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "6ec73e52-0518-46f3-a6fb-fd8c831aaadd",
                                    "name": null,
                                    "description": null,
                                    "label": "Secondary Camera",
                                    "values": [
                                        "2MP",
                                        "5MP",
                                        "3MP",
                                        "8MP"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "9673a569-42d4-4f9c-9c8e-cf91f141a241",
                                    "name": null,
                                    "description": null,
                                    "label": "Connectivity",
                                    "values": [
                                        "3G",
                                        "4G",
                                        "2G",
                                        "5G"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                },
                                {
                                    "tagId": "b8399c08-5e90-4450-96d5-73ce851bdb21",
                                    "name": null,
                                    "description": null,
                                    "label": "Colour",
                                    "values": [
                                        "BLACK",
                                        "WHTE",
                                        "BLUE",
                                        "RED",
                                        "YELLOW"
                                    ],
                                    "allowCompletionSearch": true,
                                    "allowFullSearch": true
                                }
                            ],
                            "vertical": {
                                "categoryId": "3bf6a17e-b63d-4b8f-8c71-af45021278d3",
                                "label": "Electronics & Appliances"
                            },
                            "synonyms": [
                                "mobile",
                                "phone"
                            ],
                            "imagePath": "https://gintaa-dev.s3-ap-south-1.amazonaws.com/category/thumbnail/1589525140335.net-compress-image%20%281%29",
                            "fullSearchScore": 1,
                            "completionSearchScore": 1,
                            "seoId": "Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4",
                            "url": "/Used-Mobile_882ad229-ca88-436b-9476-0ed1d3a9dab4"
                        },
                        "totalOfferValuation": 10000,
                        "unitOfferValuation": 10000,
                        "images": [],
                        "videos": [],
                        "documents": [],
                        "condition": null,
                        "hiddenPeriod": null,
                        "activeSince": "1 Day ago",
                        "facets": [
                            {
                                "name": "Brand",
                                "label": null,
                                "values": [
                                    "Redmi"
                                ]
                            },
                            {
                                "name": "Colour",
                                "label": null,
                                "values": [
                                    "RED"
                                ]
                            },
                            {
                                "name": "Operating System",
                                "label": null,
                                "values": [
                                    "Android"
                                ]
                            },
                            {
                                "name": "Ram",
                                "label": null,
                                "values": [
                                    "2GB"
                                ]
                            }
                        ],
                        "user": {
                            "profileId": "5f0c2dad3938b613581405bd",
                            "fName": null,
                            "lName": null
                        },
                        "currentUserOfferOwner": false,
                        "quantity": null,
                        "itemCondition": "Used"
                    }
                ]
            },
            errorRes: {
                "success": false,
                "code": 500,
                "message": "Gintaa internal server occurred",
                "payload": null
            }
        }
    },
    showLocation: {
        requestData: {
            location:{
                lat:22.4661325,
                lng:88.4051064,
                zip:"700029",
                regionId:"",
                subregionId:"",
                cityId:"Garia",
                districtId:"",
                stateId:"West Bengal",
                countryId:"",
                annotation:"Home",
                addressLine:"Garia"
            }
        },
        responseData: {
            successRes:{
                payload: "Garia"
            },
            errorRes: {
                payload: null
            }
        }
    },
    showDesire: {
        requestData: {
            desire:"Bike"
          },
        responseData: {
            successRes:{
                payload: "Bike"
            },
            errorRes: {
                success: false,
                payload: null
            }
        }
    },
}