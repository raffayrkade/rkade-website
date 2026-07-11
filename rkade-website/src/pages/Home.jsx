import React from 'react';
import Hero from '@/components/home/Hero';
import Problem from '@/components/home/Problem';
import ServiceTiers from '@/components/home/ServiceTiers';
import WhyRkade from '@/components/home/WhyRkade';
import HowItWorks from '@/components/home/HowItWorks';
import Industries from '@/components/home/Industries';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <ServiceTiers />
      <WhyRkade />
      <HowItWorks />
      <Industries />
      <CTASection />
    </>
  );
}
