// Functions
function showActiveLink(links, activeClass, offsetDifference) {
	for (let i = links.length - 1; i >= 0; i--) {
		let target = document.querySelector(links[i].hash);
		if (window.scrollY > target.offsetTop - offsetDifference) {
			if (document.querySelector(`.${activeClass}`)) {
				document.querySelector(`.${activeClass}`).classList.remove(`${activeClass}`);
			}
			links[i].classList.add(`${activeClass}`);
			break;
		} else {
			if (document.querySelector(`.${activeClass}`)) {
				document.querySelector(`.${activeClass}`).classList.remove(`${activeClass}`);
			}
		}
	}
}

function scrollToTarget(id, media) {
	const target = document.querySelector(id);
	if (!isSmoothScrollSupported && target !== null) {
		const bodyRect = document.body.getBoundingClientRect();
		const elemRect = target.getBoundingClientRect();
		const offset = elemRect.top - bodyRect.top;

		const requestAnimFrame = (function () {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
				window.setTimeout(callback, 1000 / 60);
			};
		})();
		Math.easeInOutQuad = function (t, b, c, d) {
			t /= d / 2;
			if (t < 1) {
				return c / 2 * t * t + b
			}
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};
		function scrollToIos(to, callback, duration) {
			function move(amount) {
				document.documentElement.scrollTop = amount;
				document.body.parentNode.scrollTop = amount;
				document.body.scrollTop = amount;
			}

			function position() {
				return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop;
			}
			let start = position(),
				change = to - start,
				currentTime = 0,
				increment = 20;
			duration = (typeof (duration) === 'undefined') ? 500 : duration;

			let animateScroll = function () {
				currentTime += increment;
				let val = Math.easeInOutQuad(currentTime, start, change, duration);
				move(val);
				if (currentTime < duration) {
					requestAnimFrame(animateScroll);
				} else {
					if (callback && typeof (callback) === 'function') {
						callback();
					}
				}
			};
			animateScroll();
		}
		scrollToIos(offset - 50, null, 500);
		return;
	}

	if (target !== null) {
		let pos = target.offsetTop - (media.matches ? 50 : 80);
		window.scrollTo({
			top: pos,
			behavior: 'smooth'
		});
	}
}