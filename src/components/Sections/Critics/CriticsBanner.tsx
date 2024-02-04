import { SectionTitle, Text, Img } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';

const CriticsBanner = () => {
  return (
    <section
      className="critics-banner-section bg-orange relative z-10 w-full py-11 sm:py-[100px] md:pt-[165px] md:pb-[220px]"
      style={{ backgroundColor: 'rgba(255, 111, 97, 0.9)' }}
    >
      <Wrapper>
        <div className="flex flex-col justify-center items-center max-w-[560px] w-full mx-auto text-center gap-7 relative">
          <SectionTitle content="Be A Critic" className="text-white" />
          <Text className="text-white">
            An art critic is a professional who analyzes and evaluates artworks, providing insights
            into their meaning, quality, and cultural significance.
          </Text>
        </div>
      </Wrapper>
      <Img
        src="/assets/img/critics/critics-banner.png"
        width={590}
        height={438}
        alt="critics image"
        className="!absolute -z-10 right-0 bottom-0 h-full"
      />
    </section>
  );
};

export default CriticsBanner;
