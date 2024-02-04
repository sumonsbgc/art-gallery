import React from 'react';
import { orderSummaryProp } from './type';
import { moneyFormat } from '@/utils';
import moment from 'moment';

const OrderSummary = ({
  grandTotal,
  subTotal,
  discountPrice,
  couponAmount,
  shippingStatus
}: orderSummaryProp) => {
  return (
    <div className="w-full mb-2">
      <div className="w-full mb-2">
        <h3 className="text-black text-[18px] font-[500]">Order Summary</h3>
      </div>
      <div className="w-full mb-2">
        <div className="w-full mb-2 flex justify-between">
          <span className="text-black text-[16px] font-[400]">Price</span>
          <span className="text-black text-[16px] font-[500]">{moneyFormat(subTotal)}</span>
        </div>
        <div className="w-full mb-2 flex justify-between">
          <span className="text-black text-[16px] font-[400]">Discount</span>
          <span className="text-black text-[16px] font-[500]">
            {moneyFormat(discountPrice || 0)}
          </span>
        </div>
        <div className="w-full mb-2 flex justify-between">
          <span className="text-black text-[16px] font-[400]">Shipping</span>
          <span className="text-black text-[16px] font-[500]">{shippingStatus}</span>
        </div>
        <div className="w-full mb-2 flex justify-between">
          <span className="text-black text-[16px] font-[400]">Coupon Applied</span>
          <span className="text-black text-[16px] font-[500]">
            {moneyFormat(couponAmount || 0)}
          </span>
        </div>
      </div>
      <div className="w-full mt-6 mb-4 border-t border-gray2/90">
        <div className="w-full mt-4 flex justify-between">
          <span className="text-black text-[16px] font-[400]">TOTAL</span>
          <span className="text-black text-[16px] font-[500]">{moneyFormat(grandTotal)}</span>
        </div>
        <div className="w-full mt-4 flex justify-between">
          <span className="text-black text-[16px] font-[400]">Estimated Delivery by</span>
          <span className="text-black text-[16px] font-[500]">
            {moment().add(15, 'days').format('DD MMM, YYYY')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
