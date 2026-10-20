import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Problem from './components/Problem.jsx';
import Alignment from './components/Alignment.jsx';
import Agents from './components/Agents.jsx';
import Stop from './components/Stop.jsx';
import Pipeline from './components/Pipeline.jsx';
import Journey from './components/Journey.jsx';
import Compare from './components/Compare.jsx';
import Faq from './components/Faq.jsx';
import Cta from './components/Cta.jsx';
import Footer from './components/Footer.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import { PersonaProvider } from './hooks/usePersona.jsx';
import { useScrollReveal } from './hooks/useScrollReveal.js';
import { useAnalytics } from './hooks/useAnalytics.js';

export default function App() {
  useScrollReveal();
  useAnalytics();
  return (
    <PersonaProvider>
      <Nav />
      <ThemeToggle />
      <main>
        <Hero />
        <Pipeline />
        <Problem />
        <Alignment />
        <Agents />
        <Stop />
        <Journey />
        <Compare />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </PersonaProvider>
  );
}
