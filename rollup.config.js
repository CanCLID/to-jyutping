import typescript from "rollup-plugin-typescript2";
import { string } from "rollup-plugin-string";
import { terser } from "rollup-plugin-terser";
/** @type { import("rollup").RollupOptions } */
const config = {
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "umd",
    exports: "named",
    name: "ToJyutping",
    sourcemap: true,
  },
  plugins: [typescript(), string({ include: "**/*.txt" }), terser()],
};
export default config;
