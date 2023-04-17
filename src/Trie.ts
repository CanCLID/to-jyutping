type Node = Map<string, Node> & { v?: string[] };

export default class Trie {
  t: Node = new Map();

  constructor(s: string) {
    const d = Array.from(s);
    const n = [this.t];
    for (let i = 1; n.length; ) {
      const k: string[] = [];
      while ((d[i].codePointAt(0) as number) >= 256) k.push(d[i++]);
      const f = k.reduce((t, c) => {
        const u: Node = new Map();
        t.set(c, u);
        return u;
      }, n[n.length - 1]);
      let p = "";
      while ((d[i].codePointAt(0) as number) < 123 || d[i] === "|") p += d[i++];
      if (p.length) f.v = p.split("|").map(decodeJyutping);
      if (d[i] === "{") i++, n.push(f);
      else if (d[i] === "}") i++, n.pop();
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
      const u = t.get(r[i][0]);
      if (!u) continue;
      for (let t = u, j = i + 1; j < r.length; j++) {
        const u = t.get(r[j][0]);
        if (!u) break;
        if ((t = u).v) {
          const l = j - i;
          for (const p of t.v)
            for (let d = p.split(" "), k = i; k <= j; k++) {
              const s = r[k][1];
              if (!(l in s)) s[l] = [d[k - i]];
              else s[l].push(d[k - i]);
            }
        }
      }
    }
    return r.map(([c, s]) => [c, Array.from(new Set(s.reverse().flat()))]);
  }
}

const initial = ["", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "ng", "gw", "kw", "w", "h", "z", "c", "s", "j"];
const nucleus = ["aa", "a", "e", "i", "o", "u"];
const unit = ["oe", "oen", "oeng", "oet", "oek", "eoi", "eon", "eot", "yu", "yun", "yut", "m", "ng"];
const terminal = ["", "i", "u", "m", "n", "ng", "p", "t", "k"];

function decodeJyutping(s: string) {
  return (s.match(/../g) || [])
    .map(c => {
      const order = (c.charCodeAt(0) - 33) * 90 + (c.charCodeAt(1) - 33);
      const group = ~~((order % 402) / 6);
      return (
        initial[~~(order / 402)] +
        (group >= 54 ? unit[group - 54] : nucleus[~~(group / 9)] + terminal[group % 9]) +
        ((order % 6) + 1)
      );
    })
    .join(" ");
}
