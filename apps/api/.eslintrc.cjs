module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    '../../packages/config/.eslintrc.cjs'
  ],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.e2e.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    // Add any Nest.js specific rules here
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  },
  ignorePatterns: [
    "dist",
    "dist-e2e",
    "scripts",
    "test"
  ],
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["jest-e2e.config.js"],
      parser: "espree",
      parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'module',
        project: null
      }
    }
  ]
};
