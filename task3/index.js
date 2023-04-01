/* 1. Створити ФК Human, яка приймає в аргументи об'єкт і створює властивості name, surname та age. ФК Human також містить методи:

getFullName() - віддає стрінгу повного ім'я, утвореного з name, surname,

setFullName(fullName) - розбиває рядок на name, surname
	
Властивості surname, name і age мають бути у всіх ФК. Позбавтеся дублювання за допомогою заміни контексту.

2. Створити ФК* Student, яку я зможу використати так:

let s = new Student(info) // де info.marks = [10,9,8,1,10] та всі інші властивості name, age …

У кожного студента повинні бути такі методи

getAverageMark() - повертає середню оцінку
getMinMark() - повертає найменшу оцінку
getMaxMark() - повертає максимальну оцінку

3. Створити ФК Teacher яка приймає в аргументи об'єкт і створює проперті group (масив не менше 5-ти студентів створених за допомогою ФК Student) та містить методи:

- getListOfNamesByAverageMark() - віддає масив імен студентів відсортований за найвищою середньою оцінкою.
- getStudentByName(name) - отримати один об'єкт студента за ім'ям.
- removeStudentByName(name) - видалити об'єкт студента, знайденого за ім'ям.
- updateStudentByName(new Student(...), name) - знайти об'єкт студента по name та замінити на student (новий екземпляр ФК Student)s */

/* Підсказки та правила, яких потрібно дотримуватися при виконанні завдання

- Всі "діти" конструктори повинні успадковувати getFullName та setFullName.
- Всі "діти" конструктори не повинні дублювати створення полів у конструкторі.Позбавтеся дублювання за допомогою заміни контексту.
- Всі конструктори приймають об'єкт у аргументи, а не аргументи через кому
- Методи описуємо у прототипі
- Слідкуйте, щоб ваш код не повторювався - якщо потрібно створюйте додаткові методи і не забувайте користуватися готовими.
- Перевіряйте ваш код декілька разів
- Читайте уважно умову завдання.
*/

function Human({ name, surname, age }) {
	this.name = name;
	this.surname = surname;
	this.age = age;

	Human.prototype.getFullName = function () {
		return `${this.name} ${this.surname}`;
	};
	Human.prototype.setFullName = function (fullName) {
		return ([this.name, this.surname] = fullName.split(' '));
	};
}

const user1 = new Human({ name: 'Vladyslav', surname: 'Tsarik', age: 26 });

console.dir(user1);

console.log(user1.setFullName('Vladyslav Tsarik'));
console.log(user1.getFullName());

/* 2) */

function Student({ name, surname, age, mark }) {
	Human.call(this, { name, surname });
	this.age = age;
	this.mark = mark;

	Student.prototype.getAverageMark = function () {
		return mark.reduce((a, b) => a + b) / mark.length;
	};
	Student.prototype.getMinMark = function () {
		return Math.min(...mark);
	};
	Student.prototype.getMaxMark = function () {
		return Math.max(...mark);
	};
}
/*  */
// Student.prototype = Object.create(Human.prototype);
// Student.prototype.constructor = Student;
/*  */

const Student2 = new Student({ name: 'John', surname: 'Black', age: 73, mark: [2, 3, 4, 5, 3, 4, 5, 3] });
3;
const Student3 = new Student({ name: 'Bob', surname: 'White', age: 45, mark: [2, 3, 4, 5, 3, 4, 5, 3] });
const Student4 = new Student({ name: 'Willyam', surname: 'Skoll', age: 15, mark: [2, 3, 4, 5, 3, 4, 5, 3] });

console.dir(Student2);
console.dir(Student3);
console.dir(Student4);

const student1 = new Student({ name: 'Oleg', surname: 'Saske', age: 29, mark: [3, 4, 4, 3, 3, 3, 5, 3, 5] });

console.log(student1);
/* 3) */

function Teacher({ name, surname, students }) {
	Human.call(this, { name, surname });

	this.students = students;
}

const teacher1 = new Teacher('Tatiana', 'Glushko', []);
