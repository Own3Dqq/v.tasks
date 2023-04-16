/* 
Частина 1

Вам потрібно взяти код, написаний на уроці (приклад зі Списком справ) та не змінюючи його доопрацювати:

при кліку без жодної затиснутої клавіши підсвічувати натиснутий елемент ( це вже зробленно в коді з урока)
при кліку ( із затиснутим CTRL (я так робив з alt, а вам треба змінити кнопку на CTRL чи COMMAND ) ) на li підсвічувати його, не очищаючи решту виділених li
при кліку ( із затиснутим CTRL або COMMAND) на підсвічений li знімати підсвічування тільки у цього li, не очищаючи решту виділених li (цього вже в коді нема - ви допрацьовуєте це)
при кліки ( із затиснутим SHIFT ) - підсвічувати все li аж до того, на який ви натиснули (від останнього підсвіченого або якщо список не має жодного підсвіченого li - від початку) (цього вже в коді нема - ви допрацьовуєте це)

Частина 2
Додати div-контейнер із кнопками:

Додати елемент на початок,
Додати елемент у кінець,
Видалити вибрані справи (підсвічені li),
Відсортувати список ( підсвічені нагору)

Tips
Клік по кнопці реалізує відповідну дію (додати, видалити, відсортувати).

Щодо 1 і 2 кнопок - можна додавати справа з рандомним текстом

Обробник повинен бути один для контейнера з кнопками (прийом делегування). Використовуйте data атрибутами

+ бали за стилі; за код на класах

P.S Сортуючи елементи списку, вам потрібно буде вставляти li.selected в початку ul. Дбати про їхнє видалення зі старого місця не потрібно. Document не може містити два однакові вузли, тому DOM сам їх видалить.
*/

let ul = document.querySelector('#ul');

ul.addEventListener('mousedown', function (e) {
	e.preventDefault();
});

ul.addEventListener('click', function (e) {
	if (e.target == this) {
		clearSelected(this.children);
		return false;
	}

	if (!e.ctrlKey) {
		clearSelected(this.children);
	}

	if (e.target.classList.toggle('selected')) addSelected(e.target);
});

function clearSelected(elems) {
	for (let elem of elems) {
		elem.classList.remove('selected');
	}
}

function addSelected(target) {
	target.classList.add('selected');
}

function deleteSelectedItem(elems) {
	for (let elem of elems) {
		if (elem.classList.contains('selected')) {
			elem.remove();
		}
	}
}

function sortByList(elems) {
	const arr = [...elems];
	arr.sort((a, b) => {
		return b.classList.contains('selected') - a.classList.contains('selected');
	});

	ul.innerHTML = '';

	for (let item of arr) {
		ul.insertAdjacentElement('beforeend', item);
	}
}

const actionOnList = document.querySelector('.action');

actionOnList.addEventListener('click', (e) => {
	const element = document.createElement('li');

	switch (e.target.dataset.action) {
		case 'addOnStart':
			ul.insertAdjacentElement('afterbegin', element);
			element.innerText = 'Element_1';
			break;
		case 'addOnEnd':
			ul.insertAdjacentElement('beforeend', element);
			element.innerText = 'Element_1';
			break;
		case 'delete':
			deleteSelectedItem(ul.children);
			break;

		case 'sort':
			sortByList(ul.children);
			break;

		default:
			break;
	}
});
