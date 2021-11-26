// Burger Menu
const wrapper = document.querySelector('.wrapper')
const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const headerLink = document.querySelectorAll('.header__link');
const md3 = window.matchMedia("(max-width: 767px)");

// Accordion
class Accordion {
	constructor(params) {
		this.accordion = params.selector;
		this.trigger = this.accordion.querySelector('.accordion__trigger');
		this.body = this.accordion.querySelector('.accordion__body');
		this.animated = false;

		if (params.animSettings) {
			this.animSettings = params.animSettings;
		} else {
			this.animSettings = { duration: 500, easing: 'ease' };
		}

		this.trigger.addEventListener('click', () => this.toggle());
	}

	open() {
		this.trigger.classList.add('accordion__trigger--active');
		this.body.classList.add('accordion__body--show');
		this.trigger.setAttribute('aria-expanded', true);
		this.body.setAttribute('aria-hidden', false);

		let bodyHeight = this.body.clientHeight;
		this.body.style.height = 0;
		this.animated = true;

		let anim = this.body.animate([
			{ opacity: '1', height: bodyHeightpx }
		],
			this.animSettings);

		anim.addEventListener('finish', () => {
			this.body.style = null;
			this.animated = false;
		});
	}

	close() {
		this.trigger.classList.remove('accordion__trigger--active');
		this.trigger.setAttribute('aria-expanded', false);
		this.body.setAttribute('aria-hidden', true);

		this.body.style.height = this.body.clientHeight + 'px';
		this.animated = true;

		let anim = this.body.animate([
			{ opacity: '0', height: 0 }
		],
			this.animSettings);

		anim.addEventListener('finish', () => {
			this.body.style = null;
			this.body.classList.remove('accordion__body--show');
			this.animated = false;
		});
	}

	toggle() {
		if (!this.animated) {
			if ('animate' in this.body) {
				this.body.classList.contains('accordion__body--show') ? this.close() : this.open();
			} else {
				this.body.classList.toggle('accordion__body--show');
			}
		}
	}
}
// -- //
// BurgerJS
class Burger {
	constructor(btn, list) {
		this.btn = btn;
		this.list = list;
		this.opened = false;
		this.btnDisabled = false;
		this.scrollWidth = window.innerWidth - document.body.clientWidth;

		this.btn.addEventListener('click', () => {
			this.toggle();
		})
	}

	open() {
		this.disableBtn();
		if (this.scrollWidth) {
			document.body.style.paddingRight = `${this.scrollWidth}px`
		}
		this.btn.classList.add('burger--active');
		this.btn.setAttribute('aria-expanded', true);
		this.list.classList.add('nav--active');
		this.list.setAttribute('aria-hidden', false);

		body.classList.add('lock')
	}

	close() {
		this.disableBtn();
		if (this.scrollWidth) {
			document.body.style.paddingRight = null;
		}
		body.classList.remove('lock')
		this.btn.classList.remove('burger--active');
		this.btn.setAttribute('aria-expanded', false);
		this.list.classList.remove('nav--active');
		this.list.setAttribute('aria-hidden', true);
	}

	toggle() {
		if (this.btn.classList.contains('burger--active')) {
			this.close();
		} else {
			this.open();
		}
	}

	disableBtn() {
		this.btn.disabled = true;
		this.list.addEventListener('transitionend', () => {
			this.btn.disabled = false;
		})
	}
}
// -- //
// Swiper
class MobileSwiper {
	constructor(selector, swiperObj, breakpoint) {
		this.selector = document.querySelector(`.${selector}`);
		this.selectorClassName = selector;
		this.breakpoint = breakpoint;
		this.swiperObj = swiperObj;
		this.initSlider = null;
	}
	create() {
		if (window.innerWidth <= this.breakpoint && this.selector.dataset.mobile == 'false') {
			this.initSlider = new Swiper(this.selector, this.swiperObj);
			this.selector.dataset.mobile = 'true';
		}
	}
	destroy() {
		if (window.innerWidth > this.breakpoint) {
			this.selector.dataset.mobile = 'false';
			if (this.selector.classList.contains(`${this.selectorClassName}initialized`)) {
				this.initSlider.destroy();
			}
		}
	}
	init() {
		this.selector.dataset.mobile = 'false';
		this.create();
		this.destroy();
	}
}

const swiperObj = {
	containerModifierClass: "classification-swiper",
	wrapperClass: "classification-swiper__wrapper",
	slideClass: "classification-swiper__slide",
	slidesPerView: 1,
	pagination: {
		el: ".classification-swiper__pagination",
		clickable: true
	},
	watchSlidesVisibility: true
};
const classificationSwiper = new MobileSwiper('classification-swiper', swiperObj, 767);
classificationSwiper.init();
// -- //


// Debounce
class Debounce {
	constructor(time = 100, functions = () => { }) {
		this.time = time;
		this.functions = functions;
		this.timeOut = null;
	}

	init() {
		clearTimeout(this.timeOut);
		this.timeOut = setTimeout(() => {
			this.functions();
		}, this.time);
	}
}
const resizeFunc = () => {
	classificationSwiper.init();
	console.log('Debounce');
}
const debounceFunc = new Debounce(100, resizeFunc);
window.addEventListener('resize', () => {
	debounceFunc.init();
});
// -- //

