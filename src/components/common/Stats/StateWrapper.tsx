import React from 'react';

type StateWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

const StateWrapper = ({ children, className }: StateWrapperProps) => {
  return (
    <div className={`stats stats-vertical lg:stats-horizontal w-full bg-white ${className}`}>
      {children}
    </div>
  );
};

export default StateWrapper;
