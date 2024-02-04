'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// components
import { Icon } from '@/components/ui';
import { NavigationDrawer, CartItemDrawer } from '@/components/common/Drawers';
import { AuthModal } from '@/components/common/Modals';

// redux
import { getTotalCarts } from '@/redux/selector/cart.selector';
import { checkAuthUser, getUserInfo } from '@/redux/selector/auth.selector';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';
import SearchModal from '@/components/common/Modals/SearchModal';
import { Img, SocialList } from '@/components/common';

type ListeItemProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export const ListItem = ({ href, children, className }: ListeItemProps) => (
  <li className="mb-1">
    <Link
      href={href}
      className={`flex justify-between px-3 py-1 hover:bg-orange hover:text-white ${className}`}
    >
      {children}
    </Link>
  </li>
);

const RightNav = () => {
  const user = getUserInfo();
  const totalCarts: number = useAppSelector(getTotalCarts);
  const router = useRouter();
  const isAuthUser = checkAuthUser();
  const dispatch = useAppDispatch();
  const [openSearchModal, setOpenSearchModal] = useState<boolean>(false);
  const [drawerState, setDrawerState] = useState<boolean>(false);
  const [cartDrawerState, setCartDrawerState] = useState<boolean>(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [openDialogue, setOpenDialogue] = useState<boolean>(false);

  const handleSignOut = () => {
    dispatch(logout());
    setOpenDialogue(false);
    router.push('/');
  };

  return (
    <div className="flex gap-5 items-center">
      <div onClick={() => setOpenSearchModal(true)} className="relative">
        <Icon name="search" size="16" />
        {openSearchModal && (
          <SearchModal onClose={() => setOpenSearchModal(false)} open={openSearchModal} />
        )}
      </div>
      <div className="indicator">
        <div onClick={() => setCartDrawerState(!cartDrawerState)} className="cursor-pointer">
          <span className="indicator-item badge badge-error text-white rounded-full w-5 text-xs">
            {totalCarts}
          </span>
          <Icon name="cart" size="20" />
        </div>
        <CartItemDrawer
          drawerState={cartDrawerState}
          closeDrawer={() => setCartDrawerState(false)}
        />
      </div>
      <div className="hidden lg:flex gap-2 relative">
        {!isAuthUser ? (
          <button
            className="ml-5 text-base bg-error px-6 py-1 text-white"
            onClick={() => setOpenAuthModal(true)}
          >
            Sign In
          </button>
        ) : (
          <div
            className="text-black text-base font-medium flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenDialogue(!openDialogue)}
          >
            <Img
              src={
                user?.image_path && user?.image_path.startsWith('http')
                  ? user?.image_path
                  : '/assets/icons/user.svg'
              }
              width={30}
              height={30}
              alt=""
              className="w-[30px] h-[30px] rounded-full"
            />{' '}
            <Icon name="arrow-down" color="black" size="14" />
            {/* My Account <Icon name="arrow-down" color="black" size="14" /> */}
          </div>
        )}
        {openDialogue && (
          <div className="bg-white absolute top-full mt-9 w-60 z-50 right-0">
            <ul className="flex flex-col text-black w-full shadow-md border border-slate-200">
              <ListItem href="/profile" className="">
                My Profile
              </ListItem>
              <ListItem href="/my-orders" className="">
                My Order
              </ListItem>
              <ListItem href="/liked-arts" className="">
                Favorites
              </ListItem>
              <ListItem href="/help" className="">
                Help
              </ListItem>
              <ListItem href="/dashboard/artist" className="bg-orange text-white">
                Artist Studio <Icon name="arrow-right-long" color="white" />
              </ListItem>
              <ListItem href="/dashboard/critic" className="bg-orange text-white">
                Critic Panel <Icon name="arrow-right-long" color="white" />
              </ListItem>
              <li
                className="flex mb-1 hover:bg-orange hover:text-white px-3 py-1 cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}
        <SocialList color="orange" size="16" />
      </div>
      <div className="flex lg:hidden relative">
        {isAuthUser && (
          <div
            className="text-black text-base font-medium flex items-center gap-2 cursor-pointer"
            onClick={() => setOpenDialogue(!openDialogue)}
          >
            <Img
              src={
                user?.image_path && user?.image_path.startsWith('http')
                  ? user?.image_path
                  : '/assets/icons/user.svg'
              }
              width={30}
              height={30}
              alt={user?.name}
              className="w-[30px] h-[30px] rounded-full"
            />{' '}
            <Icon name="arrow-down" color="black" size="14" />
          </div>
        )}
        {openDialogue && (
          <div className="bg-white absolute top-full mt-9 w-60 z-50 right-0">
            <ul className="flex flex-col text-black w-full shadow-md border border-slate-200">
              <ListItem href="/profile" className="">
                My Profile
              </ListItem>
              <ListItem href="/my-orders" className="">
                My Order
              </ListItem>
              <ListItem href="/liked-arts" className="">
                Favorites
              </ListItem>
              <ListItem href="/help" className="">
                Help
              </ListItem>
              <ListItem href="/dashboard/artist" className="bg-orange text-white">
                Artist Studio <Icon name="arrow-right-long" color="white" />
              </ListItem>
              <ListItem href="/dashboard/critic" className="bg-orange text-white">
                Critic Panel <Icon name="arrow-right-long" color="white" />
              </ListItem>
              <li
                className="flex mb-1 hover:bg-orange hover:text-white px-3 py-1 cursor-pointer"
                onClick={handleSignOut}
              >
                Sign Out
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex xl:hidden">
        <Icon name="menu" size="26" handleClick={() => setDrawerState(!drawerState)} />
        <NavigationDrawer
          drawerState={drawerState}
          closeDrawer={() => setDrawerState(!drawerState)}
        />
      </div>
      <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
    </div>
  );
};

export default RightNav;
