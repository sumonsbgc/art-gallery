'use client';

import Link from 'next/link';
import Image from 'next/image';

// components
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';

// redux
import { useGetSingleOrderQuery } from '@/redux/features/artist/artistApi';
import { getSingleOrderDetails } from '@/redux/selector/artist.selector';
import { moneyFormat } from '@/utils';

type InfoItem = {
  label: string;
  value: string;
};

const InfoItem = ({ label, value }: InfoItem) => (
  <div className="max-w-[221px]">
    <h4 className="text-gray7 text-sm font-normal">{label}</h4>

    {label === 'Like' ? (
      <div className="flex items-center gap-[6px]">
        <Icon name="heart-fill" size="18" color="orange" />
        <p className="text-sm text-orange font-medium">{value}</p>
      </div>
    ) : (
      <p className="leading-snug text-base text-black font-normal">{value}</p>
    )}
  </div>
);

const SaleItem = ({ params }: { params: { slug: string } }) => {
  useGetSingleOrderQuery(params.slug);
  const orderDetails = getSingleOrderDetails();

  const orderInfo = [
    {
      label: 'Order Date',
      value: orderDetails?.payment_date
    },
    {
      label: 'Name',
      value: `${orderDetails?.order_firstname} ${orderDetails?.order_lastname}`
    },
    {
      label: 'Email',
      value: orderDetails?.order_email
    },
    {
      label: 'Country',
      value: orderDetails?.ItemOrder?.customerDetail?.country?.country_name || ''
    },
    {
      label: 'Shipping Address',
      value: `
      ${
        orderDetails?.order_address === '' ||
        orderDetails?.order_address === null ||
        orderDetails?.order_address === undefined
          ? ''
          : `${orderDetails?.order_address}, `
      }
      ${
        orderDetails?.order_city === '' ||
        orderDetails?.order_city === null ||
        orderDetails?.order_city === undefined
          ? ''
          : `${orderDetails?.order_city}, `
      } 
      ${
        orderDetails?.state === '' ||
        orderDetails?.state === null ||
        orderDetails?.state === undefined
          ? ''
          : `${orderDetails?.state}, `
      } 
      ${
        orderDetails?.order_country === '' ||
        orderDetails?.order_country === null ||
        orderDetails?.order_country === undefined
          ? ''
          : `${orderDetails?.order_country}, `
      } 
      ${
        orderDetails?.order_zipcode === '' ||
        orderDetails?.order_zipcode === null ||
        orderDetails?.order_zipcode === undefined
          ? ''
          : `${orderDetails?.order_zipcode}`
      }`
    },
    {
      label: 'Billing Address',
      value: `
      ${
        orderDetails?.bill_address === '' ||
        orderDetails?.bill_address === null ||
        orderDetails?.bill_address === undefined
          ? ''
          : `${orderDetails?.bill_address}, `
      }
      ${
        orderDetails?.bill_city === '' ||
        orderDetails?.bill_city === null ||
        orderDetails?.bill_city === undefined
          ? ''
          : `${orderDetails?.bill_city}, `
      }
      ${
        orderDetails?.bill_state === '' ||
        orderDetails?.bill_state === null ||
        orderDetails?.bill_state === undefined
          ? ''
          : `${orderDetails?.bill_state}, `
      }
      ${
        orderDetails?.bill_country === '' ||
        orderDetails?.bill_country === null ||
        orderDetails?.bill_country === undefined
          ? ''
          : `${orderDetails?.bill_country}, `
      }
      ${
        orderDetails?.bill_zip_code === '' ||
        orderDetails?.bill_zip_code === null ||
        orderDetails?.bill_zip_code === undefined
          ? ''
          : `${orderDetails?.bill_zip_code}`
      }`
    }
  ];

  const artInfo = [
    {
      label: 'Art Name',
      value: orderDetails?.ItemOrder?.itemDetail?.item_name || ''
    },
    {
      label: 'Frame Size',
      value: `Size: ${orderDetails?.ItemOrder?.itemDetail?.size_id?.name || ''}`
    },
    {
      label: 'Price',
      value: `${moneyFormat(Number(orderDetails?.item_prices)) || 0}`
    },
    {
      label: 'Like',
      value: `${orderDetails?.ItemOrder?.itemDetail?.total_favorite || 0} Like`
    },
    {
      label: 'Critics Review',
      value: `${orderDetails?.ItemOrder?.itemDetail?.avg_critic_rating || 0}/5`
    },
    {
      label: 'Normal Review',
      value: `${orderDetails?.ItemOrder?.itemDetail?.avg_customer_rating || 0}/5`
    }
  ];

  const orderStatus =
    orderDetails?.shipping_status === 1
      ? 'Shipped'
      : orderDetails?.cancel_status === 1
      ? 'Cancelled'
      : 'Processing';

  return (
    <Wrapper>
      <Link href="/dashboard/artist/sales" className="flex items-center gap-2 cursor-pointer">
        <Icon name="arrow-left" size="22" color="black" />
        <h4 className="text-right text-black text-base font-medium">Back</h4>
      </Link>

      <div className="w-full mt-6 md:flex md:items-start md:justify-between md:gap-4">
        <aside className="w-full md:w-[65%]">
          {/* order information */}
          <section className="w-full">
            <div className="mb-[10px] flex justify-between items-center">
              <h3 className="text-black text-xl font-medium">Order Information</h3>

              <div className="items-center gap-3 flex">
                <p className="text-gray7 text-sm font-normal">Order Status</p>

                <div className="px-3 py-1 bg-blue2 rounded-full justify-center items-center flex gap-1">
                  <Icon name="sync" size="12" color="white" />
                  <p className="text-white text-sm font-normal leading-tight">{orderStatus}</p>
                </div>
              </div>
            </div>

            <div className="w-full border border-black border-opacity-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
              {orderInfo?.map((item) => (
                <InfoItem key={item?.label} label={item?.label} value={item?.value} />
              ))}
            </div>
          </section>

          {/* art information */}
          <section className="w-full mt-6">
            <h3 className="text-black text-xl font-medium mb-[10px]">Art Information</h3>

            <div className="w-full border border-black border-opacity-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
              {artInfo?.map((item) => (
                <InfoItem key={item?.label} label={item?.label} value={item?.value} />
              ))}
            </div>
          </section>
        </aside>

        {/* art name and image */}
        <aside className="w-full md:max-w-[341px]">
          <h3 className="text-black text-xl font-medium">
            {orderDetails?.ItemOrder?.itemDetail?.item_name}
          </h3>

          <div className="w-[340px] h-[449px]">
            <Image
              src={orderDetails?.ItemOrder?.itemDetail?.image_path}
              alt="art"
              width={340}
              height={449}
              className="w-full h-full"
            />
          </div>
        </aside>
      </div>
    </Wrapper>
  );
};

export default SaleItem;
