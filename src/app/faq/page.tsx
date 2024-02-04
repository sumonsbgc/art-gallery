'use client';
import FaqAccordion from '@/components/Sections/Artists/FaqAccordion';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
import Layout from '@/components/layout';
import SubHead from '@/components/layout/SubHead';
import Wrapper from '@/components/layout/Wrapper';

import { faqs } from '@/data/accordion';

const Faq = () => {
  return (
    <Layout>
      <SubHead title="Frequently Asked Questions" />
      <section className="py-12">
        <Wrapper>
          <div className="max-w-[625px] w-full mx-auto">
            <FaqAccordion data={faqs} />
          </div>
        </Wrapper>
      </section>
      <NewsLetter />
    </Layout>
  );
};

export default Faq;
