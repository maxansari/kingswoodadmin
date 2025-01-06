module.exports = {
  extends: [
    'next/core-web-vitals', // Next.js recommended rules
    'prettier', // Disables ESLint rules conflicting with Prettier
    'plugin:prettier/recommended', // Runs Prettier as an ESLint rule
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'], // Throws an error if Prettier formatting isn't followed
  },
};