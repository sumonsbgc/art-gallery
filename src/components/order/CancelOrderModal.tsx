import Link from 'next/link';

// components
import { Modal, Icon } from '@/components/ui';

type CancelOrderModalProps = {
  openCancelModal: boolean;
  setOpenCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancelOrder: () => void;
  isLoading: boolean;
};

const CancelOrderModal = ({
  openCancelModal,
  setOpenCancelModal,
  handleCancelOrder,
  isLoading
}: CancelOrderModalProps) => {
  return (
    <Modal
      open={openCancelModal}
      onClose={() => setOpenCancelModal(false)}
      style={{ padding: 0 }}
      hideCloseIcon
    >
      <main className="w-full xs:w-[410px] px-8 pt-8 pb-6">
        <section className="pb-6 justify-start items-start gap-4 inline-flex">
          <Icon name="warning" color="light-orange" size="24" />

          <div>
            <h5 className="self-stretch text-black text-base font-semibold leading-normal">
              Cancel Order
            </h5>
            <p className="text-black text-base font-normal leading-normal">
              Are you sure you want to cancel this order? for more about cancelation policy{' '}
              <span className="text-orange font-medium underline">
                <Link href="/order-cancel-policy">click here</Link>
              </span>
            </p>
          </div>
        </section>

        <section className="justify-end items-center gap-2 flex w-full">
          <button
            className="px-4 py-[5px] bg-white rounded-sm border border-zinc-300 flex-col justify-start items-center gap-2 inline-flex text-black text-sm font-normal leading-snug"
            onClick={() => setOpenCancelModal(false)}
          >
            No
          </button>
          <button
            className="px-4 py-[5px] bg-orange rounded-sm flex-col justify-start items-center gap-2 inline-flex text-white text-sm font-normal leading-snug"
            onClick={handleCancelOrder}
          >
            {isLoading ? 'Canceling Order' : 'Cancel Order'}
          </button>
        </section>
      </main>
    </Modal>
  );
};

export default CancelOrderModal;
