import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Layers3,
  Sparkles,
  X,
} from "lucide-react";
import useDialog from "../hooks/useDialog";

export default function ProjectDialog({
  template,
  onClose,
  onNavigate,
  onSave,
}) {
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(null);
  const [storageError, setStorageError] = useState(false);
  useDialog(true, ref, onClose);
  const submit = (event) => {
    event.preventDefault();
    const project = {
      name: name.trim(),
      template,
      createdAt: new Date().toISOString(),
    };
    if (!project.name) return;
    let persisted = true;
    try {
      localStorage.setItem("luma-project", JSON.stringify(project));
    } catch {
      setStorageError(true);
      persisted = false;
    }
    onSave({ ...project, persisted });
    setSaved(project);
  };
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.section
        ref={ref}
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12 }}
      >
        <button
          className="icon-button dialog-close"
          aria-label="Fechar projeto"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <span className="dialog-symbol">
          {saved ? <Check size={27} /> : <Sparkles size={27} />}
        </span>
        <span className="section-label">O COMEÇO DE ALGO SEU</span>
        <h2 id="project-dialog-title">
          {saved
            ? "Sua ideia já tem um nome."
            : "Vamos tirar a ideia do papel?"}
        </h2>
        {saved ? (
          <div className="project-success" role="status">
            <p>
              <strong>{saved.name}</strong>
              <br />
              Modelo: {saved.template}
            </p>
            <p>
              {storageError
                ? "O navegador não permitiu salvar. O rascunho está disponível apenas nesta sessão."
                : "Rascunho salvo neste navegador. Você pode retomá-lo pelo botão Meu projeto."}{" "}
              O próximo passo é explorar a trilha e construir sua página.
            </p>
            <button
              className="primary-button"
              onClick={() => {
                onClose();
                onNavigate("aprender");
              }}
            >
              Começar a aprender <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="section-copy">
              Dê um nome ao seu próximo projeto e salve o ponto de partida.
            </p>
            <label htmlFor="project-name">Nome do projeto</label>
            <input
              id="project-name"
              name="projectName"
              placeholder="Ex.: Meu estúdio criativo"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              maxLength={80}
              autoComplete="off"
            />
            <div className="selected-template">
              <Layers3 size={18} />
              <span>
                Modelo escolhido<strong>{template}</strong>
              </span>
            </div>
            <button
              className="primary-button"
              type="submit"
              disabled={!name.trim()}
            >
              Salvar minha ideia <ArrowUpRight size={17} />
            </button>
            <small className="form-note">
              Um rascunho local para o seu estudo. Nenhuma cobrança ou
              publicação.
            </small>
          </form>
        )}
      </motion.section>
    </motion.div>
  );
}

export function SavedProject({ project, onClose, onNavigate }) {
  const ref = useRef(null);
  useDialog(true, ref, onClose);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="project-dialog"
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="saved-title"
      >
        <button
          className="icon-button dialog-close"
          aria-label="Fechar projeto"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <span className="dialog-symbol">
          <Layers3 size={27} />
        </span>
        <span className="section-label">SUA PRÓXIMA IDEIA</span>
        <h2 id="saved-title">{project.name}</h2>
        <p className="section-copy">
          Modelo: {project.template}
          <br />
          {project.persisted === false
            ? "Rascunho disponível nesta sessão. O armazenamento do navegador está indisponível."
            : "Seu rascunho está salvo neste navegador."}
        </p>
        <button
          className="primary-button"
          onClick={() => {
            onClose();
            onNavigate("aprender");
          }}
        >
          Continuar aprendendo <ArrowRight size={17} />
        </button>
      </section>
    </div>
  );
}
