const KEY_BUTTONS = [
  [{
      text: {
        en: "`",
        ru: "ё",
      },
      altText: {
        en: "~",
        ru: "ё",
      },
      code: "Backquote",
      type: "alternative",
    },
    {
      text: {
        en: "1",
        ru: "1",
      },
      altText: {
        en: "!",
        ru: "!",
      },
      code: "Digit1",
      type: "alternative",
    },
    {
      text: {
        en: "2",
        ru: "2",
      },
      altText: {
        en: "@",
        ru: '"',
      },
      code: "Digit2",
      type: "alternative",
    },
    {
      text: {
        en: "3",
        ru: "3",
      },
      altText: {
        en: "#",
        ru: "№",
      },
      code: "Digit3",
      type: "alternative",
    },
    {
      text: {
        en: "4",
        ru: "4",
      },
      altText: {
        en: "$",
        ru: ";",
      },
      code: "Digit4",
      type: "alternative",
    },
    {
      text: {
        en: "5",
        ru: "5",
      },
      altText: {
        en: "%",
        ru: "%",
      },
      code: "Digit5",
      type: "alternative",
    },
    {
      text: {
        en: "6",
        ru: "6",
      },
      altText: {
        en: "^",
        ru: ":",
      },
      code: "Digit6",
      type: "alternative",
    },
    {
      text: {
        en: "7",
        ru: "7",
      },
      altText: {
        en: "&",
        ru: "?",
      },
      code: "Digit7",
      type: "alternative",
    },
    {
      text: {
        en: "8",
        ru: "8",
      },
      altText: {
        en: "*",
        ru: "*",
      },
      code: "Digit8",
      type: "alternative",
    },
    {
      text: {
        en: "9",
        ru: "9",
      },
      altText: {
        en: "(",
        ru: "(",
      },
      code: "Digit9",
      type: "alternative",
    },
    {
      text: {
        en: "0",
        ru: "0",
      },
      altText: {
        en: ")",
        ru: ")",
      },
      code: "Digit0",
      type: "alternative",
    },
    {
      text: {
        en: "-",
        ru: "-",
      },
      altText: {
        en: "_",
        ru: "_",
      },
      code: "Minus",
      type: "alternative",
    },
    {
      text: {
        en: "=",
        ru: "=",
      },
      altText: {
        en: "+",
        ru: "+",
      },
      code: "Equal",
      type: "alternative",
    },
    {
      text: {
        en: "Backspace",
        ru: "Backspace",
      },
      altText: {
        en: "Backspace",
        ru: "Backspace",
      },
      width: "lg",
      code: "Backspace",
      type: "functional"
    }
  ],
  [{
      text: {
        en: "Tab",
        ru: "Tab",
      },
      altText: {
        en: "Tab",
        ru: "Tab",
      },
      code: "Tab",
      type: "functional",
    },
    {
      text: {
        en: "q",
        ru: "й",
      },
      altText: {
        en: "q",
        ru: "й",
      },
      code: "KeyQ",
    },
    {
      text: {
        en: "w",
        ru: "ц",
      },
      altText: {
        en: "w",
        ru: "ц",
      },
      code: "KeyW",
    },
    {
      text: {
        en: "e",
        ru: "у",
      },
      altText: {
        en: "e",
        ru: "у",
      },
      code: "KeyE",
    },
    {
      text: {
        en: "r",
        ru: "к",
      },
      altText: {
        en: "r",
        ru: "к",
      },
      code: "KeyR",
    },
    {
      text: {
        en: "t",
        ru: "е",
      },
      altText: {
        en: "t",
        ru: "е",
      },
      code: "KeyT",
    },
    {
      text: {
        en: "y",
        ru: "н",
      },
      altText: {
        en: "y",
        ru: "н",
      },
      code: "KeyY",
    },
    {
      text: {
        en: "u",
        ru: "г",
      },
      altText: {
        en: "u",
        ru: "г",
      },
      code: "KeyU",
    },
    {
      text: {
        en: "i",
        ru: "ш",
      },
      altText: {
        en: "i",
        ru: "ш",
      },
      code: "KeyI",
    },
    {
      text: {
        en: "o",
        ru: "щ",
      },
      altText: {
        en: "o",
        ru: "щ",
      },
      code: "KeyO",
    },
    {
      text: {
        en: "p",
        ru: "з",
      },
      altText: {
        en: "p",
        ru: "з",
      },
      code: "KeyP",
    },
    {
      text: {
        en: "[",
        ru: "х",
      },
      altText: {
        en: "{",
        ru: "х",
      },
      code: "lineBreakacketLeft",
      type: "alternative",
    },
    {
      text: {
        en: "]",
        ru: "ъ",
      },
      altText: {
        en: "}",
        ru: "ъ",
      },
      code: "lineBreakacketRight",
      type: "alternative",
    },
    {
      text: {
        en: "\\",
        ru: "\\",
      },
      width: "md",
      altText: {
        en: "|",
        ru: "/",
      },
      code: "Backslash",
      type: "alternative",
    },
    {
      text: {
        en: "DEL",
        ru: "DEL",
      },
      altText: {
        en: "DEL",
        ru: "DEL",
      },
      code: "Delete",
      type: "functional"
    }
  ],
  [{
      text: {
        en: "Caps Lock",
        ru: "Caps Lock",
      },
      altText: {
        en: "Caps Lock",
        ru: "Caps Lock",
      },
      code: "CapsLock",
      width: "md",
      type: "functional",
    },
    {
      text: {
        en: "a",
        ru: "ф",
      },
      altText: {
        en: "a",
        ru: "ф",
      },
      code: "KeyA",
    },
    {
      text: {
        en: "s",
        ru: "ы",
      },
      altText: {
        en: "s",
        ru: "ы",
      },
      code: "KeyS",
    },
    {
      text: {
        en: "d",
        ru: "в",
      },
      altText: {
        en: "d",
        ru: "в",
      },
      code: "KeyD",
    },
    {
      text: {
        en: "f",
        ru: "а",
      },
      altText: {
        en: "f",
        ru: "а",
      },
      code: "KeyF",
    },
    {
      text: {
        en: "g",
        ru: "п",
      },
      altText: {
        en: "g",
        ru: "п",
      },
      code: "KeyG",
    },
    {
      text: {
        en: "h",
        ru: "р",
      },
      altText: {
        en: "h",
        ru: "р",
      },
      code: "KeyH",
    },
    {
      text: {
        en: "j",
        ru: "о",
      },
      altText: {
        en: "j",
        ru: "о",
      },
      code: "KeyJ",
    },
    {
      text: {
        en: "k",
        ru: "л",
      },
      altText: {
        en: "k",
        ru: "л",
      },
      code: "KeyK",
    },
    {
      text: {
        en: "l",
        ru: "д",
      },
      altText: {
        en: "l",
        ru: "д",
      },
      code: "KeyL",
    },
    {
      text: {
        en: ";",
        ru: "ж",
      },
      altText: {
        en: ":",
        ru: "ж",
      },
      code: "Semicolon",
      type: "alternative",
    },
    {
      text: {
        en: `'`,
        ru: "э",
      },
      altText: {
        en: '"',
        ru: "э",
      },
      code: "Quote",
      type: "alternative",
    },
    {
      text: {
        en: "ENTER",
        ru: "ENTER",
      },
      width: "lg",
      altText: {
        en: "ENTER",
        ru: "ENTER",
      },
      code: "Enter",
      type: "functional"
    }
  ],
  [{
      text: {
        en: "Shift",
        ru: "Shift",
      },
      width: "lg",
      altText: {
        en: "Shift",
        ru: "Shift",
      },
      code: "ShiftLeft",
      type: "functional",
    },
    {
      text: {
        en: "z",
        ru: "я",
      },
      altText: {
        en: "z",
        ru: "я",
      },
      code: "KeyZ",
    },
    {
      text: {
        en: "x",
        ru: "ч",
      },
      altText: {
        en: "x",
        ru: "ч",
      },
      code: "KeyX",
    },
    {
      text: {
        en: "c",
        ru: "с",
      },
      altText: {
        en: "c",
        ru: "с",
      },
      code: "KeyC",
    },
    {
      text: {
        en: "v",
        ru: "м",
      },
      altText: {
        en: "v",
        ru: "м",
      },
      code: "KeyV",
    },
    {
      text: {
        en: "b",
        ru: "и",
      },
      altText: {
        en: "b",
        ru: "и",
      },
      code: "KeyB",
    },
    {
      text: {
        en: "n",
        ru: "т",
      },
      altText: {
        en: "n",
        ru: "т",
      },
      code: "KeyN",
    },
    {
      text: {
        en: "m",
        ru: "ь",
      },
      altText: {
        en: "m",
        ru: "ь",
      },
      code: "KeyM",
    },
    {
      text: {
        en: ",",
        ru: "б",
      },
      altText: {
        en: "<",
        ru: "б",
      },
      code: "Comma",
      type: "alternative",
    },
    {
      text: {
        en: ".",
        ru: "ю",
      },
      altText: {
        en: ">",
        ru: "ю",
      },
      code: "Period",
      type: "alternative",
    },
    {
      text: {
        en: "/",
        ru: ".",
      },
      altText: {
        en: "?",
        ru: ",",
      },
      code: "Slash",
      type: "alternative",
    },
    {
      text: {
        en: "&#8593;",
        ru: "&#8593;",
      },
      altText: {
        en: "&#8593;",
        ru: "&#8593;",
      },
      code: "ArrowUp",
      type: "functional",
    },
    {
      text: {
        en: "Shift",
        ru: "Shift",
      },
      altText: {
        en: "Shift",
        ru: "Shift",
      },
      code: "ShiftRight",
      width: "lg",
      type: "functional"
    }
  ],
  [{
      text: {
        en: "Ctrl",
        ru: "Ctrl",
      },
      altText: {
        en: "Ctrl",
        ru: "Ctrl",
      },
      code: "ControlLeft",
      type: "functional",
      width: "md",
    },
    {
      text: {
        en: "Win",
        ru: "Win",
      },
      altText: {
        en: "Win",
        ru: "Win",
      },
      code: "OSLeft",
      width: "md",
      type: "functional",
    },
    {
      text: {
        en: "Alt",
        ru: "Alt",
      },
      width: "md",
      altText: {
        en: "Alt",
        ru: "Alt",
      },
      code: "AltLeft",
      type: "functional",
    },
    {
      text: {
        en: " ",
        ru: " ",
      },
      altText: {
        en: " ",
        ru: " ",
      },
      code: "Space",
      width: "xl",
    },
    {
      text: {
        en: "Alt",
        ru: "Alt",
      },
      altText: {
        en: "Alt",
        ru: "Alt",
      },
      code: "AltRight",
      width: "md",
      type: "functional",
    },
    {
      text: {
        en: "&#8592;",
        ru: "&#8592;",
      },
      altText: {
        en: "&#8592;",
        ru: "&#8592;",
      },
      code: "ArrowLeft",
      type: "functional",
    },
    {
      text: {
        en: "&#8595;",
        ru: "&#8595;",
      },
      altText: {
        en: "&#8595;",
        ru: "&#8595;",
      },
      code: "ArrowDown",
      type: "functional",
    },
    {
      text: {
        en: "&#8594;",
        ru: "&#8594;",
      },
      altText: {
        en: "&#8594;",
        ru: "&#8594;",
      },
      code: "ArrowRight",
      type: "functional",
    },
    {
      text: {
        en: "Ctrl",
        ru: "Ctrl",
      },
      altText: {
        en: "Ctrl",
        ru: "Ctrl",
      },
      code: "ControlRight",
      width: "md",
      type: "functional"
    }
  ]
];

export default KEY_BUTTONS;