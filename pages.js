"use strict";

const SPACER = `&emsp;`;

/** @type { { [x: number]: TPhrase[] } } */
const PAGES = {
  0: ["TUNIC", "secret legend"],
  2: ["cards 20", "praying 23", "the_ far shore 41"],
  3: [
    "A Long , Long Time Ago . . .",
    "there lived a Civilization of great power . they built a city , and \
      within that city they built a palace . they held sacred the_ secrets of \
      the_ Holy Cross , and understood the_ planar nature of reality . they \
      ventured to the_ far shore and sought power from the_ spaces between .",
    "as is usual an alluring old power was discovered . fossils of self , \
      annealed visions of the_ future , entombed and cast into sarcophagi and \
      buried . a lever in the_ canonical plane , a store of potential . \
      perhaps it is the_ fabled prize , The Power To Defy Death .",
  ],
  4: [
    "A Terrible Power Rises",
    "the_ discovering Hero opened a tomb and revealed a terrible truth . a \
      Cathedral was built to venerate this new origin of life , and the_ \
      faithful were granted the_ grace of holy oblivion .",
    "The World Is Thrown Into Ruin",
    [
      "the_ lever overworked ! the_ fulcrum shattered ! a hole in truth will_2 \
        thunder open and all manner of disquiet contradictions will gnaw apart \
        the_ canonical plane . the_ thread is snagged into a squirming coil , \
        with no beginning and no end . flee to your arks , old ones , and \
        become your predestined selves !",
    ],
  ],
  5: [
    "A Prison & A Beacon",
    ". . . but one must live outside the_ shivering ring , The Heir seeking an \
      Heir-To-The-Heir . a beacon to bring about a ruin seeker . to either \
      grow strong and replace an ailing heir , or to hold sacred Holy Cross , \
      and ensure their wisdom lives on .",
    "Awaiting A Worthy Successor",
    "which will you be ruin seeker ? have you arrived here seeking treasure \
      and glory ? or do you seek to uncover deeper truths ? look carefully , \
      for The Golden Path lies everywhere . . .",
  ],
  6: [
    "the_ shadow oubliette",
    "canonical plane",
    "the_ far shore",
    "Coveted In A Forest Temple",
    "Stolen To The Top Of The Sky",
    "Sealed At The Root Of The World",
  ],
  7: [
    "Again The Same Battle , Fought Uncountable Times !",
    "and so the_ cycle continues . ruin seekers , drawn to the_ beacon are \
      tested . those who abandon their quest are forgiven , and simply \
      disappear .",
  ],
  9: [
    "Data Management",
    ["CONTINUE", SPACER, "continue most recent file"],
    ["NEW GAME", SPACER, "begin a fresh quest"],
    ["OPTIONS", SPACER, "adjust settings"],
    ["LOAD GAME", SPACER, "go to SAVE DATA screen"],
    [
      "SAVE DATA",
      SPACER,
      "💎 money",
      SPACER,
      "🌟 harder quest",
      SPACER,
      "📄 unknown 🃏. . . ? ? ?",
      SPACER,
      "select a file",
    ],
    [
      "OPTIONS",
      SPACER,
      "adjust settings to customize your play experience .",
      SPACER,
      "options mean you can keep playing if the_ challenge is too much right \
        now , you are allowed ! !",
    ],
    [
      "load file and resume play !",
      SPACER,
      "DATA REMOVAL",
      SPACER,
      "choose DELETE to remove a file forever",
    ],
    "🃏 whose is this ! ?",
  ],
  10: [
    "Beginning Your Adventure",
    "a secret legend says that a great treasure lies in this far away land . \
      maybe it is the_ power to defy death ! why do you seek this power , tiny \
      one ? time to begin your adventure ! here is what you will do . . .",
    [
      "RINGING THE EAST BELL",
      SPACER,
      "☐ East Forest",
      "enter the_ woods .",
      SPACER,
      "☐ Hero's Grave",
      "a 🗡 lies at the_ grave . . .",
      SPACER,
      "☐ Guard Captain",
      "powerful foe ! be careful !",
    ],
    [
      "RINGING THE WEST BELL",
      SPACER,
      "☐ Old House",
      "you will need a key ( 🗝 )",
      SPACER,
      "☐ Flooded Well",
      "p. 29",
      SPACER,
      "☐ Dark Tomb",
      "dark ! need a light . . .",
      SPACER,
      "☐ West Garden",
      "p. 27",
      SPACER,
      "☐ ? ? ?",
    ],
    "power to defy death",
    "lost ? see p. 28",
  ],
  11: [
    "THE GAME SCREEN",
    "ruin seeker ( you )",
    "strange gate to the_ far shore",
    "keep your eye on your STAMINA-POINTS ! when you have 0 SP you are in \
      danger !",
  ],
  12: [
    "controls",
    ["focus", SPACER, "❗️ focus is crucial"],
    "inventory / gear",
    "move",
    "shield",
    "potion",
    "use(v) item",
    "roll , run , talk",
  ],
  13: [
    "❌ button",
    "this button has many uses(n) . one is secret , but if you read this book \
      you will learn it .",
    ["talk", SPACER, "talk to signs , doors , & more ."],
    [
      "pray",
      SPACER,
      "forbidden technique .",
      "offer reverence to the_ tombs of those who came before .",
    ],
    [
      "roll",
      SPACER,
      "press to roll ! very very important for surviving .",
      SPACER,
      "press !",
      SPACER,
      "you cannot be hit at the_ start of the_ roll !",
    ],
    [
      "run",
      SPACER,
      "press hold the_ button to run . it is faster than rolling over and over \
        .",
      SPACER,
      "press . . .",
      SPACER,
      ". . . & HOLD",
    ],
  ],
  14: [
    "L2 button",
    "this button has one main use(n) , but it is a powerful one . use(v) it \
      all the_ time , ruin seeker !",
    "lock",
    ["FACE YOUR ADVERSARIES", SPACER, "hold this to focus on a nearby foe"],
    [
      "FOCUS & EVADE",
      SPACER,
      "to roll and dodge while still staying ready to strike",
    ],
    ["FOCUS & BLOCK", SPACER, "to raise your shield and face the_ foe"],
  ],
  15: [
    "UNDERSTANDING STAMINA-POINTS",
    "STAMINA-POINTS represent your poise and strength to perform certain \
      actions . when you evade or perform other moves , your STAMINA-POINTS go \
      down . when at 0 SP , you can still do many actions , but at a \
      disadvantage .",
    [
      "MOMENT OF SAFETY",
      SPACER,
      "at the_ start of evasion you have INVULNERABILITY briefly , so evade at \
        just the_ right moment !",
    ],
    [
      "STABILITY",
      SPACER,
      "take enough hits and you will Flinch ! if a hit is really big , you can \
        even be Knocked Over .",
      SPACER,
      " the_ hidden gauge is 25 % of your total HP .",
    ],
  ],
  16: [
    [
      "with vigor",
      SPACER,
      "use(v) vigor to roll . you are safe for a tiny moment .",
      SPACER,
      "found the_ shield ? block ! vigor fills more slowly . hits will use(v) \
        up vigor .",
    ],
    [
      "no vigor ( 0 % )",
      SPACER,
      "oh no ! you ran out of vigor ! you can only hop and are highly \
        vulnerable .",
      SPACER,
      "watch oat !",
    ],
    "vigor ",
  ],
  17: [
    ["SWORD", SPACER, "is this the_ hero's blade ? or a forgery ?"],
    ["STICK", SPACER, "just a stick !"],
    [
      "SHIELD",
      SPACER,
      "left by a RUDELING",
      SPACER,
      "use(v) to deflect blows .",
    ],
    [
      "❄️ BOMB",
      SPACER,
      "unstable powder made from the_ fairy of the_ west garden .",
    ],
    ["💥 BOMB", SPACER, "made from slorm , the_ pudding that goes boom ."],
    ["🔥 BOMB", SPACER, "fire fire everywhere , and ow ow ow ow ow ."],
    [
      "KEYS",
      SPACER,
      "you need a key to open one of the_ rare old doors . the_ key . . .",
    ],
    [
      "FRUITS",
      SPACER,
      "eat fruits to restore HP or MP . they are gone forever , so snack \
        sparingly .",
    ],
    [
      "HOT PEPPER / IVY",
      SPACER,
      "one is",
      [
        "spicy",
        [
          // /ˈs.paɪ.si/
          [0, 27],
          [4, 10],
          [27, 27],
        ],
      ],
      ", one is",
      [
        "minty",
        [
          // /ˈmɪ.n.ti/
          [24, 48],
          [0, 52],
          [27, 14],
        ],
      ],
      ".",
      [
        "gives",
        [
          // /ɡɪ.v.z/
          [24, 42],
          [0, 37],
          [0, 39],
        ],
      ],
      "a",
      [
        "boost",
        [
          // /buː.s.t/
          [15, 33],
          [0, 27],
          [0, 14],
        ],
      ],
      "to ATT or SP .",
    ],
    "EFFIGY",
    "LURE",
    "GOLDEN",
  ],
  foo: ["🔺⭕️🟥 button"],
};
