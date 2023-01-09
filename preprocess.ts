import { spawnSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { OpenCC } from "opencc";
import Trie from "./src/Trie";

spawnSync("curl -o dict/char.csv https://raw.githubusercontent.com/CanCLID/rime-cantonese-upstream/main/char.csv");
spawnSync("curl -o dict/word.csv https://raw.githubusercontent.com/CanCLID/rime-cantonese-upstream/main/word.csv");

const data = new Map<string, [string, number]>();
for (const path of ["./dict/char.csv", "./dict/word.csv"]) {
  for (const line of readFileSync(path, { encoding: "utf-8" }).split("\n").slice(1, -1)) {
    const [字, 粵拼, freq] = line.split(",");
    if (/[ -~]/.test(字)) continue;
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
}

const map = new Map<string, string>();
const converter = new OpenCC("t2s.json");
data.forEach(([粵拼], 字) => {
  map.set(字, 粵拼);
  map.set(converter.convertSync(字), 粵拼);
});

let result = "";
const trie = new Trie();
map.forEach((粵拼, 字) => {
  result += 字 + "\t" + 粵拼 + "\n";
  trie.set(字, 粵拼);
});
writeFileSync("./dict/dictionary.txt", result);
writeFileSync("./dict/trie.txt", trie.serialize());
