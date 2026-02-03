import React, { Suspense } from "react";
import ScrollProgress from "../components/ScrollProgress";
import Hero from "../sections/Hero";
import Navbar from "../sections/Navbar";

const About = React.lazy(() => import("../sections/About"));
const Projects = React.lazy(() => import("../sections/Projects"));
const Experiences = React.lazy(() => import("../sections/Experiences"));
const Contact = React.lazy(() => import("../sections/Contact"));
const Footer = React.lazy(() => import("../sections/Footer"));

const Home = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="py-12 text-center text-neutral-400">Loading content...</div>}>
        <About />
        <Projects />
        <Experiences />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
