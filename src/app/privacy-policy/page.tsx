/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  Brand,
  ContentHead,
  // TextItem,
  TitleItem
} from '@/components/Sections/FooterPages/CommonUi';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
import { Text, Title } from '@/components/common';
import Layout from '@/components/layout';
import SubHead from '@/components/layout/SubHead';
import Wrapper from '@/components/layout/Wrapper';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SubHead title="Privacy & Cookie Policy" />
      <section className="py-12">
        <Wrapper>
          <div className="mb-9">
            <ContentHead title="Privacy & Cookie Policy" />
            <Text className="sm:!text-lg !text-base !font-normal">
              Welcome to <Brand content="ValArt" />, we value your privacy and are committed to
              protecting your personal information. This privacy and cookie policy outlines how we
              collect, use, and safeguard your data when you interact with our platform.
            </Text>
          </div>

          <div>
            <ul className="flex flex-col gap-4">
              <li>
                <TitleItem title="1. Collection of Information:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Personal Information: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    When you create an account or engage with ValArt, we may collect personal
                    details such as your name, email address, shipping address, and payment
                    information.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Usage Information: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    We gather data about your interactions with our platform, including browsing
                    history, preferences, and device information, to enhance user experience and
                    provide personalized services.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Cookies: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    ValArt uses cookies and similar technologies to collect information about your
                    browsing behavior, preferences, and session data. Cookies improve website
                    functionality, remember user preferences, and enable personalized experiences.
                  </Text>
                </div>
              </li>
              <li>
                <TitleItem title="2. Use of Information:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Personalization: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    We utilize collected data to personalize your experience, tailor content, and
                    recommend artworks that align with your interests.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Transaction Processing: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    Information is used to facilitate transactions, process payments, and fulfill
                    orders placed on ValArt.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Communication: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    We may use your contact details to send updates, newsletters, and promotional
                    materials about ValArt. You can opt out of these communications at any time.
                  </Text>
                </div>
              </li>

              <li>
                <TitleItem title="3. Data Sharing and Security:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Third Parties: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    ValArt may share data with trusted third-party service providers to improve
                    platform functionality, process transactions, or for analytical purposes.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Security Measures: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    We implement security measures to protect your information from unauthorized
                    access, misuse, or alteration. However, no online platform can guarantee
                    absolute security.
                  </Text>
                </div>
              </li>

              <li>
                <TitleItem title="4. Cookie Usage:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Cookies: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    ValArt employs cookies to enhance user experience, analyze website traffic, and
                    understand user behavior. Cookies also help us tailor content and ads.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Cookie Settings: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    Users can manage cookie preferences through browser settings. However, disabling
                    certain cookies may affect website functionality.
                  </Text>
                </div>
              </li>

              <li>
                <TitleItem title="5. Your Rights:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Access and Correction: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    You have the right to access, update, or correct your personal information
                    stored on ValArt.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Data Removal: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    You can request the deletion of your account and associated data from ValArt's
                    database.
                  </Text>
                </div>
              </li>

              <li>
                <TitleItem title="6. Updates to Policy:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Policy Changes: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    ValArt reserves the right to update or modify this privacy and cookie policy.
                    Any substantial changes will be communicated to users.
                  </Text>
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            {/* <Text className="sm:!text-lg !text-base">
              By using <Brand content="ValArt" />, you acknowledge and agree to the terms outlined
              in this Privacy & Cookie Policy. If you have any questions or concerns, please contact
              our support team.
            </Text> */}
          </div>
        </Wrapper>
      </section>
      <NewsLetter />
    </Layout>
  );
};

export default PrivacyPolicy;
