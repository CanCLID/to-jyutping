# to-jyutping

[![npm](https://img.shields.io/npm/v/to-jyutping)](https://www.npmjs.com/package/to-jyutping) [![types](https://img.shields.io/npm/types/to-jyutping)](https://www.npmjs.com/package/to-jyutping) [![license](https://img.shields.io/npm/l/to-jyutping)](https://www.npmjs.com/package/to-jyutping)

### 粵語拼音自動標註工具 Cantonese Pronunciation Automatic Labeling Tool

## Installation

```shell
npm install to-jyutping
```

### Via CDN

```html
<script src="https://unpkg.com/to-jyutping@1.0.0/dist/index.js" defer></script>
```

## Usage

```js
import ToJyutping from "to-jyutping";
> ToJyutping.getJyutpingList("一瓩係乜嘢嚟㗎？");
< [["一", "jat1"], ["瓩", "cin1 ngaa5"], ["係", "hai6"], ["乜", "mat1"], ["嘢", "je5"], ["嚟", "lai4"], ["㗎", "gaa3"], ["？", null]]
> ToJyutping.getJyutping("一瓩係乜嘢嚟㗎？");
< "一(jat1)瓩(cin1 ngaa5)係(hai6)乜(mat1)嘢(je5)嚟(lai4)㗎(gaa3)？"
> ToJyutping.getJyutpingText("一瓩係乜嘢嚟㗎？");
< "jat1 cin1 ngaa5 hai6 mat1 je5 lai4 gaa3"
> ToJyutping.getIPAList("一瓩係乜嘢嚟㗎？");
< [["一", "jɐt̚˥"], ["瓩", "t͡sʰiːn˥.ŋaː˩˧"], ["係", "hɐi̯˨"], ["乜", "mɐt̚˥"], ["嘢", "jɛː˩˧"], ["嚟", "lɐi̯˨˩"], ["㗎", "kaː˧"], ["？", null]]
> ToJyutping.getIPA("一瓩係乜嘢嚟㗎？");
< "一[jɐt̚˥]瓩[t͡sʰiːn˥.ŋaː˩˧]係[hɐi̯˨]乜[mɐt̚˥]嘢[jɛː˩˧]嚟[lɐi̯˨˩]㗎[kaː˧]？"
> ToJyutping.getIPAText("一瓩係乜嘢嚟㗎？");
< "jɐt̚˥.t͡sʰiːn˥.ŋaː˩˧.hɐi̯˨.mɐt̚˥.jɛː˩˧.lɐi̯˨˩.kaː˧"
```

### Helper

```js
> ToJyutping.jyutpingToIPA("jat1");
< "jɐt̚˥"
> ToJyutping.jyutpingToIPA("cin1 ngaa5");
> "t͡sʰiːn˥.ŋaː˩˧"
```

Note that autocorrection is intentionally not included in this helper, and an error is thrown if strings like `jyt6` are passed into the function.
