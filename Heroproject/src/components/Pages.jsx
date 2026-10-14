import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Layers3,
  Monitor,
  MousePointer2,
  Palette,
  RotateCcw,
  Smartphone,
  Sparkles,
  Tablet,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";
import "./Pages.css";

function PageIntro({ label, title, description, children }) {
  return (
    <header className="pg-intro">
      <span className="section-label">{label}</span>
      <h1 className="section-title">{title}</h1>
      <p className="section-copy">{description}</p>
      {children}
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: Layers3,
    name: "Componentes que se conectam",
    text: "Separe sua página em peças reutilizáveis. Uma mudança no componente, uma experiência consistente.",
  },
  {
    icon: Smartphone,
    name: "Cada tela conta",
    text: "Construa com grids flexíveis e pontos de quebra que respeitam o conteúdo, do celular ao desktop.",
  },
  {
    icon: Sparkles,
    name: "Movimento com intenção",
    text: "Transições suaves guiam o olhar e dão feedback, com respeito à preferência por menos movimento.",
  },
  {
    icon: Palette,
    name: "Sua identidade, em cada detalhe",
    text: "Cores, tipografia e espaçamentos trabalham juntos para criar uma linguagem visual coerente.",
  },
  {
    icon: MousePointer2,
    name: "Interações de verdade",
    text: "Menus, filtros, formulários e estados de interface transformam um layout em uma experiência.",
  },
  {
    icon: Code2,
    name: "Aprenda fazendo",
    text: "Explore exemplos práticos de React e CSS. Entenda a decisão por trás de cada linha de código.",
  },
];
const demoTabs = [
  {
    id: "estrutura",
    label: "Estrutura",
    icon: Layers3,
    heading: "Pequenas peças. Uma grande experiência.",
    copy: "Header, Hero e Cards são componentes independentes. Com props, o mesmo card pode apresentar conteúdos diferentes.",
    code: '<Page>\n  <Header />\n  <Hero title="Sua próxima ideia" />\n  <FeatureGrid items={features} />\n</Page>',
  },
  {
    id: "responsivo",
    label: "Responsividade",
    icon: Monitor,
    heading: "O conteúdo encontra seu espaço.",
    copy: "Experimente os tamanhos abaixo. Um grid flexível reorganiza os elementos quando a largura muda.",
    code: ".cards {\n  display: grid;\n  grid-template-columns:\n    repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}",
  },
  {
    id: "animacao",
    label: "Animação",
    icon: Sparkles,
    heading: "Detalhes que fazem a diferença.",
    copy: "Uma entrada sutil dá ritmo à página. Com useReducedMotion, a experiência também respeita quem prefere menos animações.",
    code: "const reduced = useReducedMotion()\n\n<motion.div\n  initial={reduced ? false : { y: 16, opacity: 0 }}\n  animate={{ y: 0, opacity: 1 }}\n/>",
  },
];

