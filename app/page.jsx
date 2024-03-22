import React from 'react';
import Hero from '@/components/Hero';
import Link from 'next/link';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';
import HomeProperties from '@/components/HomeProperties';
import connectDB from '@/config/database';

const HomePage = () => {
  connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
