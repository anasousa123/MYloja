/* ==========================================================
   FASHION ERP
   MÓDULO DE ESTOQUE
   Controle profissional de estoque
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* ======================================================
       CONFIGURAÇÕES
    ====================================================== */

    const STORAGE_PRODUTOS = "fashionERP_produtos";
    const STORAGE_MOVIMENTACOES = "fashionERP_movimentacoes";


    /* ======================================================
       ELEMENTOS
    ====================================================== */

    const lista = document.getElementById("listaEstoque");

    const pesquisa =
        document.getElementById("pesquisaEstoque") ||
        document.getElementById("buscarEstoque");

    const filtroCategoria =
        document.getElementById("filtroCategoria");

    const filtroStatus =
        document.getElementById("filtroStatus");


    const totalProdutos =
        document.getElementById("totalProdutos");

    const totalEstoque =
        document.getElementById("totalEstoque");

    const estoqueBaixo =
        document.getElementById("estoqueBaixo") ||
        document.getElementById("produtosBaixos");

    const semEstoque =
        document.getElementById("semEstoque");


    const contador =
        document.getElementById("contadorEstoque");


    const produtosVazios =
        document.getElementById("estoqueVazio") ||
        document.getElementById("produtosVazios");


    /* ======================================================
       MODAL
    ====================================================== */

    const modal =
        document.getElementById("modalMovimentacao");

    const form =
        document.getElementById("formMovimentacao");

    const fecharModalBtn =
        document.getElementById("fecharModalMovimentacao");

    const cancelarBtn =
        document.getElementById("cancelarMovimentacao");


    const produtoMovimentacao =
        document.getElementById("produtoMovimentacao");

    const tipoMovimentacao =
        document.getElementById("tipoMovimentacao");

    const quantidadeMovimentacao =
        document.getElementById("quantidadeMovimentacao");

    const observacaoMovimentacao =
        document.getElementById("observacaoMovimentacao");


    const tituloModal =
        document.getElementById("tituloMovimentacao");


    /* ======================================================
       DADOS
    ====================================================== */

    let produtos = carregarProdutos();

    let movimentacoes = carregarMovimentacoes();

    let produtoSelecionado = null;


    /* ======================================================
       CARREGAR PRODUTOS
    ====================================================== */

    function carregarProdutos() {

        try {

            const dados =
                localStorage.getItem(STORAGE_PRODUTOS);

            const listaProdutos =
                dados ? JSON.parse(dados) : [];

            return Array.isArray(listaProdutos)
                ? listaProdutos
                : [];

        } catch (erro) {

            console.error(
                "Erro ao carregar produtos:",
                erro
            );

            return [];

        }

    }


    /* ======================================================
       CARREGAR MOVIMENTAÇÕES
    ====================================================== */

    function carregarMovimentacoes() {

        try {

            const dados =
                localStorage.getItem(
                    STORAGE_MOVIMENTACOES
                );

            const listaMovimentacoes =
                dados ? JSON.parse(dados) : [];

            return Array.isArray(listaMovimentacoes)
                ? listaMovimentacoes
                : [];

        } catch (erro) {

            console.error(
                "Erro ao carregar movimentações:",
                erro
            );

            return [];

        }

    }


    /* ======================================================
       SALVAR PRODUTOS
    ====================================================== */

    function salvarProdutos() {

        localStorage.setItem(
            STORAGE_PRODUTOS,
            JSON.stringify(produtos)
        );

    }


    /* ======================================================
       SALVAR MOVIMENTAÇÕES
    ====================================================== */

    function salvarMovimentacoes() {

        localStorage.setItem(
            STORAGE_MOVIMENTACOES,
            JSON.stringify(movimentacoes)
        );

    }


    /* ======================================================
       ATUALIZAR DADOS
    ====================================================== */

    function atualizarDados() {

        produtos = carregarProdutos();

        renderizarEstoque();

        atualizarResumo();

    }


    /* ======================================================
       RENDERIZAR ESTOQUE
    ====================================================== */

    function renderizarEstoque() {

        if (!lista) {

            console.warn(
                "Elemento #listaEstoque não encontrado."
            );

            return;

        }


        const termo =
            pesquisa
                ? pesquisa.value
                    .trim()
                    .toLowerCase()
                : "";


        const categoria =
            filtroCategoria
                ? filtroCategoria.value
                : "";


        const status =
            filtroStatus
                ? filtroStatus.value
                : "";


        const filtrados =
            produtos.filter(produto => {

                const nome =
                    String(
                        produto.nome || ""
                    ).toLowerCase();


                const codigo =
                    String(
                        produto.codigo ||
                        produto.sku ||
                        ""
                    ).toLowerCase();


                const correspondeBusca =
                    !termo ||
                    nome.includes(termo) ||
                    codigo.includes(termo);


                const correspondeCategoria =
                    !categoria ||
                    categoria === "todos" ||
                    normalizar(
                        produto.categoria
                    ) ===
                    normalizar(categoria);


                const quantidade =
                    Number(
                        produto.quantidade || 0
                    );


                const minimo =
                    Number(
                        produto.estoqueMinimo ?? 5
                    );


                let correspondeStatus = true;


                if (status === "normal") {

                    correspondeStatus =
                        quantidade > minimo;

                }


                if (
                    status === "baixo" ||
                    status === "estoque-baixo"
                ) {

                    correspondeStatus =
                        quantidade > 0 &&
                        quantidade <= minimo;

                }


                if (
                    status === "sem" ||
                    status === "zerado" ||
                    status === "sem-estoque"
                ) {

                    correspondeStatus =
                        quantidade <= 0;

                }


                return (
                    correspondeBusca &&
                    correspondeCategoria &&
                    correspondeStatus
                );

            });


        lista.innerHTML = "";


        if (filtrados.length === 0) {

            if (produtosVazios) {

                produtosVazios.style.display =
                    "block";

            }

            atualizarContador(0);

            return;

        }


        if (produtosVazios) {

            produtosVazios.style.display =
                "none";

        }


        filtrados.forEach(produto => {

            const linha =
                criarLinhaProduto(produto);

            lista.appendChild(linha);

        });


        atualizarContador(
            filtrados.length
        );

    }


    /* ======================================================
       CRIAR LINHA DO PRODUTO
    ====================================================== */

    function criarLinhaProduto(produto) {

        const linha =
            document.createElement("tr");


        const quantidade =
            Number(
                produto.quantidade || 0
            );


        const minimo =
            Number(
                produto.estoqueMinimo ?? 5
            );


        let classeStatus = "normal";

        let textoStatus = "Estoque normal";


        if (quantidade <= 0) {

            classeStatus = "zerado";

            textoStatus = "Sem estoque";

        }

        else if (quantidade <= minimo) {

            classeStatus = "baixo";

            textoStatus = "Estoque baixo";

        }


        const codigo =
            produto.codigo ||
            produto.sku ||
            "Sem código";


        linha.innerHTML = `

            <td>

                <div class="stock-product">

                    <div class="stock-product-image">

                        <i class="fa-solid fa-shirt"></i>

                    </div>

                    <div class="stock-product-info">

                        <strong>
                            ${escaparHTML(
                                produto.nome ||
                                "Produto sem nome"
                            )}
                        </strong>

                        <span>
                            ${escaparHTML(codigo)}
                        </span>

                    </div>

                </div>

            </td>


            <td>

                ${escaparHTML(
                    produto.categoria ||
                    "—"
                )}

            </td>


            <td>

                <span class="stock-sku">

                    ${escaparHTML(codigo)}

                </span>

            </td>


            <td>

                <div class="stock-quantity">

                    <strong>
                        ${quantidade}
                    </strong>

                    <small>
                        unidades
                    </small>

                </div>

            </td>


            <td>

                <span
                    class="stock-status ${classeStatus}">

                    ${textoStatus}

                </span>

            </td>


            <td>

                <div class="stock-actions">

                    <button
                        type="button"
                        class="stock-action entry"
                        title="Entrada de estoque"
                        data-action="entrada"
                        data-id="${produto.id}">

                        <i class="fa-solid fa-plus"></i>

                    </button>


                    <button
                        type="button"
                        class="stock-action exit"
                        title="Saída de estoque"
                        data-action="saida"
                        data-id="${produto.id}">

                        <i class="fa-solid fa-minus"></i>

                    </button>

                </div>

            </td>

        `;


        return linha;

    }


    /* ======================================================
       EVENTOS DA TABELA
    ====================================================== */

    if (lista) {

        lista.addEventListener(
            "click",
            event => {

                const botao =
                    event.target.closest(
                        "button[data-action]"
                    );


                if (!botao) return;


                const id =
                    botao.dataset.id;


                const acao =
                    botao.dataset.action;


                const produto =
                    produtos.find(
                        item =>
                            String(item.id) ===
                            String(id)
                    );


                if (!produto) {

                    mostrarMensagem(
                        "Produto não encontrado.",
                        "erro"
                    );

                    return;

                }


                abrirModal(
                    produto,
                    acao
                );

            }
        );

    }


    /* ======================================================
       ABRIR MODAL
    ====================================================== */

    function abrirModal(
        produto,
        tipo
    ) {

        if (!modal) {

            const quantidade =
                solicitarQuantidade(
                    produto,
                    tipo
                );

            if (quantidade !== null) {

                movimentarEstoque(
                    produto,
                    tipo,
                    quantidade,
                    ""
                );

            }

            return;

        }


        produtoSelecionado =
            produto;


        if (tipoMovimentacao) {

            tipoMovimentacao.value =
                tipo;

        }


        if (quantidadeMovimentacao) {

            quantidadeMovimentacao.value =
                "";

        }


        if (observacaoMovimentacao) {

            observacaoMovimentacao.value =
                "";

        }


        if (tituloModal) {

            tituloModal.textContent =
                tipo === "entrada"
                    ? "Entrada de Estoque"
                    : "Saída de Estoque";

        }


        preencherProdutoModal(
            produto
        );


        modal.classList.add("show");


        setTimeout(() => {

            if (quantidadeMovimentacao) {

                quantidadeMovimentacao.focus();

            }

        }, 150);

    }


    /* ======================================================
       PREENCHER PRODUTO NO MODAL
    ====================================================== */

    function preencherProdutoModal(
        produto
    ) {

        if (!produtoMovimentacao) {
            return;
        }


        if (
            produtoMovimentacao.tagName ===
            "SELECT"
        ) {

            produtoMovimentacao.innerHTML = `

                <option value="${produto.id}">
                    ${escaparHTML(produto.nome)}
                    — Estoque:
                    ${Number(produto.quantidade || 0)}
                </option>

            `;

            produtoMovimentacao.value =
                produto.id;

            return;

        }


        produtoMovimentacao.value =
            produto.nome || "";

        produtoMovimentacao.dataset.id =
            produto.id;

    }


    /* ======================================================
       FECHAR MODAL
    ====================================================== */

    function fecharModal() {

        if (!modal) return;


        modal.classList.remove("show");


        produtoSelecionado = null;


        if (form) {

            form.reset();

        }

    }


    if (fecharModalBtn) {

        fecharModalBtn.addEventListener(
            "click",
            fecharModal
        );

    }


    if (cancelarBtn) {

        cancelarBtn.addEventListener(
            "click",
            fecharModal
        );

    }


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    fecharModal();

                }

            }
        );

    }


    /* ======================================================
       FORMULÁRIO
    ====================================================== */

    if (form) {

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                if (!produtoSelecionado) {

                    mostrarMensagem(
                        "Selecione um produto.",
                        "erro"
                    );

                    return;

                }


                const tipo =
                    tipoMovimentacao
                        ? tipoMovimentacao.value
                        : "entrada";


                const quantidade =
                    quantidadeMovimentacao
                        ? Number(
                            quantidadeMovimentacao.value
                        )
                        : 0;


                const observacao =
                    observacaoMovimentacao
                        ? observacaoMovimentacao.value
                            .trim()
                        : "";


                if (
                    !Number.isFinite(quantidade) ||
                    quantidade <= 0
                ) {

                    mostrarMensagem(
                        "Digite uma quantidade válida.",
                        "erro"
                    );

                    if (
                        quantidadeMovimentacao
                    ) {

                        quantidadeMovimentacao.focus();

                    }

                    return;

                }


                movimentarEstoque(
                    produtoSelecionado,
                    tipo,
                    quantidade,
                    observacao
                );


                fecharModal();

            }
        );

    }


    /* ======================================================
       MOVIMENTAR ESTOQUE
    ====================================================== */

    function movimentarEstoque(
        produto,
        tipo,
        quantidade,
        observacao
    ) {

        const indice =
            produtos.findIndex(
                item =>
                    String(item.id) ===
                    String(produto.id)
            );


        if (indice === -1) {

            mostrarMensagem(
                "Produto não encontrado.",
                "erro"
            );

            return;

        }


        const estoqueAtual =
            Number(
                produtos[indice].quantidade ||
                0
            );


        let novoEstoque =
            estoqueAtual;


        /* ================================
           ENTRADA
        ================================= */

        if (tipo === "entrada") {

            novoEstoque =
                estoqueAtual +
                quantidade;

        }


        /* ================================
           SAÍDA
        ================================= */

        else if (tipo === "saida") {

            if (
                quantidade >
                estoqueAtual
            ) {

                mostrarMensagem(
                    `Não é possível retirar ${quantidade} unidades. O estoque atual é de ${estoqueAtual} unidades.`,
                    "erro"
                );

                return;

            }


            novoEstoque =
                estoqueAtual -
                quantidade;

        }


        /* ================================
           ATUALIZAR
        ================================= */

        produtos[indice].quantidade =
            novoEstoque;


        salvarProdutos();


        /* ================================
           REGISTRAR MOVIMENTAÇÃO
        ================================= */

        const movimentacao = {

            id:
                Date.now().toString(),

            produtoId:
                produtos[indice].id,

            produto:
                produtos[indice].nome,

            tipo:
                tipo,

            quantidade:
                quantidade,

            estoqueAnterior:
                estoqueAtual,

            estoqueAtual:
                novoEstoque,

            observacao:
                observacao || "",

            data:
                new Date().toISOString()

        };


        movimentacoes.unshift(
            movimentacao
        );


        /* manter somente os últimos 500 */

        if (
            movimentacoes.length >
            500
        ) {

            movimentacoes =
                movimentacoes.slice(
                    0,
                    500
                );

        }


        salvarMovimentacoes();


        /* ================================
           ATUALIZAR INTERFACE
        ================================= */

        renderizarEstoque();

        atualizarResumo();


        mostrarMensagem(

            tipo === "entrada"

                ? "Entrada registrada com sucesso!"

                : "Saída registrada com sucesso!",

            "sucesso"

        );

    }


    /* ======================================================
       RESUMO
    ====================================================== */

    function atualizarResumo() {

        const total =
            produtos.length;


        const quantidadeTotal =
            produtos.reduce(
                (
                    soma,
                    produto
                ) => {

                    return soma +
                        Number(
                            produto.quantidade ||
                            0
                        );

                },
                0
            );


        const baixos =
            produtos.filter(
                produto => {

                    const quantidade =
                        Number(
                            produto.quantidade ||
                            0
                        );


                    const minimo =
                        Number(
                            produto.estoqueMinimo ??
                            5
                        );


                    return (
                        quantidade > 0 &&
                        quantidade <= minimo
                    );

                }
            ).length;


        const zerados =
            produtos.filter(
                produto =>
                    Number(
                        produto.quantidade ||
                        0
                    ) <= 0
            ).length;


        if (totalProdutos) {

            totalProdutos.textContent =
                total;

        }


        if (totalEstoque) {

            totalEstoque.textContent =
                quantidadeTotal;

        }


        if (estoqueBaixo) {

            estoqueBaixo.textContent =
                baixos;

        }


        if (semEstoque) {

            semEstoque.textContent =
                zerados;

        }

    }


    /* ======================================================
       CONTADOR
    ====================================================== */

    function atualizarContador(
        quantidade
    ) {

        if (!contador) return;


        contador.textContent =
            quantidade === 1
                ? "1 produto"
                : `${quantidade} produtos`;

    }


    /* ======================================================
       PESQUISA
    ====================================================== */

    if (pesquisa) {

        pesquisa.addEventListener(
            "input",
            renderizarEstoque
        );

    }


    /* ======================================================
       FILTRO CATEGORIA
    ====================================================== */

    if (filtroCategoria) {

        filtroCategoria.addEventListener(
            "change",
            renderizarEstoque
        );

    }


    /* ======================================================
       FILTRO STATUS
    ====================================================== */

    if (filtroStatus) {

        filtroStatus.addEventListener(
            "change",
            renderizarEstoque
        );

    }


    /* ======================================================
       SOLICITAR QUANTIDADE
       FALLBACK CASO NÃO EXISTA MODAL
    ====================================================== */

    function solicitarQuantidade(
        produto,
        tipo
    ) {

        const mensagem =
            tipo === "entrada"

                ? `Quantas unidades de "${produto.nome}" deseja adicionar?`

                : `Quantas unidades de "${produto.nome}" deseja retirar?`;


        const resposta =
            prompt(
                mensagem,
                "1"
            );


        if (
            resposta === null
        ) {

            return null;

        }


        const quantidade =
            Number(resposta);


        if (
            !Number.isFinite(quantidade) ||
            quantidade <= 0
        ) {

            mostrarMensagem(
                "Digite uma quantidade válida.",
                "erro"
            );

            return null;

        }


        return quantidade;

    }


    /* ======================================================
       MENSAGEM
    ====================================================== */

    function mostrarMensagem(
        mensagem,
        tipo = "sucesso"
    ) {

        const antiga =
            document.querySelector(
                ".erp-toast"
            );


        if (antiga) {

            antiga.remove();

        }


        const toast =
            document.createElement("div");


        toast.className =
            `erp-toast ${tipo}`;


        const icone =
            tipo === "erro"
                ? "fa-circle-exclamation"
                : "fa-circle-check";


        toast.innerHTML = `

            <i class="fa-solid ${icone}"></i>

            <span>
                ${escaparHTML(mensagem)}
            </span>

        `;


        document.body.appendChild(
            toast
        );


        requestAnimationFrame(() => {

            toast.classList.add(
                "show"
            );

        });


        setTimeout(() => {

            toast.classList.remove(
                "show"
            );


            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }


    /* ======================================================
       UTILITÁRIOS
    ====================================================== */

    function normalizar(texto) {

        return String(
            texto || ""
        )
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase()
            .trim();

    }


    function escaparHTML(texto) {

        return String(
            texto ?? ""
        )
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }


    /* ======================================================
       ESTILO DAS NOTIFICAÇÕES
    ====================================================== */

    const estiloToast =
        document.createElement("style");


    estiloToast.textContent = `

        .erp-toast {

            position: fixed;

            right: 25px;
            bottom: 25px;

            z-index: 99999;

            display: flex;

            align-items: center;

            gap: 12px;

            min-width: 280px;

            max-width: 420px;

            padding: 15px 18px;

            border-radius: 13px;

            background: #ffffff;

            color: #1f2937;

            border: 1px solid #e5e7eb;

            box-shadow:
                0 15px 40px rgba(0,0,0,.14);

            font-family: Poppins, sans-serif;

            font-size: 13px;

            font-weight: 500;

            opacity: 0;

            transform:
                translateY(15px);

            transition:
                opacity .3s ease,
                transform .3s ease;

        }


        .erp-toast.show {

            opacity: 1;

            transform:
                translateY(0);

        }


        .erp-toast i {

            font-size: 18px;

        }


        .erp-toast.sucesso i {

            color: #16a34a;

        }


        .erp-toast.erro i {

            color: #dc2626;

        }


        .erp-toast.erro {

            border-left:
                4px solid #dc2626;

        }


        .erp-toast.sucesso {

            border-left:
                4px solid #16a34a;

        }


        @media(max-width:600px){

            .erp-toast {

                left: 15px;

                right: 15px;

                bottom: 15px;

                min-width: 0;

            }

        }

    `;


    document.head.appendChild(
        estiloToast
    );


    /* ======================================================
       INICIALIZAÇÃO
    ====================================================== */

    renderizarEstoque();

    atualizarResumo();


    /* ======================================================
       ATUALIZAÇÃO AUTOMÁTICA
       Caso produtos sejam alterados em outra aba
    ====================================================== */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                STORAGE_PRODUTOS
            ) {

                atualizarDados();

            }

        }
    );


});