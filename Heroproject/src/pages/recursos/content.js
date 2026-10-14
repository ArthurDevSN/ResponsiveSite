import {
  Code2,
  Layers3,
  Monitor,
  MousePointer2,
  Palette,
  Smartphone,
  Sparkles,
} from "lucide-react";

export const features = [
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
export const demoTabs = [
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
