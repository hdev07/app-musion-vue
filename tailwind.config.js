/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF4081',
        secondary: '#212121',
        background: '#1A1A1A'
      }
    }
  },
  plugins: []
}
