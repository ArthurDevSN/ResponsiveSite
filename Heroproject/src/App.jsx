import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Layers3, Menu, MousePointer2, X } from "lucide-react";
import HomePage from "./components/HomePage";
import Logo from "./components/Logo";
import ProjectDialog, { SavedProject } from "./components/ProjectDialog";
import useDialog from "./hooks/useDialog";
import {
  AprenderPage,
  PlanosPage,
  RecursosPage,
  SolucoesPage,
} from "./components/Pages";
import "./App.css";

const navigation = [
  { id: "inicio", label: "Início" },
  { id: "recursos", label: "Recursos" },
  { id: "solucoes", label: "Soluções" },
  { id: "planos", label: "Planos" },
  { id: "aprender", label: "Aprender" },
];
const readPage = () => {
  const value = window.location.hash.replace(/^#\/?/, "");
  return navigation.some((item) => item.id === value) ? value : "inicio";
};
function readProject() {
  try {
    const data = JSON.parse(localStorage.getItem("luma-project"));
    return data &&
      typeof data.name === "string" &&
      typeof data.template === "string"
      ? data
      : null;
  } catch {
    return null;
  }
}

function App() {
  const [page, setPage] = useState(readPage);
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [template, setTemplate] = useState(null);
  const [project, setProject] = useState(readProject);
  const [showProject, setShowProject] = useState(false);
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeProject = useCallback(() => setTemplate(null), []);
  const closeSaved = useCallback(() => setShowProject(false), []);
  const [year] = useState(() => new Date().getFullYear());
  useDialog(menuOpen, menuRef, closeMenu);
  useEffect(() => {
    const change = () => {
      setPage(readPage());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "instant" });
      mainRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("hashchange", change);
    const resize = () => {
      if (window.innerWidth >= 960) setMenuOpen(false);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("hashchange", change);
      window.removeEventListener("resize", resize);
    };
  }, []);
  useEffect(() => {
    document.title = `${navigation.find((item) => item.id === page).label} · Luma — landing pages com React`;
    if (window.location.hash) mainRef.current?.focus({ preventScroll: true });
  }, [page]);
  const navigate = (id) => {
    if (readPage() === id) {
      requestAnimationFrame(() =>
        mainRef.current?.focus({ preventScroll: true }),
      );
      window.scrollTo({ top: 0, behavior: "instant" });
    } else window.location.hash = `/${id}`;
  };
  const start = (chosen = "Essencial") => setTemplate(chosen);
  const content = {
    inicio: <HomePage onStart={start} />,
    recursos: <RecursosPage onStart={start} onNavigate={navigate} />,
    solucoes: <SolucoesPage onStart={start} onNavigate={navigate} />,
    planos: <PlanosPage onStart={start} onNavigate={navigate} />,
    aprender: <AprenderPage onStart={start} onNavigate={navigate} />,
  };
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="skip-link"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Pular para o conteúdo
      </a>
      <header className="site-header">
        <div className="header-inner page-container">
          <a href="#/inicio" className="brand-link" aria-label="Luma, início">
            <Logo />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={`#/${item.id}`}
                aria-current={page === item.id ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            {project && (
              <button
                className="saved-project-button"
                onClick={() => setShowProject(true)}
              >
                <Layers3 size={15} /> Meu projeto
              </button>
            )}
            <button className="header-cta" onClick={() => start()}>
              Começar projeto <ArrowUpRight size={15} />
            </button>
            <button
              className="icon-button menu-toggle"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={23} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeMenu();
            }}
          >
            <motion.div
              className="mobile-menu"
              id="mobile-menu"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              tabIndex={-1}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25 }}
            >
              <div className="mobile-menu-heading">
                <Logo />
                <button
                  className="icon-button"
                  aria-label="Fechar menu"
                  onClick={closeMenu}
                >
                  <X size={22} />
                </button>
              </div>
              <span className="section-label">EXPLORE AS POSSIBILIDADES</span>
              <nav aria-label="Navegação mobile">
                {navigation.map((item, index) => (
                  <a
                    key={item.id}
                    href={`#/${item.id}`}
                    aria-current={page === item.id ? "page" : undefined}
                    onClick={() => {
                      closeMenu();
                      navigate(item.id);
                    }}
                  >
                    <span>0{index + 1}</span>
                    {item.label}
                    <ArrowUpRight size={21} />
                  </a>
                ))}
              </nav>
              <button
                className="primary-button"
                onClick={() => {
                  closeMenu();
                  start();
                }}
              >
                Começar meu projeto <ArrowUpRight size={17} />
              </button>
              <p>
                Uma ideia. Uma página.
                <br />
                Um novo jeito de aprender.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <main id="main-content" tabIndex={-1} ref={mainRef}>
        <motion.div
          key={page}
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduced ? 0 : 0.3 }}
        >
          {content[page]}
        </motion.div>
      </main>
      <footer className="site-footer page-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#/inicio" aria-label="Luma, início">
              <Logo />
            </a>
            <p>
              Grandes ideias começam
              <br />
              com uma página em branco.
            </p>
            <span className="footer-project-note">
              Um projeto para explorar React.
            </span>
          </div>
          <div>
            <h2>Explore</h2>
            <a href="#/recursos">Recursos</a>
            <a href="#/solucoes">Soluções e modelos</a>
            <a href="#/planos">Planos demonstrativos</a>
          </div>
          <div>
            <h2>Construa</h2>
            <a href="#/aprender">Trilha de aprendizado</a>
            <button onClick={() => start()}>Começar um projeto</button>
            <a href="https://react.dev/learn" target="_blank" rel="noreferrer">
              Documentação React <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="footer-message">
            <span>
              <MousePointer2 size={17} />
            </span>
            <p>
              Feito de código.
              <br />
              <strong>E de possibilidades.</strong>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} Luma. Criado para aprender.</span>
          <span>
            React <i /> Tailwind CSS <i /> Framer Motion
          </span>
        </div>
      </footer>
      <AnimatePresence>
        {template && (
          <ProjectDialog
            template={template}
            onClose={closeProject}
            onNavigate={navigate}
            onSave={setProject}
          />
        )}
        {showProject && project && (
          <SavedProject
            project={project}
            onClose={closeSaved}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

export default App;
