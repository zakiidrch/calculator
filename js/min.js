let operator = '';
let previousValue = '';
let currentValue = '';

let numberBtns = document.querySelectorAll('.btns .num');
let operationBtns = document.querySelectorAll('.btns .oprate');
let equalBtn = document.querySelector('.equal');
let deleteBtn = document.querySelector('.delete');
let resetBtn = document.querySelector('.reset');
let previousOpration = document.querySelector('.previous-opration');
let currentOpration = document.querySelector('.current-opration');


function calculator() {
    numberBtns.forEach(number => {
        number.addEventListener('click', (e) => {
            handleNumber(e.target.textContent)
            currentOpration.textContent = currentValue;
        })
    })

    operationBtns.forEach(op => {
        op.addEventListener('click', (e) => {
            if(currentValue != '') {
                handleOprator(e.target.textContent);
                previousOpration.textContent = `${previousValue} ${operator}`;
                currentOpration.textContent = currentValue;
            }
        })
    })

    equalBtn.addEventListener('click', (e) => {
        if(currentValue !== '' && previousValue !== '') {
            previousOpration.textContent = `${previousValue} ${operator} ${currentValue}`;
            currentValue = operate();
            currentOpration.textContent = currentValue;
        }

    })

    deleteBtn.addEventListener('click', (e) => {
        currentValue = deleteNumber();
        if(currentValue !== 0) {
            currentOpration.textContent =  currentValue;
        } else {
            currentOpration.textContent = '0';
            currentValue = '';
        }
        
    })

    resetBtn.addEventListener('click', () => {
        currentOpration.textContent = '0';
        previousOpration.textContent = '';
        operator = '';
        currentValue = '';
        previousValue = '';
    })
}

// function to get number from user click button
function handleNumber(num) {
    if(currentValue.length <= 5) {
        currentValue += num;
    }
}

// function to get number from user click button
function handleOprator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = '';
}

// function to delet one digit from number if user mistake
function deleteNumber() {
    return parseInt(+currentValue / 10); 
}

// function for all operation of calculator
function operate() {
    let n1 = Number(previousValue);
    let n2 = Number(currentValue);
    
    if(operator === '+') {
        n1 += n2;
    }
    else if(operator === '-') {
        n1 -= n2;
    }
    else if(operator === '*') {
        n1 *= n2;
    }
    else if(operator === '/') {
        if(n2 === 0) {
            return `Infinity`;
        } else {
            n1 /= n2;
        }
    }
    else if(operator === '%') {
        n1 %= n2;
    }

    n1 = roundNumber(n1, n2);
    return n1;
}

// function round big number after , to small
function roundNumber(n1, n2) {
    n2 = n2.toString().length;
    if(n2 === 6) {
        return Math.round(n1 * 100000) / 100000;
    } else {
        return Math.round(n1 * 1000) / 1000;
    }
}

calculator();








