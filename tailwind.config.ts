import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0F172A",
          muted: "#64748B",
        },
        surface: {
          canvas: "#F8FAFC",
          card: "#FFFFFF",
          hover: "#F1F5F9",
        },
        border: {
          DEFAULT: "#E2E8F0",
          strong: "#CBD5E1",
        },
        status: {
          draft: { bg: "#F1F5F9", text: "#475569" },
          submitted: { bg: "#EFF6FF", text: "#1E40AF" },
          published: { bg: "#F0FDF4", text: "#166534" },
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      borderRadius: {
        'institutional': '6px',
      },
    },
  },
  plugins: [],
};

export default config;