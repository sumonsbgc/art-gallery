// components
import { Icon } from '@/components/ui';
import { SocialList } from '@/components/common';

// types
import { UserData } from '@/redux/features/auth/auth.types';

type AboutYouViewProps = {
  user: UserData;
  enableEdit: () => void;
};

const AboutYouView = ({ user, enableEdit }: AboutYouViewProps) => {
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
          <h1 className="text-2xl font-medium leading-normal text-black">About You</h1>

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

        <p>{user?.about}</p>

        <section className="mt-[137px]">
          {socialLinks?.find((item) => item?.href !== 'null' && item?.href !== null) && (
            <h1 className="text-2xl font-medium leading-normal text-black mb-4">Social Media</h1>
          )}
          <SocialList socialLinks={socialLinks} color="orange" size="24" />
        </section>
      </main>
    </div>
  );
};

export default AboutYouView;
