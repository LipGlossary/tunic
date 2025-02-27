"use strict";

/** @type { [{ o: number, i: number, p: string | string[] }] } */
const DICTIONARY = [
  // { o: 32 + 25, i: 48, p: `əm` },
];

/** @type { { [x: number]: { p: string | string[], s?: boolean } } } */
const VOWELS = {
  0: { p: ``, s: true },
  2: { p: `eɪ`, s: true },
  3: { p: [`ɔ`, `ɑ`], s: true },
  4: { p: `aɪ`, s: true },
  6: { p: [`ʌ`, `ə`], s: true },
  7: { p: `æ`, s: true },
  8: { p: `ɔɪ` },
  9: { p: [`ʊ`, `ə`], s: true },
  13: { p: `ə˞` },
  15: { p: `u`, s: true },
  16: { p: `aʊ`, s: true },
  17: { p: [`ɛ˞`, `ɛə˞`], s: true },
  19: { p: [`ɪ˞`, `ɪə˞`], s: true },
  23: { p: `ɔ˞`, s: true },
  24: { p: `ɪ`, s: true },
  25: { p: [`ɛ`, `ɪ`, `ə`] },
  27: { p: `i`, s: true },
  29: { p: [`ɜ˞`, `ə˞`], s: true },
  30: { p: `ɑ˞`, s: true },
  31: { p: `oʊ`, s: true },
};

/** @type { { [x: number]: { p: string, s?: boolean } } } */
const CONSONANTS = {
  0: { p: ``, s: true },
  3: { p: `l`, s: true },
  6: { p: `tʃ`, s: true },
  7: { p: `j`, s: true },
  10: { p: `p`, s: true },
  11: { p: `ɹ`, s: true },
  12: { p: `w`, s: true },
  14: { p: `t`, s: true },
  15: { p: `θ`, s: true },
  17: { p: `dʒ`, s: true },
  26: { p: `f`, s: true },
  27: { p: `s`, s: true },
  33: { p: `b`, s: true },
  35: { p: `h`, s: true },
  37: { p: `v`, s: true },
  39: { p: `z`, s: true },
  41: { p: `k`, s: true },
  42: { p: `ɡ`, s: true },
  48: { p: `m`, s: true },
  49: { p: `d`, s: true },
  51: { p: `ð`, s: true },
  52: { p: `n`, s: true },
  61: { p: `ʒ`, s: true },
  62: { p: `ʃ`, s: true },
  63: { p: `ŋ`, s: true },
};

/** @type { { [x: string]: string } } */
const HINTS = {
  "oʊ˞": "FORCE",
  oʊɹ: "FORCE",
  "i˞": "NEAR",
  "ɑ˞": "START",
  "ɔ˞": "FORCE, NORTH",
  "ə˞": "LETTER",
  "ɛ˞": "SQUARE",
  "ɜ˞": "NURSE",
  "ʊ˞": "CURE",
  aɪ: "PRICE",
  aʊ: "MOUTH",
  eɪ: "FACE",
  iɹ: "NEAR",
  oʊ: "GOAT",
  ɑɹ: "START",
  ɔɪ: "CHOICE",
  ɔɹ: "FORCE, NORTH",
  əɹ: "LETTER",
  ɛɹ: "SQUARE",
  ɜɹ: "NURSE",
  ʊɹ: "CURE",
  i: "FLEECE, HAPPY",
  u: "GOOSE",
  æ: "TRAP, BATH",
  ɑ: "PALM, LOT",
  ɔ: "CLOTH, THOUGHT",
  ə: "COMMA",
  ɚ: "LETTER",
  ɛ: "DRESS",
  ɝ: "NURSE",
  ɪ: "KIT",
  ʊ: "FOOT",
  ʌ: "STRUT",
};

/** @type { TPhrase[] } */
const PHRASES = [
  "west furnace drawing light from deep below",
  "hole in time",
  "buy for 100 💎 ?",
  "take shield ?",
  "a shield ? finally !",
  "found an item !",
  "💀 DANGER 💀 no passage .",
  ["Beneath The Well", "flooded lair beneath the_ surface"],
  "take light ?",
  "risk an offering to _the heir ?",
  "take this ?",
  ["Dark Tomb", "who is enshrined here , if the_ hero lies in the_ shore ?"],
  "you found a flask !",
  "this way to West Garden",
  ["West Garden", "the_ west edge of a great palace"],
];
