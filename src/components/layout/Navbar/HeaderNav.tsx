'use client';

import { usePathname } from 'next/navigation';

// components
import NavLink from '@/components/common/NavLink';

// data
import { navLinks } from '@/data/layout';

// redux
import { getUserInfo } from '@/redux/selector/auth.selector';

const HeaderNav = () => {
  const path = usePathname();
  const userInfo = getUserInfo();

  const isCritic = userInfo?.is_critic === 2 || false;

  return (
    <ul className="hidden gap-[26px] items-center xl:flex">
      {navLinks.map((list) => (
        <li
          key={list.title}
          className={`${path === list.link && 'active-list'} ${
            list.link === '/critics/register' && isCritic && 'hidden'
          }`}
        >
          <NavLink
            href={list.link}
            title={list.title}
            className={`${path === list.link ? 'text-orange' : 'text-black'}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default HeaderNav;
