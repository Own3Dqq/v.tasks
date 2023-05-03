const selectListItem = () => {
	let ul = document.querySelector('#ul');
	// let lastClickedElem;
	ul.addEventListener('mousedown', function (e) {
		e.preventDefault();
	});

	ul.addEventListener('click', function (e) {
		if (e.target === this) {
			clearSelected(this.children);
			return;
		}

		if (e.ctrlKey || e.metaKey) {
			e.target.classList.toggle('selected');
		} else if (e.shiftKey) {
			selectRange(e.target, this.children);
		} else {
			clearSelected(this.children);
			addSelected(e.target);
		}

		// lastClickedElem = e.target;

		addSelected(e.target);
	});

	function selectRange(target, elems) {
		const elemsArr = Array.from(elems);
		const targetIndex = elemsArr.findIndex((el) => el === target);

		for (let i = 0; i <= targetIndex; i++) {
			addSelected(elems[i]);
		}
	}

	function multiSelecte(elements) {
		for (let elem of elements) {
			elem.classList.contains('selected');
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

	function deleteSelectedItem(elems) {
		for (let elem of elems) {
			if (elem.classList.contains('selected')) {
				elem.remove();
			}
		}
	}
};

export default selectListItem;
