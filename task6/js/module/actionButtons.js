const actionButtons = () => {
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
	
	function deleteSelectedItem(elems) {
		for (let elem of elems) {
			if (elem.classList.contains('selected')) {
				elem.remove();
			}
		}
	}

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
};

export default actionButtons;
