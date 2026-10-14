import { BookOpen, Layers3, Zap } from "lucide-react";

export const plans = [
  {
    name: "Explorar",
    label: "Para dar o primeiro passo",
    price: 0,
    features: [
      "Uma base para seu projeto",
      "Componentes essenciais",
      "Layout responsivo",
      "Aulas introdutórias",
    ],
    button: "Começar gratuitamente",
    icon: BookOpen,
  },
  {
    name: "Pro",
    label: "Para transformar ideias em páginas",
    price: 39,
    features: [
      "Tudo do plano Explorar",
      "Todos os templates da galeria",
      "Exemplos de animações",
      "Guia de personalização",
    ],
    button: "Explorar o Pro",
    icon: Zap,
    featured: true,
  },
  {
    name: "Studio",
    label: "Para explorar novas possibilidades",
    price: 79,
    features: [
      "Tudo do plano Pro",
      "Biblioteca de seções",
      "Exemplos de múltiplas páginas",
      "Guia de design de interfaces",
    ],
    button: "Conhecer o Studio",
    icon: Layers3,
  },
];
export const money = (value) =>
  value.toLocaleString("pt-BR", {
    minimumFractionDigits: value % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  });
