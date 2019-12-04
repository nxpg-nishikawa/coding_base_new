const initFunc = require('../../_modules/_m_javascript/_m_initFunc/_m_initFunc.js');
const canvasLoadind = require('../../_modules/_m_javascript/_m_canvasLoading/_m_canvasLoading.js');



const canvasLoading = () => {
	let canvasLoadingTarget;
	const init = () => {
		canvasLoadingTarget = new canvasLoadind({
			tg: document.querySelector('#js-canvasLoadingAnimation')
		});
		canvasLoadingTarget.set();
	}

	$('#type01_start').on('click',function(){
		canvasLoadingTarget.type01_start();
	});
	$('#type01_end').on('click',function(){
		canvasLoadingTarget.type01_end();
	});
	$('#type02_start').on('click',function(){
		canvasLoadingTarget.type02_start();
	});
	$('#type02_end').on('click',function(){
		canvasLoadingTarget.type02_end();
	});
	$('#type03_start').on('click',function(){
		canvasLoadingTarget.type03_start();
	});
	$('#type03_end').on('click',function(){
		canvasLoadingTarget.type03_end();
	});
	$('#type04_start').on('click',function(){
		canvasLoadingTarget.type04_start();
	});
	$('#type04_end').on('click',function(){
		canvasLoadingTarget.type04_end();
	});
	$('#type05_start').on('click',function(){
		canvasLoadingTarget.type05_start();
	});
	$('#type05_end').on('click',function(){
		canvasLoadingTarget.type05_end();
	});
	init();
}


// init
class initSet {
	DOMReadBefore(op) {
	}
	DOMReadAfter(op) {
		canvasLoading();
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
	initFunc(init, option, 'is-canvas');
}