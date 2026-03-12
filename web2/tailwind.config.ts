import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'qr-dark': '#0A0A0F',
        'qr-secondary': '#1A1A2E',
        'qr-cyan': '#00F0FF',
        'qr-magenta': '#FF006E',
      },
    },
  },
  plugins: [],
};

export default config;