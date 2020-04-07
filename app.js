import BUTTONS from "./src/config.js";
import Button from "./src/buttons/button.js";
import AltButton from "./src/buttons/altButton.js";
import LetterButton from "./src/buttons/letterButton.js";
import * as helpers from "./src/helpers.js";

class Keyboard {
  constructor() {
    this.keys = [];
    this.lang = localStorage.getItem("lang") || "en";
    this.textArea = document.createElement("textarea");
    this.capsLockState = false;
    this.shiftState = false;
    this.ctrlKeyUp = false;
  }

  init() {
    const keyboardContainer = document.createElement("div");
    keyboardContainer.classList.add("keyboard-container");
    const keyboard = document.createElement("div");
    keyboard.classList.add("keyboard");
    const keyboardKeys = document.createElement("div");
    keyboardKeys.classList.add("keyboard__keys");
    const info = document.createElement("p");
    info.innerHTML = `Change language - 'Shift' + 'Ctrl'. <br> Made with OS Linux (Ubuntu 18.04 LTS).`;
    info.classList.add("info");
    keyboardKeys.append(this.createKeys());
    keyboardKeys.addEventListener("click", this.trackClickHandler.bind(this));
    keyboard.append(keyboardKeys);
    this.textArea.classList.add("textarea");
    keyboardContainer.append(this.textArea, keyboard, info);
    document.body.append(keyboardContainer);

    document.addEventListener("keydown", this.addActive.bind(this));
    document.addEventListener("keyup", this.removeActive.bind(this));
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
      const newKeyButton = this.createKeyButton(
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

  createKeyButton(text, width, lang, altText, type, code) {
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
    const button = this.keys.find((item) => item.code === e.code);
    if (button) {
      if (helpers.isArrow(button.code)) {
        button.keyNode.classList.add("active");
      } else {
        e.preventDefault();

        if (helpers.isShift(button.code)) {
          button.keyNode.classList.add("active");
          this.shiftState = !this.shiftState;

          for (const key of this.keys) {
            key.shift();
          }
        }

        if (helpers.isCaps(button.code)) {
          button.keyNode.click();
        }

        if (helpers.isCtrl(button.code)) {
          button.keyNode.classList.add("active");
          if (this.shiftState) {
            this.changeLanguage();
          }
        }

        if (
          !helpers.isCaps(button.code) &&
          !helpers.isShift(button.code) &&
          !helpers.isCtrl(button.code)
        ) {
          button.keyNode.classList.add("active");
          button.keyNode.click();
        }
      }
    }
    return null;
  }

  removeActive(e) {
    const button = this.keys.find((item) => item.code === e.code);
    if (button) {
      if (helpers.isArrow(button.code)) {
        button.keyNode.classList.remove("active");
      } else {
        e.preventDefault();

        if (helpers.isShift(button.code)) {
          button.keyNode.classList.remove("active");
          this.shiftState = false;

          if (!this.ctrlKeyUp) {
            for (const key of this.keys) {
              key.shift();
              key.keyNode.classList.remove("capsLock");
            }
          }

          this.ctrlKeyUp = false;
        }

        if (!helpers.isCaps(button.code) && !helpers.isShift(button.code)) {
          button.keyNode.classList.remove("active");
        }
      }
    }
    return null;
  }

  trackClickHandler(e) {
    if (e.target.dataset.keyValue) {
      switch (e.target.dataset.keyValue) {
        case "Backspace":
          this.backspaceHandler();
          break;
        case "Tab":
          this.tabHandler();
          break;
        case "DEL":
          this.delHandler();
          break;
        case "Caps Lock":
          this.capsHandler(e);
          break;
        case "ENTER":
          this.enterHandler();
          break;
        case "Shift":
          this.shiftHandler(e);
          break;
        case "Ctrl":
          this.ctrlHandler();
          break;
        case "Alt":
          this.altHandler();
          break;
        case "&#8592;":
          this.arrowLeftHandler();
          break;
        case "&#8593;":
          this.arrowUpHandler();
          break;
        case "&#8594;":
          this.arrowDownHandler();
          break;
        case "&#8595;":
          this.arrowRightHandler();
          break;
        default:
          this.printKeyText(e);
          break;
      }
    }
  }

  updateCursor(pos) {
    this.textArea.focus();
    this.textArea.selectionStart = pos;
    this.textArea.selectionEnd = pos;
  }

  backspaceHandler() {
    const {
      value: val,
      selectionStart: start,
      selectionEnd: end,
    } = this.textArea;

    if (start !== end) {
      this.textArea.value = val.slice(0, start) + val.slice(end);
      this.updateCursor(start);
    } else if (start !== 0) {
      this.textArea.value = val.slice(0, start - 1);
      this.updateCursor(start - 1);
    } else {
      this.updateCursor(start);
    }
  }

  tabHandler() {
    const {
      value: val,
      selectionStart: start,
      selectionEnd: end,
    } = this.textArea;

    this.textArea.value = `${val.substring(0, start)}\t${val.substring(end)}`;

    this.updateCursor(start + 1);
  }

  delHandler() {
    const {
      value: val,
      selectionStart: start,
      selectionEnd: end,
    } = this.textArea;

    if (start !== end) {
      this.textArea.value = val.slice(0, start) + val.slice(end);
    } else if (end !== val.length) {
      this.textArea.value = val.slice(0, start) + val.slice(start + 1);
    }

    this.updateCursor(start);
  }

  capsHandler(e) {
    const {
      selectionStart: start
    } = this.textArea;

    this.capsLockState = !this.capsLockState;
    e.target.classList.toggle("active");

    for (const button of this.keys) {
      button.capsLock();
    }

    this.updateCursor(start);
  }

  shiftHandler(e) {
    e.target.classList.toggle("active");
    this.shiftState = !this.shiftState;

    for (const button of this.keys) {
      button.shift();
    }
  }

  ctrlHandler() {
    const {
      selectionStart: start
    } = this.textArea;
    if (this.shiftState) {
      this.changeLanguage();
    }

    this.updateCursor(start);
  }

  changeLanguage() {
    this.lang = this.lang === "en" ? "ru" : "en";
    localStorage.setItem("lang", this.lang);
    for (const button of this.keys) {
      button.setLanguage(this.lang);
      if (!helpers.isCtrl(button.code)) {
        button.keyNode.classList.remove("active");
      }
      button.keyNode.classList.remove("capsLock");
    }
    this.shiftState = false;
    this.ctrlKeyUp = true;
  }

  enterHandler() {
    const {
      value: val,
      selectionStart: start,
      selectionEnd: end,
    } = this.textArea;

    this.textArea.value = `${val.substring(0, start)}\n${val.substring(end)}`;

    this.updateCursor(start + 1);
  }

  printKeyText(e) {
    const {
      value: val,
      selectionStart: start,
      selectionEnd: end,
    } = this.textArea;

    const letter = e.target.textContent;

    if (this.capsLockState !== this.shiftState) {
      this.textArea.value =
        val.substring(0, start) + letter.toUpperCase() + val.substring(end);
    } else {
      this.textArea.value =
        val.substring(0, start) + letter.toLowerCase() + val.substring(end);
    }

    this.updateCursor(start + 1);
  }
}

window.onload = () => {
  const keyboard = new Keyboard();
  keyboard.init();
};