import { HeroSection, HowItWorks, FAQSection } from '@/components/home';

import { Pgx } from '@/components/pgx';
import { Tech, ProtocolStack, SchemaValidator } from '@/components/tech';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Pgx />
      <ProtocolStack />
      <SchemaValidator />
      <Tech />
      <HowItWorks />
      <FAQSection />
    </>
  );
}
