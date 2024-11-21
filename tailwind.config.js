/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#3B82F6",
        accent: "#FBBF24",
        background: "#F9FAFB",
        text: "#111827",
      },
    },
  },
  plugins: [],
};
