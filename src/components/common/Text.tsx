import React from 'react';
type TextPropType = { children: React.ReactNode; className?: string };

const Text = ({ children, className }: TextPropType) => {
  return (
    <p className={`${className} font-normal text-[#525252] text-sm sm:text-base`}>{children}</p>
  );
};

export default Text;
