/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';

// components
import InputText from '@/components/checkout/InputText';
import InputCheckBox from '@/components/checkout/InputCheckBox';
import InputSelect from '@/components/checkout/InputSelect';
import Icon from '@/components/ui/Icon';
import { PaymentSuccessfulModal } from '@/components/common/Modals';

// redux
import {
  useConfirmPaymentMutation,
  useApplyCouponMutation,
  useLazyRemoveCouponQuery
} from '@/redux/features/payment/paymentApi';
import { useGetCountryListQuery } from '@/redux/features/auth/authApi';
import { removeAllCart, setCoupon } from '@/redux/features/carts/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getCouponData } from '@/redux/selector/cart.selector';
import { setPaypalToken } from '@/redux/slices/siteSlice';

// config
import { BaseUrl, API_URL, PAYPAL_CLIENT_ID } from '@/config';

// utils
import { getUserSessionId } from '@/utils';

// types
import { Country } from '@/redux/features/auth/auth.types';
import { CheckoutFormProp } from './type';
import { RootState } from '@/redux/store';
import { getUserInfo } from '@/redux/selector/auth.selector';

const ConfirmPaymentSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zip_code: Yup.string().required('Zip Code is required'),
  phone: Yup.string().required('Phone is required'),
  email: Yup.string().required('Email is required'),

  //@ts-nocheck
  // shipping_address: Yup.boolean(),

  bill_f_name: Yup.string().required('First name is required'),
  bill_l_name: Yup.string().required('Last name is required'),
  bill_address: Yup.string().required('Address is required'),
  bill_country: Yup.string().required('Country is required'),
  bill_city: Yup.string().required('City is required'),
  bill_state: Yup.string().required('State is required'),
  bill_zip_code: Yup.string().required('Zip Code is required'),
  bill_phone: Yup.string().required('Phone is required'),
  bill_email: Yup.string().required('Email is required'),

  payment_method: Yup.string().required('Payment Method is required'),
  terms: Yup.boolean().oneOf([true], 'Terms is required')
});

const confirm_payment = {
  firstName: '',
  lastName: '',
  address: '',
  country: '',
  city: '',
  state: '',
  zip_code: '',
  phone: '',
  email: '',
  bill_f_name: '',
  bill_l_name: '',
  bill_address: '',
  bill_country: '',
  bill_city: '',
  bill_state: '',
  bill_zip_code: '',
  bill_phone: '',
  bill_email: '',
  coupon_code: '',
  payment_method: 'stripe',
  shipping_address: true,
  terms: false,
  session_id: '',
  processing_fee: '',
  vat_price: '',
  total_price: '',
  token: ''
};

// This values are the props in the UI
const style = {
  layout: 'vertical',
  label: 'paypal',
  size: 'small',
  height: 48,
  tagline: 'false',
  borderRadius: 10
};

