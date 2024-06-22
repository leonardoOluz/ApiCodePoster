import js from "@eslint/js";

export default [
  js.configs.recommended,

  {
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      semi: "error",
      "consistent-return": 2,
      "indent": [1, 2],
      "no-else-return": 1,
      "space-unary-ops": 2,
    },
  }
];