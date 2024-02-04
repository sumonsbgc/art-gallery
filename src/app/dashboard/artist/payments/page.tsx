'use client';

import React, { useEffect, useState } from 'react';

// ant design
import { Table, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';

// components
import Wrapper from '@/components/layout/Wrapper';

// redux
import {
  useGetDisburseAnalyticsQuery,
  useGetWithdrawsQuery
} from '@/redux/features/artist/artistApi';
import { getAllWithdraws, getDisburseAnalyticsData } from '@/redux/selector/artist.selector';

// utils
import { numberShort } from '@/utils';

// types
import { Withdraw } from '@/redux/features/artist/artist.types';

const columns: ColumnsType<Withdraw> = [
  {
    title: 'Month',
    dataIndex: 'month'
  },
  {
    title: 'Disburse Date',
    dataIndex: 'wd_date'
  },
  {
    title: 'Receive Amount',
    dataIndex: 'wd_amount'
  },
  {
    title: 'Due Amount',
    dataIndex: 'available_balance'
  }
];

const PaymentsPage = () => {
  // state
  const [filterByYear, setFilterByYear] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // redux query
  useGetDisburseAnalyticsQuery({});
  const { isLoading } = useGetWithdrawsQuery(
    { page, year: filterByYear },
    { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  );

  // redux selector
  const withdraws = getAllWithdraws();
  const disburseAnalytics = getDisburseAnalyticsData();

  const artistPaymentsData = [
    {
      icon: 'total-sell',
      title: 'Total Sales',
      value: `$${numberShort(disburseAnalytics?.totalSell || 0)}`,
      bgColor: 'bg-blue2',
      adminCommission: `Admin Commission -$${numberShort(disburseAnalytics?.adminCommission || 0)}`
    },
    {
      icon: 'your-commission',
      title: 'Net Amount',
      value: `$${numberShort(disburseAnalytics?.myCommission || 0)}`,
      bgColor: 'bg-cyan'
    },
    {
      icon: 'total-received',
      title: 'Total Received',
      value: `$${numberShort(disburseAnalytics?.totalReceived || 0)}`,
      bgColor: 'bg-green3'
    },
    {
      icon: 'total-due',
      title: 'Total Due',
      value: `$${numberShort(disburseAnalytics?.totalDue || 0)}`,
      bgColor: 'bg-orange2'
    }
  ];

  useEffect(() => {
    setPageSize(withdraws?.per_page || 10);
  }, [withdraws?.per_page]);

  return (
    <Wrapper>
      <section className="grid grid-cols-2 md:grid-cols-0 md:flex md:justify-between gap-4 md:gap-[22px]">
        {artistPaymentsData?.map((item) => (
          <aside
            key={item?.title}
            className={`w-[168px] h-[69px] md:w-[292px] md:h-[180px] px-[30px] py-12 justify-start items-center flex ${item?.bgColor}`}
          >
            <div className="flex-col justify-start items-start flex">
              <p className="text-white text-[14px] font-[400] md:text-lg md:font-normal">
                {item?.title}
              </p>
              <h3 className="text-right text-white text-[24px] md:text-[32px] font-medium">
                {item?.value}
              </h3>

              {item?.adminCommission && (
                <p className="text-white text-[10px] md:text-sm font-medium">
                  {item?.adminCommission}
                </p>
              )}
            </div>
          </aside>
        ))}
      </section>

      <section className="w-full flex justify-between items-center mt-8 mb-3">
        <h3 className="text-black text-2xl font-medium leading-normal">Disburse Details</h3>

        <DatePicker
          picker="year"
          placeholder="Filter By Year"
          onChange={(_, yearString) => setFilterByYear(yearString)}
          className="w-[150px] h-[32px] pl-3 px-4 py-1 text-sm text-gray5"
        />
      </section>

      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={withdraws.data}
        loading={isLoading}
        pagination={{
          position: ['bottomCenter'],
          current: page,
          pageSize,
          total: withdraws.total,
          onChange: (page) => {
            setPage(page);
          }
        }}
        bordered
        className="w-full rounded-none"
      />
    </Wrapper>
  );
};

export default PaymentsPage;
