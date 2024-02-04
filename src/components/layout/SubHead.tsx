import React from 'react';
import Wrapper from './Wrapper';
import { SectionTitle } from '../common';

const SubHead = ({ title }: { title?: string }) => {
  return (
    <section className="w-full flex h-[165px] sm:h-[230px] contact-hero">
      <Wrapper>
        <div className="flex flex-col items-center justify-center w-full gap-4">
          <SectionTitle
            content={title || ''}
            className="!text-2xl sm:!text-3xl capitalize text-white font-semibold"
          />
        </div>
      </Wrapper>
    </section>
  );
};

export default SubHead;
