import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import PageIntro from "../../components/PageIntro";
import Reveal from "../../components/Reveal";
import LessonDialog from "./LessonDialog";
import { lessons, progressKey } from "./content";
import "./AprenderPage.css";

export default function AprenderPage({ onStart, onNavigate }) {
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
