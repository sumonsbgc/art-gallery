import Image from 'next/image';

// components
import { Icon } from '@/components/ui';

// types
import { UserData } from '@/redux/features/auth/auth.types';

type ProfilePicProps = {
  user: UserData;
};

const ProfilePic = ({ user }: ProfilePicProps) => {
  return (
    <section className="mb-12">
      <div className="flex flex-col justify-center items-center">
        <Image
          src={
            user?.image_path && user?.image_path.startsWith('http')
              ? user?.image_path
              : '/assets/icons/user.svg'
          }
          alt="photo"
          className="w-[114px] h-[114px] rounded-full mb-3"
          width={114}
          height={114}
          priority
        />

        <p className="text-black text-2xl font-semibold mb-1">
          {user?.first_name + ' ' + user?.last_name}
        </p>

        <div className="flex items-center gap-1.5">
          <Icon name="location" color="orange" size="16" />
          <p className="text-black text-sm font-light">{user?.country?.country_name}</p>
        </div>
      </div>
    </section>
  );
};

export default ProfilePic;
