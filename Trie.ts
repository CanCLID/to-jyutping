type Node = Map<string, Node> & { v?: string[] };

export default class Trie {
  t: Node = new Map();

  set(k: string, v: string[]) {
    Array.from(k).reduce((t, c) => {
      let u = t.get(c);
      if (!u) t.set(c, (u = new Map()));
      return u;
    }, this.t).v = v;
  }

  serialize() {
    return (function recursive(t: Node) {
      let result = "";
      if (t.v) result += t.v.map(encodeJyutping).join("|");
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

function encodeJyutping(s: string) {
  return s
    .split(/\W+/)
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
