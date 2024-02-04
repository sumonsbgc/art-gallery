'use client';

import React, { useState } from 'react';
import Accordion from '@/components/ui/Accordion/Accordion';

type option = {
  title: string;
  content: string;
};

type faqData = {
  data: option[];
};

const FaqAccordion = ({ data }: faqData) => {
  const [openIndex, setOpenIndex] = useState(-1);

  const handleToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div>
      {data?.map((faq, index) => {
        return (
          <Accordion
            key={faq.title}
            title={faq.title}
            content={faq.content}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        );
      })}
    </div>
  );
};

export default FaqAccordion;
