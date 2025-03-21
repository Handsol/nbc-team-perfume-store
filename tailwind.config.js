/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // 색상
      colors: {
        peach: '#FFE8DF',
        white: '#FFFFFF',
        lightgray: '#F0F0F0',
        gray: '#888888',
        black: '#242424'
      },
      // 폰트 크기
      fontSize: {
        xs: '0.75rem', // 12px
        base: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.5rem' // 24px
      },
      // 간격
      spacing: {
        xs: '0.25rem', // 4px
        sm: '0.5rem', // 8px
        md: '0.75rem', // 12px
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        '2xl': '2rem' // 32px
      },
      // 보더 반경
      borderRadius: {
        sm: '0.125rem', // 2px
        md: '0.375rem', // 6px
        lg: '0.5rem', // 8px
        xl: '1rem', // 16px
        full: '9999px' // 원형
      },
      // 폰트 패밀리(보강 필요)
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif']
      },
      // 그림자
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.15)'
      }
    }
  },
  plugins: []
};
