import ArtistLayoutWrapper from '@/components/dashboard/artist/layout';

const ArtistLayout = ({ children }: { children: React.ReactNode }) => {
  return <ArtistLayoutWrapper>{children}</ArtistLayoutWrapper>;
};

export default ArtistLayout;
