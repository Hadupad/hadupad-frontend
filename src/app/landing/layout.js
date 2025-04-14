import NavBar from '../../../components/NavBar';
import Hero from '../../../components/Hero';
import FeaturedProperties from '../../../components/FeaturedProperties';
import ListingProperties from '../../../components/ListingProperties';
import TopDestinations from '../../../components/TopDestinations';
import Footer from '../../../components/Footer';

export default function LandingLayout() {
    return(
        <>
            <NavBar />
            <Hero />
            <FeaturedProperties />
            <ListingProperties />
            <TopDestinations />
            <Footer />
        </>
    )
}