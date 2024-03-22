import React from 'react';
import Hero from '@/components/Hero';
import Link from 'next/link';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Footer />
    </>
  );
};

export default HomePage;
