const digits = document.querySelectorAll('.digit');
const operations = document.querySelectorAll('.operation')
const equal = document.getElementById('equal-btn');
const display = document.querySelector('#display > .output');
const displayPlaceholder = document.querySelector('#display > .placeholder');
const clear = document.getElementById('clear-btn');

let a = '';
let operator;
let b = '';
let result;
let lastActiveOperation;


// Handling changes on display

let observer = new MutationObserver(() => {
    displayPlaceholder.remove();
});
observer.observe(display, {childList: true});


// Main operation

function operate(operator, a, b) {

    if (operator === 'add') {
        result = add(a, b);
        // return result;
    } else if (operator === 'subtract') {
        result = subtract(a, b);
        // return result;
    } else if (operator === 'multiply') {
        result = multiply(a, b);
        // return result;
    } else if (operator === 'divide') {
        result = divide(a, b);
        //return result;
    }

}

// Sub operations

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Digit buttons

digits.forEach(btn =>{
    btn.addEventListener('click', () => {

        if (!operator) {

            display.append(btn.value);
            a += btn.value;
            a = parseInt(a);

        } else if (operator) {

            display.append(btn.value);
            b += btn.value;
            b = parseInt(b);

        }

    });
});

// Operation buttons

operations.forEach(btn => {
    btn.addEventListener('click', (e) => {
        target = e.target;
        operator = btn.value;
        display.append(btn.textContent);
        
        for (var i = 0; i < operations.length; i++) {

            // Disable other operations if one is already selected
            operations[i].disabled = true;
            operations[i].style.backgroundColor = '#343434';

            if (operator === btn.value) {
                btn.style.backgroundColor = 'green';
            }

        }
    })
});

// Equal button

equal.addEventListener('click', () => {

    // Prevent dividing by 0

    if ((operator === 'divide') && (a === 0 || b === 0)) {
        alert('You can\'t do that!');
        return;
    }

    if ((!a || !operator || !b) || (a && !operator)) {

        return; // Prevent function from executing if variables are empty

    } else {

        equal.disabled = false;
        operate(operator, a, b);

        //Round to 4 decimals

        if (!(result % 1 === 0)) {
            result = result.toFixed(4);
        }

        display.textContent = result;

        a = result;
        operator;
        b = '';

        // Reset operations buttons once operation is done
        for (var i = 0; i < operations.length; i++) {
            operations[i].disabled = false;
            operations[i].style.removeProperty('background-color');
        }

    }

});

// Clear button

clear.addEventListener('click', () => {
    location.reload();
});