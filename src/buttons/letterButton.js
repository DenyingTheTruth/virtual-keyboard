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
}

export default LetterButton;