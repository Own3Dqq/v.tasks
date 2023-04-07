class Human {
	constructor({ name, surname, age }) {
		this.name = name;
		this.surname = surname;
		this.age = age;
	}

	getFullName() {
		return `${this.name} ${this.surname}`;
	}

	setFullName(fullName) {
		return ([this.name, this.surname] = fullName.split(' '));
	}
}

class Student extends Human {
	constructor({ name, surname, age, mark }) {
		super({ name, surname });
		this.age = age;
		this.mark = mark;
	}

	getAverageMark() {
		return this.mark.reduce((a, b) => a + b) / this.mark.length;
	}

	getMinMark() {
		return Math.min(...this.mark);
	}

	getMaxMark() {
		return Math.max(...this.mark);
	}
}

/* FakeStudent */
/* 
  + Створити клас FakeStudent, який успадковується від класа Student.
  Цей клас імітує студента-чітера, тому він буде завищувати оцінку. Клас повинен створювати приватну властивість chetedMarks, яка отримує данні від приватного метода cheat.
  Метод cheat множить всі оцінка на два, а якщо результат перевущує максимальну оцінку (наприклад, 10 або 12), тоді залишаємо максимальну оцінку.
  Клас FakeStudent також перевизначає методи averageMark, maxMark, minMark так, що тепер вони використовують this.#chetedMarks замість this.marks.
  Один інстанс класа FakeStudent треба додати до групи студентів, яку і отримує клас Teacher.
  Додайте класу Teacher метод findFakeStudent.
  Метод повертатиме рядок, де присутні ім'я фейк-студента та його дійсні оцінки.
*/

class FakeStudent extends Student {
	#cheatMarks = 0;

	constructor({ name, surname, age, mark }) {
		super({ name, surname, age });
		this.mark = mark;
		this.#cheatMarks = this.#cheat();
	}

	#cheat() {
		return this.mark.map((item) => {
			const newValue = item * 2;
			return newValue > 12 ? 12 : newValue;
		});
	}

	getAverageMark() {
		return this.#cheatMarks.reduce((a, b) => a + b) / this.mark.length;
	}

	getMinMark() {
		return Math.min(...this.#cheatMarks);
	}

	getMaxMark() {
		return Math.max(...this.#cheatMarks);
	}
}

const fStudent1 = new FakeStudent({ name: 'Hugg', surname: 'Hitler', age: '33', mark: [5, 6, 7, 5, 4, 9] });

class Teacher extends Human {
	constructor({ name, surname, age, students }) {
		super({ name, surname });
		this.age = age;
		this.students = students;
	}

	getListOfNamesByAverageMark() {
		return this.students
			.map((student) => ({ name: student.name, averageMark: student.getAverageMark() }))
			.sort((a, b) => b.averageMark - a.averageMark)
			.map(({ name }) => name);
	}
	getStudentByName(name) {
		const searchStudentByName = this.students.find((student) => student.name === name);

		return searchStudentByName
			? searchStudentByName
			: (() => {
					throw new TypeError(
						'Error: Student with this name not found, please make sure you input the correct name of student. '
					);
			  })();
	}
	removeStudentByName(name) {
		const findStudentIndexOnArray = this.students.findIndex((student) => student.name === name);

		if (findStudentIndexOnArray >= 0) {
			this.students.splice(findStudentIndexOnArray, 1);
			return this.students;
		}

		throw new TypeError(
			`Error: Student ${name} not found. Please make sure you input the correct name of the student.`
		);
	}
	updateStudentByName(updatedStudent, name) {
		const index = this.students.findIndex((student) => student.name === name);

		if (index === -1) {
			throw new TypeError(
				`Error: Student ${name} not found. Please make sure you input the correct name of the student.`
			);
		}

		this.students.splice(index, 1, updatedStudent);
		return this.students;
	}
	findFakeStudent() {
		return this.students.filter((item) => {
			return item.constructor !== Student ? item : undefined;
		});
	}
}

const user1 = new Human({ name: 'Vladyslav', surname: 'Tsarik', age: 26 });
const student1 = new Student({ name: 'John', surname: 'Black', age: 25, mark: [3, 3, 4, 5, 3, 4, 5, 3] });
const student2 = new Student({ name: 'Bob', surname: 'White', age: 23, mark: [5, 4, 4, 4, 4, 4, 4, 3] });
const student3 = new Student({ name: 'Willyam', surname: 'Skoll', age: 21, mark: [3, 3, 4, 3, 5, 3, 4, 3] });
const student4 = new Student({ name: 'Jayne', surname: 'Doe', age: 22, mark: [5, 5, 5, 5, 4, 5, 5, 3] });
const student5 = new Student({ name: 'Kate', surname: 'Klime', age: 24, mark: [5, 5, 5, 5, 5, 5, 5, 4] });
const student6 = new FakeStudent({ name: 'Hugo', surname: 'Dedrem', age: 33, mark: [5, 6, 7, 5, 4, 9, 3, 7] });

const teacher1 = new Teacher({
	name: 'Tatiana',
	surname: 'Glushko',
	age: 30,
	students: [student1, student2, student3, student4, student5, student6],
});
