import { readFile } from "node:fs/promises";

import ToJyutping from "to-jyutping";

const dictionaryUrl = new URL("./custom-dictionary.json", import.meta.url);
const entries = JSON.parse(await readFile(dictionaryUrl, "utf8"));

if (!entries || Array.isArray(entries) || typeof entries !== "object") {
	throw new TypeError("The custom dictionary must be a JSON object");
}

const converter = ToJyutping.customize(entries);
console.log(converter.getJyutpingText("上堂終於講到分數"));
