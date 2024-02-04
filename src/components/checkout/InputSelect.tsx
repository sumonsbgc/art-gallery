/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, FocusEvent } from 'react';
import { OptionType } from '@/types/artUpload.type';
import { Select } from 'antd';

type InputProps = {
  id: string;
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
  options?: OptionType[];
};

const InputSelect = ({
  id,
  name,
  label,
  placeholder,
  value,
  // onChange,
  onBlur,
  error,
  touched,
  required,
  values,
  setFieldValue,
  options
}: InputProps) => {
  const onChange = (value: string) => {
    console.log('change:', value);
    setFieldValue('country', value);

    if (values?.shipping_address === true) {
      setFieldValue('bill_country', value);
    }
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  console.log(value, values, 'VALUES');

  return (
    <div className="w-full">
      <Select
        className="w-full h-[45.15px] focus:rounded-md focus:border-2 focus:text-sm !text-stone-500 !focus:border-black !focus:ring-black !hover:border-black !border-solid !bg-white !placeholder:text-gray country-select"
        style={{ width: '100%', borderRadius: '5px !important' }}
        showSearch
        placeholder={placeholder}
        label={label}
        optionFilterProp="children"
        onChange={onChange}
        filterOption={filterOption}
        //@ts-ignore
        defaultValue={values?.country || label}
        //@ts-ignore
        options={options}
      />
    </div>
  );
};

export default InputSelect;
