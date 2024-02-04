import React from 'react';

type TitleProp = {
  content: string;
  className?: string;
  onClick?: () => void;
};

const SectionTitle = ({ content, className }: TitleProp) => {
  return <h2 className={`${className} text-black text-3xl sm:text-4xl`}>{content}</h2>;
};

export default SectionTitle;

export const Title = ({ content, className, onClick }: TitleProp) => {
  return (
    <h4 className={`${className} text-black text-sm sm:text-base`} onClick={onClick}>
      {content}
    </h4>
  );
};
