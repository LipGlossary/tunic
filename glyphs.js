customElements.define(
  "svg-glyph",
  class Glyph extends HTMLElement {
    static INNER = ["カ", "オ", "エ", "ウ", "イ", "ア"];
    static OUTER = ["ん", "お", "え", "う", "い", "あ"];

    static get observedAttributes() {
      return ["form", "inner", "outer", "stroke"];
    }

    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.appendChild(
        document.getElementById("glyph").content.cloneNode(true)
      );
    }

    get form() {
      return this.getAttribute("form") != undefined;
    }
    set form(val) {
      if (val != undefined) this.setAttribute("form", "");
      else this.removeAttribute("form");
    }
    get inner() {
      return this.getAttribute("inner");
    }
    set inner(val) {
      this.setAttribute("inner", val);
    }
    get outer() {
      return this.getAttribute("outer");
    }
    set outer(val) {
      this.setAttribute("outer", val);
    }
    get stroke() {
      return this.getAttribute("stroke");
    }
    set stroke(val) {
      this.setAttribute("stroke", val);
    }

    attributeChangedCallback(attr, _oldVal, newVal) {
      switch (attr) {
        case "outer":
        case "inner":
          const outer = this.outer ? parseInt(this.outer) : null;
          const inner = this.inner ? parseInt(this.inner) : null;
          const { p: po, s: so } =
            (outer < 32 ? VOWELS[outer] : CONSONANTS[inner]) || {};
          const { p: pi, s: si } =
            (outer < 32 ? CONSONANTS[inner] : VOWELS[outer % 32]) || {};
          const { p, s } =
            DICTIONARY.filter(({ o }) => o === outer).filter(
              ({ i }) => i === inner
            )[0] || {};
          this._updateStrokeClasses(attr, newVal);
          this._updateGlyphCode(attr, newVal);
          this._updatePhoneme(p, po, pi);
          this._updateVowelHint(outer, p, po, pi);
          this._updateStrokeColor(p, po, pi, s, so, si);
          this.dispatchEvent(new Event("change"));
          return;
        case "stroke":
          this.shadowRoot.getElementById(
            "root"
          ).style = `--stroke: var(${newVal});`;
          return;
        case "form":
          this.shadowRoot
            .querySelectorAll('[part="stroke"]')
            .forEach((stroke) => {
              stroke[`${this.form ? "add" : "remove"}EventListener`](
                "click",
                this.handleStrokeClick.bind(this)
              );
            });
          return;
        default:
          return;
      }
    }

    handleStrokeClick({ target }) {
      const [index, ATTR, attr] = ["inner", "outer"]
        .map((attr) => [attr.toUpperCase(), attr])
        .map(([ATTR, attr]) => [
          Glyph[ATTR].indexOf(target.getAttribute("href").replace("#", "")),
          ATTR,
          attr,
        ])
        .filter(([n]) => n > -1)[0];
      this[attr] ^= 2 ** (Glyph[ATTR].length - 1 - index);
    }

    _updateStrokeClasses(attr, val) {
      [...parseInt(val).toString(2).padStart(6, "0")].forEach((bit, i) => {
        this.shadowRoot
          .getElementById("root")
          .classList[parseInt(bit) ? "add" : "remove"](
            Glyph[attr.toUpperCase()][i]
          );
      });
    }

    _updateGlyphCode(attr, val) {
      this.shadowRoot.querySelector(`[part="${attr}"]`).innerHTML =
        val || "&nbsp;";
    }

    _updatePhoneme(override, outer, inner) {
      this.shadowRoot.querySelector('[part="phoneme"]').innerHTML =
        (override != undefined
          ? castArray(override)
          : outer || inner
          ? castArray(outer).flatMap((o = `_`) =>
              castArray(inner).map((i = `_`) => `${i}${o}`)
            )
          : []
        )
          .filter((p) => !!p)
          .join(" ") || "&nbsp;";
    }

    _updateVowelHint(outerCode, override, outer, inner) {
      ((outerCode < 32 && outer) || inner || override) &&
        this.setAttribute(
          "title",
          Object.entries(HINTS).reduce(
            (acc, [v, hint]) =>
              acc ||
              (new RegExp(v).test(
                (outerCode < 32 && outer) || inner || override
              )
                ? hint
                : ""),
            ""
          )
        );
    }

    _updateStrokeColor(
      overridePho,
      outerPho,
      innerPho,
      overrideCon,
      outerCon,
      innerCon
    ) {
      if ((outerCon && innerCon) || overrideCon)
        this.stroke = "--stroke-strong";
      if (!(outerPho || innerPho || overridePho)) this.stroke = "--stroke-weak";
    }
  }
);

