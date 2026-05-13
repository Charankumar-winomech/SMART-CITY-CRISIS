/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        city: {
          ink: '#030711',
          panel: '#071626',
          cyan: '#20b7ff',
          green: '#63e85d',
          yellow: '#ffd21c',
          red: '#ff454f',
          violet: '#b65cff'
        }
      },
      boxShadow: {
        cyan: '0 0 18px rgba(32,183,255,.42)',
        green: '0 0 18px rgba(99,232,93,.34)',
        yellow: '0 0 18px rgba(255,210,28,.4)',
        red: '0 0 22px rgba(255,69,79,.5)'
      },
      fontFamily: {
        display: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
