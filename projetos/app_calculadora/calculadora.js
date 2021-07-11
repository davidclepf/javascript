// criando a função 'calcular()' que receberá dois parâmetros: 'tipo' e 'valor' 
function calcular(tipo, valor) {

    // se o 'tipo' do botão é uma 'acao'
    if(tipo === 'acao') {

        // se o 'valor' é idêntico a 'c'
        if(valor === 'c') {
            // limpar o visor. o id 'resultado' receberá uma string vazia como valor
            document.getElementById('resultado').value = '';
        }

        // concatenando a entrada de dados com a operação matemática e exibindo no visor
        if(valor === ' + ' || valor === ' - ' || valor === ' * ' || valor === ' / ' || valor === '.') {
            document.getElementById('resultado').value += valor;
        }
        
        if(valor === '=') {
            // atribuindo o valor do campo 'resultado' à uma variável
            // usando a função 'evlal()' que converterá a string recebida no campo 'resultado' em operação matemática. assim teremos o resultado do cálculo matemático ao invés de uma concatenação
            var valor_campo = eval(document.getElementById('resultado').value);
            
            // substituindo o valor de 'resultado' pelo valor de 'valor_campo' fazendo com que assim o resultado matemático seja exibido no visor
            document.getElementById('resultado').value = valor_campo
        }

    // se o tipo for idêntico à 'valor' (atribuido aos números)
    } else if(tipo === 'valor'){
        // os valores recebidos no campo com id 'resultado' serão concatenados (os dados recebidos são recebidos como string e serão concatenados quando atribuido o '+')
        document.getElementById('resultado').value += valor;
    }


}