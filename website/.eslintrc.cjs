/* eslint-env node */

/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: false
  },
  extends: [
    "../.eslintrc.cjs",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  ignorePatterns: ["dist", "*.html"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["jsx-a11y", "react", "react-hooks"],
  rules: {
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      pragma: "h",
      fragment: "Fragment",
      version: "detect"
    }
  }
};
