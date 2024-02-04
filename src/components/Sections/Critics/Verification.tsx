'use client';

// components
import { SectionTitle, Text, Img } from '@/components/common';
import Layout from '@/components/layout';
import Wrapper from '@/components/layout/Wrapper';

const UserUpgradeVerification = () => {
  return (
    <Layout headerBottomBorder>
      <div className="xl:pt-28 xl:pb-72 lg:pt-16 lg:pb-36 md:pt-10 md:pb-20 pt-8 pb-16">
        <Wrapper>
          <div className="max-w-[800px] mx-auto bg-[#F9F9F9] pt-14 pb-28 flex flex-col items-center gap-3 text-center">
            <Img
              src="/assets/img/arts/upload-success.gif"
              alt="Art Upload Icon"
              width={90}
              height={90}
              className="rounded-full"
            />
            <Text className="!text-orange text-base font-semibold capitalize text-center">
              Successfully Submitted
            </Text>
            <SectionTitle
              content="Approval request sent to Admin"
              className="!md:text-[32px] sm:text-2xl text-xl !font-semibold capitalize"
            />
            <Text className="!text-black font-medium text-sm text-center">
              You will be notified within 24 hours.
            </Text>
          </div>
        </Wrapper>
      </div>
    </Layout>
  );
};

export default UserUpgradeVerification;
