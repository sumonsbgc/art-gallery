import { SectionTitle, Text } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';
import FaqAccordion from '@/components/Sections/Artists/FaqAccordion';

// data
import { faqs } from '@/data/accordion';

const FaqSection = () => {
  return (
    <section className="pt-16 py-24">
      <Wrapper>
        <div className="flex flex-col lg:flex-row xl:gap-24 lg:gap-16 gap-10">
          <div className="flex flex-col gap-8 w-full sm:w-[435px] flex-shrink-0">
            <SectionTitle content="Frequently Asked Questions" />
            <div className="w-12 h-[5px] bg-orange"></div>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, dignissim tristique
              tellus sed faucibus nullam. Tincidunt mauris ut quam sed mauris proin feugiat.
            </Text>
            <button className="flex-shrink-0 max-w-[210px] max-h-[54px] border-4 border-orange text-orange py-4 flex justify-center items-center font-semibold text-sm tracking-wider">
              GET IN TOUCH
            </button>
          </div>
          <FaqAccordion data={faqs} />
        </div>
      </Wrapper>
    </section>
  );
};

export default FaqSection;
