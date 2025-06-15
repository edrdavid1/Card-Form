export class CreditCard {
    constructor(container) {
        this.container = container;
        this.cardNumber = '';
        this.cardHolder = '';
        this.expiryDate = '';
        this.cvv = '';
        this.cardType = 'default';
        this.init();
        this.clearCard();
    }

    init() {
        this.render();
        this.updateDisplay();
    }

    setCardNumber(number) {
        this.cardNumber = number.replace(/\s/g, '');
        this.cardType = this.determineCardType(this.cardNumber);
        this.updateDisplay();
    }

    setCardHolder(holder) {
        this.cardHolder = holder;
        this.updateDisplay();
    }

    setExpiryDate(date) {
        this.expiryDate = date;
        this.updateDisplay();
    }

    setCVV(cvv) {
        this.cvv = cvv;
        this.updateDisplay();
    }

    setCardData(card) {
        this.cardNumber = card.number;
        this.cardHolder = card.cardHolder;
        this.expiryDate = card.expiryDate;
        this.cardType = card.type;
        this.updateDisplay();
    }

    determineCardType(number) {
        const firstDigit = number.replace(/\s/g, '')[0];
        switch (firstDigit) {
            case '4': return 'visa';
            case '5': return 'mastercard';
            case '3': return 'amex';
            default: return 'default';
        }
    }

    formatCardNumber(number) {
        const parts = [];
        for (let i = 0; i < number.length; i += 4) {
            parts.push(number.substring(i, i + 4));
        }
        return parts.join(' ');
    }

    updateDisplay() {
        const cardNumberDisplayContainer = this.container.querySelector('.card-number');
        if (cardNumberDisplayContainer) {
            const numberDisplays = cardNumberDisplayContainer.querySelectorAll('.card-number-display');
            const formattedNumber = this.formatCardNumber(this.cardNumber);
            
            let currentDisplayIndex = 0;
            for (let i = 0; i < formattedNumber.length; i++) {
                const char = formattedNumber[i];
                if (char === ' ') continue;
                
                if (numberDisplays[currentDisplayIndex]) {
                    numberDisplays[currentDisplayIndex].textContent = char;
                } else {
                    console.warn('Not enough card number display spans.');
                }
                currentDisplayIndex++;
            }
            for (let i = currentDisplayIndex; i < numberDisplays.length; i++) {
                numberDisplays[i].textContent = '_';
            }
        }

        const cardHolderName = this.container.querySelector('#card-holder-name');
        if (cardHolderName) {
            cardHolderName.textContent = this.cardHolder || 'YOUR NAME HERE';
        }

        const validity = this.container.querySelector('#validity');
        if (validity) {
            validity.textContent = this.expiryDate || 'MM/YY';
        }

        const cvvDisplay = this.container.querySelector('#cvv-display');
        if (cvvDisplay) {
            cvvDisplay.textContent = this.cvv || '';
        }

        const visaLogo = this.container.querySelector('.visa-logo');
        if (visaLogo) {
            if (this.cardType && this.cardType !== 'default') {
                visaLogo.src = `./src/assets/icons/${this.cardType}.svg`;
            } else {
                visaLogo.src = '';
            }
        }
    }

    flipCard() {
        this.container.querySelector('.credit-card').classList.add('flipped');
    }

    unflipCard() {
        this.container.querySelector('.credit-card').classList.remove('flipped');
    }

    render() {
        this.container.innerHTML = `
            <div class="credit-card">
                <div class="card-front">
                    <div class="branding">
                        <img src="./src/assets/icons/chip.svg" class="chip-img" />
                        <img class="visa-logo" />
                    </div>
                    <div class="card-number">
                        <div>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                        </div>
                        <div>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                        </div>
                        <div>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                        </div>
                        <div>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                            <span class="card-number-display">_</span>
                        </div>
                    </div>
                    <div class="details">
                        <div>
                            <span id="card-holder-name">Your Name Here</span>
                        </div>
                        <div>
                            <span id="validity">06/28</span>
                        </div>
                    </div>
                </div>
                <div class="card-back">
                    <div class="black-strip"></div>
                    <div class="white-strip">
                        <span>CVV</span>
                        <div id="cvv-display"></div>
                    </div>
                    <img class="visa-logo" />
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Add any necessary event listeners here
    }

    clearCard() {
        this.cardNumber = '';
        this.cardHolder = '';
        this.expiryDate = '';
        this.cvv = '';
        this.cardType = 'default';
        this.updateDisplay();
    }
} 