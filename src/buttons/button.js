class Button {
    constructor(
        text,
        width,
        lang = 'en',
        altText,
        code
    ) {
        this.node = null;
        this.text = text;
        this.width = width;
        this.lang = lang;
        this.altText = altText;
        this.code = code;
    }

    init() {
        this.node = document.createElement('button');
        this.node.dataset.keyValue = this.text.en;
        this.node.classList.add('keyboard__key');
        switch (this.width) {
            case 'md':
                this.node.classList.add('keyboard__key_md');
                break;
            case 'lg':
                this.node.classList.add('keyboard__key_lg');
                break;
            case 'xl':
                this.node.classList.add('keyboard__key_xl');
                break;
            default:
                break;
        }

        this.setText();
    }

    setText() {
        this.node.innerHTML = this.text[this.lang];
    }
}

export default Button;