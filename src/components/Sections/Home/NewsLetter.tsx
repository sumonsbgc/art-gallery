'use client';
import React, { useEffect, useState } from 'react';
import SectionTitle from '@/components/common/SectionTitle';
import Text from '@/components/common/Text';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import Link from 'next/link';
import { useSubscribeMutation } from '@/redux/features/newsletter/newsletterApi';
import Swal from 'sweetalert2';
import { SubscriptionModal } from '@/components/common/Modals';

const NewsLetter = ({ newsLetterForm }: { newsLetterForm?: boolean }) => {
  const [subscribe, { isLoading, isError, error, isSuccess }] = useSubscribeMutation({});
  const [email, setEmail] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    message: '',
    isSuccess: false
  });

  const handleSubScription = () => {
    const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegx.test(email));

    if (email && emailRegx.test(email)) {
      const formData = new FormData();
      formData.append('news_email', email);
      subscribe(formData);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubScription();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key: string = e.key.toLocaleLowerCase();
    if (key === 'enter') {
      handleSubScription();
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      setEmail('');
      setModalContent({
        title: 'Thank You For Subscribing!',
        message: 'You Have Successfully Subscribed To Our Newsletter.',
        isSuccess: true
      });
      setOpenModal(true);
    }

    if (!isSuccess && isError) {
      Swal.fire({
        icon: 'error',
        // @ts-ignore
        text: `${error?.data?.message || 'Something Went Wrong!'}`,
        customClass: {
          htmlContainer: '!font-medium !text-xl text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isSuccess, isError, error]);

  return (
    <>
      <section className="pt-24 sm:pb-24 pb-5">
        {newsLetterForm && (
          <Wrapper>
            <div className="text-center max-w-[660px] mx-auto mb-11 sm:mb-14">
              <SectionTitle content="Subscribe to our Newsletter" className="mb-4" />
              <Text className="italic !text-lg sm:!sm-text-lg px-4 text-[#525252]">
                Receive an exclusive 10% discount code when you signup.
              </Text>
              <div className="w-full">
                <div className="w-full relative mt-12">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="email"
                      className="subscribe-input italic"
                      placeholder="Enter Email *"
                      name="subscribe"
                      value={email}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      className="subscribe-btn"
                      name="subscribe"
                      id="subscribe-btn"
                      type="submit"
                      disabled={!email || isLoading}
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </Wrapper>
        )}
        <div className="news-letter-bg-wrapper">
          <Wrapper>
            <div className="news-letter-section flex justify-center items-center">
              <ul className="flex gap-3 justify-center items-center bg-white px-8 py-4">
                <li>
                  <Link href="https://facebook.com">
                    <Icon name="facebook" color="orange" size="18" />
                  </Link>
                </li>
                <li>
                  <Link href="https://twitter.com">
                    <Icon name="twitter" color="orange" size="18" />
                  </Link>
                </li>
                <li>
                  <Link href="https://instagram.com">
                    <Icon name="instagram" color="orange" size="18" />
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <span className="text-[#111] text-base font-medium">@artproject</span>
                  </Link>
                </li>
              </ul>
            </div>
          </Wrapper>
        </div>
      </section>

      <SubscriptionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        modalContent={modalContent}
      />
    </>
  );
};

export default NewsLetter;
