document.addEventListener("DOMContentLoaded", () => {
    function showModal(templateId) {
        const template = document.getElementById(templateId);
        const clone = template.content.cloneNode(true);
        document.body.appendChild(clone);


        const modalId = templateId.replace("Template", "Modal");
        const modal = document.getElementById(modalId);
        modal.style.display = "block";

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