export function RecursosPage({ onStart, onNavigate }) {
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

const templates = [
  {
    name: "Essencial",
    category: "Negócios",
    color: "lavender",
    brand: "arc.",
    headline: "Grandes ideias.\nNovos caminhos.",
    description:
      "Uma apresentação elegante para marcas e negócios que estão começando.",
    tag: "VERSÁTIL",
    icon: Layers3,
  },
  {
    name: "Forma",
    category: "Portfólio",
    color: "peach",
    brand: "FORMA",
    headline: "Design que\ncria conexões.",
    description:
      "Seu trabalho no centro da experiência, com espaço para personalidade.",
    tag: "CRIATIVO",
    icon: Palette,
  },
  {
    name: "Orbit",
    category: "Produto",
    color: "blue",
    brand: "orbit",
    headline: "Uma nova forma\nde trabalhar.",
    description:
      "Conte a história do seu produto com recursos, benefícios e chamadas claras.",
    tag: "TECNOLOGIA",
    icon: Zap,
  },
  {
    name: "Nova",
    category: "Negócios",
    color: "mint",
    brand: "nova",
    headline: "Ideias com\nmais impacto.",
    description:
      "Uma linguagem leve e direta para serviços, consultorias e novos projetos.",
    tag: "SERVIÇOS",
    icon: WandSparkles,
  },
  {
    name: "Alva",
    category: "Portfólio",
    color: "rose",
    brand: "studio alva",
    headline: "O detalhe\nfaz o todo.",
    description:
      "Composição editorial para profissionais que querem mostrar seu olhar.",
    tag: "EDITORIAL",
    icon: MousePointer2,
  },
  {
    name: "Stack",
    category: "Produto",
    color: "lime",
    brand: "stack_",
    headline: "Menos passos.\nMais resultado.",
    description:
      "Um ponto de partida objetivo para apresentar aplicativos e ferramentas.",
    tag: "DIGITAL",
    icon: Code2,
  },
];

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

export function SolucoesPage({ onStart, onNavigate }) {
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

const plans = [
  {
    name: "Explorar",
    label: "Para dar o primeiro passo",
    price: 0,
    features: [
      "Uma base para seu projeto",
      "Componentes essenciais",
      "Layout responsivo",
      "Aulas introdutórias",
    ],
    button: "Começar gratuitamente",
    icon: BookOpen,
  },
  {
    name: "Pro",
    label: "Para transformar ideias em páginas",
    price: 39,
    features: [
      "Tudo do plano Explorar",
      "Todos os templates da galeria",
      "Exemplos de animações",
      "Guia de personalização",
    ],
    button: "Explorar o Pro",
    icon: Zap,
    featured: true,
  },
  {
    name: "Studio",
    label: "Para explorar novas possibilidades",
    price: 79,
    features: [
      "Tudo do plano Pro",
      "Biblioteca de seções",
      "Exemplos de múltiplas páginas",
      "Guia de design de interfaces",
    ],
    button: "Conhecer o Studio",
    icon: Layers3,
  },
];
const money = (value) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: value % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  });

