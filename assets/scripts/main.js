document.querySelector("#Monitoreo")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#MonitoreoCard")?.scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#Asistencia")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#AsistenciaCard")?.scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#Analisis")?.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#AnalisisCard")?.scrollIntoView({ behavior: "smooth" });
});