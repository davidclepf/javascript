class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];   
        this.editId = null;     
    }

    salvar() {
        let produto = this.lerDados();
        
        if(this.validarCampos(produto)) {
            if(this.editId == null){
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);
            }
        }

        this.listarTabela();
        this.cancelar();
    }

    listarTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();
            
            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nome;
            td_preco.innerText = this.arrayProdutos[i].preco;
            
            // adicionando  uma classe ao td id
            td_id.classList.add('center');
            td_acoes.classList.add('center');
            td_acoes.classList.add('img');

            // criando um elemento img no html
            let imgEdit = document.createElement('img');
            // adicionando o a imagem
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick", "produto.prepararEdicao(" + JSON.stringify(this.arrayProdutos[i]) +")");
            
            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.png';
            imgDelete.setAttribute("onclick", "produto.deletar(" +   this.arrayProdutos[i].id +")");


            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
        }
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto);
        this.id++;
        
    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nome = produto.nome;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

    prepararEdicao(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nome;  
        document.getElementById('preco').value = dados.preco;  

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    lerDados() {
        let produto = {};

        produto.id = this.id;
        produto.nome = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;

        return produto;
    }

    validarCampos(produto) {
        let mensagem = '';

        if(produto.nome == '') {
            mensagem += '- Informe o Nome do Produto \n';
        }
        if(produto.preco == '') {
            mensagem += '- Informe o Preço do Produto \n';
        }

        if(mensagem != '') {
            alert(mensagem);
            return false;
        }

        return true;
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }

    deletar(id) {
        if(confirm(`Deseja realmente deletar o produto?`)){

            let tbody = document.getElementById('tbody');
            for(let i = 0; i < this.arrayProdutos.length; i++){
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }
}

const produto = new Produto();
