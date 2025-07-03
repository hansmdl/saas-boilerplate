module.exports = {
  root: true,
  extends: ["../config/.eslintrc.cjs"],
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
