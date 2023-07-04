const textarea              = document.getElementById('textarea');
const botonRespaldo         = document.getElementById('botonRespaldo');
const goblin                = document.getElementById('goblin');
const botonGanador          = document.getElementById('botonGanador');
const rodillo1              = document.getElementById('rodillo1');
const rodillo2              = document.getElementById('rodillo2');
const rodillo3              = document.getElementById('rodillo3');
const numeroParticipantes   = document.getElementById('participantes');
let clicks = 5;

let nombres = '';

textarea.addEventListener('keyup', (e) => {
    replaceText(e.target.value);
});

function replaceText(input) {
    textarea.value = input.replace(/\n/g,',');
    const participantes = textarea.value.split(',').filter(participante => participante.trim()!== '').map(participante => participante.trim());
    contarParticipantes(participantes.length);
    nombres = participantes;
}

function contarParticipantes(cantidad) {
    numeroParticipantes.innerHTML = cantidad + ' participantes';
}

botonGanador.addEventListener('click', () => {
    realizarSorteo();
});

botonRespaldo.addEventListener('click', () => {
    rodillo1.innerHTML = '';
    rodillo3.innerHTML = '';
    const timer1 = setInterval(() => {
            const nombre = sortear();
            rodillo2.innerHTML = nombres[nombre];
    }, 50);
    setTimeout(() => {
            clearInterval(timer1);
    }, 2000);
});

function sortear() {
    return Math.floor(Math.random() * nombres.length);
}

function realizarSorteo() {
    if(nombres.length > 0){
        let ganador = sortear();
        goblin.style.visibility = 'hidden';
        const timer1 = setInterval(() => {
            const nombre = sortear();
            rodillo1.innerHTML = nombres[nombre];
        }, 50);
        const timer2 = setInterval(() => {
            const nombre = sortear();
            rodillo2.innerHTML = nombres[nombre];
        }, 50);
        const timer3 = setInterval(() => {
            const nombre = sortear();
            rodillo3.innerHTML = nombres[nombre];
        }, 50);
        setTimeout(() => {
            clearInterval(timer1);
            rodillo1.innerHTML = nombres[ganador];
        }, 2000);
        setTimeout(() => {
            clearInterval(timer2);
            rodillo2.innerHTML = nombres[ganador];
        }, 4000);
        setTimeout(() => {
            clearInterval(timer3);
            if (((Math.floor(Math.random() * 3) != 0) && (clicks > 0)) || (clicks > 4)) {
              clicks--;
              rodillo3.innerHTML = '';
              goblin.style.visibility = 'visible';
            } else {
              goblin.style.visibility = 'hidden';
              rodillo3.innerHTML = nombres[ganador];
              clicks = 5;
            }
        }, 6000);
    } else {
        rodillo1.innerHTML = '';
        rodillo2.innerHTML = 'No participantes';
        rodillo3.innerHTML = '';
    }
}
