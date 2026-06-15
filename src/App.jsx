import AnnounceBar from './components/AnnounceBar.jsx';
import Background from './components/Background.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Logos from './components/Logos.jsx';
import AgenticEra from './components/AgenticEra.jsx';
import Insight from './components/Insight.jsx';
import Features from './components/Features.jsx';
import Workflows from './components/Workflows.jsx';
import Sdk from './components/Sdk.jsx';
import Audience from './components/Audience.jsx';
import Cta from './components/Cta.jsx';
import Footer from './components/Footer.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';

export default function App() {
  useScrollReveal();

  return (
    <>
      <AnnounceBar />
      <Background />
      <Nav />
      <main>
        <Hero />
        <Logos />
        <AgenticEra />
        <Insight />
        <Features />
        <Workflows />
        <Sdk />
        <Audience />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
