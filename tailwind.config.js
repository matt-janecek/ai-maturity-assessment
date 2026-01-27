/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Donyati Brand Colors
        donyati: {
          black: '#12002A',
          purple: '#4A4778',
          'dark-purple': '#45266C',
          'light-purple': '#E8DEF6',
          lime: '#ACC953',
        },
        // Level progression colors
        level: {
          0: '#B8D458', // Green
          1: '#E8A84C', // Orange
          2: '#5D9CEC', // Blue
          3: '#6B5B95', // Purple
          4: '#9B59B6', // Magenta
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-donyati': 'linear-gradient(180deg, #f8f7fc 0%, #ffffff 100%)',
        'gradient-card': 'linear-gradient(180deg, #ffffff 0%, #f5f3fa 100%)',
        'level-0': 'linear-gradient(135deg, #B8D458 0%, #9BBF3B 100%)',
        'level-1': 'linear-gradient(135deg, #E8A84C 0%, #D4922A 100%)',
        'level-2': 'linear-gradient(135deg, #5D9CEC 0%, #4A89DC 100%)',
        'level-3': 'linear-gradient(135deg, #6B5B95 0%, #524678 100%)',
        'level-4': 'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
      },
      boxShadow: {
        'card': '0 8px 32px rgba(74, 71, 120, 0.12)',
        'pill': '0 6px 20px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
