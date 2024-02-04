'use client';

import Link from 'next/link';

// components
import { Icon } from '@/components/ui';
import { SocialList } from '@/components/common';
import Wrapper from './Wrapper';

// redux
import { getUserInfo } from '@/redux/selector/auth.selector';

const WidgetTitle = ({ title }: { title: string }) => (
  <header className="footer-title text-white opacity-100 font-medium mb-[12px]">{title}</header>
);

type WidgetLinkPropType = { text: string; href: string; icon?: React.ReactNode };

const WidgetLink = ({ text, href, icon }: WidgetLinkPropType) => (
  <Link href={href} className={'widget-link flex items-center'}>
    {icon && <span className="w-5 text-center flex mr-2 justify-center">{icon}</span>} {text}
  </Link>
);

const Footer = () => {
  const userInfo = getUserInfo();

  const isCritic = userInfo?.is_critic === 2 || false;

  return (
    <section className="footer-area">
      <footer className="footer p-10 text-base-content">
        <aside className="flex w-full md:flex-col flex-row items-center md:items-start justify-between md:justify-start">
          <Link href="/" className="sm:mb-7 md:block hidden">
            <Icon name="logo-white" />
          </Link>
          <Link href="/" className="sm:mb-7 md:hidden block">
            <Icon name="logo-white-small" />
          </Link>
          <SocialList color="white" size="18" />
        </aside>
        <nav>
          <WidgetTitle title="QUICK LINK" />
          <WidgetLink text="Artists" href="/artists" />
          <WidgetLink text="New Arrivals" href="/new-arrivals" />
          <WidgetLink text="Best Sellers" href="/best-sellers" />
          {!isCritic && <WidgetLink text="Be A Critic" href="/critics/register" />}
        </nav>
        <nav>
          <WidgetTitle title="SUPPORT" />
          <WidgetLink text="Contact Us" href="/contact-us" />
          <WidgetLink text="FAQs" href="/faq" />
          <WidgetLink text="Size Guide" href="/size-guide" />
          <WidgetLink text="Shipping & Return" href="/shipping-returns" />
        </nav>
        <nav>
          <WidgetTitle title="COMPANY" />
          <WidgetLink text="Our Story" href="/our-story" />
          <WidgetLink text="Careers" href="/career" />
          <WidgetLink text="Terms & Conditions" href="/terms-condition" />
          <WidgetLink text="Privacy & Cookie Policy" href="/privacy-policy" />
        </nav>
        <nav>
          <WidgetTitle title="CONTACT" />
          <WidgetLink
            text="1-888-923-8044"
            href="tel:1-888-923-8044"
            icon={<Icon name="phone" />}
          />
          <WidgetLink
            text="1-888-923-8055"
            href="tel:1-888-923-8055"
            icon={<Icon name="phone" />}
          />
          <WidgetLink
            text="help@arts.com"
            href="mailto:help@arts.com"
            icon={<Icon name="envelop" />}
          />
        </nav>
      </footer>
      <div className="copyright-footer">
        <Wrapper>
          <p className="sm:text-center text-start">&copy; ValArt. 2023 All rights reserved.</p>
        </Wrapper>
      </div>
    </section>
  );
};

export default Footer;
