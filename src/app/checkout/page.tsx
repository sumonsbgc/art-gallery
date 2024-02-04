'use client';

import React, { useEffect, useState } from 'react';
// import { Metadata } from 'next';
import Layout from '@/components/layout';
import Wrapper from '@/components/layout/Wrapper';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
// import Icon from '@/components/ui/Icon';
import { STRIPE_PUB_KEY } from '@/config';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutItem from '@/components/checkout/CheckoutItem';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useGetOrderItemsQuery } from '@/redux/features/carts/cartsApi';
import { ordersProp } from '@/components/checkout/type';
import { BreadCrumb } from '@/components/ui';

// export const metadata: Metadata = {
//   title: 'Checkout',
//   description: 'Checkout page'
// };

const CheckoutPage = () => {
  const [stripePromise, setStripePromise] = useState(loadStripe(`${STRIPE_PUB_KEY}`));
  const [orders, setOrders] = useState<ordersProp[]>([] as ordersProp[]);
  const { data, isLoading, isSuccess, refetch } = useGetOrderItemsQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [couponAmount, setCouponAmount] = useState<number>(0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccess) {
      setOrders(data?.data);
    }
  }, [isLoading, isSuccess, data]);

  useEffect(() => {
    const total = orders?.reduce((sum, order) => sum + order?.item_price, 0);
    setTotalAmount(total);
  }, [orders]);

  useEffect(() => {
    setStripePromise(loadStripe(`${STRIPE_PUB_KEY}`));
  }, []);

  return (
    <Layout headerBottomBorder={true}>
      <Wrapper>
        <div className="w-full">
          <BreadCrumb parentPage="All Arts" currentPage="Checkout" />
        </div>
        <div className="w-full mt-10 md:flex gap-2 md:mb-40">
          <div className="w-full md:w-8/12">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                orders={orders}
                totalAmount={totalAmount - couponAmount}
                setCouponAmount={setCouponAmount}
                refetch={undefined}
              />
            </Elements>
          </div>
          <div className="w-full md:w-4/12 ">
            <div className="w-full min-h-[500px] md:p-8 sm:p-6 p-4 border border-gray2/90">
              <CheckoutItem orders={orders} refetch={refetch} />
              <OrderSummary
                grandTotal={totalAmount - couponAmount}
                shippingStatus="Free"
                subTotal={totalAmount}
                couponAmount={couponAmount}
                discountPrice={0}
              />
            </div>
          </div>
        </div>
      </Wrapper>
      <NewsLetter newsLetterForm />
    </Layout>
  );
};

export default CheckoutPage;
