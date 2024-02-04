'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// components
import { Drawer, DrawerContent, DrawerHeader, Icon } from '@/components/ui';
import Wrapper from '@/components/layout/Wrapper';
import { ListItem } from '@/components/layout/Navbar/RightNav';

// redux
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';

// data
import { artistRoutes } from '@/data/routes';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [openDialogue, setOpenDialogue] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const handleSignOut = () => {
    dispatch(logout());
    router.replace('/');
  };

  return (
    <header className="header border-b border-[#0000001a]">
      {/* secondary nav */}
      <nav className="bg-white md:bg-black  py-[11px]">
        <Wrapper>
          <div className="flex justify-between">
            {/* back */}
            <Link href="/" className="text-white flex gap-3">
              <Icon name="arrow-left" color="black" className="block md:hidden" />
              <Icon name="arrow-left" color="white" className="hidden md:block" />
              <Icon name="logo-small" />
            </Link>

            <h2 className="text-black text-[24px] font-semibold md:hidden block ">Studio.</h2>

            {/* my account */}
            <section className="gap-12 flex">
              <div className="flex relative">
                <div className="cursor-pointer">
                  <span
                    className="hidden md:flex text-white text-base font-medium items-center gap-2"
                    onClick={() => setOpenMenu(!openMenu)}
                  >
                    My Account <Icon name="arrow-down" color="white" size="16" />
                  </span>
                  <span className="block md:hidden">
                    <Icon
                      name="menu"
                      color="black"
                      size="22"
                      handleClick={() => setOpenDialogue(!openDialogue)}
                    />
                  </span>
                </div>

                {openDialogue && (
                  <div className="bg-white h-screen absolute z-20 right-0 block md:hidden">
                    <Drawer
                      open={openDialogue}
                      onClose={() => setOpenDialogue(false)}
                      header={
                        <DrawerHeader closeDrawer={() => setOpenDialogue(!openDialogue)}>
                          <Link href="/">
                            <Icon name="logo-small" />
                          </Link>
                        </DrawerHeader>
                      }
                    >
                      <DrawerContent>
                        <ul className="flex flex-col text-black w-full shadow-md">
                          <li className="w-full flex justify-center hover:bg-orange hover:text-white px-3 py-1 cursor-pointer">
                            <Link href="/my-orders">My Order</Link>
                          </li>
                          <li className="w-full flex justify-center hover:bg-orange hover:text-white px-3 py-1 cursor-pointer">
                            <Link href="/liked-arts">Favorites</Link>
                          </li>
                          <li className="w-full flex justify-center hover:bg-orange hover:text-white px-3 py-1 cursor-pointer">
                            <Link href="/help">Help</Link>
                          </li>
                          <li className="w-full flex justify-center mt-32 mb-1 px-3 py-1 ">
                            <span
                              className="w-[190px] h-[48px] bg-orange cursor-pointer text-white text-[16px] font-[500] flex justify-center items-center"
                              onClick={handleSignOut}
                            >
                              Sign Out
                            </span>
                          </li>
                        </ul>
                      </DrawerContent>
                    </Drawer>
                  </div>
                )}

                {openMenu && (
                  <div className="bg-white absolute top-full mt-4 w-60 z-50 right-0 hidden md:block">
                    <ul className="flex flex-col text-black w-full shadow-md border border-slate-200">
                      <ListItem href="/my-orders">My Order</ListItem>
                      <ListItem href="/liked-arts">Favorites</ListItem>
                      <ListItem href="/help">Help</ListItem>
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
            </section>
          </div>
        </Wrapper>
      </nav>

      {/* primary nav | tab section */}
      <nav className="bg-white">
        <Wrapper>
          <div className="flex justify-between items-center">
            <h2 className="text-black text-[28px] font-semibold sm:block hidden">Studio.</h2>
            <section className="sm:h-16 justify-start items-start inline-flex overflow-x-auto">
              {artistRoutes.map((route, index) => {
                const isActive = pathname.startsWith(route.href);
                return (
                  <Link
                    key={route.name}
                    href={route.href}
                    className={`w-[120px] sm:w-[151.33px] sm:h-full py-2 sm:py-2.5 flex-col justify-center items-center gap-0.5 inline-flex border-r border-black border-opacity-10 flex-shrink-0 ${
                      isActive ? 'bg-orange' : 'bg-gray3'
                    } ${index === 0 && 'border-l'}`}
                  >
                    <Icon
                      name={route.icon}
                      color={isActive ? 'white' : 'black'}
                      size="24"
                      className="sm:block hidden"
                    />
                    <p
                      className={`text-center text-${
                        isActive ? 'white' : 'black'
                      } text-sm font-normal`}
                    >
                      {route.name}
                    </p>
                  </Link>
                );
              })}
            </section>
            <div />
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};

export default Navbar;
