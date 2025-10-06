import FeaturedCollections from './components/FeaturedCollections';
import RoomNavigation from './components/RoomNavigation';
import PersonalizedRecommendations from './components/Recommendations';
import CustomerTestimonials from './components/CustomerTestimonials';
import HeroSection from "./components/HeroSection";
import NewsletterSignup from './components/NewsletterSignup';

const HomePage = () => {
  return (
    <>
      <HeroSection/>
      <FeaturedCollections />
      <RoomNavigation />
      <PersonalizedRecommendations />
      <CustomerTestimonials />
      <NewsletterSignup />
    </>
  );
}

export default HomePage