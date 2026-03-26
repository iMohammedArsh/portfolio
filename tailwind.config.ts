import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F4F0',
        blue: '#1A6BFF',
        violet: '#6B21E8',
        ink: '#0D0D0D',
        muted: '#6B7280',
        border: '#E5E3DD',
      },
      fontFamily: {
        hero: ['Hanken Grotesk', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        card: '12px',
        badge: '999px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(13,13,13,0.06)',
        'card-hover': '0 8px 40px rgba(13,13,13,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
