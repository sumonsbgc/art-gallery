import React from 'react';
import { Field, ErrorMessage, FieldProps } from 'formik';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
// const { Option } = Select;

interface CustomSelectProps extends SelectProps {
  name: string;
  label: string;
  options: { value: number; label: string }[];
  labelClass?: string;
}

const FormikMultiSelect = ({ name, label, options, labelClass, ...rest }: CustomSelectProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className={`block text-stone-500 text-sm font-normal capitalize w-full pb-[1.77px] ${labelClass}`}
      >
        {label}
      </label>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <Select
            className="w-full antd-custom-multiselct"
            id={name}
            mode={rest.mode || 'tags'}
            placeholder={`Select ${label.toLowerCase()}`}
            value={field.value}
            onChange={(selectedOptions) => form.setFieldValue(name, selectedOptions)}
            onBlur={() => form.setFieldTouched(name, true)}
            options={options}
            {...rest}
          />
        )}
      </Field>
      <ErrorMessage name={name} component="div" />
    </div>
  );
};

export default FormikMultiSelect;
