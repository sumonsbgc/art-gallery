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

const Carrer = () => {
  return (
    <Layout>
      <SubHead title="Careers" />
      <section className="py-12">
        <Wrapper>
          <div className="mb-9">
            <ContentHead title="Careers at ValArt: Where Passion Meets Innovation" />
            <Text className="sm:!text-lg !text-base !font-normal">
              Are you passionate about art and driven by a desire to revolutionize the way the world
              experiences creativity? Join us at ValArt and be part of a team dedicated to
              connecting artists and art enthusiasts globally.
            </Text>
          </div>

          <div>
            <ul className="flex flex-col gap-4">
              <li>
                <TitleItem title="1 Curator:" />
                <TextItem>
                  Become the guiding force behind our collections. As a curator, you'll source,
                  select, and present artworks that resonate with our audience, ensuring a diverse
                  and captivating collection that reflects artistic excellence.
                </TextItem>
              </li>
              <li>
                <TitleItem title="2. Marketing Specialist:" />
                <TextItem>
                  Shape our brand's story and engage our audience. Craft innovative marketing
                  strategies, manage campaigns, and forge connections with art communities to
                  promote our platform and the incredible art it showcases.
                </TextItem>
              </li>
              <li>
                <TitleItem title="3. Customer Experience Representative:" />
                <TextItem>
                  Be the face of our platform, providing exceptional support to artists and buyers.
                  Help customers navigate our website, resolve inquiries, and ensure a seamless and
                  delightful experience for all.
                </TextItem>
              </li>
              <li>
                <TitleItem title="4. Web Developer/Designer:" />
                <TextItem>
                  Fuel our platform's growth and functionality. Use your technical expertise to
                  enhance user experience, design captivating interfaces, and ensure our website
                  remains cutting-edge and user-friendly.
                </TextItem>
              </li>
              <li>
                <TitleItem title="5. Operations Manager:" />
                <TextItem>
                  Oversee the logistics and operations of our platform. Manage inventory, shipping,
                  and partnerships to ensure the smooth execution of orders and collaborations with
                  artists.
                </TextItem>
              </li>
              <li>
                <TitleItem title="6. Content Creator/Copywriter:" />
                <TextItem>
                  Bring our art and stories to life through captivating content. Write compelling
                  descriptions, articles, and social media posts that showcase the beauty and
                  significance of the artworks featured on our platform.
                </TextItem>
              </li>
              <li>
                <TitleItem title="7. Business Development Manager:" />
                <TextItem>
                  Expand our horizons and partnerships. Identify and establish collaborations with
                  artists, galleries, and other stakeholders to grow our network and offerings.
                </TextItem>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            <Text className="sm:!text-lg !text-base">
              At <Brand content="ValArt" />, we foster a collaborative, inclusive, and dynamic work
              culture. We value creativity, innovation, and a shared dedication to elevating the art
              world. If you're passionate about art and eager to be part of a team that values
              creativity, innovation, and making a meaningful impact, explore our open positions and
              join us on this inspiring journey.
            </Text>
          </div>
        </Wrapper>
      </section>
      <NewsLetter />
    </Layout>
  );
};

export default Carrer;
