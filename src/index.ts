import { Trie, CustomizableTrie } from "./Trie";

class JyutpingConverter {
  #t: Trie;

  constructor(t: Trie) {
    this.#t = t;
  }

  getJyutpingList(s: string) {
    return this.#t.get(s);
  }

  getJyutping(s: string) {
    return this.#t
      .get(s)
      .map(([k, v]) => k + (v ? `(${v})` : ""))
      .join("");
  }

  getJyutpingText(s: string) {
    return this.#t
      .get(s)
      .map(([, v]) => v)
      .filter(v => v)
      .join(" ");
  }

  getJyutpingCandidates(s: string) {
    return this.#t.getAll(s);
  }

  getIPAList(s: string) {
    return this.#t.get(s).map(a => ((a[1] &&= jyutpingToIPA(a[1])), a));
  }

  getIPA(s: string) {
    return this.#t
      .get(s)
      .map(([k, v]) => k + (v ? `[${jyutpingToIPA(v)}]` : ""))
      .join("");
  }

  getIPAText(s: string) {
    return this.#t
      .get(s)
      .map(([, v]) => v && jyutpingToIPA(v))
      .filter(v => v)
      .join(".");
  }

  getIPACandidates(s: string) {
    return this.#t.getAll(s).map(a => ((a[1] = a[1].map(jyutpingToIPA)), a));
  }

  customize(
    entries: Map<string, string[] | string | null | undefined> | Record<string, string[] | string | null | undefined>
  ) {
    const t = new CustomizableTrie(this.#t);
    const converter = new JyutpingConverter(t);
    for (const [k, v] of entries instanceof Map ? entries : Object.entries(entries)) {
      t.customize(k, typeof v === "string" ? [v] : v);
    }
    return converter;
  }

  // For compatibility
  jyutpingToIPA = jyutpingToIPA;
}

const ToJyutping = new JyutpingConverter(new Trie());

export default ToJyutping;

export const getJyutpingList = ToJyutping.getJyutpingList.bind(ToJyutping);
export const getJyutping = ToJyutping.getJyutping.bind(ToJyutping);
export const getJyutpingText = ToJyutping.getJyutpingText.bind(ToJyutping);
export const getJyutpingCandidates = ToJyutping.getJyutpingCandidates.bind(ToJyutping);

export const getIPAList = ToJyutping.getIPAList.bind(ToJyutping);
export const getIPA = ToJyutping.getIPA.bind(ToJyutping);
export const getIPAText = ToJyutping.getIPAText.bind(ToJyutping);
export const getIPACandidates = ToJyutping.getIPACandidates.bind(ToJyutping);

export const customize = ToJyutping.customize.bind(ToJyutping);

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

const regex = /^([gk]w?|ng|[bpmfdtnlhwzcsj]?)(?![1-6]?$)((aa?|oe?|eo?|y?u|i?)(ng|[iumnptk]?))([1-6]?)$/;

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
