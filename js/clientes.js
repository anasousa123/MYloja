// ==========================================================
// FASHION ERP
// MÓDULO DE CLIENTES
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    // ======================================================
    // ELEMENTOS
    // ======================================================

    const btnNovoCliente =
        document.getElementById("btnNovoCliente");

    const btnNovoClienteVazio =
        document.getElementById("btnNovoClienteVazio");

    const modal =
        document.getElementById("modalCliente");

    const form =
        document.getElementById("formCliente");

    const btnFecharModal =
        document.getElementById("fecharModalCliente");

    const btnCancelar =
        document.getElementById("cancelarCliente");

    const tituloModal =
        document.getElementById("tituloModalCliente");

    const listaClientes =
        document.getElementById("listaClientes");

    const clientesVazios =
        document.getElementById("clientesVazios");

    const pesquisa =
        document.getElementById("pesquisaCliente");

    const filtroStatus =
        document.getElementById("filtroStatusCliente");

    const ordenar =
        document.getElementById("ordenarClientes");


    // ======================================================
    // CONTADORES
    // ======================================================

    const totalClientes =
        document.getElementById("totalClientes");

    const clientesAtivos =
        document.getElementById("clientesAtivos");

    const novosClientes =
        document.getElementById("novosClientes");

    const clientesInativos =
        document.getElementById("clientesInativos");

    const contadorClientes =
        document.getElementById("contadorClientes");

    const paginacaoInfo =
        document.getElementById("paginacaoInfo");


    // ======================================================
    // CAMPOS
    // ======================================================

    const clienteId =
        document.getElementById("clienteId");

    const nomeCliente =
        document.getElementById("nomeCliente");

    const cpfCliente =
        document.getElementById("cpfCliente");

    const telefoneCliente =
        document.getElementById("telefoneCliente");

    const emailCliente =
        document.getElementById("emailCliente");

    const nascimentoCliente =
        document.getElementById("nascimentoCliente");

    const statusCliente =
        document.getElementById("statusCliente");

    const enderecoCliente =
        document.getElementById("enderecoCliente");

    const cidadeCliente =
        document.getElementById("cidadeCliente");

    const observacoesCliente =
        document.getElementById("observacoesCliente");


    // ======================================================
    // CONFIGURAÇÕES
    // ======================================================

    const STORAGE_KEY =
        "fashionERP_clientes";

    const ITENS_POR_PAGINA = 10;

    let paginaAtual = 1;


    // ======================================================
    // CARREGAR CLIENTES
    // ======================================================

    let clientes = carregarClientes();


    function carregarClientes() {

        try {

            const dados =
                localStorage.getItem(STORAGE_KEY);

            if (!dados) {
                return [];
            }

            const clientesSalvos =
                JSON.parse(dados);

            return Array.isArray(clientesSalvos)
                ? clientesSalvos
                : [];

        } catch (erro) {

            console.error(
                "Erro ao carregar clientes:",
                erro
            );

            return [];

        }

    }


    // ======================================================
    // SALVAR CLIENTES
    // ======================================================

    function salvarClientes() {

        try {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(clientes)
            );

            return true;

        } catch (erro) {

            console.error(
                "Erro ao salvar clientes:",
                erro
            );

            alert(
                "Não foi possível salvar os clientes."
            );

            return false;

        }

    }


    // ======================================================
    // ABRIR MODAL
    // ======================================================

    function abrirModal(cliente = null) {

        if (!modal || !form) {
            return;
        }


        form.reset();


        if (cliente) {

            tituloModal.textContent =
                "Editar Cliente";

            clienteId.value =
                cliente.id || "";

            nomeCliente.value =
                cliente.nome || "";

            cpfCliente.value =
                cliente.cpf || "";

            telefoneCliente.value =
                cliente.telefone || "";

            emailCliente.value =
                cliente.email || "";

            nascimentoCliente.value =
                cliente.nascimento || "";

            statusCliente.value =
                cliente.status || "ativo";

            enderecoCliente.value =
                cliente.endereco || "";

            cidadeCliente.value =
                cliente.cidade || "";

            observacoesCliente.value =
                cliente.observacoes || "";

        } else {

            tituloModal.textContent =
                "Novo Cliente";

            clienteId.value =
                "";

            statusCliente.value =
                "ativo";

        }


        modal.classList.add("show");

        document.body.classList.add(
            "modal-open"
        );


        setTimeout(() => {

            nomeCliente.focus();

        }, 150);

    }


    // ======================================================
    // FECHAR MODAL
    // ======================================================

    function fecharModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        document.body.classList.remove(
            "modal-open"
        );

        form.reset();

        clienteId.value = "";

        tituloModal.textContent =
            "Novo Cliente";

        statusCliente.value =
            "ativo";

    }


    // ======================================================
    // BOTÃO NOVO CLIENTE
    // ======================================================

    if (btnNovoCliente) {

        btnNovoCliente.addEventListener(
            "click",
            () => {

                abrirModal();

            }
        );

    }


    if (btnNovoClienteVazio) {

        btnNovoClienteVazio.addEventListener(
            "click",
            () => {

                abrirModal();

            }
        );

    }


    // ======================================================
    // FECHAR MODAL
    // ======================================================

    if (btnFecharModal) {

        btnFecharModal.addEventListener(
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
            (event) => {

                if (
                    event.target === modal
                ) {

                    fecharModal();

                }

            }
        );

    }


    // ======================================================
    // ESC PARA FECHAR
    // ======================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains("show")
            ) {

                fecharModal();

            }

        }
    );


    // ======================================================
    // FORMULÁRIO
    // ======================================================

    if (form) {

        form.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                salvarCliente();

            }
        );

    }


    // ======================================================
    // SALVAR CLIENTE
    // ======================================================

    function salvarCliente() {

        const nome =
            nomeCliente.value.trim();

        const cpf =
            cpfCliente.value.trim();

        const telefone =
            telefoneCliente.value.trim();

        const email =
            emailCliente.value.trim();

        const nascimento =
            nascimentoCliente.value;

        const status =
            statusCliente.value;

        const endereco =
            enderecoCliente.value.trim();

        const cidade =
            cidadeCliente.value.trim();

        const observacoes =
            observacoesCliente.value.trim();


        // ==================================================
        // VALIDAÇÃO
        // ==================================================

        if (!nome) {

            alert(
                "Digite o nome completo do cliente."
            );

            nomeCliente.focus();

            return;

        }


        if (!telefone) {

            alert(
                "Digite o telefone do cliente."
            );

            telefoneCliente.focus();

            return;

        }


        if (
            email &&
            !validarEmail(email)
        ) {

            alert(
                "Digite um e-mail válido."
            );

            emailCliente.focus();

            return;

        }


        // ==================================================
        // VERIFICAR CPF DUPLICADO
        // ==================================================

        if (cpf) {

            const cpfLimpo =
                somenteNumeros(cpf);

            const cpfExistente =
                clientes.find(cliente => {

                    return (
                        somenteNumeros(
                            cliente.cpf || ""
                        ) === cpfLimpo &&
                        cliente.id !== clienteId.value
                    );

                });


            if (cpfExistente) {

                alert(
                    "Já existe um cliente cadastrado com este CPF."
                );

                cpfCliente.focus();

                return;

            }

        }


        // ==================================================
        // VERIFICAR E-MAIL DUPLICADO
        // ==================================================

        if (email) {

            const emailExistente =
                clientes.find(cliente => {

                    return (
                        String(
                            cliente.email || ""
                        ).toLowerCase() ===
                        email.toLowerCase() &&
                        cliente.id !== clienteId.value
                    );

                });


            if (emailExistente) {

                alert(
                    "Já existe um cliente cadastrado com este e-mail."
                );

                emailCliente.focus();

                return;

            }

        }


        // ==================================================
        // EDITAR
        // ==================================================

        if (clienteId.value) {

            const indice =
                clientes.findIndex(
                    cliente =>
                        cliente.id ===
                        clienteId.value
                );


            if (indice !== -1) {

                clientes[indice] = {

                    ...clientes[indice],

                    nome,
                    cpf,
                    telefone,
                    email,
                    nascimento,
                    status,
                    endereco,
                    cidade,
                    observacoes,

                    atualizadoEm:
                        new Date().toISOString()

                };

            }

        }


        // ==================================================
        // NOVO CLIENTE
        // ==================================================

        else {

            const novoCliente = {

                id:
                    gerarId(),

                nome,
                cpf,
                telefone,
                email,
                nascimento,
                status,
                endereco,
                cidade,
                observacoes,

                criadoEm:
                    new Date().toISOString(),

                atualizadoEm:
                    new Date().toISOString()

            };


            clientes.push(
                novoCliente
            );

        }


        // ==================================================
        // SALVAR
        // ==================================================

        if (!salvarClientes()) {
            return;
        }


        // ==================================================
        // ATUALIZAR
        // ==================================================

        paginaAtual = 1;

        renderizarClientes();

        atualizarResumo();

        fecharModal();


        // ==================================================
        // MENSAGEM
        // ==================================================

        mostrarMensagem(
            "Cliente salvo com sucesso!",
            "success"
        );

    }


    // ======================================================
    // RENDERIZAR CLIENTES
    // ======================================================

    function renderizarClientes() {

        if (!listaClientes) {
            return;
        }


        const filtrados =
            obterClientesFiltrados();


        const totalPaginas =
            Math.max(
                1,
                Math.ceil(
                    filtrados.length /
                    ITENS_POR_PAGINA
                )
            );


        if (
            paginaAtual >
            totalPaginas
        ) {

            paginaAtual =
                totalPaginas;

        }


        const inicio =
            (paginaAtual - 1) *
            ITENS_POR_PAGINA;


        const fim =
            inicio +
            ITENS_POR_PAGINA;


        const clientesPagina =
            filtrados.slice(
                inicio,
                fim
            );


        listaClientes.innerHTML =
            "";


        if (
            clientesPagina.length === 0
        ) {

            if (clientesVazios) {

                clientesVazios.style.display =
                    "flex";

            }

            atualizarPaginacao(
                0,
                0,
                filtrados.length
            );

            return;

        }


        if (clientesVazios) {

            clientesVazios.style.display =
                "none";

        }


        clientesPagina.forEach(
            cliente => {

                listaClientes.appendChild(
                    criarLinhaCliente(
                        cliente
                    )
                );

            }
        );


        atualizarPaginacao(
            inicio + 1,
            Math.min(
                fim,
                filtrados.length
            ),
            filtrados.length
        );

    }


    // ======================================================
    // CRIAR LINHA
    // ======================================================

    function criarLinhaCliente(cliente) {

        const tr =
            document.createElement("tr");


        const nome =
            escaparHTML(
                cliente.nome || "Sem nome"
            );

        const telefone =
            escaparHTML(
                cliente.telefone || "—"
            );

        const email =
            escaparHTML(
                cliente.email || "—"
            );

        const status =
            cliente.status === "inativo"
                ? "inativo"
                : "ativo";


        const textoStatus =
            status === "ativo"
                ? "Ativo"
                : "Inativo";


        const dataCadastro =
            formatarData(
                cliente.criadoEm
            );


        tr.innerHTML = `

            <td>

                <div class="client-info">

                    <div class="client-avatar">

                        ${obterIniciais(
                            cliente.nome
                        )}

                    </div>

                    <div>

                        <strong>
                            ${nome}
                        </strong>

                        <span>
                            ${
                                cliente.cpf
                                    ? "CPF: " +
                                      escaparHTML(
                                          cliente.cpf
                                      )
                                    : "Cliente"
                            }
                        </span>

                    </div>

                </div>

            </td>


            <td>
                ${telefone}
            </td>


            <td>
                ${email}
            </td>


            <td>
                ${dataCadastro}
            </td>


            <td>

                <span
                    class="status ${status}">

                    ${textoStatus}

                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        type="button"
                        class="action-btn edit"
                        data-action="editar"
                        data-id="${cliente.id}"
                        title="Editar cliente">

                        <i class="fa-solid fa-pen"></i>

                    </button>


                    <button
                        type="button"
                        class="action-btn delete"
                        data-action="excluir"
                        data-id="${cliente.id}"
                        title="Excluir cliente">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </td>

        `;


        return tr;

    }


    // ======================================================
    // AÇÕES DA TABELA
    // ======================================================

    if (listaClientes) {

        listaClientes.addEventListener(
            "click",
            (event) => {

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


                const cliente =
                    clientes.find(
                        item =>
                            item.id === id
                    );


                if (!cliente) {
                    return;
                }


                if (
                    acao === "editar"
                ) {

                    abrirModal(
                        cliente
                    );

                }


                if (
                    acao === "excluir"
                ) {

                    excluirCliente(
                        cliente
                    );

                }

            }
        );

    }


    // ======================================================
    // EXCLUIR CLIENTE
    // ======================================================

    function excluirCliente(cliente) {

        const confirmar =
            confirm(
                `Deseja excluir o cliente "${cliente.nome}"?`
            );


        if (!confirmar) {
            return;
        }


        clientes =
            clientes.filter(
                item =>
                    item.id !== cliente.id
            );


        if (!salvarClientes()) {
            return;
        }


        renderizarClientes();

        atualizarResumo();


        mostrarMensagem(
            "Cliente excluído com sucesso!",
            "success"
        );

    }


    // ======================================================
    // FILTRAR CLIENTES
    // ======================================================

    function obterClientesFiltrados() {

        const termo =
            pesquisa
                ? pesquisa.value
                    .trim()
                    .toLowerCase()
                : "";


        const statusSelecionado =
            filtroStatus
                ? filtroStatus.value
                : "todos";


        const ordem =
            ordenar
                ? ordenar.value
                : "recentes";


        let resultado =
            clientes.filter(
                cliente => {

                    const nome =
                        String(
                            cliente.nome || ""
                        ).toLowerCase();

                    const telefone =
                        String(
                            cliente.telefone || ""
                        ).toLowerCase();

                    const email =
                        String(
                            cliente.email || ""
                        ).toLowerCase();

                    const cpf =
                        String(
                            cliente.cpf || ""
                        ).toLowerCase();


                    const correspondeBusca =
                        !termo ||
                        nome.includes(termo) ||
                        telefone.includes(termo) ||
                        email.includes(termo) ||
                        cpf.includes(termo);


                    const correspondeStatus =
                        statusSelecionado ===
                        "todos" ||
                        cliente.status ===
                        statusSelecionado;


                    return (
                        correspondeBusca &&
                        correspondeStatus
                    );

                }
            );


        // ==================================================
        // ORDENAÇÃO
        // ==================================================

        if (ordem === "nome") {

            resultado.sort(
                (a, b) =>
                    String(a.nome || "")
                        .localeCompare(
                            String(b.nome || ""),
                            "pt-BR"
                        )
            );

        }


        else if (ordem === "nomeDesc") {

            resultado.sort(
                (a, b) =>
                    String(b.nome || "")
                        .localeCompare(
                            String(a.nome || ""),
                            "pt-BR"
                        )
            );

        }


        else {

            resultado.sort(
                (a, b) =>
                    new Date(
                        b.criadoEm || 0
                    ) -
                    new Date(
                        a.criadoEm || 0
                    )
            );

        }


        return resultado;

    }


    // ======================================================
    // PESQUISA
    // ======================================================

    if (pesquisa) {

        pesquisa.addEventListener(
            "input",
            () => {

                paginaAtual = 1;

                renderizarClientes();

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

                paginaAtual = 1;

                renderizarClientes();

            }
        );

    }


    // ======================================================
    // ORDENAÇÃO
    // ======================================================

    if (ordenar) {

        ordenar.addEventListener(
            "change",
            () => {

                paginaAtual = 1;

                renderizarClientes();

            }
        );

    }


    // ======================================================
    // PAGINAÇÃO
    // ======================================================

    const paginaAnterior =
        document.getElementById(
            "paginaAnterior"
        );

    const paginaProxima =
        document.getElementById(
            "paginaProxima"
        );

    const paginaAtualElemento =
        document.getElementById(
            "paginaAtual"
        );


    if (paginaAnterior) {

        paginaAnterior.addEventListener(
            "click",
            () => {

                if (paginaAtual > 1) {

                    paginaAtual--;

                    renderizarClientes();

                }

            }
        );

    }


    if (paginaProxima) {

        paginaProxima.addEventListener(
            "click",
            () => {

                const total =
                    obterClientesFiltrados()
                        .length;

                const totalPaginas =
                    Math.ceil(
                        total /
                        ITENS_POR_PAGINA
                    );


                if (
                    paginaAtual <
                    totalPaginas
                ) {

                    paginaAtual++;

                    renderizarClientes();

                }

            }
        );

    }


    // ======================================================
    // ATUALIZAR PAGINAÇÃO
    // ======================================================

    function atualizarPaginacao(
        inicio,
        fim,
        total
    ) {

        if (paginacaoInfo) {

            if (total === 0) {

                paginacaoInfo.textContent =
                    "Nenhum cliente";

            } else {

                paginacaoInfo.textContent =
                    `Mostrando ${inicio}–${fim} de ${total} clientes`;

            }

        }


        if (contadorClientes) {

            contadorClientes.textContent =
                `${total} ${
                    total === 1
                        ? "cliente"
                        : "clientes"
                }`;

        }


        const totalPaginas =
            Math.max(
                1,
                Math.ceil(
                    total /
                    ITENS_POR_PAGINA
                )
            );


        if (paginaAtualElemento) {

            paginaAtualElemento.textContent =
                paginaAtual;

        }


        if (paginaAnterior) {

            paginaAnterior.disabled =
                paginaAtual <= 1;

        }


        if (paginaProxima) {

            paginaProxima.disabled =
                paginaAtual >= totalPaginas;

        }

    }


    // ======================================================
    // RESUMO
    // ======================================================

    function atualizarResumo() {

        const total =
            clientes.length;


        const ativos =
            clientes.filter(
                cliente =>
                    cliente.status !==
                    "inativo"
            ).length;


        const inativos =
            clientes.filter(
                cliente =>
                    cliente.status ===
                    "inativo"
            ).length;


        // Novos clientes:
        // cadastrados nos últimos 30 dias.

        const agora =
            new Date();

        const limite =
            new Date();

        limite.setDate(
            agora.getDate() - 30
        );


        const novos =
            clientes.filter(
                cliente => {

                    if (!cliente.criadoEm) {
                        return false;
                    }

                    return (
                        new Date(
                            cliente.criadoEm
                        ) >= limite
                    );

                }
            ).length;


        if (totalClientes) {

            totalClientes.textContent =
                total;

        }


        if (clientesAtivos) {

            clientesAtivos.textContent =
                ativos;

        }


        if (clientesInativos) {

            clientesInativos.textContent =
                inativos;

        }


        if (novosClientes) {

            novosClientes.textContent =
                novos;

        }

    }


    // ======================================================
    // INICIAIS
    // ======================================================

    function obterIniciais(nome) {

        const palavras =
            String(nome || "")
                .trim()
                .split(/\s+/)
                .filter(Boolean);


        if (palavras.length === 0) {
            return "C";
        }


        if (palavras.length === 1) {

            return palavras[0]
                .substring(0, 2)
                .toUpperCase();

        }


        return (
            palavras[0][0] +
            palavras[palavras.length - 1][0]
        ).toUpperCase();

    }


    // ======================================================
    // FORMATAR DATA
    // ======================================================

    function formatarData(data) {

        if (!data) {
            return "—";
        }


        const dataObj =
            new Date(data);


        if (
            Number.isNaN(
                dataObj.getTime()
            )
        ) {

            return "—";

        }


        return dataObj.toLocaleDateString(
            "pt-BR"
        );

    }


    // ======================================================
    // VALIDAR E-MAIL
    // ======================================================

    function validarEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            .test(email);

    }


    // ======================================================
    // SOMENTE NÚMEROS
    // ======================================================

    function somenteNumeros(valor) {

        return String(valor || "")
            .replace(/\D/g, "");

    }


    // ======================================================
    // GERAR ID
    // ======================================================

    function gerarId() {

        return (
            Date.now().toString() +
            Math.random()
                .toString(36)
                .substring(2, 9)
        );

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
    // MENSAGEM
    // ======================================================

    function mostrarMensagem(
        mensagem,
        tipo = "success"
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


        toast.innerHTML = `

            <i class="fa-solid ${
                tipo === "success"
                    ? "fa-circle-check"
                    : "fa-circle-exclamation"
            }"></i>

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


    // ======================================================
    // MÁSCARA CPF
    // ======================================================

    if (cpfCliente) {

        cpfCliente.addEventListener(
            "input",
            () => {

                let valor =
                    somenteNumeros(
                        cpfCliente.value
                    );


                valor =
                    valor.substring(
                        0,
                        11
                    );


                valor =
                    valor.replace(
                        /(\d{3})(\d)/,
                        "$1.$2"
                    );

                valor =
                    valor.replace(
                        /(\d{3})(\d)/,
                        "$1.$2"
                    );

                valor =
                    valor.replace(
                        /(\d{3})(\d{1,2})$/,
                        "$1-$2"
                    );


                cpfCliente.value =
                    valor;

            }
        );

    }


    // ======================================================
    // MÁSCARA TELEFONE
    // ======================================================

    if (telefoneCliente) {

        telefoneCliente.addEventListener(
            "input",
            () => {

                let valor =
                    somenteNumeros(
                        telefoneCliente.value
                    );


                valor =
                    valor.substring(
                        0,
                        11
                    );


                if (valor.length <= 10) {

                    valor =
                        valor.replace(
                            /(\d{2})(\d)/,
                            "($1) $2"
                        );

                    valor =
                        valor.replace(
                            /(\d{4})(\d)/,
                            "$1-$2"
                        );

                } else {

                    valor =
                        valor.replace(
                            /(\d{2})(\d)/,
                            "($1) $2"
                        );

                    valor =
                        valor.replace(
                            /(\d{5})(\d)/,
                            "$1-$2"
                        );

                }


                telefoneCliente.value =
                    valor;

            }
        );

    }


    // ======================================================
    // INICIALIZAÇÃO
    // ======================================================

    renderizarClientes();

    atualizarResumo();

});