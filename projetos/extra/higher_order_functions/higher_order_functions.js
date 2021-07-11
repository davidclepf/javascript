// o método addEventListener recebe um argumento 'click' e uma outra função 'handleDocumentClick'
document.addEventListener('click', handleDocumentClick);

function handleDocumentClick() {
    console.log('Clicou no Documento!');
}

/* ******************************************* */

// a função getMultiplier recebe outra função
/* function getMultiplier (multiplier) {
    return function (aNumber) {
        return aNumber * multiplier
    }
} */

// o mesmo que a função à cima, porém usando arrow function
const getMultiplier = multiplier => aNumber => aNumber * multiplier;


// criando variáveis para definir um parâmetro para getMultiplier e assim poder usar a msm função para cpalculos diferentes
const double = getMultiplier(2);
const triple = getMultiplier(3);
const quadruple = getMultiplier(4);

// calculando o quadruplo
console.log(quadruple(5));
// calculando o triple
console.log(triple(5));
// calculando o dobro
console.log(double(5));


/* ################################################################## */
/* 
    *** 3 Highter Order Functions que fazem parte do JavaScript ***
*/

/*  ****************** MAP ************************ */
// É usado para obter um novo array com a mesma quantidade de itens do array original, mas com cada item transformado.

// numbers.map((item, index, array) => {});
// item é o item do array, index é a posição do item no array, e o último é o próprio array.
// somente o item é obrigatório

const  numbers = [1, 2, 3];

// gera um novo array com cada um dos itens sendo elevados ao quadrado.
const squareNumbers = numbers.map(item => item **2);
console.log(squareNumbers);

// array contendo uma lista de séries de TV
const tvShows = [
    { name: 'Breaking Bad', releaseYear: 2008 },
    { name: 'Mr. Robot', releaseYear: 2015 },
    { name: 'True Detective', releaseYear: 2014 },
    { name: 'Hannibal', releaseYear: 2013 },
    { name: 'The Handmaid\'s Tale', releaseYear: 2017 },
    { name: 'House M.D.', releaseYear: 2004 },
    { name: 'Watchmen.', releaseYear: 2019 }
];

// obtendo um novo array só com os nomes das séries
/* const showNames = tvShows.map(tvShows => tvShows.name); */
// usando o destructor (tem o msm resultado que o exemplo acima)
const showNames = tvShows.map(({ name }) => name);

// exibindo as informações no console em formato de tabela
console.table(showNames)


/* ***********************FILTER **************************** */

// é usado quando, baseado em uma condição, se quer obter um novo array só com alguns itens do array original

/* const numberGraterThan37 = randomNumbers.filter((item, index, array) => {}) */
// item é o item do array, index é a posição do item no array, e o último é o próprio array.
// somente o item é obrigatório

const randomNumbers = [36, 99, 37, 63];

const numberGraterThan37 = randomNumbers.filter(item => item > 37);

console.log(numberGraterThan37)

// Exemplo 2
const tarantinoMovies = [
    { name: 'Pulp Fiction', release: 1994},
    { name: 'Kill Bill Volume 2', release: 2004},
    { name: 'Quatro Quartos', release: 1995},
    { name: 'PSin City', release: 2005},
    { name: 'Era uma vez em Hollywood', release: 2019},
    { name: 'Django Livre', release: 2012},
    { name: 'Cães de Aluguel', release: 1992}
]

const filmes = tarantinoMovies.filter(({release}) => release < 2000);
console.table(filmes)

// Exemplo 3

const firstTravelerCities = [
    'Sydney',
    'Berlim',
    'Lisboa',
    'Sófia',
    'Praga',
    'Bali',
    'Florianópolis'
];

const secondTrvelrCities = ['Praga', 'Roma', 'Chiang Mai', 'Lisboa', 'Zagreb'];

// 'includes' verifica quais itens têm nos dois arrais e filter gera um novo array com esses itens
const commonCities = firstTravelerCities.filter(city => secondTrvelrCities.includes(city));

console.log(commonCities);



/* *********************** REDUCE **************************** */

// é usado quando se precisa reduzir o array à algum tipo de dado
// pode gerar um output que pode não ser um array

const numeros = [1, 2, 3];

const sum = numeros.reduce((accumulator, item) => accumulator + item, 0);
console.log(sum)

//Exemplo 2
const cart = [
    { name: 'Dark Souls III', price: 95.03},
    { name: 'Shadows of the Tomb Raider', price: 101.19},
    { name: 'Sekiro: Shadows Die Twice', price: 179.99},
    { name: 'Resident Evil 2', price: 119.90},
    { name: 'Death Strnading', price: 149.99}
];

const productList = cart.reduce((accumulator, { name }) => `${accumulator}- ${name}\n`, '');

console.log(productList);


// Exemplo 3
// extraindo a frequencia de cada idade

const people = [
    { id: 5, name: 'Angelica', age: 18, federativeUnit: 'Pernambuco'},
    { id: 81, name: 'Thales', age: 19, federativeUnit: 'São Paulo'},
    { id: 47, name: 'Ana Carolina', age: 18, federativeUnit: 'Alagoas'},
    { id: 87, name: 'Felipe', age: 18, federativeUnit: 'Minas Gerais'},
    { id: 9, name: 'Gabriel', age: 20, federativeUnit: 'São Paulo'},
    { id: 73, name: 'Aline', age: 19, federativeUnit: 'Brasília'}
];
