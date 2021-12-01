// Variables
const isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
const media = window.matchMedia("(max-width: 767px)");

const body = document.querySelector('.body');
const burgerBtn = document.querySelector('.burger');
const header = document.querySelector('.header');
const headerNav = document.querySelector('.nav');
const qa = document.querySelector('.qa__container');
const toTopBtn = document.querySelector('.footer__btn');

const burgerCl = new Burger(burgerBtn, headerNav);
const qaCl = new Qa(qa);
const ScrollDebounce = new Debounce(100, () => {
	showActiveLink(document.querySelectorAll('.nav__link'), 'nav__link--active', media.matches ? 55 : 85);
});
