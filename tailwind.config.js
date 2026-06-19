/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: { xs: '400px' },
      colors: {
        saffron: {
          50: '#fff8f0',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        maroon: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f4a9b8',
          400: '#ec7692',
          500: '#df4d6f',
          600: '#c42d52',
          700: '#9b1b3a',
          800: '#6b0f1a',
          900: '#4a0510',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#d4a012',
          600: '#b8860b',
          700: '#92700c',
          800: '#78590a',
          900: '#5c4308',
        },
        ivory: {
          DEFAULT: '#fffbf5',
          50: '#fffbf5',
          100: '#fdf5e8',
          200: '#faebd0',
        },
        sacred: {
          dark: '#1a0808',
          green: '#1b5e3b',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'Noto Sans Gujarati', 'Noto Sans Devanagari', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 1.8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'menu-in': 'menuIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        menuIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'temple-gradient': 'linear-gradient(135deg, #6b0f1a 0%, #9b1b3a 35%, #c2410c 70%, #d4a012 100%)',
        'hero-glow': 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.25) 0%, transparent 60%)',
        'card-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
      },
      boxShadow: {
        temple: '0 8px 32px rgba(107, 15, 26, 0.18), 0 2px 8px rgba(212, 160, 18, 0.12)',
        gold: '0 4px 24px rgba(212, 160, 18, 0.35)',
        card: '0 4px 20px rgba(74, 5, 16, 0.08)',
      },
    },
  },
  plugins: [],
};
