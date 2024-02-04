/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  Brand,
  ContentHead,
  TextItem,
  TitleItem
} from '@/components/Sections/FooterPages/CommonUi';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
import { Text } from '@/components/common';
import Layout from '@/components/layout';
import SubHead from '@/components/layout/SubHead';
import Wrapper from '@/components/layout/Wrapper';

const SizeGuide = () => {
  return (
    <Layout>
      <SubHead title="Artwork Size Guide" />
      <section className="py-12">
        <Wrapper>
          <div className="mb-9">
            <ContentHead title="Artwork Size Guide" />
            <Text className="sm:!text-lg !text-base !font-normal">
              At <Brand content="ValArt" />, we recognize the significance of selecting artworks
              that perfectly fit your space and aesthetic preferences. To assist you in making
              informed decisions before purchasing, we've curated a comprehensive size guide to
              ensure the artwork you choose harmonizes seamlessly within your environment.
            </Text>
          </div>
          <ContentHead title="Understanding Artwork Dimensions" />
          <div>
            <ul className="flex flex-col gap-4">
              <li>
                <TitleItem title="1. Standard Sizes:" />
                <TextItem>Small: Typically ranges from 8" x 10" to 16" x 20</TextItem>
                <TextItem>Medium: Commonly sized between 18" x 24" to 24" x 36"</TextItem>
                <TextItem>Large: Typically falls within 36" x 48" and beyond</TextItem>
              </li>
              <li>
                <TitleItem title="2. Aspect Ratios:" />
                <TextItem>Square: Equally sized on all sides (e.g., 12" x 12")</TextItem>
                <TextItem>Portrait: Taller than it is wide (e.g., 18" x 24")</TextItem>
                <TextItem>Landscape: Wider than it is tall (e.g., 24" x 18")</TextItem>
              </li>
              <li>
                <TitleItem title="3. Consider the Space:" />
                <TextItem>
                  Wall Size: Measure the available wall space where the artwork will be displayed.
                </TextItem>
                <TextItem>
                  Furniture Placement: Consider the relationship between the artwork and nearby
                  furniture or architectural elements.
                </TextItem>
              </li>
              <li>
                <TitleItem title="4. Visual Impact:" />
                <TextItem>
                  Statement Piece: Larger artworks can serve as focal points in a room, while
                  smaller pieces can complement a gallery wall or existing decor.
                </TextItem>
                <TextItem>
                  Grouping Art: If considering multiple pieces, plan the arrangement and consider
                  the combined impact of sizes.
                </TextItem>
              </li>
              <li>
                <TitleItem title="5. Personal Preference:" />
                <TextItem>
                  Artistic Vision: Follow your instincts and choose the size that resonates best
                  with your artistic vision and style preferences.
                </TextItem>
                <TextItem>
                  Visual Balance: Seek a balance between the artwork's size and the surrounding
                  space for optimal visual appeal.
                </TextItem>
              </li>
              <li>
                <TitleItem title="5. Additional Guidance:" />
                <TextItem>
                  We recommend referring to the artwork's product description for specific
                  dimensions. If you require further assistance or have specific sizing inquiries,
                  our team is here to help. Feel free to contact us at [Customer Support
                  Email/Contact Information].
                </TextItem>
                <TextItem>
                  Making the right choice in artwork size ensures a cohesive and captivating
                  ambiance within your space. Explore our collection and find the perfect piece that
                  speaks to you.
                </TextItem>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <Text className="sm:!text-lg !text-base">
              We aim to provide accurate sizing information, but slight variations may occur due to
              the nature of handmade or customized artworks. If you need further assistance or have
              specific size inquiries, our customer support team is here to help.
              <br />
              Thank you for choosing <Brand content="ValArt" /> for your artistic needs!
            </Text>
          </div>
        </Wrapper>
      </section>
      <NewsLetter newsLetterForm={false} />
    </Layout>
  );
};

export default SizeGuide;
