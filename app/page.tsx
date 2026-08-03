import AgeVerification from "@/components/common/AgeVerification";
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Featured from "@/components/home/Featured";
import About from "@/components/home/About";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Gallery from "@/components/home/Gallery";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <AgeVerification />

      <Header />
      <Hero />
      <Featured />
      <About />
      <WhyChooseUs />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}