/* Реализовать multiSelecte в верх, а так же поведение как в проводнике, при выбранном элементе верх и вниз срабатывает функция. */

const selectListItem = () => {
	let ul = document.querySelector('#ul');

	ul.addEventListener('mousedown', function (e) {
		e.preventDefault();
	});

	ul.addEventListener('click', function (e) {
		/* если нажатие не по li сбрасывает все выделение элементы. */
		if (e.target === this) {
			clearSelected(ul.children);
			return;
		}

		if (e.ctrlKey || e.metaKey) {
			e.target.classList.toggle('selected');
		} else if (e.shiftKey) {
			selectedRange(findFirstSelectedElement(this.children), e.target, this.children);
		} else {
			clearSelected(this.children);
			addSelected(e.target);
		}
	});

	function findFirstSelectedElement(array) {
		return Array.from(array).find((item) => item.classList.contains('selected')) || 0;
	}

	function selectedRange(firstSelectedElement, currentSelectedElement, array) {
		const elemsArr = Array.from(array);
		const firstElementIndex = elemsArr.indexOf(firstSelectedElement);
		const targetElementIndex = elemsArr.indexOf(currentSelectedElement);

		if (firstElementIndex < targetElementIndex) {
			for (let i = firstElementIndex; i <= targetElementIndex; i++) {
				addSelected(array[i]);
			}
		} else {
			for (let i = targetElementIndex; i <= firstElementIndex; i++) {
				addSelected(array[i]);
			}
		}
	}

	function clearSelected(elems) {
		for (let elem of elems) {
			elem.classList.remove('selected');
		}
	}

	function addSelected(target) {
		target.classList.add('selected');
	}
};

export default selectListItem;
