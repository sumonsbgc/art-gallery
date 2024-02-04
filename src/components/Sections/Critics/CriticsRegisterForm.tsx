/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FormikHelpers } from 'formik';

// components
import { UserUpgradeForm } from '@/components/common';

// redux
import { Country, UserData } from '@/redux/features/auth/auth.types';
import {
  useGetCountryListQuery,
  useGetProfileQuery,
  useUpgradeCustomerMutation
} from '@/redux/features/auth/authApi';

// types
import { OptionType } from '@/types/artUpload.type';
import { IUserUpgradeType } from '@/types/upgradeCustomer';

// utils
import { getObjectLength } from '@/utils';

const CriticsRegisterForm = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<OptionType[]>([]);
  const [user, setUser] = useState<UserData>({} as UserData);

  const { data: countryList, isSuccess: countrySuccess } = useGetCountryListQuery({});
  const [upgradeCustomer, { isLoading, isSuccess, isError, error }] = useUpgradeCustomerMutation();

  const { data: userData, isSuccess: userSuccess } = useGetProfileQuery({
    refetchOnMountOrArgChange: true
  });

  const handleSignup = async (
    values: IUserUpgradeType,
    fileList: File[],
    userPhoto?: File,
    actions?: FormikHelpers<IUserUpgradeType>
  ) => {
    try {
      console.log(fileList, 'FILES');
      const userType = 'critic';
      const formData = new FormData();
      userPhoto && formData.append('user_photo', userPhoto);
      formData.append('first_name', values?.first_name);
      formData.append('last_name', values?.last_name);
      formData.append('mobile', values?.mobile);
      formData.append('email', values?.email);
      formData.append('user_type', userType);
      formData.append('critic_award', values?.award?.join(','));
      formData.append('critic_experience', String(values?.experience));
      formData.append('critic_organization', values?.organisation);
      formData.append('critic_designation', values?.designation);
      formData.append('country', String(values?.country));
      formData.append('zip_code', values?.zip_code);
      formData.append('address', values?.address);
      formData.append('city', values?.city);
      formData.append('about', values?.about);
      formData.append('facebook_url', values?.fb_url);
      formData.append('twitter_url', values?.twitter_url);
      formData.append('instagram_url', values?.insta_url);
      formData.append('gplus_url', values?.youtube_url);
      formData.append('website', values?.website);
      //@ts-ignore
      fileList.forEach((file) => formData.append('files[]', file));
      // formData.append('files[]', fileList);
      upgradeCustomer(formData);
      console.log(actions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (countrySuccess && Array.isArray(countryList?.data) && countryList?.data?.length > 0) {
      const lands = countryList?.data?.map((country: Country) => ({
        label: country?.country_name,
        value: String(country?.country_id)
      }));

      setCountries(lands);
    }
  }, [countrySuccess, countryList]);

  useEffect(() => {
    console.log(userData?.data);
    if (userSuccess && getObjectLength(userData?.data) > 0) {
      setUser(userData?.data);
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    if (isError) {
      // @ts-ignore
      console.log('VALUES error', error?.data);
      Swal.fire({
        // @ts-ignore
        title: error?.data?.message,
        icon: 'error',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    } else if (isSuccess) {
      router.push('/critics/register/verification');
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Request Submitted',
      //   text: 'You will be notified within 24 hours',
      //   confirmButtonText: 'GO TO HOME',
      //   confirmButtonColor: '#FF6F61'
      // }).then((isConfirmed) => {
      //   if (isConfirmed) {
      //     router.push('/');
      //   }
      // });
    }
  }, [isError, error, isSuccess]);

  return (
    <section className="relative md:-mt-[150px] z-10">
      <UserUpgradeForm
        handleSignup={handleSignup}
        countries={countries}
        isLoading={isLoading}
        user={user}
        userType="Critic"
      />
    </section>
  );
};

export default CriticsRegisterForm;
