module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-unsafe-optional-chaining": "warn",
    "react/prop-types": "warn",
    "react/no-unescaped-entities": "warn",
    "react/no-children-prop": "warn",
    "no-unreachable": "warn",
    "react/react-in-jsx-scope": 0,
  },
};
