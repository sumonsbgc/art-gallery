import { Button, SectionTitle, Text, Title } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';
import { Icon } from '@/components/ui';

const SupportBox = ({
  iconName,
  title,
  content
}: {
  iconName: string;
  title: string;
  content: string;
}) => {
  return (
    <div className="bg-gray3 max-w-[390px] p-5 xl:p-9 flex flex-col items-center justify-center gap-4">
      <Icon name={iconName} color="black" size="60" />
      <Title content={title} className="text-lg !md:text-xl !text-black font-medium" />
      <Text className="italic !text-black text-center !text-sm !sm:base">{content}</Text>
    </div>
  );
};

const SupportSection = () => {
  return (
    <section className="pt-16 py-24">
      <Wrapper>
        <div className="section-head text-center mx-auto mb-12 w-[90%]">
          <SectionTitle content="Dedicated Artist Support" />
        </div>
        <div className="flex gap-4 lg:gap-8 justify-center flex-wrap">
          <SupportBox
            iconName="question"
            title="Here to Help"
            content="Work with an artist support specialist by email or phone when you have a question, or need assistance fulfilling a sale."
          />
          <SupportBox
            iconName="newsletter"
            title="Artist Newsletters"
            content="Sign up for our artist newsletter and get helpful tips for improving your sales delivered straight to your inbox."
          />
          <SupportBox
            iconName="light"
            title="Tips for Success"
            content="Best practices, new opportunities for promotion and general inspiration in our Artist Handbook and on the Canvas blog."
          />
        </div>
        <div className="text-center mt-6 sm:mt-9">
          <Button className="!text-white mx-auto !font-bold mt-5 !px-8 !py-3">
            Apply as an Artist
          </Button>
        </div>
      </Wrapper>
    </section>
  );
};

export default SupportSection;
