// ==============================
// FASHION ERP
// Dashboard
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    carregarData();
    carregarResumo();
    carregarAtividades();

});

// ==============================
// Data Atual
// ==============================

function carregarData(){

    const data = new Date();

    const opcoes = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    };

    console.log(data.toLocaleDateString("pt-BR", opcoes));

}

// ==============================
// Resumo
// ==============================

function carregarResumo(){

    console.log("Dashboard carregado.");

}

// ==============================
// Últimas atividades
// ==============================

function carregarAtividades(){

    console.log("Atividades carregadas.");

}

// ==============================
// Botão Nova Venda
// ==============================

const botao = document.querySelector(".btn-primary");

if(botao){

    botao.addEventListener("click", () => {

        window.location.href = "vendas.html";

    });

}