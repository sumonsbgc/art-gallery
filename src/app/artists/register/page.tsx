// components
import { SupportSection, FaqSection, ArtistRegisterForm } from '@/components/Sections/Artists';
import { Button, SectionTitle, State, StateWrapper, Text, Img } from '@/components/common';
import Layout from '@/components/layout';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';

const ListItem = ({ content }: { content: string }) => (
  <li className="artist-feature-item flex gap-2 items-center text-black font-medium text-sm md:text-lg xl:text-xl">
    <Icon name="check" />
    {content}
  </li>
);

const ArtistRegister = () => {
  return (
    <Layout>
      <section
        className="artist-register-section flex justify-center relative w-full py-11 sm:py-[100px] md:pt-[200px] md:pb-[280px]"
        style={{ backgroundImage: 'url(/assets/img/artists/banner.png)' }}
      >
        <h2 className="lg:text-[44px] md:text-4xl sm:text-3xl text-xl leading-tight text-center text-white font-medium capitalize w-[80%] md:w-[860px]">
          Get reviews and Sell your art to a global community of art lovers & Critics
        </h2>
      </section>
      <ArtistRegisterForm />
      <section className="py-20">
        <Wrapper>
          <div className="section-head text-center mb-12">
            <SectionTitle content="Why Sell on Art.?" />
            <Text className="!text-black italic">
              As the world&apos;s leading online gallery...
            </Text>
          </div>
          <div>
            <StateWrapper>
              <State text="Artists Represented" title="110+ Countries" />
              <State text="Total Artists" title="13.7K" />
              <State text="Experience Critics" title="1275" />
              <State text="Monthly Visits" title="3M+" />
            </StateWrapper>
          </div>
        </Wrapper>
      </section>
      <section className="py-24 bg-gray3">
        <Wrapper>
          <div className="section-head text-center mx-auto mb-12 w-[90%] lg:w-[787px]">
            <SectionTitle content="Fair, Transparent, and Easy" />
            <Text className="!text-black italic">
              Choose how and when you get paid. We offer secure payments by check, wire transfer or
              PayPal. Our support specialists ensure our artists and collectors are financially
              protected on every sale.
            </Text>
          </div>
          <div className="flex gap-6 xl:gap-12 flex-col lg:flex-row">
            <div className="relative w-full lg:w-[475px] xl:w-[660px]">
              <Img src="/assets/img/artists/feature-banner.png" alt="" layout />
            </div>

            <div className="relative">
              <ul className="flex flex-col gap-6 artist-features">
                <ListItem content="Free to create an account" />
                <ListItem content="We handle shipping - you only pay for packaging" />
                <ListItem content="No fees" />
                <ListItem content="Receive 60% on every artwork sold" />
                <ListItem content="Non-exclusive policy" />
                <ListItem content="Secure online payments" />
              </ul>
              <Button className="!text-white mx-auto !font-bold mt-5 !px-8 !py-3">
                Apply as an Artist
              </Button>
            </div>
          </div>
        </Wrapper>
      </section>
      <SupportSection />
      <FaqSection />
    </Layout>
  );
};

export default ArtistRegister;
