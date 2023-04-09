function unique() {
	const drinksList = document.querySelector('#drinks-list');
	const liElements = Array.from(drinksList.querySelectorAll('li'));

	const uniqueTextValues = [...new Set(liElements.map((li) => li.textContent))].sort();

	drinksList.innerHTML = '';
	uniqueTextValues.forEach((value) => {
		const li = document.createElement('li');
		li.textContent = value;
		drinksList.appendChild(li);
	});
}

unique();