// Scroll to link
const isiPhone = (navigator.userAgent.match(/iPhone/i) != null);
const isiPad = (navigator.userAgent.match(/iPad/i) != null);
const isiPod = (navigator.userAgent.match(/iPod/i) != null);

if (isiPhone || isiPad || isiPod) {
	let linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
		V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
	for (let i = 0; i < linkNav.length; i++) {
		linkNav[i].addEventListener('click', function (e) { //по клику на ссылку
			e.preventDefault(); //отменяем стандартное поведение
			let w = window.pageYOffset,  // производим прокрутка прокрутка
				hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
			t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
				start = null;
			requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
			function step(time) {
				if (start === null) start = time;
				let progress = time - start,
					r = (t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t));
				window.scrollTo(0, r);
				if (r != w + t) {
					requestAnimationFrame(step)
				} else {
					location.hash = hash  // URL с хэшем
				}
			}
		}, false);
	}
}

// Scroll to anchors
// Анимация норм
Math.easeInOutQuad = function (t, b, c, d) {
	t /= d / 2;
	if (t < 1) {
		return c / 2 * t * t + b
	}
	t--;
	return -c / 2 * (t * (t - 2) - 1) + b;
};

Math.easeInCubic = function (t, b, c, d) {
	var tc = (t /= d) * t * t;
	return b + c * (tc);
};

Math.inOutQuintic = function (t, b, c, d) {
	var ts = (t /= d) * t,
		tc = ts * t;
	return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};
})();

function scrollTo(to, callback, duration) {
	// because it's so fucking difficult to detect the scrolling element, just move them all
	function move(amount) {
		document.documentElement.scrollTop = amount;
		document.body.parentNode.scrollTop = amount;
		document.body.scrollTop = amount;
	}

	function position() {
		return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
	}
	var start = position(),
		change = to - start,
		currentTime = 0,
		increment = 20;
	duration = (typeof (duration) === 'undefined') ? 500 : duration;
	var animateScroll = function () {
		// increment the time
		currentTime += increment;
		// find the value with the quadratic in-out easing function
		var val = Math.easeInOutQuad(currentTime, start, change, duration);
		// move the document.body
		move(val);
		// do the animation unless its over
		if (currentTime < duration) {
			requestAnimFrame(animateScroll);
		} else {
			if (callback && typeof (callback) === 'function') {
				// the animation is done so lets callback
				callback();
			}
		}
	};
	animateScroll();
}

const scrollLinks = document.querySelectorAll('[data-scroll]');
scrollLinks.forEach((el) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();
		const to = el.getAttribute('href').replace('#', '');
		const element = document.getElementById(to);
		const bodyRect = document.body.getBoundingClientRect();
		const elemRect = element.getBoundingClientRect();
		const offset = elemRect.top - bodyRect.top;
		scrollTo(offset, null, 175);
	})
});

// Учитывает хедер
const smoothScroll = (targetEl, duration, header) => {
	const headerElHeight = document.querySelector(`${header}`).clientHeight;
	let target = document.querySelector(targetEl);
	let targetPosition = target.getBoundingClientRect().top - headerElHeight;
	let startPosition = window.pageYOffset;
	let startTime = null;

	const ease = function (t, b, c, d) {
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};

	const animation = function (currentTime) {
		if (startTime === null) startTime = currentTime;
		const timeElapsed = currentTime - startTime;
		const run = ease(timeElapsed, startPosition, targetPosition, duration);
		window.scrollTo(0, run);
		if (timeElapsed < duration) requestAnimationFrame(animation);
	};
	requestAnimationFrame(animation);
};

const scrollTo = () => {
	const links = document.querySelectorAll('[data-scroll]');
	links.forEach(each => {
		each.addEventListener('click', function () {
			const currentTarget = this.getAttribute('href');
			smoothScroll(currentTarget, 200, '.header');
		});
	});
};
scrollTo();

// -- //

// Active header on scroll
const header = document.querySelector(".header");
let prevScrollpos = window.pageYOffset;

function navOpen() {
	if (prevScrollpos != 0) {
		header.classList.add('header--active');
		headerMenu.classList.add('menu--onscroll');
	} else {
		header.classList.remove('header--active');
		headerMenu.classList.remove('menu--onscroll');
	}
}
function navScroll() {
	window.onscroll = function () {
		let currentScrollPos = window.pageYOffset;
		if (prevScrollpos < currentScrollPos) {
			header.classList.add('header--active');
			headerMenu.classList.add('menu--onscroll');
		} else if (prevScrollpos = currentScrollPos) {
			header.classList.add('header--active');
			headerMenu.classList.add('menu--onscroll');
		} else {
			header.classList.remove('header--active');
			headerMenu.classList.remove('menu--onscroll');
		}
		prevScrollpos = currentScrollPos;
	}
}
navOpen()
navScroll()
// -- //


// cookies
const cookieEl = document.querySelector('.cookie-block');
const cookieSubmitBtn = document.querySelector('.btn-cookies');
cookieSubmitBtn.addEventListener('click', () => {
	cookieEl.style.display = 'none';
});
let cookies = () => {
	if (!Cookies.get('hide-cookie')) {
		setTimeout(() => {
			cookieEl.style.display = 'block';
		}, 1000);
	}
	Cookies.set('hide-cookie', 'true', {
		expires: 30
	});
}
cookies();
// -- //


