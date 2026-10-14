import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Layers3,
  Monitor,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  Zap,
} from "lucide-react";
import PageIntro from "../../components/PageIntro";
import Reveal from "../../components/Reveal";
import { demoTabs, features } from "./content";
import "./RecursosPage.css";

export default function RecursosPage({ onStart, onNavigate }) {
  const [selected, setSelected] = useState("estrutura");
  const [device, setDevice] = useState("desktop");
  const [replay, setReplay] = useState(0);
  const reduced = useReducedMotion();
  const demo = demoTabs.find((tab) => tab.id === selected);
  const selectTabWithKeyboard = (event, index) => {
    const keys = {
      ArrowRight: (index + 1) % 3,
      ArrowLeft: (index + 2) % 3,
      Home: 0,
      End: 2,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = demoTabs[keys[event.key]];
    setSelected(next.id);
    document.getElementById(`pg-demo-tab-${next.id}`)?.focus();
  };
  return (
    <div className="page-container secondary-page">
      <PageIntro
        label="Tudo começa com uma boa base"
        title={
          <>
            Do primeiro componente
            <br />à última interação.
          </>
        }
        description="Explore os recursos que dão vida a uma landing page. Design, código e experiência trabalhando juntos."
      />
      <div className="pg-feature-grid">
        {features.map(({ icon: Icon, name, text }, index) => (
          <Reveal className="pg-feature-card" key={name} delay={index * 0.035}>
            <span className="pg-feature-icon">
              <Icon size={22} aria-hidden="true" />
            </span>
            <h2>{name}</h2>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="pg-lab">
        <div className="pg-lab-heading">
          <div>
            <span className="section-label">Um pequeno laboratório</span>
            <h2>Veja a ideia em ação.</h2>
          </div>
          <span className="pg-live-label">
            <i /> Playground interativo
          </span>
        </div>
        <div
          className="pg-demo-tabs"
          role="tablist"
          aria-label="Demonstrações de recursos"
        >
          {demoTabs.map(({ id, label, icon: Icon }, index) => (
            <button
              type="button"
              key={id}
              id={`pg-demo-tab-${id}`}
              role="tab"
              aria-selected={selected === id}
              aria-controls="pg-demo-panel"
              tabIndex={selected === id ? 0 : -1}
              onClick={() => setSelected(id)}
              onKeyDown={(event) => selectTabWithKeyboard(event, index)}
            >
              <Icon size={16} aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        <div
          className="pg-demo-panel"
          id="pg-demo-panel"
          role="tabpanel"
          aria-labelledby={`pg-demo-tab-${selected}`}
          tabIndex={0}
        >
          <div className="pg-demo-visual">
            <div className="pg-demo-toolbar">
              <span>preview.react</span>
              {selected === "responsivo" ? (
                <div
                  className="pg-device-group"
                  role="group"
                  aria-label="Largura da demonstração"
                >
                  {[
                    { id: "mobile", label: "Celular", icon: Smartphone },
                    { id: "tablet", label: "Tablet", icon: Tablet },
                    { id: "desktop", label: "Desktop", icon: Monitor },
                  ].map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-label={label}
                      aria-pressed={device === id}
                      onClick={() => setDevice(id)}
                    >
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              ) : (
                <span className="pg-preview-dot" aria-hidden="true" />
              )}
            </div>
            <div className="pg-demo-stage">
              <motion.div
                key={`${selected}-${replay}`}
                className={`pg-demo-site ${selected === "responsivo" ? `pg-device-${device}` : ""}`}
                initial={
                  selected === "animacao" && !reduced
                    ? { opacity: 0, y: 24, scale: 0.96 }
                    : false
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: reduced ? 0 : 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="pg-wire-nav">
                  <span>
                    <i /> sua.marca
                  </span>
                  <span className="pg-wire-links">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <div className="pg-wire-hero">
                  <div>
                    <small>FEITO PARA SUA PRÓXIMA IDEIA</small>
                    <strong>
                      Seu projeto.
                      <br />
                      <em>Novas possibilidades.</em>
                    </strong>
                    <p>Um bom começo para algo incrível.</p>
                    <span className="pg-wire-button">
                      Explore o futuro <ArrowRight size={10} />
                    </span>
                  </div>
                  <div className="pg-wire-art">
                    <Layers3 size={44} strokeWidth={1} />
                    <span className="pg-art-orbit" />
                  </div>
                </div>
                <div className="pg-wire-cards">
                  {[Layers3, Zap, Sparkles].map((Icon, index) => (
                    <div key={index}>
                      <Icon size={16} />
                      <i />
                      <i />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
            {selected === "animacao" && (
              <button
                type="button"
                className="pg-replay"
                onClick={() => setReplay((value) => value + 1)}
              >
                <RotateCcw size={14} /> Repetir animação
              </button>
            )}
          </div>
          <div className="pg-demo-explanation">
            <h3>{demo.heading}</h3>
            <p>{demo.copy}</p>
            <pre>
              <code>{demo.code}</code>
            </pre>
            <button
              type="button"
              className="text-link"
              onClick={() => onNavigate("aprender")}
            >
              Aprenda na prática <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </Reveal>
      <div className="pg-bottom-cta">
        <h2>Sua próxima página começa aqui.</h2>
        <button
          type="button"
          className="primary-button"
          onClick={() => onStart("Essencial")}
        >
          Começar um projeto <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
