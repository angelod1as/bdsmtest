module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals"],
  plugins: ["unused-imports"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreDeclarationSort: true,
      },
    ],
  },
}
