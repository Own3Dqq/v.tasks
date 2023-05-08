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
		const randomList = ['buy a new book', 'buy products', 'read books', 'learn react', 'watch movie'];

		return randomList[Math.floor(Math.random() * 5)];
	};

	function deleteSelectedItem(array) {
		if (!Array.isArray(array) && array.length !== 0) {
			for (let i = array.length - 1; i >= 0; i--) {
				const element = array[i];
				if (element.classList.contains('selected')) {
					element.parentNode.removeChild(element);
				}
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
