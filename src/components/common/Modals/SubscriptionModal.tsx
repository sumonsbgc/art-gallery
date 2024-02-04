'use client';

// import Image from 'next/image';

// components
import { Modal } from '@/components/ui';
import { Img } from '@/components/common';

type SubscriptionModalProps = {
  open: boolean;
  onClose(): void;
  modalContent: {
    title: string;
    message: string;
    isSuccess: boolean;
  };
};

const SubscriptionModal = ({ open, onClose, modalContent }: SubscriptionModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full xs:w-[366px] flex-col justify-center items-center flex overflow-hidden py-8">
        {modalContent.isSuccess && (
          <Img
            src="/assets/img/arts/upload-success.gif"
            alt="successful"
            width={90}
            height={90}
            className="rounded-full mb-10"
          />
        )}

        <h3 className="text-center text-indigo-950 text-2xl font-medium leading-loose mb-2">
          {modalContent.title}
        </h3>
        <p className="text-center text-neutral-400 text-base font-normal leading-[17.76px]">
          {modalContent.message}
        </p>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
