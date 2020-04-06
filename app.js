import BUTTONS from "./src/config.js";
import Button from "./src/buttons/button.js";
import AltButton from "./src/buttons/altButton.js";
import LetterButton from "./src/buttons/letterButton.js";

class Keyboard {
  constructor() {
    this.keys = [];
    this.lang = "en";
    this.textArea = document.createElement("textarea");
  }

  init() {
    const keyboardContainer = document.createElement("div");
    keyboardContainer.classList.add("keyboard-container");
    const keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");
    const keyboardKeys = document.createElement("div");
    keyboardKeys.classList.add("keyboard__keys");
    const info = document.createElement("p");
    info.textContent = `Смена языка ввода - 'Shift' + 'Alt'. Сделано в ОС Linux.`;
    this.textArea.classList.add("textarea");
    keyboardKeys.append(this.createKeys());
    keyboard.append(keyboardKeys);
    keyboardContainer.append(this.textArea, keyboard, info);
    document.body.append(keyboardContainer);
  }

  createKeys() {
    const keyboardKeys = document.createDocumentFragment();
    let row = document.createElement("div");
    row.classList.add("keyboard__row");
    for (const button of BUTTONS) {
      const {
        text,
        altText,
        code,
        width,
        lineBreak,
        type
      } = button;
      const newKeyButton = this.createButton(
        text,
        width,
        this.lang,
        altText,
        type,
        code
      );
      newKeyButton.init();
      this.keys.push(newKeyButton);
      row.append(newKeyButton.node);
      if (lineBreak) {
        keyboardKeys.append(row);
        row = document.createElement("div");
        row.classList.add("keyboard__row");
      }
    }
    return keyboardKeys;
  }

  createButton(text, width, lang, altText, type, code) {
    let button;
    switch (type) {
      case "alternative":
        button = new AltButton(text, width, lang, altText, code);
        break;
      case "functional":
        button = new Button(text, width, lang, altText, code);
        break;
      default:
        button = new LetterButton(text, width, lang, altText, code);
        break;
    }
    return button;
  }
}

window.onload = () => {
  const keyboard = new Keyboard();
  keyboard.init();
};