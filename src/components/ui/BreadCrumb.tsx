import React from 'react';
import { Icon } from '.';
// import Link from 'next/link';

type BreadCrumbProps = {
  items?: string[];
  parentPage: string;
  currentPage: string;
};

const BreadCrumb = ({ items, parentPage, currentPage }: BreadCrumbProps) => {
  return (
    <div className="breadcrumb">
      <ul className="flex gap-2 items-center py-4">
        <li className="flex items-start">
          <Icon name="home" color="gray" size="16" />
        </li>
        <li className="text-gray text-base font-normal capitalize">{parentPage} /</li>
        {items && Array.isArray(items) && items?.length > 0
          ? items.map((item, index) => (
              <li key={index} className="text-gray text-base font-normal capitalize">
                {item} /{' '}
              </li>
            ))
          : null}
        <li className="text-base text-black font-normal capitalize">{currentPage}</li>
      </ul>
    </div>
  );
};

export default BreadCrumb;
