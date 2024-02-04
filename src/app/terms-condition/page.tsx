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

const TermsCondition = () => {
  return (
    <Layout>
      <SubHead title="Terms & Conditions" />
      <section className="py-12">
        <Wrapper>
          <div className="mb-9">
            <ContentHead title="Terms & Conditions" />
            <Text className="sm:!text-lg !text-base !font-normal">
              Welcome to <Brand content="ValArt" />. These terms and conditions govern your use of
              our platform, including the website, services, and interactions with ValArt.
            </Text>
          </div>

          <div>
            <ul className="flex flex-col gap-4">
              <li>
                <TitleItem title="1. User Accounts:" />
                <TextItem>
                  By creating an account with ValArt, you agree to provide accurate and updated
                  information.
                </TextItem>
                <TextItem>
                  You are responsible for maintaining the confidentiality of your account details
                  and any activities under your account.
                </TextItem>
                <TextItem>
                  ValArt reserves the right to terminate or suspend accounts at its discretion.
                </TextItem>
              </li>
              <li>
                <TitleItem title="2. Artwork Listings:" />
                <TextItem>
                  Artists are responsible for accurately representing their artwork listed on
                  ValArt.
                </TextItem>
                <TextItem>
                  ValArt may moderate, edit, or remove listings that violate our guidelines or
                  standards.
                </TextItem>
              </li>
              <li>
                <TitleItem title="3. Sales and Payments:" />
                <TextItem>ValArt facilitates transactions between buyers and artists.</TextItem>
                <TextItem>
                  Buyers agree to pay the specified price for purchased artwork, including
                  applicable taxes and shipping fees.
                </TextItem>
                <TextItem>
                  Payments are processed securely through ValArt, and artists receive their earnings
                  after deducting applicable commissions.
                </TextItem>
              </li>
              <li>
                <TitleItem title="4. Shipping and Returns:" />
                <TextItem>
                  Artists are responsible for ensuring accurate and timely shipment of purchased
                  artwork.
                </TextItem>
                <TextItem>
                  Buyers may return artwork following ValArt's return policy, subject to certain
                  conditions.
                </TextItem>
              </li>
              <li>
                <TitleItem title="5. Copyright and Intellectual Property:" />
                <TextItem>Artists retain all rights to their original artwork.</TextItem>
                <TextItem>
                  Users agree not to reproduce, modify, or distribute copyrighted material without
                  explicit permission.
                </TextItem>
              </li>
              <li>
                <TitleItem title="6. Privacy Policy:" />
                <TextItem>
                  ValArt values user privacy and handles personal information in accordance with our
                  privacy policy.
                </TextItem>
                <TextItem>
                  Users are encouraged to review our privacy policy for detailed information on data
                  handling.
                </TextItem>
              </li>
              <li>
                <TitleItem title="7. Dispute Resolution:" />
                <TextItem>
                  Any disputes between users should be resolved directly between the parties
                  involved.
                </TextItem>
                <TextItem>
                  ValArt may provide assistance but is not liable for resolving disputes.
                </TextItem>
              </li>
              <li>
                <TitleItem title="8. Limitation of Liability:" />
                <TextItem>
                  ValArt is not liable for any damages, losses, or liabilities arising from the use
                  of our platform.
                </TextItem>
                <TextItem>Users utilize ValArt at their own risk and discretion.</TextItem>
              </li>
              <li>
                <TitleItem title="9. Modifications to Terms:" />
                <TextItem>
                  ValArt reserves the right to update or modify these terms and conditions at any
                  time.
                </TextItem>
                <TextItem>Users will be notified of any significant changes to the terms.</TextItem>
              </li>
            </ul>
          </div>

          <div className="mt-12">
            {/* <Text className="sm:!text-lg !text-base">
              By using <Brand content="VarArt" />, you acknowledge and agree to abide by these terms
              and conditions. If you have any queries or concerns, please contact our customer
              support team.
            </Text> */}
          </div>
        </Wrapper>
      </section>
      <NewsLetter />
    </Layout>
  );
};

export default TermsCondition;
