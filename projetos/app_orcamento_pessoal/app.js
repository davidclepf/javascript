/*  *** CLASSE DESPESA *** */
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }
    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}

/* *** CLASSE BD *** */
class Bd {

    constructor() {
        let id = localStorage.getItem('id');
        if(id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id') 
        return parseInt(proximoId) + 1
    }
    gravar(d) {
        let id = this.getProximoId();
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id', id);

    }

    /* OBJETO RECUPERA TODOS REGISTROS */
    recuperarTodosRegistros() {

        // array de despesas
        let despesas = [ ]

        let id = localStorage.getItem('id');

        //recuperar todas as despesas cadastradas em localStorage
        for(let i = 1; i <= id; i++) {
            // recupera a despesa
            let despesa = JSON.parse(localStorage.getItem(i));

            // verificar se existe a possibilidade de haver índices que foram pulados ou removidos
            // nesse caso vamos pular esses índices
            if(despesa === null) {
                continue;
            }

            despesa.id = i;
            despesas.push(despesa);
        }
        return despesas;
    }

    /* PESQUISAR DESPESA */
    pesquisar(despesa) {
        let despesasFiltradas = [];
        despesasFiltradas = this.recuperarTodosRegistros();

        console.log(despesasFiltradas)
        console.log(despesa)
        
        // ano
        if(despesa.ano != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
        
        // mes
        if(despesa.mes != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }
        
        // dia
        if(despesa.dia != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }
        
        // tipo
        if(despesa.tipo != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }
        
        // descricao
        if(despesa.descricao != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }
        
        // valor
        if(despesa.valor != '') {
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }
        return despesasFiltradas;
    }

    // método para remover despesa pelo id
    remover(id) {
        localStorage.removeItem(id);
    }
}

/* CRIANDO NOVO OBJETO BD */
let bd = new Bd();


function cadastrarDespesa() {
    
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(
        ano, mes, dia, tipo, descricao, valor
    )

    if(despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso!';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_message').innerHTML = 'Despesa cadastrada com sucesso!';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn-success';
        
        //jquery
        $('#modalRegistraDespesa').modal('show');

        // limpando o valor do formulário após o envio das informações
        ano = document.getElementById('ano').value = '';
        mes = document.getElementById('mes').value = '';
        dia = document.getElementById('dia').value = '';
        tipo = document.getElementById('tipo').value = '';
        descricao = document.getElementById('descricao').value = '';
        valor = document.getElementById('valor').value = '';

    } else {
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro!';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_message').innerHTML = 'Existem campos obrigatórios que não formam preenchidos corretamente!';
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
        document.getElementById('modal_btn').className = 'btn-danger';
        
        //jquery
        $('#modalRegistraDespesa').modal('show')
    }
}

function carregaListaDespesas(despesas = [], filtro = false) {
    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros();
    }

    // selecionando o elemeto tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';

    // percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {

        // criando a linha (tr) no html
        let linha = listaDespesas.insertRow();

        // criar as colunas (td) no html
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        
        // ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação';
            break;
            case '2': d.tipo = 'Educação';
            break;
            case '3': d.tipo = 'Lazer';
            break;
            case '4': d.tipo = 'Saúde';
            break;
            case '5': d.tipo = 'Transporte';
            break;
        }

        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        /* *** Criar Botão de Exclusão **** */
        // criando o elemento 'button'
        let btn = document.createElement("button");
        // atribuindo uma classe ao botão
        btn.className = 'btn btn-danger';
        // inserindo uma fonte awesome dentro do votão
        btn.innerHTML = '<i class="fas fa-times"></i>'
        // incluido id
        btn.id = `id_despesa_${d.id}`;
        // função onclick para remover a despesa
        btn.onclick = function() {
            // formatando a saído do id para que retorne somente o número do id e atribuí-lo à variável id
            let id = this.id.replace('id_despesa_', '');
            // removendo despesa
            bd.remover(id)
            // recarregando a página após a remoção
            window.location.reload()
        }

        linha.insertCell(4).append(btn)

    })

}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa);

    carregaListaDespesas(despesas, true);    

}

