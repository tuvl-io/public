import AnnounceBar from './components/AnnounceBar.jsx';
import Background from './components/Background.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Determinism from './components/Determinism.jsx';
import AgentContract from './components/AgentContract.jsx';
import UseCases from './components/UseCases.jsx';
import Insight from './components/Insight.jsx';
import Comparison from './components/Comparison.jsx';
import WhyAdopt from './components/WhyAdopt.jsx';
import Cta from './components/Cta.jsx';
import Footer from './components/Footer.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { usePointerGlow } from './hooks/usePointerGlow.js';
import { useAnalytics } from './hooks/useAnalytics.js';

export default function App() {
  useScrollReveal();
  usePointerGlow();
  useAnalytics();

  return (
    <>
      <AnnounceBar />
      <Background />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <Determinism />
        <AgentContract />
        <UseCases />
        <Insight />
        <Comparison />
        <WhyAdopt />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
