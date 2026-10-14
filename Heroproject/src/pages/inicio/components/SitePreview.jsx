import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Braces,
  Check,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";

export default function SitePreview({ onStart }) {
  const [device, setDevice] = useState("desktop");
  const reduced = useReducedMotion();
  return (
    <div className="hero-visual">
      <div className="preview-orbit orbit-one" />
      <div className="preview-orbit orbit-two" />
      <motion.div
        className="floating-tag tag-components"
        animate={reduced ? {} : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="tag-icon">
          <Braces size={18} />
        </span>
        <div>
          Feito com React<small>Uma ideia. Infinitas possibilidades.</small>
        </div>
      </motion.div>
      <div
        className={`browser-preview ${device === "mobile" ? "is-mobile" : ""}`}
      >
        <div className="browser-toolbar">
          <div className="browser-dots">
            <i />
            <i />
            <i />
          </div>
          <span>seuprojeto.com.br</span>
          <span className="browser-toolbar-icon">
            <ArrowUpRight size={13} />
          </span>
        </div>
        <div className="sample-site">
          <div className="sample-nav">
            <span>
              <Sparkles size={13} /> studio.
            </span>
            <span>
              sobre <span className="sample-nav-work">projetos</span>
              <ArrowUpRight size={13} />
            </span>
          </div>
          <div className="sample-hero">
            <div className="sample-eyebrow">CRIATIVIDADE SEM LIMITES</div>
            <h2>
              Ideias que
              <br />
              ganham <em>vida.</em>
            </h2>
            <p>
              Um novo jeito de conectar sua marca
              <br />
              ao que realmente importa.
            </p>
            <button
              onClick={() => onStart("Studio criativo")}
              className="sample-cta"
            >
              Vamos criar <ArrowUpRight size={13} />
            </button>
            <div className="sample-sculpture" aria-hidden="true">
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
          <div className="sample-bottom">
            <div>
              <span>01 / DESIGN</span>
              <strong>
                Menos do mesmo.
                <br />
                Mais de você.
              </strong>
            </div>
            <div className="sample-art" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="floating-tag tag-live"
        animate={reduced ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="live-dot" /> Design responsivo <Check size={14} />
      </motion.div>
      <div
        className="device-controls"
        role="group"
        aria-label="Tamanho da demonstração"
      >
        <button
          aria-pressed={device === "desktop"}
          onClick={() => setDevice("desktop")}
        >
          <Monitor size={15} /> Desktop
        </button>
        <button
          aria-pressed={device === "mobile"}
          onClick={() => setDevice("mobile")}
        >
          <Smartphone size={15} /> Mobile
        </button>
      </div>
    </div>
  );
}
