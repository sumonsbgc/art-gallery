import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// components
import { Icon } from '@/components/ui';

// types
import { UserData } from '@/redux/features/auth/auth.types';

type ItemProps = {
  title: string;
  value?: string;
  containerClassName?: string;
};

const Item = ({ title, value, containerClassName }: ItemProps) => (
  <div className={containerClassName}>
    <h4 className="text-black text-opacity-75 text-base font-normal leading-[14px] mb-[12px]">
      {title}
    </h4>
    <p className="text-base text-opacity-80 font-normal leading-none text-black">{value}</p>
  </div>
);

type ProfileViewProps = {
  user: UserData;
  enableEdit: () => void;
};

const ProfileView = ({ user, enableEdit }: ProfileViewProps) => {
  const pathname = usePathname();

  const socialLinks = [
    {
      name: 'facebook',
      href: user?.facebook_url
    },
    {
      name: 'twitter',
      href: user?.twitter_url
    },
    {
      name: 'instagram',
      href: user?.instagram_url
    },
    {
      name: 'youtube',
      href: user?.gplus_url
    }
  ];

  return (
    <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl lg:px-2">
      <main className="w-full">
        {/* Title and edit button */}
        <section className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium leading-normal text-black">My Profile</h1>

          <button
            onClick={enableEdit}
            className="w-[100px] h-10 bg-white rounded-lg justify-start items-center flex border border-black-default-10"
          >
            <div className="grow shrink basis-0 self-stretch px-4 py-[5px] border-r border-black border-opacity-10 justify-center items-center gap-2 flex">
              <div className="inline-flex flex-col items-start justify-center">
                <div className="text-black text-sm font-normal leading-[14px]">Edit</div>
              </div>
            </div>
            <div className="w-8 h-10 px-[9px] py-[13px] justify-center items-center flex">
              <Icon name="edit" color="black" />
            </div>
          </button>
        </section>

        {/* Profile image */}
        <section className="p-6 mb-6 border border-black-default-10 rounded-lg">
          <div className="flex items-center gap-3">
            <Image
              src={
                user?.image_path && user?.image_path.startsWith('http')
                  ? user?.image_path
                  : '/assets/icons/user.svg'
              }
              alt="photo"
              className="w-[50px] h-[50px] rounded-full"
              width={50}
              height={50}
              priority
            />

            <div>
              <p className="mb-2 text-base font-medium leading-none text-black">
                {user?.first_name + ' ' + user?.last_name}
              </p>
              <p className="text-black text-opacity-50 text-sm font-normal leading-[14px]">
                {user?.user_type}
              </p>
            </div>
          </div>
        </section>

        {/* Personal information */}
        <section className="p-6 mb-6 border border-black-default-10 rounded-lg">
          <h2 className="text-black text-lg font-medium leading-[18px] mb-7">
            Personal Information
          </h2>

          <div className="relative flex flex-col items-start justify-start sm:flex-row">
            <aside>
              <Item title="First Name" value={user?.first_name || '-'} containerClassName="mb-6" />
              <Item
                title="Last Name"
                value={user?.last_name || '-'}
                containerClassName="mb-6 sm:m-0 block sm:hidden"
              />
              <Item
                title="Email address"
                value={user?.email || '-'}
                containerClassName="mb-6 sm:m-0"
              />
            </aside>

            <aside className="sm:absolute md:left-[400px] sm:left-[300px]">
              <Item
                title="Last Name"
                value={user?.last_name || '-'}
                containerClassName="mb-6 hidden sm:block"
              />
              <Item title="Phone Number" value={user?.mobile || '-'} />
            </aside>
          </div>
        </section>

        {/* About */}
        {pathname === '/dashboard/critic/account-settings' && (
          <section className="p-6 mb-6 border border-black-default-10 rounded-lg">
            <h2 className="text-black text-lg font-medium leading-[18px] mb-7">About</h2>

            <p className="text-base text-opacity-80 font-normal leading-6 text-black">
              {user?.about || '-'}
            </p>
          </section>
        )}

        {/* Address */}
        <section className="p-6 border border-black-default-10 rounded-lg">
          <h2 className="text-black text-lg font-medium leading-[18px] mb-7">Address</h2>

          <div className="relative flex flex-col items-start justify-start sm:flex-row">
            <aside>
              <Item
                title="Country"
                value={user?.country?.country_name || '-'}
                containerClassName="mb-6"
              />
              <Item
                title="Postal Code"
                value={user?.zip_code || '-'}
                containerClassName="mb-6 sm:m-0"
              />
            </aside>

            <aside className="sm:absolute md:left-[400px] sm:left-[300px]">
              <Item title="City/State" value={user?.city || '-'} containerClassName="mb-6" />
              <Item title="Address" value={user?.address || '-'} />
            </aside>
          </div>
        </section>

        {/* Social links */}
        {(user?.facebook_url || user?.twitter_url || user?.instagram_url || user?.gplus_url) && (
          <section className="p-6 border border-black-default-10 rounded-lg mt-6">
            <h2 className="text-black text-lg font-medium leading-[18px] mb-7">Social Links</h2>
            <aside className="flex flex-col gap-1">
              {socialLinks?.map(
                (social, key) =>
                  social?.href && (
                    <Link
                      key={key}
                      target="_blank"
                      href={social?.href}
                      className="text-gray text-base capitalize underline leading-snug font-medium"
                    >
                      {social?.name}
                    </Link>
                  )
              )}
            </aside>
          </section>
        )}

        {/* delete */}
        <div className="pl-6 mt-[81px] mb-[71px]">
          <h2 className="text-black text-xl font-medium leading-tight mb-[7px]">
            Want to Delete Account?
          </h2>
          <p className="text-black text-opacity-50 text-base font-normal leading-none">
            Contact us{' '}
            <span className="text-red underline">
              <Link href="mailto:support@valart.com">support@valart.com</Link>
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProfileView;
