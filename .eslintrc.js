module.exports = {
  root: true,
  extends: ["eslint:recommended", "next/core-web-vitals"],
  env: {
    node: true,
    browser: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    semi: ["error", "never"],
    quotes: ["error", "double"],
    "no-console": "warn",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["apps/web/**/*.js", "apps/web/**/*.jsx"],
      extends: ["next/core-web-vitals"],
      rules: {
        "react/no-unescaped-entities": "off",
      },
    },
    {
      files: ["packages/**/*.js"],
      env: {
        node: true,
      },
    },
    {
      files: ["components/**/*.jsx"],
      env: {
        browser: true,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
}
