const textarea = document.getElementById('textarea');
const botonRespaldo = document.getElementById('botonRespaldo');
const botonGanador = document.getElementById('botonGanador');
const rodillo1 = document.getElementById('rodillo1');
const rodillo2 = document.getElementById('rodillo2');
const rodillo3 = document.getElementById('rodillo3');
const numeroParticipantes = document.getElementById('participantes');
const alertMsg = $("#alertMessage");

let clicks = (Math.floor(Math.random() * 3)) + 1;

let nombres = '';

textarea.addEventListener('keyup', (e) => {
    replaceText(e.target.value);
});

function replaceText(input) {
    textarea.value = input.replace(/\n/g, ',');
    const participantes = textarea.value.split(',').filter(participante => participante.trim() !== '').map(participante => participante.trim());
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
    clicks = (Math.floor(Math.random() * 3)) + 1;
});

function sortear() {
    return Math.floor(Math.random() * nombres.length);
}

function realizarSorteo() {
    if (nombres.length > 0) {
        let ganador = sortear();
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
            if (clicks > 0) {
                clicks--;
                rodillo3.innerHTML = '';
                showGoblin("rodillo3");
            } else {
                goblin.style.display = 'none';
                rodillo3.innerHTML = nombres[ganador];
                clicks = (Math.floor(Math.random() * 3)) + 1;
            }
        }, 6000);
    } else {
        alertMsg.show(); //Shows Bootstrap alert
        showNicoNo("rodillo1");
        showNicoNo("rodillo2");
        showNicoNo("rodillo3");
    }
}

function expandTextarea(id) {
    document.getElementById(id).addEventListener('keyup', function () {
        this.style.overflow = 'hidden';
        // Avoid infinite size
        if (this.scrollHeight >= 348) {
            return;
        }
        this.style.height = 0;
        this.style.height = this.scrollHeight + 'px';
    }, false);
}

function showNicoNo(id) {
    let element = document.getElementById(id);
    if (element == null) {
        console.error("No se pudo encontrar elemento [%s] para añadir un goblin", id)
        return;
    }
    document.getElementById(id).innerHTML = '<img id="goblin" src="./img/nico-no.gif">';
}

function showGoblin(id) {
    let element = document.getElementById(id);
    if (element == null) {
        console.error("No se pudo encontrar elemento [%s] para añadir un goblin", id)
        return;
    }
    document.getElementById(id).innerHTML = '<img id="goblin" src="./img/goblin1g.png">';
}

expandTextarea('textarea');

alertMsg.on("close.bs.alert", function () {
    alertMsg.hide();
    return false;
});