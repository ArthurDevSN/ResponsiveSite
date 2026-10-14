import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import PageIntro from "../../components/PageIntro";
import Reveal from "../../components/Reveal";
import { templates } from "./content";
import "./SolucoesPage.css";

function TemplatePreview({ template }) {
  const Icon = template.icon;
  return (
    <div
      className={`pg-template-preview pg-theme-${template.color}`}
      aria-hidden="true"
    >
      <div className="pg-template-nav">
        <b>{template.brand}</b>
        <span>
          <i />
          <i />
        </span>
        <small>Começar ↗</small>
      </div>
      <div className="pg-template-hero">
        <div>
          <span>IDEIAS QUE MERECEM UM LUGAR</span>
          <strong>
            {template.headline.split("\n").map((line, index) => (
              <span key={line} className={index ? "pg-preview-emphasis" : ""}>
                {line}
              </span>
            ))}
          </strong>
          <i className="pg-template-line" />
          <i className="pg-template-line pg-line-short" />
          <small>
            Descubra mais <ArrowRight size={9} />
          </small>
        </div>
        <div className="pg-template-art">
          <span />
          <span />
          <Icon size={43} strokeWidth={1.2} />
        </div>
      </div>
      <div className="pg-template-strip">
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

export default function SolucoesPage({ onStart, onNavigate }) {
  const [filter, setFilter] = useState("Todos");
  const reduced = useReducedMotion();
  const filtered = templates.filter(
    (template) => filter === "Todos" || template.category === filter,
  );
  return (
    <div className="page-container secondary-page">
      <PageIntro
        label="Um começo para cada ideia"
        title={
          <>
            Escolha uma direção.
            <br />
            <span className="pg-accent">Faça do seu jeito.</span>
          </>
        }
        description="Inspire-se em layouts feitos para diferentes objetivos. Explore as composições e escolha o ponto de partida do seu próximo projeto."
      />
      <div className="pg-filter-row">
        <div
          className="pg-filter-chips"
          role="group"
          aria-label="Categoria dos templates"
        >
          {["Todos", "Negócios", "Portfólio", "Produto"].map((category) => (
            <button
              type="button"
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
              key={category}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="pg-result-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "template" : "templates"}{" "}
          para explorar
        </span>
      </div>
      <motion.div layout={!reduced} className="pg-template-grid">
        <AnimatePresence mode="popLayout">
          {filtered.map((template) => (
            <motion.article
              className="pg-template-card"
              layout={!reduced}
              key={template.name}
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              <TemplatePreview template={template} />
              <div className="pg-template-info">
                <div className="pg-template-title">
                  <h2>{template.name}</h2>
                  <span>{template.tag}</span>
                </div>
                <p>{template.description}</p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => onStart(template.name)}
                >
                  Usar este template <ArrowRight size={15} />
                </button>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <Reveal className="pg-callout">
        <span className="pg-callout-icon">
          <Code2 size={27} strokeWidth={1.4} />
        </span>
        <div>
          <h2>Mais que um visual. Um aprendizado.</h2>
          <p>
            Entenda como componentes, estilos e interações se conectam para
            construir uma página completa.
          </p>
        </div>
        <button
          type="button"
          className="secondary-button"
          onClick={() => onNavigate("aprender")}
        >
          Explorar as aulas <ArrowRight size={16} />
        </button>
      </Reveal>
    </div>
  );
}
