const transactionsUl = document.querySelector('#transactions');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const balanceDisplay = document.querySelector('#balance');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'));
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : [];

const removeTransaction = ID => {
    transactions = transactions.filter(transaction =>     transaction.id != ID);
updateLocalStorage();
    init();
}

// criando a função para inserir as transações
const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+';
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus';
    const amountWithoutOperator = Math.abs(transaction.amount);
    // document.createElement = cria um novo elemento html
    const li = document.createElement('li');

    li.classList.add(CSSClass);
    li.innerHTML = `
        ${transaction.name}
        <span>${operator} R$ ${amountWithoutOperator} </span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
        x
        </button>
    `;

    transactionsUl.append(li);  
}

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts
    .filter(value => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);

const getIncome = transactionsAmounts => transactionsAmounts
    .filter(value => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);

const getTotal = transactionsAmounts => transactionsAmounts
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2);


const updateBalanceValues = () => {
    const transactionsAmounts = transactions
        .map(transaction => transaction.amount);
    const total = getTotal(transactionsAmounts);
    const income = getIncome(transactionsAmounts);
    const expense = getExpenses(transactionsAmounts);

    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;    
}

const init = () => {
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionIntoDOM);
    updateBalanceValues()
}

init();

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const generateID = () => Math.round(Math.random() * 1000);

// criando a transação e incluindo no array de transações
const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    });
}

// função para limpar os inputs
const cleanInput = () => {
    inputTransactionName.value = '';
    inputTransactionAmount.value = '';
}

const handleFormSubmit = event => {
    // impedindo que o form seja enviado e a página recarregada
    event.preventDefault()

    // criando constantes com os valores inseridos nos inputs
    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();
    const isSomeInputEmpty = transactionName === '' || transactionAmount === '';

    // verificando se os inputs foram preenchidos e enviando msg se vazios
    if(isSomeInputEmpty) {
        alert('Por favor, preencha tanto o nome quanto o valor da transação!');
        return;
    }

    // chamando a função que inclui no array de transações
    addToTransactionsArray(transactionName, transactionAmount);

    // invicando a init para atualizar as informações na tela
    init();

    // atualizando o local storage
    updateLocalStorage(); 

    // limpando os inputs
    cleanInput();
    
}

form.addEventListener('submit', handleFormSubmit);
