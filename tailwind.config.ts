import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Navy - Primary Color
        navy: {
          50: 'rgb(240, 242, 245)',
          100: 'rgb(225, 229, 235)',
          200: 'rgb(195, 203, 215)',
          300: 'rgb(165, 177, 195)',
          400: 'rgb(100, 120, 150)',
          500: 'rgb(50, 71, 100)',
          600: 'rgb(35, 56, 85)',
          700: 'rgb(20, 41, 70)',
          800: 'rgb(15, 31, 55)',
          900: 'rgb(10, 22, 40)',
        },
        // Mocha - Pantone 2025 Color
        mocha: {
          50: 'rgb(252, 248, 245)',
          100: 'rgb(248, 239, 230)',
          200: 'rgb(235, 220, 205)',
          300: 'rgb(220, 195, 170)',
          400: 'rgb(190, 145, 100)',
          500: 'rgb(139, 69, 19)',
          600: 'rgb(110, 55, 15)',
          700: 'rgb(90, 45, 12)',
          800: 'rgb(80, 40, 10)',
          900: 'rgb(60, 30, 8)',
        },
        // Cream - Neutral Backgrounds
        cream: {
          50: 'rgb(255, 252, 248)',
          100: 'rgb(252, 250, 247)',
          200: 'rgb(248, 242, 236)',
          300: 'rgb(245, 230, 211)',
          400: 'rgb(232, 213, 196)',
          500: 'rgb(220, 200, 180)',
        },
        // Semantic Colors
        success: {
          50: 'rgb(236, 253, 245)',
          500: 'rgb(16, 185, 129)',
          600: 'rgb(5, 150, 105)',
        },
        error: {
          50: 'rgb(254, 242, 242)',
          500: 'rgb(239, 68, 68)',
          600: 'rgb(220, 38, 38)',
        },
        warning: {
          50: 'rgb(254, 252, 232)',
          500: 'rgb(234, 179, 8)',
          600: 'rgb(245, 158, 11)',
        },
        info: {
          50: 'rgb(239, 246, 255)',
          500: 'rgb(59, 130, 246)',
          600: 'rgb(37, 99, 235)',
        },
        // Shadcn/UI Compatibility
        primary: {
          DEFAULT: 'rgb(10, 22, 40)',
          foreground: 'rgb(245, 230, 211)',
        },
        secondary: {
          DEFAULT: 'rgb(139, 69, 19)',
          foreground: 'rgb(245, 230, 211)',
        },
        accent: {
          DEFAULT: 'rgb(245, 230, 211)',
          foreground: 'rgb(10, 22, 40)',
        },
        background: 'rgb(252, 250, 247)',
        foreground: 'rgb(10, 22, 40)',
        card: {
          DEFAULT: 'rgb(248, 242, 236)',
          foreground: 'rgb(10, 22, 40)',
        },
        popover: {
          DEFAULT: 'rgb(248, 242, 236)',
          foreground: 'rgb(10, 22, 40)',
        },
        muted: {
          DEFAULT: 'rgb(232, 213, 196)',
          foreground: 'rgb(100, 120, 150)',
        },
        destructive: 'rgb(239, 68, 68)',
        border: 'rgb(229, 225, 221)',
        input: 'rgb(229, 225, 221)',
        ring: 'rgb(139, 69, 19)',
        sidebar: {
          DEFAULT: 'rgb(20, 30, 50)',
          foreground: 'rgb(245, 230, 211)',
          primary: 'rgb(139, 69, 19)',
          'primary-foreground': 'rgb(245, 230, 211)',
          accent: 'rgb(30, 42, 64)',
          'accent-foreground': 'rgb(245, 230, 211)',
          border: 'rgba(10, 22, 40, 0.3)',
          ring: 'rgb(139, 69, 19)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-bodoni)', 'Bodoni Moda', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.625rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '4.25rem' }],
        '7xl': ['4.5rem', { lineHeight: '5rem' }],
        '8xl': ['6rem', { lineHeight: '6.5rem' }],
        '9xl': ['8rem', { lineHeight: '8.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      boxShadow: {
        gentleman: '0 4px 6px -1px rgba(10, 22, 40, 0.1), 0 2px 4px -1px rgba(10, 22, 40, 0.06)',
        'gentleman-lg': '0 10px 15px -3px rgba(10, 22, 40, 0.1), 0 4px 6px -2px rgba(10, 22, 40, 0.05)',
        'gentleman-xl': '0 20px 25px -5px rgba(10, 22, 40, 0.1), 0 10px 10px -5px rgba(10, 22, 40, 0.04)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        // Shadcn/ui compatibility utilities
        '.bg-background': {
          'background-color': 'rgb(252, 250, 247)',
        },
        '.bg-foreground': {
          'background-color': 'rgb(10, 22, 40)',
        },
        '.bg-card': {
          'background-color': 'rgb(248, 242, 236)',
        },
        '.bg-popover': {
          'background-color': 'rgb(248, 242, 236)',
        },
        '.bg-primary': {
          'background-color': 'rgb(10, 22, 40)',
        },
        '.bg-secondary': {
          'background-color': 'rgb(139, 69, 19)',
        },
        '.bg-muted': {
          'background-color': 'rgb(232, 213, 196)',
        },
        '.bg-accent': {
          'background-color': 'rgb(245, 230, 211)',
        },
        '.text-foreground': {
          'color': 'rgb(10, 22, 40)',
        },
        '.text-primary': {
          'color': 'rgb(10, 22, 40)',
        },
        '.text-primary-foreground': {
          'color': 'rgb(245, 230, 211)',
        },
        '.text-secondary': {
          'color': 'rgb(139, 69, 19)',
        },
        '.text-secondary-foreground': {
          'color': 'rgb(245, 230, 211)',
        },
        '.text-muted-foreground': {
          'color': 'rgb(75, 85, 99)',
        },
        '.text-accent-foreground': {
          'color': 'rgb(10, 22, 40)',
        },
        '.border-border': {
          'border-color': 'rgb(229, 225, 221)',
        },
        '.border-input': {
          'border-color': 'rgb(229, 225, 221)',
        },
        '.ring-ring': {
          '--tw-ring-color': 'rgb(139, 69, 19)',
        },
        // Custom utilities
        '.glass': {
          background: 'rgba(245, 230, 211, 0.7)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(245, 230, 211, 0.2)',
        },
        '.gradient-gentleman': {
          background: 'linear-gradient(135deg, rgb(10, 22, 40) 0%, rgb(59, 73, 99) 50%, rgb(139, 69, 19) 100%)',
        },
        '.gradient-cream': {
          background: 'linear-gradient(135deg, rgb(248, 242, 236) 0%, rgb(245, 230, 211) 100%)',
        },
        '.text-gradient-gentleman': {
          background: 'linear-gradient(135deg, rgb(10, 22, 40), rgb(139, 69, 19))',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-gradient-metallic': {
          background: 'linear-gradient(135deg, rgb(183, 110, 121), rgb(200, 130, 140))',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.glow-cognac': {
          'box-shadow': '0 0 20px rgba(139, 69, 19, 0.3)',
        },
        '.glow-metallic': {
          'box-shadow': '0 0 20px rgba(183, 110, 121, 0.4)',
        },
        '.shimmer': {
          animation: 'shimmer 2s infinite linear',
          background: 'linear-gradient(90deg, transparent 0%, rgba(183, 110, 121, 0.2) 50%, transparent 100%)',
          'background-size': '1000px 100%',
        },
        '.hover-lift': {
          transition: 'all 0.3s ease-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      })
    },
  ],
}

export default config
