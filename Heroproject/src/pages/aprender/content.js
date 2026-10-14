import {
  Layers3,
  MousePointer2,
  Palette,
  Smartphone,
  Sparkles,
  WandSparkles,
} from "lucide-react";

export const lessons = [
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
export const progressKey = "react-landing-lessons-v1";
