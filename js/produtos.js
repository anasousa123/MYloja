// ==========================================================
// FASHION ERP
// MÓDULO DE PRODUTOS
// Versão profissional
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    // ======================================================
    // ELEMENTOS PRINCIPAIS
    // ======================================================

    const modal = document.getElementById("modalProduto");
    const form = document.getElementById("formProduto");

    const btnNovo = document.getElementById("btnNovoProduto");
    const btnFechar = document.getElementById("fecharModal");
    const btnCancelar = document.getElementById("cancelarProduto");

    const lista = document.getElementById("listaProdutos");
    const produtosVazios = document.getElementById("produtosVazios");

    const pesquisa = document.getElementById("pesquisaProduto");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const filtroStatus = document.getElementById("filtroStatus");

    const totalProdutos = document.getElementById("totalProdutos");
    const totalEstoque = document.getElementById("totalEstoque");
    const produtosBaixos = document.getElementById("produtosBaixos");

    const tituloModal = document.getElementById("tituloModal");

    // ======================================================
    // CAMPOS DO FORMULÁRIO
    // ======================================================

    const produtoId = document.getElementById("produtoId");
    const nomeProduto = document.getElementById("nomeProduto");
    const categoriaProduto = document.getElementById("categoriaProduto");
    const tamanhoProduto = document.getElementById("tamanhoProduto");
    const precoProduto = document.getElementById("precoProduto");
    const quantidadeProduto = document.getElementById("quantidadeProduto");
    const estoqueMinimo = document.getElementById("estoqueMinimo");
    const codigoProduto = document.getElementById("codigoProduto");
    const marcaProduto = document.getElementById("marcaProduto");
    const descricaoProduto = document.getElementById("descricaoProduto");

    // ======================================================
    // VERIFICAÇÃO
    // ======================================================

    if (!lista) {
        console.error("Fashion ERP: #listaProdutos não foi encontrado.");
        return;
    }

    if (!form) {
        console.error("Fashion ERP: #formProduto não foi encontrado.");
        return;
    }

    // ======================================================
    // BANCO LOCAL
    // ======================================================

    const STORAGE_KEY = "fashionERP_produtos";

    let produtos = carregarProdutos();

    // ======================================================
    // CARREGAR PRODUTOS
    // ======================================================

    function carregarProdutos() {

        try {

            const dados = localStorage.getItem(STORAGE_KEY);

            if (!dados) {
                return [];
            }

            const produtosSalvos = JSON.parse(dados);

            return Array.isArray(produtosSalvos)
                ? produtosSalvos
                : [];

        } catch (erro) {

            console.error(
                "Erro ao carregar produtos:",
                erro
            );

            return [];

        }

    }

    // ======================================================
    // SALVAR PRODUTOS
    // ======================================================

    function salvarProdutos() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(produtos)
            );

            return true;

        } catch (erro) {

            console.error(
                "Erro ao salvar produtos:",
                erro
            );

            mostrarMensagem(
                "Não foi possível salvar o produto.",
                "erro"
            );

            return false;

        }

    }

    // ======================================================
    // ABRIR NOVO PRODUTO
    // ======================================================

    if (btnNovo) {

        btnNovo.addEventListener("click", (event) => {

            event.preventDefault();

            abrirModal();

        });

    }

    // ======================================================
    // FECHAR MODAL
    // ======================================================

    if (btnFechar) {

        btnFechar.addEventListener("click", (event) => {

            event.preventDefault();

            fecharModal();

        });

    }

    if (btnCancelar) {

        btnCancelar.addEventListener("click", (event) => {

            event.preventDefault();

            fecharModal();

        });

    }

    // ======================================================
    // FECHAR CLICANDO FORA
    // ======================================================

    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                fecharModal();

            }

        });

    }

    // ======================================================
    // FECHAR COM ESC
    // ======================================================

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (
                modal &&
                modal.classList.contains("show")
            ) {

                fecharModal();

            }

        }

    });

    // ======================================================
    // ABRIR MODAL
    // ======================================================

    function abrirModal(produto = null) {

        if (!modal || !form) {
            return;
        }

        modal.classList.add("show");

        document.body.classList.add("modal-open");

        if (produto) {

            if (tituloModal) {
                tituloModal.textContent = "Editar Produto";
            }

            if (produtoId) {
                produtoId.value = produto.id || "";
            }

            if (nomeProduto) {
                nomeProduto.value = produto.nome || "";
            }

            if (categoriaProduto) {
                categoriaProduto.value =
                    produto.categoria || "";
            }

            if (tamanhoProduto) {
                tamanhoProduto.value =
                    produto.tamanho || "Único";
            }

            if (precoProduto) {
                precoProduto.value =
                    produto.preco ?? "";
            }

            if (quantidadeProduto) {
                quantidadeProduto.value =
                    produto.quantidade ?? 0;
            }

            if (estoqueMinimo) {
                estoqueMinimo.value =
                    produto.estoqueMinimo ?? 5;
            }

            if (codigoProduto) {
                codigoProduto.value =
                    produto.codigo || "";
            }

            if (marcaProduto) {
                marcaProduto.value =
                    produto.marca || "";
            }

            if (descricaoProduto) {
                descricaoProduto.value =
                    produto.descricao || "";
            }

        } else {

            if (tituloModal) {
                tituloModal.textContent = "Novo Produto";
            }

            form.reset();

            if (produtoId) {
                produtoId.value = "";
            }

            if (tamanhoProduto) {
                tamanhoProduto.value = "Único";
            }

            if (quantidadeProduto) {
                quantidadeProduto.value = 0;
            }

            if (estoqueMinimo) {
                estoqueMinimo.value = 5;
            }

        }

        setTimeout(() => {

            if (nomeProduto) {
                nomeProduto.focus();
            }

        }, 100);

    }

    // ======================================================
    // FECHAR MODAL
    // ======================================================

    function fecharModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        document.body.classList.remove("modal-open");

        if (form) {
            form.reset();
        }

        if (produtoId) {
            produtoId.value = "";
        }

        if (tituloModal) {
            tituloModal.textContent = "Novo Produto";
        }

        if (tamanhoProduto) {
            tamanhoProduto.value = "Único";
        }

        if (quantidadeProduto) {
            quantidadeProduto.value = 0;
        }

        if (estoqueMinimo) {
            estoqueMinimo.value = 5;
        }

    }

    // ======================================================
    // SALVAR FORMULÁRIO
    // ======================================================

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        salvarFormulario();

    });

    // ======================================================
    // PROCESSAR SALVAMENTO
    // ======================================================

    function salvarFormulario() {

        const nome =
            nomeProduto
                ? nomeProduto.value.trim()
                : "";

        const categoria =
            categoriaProduto
                ? categoriaProduto.value
                : "";

        const tamanho =
            tamanhoProduto
                ? tamanhoProduto.value
                : "Único";

        const preco =
            precoProduto
                ? Number(precoProduto.value)
                : 0;

        const quantidade =
            quantidadeProduto
                ? Number(quantidadeProduto.value)
                : 0;

        const minimo =
            estoqueMinimo
                ? Number(estoqueMinimo.value)
                : 5;

        const codigo =
            codigoProduto
                ? codigoProduto.value.trim()
                : "";

        const marca =
            marcaProduto
                ? marcaProduto.value.trim()
                : "";

        const descricao =
            descricaoProduto
                ? descricaoProduto.value.trim()
                : "";

        // ==================================================
        // VALIDAÇÕES
        // ==================================================

        if (!nome) {

            mostrarMensagem(
                "Digite o nome do produto.",
                "aviso"
            );

            if (nomeProduto) {
                nomeProduto.focus();
            }

            return;

        }

        if (!categoria) {

            mostrarMensagem(
                "Selecione uma categoria.",
                "aviso"
            );

            if (categoriaProduto) {
                categoriaProduto.focus();
            }

            return;

        }

        if (
            !Number.isFinite(preco) ||
            preco < 0
        ) {

            mostrarMensagem(
                "Digite um preço válido.",
                "aviso"
            );

            if (precoProduto) {
                precoProduto.focus();
            }

            return;

        }

        if (
            !Number.isFinite(quantidade) ||
            quantidade < 0
        ) {

            mostrarMensagem(
                "Digite uma quantidade válida.",
                "aviso"
            );

            if (quantidadeProduto) {
                quantidadeProduto.focus();
            }

            return;

        }

        if (
            !Number.isFinite(minimo) ||
            minimo < 0
        ) {

            mostrarMensagem(
                "Digite um estoque mínimo válido.",
                "aviso"
            );

            if (estoqueMinimo) {
                estoqueMinimo.focus();
            }

            return;

        }

        // ==================================================
        // VERIFICAR CÓDIGO DUPLICADO
        // ==================================================

        if (codigo) {

            const codigoDuplicado =
                produtos.find((produto) => {

                    return (
                        String(produto.codigo || "")
                            .toLowerCase() ===
                        codigo.toLowerCase() &&
                        String(produto.id) !==
                        String(
                            produtoId
                                ? produtoId.value
                                : ""
                        )
                    );

                });

            if (codigoDuplicado) {

                mostrarMensagem(
                    "Já existe um produto com esse código.",
                    "aviso"
                );

                if (codigoProduto) {
                    codigoProduto.focus();
                }

                return;

            }

        }

        // ==================================================
        // EDITAR PRODUTO
        // ==================================================

        const idAtual =
            produtoId
                ? produtoId.value
                : "";

        if (idAtual) {

            const indice =
                produtos.findIndex(
                    produto =>
                        String(produto.id) ===
                        String(idAtual)
                );

            if (indice === -1) {

                mostrarMensagem(
                    "Produto não encontrado.",
                    "erro"
                );

                return;

            }

            produtos[indice] = {

                ...produtos[indice],

                nome,
                categoria,
                tamanho,
                preco,
                quantidade,
                estoqueMinimo: minimo,
                codigo,
                marca,
                descricao,

                atualizadoEm:
                    new Date().toISOString()

            };

            if (salvarProdutos()) {

                renderizarProdutos();

                atualizarResumo();

                fecharModal();

                mostrarMensagem(
                    "Produto atualizado com sucesso!",
                    "sucesso"
                );

            }

            return;

        }

        // ==================================================
        // NOVO PRODUTO
        // ==================================================

        const novoProduto = {

            id:
                Date.now().toString(),

            nome,

            categoria,

            tamanho,

            preco,

            quantidade,

            estoqueMinimo: minimo,

            codigo,

            marca,

            descricao,

            dataCadastro:
                new Date().toISOString(),

            atualizadoEm:
                new Date().toISOString()

        };

        produtos.push(novoProduto);

        if (salvarProdutos()) {

            renderizarProdutos();

            atualizarResumo();

            fecharModal();

            mostrarMensagem(
                "Produto cadastrado com sucesso!",
                "sucesso"
            );

        }

    }

    // ======================================================
    // RENDERIZAR PRODUTOS
    // ======================================================

    function renderizarProdutos() {

        if (!lista) {
            return;
        }

        const termo =
            pesquisa
                ? pesquisa.value
                    .toLowerCase()
                    .trim()
                : "";

        const categoriaSelecionada =
            filtroCategoria
                ? filtroCategoria.value
                : "todos";

        const statusSelecionado =
            filtroStatus
                ? filtroStatus.value
                : "todos";

        const filtrados =
            produtos.filter((produto) => {

                const nome =
                    String(
                        produto.nome || ""
                    ).toLowerCase();

                const codigo =
                    String(
                        produto.codigo || ""
                    ).toLowerCase();

                const marca =
                    String(
                        produto.marca || ""
                    ).toLowerCase();

                const correspondePesquisa =
                    !termo ||
                    nome.includes(termo) ||
                    codigo.includes(termo) ||
                    marca.includes(termo);

                const correspondeCategoria =
                    categoriaSelecionada === "todos" ||
                    normalizar(
                        produto.categoria
                    ) ===
                    normalizar(
                        categoriaSelecionada
                    );

                const quantidade =
                    Number(
                        produto.quantidade || 0
                    );

                const minimo =
                    Number(
                        produto.estoqueMinimo ?? 5
                    );

                let status = "normal";

                if (quantidade <= 0) {

                    status = "zerado";

                } else if (quantidade <= minimo) {

                    status = "baixo";

                }

                const correspondeStatus =
                    statusSelecionado === "todos" ||
                    status === statusSelecionado;

                return (
                    correspondePesquisa &&
                    correspondeCategoria &&
                    correspondeStatus
                );

            });

        lista.innerHTML = "";

        // ==================================================
        // NENHUM PRODUTO
        // ==================================================

        if (filtrados.length === 0) {

            if (produtosVazios) {

                produtosVazios.style.display =
                    "block";

            }

            atualizarContadorTabela(0);

            return;

        }

        if (produtosVazios) {

            produtosVazios.style.display =
                "none";

        }

        // ==================================================
        // PRODUTOS
        // ==================================================

        filtrados.forEach((produto) => {

            const quantidade =
                Number(
                    produto.quantidade || 0
                );

            const minimo =
                Number(
                    produto.estoqueMinimo ?? 5
                );

            let classeEstoque =
                "stock-normal";

            let classeStatus =
                "normal";

            let textoStatus =
                "Ativo";

            if (quantidade <= 0) {

                classeEstoque =
                    "stock-zero";

                classeStatus =
                    "zerado";

                textoStatus =
                    "Sem estoque";

            } else if (quantidade <= minimo) {

                classeEstoque =
                    "stock-low";

                classeStatus =
                    "baixo";

                textoStatus =
                    "Estoque baixo";

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
                        class="stock-number ${classeEstoque}"
                    >
                        ${quantidade}
                    </span>

                </td>

                <td>

                    <span
                        class="status ${classeStatus}"
                    >
                        ${textoStatus}
                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            type="button"
                            class="icon-btn"
                            title="Editar produto"
                            aria-label="Editar produto"
                            data-action="editar"
                            data-id="${produto.id}"
                        >

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            type="button"
                            class="icon-btn delete"
                            title="Excluir produto"
                            aria-label="Excluir produto"
                            data-action="excluir"
                            data-id="${produto.id}"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            `;

            lista.appendChild(linha);

        });

        atualizarContadorTabela(
            filtrados.length
        );

    }

    // ======================================================
    // AÇÕES DA TABELA
    // ======================================================

    lista.addEventListener("click", (event) => {

        const botao =
            event.target.closest(
                "button[data-action]"
            );

        if (!botao) {
            return;
        }

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

        // ==================================================
        // EDITAR
        // ==================================================

        if (acao === "editar") {

            abrirModal(produto);

            return;

        }

        // ==================================================
        // EXCLUIR
        // ==================================================

        if (acao === "excluir") {

            excluirProduto(produto);

        }

    });

    // ======================================================
    // EXCLUIR PRODUTO
    // ======================================================

    function excluirProduto(produto) {

        const confirmar =
            confirm(
                `Deseja realmente excluir o produto "${produto.nome}"?`
            );

        if (!confirmar) {
            return;
        }

        produtos =
            produtos.filter(
                item =>
                    String(item.id) !==
                    String(produto.id)
            );

        if (salvarProdutos()) {

            renderizarProdutos();

            atualizarResumo();

            mostrarMensagem(
                "Produto excluído com sucesso!",
                "sucesso"
            );

        }

    }

    // ======================================================
    // PESQUISA
    // ======================================================

    if (pesquisa) {

        pesquisa.addEventListener(
            "input",
            () => {

                renderizarProdutos();

            }
        );

    }

    // ======================================================
    // FILTRO CATEGORIA
    // ======================================================

    if (filtroCategoria) {

        filtroCategoria.addEventListener(
            "change",
            () => {

                renderizarProdutos();

            }
        );

    }

    // ======================================================
    // FILTRO STATUS
    // ======================================================

    if (filtroStatus) {

        filtroStatus.addEventListener(
            "change",
            () => {

                renderizarProdutos();

            }
        );

    }

    // ======================================================
    // ATUALIZAR RESUMO
    // ======================================================

    function atualizarResumo() {

        if (totalProdutos) {

            totalProdutos.textContent =
                produtos.length;

        }

        const quantidadeTotal =
            produtos.reduce(
                (total, produto) => {

                    return (
                        total +
                        Number(
                            produto.quantidade || 0
                        )
                    );

                },
                0
            );

        if (totalEstoque) {

            totalEstoque.textContent =
                quantidadeTotal;

        }

        const baixos =
            produtos.filter(
                produto => {

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

                }
            ).length;

        if (produtosBaixos) {

            produtosBaixos.textContent =
                baixos;

        }

        atualizarContadorTabela(
            produtos.length
        );

    }

    // ======================================================
    // CONTADOR DA TABELA
    // ======================================================

    function atualizarContadorTabela(total) {

        const contador =
            document.querySelector(
                ".products-count"
            );

        if (contador) {

            contador.textContent =
                `${total} produto${total === 1 ? "" : "s"}`;

        }

    }

    // ======================================================
    // FORMATAR MOEDA
    // ======================================================

    function formatarMoeda(valor) {

        return Number(valor || 0)
            .toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

    }

    // ======================================================
    // NORMALIZAR TEXTO
    // ======================================================

    function normalizar(texto) {

        return String(texto || "")
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .toLowerCase()
            .trim();

    }

    // ======================================================
    // PROTEÇÃO CONTRA HTML
    // ======================================================

    function escaparHTML(texto) {

        return String(texto ?? "")
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

    // ======================================================
    // MENSAGENS
    // ======================================================

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
            `erp-toast erp-toast-${tipo}`;

        let icone =
            "fa-circle-check";

        if (tipo === "erro") {
            icone = "fa-circle-xmark";
        }

        if (tipo === "aviso") {
            icone = "fa-triangle-exclamation";
        }

        toast.innerHTML = `

            <i class="fa-solid ${icone}"></i>

            <span>
                ${escaparHTML(mensagem)}
            </span>

        `;

        document.body.appendChild(toast);

        requestAnimationFrame(() => {

            toast.classList.add("show");

        });

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

    // ======================================================
    // INICIALIZAÇÃO
    // ======================================================

    renderizarProdutos();

    atualizarResumo();

    console.log(
        "Fashion ERP: módulo de produtos carregado."
    );

});