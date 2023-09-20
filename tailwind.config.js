/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./fileUpload/templates/*.html', './fileUpload/static/js/*.js'],
  theme: {
    extend: {
      colors: {
        'lightCyan': 'hsl(193, 38%, 86%)',
        'neonGreen': 'hsl(150, 82%, 60%)',
        'darkBlue': 'hsl(218, 23%, 16%)',
        'darkGreyBlue': ' hsl(217, 19%, 24%)',
        'greyBlue': 'hsl(217, 19%, 38%)',
        'darkPurple': '#4D70EF',
      }
    },
  },
  plugins: [],
}

