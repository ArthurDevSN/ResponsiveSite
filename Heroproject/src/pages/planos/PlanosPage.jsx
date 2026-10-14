import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import PageIntro from "../../components/PageIntro";
import Reveal from "../../components/Reveal";
import { money, plans } from "./content";
import "./PlanosPage.css";

export default function PlanosPage({ onStart, onNavigate }) {
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
