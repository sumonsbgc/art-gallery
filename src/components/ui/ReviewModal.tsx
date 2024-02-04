'use client';

type ModalProps = {
  open: boolean;
  onClose(): void;
  children: React.ReactNode;
};

const ReviewModal = ({ open, children }: ModalProps) => {
  return (
    <dialog className="modal backdrop-brightness-50" open={open}>
      <div className="modal-box w-full sm:w-[330px] md:w-[459px] flex justify-center bg-white p-4">
        {children}
      </div>
    </dialog>
  );
};

export default ReviewModal;
