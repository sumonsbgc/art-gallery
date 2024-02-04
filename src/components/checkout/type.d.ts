import { orderListProp } from './type.d';
export type ordersProp = {
  ord_id: number;
  item_name: string;
  image_path: string;
  regular_price: number;
  total_price: number;
  item_price: number;
  artist_name: string;
  discount_price: number;
  itemDetail: any;
};

export type orderListProp = {
  orders: ordersProp[];
  refetch?: any;
};

export type CheckoutFormProp = {
  totalAmount: number;
  setCouponAmount: React.Dispatch<React.SetStateAction<number>>;
} & orderListProp;

export type orderSummaryProp = {
  grandTotal: number;
  subTotal: number;
  discountPrice?: number;
  couponAmount?: number;
  shippingStatus: string;
};
