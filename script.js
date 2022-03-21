console.log('JS OK');

// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto
// precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei
// numeri da indovinare sono stati individuati.

// quando schiaccio il bottone start game mi appare il dialog delivey con all'interno 5 numeri random per 30 sec

// variabile per i numeri da ricordare
const numbersToRemember = 5;
// variabile per i secondi che resta attiva la consegna
const spanTimeInSec = 30;
// variabile per richiamare il bottone nell'html ed iniziare il gioco
const startGame = document.querySelector('#start-game');
// variabile per la consegna del gioco
const consegna = document.getElementById('consegna')
// variabile per richiamare il modal dialog della delivery e del timer
const delTimer = document.querySelector('#del-timer');
// variabile per inserire la consegna
const delivery = document.getElementById('delivery')
// variabile per inserire il timer
const timer = document.getElementById('timer')
// variabile per richiamare gli input
const game = document.querySelector('#game')
// variabile per i risultati
const result = document.getElementById('results')
// variabile score
const score = document.getElementById('score')
// variabile per i numeri corretti
const rightNumber = document.getElementById('right-number')
// creo variabile per identificare gli input
const inputs = document.getElementsByTagName('input');


// inizio il gioco al click e faccio apparire la consegna per 30 sec
startGame.addEventListener('click', () => {
    // faccio scomparire la consegna al click
    consegna.className = 'display-none'

    // randomNumbers.push(generateArrayOfNunmbers(1, 100, numbersToRemember));
    const randomNumbers = generateArrayOfNunmbers(1, 100, numbersToRemember);

    // ripulisco la console a tutti i cancelIdleCallback, visto che creo nuovi array
    console.clear();
    // resetto le classi del mio timer altrimenti riavviando avrò il colore rosso del numero
    timer.className = '';
    score.className = 'display-none'
    result.innerText = '';
    rightNumber.innerText = '';

    // variabile per i secondi che resta attiva la consegna
    let timerInSec = spanTimeInSec;
    // aggiungo il numero iniziale al mio timer
    timer.innerText = timerInSec;

    // genero i 5 numeri e li inserisco nell'html del modal
    delivery.innerHTML = randomNumbers.join(' ')
    console.log(randomNumbers)

    // mostro la consegna
    delTimer.showModal();

    // mostro il timer nel modal 
    const myTimer = setInterval(() => {
        timerInSec -= 1;
        timer.innerText = timerInSec;

        switch (timerInSec) {
            case 15:
                timer.className = 'yellow';
                break;
            case 5:
                timer.className = 'red';
                break;
            case 0:
                clearInterval(myTimer);
        }

    }, 1000)

    // lascio la consegna visibile per 30 sec e successivamente appare l'inserimento dati
    setTimeout(() => {
        delTimer.close();
        game.showModal();
    }, (timerInSec + 1) * 1000)

    // resetto i valori di tutti gli input allo start del game
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    // prendo il value degli input che da l'utente
    document.getElementById('submit').addEventListener('click', () => {
        // array per inserire i numeri dati dall'utente
        const myInputs = [];
        for (let i = 0; i < inputs.length; i++) {
            const value = parseInt(inputs[i].value);
            if (randomNumbers.includes(value) && !myInputs.includes(value)) {
                myInputs.push(value)
            }
        };

        if (myInputs.length == 0) {
            result.innerText = `Ops!! you didn't pick any correct number, try again!`
        } else {
            result.innerText = `Your Score is:`;
            score.classList.toggle('display-none');
            score.innerText = `${myInputs.length} / ${numbersToRemember}`;
            rightNumber.innerText = `correct number: ${myInputs.join(' - ')}`;
        }

        game.close();
    })
})


// funzione per generare un numero random
function generateRandomNumber(min, max) {
    const range = max - min + 1;
    return Math.floor(Math.random() * range + min)
}

// genero l'array con tot numeri
function generateArrayOfNunmbers(min, max, totNumbers) {
    const arrayOfNumbers = [];
    while (arrayOfNumbers.length < totNumbers) {
        let uniqueNumber = generateRandomNumber(min, max);

        if (!arrayOfNumbers.includes(uniqueNumber)) {
            arrayOfNumbers.push(uniqueNumber)
        }
    }
    return arrayOfNumbers;
}