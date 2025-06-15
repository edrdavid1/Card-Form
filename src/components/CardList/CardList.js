export class CardList {
    constructor(container) {
        this.container = container;
        this.cards = [];
        this.selectedCard = null;
        this.isDeletionMode = false;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
        this.addTestCards();
    }

    addTestCards() {
        const testCards = [
            {
                id: 1,
                number: '4532123456781234',
                cardHolder: 'IVAN IVANOV',
                expiryDate: '12/25',
                type: 'visa'
            },
            {
                id: 2,
                number: '5123456789012345',
                cardHolder: 'PETR PETROV',
                expiryDate: '09/26',
                type: 'mastercard'
            },
            {
                id: 3,
                number: '378282246310005',
                cardHolder: 'ANNA SMIRNOVA',
                expiryDate: '03/27',
                type: 'amex'
            }
        ];

        this.cards = testCards;
        this.render();
    }

    setCards(cards) {
        this.cards = cards;
        this.render();
    }

    getCardType(cardNumber) {
        const firstDigit = cardNumber.replace(/\s/g, '')[0];
        switch (firstDigit) {
            case '4': return 'visa';
            case '5': return 'mastercard';
            case '3': return 'amex';
            case '6': return 'discover';
            default: return 'default';
        }
    }

    formatCardNumber(cardNumber) {
        const lastFour = cardNumber.slice(-4);
        return `**** **** **** ${lastFour}`;
    }

    render() {
        this.container.innerHTML = `
            <div class="card-list-container">
                <h1>Choose card</h1>
                <ul class="card-list">
                    ${this.cards.map((card, index) => `
                        <li class="card-item ${this.selectedCard && this.selectedCard.id === card.id ? 'selected' : ''}" data-index="${index}">
                            <div class="card-info">
                                <img src="./src/assets/icons/${card.type}.svg" 
                                     alt="${card.type}" 
                                     class="card-icon" />
                                <div>
                                    <div class="card-list-number">${this.formatCardNumber(card.number)}</div>
                                    <div class="card-holder">${card.cardHolder}</div>
                                </div>
                            </div>
                            <div class="card-actions-item">
                                ${this.isDeletionMode ? `
                                    <button class="remove-card-inline-btn">&times;</button>
                                ` : `
                                    ${this.selectedCard && this.selectedCard.id === card.id ? `
                                        <button class="select-btn add-money-btn">Add Money</button>
                                    ` : `
                                        <button class="select-btn choose-btn">Choose</button>
                                    `}
                                `}
                            </div>
                        </li>
                    `).join('')}
                </ul>
                <div class="card-actions">
                    <button class="button" id="add-new-card">Add Card</button>
                    <button class="button" id="toggle-remove-mode">${this.isDeletionMode ? 'Done' : 'Remove Card'}</button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        this.container.addEventListener('click', (e) => {
            const cardItem = e.target.closest('.card-item');
            
            if (e.target.id === 'toggle-remove-mode') {
                this.isDeletionMode = !this.isDeletionMode;
                this.selectedCard = null;
                this.render();
                if (!this.isDeletionMode) {
                    this.container.dispatchEvent(new CustomEvent('cardDeselected'));
                }
                return;
            }

            if (this.isDeletionMode) {
                if (e.target.classList.contains('remove-card-inline-btn')) {
                    const index = parseInt(cardItem.dataset.index);
                    const cardToRemove = this.cards[index];
                    this.isDeletionMode = false;
                    this.render();
                    this.container.dispatchEvent(new CustomEvent('removeCard', {
                        detail: cardToRemove
                    }));
                }
                return;
            }

            if (e.target.classList.contains('add-money-btn')) {
                const index = parseInt(cardItem.dataset.index);
                const card = this.cards[index];
                this.container.dispatchEvent(new CustomEvent('showAddMoney', {
                    detail: card
                }));
                return;
            }

            if (cardItem) {
                const index = parseInt(cardItem.dataset.index);
                const card = this.cards[index];
                
                if (this.selectedCard && this.selectedCard.id === card.id) {
                    this.selectedCard = null;
                    this.container.dispatchEvent(new CustomEvent('cardDeselected'));
                } else {
                    this.selectedCard = card;
                    this.container.dispatchEvent(new CustomEvent('cardSelected', {
                        detail: this.selectedCard
                    }));
                }
                
                this.render();
                return;
            }

            if (e.target.classList.contains('button') && e.target.textContent.trim() === 'Add Card') {
                this.selectedCard = null;
                this.isDeletionMode = false;
                this.render();
                this.container.dispatchEvent(new CustomEvent('addNewCard'));
                return;
            }
        });
    }
}