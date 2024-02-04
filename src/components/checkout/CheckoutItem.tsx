/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { moneyFormat } from '@/utils';
import { orderListProp, ordersProp } from './type';
import { Icon } from '../ui';
import { useRemoveCartItemMutation } from '@/redux/features/carts/cartsApi';
// import { setCartItemID } from '@/redux/slices/siteSlice';
import { useAppDispatch } from '@/redux/hooks';
// import { useSelector } from 'react-redux';
import { removeCart } from '@/redux/features/carts/cartSlice';
import Swal from 'sweetalert2';

const CheckoutItem = ({ orders }: orderListProp) => {
  const dispatch = useAppDispatch();
  const [deleteCart, { isError, isLoading, isSuccess, error }] = useRemoveCartItemMutation();

  useEffect(() => {
    if (isError && !isSuccess) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        // eslint-disable-next-line quotes
        title: "Sorry! There Is Something Wrong. You'r cart is not removed",
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isError, isSuccess]);

  return (
    <div className="w-full mb-4">
      {orders?.map((order: ordersProp) => (
        <div className="w-full h-[81px] bg-white flex mb-3" key={order?.ord_id}>
          <div className="w-[85px] h-[81px]">
            <picture>
              <img
                src={order?.itemDetail?.image_path}
                alt={order?.itemDetail?.item_name}
                className="w-full h-full rounded-lg"
              />
            </picture>
          </div>
          <div className="w-full h-[81px] px-3">
            <div className="w-full mt-0.5 flex justify-between">
              <span className="text-black text-[16px] font-[500]">
                {moneyFormat(order?.itemDetail?.regular_price)}
              </span>
              <button
                type="button"
                className="flex w-5 h-[20px] cursor-pointer"
                onClick={() => {
                  deleteCart({ item_id: order?.ord_id });
                  dispatch(removeCart({ artId: order?.itemDetail?.item_id }));
                }}
                disabled={isLoading}
              >
                <Icon name="delete" size="20" color="orange" />
              </button>
            </div>
            <div className="w-full text-black text-[14px] font-[400] mt-1.5">
              {order?.itemDetail?.item_name}
            </div>
            <div className="w-full text-[#818181] italic text-[12px] font-[400] mt-1">
              Ralph Edwards
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutItem;
