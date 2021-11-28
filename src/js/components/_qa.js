// QA

class Qa {
	constructor(selector) {
		this.qaContainer = selector;
		this.btns = this.qaContainer.querySelectorAll('.topics__btn');
		this.items = this.qaContainer.querySelectorAll(`.qa-item`);
		this.preview = this.qaContainer.querySelector('.qa__topics-line');
		this.previewElements = ``;
		this.previewItems = null;
		this.prevTargets = null;
	}

	insertPreviewElements() {
		this.btns.forEach((el) => {
			this.previewElements += `
			<span class="qa__topic" data-path="${el.dataset.path}">
					${el.textContent}</span>
			`
		});
		this.preview.innerHTML = this.previewElements;
		this.previewItems = this.preview.querySelectorAll(`.qa__topic`);
	}
	getPath(target) {
		return target.dataset.path;
	}
	setClasses(target, path) {
		target.classList.add('topics__btn--active');
		target.disabled = true;
		target.ariaExpanded = true;
		document.querySelector(`.qa-item[data-path="${path}"]`).classList.add('qa-item--active');
		this.preview.querySelector(`.qa__topic[data-path="${path}"]`).classList.add('qa__topic--active');
	}

	computePreviewTranslateWidth(path) {
		let previewElementsWidth = 0;
		for (let index = 0; index < this.previewItems.length; index++) {
			const element = this.previewItems[index];
			if (element.dataset.path === path) {
				break;
			}
			previewElementsWidth += element.offsetWidth;
		}
		return previewElementsWidth;
	}

	setPrevTargetObj(target, path) {
		this.prevTargets = {
			btn: target,
			line: this.preview.querySelector(`.qa__topic[data-path="${path}"]`),
			question: this.qaContainer.querySelector(`.qa-item[data-path="${path}"]`)
		}
	}

	removePrevClasses() {
		if (this.prevTargets) {
			this.prevTargets.btn.classList.remove('topics__btn--active');
			this.prevTargets.btn.ariaExpanded = false;
			this.prevTargets.btn.disabled = false;
			this.prevTargets.line.classList.remove('qa__topic--active');
			this.prevTargets.question.classList.remove('qa-item--active');
		}
	}

	showTarget(target) {
		const path = this.getPath(target);
		this.items.forEach((el) => {
			el.style.transform = `translateX(-${parseInt(path) - 1}00%)`;
		});
		this.setClasses(target, path);
		this.preview.style.transform = `translateX(-${this.computePreviewTranslateWidth(path)}px)`;
		this.removePrevClasses();
		this.setPrevTargetObj(target, path);
	}

	init() {
		this.insertPreviewElements();
		this.showTarget(this.qaContainer.querySelector('.topics__btn[data-path="1"]'));
	}
}

/*

	qa.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('topics__btn')) {
			if (prevTargets) {
				prevTargets.btn.classList.remove('topics__btn--active');
				prevTargets.btn.ariaExpanded = false;
				prevTargets.line.classList.remove('qa__topic--active');
				prevTargets.question.classList.remove('qa-item--active');
			}
			showQa(e.target);
		}
	})

	const createQaLine = () => {
		let qaLineEls = '';
		qaBtns.forEach((el) => {
			qaLineEls += `
			<span class="qa__topic" data-path="${el.dataset.path}">
					${el.textContent}
				</span>
			`
		});
		qaLine.innerHTML = qaLineEls;
	}
	createQaLine();
	let prevTargets;
	const showQa = (target) => {
		const path = target.dataset.path;

		document.querySelectorAll(`.qa-item`).forEach((el) => {
			el.style.transform = `translateX(-${parseInt(path) - 1}00%)`;
		});

		target.classList.add('topics__btn--active');
		target.ariaExpanded = true;
		document.querySelector(`.qa-item[data-path="${path}"]`).classList.add('qa-item--active');
		qaLine.querySelector(`.qa__topic[data-path="${path}"]`).classList.add('qa__topic--active');

		let elWidth = 0;

		for (let index = 0; index < qaLine.querySelectorAll(`.qa__topic`).length; index++) {
			const element = qaLine.querySelectorAll(`.qa__topic`)[index];
			if (element.dataset.path === path) {
				break;
			}
			elWidth += element.offsetWidth;
		}
		qaLine.style.transform = `translateX(-${elWidth}px)`;

		prevTargets = {
			btn: target,
			line: qaLine.querySelector(`.qa__topic[data-path="${path}"]`),
			question: document.querySelector(`.qa-item[data-path="${path}"]`)
		};
	}
	showQa(document.querySelector('.topics__btn[data-path="1"]'))

*/