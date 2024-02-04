import { CriticsBanner, CriticsRegisterForm } from '@/components/Sections/Critics';
import Layout from '@/components/layout';
import NewsLetter from '@/components/Sections/Home/NewsLetter';

const CriticsRegister = () => {
  return (
    <Layout>
      <CriticsBanner />
      <CriticsRegisterForm />
      <NewsLetter newsLetterForm />
    </Layout>
  );
};

export default CriticsRegister;
