'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FormikHelpers } from 'formik';

// components
import UserUpgradeForm from '@/components/common/UserUpgradeForm';

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

const ArtistRegisterForm = () => {
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
      const userType = 'artist';
      const formData = new FormData();
      userPhoto && formData.append('user_photo', userPhoto);
      formData.append('first_name', values?.first_name);
      formData.append('last_name', values?.last_name);
      formData.append('mobile', values?.mobile);
      formData.append('email', values?.email);
      formData.append('user_type', userType);
      formData.append('artist_award', values?.award?.join(','));
      formData.append('experience', String(values?.experience));
      formData.append('organization', values?.organisation);
      formData.append('designation', values?.designation);
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
      upgradeCustomer(formData);
      console.log(actions, 'ARTISTS_FORM');
      actions?.setSubmitting(false);
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
    if (userSuccess && getObjectLength(userData?.data) > 0) {
      setUser(userData?.data);
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: 'error',
        // @ts-ignore
        title: error?.data?.message,
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    } else if (isSuccess && !isLoading) {
      router.push('/artists/register/verification');
    }
  }, [isError, error, isSuccess, router, isLoading]);

  return (
    <section className="relative md:-mt-[250px] z-10">
      <UserUpgradeForm
        handleSignup={handleSignup}
        isLoading={isLoading}
        countries={countries}
        user={user}
        userType="Artist"
      />
    </section>
  );
};

export default ArtistRegisterForm;
