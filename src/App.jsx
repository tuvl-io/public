import AnnounceBar from './components/AnnounceBar.jsx';
import Background from './components/Background.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Features from './components/Features.jsx';
import UseCases from './components/UseCases.jsx';
import Insight from './components/Insight.jsx';
import PoweredBy from './components/PoweredBy.jsx';
import Cta from './components/Cta.jsx';
import Footer from './components/Footer.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { usePointerGlow } from './hooks/usePointerGlow.js';

export default function App() {
  useScrollReveal();
  usePointerGlow();

  return (
    <>
      <AnnounceBar />
      <Background />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <UseCases />
        <Insight />
        <PoweredBy />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
