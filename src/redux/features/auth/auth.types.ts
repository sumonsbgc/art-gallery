export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  user_type: 'customer' | 'critic' | 'artist';
};

export type ForgotPayload = {
  email: string;
};

export type ResetPayload = {
  email: string;
  pin: string;
  password: string;
  password_confirmation: string;
};

export type Country = {
  country_id: number;
  country_name: string;
  vat_price: number;
  country_badges: string;
  flug_url?: string;
};

export interface UserData {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  email_verified_at: string | null;
  mobile: string | null;
  user_type: string;
  user_photo: string;
  image_path: string;
  address: string | null;
  user_token: string;
  user_auth_token: string;
  earnings: number;
  country: {
    country_id: number;
    country_name: string;
    vat_price: number;
    country_badges: string;
  };
  critic_award?: string[];
  artist_award?: string[];
  critic_experience?: number;
  critic_organization?: string;
  critic_designation?: string;
  critic_document?: DocsType[];
  artist_document?: DocsType[];
  payment_detail: string;
  city: string | null;
  zip_code: string | null;
  profile_heading: string;
  about: string;
  verified: number;
  created_at: string;
  updated_at: string;
  country_detail?: Country;
  website?: string | null;
  facebook_url?: string | null;
  twitter_url?: string | null;
  gplus_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  pinterest_url?: string | null;
  organization?: string | null;
  designation?: string | null;
  experience?: number;
  user_document_verified?: number | null;
  country_badge?: number | null;
  total_follower: number;
  total_rating?: number;
  average_rating?: number;
  total_product_review: number;
  total_favorite?: number;
  total_review?: number;
  is_artist: 0 | 1 | 2 | null;
  is_critic: 0 | 1 | 2 | null;
}

export interface UserData2 extends Omit<UserData, 'country'> {
  country: string;
}

export type AuthState = {
  status: 'success' | 400 | 500;
  data: UserData;
  token: string;
};

export type ProfileInitialValue = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  zip_code: string;
  city: string;
  address: string;
  country: string;
  about?: string;
};

export type DocsType = {
  id: string;
  document_name: string;
  file_location: string;
  original_name: string;
  type: string;
  user_id: number;
};
