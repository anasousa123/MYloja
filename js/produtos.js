// ==========================================
// FASHION ERP
// MÓDULO DE PRODUTOS
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS
    // ==========================================

    const modal = document.getElementById("modalProduto");
    const form = document.getElementById("formProduto");

    const btnNovo = document.getElementById("btnNovoProduto");
    const btnFechar = document.getElementById("fecharModal");
    const btnCancelar = document.getElementById("cancelarProduto");

    const lista = document.getElementById("listaProdutos");
    const produtosVazios = document.getElementById("produtosVazios");

    const pesquisa = document.getElementById("pesquisaProduto");
    const filtroCategoria = document.getElementById("filtroCategoria");

    const totalProdutos = document.getElementById("totalProdutos");
    const totalEstoque = document.getElementById("totalEstoque");
    const produtosBaixos = document.getElementById("produtosBaixos");

    const tituloModal = document.getElementById("tituloModal");

    // ==========================================
    // CAMPOS DO FORMULÁRIO
    // ==========================================

    const produtoId = document.getElementById("produtoId");

    const nomeProduto = document.getElementById("nomeProduto");

    const categoriaProduto =
        document.getElementById("categoriaProduto");

    const tamanhoProduto =
        document.getElementById("tamanhoProduto");

    const precoProduto =
        document.getElementById("precoProduto");

    const quantidadeProduto =
        document.getElementById("quantidadeProduto");

    const estoqueMinimo =
        document.getElementById("estoqueMinimo");

    const codigoProduto =
        document.getElementById("codigoProduto");

    const marcaProduto =
        document.getElementById("marcaProduto");

    const descricaoProduto =
        document.getElementById("descricaoProduto");


    // ==========================================
    // CARREGAR PRODUTOS
    // ==========================================

    let produtos = JSON.parse(
        localStorage.getItem("fashionERP_produtos")
    ) || [];


    // ==========================================
    // ABRIR NOVO PRODUTO
    // ==========================================

    btnNovo.addEventListener("click", () => {

        abrirModal();

    });


    // ==========================================
    // FECHAR MODAL
    // ==========================================

    btnFechar.addEventListener("click", () => {

        fecharModal();

    });


    btnCancelar.addEventListener("click", () => {

        fecharModal();

    });


    // ==========================================
    // FECHAR CLICANDO FORA
    // ==========================================

    modal.addEventListener("click", (event) => {

        if(event.target === modal){

            fecharModal();

        }

    });


    // ==========================================
    // ABRIR MODAL
    // ==========================================

    function abrirModal(produto = null){

        modal.classList.add("show");

        if(produto){

            tituloModal.textContent = "Editar Produto";

            produtoId.value = produto.id;

            nomeProduto.value = produto.nome || "";

            categoriaProduto.value =
                produto.categoria || "";

            tamanhoProduto.value =
                produto.tamanho || "Único";

            precoProduto.value =
                produto.preco || "";

            quantidadeProduto.value =
                produto.quantidade || 0;

            estoqueMinimo.value =
                produto.estoqueMinimo ?? 5;

            codigoProduto.value =
                produto.codigo || "";

            marcaProduto.value =
                produto.marca || "";

            descricaoProduto.value =
                produto.descricao || "";

        }else{

            tituloModal.textContent = "Novo Produto";

            form.reset();

            produtoId.value = "";

            tamanhoProduto.value = "Único";

            quantidadeProduto.value = 0;

            estoqueMinimo.value = 5;

        }

        setTimeout(() => {

            nomeProduto.focus();

        },100);

    }


    // ==========================================
    // FECHAR MODAL
    // ==========================================

    function fecharModal(){

        modal.classList.remove("show");

        form.reset();

        produtoId.value = "";

        tituloModal.textContent = "Novo Produto";

        tamanhoProduto.value = "Único";

        quantidadeProduto.value = 0;

        estoqueMinimo.value = 5;

    }


    // ==========================================
    // SALVAR PRODUTO
    // ==========================================

    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const nome = nomeProduto.value.trim();

        const categoria =
            categoriaProduto.value;

        const tamanho =
            tamanhoProduto.value;

        const preco =
            Number(precoProduto.value);

        const quantidade =
            Number(quantidadeProduto.value);

        const minimo =
            Number(estoqueMinimo.value);


        // ======================================
        // VALIDAÇÕES
        // ======================================

        if(!nome){

            alert("Digite o nome do produto.");

            nomeProduto.focus();

            return;

        }


        if(!categoria){

            alert("Selecione uma categoria.");

            categoriaProduto.focus();

            return;

        }


        if(isNaN(preco) || preco < 0){

            alert("Digite um preço válido.");

            precoProduto.focus();

            return;

        }


        if(isNaN(quantidade) || quantidade < 0){

            alert("Digite uma quantidade válida.");

            quantidadeProduto.focus();

            return;

        }


        if(isNaN(minimo) || minimo < 0){

            alert("Digite um estoque mínimo válido.");

            estoqueMinimo.focus();

            return;

        }


        // ======================================
        // VERIFICAR CÓDIGO DUPLICADO
        // ======================================

        const codigo =
            codigoProduto.value.trim();

        if(codigo){

            const codigoExistente =
                produtos.find(produto =>

                    produto.codigo &&
                    produto.codigo.toLowerCase() ===
                    codigo.toLowerCase() &&
                    produto.id !== produtoId.value

                );


            if(codigoExistente){

                alert(
                    "Já existe um produto com esse código."
                );

                codigoProduto.focus();

                return;

            }

        }


        // ======================================
        // EDITAR PRODUTO
        // ======================================

        if(produtoId.value){

            const indice =
                produtos.findIndex(
                    produto =>
                        produto.id === produtoId.value
                );


            if(indice !== -1){

                produtos[indice] = {

                    ...produtos[indice],

                    nome: nome,

                    categoria: categoria,

                    tamanho: tamanho,

                    preco: preco,

                    quantidade: quantidade,

                    estoqueMinimo: minimo,

                    codigo: codigo,

                    marca:
                        marcaProduto.value.trim(),

                    descricao:
                        descricaoProduto.value.trim()

                };

            }

        }


        // ======================================
        // NOVO PRODUTO
        // ======================================

        else{

            const novoProduto = {

                id: Date.now().toString(),

                nome: nome,

                categoria: categoria,

                tamanho: tamanho,

                preco: preco,

                quantidade: quantidade,

                estoqueMinimo: minimo,

                codigo: codigo,

                marca:
                    marcaProduto.value.trim(),

                descricao:
                    descricaoProduto.value.trim(),

                dataCadastro:
                    new Date().toISOString()

            };


            produtos.push(novoProduto);

        }


        // ======================================
        // SALVAR
        // ======================================

        salvarProdutos();


        // ======================================
        // ATUALIZAR TELA
        // ======================================

        renderizarProdutos();

        atualizarResumo();


        // ======================================
        // FECHAR
        // ======================================

        fecharModal();


        // ======================================
        // MENSAGEM
        // ======================================

        console.log(
            "Produto salvo com sucesso!"
        );

    });


    // ==========================================
    // SALVAR NO LOCALSTORAGE
    // ==========================================

    function salvarProdutos(){

        localStorage.setItem(
            "fashionERP_produtos",
            JSON.stringify(produtos)
        );

    }


    // ==========================================
    // RENDERIZAR PRODUTOS
    // ==========================================

    function renderizarProdutos(){

        const termo =
            pesquisa.value
                .toLowerCase()
                .trim();


        const categoriaSelecionada =
            filtroCategoria.value;


        let filtrados =
            produtos.filter(produto => {


                const correspondePesquisa =

                    produto.nome
                        .toLowerCase()
                        .includes(termo)

                    ||

                    String(produto.codigo || "")
                        .toLowerCase()
                        .includes(termo)

                    ||

                    String(produto.marca || "")
                        .toLowerCase()
                        .includes(termo);


                const correspondeCategoria =

                    categoriaSelecionada === "todos"

                    ||

                    normalizar(
                        produto.categoria
                    ) ===
                    normalizar(
                        categoriaSelecionada
                    );


                return (
                    correspondePesquisa &&
                    correspondeCategoria
                );

            });


        lista.innerHTML = "";


        if(filtrados.length === 0){

            produtosVazios.style.display = "block";

            return;

        }


        produtosVazios.style.display = "none";


        filtrados.forEach(produto => {

            const quantidade =
                Number(produto.quantidade || 0);


            const minimo =
                Number(produto.estoqueMinimo ?? 5);


            let classeEstoque = "stock-normal";

            let classeStatus = "normal";

            let textoStatus = "Normal";


            if(quantidade <= 0){

                classeEstoque = "stock-zero";

                classeStatus = "zerado";

                textoStatus = "Sem estoque";

            }

            else if(quantidade <= minimo){

                classeEstoque = "stock-low";

                classeStatus = "baixo";

                textoStatus = "Estoque baixo";

            }


            const linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>

                    <div class="product-name">

                        <div class="product-image">

                            <i class="fa-solid fa-shirt"></i>

                        </div>

                        <div class="product-info">

                            <strong>

                                ${escaparHTML(
                                    produto.nome
                                )}

                            </strong>

                            <span>

                                ${
                                    produto.codigo
                                    ?
                                    escaparHTML(
                                        produto.codigo
                                    )
                                    :
                                    "Sem código"
                                }

                            </span>

                        </div>

                    </div>

                </td>


                <td>

                    ${escaparHTML(
                        produto.categoria || "—"
                    )}

                </td>


                <td>

                    ${escaparHTML(
                        produto.tamanho || "—"
                    )}

                </td>


                <td>

                    <span class="product-price">

                        ${formatarMoeda(
                            produto.preco
                        )}

                    </span>

                </td>


                <td>

                    <span
                        class="stock-number ${classeEstoque}">

                        ${quantidade}

                    </span>

                </td>


                <td>

                    <span
                        class="status ${classeStatus}">

                        ${textoStatus}

                    </span>

                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="icon-btn"
                            title="Editar"
                            data-action="editar"
                            data-id="${produto.id}">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            class="icon-btn delete"
                            title="Excluir"
                            data-action="excluir"
                            data-id="${produto.id}">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            `;


            lista.appendChild(linha);

        });

    }


    // ==========================================
    // AÇÕES DA TABELA
    // ==========================================

    lista.addEventListener("click", (event) => {

        const botao =
            event.target.closest("button");


        if(!botao) return;


        const id =
            botao.dataset.id;


        const acao =
            botao.dataset.action;


        const produto =
            produtos.find(
                item => item.id === id
            );


        if(!produto) return;


        if(acao === "editar"){

            abrirModal(produto);

        }


        if(acao === "excluir"){

            excluirProduto(produto);

        }

    });


    // ==========================================
    // EXCLUIR
    // ==========================================

    function excluirProduto(produto){

        const confirmar = confirm(

            `Deseja excluir o produto "${produto.nome}"?`

        );


        if(!confirmar) return;


        produtos =
            produtos.filter(
                item => item.id !== produto.id
            );


        salvarProdutos();

        renderizarProdutos();

        atualizarResumo();

    }


    // ==========================================
    // PESQUISA
    // ==========================================

    pesquisa.addEventListener(
        "input",
        renderizarProdutos
    );


    // ==========================================
    // FILTRO
    // ==========================================

    filtroCategoria.addEventListener(
        "change",
        renderizarProdutos
    );


    // ==========================================
    // RESUMO
    // ==========================================

    function atualizarResumo(){

        totalProdutos.textContent =
            produtos.length;


        const quantidadeTotal =
            produtos.reduce(

                (total, produto) => {

                    return total +
                        Number(
                            produto.quantidade || 0
                        );

                },

                0

            );


        totalEstoque.textContent =
            quantidadeTotal;


        const baixos =
            produtos.filter(produto => {

                const quantidade =
                    Number(
                        produto.quantidade || 0
                    );


                const minimo =
                    Number(
                        produto.estoqueMinimo ?? 5
                    );


                return (
                    quantidade > 0 &&
                    quantidade <= minimo
                );

            }).length;


        produtosBaixos.textContent =
            baixos;

    }


    // ==========================================
    // FORMATAR MOEDA
    // ==========================================

    function formatarMoeda(valor){

        return Number(valor || 0)
            .toLocaleString(
                "pt-BR",
                {
                    style:"currency",
                    currency:"BRL"
                }
            );

    }


    // ==========================================
    // NORMALIZAR TEXTO
    // ==========================================

    function normalizar(texto){

        return String(texto || "")
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase();

    }


    // ==========================================
    // PROTEÇÃO CONTRA HTML
    // ==========================================

    function escaparHTML(texto){

        return String(texto)
            .replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,"&#039;");

    }


    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    renderizarProdutos();

    atualizarResumo();

});