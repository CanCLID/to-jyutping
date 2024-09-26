import data from "./trie.txt";

type Node = Map<string, Node> & { v?: string[]; m?: WeakMap<Trie, string[] | null | undefined> };

const root: Node = new Map();

const a = Array.from(data);
const n = [root];
for (let i = 1; n.length;) {
	const k: string[] = [];
	while (a[i].codePointAt(0)! >= 256) k.push(a[i++]);
	const f = k.reduce((t, c) => {
		const u: Node = new Map();
		t.set(c, u);
		return u;
	}, n[n.length - 1]);
	let p = "";
	while (a[i].codePointAt(0)! < 123 || a[i] === "|") p += a[i++];
	if (p) f.v = p.split("|").map(decodeJyutping);
	if (a[i] === "{") i++, n.push(f);
	else if (a[i] === "}") i++, n.pop();
}

export class Trie {
	get(s: string) {
		const r: [string, string | null][] = [];
		for (let a = Array.from(s), i = 0; i < a.length;) {
			let t = root,
				c = "",
				k = i;
			for (let j = i; j < a.length; j++) {
				const u = t.get(a[j]);
				if (!u) break;
				const v = this.getValue(t = u);
				if (v) {
					c = v[0];
					k = j;
				}
			}
			if (k === i) r.push([a[i++], c || null]);
			else for (const d = c.split(" "), n = i; i <= k; i++) r.push([a[i], d[i - n]]);
		}
		return r;
	}

	getAll(s: string): [string, string[]][] {
		const t = root;
		const r: [string, string[][]][] = Array.from(s, c => {
			const u = t.get(c);
			const v = u && this.getValue(u);
			return [c, v ? [v] : []];
		});
		for (let i = 0; i < r.length; i++) {
			let u = t.get(r[i][0]);
			if (!u) continue;
			for (let j = i + 1; j < r.length; j++) {
				u = u.get(r[j][0]);
				if (!u) break;
				const v = this.getValue(u);
				if (v) {
					const l = j - i;
					for (const p of v) {
						for (let d = p.split(" "), k = i; k <= j; k++) {
							const s = r[k][1];
							if (l in s) s[l].push(d[k - i]);
							else s[l] = [d[k - i]];
						}
					}
				}
			}
		}
		return r.map(([c, s]) => [c, Array.from(new Set(s.reverse().flat()))]);
	}

	getValue(n: Node): string[] | null | undefined {
		return n.v;
	}
}

export class CustomizableTrie extends Trie {
	#parent: Trie;

	constructor(parent: Trie) {
		super();
		this.#parent = parent;
	}

	customize(k: string, v: string[] | null | undefined) {
		(Array.from(k).reduce((t, c) => {
			let u = t.get(c);
			if (!u) t.set(c, u = new Map());
			return u;
		}, root).m ??= new WeakMap()).set(this, v);
	}

	override getValue(n: Node) {
		// return n.m?.get(this) ?? this.#parent.getValue(n);
		// Fast path if `n.m` isn't defined
		// The use of `has` and ternary operators are intentional to test if a user
		// explicitly disallow the entry by setting the value to `null` or `undefined`
		return n.m ? (n.m.has(this) ? n.m.get(this) : this.#parent.getValue(n)) : n.v;
	}
}

const onset = ["", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "ng", "gw", "kw", "w", "h", "z", "c", "s", "j"];
const nucleus = ["aa", "a", "e", "i", "o", "u"];
const rhyme = ["oe", "oen", "oeng", "oet", "oek", "eoi", "eon", "eot", "yu", "yun", "yut", "m", "ng"];
const coda = ["", "i", "u", "m", "n", "ng", "p", "t", "k"];

function decodeJyutping(s: string) {
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
