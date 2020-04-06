import BUTTONS from "./src/config.js";
import Button from "./src/buttons/button.js";
import AltButton from "./src/buttons/altButton.js";
import LetterButton from "./src/buttons/letterButton.js";
import * as helpers from './src/helpers.js';

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
    keyboardKeys.append(this.createKeys());
    keyboardKeys.addEventListener('click', this.trackClick.bind(this));
    keyboard.append(keyboardKeys);
    this.textArea.classList.add("textarea");
    keyboardContainer.append(this.textArea, keyboard, info);
    document.body.append(keyboardContainer);

    document.addEventListener('keydown', this.addActive.bind(this));
    document.addEventListener('keyup', this.removeActive.bind(this));
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
      row.append(newKeyButton.keyNode);
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

  addActive(e) {
    const button = this.keys.find(item => item.code === e.code);
    if (button) {
      if (helpers.isArrow(button.code)) {
        button.keyNode.classList.add('active');
      } else {
        e.preventDefault();

        if (helpers.isCaps(button.code) && e.repeat || helpers.isShift(button.code) && e.repeat || helpers.isCtrl(button.code) && e.repeat) {
          return null;
        }
        if (!helpers.isCaps(button.code) && !helpers.isShift(button.code)) {
          button.keyNode.classList.add('active');
          button.keyNode.click();
        }
      }
    }
    return null;
  }

  removeActive(e) {
    const button = this.keys.find(item => item.code === e.code);
    if (button) {
      if (helpers.isArrow(button.code)) {
        button.keyNode.classList.remove('active');
      } else {
        e.preventDefault();

        if (!helpers.isCaps(button.code) && !helpers.isShift(button.code)) {
          button.keyNode.classList.remove('active');
        }

        if (helpers.isShift(button.code)) {
          button.keyNode.click();
        }
      }
    }
    return null;
  }

  trackClick(e) {
    if (e.target.dataset.keyValue) {
      switch (e.target.dataset.keyValue) {
        default:
          this.printKeyText(e)
          break;
      }
    }
  }

  printKeyText(e) {
    const letter = e.target.textContent;
    const {
      value: val,
      selectionStart: start,
      selectionEnd: end
    } = this.textArea;
    this.textArea.value = val.substring(0, start) + letter.toLowerCase() + val.substring(end);
    this.setCursorPosition(start + 1);
  }

  setCursorPosition(position) {
    this.textArea.focus();
    this.textArea.selectionStart = position;
    this.textArea.selectionEnd = position;
  }
}

window.onload = () => {
  const keyboard = new Keyboard();
  keyboard.init();
};