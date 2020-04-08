import * as CONSTANTS from '../constants/constants.js';

class Button {
  constructor(
    text,
    width,
    lang = CONSTANTS.EN,
    altText,
    code
  ) {
    this.keyNode = document.createElement('button');
    this.text = text;
    this.width = width;
    this.lang = lang;
    this.altText = altText ? altText : text;
    this.code = code;
    this.keyNode.dataset.keyValue = this.text.en;
    this.keyNode.classList.add('keyboard__key');
    switch (this.width) {
      case 'md':
        this.keyNode.classList.add('keyboard__key_md');
        break;
      case 'lg':
        this.keyNode.classList.add('keyboard__key_lg');
        break;
      case 'xl':
        this.keyNode.classList.add('keyboard__key_xl');
        break;
      default:
        break;
    }

    this.setText();
  }

  setText() {
    this.keyNode.innerHTML = this.text[this.lang];
  }

  swapText() {
    [this.text, this.altText] = [this.altText, this.text];
  }

  setLanguage(lang) {
    this.lang = lang;
    this.swapText();
    this.setText();
  }

  capsLock() {
    return null;
  }

  shift() {
    return null;
  }
}

export default Button;