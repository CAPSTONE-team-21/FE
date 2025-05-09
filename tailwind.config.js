/** @type {import('tailwindcss').Config} */
import borderGradientRadius from 'tailwindcss-border-gradient-radius';
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
          purple: 'rgb(139, 91, 254, 1)',
          2: 'rgba(59, 104, 239, 0.02)',
          7: 'rgba(59, 104, 239, 0.07)',
          20: 'rgba(59, 104, 239, 0.20)',
          buttonStroke: 'rgba(59, 104, 239, 0.3)', // 버튼 테두리 고정값
          buttonFill: 'rgba(59, 104, 239, 0.05)', // 버튼 fill 고정값
          typeStroke: 'rgba(59, 104, 239, 0.1)', // TypeStroke 고정값
          typeBackground: 'rgba(59, 104, 239, 0.04)', // TypeStroke 고정값
          chatFilter: 'rgba(249, 250, 255)', // TypeStroke 고정값
          chatFilterStroke: 'rgba(59, 104, 239, 0.07)', // TypeStroke 고정값
          chatFilterHover: 'rgba(59, 104, 239, 0.8)', // TypeStroke 고정값
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
          stroke15: 'rgba(0, 0, 0, 0.15)',
          stroke20: 'rgba(0, 0, 0, 0.2)',
          stroke30: 'rgba(0, 0, 0, 0.3)',
          stroke50: 'rgba(0, 0, 0, 0.5)',
          stroke60: 'rgba(0, 0, 0, 0.6)',
          stroke70: 'rgba(0, 0, 0, 0.7)',
        },
        bubble: {
          DEFAULT: 'rgb(var(--color-bubble) / <alpha-value>)',
        },
      },
      boxShadow: {
        custom: '0px 1px 4px 0px rgba(0,0,0,0.1)',
        modal: '0px 30px 80px 0px rgba(0,0,0,0.1)',
      },
    },
    keyframes: {
      typing: {
        '0%': {
          width: '0%',
          visibility: 'hidden',
        },
        '100%': {
          width: '100%',
        },
      },
      blink: {
        '50%': {
          borderColor: 'transparent',
        },
        '100%': {
          borderColor: 'white',
        },
      },
    },
    animation: {
      typing: 'typing 1.5s steps(16) alternate, blink .7s infinite',
    },
  },

  plugins: [borderGradientRadius],
  experimental: {
    // Tailwind가 className 내부의 동적 표현식을 더 잘 감지하게 해주는 설정
    classRegex: [
      ['className="([^"]+)"', 1],
      ['className={`([^`]+)`', 1],
    ],
  },
};
