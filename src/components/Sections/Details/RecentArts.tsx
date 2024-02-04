import Wrapper from '@/components/layout/Wrapper';
import RecentItem from '@/components/common/RecentItem';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Scrollbar, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import { Title } from '@/components/common';
import { useRouter } from 'next/navigation';

const RecentArts = () => {
  const router = useRouter();
  return (
    <section className="py-24">
      <Wrapper>
        <Title content="Recently Viewed" className="mb-6" />
        <Swiper
          direction="horizontal"
          spaceBetween={32}
          slidesPerView={4}
          grabCursor={true}
          mousewheel={true}
          modules={[Mousewheel, Scrollbar, Navigation]}
          navigation={true}
          breakpoints={{
            360: {
              slidesPerView: 2,
              spaceBetween: 2
            },
            540: {
              slidesPerView: 3,
              spaceBetween: 4
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 14
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 18
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 18
            },
            1366: {
              slidesPerView: 6,
              spaceBetween: 24
            },
            1446: {
              slidesPerView: 6,
              spaceBetween: 24
            },
            1646: {
              slidesPerView: 6,
              spaceBetween: 32
            }
          }}
        >
          {Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12).map((key) => (
            <SwiperSlide key={key}>
              <RecentItem
                rating={4}
                title="Espadrilles in suede"
                imgUrl="/assets/img/top-rated/tr-1.png"
                price={60}
                onRedirectClick={() => router.push('/')}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Wrapper>
    </section>
  );
};

export default RecentArts;
