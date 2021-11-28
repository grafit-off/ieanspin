document.addEventListener("DOMContentLoaded", () => {
	// Includes
	// @include('components/_burger.js');
	// @include('components/_qa.js');
	// @include('components/_variables.js');
	// @include('resources/_scrollLockIOS.js');
	// @include('resources/_animateOnScroll.js');
	// -- //

	qa.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('topics__btn')) {
			qaCl.showTarget(target);
		}
	})
	qaCl.init();
})

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