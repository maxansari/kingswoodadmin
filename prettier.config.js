// prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js', // Adjust the path if your Tailwind config file is elsewhere.
  semi: true, // Example rule: add semicolons
  singleQuote: true, // Example rule: use single quotes
  tabWidth: 2, // Example rule: 2 spaces per tab
};