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

| Página | O que explorar |
| --- | --- |
| Início | Prévia desktop/mobile, etapas de construção interativas e FAQ |
| Recursos | Componentes, responsividade e animação em um pequeno laboratório |
| Soluções | Seis composições de templates com filtros por categoria |
| Planos | Três planos ilustrativos, alternância mensal/anual e cálculo de desconto |
| Aprender | Seis aulas, exemplos copiáveis, filtros e conclusão de aulas |

A navegação usa rotas no hash (`#/recursos`, por exemplo), sem dependência adicional de roteamento. Recarregar uma página e usar voltar/avançar mantém a navegação funcionando em hospedagens estáticas.

O botão **Começar projeto** guarda um rascunho com nome e modelo em `localStorage`. **Meu projeto** permite retomá-lo. Esse fluxo não gera arquivos nem publica uma landing page. Se o armazenamento estiver bloqueado, o rascunho permanece apenas na sessão atual. A conclusão das aulas também é guardada localmente, sem conta ou backend.

## Organização para aprender

- `src/App.jsx`: navegação, menu mobile e composição das páginas.
- `src/components/HomePage.jsx`: apresentação, prévia interativa, demonstração de código e FAQ.
- `src/components/Pages.jsx`: páginas de recursos, soluções, planos e aprendizado; arrays de conteúdo e exemplos.
- `src/components/ProjectDialog.jsx`: criação e retomada do rascunho.
- `src/components/Logo.jsx`: marca reutilizável.
- `src/hooks/useDialog.js`: Escape, controle de foco e bloqueio da rolagem para diálogos.
- `src/index.css`: tokens de cor, estilos globais, foco e movimento reduzido.
- `src/App.css` e `src/components/Pages.css`: estilos dos componentes e breakpoints.

Os diálogos permitem navegação por teclado e devolvem o foco ao fechar. Animações respeitam `prefers-reduced-motion`. O layout foi conferido em 320, 390, 768, 1024 e 1440 px, e os fluxos de navegação, filtros, aulas e rascunhos foram exercitados em Chromium.
