export class CardForm {
    constructor(container, creditCard) {
        this.container = container;
        this.creditCard = creditCard;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <form class="card-form">
                <div class="form-group">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" placeholder="1234123412341234" maxlength="16" />
                </div>
                
                <div class="form-group">
                    <label for="card-holder">Card Holder</label>
                    <input type="text" id="card-holder" placeholder="Your Name" maxlength="30" />
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="expiry-date">Expires On</label>
                        <input type="date" id="expiry-date" />
                    </div>
                    
                    <div class="form-group">
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="***" maxlength="3" />
                    </div>
                </div>

                <button type="submit" class="button">Add Card</button>
            </form>
        `;
    }

    attachEventListeners() {
        const form = this.container.querySelector('form');
        const cardNumberInput = form.querySelector('#card-number');
        const cardHolderInput = form.querySelector('#card-holder');
        const expiryDateInput = form.querySelector('#expiry-date');
        const cvvInput = form.querySelector('#cvv');

        cardNumberInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
            this.creditCard.setCardNumber(value);
        });

        cardHolderInput.addEventListener('input', (e) => {
            this.creditCard.setCardHolder(e.target.value);
        });

        expiryDateInput.addEventListener('input', (e) => {
            const date = new Date(e.target.value);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = String(date.getFullYear()).slice(-2);
            this.creditCard.setExpiryDate(`${month}/${year}`);
        });

        cvvInput.addEventListener('input', (e) => {
            const value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
            this.creditCard.setCVV(value);
        });

        cvvInput.addEventListener('focus', () => {
            this.creditCard.flipCard();
        });

        cvvInput.addEventListener('blur', () => {
            this.creditCard.unflipCard();
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const formData = {
            cardNumber: this.container.querySelector('#card-number').value,
            cardHolder: this.container.querySelector('#card-holder').value,
            expiryDate: this.container.querySelector('#expiry-date').value,
            cvv: this.container.querySelector('#cvv').value
        };

        const event = new CustomEvent('cardFormSubmit', {
            detail: formData
        });
        this.container.dispatchEvent(event);

        this.clearForm();
    }

    clearForm() {
        this.container.querySelector('#card-number').value = '';
        this.container.querySelector('#card-holder').value = '';
        this.container.querySelector('#expiry-date').value = '';
        this.container.querySelector('#cvv').value = '';
        this.creditCard.setCardNumber('');
        this.creditCard.setCardHolder('');
        this.creditCard.setExpiryDate('');
        this.creditCard.setCVV('');
        this.creditCard.unflipCard();
    }
} 