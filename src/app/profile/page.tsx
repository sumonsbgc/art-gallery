/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';

// redux
import { useGetProfileQuery } from '@/redux/features/auth/authApi';

// components
import { ProfileView, ProfileEdit } from '@/components/profile';
import { Loading } from '@/components/common';
import Layout from '@/components/layout';
import Wrapper from '@/components/layout/Wrapper';

// types
import { UserData } from '@/redux/features/auth/auth.types';
// import { getObjectLength } from '@/utils';

const Profile = () => {
  const { data, isLoading, refetch } = useGetProfileQuery({
    refetchOnMountOrArgChange: true
  });
  const _user = data?.data;
  const [user, setUser] = useState<UserData | null>(_user);
  // const [user, setUser] = useState<UserData>({} as UserData);
  const [screen, setScreen] = useState('view');

  useEffect(() => {
    if (_user) setUser(_user);
  }, [_user]);

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <Layout headerBottomBorder>
      <Wrapper>
        {screen === 'view' && <ProfileView user={user} enableEdit={() => setScreen('edit')} />}
        {screen === 'edit' && (
          <ProfileEdit
            user={user}
            setUser={setUser}
            enableView={() => {
              refetch();
              setScreen('view');
            }}
          />
        )}
      </Wrapper>
    </Layout>
  );
};

export default Profile;
