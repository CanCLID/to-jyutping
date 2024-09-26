import typescript from "rollup-plugin-typescript2";
import { string } from "rollup-plugin-string";
import terser from "@rollup/plugin-terser";
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
		plugins: [dts(), del({ targets: ["./dist/*", "!./dist/index.*"], hook: "buildEnd" })],
	},
];
