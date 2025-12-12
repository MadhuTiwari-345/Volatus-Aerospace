import React from 'react';
import { Hero } from '../components/Hero';
import { Divisions } from '../components/Divisions';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { NewsInsights } from '../components/NewsInsights';
import { CallToAction } from '../components/CallToAction';
import { Documentation } from '../components/Documentation';

export const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Divisions />
      <FeaturedProducts />
      <NewsInsights />
      <CallToAction />
      {/* Keeping documentation at the bottom for demo context */}
      <Documentation />
    </main>
  );
};