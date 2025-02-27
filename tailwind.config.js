/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      extend: {
        colors: {
          primary: '#FF5A5F',
          secondary: '#2E3A59',
          accent: '#00C9A7'
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        }
      }
    },
    plugins: []
  };