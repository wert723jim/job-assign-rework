/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/components/*.{vue,js,ts,jsx,tsx}',
    './src/components/user/*.{vue,js,ts,jsx,tsx}',
    './src/views/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#786CC2',
        secondary: '#89A5EE'
      }
    },
  },
  plugins: [],
}

