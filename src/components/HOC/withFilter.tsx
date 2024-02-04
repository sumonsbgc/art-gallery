'use client';
import React, { ComponentType, useEffect, useState } from 'react';

type HocType = {
  WrappedComponent: ComponentType<{ art: string }>;
};

export default function WithFilter({ WrappedComponent }: HocType) {
  const WithFilter = (props: string) => {
    const [test, setTest] = useState<string>('');

    useEffect(() => {
      setTest(props);
    }, [props]);

    return <WrappedComponent art={test} />;
  };

  return WithFilter;
}
