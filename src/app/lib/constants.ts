export const UI_LABELS = {
  DISCLAIMER_TEXT: "This page presents producer-declared information; it is not certification or verification.",
  EVIDENCE_HEADER: "Producer-Reported Evidence",
  HISTORY_HEADER: "Disclosure Version History",
  EMPTY_STATE: "No disclosures match your current criteria.",
  AUTHORITY_FOOTNOTE: "Hedamo serves as a repository for producer-reported data and does not endorse the accuracy of the information provided.",
};

export const STATUS_CONFIG = {
  Draft: {
    label: "Draft Disclosure",
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
  },
  Submitted: {
    label: "Information Submitted",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100",
  },
  Published: {
    label: "Disclosure Published",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
  },
} as const;

export const CATEGORIES = [
  "Industrial Chemicals",
  "Digital Services",
  "Consumer Goods",
  "Logistics",
  "Healthcare Infrastructure",
];

export const SORT_OPTIONS = [
  { label: "Last Updated", value: "updatedAt" },
  { label: "Product Name (A-Z)", value: "name" },
  { label: "Producer Name", value: "producer" },
];

export const ANIMATION_SPEED = {
  FAST: "150ms",
  STANDARD: "250ms",
  EASING: "cubic-bezier(0.4, 0, 0.2, 1)",
};