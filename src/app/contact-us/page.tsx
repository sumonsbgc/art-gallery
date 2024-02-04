/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import NewsLetter from '@/components/Sections/Home/NewsLetter';
import { Button, Input, SectionTitle, Text } from '@/components/common';
import Layout from '@/components/layout';
import Wrapper from '@/components/layout/Wrapper';
import { useStoreContactMutation } from '@/redux/features/contactus/contactApi';
import { ContactFormSchema } from '@/utils/validations/ContactFormSchema';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

export type ContactFormFields = {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  message: string;
};

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  mobile: '',
  message: ''
};

const ContactUs = () => {
  const [storeContact, { isError, isLoading, isSuccess, error }] = useStoreContactMutation();

  const handleSignup = (values: ContactFormFields, actions: any) => {
    try {
      console.log(values);
      const formData = new FormData();
      formData.append('f_name', values?.first_name);
      formData.append('l_name', values?.last_name);
      formData.append('email', values?.email);
      formData.append('phone', values?.mobile);
      formData.append('message_text', values?.message);
      storeContact(formData);
      actions.resetForm();
    } catch (err) {
      console.log('>>> Contact Form Error', err);
    }
  };

  useEffect(() => {
    console.log(error);
    if (isSuccess && !isError) {
      Swal.fire({
        icon: 'success',
        text: 'Your Information Has Been Saved Successfully',
        customClass: {
          confirmButton: '!bg-orange w-[140px]'
        }
      });
    }

    if (isError) {
      Swal.fire({
        icon: 'error',
        text: 'Ooops! Something Wrong. Please Try Again',
        customClass: {
          confirmButton: '!bg-orange w-[140px]'
        }
      });
    }
  }, [isSuccess, isError]);

  return (
    <Layout>
      <section className="w-full h-[165px] sm:h-[370px] contact-hero"></section>
      <section className="-mt-[60px] sm:-mt-[225px] z-10">
        <Wrapper>
          <div className="bg-white sm:w-3/4 w-full lg:p-[100px] md:p-[50px] sm:p-8 px-5 py-9 mx-auto shadow-md">
            <div className="w-full flex flex-col items-center mb-10">
              <SectionTitle content="Contact us" />
              <Text>Our Support Team will contact you shortly.</Text>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={ContactFormSchema}
              onSubmit={(values, actions) => handleSignup(values, actions)}
              enableReinitialize={true}
            >
              {({ values, errors, touched, handleBlur }) => (
                <Form className="flex flex-col md:gap-4 sm:gap-2 gap-2 justify-start items-start w-full">
                  <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
                    <Input
                      type="text"
                      id="first_name"
                      name="first_name"
                      placeholder="First Name"
                      value={values.first_name}
                      onBlur={handleBlur}
                      errorText={errors.first_name}
                      error={touched.first_name}
                      inputClass="rounded-none"
                      required
                    />
                    <Input
                      type="text"
                      id="last_name"
                      name="last_name"
                      placeholder="Last Name"
                      value={values.last_name}
                      onBlur={handleBlur}
                      errorText={errors.last_name}
                      error={touched.last_name}
                      inputClass="rounded-none"
                      required
                    />
                  </div>
                  <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={values.email}
                      onBlur={handleBlur}
                      errorText={errors.email}
                      error={touched.email}
                      inputClass="rounded-none"
                      required
                    />
                    <Input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      placeholder="Phone"
                      value={values.mobile}
                      onBlur={handleBlur}
                      errorText={errors.mobile}
                      error={touched.mobile}
                      inputClass="rounded-none"
                      required
                    />
                  </div>
                  <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
                    <Input
                      type="textarea"
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      value={values.message}
                      onBlur={handleBlur}
                      errorText={errors.message}
                      error={touched.message}
                      inputClass="rounded-none !h-[150px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-white font-bold"
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Wrapper>
      </section>
      <NewsLetter newsLetterForm />
    </Layout>
  );
};

export default ContactUs;
