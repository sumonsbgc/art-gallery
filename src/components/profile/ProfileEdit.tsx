'use client'; // This is a client component

import { useState, ChangeEvent, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';

// components
import { Input, Loading } from '@/components/common';
import { Icon } from '@/components/ui';

// redux
import { useGetCountryListQuery, useUpdateProfileMutation } from '@/redux/features/auth/authApi';

// utils
import { changeProfileSchemaNew } from '@/utils/validations/auth';
import { STATUS } from '@/utils/constants';

// types
import { Country, ProfileInitialValue, UserData } from '@/redux/features/auth/auth.types';

type ProfileEditProps = {
  user: UserData;
  // eslint-disable-next-line no-unused-vars
  setUser: (user: UserData) => void;
  enableView: () => void;
};

const ProfileEdit = ({ user, enableView, setUser }: ProfileEditProps) => {
  const pathname = usePathname();
  const { data: countryList } = useGetCountryListQuery({});
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  //@ts-ignore
  const [file, setFile] = useState<File>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>('');

  const submitHandler = async (values: ProfileInitialValue) => {
    try {
      const formData = new FormData();

      if (file?.name) {
        formData.append('user_photo', file as File);
      }

      formData.append('name', `${values?.first_name} ${values?.first_name}`);
      formData.append('first_name', values?.first_name || '');
      formData.append('last_name', values?.last_name || '');
      formData.append('email', values?.email || '');
      formData.append('mobile', values?.mobile || '');
      formData.append('country', values?.country || '');
      formData.append('city', values?.city || '');
      formData.append('zip_code', values?.zip_code || '');
      formData.append('address', values?.address || '');
      formData.append('about', values?.about || '');

      const res = await updateProfile(formData).unwrap();

      if (res?.status === STATUS.ERROR) {
        Swal.fire({
          title: `${res?.message || 'Something Went Wrong!'}`,
          icon: 'error'
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Your Profile Has Been Updated Successfully',
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });

        setUser(res?.data?.data);
        // @ts-ignore
        setFile([]);
        setImagePreviewUrl(res?.data?.image_path);
        enableView();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const photoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    //@ts-ignore
    const file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result as string);
    };
    reader?.readAsDataURL(file);
  };

  useEffect(() => {
    if (user?.image_path && user?.image_path?.startsWith('http')) {
      setImagePreviewUrl(user?.image_path);
    }
  }, [user]);

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl lg:px-2">
      <main className="w-full">
        <Formik
          initialValues={{
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
            mobile: user?.mobile || '',
            zip_code: user?.zip_code || '',
            city: user?.city || '',
            address: user?.address || '',
            country: String(user?.country?.country_id) || '',
            about: user?.about || ''
          }}
          validationSchema={changeProfileSchemaNew}
          onSubmit={(values) => submitHandler(values)}
        >
          {({ errors, values, isSubmitting, handleBlur, touched }) => (
            <Form>
              {/* Title and edit button */}
              <section className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-medium leading-normal text-black">My Profile</h1>

                {/* action button */}
                <div className="w-[181px] h-8 justify-start items-start gap-[9px] inline-flex">
                  <button
                    type="button"
                    onClick={enableView}
                    className="w-[86px] h-8 relative bg-neutral-100 text-black text-sm font-normal"
                  >
                    Cancel
                  </button>
                  <button
                    className="w-[86px] h-8 relative bg-orange text-white text-sm font-normal cursor-pointer"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Icon name="loading" /> : 'Save'}
                  </button>
                </div>
              </section>

              {/* Profile image */}
              <section className="flex p-6 mb-6 border border-black border-opacity-25 rounded-lg">
                <div className="flex items-center mb-4 col-span-full">
                  <label
                    htmlFor="photo-upload"
                    className="relative w-32 h-32 mx-auto border border-gray-300 border-solid rounded-full group"
                  >
                    <div className="w-full h-full cursor-pointer absolute group-hover:flex items-center justify-center hidden bg-[#ed8383ab] px-1.5 py-1 rounded-full   z-20 left-0  top-0 bottom-0 right-0">
                      <Icon name="upload" color="white2" />
                    </div>
                    <div className="relative">
                      <Image
                        width={100}
                        height={100}
                        alt="avatar"
                        className="w-32 h-32 rounded-full"
                        src={imagePreviewUrl || '/assets/icons/user.svg'}
                      />
                    </div>
                    <input
                      id="photo-upload"
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={photoUpload}
                    />
                  </label>
                </div>
              </section>

              {/* Personal information */}
              <section className="p-6 mb-6 border border-black border-opacity-25 rounded-lg">
                <h2 className="text-black text-lg font-medium leading-[18px] mb-7">
                  Personal Information
                </h2>

                <div className="flex items-start justify-start flex-col sm:gap-5">
                  <aside className="flex gap-2 md:gap-10 lg:gap-[100px] flex-col md:flex-row">
                    <Input
                      type="text"
                      id="first_name"
                      label="First Name"
                      name="first_name"
                      placeholder="First Name"
                      value={values.first_name}
                      onBlur={handleBlur}
                      errorText={errors.first_name}
                      error={touched.first_name}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
                      isDefaultSpacing
                    />
                    <Input
                      type="text"
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      placeholder="Last Name"
                      value={values.last_name}
                      onBlur={handleBlur}
                      errorText={errors.last_name}
                      error={touched.last_name}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3.5 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
                      isDefaultSpacing
                    />
                  </aside>
                  <aside className="flex gap-2 md:gap-10 lg:gap-[100px] flex-col md:flex-row">
                    <Input
                      type="email"
                      id="email"
                      label="Email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onBlur={handleBlur}
                      errorText={errors.email}
                      error={touched.email}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3.5 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex"
                      disabled
                      isDefaultSpacing
                    />
                    <Input
                      type="text"
                      id="mobile"
                      label="Phone Number"
                      name="mobile"
                      placeholder="Phone Number"
                      value={String(values.mobile)}
                      onBlur={handleBlur}
                      errorText={errors.mobile}
                      error={touched.mobile}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3.5 rounded-none !disabled:bg-gray !disabled:opacity-75 border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex"
                      isDefaultSpacing
                    />
                  </aside>
                </div>
              </section>

              {/* About */}
              {pathname === '/dashboard/critic/account-settings' && (
                <section className="p-6 mb-6 border border-black border-opacity-25 rounded-lg">
                  <h2 className="text-black text-lg font-medium leading-[18px] mb-7">About</h2>

                  <Input
                    type="textarea"
                    // @ts-ignore
                    rows={5}
                    id="about"
                    label=""
                    name="about"
                    placeholder="Write your about here..."
                    value={String(values.about)}
                    onBlur={handleBlur}
                    errorText={errors.about}
                    error={touched.about}
                    labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                    inputClass="w-full !h-[300px] px-4 py-3.5 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
                  />
                  <p className="text-right text-zinc-500 text-sm font-normal">
                    {/* {convertedText.length}/5000 */}
                    {values.about.length}/5000
                  </p>
                </section>
              )}

              {/* Address */}
              <section className="p-6 mb-6 border border-black border-opacity-25 rounded-lg">
                <h2 className="text-black text-lg font-medium leading-[18px] mb-7">Address</h2>
                <div className="flex items-start justify-start flex-col gap-5">
                  <aside className="flex gap-2 md:gap-10 lg:gap-[100px] flex-col md:flex-row">
                    <Input
                      options={countryList?.data?.map((country: Country) => ({
                        label: country?.country_name,
                        value: String(country?.country_id)
                      }))}
                      type="select"
                      id="country"
                      label="Country"
                      name="country"
                      placeholder="Country"
                      value={values.country}
                      onBlur={handleBlur}
                      errorText={errors.country}
                      error={touched.country}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
                      isDefaultSpacing
                    />
                    <Input
                      type="text"
                      id="zip_code"
                      label="Postal Code"
                      name="zip_code"
                      placeholder="Postal Code"
                      value={String(values.zip_code)}
                      onBlur={handleBlur}
                      errorText={errors.zip_code}
                      error={touched.zip_code}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3.5 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
                      isDefaultSpacing
                    />
                  </aside>
                  <aside className="flex gap-2 md:gap-10 lg:gap-[100px] flex-col md:flex-row">
                    <Input
                      type="text"
                      id="city"
                      label="City/State"
                      name="city"
                      placeholder="City/State"
                      value={String(values.city)}
                      onBlur={handleBlur}
                      errorText={errors.city}
                      error={touched.city}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3.5 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
                      isDefaultSpacing
                    />
                    <Input
                      type="text"
                      id="address"
                      label="Address"
                      name="address"
                      placeholder="Address"
                      value={String(values.address)}
                      onBlur={handleBlur}
                      errorText={errors.address}
                      error={touched.address}
                      labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                      inputClass="!w-[280px] h-12 px-4 py-3.5 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
                      isDefaultSpacing
                    />
                  </aside>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default ProfileEdit;
