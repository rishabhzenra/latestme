import ParticleCanvas from "@/components/ParticleCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TabSection from "@/components/TabSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <ParticleCanvas />
      <Nav />
      <Hero />
      <TabSection />
      <Footer />
    </main>
  );
}
