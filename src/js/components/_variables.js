// Variables
const body = document.querySelector('.body');
const isMobileDevice = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
const burgerBtn = document.querySelector('.burger');
const headerNav = document.querySelector('.nav');
const burgerCl = new Burger(burgerBtn, headerNav);
const qa = document.querySelector('.qa__container');
const qaCl = new Qa(qa);

