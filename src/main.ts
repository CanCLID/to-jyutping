import Trie from "./Trie";
import data from "./dictionary.txt";

const t = new Trie();
data
  .trim()
  .split("\n")
  .forEach(a => {
    const [k, v] = a.split("\t");
    t.set(k, v);
  });

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

type StringRecord = Record<string, string>;

const initial: StringRecord = {
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

const unit: StringRecord = {
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

const terminal: StringRecord = {
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

const regex = /^([gk]w?|ng|[bpmfdtnlhwzcsj]?)(aa?|oe|eo|yu|[eiou]?)(ng|[iumnptk]?)([1-6]?)$/;

export function jyutpingToIPA(s: string) {
  return s
    .split(/[\s'.]+/)
    .map(t => {
      const [, lead, vowel, final, number] = regex.exec(t) || [];
      const group = vowel + final;
      return (
        (lead && initial[lead]) +
        (group in unit ? unit[group] : (vowel && nucleus[vowel]) + (final && terminal[final])) +
        (tone && tone[number])
      );
    })
    .join(".");
}
