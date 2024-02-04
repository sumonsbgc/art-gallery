/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// components
import Wrapper from '@/components/layout/Wrapper';
import Layout from '@/components/layout';
import { TabContent, TabFilterItem } from '@/components/ui/Tab';
import { BreadCrumb } from '@/components/ui';
import { OrderItem } from '@/components/order';
import { ComponentLoader, NoDataFound } from '@/components/common';

// redux
import {
  useGetOrderListQuery,
  useLazyGetOrderListQuery
} from '@/redux/features/payment/paymentApi';
import {
  getOrderList as getMyOrderList,
  getTotalOrderCount
} from '@/redux/selector/payment.selector';
import { OrderType } from '@/redux/features/artist/artist.types';

// utils
import { addZero } from '@/utils';

const MyOrders = () => {
  const [getOrderList] = useLazyGetOrderListQuery();
  const { refetch, isLoading } = useGetOrderListQuery({});
  const orderList: OrderType[] = getMyOrderList();
  const totalOrderCount = getTotalOrderCount();
  const [page, setPage] = useState<number>(1);

  const currentOrders = orderList?.filter(
    (order) => order.delivery_status !== 1 && order.cancel_status !== 1
  );
  const receivedOrders = orderList?.filter((order) => order.delivery_status === 1);
  const cancelledOrders = orderList?.filter((order) => order.cancel_status === 1);

  const tabs = [
    {
      title: `Current Orders (${addZero(currentOrders.length || 0)})`,
      id: 'current-orders',
      data: currentOrders
    },
    {
      title: `Received Orders (${addZero(receivedOrders.length || 0)})`,
      id: 'received-orders',
      data: receivedOrders
    },
    {
      title: `Cancelled Orders (${addZero(cancelledOrders.length || 0)})`,
      id: 'cancelled-orders',
      data: cancelledOrders
    }
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);

  const handleLoadMore = async () => {
    const res = await getOrderList({ page: page + 1 });

    if (res?.data?.status === 'success') {
      if (res?.data?.data?.next_page_url) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Layout headerBottomBorder>
      <section className="productDetailSection pt-5 pb-20">
        <Wrapper>
          <BreadCrumb parentPage="Home" currentPage="My Orders" />

          {/* tab */}
          <ul className="tab-filter mt-5 mb-6">
            {tabs?.map((tab) => {
              return (
                <TabFilterItem
                  key={tab?.id}
                  title={tab?.title}
                  activeTab={activeTab}
                  id={tab?.id}
                  activeHandler={() => setActiveTab(tab?.id)}
                  className="!py-[7px] !px-4 bg-gray3 font-normal text-base"
                  activeClass="!bg-black !text-white font-medium"
                />
              );
            })}
          </ul>

          {isLoading ? (
            <ComponentLoader />
          ) : (
            <InfiniteScroll
              dataLength={orderList?.length}
              next={handleLoadMore}
              hasMore={orderList?.length < totalOrderCount}
              loader={
                <div className="flex justify-center my-4">
                  <span className="page-loader" />
                </div>
              }
            >
              {tabs?.map((tab) => {
                return (
                  <TabContent id={tab?.id} key={tab?.id} activeTab={activeTab}>
                    {tab?.data?.length > 0 ? (
                      tab?.data?.map((order: OrderType) => (
                        <OrderItem
                          key={order?.ItemOrder?.ord_id}
                          image={order?.ItemOrder?.itemDetail?.image_path}
                          name={order?.ItemOrder?.itemDetail?.item_name}
                          orderDate={order?.payment_date}
                          orderNo={String(order.chout_id)}
                          quantity={order?.quantity}
                          total={Number(order?.item_prices)}
                          status={{
                            date1: order.payment_date || '',
                            date2: order.shipping_status === 1 ? String(order.shipping_time) : '',
                            date3: order.delivery_status === 1 ? String(order.delivery_time) : ''
                          }}
                          isCancelled={order?.cancel_status === 1}
                        />
                      ))
                    ) : (
                      <NoDataFound content="No Order is found" />
                    )}
                  </TabContent>
                );
              })}
            </InfiniteScroll>
          )}
        </Wrapper>
      </section>
    </Layout>
  );
};

export default MyOrders;
