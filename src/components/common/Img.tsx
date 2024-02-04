'use client';
import Image from 'next/image';
import React from 'react';

type ImgProps = {
  src: string;
  alt: string;
  layout?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  onClick?: () => void;
};

const Img = ({ src, alt, layout, height, width, className, onClick, sizes }: ImgProps) => {
  return layout ? (
    <Image
      src={src}
      alt={alt}
      fill={true}
      className={`!relative object-cover transition-opacity opacity-0 duration-[2s] ${className}`}
      loading="eager"
      onClick={onClick}
      // @ts-ignore
      onLoad={(e) => e.target.classList.remove('opacity-0')}
      sizes={sizes || '(max-width: 768px) 1000px, (max-width: 1200px) 1500px, 1600px'}
      quality={100}
      priority
      onError={(e) => console.error('img error', e)}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover transition-opacity opacity-0 duration-[2s] ${className}`}
      loading="eager"
      onClick={onClick}
      // @ts-ignore
      onLoad={(e) => e.target.classList.remove('opacity-0')}
      sizes={sizes || '(max-width: 768px) 1000px, (max-width: 1200px) 1500px, 1600px'}
      quality={100}
      priority
      onError={(e) => console.error('img error', e)}
    />
  );
};

export default Img;
