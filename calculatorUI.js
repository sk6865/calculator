const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const clear = document.getElementById('clear');
const sqrt = document.getElementById('square-root');
const squared = document.getElementById('squared');
const negative = document.getElementById('negative');
const equals = document.getElementById('equals');
const screen = document.querySelector('.screen');
let c = 0;
let t = false;

function displayNumber(n) {
	const display = screen.textContent;
	if (!t) {
		screen.textContent = n;
		t = true;
		clear.textContent = 'C';
	} else if (checkDisplay(n, display)) {
		screen.textContent = (display == '0') ? n : display + n;
		clear.textContent = 'C';
	}
}

function checkDisplay(n, display) {
	const maxLength = (display.includes('.') || display.includes('-')) ? 10 : 9;
	if (display.length >= maxLength) {return false;}
	if (display.includes('.') && n == '.') {return false;}
	return true;
}

function operate(operator) {
	const display = parseFloat(screen.textContent);
	let result;
	if (operator == 'divide') {
		result =  c / display;
	} else if (operator == 'multiply') {
		result = c * display;
	} else if (operator == 'subtract') {
		result = c - display;
	} else if (operator == 'add') {
		result = c + display;
	}
	return round(result);
}

function round(n) {
	const str = n.toString();
	const maxLength = (str.includes('.') || str.includes('-')) ? 10 : 9;
	let result = n;
	if (str.length > maxLength && str.includes('.')) {
		const decimalPlaces = str.slice(str.indexOf('.')+1).length;
		const difference = str.length - maxLength;
		result = parseFloat(n.toFixed(decimalPlaces - difference));
	}
	if (result.toString().length > maxLength) {
		return 9999999999;
	}
	return result;
}

for (let number of numbers) {
	number.addEventListener('click', () => displayNumber(number.id));
}

clear.addEventListener('click', function() {
	const active = document.querySelector('.active');
	if (clear.textContent == 'AC') {
		if (active) {active.classList.remove('active');}
		screen.textContent = '0';
		c = 0;
	} else {
		screen.textContent = '0';
		clear.textContent = 'AC';
	}
});

negative.addEventListener('click', function() {
	const display = screen.textContent;
	if (display == '0' || display == '.') {return;}
	screen.textContent = (display[0]=='-') ? display.slice(1) : '-'+display;
});

squared.addEventListener('click', function() {
	const display = parseFloat(screen.textContent);
	screen.textContent = round(Math.pow(display, 2));
});

sqrt.addEventListener('click', function() {
	const display = parseFloat(screen.textContent);
	screen.textContent = round(Math.sqrt(display));
});

for (let operator of operators) {
	operator.addEventListener('click', function() {
		const active = document.querySelector('.active');
		if (active) {
			c = operate(active.id);
			screen.textContent = c;
			active.classList.remove('active');
		} else {
			c = parseFloat(screen.textContent);
		}
		operator.classList.add('active');
		t = false;
	});
}

equals.addEventListener('click', function() {
	const active = document.querySelector('.active');
	if (active) {
		screen.textContent = operate(active.id);
		clear.textContent = 'AC';
		c = 0;
		active.classList.remove('active');
	}
	t = false;
});

window.addEventListener('keypress', function(e) {
	const code = e.keyCode;
	let button;
	if (code >= 48 && code <= 57) {
		button = document.getElementById(code-48);
	} else if (code == 46) {
		button = document.getElementById('.');
	} else if (code == 13) {
		e.preventDefault();
		button = document.getElementById('equals');
	} else if (code == 43) {
		button = document.getElementById('add');
	} else if (code == 45) {
		button = document.getElementById('subtract');
	} else if (code == 42) {
		button = document.getElementById('multiply');
	} else if (code == 47) {
		button = document.getElementById('divide');
	}
	
	if (button) {button.click();}
});