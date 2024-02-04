/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import Chart from '@/components/common/Charts/Chart';
import { useGetDetailPriceGraphDataQuery } from '@/redux/features/arts/artsApi';
import { Title } from '@/components/common';
import Select from '@/components/checkout/Select';
import moment from 'moment';
import { CustomToolTipType } from '@/types/meta.type';
import { moneyFormat } from '@/utils';

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
        },
        toolbar: {
          show: false
        }
      },
      // annotations: {
      //   yaxis: [
      //     {
      //       y: 30,
      //       borderColor: '#999',
      //       label: {
      //         show: true,
      //         style: {
      //           color: '#fff',
      //           background: '#000'
      //         }
      //       }
      //     }
      //   ],
      //   xaxis: [
      //     {
      //       borderColor: '#999',
      //       yAxisIndex: 0,
      //       label: {
      //         show: true,
      //         style: {
      //           color: '#fff',
      //           background: '#FF6F61'
      //         }
      //       },
      //     }
      //   ]
      // },
      colors: ['#FF6F61'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight',
        colors: ['#FF6F61']
      },
      grid: {
        borderColor: '#EEE',
        strokeDashArray: 8
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        labels: {
          showDuplicates: true
        },
        tooltip: {
          enabled: false
        },
        tickPlacement: 'on'
      },
      tooltip: {
        x: {
          show: false
        },
        style: {
          fontFamily: 'Jost'
        },
        custom: function ({ seriesIndex, dataPointIndex, w }: CustomToolTipType) {
          console.log(
            w.config.series[seriesIndex].data[dataPointIndex],
            'LONGCHART',
            dataPointIndex
          );
          const dataPoint = w.config.series[seriesIndex].data[dataPointIndex];
          const price = dataPoint[1];
          const date = new Date(dataPoint[0]);
          return `<div class="arrow_box bg-[#2C3131] px-[10px] py-[4px] text-center">
            <div class="text-[#ECECEC] text-xs">${moment(date).format('MMM DD YYYY')}</div>
            <div class="text-white font-medium text-sm">Price: ${moneyFormat(price)}</div>
          </div>`;
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
      const priceList = graphData?.data?.map((graph: any) => [
        graph?.timestamp_ms,
        Number(graph?.price)
      ]);
      setPriceData(priceList);
    } else {
      setPriceData([]);
    }
  }, [isSuccess, isLoading, graphData]);

  useEffect(() => {
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
    setFilter(value);

    if (value === 'last_five_days') {
      const startDate = moment().subtract(5, 'days').startOf('day').toDate();
      const endDate = moment().subtract(1, 'days').endOf('day').toDate();

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        moment(startDate).valueOf(),
        moment(endDate).valueOf()
      );
    }

    if (value === 'current_month') {
      const startDate = moment().startOf('month').toDate();
      const endDate = moment().endOf('month').toDate();

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        moment(startDate).valueOf(),
        moment(endDate).valueOf()
      );
    }

    if (value === 'last_month') {
      const startDate = moment().subtract(1, 'months').startOf('month').toDate();
      const endDate = moment().subtract(1, 'months').endOf('month').toDate();

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        moment(startDate).valueOf(),
        moment(endDate).valueOf()
      );
    }

    if (value === 'last_six_month') {
      const startDate = moment().subtract(6, 'months').startOf('month').toDate();
      const endDate = moment().subtract(1, 'months').endOf('month').toDate();

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        moment(startDate).valueOf(),
        moment(endDate).valueOf()
      );
    }

    if (value === 'current_year' || value === '') {
      const startDate = moment().startOf('year').toDate();
      const endDate = moment().endOf('year').toDate();
      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        moment(startDate).valueOf(),
        moment(endDate).valueOf()
      );
      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
    }

    if (value === 'last_year') {
      const startDate = moment().subtract(1, 'years').startOf('year').toDate();
      const endDate = moment().subtract(1, 'years').endOf('year').toDate();

      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        moment(startDate).valueOf(),
        moment(endDate).valueOf()
      );

      setDateRange({
        startDate: moment(startDate).format('YYYY-MM-DD'),
        endDate: moment(endDate).format('YYYY-MM-DD')
      });
    }

    if (value === 'last_five_year') {
      const startDate = moment().subtract(5, 'years').startOf('year').toDate();
      const endDate = moment().subtract(1, 'years').endOf('year').toDate();

      ApexCharts.exec(
        'area-datetime',
        'zoomX',
        moment(startDate).valueOf(),
        moment(endDate).valueOf()
      );

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
          <div className="flex justify-between flex-wrap px-4 py-4">
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
                  { value: 'last_five_days', label: 'Last 5 Days' },
                  { value: 'current_month', label: 'This Month' },
                  { value: 'last_month', label: 'Last Month' },
                  { value: 'last_six_month', label: 'Last 6 Months' },
                  { value: 'current_year', label: 'This Year' },
                  { value: 'last_year', label: 'Last Year' },
                  { value: 'last_five_year', label: 'Last 5 Years' }
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
