'use client';

import { usePathname } from 'next/navigation';

// components
import NavLink from '@/components/common/NavLink';

// data
import { mobileNavLinks } from '@/data/layout';

// redux
import { getUserInfo } from '@/redux/selector/auth.selector';

const VerticalDrawerNav = () => {
  const path = usePathname();
  const userInfo = getUserInfo();

  const isCritic = userInfo?.is_critic === 2 || false;

  return (
    <ul className="flex justify-center items-center gap-4 flex-col mt-7">
      {mobileNavLinks.map((list) => (
        <li
          key={list.title}
          className={`${path === list.link && 'active-vertical-link'} ${
            list.link === '/critics/register' && isCritic && 'hidden'
          }`}
        >
          <NavLink
            href={list.link}
            title={list.title}
            className={`${path === list.link ? '!text-white' : '!text-[#807B7B]'}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default VerticalDrawerNav;
