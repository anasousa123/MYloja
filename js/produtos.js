// ========================================
// FASHION ERP - PRODUTOS
// ========================================

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const modal = document.getElementById("modalProduto");
const btnNovo = document.getElementById("novoProduto");
const btnFechar = document.getElementById("fecharModal");
const form = document.getElementById("formProduto");
const tabela = document.getElementById("listaProdutos");

//==============================
// Abrir Modal
//==============================

btnNovo.addEventListener("click", () => {
    modal.style.display = "flex";
});

//==============================
// Fechar Modal
//==============================

btnFechar.addEventListener("click", fecharModal);

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        fecharModal();
    }
});

function fecharModal() {
    modal.style.display = "none";
    form.reset();
}

//==============================
// Salvar Produto
//==============================

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const produto = {

        id: Date.now(),

        nome: form.querySelectorAll("input")[0].value,

        categoria: form.querySelectorAll("input")[1].value,

        marca: form.querySelectorAll("input")[2].value,

        tamanho: form.querySelectorAll("input")[3].value,

        cor: form.querySelectorAll("input")[4].value,

        preco: form.querySelectorAll("input")[5].value,

        estoque: form.querySelectorAll("input")[6].value

    };

    produtos.push(produto);

    salvar();

    renderizar();

    fecharModal();

});

//==============================
// Salvar LocalStorage
//==============================

function salvar(){

    localStorage.setItem(
        "produtos",
        JSON.stringify(produtos)
    );

}

//==============================
// Renderizar Produtos
//==============================

function renderizar(){

    tabela.innerHTML = "";

    produtos.forEach(produto=>{

        tabela.innerHTML += `

        <tr>

            <td>

                <img src="https://placehold.co/60x60">

            </td>

            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>${produto.id}</td>

            <td>${produto.estoque}</td>

            <td>R$ ${Number(produto.preco).toFixed(2)}</td>

            <td>

                <span class="status ativo">

                    Em estoque

                </span>

            </td>

            <td>

                <button
                    class="icon-btn"
                    onclick="editar(${produto.id})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="icon-btn delete"
                    onclick="excluir(${produto.id})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>

        `;

    });

}

//==============================
// Excluir
//==============================

function excluir(id){

    if(confirm("Deseja excluir este produto?")){

        produtos = produtos.filter(
            produto => produto.id !== id
        );

        salvar();

        renderizar();

    }

}

//==============================
// Editar
//==============================

function editar(id){

    alert(
        "A edição será implementada na próxima etapa."
    );

}

//==============================
// Pesquisa
//==============================

const pesquisa = document.querySelector(".search input");

pesquisa.addEventListener("keyup", ()=>{

    const texto = pesquisa.value.toLowerCase();

    const linhas = tabela.querySelectorAll("tr");

    linhas.forEach(linha=>{

        linha.style.display =
            linha.innerText.toLowerCase().includes(texto)
            ? ""
            : "none";

    });

});

//==============================

renderizar();