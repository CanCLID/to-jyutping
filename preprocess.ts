import axios from "axios";
import { OpenCC } from "opencc";
import { writeFileSync } from "fs";
(async () => {
  const response = await axios.get<string>(
    "https://raw.githubusercontent.com/rime/rime-cantonese/main/jyut6ping3.dict.yaml"
  );
  const dict = response.data.split("\n")[Symbol.iterator]();
  while (dict.next().value !== "...");
  const data: Map<string, [string, number]> = new Map();
  for (const line of dict) {
    if (!line || line[0] === "#") continue;
    const [字, 粵拼, freq] = line.split("\t");
    const 詞頻 = freq ? (freq.slice(-1) === "%" ? +freq.slice(0, -1) * 0.01 : +freq) : 0.07;
    if (isNaN(詞頻)) continue;
    const length = Array.from(字).length;
    if (length !== 粵拼.split(" ").length && length !== 1) continue;
    const 元字 = data.get(字);
    if (元字) {
      const [元粵拼, 元詞頻] = 元字;
      if (!(詞頻 > 元詞頻 || (詞頻 === 元詞頻 && 元粵拼.slice(-1) !== "2" && 粵拼.slice(-1) === "2"))) continue;
    }
    data.set(字, [粵拼, 詞頻]);
  }
  const map: Map<string, string> = new Map();
  const converter = new OpenCC("t2s.json");
  data.forEach(([粵拼], 字) => {
    map.set(字, 粵拼);
    map.set(converter.convertSync(字), 粵拼);
  });
  let result = "";
  map.forEach((粵拼, 字) => {
    result += 字 + "\t" + 粵拼 + "\n";
  });
  writeFileSync("./src/dictionary.txt", result);
})();
