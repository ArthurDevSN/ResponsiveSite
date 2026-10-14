import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Layers3,
  Play,
  WandSparkles,
  Zap,
} from "lucide-react";
import Reveal from "../../components/Reveal";
import SitePreview from "./components/SitePreview";
import BuildSection from "./components/BuildSection";
import { faqs, homeFeatures } from "./content";
import "./InicioPage.css";

export default function InicioPage({ onStart }) {
  const [faq, setFaq] = useState(null);
  return (
    <>
      <section className="hero-section page-container">
        <Reveal distance={22} duration={0.5} className="hero-copy">
          <span className="hero-badge">
            <span className="live-dot" /> SUA IDEIA, O PRÓXIMO NÍVEL{" "}
            <ArrowUpRight size={13} />
          </span>
          <h1>
            Sua próxima ideia
            <br />
            merece uma página
            <br />
            <span>incrível.</span>
            <svg
              className="hero-underline"
              viewBox="0 0 260 13"
              aria-hidden="true"
            >
              <path d="M3 9 Q115 -3 254 5" />
            </svg>
          </h1>
          <p>
            Transforme criatividade em experiências digitais.
            <br className="desktop-break" /> Explore, aprenda e construa landing
            pages com React que fazem a diferença.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => onStart()}>
              Começar meu projeto <ArrowUpRight size={18} />
            </button>
            <a className="secondary-button" href="#/solucoes">
              <Play size={14} /> Explorar modelos
            </a>
          </div>
          <div className="hero-footnote">
            <span>
              <Check size={14} /> Responsivo por natureza
            </span>
            <span>
              <Check size={14} /> Criado para aprender
            </span>
          </div>
        </Reveal>
        <Reveal
          distance={22}
          duration={0.5}
          className="hero-preview-wrapper"
          delay={0.1}
        >
          <SitePreview onStart={onStart} />
        </Reveal>
      </section>
      <section
        className="stack-strip page-container"
        aria-label="Tecnologias usadas"
      >
        <span>BOAS IDEIAS, BOAS FERRAMENTAS.</span>
        <div>
          <span>
            <Braces size={22} /> React
          </span>
          <span>
            <Zap size={20} /> Vite
          </span>
          <span>
            <Layers3 size={21} /> Tailwind CSS
          </span>
          <span>
            <WandSparkles size={20} /> Framer Motion
          </span>
        </div>
      </section>
      <section
        className="features-section page-container"
        aria-labelledby="features-title"
      >
        <Reveal distance={22} duration={0.5} className="section-heading-row">
          <div>
            <span className="section-label">CADA DETALHE CONTA</span>
            <h2 className="section-title" id="features-title">
              Bonito é só o começo.
            </h2>
          </div>
          <a className="text-link" href="#/recursos">
            Conheça todos os recursos <ArrowRight size={16} />
          </a>
        </Reveal>
        <div className="home-feature-grid">
          {homeFeatures.map(({ icon: Icon, ...feature }, index) => (
            <Reveal
              distance={22}
              duration={0.5}
              className={`home-feature feature-${feature.color}`}
              key={feature.title}
              delay={index * 0.06}
            >
              <div className="feature-icon">
                <Icon size={25} />
              </div>
              <span className="feature-detail">{feature.detail}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <a
                href="#/recursos"
                aria-label={`Explorar ${feature.detail.toLowerCase()}`}
                className="feature-arrow"
              >
                <ArrowUpRight size={21} />
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <BuildSection />
      <section className="learning-banner page-container">
        <Reveal distance={22} duration={0.5} className="learning-banner-inner">
          <div className="learning-visual" aria-hidden="true">
            <span className="learning-brace">{"{"}</span>
            <div>
              <span className="learning-path">
                <i />
                <i />
                <i />
              </span>
              <Code2 size={38} />
              <small>learn. build. repeat.</small>
            </div>
            <span className="learning-brace">{"}"}</span>
          </div>
          <div>
            <span className="section-label">CURIOSIDADE VIRA CONHECIMENTO</span>
            <h2 className="section-title">
              Seu próximo passo
              <br />
              começa com uma ideia.
            </h2>
            <p className="section-copy">
              De um componente simples a uma página completa.
              <br />
              Explore a trilha e aprenda no seu ritmo.
            </p>
            <a href="#/aprender" className="text-link">
              Explorar a trilha de aprendizado <ArrowRight size={17} />
            </a>
          </div>
        </Reveal>
      </section>
      <section
        className="faq-section page-container"
        aria-labelledby="faq-title"
      >
        <Reveal distance={22} duration={0.5}>
          <span className="section-label">VAMOS DESCOMPLICAR</span>
          <h2 className="section-title" id="faq-title">
            Boas perguntas.
            <br />
            Respostas simples.
          </h2>
          <p className="section-copy">
            Um pouco mais sobre o projeto
            <br />e as possibilidades que ele abre.
          </p>
        </Reveal>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <h3>
                <button
                  aria-expanded={faq === index}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setFaq(faq === index ? null : index)}
                >
                  {question}
                  <ChevronDown
                    size={18}
                    className={faq === index ? "rotated" : ""}
                  />
                </button>
              </h3>
              <div id={`faq-answer-${index}`} hidden={faq !== index}>
                <p>{answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="final-cta page-container">
        <Reveal distance={22} duration={0.5} className="final-cta-inner">
          <div>
            <span className="section-label">DO “E SE?” AO “FIZ.”</span>
            <h2>Sua ideia merece sair do papel.</h2>
            <p>O próximo projeto incrível pode ser o seu.</p>
          </div>
          <button className="primary-button" onClick={() => onStart()}>
            Vamos construir <ArrowUpRight size={18} />
          </button>
          <span className="cta-orbit" aria-hidden="true" />
        </Reveal>
      </section>
      <button
        className="back-to-top text-link"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "instant"
              : "smooth",
          });
          document
            .getElementById("main-content")
            ?.focus({ preventScroll: true });
        }}
      >
        Voltar ao início <ArrowDown size={15} />
      </button>
    </>
  );
}
