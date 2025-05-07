/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
   
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'white-glow': '0 1px 6px rgba(165, 185, 185, 0.2)',
      },
      backgroundImage: theme => ({
        'gradient-to-r': 'linear-gradient(to right, var(--mc1), var(--mc2))',
      }),
      dropShadow: {
        'custom': '0 5px 20px rgba(204, 0, 255, 0.15)',
      }
    },
  },
  plugins: [],
}