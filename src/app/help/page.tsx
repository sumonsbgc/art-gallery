'use client';
import { helps } from '@/data/accordion';
import FaqAccordion from '@/components/Sections/Artists/FaqAccordion';
import { SectionTitle, Text } from '@/components/common';
import Layout from '@/components/layout';
import Wrapper from '@/components/layout/Wrapper';
import Link from 'next/link';

const HelpQuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
    <g clipPath="url(#clip0_904_24036)">
      <path
        d="M27.1416 37.5397C25.5405 37.5397 24.2441 38.874 24.2441 40.4753C24.2441 42.0384 25.5023 43.4109 27.1416 43.4109C28.7809 43.4109 30.0772 42.0385 30.0772 40.4753C30.0772 38.874 28.743 37.5397 27.1416 37.5397Z"
        fill="#FF6F61"
      />
      <path
        d="M27.6375 15.3127C22.4907 15.3127 20.127 18.3626 20.127 20.4214C20.127 21.9084 21.385 22.5946 22.4144 22.5946C24.4731 22.5946 23.6344 19.6589 27.5231 19.6589C29.4294 19.6589 30.9544 20.4977 30.9544 22.2515C30.9544 24.3103 28.8194 25.4921 27.5613 26.5596C26.4557 27.5127 25.0069 29.0759 25.0069 32.3547C25.0069 34.3371 25.5406 34.909 27.1038 34.909C28.9719 34.909 29.3531 34.0703 29.3531 33.3459C29.3531 31.3634 29.3913 30.2197 31.4882 28.5803C32.5175 27.7797 35.7582 25.1872 35.7582 21.6034C35.7582 18.0196 32.5175 15.3127 27.6375 15.3127Z"
        fill="#FF6F61"
      />
      <path
        d="M28 0C12.5252 0 0 12.5231 0 28V53.8125C0 55.0207 0.979344 56 2.1875 56H28C43.4747 56 56 43.4769 56 28C56 12.5252 43.4769 0 28 0ZM28 51.625H4.375V28C4.375 14.9431 14.9414 4.375 28 4.375C41.0569 4.375 51.625 14.9414 51.625 28C51.625 41.0569 41.0586 51.625 28 51.625Z"
        fill="#FF6F61"
      />
    </g>
    <defs>
      <clipPath id="clip0_904_24036">
        <rect width="56" height="56" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Help = () => {
  return (
    <Layout>
      <section className="w-full min-h-[250px] bg-[#FFECEC] flex">
        <Wrapper>
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <HelpQuestionIcon />
            <SectionTitle
              content="Find Your Query"
              className="text-3xl capitalize text-black font-semibold"
            />
            <Text className="text-black italic font-normal">
              Or email/contact us at{' '}
              <Link href="mailto: support@valart.com" className="text-orange italic underline">
                support@valart.com
              </Link>
            </Text>
          </div>
        </Wrapper>
      </section>
      <section className="py-12">
        <Wrapper>
          <div className="max-w-[625px] w-full mx-auto">
            <FaqAccordion data={helps} />
          </div>
        </Wrapper>
      </section>
    </Layout>
  );
};

export default Help;
