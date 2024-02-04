import { Text } from '@/components/common';

const CollapseContent = ({ content }: { content: string }) => {
  return (
    <div>
      <Text className="!text-sm font-normal !text-[#666] pb-4 pt-2">{content}</Text>
    </div>
  );
};

export default CollapseContent;
