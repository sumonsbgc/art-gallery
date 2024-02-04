/* eslint-disable react/no-unescaped-entities */
'use client';

import {
  // Brand,
  ContentHead,
  // TextItem,
  TitleItem
} from '@/components/Sections/FooterPages/CommonUi';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
import { Text, Title } from '@/components/common';
import Layout from '@/components/layout';
import SubHead from '@/components/layout/SubHead';
import Wrapper from '@/components/layout/Wrapper';

const ShippingReturns = () => {
  return (
    <Layout>
      <SubHead title="Shipping & Returns" />
      <section className="py-12">
        <Wrapper>
          <div className="mb-9">
            <ContentHead title="ValArt Shipping Policy" />
            {/* <Text className="sm:!text-lg !text-base !font-normal">
              At <Brand content="ValArt" />, we strive to deliver your chosen artwork with care and
              efficiency. Here's what you need to know about our shipping procedures:
            </Text> */}
          </div>

          <div>
            <ul className="flex flex-col gap-4">
              <li>
                <TitleItem title="1. Shipping and Delivery:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Shipping Carriers: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    Artists are responsible to ship their art pieces to the customers themselves in
                    a secure way.
                  </Text>
                </div>

                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Processing Time: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    Upon purchase confirmation, artists typically require 1-3 business days to
                    prepare the artwork for shipping. However, this may vary based on the artwork's
                    size, medium, and artist's location.
                  </Text>
                </div>

                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Shipping Time: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    The time for delivery depends on the shipping method chosen during checkout and
                    the buyer's location. Estimated shipping times will be provided during the
                    checkout process.
                  </Text>
                </div>

                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="International Shipping: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    ValArt offers international shipping options. Please note that delivery times
                    for international orders may vary due to customs procedures and local delivery
                    services.
                  </Text>
                </div>
              </li>
              <li>
                <TitleItem title="2. Shipping Costs:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Domestic Shipping: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    Shipping costs for domestic orders are determined based on the artwork's size,
                    weight, shipping destination, and the chosen shipping method.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="International Shipping: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    International shipping costs are calculated similarly, accounting for the
                    artwork's specifications and the destination country.
                  </Text>
                </div>
              </li>

              <li>
                <TitleItem title="3. Tracking Orders:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Order Tracking: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    Once the artwork is shipped, buyers will receive a tracking number to monitor
                    the shipment's progress through our website or the respective carrier's tracking
                    service.
                  </Text>
                </div>
              </li>

              <li>
                <TitleItem title="4. Damaged or Lost Shipments:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Damaged Artwork: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    In the event of receiving a damaged artwork, buyers are encouraged to contact
                    ValArt's support team immediately. Please retain the original packaging for
                    inspection purposes.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Lost Shipments: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    If an artwork does not arrive within a reasonable timeframe, please reach out to
                    our support team. We'll investigate the matter and initiate the necessary steps
                    to resolve the issue.
                  </Text>
                </div>
              </li>
              <li>
                <TitleItem title="4. Shipping Restrictions:" />
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="P.O. Boxes: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    Please note that some carriers may not deliver to P.O. Box addresses. Ensure to
                    provide a physical shipping address for smoother deliveries.
                  </Text>
                </div>
                <div className="flex gap-1 flex-col xl:flex-row">
                  <Title content="Restricted Locations: " className="!text-sm flex-shrink-0" />
                  <Text className="!text-sm !font-normal">
                    There might be certain locations where shipping is restricted due to carrier
                    limitations or other factors. We will notify buyers if their location falls
                    under such restrictions.
                  </Text>
                </div>
              </li>
            </ul>
          </div>
        </Wrapper>
      </section>
      <NewsLetter />
    </Layout>
  );
};

export default ShippingReturns;
