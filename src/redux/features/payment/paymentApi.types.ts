export type confirmPaymentPayload = {
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zip_code: string;
  phone: number;
  email: string;
  coupon_code: string;
  payment_method: string;
  shipping_address: boolean;
  terms: boolean;
  session_id: string;
  processing_fee: number;
  vat_price: number;
  total_price: number;
  token: string;
};

export type Order = {
  id: number;
  item_id: number;
  created_at: string;

  // product
  image_path: string;
  item_name: string;
  item_price: number;
  total_price: number;

  // step1
  order_status: string;

  // step2
  shipping_status: 0 | 1;
  shipping_date: string;

  // step3
  delivery_status: 0 | 1;
  delivery_date: string;
};
