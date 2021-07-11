function insertValue(entry) {
    document.getElementById('input').value += entry;
}

function clearValue() {
    document.getElementById('input').value = '';
}

function calcPorcentage() {
    document.getElementById('input').value /= 100;
}

function invertValue() {
    calcValue();
    document.getElementById('input').value *= -1;
}

function calcValue() {
    if(document.getElementById('input').value == '') {
        document.getElementById('input').value = '';
    } else {
        const TOTAL = document.getElementById('input').value;
        document.getElementById('input').value = eval(TOTAL);
    }
}

