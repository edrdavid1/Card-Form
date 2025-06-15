import { CreditCard } from './components/CreditCard/CreditCard.js';
import { CardForm } from './components/CardForm/CardForm.js';
import { CardList } from './components/CardList/CardList.js';
import { AddMoney } from './components/AddMoney/AddMoney.js';

class CardApp {
    constructor() {
        this.init();
    }

    init() {
        this.createContainers();
        
        this.creditCard = new CreditCard(this.cardContainer);
        this.cardForm = new CardForm(this.formContainer, this.creditCard);
        this.cardList = new CardList(this.listContainer);
        this.addMoney = new AddMoney(this.moneyContainer);

        this.showComponent(this.listContainer);
        
        this.attachEventListeners();
    }

    createContainers() {
        this.mainContainer = document.createElement('div');
        this.mainContainer.className = 'app-wrapper';
        document.body.appendChild(this.mainContainer);

        this.cardContainer = document.createElement('div');
        this.cardContainer.className = 'card-display-container';

        this.formContainer = document.createElement('div');
        this.formContainer.className = 'form-display-container';

        this.listContainer = document.createElement('div');
        this.listContainer.className = 'list-display-container';

        this.moneyContainer = document.createElement('div');
        this.moneyContainer.className = 'money-display-container';

        this.mainContainer.appendChild(this.cardContainer);
        this.mainContainer.appendChild(this.formContainer);
        this.mainContainer.appendChild(this.listContainer);
        this.mainContainer.appendChild(this.moneyContainer);

        this.cardContainer.classList.add('hidden');
        this.formContainer.classList.add('hidden');
        this.listContainer.classList.remove('hidden');
        this.moneyContainer.classList.add('hidden');
    }

    attachEventListeners() {
        this.formContainer.addEventListener('cardFormSubmit', (e) => {
            const cardData = e.detail;
            console.log('Card Data Submitted:', cardData);
            
            const newCard = {
                id: Date.now(),
                number: cardData.cardNumber,
                cardHolder: cardData.cardHolder.toUpperCase(),
                expiryDate: cardData.expiryDate.split('-').slice(1).join('/'),
                type: this.determineCardType(cardData.cardNumber)
            };
            
            const updatedCards = [...this.cardList.cards, newCard];
            this.cardList.setCards(updatedCards);
            
            this.showComponent(this.listContainer);
            this.cardForm.clearForm();
        });

        this.listContainer.addEventListener('addNewCard', () => {
            this.showComponent(this.formContainer);
            this.cardContainer.classList.remove('hidden');
        });

        this.listContainer.addEventListener('cardSelected', (e) => {
            const card = e.detail;
            console.log('Card Selected:', card);
            this.creditCard.setCardData(card);
        });

        this.listContainer.addEventListener('cardDeselected', () => {
            console.log('Card Deselected');
            this.creditCard.clearCard();
        });

        this.listContainer.addEventListener('showAddMoney', (e) => {
            const card = e.detail;
            console.log('Show Add Money for card:', card);
            this.addMoney.setCard(card);
            this.showComponent(this.moneyContainer);
        });

        this.listContainer.addEventListener('removeCard', (e) => {
            const card = e.detail;
            console.log('Remove Card:', card);
            const updatedCards = this.cardList.cards.filter(c => c.id !== card.id);
            this.cardList.setCards(updatedCards);
            this.showComponent(this.listContainer);
        });

        this.moneyContainer.addEventListener('addMoney', (e) => {
            const { amount } = e.detail;
            console.log(`Add ${amount} to selected card`);
            this.showComponent(this.listContainer);
        });

        this.moneyContainer.addEventListener('backToList', () => {
            console.log('Back to Card List');
            this.showComponent(this.listContainer);
        });
    }

    showComponent(componentContainer) {
        [this.cardContainer, this.formContainer, this.listContainer, this.moneyContainer]
            .forEach(container => container.classList.add('hidden'));

        componentContainer.classList.remove('hidden');
        
        if (componentContainer === this.formContainer) {
            this.cardContainer.classList.remove('hidden');
        } else {
            this.cardContainer.classList.add('hidden');
        }
    }

    determineCardType(cardNumber) {
        if (cardNumber.startsWith('4')) return 'visa';
        if (cardNumber.startsWith('5')) return 'mastercard';
        if (cardNumber.startsWith('3')) return 'amex';
        return 'default';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CardApp();
}); 