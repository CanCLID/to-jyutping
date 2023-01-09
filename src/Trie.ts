type Node = Map<string, Node> & { v?: string };

export default class Trie {
  t: Node = new Map();
  constructor(s?: string) {
    if (!s) return;
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
      while ((d[i].codePointAt(0) as number) < 123) p += d[i++];
      if (p.length) f.v = decodeJyutping(p);
      if (d[i] === "{") i++, n.push(f);
      else if (d[i] === "}") i++, n.pop();
    }
  }

  set(k: string, v: string) {
    Array.from(k).reduce((t, c) => {
      let u = t.get(c);
      if (!u) t.set(c, (u = new Map()));
      return u;
    }, this.t).v = v;
  }

  get(s: string) {
    const r: [string, string | null][] = [];
    for (let a = Array.from(s), i = 0; i < a.length; ) {
      let t = this.t,
        c = "",
        k = i + 1;
      for (let j = i; j < a.length; j++) {
        const u = t.get(a[j]);
        if (!u) break;
        if ((t = u).v) {
          c = t.v;
          k = j + 1;
        }
      }
      if (k === i + 1) r.push([a[i++], c || null]);
      else for (const d = c.split(" "), n = i; i < k; i++) r.push([a[i], d[i - n]]);
    }
    return r;
  }

  serialize() {
    return (function recursive(t: Node) {
      let result = "";
      if (t.v) result += encodeJyutping(t.v);
      if (t.size > +!t.v) result += "{";
      t.forEach((v, k) => {
        result += k + recursive(v);
      });
      if (t.size > +!t.v) result += "}";
      return result;
    })(this.t);
  }
}

const initial = ["", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "ng", "gw", "kw", "w", "h", "z", "c", "s", "j"];
const nucleus = ["aa", "a", "e", "i", "o", "u"];
const unit = ["oe", "oen", "oeng", "oet", "oek", "eoi", "eon", "eot", "yu", "yun", "yut", "m", "ng"];
const terminal = ["", "i", "u", "m", "n", "ng", "p", "t", "k"];

const regex = /^([gk]w?|ng|[bpmfdtnlhwzcsj]?)(?![1-6]$)(aa?|oe?|eo?|y?u|i?)(ng|[iumnptk]?)([1-6])$/;

export function encodeJyutping(s: string) {
  return s
    .split(/[\s'.]+/)
    .map(t => {
      const [, lead, vowel, final, number] = regex.exec(t) || [];
      const group = unit.indexOf(vowel + final);
      const order =
        +number -
        1 +
        (group !== -1 ? group + 54 : terminal.indexOf(final) + nucleus.indexOf(vowel) * 9) * 6 +
        initial.indexOf(lead) * 402;
      return String.fromCharCode(order / 90 + 33, (order % 90) + 33);
    })
    .join("");
}

export function decodeJyutping(s: string) {
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
