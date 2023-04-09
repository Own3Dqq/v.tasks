function listItemsToUniqueAndSort() {
	const drinksList = document.querySelector('#drinks-list');
	const liElements = Array.from(drinksList.querySelectorAll('li'));

	const uniqueTextValues = [...new Set(liElements.map((li) => li.textContent))].sort();

	drinksList.innerHTML = '';
	uniqueTextValues.forEach((value) => {
		drinksList.innerHTML += `<li>${value}</li>`;
	});
}

listItemsToUniqueAndSort();
