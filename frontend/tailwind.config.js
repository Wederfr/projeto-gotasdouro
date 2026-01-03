/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Escaneia componentes React (JS, TS, JSX, TSX)
    "./src/**/*.css",             // Escaneia seus arquivos CSS personalizados também, caso use @apply
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}