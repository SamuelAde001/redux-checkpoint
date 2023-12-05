/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      button: {
        default: "red", // Set the default background color to 'initial'
      },
    },
  },
  plugins: [],
};
