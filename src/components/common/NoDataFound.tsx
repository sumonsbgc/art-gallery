import { Text, Img } from '@/components/common';
import Link from 'next/link';

type NoDataFoundProps = {
  noBorder?: boolean;
  redirectToHome?: boolean;
  content?: string;
  className?: string;
};

const NoDataFound = ({
  noBorder = false,
  redirectToHome = false,
  content,
  className
}: NoDataFoundProps) => {
  return (
    <div
      className={`flex w-full flex-col justify-center items-center gap-4 ${
        noBorder ? '' : 'shadow-sm border border-slate-200 mx-auto h-96'
      } ${className}`}
    >
      <Img src="/assets/img/no-data-found.png" width={108} height={90} alt="No Art Found" />
      <Text>{content || 'Your filtering criteria is not able to find any Art'}</Text>
      {redirectToHome && (
        <Link
          href="/"
          className="block text-center mx-auto mt-8 w-[256px] bg-orange text-white text-sm font-bold uppercase px-8 py-3"
        >
          Go to home
        </Link>
      )}
    </div>
  );
};

export default NoDataFound;
