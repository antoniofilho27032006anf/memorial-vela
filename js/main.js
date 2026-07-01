/* ==========================================
   ELEMENTOS DO DOM
========================================== */

const candle = document.querySelector(".candle");
const flame = document.querySelector(".flame");
const light = document.querySelector(".light");
const smoke = document.querySelectorAll(".smoke");
const textarea = document.querySelector("textarea");
const tributeText = document.querySelector(".tribute p");
const counter = document.getElementById("counter");

const btnLight = document.querySelector(".primary");
const btnOff = document.querySelector(".secondary");

/* ==========================================
   ESTADO DA VELA
========================================== */

let isLit = false;

/* ==========================================
   ACENDER VELA
========================================== */

function lightCandle() {
    if (isLit) return;

    isLit = true;

    candle.classList.add("lit");
    light.classList.add("active");

    flame.style.opacity = "1";

    // fumaça some quando acende
    smoke.forEach(s => s.classList.remove("active"));
}

/* ==========================================
   APAGAR VELA
========================================== */

function extinguishCandle() {
    if (!isLit) return;

    isLit = false;

    candle.classList.remove("lit");
    light.classList.remove("active");

    flame.style.opacity = "0.2";

    // ativa fumaça
    smoke.forEach((s, i) => {
        setTimeout(() => {
            s.classList.add("active");
        }, i * 200);
    });
}

/* ==========================================
   EVENTOS DOS BOTÕES
========================================== */

btnLight.addEventListener("click", lightCandle);
btnOff.addEventListener("click", extinguishCandle);

/* ==========================================
   TEXTO DA HOMENAGEM
========================================== */

textarea.addEventListener("input", () => {

    const text = textarea.value;

    tributeText.textContent = text || "A homenagem aparecerá aqui...";

    counter.textContent = `${text.length} caracteres`;
});

/* ==========================================
   TIMER DO MEMORIAL
========================================== */

const startTime = Date.now();

function updateTimer() {

    const now = Date.now();
    const diff = now - startTime;

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const hours = Math.floor(diff / 1000 / 60 / 60);

    const timerEl = document.querySelector(".timer strong");

    if (timerEl) {
        timerEl.textContent =
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;
    }
}

setInterval(updateTimer, 1000);

/* ==========================================
   EFEITO INICIAL
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {
        document.querySelector(".memorial")?.classList.add("show");
    }, 500);

});

/* ==========================================
   SALVAR TEXTO DA HOMENAGEM
========================================== */

// carregar ao abrir
window.addEventListener("load", () => {

    const saved = localStorage.getItem("tribute");

    if (saved) {
        textarea.value = saved;
        tributeText.textContent = saved;
        counter.textContent = `${saved.length} caracteres`;
    }

});

// salvar enquanto digita
textarea.addEventListener("input", () => {

    const text = textarea.value;

    localStorage.setItem("tribute", text);

});

const sound = document.getElementById("bg-sound");

// tentar tocar quando usuário interagir
document.addEventListener("click", () => {
    if (sound) {
        sound.volume = 0.3;
        sound.play().catch(() => {});
    }
}, { once: true });

document.addEventListener("keydown", (e) => {
    if (e.key === "d") {
        document.body.classList.toggle("dark-mode");
    }
});