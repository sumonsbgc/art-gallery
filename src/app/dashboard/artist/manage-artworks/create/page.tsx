/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
import ArtPreview from '@/components/Sections/Dashboard/ArtWorks/ArtPreview';
import Wrapper from '@/components/layout/Wrapper';
import { Text, DragNdDrop, Title, Img } from '@/components/common';
import ArtUploadForm from '@/components/Sections/Dashboard/ArtWorks/ArtUploadForm';
import { ArtUploadValueType } from '@/types/artUpload.type';
import { getUserSessionId } from '@/utils';
import { useUploadArtMutation } from '@/redux/features/arts/artsApi';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const initialValues: ArtUploadValueType = {
  item_name: '',
  regular_price: '',
  item_desc: '',
  item_shortdesc: '',
  size_id: '',
  medium_id: '',
  material_id: '',
  subject_id: '',
  item_tags: [],
  item_category: '',
  is_adult: false
};

const ArtWorkCreate = () => {
  const router = useRouter();
  const [file, setFile] = useState<string | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isImgUploaded, setImgUploaded] = useState<boolean>(false);
  const [UploadArt, { isSuccess, isError, isLoading, error }] = useUploadArtMutation({});

  useEffect(() => {
    console.log(error, 'EROR');
    if (isSuccess && !isError) {
      router.push('/dashboard/artist/manage-artworks/create/pending');
    }

    if (isError) {
      Swal.fire({
        // @ts-ignore
        title: error?.data?.message || 'Something Error',
        icon: 'error',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isError, isSuccess]);

  const submitHandler = (values: ArtUploadValueType) => {
    console.log('VALUES', values);
    // @ts-ignore
    const item_tags = values?.item_tags?.join(',') || '';

    const formData = new FormData();
    formData.append('session_id', getUserSessionId() || '');
    formData.append('image_name', file || '');
    formData.append('item_name', values.item_name || '');
    formData.append('size_id', values.size_id || '');
    formData.append('medium_id', values.medium_id || '');
    formData.append('material_id', values.material_id || '');
    formData.append('subject_id', values.subject_id || '');
    formData.append('item_desc', values.item_desc || '');
    formData.append('item_shortdesc', values.item_shortdesc || '');
    // @ts-ignore
    formData.append('item_tags', item_tags);
    formData.append('item_category[]', values?.item_category);
    // @ts-ignore
    formData.append('regular_price', values.regular_price);
    // @ts-ignore
    formData.append('is_adult', values.is_adult ? 1 : 0);
    UploadArt(formData);
  };

  return (
    <div className="w-full">
      {!isLoading && (
        <Wrapper>
          {!isImgUploaded ? (
            <DragNdDrop
              handleImgUpload={setImgUploaded}
              handleFile={setFile}
              handlePreview={setPreview}
            />
          ) : (
            <div className="text-center">
              <Text className="text-black sm:text-2xl mb-5">Art Preview</Text>
              <ArtPreview preview={preview} />
            </div>
          )}

          {isImgUploaded && (
            <div className="mt-4">
              <div className="flex flex-col">
                <Title className="font-semibold text-lg text-black" content="Art Information" />
                <ArtUploadForm
                  submitHandler={submitHandler}
                  isLoading={isLoading}
                  initialValues={initialValues as ArtUploadValueType}
                />
              </div>
            </div>
          )}
        </Wrapper>
      )}
      {isLoading && (
        <div className="flex h-screen w-screen justify-center items-center fixed z-20 bg-white top-0 left-0">
          <Img
            src="/assets/img/arts/art-upload-timer.gif"
            alt="Art Uploading Timer"
            width={200}
            height={200}
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ArtWorkCreate;
