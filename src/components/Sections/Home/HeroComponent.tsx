import Link from 'next/link';
import { Icon } from '../../ui';

const HeroComponent = () => {
  return (
    <section className="home-hero-section h-[435px] sm:h-[510px] lg:h-[580px]">
      <video
        autoPlay
        muted
        loop
        className="video z-0 sm:flex hidden"
        poster="/assets/img/video-player.gif"
      >
        <source src="https://artgradetemp.s3.amazonaws.com/Re8+Me1+-LOW.mp4" type="video/mp4" />
      </video>
      <video
        autoPlay
        muted
        loop
        className="mobile-video z-0 sm:hidden flex"
        poster="/assets/img/video-player.gif"
      >
        <source src="https://artgradetemp.s3.amazonaws.com/Re9+Me1+393x480.mp4" type="video/mp4" />
      </video>
      <Link className="explorer-btn" href="/all-artwork">
        EXPLORE NOW <Icon name="arrow-right-long" size="15" color="white" />
      </Link>
    </section>
  );
};

export default HeroComponent;
