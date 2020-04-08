import * as CONSTANTS from '../constants/constants.js';
import Button from './button.js';

export default class SymbolButton extends Button {
  constructor(
    text,
    width,
    lang = CONSTANTS.defaultLanguage,
    altText,
    code
  ) {
    super(text, width, lang, altText, code);
  }

  capsLock() {
    this.keyNode.classList.toggle('uppercase');
  }

  shift() {
    this.keyNode.classList.toggle('uppercase');
    this.swapText();
    this.setText();
  }
}