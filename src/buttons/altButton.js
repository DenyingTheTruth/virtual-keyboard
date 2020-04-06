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
}

export default AltButton;