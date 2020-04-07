import KEY_BUTTONS from "./src/keyConfig.js";
import Button from "./src/button.js";
import AltButton from "./src/altButton.js";
import LetterButton from "./src/letterButton.js";

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
    for (const button of KEY_BUTTONS) {
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

  isCaps(code) {
    return code === 'CapsLock';
  }

  isShift(code) {
    return ['ShiftLeft', 'ShiftRight'].includes(code);
  }

  isCtrl(code) {
    return ['ControlRight', 'ControlLeft'].includes(code);
  }

  isArrow(code) {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code);
  }

  addActive(e) {
    const button = this.keys.find((item) => item.code === e.code);
    if (button) {
      if (this.isArrow(button.code)) {
        button.keyNode.classList.add("active");
      } else {
        e.preventDefault();

        if (this.isShift(button.code)) {
          button.keyNode.classList.add("active");
          this.shiftState = !this.shiftState;

          for (const key of this.keys) {
            key.shift();
          }
        }

        if (this.isCaps(button.code)) {
          button.keyNode.click();
        }

        if (this.isCtrl(button.code)) {
          button.keyNode.classList.add("active");
          if (this.shiftState) {
            this.changeLanguage();
          }
        }

        if (
          !this.isCaps(button.code) &&
          !this.isShift(button.code) &&
          !this.isCtrl(button.code)
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
      if (this.isArrow(button.code)) {
        button.keyNode.classList.remove("active");
      } else {
        e.preventDefault();

        if (this.isShift(button.code)) {
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

        if (!this.isCaps(button.code) && !this.isShift(button.code)) {
          button.keyNode.classList.remove("active");
        }
      }
    }
    return null;
  }

  handlers = {
    'Tab': function tabHandler() {
      const {
        value: val,
        selectionStart: start,
        selectionEnd: end,
      } = this.textArea;

      this.textArea.value = `${val.substring(0, start)}\t${val.substring(end)}`;

      this.updateCursor(start + 1);
    },
    'Backspace': function backspaceHandler() {
      const {
        value: val,
        selectionStart: start,
        selectionEnd: end,
      } = this.textArea;

      if (start !== end) {
        this.textArea.value = val.slice(0, start) + val.slice(end);
        this.updateCursor(start);
      } else if (start !== 0) {
        this.textArea.value = val.slice(0, start - 1) + val.slice(start);
        this.updateCursor(start - 1);
      } else {
        this.updateCursor(start);
      }
    },
    'DEL': function delHandler() {
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
    },
    'Caps Lock': function capsHandler(e) {
      const {
        selectionStart: start
      } = this.textArea;

      this.capsLockState = !this.capsLockState;
      e.target.classList.toggle("active");

      for (const button of this.keys) {
        button.capsLock();
      }

      this.updateCursor(start);
    },
    'ENTER': function enterHandler() {
      const {
        value: val,
        selectionStart: start,
        selectionEnd: end,
      } = this.textArea;

      this.textArea.value = `${val.substring(0, start)}\n${val.substring(end)}`;

      this.updateCursor(start + 1);
    },
    'Shift': function shiftHandler(e) {
      e.target.classList.toggle("active");
      this.shiftState = !this.shiftState;

      for (const button of this.keys) {
        button.shift();
      }
    },
    'Ctrl': function ctrlHandler() {
      const {
        selectionStart: start
      } = this.textArea;
      if (this.shiftState) {
        this.changeLanguage();
      }

      this.updateCursor(start);
    },
    'Alt': function altHandler() {
      const {
        selectionStart: start
      } = this.textArea;


      this.updateCursor(start);
    },
    '&#8592;': function arrowLeftHandler() {
      const {
        selectionStart: start,
      } = this.textArea;


      this.updateCursor(start - 1);
    },
    '&#8593;': function arrowUpHandler() {
      this.updateCursor(0);
    },
    '&#8594;': function arrowRightHandler() {
      const {
        selectionStart: start
      } = this.textArea;

      this.updateCursor(start + 1);
    },
    '&#8595;': function arrowDownHandler() {
      const {
        value: val
      } = this.textArea;

      this.updateCursor(val.length);
    }
  }

  updateCursor(pos) {
    this.textArea.focus();
    this.textArea.selectionStart = pos;
    this.textArea.selectionEnd = pos;
  }

  changeLanguage() {
    this.lang = this.lang === "en" ? "ru" : "en";
    localStorage.setItem("lang", this.lang);
    for (const button of this.keys) {
      button.setLanguage(this.lang);
      if (!this.isCtrl(button.code)) {
        button.keyNode.classList.remove("active");
      }
      button.keyNode.classList.remove("capsLock");
    }
    this.shiftState = false;
    this.ctrlKeyUp = true;
  }

  trackClickHandler(e) {
    if (e.target.dataset.keyValue) {
      this.handlers[e.target.dataset.keyValue] ?
        this.handlers[e.target.dataset.keyValue].bind(this)(e) :
        this.printKeyText(e);
    }
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