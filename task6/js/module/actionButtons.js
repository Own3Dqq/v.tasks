const actionButtons = () => {
	function sortByList(array) {
		const arr = [...array];
		arr.sort((a, b) => {
			return b.classList.contains('selected') - a.classList.contains('selected');
		});

		ul.innerHTML = '';

		for (let item of arr) {
			ul.insertAdjacentElement('beforeend', item);
		}
	}

	const randomToDo = () => {
		const randomList = ['Buy a new book', 'Buy products', 'Read books', 'Learn react', 'Watch movie'];
		return randomList[Math.floor(Math.random() * 5)];
	};

	function deleteSelectedItem(collection) {
		if (collection instanceof HTMLCollection && collection.length) {
			Array.from(collection).forEach((element) => {
				if (element.classList.contains('selected')) {
					element.remove();
				}
			});
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
