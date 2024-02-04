import { useEffect, useState } from 'react';
import Image from 'next/image';
import Swal from 'sweetalert2';

// components
import { Icon } from '@/components/ui';
import CancelOrderModal from './CancelOrderModal';

// utils
import { addZero, formatDate, moneyFormat } from '@/utils';

// redux
import { useChangeOrderStatusMutation } from '@/redux/features/payment/paymentApi';

type OrderItemProps = {
  image: string;
  name?: string;
  orderDate?: string;
  orderNo?: string;
  quantity?: number;
  total?: number;
  status: {
    date1: string;
    date2: string;
    date3: string;
  };
  isCancelled?: boolean;
};

const OrderItem = ({
  image = '',
  name = '',
  orderDate,
  orderNo,
  quantity = 1,
  total,
  status: { date1, date2, date3 },
  isCancelled = false
}: OrderItemProps) => {
  const [changeOrderStatus, { isLoading, isSuccess, isError }] = useChangeOrderStatusMutation({});
  const [openCancelModal, setOpenCancelModal] = useState(false);

  const statusList = [
    {
      id: 1,
      name: 'Processed',
      icon: 'processed',
      date: date1 || ''
    },
    {
      id: 2,
      name: 'Shipped',
      icon: 'shipped',
      date: date2 || ''
    },
    {
      id: 3,
      name: 'Delivered',
      icon: 'delivered',
      date: date3 || ''
    }
  ];

  const handleCancelOrder = () => {
    const formData = new FormData();

    formData.append('order_id', String(orderNo));
    formData.append('status', 'cancel');

    changeOrderStatus(formData);
    setOpenCancelModal(false);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      Swal.fire({
        icon: 'success',
        text: 'Order Cancelled Successfully',
        customClass: {
          confirmButton: '!bg-orange w-[140px]'
        }
      });
    }
  }, [isSuccess, isError]);

  return (
    <>
      <div className="max-w-[1240px] min-h-[195px] bg-white border border-black border-opacity-10 relative p-3 flex flex-col lg:flex-row items-center justify-between mb-6 gap-[18px] lg:gap-0">
        <section className="flex items-center h-full">
          {/* image */}
          <aside className="w-[143px] h-full max-h-[170.60px] bg-neutral-100">
            <Image
              src={image}
              alt={name}
              width={143}
              height={170.6}
              className="h-full w-full object-cover min-h-[170.6px]"
            />
          </aside>

          {/* product details */}
          <aside className="flex-col justify-start items-start gap-3.5 inline-flex pl-5">
            <h4 className="text-center text-neutral-900 text-xl font-medium capitalize">{name}</h4>

            <div className="flex-col justify-start items-start gap-0.5 flex">
              <p className="text-center text-neutral-500 text-sm font-normal">
                Order date: {orderDate ? formatDate(orderDate) : '-'}
              </p>

              <p className="text-center text-neutral-500 text-sm font-normal">
                Order no: {orderNo}
              </p>
              <p className="text-center text-neutral-500 text-sm font-normal">
                Quantity: {addZero(quantity)}
              </p>
            </div>

            <h5 className="text-center text-neutral-900 text-sm font-medium">
              Total: {moneyFormat(Number(total))}
            </h5>
          </aside>
        </section>

        {!isCancelled && (
          <>
            {/* order status */}
            <section className="w-full max-w-[360px] lg:max-w-[664px] lg:w-[664px] px-0 lg:px-6 py-4 lg:py-[29px] rounded-full border border-black border-opacity-10 justify-center items-center gap-2 inline-flex">
              {statusList.map((status, index) => (
                <aside
                  key={status.id}
                  className="flex-col justify-start items-start gap-2 inline-flex"
                >
                  <div className="self-stretch justify-start items-center gap-2 inline-flex">
                    <Icon
                      name={status.icon}
                      color={status.date.length > 0 ? 'green' : 'gray2'}
                      size="32"
                      className="hidden lg:block"
                    />

                    <div>
                      <p
                        className={`${
                          status.date.length > 0 ? 'text-green' : 'text-gray'
                        } text-xs lg:text-base font-normal lg:font-medium leading-[18px]`}
                      >
                        {status.name}
                      </p>
                      {status.date && (
                        <p className="text-gray text-xs font-normal leading-[18px]">
                          {formatDate(status.date)}
                        </p>
                      )}
                    </div>

                    {/* line */}
                    {index !== statusList.length - 1 && (
                      <div
                        className={`w-[40px] lg:w-[100px] h-[2px] ${
                          status.date.length > 0 ? 'bg-green' : 'bg-gray5'
                        } mx-2`}
                      />
                    )}
                  </div>
                </aside>
              ))}
            </section>

            {/* cancel */}
            <button
              type="button"
              className="flex justify-center items-center w-[60px] h-[60px] rounded-full bg-light-orange2 mr-[13px]"
              onClick={() => setOpenCancelModal(true)}
              disabled={date2?.length > 0}
            >
              <Icon
                name="close"
                color={date2?.length > 0 ? 'lightgray' : 'orange'}
                size="36"
                noHoverEffect={date2?.length > 0}
              />
            </button>
          </>
        )}
      </div>

      {/* cancel order modal */}
      <CancelOrderModal
        openCancelModal={openCancelModal}
        setOpenCancelModal={setOpenCancelModal}
        handleCancelOrder={handleCancelOrder}
        isLoading={isLoading}
      />
    </>
  );
};

export default OrderItem;
