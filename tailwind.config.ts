import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070a10",
        panel: "#0d131c",
        panelSoft: "#111927",
        line: "#2b394d",
        textMain: "#ebf1fa",
        textMuted: "#97a8bf",
        accent: "#62bbeb",
        accentSoft: "#15344a"
      },
      boxShadow: {
        card: "0 18px 50px -34px rgba(0, 0, 0, 0.85)",
        glow: "0 0 0 1px rgba(98, 187, 235, 0.24), 0 16px 34px -28px rgba(98, 187, 235, 0.34)"
      },
      maxWidth: {
        shell: "1180px"
      },
      keyframes: {
        pulseGrid: {
          "0%, 100%": { opacity: "0.22" },
          "50%": { opacity: "0.34" }
        }
      },
      animation: {
        pulseGrid: "pulseGrid 8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
