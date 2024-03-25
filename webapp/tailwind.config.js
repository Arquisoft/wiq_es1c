/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark-mode': '#171717'
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(144deg,#eb8f34, #e292f0 50%,#971aad)',
        'gradient-light': 'linear-gradient(144deg,#FFF4D6, #B8F3D3 50%,#BCE0FD)',
      },
    },
  },
  plugins: [],
}

