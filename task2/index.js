/* Ти маєш реалізувати рекурсивну функцію, яка зводить число в ступінь.
 - Число, яке треба піднести до ступеню, передається як перший аргумент у функції;
 - Ступінь передається як другий аргумент у функцію pow (num, degree).
(не можна використовувати Math.pow(), або оператор **)
*/

const pow = (number, degree) => {
	if (degree > 0 && Number.isInteger(number) && Number.isInteger(degree)) {
		return degree === 1 ? number : number * pow(number, degree - 1);
	}

	throw new TypeError(`function pow() expects number as first, and positive number as second.`);
};

console.log(pow(2, 1));
console.log(pow(-5, 2));
// console.log(pow(5, -1));

/* 
Написати функцію, яка приймає 1 параметр. і підсумовує з тим, що передали перший раз і т. д. Все це із замиканнями, наприклад:

sum(3) = 3
sum(5) = 8
sum(20) = 28 
*/

const sum = () => {
	let result = 0;
	return (value) => {
		return (result += value);
	};
};

let addNumber = sum();

console.log(addNumber(3));
console.log(addNumber(5));
console.log(addNumber(320));

/* За допомогою замикання написати ф-цію structureUserInfo, яка збирає інфо-об'єкт про користувача з аргументів.
Приклад:
structureUserInfo('John')('Admin') // {role: "Admin", name: "John"} */

/* 1) */
const structUserInfo = (position) => {
	return (name) => {
		return (age) => {
			return (religion) => {
				return {
					position,
					name,
					age,
					religion,
				};
			};
		};
	};
};

console.log(structUserInfo('Admin')('Vladyslav')(27)('Atheist'));

/* 2) */
const structUserInfo2 = (position) => (name) => (age) => (religion) => {
	return { position, name, age, religion };
};
