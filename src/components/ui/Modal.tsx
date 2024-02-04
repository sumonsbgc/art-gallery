'use client';

import { Icon } from '@/components/ui';

type ModalProps = {
  open: boolean;
  onClose(): void;
  style?: React.CSSProperties;
  hideCloseIcon?: boolean;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, style, hideCloseIcon, children }: ModalProps) => {
  return (
    <dialog className="modal backdrop-brightness-50" open={open}>
      <div
        className="modal-box w-[95vw] xs:w-auto bg-white pt-10 pb-5 sm:pb-6 px-5 sm:px-16"
        style={style}
      >
        {!hideCloseIcon && (
          <Icon
            name="close"
            size="24"
            color="orange"
            handleClick={onClose}
            className="absolute right-2 top-2 w-6 h-6 bg-neutral-100 rounded-full"
          />
        )}

        {children}
      </div>
    </dialog>
  );
};

export default Modal;
