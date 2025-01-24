/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/no-unsafe-member-access": "off", //new
    "@typescript-eslint/no-unsafe-member-assignment": "off", //new
    "@typescript-eslint/no-unsafe-assignment": "off", //new
    "@typescript-eslint/no-unused-vars": "off", //new
    "@typescript-eslint/no-unsafe-call": "off", //new
    "@typescript-eslint/no-unsafe-argument": "off", //new
    "@typescript-eslint/no-explicit-any": "off", //new
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    // "@typescript-eslint/no-unused-vars": [
    //   "warn",
    //   {
    //     "argsIgnorePattern": "^_"
    //   }
    // ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ]
  }
}
module.exports = config;