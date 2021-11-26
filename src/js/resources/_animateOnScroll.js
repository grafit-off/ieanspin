// Animate On Scroll
// class="animate-item" data-animation='from-left'  data-delay="0.5" data-animation-once
const animItems = document.querySelectorAll(".animate-item");
if (!isMobileDevice) {
	const elementInViewport = (element, offsetTop, offsetBottom, delay = 0) => {
		let bounds = element.getBoundingClientRect();
		if (element.dataset.delay) delay = element.dataset.delay;

		if ((bounds.top + bounds.height - bounds.height * offsetBottom > 0) && (window.innerHeight - bounds.top - bounds.height * offsetTop > 0)) {
			element.classList.add("animated");
			element.style.transitionDelay = `${delay}s`;
		} else if (!element.hasAttribute("data-animation-once")) {
			element.classList.remove("animated");
		}
	};
	if (animItems.length != 0) {
		animItems.forEach(el => {
			elementInViewport(el, .5, .5);
		})
		document.addEventListener('scroll', () => {
			animItems.forEach(el => {
				elementInViewport(el, .5, .5);
			});
		});
	};
} else {
	animItems.forEach((el) => {
		el.classList.add('animated')
	});
}
// -- //
