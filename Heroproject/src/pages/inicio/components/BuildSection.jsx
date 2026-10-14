import { useState } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import Reveal from "../../../components/Reveal";
import { steps } from "../content";

export default function BuildSection() {
  const [selected, setSelected] = useState(0);
  return (
    <section
      className="build-section page-container"
      aria-labelledby="build-heading"
    >
      <Reveal distance={22} duration={0.5} className="build-copy">
        <span className="section-label">DA IDEIA À PRIMEIRA LINHA</span>
        <h2 className="section-title" id="build-heading">
          Você imagina.
          <br />O React constrói.
        </h2>
        <p className="section-copy">
          Aprenda fazendo. Cada detalhe desta experiência é uma oportunidade
          para explorar algo novo.
        </p>
        <div
          className="build-steps"
          role="group"
          aria-label="Etapas de construção"
        >
          {steps.map((step, index) => (
            <button
              key={step.title}
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
              className={selected === index ? "selected" : ""}
            >
              <span className="step-number">0{index + 1}</span>
              <span>
                <strong>{step.title}</strong>
                {selected === index && (
                  <span className="step-detail">{step.detail}</span>
                )}
              </span>
              <ChevronDown size={17} className="step-chevron" />
            </button>
          ))}
        </div>
      </Reveal>
      <Reveal distance={22} duration={0.5} className="code-window" delay={0.12}>
        <div className="code-toolbar">
          <div className="browser-dots">
            <i />
            <i />
            <i />
          </div>
          <span>{selected === 1 ? "responsive.css" : "YourNextIdea.jsx"}</span>
          <Code2 size={16} />
        </div>
        <div className="code-content" aria-live="polite">
          <span className="code-comment">
            // Pequenos componentes. Grandes possibilidades.
          </span>
          <pre>
            {steps[selected].code.map((line, i) => (
              <span
                className={`code-line code-line-${i}`}
                key={`${selected}-${i}`}
              >
                <span className="line-number" aria-hidden="true">
                  {i + 1}
                </span>
                {line}
                <br />
              </span>
            ))}
          </pre>
        </div>
        <div className="code-status">
          <span>
            <span className="live-dot" /> Pronto para experimentar
          </span>
          <span>React + Vite</span>
        </div>
      </Reveal>
    </section>
  );
}
