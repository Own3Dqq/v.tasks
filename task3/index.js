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
- updateStudentByName(new Student(...), name) - знайти об'єкт студента по name та замінити на student (новий екземпляр ФК Student) */

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
}

Human.prototype.getFullName = function () {
	return `${this.name} ${this.surname}`;
};
Human.prototype.setFullName = function (fullName) {
	return ([this.name, this.surname] = fullName.split(' '));
};

Human.prototype.constructor = Human;
/*  */
const user1 = new Human({ name: 'Vladyslav', surname: 'Tsarik', age: 26 });

console.dir(user1);

/* 2) */

function Student({ name, surname, age, mark }) {
	Human.call(this, { name, surname });
	this.age = age;
	this.mark = mark;

	Student.prototype.getAverageMark = function () {
		return this.mark.reduce((a, b) => a + b) / mark.length;
	};
	Student.prototype.getMinMark = function () {
		return Math.min(...this.mark);
	};
	Student.prototype.getMaxMark = function () {
		return Math.max(...mark);
	};
}

/*  */
const Student1 = new Student({ name: 'John', surname: 'Black', age: 25, mark: [3, 3, 4, 5, 3, 4, 5, 3] });
const Student2 = new Student({ name: 'Bob', surname: 'White', age: 23, mark: [5, 4, 4, 4, 4, 4, 4, 3] });
const Student3 = new Student({ name: 'Willyam', surname: 'Skoll', age: 21, mark: [3, 3, 4, 3, 5, 3, 4, 3] });
const Student4 = new Student({ name: 'Jayne', surname: 'Doe', age: 22, mark: [5, 5, 5, 5, 4, 5, 5, 3] });
const Student5 = new Student({ name: 'Kate', surname: 'Klime', age: 24, mark: [5, 5, 5, 5, 5, 5, 5, 4] });
/*  */
console.dir(Student1);
console.dir(Student2);
console.dir(Student3);
console.dir(Student4);
console.dir(Student5);
console.log(Student1.getAverageMark());
console.log(Student1.getMinMark());
console.log(Student1.getMaxMark());

/* 3) */
function Teacher({ name, surname, age, students }) {
	Human.call(this, { name, surname });
	this.age = age;
	this.students = students;
	/* Methods */
	Teacher.prototype.getListOfNamesByAverageMark = function () {
		const studentAvarageMark = this.students
			.map((item) => {
				item.averageMark = item.getAverageMark();
				return item;
			})
			.sort((a, b) => {
				return b.averageMark - a.averageMark;
			});

		return studentAvarageMark.map((item) => {
			delete item.averageMark;
			return item.name;
		});
	};

	Teacher.prototype.getStudentByName = function (name) {
		const searchStudentByName = students.find((item) => item.name === name);

		if (searchStudentByName) {
			return searchStudentByName;
		}

		throw new TypeError(
			'Error: Student with this name not found, please make sure you input the correct name of student. '
		);
	};

	Teacher.prototype.removeStudentByName = function (name) {
		const findStudentIndexOnArray = this.students.findIndex((item) => {
			return item.name === name;
		});

		if (findStudentIndexOnArray > 0) {
			students.splice(findStudentIndexOnArray, 1);
			return students;
		}

		throw new TypeError(
			'Error: Student with this name not found, please make sure you input the correct name of student. '
		);
	};

	Teacher.prototype.updateStudentByName = function (object, name) {
		const indexStudentOnArray = this.students.findIndex((item) => {
			return item.name === name;
		});

		students.splice(indexStudentOnArray, 1, object);
		return students;
	};
}

Teacher.prototype.constructor = Human;

const teacher1 = new Teacher({
	name: 'Tatiana',
	surname: 'Glushko',
	age: 30,
	students: [Student1, Student2, Student3, Student4, Student5],
});

console.dir(teacher1);
console.log(teacher1.getListOfNamesByAverageMark());
console.log(teacher1.getStudentByName('Kate'));
console.log(teacher1.removeStudentByName('Bob'));
console.log(
	teacher1.updateStudentByName(
		new Student({ name: 'Alex', surname: 'Switcher', age: 23, mark: [3, 5, 4, 5, 4, 5, 3, 3] }),
		'Kate'
	)
);
console.log(teacher1.students);
