module.exports = {
  root: true,
  plugins: ["unused-imports", "lodash"],
  extends: ["next", "next/core-web-vitals", "plugin:lodash/recommended"],
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
    "lodash/prefer-lodash-method": [2, { ignoreMethods: ["map"] }],
  },
}