export function PlanosPage({ onStart, onNavigate }) {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="page-container secondary-page">
      <PageIntro
        label="Um próximo passo para sua ideia"
        title={
          <>
            Grandes possibilidades.
            <br />
            Escolhas simples.
          </>
        }
        description="Uma vitrine de planos para explorar a experiência de uma landing page comercial. Escolha uma opção e experimente o fluxo de criação."
      >
        <div className="pg-billing" role="group" aria-label="Período do plano">
          <button
            type="button"
            aria-pressed={!annual}
            onClick={() => setAnnual(false)}
          >
            Mensal
          </button>
          <button
            type="button"
            aria-pressed={annual}
            onClick={() => setAnnual(true)}
          >
            Anual <span>−20%</span>
          </button>
        </div>
      </PageIntro>
      <p className="pg-demo-note">
        <Sparkles size={14} aria-hidden="true" /> Planos demonstrativos para
        estudo. Nenhuma cobrança ou contratação será realizada.
      </p>
      <div className="pg-pricing-grid">
        {plans.map((plan, index) => {
          const price = annual ? plan.price * 0.8 : plan.price;
          const Icon = plan.icon;
          return (
            <Reveal
              key={plan.name}
              className={`pg-plan-card ${plan.featured ? "pg-plan-featured" : ""}`}
              delay={index * 0.06}
            >
              {plan.featured && (
                <span className="pg-plan-badge">PARA IR ALÉM</span>
              )}
              <span className="pg-plan-icon">
                <Icon size={23} aria-hidden="true" />
              </span>
              <h2>{plan.name}</h2>
              <p className="pg-plan-description">{plan.label}</p>
              <div className="pg-plan-price" aria-live="polite">
                <span>R$</span>
                <strong>{money(price)}</strong>
                <span>/mês</span>
              </div>
              <p className="pg-plan-period">
                {!plan.price
                  ? "Gratuito para explorar"
                  : annual
                    ? `R$ ${money(price * 12)} por ano no exemplo`
                    : "Valor mensal ilustrativo"}
              </p>
              <button
                type="button"
                className={
                  plan.featured ? "primary-button" : "secondary-button"
                }
                onClick={() => onStart(plan.name)}
              >
                {plan.button}
                <ArrowRight size={15} />
              </button>
              <div className="pg-plan-divider" />
              <h3>O que você pode explorar</h3>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
      <div className="pg-pricing-help">
        <span className="pg-help-mark">?</span>
        <div>
          <h2>Começando agora com React?</h2>
          <p>Veja as aulas antes de escolher seu próximo projeto.</p>
        </div>
        <button
          type="button"
          className="text-link"
          onClick={() => onNavigate("aprender")}
        >
          Conhecer a trilha <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

const lessons = [
  {
    id: "componentes",
    number: "01",
    category: "React",
    title: "Pense em componentes",
    description:
      "Transforme um layout em pequenas peças que você pode reutilizar.",
    time: "5 min",
    icon: Layers3,
    intro:
      "Componentes são funções que retornam partes da interface. Ao separar Header, Hero e Card, você mantém responsabilidades claras e consegue reutilizar a mesma estrutura.",
    steps: [
      "Comece identificando os blocos que se repetem no layout.",
      "Passe informações com props em vez de duplicar o componente.",
      "Use uma key estável quando renderizar uma lista de componentes.",
    ],
    code: 'function FeatureCard({ title, description }) {\n  return (\n    <article className="feature-card">\n      <h2>{title}</h2>\n      <p>{description}</p>\n    </article>\n  )\n}',
  },
  {
    id: "estado",
    number: "02",
    category: "React",
    title: "Uma interface que responde",
    description:
      "Use estado para criar filtros, alternâncias e menus interativos.",
    time: "6 min",
    icon: MousePointer2,
    intro:
      "O estado guarda informações que podem mudar durante a navegação. Com useState, uma ação do visitante atualiza o componente e o React redesenha a interface.",
    steps: [
      "Defina apenas o estado necessário para a interação.",
      "Use eventos como onClick para atualizar esse estado.",
      "Comunique a seleção aos leitores de tela com aria-pressed.",
    ],
    code: "import { useState } from 'react'\n\nfunction CategoryFilter() {\n  const [active, setActive] = useState('Todos')\n  return (\n    <button\n      aria-pressed={active === 'React'}\n      onClick={() => setActive('React')}\n    >\n      React\n    </button>\n  )\n}",
  },
  {
    id: "grid",
    number: "03",
    category: "Design",
    title: "Um layout para cada tela",
    description: "Conheça o grid flexível e crie espaço para seu conteúdo.",
    time: "4 min",
    icon: Smartphone,
    intro:
      "Responsividade começa no conteúdo. Um grid com auto-fit cria quantas colunas couberem no espaço disponível e reorganiza os cards conforme a tela diminui.",
    steps: [
      "Comece pelo celular e adicione complexidade quando houver espaço.",
      "Prefira medidas flexíveis e limite a largura de textos longos.",
      "Teste com 320 px, com teclado e com zoom de 200%.",
    ],
    code: ".cards {\n  display: grid;\n  grid-template-columns: repeat(\n    auto-fit, minmax(min(100%, 240px), 1fr)\n  );\n  gap: 1.5rem;\n}\n\n.page-container {\n  width: min(100% - 2rem, 1160px);\n  margin-inline: auto;\n}",
  },
  {
    id: "identidade",
    number: "04",
    category: "Design",
    title: "Crie uma linguagem visual",
    description:
      "Use cores, contraste e espaçamento para dar unidade à página.",
    time: "5 min",
    icon: Palette,
    intro:
      "Uma identidade consistente nasce de poucas decisões bem definidas. Variáveis CSS centralizam cores e espaçamentos, e a hierarquia tipográfica ajuda o visitante a entender o que vem primeiro.",
    steps: [
      "Escolha uma cor de destaque para as ações principais.",
      "Mantenha contraste suficiente entre texto e fundo.",
      "Use uma escala de espaçamentos para criar ritmo e alinhamento.",
    ],
    code: ":root {\n  --background: #090a10;\n  --surface: #11121c;\n  --text: #f5f4fa;\n  --accent: #ad7aff;\n  --space: 8px;\n}\n\n.card {\n  color: var(--text);\n  background: var(--surface);\n  padding: calc(var(--space) * 3);\n}",
  },
  {
    id: "motion",
    number: "05",
    category: "Animação",
    title: "Dê movimento às ideias",
    description: "Crie entradas suaves sem comprometer a acessibilidade.",
    time: "6 min",
    icon: Sparkles,
    intro:
      "Animações ficam mais úteis quando têm um propósito: sinalizar uma mudança, destacar uma ação ou conduzir a leitura. Movimentos curtos e sutis evitam distrações.",
    steps: [
      "Anime opacity e transform para transições mais leves.",
      "Use uma duração curta e evite movimentos constantes.",
      "Respeite prefers-reduced-motion com useReducedMotion.",
    ],
    code: "import { motion, useReducedMotion } from 'framer-motion'\n\nfunction AnimatedCard({ children }) {\n  const reduced = useReducedMotion()\n  return (\n    <motion.article\n      initial={reduced ? false : { opacity: 0, y: 16 }}\n      whileInView={{ opacity: 1, y: 0 }}\n      viewport={{ once: true }}\n      transition={{ duration: reduced ? 0 : 0.4 }}\n    >\n      {children}\n    </motion.article>\n  )\n}",
  },
  {
    id: "feedback",
    number: "06",
    category: "Animação",
    title: "Pequenos detalhes, boa experiência",
    description: "Estados de hover e foco tornam as ações mais claras.",
    time: "4 min",
    icon: WandSparkles,
    intro:
      "Um botão deve mostrar que pode ser acionado e deixar claro quando recebe foco. Feedback visual precisa funcionar tanto com o mouse quanto com o teclado.",
    steps: [
      "Mantenha uma área de toque confortável, com pelo menos 44 px.",
      "Use focus-visible para mostrar a posição do teclado.",
      "Desative transições desnecessárias quando houver preferência por menos movimento.",
    ],
    code: ".button {\n  min-height: 44px;\n  transition: background 160ms ease;\n}\n.button:hover { background: #c6a3ff; }\n.button:focus-visible {\n  outline: 2px solid #ad7aff;\n  outline-offset: 4px;\n}\n@media (prefers-reduced-motion: reduce) {\n  .button { transition: none; }\n}",
  },
];
const progressKey = "react-landing-lessons-v1";

function LessonDialog({ lesson, onClose, completed, onComplete }) {
  const dialogRef = useRef(null);
  const [copyState, setCopyState] = useState("");
  const reduced = useReducedMotion();
  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector("button")?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const buttons = [
        ...(dialogRef.current?.querySelectorAll(
          'button:not([disabled]), a[href], [tabindex="0"]',
        ) || []),
      ];
      const first = buttons[0],
        last = buttons.at(-1);
      const outside = !buttons.includes(document.activeElement);
      if (event.shiftKey && (document.activeElement === first || outside)) {
        event.preventDefault();
        last?.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last || outside)
      ) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(lesson.code);
      setCopyState("Código copiado!");
    } catch {
      setCopyState("Selecione o código abaixo e copie com Ctrl+C ou ⌘C.");
    }
  };
  return (
    <motion.div
      className="pg-dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.18 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        ref={dialogRef}
        className="pg-lesson-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pg-lesson-title"
        initial={reduced ? false : { y: 18, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.2 }}
      >
        <div className="pg-dialog-top">
          <span className="section-label">
            Aula {lesson.number} · {lesson.category}
          </span>
          <button
            type="button"
            className="pg-close-button"
            aria-label="Fechar aula"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        <h2 id="pg-lesson-title">{lesson.title}</h2>
        <p className="pg-lesson-intro">{lesson.intro}</p>
        <h3>Na prática</h3>
        <ol className="pg-lesson-steps">
          {lesson.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="pg-code-heading">
          <span>Exemplo para explorar</span>
          <button type="button" onClick={copyCode}>
            <Copy size={14} /> Copiar código
          </button>
        </div>
        <pre tabIndex={0} aria-label="Exemplo de código">
          <code>{lesson.code}</code>
        </pre>
        <p className="pg-copy-status" role="status">
          {copyState}
        </p>
        <div className="pg-lesson-footer">
          <span>
            {completed
              ? "Bom trabalho. Continue explorando!"
              : "Leu e experimentou o exemplo?"}
          </span>
          <button
            type="button"
            className="primary-button"
            onClick={() => onComplete(lesson.id)}
            disabled={completed}
          >
            {completed ? (
              <>
                <CheckCircle2 size={16} /> Aula concluída
              </>
            ) : (
              <>
                <Check size={16} /> Marcar como concluída
              </>
            )}
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
}

export function AprenderPage({ onStart, onNavigate }) {
  const [filter, setFilter] = useState("Todas");
  const [lesson, setLesson] = useState(null);
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || "[]");
      return Array.isArray(saved)
        ? saved.filter((id) => lessons.some((item) => item.id === id))
        : [];
    } catch {
      return [];
    }
  });
  const closeDialog = useCallback(() => setLesson(null), []);
  const completeLesson = (id) => {
    setCompleted((previous) => {
      const next = previous.includes(id) ? previous : [...previous, id];
      try {
        localStorage.setItem(progressKey, JSON.stringify(next));
      } catch {
        /* Learning still works when browser storage is unavailable. */
      }
      return next;
    });
  };
  const filtered = lessons.filter(
    (item) => filter === "Todas" || item.category === filter,
  );
  return (
    <div className="page-container secondary-page">
      <PageIntro
        label="Aprender é colocar em prática"
        title={
          <>
            Sua ideia merece
            <br />
            <span className="pg-accent">sair do papel.</span>
          </>
        }
        description="Uma trilha breve para entender o que acontece por trás de uma boa landing page. Explore, experimente e construa no seu ritmo."
      />
      <Reveal className="pg-learning-banner">
        <div className="pg-learning-icon">
          <BookOpen size={29} strokeWidth={1.5} />
        </div>
        <div>
          <span className="section-label">Da ideia à interface</span>
          <h2>Seu próximo capítulo começa aqui.</h2>
          <p>6 aulas curtas · exemplos de código · conteúdo introdutório</p>
        </div>
        <div className="pg-learning-progress">
          <strong>
            {completed.length}
            <span> / {lessons.length}</span>
          </strong>
          <span>aulas concluídas</span>
          <div
            className="pg-progress-track"
            role="progressbar"
            aria-label="Progresso das aulas"
            aria-valuemin={0}
            aria-valuemax={lessons.length}
            aria-valuenow={completed.length}
          >
            <i
              style={{ width: `${(completed.length / lessons.length) * 100}%` }}
            />
          </div>
        </div>
      </Reveal>
      <div className="pg-filter-row">
        <div
          className="pg-filter-chips"
          role="group"
          aria-label="Filtrar aulas"
        >
          {["Todas", "React", "Design", "Animação"].map((category) => (
            <button
              type="button"
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="pg-result-count" aria-live="polite">
          {filtered.length} aulas para explorar
        </span>
      </div>
      <div className="pg-lesson-grid">
        {filtered.map((item) => {
          const Icon = item.icon;
          const done = completed.includes(item.id);
          return (
            <Reveal key={item.id} className="pg-lesson-card">
              <div className="pg-lesson-card-top">
                <span className="pg-lesson-number">{item.number}</span>
                <span className="pg-lesson-category">{item.category}</span>
              </div>
              <span className="pg-lesson-icon">
                <Icon size={27} strokeWidth={1.4} />
              </span>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <div className="pg-lesson-card-bottom">
                <span>
                  {done ? (
                    <>
                      <CheckCircle2 size={14} /> Concluída
                    </>
                  ) : (
                    <>
                      <BookOpen size={14} /> Leitura de {item.time}
                    </>
                  )}
                </span>
                <button
                  type="button"
                  aria-label={`${done ? "Rever" : "Abrir"} aula: ${item.title}`}
                  onClick={() => setLesson(item)}
                >
                  {done ? "Rever aula" : "Abrir aula"} <ArrowRight size={15} />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="pg-bottom-cta">
        <div>
          <h2>Agora, faça acontecer.</h2>
          <p className="section-copy">
            Escolha um ponto de partida e crie sua próxima página.
          </p>
        </div>
        <div className="pg-cta-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate("solucoes")}
          >
            Ver templates
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={() => onStart("Essencial")}
          >
            Começar um projeto <ArrowRight size={16} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {lesson && (
          <LessonDialog
            key={lesson.id}
            lesson={lesson}
            onClose={closeDialog}
            completed={completed.includes(lesson.id)}
            onComplete={completeLesson}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
