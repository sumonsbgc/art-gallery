import { SectionTitle, Text } from '@/components/common';
import Img from '@/components/common/Img';
import Wrapper from '@/components/layout/Wrapper';
import Link from 'next/link';
import React from 'react';

const Pending = () => {
  return (
    <div>
      <Wrapper>
        <div className="bg-[#F9F9F9] pt-14 pb-28 flex flex-col items-center gap-3 text-center">
          <Img
            src="/assets/img/arts/upload-success.gif"
            alt="Art Upload Icon"
            width={90}
            height={90}
            className="rounded-full"
          />

          <Text className="!text-orange text-base font-semibold capitalize text-center">
            Successfully Uploaded
          </Text>
          <SectionTitle
            content="Approval request sent to Admin"
            className="!sm:text-[32px] text-2xl !font-semibold capitalize"
          />
          <Text className="!text-black font-medium text-sm text-center">
            You will be notified within 24 hours.
          </Text>
        </div>

        <Link
          href="/dashboard/artist/manage-artworks"
          className="block text-center mx-auto mt-8 w-[256px] bg-orange text-white text-sm font-bold uppercase px-8 py-3"
        >
          Go to studio
        </Link>
      </Wrapper>
    </div>
  );
};

export default Pending;
