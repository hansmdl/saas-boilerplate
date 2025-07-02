module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    '../../packages/config/.eslintrc.cjs'
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Add any Nest.js specific rules here
  }
};