/*
document.querySelector(".parts .inner").innerHTML = html`
  <h2>inner</h2>
  ${Array(64)
    .fill(null)
    .map((_, i) => renderGlyph([0, i]))
    .join("\n")}
`;
*/
/*
document.querySelector(".parts .outer").innerHTML = html`
  <h2>outer</h2>
  ${Array(32)
    .fill(null)
    .map((_, i) => renderGlyph([i, 0]))
    .join("\n")}
`;
*/
/*
document.querySelector(".combos").innerHTML = html`
  <h1>glyphs</h1>
  ${Object.keys(VOWELS)
    .map((v) =>
      Object.keys(CONSONANTS)
        .flatMap((c) => [
          renderGlyph([v, c]),
          ...(v > 0 && c > 0 ? [renderGlyph([parseInt(v) + 32, c])] : []),
        ])
        .join("\n")
    )
    .join("\n")}
`;
*/
/*
document.querySelector(".words").innerHTML = html`
  <h1>words</h1>
  ${Object.values(WORDS)
    .map((set) => Object.entries(set).map(renderWord).join("\n"))
    .join("\n")}
`;
*/
/*
document.querySelector(".phrases").innerHTML = html`
  <h1>phrases</h1>
  ${PHRASES.map(renderPhrase).join("\n")}
`;
*/
document.querySelector(".pages").innerHTML = html`
  <h1>pages</h1>
  ${Object.entries(PAGES)
    .map(
      ([page, phrases]) =>
        html`
          <article class="page">
            <h2>${page}</h2>
            ${phrases.map(renderPhrase).join("\n")}
          </article>
        `
    )
    .join("\n")}
`;

/** UI form glyph listener */
document.getElementById("ui").addEventListener(
  "change",
  function () {
    // disable PRINT if glyph code 0,0
    const print = document.getElementById("print");
    if (this.inner > 0 || this.outer > 0) print.removeAttribute("disabled");
    else print.setAttribute("disabled", "");
  },
  { passive: true }
);

/** PRINT button listener */
document.getElementById("print").addEventListener(
  "click",
  function ({ target }) {
    if (target.getAttribute("disabled") != undefined) return;

    // create new glyph with UI form's code, reset form's code, prepend new glyph
    const glyph = document.getElementById("ui");
    const newGlyph = document.createElement("svg-glyph");
    newGlyph.inner = glyph.inner;
    newGlyph.outer = glyph.outer;
    glyph.inner = 0;
    glyph.outer = 0;
    glyph.before(newGlyph);

    // enable SPACE (word has at least one glyph in it)
    document.getElementById("space").removeAttribute("disabled");

    // fire change event
    glyph
      .closest(".word")
      .dispatchEvent(new Event("change", { bubbles: true }));
  },
  { passive: true }
);

/** SPACE button listener */
document.getElementById("space").addEventListener(
  "click",
  function ({ target }) {
    if (target.getAttribute("disabled") != undefined) return;

    // disable SPACE (new word will be empty)
    this.setAttribute("disabled", "");

    // create new word, move UI form to new word
    const glyph = document.getElementById("ui");
    const oldWord = glyph.closest(".word");
    const newWord = document.createElement("div");
    newWord.classList.add("word", "unknown");
    newWord.setAttribute("form", "");
    glyph.closest(".phrase").appendChild(newWord);
    newWord.appendChild(glyph);
    oldWord.removeAttribute("form");

    // fire change event
    oldWord.dispatchEvent(new Event("change", { bubbles: true }));
  },
  { passive: true }
);

/** slate listener - for non-form glyph clicks */
document.querySelector(".slate .phrase").addEventListener(
  "click",
  function ({ target }) {
    // remove clicked glyph and word if empty
    const glyph = target.closest("svg-glyph:not([form])");
    if (!glyph) return;
    const word = glyph.closest(".word");
    glyph.remove();
    if (!word.querySelectorAll("svg-glyph").length) {
      word.remove();
      // fire change event at phrase
      this.dispatchEvent(new Event("change"));
    } else {
      // fire change event at word
      word.dispatchEvent(new Event("change", { bubbles: true }));
    }
  },
  { passive: true }
);

