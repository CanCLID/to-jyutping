import data from "./trie.txt";
import { decodeJyutping } from "./utils";

type Node = Map<string, Node> & { v?: string[]; m?: WeakMap<Trie, string[] | null | undefined> };

const root: Node = new Map();

let s = Array.from(data);
let n = [root];
let l = [0];
for (let i = 1; n.length;) {
	let p = n[n.length - 1];
	let d = l[l.length - 1];
	while (s[i].codePointAt(0)! >= 256) {
		const u = new Map();
		p.set(s[i++], u);
		p = u;
		d++;
	}
	const v: string[] = [];
	while (s[i].codePointAt(0)! < 123) {
		const w: string[] = [];
		for (let c = 0; c < d;) {
			w.push(decodeJyutping((s[i++].charCodeAt(0) - 33) * 90 + (s[i++].charCodeAt(0) - 33)));
			if (s[i] === "~") i++;
			else c++;
		}
		v.push(w.join(" "));
	}
	if (v.length) p.v = v;
	if (s[i] === "{") {
		i++;
		n.push(p);
		l.push(d);
	}
	else if (s[i] === "}") {
		i++;
		n.pop();
		l.pop();
	}
}
// Release memory
n = undefined!;
l = undefined!;
s = undefined!;

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
