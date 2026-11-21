import {
  BookOpen,
  ChartNoAxesCombined,
  CircleHelp,
  ClipboardCheck,
  FileCheck2,
  Globe2,
  Landmark,
  Layers3,
  ListFilter,
  Wallet,
  ArrowLeftRight,
} from "lucide-react";
export const primaryNav = [
  { label: "IBKR", to: "/ibkr" },
  { label: "Inversión local", to: "/local" },
  { label: "Glosario", to: "/glossary" },
];
export const ibkrNav = [
  { label: "Resumen", to: "/ibkr", icon: Globe2 },
  { label: "Comprar CSPX", to: "/ibkr/buy-cspx", icon: ClipboardCheck },
  { label: "Qué es CSPX", to: "/ibkr/cspx", icon: Layers3 },
  {
    label: "Entender mi portfolio",
    to: "/ibkr/portfolio",
    icon: ChartNoAxesCombined,
  },
  {
    label: "Alternativas por rol",
    to: "/ibkr/alternatives",
    icon: ArrowLeftRight,
  },
  { label: "Revisión 1042-S", to: "/ibkr/1042-s", icon: FileCheck2 },
];
export const localNav = [
  { label: "Resumen", to: "/local", icon: Landmark },
  { label: "CEDEARs", to: "/local/cedears", icon: Layers3 },
  { label: "FCI y Super Ahorro", to: "/local/fci", icon: Wallet },
  { label: "Cauciones", to: "/local/cauciones", icon: ArrowLeftRight },
  { label: "BOPREAL", to: "/local/bopreal", icon: FileCheck2 },
  { label: "Bonos soberanos", to: "/local/bonos-soberanos", icon: Landmark },
];
export const glossaryNav = [
  { label: "Todos los términos", to: "/glossary", icon: ListFilter },
];
export const homeNav = [
  { label: "Inicio", to: "/", icon: BookOpen },
  { label: "IBKR", to: "/ibkr", icon: Globe2 },
  { label: "Inversión local", to: "/local", icon: Landmark },
  { label: "Glosario", to: "/glossary", icon: CircleHelp },
];
