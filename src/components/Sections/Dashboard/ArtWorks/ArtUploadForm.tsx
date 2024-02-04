/* eslint-disable no-unused-vars */
import { Button, Input } from '@/components/common';
// @ts-ignore
import { ArtUploadValueType } from '@/types/artUpload.type';
import { Form, Formik } from 'formik';
import React from 'react';
import FormikMultiSelect from '@/components/common/Form/FormikMultiSelect';
import useFilters from '@/hooks/useFilters';
import { ArtUploadSchema } from '@/utils/validations/artUpload';

type ArtUploadFormPropType = {
  mode?: string;
  isLoading: boolean;
  submitHandler: (values: ArtUploadValueType) => void;
  initialValues: ArtUploadValueType;
};

const ArtUploadForm = ({
  submitHandler,
  isLoading,
  initialValues,
  mode
}: ArtUploadFormPropType) => {
  const { filters } = useFilters();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: ArtUploadValueType) => submitHandler(values)}
      validationSchema={ArtUploadSchema}
      enableReinitialize={true}
    >
      {({ values, touched, errors, handleBlur, handleChange, resetForm }) => (
        <Form className="flex flex-col md:gap-4 sm:gap-2 gap-2 justify-start items-start w-full">
          <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
            <Input
              type="text"
              id="item_name"
              name="item_name"
              label="*Art Title"
              placeholder="Write here"
              value={values.item_name}
              onBlur={handleBlur}
              errorText={errors.item_name}
              error={touched.item_name}
              inputClass="rounded-none"
            />
            <Input
              type="select"
              id="size_id"
              name="size_id"
              label="*Select Size"
              placeholder="Select"
              value={values.size_id}
              onBlur={handleBlur}
              errorText={errors.size_id}
              error={touched.size_id}
              options={filters?.sizes || []}
              inputClass="rounded-none"
            />
            <Input
              type="text"
              id="regular_price"
              name="regular_price"
              label="*Set Price"
              placeholder="0"
              value={values.regular_price}
              onBlur={handleBlur}
              errorText={errors.regular_price}
              error={touched.regular_price}
              inputClass="rounded-none"
              disabled={mode === 'edit'}
            />
          </div>
          <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
            <Input
              type="textarea"
              id="item_desc"
              name="item_desc"
              label="*About Art"
              placeholder="Write here"
              value={values.item_desc}
              onBlur={handleBlur}
              errorText={errors.item_desc}
              error={touched.item_desc}
              inputClass="rounded-none !h-[250px]"
            />
          </div>
          <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
            <Input
              type="textarea"
              id="item_shortdesc"
              name="item_shortdesc"
              label="*Details & Dimensions"
              placeholder="Write here"
              value={values.item_shortdesc}
              onBlur={handleBlur}
              errorText={errors.item_shortdesc}
              error={touched.item_shortdesc}
              inputClass="rounded-none !h-[150px]"
            />
          </div>
          <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
            <Input
              type="select"
              id="medium_id"
              name="medium_id"
              label="*Choose Medium"
              placeholder="Select"
              value={values.medium_id}
              onBlur={handleBlur}
              errorText={errors.medium_id}
              error={touched.medium_id}
              options={filters?.mediums || []}
              inputClass="rounded-none"
            />
            <Input
              type="select"
              id="material_id"
              name="material_id"
              label="*Choose Material"
              placeholder="Select"
              value={values.material_id}
              onBlur={handleBlur}
              errorText={errors.material_id}
              error={touched.material_id}
              options={filters?.materials || []}
              inputClass="rounded-none"
            />
            <Input
              type="select"
              id="subject_id"
              name="subject_id"
              label="*Choose Subject"
              placeholder="Select"
              value={values.subject_id}
              onBlur={handleBlur}
              errorText={errors.subject_id}
              error={touched.subject_id}
              options={filters?.subjects || []}
              inputClass="rounded-none"
            />
          </div>
          <div className="flex w-full md:gap-9 sm:gap-6 gap-2 flex-col sm:flex-row">
            {/* <FormikMultiSelect
              mode="multiple"
              name="item_category"
              label="*Add Category"
              options={filters?.cats || []}
            /> */}
            <Input
              type="select"
              id="item_category"
              name="item_category"
              label="*Add Category"
              placeholder="Select"
              value={values.item_category}
              onBlur={handleBlur}
              errorText={errors.item_category}
              error={touched.item_category}
              options={filters?.cats || []}
              inputClass="rounded-none"
            />
            <FormikMultiSelect name="item_tags" label="*Add Tag" options={filters?.tags || []} />
          </div>
          <div className="w-full flex justify-center items-center flex-col mt-8">
            <div className="w-full flex gap-2 mt-4 justify-center items-center">
              <label className="flex justify-start gap-2 cursor-pointer" htmlFor="is_adult">
                <input
                  type="checkbox"
                  className="w-4 h-4 checkbox checkbox-error rounded-none text-white"
                  name="is_adult"
                  id="is_adult"
                  onChange={handleChange}
                  defaultChecked={values.is_adult}
                />
                <span className="text-black text-[14px] font-[400] -mt-0.5">
                  This content only for mature audience
                </span>
              </label>
              {errors.is_adult && (
                <span className="text-red text-sm font-normal">{errors.is_adult}</span>
              )}
            </div>
            <div className="w-full flex justify-center items-center gap-6 mt-6">
              <button
                onClick={() => resetForm()}
                type="button"
                className="w-[150px] h-[48px] border-2 px-8 py-3 border-black uppercase text-sm font-bold flex items-center justify-center bg-white !text-black"
              >
                Cancel
              </button>
              <Button
                className={`text-white w-[256px] h-[48px] !px-8 !py-3 font-bold uppercase !text-sm ${
                  isLoading && '!bg-orange/10'
                }`}
                type="submit"
                disabled={isLoading}
              >
                Publish
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ArtUploadForm;
