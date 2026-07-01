/* ==========================================
   CONTAINER DE PARTÍCULAS
========================================== */

const memorial = document.querySelector(".memorial");

/* ==========================================
   CRIA UMA PARTÍCULA
========================================== */

function createParticle() {

    const particle = document.createElement("div");

    particle.classList.add("particle");

    // posição inicial aleatória dentro da área da vela
    const size = Math.random() * 6 + 2;

    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.bottom = "0px";

    // duração aleatória
    const duration = Math.random() * 3 + 3;

    particle.style.animation = `floatUp ${duration}s linear forwards`;

    memorial.appendChild(particle);

    // remove depois da animação
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

/* ==========================================
   LOOP DE PARTÍCULAS
========================================== */

function startParticles() {

    setInterval(() => {

        // só gera partículas se a vela existir na tela
        if (memorial) {
            createParticle();
        }

    }, 400);
}

/* ==========================================
   INICIAR
========================================== */

window.addEventListener("load", () => {
    startParticles();
});