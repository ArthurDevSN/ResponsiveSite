import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Layers3,
  Monitor,
  Play,
  Smartphone,
  Sparkles,
  WandSparkles,
  Zap,
} from "lucide-react";

const reveal = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } };

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={reveal}
      transition={{ duration: reduced ? 0 : 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

function SitePreview({ onStart }) {
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

const steps = [
  {
    title: "Dê forma à sua ideia",
    detail:
      "Comece pelo conteúdo. Transforme títulos, benefícios e chamadas em componentes que você pode reutilizar.",
    code: [
      "function Hero() {",
      "  return (",
      '    <section className="hero">',
      "      <h1>Sua ideia começa aqui.</h1>",
      "      <Button>Vamos criar</Button>",
      "    </section>",
      "  )",
      "}",
    ],
  },
  {
    title: "Faça caber em qualquer tela",
    detail:
      "Use grids flexíveis, espaçamentos consistentes e breakpoints. A boa experiência acompanha seu visitante.",
    code: [
      ".features {",
      "  display: grid;",
      "  gap: 1.5rem;",
      "  grid-template-columns:",
      "    repeat(auto-fit,",
      "      minmax(min(100%, 16rem), 1fr));",
      "}",
      "/* Do celular ao desktop. */",
    ],
  },
  {
    title: "Adicione um pouco de movimento",
    detail:
      "Animações suaves ajudam a contar sua história. Respeite as preferências de movimento e mantenha tudo acessível.",
    code: [
      "<motion.section",
      "  initial={{ opacity: 0, y: 20 }}",
      "  whileInView={{ opacity: 1, y: 0 }}",
      "  viewport={{ once: true }}",
      "  transition={{ duration: 0.5 }}",
      ">",
      "  <SuaProximaIdeia />",
      "</motion.section>",
    ],
  },
];

function BuildSection() {
  const [selected, setSelected] = useState(0);
  return (
    <section
      className="build-section page-container"
      aria-labelledby="build-heading"
    >
      <Reveal className="build-copy">
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
      <Reveal className="code-window" delay={0.12}>
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

const faqs = [
  [
    "Preciso conhecer React para começar?",
    "Não precisa dominar tudo. Na aba Aprender você encontra aulas curtas sobre componentes, layout responsivo e animações, com exemplos que pode experimentar no seu próprio projeto.",
  ],
  [
    "Este é um produto real ou um projeto de estudo?",
    "A Luma é um projeto de estudo de landing pages com React. A navegação, os filtros, as aulas e as prévias funcionam; os planos são demonstrativos e não há cobrança ou contratação.",
  ],
  [
    "O site se adapta ao celular?",
    "Sim. A navegação vira um menu no celular, os layouts reorganizam o conteúdo e os componentes se adaptam a diferentes larguras de tela. Experimente também o seletor Desktop / Mobile da demonstração.",
  ],
  [
    "Onde ficam os projetos que eu crio?",
    "O botão Começar projeto salva um rascunho com o nome e o modelo no armazenamento deste navegador. Esse rascunho não gera arquivos nem publica um site; ele ajuda a organizar a sua próxima ideia.",
  ],
];

export default function HomePage({ onStart }) {
  const [faq, setFaq] = useState(null);
  return (
    <>
      <section className="hero-section page-container">
        <Reveal className="hero-copy">
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
        <Reveal className="hero-preview-wrapper" delay={0.1}>
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
        <Reveal className="section-heading-row">
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
          {[
            {
              icon: Smartphone,
              title: "Uma experiência. Todas as telas.",
              text: "Do primeiro toque no celular ao último clique no desktop. Seu conteúdo sempre no lugar certo.",
              detail: "RESPONSIVIDADE",
              color: "violet",
            },
            {
              icon: WandSparkles,
              title: "Movimento com propósito.",
              text: "Transições que dão vida à interface e guiam o olhar. Sutileza que faz toda a diferença.",
              detail: "ANIMAÇÕES",
              color: "pink",
            },
            {
              icon: Braces,
              title: "Simples de criar. Fácil de evoluir.",
              text: "Componentes reutilizáveis para você explorar React, testar ideias e construir do seu jeito.",
              detail: "COMPONENTES",
              color: "mint",
            },
          ].map(({ icon: Icon, ...feature }, index) => (
            <Reveal
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
        <Reveal className="learning-banner-inner">
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
        <Reveal>
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
        <Reveal className="final-cta-inner">
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
