/* eslint-disable import/no-named-as-default-member */

import { describe, expect, test } from "bun:test";

import ToJyutping from "../src";

describe("ToJyutping", () => {
	const testString = "咁啱老世要求佢等陣要開會，剩低嘅嘢我會搞掂㗎喇。";

	test("getJyutpingList", () => {
		expect(ToJyutping.getJyutpingList(testString)).toEqual([
			["咁", "gam3"],
			["啱", "ngaam1"],
			["老", "lou5"],
			["世", "sai3"],
			["要", "jiu1"],
			["求", "kau4"],
			["佢", "keoi5"],
			["等", "dang2"],
			["陣", "zan6"],
			["要", "jiu3"],
			["開", "hoi1"],
			["會", "wui2"],
			["，", null],
			["剩", "zing6"],
			["低", "dai1"],
			["嘅", "ge3"],
			["嘢", "je5"],
			["我", "ngo5"],
			["會", "wui5"],
			["搞", "gaau2"],
			["掂", "dim6"],
			["㗎", "gaa3"],
			["喇", "laa3"],
			["。", null],
		]);
	});

	test("getJyutping", () => {
		expect(ToJyutping.getJyutping(testString)).toEqual(
			"咁(gam3)啱(ngaam1)老(lou5)世(sai3)要(jiu1)求(kau4)佢(keoi5)等(dang2)陣(zan6)要(jiu3)開(hoi1)會(wui2)，剩(zing6)低(dai1)嘅(ge3)嘢(je5)我(ngo5)會(wui5)搞(gaau2)掂(dim6)㗎(gaa3)喇(laa3)。",
		);
	});

	test("getJyutpingText", () => {
		expect(ToJyutping.getJyutpingText(testString)).toEqual(
			"gam3 ngaam1 lou5 sai3 jiu1 kau4 keoi5 dang2 zan6 jiu3 hoi1 wui2, zing6 dai1 ge3 je5 ngo5 wui5 gaau2 dim6 gaa3 laa3.",
		);
	});

	test("getJyutpingCandidates", () => {
		expect(ToJyutping.getJyutpingCandidates(testString)).toEqual([
			["咁", ["gam3", "gam2", "gam1", "gam4"]],
			["啱", ["ngaam1", "aam1", "am1", "ngam1"]],
			["老", ["lou5", "lou2"]],
			["世", ["sai3", "sai2"]],
			["要", ["jiu1", "jiu3", "jiu2"]],
			["求", ["kau4"]],
			["佢", ["keoi5", "heoi5"]],
			["等", ["dang2"]],
			["陣", ["zan6", "zan2"]],
			["要", ["jiu3", "jiu2", "jiu1"]],
			["開", ["hoi1"]],
			["會", ["wui2", "wui5", "wui6", "wui3", "kui2", "kui3", "kwui2"]],
			["，", []],
			["剩", ["zing6", "sing6"]],
			["低", ["dai1"]],
			["嘅", ["ge3", "ge2", "koi2", "koi3"]],
			["嘢", ["je5", "e5"]],
			["我", ["ngo5", "o5"]],
			["會", ["wui5", "wui6", "wui2", "wui3", "kui2", "kui3", "kwui2"]],
			["搞", ["gaau2"]],
			["掂", ["dim6", "dim3", "dim1"]],
			["㗎", ["gaa3", "ga3", "gaa2", "gaa1", "gaa4"]],
			["喇", ["laa3", "laa1", "laak3", "laa5", "laat3"]],
			["。", []],
		]);
	});

	test("getIPAList", () => {
		expect(ToJyutping.getIPAList(testString)).toEqual([
			["咁", "kɐm˧"],
			["啱", "ŋaːm˥"],
			["老", "lou̯˩˧"],
			["世", "sɐi̯˧"],
			["要", "jiːu̯˥"],
			["求", "kʰɐu̯˨˩"],
			["佢", "kʰɵy̑˩˧"],
			["等", "tɐŋ˧˥"],
			["陣", "t͡sɐn˨"],
			["要", "jiːu̯˧"],
			["開", "hɔːi̯˥"],
			["會", "wuːi̯˧˥"],
			["，", null],
			["剩", "t͡seŋ˨"],
			["低", "tɐi̯˥"],
			["嘅", "kɛː˧"],
			["嘢", "jɛː˩˧"],
			["我", "ŋɔː˩˧"],
			["會", "wuːi̯˩˧"],
			["搞", "kaːu̯˧˥"],
			["掂", "tiːm˨"],
			["㗎", "kaː˧"],
			["喇", "laː˧"],
			["。", null],
		]);
	});

	test("getIPA", () => {
		expect(ToJyutping.getIPA(testString)).toEqual(
			"咁[kɐm˧]啱[ŋaːm˥]老[lou̯˩˧]世[sɐi̯˧]要[jiːu̯˥]求[kʰɐu̯˨˩]佢[kʰɵy̑˩˧]等[tɐŋ˧˥]陣[t͡sɐn˨]要[jiːu̯˧]開[hɔːi̯˥]會[wuːi̯˧˥]，剩[t͡seŋ˨]低[tɐi̯˥]嘅[kɛː˧]嘢[jɛː˩˧]我[ŋɔː˩˧]會[wuːi̯˩˧]搞[kaːu̯˧˥]掂[tiːm˨]㗎[kaː˧]喇[laː˧]。",
		);
	});

	test("getIPAText", () => {
		expect(ToJyutping.getIPAText(testString)).toEqual(
			"kɐm˧.ŋaːm˥.lou̯˩˧.sɐi̯˧.jiːu̯˥.kʰɐu̯˨˩.kʰɵy̑˩˧.tɐŋ˧˥.t͡sɐn˨.jiːu̯˧.hɔːi̯˥.wuːi̯˧˥ | t͡seŋ˨.tɐi̯˥.kɛː˧.jɛː˩˧.ŋɔː˩˧.wuːi̯˩˧.kaːu̯˧˥.tiːm˨.kaː˧.laː˧",
		);
	});

	test("getIPACandidates", () => {
		expect(ToJyutping.getIPACandidates(testString)).toEqual([
			["咁", ["kɐm˧", "kɐm˧˥", "kɐm˥", "kɐm˨˩"]],
			["啱", ["ŋaːm˥", "aːm˥", "ɐm˥", "ŋɐm˥"]],
			["老", ["lou̯˩˧", "lou̯˧˥"]],
			["世", ["sɐi̯˧", "sɐi̯˧˥"]],
			["要", ["jiːu̯˥", "jiːu̯˧", "jiːu̯˧˥"]],
			["求", ["kʰɐu̯˨˩"]],
			["佢", ["kʰɵy̑˩˧", "hɵy̑˩˧"]],
			["等", ["tɐŋ˧˥"]],
			["陣", ["t͡sɐn˨", "t͡sɐn˧˥"]],
			["要", ["jiːu̯˧", "jiːu̯˧˥", "jiːu̯˥"]],
			["開", ["hɔːi̯˥"]],
			["會", ["wuːi̯˧˥", "wuːi̯˩˧", "wuːi̯˨", "wuːi̯˧", "kʰuːi̯˧˥", "kʰuːi̯˧", "kʷʰuːi̯˧˥"]],
			["，", []],
			["剩", ["t͡seŋ˨", "seŋ˨"]],
			["低", ["tɐi̯˥"]],
			["嘅", ["kɛː˧", "kɛː˧˥", "kʰɔːi̯˧˥", "kʰɔːi̯˧"]],
			["嘢", ["jɛː˩˧", "ɛː˩˧"]],
			["我", ["ŋɔː˩˧", "ɔː˩˧"]],
			["會", ["wuːi̯˩˧", "wuːi̯˨", "wuːi̯˧˥", "wuːi̯˧", "kʰuːi̯˧˥", "kʰuːi̯˧", "kʷʰuːi̯˧˥"]],
			["搞", ["kaːu̯˧˥"]],
			["掂", ["tiːm˨", "tiːm˧", "tiːm˥"]],
			["㗎", ["kaː˧", "kɐ˧", "kaː˧˥", "kaː˥", "kaː˨˩"]],
			["喇", ["laː˧", "laː˥", "laːk̚˧", "laː˩˧", "laːt̚˧"]],
			["。", []],
		]);
	});

	test("customize", () => {
		const converterLesson = ToJyutping.customize({ 上堂: null, 分數: "fan6 sou3" });
		expect(converterLesson.getJyutpingText("上堂終於講到分數")).toEqual("soeng6 tong4 zung1 jyu1 gong2 dou3 fan6 sou3");

		const converterStudious = ToJyutping.customize({ 好學生: null });
		expect(converterStudious.getJyutpingText("好學生")).toEqual("hou3 hok6 saang1");

		const converterGoodStudent = converterStudious.customize({ 好學: null });
		expect(converterGoodStudent.getJyutpingText("好學生")).toEqual("hou2 hok6 saang1");

		const converterDou2 = converterLesson.customize({ 到: "dou2" });
		const converterNull = converterLesson.customize({ 到: null });
		expect(converterDou2.getJyutpingText("上堂終於講到分數")).toEqual("soeng6 tong4 zung1 jyu1 gong2 dou2 fan6 sou3");
		expect(converterNull.getJyutpingText("上堂終於講到分數")).toEqual("soeng6 tong4 zung1 jyu1 gong2 […] fan6 sou3");
		expect(converterDou2.getJyutpingText("笑到轆地")).toEqual("siu3 dou3 luk1 dei2");
		expect(converterNull.getJyutpingText("笑到轆地")).toEqual("siu3 dou3 luk1 dei2");

		const converterAnotherLesson = ToJyutping.customize({ 上: null, 分: "fan6" });
		expect(converterAnotherLesson.getJyutpingText("上堂終於講到分數")).toEqual("soeng5 tong4 zung1 jyu1 gong2 dou3 fan6 sou3");

		const converterDou2Dou3 = converterLesson.customize({ 到: ["dou2", "dou3", "dou2"] });
		expect(converterDou2Dou3.getJyutpingCandidates("到")).toEqual([["到", ["dou2", "dou3"]]]);
	});

	test.skip("customize throws", () => {
		// TODO Don’t skip this after the `Jyutping` class has been implemented
		expect(() => ToJyutping.customize({ "": null })).toThrow();
		expect(() => ToJyutping.customize({ foo: "" })).toThrow();
		expect(() => ToJyutping.customize({ foo: [""] })).toThrow();
		expect(() => ToJyutping.customize({ foo: "foo" })).toThrow();
		expect(() => ToJyutping.customize({ foo: "foo1" })).toThrow();
		expect(() => ToJyutping.customize({ foo: "foo1 bar2 baz3" })).toThrow();
	});

	test("jyutpingToIPA", () => {
		expect(ToJyutping.jyutpingToIPA("cin1 ngaa5")).toEqual("t͡sʰiːn˥.ŋaː˩˧");
	});
});
