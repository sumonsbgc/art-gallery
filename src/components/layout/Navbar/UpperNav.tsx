import Link from 'next/link';
import React from 'react';

type NavLinkProp = { title: string; href: string };

const NavLink = ({ title, href }: NavLinkProp) => (
  <Link href={href} className="top-nav-link">
    {title}
  </Link>
);

const UpperNav = () => {
  return (
    <ul className="flex gap-4 items-center">
      <li>
        <NavLink title="Shipping" href="/shipping-returns" />
      </li>
      <li>
        <NavLink title="FAQ" href="/faq" />
      </li>
      <li>
        <NavLink title="Contact" href="/contact-us" />
      </li>
    </ul>
  );
};

export default UpperNav;
