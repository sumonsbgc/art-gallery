/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
'use client';
import { useEffect, useState } from 'react';
import Chart from '@/components/common/Charts/Chart';
import { PriceShortChartSkeleton, Button, Text } from '@/components/common';
import { useAppDispatch } from '@/redux/hooks';
import { toggleActiveTab } from '@/redux/features/tab/tabSlice';
import { useRouter } from 'next/navigation';
import { useGetShortPriceGraphDataQuery } from '@/redux/features/arts/artsApi';
import { Icon } from '@/components/ui';
import moment from 'moment';
import { CustomToolTipType } from '@/types/meta.type';
import { getValidNumber, moneyFormat } from '@/utils';

const PriceShortChart = ({ itemId }: { itemId: number }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [priceData, setPriceData] = useState([]);
  const [lastWeekRate, setLastWeekRate] = useState<number>();
  const [lastMontRate, setLastMonthRate] = useState<number>();
  const [weekStatus, setWeekStatus] = useState<string>();
  const [monthStatus, setMonthStatus] = useState<string>();

  const {
    data: graphData,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetShortPriceGraphDataQuery(itemId, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccess && Array.isArray(graphData?.data) && graphData?.data?.length > 0) {
      const priceList = graphData?.data?.map(
        (graph: any) => graph?.price !== null && [graph?.timestamp_ms, Number(graph?.price)]
      );

      setPriceData(priceList);
      setLastWeekRate(graphData?.last_week_data);
      setLastMonthRate(graphData?.last_month_data);

      setWeekStatus(graphData?.last_week_status);
      setMonthStatus(graphData?.last_month_status);
    }
  }, [isSuccess, isLoading, isError, graphData]);

  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'PRICE',
        data: []
      }
    ],
    options: {
      chart: {
        height: 150,
        id: 'area-datetime',
        type: 'area',
        zoom: {
          autoScaleYaxis: true
        },
        toolbar: {
          show: false
        }
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: '#999',
            label: {
              show: true,
              style: {
                color: '#fff',
                background: '#000'
              }
            }
          }
        ],
        xaxis: [
          {
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              style: {
                color: '#fff',
                background: '#FF6F61'
              }
            }
          }
        ]
      },
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
        // padding: {
        //   right: 20,
        // }
      },
      markers: {
        size: 0
      },
      yaxis: {
        tickAmount: 2,
        forceNiceScale: true,
        labels: {
          formatter: function (value: number) {
            return `$${value}`;
          }
        }
      },
      xaxis: {
        type: 'datetime',
        labels: {
          showDuplicates: true
          // formatter: function (value: number) {
          //   return moment(value).format('MMM DD');
          // }
        },
        tooltip: {
          enabled: false
        }
      },
      tooltip: {
        style: {
          fontFamily: 'Jost'
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }: CustomToolTipType) {
          console.log(w.config.series, 'SHORT');
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

  const clickHandler = () => {
    // details-tab
    if (window && typeof window !== 'undefined') {
      console.log(`${window.location}`, 'WINDOW LOCATION');
      router.push(`${window.location.href}/#details-tab`);
    }
    dispatch(toggleActiveTab({ activeTab: 'price-breakdown' }));
  };

  return isLoading && priceData?.length < 1 ? (
    <PriceShortChartSkeleton />
  ) : (
    <div className="w-full bg-white relative artPriceShortChart">
      {priceData && (
        <div className="relative border border-black/10 pb-2">
          <div className="flex justify-between mt-6 px-3">
            <div className="flex gap-3">
              <Text className="text-black text-xs font-normal">Last 1 week</Text>
              <Text className="flex gap-2 items-center">
                {getValidNumber(lastWeekRate || 0)?.toFixed(2)}%{' '}
                {weekStatus === 'down' ? (
                  <Icon name="lower-triangle" />
                ) : (
                  <Icon name="upper-triangle" />
                )}
              </Text>
            </div>
            <div className="flex gap-3">
              <Text className="text-black text-xs font-normal">Last 30 days</Text>
              <Text className="flex gap-2 items-center">
                {getValidNumber(lastMontRate || 0)?.toFixed(2)}%{' '}
                {monthStatus === 'down' ? (
                  <Icon name="lower-triangle" />
                ) : (
                  <Icon name="upper-triangle" />
                )}
              </Text>
            </div>
          </div>
          <Chart type="area" height={155} options={chartData?.options} series={chartData?.series} />
          <div className="see-details-hover block bg-white rounded-full px-2">
            <Button
              type="button"
              className="cursor-pointer flex items-center gap-2 text-orange !py-1 !px-2 text-xs bg-orange/10 hover:bg-orange/30 rounded-full ml-auto"
              onClick={clickHandler}
            >
              See All <Icon name="arrow-right-long" color="orange" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceShortChart;
