/** @type {import('tailwindcss').Config} */
module.exports = {
  // 경로를 최대한 넓고 명확하게 잡습니다.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", 
    "./layout.tsx",
    "./page.tsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
