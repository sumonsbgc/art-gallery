import Link from 'next/link';

type NavLinkProps = { title: string; href: string; className?: string };

const NavLink = ({ title, href, className }: NavLinkProps) => (
  <Link href={href} className={`nav-link ${className}`}>
    {title}
  </Link>
);

export default NavLink;
