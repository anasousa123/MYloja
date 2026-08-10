// ==========================================
// FASHION ERP - ESTOQUE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const lista = document.getElementById("listaEstoque");
    const pesquisa = document.getElementById("pesquisaEstoque");
    const filtro = document.getElementById("filtroEstoque");
    const vazio = document.getElementById("estoqueVazio");

    const totalProdutos = document.getElementById("totalProdutos");
    const estoqueBaixo = document.getElementById("estoqueBaixo");
    const semEstoque = document.getElementById("semEstoque");

    let produtos = JSON.parse(
        localStorage.getItem("fashionERP_produtos")
    ) || [];

    function renderizar(){

        const termo = pesquisa.value
            .toLowerCase()
            .trim();

        let filtrados = produtos.filter(produto => {

            return String(produto.nome || "")
                .toLowerCase()
                .includes(termo);

        });

        filtrados = filtrados.filter(produto => {

            const quantidade = Number(produto.quantidade || produto.estoque || 0);

            if(filtro.value === "baixo"){
                return quantidade > 0 && quantidade <= 5;
            }

            if(filtro.value === "zerado"){
                return quantidade <= 0;
            }

            if(filtro.value === "normal"){
                return quantidade > 5;
            }

            return true;

        });

        lista.innerHTML = "";

        if(filtrados.length === 0){

            vazio.style.display = "block";

        }else{

            vazio.style.display = "none";

        }

        filtrados.forEach(produto => {

            const quantidade =
                Number(produto.quantidade || produto.estoque || 0);

            let classe = "normal";
            let texto = "Normal";

            if(quantidade <= 0){

                classe = "zerado";
                texto = "Sem estoque";

            }else if(quantidade <= 5){

                classe = "baixo";
                texto = "Estoque baixo";

            }

            const linha = document.createElement("tr");

            linha.innerHTML = `

                <td>
                    <strong>
                        ${produto.nome || "Produto"}
                    </strong>
                </td>

                <td>
                    ${produto.categoria || "—"}
                </td>

                <td>
                    ${produto.tamanho || "—"}
                </td>

                <td>
                    ${quantidade}
                </td>

                <td>
                    R$ ${Number(produto.preco || 0)
                        .toFixed(2)
                        .replace(".", ",")}
                </td>

                <td>
                    <span class="status ${classe}">
                        ${texto}
                    </span>
                </td>

                <td>
                    <button
                        class="btn-primary"
                        onclick="alterarEstoque('${produto.id}')">
                        <i class="fa-solid fa-box"></i>
                    </button>
                </td>

            `;

            lista.appendChild(linha);

        });

        atualizarResumo();

    }

    function atualizarResumo(){

        totalProdutos.textContent = produtos.length;

        estoqueBaixo.textContent =
            produtos.filter(produto => {

                const qtd =
                    Number(produto.quantidade || produto.estoque || 0);

                return qtd > 0 && qtd <= 5;

            }).length;

        semEstoque.textContent =
            produtos.filter(produto => {

                const qtd =
                    Number(produto.quantidade || produto.estoque || 0);

                return qtd <= 0;

            }).length;

    }

    pesquisa.addEventListener("input", renderizar);

    filtro.addEventListener("change", renderizar);

    window.alterarEstoque = function(id){

        const produto = produtos.find(
            item => String(item.id) === String(id)
        );

        if(!produto) return;

        const novaQuantidade = prompt(
            `Quantidade atual: ${
                produto.quantidade || produto.estoque || 0
            }\n\nDigite a nova quantidade:`
        );

        if(novaQuantidade === null) return;

        const quantidade = Number(novaQuantidade);

        if(isNaN(quantidade) || quantidade < 0){

            alert("Digite uma quantidade válida.");

            return;

        }

        if("quantidade" in produto){

            produto.quantidade = quantidade;

        }else{

            produto.estoque = quantidade;

        }

        localStorage.setItem(
            "fashionERP_produtos",
            JSON.stringify(produtos)
        );

        renderizar();

    };

    renderizar();

});