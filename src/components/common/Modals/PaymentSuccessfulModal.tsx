'use client';

import { Modal } from '@/components/ui';
import { BaseUrl } from '@/config';
import Link from 'next/link';

type PaymentModalProps = {
  open: boolean;
  onClose(): void;
};

const PaymentSuccessfulModal = ({ open, onClose }: PaymentModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full xs:w-[366px] flex-col justify-center items-center gap-8 flex overflow-hidden">
        <picture>
          <img
            src={`${BaseUrl}/assets/img/payments/payment_successful.png`}
            alt="payment successful"
            className="w-[325px] h-[232px] object-contain"
          />
        </picture>
        <h3 className="text-black text-[24px] font-[500]">Payment Successful</h3>
        <p className="text-black text-[14px] font-[400] text-center">
          You will soon be notified via email with the shipping details along with Invoice.
        </p>
        <Link
          href="/my-orders"
          onClick={onClose}
          className="w-[143px] h-[41px] mb-8 flex justify-center items-center text-center gap-6 bg-orange cursor-pointer"
        >
          <span className="inline-flex text-[#fff] text-[12px] font-[700] uppercase justify-center items-center">
            Your Order
          </span>
        </Link>
      </div>
    </Modal>
  );
};

export default PaymentSuccessfulModal;
