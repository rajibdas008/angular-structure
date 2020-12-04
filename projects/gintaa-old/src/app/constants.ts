export abstract class Constants {
  static readonly WEBSITE_URL = 'https://dev.gintaa.com';
  // static readonly WEBSITE_URL = 'http://13.233.49.190/#';
  static readonly DEBOUNCE_TIME: number = 600;
  static readonly SEARCH_HEADING: string = 'Are you looking for...';
  static readonly MAX_SEARCH_COUNT: number = 5;
  static readonly BLANK: string = '';
  static readonly SEARCH_PLACEHOLDER: string = 'Search for mobile, bike and more...';
  static readonly SEARCH_KEYWORD: string = 'name';
  static readonly ITEM_NOT_FOUND: string = 'Item Not Found';
  static readonly PAGE_SIZE: number = 10;
  static readonly TIME: number = 30000;
  static readonly SOCIAL_MEDIUM: string[] = ['facebook', 'twitter', 'linkedin', 'pinterest', 'whatsapp'];
  static readonly IMAGE_EXT_WHITE_LIST = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 
                                          'image/bmp'];
  static readonly VIDEO_EXT_WHITE_LIST  = ['video/mp4', 'video/3gp', 'video/flv', 'video/avi',
                                          'video/wma', 'video/mov', 'video/mpg', 'video/m4v'];


  static readonly POSITION_LAT_LNG = '22.5754,88.4798';

  static readonly ITEM = 'Item';
  static readonly SERVICE = 'Service';
  static readonly OTHERS = 'Others';
  static readonly HOME = 'Home';
  static readonly OFFICE = 'Office';
  static readonly PROVIDE_ADDRESS_TYPE = 'Please provide address type';
  static readonly PROVIDE_OTHER_ADDRESS_TITLE = 'Please provide other address title';
  static readonly DATE_FORMAT = 'DD/MM/YYYY';
  static readonly URL = 'og:url';
  static readonly TITLE = 'title';
  static readonly DESC  = 'description';
  static readonly FB_TYPE = 'og:type';
  static readonly FB_TITLE = 'og:title';
  static readonly FB_DESC  = 'og:description';
  static readonly FB_IMAGE = 'og:image';
  static readonly FB_SECURE_URL = 'og:image:secure_url';
  static readonly FB_IMAGE_WIDTH = 'og:image:width';
  static readonly FB_IMAGE_HEIGHT = 'og:image:height';
  static readonly FB_SITE_NAME = 'og:site_name';
  static readonly TWITTER_TITLE = 'twitter:title';
  static readonly TWITTER_DESC  = 'twitter:description';
  static readonly TWITTER_IMAGE = 'twitter:image';
  static readonly TWITTER_SITE_NAME = 'twitter:site';
  static readonly IMAGE_WIDTH = '450';
  static readonly IMAGE_HEIGHT = '300';
  // static readonly TWITTER_TITLE = 'twitter:text:title';


  /* DEAL RELATED CONSTANTS */
  static readonly DEAL_FILTER_TYPE_ALL = 'ALL';
  static readonly DEAL_FILTER_TYPE_RECEIVED = 'RECEIVED';
  static readonly DEAL_FILTER_TYPE_SENT = 'SENT';
  static readonly DEAL_FILTER_TYPE_UNKNOWN = 'UNKNOWN';

  static readonly DEAL_STATUS_INITIATED = 'INITIATED';
  static readonly DEAL_STATUS_UPDATED = 'UPDATED';
  static readonly DEAL_STATUS_UPDATE_REQUESTED = 'UPDATE_REQUESTED';
  static readonly DEAL_STATUS_ACCEPTED = 'ACCEPTED';
  static readonly DEAL_STATUS_PARTIAL_CLOSED = 'PARTIAL_CLOSED';
  static readonly DEAL_STATUS_CLOSED = 'CLOSED';

  static readonly DEAL_SHOW_OFFER_SLIDER_FOR_MIN_OFFER_COUNT = 4;
  static readonly DEAL_DEBUG_OFFER_SLIDER_COUNT = 6;
  static readonly DEAL_DEBUG_OFFER_SLIDER_ITEM = {
    offerId: '1602779442775',
    offerItemCount: '0',
    offerType: 'Item',
    name: 'Debug Offer',
    description: 'This is a debug offer only for development',
    image: 'assets/images/no-image.svg',
    quantity: 1
  };
}
