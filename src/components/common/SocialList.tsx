import SocialLink from './SocialLink';

const footerSocialLinks = [
  {
    name: 'facebook',
    href: 'https://facebook.com'
  },
  {
    name: 'twitter',
    href: 'https://twitter.com'
  },
  {
    name: 'instagram',
    href: 'https://instagram.com'
  },
  // {
  //   name: 'youtube',
  //   href: 'https://youtube.com'
  // },
  {
    name: 'linkedin',
    href: 'https://linkedin.com'
  }
];

type SocialLinkProps = {
  socialLinks?: {
    name: string;
    href: string | null | undefined;
  }[];
  color?: string;
  size?: string;
  ulClass?: string;
};

const SocialList = ({ socialLinks = footerSocialLinks, color, size, ulClass }: SocialLinkProps) => {
  // console.log(socialLinks[2].href === null, 'SOCIAL');
  return (
    <ul className={`flex gap-4 justify-start items-center ${ulClass}`}>
      {socialLinks?.map((social) => (
        <li key={social?.name}>
          {social.href !== 'null' && social.href !== null ? (
            <SocialLink href={String(social?.href)} name={social?.name} color={color} size={size} />
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default SocialList;
