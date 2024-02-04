import { Img } from '@/components/common';
import React from 'react';
type FeatureType = {
  size: string;
  medium: string;
  material: string;
  isNotSoldAble: boolean;
};
const Feature = ({ size, medium, material, isNotSoldAble = false }: FeatureType) => {
  console.log(isNotSoldAble, 'SALEABLE');
  return (
    <div className="mb-8 relative">
      <p className="text-sm sm:text-base italic font-normal text-[#0F0F0F]">FEATURES</p>
      <ul className="list-disc ml-8">
        <li className="text-[#666] text-sm sm:text-base font-normal">
          {medium}, {material}
        </li>
        <li className="text-[#666] text-sm sm:text-base font-normal">Size: {size}</li>
        {/* <li className="text-[#666] text-sm sm:text-base font-normal">Shipping included</li>
        <li className="text-[#666] text-sm sm:text-base font-normal">
          14-day satisfaction guarantee
        </li> */}
      </ul>
      {isNotSoldAble && (
        <Img
          src="/assets/img/sold-out.png"
          width={137}
          height={118}
          alt="Sold Out"
          className="absolute right-0 -top-6 w-[120px] h-[110px] sm:w-[137px] sm:h-[118px]"
        />
      )}
    </div>
  );
};

export default Feature;
