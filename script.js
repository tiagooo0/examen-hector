document.addEventListener('DOMContentLoaded', function() {
    const partes = document.querySelectorAll('.part');
    const comenzarBtn = document.getElementById('comenzar');
    const puntajeSpan = document.getElementById('puntaje');
    let secuencia = [];
    let puntaje = 0;
    let intento = 0;

    comenzarBtn.addEventListener('click', comenzarJuego);

    partes.forEach(partes => {
        partes.addEventListener('click', function() {
            if (!secuencia.length) return;

            const idParte = partes.id;
            const colorSecuencia = secuencia[intento];

            if (idParte === colorSecuencia) {
                resaltarParte(partes);
                intento++;

                if (intento === secuencia.length) {
                    puntaje++;
                    puntajeSpan.textContent = puntaje;
                    setTimeout(mostrarSecuencia, 1000);
                    intento = 0;
                }
            } else {
                alert('¡Has perdido! Puntaje: ' + puntaje);
                reiniciarJuego();
            }
        });
    });

    function comenzarJuego() {
        secuencia = [];
        puntaje = 0;
        puntajeSpan.textContent = puntaje;
        intento = 0;
        mostrarSecuencia();
    }

    function reiniciarJuego() {
        secuencia = [];
        intento = 0;
        puntaje = 0;
        puntajeSpan.textContent = puntaje;
    }

    function resaltarParte(parte) {
        parte.classList.add('click');
        setTimeout(() => parte.classList.remove('click'), 500);
    }

    function mostrarSecuencia() {
        const colores = ['part1', 'part2', 'part3', 'part4'];
        const nivelActual = secuencia.length + 1;

        for (let i = 0; i < nivelActual; i++) {
            const colorAleatorio = colores[Math.floor(Math.random() * 4)];
            secuencia.push(colorAleatorio);
        }

        secuencia.forEach((color, index) => {
            setTimeout(() => {
                const parte = document.getElementById(color);
                resaltarParte(parte);
            }, (index + 1) * 1000);
        });
    }
});
