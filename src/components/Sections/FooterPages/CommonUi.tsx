import { Text, Title } from '@/components/common';

export const TextItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text className="flex gap-2 ml-2 relative circle-item !text-sm !font-normal">
      <span>{children}</span>
    </Text>
  );
};

export const TitleItem = ({ title }: { title: string }) => {
  return <Title content={title} className="!text-sm mb-3 font-medium" />;
};

export const ContentHead = ({ title }: { title: string }) => {
  return <Title content={title} className="!sm:text-2xl !text-xl mb-2" />;
};

export const Brand = ({ content }: { content: string }) => (
  <span className="text-orange italic font-semibold">{content}</span>
);
