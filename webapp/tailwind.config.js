/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-mode': '#171717',
        'dark-purple': '#2A153E',
        'light-blue': '#88d5f1',
      },
      backgroundImage: {
        'light': "url('/src/media/wiq_banner.light.png')",
        'dark': "url('/src/media/wiq_banner.png')",
      },
      fontFamily: {
        mono: ['monospace'],
      },
    },
  },
  plugins: [],
}

