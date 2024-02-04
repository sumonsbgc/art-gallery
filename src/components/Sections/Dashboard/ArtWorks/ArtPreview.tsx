'use client';
import Img from '@/components/common/Img';

const ArtPreview = ({ preview }: { preview: string }) => {
  return (
    <div className="relative w-full md:max-w-[610px] h-[330px] mx-auto">
      <Img src={preview && preview} alt="Image Art Upload" layout />
    </div>
  );
};

export default ArtPreview;
