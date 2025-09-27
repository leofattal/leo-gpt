
import nextPlugin from "eslint-config-next";

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const __dirname = dirname(__filename);
const __filename = fileURLToPath(import.meta.url);
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}, nextPlugin];

export default eslintConfig;
