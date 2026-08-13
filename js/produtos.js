// =====================================================
// FASHION ERP — PRODUTOS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modalProduto");
    const btnNovoProduto = document.getElementById("btnNovoProduto");
    const fecharModal = document.getElementById("fecharModal");
    const cancelarProduto = document.getElementById("cancelarProduto");

    const form = document.getElementById("formProduto");

    const listaProdutos = document.getElementById("listaProdutos");

    const buscarProduto = document.getElementById("buscarProduto");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const filtroStatus = document.getElementById("filtroStatus");

    let produtos = JSON.parse(
        localStorage.getItem("fashionERP_produtos")
    ) || [

        {
            id: 1,
            nome: "Vestido Midi Elegance",
            sku: "VST-001",
            categoria: "Vestidos",
            preco: 249.90,
            estoque: 32,
            estoqueMinimo: 5,
            descricao: ""
        },

        {
            id: 2,
            nome: "Blusa Basic Premium",
            sku: "BLU-002",
            categoria: "Blusas",
            preco: 119.90,
            estoque: 8,
            estoqueMinimo: 10,
            descricao: ""
        },

        {
            id: 3,
            nome: "Calça Wide Leg",
            sku: "CAL-003",
            categoria: "Calças",
            preco: 189.90,
            estoque: 0,
            estoqueMinimo: 5,
            descricao: ""
        }

    ];

    let produtoEditando = null;


    // =================================================
    // SALVAR PRODUTOS
    // =================================================

    function salvarProdutos() {

        localStorage.setItem(
            "fashionERP_produtos",
            JSON.stringify(produtos)
        );

    }


    // =================================================
    // ABRIR MODAL
    // =================================================

    function abrirModal() {

        if (!modal) return;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    // =================================================
    // FECHAR MODAL
    // =================================================

    function fecharModalProduto() {

        if (!modal) return;

        modal.classList.remove("active");

        document.body.style.overflow = "";

        form.reset();

        produtoEditando = null;

        const titulo = modal.querySelector(".modal-header h2");

        const descricao = modal.querySelector(".modal-header p");

        const botao = form.querySelector(".btn-primary");

        if (titulo) {
            titulo.textContent = "Novo Produto";
        }

        if (descricao) {
            descricao.textContent =
                "Cadastre um novo produto";
        }

        if (botao) {

            botao.innerHTML =
                '<i class="fa-solid fa-check"></i> Cadastrar Produto';

        }

    }


    // =================================================
    // BOTÃO NOVO PRODUTO
    // =================================================

    if (btnNovoProduto) {

        btnNovoProduto.addEventListener(
            "click",
            () => {

                produtoEditando = null;

                form.reset();

                const titulo =
                    modal.querySelector(".modal-header h2");

                const descricao =
                    modal.querySelector(".modal-header p");

                const botao =
                    form.querySelector(".btn-primary");

                if (titulo) {
                    titulo.textContent =
                        "Novo Produto";
                }

                if (descricao) {
                    descricao.textContent =
                        "Cadastre um novo produto";
                }

                if (botao) {
                    botao.innerHTML =
                        '<i class="fa-solid fa-check"></i> Cadastrar Produto';
                }

                abrirModal();

            }
        );

    }


    // =================================================
    // FECHAR MODAL
    // =================================================

    if (fecharModal) {

        fecharModal.addEventListener(
            "click",
            fecharModalProduto
        );

    }

    if (cancelarProduto) {

        cancelarProduto.addEventListener(
            "click",
            fecharModalProduto
        );

    }


    // Fechar clicando fora

    if (modal) {

        modal.addEventListener("click", (event) => {

            if (event.target === modal) {

                fecharModalProduto();

            }

        });

    }


    // =================================================
    // CADASTRAR / EDITAR
    // =================================================

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();


            const nome =
                document.getElementById("nomeProduto")
                    .value
                    .trim();

            const sku =
                document.getElementById("skuProduto")
                    .value
                    .trim();

            const categoria =
                document.getElementById("categoriaProduto")
                    .value;

            const preco =
                Number(
                    document.getElementById("precoProduto")
                        .value
                );

            const estoque =
                Number(
                    document.getElementById("estoqueProduto")
                        .value
                );

            const estoqueMinimo =
                Number(
                    document.getElementById("estoqueMinimo")
                        .value
                ) || 0;

            const descricao =
                document.getElementById("descricaoProduto")
                    .value
                    .trim();


            // Validação

            if (
                !nome ||
                !sku ||
                !categoria ||
                !preco ||
                preco < 0 ||
                estoque < 0
            ) {

                alert(
                    "Preencha corretamente os campos obrigatórios."
                );

                return;

            }


            // =============================================
            // EDITAR
            // =============================================

            if (produtoEditando) {

                const produto =
                    produtos.find(
                        item =>
                            item.id === produtoEditando
                    );

                if (produto) {

                    produto.nome = nome;
                    produto.sku = sku;
                    produto.categoria = categoria;
                    produto.preco = preco;
                    produto.estoque = estoque;
                    produto.estoqueMinimo = estoqueMinimo;
                    produto.descricao = descricao;

                }

                alert(
                    "Produto atualizado com sucesso!"
                );

            }


            // =============================================
            // NOVO PRODUTO
            // =============================================

            else {

                const novoProduto = {

                    id: Date.now(),

                    nome: nome,

                    sku: sku,

                    categoria: categoria,

                    preco: preco,

                    estoque: estoque,

                    estoqueMinimo: estoqueMinimo,

                    descricao: descricao

                };


                produtos.push(novoProduto);


                alert(
                    "Produto cadastrado com sucesso!"
                );

            }


            salvarProdutos();

            renderizarProdutos();

            fecharModalProduto();

        });

    }


    // =================================================
    // RENDERIZAR PRODUTOS
    // =================================================

    function renderizarProdutos() {

        if (!listaProdutos) return;


        const busca =
            buscarProduto
                ? buscarProduto.value
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


                // Busca

                const correspondeBusca =
                    produto.nome
                        .toLowerCase()
                        .includes(busca)

                    ||

                    produto.sku
                        .toLowerCase()
                        .includes(busca);


                if (!correspondeBusca) {
                    return false;
                }


                // Categoria

                if (categoria) {

                    if (
                        produto.categoria
                            .toLowerCase() !==
                        categoria.toLowerCase()
                    ) {

                        return false;

                    }

                }


                // Status

                if (status === "ativo") {

                    if (
                        produto.estoque <=
                        produto.estoqueMinimo
                    ) {

                        return false;

                    }

                }


                if (status === "baixo") {

                    if (
                        produto.estoque <= 0 ||
                        produto.estoque >
                        produto.estoqueMinimo
                    ) {

                        return false;

                    }

                }


                if (status === "sem") {

                    if (produto.estoque !== 0) {

                        return false;

                    }

                }


                return true;

            });


        listaProdutos.innerHTML = "";


        if (filtrados.length === 0) {

            listaProdutos.innerHTML = `

                <tr>

                    <td colspan="6">

                        <div class="empty-products">

                            <i class="fa-solid fa-box-open"></i>

                            <strong>
                                Nenhum produto encontrado
                            </strong>

                            <span>
                                Tente alterar sua busca ou filtros.
                            </span>

                        </div>

                    </td>

                </tr>

            `;

        }


        filtrados.forEach(produto => {

            const tr =
                document.createElement("tr");


            let statusClass = "active";
            let statusTexto = "Ativo";


            if (produto.estoque === 0) {

                statusClass = "empty";
                statusTexto = "Sem estoque";

            }

            else if (
                produto.estoque <=
                produto.estoqueMinimo
            ) {

                statusClass = "low";
                statusTexto = "Estoque baixo";

            }


            tr.innerHTML = `

                <td>

                    <div class="product-info">

                        <div class="product-image">

                            <i class="fa-solid fa-shirt"></i>

                        </div>

                        <div>

                            <strong>
                                ${escaparHTML(produto.nome)}
                            </strong>

                            <span>
                                SKU: ${escaparHTML(produto.sku)}
                            </span>

                        </div>

                    </div>

                </td>


                <td>
                    ${escaparHTML(produto.categoria)}
                </td>


                <td>

                    <strong>
                        ${formatarMoeda(produto.preco)}
                    </strong>

                </td>


                <td>
                    ${produto.estoque} unidades
                </td>


                <td>

                    <span class="status ${statusClass}">
                        ${statusTexto}
                    </span>

                </td>


                <td>

                    <div class="table-actions">

                        <button
                            class="action-btn edit"
                            data-editar="${produto.id}"
                            title="Editar">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            class="action-btn delete"
                            data-excluir="${produto.id}"
                            title="Excluir">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            `;


            listaProdutos.appendChild(tr);

        });


        atualizarResumo();

        atualizarContador(filtrados.length);

    }


    // =================================================
    // FORMATAR MOEDA
    // =================================================

    function formatarMoeda(valor) {

        return valor.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    // =================================================
    // ESCAPAR HTML
    // =================================================

    function escaparHTML(texto) {

        const div =
            document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;

    }


    // =================================================
    // EDITAR
    // =================================================

    listaProdutos.addEventListener(
        "click",
        (event) => {


            const botaoEditar =
                event.target.closest(
                    "[data-editar]"
                );


            if (botaoEditar) {

                const id =
                    Number(
                        botaoEditar.dataset.editar
                    );


                const produto =
                    produtos.find(
                        item => item.id === id
                    );


                if (!produto) return;


                produtoEditando = id;


                document.getElementById(
                    "nomeProduto"
                ).value = produto.nome;


                document.getElementById(
                    "skuProduto"
                ).value = produto.sku;


                document.getElementById(
                    "categoriaProduto"
                ).value = produto.categoria;


                document.getElementById(
                    "precoProduto"
                ).value = produto.preco;


                document.getElementById(
                    "estoqueProduto"
                ).value = produto.estoque;


                document.getElementById(
                    "estoqueMinimo"
                ).value = produto.estoqueMinimo;


                document.getElementById(
                    "descricaoProduto"
                ).value = produto.descricao || "";


                const titulo =
                    modal.querySelector(
                        ".modal-header h2"
                    );


                const descricao =
                    modal.querySelector(
                        ".modal-header p"
                    );


                const botao =
                    form.querySelector(
                        ".btn-primary"
                    );


                if (titulo) {

                    titulo.textContent =
                        "Editar Produto";

                }


                if (descricao) {

                    descricao.textContent =
                        "Atualize as informações do produto";

                }


                if (botao) {

                    botao.innerHTML =
                        '<i class="fa-solid fa-check"></i> Salvar Alterações';

                }


                abrirModal();

            }


            // =============================================
            // EXCLUIR
            // =============================================

            const botaoExcluir =
                event.target.closest(
                    "[data-excluir]"
                );


            if (botaoExcluir) {

                const id =
                    Number(
                        botaoExcluir.dataset.excluir
                    );


                const produto =
                    produtos.find(
                        item => item.id === id
                    );


                if (!produto) return;


                const confirmar =
                    confirm(
                        `Deseja realmente excluir o produto "${produto.nome}"?`
                    );


                if (!confirmar) return;


                produtos =
                    produtos.filter(
                        item => item.id !== id
                    );


                salvarProdutos();

                renderizarProdutos();


                alert(
                    "Produto excluído com sucesso!"
                );

            }

        }
    );


    // =================================================
    // BUSCA
    // =================================================

    if (buscarProduto) {

        buscarProduto.addEventListener(
            "input",
            renderizarProdutos
        );

    }


    // =================================================
    // FILTROS
    // =================================================

    if (filtroCategoria) {

        filtroCategoria.addEventListener(
            "change",
            renderizarProdutos
        );

    }


    if (filtroStatus) {

        filtroStatus.addEventListener(
            "change",
            renderizarProdutos
        );

    }


    // =================================================
    // ATUALIZAR RESUMO
    // =================================================

    function atualizarResumo() {

        const total =
            produtos.length;


        const ativos =
            produtos.filter(
                produto =>
                    produto.estoque >
                    produto.estoqueMinimo
            ).length;


        const baixo =
            produtos.filter(
                produto =>
                    produto.estoque > 0 &&
                    produto.estoque <=
                    produto.estoqueMinimo
            ).length;


        const semEstoque =
            produtos.filter(
                produto =>
                    produto.estoque === 0
            ).length;


        const totalElemento =
            document.getElementById(
                "totalProdutos"
            );


        const ativosElemento =
            document.getElementById(
                "produtosAtivos"
            );


        const baixoElemento =
            document.getElementById(
                "estoqueBaixo"
            );


        const semElemento =
            document.getElementById(
                "semEstoque"
            );


        if (totalElemento) {
            totalElemento.textContent =
                total;
        }


        if (ativosElemento) {
            ativosElemento.textContent =
                ativos;
        }


        if (baixoElemento) {
            baixoElemento.textContent =
                baixo;
        }


        if (semElemento) {
            semElemento.textContent =
                semEstoque;
        }

    }


    // =================================================
    // CONTADOR
    // =================================================

    function atualizarContador(quantidade) {

        const contador =
            document.getElementById(
                "contadorProdutos"
            );


        if (!contador) return;


        contador.textContent =
            quantidade === 1
                ? "1 produto"
                : `${quantidade} produtos`;

    }


    // =================================================
    // INICIALIZAÇÃO
    // =================================================

    renderizarProdutos();

});