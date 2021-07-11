// recuperando a altura e a largura da tela
let altura = 0;
let largura = 0;
let vidas = 1;
let tempo = 15;
let criaMosquitoTempo = 2000;

// recuperando a url da página (usando 'window.location.search')
let nivel = window.location.search;
// limpando o '?' do retorno da url
nivel = nivel.replace('?', '');

switch(nivel) {
    case 'easy':
        criaMosquitoTempo = 2000;
        break;
    case 'normal':
        criaMosquitoTempo = 1300;
        break;
    case 'hard':
        criaMosquitoTempo = 900;
        break;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
     largura = window.innerWidth;
     
     console.log(altura, largura)
}
ajustaTamanhoPalcoJogo();

var cronometro = setInterval(function(){
    tempo -= 1;

    if(tempo < 0) {
        // limpoando a execução do cronometro e do criaMosquito da memória
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = 'vitoria.html';
    } else {
        // incluindo o valor de 'tempo' dentro (innerHTML) da tag com id 'cronometro'
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000);

function posicaoRandomica() {

    // removendo o mosquito anterior caso exista
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove();

        if(vidas > 3) {
            window.location.href = 'game_over.html';
        } else {
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";
            vidas++
        }
    }

    // 'Math.floor' = arredonda o número para baixo
    // 'Math.random()' = gera um número aleatório entre 0 e 1
    // é multiplicado o random pelo valore referente às cordenadas de tamanho da tela e subtraído 90 para que a imagem não fique fora da tela
    let posicaoX = Math.floor(Math.random() * largura) - 90;
    let posicaoY = Math.floor(Math.random() * altura) - 90;

    // aplicando um controle para, caso a posição seja menor que 0, ela receba o valor 0 e não fique fora da tela
    // se a posição for menor que 0 receberá 0 caso contrário receberá ela mesma
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;
    
    console.log(posicaoX, posicaoY)

    // criar o elemento html
    let mosquito = document.createElement('img');
    mosquito.src = 'imagens/mosca.png';
    // as linhas acima são o mesmo que adicionar a imagem no html atraves da tag img.

    // adicionando as funções para que a imagem seja exibida em tamanhos e posições aleatórias
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();

    // aplicando as coordenadas de posição à imagem
    mosquito.style.left = posicaoX + 'px';
    mosquito.style.top = posicaoY + 'px';
    mosquito.style.position = 'absolute'; // definindo a posição como absoluta
    mosquito.id = 'mosquito'; // atribuindo um id à imagem
    //atribuindo 'onclick' para que o mosquito seja removido quando for clicado
    mosquito.onclick = function() {
        this.remove();         
    }
   

    document.body.appendChild(mosquito);

    console.log(ladoAleatorio());
}


// gerando tamanhos aleatórios para a mosca
function tamanhoAleatorio() {
    // gerando um número randômico entre 0 e 3, e arredondando para baixo.
    // como resultado o retorno será 0, 1 ou 2
    let classe = Math.floor(Math.random() * 3);

    switch(classe){
        case 0:
            return 'mosquito1';
        case 1:
            return 'mosquito2';
        case 2:
            return 'mosquito3';
        // ao usar 'return' não é necessário usar o break pois ele retorna o paramentro e encerra execução
    }
}

// alternando para qual lado a mosca ficará de frente
function ladoAleatorio() {
    // gerando um número aleatório entre 0 e 1
    var classe = Math.floor(Math.random() * 2)

    switch(classe) {
        case 0:
            return 'ladoA';
        case 1:
            return 'ladoB'
    }

} 


