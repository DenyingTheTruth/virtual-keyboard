import Button from './button.js';

class LetterButton extends Button {
  constructor(
    text,
    width,
    lang = 'en',
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

export default LetterButton;