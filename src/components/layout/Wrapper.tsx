import React, { ReactNode } from 'react';

type WrapperType = {
  children: ReactNode;
  maxWidth?: string;
  className?: string;
};

const Wrapper = ({ children, maxWidth, className }: WrapperType) => {
  const max_width = maxWidth ? '!max-w-[1550px]' : '';
  return <div className={`wrapper ${className} ${max_width}`}>{children}</div>;
};

export default Wrapper;
