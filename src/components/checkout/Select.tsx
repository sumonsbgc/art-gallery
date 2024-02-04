/* eslint-disable no-unused-vars */
import { ChangeEvent, FocusEvent } from 'react';

type SelectProps = {
  option: any;
  label: string;
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
  required?: boolean;
  className?: string;
  wrapperClass?: string;
};

const Select = ({
  option,
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  className,
  wrapperClass,
  required
}: SelectProps) => {
  return (
    <div
      className={`min-h-[70.15px] w-full flex-col justify-start items-start gap-[3.23px] flex ${wrapperClass}`}
    >
      <select
        id={name}
        name={name}
        value={value}
        //@ts-ignore
        onChange={onChange}
        //@ts-ignore
        onBlur={onBlur}
        required={required}
        className={`select w-full h-[45.15px] relative border border-stone-500 border-opacity-30 bg-transparent px-2 text-stone-500 text-base font-normal rounded focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all ${className}`}
      >
        <option value="">{label}</option>
        {option &&
          Array.isArray(option) &&
          option?.length > 1 &&
          option.map((item: any, index: number) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
      </select>
      {touched && error && <span className="text-red-500 text-sm font-normal">{error}</span>}
    </div>
  );
};

export default Select;
