// Originally written in Python. Converted from https://github.com/CanCLID/ToJyutping/blob/main/src/ToJyutping/utils.py

// Romanization text can actually be formatted with ease by applying the Unicode line breaking algorithm (UAX #14, https://unicode.org/reports/tr14/) and adding spaces to all mandatory and optional line breaks.
// However, `new Intl.Segmenter("zxx", { granularity: "line" })` is still Stage 1, see https://github.com/tc39/proposal-intl-segmenter-v2,
// (Also see https://github.com/tc39/proposal-stable-formatting for the language tag)
// And a polyfill would be slow.
// So this is a simple alternative for a quick formatting.

const punctDict = new Map(
	zip(
		`!"'(),-./:;?[]{}~·‐‑‒–—―‘’“”…⋮⋯⸱⸳⸺⸻、。〈〉《》「」『』【】〔〕〖〗〘〙〚〛〜〝〞〟・︐︑︒︓︔︕︖︗︘︙︱︲︵︶︷︸︹︺︻︼︽︾︿﹀﹁﹂﹃﹄﹇﹈﹐﹑﹒﹔﹕﹖﹗﹘﹙﹚﹛﹜﹝﹞﹣！＂＇（），－．／：；？［］｛｝～｟｠｡｢｣､･`,
		`!"'(),-./:;?[]{}~·------‘’“”………··--,.‘’“”“”‘’[][][][][]~“””·,,.:;!?[]…--(){}[][]“”‘’“”‘’[],,.;:?!-(){}[]-!"'(),-./:;?[]{}~().“”,·`,
	),
);

const leftBracket = new Set("([{‘“");
const rightBracket = new Set(")]}’”");
const leftBracketToRight = new Map(zip(leftBracket, rightBracket));
const leftPunct = new Set(leftBracket);
const rightPunct = new Set([..."!,.:;?…", ...rightBracket]);
const otherPunct = new Set(`"'·-~`);
const leftOrOtherPunct = new Set([" ", ...leftPunct, ...otherPunct]);
const rightOrOtherPunct = new Set([...rightPunct, ...otherPunct]);

const minusSigns = new Set("-﹣－");
const decimalSeps = new Set("',.·⸱⸳﹒＇．");
const digits = new Set("0０𝟎𝟘𝟢𝟬𝟶🯰1１𝟏𝟙𝟣𝟭𝟷🯱2２𝟐𝟚𝟤𝟮𝟸🯲3３𝟑𝟛𝟥𝟯𝟹🯳4４𝟒𝟜𝟦𝟰𝟺🯴5５𝟓𝟝𝟧𝟱𝟻🯵6６𝟔𝟞𝟨𝟲𝟼🯶7７𝟕𝟟𝟩𝟳𝟽🯷8８𝟖𝟠𝟪𝟴𝟾🯸9９𝟗𝟡𝟫𝟵𝟿🯹");
const unknownOrHyphen = new Set(["", "-"]);

export function formatRomanizationText(s: string, conv: (s: string) => [string, string | null][]): string {
	return s.replace(/[^\0-\x1f\x80-\x9f]+/g, m => {
		const t: string[] = [null!];
		const d: string[] = [null!];
		for (const [k, v] of conv(m)) {
			if (v) {
				t.push(v);
				d.push(null!);
			}
			else if (k.trim()) {
				t.push(punctDict.get(k) || "");
				d.push(k);
			}
		}
		t.push(null!);
		d.push(null!);
		let l = "";
		let b = "";
		for (let i = 1; i < d.length - 1; i++) {
			const p = t[i - 1];
			const c = t[i];
			const n = t[i + 1];

			/* eslint-disable no-inner-declarations */
			/* eslint-disable @typescript-eslint/no-loop-func */

			function between() {
				let j = i - 1;
				while (j && rightBracket.has(t[j])) j--;

				const f = j && t[j] && t[j].length > 1;
				j = i + 1;
				while (j < t.length - 1 && leftBracket.has(t[j])) j++;

				const g = j && t[j] && t[j].length > 1;
				return f && g;
			}

			function lSpace() {
				if (l && !leftOrOtherPunct.has(l[l.length - 1])) l += " ";
			}

			function rSpace() {
				if (minusSigns.has(d[i + 1]) ? i < d.length - 2 && digits.has(d[i + 2]) : !rightOrOtherPunct.has(n)) l += " ";
			}

			/* eslint-enable no-inner-declarations */
			/* eslint-enable @typescript-eslint/no-loop-func */

			if (c.length > 1) {
				lSpace();
				l += c;
				rSpace();
			}
			else if (!c || (minusSigns.has(d[i]) && digits.has(d[i + 1]) && !unknownOrHyphen.has(p))) {
				if (!l.endsWith("[…]")) l += "[…]";
			}
			else if (decimalSeps.has(d[i]) && digits.has(d[i + 1]) && digits.has(d[i - 1])) {
				continue;
			}
			else if (leftPunct.has(c)) {
				lSpace();
				l += c;
				b += leftBracketToRight.get(c);
			}
			else if (rightPunct.has(c)) {
				l += c;
				rSpace();
				const j = b.lastIndexOf(c);
				if (j !== -1) b = b.substring(0, j);
			}
			else if (c === "-") {
				if (p === "-") continue;
				if (n === "-" || between()) l += " – ";
				else l += c;
			}
			else if (c === "~") {
				if ((p === "~" && n !== "~") || between()) l += "~ ";
				else l += c;
			}
			else if (c === "·") {
				l += c;
			}
			else {
				let j = b.length - 1;
				let y = false;
				while (j >= 0 && !rightBracket.has(b[j])) {
					if (b[j] === c) {
						y = true;
						break;
					}
					j--;
				}
				if (y) {
					b = b.slice(0, j);
					l += c;
					rSpace();
				}
				else {
					lSpace();
					l += c;
					b += c;
				}
			}
		}
		return l.trim().replace(/\s+/, " ");
	});
}

