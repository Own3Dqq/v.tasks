/* Ти маєш реалізувати рекурсивну функцію, яка зводить число в ступінь.
 - Число, яке треба піднести до ступеню, передається як перший аргумент у функції;
 - Ступінь передається як другий аргумент у функцію pow (num, degree).
(не можна використовувати Math.pow(), або оператор **)
*/

const pow = (number, degree) => {
	if (degree > 0 && Number.isInteger(number) && Number.isInteger(degree)) {
		return degree == 1 ? number : number * pow(number, degree - 1);
	}

	throw new TypeError('function pow() expects number as first and second argument.');
};

console.log(pow(2, 4));

/* 
Написати функцію, яка приймає 1 параметр. і підсумовує з тим, що передали перший раз і т. д. Все це із замиканнями, наприклад:

sum(3) = 3
sum(5) = 8
sum(20) = 28 
*/

function sum() {
	let result = 0;
	return function (value) {
		return (result += value);
	};
}

let addNumber = sum();

console.log(addNumber(3));
console.log(addNumber(5));
console.log(addNumber(320));
