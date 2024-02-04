'use client';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Grid from '@/components/common/Grid';
import SectionTitle from '@/components/common/SectionTitle';
// import Text from '@/components/common/Text';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';
import Link from 'next/link';
import { useGetPopularCategoriesQuery } from '@/redux/features/filters/filterApi';
import { categoryType } from '@/types/meta.type';
// import { useRouter } from 'next/navigation';

const PopularSection = () => {
  // const router = useRouter();

  const [categories, setCategories] = useState([]);
  const { data: catlist, isLoading, isSuccess, isError } = useGetPopularCategoriesQuery({});

  useEffect(() => {
    if (!isLoading && isSuccess && Array.isArray(catlist?.data) && catlist?.data?.length > 0) {
      setCategories(catlist?.data);
    }
  }, [isLoading, isSuccess, isError]);

  return (
    <section className="bg-[#f5f5f5] pt-16 sm:pb-20 pb-14">
      <Wrapper>
        <div className="text-center max-w-[660px] mx-auto mb-11 sm:mb-14">
          <SectionTitle content="Most Popular Category" className="mb-4" />
        </div>
        <Grid className="popular-grid md:gap-8 gap-2 sm:mb-12 mb-9">
          {!isLoading &&
            Array.isArray(categories) &&
            categories?.length > 0 &&
            categories?.map((category: categoryType) => (
              <div
                key={category?.cat_id}
                className="p-12 flex items-center justify-center h-[200px] sm:h-[260px] cursor-pointer bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${category?.image_path || '/assets/img/popular/g-1.png'})`
                }}
              >
                <Link href={{ pathname: '/all-artwork', query: { categories: category?.cat_id } }}>
                  <div className="!bg-white text-black py-3 px-8 flex gap-2 items-center capitalize">
                    <span>{category?.category_name}</span> <Icon name="arrow-right-long" />
                  </div>
                </Link>
              </div>
            ))}
        </Grid>
        <Link
          href="/all-artwork"
          className="text-center mx-auto text-black border-b border-b-black w-[140px] block text-base font-medium cursor-pointer capitalize"
        >
          Discover More
        </Link>
      </Wrapper>
    </section>
  );
};

export default PopularSection;
