/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Chart from '@/components/common/Charts/Chart';
import { useGetDetailPriceGraphDataQuery } from '@/redux/features/arts/artsApi';
import { Title } from '@/components/common';
import Select from '@/components/checkout/Select';
import moment from 'moment';

const PriceBreakDown = ({ itemId }: { itemId: number }) => {
  const [dateRange, setDateRange] = useState<{ startDate: string | null; endDate: string | null }>({
    startDate: null,
    endDate: null
  });
  const [filter, setFilter] = useState('');
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'PRICE',
        data: []
      }
    ],
    options: {
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center'
      },
      colors: ['#FF6F61'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        colors: ['#FF6F61']
      },
      annotations: {},
      grid: {
        borderColor: '#EEE',
        strokeDashArray: 8
      },
      yaxis: {
        forceNiceScale: true,
        labels: {
          formatter: function (value: number) {
            return `$${value}`;
          }
        }
      },
      xaxis: {
        type: 'month'
      },
      tooltip: {
        enabled: true,
        followCursor: true,
        style: {
          backgroundColor: '#fff'
        },
        x: {
          show: true
        },
        y: {
          formatter: function (value: number) {
            if (!Number.isNaN(value)) {
              return `$${value}`;
            } else {
              return 'No Data Found';
            }
          }
        }
      }
    }
  });

  const [priceData, setPriceData] = useState([]);
  const {
    data: graphData,
    isLoading,
    isSuccess,
    refetch
  } = useGetDetailPriceGraphDataQuery(
    { itemId, start_date: dateRange?.startDate, end_date: dateRange?.endDate },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    console.log(graphData?.data, 'ArgChange');
    if (isSuccess && Array.isArray(graphData?.data) && graphData?.data?.length > 0) {
      // const priceList = graphData?.data?.filter((graph: any) => graph?.price !== null).map((graph: any) => Number(graph?.price));
      const priceList = graphData?.data?.map(
        (graph: any) => graph?.price !== null && Number(graph?.price)
      );
      setPriceData(priceList);
    }
  }, [isSuccess, isLoading, graphData?.data]);

  useEffect(() => {
    console.log(priceData, 'PRICE DATA');
    setChartData((prevState) => ({
      ...prevState,
      series: [
        {
          name: 'PRICE',
          data: priceData
        }
      ]
    }));
  }, [priceData]);

  const onFilterHandler = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const value = e.target.value;
    console.log(e.target.value, 'FILTER');

    setFilter(e.target.value);
    if (value === 'current_month') {
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().endOf('month').toDate();

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
    }

    if (value === 'last_month') {
      const startDate = moment().subtract(1, 'months').startOf('month').toDate();
      const endDate = moment().subtract(1, 'months').endOf('month').toDate();

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
    }

    if (value === 'current_year') {
      const startDate = moment().startOf('year').toDate();
      const endDate = moment().endOf('year').toDate();

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
    }

    if (value === 'last_year') {
      const startDate = moment().subtract(1, 'years').startOf('year').toDate();
      const endDate = moment().subtract(1, 'years').endOf('year').toDate();
      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
    }
  };

  return (
    <div className="w-full bg-white shadow-md border border-black/10">
      {priceData && (
        <>
          <div className="flex justify-between px-4 py-4">
            <Title content="Price Breakdown Insights" />
            <div className="flex items-center gap-2">
              <div className="block w-3 h-3 bg-orange"></div>Price
            </div>
            <div className="w-32">
              <Select
                label="Select Filter"
                value={filter}
                onChange={onFilterHandler}
                name="filter"
                option={[
                  { value: 'current_month', label: 'This Month' },
                  { value: 'last_month', label: 'Last Month' },
                  { value: 'current_year', label: 'This Year' },
                  { value: 'last_year', label: 'Last Year' }
                ]}
                className="px-4 !py-1 bg-white focus:outline-none text-sm w-[full] !h-[32px] !min-h-0"
                wrapperClass="!min-h-0"
              />
            </div>
          </div>
          <Chart type="area" height={255} options={chartData?.options} series={chartData?.series} />
        </>
      )}
    </div>
  );
};

export default PriceBreakDown;
