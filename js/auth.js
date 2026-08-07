// =====================================
// FASHION ERP - LOGIN
// =====================================

const form = document.getElementById("loginForm");
const senha = document.getElementById("senha");
const toggleSenha = document.getElementById("toggleSenha");

// Mostrar/Ocultar senha
toggleSenha.addEventListener("click", () => {

    if (senha.type === "password") {
        senha.type = "text";
        toggleSenha.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        senha.type = "password";
        toggleSenha.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

});

// Login
form.addEventListener("submit", (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value.trim();

    // Usuário temporário
    const usuario = "admin@fashionerp.com";
    const senhaPadrao = "123456";

    if (email === usuario && password === senhaPadrao) {

        // Salva sessão
        localStorage.setItem("usuarioLogado", "true");

        // Mensagem
        alert("Login realizado com sucesso!");

        // Vai para o dashboard
        window.location.href = "pages/dashboard.html";

    } else {

        alert("E-mail ou senha inválidos!");

    }

});