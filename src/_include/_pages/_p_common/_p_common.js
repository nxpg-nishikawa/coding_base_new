const initFunc = require('../../_modules/_m_javascript/_m_initFunc/_m_initFunc.js');


const simpleModalSet = () => {
	
	let target = document.querySelectorAll('.c-simpleModal01Target');
	[].slice.call(target).forEach(function(event, i) {
		event.addEventListener("click", (e) => {
			e.preventDefault();
			document.getElementById(event.getAttribute('data-simplemodal-target')).classList.add("is-active")
			
			let close = event.getAttribute('data-simplemodal-target');
		}, false);
	});
	
}

// init
class initSet {
	DOMReadBefore(op) {
	}
	DOMReadAfter(op) {
		simpleModalSet();
	}
	imageReadAfter(op) {
	}
	windowResize(op) {
	}
	windowScroll(op) {
	}
}

module.exports = (option) => {
	let init = new initSet();
	initFunc(init, option);
}