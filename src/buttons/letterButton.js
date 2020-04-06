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

    shift() {
        this.node.classList.toggle('shift');
    }

    caps() {
        this.node.classList.toggle('shift');
    }
}

export default LetterButton;