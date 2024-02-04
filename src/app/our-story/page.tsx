/* eslint-disable react/no-unescaped-entities */
'use client';

import { Brand, ContentHead } from '@/components/Sections/FooterPages/CommonUi';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
import { Text } from '@/components/common';
import Layout from '@/components/layout';
import SubHead from '@/components/layout/SubHead';
import Wrapper from '@/components/layout/Wrapper';

const OurStory = () => {
  return (
    <Layout>
      <SubHead title="Our Story" />
      <section className="py-12">
        <Wrapper>
          <div className="">
            <ContentHead title="Our Story: Cultivating Artistry, Uniting Souls" />
            <Text className="mb-8 !text-sm !font-normal">
              At <Brand content="ValArt" />, our narrative weaves a tapestry fueled by an unyielding
              passion for artistry and an enduring commitment to celebrate the limitless essence of
              creativity. Originating from a collective of impassioned artists and enthusiasts, our
              journey began with a unified vision: to forge a global platform where art transcends
              boundaries and profoundly resonates within every soul.
              <br />
              <br />
              Driven by an unwavering belief in the profound influence of art, our mission was
              clear: to empower artists by providing them a stage where their extraordinary talents
              could shine brilliantly. ValArt isn't just a marketplace; it's a vibrant community
              where narratives, emotions, and inspirations echo through every brushstroke and pixel.
              <br />
              <br />
              We meticulously curate collections that embody diverse perspectives, styles, and
              mediums. Each artwork carries its own story—a whisper of emotion or a crescendo of
              untold tales waiting to be unveiled. From budding talents to esteemed virtuosos, our
              dedication lies in nurturing a sanctuary where creativity thrives. We resonate deeply
              with art enthusiasts seeking that one piece that speaks directly to their essence.
              <br />
              <br />
              What sets ValArt apart is its unique mission to connect artists, art lovers, and
              critics on one dynamic platform. ValArt stands out by providing real-time pricings for
              art pieces, enabling artists to gain true recognition, ensuring customers receive fair
              value, and offering critics a platform to showcase their expertise and share their
              wealth of artistic knowledge.
              <br />
              <br />
              We are more than a platform; we serve as a conduit—a bridge uniting creators and
              appreciators. ValArt is a vessel where artists' aspirations find homes within the
              hearts and spaces of those who cherish the profound impact of art.
              <br />
              <br />
              Join us on this enchanting journey—a voyage where every acquisition reverberates with
              the vision and dedication of talented artists, enriching lives through each
              masterpiece.
              <br />
              <br />
            </Text>
            {/* <Text className="!text-sm !font-normal">Thank you for being part of our story.</Text> */}
          </div>
        </Wrapper>
      </section>
      <NewsLetter />
    </Layout>
  );
};

export default OurStory;
