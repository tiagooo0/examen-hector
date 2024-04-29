document.addEventListener('DOMContentLoaded', function() {
    const partes = document.querySelectorAll('.part');
    const comenzarBtn = document.getElementById('comenzar');
    const puntajeSpan = document.getElementById('puntaje');
    let secuencia = [];
    let puntaje = 0;
    let jugando = false;
    let intento = 0;

    comenzarBtn.addEventListener('click', comenzarJuego);

    partes.forEach(partes => {
        partes.addEventListener('click', function() {
            if (!jugando) return;

            const idParte = partes.id;

            if (idParte === secuencia[intento]) {
               
                partes.classList.add('click');
                setTimeout(() => partes.classList.remove('click'), 500);

                intento++;
                if (intento === secuencia.length) {
                    puntaje++;
                    puntajeSpan.textContent = puntaje;
                    setTimeout(mostrarSecuencia, 1000);
                    intento = 0;
                }
            } else {
                alert('perdiste! Puntaje: ' + puntaje);
                reiniciarJuego();
            }
        });
    });

    function comenzarJuego() {
        secuencia = [];
        puntaje = 0;
        puntajeSpan.textContent = puntaje;
        jugando = true;
        intento = 0;
        mostrarSecuencia();
    }

    function reiniciarJuego() {
        jugando = false;
        comenzarBtn.disabled = false;
    }

    function mostrarSecuencia() {
        comenzarBtn.disabled = true;
        const colores = ['part1', 'part2', 'part3', 'part4'];


        const nivelActual = secuencia.length + 1;
        secuencia = [];


        for (let i = 0; i < nivelActual; i++) {
            const colorAleatorio = colores[Math.floor(Math.random() * 4)];
            secuencia.push(colorAleatorio);
        }

        console.log('Secuencia:', secuencia);

        let i = 0;
        const intervalo = setInterval(() => {
            const parte = document.getElementById(secuencia[i]);
            if (parte) {
                parte.classList.add('click');
                setTimeout(() => {
                    parte.classList.remove('click');
                    i++;

                    if (i >= secuencia.length) {
                        clearInterval(intervalo);
                        jugando = true;
                        comenzarBtn.disabled = false;
                    }
                }, 500);
            }
        }, 1000);
    }
});
