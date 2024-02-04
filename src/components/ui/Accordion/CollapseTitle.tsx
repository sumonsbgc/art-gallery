import { Title } from '@/components/common';
type CollapseProps = { className?: string; title: string; isOpen: boolean; onClick: () => void };

const CollapseTitle = ({ title, isOpen, onClick, className }: CollapseProps) => {
  return (
    <div
      className={`flex gap-2 justify-between items-center border-b border-[#000]/10 py-[10px] cursor-pointer ${className} ${
        isOpen && 'border-none'
      }`}
      onClick={onClick}
    >
      <Title className="font-medium !text-base" content={title} />
      <span
        className="flex-shrink-0 bg-orange leading-relaxed text-white w-5 h-5 rounded-full flex items-center justify-center text-sm font-medium"
        dangerouslySetInnerHTML={{ __html: isOpen ? '&#8722;' : '&#43;' }}
      />
    </div>
  );
};

export default CollapseTitle;
