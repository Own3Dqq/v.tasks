let ul = document.querySelector('#ul');

ul.addEventListener('mousedown', function (e) {
	e.preventDefault();
});

ul.addEventListener('click', function (e) {
	if (e.target === this) {
		clearSelected(this.children);
		return false;
	}

	if (e.target.classList.contains('selected')) {
		return e.target.classList.toggle('selected');
	}

	if (!e.ctrlKey) {
		clearSelected(this.children);
	}

	addSelected(e.target);
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

const randomToDo = () => {
	const randomList = ['buy a new book', 'buy products', 'read books', 'learn react', 'watch movie'];

	return randomList[Math.floor(Math.random() * 5)];
};

const actionOnList = document.querySelector('.action');

actionOnList.addEventListener('click', (e) => {
	const element = document.createElement('li');

	switch (e.target.dataset.action) {
		case 'addToStart':
			ul.insertAdjacentElement('afterbegin', element);
			element.innerText = randomToDo();
			break;
		case 'addToEnd':
			ul.insertAdjacentElement('beforeend', element);
			element.innerText = randomToDo();
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
