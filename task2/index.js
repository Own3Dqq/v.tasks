/* Ти маєш реалізувати рекурсивну функцію, яка зводить число в ступінь.
 - Число, яке треба піднести до ступеню, передається як перший аргумент у функції;
 - Ступінь передається як другий аргумент у функцію pow (num, degree).
(не можна використовувати Math.pow(), або оператор **)
*/

const pow = (number, degree) => {
	if (!isNaN(number) || !isNaN(degree)) return degree == 1 ? number : number * pow(number, degree - 1);
	throw new TypeError('function pow() expects number as first and second argument.');
};

alert(pow('2', 5));
