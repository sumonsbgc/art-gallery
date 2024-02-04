import Image from 'next/image';
import React from 'react';

type CountryFlagProp = {
  flagUrl: string;
  country: string;
};

const CountryFlag = ({ flagUrl, country }: CountryFlagProp) => {
  return (
    <div className="flex gap-1 items-center">
      <Image src={flagUrl} alt={country} width="22" height="16" />
      <span className="font-light text-black text-sm">{country}</span>
    </div>
  );
};

export default CountryFlag;
