'use client';

import React, { useEffect, useState } from 'react';
import { Space, Rate, Flex, Input } from 'antd';
import { ReviewModal, Icon } from '@/components/ui';
import { useAddCustomerReviewMutation } from '@/redux/features/review/reviewRatingApi';
import Swal from 'sweetalert2';
import { SubscriptionModal } from '.';

type PaymentModalProps = {
  open: boolean;
  onClose(): void;
  item_id: number;
};

const { TextArea } = Input;
const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

const CustomerReviewModal = ({ open, onClose, item_id }: PaymentModalProps) => {
  const [openSubscriptionModal, setOpenSubscriptionModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    isSuccess: false
  });

  const [addReview, { isLoading, isSuccess, isError, error }] = useAddCustomerReviewMutation({});
  const [reviews, setReviews] = useState<string>('');
  const [value, setValue] = useState<number>(0);

  const onReview = () => {
    console.log(reviews, value, item_id);
    const formData = new FormData();
    formData.append('rating', String(value));
    formData.append('review', reviews);
    formData.append('item_id', String(item_id));
    // formData.append('user_id');
    addReview(formData);
    onClose();
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      setModalContent({
        title: 'Review Submitted',
        message: 'Your Review Has Been Submitted Successfully',
        isSuccess: true
      });
      setOpenSubscriptionModal(true);
    }

    if (!isSuccess && isError) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        // @ts-ignore
        title: error?.data?.message,
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isSuccess, isError, error]);

  return (
    <>
      <ReviewModal open={open} onClose={onClose}>
        <div className="w-full px-6 py-4 overflow-hidden">
          <div className="w-full flex justify-between p-1">
            <span className="text-black text-[16px] font-[400]"></span>
            <span
              className="bg-gray text-[12px] font-[400] rounded-full cursor-pointer"
              onClick={onClose}
            >
              <Icon name="close" color="white" size="28" />
            </span>
          </div>
          <div className="w-full text-center -mt-5">
            <h2 className="text-black text-[24px] font-[500]">Rate & Review</h2>
          </div>
          <div className="w-full text-center mb-4">
            <Space>
              <Rate tooltips={desc} onChange={setValue} value={value} />
            </Space>
          </div>
          <div className="w-full mb-6">
            <Flex vertical gap={32}>
              <TextArea
                showCount
                maxLength={500}
                onChange={(e) => setReviews(e.target.value)}
                placeholder="Write review"
                style={{ height: 211, resize: 'none' }}
              />
            </Flex>
          </div>
          <div className="w-full mt-4">
            <button
              onClick={onReview}
              type="button"
              disabled={isLoading}
              className="w-full h-[42px] flex justify-center items-center text-center bg-orange cursor-pointer"
            >
              <span className="inline-flex text-[#fff] text-[14px] font-[700] uppercase justify-center items-center">
                Submit
              </span>
            </button>
          </div>
        </div>
      </ReviewModal>
      <SubscriptionModal
        open={openSubscriptionModal}
        onClose={() => setOpenSubscriptionModal(false)}
        modalContent={modalContent}
      />
    </>
  );
};

export default CustomerReviewModal;
