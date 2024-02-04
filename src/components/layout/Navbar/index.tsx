import Link from 'next/link';

// components
import { Icon } from '@/components/ui';
import Wrapper from '@/components/layout/Wrapper';
// import { SocialList, Text } from '@/components/common';
// import UpperNav from './UpperNav';
import HeaderNav from './HeaderNav';
import RightNav from './RightNav';

type NavBarProps = { borderBottom?: boolean };

const Navbar = ({ borderBottom }: NavBarProps) => {
  return (
    <header className={`header ${borderBottom && 'border-b border-[#0000001a]'}`}>
      {/* <nav className="bg-[#f5f5f5] py-4">
        <Wrapper>
          <div className="flex lg:justify-between justify-center">
            <Text className="text-black flex gap-3 uppercase !text-[11px] !font-medium tracking-[0.22px]">
              <Icon name="shipping" /> Free shipping over $100
            </Text>
            <div className="hidden gap-12 lg:flex">
              <UpperNav />
              <SocialList color="lightgray" size="16" />
            </div>
          </div>
        </Wrapper>
      </nav> */}

      <nav className="bg-[#fff] py-7">
        <Wrapper>
          <section className="flex justify-between items-center">
            <Link href="/">
              <Icon name="logo" className="sm:flex hidden" />
              <Icon name="logo-mobile" className="sm:hidden flex" size="" />
            </Link>
            <HeaderNav />
            <RightNav />
          </section>
        </Wrapper>
      </nav>
    </header>
  );
};

export default Navbar;
