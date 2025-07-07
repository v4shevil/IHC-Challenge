document.addEventListener("DOMContentLoaded", () => {
    function showModal(templateId) {
        const template = document.getElementById(templateId);
        const clone = template.content.cloneNode(true);
        document.body.appendChild(clone);

        const modalId = templateId.replace("Template", "Modal");
        const modal = document.getElementById(modalId);
        modal.style.display = "block";

        if (templateId === "loginTemplate") handleLogin(modal);
        if (templateId === "registerTemplate") handleRegister(modal);

        modal.querySelector(".close").addEventListener("click", () => {
            modal.remove();
        });

        window.addEventListener("click", function handler(e) {
            if (e.target === modal) {
                modal.remove();
                window.removeEventListener("click", handler);
            }
        });
    }

    function handleRegister(modal) {
        const btn = modal.querySelector("button");
        btn.addEventListener("click", () => {
            const email = modal.querySelector('input[type="email"]').value;
            const password = modal.querySelector('input[type="password"]').value;
            const name = modal.querySelector('input[type="text"]').value;

            if (!email || !password || !name) {
                alert("Por favor completa todos los campos.");
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[email]) {
                alert("El usuario ya está registrado.");
                return;
            }

            users[email] = { password, name };
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registro exitoso.");
            modal.remove();
        });
    }

    function handleLogin(modal) {
        const btn = modal.querySelector("button");
        btn.addEventListener("click", () => {
            const email = modal.querySelector('input[type="text"]').value;
            const password = modal.querySelector('input[type="password"]').value;

            const users = JSON.parse(localStorage.getItem("users")) || {};

            if (users[email] && users[email].password === password) {
                alert(`¡Bienvenido, ${users[email].name}! Has iniciado sesión correctamente.`);
                modal.remove();
            } else {
                alert("Correo o contraseña incorrectos.");
            }
        });
    }

    document.querySelectorAll('a[href="#login"], .btn.tertiary').forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showModal("loginTemplate");
        });
    });

    document.querySelectorAll('a[href="#register"], .btn.secondary').forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showModal("registerTemplate");
        });
    });

    function enableSmoothScroll(triggerId, targetId) {
        document.querySelector(`#${triggerId}`)?.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: "smooth" });
        });
    }

    enableSmoothScroll("Monitoreo", "MonitoreoCard");
    enableSmoothScroll("Asistencia", "AsistenciaCard");
    enableSmoothScroll("Analisis", "AnalisisCard");

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    menuToggle?.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
});
