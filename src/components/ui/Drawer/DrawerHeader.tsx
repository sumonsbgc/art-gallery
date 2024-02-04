import React from 'react';
import { Icon } from '..';

type DrawerHeaderProp = { children: React.ReactNode; closeDrawer: () => void };

const DrawerHeader = ({ children, closeDrawer }: DrawerHeaderProp) => {
  return (
    <div className="drawer-header">
      {children}
      <div className="justify-end" onClick={closeDrawer}>
        <Icon name="close" size="36" />
      </div>
    </div>
  );
};

export default DrawerHeader;
