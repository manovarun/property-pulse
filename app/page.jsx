import React from 'react';
import Hero from '@/components/Hero';
import Link from 'next/link';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';
import HomeProperties from '@/components/HomeProperties';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
