type ItemOrderType = {
  ord_id: number;
  customerDetail: {
    id: number;
    name: string;
    username: string;
    email: string;
    user_type: string;
    user_photo: string;
    user_token: string;
    website: string;
    country: {
      country_id: number;
      country_name: string;
      vat_price: number;
      country_badges: string;
    };
    about: string;
    facebook_url: string;
    twitter_url: string;
    gplus_url: string;
    instagram_url: string;
    linkedin_url: string;
    pinterest_url: string;
    verified: number;
    user_document_verified: number;
    country_badge: number;
    drop_status: string;
    city: string;
    zip_code: number;
    address: string;
    mobile: string;
    first_name: string;
    last_name: string;
    organization: string;
    designation: string;
    experience: string;
    critic_organization: string;
    critic_designation: string;
    critic_experience: string;
    critic_award: string[];
    artist_award: string[];
    image_path: string;
    critic_document: any[];
    artist_document: any[];
  };
  session_id: string;
  itemDetail: {
    item_id: number;
    mainOwner: {
      id: number;
      name: string;
      username: string;
      email: string;
      user_type: string;
      user_photo: null;
      user_token: string;
      website: string;
      country: {
        country_id: number;
        country_name: string;
        vat_price: number;
        country_badges: string;
      };
      about: null;
      facebook_url: null;
      twitter_url: null;
      gplus_url: null;
      instagram_url: null;
      linkedin_url: null;
      pinterest_url: null;
      verified: number;
      user_document_verified: number;
      country_badge: number;
      drop_status: string;
      city: string;
      zip_code: number;
      address: string;
      mobile: string;
      first_name: string;
      last_name: string;
      organization: string;
      designation: string;
      experience: string;
      critic_organization: null;
      critic_designation: null;
      critic_experience: null;
      critic_award: string[];
      artist_award: string[];
      image_path: null;
      critic_document: any[];
      artist_document: any[];
    };
    item_token: string;
    item_name: string;
    item_slug: string;
    item_desc: string;
    item_shortdesc: string;
    item_thumbnail: string;
    item_preview: string;
    item_file: string;
    item_category: string;
    regular_price: number;
    item_tags: string;
    item_featured: string;
    size_id: {
      id: number;
      name: string;
    };
    medium_id: {
      id: number;
      name: string;
    };
    material_id: {
      id: number;
      name: string;
    };
    subject_id: {
      id: number;
      name: string;
    };
    is_adult: number;
    avg_critic_rating: number | null;
    avg_customer_rating: number | null;
    total_favorite: number | null;
    current_owner_id: {
      id: number;
      name: string;
      username: string;
      email: string;
      user_type: string;
      user_photo: string;
      user_token: string;
      website: string;
      country: {
        country_id: number;
        country_name: string;
        vat_price: number;
        country_badges: string;
      };
      about: string;
      facebook_url: string;
      twitter_url: string;
      gplus_url: string;
      instagram_url: string;
      linkedin_url: string;
      pinterest_url: string;
      verified: number;
      user_document_verified: number;
      country_badge: number;
      drop_status: string;
      city: string;
      zip_code: number;
      address: string;
      mobile: string;
      first_name: string;
      last_name: string;
      organization: string;
      designation: string;
      experience: string;
      critic_organization: string;
      critic_designation: string;
      critic_experience: string;
      critic_award: string[];
      artist_award: string[];
      image_path: string;
      critic_document: any[];
      artist_document: any[];
    };
    image_path: string;
  };
  item_order_serial_key: string | null;
  item_serial_stock: number;
  item_token: string;
  purchase_token: string;
  purchase_code: string;
  discount_price: number;
  item_price: number;
  total_price: number;
  order_status: string;
};

export type OrderType = {
  chout_id: number;
  purchase_token: string;
  purchase_code: string;
  order_ids: string;
  item_prices: string;
  item_user_id: string;
  user_id: number;
  total: number;
  vendor_amount: number;
  admin_amount: number;
  processing_fee: number;
  vat_price: number;
  payment_type: string;
  payment_token: string;
  payment_date: string;
  order_firstname: string;
  order_lastname: string;
  order_company: string | null;
  order_email: string;
  order_country: string;
  order_address: string;
  order_city: string;
  order_zipcode: string;
  order_notes: string | null;
  payment_status: string;
  contact: string;
  state: string;
  shipping_status: number;
  shipping_time: string | null;
  delivery_status: number;
  delivery_time: string | null;
  refund_status: number;
  refund_time: string | null;
  cancel_status: number;
  cancel_time: string;
  quantity: number;
  unique_order_id: string;
  grand_total: number;
  bill_f_name: string;
  bill_l_name: string;
  bill_address: string;
  bill_country: string;
  bill_city: string;
  bill_state: string;
  bill_zip_code: string;
  bill_phone: string;
  bill_email: string;
  ItemOrder: ItemOrderType;
  actual_owner: {
    id: number;
    name: string;
    user_photo: string | null;
    image_path: string;
  };
  buyer: {
    id: number;
    name: string;
    user_photo: string | null;
  };
};

export type ArtistOrdersData = {
  current_page: number;
  data: OrderType[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type ArtistSalesAnalytics = {
  deliverOrder: number;
  pendingOrder: number;
  totalIncome: number;
};

export type Withdraw = {
  wd_id: number;
  wd_user_id: number;
  month: string;
  wd_date: string;
  withdraw_type: string;
  paypal_email: string;
  stripe_email: string;
  wd_amount: number;
  wd_status: string;
  available_balance: number;
  request_by: null;
};

export type WithdrawData = {
  current_page: number;
  data: Withdraw[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type DisburseAnalytics = {
  withdraw_option: string[];
  totalReceived: number;
  totalDue: number;
  totalSell: number;
  adminCommission: number;
  myCommission: number;
};

export type SingleReviewDetailsPayload = {
  itemId: number;
  userType: 'critic' | 'customer';
};

export type SingleReviewDetails = {
  review_detail: {
    id: number;
    item_id: {
      item_id: number;
      item_name: string;
      item_slug: string;
      item_desc: string;
      item_shortdesc: string;
      item_thumbnail: string;
      item_preview: string;
      item_file: string;
      regular_price: number;
      item_tags: string;
      item_featured: string;
      is_adult: number;
      avg_critic_rating: number;
      avg_customer_rating: null;
      total_favorite: number;
      image_path: string;
      sale_status: number;
      total_avg_rating: number;
      total_review: number;
      review_opinion: number;
    };
    userDetail: {
      id: number;
      name: string;
      email: string;
      user_type: string;
      user_photo: string;
      first_name: string;
      last_name: string;
      image_path: string;
    };
    review: string;
    rating: number;
    review_date: string;
    type: string | null;
  };
  avg_rating: string | number;
  total_review: number;
  total_like: number;
};
