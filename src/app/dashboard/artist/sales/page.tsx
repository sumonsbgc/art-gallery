'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Swal from 'sweetalert2';

// ant design
import { Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// components
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import { TabContent, TabFilterItem } from '@/components/ui/Tab';

// redux
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from '@/redux/features/artist/artistApi';
import { getAllOrders, getAnalytics } from '@/redux/selector/artist.selector';
import { ArtistSalesAnalytics } from '@/redux/features/artist/artist.types';

// utils
import { numberShort } from '@/utils';

type DataType = {
  key: string | number;
  artwork: string;
  orderDate: string;
  customerName: string;
  email: string;
  country: string;
  price: string | number;
  status: string;
  action: string;
  slug: string;
  shipping_status: number;
  delivery_status: number;
  cancel_status: number;
};

const SalesPage = () => {
  // state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pendingOrders, setPendingOrders] = useState<DataType[]>([]);
  const [shippedOrders, setShippedOrders] = useState<DataType[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<DataType[]>([]);

  // redux query/mutation
  const { refetch, isLoading } = useGetOrdersQuery({ page }, { refetchOnMountOrArgChange: true });
  const [updateOrderStatus, isUpdateOrderLoading] = useUpdateOrderStatusMutation();

  // redux selector
  const allOrders = getAllOrders();
  const analytics: ArtistSalesAnalytics = getAnalytics();

  const artistSalesData = [
    {
      icon: 'delivered-order',
      name: 'Delivered Order',
      value: analytics?.deliverOrder || 0,
      bgColor: 'bg-blue2'
    },
    {
      icon: 'pending-order',
      name: 'Pending Order',
      value: analytics?.pendingOrder || 0,
      bgColor: 'bg-orange2'
    },
    {
      icon: 'total-sales',
      name: 'Total Sales',
      value: `$${numberShort(analytics?.totalIncome || 0)}`,
      bgColor: 'bg-green3'
    }
  ];

  const tabs = [
    {
      title: 'Pending Order',
      id: 'pending-order',
      data: pendingOrders,
      count: pendingOrders.length
    },
    {
      title: 'Shipped Order',
      id: 'shipped-order',
      data: shippedOrders,
      count: shippedOrders.length
    },
    {
      title: 'Delivered Order',
      id: 'delivered-order',
      data: deliveredOrders,
      count: deliveredOrders.length
    }
  ];

  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);

  const columns: ColumnsType<DataType> = [
    {
      title: 'Artwork',
      dataIndex: 'artwork'
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate'
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Country',
      dataIndex: 'country'
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_, record) => {
        let status = '';

        if (record?.delivery_status === 1) {
          status = 'Delivered';
        } else if (record?.shipping_status === 1) {
          status = 'Shipped';
        } else {
          status = 'Processing';
        }

        const order_id = record.key;

        return (
          <Select
            defaultValue={status}
            style={{ width: 120 }}
            onChange={(value) => handleStatusChange(value, String(order_id))}
            options={
              status === 'Shipped'
                ? [{ label: 'Delivered', value: 'deliver' }]
                : [
                    { label: 'Shipped', value: 'ship' },
                    { label: 'Delivered', value: 'deliver' }
                  ]
            }
            className={`w-[108px] h-[22px] py-2 bg-neutral-50 rounded-[50px] border border-zinc-300 justify-start items-center gap-1 inline-flex ${
              status === 'Shipped'
                ? 'text-blue'
                : status === 'Delivered'
                ? 'text-green'
                : 'text-orange'
            }`}
            bordered={false}
            disabled={status === 'Delivered'}
          />
        );
      }
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <Link
          href={`/dashboard/artist/sales/${record?.key}`}
          className="text-orange hover:text-orange underline"
        >
          {text}
        </Link>
      )
    }
  ];

  const handleStatusChange = async (value: string, order_id: string) => {
    const formData = new FormData();

    formData.append('order_id', order_id);
    formData.append('status', value);

    const res: any = await updateOrderStatus(formData);

    refetch();

    if (res?.data?.status === 'success') {
      Swal.fire({
        icon: 'success',
        title: res?.data?.message || 'Order Status Updated Successfully',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: res?.error?.data?.message || 'Something Went Wrong While Updating Order Status',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  };

  useEffect(() => {
    setPageSize(allOrders?.per_page || 10);
  }, [allOrders?.per_page]);

  useEffect(() => {
    const _pendingOrders: DataType[] = [];
    const _shippedOrders: DataType[] = [];
    const _deliveredOrders: DataType[] = [];

    allOrders?.data?.forEach((item: any) => {
      const data = {
        key: item?.chout_id,
        artwork: item?.ItemOrder?.itemDetail?.item_name,
        orderDate: item?.payment_date,
        customerName: item?.buyer?.name,
        email: item?.order_email,
        country: item?.ItemOrder?.customerDetail?.country?.country_name,
        price: Number(item?.item_prices),
        status: item?.payment_status,
        slug: item?.ItemOrder?.itemDetail?.item_slug,
        shipping_status: item?.shipping_status,
        delivery_status: item?.delivery_status,
        cancel_status: item?.cancel_status,
        action: 'See Details'
      };

      if (item.delivery_status === 1) {
        _deliveredOrders.push(data);
      } else if (item?.shipping_status === 1) {
        _shippedOrders.push(data);
      } else {
        _pendingOrders.push(data);
      }
    });

    setPendingOrders(_pendingOrders);
    setShippedOrders(_shippedOrders);
    setDeliveredOrders(_deliveredOrders);
  }, [allOrders, analytics, isLoading, isUpdateOrderLoading]);

  return (
    <Wrapper>
      <section className="grid grid-cols-1 md:grid-cols-0 md:flex md:justify-between gap-[50px]">
        {artistSalesData?.map((item) => (
          <aside
            key={item?.name}
            className={`w-[343px] h-[129px] md:w-[380px] md:h-[180px] p-12 justify-between items-center inline-flex ${item?.bgColor}`}
          >
            <div className="flex-col justify-start items-start gap-2.5 inline-flex">
              <Icon name={item?.icon} size="48" color="white" />
              <p className="text-white text-lg font-normal">{item?.name}</p>
            </div>
            <p className="text-white text-[40px] font-medium">{item?.value}</p>
          </aside>
        ))}
      </section>

      {/* tab */}
      <ul className="tab-filter mt-9 mb-4">
        {tabs?.map((tab) => {
          return (
            <TabFilterItem
              key={tab?.id}
              id={tab?.id}
              title={tab?.title}
              activeTab={activeTab}
              activeHandler={() => setActiveTab(tab?.id)}
              className="!py-[7px] !px-3 bg-gray3 font-normal text-base"
              activeClass="!bg-black !text-white font-medium"
            />
          );
        })}
        <div className="w-full h-[1px] border border-lightgray4 mt-10" />
      </ul>

      <section className="w-full flex justify-between gap-4 my-4 overflow-y-hidden">
        {tabs.map((tab) => (
          <TabContent key={tab.id} id={tab.id} activeTab={activeTab}>
            <Table
              style={{ width: '100%' }}
              columns={columns}
              dataSource={tab.data}
              pagination={{
                position: ['bottomCenter'],
                current: page,
                pageSize,
                total: tab.count,
                onChange: (page) => {
                  setPage(page);
                }
              }}
              bordered
              className="w-full rounded-none"
            />
          </TabContent>
        ))}
      </section>
    </Wrapper>
  );
};

export default SalesPage;
