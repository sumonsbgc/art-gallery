import React from 'react';

type GridPropType = { children: React.ReactNode; className: string };

const Grid = ({ children, className }: GridPropType) => {
  return <div className={`grid ${className}`}>{children}</div>;
};

export default Grid;
