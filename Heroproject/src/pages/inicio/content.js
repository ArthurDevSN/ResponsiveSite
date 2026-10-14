import { Braces, Smartphone, WandSparkles } from "lucide-react";

export const steps = [
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

export const faqs = [
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

export const homeFeatures = [
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
];