const CheckoutForm = ({ totalAmount, setCouponAmount }: CheckoutFormProp) => {
  const dispatch = useAppDispatch();
  const buttonRef = useRef(null);
  // const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponData = getCouponData();
  const [confirmPayment, { isLoading, isSuccess, isError }] = useConfirmPaymentMutation();
  const [applyCoupon] = useApplyCouponMutation();
  const [removeCoupon] = useLazyRemoveCouponQuery();
  const user = getUserInfo();
  // const { data, refetch } = useGetProfileQuery(
  //   {},
  //   { refetchOnMountOrArgChange: true, refetchOnFocus: true }
  // );
  // const _user = data?.data;
  // const [user, setUser] = useState<UserData | null>(_user);
  const { data: countryList } = useGetCountryListQuery({});

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [openPaymentSuccessful, setOpenPaymentSuccessful] = useState<boolean>(false);
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [isCouponInvalid, setIsCouponInvalid] = useState<boolean>(false);
  const paypalToken = useAppSelector((state: RootState) => state.utils.paypalToken);

  const handleApplyCoupon = async (couponCode: string) => {
    try {
      if (couponCode) {
        const formData = new FormData();
        formData.append('coupon_code', couponCode);

        const couponApplyRes: any = await applyCoupon(formData);
        const { data } = couponApplyRes;

        if (data?.status === 'success') {
          setCouponAmount(data?.total_discount || 0);
          setCouponApplied(true);
          dispatch(setCoupon({ couponCode, couponAmount: data?.total_discount }));
        } else {
          setIsCouponInvalid(true);
          Swal.fire({
            title: 'Error',
            text: 'Ooops! Coupon Code Is Invalid',
            customClass: {
              htmlContainer: 'font-medium text-sm text-gray',
              confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
            }
          });
        }
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const couponRemoveRes: any = await removeCoupon({});
      const { data } = couponRemoveRes;

      if (data?.status === 'success') {
        setCouponAmount(0);
        setCouponApplied(false);
        dispatch(setCoupon({ couponCode: '', couponAmount: 0 }));
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // useEffect(() => {
  //   refetch();
  // }, []);

  // useEffect(() => {
  //   if (!user) {
  //     setUser(_user);
  //   }
  // }, [_user, user]);

  const handleSubmit = async (values: typeof confirm_payment) => {
    try {
      const {
        firstName,
        lastName,
        address,
        country,
        city,
        state,
        zip_code,
        phone,
        email,
        bill_f_name,
        bill_l_name,
        bill_address,
        bill_country,
        bill_city,
        bill_state,
        bill_zip_code,
        bill_phone,
        bill_email,
        coupon_code,
        payment_method,
        shipping_address,
        terms
      } = values;

      if (payment_method === 'stripe') {
        if (!stripe || !elements) {
          return;
        }

        if (error) {
          //@ts-ignore
          // elements.getElement('card').focus();

          Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: error,
            customClass: {
              htmlContainer: 'font-medium text-sm text-gray',
              confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
            }
          });
          return;
        }

        const cardElement = elements.getElement(CardNumberElement);
        setProcessing(true);
        //@ts-ignore
        await stripe.createToken(cardElement).then(async function (result) {
          console.log('Again');
          if (result?.token?.id) {
            const formData = new FormData();
            formData.append('order_firstname', firstName);
            formData.append('order_lastname', lastName);
            formData.append('address', address);
            formData.append('order_country', country);
            formData.append('order_city', city);
            formData.append('state', state);
            formData.append('order_zipcode', zip_code);
            formData.append('contact', phone);
            formData.append('order_email', email);
            formData.append('coupon_code', coupon_code);
            formData.append('payment_method', payment_method);
            //@ts-ignore
            formData.append('order_address', shipping_address);

            formData.append('bill_f_name', shipping_address ? firstName : bill_f_name);
            formData.append('bill_l_name', shipping_address ? lastName : bill_l_name);
            formData.append('bill_address', shipping_address ? address : bill_address);
            formData.append('bill_country', shipping_address ? country : bill_country);
            formData.append('bill_city', shipping_address ? city : bill_city);
            formData.append('bill_state', shipping_address ? state : bill_state);
            formData.append('bill_zip_code', shipping_address ? zip_code : bill_zip_code);
            formData.append('bill_phone', shipping_address ? phone : bill_phone);
            formData.append('bill_email', shipping_address ? email : bill_email);

            //@ts-ignore
            formData.append('terms', terms);
            //@ts-ignore
            formData.append('session_id', getUserSessionId());
            //@ts-ignore
            formData.append('processing_fee', 0);
            //@ts-ignore
            formData.append('vat_price', 0);
            //@ts-ignore
            formData.append('total_price', totalAmount);
            //@ts-ignore
            formData.append('token', result?.token?.id);
            confirmPayment(formData);
          } else {
            setProcessing(false);
            if (result.error) {
              Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: result?.error?.message,
                customClass: {
                  htmlContainer: 'font-medium text-sm text-gray',
                  confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
                }
              });
            }
          }
        });
      } else if (payment_method === 'paypal') {
        console.log('payment method', payment_method);
        console.log('payment values', values);
        console.log('payment paypalToken', paypalToken);

        const formData = new FormData();
        formData.append('order_firstname', firstName);
        formData.append('order_lastname', lastName);
        formData.append('address', address);
        formData.append('order_country', country);
        formData.append('order_city', city);
        formData.append('state', state);
        formData.append('order_zipcode', zip_code);
        formData.append('contact', phone);
        formData.append('order_email', email);
        formData.append('coupon_code', coupon_code);
        formData.append('payment_method', payment_method);
        //@ts-ignore
        formData.append('order_address', shipping_address);

        formData.append('bill_f_name', shipping_address ? firstName : bill_f_name);
        formData.append('bill_l_name', shipping_address ? lastName : bill_l_name);
        formData.append('bill_address', shipping_address ? address : bill_address);
        formData.append('bill_country', shipping_address ? country : bill_country);
        formData.append('bill_city', shipping_address ? city : bill_city);
        formData.append('bill_state', shipping_address ? state : bill_state);
        formData.append('bill_zip_code', shipping_address ? zip_code : bill_zip_code);
        formData.append('bill_phone', shipping_address ? phone : bill_phone);
        formData.append('bill_email', shipping_address ? email : bill_email);

        //@ts-ignore
        formData.append('terms', terms);
        //@ts-ignore
        formData.append('session_id', getUserSessionId());
        //@ts-ignore
        formData.append('processing_fee', 0);
        //@ts-ignore
        formData.append('vat_price', 0);
        //@ts-ignore
        formData.append('total_price', totalAmount);
        //@ts-ignore
        formData.append('token', paypalToken);

        confirmPayment(formData);
      }
    } catch (err) {
      console.log('Error >>', err);
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      setProcessing(false);
      setOpenPaymentSuccessful(true);
      dispatch(removeAllCart());
      setCouponAmount(0);
      setCouponApplied(false);
      localStorage.removeItem('carts');
    }

    if (isError) {
      setProcessing(false);
      Swal.fire({
        icon: 'error',
        title: 'Payment Unsuccessful!',
        text: 'Please Try Making The Payment Again',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isSuccess, isError]);

  const cardStyle = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '35px',
        fontWeight: '400',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '14px',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: '#CFD7E0'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  const cardHandleChange = (event: { error: any }) => {
    const { error } = event;
    setError(error ? error.message : '');
  };

  useEffect(() => {
    if (couponData?.couponAmount) {
      setCouponApplied(true);
      setCouponAmount(couponData?.couponAmount);
    }
  }, [couponData?.couponCode]);

  const createOrder = () => {
    return fetch(`${API_URL}/paypal/payment?total_amount=${totalAmount}`)
      .then((response) => response.json())
      .then((order) => {
        return order.data.id;
      });
  };

  const onApprove = (data: { orderID: any }) => {
    return fetch(`${API_URL}/paypal/success?token=${data.orderID}`)
      .then((response) => response.json())
      .then((orderData) => {
        console.log('payment capture result', orderData);
        if (orderData.status == 'success') {
          dispatch(setPaypalToken(orderData.token));
          // @ts-ignore
          buttonRef.current.click();
        }
      });
  };

  // Custom component to wrap the PayPalButtons and show loading spinner
  const ButtonWrapper = ({ showSpinner }: any) => {
    const [{ isPending }] = usePayPalScriptReducer();

    console.log('showSpinner', showSpinner);
    console.log('isPending', isPending);

    return (
      <div>
        {showSpinner || isPending ? (
          <div className="flex justify-center mt-4">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <PayPalButtons
            //@ts-ignore
            style={style}
            // disabled={false}
            // forceReRender={[style]}
            // fundingSource={undefined}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: user?.first_name || '',
          lastName: user?.last_name || '',
          address: user?.address || '',
          country: user?.country?.country_id ? String(user?.country?.country_id) : '',
          city: user?.city || '',
          state: user?.city || '',
          zip_code: user?.zip_code || '',
          phone: user?.mobile || '',
          email: user?.email || '',
          bill_f_name: user?.first_name || '',
          bill_l_name: user?.last_name || '',
          bill_address: user?.address || '',
          bill_country: user?.country?.country_id ? String(user?.country?.country_id) : '',
          bill_city: user?.city || '',
          bill_state: user?.city || '',
          bill_zip_code: user?.zip_code || '',
          bill_phone: user?.mobile || '',
          bill_email: user?.email || '',
          coupon_code: '',
          payment_method: 'stripe',
          shipping_address: true,
          terms: false,
          session_id: '',
          processing_fee: '',
          vat_price: '',
          total_price: '',
          token: ''
        }}
        validationSchema={ConfirmPaymentSchema}
        // @ts-ignore
        onSubmit={(values) => handleSubmit(values)}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form className="w-full">
            <div className="w-full mb-2">
              <h2 className="text-[20px] font-[600] text-black uppercase">Checkout</h2>
            </div>
            <div className="w-full border-t border-orange">
              <div className="collapse collapse-arrow">
                <input type="radio" name="shipping-address" checked />
                <div className="collapse-title text-[18px] text-black font-medium">
                  Shipping Address
                </div>

                <section className="collapse-content">
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1">
                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="w-full">
                        <InputText
                          type="text"
                          name="firstName"
                          label="*First Name"
                          placeholder="*First Name"
                          value={values.firstName}
                          values={values}
                          setFieldValue={setFieldValue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.firstName}
                          touched={touched.firstName}
                        />
                      </div>
                      <div className="w-full">
                        <InputText
                          type="text"
                          name="lastName"
                          label="*Last Name"
                          placeholder="*Last Name"
                          value={values.lastName}
                          values={values}
                          setFieldValue={setFieldValue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.lastName}
                          touched={touched.lastName}
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <InputText
                        type="text"
                        name="address"
                        label="*Address"
                        placeholder="*Address"
                        value={values.address}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.address}
                        touched={touched.address}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-x-5 gap-y-1">
                    <div className="w-full">
                      <InputSelect
                        options={countryList?.data?.map((country: Country) => ({
                          label: country?.country_name,
                          value: String(country?.country_id)
                        }))}
                        id="country"
                        name="country"
                        label="*Country"
                        placeholder="*Country"
                        value={values.country}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.country}
                        touched={touched.country}
                        required={true}
                      />
                    </div>
                    <div className="w-full">
                      <InputText
                        type="text"
                        name="city"
                        label="*City"
                        placeholder="*City"
                        value={values.city}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.city}
                        touched={touched.city}
                        required={true}
                      />
                    </div>
                    <div className="w-full">
                      <InputText
                        type="text"
                        name="state"
                        label="*State"
                        placeholder="*State"
                        value={values.state}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.state}
                        touched={touched.state}
                        required={true}
                      />
                    </div>
                    <div className="w-full">
                      <InputText
                        type="text"
                        name="zip_code"
                        label="*Zip Code"
                        placeholder="*Zip Code"
                        value={values.zip_code}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.zip_code}
                        touched={touched.zip_code}
                        required={true}
                      />
                    </div>
                    <div className="w-full">
                      <InputText
                        type="text"
                        name="phone"
                        label="*Phone"
                        placeholder="*Phone"
                        value={values.phone}
                        values={values}
                        setFieldValue={setFieldValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phone}
                        touched={touched.phone}
                        required={true}
                      />
                    </div>
                    <div className="w-full">
                      <InputText
                        type="text"
                        name="email"
                        label="*Email"
                        placeholder="*Email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email}
                        touched={touched.email}
                        required={true}
                      />
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div className="w-full border-t border-orange">
              <div className="collapse collapse-arrow">
                <input type="radio" name="payment-method" checked />
                <div className="collapse-title text-[18px] text-black font-medium">
                  Payment Method
                </div>
                <div className="collapse-content">
                  <div className="w-full grid grid-cols-2 xs:grid-cols-3 gap-4">
                    <div className="w-full">
                      <label className="w-full flex justify-start gap-2 cursor-pointer">
                        <input
                          type="radio"
                          className="w-4 h-4 radio radio-error"
                          name="payment_method"
                          value={'stripe'}
                          onChange={handleChange}
                          checked={values.payment_method === 'stripe'}
                        />
                        <span className="text-black text-[14px] font-[400] -mt-0.5 min-w-[132px]">
                          Credit or Debit Card
                        </span>
                      </label>
                    </div>
                    <div className="w-full">
                      <label className="w-full flex justify-end xs:justify-start gap-2 cursor-pointer">
                        <input
                          type="radio"
                          className="w-4 h-4 radio radio-error"
                          name="payment_method"
                          value={'paypal'}
                          onChange={handleChange}
                          checked={values.payment_method === 'paypal'}
                        />
                        <picture className="-mt-0.5">
                          <img src="/assets/img/payments/paypal.png" alt="" />
                        </picture>
                      </label>
                    </div>
                    {/* <div className="w-full hidden xs:block"> */}
                    <div className="w-full">
                      <label className="w-full flex justify-start xs:justify-end gap-2">
                        <Icon name="secured" size="18" color="gray" />
                        <span className="text-black text-[14px] font-[400]">Secure</span>
                      </label>
                    </div>
                  </div>

                  {values.payment_method === 'stripe' && (
                    <div className="w-full">
                      <div className="w-full flex gap-1 mt-4">
                        <picture>
                          <img src={`${BaseUrl}/assets/img/payments/discover.png`} alt="" />
                        </picture>
                        <picture>
                          <img src={`${BaseUrl}/assets/img/payments/american-express.png`} alt="" />
                        </picture>
                        <picture>
                          <img src={`${BaseUrl}/assets/img/payments/visa.png`} alt="" />
                        </picture>
                        <picture>
                          <img src={`${BaseUrl}/assets/img/payments/master.png`} alt="" />
                        </picture>
                      </div>
                      <div className="w-full">
                        <div className="w-full flex flex-col xs:flex-row gap-2 mt-4">
                          <CardNumberElement
                            className="w-full lg:w-8/12 h-[45.15px] bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-1"
                            options={cardStyle}
                            onChange={cardHandleChange}
                          />
                          <div className="w-full flex gap-2">
                            <CardCvcElement
                              className="w-1/2 xs:w-[80px] h-[45.15px] bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-1"
                              options={cardStyle}
                              onChange={cardHandleChange}
                            />
                            <CardExpiryElement
                              className="w-1/2 xs:w-[100px] h-[45.15px] bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-1"
                              options={cardStyle}
                              onChange={cardHandleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="w-full mt-4 mb-4">
                <InputCheckBox
                  name="shipping_address"
                  label="Same as shipping address"
                  onChange={handleChange}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              </div>

              {/* Billing Address */}
              {values.shipping_address === false && (
                <div className="w-full border-t border-orange mt-4 mb-4">
                  <div className="collapse collapse-arrow">
                    <input type="radio" name="billing-address" checked />
                    <div className="collapse-title text-[18px] text-black font-medium">
                      Billing Address
                    </div>
                    <div className="collapse-content">
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-1">
                        <div className="w-full grid grid-cols-2 gap-4">
                          <div className="w-full">
                            <InputText
                              type="text"
                              name="bill_f_name"
                              label="*First Name"
                              placeholder="*First Name"
                              value={values.bill_f_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.bill_f_name}
                              touched={touched.bill_f_name}
                            />
                          </div>
                          <div className="w-full">
                            <InputText
                              type="text"
                              name="bill_l_name"
                              label="*Last Name"
                              placeholder="*Last Name"
                              value={values.bill_l_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={errors.bill_l_name}
                              touched={touched.bill_l_name}
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <InputText
                            type="text"
                            name="bill_address"
                            label="*Address"
                            placeholder="*Address"
                            value={values.bill_address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.bill_address}
                            touched={touched.bill_address}
                            required={true}
                          />
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-2 gap-x-5 gap-y-1">
                        <div className="w-full">
                          <InputSelect
                            options={countryList?.data?.map((country: Country) => ({
                              label: country?.country_name,
                              value: String(country?.country_id)
                            }))}
                            id="bill_country"
                            name="bill_country"
                            label="*Country"
                            placeholder="*Country"
                            value={values.bill_country}
                            values={values}
                            setFieldValue={setFieldValue}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.bill_country}
                            touched={touched.bill_country}
                            required={true}
                          />
                        </div>
                        <div className="w-full">
                          <InputText
                            type="text"
                            name="bill_city"
                            label="*City"
                            placeholder="*City"
                            value={values.bill_city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.bill_city}
                            touched={touched.bill_city}
                            required={true}
                          />
                        </div>
                        <div className="w-full">
                          <InputText
                            type="text"
                            name="bill_state"
                            label="*State"
                            placeholder="*State"
                            value={values.bill_state}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.bill_state}
                            touched={touched.bill_state}
                            required={true}
                          />
                        </div>
                        <div className="w-full">
                          <InputText
                            type="text"
                            name="bill_zip_code"
                            label="*Zip Code"
                            placeholder="*Zip Code"
                            value={values.bill_zip_code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.bill_zip_code}
                            touched={touched.bill_zip_code}
                            required={true}
                          />
                        </div>
                        <div className="w-full">
                          <InputText
                            type="text"
                            name="bill_phone"
                            label="*Phone"
                            placeholder="*Phone"
                            value={values.bill_phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.bill_phone}
                            touched={touched.bill_phone}
                            required={true}
                          />
                        </div>
                        <div className="w-full">
                          <InputText
                            type="text"
                            name="bill_email"
                            label="*Email"
                            placeholder="*Email"
                            value={values.bill_email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.bill_email}
                            touched={touched.bill_email}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Coupon */}
              <div className="w-full flex gap-2 mt-4">
                <div className="w-full flex gap-2 items-center">
                  <div className="w-[332px] h-[40px] join relative">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      name="coupon_code"
                      value={values.coupon_code}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full h-[40px] input input-bordered rounded-none placeholder:text-[14px] placeholder:font-[400] join-item ${
                        couponApplied
                          ? '!bg-gray8 cursor-not-allowed !border-none'
                          : 'bg-transparent'
                      }`}
                      disabled={couponApplied}
                    />
                    <span className="join-item absolute mt-3 ml-[90%] ">
                      <Icon name="tag" size="18" color="orange" />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApplyCoupon(values.coupon_code)}
                    className={`w-[106px] h-[40px] form-control flex justify-center items-center text-center text-[14px] font-medium ${
                      couponApplied
                        ? 'bg-gray8 cursor-not-allowed'
                        : 'bg-black text-[#fff] cursor-pointer'
                    }`}
                    disabled={couponApplied}
                  >
                    {couponApplied ? 'APPLIED' : 'Apply'}
                  </button>

                  {couponApplied && (
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="w-10 h-10 p-2.5 bg-orange bg-opacity-10 justify-center items-center flex"
                    >
                      <Icon name="delete" size="22" color="orange" />
                    </button>
                  )}

                  {isCouponInvalid && (
                    <span className="text-red text-sm font-normal">Coupon code is not valid</span>
                  )}
                </div>
              </div>
              <div className="w-full mt-4">
                <label className="w-full flex justify-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 checkbox checkbox-error rounded-none"
                    name="terms"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.terms}
                    required
                  />
                  <span className="text-black text-[14px] font-[400] -mt-0.5">
                    By clicking here, you agree to the
                    <Link href={'#'} className="text-orange italic">
                      {' '}
                      Terms of Service
                    </Link>{' '}
                    and
                    <Link href={'#'} className="text-orange italic">
                      {' '}
                      Privacy Policy
                    </Link>
                    , including
                    <Link href={'#'} className="text-orange italic">
                      {' '}
                      cookie use
                    </Link>
                    .
                  </span>
                </label>
                {touched.terms && errors.terms && (
                  <span className="text-red text-sm font-normal">{errors.terms}</span>
                )}
              </div>
              {values.payment_method === 'paypal' ? (
                <div className="w-full mt-4">
                  <PayPalScriptProvider
                    options={{
                      clientId: `${PAYPAL_CLIENT_ID}`,
                      components: 'buttons',
                      currency: 'USD'
                    }}
                  >
                    <ButtonWrapper
                      showSpinner={values.shipping_address && values.terms ? false : true}
                    />
                  </PayPalScriptProvider>
                  <button ref={buttonRef} type="submit" className="visually-hidden"></button>
                </div>
              ) : (
                <div className="w-full flex gap-2 mt-4 mb-8">
                  <button
                    type="submit"
                    disabled={processing || isLoading}
                    className="w-[330px] h-[54px] flex justify-center items-center text-center gap-6 bg-orange cursor-pointer"
                  >
                    <span className="inline-flex text-[#fff] text-[16] font-[700] uppercase justify-center items-center">
                      {processing || isLoading ? 'Processing' : 'Place Order'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>

      <PaymentSuccessfulModal
        open={openPaymentSuccessful}
        onClose={() => {
          setOpenPaymentSuccessful(false);
          // router.replace('/my-orders');
        }}
      />
    </>
  );
};

export default CheckoutForm;
