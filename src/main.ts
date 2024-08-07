import Trie from "./Trie";
import data from "./trie.txt";

const t = new Trie(data);

export function getJyutpingList(s: string) {
  return t.get(s);
}

export function getJyutping(s: string) {
  return t
    .get(s)
    .map(([k, v]) => k + (v ? `(${v})` : ""))
    .join("");
}

export function getJyutpingText(s: string) {
  return t
    .get(s)
    .map(([, v]) => v)
    .filter(v => v)
    .join(" ");
}

export function getJyutpingCandidates(s: string) {
  return t.getAll(s);
}

export function getIPAList(s: string) {
  return t.get(s).map(a => ((a[1] &&= jyutpingToIPA(a[1])), a));
}

export function getIPA(s: string) {
  return t
    .get(s)
    .map(([k, v]) => k + (v ? `[${jyutpingToIPA(v)}]` : ""))
    .join("");
}

export function getIPAText(s: string) {
  return t
    .get(s)
    .map(([, v]) => v && jyutpingToIPA(v))
    .filter(v => v)
    .join(".");
}

export function getIPACandidates(s: string) {
  return t.getAll(s).map(a => ((a[1] = a[1].map(jyutpingToIPA)), a));
}

type StringRecord = Record<string, string>;

const onset: StringRecord = {
  b: "p",
  p: "pʰ",
  m: "m",
  f: "f",
  d: "t",
  t: "tʰ",
  n: "n",
  l: "l",
  g: "k",
  k: "kʰ",
  ng: "ŋ",
  gw: "kʷ",
  kw: "kʷʰ",
  w: "w",
  h: "h",
  z: "t͡s",
  c: "t͡sʰ",
  s: "s",
  j: "j",
};

const nucleus: StringRecord = {
  aa: "aː",
  a: "ɐ",
  e: "ɛː",
  i: "iː",
  o: "ɔː",
  u: "uː",
  oe: "œː",
  eo: "ɵ",
  yu: "yː",
};

const rhyme: StringRecord = {
  ei: "ei̯",
  ing: "eŋ",
  ik: "ek̚",
  ou: "ou̯",
  ung: "oŋ",
  uk: "ok̚",
  eoi: "ɵy̑",
  m: "m̩",
  ng: "ŋ̍",
};

const coda: StringRecord = {
  i: "i̯",
  u: "u̯",
  m: "m",
  n: "n",
  ng: "ŋ",
  p: "p̚",
  t: "t̚",
  k: "k̚",
};

const tone: StringRecord = {
  1: "˥",
  2: "˧˥",
  3: "˧",
  4: "˨˩",
  5: "˩˧",
  6: "˨",
};

const regex = /^([gk]w?|ng|[bpmfdtnlhwzcsj]?)(?![1-6]$)((aa?|oe?|eo?|y?u|i?)(ng|[iumnptk]?))([1-6]?)$/;

export function jyutpingToIPA(s: string) {
  return s
    .toLowerCase()
    .split(/\W+/)
    .map(t => {
      const [, initial, final, vowel, terminal, number] = regex.exec(t) || [];
      return (
        (initial && onset[initial]) +
        (final in rhyme ? rhyme[final] : (vowel && nucleus[vowel]) + (terminal && coda[terminal])) +
        (number && tone[number])
      );
    })
    .join(".");
}
