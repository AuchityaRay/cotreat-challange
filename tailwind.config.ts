import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom-drop': '0px 2px 8px 0px #F0F1F2',
      },
      colors: {
        'daybreak-blue': '#1890FF',
        'picShare-color': '#F0F0F0',
      },
      fontFamily: {
        robotoSerif: ['Roboto Serif', 'serif'],
        roboto: ['Roboto',],

      },
    },
  },
  plugins: [],
};
export default config;
