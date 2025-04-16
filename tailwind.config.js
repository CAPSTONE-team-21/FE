/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard'],
      },
      colors: {
        main: {
          DEFAULT: 'rgb(var(--color-main) / <alpha-value>)',
          hover: 'rgb(var(--color-main-hover) / <alpha-value>)',
          buttonStroke: 'rgba(59, 104, 239, 0.3)', // 버튼 테두리 고정값
          buttonHover: 'rgba(59, 104, 239, 0.)', // 버튼 테두리 고정값
          buttonFill: 'rgba(59, 104, 239, 0.05)', // 버튼 fill 고정값
          typeStroke: 'rgba(59, 104, 239, 0.1)', // TypeStroke 고정값
          typeBackground: 'rgba(59, 104, 239, 0.04)', // TypeStroke 고정값
          newChatHover: 'rgba(59, 104, 239, 0.04)',
        },
        login: {
          DEFAULT: 'rgb(var(--color-login) / <alpha-value>)',
        },
        star: {
          DEFAULT: 'rgb(var(--color-star) / <alpha-value>)',
        },
        gray: {
          DEFAULT: 'rgb(var(--color-gray) / <alpha-value>)',
          stroke01: 'rgba(0, 0, 0, 0.01)',
          stroke02: 'rgba(0, 0, 0, 0.02)',
          stroke03: 'rgba(0, 0, 0, 0.03)',
          stroke04: 'rgba(0, 0, 0, 0.04)',
          stroke05: 'rgba(0, 0, 0, 0.05)',
          stroke07: 'rgba(0, 0, 0, 0.07)',
          stroke10: 'rgba(0, 0, 0, 0.1)',
          stroke30: 'rgba(0, 0, 0, 0.3)',
          stroke60: 'rgba(0, 0, 0, 0.6)',
          stroke70: 'rgba(0, 0, 0, 0.7)',
        },
        bubble: {
          DEFAULT: 'rgb(var(--color-bubble) / <alpha-value>)',
        },
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '1' },
          '25%': { opacity: '0.7' },
          '50%': { opacity: '0.4' },
          '75%': { opacity: '0.1' },
          '100%': { opacity: '0' },
        },
        soloFlicker: {
          '0%': { opacity: '1' },
          '49.9%': { opacity: '1' },
          '50%': { opacity: '0' },
          '100%': { opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        gradientFade: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        flicker: 'flicker 1s infinite alternate',
        soloFlicker: 'soloFlicker 0.6s linear infinite',
        shimmer: 'shimmer 1.2s ease-in-out infinite',
        gradientFade: 'gradientFade 2.5s ease-in-out infinite',
      },
    },
  },

  plugins: [],
  experimental: {
    // Tailwind가 className 내부의 동적 표현식을 더 잘 감지하게 해주는 설정
    classRegex: [
      ['className="([^"]+)"', 1],
      ['className={`([^`]+)`', 1],
    ],
  },
};
