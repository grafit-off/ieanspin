// Burger
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