/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useState } from 'react';
// import ArtPreview from '@/components/Sections/Dashboard/ArtWorks/ArtPreview';
import Wrapper from '@/components/layout/Wrapper';
import { Text, Title } from '@/components/common';
import ArtUploadForm from '@/components/Sections/Dashboard/ArtWorks/ArtUploadForm';
import { ArtUploadValueType } from '@/types/artUpload.type';
import { getUserSessionId } from '@/utils';
import { useGetArtQuery, useUpdateArtMutation } from '@/redux/features/arts/artsApi';
import { useRouter } from 'next/navigation';
import Img from '@/components/common/Img';
import Swal from 'sweetalert2';
import { PageProps } from '@/types/meta.type';
import { ArtItem } from '@/types/art';
import ComponentLoader from '@/components/common/ComponentLoader';
import DragNdDrop from '@/components/Sections/Dashboard/ArtWorks/DragNdDrop';

const ArtWorkEdit = ({ params }: { params: PageProps }) => {
  const router = useRouter();
  const [file, setFile] = useState<string | null>(null);
  const [UpdateArt, { isSuccess, isError, isLoading, error }] = useUpdateArtMutation({});
  const [art, setArt] = useState<ArtItem>({} as ArtItem);
  const [cats, setCats] = useState('');

  const {
    data: artDetail,
    isLoading: artIsLoading,
    isSuccess: artISuccess
  } = useGetArtQuery(params?.slug, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (!artIsLoading && artISuccess && artDetail?.status === 'success') {
      setArt(artDetail?.data);
      artDetail?.data?.item_category?.map((cat: any) => console.log(cat?.category_detaill, 'CAT'));
      // const catList = artDetail?.data?.item_category?.map((cat: any) => ({
      //   label: cat?.category_detaill?.category_name,
      //   value: cat?.category_detaill?.cat_id
      // }));
      const catList = artDetail?.data?.item_category?.map(
        (cat: any) => cat?.category_detaill?.cat_id
      );
      setCats(catList);
    }
  }, [artDetail, isLoading, isSuccess]);

  useEffect(() => {
    console.log(error, 'EROR');
    if (isSuccess && !isError) {
      router.push('/dashboard/artist/manage-artworks/create/pending');
    }

    if (isError) {
      Swal.fire({
        // @ts-ignore
        title: error?.data?.message || 'Something Error',
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
    }
  }, [isError, isSuccess]);

  const submitHandler = (values: ArtUploadValueType) => {
    console.log(values, 'VALUES');
    // @ts-ignore
    const item_tags = values?.item_tags?.join(',') || '';
    console.log(values.item_category, 'Category');
    const formData = new FormData();
    formData.append('session_id', getUserSessionId() || '');
    // formData.append('old_image_name', art?.image_path);
    formData.append('image_name', file || '');
    formData.append('item_name', values.item_name || '');
    formData.append('size_id', values.size_id || '');
    formData.append('medium_id', values.medium_id || '');
    formData.append('material_id', values.material_id || '');
    formData.append('subject_id', values.subject_id || '');
    formData.append('item_desc', values.item_desc || '');
    formData.append('item_shortdesc', values.item_shortdesc || '');
    formData.append('item_tags', item_tags);
    // @ts-ignore
    formData.append('item_category[]', values?.item_category);
    // values?.item_category?.forEach((category) => formData.append('item_category[]', category));
    formData.append('regular_price', values.regular_price);
    // @ts-ignore
    formData.append('is_adult', values.is_adult ? 1 : 0);
    UpdateArt({ formData, itemId: Number(art?.item_id) });
  };

  return artIsLoading || isLoading ? (
    <ComponentLoader />
  ) : (
    <div className="w-full">
      {!isLoading && (
        <Wrapper>
          <div className="text-center">
            <Text className="text-black sm:text-2xl mb-5">Art Preview</Text>
            <DragNdDrop prevArt={art?.image_path} handleFile={setFile} />
          </div>
          <div className="mt-4">
            <div className="flex flex-col">
              <Title className="font-semibold text-lg text-black" content="Art Information" />
              <ArtUploadForm
                submitHandler={submitHandler}
                isLoading={isLoading}
                mode="edit"
                initialValues={{
                  item_name: art?.item_name,
                  regular_price: String(art?.regular_price),
                  item_desc: art?.item_desc,
                  item_shortdesc: art?.item_shortdesc,
                  size_id: String(art?.size_id?.id),
                  medium_id: String(art?.medium_id?.id),
                  material_id: String(art?.material_id?.id),
                  subject_id: String(art?.subject_id?.id),
                  // @ts-ignore
                  item_tags: art?.item_tags?.split(',').map((tag) => tag),
                  item_category: cats && Array.isArray(cats) ? cats[0] : cats,
                  is_adult: Boolean(art?.is_adult)
                }}
              />
            </div>
          </div>
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

export default ArtWorkEdit;
