module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths according to your project structure
    './public/index.html',
    './src/pages/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    theme: {
      extend: {
        colors: {
          'theme-100': 'rgb(255 228 105)',
          'base-200': '#dedede',
          'theme-700': 'rgb(22 101 106)',
          'theme-800': '#103f45', 
          'theme-900': '#333232',
        },
      },
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
