import { Metadata } from 'next';

// components
import Layout from '@/components/layout';
import Home from '@/components/Sections/Home';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page'
};

const HomePage = () => {
  return (
    <Layout headerBottomBorder={false}>
      <Home />
    </Layout>
  );
};

export default HomePage;
