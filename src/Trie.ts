type Node = Map<string, Node> & { v?: string[] };

export default class Trie {
  t: Node = new Map();

  constructor(s: string) {
    const a = Array.from(s);
    const n = [this.t];
    for (let i = 1; n.length; ) {
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
  }

  get(s: string) {
    const r: [string, string | null][] = [];
    for (let a = Array.from(s), i = 0; i < a.length; ) {
      let t = this.t,
        c = "",
        k = i;
      for (let j = i; j < a.length; j++) {
        const u = t.get(a[j]);
        if (!u) break;
        if ((t = u).v) {
          c = t.v[0];
          k = j;
        }
      }
      if (k === i) r.push([a[i++], c || null]);
      else for (const d = c.split(" "), n = i; i <= k; i++) r.push([a[i], d[i - n]]);
    }
    return r;
  }

  getAll(s: string): [string, string[]][] {
    const t = this.t;
    const r: [string, string[][]][] = Array.from(s, c => {
      const v = t.get(c)?.v;
      return [c, v ? [v] : []];
    });
    for (let i = 0; i < r.length; i++) {
      let u = t.get(r[i][0]);
      if (!u) continue;
      for (let j = i + 1; j < r.length; j++) {
        u = u.get(r[j][0]);
        if (!u) break;
        if (u.v) {
          const l = j - i;
          for (const p of u.v)
            for (let d = p.split(" "), k = i; k <= j; k++) {
              const s = r[k][1];
              if (l in s) s[l].push(d[k - i]);
              else s[l] = [d[k - i]];
            }
        }
      }
    }
    return r.map(([c, s]) => [c, Array.from(new Set(s.reverse().flat()))]);
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
      onset[~~(order / 402)] +
      (final >= 54 ? rhyme[final - 54] : nucleus[~~(final / 9)] + coda[final % 9]) +
      ((order % 6) + 1)
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
