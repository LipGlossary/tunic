const INNER = ["カ", "オ", "エ", "ウ", "イ", "ア"];
const OUTER = ["ん", "お", "え", "う", "い", "あ"];
const DICTIONARY = [
  { o: 0, i: 3, p: `/l/` },
  { o: 0, i: 10, p: `/p/\n/pɹ/\n/pɹɛ/` },
  { o: 0, i: 14, p: `/t/` },
  { o: 0, i: 27, p: `/s/` },
  { o: 0, i: 39, p: `/z/` },
  { o: 0, i: 41, p: `/k/?` },
  { o: 0, i: 42, p: `?` },
  { o: 0, i: 48, p: `?` },
  { o: 0, i: 49, p: `/d/` },
  { o: 0, i: 52, p: `/n/` },
  { o: 3, i: 3, p: `/lɑ/?` },
  { o: 3, i: 14, p: `/lʊ/?` },
  { o: 3, i: 41, p: `?` },
  { o: 4, i: 3, p: `/laɪ/` },
  { o: 4, i: 14, p: `?` },
  { o: 4, i: 33, p: `?` },
  { o: 6, i: 0, p: `/eɪ/\n/ə/"` },
  { o: 6, i: 11, p: `/ɹʌ/?` },
  { o: 6, i: 12, p: `/w/\n/wʌ/` },
  { o: 6, i: 33, p: `/b/\n/bʌ/` },
  { o: 6, i: 41, p: `/k/\n/kə/` },
  { o: 6, i: 51, p: `/ðə/` },
  { o: 6, i: 62, p: `/ʃ/\n/ʃə/` },
  { o: 7, i: 0, p: `/oʊ/` },
  { o: 7, i: 11, p: `?` },
  { o: 7, i: 41, p: `/kæ/` },
  { o: 9, i: 6, p: `?` },
  { o: 9, i: 49, p: `/də/` },
  { o: 15, i: 7, p: `/juː/` },
  { o: 15, i: 14, p: `/tu/` },
  { o: 16, i: 12, p: `?` },
  { o: 16, i: 26, p: `/faʊ/?` },
  { o: 16, i: 27, p: `/saʊ/\n/saʊθ/` },
  { o: 19, i: 35, p: `/ðə/?` },
  { o: 23, i: 0, p: `/ɔɹ/\n/ɚ/` },
  { o: 23, i: 7, p: `/jɔɹ/\n/jʊɚ/\n/jɝ/` },
  { o: 23, i: 26, p: `?` },
  { o: 23, i: 52, p: `/no/?\n/noɹ/?\n/nơ/?` },
  { o: 24, i: 12, p: `/wɪ/?` },
  { o: 24, i: 14, p: `/ʌt/\n/t/\n/ʌʔ/\n/ʔ/` },
  { o: 24, i: 39, p: `/zɪ/` },
  { o: 25, i: 11, p: `/ɛ/\n/ɹɛ/` },
  { o: 25, i: 12, p: `/wɛ/` },
  { o: 25, i: 33, p: `/bɛ/` },
  { o: 27, i: 41, p: `/ki/` },
  { o: 27, i: 51, p: `/ði/?` },
  { o: 27, i: 63, p: `/ʃiː/` },
  { o: 30, i: 41, p: `/kɑɹ/\n/kᶐ/` },
  { o: 30, i: 42, p: `/ɡɑɹ/\n/ɡᶐ/` },
  { o: 31, i: 0, p: `/oʊ/?` },
  { o: 31, i: 10, p: `/poʊ/` },
  { o: 31, i: 11, p: `/ɹoʊ/` },
  { o: 31, i: 35, p: `/hoʊ/` },
  { o: 31, i: 52, p: `/noʊ/?` },
  { o: 38, i: 37, p: `?` },
  { o: 56, i: 52, p: `/ʌv/` },
  { o: 57, i: 17, p: `?` },
  { o: 59, i: 27, p: `/iː/\n/iːs/\n/iːst/` },
];

document.querySelectorAll('[href="#glyph"]').forEach((glyph) => {
  const {
    dataset: { inner, outer },
  } = glyph;
  [
    [inner, INNER],
    [outer, OUTER],
  ].forEach(([n, mask]) => {
    [...parseInt(n).toString(2).padStart(6, "0")].forEach((bit, i) => {
      glyph.classList[parseInt(bit) ? "add" : "remove"](mask[i]);
    });
  });
  const phoneme =
    DICTIONARY.filter(({ o }) => o === parseInt(outer)).filter(
      ({ i }) => i === parseInt(inner)
    )[0]?.p ?? "";
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.classList.add("phoneme");
  const x = parseInt(glyph.getAttribute("x") ?? "0") + 4.5;
  const y = parseInt(glyph.getAttribute("y") ?? "0") + 22;
  text.append(
    ...phoneme.split("\n").map((p, i) => {
      const t = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      t.setAttribute("x", x);
      t.setAttribute("y", i * 2.2 + y);
      t.innerHTML = p;
      return t;
    })
  );
  glyph.after(text);
});
