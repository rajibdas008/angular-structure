export interface GtagEvent {
  event_category?: string;
  event_label?: string;
  value?: any;
  [key: string]: any;
}

export interface GtagPageview {
  page_title?: string;
  page_path?: string;
  page_location?: string;
  [key: string]: any;
}

export interface GtagConfig {
  trackingId: string;
  trackPageviews?: boolean;
  debug?: boolean;
}

export enum GtagCategory {
  ecommerce = 'ecommerce',
  engagement = 'engagement',
  offer = 'offer',
  video = 'video'
}

export enum GtagAction {
  sign_up = 'sign_up',
  login = 'login',
  otp_verify = 'otp_verify',
  create = 'create',
  create_draft_item = 'create_draft_item',
  update_draft_item = 'update_draft_item',
  create_draft_service = 'create_draft_service',
  update_draft_service = 'update_draft_service',
  post_item = 'post_item',
  post_service = 'post_service',
  search = 'search',
  share = 'share',
  view = 'view',
  share_view = 'share_view',
  view_item_list = 'view_item_list',
  view_search_results = 'view_search_results',
  play = 'play'
}

export enum GtagEventLabel {
  play_time = 'play_time'
}
