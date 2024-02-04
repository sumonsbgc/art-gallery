'use client';

import React, { useEffect, useState } from 'react';

// redux
import { useGetProfileQuery } from '@/redux/features/auth/authApi';
import { getUserInfo } from '@/redux/selector/auth.selector';

// components
import { ProfileView, ProfileEdit, ProfilePic } from '@/components/profile';
import { Loading, ExperiencesAndOthers } from '@/components/common';
import Wrapper from '@/components/layout/Wrapper';
import { TabContent, TabFilterItem } from '@/components/ui/Tab';

// types
import { UserData } from '@/redux/features/auth/auth.types';

const tabs = [
  {
    title: 'Personal Information',
    id: 'personal-information'
  },
  {
    title: 'Experiences & Others',
    id: 'experiences-others'
  }
];

const CriticAccountSettingsPage = () => {
  const userInfo = getUserInfo();
  const { data, isLoading, refetch } = useGetProfileQuery({
    refetchOnMountOrArgChange: true
  });
  const _user = data?.data;
  const [user, setUser] = useState<UserData | null>(_user);
  const [screen, setScreen] = useState('view');
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id);

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <Wrapper>
      {/* profile pic */}
      <ProfilePic user={user} />

      {/* tab */}
      <ul className="tab-filter mt-5 mb-6">
        {tabs?.map((tab) => {
          return (
            <TabFilterItem
              key={tab?.id}
              id={tab?.id}
              title={tab?.title}
              activeTab={activeTab}
              activeHandler={() => setActiveTab(tab?.id)}
              className="!py-[7px] !px-4 bg-gray3 font-normal text-base"
              activeClass="!bg-black !text-white font-medium"
            />
          );
        })}
        <div className="w-full h-[1px] border border-lightgray4 mt-10" />
      </ul>

      <TabContent id={tabs[0].id} activeTab={activeTab}>
        {screen === 'view' && <ProfileView user={user} enableEdit={() => setScreen('edit')} />}
        {screen === 'edit' && (
          <ProfileEdit
            // user={userInfo}
            user={user}
            setUser={setUser}
            enableView={() => {
              setScreen('view');
              refetch();
            }}
          />
        )}
      </TabContent>

      <TabContent id={tabs[1].id} activeTab={activeTab}>
        <ExperiencesAndOthers user={user} userType="critic" />
      </TabContent>
    </Wrapper>
  );
};

export default CriticAccountSettingsPage;
