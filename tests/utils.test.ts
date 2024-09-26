import { describe, expect, test } from "bun:test";

import { formatRomanizationText } from "../src/utils";

function simpleConv(s: string): [string, string | null][] {
	return Array.from(s, c => [c, c === "字" ? "zi6" : null]);
}

describe("utils", async () => {
	test.each(
		(await Bun.file("tests/formatRomanizationTestCases.tsv")
			.text())
			.split(/\r?\n|\r/)
			.flatMap(line => line ? [line.split("\t")] : []),
	)("formatRomanizationText(`%s`) === `%s`", (testString, expected) => {
		expect(formatRomanizationText(testString, simpleConv)).toEqual(expected);
	});
});
