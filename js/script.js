let display = document.getElementById('display');
let currentValue = '';
let previousValue = '';
let operator = '';
let shouldResetDisplay = false;

function appendNumber(num) {
    if (shouldResetDisplay) {
        display.value = num;
        shouldResetDisplay = false;
    } else {
        display.value += num;
    }
    currentValue = display.value;
}

function appendOperator(op) {
    if (currentValue === '') return;

    if (operator !== '' && !shouldResetDisplay) {
        calculate();
    }

    previousValue = currentValue;
    operator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (operator === '' || currentValue === '' || previousValue === '') {
        return;
    }

    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'Erreur: Division par zéro';
                shouldResetDisplay = true;
                operator = '';
                currentValue = '';
                previousValue = '';
                return;
            }
            result = prev / current;
            break;
        case '.':
            if (currentValue.includes('.')) return;
            currentValue += '.';
            display.value = currentValue;
            return;
        default:
            return;
    }

    result = Math.round(result * 100000000) / 100000000;
    display.value = result;
    currentValue = result.toString();
    previousValue = '';
    operator = '';
    shouldResetDisplay = true;
}

function clearDisplay() {
    display.value = '';
    currentValue = '';
    previousValue = '';
    operator = '';
    shouldResetDisplay = false;
}

function deleteLast() {
    if (shouldResetDisplay) return;
    
    currentValue = currentValue.slice(0, -1);
    display.value = currentValue;
    
    if (currentValue === '') {
        display.value = '';
    }
}

// Support pour le clavier
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        appendOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === '.') {
        appendNumber('.');
    }
});
