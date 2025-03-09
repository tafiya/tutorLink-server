import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Apply to specific file types
    languageOptions: {
      globals: {
        ...globals.browser, // Include predefined browser globals (e.g., `window`, `document`)
        process: "readonly", // Add `process` as a custom global
      },
    },
    ignores: ["node_modules", "dist"], // Ignore these folders
    rules: {
      "no-unused-vars": "error", // Disallow unused variables
      "no-unused-expressions": "error", // Disallow unused expressions
      "prefer-const": "error", // Enforce `const` for variables that are not reassigned
      "no-console": "warn", // Warn for console statements
      "no-undef": "error", // Disallow the use of undeclared variables
    },
  },
  pluginJs.configs.recommended, // Include recommended rules from `@eslint/js`
  ...tseslint.configs.recommended, // Include recommended rules from `typescript-eslint`
];
