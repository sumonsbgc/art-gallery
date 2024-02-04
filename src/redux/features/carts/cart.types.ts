export type cartType = {
  artId: number;
  qty: number;
  image_path: string;
  regular_price: number;
  title: string;
  vendorId: number;
  order_id?: number;
  ord_id?: number;
};

export type CartItems = {
  carts: { [artId: number]: cartType };
  couponCode: '';
  couponAmount: 0;
};
