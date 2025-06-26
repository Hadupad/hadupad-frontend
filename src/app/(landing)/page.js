"use client"
import { useState } from "react";
import AuthModalContainer from "../../../components/auth/AuthModalContainer";
import Hero from '../../../components/Hero';
import FeaturedProperties from '../../../components/FeaturedProperties';
import ListingProperties from '../../../components/ListingProperties';
import TopDestinations from '../../../components/TopDestinations';

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div>
      <Hero />
            <FeaturedProperties />
            <ListingProperties />
            <TopDestinations />
            <AuthModalContainer />
      {/* <button onClick={() => setIsAuthModalOpen(true)}>Sign Up</button> */}
      
      <AuthModalContainer 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}
