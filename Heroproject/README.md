# Luma · Landing pages com React

Um site de estudo com a apresentação de uma marca comercial: tema escuro, acentos em roxo e rosa, layouts responsivos e animações com Framer Motion. As interações são reais; os planos e os modelos são demonstrações para aprendizado, sem cobrança ou publicação automática.

## Executar

Use Node.js 24 (ou uma versão compatível com Vite 8: 20.19+ ou 22.12+).

```bash
cd Heroproject # se estiver na raiz do repositório
npm ci
npm run dev
```

No ambiente na nuvem, use um cache gravável e exponha o servidor na interface de rede:

```bash
npm ci --cache /workspace/.npm-cache --no-audit --no-fund
npm run dev -- --host 0.0.0.0 --port 5173 --strictPort
```

```bash
npm run build    # gera dist/
npm run lint     # valida o código com Oxlint
npm run preview  # serve o build de produção
```

## Páginas e interações

| Página   | O que explorar                                                           |
| -------- | ------------------------------------------------------------------------ |
| Início   | Prévia desktop/mobile, etapas de construção interativas e FAQ            |
| Recursos | Componentes, responsividade e animação em um pequeno laboratório         |
| Soluções | Seis composições de templates com filtros por categoria                  |
| Planos   | Três planos ilustrativos, alternância mensal/anual e cálculo de desconto |
| Aprender | Seis aulas, exemplos copiáveis, filtros e conclusão de aulas             |

A navegação usa rotas no hash (`#/recursos`, por exemplo), sem dependência adicional de roteamento. Recarregar uma página e usar voltar/avançar mantém a navegação funcionando em hospedagens estáticas.

O botão **Começar projeto** guarda um rascunho com nome e modelo em `localStorage`. **Meu projeto** permite retomá-lo. Esse fluxo não gera arquivos nem publica uma landing page. Se o armazenamento estiver bloqueado, o rascunho permanece apenas na sessão atual. A conclusão das aulas também é guardada localmente, sem conta ou backend.

## Organização para aprender

Cada aba tem sua própria pasta em `src/pages/`, com componente, estilos e conteúdo:

```text
src/
├── pages/
│   ├── inicio/
│   │   ├── InicioPage.jsx
│   │   ├── InicioPage.css
│   │   ├── content.js
│   │   └── components/
│   │       ├── SitePreview.jsx
│   │       └── BuildSection.jsx
│   ├── recursos/
│   │   ├── RecursosPage.jsx
│   │   ├── RecursosPage.css
│   │   └── content.js
│   ├── solucoes/
│   │   ├── SolucoesPage.jsx
│   │   ├── SolucoesPage.css
│   │   └── content.js
│   ├── planos/
│   │   ├── PlanosPage.jsx
│   │   ├── PlanosPage.css
│   │   └── content.js
│   └── aprender/
│       ├── AprenderPage.jsx
│       ├── AprenderPage.css
│       ├── content.js
│       └── LessonDialog.jsx
├── components/
│   ├── Logo.jsx
│   ├── ProjectDialog.jsx
│   ├── PageIntro.jsx
│   ├── Reveal.jsx
│   └── PageLayout.css
├── hooks/useDialog.js
├── App.jsx
├── App.css
└── index.css
```

- Edite o componente da aba para alterar sua estrutura e suas interações.
- Edite o `content.js` da aba para alterar textos, dados, modelos ou exemplos de código.
- Edite o CSS da aba para ajustar seu visual e seus breakpoints.
- Use `components/` para elementos compartilhados entre páginas. `PageLayout.css` concentra a estrutura comum das páginas internas, seus filtros e chamadas finais.
- `App.jsx` compõe as páginas e controla a navegação, o menu mobile e os rascunhos. `App.css` mantém os estilos compartilhados da aplicação, navegação e diálogos de projeto.
- `index.css` define tokens de cor, estilos globais, foco e movimento reduzido; `hooks/useDialog.js` cuida de Escape, foco e bloqueio da rolagem.

Os diálogos permitem navegação por teclado e devolvem o foco ao fechar. Animações respeitam `prefers-reduced-motion`. O layout foi conferido em 320, 390, 768, 1024 e 1440 px, e os fluxos de navegação, filtros, aulas e rascunhos foram exercitados em Chromium.
