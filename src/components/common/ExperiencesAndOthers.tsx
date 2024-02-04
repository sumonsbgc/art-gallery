import Link from 'next/link';

// components
import { Icon } from '@/components/ui';

// types
import { UserData } from '@/redux/features/auth/auth.types';

// utils
import { addZero } from '@/utils';

type ExperiencesProp = {
  user: UserData;
  userType?: string;
};

type ItemProps = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

const Item = ({ icon, title, children }: ItemProps) => (
  <aside className="border border-black border-opacity-10 p-6">
    <div className="justify-start items-center gap-2.5 flex mb-7">
      <Icon name={icon} />
      <p className="text-black text-xl font-medium leading-tight">{title}</p>
    </div>
    {children}
  </aside>
);

const ExperiencesAndOthers = ({ user, userType = 'artist' }: ExperiencesProp) => {
  const isCritic = userType === 'critic';

  const designation = isCritic ? user?.critic_designation : user?.designation;
  const organization = isCritic ? user?.critic_organization : user?.organization;
  const experience = isCritic ? user?.critic_experience : user?.experience;
  const awardArr = isCritic ? user?.critic_award : user?.artist_award;
  const documentArr = isCritic ? user?.critic_document : user?.artist_document;

  return (
    <div>
      <h3 className="text-black text-2xl font-medium leading-normal mb-8">Experiences & Others</h3>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Item icon="experience" title="Experiences">
          <p className="text-orange text-base font-medium leading-none mb-3">{designation || ''}</p>
          <p className="text-zinc-500 text-opacity-80 text-base font-normal leading-none mb-[5px]">
            {organization || ''}
          </p>
          <p className="text-black text-sm font-normal leading-[14px]">
            {addZero(experience || 0)} Years
          </p>
        </Item>

        <Item icon="award" title="Award">
          <div className="flex-col justify-start items-start gap-3 flex">
            {awardArr &&
              Array.isArray(awardArr) &&
              awardArr?.length > 0 &&
              awardArr?.map((award, ind) => (
                <p className="text-orange text-base font-medium leading-none" key={ind}>
                  {award}
                </p>
              ))}
          </div>
        </Item>

        <Item icon="document" title="Link & Documents">
          <div className="flex items-start w-full">
            <aside className="w-1/2 flex flex-col gap-2">
              {documentArr &&
                Array.isArray(documentArr) &&
                documentArr?.length > 0 &&
                documentArr?.map((doc) => (
                  <Link key={doc?.original_name} href={doc?.file_location} target="_blank">
                    <p className="text-black text-sm font-normal leading-snug flex justify-start items-center gap-2">
                      <Icon name="file" size="22" color="gray2" />
                      {doc?.original_name}
                    </p>
                  </Link>
                ))}
            </aside>

            <aside className="w-1/2">
              <p className="text-black text-sm font-normal leading-snug">Portfolio Link</p>
              {user?.website ? (
                <Link
                  href={user?.website}
                  className="text-blue-400 text-sm font-normal underline leading-snug"
                >
                  {user?.website}
                </Link>
              ) : (
                'No website found'
              )}
            </aside>
          </div>
        </Item>
      </section>
    </div>
  );
};

export default ExperiencesAndOthers;
