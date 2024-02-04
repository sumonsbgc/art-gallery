'use client'; // This is a client component

import React, {
  Dispatch,
  SetStateAction
  // useState
  // useMemo
} from 'react';
// import dynamic from 'next/dynamic';
import Swal from 'sweetalert2';
import { Formik, Form } from 'formik';
// import { Descendant } from 'slate';

// components
import { Input, Loading } from '@/components/common';
import { Icon } from '@/components/ui';

// redux
import { useUpdateAboutMeMutation } from '@/redux/features/auth/authApi';

// utils
import { aboutProfileSchemaNew } from '@/utils/validations/auth';
import { STATUS } from '@/utils/constants';

// types
import { UserData } from '@/redux/features/auth/auth.types';

// styles
// import 'react-quill/dist/quill.snow.css';

type ProfileEditProps = {
  user: UserData;
  setUser: Dispatch<SetStateAction<UserData | null>>;
  enableView: () => void;
};

const AboutYouEdit = ({ user, enableView, setUser }: ProfileEditProps) => {
  // const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  const [updateAboutMe, { isLoading }] = useUpdateAboutMeMutation();
  // const [convertedText, setConvertedText] = useState(user?.about || '');
  // const [value, setValue] = useState<Descendant[]>([{ children: [{ text: 'hi' }] }]);

  const initValues = {
    about: user?.about || '',
    facebook_url: user?.facebook_url || '',
    twitter_url: user?.twitter_url || '',
    instagram_url: user?.instagram_url || '',
    gplus_url: user?.gplus_url || '',
    pinterest_url: user?.pinterest_url || ''
  };

  const socialLinks = [
    {
      icon: 'facebook',
      name: 'facebook_url',
      placeholder: 'Facebook URL'
    },
    {
      icon: 'twitter',
      name: 'twitter_url',
      placeholder: 'Twitter URL'
    },
    {
      icon: 'instagram',
      name: 'instagram_url',
      placeholder: 'Instagram URL'
    },
    {
      icon: 'youtube',
      name: 'gplus_url',
      placeholder: 'Youtube URL'
    }
    // {
    //   icon: 'medium',
    //   name: 'pinterest_url',
    //   placeholder: 'Medium URL'
    // }
  ];

  const submitHandler = async (values: typeof initValues) => {
    try {
      const formData = new FormData();

      formData.append('about', values?.about || '');
      // formData.append('about', convertedText || values?.about || '');
      formData.append('first_name', user?.first_name || '');
      formData.append('last_name', user?.last_name || '');
      formData.append('name', user?.name || '');
      formData.append('email', user?.email || '');
      formData.append('country', String(user?.country?.country_id || 0));

      // social links
      formData.append('facebook_url', values?.facebook_url || '');
      formData.append('twitter_url', values?.twitter_url || '');
      formData.append('instagram_url', values?.instagram_url || '');
      formData.append('gplus_url', values?.gplus_url || '');
      formData.append('pinterest_url', values?.pinterest_url || '');

      const res = await updateAboutMe(formData).unwrap();

      if (res?.status === STATUS.ERROR) {
        Swal.fire({
          icon: 'error',
          title: `${res?.message || 'Something Went Wrong!'}`,
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
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
        enableView();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !user) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl lg:px-2">
      <main className="w-full">
        <Formik
          initialValues={initValues}
          validationSchema={aboutProfileSchemaNew}
          onSubmit={(values) => submitHandler(values)}
        >
          {({ errors, values, isSubmitting, handleBlur, touched }) => (
            <Form>
              {/* Title and edit button */}
              <section className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-medium leading-normal text-black">About You</h1>

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
                    // disabled={isValidating || !aboutProfileSchemaNew.isValidSync(values)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Icon name="loading" /> : 'Save'}
                  </button>
                </div>
              </section>

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
                {values.about.length}/5000
              </p>

              {/* <ReactQuill
                theme="snow"
                placeholder="Write your about here..."
                value={convertedText}
                onChange={setConvertedText}
                style={{ minHeight: '300px' }}
              /> */}
              {/* <TextEditor value={value} onChange={(newValue) => setValue(newValue)} /> */}

              <section className="mt-12">
                <h1 className="text-2xl font-medium leading-normal text-black mb-4">
                  Social Media
                </h1>

                <div className="grid items-center lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-[50px] gap-y-4">
                  {socialLinks?.map((social) => (
                    <aside key={social?.name} className="flex items-center gap-4">
                      <span className="w-7">
                        <Icon name={social?.icon} color="orange" />
                      </span>
                      <Input
                        type="text"
                        id={social?.name}
                        label=""
                        name={social?.name}
                        placeholder={social?.placeholder}
                        // @ts-ignore
                        value={values?.[social?.name]}
                        onBlur={handleBlur}
                        // @ts-ignore
                        errorText={errors?.[social?.name]}
                        // @ts-ignore
                        error={touched?.[social?.name]}
                        labelClass="text-base font-normal leading-none text-black !text-opacity-75 !mb-3"
                        inputClass="flex-1 lg:max-w-[267px] !h-8 px-4 rounded-none border border-black !border-opacity-20 text-zinc-400 text-sm font-normal leading-[14px]"
                        containerClass="w-full h-8"
                      />
                    </aside>
                  ))}
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default AboutYouEdit;
