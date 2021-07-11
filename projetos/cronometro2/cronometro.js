"use strict"

let hora = 0;
let minutos = 0;
let segundos = 0;

let tempo = 1000; // quantos milésimos equivalem à 1 segundo
let cron;

function start() {
    cron = setInterval(() => {timer(); }, tempo);
}

function pause() {
    clearInterval(cron);
}

function stop() {
    clearInterval(cron);
    hora = 0;
    minutos = 0;
    segundos = 0;

    document.getElementById('counter').innerText = '00 : 00 : 00'

}

function timer() {
    segundos++;

    if(segundos == 60) {
        segundos = 0;
        minutos++;

        if(minutos == 60){
            minutos = 0;
            hora++;
        }
    }
    let format = (hora < 10 ? '0' + hora : hora) + ' : ' + (minutos < 10 ? '0' + minutos : minutos) + ' : ' + (segundos < 10 ? '0' + segundos : segundos); 
    document.getElementById('counter').innerText = format
}