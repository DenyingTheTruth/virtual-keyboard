import Button from './button.js';

class AltButton extends Button {
  constructor(
    text,
    width,
    lang = 'en',
    altText,
    code,
  ) {
    super(text, width, lang, altText, code);
  }

  capsLock() {
    this.keyNode.classList.toggle('capsLock');
  }

  shift() {
    this.keyNode.classList.toggle('capsLock');
    this.swapText();
    this.setText();
  }
}

export default AltButton;