import AnnounceBar from './components/AnnounceBar.jsx';
import Background from './components/Background.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import AgenticReliability from './components/AgenticReliability.jsx';
import Thesis from './components/Thesis.jsx';
import Insight from './components/Insight.jsx';
import Architecture from './components/Architecture.jsx';
import Workflows from './components/Workflows.jsx';
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
        <AgenticReliability />
        <Workflows />
        <Thesis />
        <Insight />
        <Architecture />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
