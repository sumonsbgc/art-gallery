'use client';

// import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
// import Swal from 'sweetalert2';

// components
import { Drawer, DrawerContent, DrawerHeader, DrawerFooter, Icon } from '@/components/ui';
import { Button, Img } from '@/components/common';

// redux
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getCartList,
  getTotalCarts
  // getCouponData,
} from '@/redux/selector/cart.selector';
import {
  removeCart
  // setCoupon
} from '@/redux/features/carts/cartSlice';
import { cartType } from '@/redux/features/carts/cart.types';
import {
  useAddItemToOrderMutation,
  useRemoveCartItemMutation
} from '@/redux/features/carts/cartsApi';
// import { useApplyCouponMutation } from '@/redux/features/payment/paymentApi';
import { checkAuthUser } from '@/redux/selector/auth.selector';
import { openAuthModal } from '@/redux/features/auth/authSlice';

// utils
import { getUserSessionId, moneyFormat } from '@/utils';

type CartItemDrawerPropType = { drawerState: boolean; closeDrawer: () => void };

const getTotalPrice = (args: cartType[]) => {
  return args?.length > 0
    ? args.reduce((sum: number, arg: { regular_price: number }) => {
        return sum + arg?.regular_price;
      }, 0)
    : 0;
};

const CartItemDrawer = ({ drawerState, closeDrawer }: CartItemDrawerPropType) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const carts = useAppSelector(getCartList);
  const totalCarts = useAppSelector(getTotalCarts);
  // const couponData = getCouponData();
  const isAuthUser = checkAuthUser();
  const [addItemToOrder, { isLoading }] = useAddItemToOrderMutation({});
  const [removeCartItem, { isLoading: removeIsLoading }] = useRemoveCartItemMutation({});
  // const [applyCoupon] = useApplyCouponMutation();
  // const [couponCode, setCouponCode] = useState<string>('');
  // const [couponApplied, setCouponApplied] = useState<boolean>(false);

  const checkoutHandler = async () => {
    if (isAuthUser) {
      const newCarts = carts?.filter((cart: cartType) => !cart?.order_id);
      if (newCarts?.length > 0) {
        await addItemToOrder({
          items: newCarts?.map((cart) => cart?.artId),
          session_id: getUserSessionId(),
          quantities: newCarts?.map((cart) => cart?.qty)
        });
      }
      localStorage.removeItem('carts');
      closeDrawer();
      router.push('/checkout');
    } else {
      closeDrawer();
      dispatch(openAuthModal());
    }
  };

  // const handleApplyCoupon = async () => {
  //   try {
  //     if (isAuthUser) {
  //       const newCarts = carts?.filter((cart: cartType) => !cart?.order_id);

  //       if (newCarts?.length > 0) {
  //         await addItemToOrder({
  //           items: newCarts?.map((cart) => cart?.artId),
  //           session_id: getUserSessionId(),
  //           quantities: newCarts?.map((cart) => cart?.qty)
  //         });
  //       }

  //       if (couponCode) {
  //         const formData = new FormData();
  //         formData.append('coupon_code', couponCode);

  //         const couponApplyRes: any = await applyCoupon(formData);
  //         const { data } = couponApplyRes;

  //         if (data?.status === 'success') {
  //           setCouponApplied(data?.status === 'success');
  //           dispatch(setCoupon({ couponCode, couponAmount: data?.total_discount }));
  //         } else {
  //           Swal.fire({
  //             title: 'Error',
  //             text: 'Ooops! Coupon Code Is Invalid',
  //             customClass: {
  //               htmlContainer: 'font-medium text-sm text-gray',
  //               confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
  //             }
  //           });
  //         }
  //       }
  //     } else {
  //       closeDrawer();
  //       dispatch(openAuthModal());
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  // useEffect(() => {
  //   if (couponData?.couponCode) {
  //     setCouponApplied(true);
  //     setCouponCode(couponData?.couponCode);
  //   }
  // }, [couponData?.couponCode]);

  return (
    <Drawer
      rootClassName="valart-cart-item-drawer"
      maskClosable={true}
      onClose={closeDrawer}
      open={drawerState}
      header={
        <DrawerHeader closeDrawer={closeDrawer}>
          <div className="flex gap-7 items-center">
            <h2 className="font-bold text-black text-base">Your Cart</h2>
            <button className="car-item-btn">
              {totalCarts > 1 ? `${totalCarts} Items` : `${totalCarts} Item`}{' '}
            </button>
          </div>
        </DrawerHeader>
      }
      footer={
        <DrawerFooter>
          <div className="w-full">
            {/* <section className="w-full h-[64px] mb-4 flex justify-center items-center gap-3">
              <div className="w-8/12 form-control">
                <label className="label">
                  <span className="text-black text-[11px] font-medium">GOT A COUPON CODE?</span>
                </label>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full h-[40px] input input-bordered bg-transparent rounded-none placeholder:text-[14px] placeholder:font-[400]"
                />
              </div>
              <div className="w-4/12 form-control">
                <label className="label"> &nbsp;</label>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="flex justify-center items-center text-center bg-black text-white h-[40px] text-[12px] font-medium -mt-2.5 cursor-pointer"
                  disabled={isLoading || couponApplied || !couponCode}
                >
                  {couponApplied ? 'Applied' : 'Apply Coupon'}
                </button>
              </div>
            </section> */}
            <Button
              className="w-full h-[54px] flex justify-center items-center text-center gap-6 text-white bg-orange cursor-pointer"
              onClick={checkoutHandler}
              disabled={isLoading || carts?.length < 1}
            >
              <div className="inline-flex text-[#fff] justify-center items-center gap-1.5 text-sm font-medium uppercase">
                <Icon name="checkout" size="30" color="white" />
                CHECKOUT
              </div>
              <div>
                <ul className="list-disc">
                  <li className="text-sm font-medium uppercase">
                    {moneyFormat(getTotalPrice(carts), false)}
                  </li>
                </ul>
              </div>
            </Button>
          </div>
        </DrawerFooter>
      }
      width={560}
    >
      <DrawerContent>
        <div className="w-full">
          {carts && Array.isArray(carts) && carts?.length > 0 ? (
            carts.map((cart) => (
              <div className="w-full h-[95px] bg-white flex mb-4" key={cart?.artId}>
                <Image
                  src={cart?.image_path}
                  alt={cart?.title}
                  width={100}
                  height={95}
                  className="w-[100px] h-full rounded-lg flex-shrink-0"
                />
                <p className="w-[200px] flex justify-start sm:ml-9 ml-3 text-black sm:text-base text-[13px] font-normal capitalize">
                  {cart?.title}
                </p>
                <section className="h-full px-3 flex flex-1 flex-col items-end gap-8">
                  <div>
                    <p className="text-black sm:text-[18px] text-sm font-[500]">
                      {moneyFormat(cart?.regular_price)}
                    </p>
                    {/* <p className="w-full text-black text-[12px] font-[400]">{cart?.title}</p> */}
                  </div>

                  <button
                    className="flex w-5 h-5 cursor-pointer"
                    type="button"
                    disabled={removeIsLoading}
                    onClick={() => {
                      console.log(cart?.artId, 'REMOVE');
                      dispatch(removeCart({ artId: cart?.artId }));
                      cart?.order_id && removeCartItem({ item_id: Number(cart?.order_id) });
                    }}
                  >
                    <Icon name="delete" size="20" color="orange" />
                  </button>
                </section>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <Img
                src="/assets/img/no-data-found.png"
                width={110}
                height={90}
                alt="Not art found in the Carts"
              />
              No Arts found in the cart
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartItemDrawer;
