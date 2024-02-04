import Link from 'next/link';
import React from 'react';
import { Icon } from '../ui';
type SocialLinkPropType = { href: string; name: string; color?: string; size?: string };

const SocialLink = ({ href, name, color, size }: SocialLinkPropType) => {
  return (
    <Link href={href}>
      <Icon name={name} color={color} size={size ?? '24'} />
    </Link>
  );
};

export default SocialLink;
