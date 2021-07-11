// onload executará o script assim que a página for carregada
window.onload = () => {
  
  // criando variáveis
  var minutos = 0; 
  var segundos = 0; 
  var centSegundos = 0;

  // criando as variáveis que vão receber os contadores que receberão os valores dos ids
  var contadorMinutos = document.getElementById("minutos");
  var contadorCentSegundos = document.getElementById("centSegundos");
  var contadorSegundos = document.getElementById("segundos")
  var botaoStart = document.getElementById('botao-start');
  var botaoStop = document.getElementById('botao-stop');
  var botaoReset = document.getElementById('botao-reset');
  var Interval ;

  // atribuindo função aos botões
  botaoStart.onclick = () => {
    
    // atribuindo o método setInterval, que receberá a função 'start()' com o contador de 10 milisegndos, à variàvel Interval
    
    Interval = setInterval(start, 10);
    console.log(Interval)
  }
  
    botaoStop.onclick = function() {

      // o método clear interval irá parar o contador
      clearInterval(Interval);
  }
  

  botaoReset.onclick = () => {
     clearInterval(Interval);
      minutos = "00"
      centSegundos = "00";
      segundos = "00";
      // setando os valores no campo html vinculado aos ids que foram atribuídos aos contadores
      contadorCentSegundos.innerHTML = centSegundos;
      contadorSegundos.innerHTML = segundos;
      contadorMinutos.innerHTML = minutos;
  }
  
  function start () {

    centSegundos++; 
    
    centSegundos <= 9 ? contadorCentSegundos.innerHTML = "0" + centSegundos : contadorCentSegundos.innerHTML = centSegundos;
    
    if (centSegundos > 99) {
      segundos++;
      console.log(segundos);      
      centSegundos = '00';
      contadorCentSegundos.innerHTML = centSegundos;
      contadorSegundos.innerHTML = "0" + segundos;
    } 
    
    if (segundos > 9){
      contadorSegundos.innerHTML = segundos;
    }  
    
    if (segundos > 59){
      minutos++
      segundos = '00';
      contadorSegundos.innerHTML = segundos;
      contadorMinutos.innerHTML = '0' + minutos;

      minutos <= 9 ? contadorMinutos.innerHTML = "0" + minutos : contadorMinutos.innerHTML = minutos;
    }
  }
}