/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgColor: {
          primary: '#5C5C5C',
          secondary: '##E8E8E8',
        },
        difficulty: {
          easy: '#5C5C5C', // 1: 하
          easyMedium: '##00ABFF', // 2: 중하
          medium: '#54C0B1', // 3: 중
          mediumHard: '#FFC64D', // 4: 상
          hard: '#FD5354', // 5: 최상
        },
        focus: '#00ABFF',
        add: '#54C0B1',
        delete: '#FD5354',
        edit: '#FFC64D',
        textColor: {
          title: '#333333',
          button: '#959595',
          percentage: '#707070',
          label: '#959595',
          white: '#FFFFFF',
          black: '#000000',
          warning: '##FD5354',
        },
      },
    },
  },
  plugins: [],
}