/** slate listener - for `"change"` events */
document.querySelector(".slate .phrase").addEventListener(
  "change",
  function ({ target }) {
    // render as known word or unknown word with input
    const word = target.closest(".word:not([form])");
    if (word) {
      word.outerHTML = renderWord(
        [...word.querySelectorAll("svg-glyph")].map(({ inner, outer }) => [
          parseInt(outer),
          parseInt(inner),
        ]),
        true
      );
    }

    // update OUTPUT textarea
    const words = this.querySelectorAll(".word");
    document.getElementById("output").innerHTML = JSON.stringify(
      [...words].reduceRight((acc, word) => {
        const [last, ...rest] = acc;
        const label = thru(
          word.querySelector("label"),
          (label) => label?.innerText || label?.querySelector("input")?.value
        );
        const known = ![...word.classList].includes("unknown");
        const glyphs = word.querySelectorAll("svg-glyph:not([form])");
        const arr =
          glyphs.length &&
          [...glyphs].map(({ inner, outer }) => [
            parseInt(outer),
            parseInt(inner),
          ]);
        if (label) {
          if (known) {
            return typeof last === "string"
              ? [[label, last].join(" "), ...rest]
              : [label, ...acc];
          } else return [[label, arr], ...acc];
        } else return arr ? [arr, ...acc] : acc;
      }, [])
    ).replaceAll(
      /\[(\d\d),/g,
      (_, p1) =>
        `[${thru(parseInt(p1), (n) => (n > 32 ? `32+${n - 32}` : `${n}`))},`
    );
  },
  { passive: true }
);

/** slate listener for SPACE */
/** slate listener for ENTER */
document.querySelector(".slate").addEventListener("keydown", function (event) {
  switch (event.code) {
    case "Space":
      event.preventDefault();
      document.getElementById("print").dispatchEvent(new Event("click"));
      return;
    case "Enter":
      event.preventDefault();
      document.getElementById("space").dispatchEvent(new Event("click"));
      return;
  }
});

/**
 * @param { TGlyph } g1
 * @param { TGlyph } g2
 * @returns { boolean }
 */
function isSameGlyph(g1 = [], g2 = []) {
  if (!g1.length || !g2.length) return false;
  for (let i = 0; i < g1.length; i++) if (g1[i] !== g2[i]) return false;
  return true;
}

/**
 * @param { TGlyphSet } w1
 * @param { TGlyphSet } w2
 * @returns { boolean }
 */
function isSameWord(w1, w2) {
  if (!w1.length) return false;
  if (w1.length !== w2.length) return false;
  for (let i = 0; i < w1.length; i++)
    if (!isSameGlyph(w1[i], w2[i])) return false;
  return true;
}

/**
 * @param { TPhrase } phrase
 * @returns { HTMLString }
 */
function renderPhrase(phrase) {
  return html`
    <div class="phrase">
      ${castArray(phrase)
        .map((p) =>
          p instanceof Array ? renderWord(p) : _renderPhraseString(p)
        )
        .join("\n")}
    </div>
  `;
}
/**
 * find strings in word bank
 * @param { string } str
 */
function _renderPhraseString(str) {
  return str
    .split(/\s+/)
    .map(
      (w) =>
        Object.values(WORDS).reduce(
          (acc, set) =>
            acc ||
            Object.entries(set).reduce(
              (acc, [key, gs]) => acc || (w == key && [w, gs]) || null,
              null
            ),
          null
        ) || w
    )
    .map(castArray)
    .map(renderWord)
    .join("\n");
}

/**
 * @param { TGlyph }
 * @returns { HTMLString }
 */
function renderGlyph([o, i]) {
  return html`<svg-glyph outer="${o ?? ""}" inner="${i ?? ""}"></svg-glyph>`;
}

/**
 * @param { TWord | TGlyphSet } w_gs
 * @param { boolean } asForm
 * @returns { HTMLString }
 */
function renderWord(w_gs, asForm) {
  switch (typeof w_gs[0]) {
    case "string":
      return _renderWord(w_gs);
    default:
      return _renderWord(
        Object.values(WORDS).reduce(
          (acc, set) =>
            acc ||
            Object.entries(set).reduce(
              (acc, [key, bankWord]) =>
                acc ? acc : isSameWord(w_gs, bankWord) ? [key, w_gs] : null,
              null
            ),
          null
        ) || ["", w_gs, true, asForm]
      );
  }
}
/**
 * @param { [...TWord, boolean, boolean] }
 * @returns { HTMLString }
 */
function _renderWord([w, gs = [], u, asForm]) {
  return html`
    <div
      class="${["word", u ? "unknown" : ""].join(" ").trim()}"
      ${u && asForm ? "form" : ""}
    >
      ${gs.map(renderGlyph).join("\n")}
      <label>${asForm ? html`<input value="${w}" />` : w}</label>
    </div>
  `;
}

/**
 * @template T
 * @param { T } arr
 * @returns { T | [T] }
 */
function castArray(arr) {
  return arr instanceof Array ? arr : [arr];
}

/** @type { typeof String.raw } */
function html(template, ...substitutions) {
  return String.raw({ raw: template }, ...substitutions);
}

/**
 * @template T
 * @param { T } x
 * @param { (arg: T, ...rest: any[]) => any } cb
 * @returns { T }
 */
function tap(x, cb = console.debug) {
  cb(x);
  return x;
}

/**
 * @template T
 * @param { T } x
 * @param { (x: T) => any } func
 * @returns { any }
 */
function thru(x, func = (x) => x) {
  return func(x);
}

/** @typedef { string } HTMLString */
/** @typedef { [number, number] } TGlyph */
/** @typedef { TGlyph[] } TGlyphSet */
/** @typedef { [string, TGlyphSet] } TWord */
/** @typedef { string | (string | TWord | TGlyphSet)[] } TPhrase */
