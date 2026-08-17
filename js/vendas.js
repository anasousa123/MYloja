// ==========================================================
// FASHION ERP
// MÓDULO DE VENDAS
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // ======================================================
    // CONFIGURAÇÃO
    // ======================================================

    const STORAGE_KEY = "fashionERP_vendas";

    let vendas = carregarVendas();

    // ======================================================
    // ELEMENTOS
    // ======================================================

    const btnNovaVenda =
        document.getElementById("btnNovaVenda");

    const modal =
        document.getElementById("modalVenda");

    const btnFechar =
        document.getElementById("fecharModalVenda");

    const btnCancelar =
        document.getElementById("cancelarVenda");

    const form =
        document.getElementById("formVenda");

    const lista =
        document.getElementById("listaVendas");

    const busca =
        document.getElementById("buscarVenda");

    const filtroStatus =
        document.getElementById("filtroStatusVenda");

    const filtroPagamento =
        document.getElementById("filtroPagamento");

    // ======================================================
    // CAMPOS DO FORMULÁRIO
    // ======================================================

    const vendaId =
        document.getElementById("vendaId");

    const cliente =
        document.getElementById("clienteVenda");

    const produto =
        document.getElementById("produtoVenda");

    const quantidade =
        document.getElementById("quantidadeVenda");

    const valor =
        document.getElementById("valorVenda");

    const pagamento =
        document.getElementById("pagamentoVenda");

    const status =
        document.getElementById("statusVenda");

    const observacoes =
        document.getElementById("observacoesVenda");

    // ======================================================
    // CARREGAR VENDAS
    // ======================================================

    function carregarVendas() {

        try {

            const dados =
                localStorage.getItem(STORAGE_KEY);

            if (!dados) {
                return [];
            }

            const vendasSalvas =
                JSON.parse(dados);

            return Array.isArray(vendasSalvas)
                ? vendasSalvas
                : [];

        } catch (erro) {

            console.error(
                "Erro ao carregar vendas:",
                erro
            );

            return [];

        }

    }

    // ======================================================
    // SALVAR VENDAS
    // ======================================================

    function salvarVendas() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(vendas)
            );

            return true;

        } catch (erro) {

            console.error(
                "Erro ao salvar vendas:",
                erro
            );

            alert(
                "Não foi possível salvar a venda."
            );

            return false;

        }

    }

    // ======================================================
    // ABRIR MODAL
    // ======================================================

    function abrirModal(venda = null) {

        if (!modal || !form) {
            console.error(
                "Modal de vendas não encontrado."
            );
            return;
        }

        modal.classList.add("show");

        document.body.classList.add(
            "modal-open"
        );

        if (venda) {

            preencherFormulario(venda);

        } else {

            limparFormulario();

        }

        setTimeout(() => {

            if (cliente) {
                cliente.focus();
            }

        }, 100);

    }

    // ======================================================
    // PREENCHER FORMULÁRIO
    // ======================================================

    function preencherFormulario(venda) {

        form.reset();

        if (vendaId) {
            vendaId.value =
                venda.id || "";
        }

        if (cliente) {
            cliente.value =
                venda.cliente || "";
        }

        if (produto) {
            produto.value =
                venda.produto || "";
        }

        if (quantidade) {
            quantidade.value =
                venda.quantidade || 1;
        }

        if (valor) {
            valor.value =
                venda.valor || 0;
        }

        if (pagamento) {
            pagamento.value =
                venda.pagamento || "";
        }

        if (status) {
            status.value =
                venda.status || "Concluída";
        }

        if (observacoes) {
            observacoes.value =
                venda.observacoes || "";
        }

    }

    // ======================================================
    // LIMPAR FORMULÁRIO
    // ======================================================

    function limparFormulario() {

        form.reset();

        if (vendaId) {
            vendaId.value = "";
        }

        if (quantidade) {
            quantidade.value = 1;
        }

        if (status) {
            status.value = "Concluída";
        }

    }

    // ======================================================
    // FECHAR MODAL
    // ======================================================

    function fecharModal() {

        if (!modal) return;

        modal.classList.remove("show");

        document.body.classList.remove(
            "modal-open"
        );

        limparFormulario();

    }

    // ======================================================
    // BOTÃO NOVA VENDA
    // ======================================================

    if (btnNovaVenda) {

        btnNovaVenda.addEventListener(
            "click",
            () => {
                abrirModal();
            }
        );

    }

    // ======================================================
    // FECHAR
    // ======================================================

    if (btnFechar) {

        btnFechar.addEventListener(
            "click",
            fecharModal
        );

    }

    if (btnCancelar) {

        btnCancelar.addEventListener(
            "click",
            fecharModal
        );

    }

    // ======================================================
    // CLICAR FORA DO MODAL
    // ======================================================

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

    // ======================================================
    // ESC FECHA MODAL
    // ======================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal?.classList.contains("show")
            ) {

                fecharModal();

            }

        }
    );

    // ======================================================
    // SALVAR VENDA
    // ======================================================

    if (form) {

        form.addEventListener(
            "submit",
            salvarVenda
        );

    }

    function salvarVenda(event) {

        event.preventDefault();

        // --------------------------------------------------
        // DADOS
        // --------------------------------------------------

        const nomeCliente =
            cliente?.value.trim() || "";

        const nomeProduto =
            produto?.value.trim() || "";

        const qtd =
            Number(
                quantidade?.value || 0
            );

        const preco =
            Number(
                valor?.value || 0
            );

        const formaPagamento =
            pagamento?.value || "";

        const statusVenda =
            status?.value || "Concluída";

        const observacao =
            observacoes?.value.trim() || "";

        // --------------------------------------------------
        // VALIDAÇÕES
        // --------------------------------------------------

        if (!nomeCliente) {

            alert(
                "Informe o cliente."
            );

            cliente?.focus();

            return;

        }

        if (!nomeProduto) {

            alert(
                "Informe o produto."
            );

            produto?.focus();

            return;

        }

        if (
            !Number.isFinite(qtd) ||
            qtd <= 0
        ) {

            alert(
                "Informe uma quantidade válida."
            );

            quantidade?.focus();

            return;

        }

        if (
            !Number.isFinite(preco) ||
            preco < 0
        ) {

            alert(
                "Informe um valor válido."
            );

            valor?.focus();

            return;

        }

        if (!formaPagamento) {

            alert(
                "Selecione a forma de pagamento."
            );

            pagamento?.focus();

            return;

        }

        // --------------------------------------------------
        // OBJETO
        // --------------------------------------------------

        const dadosVenda = {

            cliente: nomeCliente,

            produto: nomeProduto,

            quantidade: qtd,

            valor: preco,

            pagamento: formaPagamento,

            status: statusVenda,

            observacoes: observacao

        };

        // --------------------------------------------------
        // EDIÇÃO
        // --------------------------------------------------

        if (
            vendaId &&
            vendaId.value
        ) {

            const indice =
                vendas.findIndex(
                    venda =>
                        venda.id ===
                        vendaId.value
                );

            if (indice === -1) {

                alert(
                    "Venda não encontrada."
                );

                return;

            }

            vendas[indice] = {

                ...vendas[indice],

                ...dadosVenda,

                atualizadoEm:
                    new Date().toISOString()

            };

        }

        // --------------------------------------------------
        // NOVA VENDA
        // --------------------------------------------------

        else {

            const novaVenda = {

                id:
                    gerarIdVenda(),

                ...dadosVenda,

                data:
                    new Date().toISOString()

            };

            vendas.unshift(
                novaVenda
            );

        }

        // --------------------------------------------------
        // SALVAR
        // --------------------------------------------------

        if (!salvarVendas()) {
            return;
        }

        // --------------------------------------------------
        // ATUALIZAR
        // --------------------------------------------------

        renderizarVendas();

        atualizarResumo();

        fecharModal();

        alert(
            "Venda salva com sucesso!"
        );

    }

    // ======================================================
    // GERAR ID
    // ======================================================

    function gerarIdVenda() {

        const numero =
            String(
                vendas.length + 1
            ).padStart(
                4,
                "0"
            );

        return `V-${numero}`;

    }

    // ======================================================
    // RENDERIZAR TABELA
    // ======================================================

    function renderizarVendas() {

        if (!lista) {
            return;
        }

        const termo =
            busca?.value
                .trim()
                .toLowerCase() || "";

        const statusSelecionado =
            filtroStatus?.value || "";

        const pagamentoSelecionado =
            filtroPagamento?.value || "";

        const vendasFiltradas =
            vendas.filter(
                venda => {

                    const textoBusca = (

                        String(
                            venda.id || ""
                        ) +

                        " " +

                        String(
                            venda.cliente || ""
                        ) +

                        " " +

                        String(
                            venda.produto || ""
                        )

                    ).toLowerCase();

                    const correspondeBusca =
                        textoBusca.includes(
                            termo
                        );

                    const correspondeStatus =
                        !statusSelecionado ||
                        normalizar(
                            venda.status
                        ) ===
                        normalizar(
                            statusSelecionado
                        );

                    const correspondePagamento =
                        !pagamentoSelecionado ||
                        normalizar(
                            venda.pagamento
                        ) ===
                        normalizar(
                            pagamentoSelecionado
                        );

                    return (
                        correspondeBusca &&
                        correspondeStatus &&
                        correspondePagamento
                    );

                }
            );

        lista.innerHTML = "";

        // --------------------------------------------------
        // SEM RESULTADOS
        // --------------------------------------------------

        if (
            vendasFiltradas.length === 0
        ) {

            lista.innerHTML = `

                <tr>

                    <td
                        colspan="7"
                        style="
                            text-align:center;
                            padding:55px 20px;
                            color:var(--text-muted);
                        "
                    >

                        <i
                            class="fa-solid fa-receipt"
                            style="
                                font-size:34px;
                                margin-bottom:14px;
                            "
                        ></i>

                        <div
                            style="
                                font-weight:600;
                                margin-bottom:5px;
                            "
                        >
                            Nenhuma venda encontrada
                        </div>

                        <small>
                            Tente alterar os filtros
                            ou cadastre uma nova venda.
                        </small>

                    </td>

                </tr>

            `;

            atualizarContador(0);

            return;

        }

        // --------------------------------------------------
        // PRODUTOS
        // --------------------------------------------------

        vendasFiltradas.forEach(
            venda => {

                const linha =
                    document.createElement(
                        "tr"
                    );

                linha.innerHTML = `

                    <td>

                        <strong>
                            ${escapar(
                                venda.id
                            )}
                        </strong>

                    </td>

                    <td>

                        <div
                            class="sale-client"
                        >

                            <div
                                class="sale-client-avatar"
                            >
                                ${primeiraLetra(
                                    venda.cliente
                                )}
                            </div>

                            <div
                                class="sale-client-info"
                            >

                                <strong>
                                    ${escapar(
                                        venda.cliente
                                    )}
                                </strong>

                                <span>
                                    Cliente
                                </span>

                            </div>

                        </div>

                    </td>

                    <td>
                        ${escapar(
                            venda.produto
                        )}
                    </td>

                    <td>
                        ${venda.quantidade}
                    </td>

                    <td>

                        <strong>
                            ${formatarMoeda(
                                venda.valor
                            )}
                        </strong>

                    </td>

                    <td>

                        <span
                            class="
                                sale-status
                                ${classeStatus(
                                    venda.status
                                )}
                            "
                        >

                            ${escapar(
                                venda.status
                            )}

                        </span>

                    </td>

                    <td>

                        <div
                            class="sales-actions"
                        >

                            <button
                                type="button"
                                class="sales-action"
                                data-action="editar"
                                data-id="${escapar(
                                    venda.id
                                )}"
                                title="Editar venda"
                            >

                                <i
                                    class="fa-solid fa-pen"
                                ></i>

                            </button>

                            <button
                                type="button"
                                class="
                                    sales-action
                                    delete
                                "
                                data-action="excluir"
                                data-id="${escapar(
                                    venda.id
                                )}"
                                title="Excluir venda"
                            >

                                <i
                                    class="fa-solid fa-trash"
                                ></i>

                            </button>

                        </div>

                    </td>

                `;

                lista.appendChild(
                    linha
                );

            }
        );

        atualizarContador(
            vendasFiltradas.length
        );

    }

    // ======================================================
    // AÇÕES DA TABELA
    // ======================================================

    if (lista) {

        lista.addEventListener(
            "click",
            event => {

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

                const venda =
                    vendas.find(
                        item =>
                            item.id === id
                    );

                if (!venda) {
                    return;
                }

                // ------------------------------------------
                // EDITAR
                // ------------------------------------------

                if (
                    acao === "editar"
                ) {

                    abrirModal(
                        venda
                    );

                }

                // ------------------------------------------
                // EXCLUIR
                // ------------------------------------------

                if (
                    acao === "excluir"
                ) {

                    excluirVenda(
                        venda
                    );

                }

            }
        );

    }

    // ======================================================
    // EXCLUIR VENDA
    // ======================================================

    function excluirVenda(venda) {

        const confirmar =
            confirm(
                `Deseja excluir a venda "${venda.id}"?`
            );

        if (!confirmar) {
            return;
        }

        vendas =
            vendas.filter(
                item =>
                    item.id !==
                    venda.id
            );

        salvarVendas();

        renderizarVendas();

        atualizarResumo();

    }

    // ======================================================
    // PESQUISA
    // ======================================================

    if (busca) {

        busca.addEventListener(
            "input",
            renderizarVendas
        );

    }

    // ======================================================
    // FILTRO STATUS
    // ======================================================

    if (filtroStatus) {

        filtroStatus.addEventListener(
            "change",
            renderizarVendas
        );

    }

    // ======================================================
    // FILTRO PAGAMENTO
    // ======================================================

    if (filtroPagamento) {

        filtroPagamento.addEventListener(
            "change",
            renderizarVendas
        );

    }

    // ======================================================
    // RESUMO
    // ======================================================

    function atualizarResumo() {

        const total =
            document.getElementById(
                "totalVendas"
            );

        const faturamento =
            document.getElementById(
                "faturamentoVendas"
            );

        const pendentes =
            document.getElementById(
                "vendasPendentes"
            );

        const canceladas =
            document.getElementById(
                "vendasCanceladas"
            );

        // --------------------------------------------------
        // TOTAL
        // --------------------------------------------------

        if (total) {

            total.textContent =
                vendas.length;

        }

        // --------------------------------------------------
        // FATURAMENTO
        // --------------------------------------------------

        if (faturamento) {

            const totalFaturamento =
                vendas.reduce(
                    (
                        soma,
                        venda
                    ) => {

                        if (
                            normalizar(
                                venda.status
                            ) ===
                            "cancelada"
                        ) {

                            return soma;

                        }

                        return (
                            soma +
                            Number(
                                venda.valor || 0
                            )
                        );

                    },
                    0
                );

            faturamento.textContent =
                formatarMoeda(
                    totalFaturamento
                );

        }

        // --------------------------------------------------
        // PENDENTES
        // --------------------------------------------------

        if (pendentes) {

            pendentes.textContent =
                vendas.filter(
                    venda =>
                        normalizar(
                            venda.status
                        ) ===
                        "pendente"
                ).length;

        }

        // --------------------------------------------------
        // CANCELADAS
        // --------------------------------------------------

        if (canceladas) {

            canceladas.textContent =
                vendas.filter(
                    venda =>
                        normalizar(
                            venda.status
                        ) ===
                        "cancelada"
                ).length;

        }

    }

    // ======================================================
    // CONTADOR
    // ======================================================

    function atualizarContador(total) {

        const contador =
            document.getElementById(
                "contadorVendas"
            );

        if (!contador) {
            return;
        }

        contador.textContent =
            `${total} ${
                total === 1
                    ? "venda"
                    : "vendas"
            }`;

    }

    // ======================================================
    // STATUS
    // ======================================================

    function classeStatus(statusVenda) {

        const statusNormalizado =
            normalizar(
                statusVenda
            );

        if (
            statusNormalizado ===
            "pendente"
        ) {

            return "pending";

        }

        if (
            statusNormalizado ===
            "cancelada"
        ) {

            return "cancelled";

        }

        return "completed";

    }

    // ======================================================
    // NORMALIZAR
    // ======================================================

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

    // ======================================================
    // MOEDA
    // ======================================================

    function formatarMoeda(valor) {

        return Number(
            valor || 0
        ).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }

    // ======================================================
    // PRIMEIRA LETRA
    // ======================================================

    function primeiraLetra(nome) {

        const texto =
            String(
                nome || "?"
            ).trim();

        return (
            texto.charAt(0)
                .toUpperCase() ||
            "?"
        );

    }

    // ======================================================
    // PROTEÇÃO HTML
    // ======================================================

    function escapar(texto) {

        return String(
            texto || ""
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

    // ======================================================
    // INICIALIZAÇÃO
    // ======================================================

    renderizarVendas();

    atualizarResumo();

});