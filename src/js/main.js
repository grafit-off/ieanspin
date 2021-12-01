document.addEventListener("DOMContentLoaded", () => {
	// Includes
	// @include('components/_burger.js');
	// @include('components/_qa.js');
	// @include('components/_debounce.js');
	// @include('components/_variables.js');
	// @include('components/_foo.js');
	// @include('resources/_scrollLockIOS.js');
	// @include('resources/_animateOnScroll.js');
	// -- //

	qa.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('topics__btn')) {
			qaCl.showTarget(target);
		}
	})

	header.addEventListener('click', (e) => {
		const target = e.target;

		if (target.classList.contains('nav__link')) {
			e.preventDefault();
			let hash = target.hash;
			scrollToTarget(hash, media);
			media.matches ? burgerCl.close() : null;
		}
		if (target.closest('.header__logo')) {
			e.preventDefault();
			scrollToTarget('#hero', media);
		}
	})

	toTopBtn.addEventListener('click', () => {
		scrollToTarget('#hero', media);
	})

	qaCl.init();

	window.addEventListener('scroll', () => {
		ScrollDebounce.init();
	})
})
