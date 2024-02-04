/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui';
import Swal from 'sweetalert2';
import { useUploadImgMutation } from '@/redux/features/arts/artsApi';
import { getUserSessionId } from '@/utils';
import { Img } from '@/components/common';
import UploadLoader from '@/components/common/UploadLoader';

const isFileTypeApproved = (file: File) => {
  const approvedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileName = file.name.toLocaleLowerCase();
  return approvedExtensions.some((extension: string) => fileName.endsWith(extension));
};

type DragNdDropPropType = {
  handleFile: React.Dispatch<React.SetStateAction<string | null>>;
  prevArt: string;
};

const DragNdDrop = ({ handleFile, prevArt }: DragNdDropPropType) => {
  const [uploadImg, { isLoading, isSuccess, data }] = useUploadImgMutation({});
  const [fileList, setFileList] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const uploadRef = useRef<HTMLDivElement>(null);

  const dragEnter = () => uploadRef.current?.classList.add('drag-over');
  const dragLeave = () => uploadRef.current?.classList.remove('drag-over');
  const onDrop = () => uploadRef.current?.classList.remove('drag-over');

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isFileTypeApproved(file)) {
        setFileList(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire({
          title: 'Invalid File Type',
          text: 'The Approved File Type Is .png And .jpg Or .jpeg',
          customClass: {
            htmlContainer: 'font-medium text-sm text-gray',
            confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
          }
        });
      }
    }
  };

  useEffect(() => {
    if (fileList) {
      const formData = new FormData();
      formData.append('file', fileList as File);
      formData.append('session_id', getUserSessionId() || '');
      uploadImg(formData);
    }
  }, [fileList]);

  useEffect(() => {
    if (isSuccess && !isLoading) {
      const fastItemList = data?.data?.first;
      const lastItem = fastItemList[fastItemList?.length - 1];
      handleFile(lastItem?.item_file_name);
    }
  }, [isLoading, data, isSuccess]);

  return (
    <div
      ref={uploadRef}
      className="bg-[#F9F9F9] relative flex flex-col items-center gap-6 text-center cursor-pointer w-full md:max-w-[710px] h-[350px] mx-auto"
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={onDrop}
      title="Click Here to upload your artwork"
    >
      {preview || prevArt ? <Img src={preview || prevArt} layout alt="" /> : null}
      <Icon name="upload" size="20" className="absolute top-4 right-4 z-10 cursor-pointer" />
      <input
        type="file"
        className="opacity-0 absolute w-full h-full top-0 left-0 z-10 cursor-pointer"
        onChange={onFileDrop}
        name="art"
        title="Click Here to upload your artwork"
      />
      {isLoading && <UploadLoader />}
    </div>
  );
};

export default DragNdDrop;
