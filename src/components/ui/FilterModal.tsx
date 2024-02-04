'use client';

type ModalProps = {
  open: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

const FilterModal = ({ open, children, onClose }: ModalProps) => {
  return (
    <dialog className="modal backdrop-brightness-50" open={open}>
      <div
        className="w-full h-full absolute top-0 bottom-0 left-0 right-0 z-0"
        onClick={onClose}
      ></div>
      <div className="modal-box w-[350px] flex justify-center bg-white p-0 !max-h-screen">
        {children}
      </div>
    </dialog>
  );
};

export default FilterModal;
