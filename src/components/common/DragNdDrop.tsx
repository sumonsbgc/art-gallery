/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui';
import Swal from 'sweetalert2';
import { Text } from '.';
import { useUploadImgMutation } from '@/redux/features/arts/artsApi';
import { getUserSessionId } from '@/utils';
import UploadLoader from './UploadLoader';

const isFileTypeApproved = (file: File) => {
  const approvedExtensions = ['.jpg', '.jpeg', '.png'];
  const fileName = file.name.toLocaleLowerCase();
  return approvedExtensions.some((extension: string) => fileName.endsWith(extension));
};

type DragNdDropPropType = {
  handleImgUpload: React.Dispatch<React.SetStateAction<boolean>>;
  handleFile: React.Dispatch<React.SetStateAction<string | null>>;
  handlePreview: React.Dispatch<React.SetStateAction<string>>;
};

const DragNdDrop = ({ handleImgUpload, handleFile, handlePreview }: DragNdDropPropType) => {
  const [uploadError, setUploadErrors] = useState('');
  const [uploadImg, { isLoading, isSuccess, data }] = useUploadImgMutation({});
  const [fileList, setFileList] = useState<File | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const dragEnter = () => uploadRef.current?.classList.add('drag-over');
  const dragLeave = () => uploadRef.current?.classList.remove('drag-over');
  const onDrop = () => uploadRef.current?.classList.remove('drag-over');

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file.size, 'FILE SIZE');
      if (isFileTypeApproved(file) && file.size < 5242880) {
        setFileList(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          handlePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setUploadErrors(
          file.size > 5242880
            ? 'Maximum file upload size is not greater than 5MB'
            : 'The Approved file type is .png and .jpg or .jpeg'
        );
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
      console.log('ART UPLOAD IMG', data?.data?.first?.[0]?.item_file_name);
      const fastItemList = data?.data?.first;
      const lastItem = fastItemList[fastItemList?.length - 1];
      handleFile(lastItem?.item_file_name);
      // handleFile(data?.data?.first?.[0]?.item_file_name);
      handleImgUpload(true);
    }
  }, [isLoading, data, isSuccess]);

  useEffect(() => {
    if (uploadError !== '') {
      Swal.fire({
        title: 'File Upload Error',
        text: uploadError,
        customClass: {
          htmlContainer: 'font-medium text-sm text-gray',
          confirmButton: '!bg-orange w-[170px] focus:!shadow-none'
        }
      });
      setUploadErrors('');
    }
  }, [uploadError]);

  return (
    <div
      ref={uploadRef}
      className="bg-[#F9F9F9] relative pt-14 pb-28 flex flex-col items-center gap-6 text-center cursor-pointer"
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={onDrop}
    >
      <Icon name="upload" size="60" />
      <Text className="italic !text-black">Drag your photo here to get started</Text>
      <Text className="">OR</Text>
      <label className="text-white bg-orange px-8 py-3 cursor-pointer text-sm font-medium">
        Browse Your Computer
      </label>
      <input
        type="file"
        className="opacity-0 absolute w-full h-full top-0 left-0"
        onChange={onFileDrop}
        name="art"
      />
      {isLoading && <UploadLoader />}
    </div>
  );
};

export default DragNdDrop;
