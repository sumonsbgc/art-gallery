'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import Swal from 'sweetalert2';

// components
import { Icon, Modal } from '@/components/ui';
import { Input } from '@/components/common';

// redux
import { useAppDispatch } from '@/redux/hooks';
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} from '@/redux/features/auth/authApi';

import { closeAuthModal } from '@/redux/features/auth/authSlice';

// data
import { authTabs } from '@/data/auth';

// types
import { Tab, TabValue } from '@/types/auth.type';

// utils
import { STATUS } from '@/utils/constants';
import { signInSchema, signUpSchema, forgotSchema, resetSchema } from '@/utils/validations/auth';

const signUpInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const signInInitialValues = {
  email: '',
  password: ''
};

const forgotInitialValues = {
  email: ''
};

const resetInitialValues = {
  email: '',
  pin: '',
  password: '',
  confirmPassword: ''
};

type AuthModalProps = {
  open: boolean;
  onClose(): void;
};

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();
  const [activeTab, setActiveTab] = useState<TabValue>('signup');
  const [message, setMessage] = useState('');

  const handleSignup = async (values: typeof signUpInitialValues, actions: any) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } = values;
      const name = `${firstName} ${lastName}`;
      const username = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.floor(
        Math.random() * 100000000
      )}`.replace(/\s/g, '');
      const userType = 'customer';

      const formData = new FormData();

      formData.append('name', name || '');
      formData.append('first_name', firstName || '');
      formData.append('last_name', lastName || '');
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('password_confirmation', confirmPassword);
      formData.append('user_type', userType);

      const res = await register(formData).unwrap();

      if (res?.status === STATUS.ERROR) {
        Swal.fire({
          title: `${res?.message || res?.data?.message || 'Something Went Wrong!'}`,
          icon: 'error',
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });
      } else {
        actions.resetForm();
        onClose();
      }
    } catch (error: any) {
      if (error && error?.status === 400) {
        actions.setErrors({
          email: error?.data?.message
        });
      }
    }
  };

  const handleSignin = async (values: typeof signInInitialValues, actions: any) => {
    try {
      const { email, password } = values;

      const formData = new FormData();

      formData.append('email', email);
      formData.append('password', password);

      const res = await login(formData).unwrap();

      if (res?.status === STATUS.ERROR) {
        Swal.fire({
          title: `${res?.message || 'Something Went Wrong!'}`,
          icon: 'error',
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });
      } else {
        actions.resetForm();
        onClose();
        if (res?.data?.user_type === 'artist') {
          router.push('/dashboard/artist');
        } else if (res?.data?.user_type === 'critic') {
          router.push('/dashboard/critics-review');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgot = async (values: typeof forgotInitialValues, actions: any) => {
    try {
      const { email } = values;

      const formData = new FormData();
      formData.append('email', email);

      const res = await forgotPassword(formData).unwrap();

      if (res?.status === STATUS.ERROR) {
        Swal.fire({
          title: `${res?.message || 'Something Went Wrong!'}`,
          icon: 'error',
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });
      } else {
        resetInitialValues.email = email;
        setActiveTab('pin');
        setMessage(res?.message);
        actions.resetForm();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = async (values: typeof resetInitialValues, actions: any) => {
    try {
      const { email, pin, password, confirmPassword } = values;

      const formData = new FormData();
      formData.append('email', email);
      formData.append('pin', pin);
      formData.append('password', password);
      formData.append('password_confirmation', confirmPassword);

      const res = await resetPassword(formData).unwrap();

      console.log('reset Password res', res);

      if (res?.status === STATUS.ERROR) {
        Swal.fire({
          title: `${res?.message || 'Something Went Wrong!'}`,
          icon: 'error',
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });
      } else {
        actions.resetForm();
        Swal.fire({
          title: `${res?.message || 'Password Reset Successfully!'}`,
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            setActiveTab('signin');
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
    dispatch(closeAuthModal());
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="w-full xs:w-[366px] flex-col justify-center items-center gap-8 flex">
        {/* tab */}
        {activeTab === 'signup' || activeTab === 'signin' ? (
          <section className="rounded-[9.68px] w-full inline-flex">
            {authTabs.map((tab: Tab) => (
              <button
                key={tab.value}
                className={`h-[45.15px] w-1/2 ${
                  activeTab === tab.value
                    ? 'bg-black text-white'
                    : 'bg-gray2 bg-opacity-25 text-black'
                } justify-center items-center flex text-center text-base font-normal capitalize`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.name}
              </button>
            ))}
          </section>
        ) : (
          <></>
        )}

        <div className="flex-col justify-center items-center gap-3 flex w-full">
          {activeTab === 'signup' || activeTab === 'signin' ? (
            <>
              {/* title */}
              <h2 className="text-center text-black text-xl font-medium capitalize">Sign up</h2>
              {/* facebook login button */}
              <button className="w-full h-[50px] bg-white border border-stone-300 justify-center items-center gap-3 inline-flex">
                <Icon name="facebook-color" size="25.8" />
                <p className="text-center text-black text-sm font-normal">Sign up with Facebook</p>
              </button>

              {/* google login button */}
              <button className="w-full h-[50px] bg-white border border-stone-300 justify-center items-center gap-[12.90px] inline-flex">
                <Icon name="google-color" size="25.8" />
                <p className="text-center text-black text-sm font-normal">Sign up with Google</p>
              </button>

              <section className="w-full justify-start items-center gap-[18.54px] inline-flex">
                <div className="grow shrink basis-0 h-[1.6px] bg-stone-500 bg-opacity-25" />
                <div className="text-stone-500 text-sm font-normal">OR</div>
                <div className="grow shrink basis-0 h-[1.6px] bg-stone-500 bg-opacity-25" />
              </section>
            </>
          ) : (
            <></>
          )}

          {activeTab === 'forgot' && (
            <>
              {/* title */}
              <h2 className="text-center text-black text-xl font-medium capitalize">
                Forgot Password?
              </h2>
              <p className="text-center text-black text-sm font-normal">
                Enter Your Registered Email To Reset Your Password
              </p>
            </>
          )}

          {activeTab === 'reset' && (
            <>
              {/* title */}
              <h2 className="text-center text-black text-xl font-medium capitalize">
                Reset Your Password?
              </h2>
              <p className="text-center text-black text-sm font-normal">Enter New Password</p>
            </>
          )}

          {activeTab === 'pin' && (
            <>
              {/* title */}
              <h2 className="text-center text-black text-xl font-medium capitalize">
                Verification
              </h2>
              <p className="text-center text-black text-sm font-normal">Enter Verification Code</p>
              {message && <p className="text-center text-black text-sm font-normal">{message}</p>}
            </>
          )}

          <Formik
            // initialValues={activeTab === 'signup' ? signUpInitialValues : signInInitialValues}
            initialValues={
              activeTab === 'signup'
                ? signUpInitialValues
                : activeTab === 'signin'
                ? signInInitialValues
                : activeTab === 'forgot'
                ? forgotInitialValues
                : resetInitialValues
            }
            validationSchema={
              activeTab === 'signup'
                ? signUpSchema
                : activeTab === 'signin'
                ? signInSchema
                : activeTab === 'forgot'
                ? forgotSchema
                : resetSchema
            }
            onSubmit={(values, actions) =>
              activeTab === 'signup'
                ? //@ts-ignore
                  handleSignup(values, actions)
                : //@ts-ignore
                activeTab === 'signin'
                ? //@ts-ignore
                  handleSignin(values, actions)
                : //@ts-ignore
                activeTab === 'forgot'
                ? handleForgot(values, actions)
                : //@ts-ignore
                  handleReset(values, actions)
            }
            enableReinitialize={true}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form className="flex-col justify-start items-start gap-2 flex w-full">
                <div className="w-full">
                  {
                    //@ts-ignore
                    errors?.email && (
                      <p
                        className="text-center text-red text-sm font-normal cursor-pointer"
                        // onClick={() => setActiveTab('forgot')}
                      >
                        Please try again
                      </p>
                    )
                  }
                </div>

                {activeTab === 'signup' && (
                  <section className="justify-start items-start gap-3 inline-flex w-full">
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      label="First name"
                      placeholder="Enter your first name"
                      //@ts-ignore
                      value={values.firstName}
                      onBlur={handleBlur}
                      //@ts-ignore
                      errorText={errors.firstName}
                      //@ts-ignore
                      error={touched.firstName}
                    />
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      placeholder="Enter your last name"
                      //@ts-ignore
                      value={values.lastName}
                      onBlur={handleBlur}
                      //@ts-ignore
                      errorText={errors.lastName}
                      //@ts-ignore
                      error={touched.lastName}
                    />
                  </section>
                )}

                {activeTab === 'signup' || activeTab === 'signin' || activeTab === 'forgot' ? (
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={values.email}
                    onBlur={handleBlur}
                    errorText={errors.email}
                    error={touched.email}
                  />
                ) : // {}
                null}

                {activeTab === 'signup' || activeTab === 'signin' || activeTab === 'reset' ? (
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    //@ts-ignore
                    value={values.password}
                    onBlur={handleBlur}
                    //@ts-ignore
                    errorText={errors.password}
                    //@ts-ignore
                    error={touched.password}
                  />
                ) : null}

                {activeTab === 'signup' || activeTab === 'reset' ? (
                  <Input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm password"
                    placeholder="Confirm your password"
                    //@ts-ignore
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    //@ts-ignore
                    errorText={errors.confirmPassword}
                    //@ts-ignore
                    error={touched.confirmPassword}
                  />
                ) : null}

                {activeTab === 'pin' && (
                  <div className="w-full">
                    <div className="w-full">
                      <label className="block text-stone-500 text-sm font-normal capitalize w-full pb-[1.77px]">
                        Verification Code <span className="text-red">*</span>
                      </label>
                    </div>
                    <div className="w-full">
                      <input
                        type="text"
                        id="pin"
                        name="pin"
                        placeholder="Enter Verification Code"
                        //@ts-ignore
                        value={values?.pin}
                        onBlur={handleBlur}
                        // onChange={handleChange}
                        onChange={(e) => {
                          handleChange(e);
                          e.target.value.length === 4 ? setActiveTab('reset') : null;
                        }}
                        required={true}
                        className="w-full h-[45.15px] relative border border-stone-500 border-opacity-30 bg-transparent px-2 text-stone-500 text-base font-normal rounded focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-transparent transition-all"
                      />
                      {
                        //@ts-ignore
                        touched?.pin && errors?.pin && (
                          <span className="text-red text-sm font-normal">
                            {
                              //@ts-ignore
                              errors?.pin
                            }
                          </span>
                        )
                      }
                    </div>
                  </div>
                )}

                {activeTab === 'signin' && (
                  <div className="w-full mt-1 mb-1 flex justify-end">
                    <span
                      className="text-orange text-sm font-normal underline cursor-pointer"
                      onClick={() => setActiveTab('forgot')}
                    >
                      Forgot Password?
                    </span>
                  </div>
                )}

                {activeTab === 'signin' || activeTab === 'signup' ? (
                  <button
                    type="submit"
                    disabled={activeTab === 'signup' ? isLoading : isLoginLoading}
                    className="w-full h-[50px] py-3 bg-orange justify-center items-center flex text-center text-white text-lg font-medium capitalize"
                  >
                    {activeTab === 'signup'
                      ? isLoading
                        ? 'Signing up...'
                        : 'Sign up'
                      : isLoginLoading
                      ? 'Signing in...'
                      : 'Sign in'}
                  </button>
                ) : (
                  <>
                    {activeTab === 'forgot' || activeTab === 'reset' ? (
                      <>
                        <button
                          type="submit"
                          disabled={activeTab === 'forgot' ? isForgotLoading : isResetLoading}
                          className="w-full h-[50px] py-3 bg-orange justify-center items-center flex text-center text-white text-lg font-medium capitalize"
                        >
                          {isForgotLoading || isResetLoading ? 'Submitting...' : 'Submit'}
                        </button>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </Form>
            )}
          </Formik>

          <p className="text-center text-black text-base font-normal">
            {activeTab === 'signin' || activeTab === 'forgot'
              ? 'Already have an account? '
              : 'Don’t have any account? '}
            <span
              className="text-center text-orange text-base font-medium underline cursor-pointer"
              onClick={() =>
                setActiveTab((prev) =>
                  prev === 'signup' || prev === 'forgot' ? 'signin' : 'signup'
                )
              }
            >
              {activeTab === 'signup' || activeTab === 'forgot' ? 'Sign in' : 'Sign up'}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
