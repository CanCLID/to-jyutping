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

### Helper

```js
> ToJyutping.jyutpingToIPA("jat1");
"jɐt̚˥"
> ToJyutping.jyutpingToIPA("cin1 ngaa5");
"t͡sʰiːn˥.ŋaː˩˧"
```

Note that autocorrection is intentionally not included in this helper, and an error is thrown if strings like `jyt6` are passed into the function.
