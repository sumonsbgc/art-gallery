import { NextRouter } from 'next/router';
import Cookies from 'js-cookie';

const all = ['customer', 'critic', 'artist', 'guest'];
const auth = ['customer', 'critic', 'artist'];

export const artistRoutes = [
  {
    name: 'Manage Artworks',
    icon: 'artwork',
    href: '/dashboard/artist/manage-artworks'
  },
  {
    name: 'Sales',
    icon: 'sales',
    href: '/dashboard/artist/sales'
  },
  {
    name: 'Payments',
    icon: 'payments',
    href: '/dashboard/artist/payments'
  },
  {
    name: 'Reviews',
    icon: 'review',
    href: '/dashboard/artist/reviews'
  },
  {
    name: 'Profile Settings',
    icon: 'setting',
    href: '/dashboard/artist/account-settings'
  }
];

export const criticRoutes = [
  {
    name: 'Review The Art',
    icon: 'suggestion',
    href: '/dashboard/critic/review-suggestion'
  },
  {
    name: 'Rate & Reviews',
    icon: 'artwork',
    href: '/dashboard/critic/rate-reviews'
  },
  {
    name: 'Accounts Settings',
    icon: 'setting',
    href: '/dashboard/critic/account-settings'
  }
];

export const accessibleRoutes = (
  router: NextRouter,
  pathname: string,
  type: string = 'customer',
  isArtist: boolean = false,
  isCritic: boolean = false
) => {
  const critic = ['critic'];
  const artist = ['artist'];

  if (isArtist && isCritic) {
    artist.push('critic');
  }

  const routes = [
    {
      path: '/404',
      access: all
    },
    {
      path: '/',
      access: all
    },
    {
      path: '/new-arrivals',
      access: all
    },
    {
      path: '/all-artwork',
      access: all
    },
    {
      path: '/best-sellers',
      access: all
    },
    {
      path: '/artists',
      access: all
    },
    {
      path: '/artists/register',
      access: auth
    },
    {
      path: '/artists/register/verification',
      access: all
    },
    {
      path: '/critics/register/verification',
      access: all
    },
    {
      path: '/arts',
      access: all
    },
    {
      path: '/faq',
      access: all
    },
    {
      path: '/critics/register',
      access: auth
    },
    {
      path: '/apply-critic',
      access: auth
    },
    {
      path: '/privacy-policy',
      access: all
    },
    {
      path: '/terms-condition',
      access: all
    },
    {
      path: '/career',
      access: all
    },
    {
      path: '/our-story',
      access: all
    },
    {
      path: '/shipping-returns',
      access: all
    },
    {
      path: '/size-guide',
      access: all
    },
    {
      path: '/contact-us',
      access: all
    },
    {
      path: '/help',
      access: all
    },
    {
      path: '/profile',
      access: auth
    },
    {
      path: '/checkout',
      access: auth
    },
    {
      path: '/my-orders',
      access: auth
    },
    {
      path: '/liked-arts',
      access: auth
    },
    {
      path: '/dashboard/artist',
      access: artist
    },
    {
      path: '/dashboard/artist/manage-artworks/create',
      access: artist
    },
    {
      path: '/dashboard/artist/manage-artworks/edit',
      access: artist
    },
    {
      path: '/dashboard/artist/manage-artworks/create/pending',
      access: artist
    },
    ...artistRoutes?.map((route) => ({
      path: route.href,
      access: artist
    })),
    {
      path: '/dashboard/critic',
      access: critic
    },
    {
      path: '/dashboard/critics-review',
      access: critic
    },
    ...criticRoutes?.map((route) => ({
      path: route.href,
      access: critic
    }))
  ];

  const accessToken = Cookies.get('accessToken');

  const route = routes.find((_route: any) => {
    return (
      _route.path === pathname ||
      pathname.startsWith('/artists/') ||
      pathname.startsWith('/critics/') ||
      pathname.startsWith('/arts/') ||
      pathname.startsWith('/dashboard/critics-review/') ||
      pathname.startsWith('/dashboard/artist/sales/') ||
      pathname.startsWith('/dashboard/artist/manage-artworks/') ||
      pathname.startsWith('/dashboard/artist/reviews/')
    );
  });

  const user = { role: accessToken ? type : 'guest' };

  if (route && user) {
    const { access } = route;

    if (access) {
      return access.includes(user.role);
    }

    return true;
  } else if (!route) {
    router.replace('/404');
  }

  return false;
};
