import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        paper: '#F5F5F7',
        mist: '#86868B',
      },
      fontFamily: {
        sans: ['"Inter var"', 'Inter', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        badge: '999px',
      },
      boxShadow: {
        lift: '0 30px 60px -20px rgba(0,0,0,0.25)',
        'lift-dark': '0 30px 60px -20px rgba(0,0,0,0.6)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}

export default config
