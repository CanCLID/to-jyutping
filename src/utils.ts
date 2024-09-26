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
