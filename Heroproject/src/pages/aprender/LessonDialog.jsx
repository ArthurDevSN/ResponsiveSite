import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, CheckCircle2, Copy, X } from "lucide-react";

export default function LessonDialog({
  lesson,
  onClose,
  completed,
  onComplete,
}) {
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
