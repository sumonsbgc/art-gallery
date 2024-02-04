import React, { ReactNode } from 'react';
import { Drawer as AntdDrawer } from 'antd';

type DrawerType = {
  children: ReactNode;
  open: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  width?: number;
  onClose: () => void;
  rootClassName?: string;
  maskClosable?: boolean;
};

const Drawer = ({
  children,
  open,
  header,
  footer,
  width,
  rootClassName,
  onClose,
  maskClosable
}: DrawerType) => {
  return (
    <AntdDrawer
      width={width}
      open={open}
      title={header}
      footer={footer}
      closable={false}
      onClose={onClose}
      maskClosable={maskClosable}
      classNames={{ content: rootClassName }}
    >
      {children}
    </AntdDrawer>
  );
};

export default Drawer;
