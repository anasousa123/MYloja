// ==========================================
// FASHION ERP
// MÓDULO DE CLIENTES
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS
    // ==========================================

    const modal = document.getElementById("modalCliente");
    const form = document.getElementById("formCliente");

    const btnNovo = document.getElementById("novoCliente");
    const btnFechar = document.getElementById("fecharModal");
    const btnCancelar = document.getElementById("cancelarCliente");

    const lista = document.getElementById("listaClientes");
    const semClientes = document.getElementById("semClientes");

    const pesquisa = document.getElementById("pesquisaCliente");
    const limparPesquisa = document.getElementById("limparPesquisa");

    const totalClientes = document.getElementById("totalClientes");
    const novosClientes = document.getElementById("novosClientes");
    const clientesAtivos = document.getElementById("clientesAtivos");

    const tituloModal = document.getElementById("tituloModal");

    // ==========================================
    // CAMPOS
    // ==========================================

    const clienteId = document.getElementById("clienteId");
    const nome = document.getElementById("nomeCliente");
    const telefone = document.getElementById("telefoneCliente");
    const email = document.getElementById("emailCliente");
    const cidade = document.getElementById("cidadeCliente");
    const status = document.getElementById("statusCliente");
    const observacoes = document.getElementById("observacoesCliente");

    // ==========================================
    // CLIENTES
    // ==========================================

    let clientes = JSON.parse(
        localStorage.getItem("fashionERP_clientes")
    ) || [];

    // ==========================================
    // ABRIR MODAL
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

    // Fechar clicando fora
    modal.addEventListener("click", (event) => {

        if(event.target === modal){

            fecharModal();

        }

    });

    // ==========================================
    // ABRIR MODAL
    // ==========================================

    function abrirModal(cliente = null){

        modal.classList.add("show");

        if(cliente){

            tituloModal.textContent = "Editar Cliente";

            clienteId.value = cliente.id;
            nome.value = cliente.nome;
            telefone.value = cliente.telefone;
            email.value = cliente.email;
            cidade.value = cliente.cidade;
            status.value = cliente.status;
            observacoes.value = cliente.observacoes || "";

        }else{

            tituloModal.textContent = "Novo Cliente";

            form.reset();

            clienteId.value = "";

            status.value = "Ativo";

        }

        setTimeout(() => {

            nome.focus();

        }, 100);

    }

    // ==========================================
    // FECHAR MODAL
    // ==========================================

    function fecharModal(){

        modal.classList.remove("show");

        form.reset();

        clienteId.value = "";

        tituloModal.textContent = "Novo Cliente";

    }

    // ==========================================
    // SALVAR CLIENTE
    // ==========================================

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const nomeValor = nome.value.trim();
        const telefoneValor = telefone.value.trim();

        if(!nomeValor || !telefoneValor){

            alert("Preencha o nome e o telefone do cliente.");

            return;

        }

        // ======================================
        // EDITAR
        // ======================================

        if(clienteId.value){

            const indice = clientes.findIndex(
                cliente => cliente.id === clienteId.value
            );

            if(indice !== -1){

                clientes[indice] = {

                    ...clientes[indice],

                    nome: nomeValor,
                    telefone: telefoneValor,
                    email: email.value.trim(),
                    cidade: cidade.value.trim(),
                    status: status.value,
                    observacoes: observacoes.value.trim()

                };

            }

        }

        // ======================================
        // NOVO CLIENTE
        // ======================================

        else{

            const novoCliente = {

                id: Date.now().toString(),

                nome: nomeValor,

                telefone: telefoneValor,

                email: email.value.trim(),

                cidade: cidade.value.trim(),

                status: status.value,

                observacoes: observacoes.value.trim(),

                compras: 0,

                dataCadastro: new Date().toISOString()

            };

            clientes.push(novoCliente);

        }

        salvarClientes();

        renderizarClientes();

        atualizarResumo();

        fecharModal();

    });

    // ==========================================
    // SALVAR
    // ==========================================

    function salvarClientes(){

        localStorage.setItem(
            "fashionERP_clientes",
            JSON.stringify(clientes)
        );

    }

    // ==========================================
    // RENDERIZAR
    // ==========================================

    function renderizarClientes(){

        const termo = pesquisa.value
            .toLowerCase()
            .trim();

        const filtrados = clientes.filter(cliente => {

            return (

                cliente.nome.toLowerCase().includes(termo) ||

                cliente.telefone.toLowerCase().includes(termo) ||

                cliente.email.toLowerCase().includes(termo) ||

                cliente.cidade.toLowerCase().includes(termo)

            );

        });

        lista.innerHTML = "";

        if(filtrados.length === 0){

            semClientes.style.display = "block";

            return;

        }

        semClientes.style.display = "none";

        filtrados.forEach(cliente => {

            const linha = document.createElement("tr");

            const iniciais = gerarIniciais(cliente.nome);

            const statusClasse =
                cliente.status === "Ativo"
                    ? "ativo"
                    : "inativo";

            linha.innerHTML = `

                <td>

                    <div class="client-name">

                        <div class="client-avatar">

                            ${iniciais}

                        </div>

                        <div class="client-info">

                            <strong>

                                ${escaparHTML(cliente.nome)}

                            </strong>

                            <span>

                                Cliente desde ${formatarData(cliente.dataCadastro)}

                            </span>

                        </div>

                    </div>

                </td>

                <td>

                    ${escaparHTML(cliente.telefone)}

                </td>

                <td>

                    ${cliente.email
                        ? escaparHTML(cliente.email)
                        : "—"}

                </td>

                <td>

                    ${cliente.cidade
                        ? escaparHTML(cliente.cidade)
                        : "—"}

                </td>

                <td>

                    ${cliente.compras || 0}

                </td>

                <td>

                    <span class="status ${statusClasse}">

                        ${cliente.status}

                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="icon-btn"
                            title="Editar"
                            data-action="editar"
                            data-id="${cliente.id}">

                            <i class="fa-solid fa-pen"></i>

                        </button>

                        <button
                            class="icon-btn delete"
                            title="Excluir"
                            data-action="excluir"
                            data-id="${cliente.id}">

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

        const botao = event.target.closest("button");

        if(!botao) return;

        const id = botao.dataset.id;

        const acao = botao.dataset.action;

        const cliente = clientes.find(
            item => item.id === id
        );

        if(!cliente) return;

        if(acao === "editar"){

            abrirModal(cliente);

        }

        if(acao === "excluir"){

            excluirCliente(cliente);

        }

    });

    // ==========================================
    // EXCLUIR
    // ==========================================

    function excluirCliente(cliente){

        const confirmar = confirm(
            `Deseja excluir o cliente "${cliente.nome}"?`
        );

        if(!confirmar) return;

        clientes = clientes.filter(
            item => item.id !== cliente.id
        );

        salvarClientes();

        renderizarClientes();

        atualizarResumo();

    }

    // ==========================================
    // PESQUISA
    // ==========================================

    pesquisa.addEventListener("input", () => {

        renderizarClientes();

    });

    // ==========================================
    // LIMPAR PESQUISA
    // ==========================================

    limparPesquisa.addEventListener("click", () => {

        pesquisa.value = "";

        renderizarClientes();

        pesquisa.focus();

    });

    // ==========================================
    // RESUMO
    // ==========================================

    function atualizarResumo(){

        const total = clientes.length;

        const ativos = clientes.filter(
            cliente => cliente.status === "Ativo"
        ).length;

        const agora = new Date();

        const mesAtual = agora.getMonth();

        const anoAtual = agora.getFullYear();

        const novos = clientes.filter(cliente => {

            const data = new Date(cliente.dataCadastro);

            return (
                data.getMonth() === mesAtual &&
                data.getFullYear() === anoAtual
            );

        }).length;

        totalClientes.textContent = total;

        clientesAtivos.textContent = ativos;

        novosClientes.textContent = novos;

    }

    // ==========================================
    // INICIAIS
    // ==========================================

    function gerarIniciais(nome){

        const palavras = nome
            .trim()
            .split(" ")
            .filter(Boolean);

        if(palavras.length === 1){

            return palavras[0]
                .substring(0,2)
                .toUpperCase();

        }

        return (
            palavras[0][0] +
            palavras[palavras.length - 1][0]
        ).toUpperCase();

    }

    // ==========================================
    // FORMATAR DATA
    // ==========================================

    function formatarData(data){

        if(!data) return "--/--/----";

        const dataFormatada = new Date(data);

        return dataFormatada.toLocaleDateString(
            "pt-BR"
        );

    }

    // ==========================================
    // SEGURANÇA
    // Evita inserir HTML digitado pelo usuário
    // ==========================================

    function escaparHTML(texto){

        return String(texto)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    renderizarClientes();

    atualizarResumo();

});