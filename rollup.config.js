import typescript from "rollup-plugin-typescript2";
import { string } from "rollup-plugin-string";
import terser from "@rollup/plugin-terser";
import modify from "rollup-plugin-modify";
import dts from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

/** @type { import("rollup").RollupOptions[] } */
export default [
	{
		input: "./src/index.ts",
		output: [
			{
				file: "./dist/index.js",
				format: "umd",
				exports: "named",
				name: "ToJyutping",
				sourcemap: true,
			},
			{
				file: "./dist/index.cjs",
				format: "cjs",
				exports: "named",
				sourcemap: true,
			},
			{
				file: "./dist/index.mjs",
				format: "es",
				exports: "named",
				sourcemap: true,
			},
		],
		plugins: [typescript(), string({ include: "**/*.txt" }), terser()],
	},
	{
		input: "./dist/index.d.ts",
		output: {
			file: "./dist/index.d.ts",
			format: "es",
		},
		plugins: [
			modify({ find: /\s*#private;\s*constructor\(t: Trie\);/, replace: "" }),
			modify({ find: /get (\w+).*?$/m, replace: (_, $1) => `readonly ${$1}: typeof ${$1};` }),
			dts(),
			del({ targets: ["./dist/*", "!./dist/index.*"], hook: "buildEnd" }),
		],
	},
];
