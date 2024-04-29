// @ts-check
import {dirname} from "node:path";
import {fileURLToPath} from "node:url";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import nodePlugin from "eslint-plugin-n";
import eslintConfigPrettier from "eslint-config-prettier";

const __dirname = dirname(fileURLToPath(import.meta.url));
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: [
      "**/node_modules/**/*",
      "**/dist/**/*",
      "**/lib/**/*",
      "**/logs/**/*",
      "**/cert/**/*",
      "**/docker/**/*",
    ],
  },
  {
    files: [
      "./api/src/**/*.ts",
      "./socket/**/*.ts",
      "./process/src/**/*.ts",
      "./ev-common/src/**/*.ts",
    ],
    languageOptions: {
      parserOptions: {
        project: [
          "./tsconfig.eslint.json",
          "./api/tsconfig.json",
          "./socket/tsconfig.json",
          "./process/tsconfig.json",
          "./ev-common/tsconfig.json",
        ],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      n: nodePlugin,
    },
    rules: {},
  }
);
