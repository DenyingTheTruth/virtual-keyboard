import * as CONSTANTS from './src/constants/constants.js'
import KEY_BUTTONS from './src/config/keyConfig.js';

import Button from './src/buttons/button.js';
import SymbolButton from './src/buttons/symbolButton.js';

class Keyboard {
  constructor(textarea) {
    this.keys = {};
    this.lang = localStorage.getItem(CONSTANTS.localStorageLanguageKey) || CONSTANTS.defaultLanguage;
    this.textArea = textarea;
    this.capsLockState = false;
    this.shiftState = false;
    this.ctrlKeyUp = false;

    this.keyboardContainer = document.createElement('div');
    this.keyboardContainer.classList.add('keyboard-container');

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    const keyboardKeys = document.createElement('div');
    keyboardKeys.classList.add('keyboard__keys');
    keyboardKeys.append(this.createKeys());
    keyboardKeys.addEventListener('click', this.trackClickHandler);

    keyboard.append(keyboardKeys);
    this.keyboardContainer.append(keyboard);

    this.textArea.addEventListener('keydown', this.addActive);
    this.textArea.addEventListener('keyup', this.removeActive);
  }

  createKeys = () => {
    const keyboardKeys = document.createDocumentFragment();
    KEY_BUTTONS.forEach(rowButtonItems => {
      let row = document.createElement('div');
      row.classList.add('keyboard__row');
      for (const button of rowButtonItems) {
        const {
          text,
          altText,
          code,
          width,
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
        this.keys[newKeyButton.code] = newKeyButton;
        row.append(newKeyButton.keyNode);
      }
      keyboardKeys.append(row);
    })
    return keyboardKeys;
  }

  createKeyButton = (text, width, lang, altText, type, code) => {
    switch (type) {
      case CONSTANTS.FUNCTIONAL:
        return new Button(text, width, lang, altText, code);
      default:
        return new SymbolButton(text, width, lang, altText, code);
    }
  }

  isCaps = (code) => {
    return code === CONSTANTS.isCapsLock;
  }

  isShift = (code) => {
    return [
      CONSTANTS.ShiftLeft,
      CONSTANTS.ShiftRight
    ].includes(code);
  }

  isCtrl = (code) => {
    return [
      CONSTANTS.ControlLeft,
      CONSTANTS.ControlRight
    ].includes(code);
  }

  isArrow = (code) => {
    return [
      CONSTANTS.isArrowDown,
      CONSTANTS.isArrowLeft,
      CONSTANTS.isArrowRight,
      CONSTANTS.isArrowUp
    ].includes(code);
  }

  addActive = (e) => {
    const button = this.keys[e.code];
    if (button) {
      if (this.isArrow(button.code)) {
        button.keyNode.classList.add('active');
      } else {
        e.preventDefault();

        if (this.isShift(button.code)) {
          button.keyNode.classList.add('active');
          this.shiftState = !this.shiftState;

          if (!this.capsLockState) {
            for (const key in this.keys) {
              this.keys[key].shift();
            }
          }
        }

        if (this.isCtrl(button.code)) {
          button.keyNode.classList.add('active');
          if (this.shiftState) {
            this.changeLanguage();
          }
        }

        if (
          !this.isCaps(button.code) &&
          !this.isShift(button.code) &&
          !this.isCtrl(button.code)
        ) {
          button.keyNode.classList.add('active');
          button.keyNode.click();
        }
      }
    }
  }

  removeActive = (e) => {
    const button = this.keys[e.code];
    if (button) {
      if (this.isArrow(button.code)) {
        button.keyNode.classList.remove('active');
      } else {
        e.preventDefault();

        if (this.isShift(button.code)) {
          button.keyNode.classList.remove('active');
          this.shiftState = false;

          if (!this.capsLockState) {
            if (!this.ctrlKeyUp) {
              for (const key in this.keys) {
                this.keys[key].shift();
                this.keys[key].keyNode.classList.remove('uppercase');
              }
            }

            this.ctrlKeyUp = false;
          }
        }

        if (this.isCaps(button.code)) {
          if (!this.shiftState) {
            button.keyNode.click();
          }
        }

        if (!this.isCaps(button.code) && !this.isShift(button.code)) {
          button.keyNode.classList.remove('active');
        }
      }
    }
  }

  handlers = {
    [CONSTANTS.TAB]: () => {
      const {
        value: val,
        selectionStart: start,
        selectionEnd: end,
      } = this.textArea;

      this.textArea.value = `${val.substring(0, start)}\t${val.substring(end)}`;

      this.updateCursor(start + 1);
    },
    [CONSTANTS.BACKSPACE]: () => {
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
    [CONSTANTS.DEL]: () => {
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
    [CONSTANTS.CapsLock]: (e) => {
      const {
        selectionStart: start
      } = this.textArea;

      this.capsLockState = !this.capsLockState;
      e.target.classList.toggle('active');

      for (const button in this.keys) {
        this.keys[button].capsLock();
      }

      this.updateCursor(start);
    },
    [CONSTANTS.ENTER]: () => {
      const {
        value: val,
        selectionStart: start,
        selectionEnd: end,
      } = this.textArea;

      this.textArea.value = `${val.substring(0, start)}\n${val.substring(end)}`;

      this.updateCursor(start + 1);
    },
    [CONSTANTS.SHIFT]: (e) => {
      e.target.classList.toggle('active');
      this.shiftState = !this.shiftState;

      for (const button in this.keys) {
        this.keys[button].shift();
      }
    },
    [CONSTANTS.CTRL]: () => {
      const {
        selectionStart: start
      } = this.textArea;
      if (this.shiftState) {
        this.changeLanguage();
      }

      this.updateCursor(start);
    },
    [CONSTANTS.ALT]: () => {
      const {
        selectionStart: start
      } = this.textArea;

      this.updateCursor(start);
    },
    [CONSTANTS.ArrowLeft]: () => {
      const {
        selectionStart: start
      } = this.textArea;

      this.updateCursor(start - 1);
    },
    [CONSTANTS.ArrowUp]: () => {
      this.updateCursor(0);
    },
    [CONSTANTS.ArrowRight]: () => {
      const {
        selectionStart: start
      } = this.textArea;

      this.updateCursor(start + 1);
    },
    [CONSTANTS.ArrowDown]: () => {
      const {
        value: val
      } = this.textArea;

      this.updateCursor(val.length);
    },
    [CONSTANTS.WIN]: () => {
      const {
        selectionStart: start
      } = this.textArea;

      alert('You Win, kek 🥳');

      this.updateCursor(start);
    },
  };

  updateCursor = (pos) => {
    this.textArea.focus();
    this.textArea.selectionStart = pos;
    this.textArea.selectionEnd = pos;
  }

  changeLanguage = () => {
    this.lang = this.lang === CONSTANTS.EN ? CONSTANTS.RU : CONSTANTS.EN;
    localStorage.setItem(localStorageLanguageKey, this.lang);
    for (const button in this.keys) {
      this.keys[button].setLanguage(this.lang);

      if (!this.isCtrl(this.keys[button].code)) {
        this.keys[button].keyNode.classList.remove('active');
      }

      this.keys[button].keyNode.classList.remove('uppercase');
    }
    this.shiftState = false;
    this.ctrlKeyUp = true;
  }

  trackClickHandler = (e) => {
    const {
      dataset: {
        keyValue: keyValue
      },
      textContent
    } = e.target;
    if (keyValue) {
      if (this.handlers[keyValue]) {
        this.handlers[keyValue](e);
      } else {
        this.printKeyText(textContent);
      }
    }
  }

  printKeyText = (text) => {
    const {
      value: val,
      selectionStart: start,
      selectionEnd: end,
    } = this.textArea;

    if (this.capsLockState !== this.shiftState) {
      this.textArea.value =
        val.substring(0, start) + text.toUpperCase() + val.substring(end);
    } else {
      this.textArea.value =
        val.substring(0, start) + text.toLowerCase() + val.substring(end);
    }

    this.updateCursor(start + 1);
  }
}

window.onload = () => {
  const textarea = document.createElement('textarea');
  textarea.classList.add('textarea');

  const keyboard = new Keyboard(textarea);

  const info = document.createElement('p');
  info.innerHTML = `
    Change language - 'Shift' + 'Ctrl'. 
    <br> 
    <strong>Notes:</strong> Key 'Shift' sticks on mouse click for change language 
    <br> Made with OS Linux (Ubuntu 18.04 LTS).
  `;
  info.classList.add('info');

  document.body.append(textarea, keyboard.keyboardContainer, info);

  textarea.focus();
};