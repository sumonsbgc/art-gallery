/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, ChangeEvent, FocusEvent } from 'react';

type InputProps = {
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  values?: any;
  setFieldValue?: any;
};

const InputText = ({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required,
  values,
  setFieldValue
}: InputProps) => {
  useEffect(() => {
    if (values?.shipping_address === true) {
      setFieldValue('bill_f_name', values?.firstName);
      setFieldValue('bill_l_name', values?.lastName);
      setFieldValue('bill_address', values?.address);
      setFieldValue('bill_country', values?.country);
      setFieldValue('bill_city', values?.city);
      setFieldValue('bill_state', values?.state);
      setFieldValue('bill_zip_code', values?.zip_code);
      setFieldValue('bill_phone', values?.phone);
      setFieldValue('bill_email', values?.email);
    }
  }, [
    values?.firstName,
    values?.lastName,
    values?.address,
    values?.country,
    values?.city,
    values?.state,
    values?.zip_code,
    values?.phone,
    values?.email,
    values?.shipping_address
  ]);

  return (
    <div className="min-h-[70.15px] w-full flex-col justify-start items-start gap-[3.23px] flex">
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className="w-full h-[45.15px] relative border border-stone-500 border-opacity-30 bg-transparent px-2 text-stone-500 text-base font-normal rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
      />
      {touched && error && <span className="text-red-500 text-sm font-normal">{error}</span>}
    </div>
  );
};

export default InputText;
