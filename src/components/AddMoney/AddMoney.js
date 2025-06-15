export class AddMoney {
    constructor(container) {
        this.container = container;
        this.selectedCard = null;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    setCard(card) {
        this.selectedCard = card;
        console.log('AddMoney component received card:', this.selectedCard);
    }

    render() {
        this.container.innerHTML = `
            <div class="add-money-container">
                <h2>Add Money</h2>
                ${this.selectedCard ? `
                    <p>To Card: **** **** **** ${this.selectedCard.number.slice(-4)}</p>
                ` : ''}
                <div class="form-group">
                    <label for="amount">Amount</label>
                    <input type="number" 
                           id="amount" 
                           class="input-summ" 
                           placeholder="Enter amount"
                           min="0"
                           step="0.01" />
                </div>
                <button class="button" id="add-money-btn">Add Money</button>
                <button class="button back-to-list-btn">Back to List</button>
            </div>
        `;
    }

    attachEventListeners() {
        const form = this.container.querySelector('.add-money-container');
        const amountInput = form.querySelector('#amount');
        const addMoneyBtn = form.querySelector('#add-money-btn');
        const backToListBtn = form.querySelector('.back-to-list-btn');

        addMoneyBtn.addEventListener('click', () => {
            const amount = parseFloat(amountInput.value);
            if (amount > 0 && this.selectedCard) {
                this.container.dispatchEvent(new CustomEvent('addMoney', {
                    detail: { amount, cardId: this.selectedCard.id }
                }));
                amountInput.value = '';
            }
        });

        backToListBtn.addEventListener('click', () => {
            this.container.dispatchEvent(new CustomEvent('backToList'));
        });
    }
} 