import { expect, test } from "bun:test";

import ToJyutping from "../src";

test("loads persistent custom entries from JSON", async () => {
	const dictionaryUrl = new URL("../examples/custom-dictionary.json", import.meta.url);
	const entries: Record<string, string | string[] | null> = await Bun.file(dictionaryUrl).json();
	const converter = ToJyutping.customize(entries);

	expect(converter.getJyutpingText("上堂終於講到分數")).toEqual("soeng6 tong4 zung1 jyu1 gong2 dou2 fan6 sou3");
	expect(converter.getJyutpingCandidates("到")).toEqual([["到", ["dou2", "dou3"]]]);
	expect(ToJyutping.getJyutpingText("上堂終於講到分數")).toEqual("soeng5 tong4 zung1 jyu1 gong2 dou3 fan1 sou3");
});
