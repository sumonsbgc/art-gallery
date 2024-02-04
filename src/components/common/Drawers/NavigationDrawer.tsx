import VerticalDrawerNav from '@/components/layout/Navbar/VerticalDrawerNav';
import { Drawer, DrawerContent, DrawerHeader, Icon } from '@/components/ui';
import React, { useState } from 'react';
import { SocialList } from '..';
import Link from 'next/link';
import { AuthModal } from '../Modals';
import { checkAuthUser } from '@/redux/selector/auth.selector';

type NavigationDrawerPropType = { drawerState: boolean; closeDrawer: () => void };

const NavigationDrawer = ({ drawerState, closeDrawer }: NavigationDrawerPropType) => {
  const isAuthUser = checkAuthUser();
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  return (
    <>
      <Drawer
        open={drawerState}
        onClose={closeDrawer}
        maskClosable={true}
        header={
          <DrawerHeader closeDrawer={closeDrawer}>
            <Link href="/">
              <Icon name="logo" />
            </Link>
          </DrawerHeader>
        }
      >
        <DrawerContent>
          <VerticalDrawerNav />
          <div className="mt-16 text-center">
            {!isAuthUser ? (
              <button
                className="mb-4 text-base bg-error px-12 py-4 text-white w-[200px] !font-medium"
                onClick={() => {
                  closeDrawer();
                  setOpenAuthModal(!openAuthModal);
                }}
              >
                Sign In
              </button>
            ) : null}
            <h4 className="title-medium text-[#0f0f0f] uppercase text-center mb-4">FOLLOW US</h4>
            <SocialList color="orange" ulClass="justify-center" />
          </div>
        </DrawerContent>
      </Drawer>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </>
  );
};

export default NavigationDrawer;
