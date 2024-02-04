'use client';

import { useState } from 'react';
import classnames from 'classnames';
import { Field } from 'formik';

// components
import { Icon } from '@/components/ui';
import { OptionType } from '@/types/artUpload.type';

type InputProps = {
  id: string;
  name: string;
  containerClass?: string;
  labelClass?: string;
  inputClass?: string;
  placeholder?: string;
  label?: string;
  type?: string;
  error?: boolean | string;
  errorText?: string;
  errorColor?: string;
  required?: boolean;
  disabled?: boolean;
  isDefaultSpacing?: boolean;
  value?: string;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  options?: OptionType[];
};

const Input = ({
  id,
  name,
  containerClass = 'w-full',
  labelClass = '',
  inputClass = '',
  placeholder = '',
  label = '',
  type = 'text',
  error = false,
  errorText = '',
  errorColor = 'text-red ',
  required = false,
  disabled = false,
  isDefaultSpacing = false,
  value = '',
  onBlur,
  options,
  ...rest
}: InputProps) => {
  const [isPassword, setIsPassword] = useState(false);
  const inputClasses = classnames(
    `w-full h-[45.15px] px-2 border-stone-500 border-opacity-30 focus:border-black focus:outline-none rounded-md ${
      errorText && error
        ? 'text-red-700 focus:border-red-900 border-red-400 border-solid focus:ring-red-200'
        : 'border-black focus:ring-black hover:border-black border-solid bg-white placeholder:text-gray'
    } border focus:outline-none text-black text-sm font-normal ${inputClass}`
  );

  return (
    <div className={containerClass}>
      {label ? (
        <label
          htmlFor={id}
          className={`block text-stone-500 text-sm font-normal capitalize w-full pb-[1.77px] ${labelClass}`}
        >
          {label} {required && <span className="text-red">*</span>}
        </label>
      ) : (
        ''
      )}
      {type === 'textarea' ? (
        <Field
          as="textarea"
          className={`${inputClasses} ${
            disabled && '!bg-slate-200 cursor-not-allowed'
          } resize-none py-2`}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete="off"
          {...rest}
        />
      ) : type === 'password' ? (
        <div className="relative">
          <Field
            type={isPassword ? 'text' : type}
            className={`${inputClasses} ${disabled && '!bg-slate-200 cursor-not-allowed'}`}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onBlur={onBlur}
            disabled={disabled}
            autoComplete="off"
            {...rest}
          />
          <button
            type="button"
            onClick={() => setIsPassword((prev) => !prev)}
            className="absolute flex items-center leading-5 inset-y-3 right-2"
          >
            <Icon name={isPassword ? 'eye-on' : 'eye-off'} color="black" />
          </button>
        </div>
      ) : type === 'select' ? (
        <Field
          as="select"
          className={`${inputClasses} ${disabled && '!bg-slate-200 cursor-not-allowed'}`}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete="off"
          {...rest}
        >
          <option value="">{placeholder || label}</option>
          {options?.map((item: any) => (
            <option key={item.label} value={item.value}>
              {item.label}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={type}
          className={`${inputClasses} ${disabled && '!bg-slate-200 cursor-not-allowed'}`}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete="off"
          {...rest}
        />
      )}

      <p className={`${errorText && error ? 'mt-2' : ''} text-xs ${errorColor}`}>
        {errorText && error ? errorText : isDefaultSpacing ? '‎' : ''}
      </p>
    </div>
  );
};

export default Input;
