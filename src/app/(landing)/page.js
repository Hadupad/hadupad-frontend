// import '../../../styles/globals.css';  // Import global CSS

import Hero from '../../../components/Hero';
import FeaturedProperties from '../../../components/FeaturedProperties';
import ListingProperties from '../../../components/ListingProperties';
import TopDestinations from '../../../components/TopDestinations';
import AuthModalContainer from '../../../components/auth/AuthModalContainer'


export default function Home() {
  return (
   <>
   
            <Hero />
            <FeaturedProperties />
            <ListingProperties />
            <TopDestinations />
            <AuthModalContainer />
   </>
  );
}
