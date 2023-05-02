/* eslint-env node */

/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ["../.eslintrc.cjs"],
  overrides: [{ excludedFiles: ["edge"] }]
};
