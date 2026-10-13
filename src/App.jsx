import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Guarantees from './components/Guarantees.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Agents from './components/Agents.jsx';
import Compare from './components/Compare.jsx';
import Cta from './components/Cta.jsx';
import Footer from './components/Footer.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useAnalytics } from './hooks/useAnalytics.js';

export default function App() {
  useScrollReveal();
  useAnalytics();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Guarantees />
        <HowItWorks />
        <Agents />
        <Compare />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
