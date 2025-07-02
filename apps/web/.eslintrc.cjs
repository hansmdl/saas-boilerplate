module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    '../../packages/config/.eslintrc.cjs'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Add any Next.js specific rules here
  }
};
