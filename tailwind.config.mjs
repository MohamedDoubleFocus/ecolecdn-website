/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a8a',
          dark: '#1e2f6e',
          light: '#3151b5',
        },
        accent: {
          DEFAULT: '#dc2626',
          dark: '#b91c1c',
          light: '#ef4444',
        },
        sky: {
          soft: '#eff6ff',
        },
        ink: {
          DEFAULT: '#374151',
          soft: '#6b7280',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(2.5rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '600' }],
        h2: ['clamp(2rem, 3.5vw, 2.75rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '600' }],
        h3: ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '600' }],
        lead: ['1.125rem', { lineHeight: '1.65' }],
      },
      borderRadius: {
        card: '14px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 4px 20px -4px rgb(30 58 138 / 0.08)',
        lift: '0 12px 32px -10px rgb(30 58 138 / 0.18)',
        cta: '0 8px 20px -6px rgb(220 38 38 / 0.4)',
      },
      maxWidth: {
        prose: '68ch',
        container: '1200px',
      },
      spacing: {
        section: '6rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
