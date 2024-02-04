'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui';
import { useRouter } from 'next/navigation';

type SearchModalType = {
  onClose: () => void;
  open: boolean;
};

const SearchModal = ({ onClose, open }: SearchModalType) => {
  const searchRef = useRef(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const handler = (e: { target: any }) => {
      //@ts-ignore
      if (!searchRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [searchRef, onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('searchQuery', searchQuery);
    onClose();
    router.push(`/all-artwork/?search=${searchQuery}`);
  };

  const handleSearch = () => {
    onClose();
    router.push(`/all-artwork/?search=${searchQuery}`);
  };

  return (
    <div
      className={
        'w-[350px] sm:w-[380px] absolute top-[30px] sm:-top-[16px] -right-[165px] sm:right-0 bg-white z-30'
      }
      ref={searchRef}
    >
      <form
        className={`w-full h-[44px] border border-gray-950 flex items-center justify-center shadow-md transition-transform ease-in-out duration-1000 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        onSubmit={handleSubmit}
      >
        <div className="w-full flex relative">
          <input
            type="text"
            className="w-full h-[42px] px-2 bg-white text-gray-900"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by art name, artist name"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 z-20" onClick={handleSearch}>
            <Icon name="search" color="gray" size="16" />
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchModal;
