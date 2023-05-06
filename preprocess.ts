import { createReadStream, createWriteStream } from "fs";
import { createInterface } from "readline";
import { readdir } from "fs/promises";
import { resolve } from "path";
import { OpenCC } from "opencc";
import { pipeline } from "stream/promises";
import Trie from "./Trie";

(async () => {
  const rankDict: Record<string, number> = {
    預設: 0,
    常用: 1,
    罕見: 2,
    棄用: 3,
  };

  const data = new Map<string, Map<string, number>>();

  const rl = createInterface({
    input: createReadStream("./rime-cantonese-upstream/char.csv"),
    crlfDelay: Infinity,
  })[Symbol.asyncIterator]();
  await rl.next();

  for await (const line of rl) {
    const [char, jyutping, pronRank] = line.split(",");
    if (/[ -~]/.test(char)) continue;
    const freq = rankDict[pronRank];
    const map = data.get(char);
    if (map) {
      const originalFreq = map.get(jyutping) ?? -1;
      if (freq > originalFreq) map.set(jyutping, freq);
    } else data.set(char, new Map([[jyutping, freq]]));
  }

  for (const path of await readdir("./rime-cantonese-upstream")) {
    if (path === "char.csv" || !path.endsWith(".csv")) continue;
    const rl = createInterface({
      input: createReadStream(resolve("./rime-cantonese-upstream", path)),
      crlfDelay: Infinity,
    })[Symbol.asyncIterator]();
    const columns = (await rl.next()).value.split(",");
    const charColumn = columns.indexOf("char");
    const jyutpingColumn = columns.indexOf("jyutping");
    if (charColumn === -1 || jyutpingColumn === -1) continue;

    for await (const line of rl) {
      const values = line.split(",");
      const char = values[charColumn];
      if (/[ -~]/.test(char)) continue;
      const jyutping = values[jyutpingColumn];
      if (Array.from(char).length !== jyutping.split(" ").length) continue;
      const map = data.get(char);
      if (map) {
        if (!map.has(jyutping)) map.set(jyutping, 4);
      } else data.set(char, new Map([[jyutping, 4]]));
    }
  }

  const dict = new Map(
    Array.from(data, ([char, map]) => {
      const freqToJyutping: string[][] = [];
      for (const [jyutping, freq] of map) {
        if (!(freq in freqToJyutping)) freqToJyutping[freq] = [jyutping];
        else freqToJyutping[freq].push(jyutping);
      }
      return [
        char,
        freqToJyutping.flatMap(rank =>
          rank
            .map(jyutping => [
              jyutping,
              jyutping
                .split(" ")
                .map(u => " 213546"[+u[u.length - 1]] || "_")
                .join(""),
            ])
            .sort(([, left], [, right]) => +(left > right) || -(left < right))
            .map(([jyutping]) => jyutping)
        ),
      ];
    })
  );

  const converter = new OpenCC("t2s.json");
  await Promise.all(
    Array.from(dict, ([char, map]) => converter.convertPromise(char).then(result => dict.set(result, map)))
  );
  await pipeline(
    Array.from(dict, ([char, jyutpings]) => char + "\t" + jyutpings.join("\t") + "\n"),
    createWriteStream("./dict/dictionary.txt")
  );
  const trie = new Trie();
  for (const line of dict) trie.set(...line);
  await new Promise(resolve => createWriteStream(`dict/trie.txt`).write(trie.serialize(), resolve));
})();
