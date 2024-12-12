/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        spaceGrotesk: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
      animation: {
        'check-mark': 'checkMark 0.5s ease-in-out',
        'pulse-intense':
          'pulseIntense 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounceSlow 1s infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        'ping-slow': 'pingSlowly 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        checkMark: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        pulseIntense: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-5deg)' },
          '75%': { transform: 'rotate(5deg)' },
        },
        pingSlowly: {
          '0%': { transform: 'scale(1)', opacity: '0.75' },
          '75%': { transform: 'scale(1.2)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '0.75' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
};
