import { Text, Title } from '..';

type StateProp = {
  text: string;
  title: string;
  textClass?: string;
  titleClass?: string;
};

const State = ({ text, title, textClass, titleClass }: StateProp) => {
  return (
    <div className="stat place-items-center border-black/20">
      <Text className={`italic text-black font-light !text-xl ${textClass}`}>{text}</Text>
      <Title content={title} className={`font-bold !text-4xl text-black ${titleClass}`} />
    </div>
  );
};

export default State;
