import React from 'react';

const DrawerContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="drawer_content">{children}</div>;
};

export default DrawerContent;
