/* eslint-disable no-unused-vars */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Form, Formik, FormikHelpers } from 'formik';

// components
import { Button, Input, Title } from '@/components/common';
import { Icon } from '@/components/ui';
import FormikMultiSelect from './Form/FormikMultiSelect';

// redux
import { Country, UserData } from '@/redux/features/auth/auth.types';
import { useGetCountryListQuery } from '@/redux/features/auth/authApi';

// types
import { OptionType } from '@/types/artUpload.type';
import { IUserUpgradeType } from '@/types/upgradeCustomer';

// utils
import { UpgradeCustomerSchema } from '@/utils/validations/UpgradeCustomer';

type UserUpgradePropType = {
  handleSignup: (
    values: IUserUpgradeType,
    fileList: File[],
    userPhoto?: File,
    actions?: FormikHelpers<IUserUpgradeType>
  ) => void;
  isLoading: boolean;
  countries: OptionType[];
  user: UserData;
  userType: string;
};

const UserUpgradeForm = ({
  handleSignup,
  isLoading,
  countries,
  user,
  userType
}: UserUpgradePropType) => {
  const [imgPreview, setImgPreview] = useState<string>('');
  const [fileList, setFileList] = useState<File[]>([]);
  const [userPhoto, setUserPhoto] = useState<File>();
  const [fileNames, setFileNames] = useState<string[]>([]);

  const onFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, 'FILE');
    if (file) {
      setFileNames([...fileNames, file?.name]);
      setFileList([...fileList, file]);
    }
  };

  const onFileDrop = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFieldValue('user_photo', file);
      setUserPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFileRemove = (ind: number) => {
    const files = [...fileList];
    const names = [...fileNames];
    files.splice(ind, 1);
    names.splice(ind, 1);
    setFileList(files);
    setFileNames(names);
  };

  return (
    <div className="artist-register-card max-w-[700px] w-[97%] mx-auto min-h-fit bg-white md:py-[50px] md:px-[60px] sm:py-9 sm:px-9 px-5 py-6">
      <Formik
        initialValues={{
          user_photo: user?.image_path || '',
          first_name: user?.first_name || '',
          last_name: user?.last_name || '',
          email: user?.email || '',
          mobile: '',
          organisation: '',
          designation: '',
          experience: '',
          award: [],
          country: '',
          zip_code: '',
          city: '',
          address: '',
          about: '',
          website: '',
          fb_url: '',
          twitter_url: '',
          insta_url: '',
          youtube_url: ''
        }}
        validationSchema={UpgradeCustomerSchema}
        onSubmit={(values, actions: FormikHelpers<IUserUpgradeType>) =>
          handleSignup(values, fileList, userPhoto, actions)
        }
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleBlur, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col md:gap-4 sm:gap-2 gap-2 justify-start items-start w-full">
            <div className="flex w-full justify-center">
              <div className="flex items-center mb-4 col-span-full flex-col text-black">
                <Title content="Upload Your Photo" className="text-sm italic font-medium mb-3" />
                <label
                  htmlFor="photo-upload"
                  className="relative w-28 h-28 mx-auto border border-gray-300 border-none rounded-full group"
                >
                  <div className="w-full h-full cursor-pointer absolute group-hover:flex items-center justify-center hidden bg-black/50 px-1.5 py-1 rounded-full   z-20 left-0  top-0 bottom-0 right-0">
                    <Icon name="camera" color="white" size="30" />
                  </div>
                  <div className="relative">
                    <Image
                      width={112}
                      height={112}
                      alt="avatar"
                      className="w-28 h-28 rounded-full"
                      src={
                        (imgPreview && String(imgPreview)) ||
                        values?.user_photo ||
                        '/assets/icons/upload.png'
                      }
                    />
                  </div>
                  <input
                    id="photo-upload"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileDrop(e, setFieldValue)}
                    name="user_photo"
                    // disabled={values?.user_photo !== ''}
                    // required
                  />
                </label>
                {errors.user_photo && (
                  <span className="text-red text-sm font-normal">{errors.user_photo}</span>
                )}
              </div>
            </div>
            <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
              <Input
                type="text"
                id="first_name"
                name="first_name"
                label="*First name"
                placeholder="Enter your first name"
                value={values.first_name}
                onBlur={handleBlur}
                errorText={errors.first_name}
                error={touched.first_name}
                inputClass="rounded-none"
                disabled={values.first_name !== ''}
              />
              <Input
                type="text"
                id="last_name"
                name="last_name"
                label="*Last name"
                placeholder="Enter your last name"
                value={values.last_name}
                onBlur={handleBlur}
                errorText={errors.last_name}
                error={touched.last_name}
                inputClass="rounded-none"
                disabled={values.last_name !== ''}
              />
            </div>
            <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
              <Input
                type="email"
                id="email"
                name="email"
                label="*Email"
                placeholder="Enter your Email"
                value={values.email}
                onBlur={handleBlur}
                errorText={errors.email}
                error={touched.email}
                inputClass="rounded-none"
                disabled={values.email !== ''}
              />
              <Input
                type="tel"
                id="mobile"
                name="mobile"
                label="*Phone"
                placeholder="Phone"
                value={values.mobile}
                onBlur={handleBlur}
                errorText={errors.mobile}
                error={touched.mobile}
                inputClass="rounded-none"
              />
            </div>
            <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
              <Input
                type="text"
                id="organisation"
                name="organisation"
                label="*Organization"
                placeholder="Organization"
                value={values.organisation}
                onBlur={handleBlur}
                errorText={errors.organisation}
                error={touched.organisation}
                inputClass="rounded-none"
              />
              <Input
                type="text"
                id="designation"
                name="designation"
                label="*Designation"
                placeholder="Designation"
                value={values.designation}
                onBlur={handleBlur}
                errorText={errors.designation}
                error={touched.designation}
                inputClass="rounded-none"
              />
            </div>
            <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
              <Input
                type="number"
                id="experience"
                name="experience"
                label="*Experience (in years)"
                placeholder="Select Experience"
                value={values.experience}
                onBlur={handleBlur}
                errorText={errors.experience}
                error={touched.experience}
                inputClass="rounded-none"
              />
              <FormikMultiSelect label="Award" name="award" options={[]} />
            </div>
            <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
              <Input
                type="select"
                id="country"
                name="country"
                label="*Country"
                placeholder="Select Country"
                value={values.country}
                onBlur={handleBlur}
                errorText={errors.country}
                error={touched.country}
                options={countries}
                inputClass="rounded-none"
              />
              <Input
                type="text"
                id="zip_code"
                name="zip_code"
                label="*Zip Code"
                placeholder="Enter Zip Code"
                value={values.zip_code}
                onBlur={handleBlur}
                errorText={errors.zip_code}
                error={touched.zip_code}
                inputClass="rounded-none"
              />
            </div>
            <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
              <Input
                type="text"
                id="city"
                name="city"
                label="*State"
                placeholder="State"
                value={values.city}
                onBlur={handleBlur}
                errorText={errors.city}
                error={touched.city}
                inputClass="rounded-none"
              />
              <Input
                type="text"
                id="address"
                name="address"
                label="*Address"
                placeholder="*Address"
                value={values.address}
                onBlur={handleBlur}
                errorText={errors.address}
                error={touched.address}
                inputClass="rounded-none"
              />
            </div>

            <section className="w-full">
              <Input
                type="textarea"
                // @ts-ignore
                rows={4}
                id="about"
                label="*About"
                name="about"
                placeholder="Write your about here..."
                value={String(values.about)}
                onBlur={handleBlur}
                errorText={errors.about}
                error={touched.about}
                labelClass="block text-stone-500 text-sm font-normal capitalize w-full pb-[1.77px]"
                inputClass="w-full !h-[250px] px-4 py-3.5 rounded-none border border-black !border-opacity-20 flex-col justify-start items-start gap-2.5 flex !bg-transparent"
              />
              <p className="text-right text-zinc-500 text-sm font-normal">
                {values.about.length}/5000
              </p>
            </section>

            <div className="flex flex-col w-full bg-gray3 px-[18px] py-[12px] gap-4">
              <Title content="Social Media" />
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-3 items-center">
                  <div className="w-[28px] flex justify-center">
                    <Icon name="facebook" size="24" color="orange" />
                  </div>
                  <Input
                    type="url"
                    id="fb_url"
                    name="fb_url"
                    label=""
                    placeholder="https://facebook.com/"
                    value={values.fb_url}
                    onBlur={handleBlur}
                    errorText={errors.fb_url}
                    error={touched.fb_url}
                    inputClass="rounded-none max-h-8"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-[28px] flex justify-center">
                    <Icon name="twitter" size="24" color="orange" />
                  </div>
                  <Input
                    type="url"
                    id="twitter_url"
                    name="twitter_url"
                    label=""
                    placeholder="https://twitter.com/"
                    value={values.twitter_url}
                    onBlur={handleBlur}
                    errorText={errors.twitter_url}
                    error={touched.twitter_url}
                    inputClass="rounded-none max-h-8"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-[28px] flex justify-center">
                    <Icon name="instagram" size="24" color="orange" />
                  </div>
                  <Input
                    type="url"
                    id="insta_url"
                    name="insta_url"
                    label=""
                    placeholder="https://instagram.com/"
                    value={values.insta_url}
                    onBlur={handleBlur}
                    errorText={errors.insta_url}
                    error={touched.insta_url}
                    inputClass="rounded-none max-h-8"
                  />
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-[28px] flex justify-center">
                    <Icon name="youtube" size="24" color="orange" />
                  </div>
                  <Input
                    type="url"
                    id="youtube_url"
                    name="youtube_url"
                    label=""
                    placeholder="https://youtube.com/"
                    value={values.youtube_url}
                    onBlur={handleBlur}
                    errorText={errors.youtube_url}
                    error={touched.youtube_url}
                    inputClass="rounded-none max-h-8"
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
              <Input
                type="url"
                id="website"
                name="website"
                label="*Portfolio Link"
                placeholder="https://porfolio.link"
                value={values.website}
                onBlur={handleBlur}
                errorText={errors.website}
                error={touched.website}
                inputClass="rounded-none"
              />
            </div>
            <div className="flex w-full justify-center">OR</div>
            <div className="flex w-full border-dashed border border-[#BFB9B9] py-6 justify-center items-center">
              <div className="flex flex-col items-center gap-4 relative">
                <label htmlFor="files_upload">
                  <Icon name="upload" />
                </label>
                <label className="!bg-black !text-white !text-sm px-8 py-3" htmlFor="files_upload">
                  Upload Your Portfolio/Resume, Awards & Certificates
                </label>
                <input
                  type="file"
                  className="opacity-0 absolute"
                  name="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFileHandler(e)}
                  id="files_upload"
                  multiple
                />
                {fileNames &&
                  Array.isArray(fileNames) &&
                  fileNames?.length > 0 &&
                  fileNames?.map((file: string, ind: number) => (
                    <div className="flex items-center justify-between w-full px-4" key={ind}>
                      <p className="fileName flex gap-1 items-center text-blue-500 text-sm">
                        <Icon name="clip" /> {file}
                      </p>
                      <Icon name="delete-2" handleClick={() => onFileRemove(ind)} />
                    </div>
                  ))}
              </div>
            </div>
            <Button
              type="submit"
              className="!text-white mx-auto mt-5"
              disabled={isLoading || isSubmitting}
            >
              {isLoading || isSubmitting ? 'Applying' : 'Apply'}{' '}
              {userType === 'Artist' ? `as an ${userType}` : `as a ${userType}`}
            </Button>
            <p className="text-center text-black text-sm w-full">
              <Link href="/terms-of-service" className="text-orange underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="text-orange underline">
                Privacy Policy
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserUpgradeForm;