const majorBreak = new Set(".!?…");
const minorBreak = new Set(",/:;-~()[]{}");

export function formatIPAText(s: string, conv: (s: string) => [string, string | null][]): string {
	return s.replace(/[^\0-\x1f\x80-\x9f]+/g, m => {
		const t: string[] = [];
		const d: string[] = [];
		for (const [k, v] of conv(m)) {
			if (v) {
				t.push(v);
				d.push(null!);
			}
			else if (k.trim()) {
				t.push(punctDict.get(k) || "");
				d.push(k);
			}
		}
		d.push(null!);
		const l: string[] = [];
		for (let i = 0; i < t.length; i++) {
			const c = t[i];
			if (c.length > 1) {
				l.push(c);
			}
			else if (!c || (minusSigns.has(d[i]) && digits.has(d[i + 1]) && (!i || !unknownOrHyphen.has(t[i - 1])))) {
				if (!l.length || l[l.length - 1] !== "⸨…⸩") l.push("⸨…⸩");
			}
			else if (l.length) {
				if (decimalSeps.has(d[i]) && digits.has(d[i + 1]) && i && digits.has(d[i - 1])) continue;
				if (majorBreak.has(c)) {
					if (l[l.length - 1].length > 1) l.push("‖");
					else l[l.length - 1] = "‖";
				}
				else if (minorBreak.has(c) && l[l.length - 1].length > 1) l.push("|");
			}
		}
		if (l[l.length - 1].length === 1) l.pop();
		let s = "";
		for (let i = 0; i < l.length; i++) {
			const c = l[i];
			s += c;
			if (i < l.length - 1) {
				const n = l[i + 1];
				if (c !== "⸨…⸩" && c.length > 1 && n !== "⸨…⸩" && n.length > 1) s += ".";
				else s += " ";
			}
		}
		return s;
	});
}

// Simple alternative to `Iterator.zip`, see https://github.com/tc39/proposal-joint-iteration
function zip<T, U>(a: Iterable<T>, b: Iterable<U>) {
	const result: [T, U][] = [];
	const itA = a[Symbol.iterator]();
	const itB = b[Symbol.iterator]();
	let aResult: IteratorResult<T>;
	let bResult: IteratorResult<U>;
	while (!(aResult = itA.next()).done && !(bResult = itB.next()).done) {
		result.push([aResult.value, bResult.value]);
	}
	return result;
}

const onset = ["", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "ng", "gw", "kw", "w", "h", "z", "c", "s", "j"];
const nucleus = ["aa", "a", "e", "i", "o", "u"];
const rhyme = ["oe", "oen", "oeng", "oet", "oek", "eoi", "eon", "eot", "yu", "yun", "yut", "m", "ng"];
const coda = ["", "i", "u", "m", "n", "ng", "p", "t", "k"];

export function decodeJyutping(s: string) {
	return Array.from(iteratePairs(s), ([x, y]) => {
		const order = (x.charCodeAt(0) - 33) * 90 + (y.charCodeAt(0) - 33);
		const final = ~~((order % 402) / 6);
		return (
			onset[~~(order / 402)]
			+ (final >= 54 ? rhyme[final - 54] : nucleus[~~(final / 9)] + coda[final % 9])
			+ ((order % 6) + 1)
		);
	}).join(" ");
}

function* iteratePairs(s: string) {
	const it = s[Symbol.iterator]();
	for (;;) {
		const x = it.next();
		if (x.done) return;
		const y = it.next();
		if (y.done) return;
		yield [x.value, y.value] as const;
	}
}
