import CollapseTitle from './CollapseTitle';
import CollapseContent from './CollapseContent';

type AccordionProps = {
  title: string;
  isOpen: boolean;
  content: string;
  onToggle: () => void;
};

const Accordion = ({ title, isOpen, content, onToggle }: AccordionProps) => {
  return (
    <div className="mb-3 overflow-y-hidden">
      <CollapseTitle title={title} isOpen={isOpen} onClick={onToggle} />
      <div className={`accordion-content ${isOpen && 'open'}`}>
        <CollapseContent content={content} />
      </div>
    </div>
  );
};

export default Accordion;
