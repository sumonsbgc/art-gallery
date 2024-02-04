/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, ChangeEvent, FocusEvent } from 'react';

type InputProps = {
  name: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  values?: any;
  setFieldValue?: any;
};

const InputCheckBox = ({ name, label, onChange, values, setFieldValue }: InputProps) => {
  useEffect(() => {
    if (values?.shipping_address === false) {
      setFieldValue('bill_f_name', '');
      setFieldValue('bill_l_name', '');
      setFieldValue('bill_address', '');
      setFieldValue('bill_country', values?.country);
      setFieldValue('bill_city', '');
      setFieldValue('bill_state', '');
      setFieldValue('bill_zip_code', '');
      setFieldValue('bill_phone', '');
      setFieldValue('bill_email', '');
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
    <label className="w-full flex justify-start gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="w-4 h-4 checkbox checkbox-error rounded-none"
        name={name}
        onChange={onChange}
        checked={values.shipping_address}
      />
      <span className="text-black text-[14px] font-[400] -mt-0.5">{label}</span>
    </label>
  );
};

export default InputCheckBox;
