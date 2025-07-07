document.addEventListener("DOMContentLoaded", () => {
  // Verificación de sesión
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const isLoginPage = window.location.pathname.includes("index.html");

  if (!isLoggedIn && !isLoginPage) {
    window.location.href = "../index.html";
    return;
  }

  if (isLoggedIn && isLoginPage) {
    window.location.href = "./assets/dashboard.html";
    return;
  }

  // Mostrar modals
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

  // Registro
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

  // Login
  function handleLogin(modal) {
    const btn = modal.querySelector("button");
    btn.addEventListener("click", () => {
      const email = modal.querySelector('input[type="text"]').value;
      const password = modal.querySelector('input[type="password"]').value;
      const users = JSON.parse(localStorage.getItem("users")) || {};

      if (users[email] && users[email].password === password) {
        alert(`¡Bienvenido, ${users[email].name}! Has iniciado sesión correctamente.`);
        localStorage.setItem("loggedIn", "true");
        modal.remove();
        window.location.href = "./assets/dashboard.html";
      } else {
        alert("Correo o contraseña incorrectos.");
      }
    });
  }

  // Triggers para abrir modals
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

  // Scroll suave para secciones en landing page
  function enableSmoothScroll(triggerId, targetId) {
    document.querySelector(`#${triggerId}`)?.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: "smooth" });
    });
  }

  enableSmoothScroll("Monitoreo", "MonitoreoCard");
  enableSmoothScroll("Asistencia", "AsistenciaCard");
  enableSmoothScroll("Analisis", "AnalisisCard");

  // Sidebar dinámico
  const sidebarContainer = document.getElementById("sidebar-container");
  if (sidebarContainer) {
    sidebarContainer.innerHTML = `
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>Mindra</h2>
        </div>
        <ul class="sidebar-menu">
          <li><a href="dashboard.html">Inicio</a></li>
          <li><a href="monitoreo.html">Monitoreo de salud</a></li>
          <li><a href="asistencia.html">Asistencia y recordatorios</a></li>
          <li><a href="analisis.html">Análisis de comportamiento</a></li>
          <li><a href="retroalimentacion.html">Retroalimentación</a></li>
          <li><a href="evaluacion.html">Evaluación emocional</a></li>
          <li><a href="#" id="btnLogout">Cerrar sesión</a></li>
        </ul>
      </nav>
    `;
  }

  // Cerrar sesión
  document.addEventListener("click", function (e) {
    if (e.target && e.target.id === "btnLogout") {
      e.preventDefault();
      localStorage.removeItem("loggedIn");
      window.location.href = "../index.html";
    }
  });

  // Menu hamburguesa (si aplica)
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  menuToggle?.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
});