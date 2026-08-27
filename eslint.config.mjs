import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importFsdPlugin from "eslint-plugin-import-fsd";

/** FSD layer roots at repo root (no src/). Scoped so docs/public/etc. are not treated as layers. */
const fsdLayerFiles = [
  "app/**/*.{js,jsx,ts,tsx,mjs}",
  "views/**/*.{js,jsx,ts,tsx,mjs}",
  "widgets/**/*.{js,jsx,ts,tsx,mjs}",
  "features/**/*.{js,jsx,ts,tsx,mjs}",
  "entities/**/*.{js,jsx,ts,tsx,mjs}",
  "shared/**/*.{js,jsx,ts,tsx,mjs}",
];

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/rules-of-hooks": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/use-memo": "off",
      "react-hooks/purity": "off",
    },
  },
  {
    files: fsdLayerFiles,
    ...importFsdPlugin.configs.recommended,
    settings: {
      fsd: {
        rootDir: ".",
        aliases: {
          "@/*": "./*",
        },
      },
    },
    rules: {
      ...importFsdPlugin.configs.recommended.rules,
      // Template uses `views/` instead of FSD v2 `pages/` — skip deprecated-layer noise.
      "import-fsd/no-deprecated-layers": [
        "warn",
        { scope: "import", ignores: ["views"] },
      ],
    },
  },
  eslintConfigPrettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
