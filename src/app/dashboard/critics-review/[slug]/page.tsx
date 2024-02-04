/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// ant design
import { Rate, Flex, Input, Select as AntSelect } from 'antd';
import Swal from 'sweetalert2';

import * as Yup from 'yup';
import { Formik, Form } from 'formik';

import { Icon } from '@/components/ui';
import ImageZoom from '@/components/ui/ImageZoom';
import { useAddCriticsReviewMutation } from '@/redux/features/critic/criticApi';
import { useGetArtQuery } from '@/redux/features/arts/artsApi';
import { BaseUrl } from '@/config';
import { ArtItem } from '@/types/art';
import { moneyFormat } from '@/utils';
import { RatingOption } from '@/components/common/Form/RatingOptions';

const { TextArea } = Input;
const desc = ['Terrible', 'Bad', 'Average', 'Good', 'Excellent'];

const criticsReviewSchema = Yup.object().shape({
  // rating: Yup.string().required('Rating is required'),
  review: Yup.string().required('Review is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be more than 0')
    .integer('Price must be more than 0')
    .required('Price is required')
});

const critics_review = {
  review: '',
  price: ''
};

type PageProps = {
  slug: string;
};

const CriticsPage = ({ params }: { params: PageProps }) => {
  const router = useRouter();

  const [art, setArt] = useState<ArtItem>({} as ArtItem);

  const { data, isLoading, isSuccess, isError } = useGetArtQuery(params?.slug, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setArt(data?.data);
    }
  }, [isLoading, isSuccess, isError]);

  const [rating, setRating] = useState({
    basic: 0,
    creativity: 0,
    clarity: 0,
    content: 0,
    material: 0,
    concept: 0,
    actual: 0
  });

  const [addCriticsReview, { isLoading: isLoadingAdd }] = useAddCriticsReviewMutation();

  const handleRating = (name: string, rate: number) => {
    setRating({ ...rating, [name]: rate });
    //@ts-ignore
    critics_review.rating = rate;
  };
  console.log('ART', art);
  const handleSubmit = async (values: typeof critics_review, resetForm: any) => {
    const { review, price } = values;
    const formData = new FormData();
    formData.append('item_id', String(art?.item_id));
    formData.append('review', review);
    formData.append('price', price);
    formData.append('basic', String(rating.basic));
    formData.append('creativity', String(rating.creativity));
    formData.append('clarity', String(rating.clarity));
    formData.append('content', String(rating.content));
    formData.append('material', String(rating.material));
    formData.append('concept', String(rating.concept));
    formData.append('actual', String(rating.actual));
    const addReview: any = await addCriticsReview(formData);
    const { error, data: addData } = addReview;

    if (addData == undefined) {
      if (error?.data?.status == 'fail') {
        Swal.fire({
          icon: 'error',
          title: error?.data?.message,
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });
      }
    } else if (addData.status == 'success') {
      Swal.fire({
        icon: 'success',
        title: 'You Have Added An Art Review Successfully',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
      setRating({
        ...rating,
        basic: 0,
        creativity: 0,
        clarity: 0,
        content: 0,
        material: 0,
        concept: 0,
        actual: 0
      });
      resetForm();
      router.push('/dashboard/critics-review');
    }
  };

  return (
    <div className="w-screen h-screen md:flex">
      {isLoading ? null : (
        <>
          <div className="w-full sm:w-2/5 lg:w-3/4 overflow-hidden">
            <div className="w-full h-[300px] md:h-screen relative">
              {isLoading || isLoadingAdd ? (
                <div className="w-full h-[300px] md:h-screen absolute z-20 backdrop-blur bg-black/20 flex justify-center items-center overflow-hidden">
                  <span className="loading loading-spinner loading-lg text-orange"></span>
                </div>
              ) : null}

              <Link
                href="/dashboard/critic/rate-reviews"
                className="w-[113px] z-10 h-[23px] flex gap-2 absolute left-8 top-4 cursor-pointer"
              >
                <Icon name="arrow-left" size="22" color="white" />
                <h4 className="w-[80px] h-[23px] text-white text-[15px] font-[500]">Back</h4>
              </Link>

              <div className="w-full h-[45px] z-10 flex items-center justify-between absolute px-6 m-auto left-0 right-0 top-0 bottom-0">
                <Link
                  href={`${BaseUrl}/dashboard/critics-review`}
                  className="w-[25px] h-[45px] mt-2 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <Icon name="arrow-left-filled" size="30" color="white" />
                </Link>
                <Link
                  href={`${BaseUrl}/dashboard/critics-review`}
                  className="w-[25px] h-[45px] mb-2 rounded-full flex items-center justify-start cursor-pointer"
                >
                  <Icon name="arrow-right-filled" size="30" color="white" />
                </Link>
              </div>

              <div className="w-full h-[300px] md:h-screen z-0 overflow-hidden">
                <ImageZoom image={art?.image_path} title={art?.item_name} />
              </div>
            </div>
          </div>
          <div className="w-full sm:w-3/5 lg:w-1/4  h-screen flex flex-col px-6 py-4 overflow-y-scroll">
            <div className="w-full flex gap-4">
              <div className="w-[50px] h-[50px]">
                <Link
                  href={`/artists/${art?.mainOwner?.id}/${decodeURIComponent(
                    art?.mainOwner?.name
                  )}`}
                >
                  <picture>
                    <img
                      src={art?.mainOwner?.image_path || '/assets/icons/user.svg'}
                      alt={art?.mainOwner?.name}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                  </picture>
                </Link>
              </div>
              <div className="flex-1 h-[50px]">
                <div className="w-full mb-1">
                  <Link
                    href={`/artists/${art?.mainOwner?.id}/${decodeURIComponent(
                      art?.mainOwner?.name
                    )}`}
                  >
                    <h2 className="text-black text-[20px] font-[500]">{art?.mainOwner?.name}</h2>
                  </Link>
                </div>
                <div className="w-full flex gap-2">
                  <picture className="w-[22px] h-[16px] rounded-sm">
                    <img
                      src={art?.mainOwner?.country?.country_badges}
                      alt="location"
                      className="w-[22px] h-[16px]"
                    />
                  </picture>
                  <span className="text-black text-[14px] font-[300] -mt-1">
                    {art?.mainOwner?.country?.country_name}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex gap-4 mt-4 mb-4 justify-between">
              <div className="w-[150px] h-[39px]">
                <div className="w-full">
                  <h2 className="text-black text-[14px] font-[500]">{art?.item_name}</h2>
                </div>
                <div className="w-full">
                  <span className="text-black text-[12px] font-[400]">
                    I am an artist living in {art?.mainOwner?.country?.country_name}.
                  </span>
                </div>
              </div>
              <div className="h-[39px]">
                <div className="w-full">
                  <h2 className="text-black text-[14px] font-[500]">Base Price</h2>
                </div>
                <div className="w-full">
                  <span className="text-black text-[12px] font-[400]">
                    {moneyFormat(art?.base_price)}
                  </span>
                </div>
              </div>
              <div className="h-[39px]">
                <div className="w-full">
                  <h2 className="text-black text-[14px] font-[500]">Current Price</h2>
                </div>
                <div className="w-full">
                  <span className="text-black text-[12px] font-[400]">
                    {moneyFormat(art?.regular_price)}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[130px] grid grid-cols-2 mt-6 mb-3">
              <div className="w-full h-[65px] p-2 border border-orange border-r-0">
                <div className="w-full text-center">
                  <h2 className="text-black text-[14px] font-[400]">Average Rating</h2>
                </div>
                <div className="w-full text-center">
                  <span className="text-black text-[16px] font-[600]">
                    {art?.avg_customer_rating?.toFixed(2) || 0}/5
                  </span>
                </div>
              </div>
              <div className="w-full h-[65px] p-2 border border-orange">
                <div className="w-full text-center">
                  <h2 className="text-black text-[14px] font-[400]">Critic Ratings</h2>
                </div>
                <div className="w-full text-center">
                  <span className="text-black text-[16px] font-[600]">
                    {art?.avg_critic_rating?.toFixed(2) || 0}
                  </span>
                </div>
              </div>
              <div className="w-full h-[65px] p-2 border border-orange border-r-0 border-t-0">
                <div className="w-full text-center">
                  <h2 className="text-black text-[14px] font-[400]">Average Review</h2>
                </div>
                <div className="w-full text-center">
                  <span className="text-black text-[16px] font-[600]">Positive</span>
                </div>
              </div>
              <div className="w-full h-[65px] p-2 border border-orange border-t-0">
                <div className="w-full text-center">
                  <h2 className="text-black text-[14px] font-[400]">Total Likes</h2>
                </div>
                <div className="w-full h-[23px] flex justify-center items-center gap-1 text-center">
                  <Icon name="heart-fill" color="orange" size="18" />
                  <span className="text-orange text-[16px] font-[600]">{art?.total_favorite}</span>
                </div>
              </div>
            </div>

            <Formik
              initialValues={critics_review}
              validationSchema={criticsReviewSchema}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values, resetForm);
              }}
              enableReinitialize={true}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form className="w-full">
                  <div className="w-full mt-3 grid grid-cols-2 gap-4">
                    {/* Color */}
                    <div className="w-full">
                      <div className="w-full">
                        <h4 className="text-black text-[12px] font-[400] italic">Color</h4>
                      </div>
                      <div className="w-full">
                        <AntSelect
                          placeholder="Color Rating"
                          onChange={(value) => {
                            handleRating('basic', value);
                          }}
                          options={[
                            RatingOption(1),
                            RatingOption(2),
                            RatingOption(3),
                            RatingOption(4),
                            RatingOption(5)
                          ]}
                          defaultValue={rating.basic}
                          className="w-full h-[40px]"
                        />
                      </div>
                    </div>
                    {/* Color */}
                    {/* Creativity */}
                    <div className="w-full">
                      <div className="w-full">
                        <h4 className="text-black text-[12px] font-[400] italic">Creativity</h4>
                      </div>
                      <div className="w-full">
                        <AntSelect
                          placeholder="Creativity Rating"
                          onChange={(value) => {
                            handleRating('creativity', value);
                          }}
                          options={[
                            RatingOption(1),
                            RatingOption(2),
                            RatingOption(3),
                            RatingOption(4),
                            RatingOption(5)
                          ]}
                          defaultValue={rating.creativity}
                          className="w-full h-[40px]"
                        />
                      </div>
                    </div>
                    {/* Creativity */}
                    {/* Clarity */}
                    <div className="w-full">
                      <div className="w-full">
                        <h4 className="text-black text-[12px] font-[400] italic">Clarity</h4>
                      </div>
                      <div className="w-full">
                        <AntSelect
                          placeholder="Clarity Rating"
                          onChange={(value) => {
                            handleRating('clarity', value);
                          }}
                          options={[
                            RatingOption(1),
                            RatingOption(2),
                            RatingOption(3),
                            RatingOption(4),
                            RatingOption(5)
                          ]}
                          defaultValue={rating.clarity}
                          className="w-full h-[40px]"
                        />
                      </div>
                    </div>
                    {/* Clarity */}
                    {/* Content */}
                    <div className="w-full">
                      <div className="w-full">
                        <h4 className="text-black text-[12px] font-[400] italic">Content</h4>
                      </div>
                      <div className="w-full">
                        <AntSelect
                          placeholder="Content Rating"
                          onChange={(value) => {
                            handleRating('content', value);
                          }}
                          options={[
                            RatingOption(1),
                            RatingOption(2),
                            RatingOption(3),
                            RatingOption(4),
                            RatingOption(5)
                          ]}
                          defaultValue={rating.content}
                          className="w-full h-[40px]"
                        />
                      </div>
                    </div>
                    {/* Content */}
                    {/* Materials */}
                    <div className="w-full">
                      <div className="w-full">
                        <h4 className="text-black text-[12px] font-[400] italic">Materials</h4>
                      </div>
                      <div className="w-full">
                        <AntSelect
                          placeholder="Materials Rating"
                          onChange={(value) => {
                            handleRating('material', value);
                          }}
                          options={[
                            RatingOption(1),
                            RatingOption(2),
                            RatingOption(3),
                            RatingOption(4),
                            RatingOption(5)
                          ]}
                          defaultValue={rating.material}
                          className="w-full h-[40px]"
                        />
                      </div>
                    </div>
                    {/* Materials */}
                    {/* Concept/Idea */}
                    <div className="w-full">
                      <div className="w-full">
                        <h4 className="text-black text-[12px] font-[400] italic">Concept/Idea</h4>
                      </div>
                      <div className="w-full">
                        <AntSelect
                          placeholder="Concept/Idea Rating"
                          onChange={(value) => {
                            handleRating('concept', value);
                          }}
                          options={[
                            RatingOption(1),
                            RatingOption(2),
                            RatingOption(3),
                            RatingOption(4),
                            RatingOption(5)
                          ]}
                          defaultValue={rating.concept}
                          className="w-full h-[40px]"
                        />
                      </div>
                    </div>
                    {/* Concept/Idea */}
                  </div>
                  <div className="w-full mt-3">
                    <h2 className="text-black text-[16px] font-[500]">Rate & Review</h2>
                    <div className="w-full mt-2 mb-2">
                      <Rate
                        tooltips={desc}
                        value={rating.actual}
                        onChange={(value) => {
                          handleRating('actual', value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="w-full mb-6">
                    <Flex vertical gap={32}>
                      <TextArea
                        showCount
                        maxLength={500}
                        placeholder="Write review"
                        style={{ height: 160, resize: 'none' }}
                        name="review"
                        value={values.review}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Flex>
                    {touched.review && errors.review && (
                      <span className="w-full text-red text-sm font-normal">{errors.review}</span>
                    )}
                  </div>

                  <div className="w-full mb-3">
                    <label className="text-black text-[14px] font-[400] italic">
                      Recommended price
                    </label>
                    <div className="w-full mt-2">
                      <Input
                        type="text"
                        name="price"
                        placeholder="$0"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="off"
                      />
                      {touched.price && errors.price && (
                        <span className="w-full text-red text-sm font-normal">{errors.price}</span>
                      )}
                    </div>
                  </div>

                  <div className="w-full mt-4 mb-3 md:mb-2">
                    <button
                      type="submit"
                      className="w-full h-[42px] flex justify-center items-center text-center bg-orange cursor-pointer"
                    >
                      <span className="inline-flex text-[#fff] text-[14px] font-[700] uppercase justify-center items-center">
                        {isLoadingAdd ? 'Processing' : 'Submit'}
                      </span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};

export default CriticsPage;
