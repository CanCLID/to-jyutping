// ESLint Bug?
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { Trie, CustomizableTrie } from "./Trie";
import { formatIPAText, formatRomanizationText } from "./utils";

class JyutpingConverter {
	#t: Trie;

	constructor(t: Trie) {
		this.#t = t;
	}

	#getJyutpingList?: (s: string) => [string, string | null][];
	get getJyutpingList() {
		return (this.#getJyutpingList ||= s => this.#t.get(s));
	}

	#getJyutping?: (s: string) => string;
	get getJyutping() {
		return (this.#getJyutping ||= s =>
			this.#t
				.get(s)
				.map(([k, v]) => k + (v ? `(${v})` : ""))
				.join(""));
	}

	#getJyutpingText?: (s: string) => string;
	get getJyutpingText() {
		return (this.#getJyutpingText ||= s => formatRomanizationText(s, this.getJyutpingList));
	}

	#getJyutpingCandidates?: (s: string) => [string, string[]][];
	get getJyutpingCandidates() {
		return (this.#getJyutpingCandidates ||= s => this.#t.getAll(s));
	}

	#getIPAList?: (s: string) => [string, string | null][];
	get getIPAList() {
		return (this.#getIPAList ||= s => this.#t.get(s).map(a => ((a[1] &&= jyutpingToIPA(a[1])), a)));
	}

	#getIPA?: (s: string) => string;
	get getIPA() {
		return (this.#getIPA ||= s =>
			this.#t
				.get(s)
				.map(([k, v]) => k + (v ? `[${jyutpingToIPA(v)}]` : ""))
				.join(""));
	}

	#getIPAText?: (s: string) => string;
	get getIPAText() {
		return (this.#getIPAText ||= s => formatIPAText(s, this.getIPAList));
	}

	#getIPACandidates?: (s: string) => [string, string[]][];
	get getIPACandidates() {
		return (this.#getIPACandidates ||= s => this.#t.getAll(s).map(a => ((a[1] = a[1].map(jyutpingToIPA)), a)));
	}

	#customize?: (entries: Map<string, string[] | string | null | undefined> | Record<string, string[] | string | null | undefined>) => JyutpingConverter;
	get customize() {
		return (this.#customize ||= entries => {
			const t = new CustomizableTrie(this.#t);
			const converter = new JyutpingConverter(t);
			for (const [k, v] of entries instanceof Map ? entries : Object.entries(entries)) {
				t.customize(k, typeof v === "string" ? [v] : v);
			}
			return converter;
		});
	}

	/** This method exists purely due to compatibility. It is the same across all `JyutpingConverter` instances. */
	readonly jyutpingToIPA = jyutpingToIPA;
}

const ToJyutping = new JyutpingConverter(new Trie());

export default ToJyutping;

export const {
	getJyutpingList,
	getJyutping,
	getJyutpingText,
	getJyutpingCandidates,
	getIPAList,
	getIPA,
	getIPAText,
	getIPACandidates,
	customize,
} = ToJyutping;

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
				(initial && onset[initial])
				+ (final in rhyme ? rhyme[final] : (vowel && nucleus[vowel]) + (terminal && coda[terminal]))
				+ (number && tone[number])
			);
		})
		.join(".");
}
