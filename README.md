# to-jyutping

[![npm](https://img.shields.io/npm/v/to-jyutping)](https://www.npmjs.com/package/to-jyutping) [![types](https://img.shields.io/npm/types/to-jyutping)](https://www.npmjs.com/package/to-jyutping) [![license](https://img.shields.io/npm/l/to-jyutping)](https://www.npmjs.com/package/to-jyutping)

### 粵語拼音自動標註工具 Cantonese Pronunciation Automatic Labeling Tool

## Installation

```shell
npm install to-jyutping
```

### Via CDN

```html
<script src="https://unpkg.com/to-jyutping@3.1.1" defer></script>
```

### In Other Languages

- [Python (pip) Version](https://pypi.org/project/ToJyutping/) ([Repo](https://github.com/CanCLID/ToJyutping))

## Usage

For the 8 basic functions, examples are worth a thousand words:

```js
import ToJyutping from "to-jyutping";

> ToJyutping.getJyutpingList("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
[["咁", "gam3"], ["啱", "ngaam1"], ["老", "lou5"], ["世", "sai3"], ["要", "jiu1"], ["求", "kau4"], ["佢", "keoi5"], ["等", "dang2"], ["陣", "zan6"], ["要", "jiu3"], ["開", "hoi1"], ["會", "wui2"], ["，", null], ["剩", "zing6"], ["低", "dai1"], ["嘅", "ge3"], ["嘢", "je5"], ["我", "ngo5"], ["會", "wui5"], ["搞", "gaau2"], ["掂", "dim6"], ["㗎", "gaa3"], ["喇", "laa3"], ["。", null]]

> ToJyutping.getJyutping("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
"咁(gam3)啱(ngaam1)老(lou5)世(sai3)要(jiu1)求(kau4)佢(keoi5)等(dang2)陣(zan6)要(jiu3)開(hoi1)會(wui2)，剩(zing6)低(dai1)嘅(ge3)嘢(je5)我(ngo5)會(wui5)搞(gaau2)掂(dim6)㗎(gaa3)喇(laa3)。"

> ToJyutping.getJyutpingText("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
"gam3 ngaam1 lou5 sai3 jiu1 kau4 keoi5 dang2 zan6 jiu3 hoi1 wui2 zing6 dai1 ge3 je5 ngo5 wui5 gaau2 dim6 gaa3 laa3"

> ToJyutping.getJyutpingCandidates("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
[["咁", ["gam3", "gam2", "gam1", "gam4"]], ["啱", ["ngaam1", "aam1", "am1", "ngam1"]], ["老", ["lou5", "lou2"]], ["世", ["sai3", "sai2"]], ["要", ["jiu1", "jiu3", "jiu2"]], ["求", ["kau4"]], ["佢", ["keoi5", "heoi5"]], ["等", ["dang2"]], ["陣", ["zan6", "zan2"]], ["要", ["jiu3", "jiu2", "jiu1"]], ["開", ["hoi1"]], ["會", ["wui2", "wui5", "wui6", "wui3", "kui2", "kui3", "kwui2"]], ["，", []], ["剩", ["zing6", "sing6"]], ["低", ["dai1"]], ["嘅", ["ge3", "ge2", "koi2", "koi3"]], ["嘢", ["je5", "e5"]], ["我", ["ngo5", "o5"]], ["會", ["wui5", "wui6", "wui2", "wui3", "kui2", "kui3", "kwui2"]], ["搞", ["gaau2"]], ["掂", ["dim6", "dim3", "dim1"]], ["㗎", ["gaa3", "ga3", "gaa2", "gaa1", "gaa4"]], ["喇", ["laa3", "laa1", "laak3", "laa5", "laat3"]], ["。", []]]

> ToJyutping.getIPAList("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
[["咁", "kɐm˧"], ["啱", "ŋaːm˥"], ["老", "lou̯˩˧"], ["世", "sɐi̯˧"], ["要", "jiːu̯˥"], ["求", "kʰɐu̯˨˩"], ["佢", "kʰɵy̑˩˧"], ["等", "tɐŋ˧˥"], ["陣", "t͡sɐn˨"], ["要", "jiːu̯˧"], ["開", "hɔːi̯˥"], ["會", "wuːi̯˧˥"], ["，", null], ["剩", "t͡seŋ˨"], ["低", "tɐi̯˥"], ["嘅", "kɛː˧"], ["嘢", "jɛː˩˧"], ["我", "ŋɔː˩˧"], ["會", "wuːi̯˩˧"], ["搞", "kaːu̯˧˥"], ["掂", "tiːm˨"], ["㗎", "kaː˧"], ["喇", "laː˧"], ["。", null]]

> ToJyutping.getIPA("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
"咁[kɐm˧]啱[ŋaːm˥]老[lou̯˩˧]世[sɐi̯˧]要[jiːu̯˥]求[kʰɐu̯˨˩]佢[kʰɵy̑˩˧]等[tɐŋ˧˥]陣[t͡sɐn˨]要[jiːu̯˧]開[hɔːi̯˥]會[wuːi̯˧˥]，剩[t͡seŋ˨]低[tɐi̯˥]嘅[kɛː˧]嘢[jɛː˩˧]我[ŋɔː˩˧]會[wuːi̯˩˧]搞[kaːu̯˧˥]掂[tiːm˨]㗎[kaː˧]喇[laː˧]。"

> ToJyutping.getIPAText("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
"kɐm˧.ŋaːm˥.lou̯˩˧.sɐi̯˧.jiːu̯˥.kʰɐu̯˨˩.kʰɵy̑˩˧.tɐŋ˧˥.t͡sɐn˨.jiːu̯˧.hɔːi̯˥.wuːi̯˧˥.t͡seŋ˨.tɐi̯˥.kɛː˧.jɛː˩˧.ŋɔː˩˧.wuːi̯˩˧.kaːu̯˧˥.tiːm˨.kaː˧.laː˧"

> ToJyutping.getIPACandidates("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
[["咁", ["kɐm˧", "kɐm˧˥", "kɐm˥", "kɐm˨˩"]], ["啱", ["ŋaːm˥", "aːm˥", "ɐm˥", "ŋɐm˥"]], ["老", ["lou̯˩˧", "lou̯˧˥"]], ["世", ["sɐi̯˧", "sɐi̯˧˥"]], ["要", ["jiːu̯˥", "jiːu̯˧", "jiːu̯˧˥"]], ["求", ["kʰɐu̯˨˩"]], ["佢", ["kʰɵy̑˩˧", "hɵy̑˩˧"]], ["等", ["tɐŋ˧˥"]], ["陣", ["t͡sɐn˨", "t͡sɐn˧˥"]], ["要", ["jiːu̯˧", "jiːu̯˧˥", "jiːu̯˥"]], ["開", ["hɔːi̯˥"]], ["會", ["wuːi̯˧˥", "wuːi̯˩˧", "wuːi̯˨", "wuːi̯˧", "kʰuːi̯˧˥", "kʰuːi̯˧", "kʷʰuːi̯˧˥"]], ["，", []], ["剩", ["t͡seŋ˨", "seŋ˨"]], ["低", ["tɐi̯˥"]], ["嘅", ["kɛː˧", "kɛː˧˥", "kʰɔːi̯˧˥", "kʰɔːi̯˧"]], ["嘢", ["jɛː˩˧", "ɛː˩˧"]], ["我", ["ŋɔː˩˧", "ɔː˩˧"]], ["會", ["wuːi̯˩˧", "wuːi̯˨", "wuːi̯˧˥", "wuːi̯˧", "kʰuːi̯˧˥", "kʰuːi̯˧", "kʷʰuːi̯˧˥"]], ["搞", ["kaːu̯˧˥"]], ["掂", ["tiːm˨", "tiːm˧", "tiːm˥"]], ["㗎", ["kaː˧", "kɐ˧", "kaː˧˥", "kaː˥", "kaː˨˩"]], ["喇", ["laː˧", "laː˥", "laːk̚˧", "laː˩˧", "laːt̚˧"]], ["。", []]]
```

For `getJyutpingCandidates` and `getIPACandidates`, pronunciations are sorted according to how likely they are to be correct in a sentence, with the first being the most likely.

Methods may also be imported individually:

```js
> import { getJyutpingList } from "to-jyutping";
> getJyutpingList("咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。");
"gam3 ngaam1 lou5 sai3 jiu1 kau4 keoi5 dang2 zan6 jiu3 hoi1 wui2, zing6 dai1 ge3 je5 ngo5 wui5 gaau2 dim6 gaa3 laa3."
```

In rare cases, the pronunciation of a single character can contain more than one syllable:

```js
> ToJyutping.getJyutpingList("一瓩");
[["一", "jat1"], ["瓩", "cin1 ngaa5"]]
> ToJyutping.getIPAList("一瓩");
[["一", "jɐt̚˥"], ["瓩", "t͡sʰiːn˥.ŋaː˩˧"]]
```

They are mostly dated ligature characters (合字) coined to represent units with SI prefixes.

## Custom Entries & Existing Entries Overriding or Exclusion

With an accuracy rate of 99%, the possibility of needing an adjustment is rare. However, Cantonese, like other varieties of Chinese, is mostly written in logographs, which means that homographs (同形詞) that are indistinguishable out of context can occur. Consider the following sentence:

> 上堂終於講到分數

In the above sentence, there are multiple possible pronunciations of 上, 到 and 分, and their meanings are different depending on how they are actually pronounced:

| Pronunciation | Meaning |
| --- | --- |
| soeng**5** tong4 zung1 jyu1 gong2 dou**3** fan**1** sou3 | Attending the lesson, it finally came to talk about scores.<br>_(Perhaps the scores weren’t available until today.)_ |
| soeng**5** tong4 zung1 jyu1 gong2 dou**3** fan**6** sou3 | Attending the lesson, it finally came to talk about fractions.<br>_(Perhaps the progress of the math class was slow.)_ |
| soeng**5** tong4 zung1 jyu1 gong2 dou**2** fan**1** sou3 | Attending the lesson, eventually it was able to talk about scores.<br>_(Perhaps the teacher wasn’t allowed to reveal the scores until today.)_ |
| soeng**5** tong4 zung1 jyu1 gong2 dou**2** fan**6** sou3 | Attending the lesson, eventually it was able to talk about fractions.<br>_(Perhaps the introduction to fractions requires some other concepts to be taught.)_ |
| soeng**6** tong4 zung1 jyu1 gong2 dou**3** fan**1** sou3 | The previous lesson finally came to talk about scores.<br>_(Perhaps the teacher just made the scores available right before the previous lesson.)_ |
| soeng**6** tong4 zung1 jyu1 gong2 dou**3** fan**6** sou3 | The previous lesson finally came to talk about fractions.<br>_(Perhaps the students just managed to catch up the progress in the math class.)_ |
| soeng**6** tong4 zung1 jyu1 gong2 dou**2** fan**1** sou3 | Eventually, it was able to talk about scores in the previous lesson.<br>_(Perhaps the teacher was finally allowed to reveal the scores in the previous lesson.)_ |
| soeng**6** tong4 zung1 jyu1 gong2 dou**2** fan**6** sou3 | Eventually, it was able to talk about fractions in the previous lesson.<br>_(Perhaps the teacher just finished teaching the other concepts required for learning fractions.)_ |

Thus, the library offers the ability to include custom entries and override or exclude built-in entries:

```js
> ToJyutping.getJyutpingText("上堂終於講到分數");
"soeng5 tong4 zung1 jyu1 gong2 dou3 fan1 sou3"

> const converterLesson = ToJyutping.customize({ 上堂: null, 分數: "fan6 sou3" });
> converterLesson.getJyutpingText("上堂終於講到分數");
"soeng6 tong4 zung1 jyu1 gong2 dou3 fan6 sou3"
```

In the above example:

- By default, the library special-cases the pronunciation of 上堂 to “soeng5 tong4”. Setting `上堂` to `null` removes the special case and both 上 and 堂 now fallback to the their default pronunciations, which are “soeng6” and “tong4” respectively.
- By default, the library does not special-case 分數. Thus, the pronunciations of each individual characters, which in this case are “fan1” and “sou3”, are used. By including the entry `分數` and setting it to `fan6 sou3`, the converter outputs `fan6 sou3` when `分數` is encountered.

In general, setting any built-in entry to `null` or `undefined` fallbacks it to shorter matches and ultimately individual character pronunciations if there isn’t a match:

```js
> ToJyutping.getJyutpingText("好學生");
"hou2 hok6 saang1"

> const converterStudious = ToJyutping.customize({ 好學生: null });
> converterStudious.getJyutpingText("好學生");
"hou3 hok6 saang1" // Using shorter matches 好學 and 生

> const converterGoodStudent = converterStudious.customize({ 好學: null });
> converterGoodStudent.getJyutpingText("好學生");
"hou2 hok6 saang1" // Using individual character pronunciations as it can’t be decomposed further
```

Converters can be chained without affecting each other:

```js
> const converterDou2 = converterLesson.customize({ 到: "dou2" });
> const converterNull = converterLesson.customize({ 到: null });

> converterDou2.getJyutpingText("上堂終於講到分數");
"soeng6 tong4 zung1 jyu1 gong2 dou2 fan6 sou3"

> converterNull.getJyutpingText("上堂終於講到分數");
"soeng6 tong4 zung1 jyu1 gong2 […] fan6 sou3"

> ToJyutping.getJyutpingText("上堂終於講到分數");
"soeng5 tong4 zung1 jyu1 gong2 dou3 fan1 sou3" // Also not affected
```

> [!WARNING]
>
> - This library only offers basic customization functionality. If there are longer built-in word entries, they aren’t overridden:
>
>   ```js
>   > converterDou2.getJyutpingText("笑到轆地");
>   "siu3 dou3 luk1 dei2"
>
>   > converterNull.getJyutpingText("笑到轆地");
>   "siu3 dou3 luk1 dei2"
>
>   > const converterAnotherLesson = ToJyutping.customize({ 上: null, 分: "fan6" });
>   > converterAnotherLesson.getJyutpingText("上堂終於講到分數");
>   "soeng5 tong4 zung1 jyu1 gong2 dou3 fan6 sou3"
>   ```
>
>   In the second example, their isn’t an entry for 分數, so 分 is patched successfully. However, this is not the case for 上 since the longer built-in entry 上堂 is prioritized.
>
> - The original pronunciations will be lost. If you are using `getJyutpingCandidates` or `getIPACandidates`, you will need to include the pronunciations manually:
>   ```js
>   > const 到OriginalPronunciations = ToJyutping.getJyutpingCandidates("到");
>   > 到OriginalPronunciations
>   [["到", ["dou3", "dou2"]]]
>   > const converterDou2Dou3 = converterLesson.customize({ 到: ["dou2", ...到OriginalPronunciations[0][1]] });
>   > converterDou2Dou3.getJyutpingCandidates("到");
>   [["到", ["dou2", "dou3"]]]
>   ```
>   Notice how the library automatically deduplicates the values for you.

### Helper

```js
> ToJyutping.jyutpingToIPA("jat1");
"jɐt̚˥"
> ToJyutping.jyutpingToIPA("cin1 ngaa5");
"t͡sʰiːn˥.ŋaː˩˧"
```

Note that autocorrection is intentionally not included in this helper, and an error is thrown if strings like `jyt6` are passed into the function.
Punctuation is ignored in the helper.
