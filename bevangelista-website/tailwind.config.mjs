/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: "#EFF6FF",
        darkHover: "#3E3E40",
        darkTheme: "#252526"
      },
      fontFamily: {
        Outfit: ["Outfit", "sans-serif"],
        Ovo: ["Ovo", "serif"]
      },
      boxShadow: {
        lightShadow: "4px 4px 0 #000",
        darkShadow: "4px 4px 0 #FFF",
      },
      gridTemplateColumns: {
        "auto": "repeat(auto-fit, minmax(200px, 1fr))"
      }
    },
  },
  darkMode: 'selector',
  plugins: [
      require('@tailwindcss/aspect-ratio'),
  ],
};

export default tailwindConfig;
