'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// components
import { Icon } from '@/components/ui';
import Wrapper from '@/components/layout/Wrapper';
import { ListItem } from '@/components/layout/Navbar/RightNav';

// redux
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';

// data
import { criticRoutes } from '@/data/routes';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [openDialogue, setOpenDialogue] = useState<boolean>(false);

  const handleSignOut = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <header className="header border-b border-[#0000001a]">
      {/* secondary nav */}
      <nav className="bg-white md:bg-black py-[11px]">
        <Wrapper>
          <div className="flex justify-between">
            {/* back */}
            <Link href="/" className="text-white flex gap-3">
              <Icon name="arrow-left" color="black" className="block md:hidden" />
              <Icon name="arrow-left" color="white" className="hidden md:block" />
              <Icon name="logo-small" />
            </Link>

            {/* my account */}
            <section className="gap-12 flex">
              <div className="flex relative">
                <div className="cursor-pointer" onClick={() => setOpenDialogue(!openDialogue)}>
                  <span className="hidden md:flex text-white text-base font-medium items-center gap-2">
                    My Account <Icon name="arrow-down" color="white" size="16" />
                  </span>
                  <span className="block md:hidden">
                    <Icon name="menu" color="black" size="22" />
                  </span>
                </div>

                {openDialogue && (
                  <div className="bg-white absolute top-full mt-4 w-60 z-50 right-0">
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
          <div className="flex justify-center items-center">
            <section className="h-[38px] md:h-16 justify-start items-start inline-flex">
              {criticRoutes.map((route, index) => {
                const isActive = pathname.startsWith(route.href);

                return (
                  <Link
                    key={route.name}
                    href={route.href}
                    className={`w-[115px] md:w-[151.33px] h-[38px] md:h-full py-1 md:py-2.5 flex-col justify-center items-center gap-0.5 inline-flex border-r border-black border-opacity-10 ${
                      isActive ? 'bg-orange' : 'bg-gray3'
                    } ${index === 0 && 'border-l'}`}
                  >
                    <Icon
                      name={route.icon}
                      color={isActive ? 'white' : 'black'}
                      size="24"
                      className="hidden md:block"
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
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};

export default Navbar;
