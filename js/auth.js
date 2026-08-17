// =====================================
// FASHION ERP - LOGIN
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");
    const senhaInput = document.getElementById("senha");
    const toggleSenha = document.getElementById("toggleSenha");

    // =====================================
    // MOSTRAR / OCULTAR SENHA
    // =====================================

    if (toggleSenha && senhaInput) {

        toggleSenha.addEventListener("click", () => {

            if (senhaInput.type === "password") {

                senhaInput.type = "text";

                toggleSenha.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                senhaInput.type = "password";

                toggleSenha.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        });

    }


    // =====================================
    // LOGIN
    // =====================================

    if (!form) {

        console.error("Formulário de login não encontrado.");

        return;

    }


    form.addEventListener("submit", (e) => {

        e.preventDefault();


        const emailInput =
            document.getElementById("email");

        const senha =
            document.getElementById("senha");


        if (!emailInput || !senha) {

            alert("Erro: campos de login não encontrados.");

            return;

        }


        const email =
            emailInput.value.trim().toLowerCase();

        const password =
            senha.value.trim();


        // =====================================
        // USUÁRIO PADRÃO
        // =====================================

        const usuario =
            "admin@fashionerp.com";

        const senhaPadrao =
            "123456";


        // =====================================
        // VERIFICAÇÃO
        // =====================================

        if (
            email === usuario &&
            password === senhaPadrao
        ) {

            localStorage.setItem(
                "usuarioLogado",
                "true"
            );

            localStorage.setItem(
                "emailUsuario",
                email
            );


            alert(
                "Login realizado com sucesso!"
            );


            // IMPORTANTE:
            // index.html está na raiz
            // dashboard.html está dentro de pages

            window.location.href =
                "pages/dashboard.html";


        } else {

            alert(
                "E-mail ou senha inválidos!"
            );

        }

    });

});
