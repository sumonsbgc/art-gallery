import { Icon } from '@/components/ui';
import { UserData } from '@/redux/features/auth/auth.types';
import { addZero } from '@/utils';

type ExperiencesProp = {
  user: UserData;
};

type ItemProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

const Item = ({ icon, title, children }: ItemProps) => (
  <div className="w-full flex justify-between gap-4">
    <div className="w-full justify-start items-center gap-2.5 flex mb-7">
      <Icon name={icon} size="18" />
      <p className="text-black text-[16px] font-medium leading-tight">{title}</p>
    </div>
    {children}
  </div>
);

const ExperiencesAward = ({ user }: ExperiencesProp) => {
  return (
    <div className="w-full">
      <Item icon="experience" title="Experiences">
        <div className="w-full">
          <div className="flex gap-4">
            <div className="text-black text-[14px] font-[400]">
              {addZero(user?.critic_experience || 0)} Years
            </div>
            <div className="text-orange text-[14px] font-medium">
              {user?.critic_designation || ''}
            </div>
            <div className="text-zinc-500 text-opacity-80 text-[14px] font-normal">
              {user?.critic_organization || ''}
            </div>
          </div>
        </div>
      </Item>
      <Item icon="award" title="Award">
        <div className="w-full">
          <div className="flex-col justify-start items-start gap-3 flex">
            {user?.critic_award &&
              Array.isArray(user?.critic_award) &&
              user?.critic_award?.length > 0 &&
              user?.critic_award?.map((award, ind) => (
                <div className="text-orange text-[14px] font-medium leading-none" key={ind}>
                  {award}
                </div>
              ))}
          </div>
        </div>
      </Item>
    </div>
  );
};

export default ExperiencesAward;
