/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#222222',
        primary: '#0066CC',
        'primary-hover': '#0055AA',
        gray: {
          light: '#CCCCCC',
          DEFAULT: '#666666',
          dark: '#222222'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px'
      }
    }
  },
  plugins: [],
};