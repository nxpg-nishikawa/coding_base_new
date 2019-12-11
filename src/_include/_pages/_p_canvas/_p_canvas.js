const initFunc = require('../../_modules/_m_javascript/_m_initFunc/_m_initFunc.js');
const canvasLoading = require('../../_modules/_m_javascript/_m_canvasLoading/_m_canvasLoading.js');

const nxpgLogoFunc = () => {
	let logoTarget;
	const init = () => {
		logoTarget = new logoSet({
			tg: document.querySelector('#js-logoTarget')
		});
		logoTarget.set();
	}
	class logoSet {
		constructor(op) {
			let _t = this;
				_t.target = op.tg;
				_t.queue = new createjs.LoadQueue(false);
				_t.imageArray = [
					{src:"../images/sample01.jpg"},
				];
				_t.imagePath = {};
		}
		set() {
			let _t = this;
			const initSet = () => {
				_t.stageTarget = new createjs.Stage(_t.target);
				createjs.Ticker.addEventListener('tick', update , false);
				createjs.Ticker.setFPS(60);
				createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
				$.each(_t.imageArray, function(index, val) {
					_t.imagePath[index] = new Image();
					_t.imagePath[index].src = val.src;
					val.width = _t.imagePath[index].naturalWidth;
					val.height = _t.imagePath[index].naturalHeight;
				});
				_t.queue.loadManifest(_t.imageArray);
				_t.queue.setMaxConnections(3);
				_t.queue.addEventListener('complete', (e) => {
					scaleInit();
					drawInit();
					tweenInit();
				});
				function update() {
					_t.stageTarget.update();
				}
			}
			const scaleInit = () => {
				function set() {
					_t.stageTarget.canvas.width = 500;
					_t.stageTarget.canvas.height = 500;
				}
				set();
				window.addEventListener("resize", set);
			}
			const drawInit = () => {
				let _t = this;
					_t.containerTarget = new createjs.Container();
					_t.graphicTarget = new createjs.Shape();
					_t.imageTarget = new createjs.Bitmap(_t.imageArray[0].src);
					_t.maskTarget = new createjs.Shape();
					
					_t.stageTarget.addChild(_t.containerTarget);
					_t.containerTarget.addChild(_t.graphicTarget);
					_t.containerTarget.addChild(_t.imageTarget);

					_t.imageTarget.x = 0;
					_t.imageTarget.y = 0;
					_t.imageTarget.scale = 0.3;

					_t.maskTarget.set({
						x        : 0,
						y        : 0,
						scaleX: 1.0,
						scaleY: 1.0
					});

					_t.point0101 = _t.maskTarget.graphics.moveTo(0,0).command;
					_t.point0102 = _t.maskTarget.graphics.lineTo(25, 0).command;
					_t.point0103 = _t.maskTarget.graphics.lineTo(25, 0).command;
					_t.point0104 = _t.maskTarget.graphics.lineTo(0, 0).command;
					_t.maskTarget.graphics.closePath().command;

					_t.point0201 = _t.maskTarget.graphics.moveTo(50,60).command;
					_t.point0202 = _t.maskTarget.graphics.lineTo(75, 60).command;
					_t.point0203 = _t.maskTarget.graphics.lineTo(75, 60).command;
					_t.point0204 = _t.maskTarget.graphics.lineTo(50, 60).command;
					_t.maskTarget.graphics.closePath().command;

					_t.point0301 = _t.maskTarget.graphics.moveTo(100,0).command;
					_t.point0302 = _t.maskTarget.graphics.lineTo(125, 0).command;
					_t.point0303 = _t.maskTarget.graphics.lineTo(125, 0).command;
					_t.point0304 = _t.maskTarget.graphics.lineTo(100, 0).command;
					_t.maskTarget.graphics.closePath().command;

					_t.point0401 = _t.maskTarget.graphics.moveTo(150,0).command;
					_t.point0402 = _t.maskTarget.graphics.lineTo(175, 0).command;
					_t.point0403 = _t.maskTarget.graphics.lineTo(175, 0).command;
					_t.point0404 = _t.maskTarget.graphics.lineTo(150, 0).command;
					_t.maskTarget.graphics.closePath().command;
					
					_t.graphicTarget.graphics.beginFill("#000000").drawRect(0,0,_t.stageTarget.canvas.width, _t.stageTarget.canvas.height);
					_t.containerTarget.set({
						mask : _t.maskTarget
					});
			}

			const tweenInit = () => {
				let _t = this;
					function logo01() {
						createjs.Tween.get(_t.point0103, {override:true})
							.to({y:0}, 0)
							.to({y:120}, 600, createjs.Ease.cubicOut);
						createjs.Tween.get(_t.point0104, {override:true})
							.to({y:0}, 0)
							.to({y:120}, 600, createjs.Ease.cubicOut)
							.call(logo02);
					}
					function logo02() {
						createjs.Tween.get(_t.point0203, {override:true})
							.to({y:60}, 0)
							.to({y:180}, 600, createjs.Ease.cubicOut);
						createjs.Tween.get(_t.point0204, {override:true})
							.to({y:60}, 0)
							.to({y:180}, 600, createjs.Ease.cubicOut)
							.call(logo03);
					}
					function logo03() {
						createjs.Tween.get(_t.point0303, {override:true})
							.to({y:0}, 0)
							.to({y:120}, 600, createjs.Ease.cubicOut);
						createjs.Tween.get(_t.point0304, {override:true})
							.to({y:0}, 0)
							.to({y:120}, 600, createjs.Ease.cubicOut)
							.call(logo04);
					}
					function logo04() {
						createjs.Tween.get(_t.point0403, {override:true})
							.to({y:0}, 0)
							.to({y:60}, 600, createjs.Ease.cubicOut);
						createjs.Tween.get(_t.point0404, {override:true})
							.to({y:0}, 0)
							.to({y:60}, 600, createjs.Ease.cubicOut);
					}
					logo01();
			}
			initSet();
		}
	}
	init();
}

const canvasLoadingFunc = () => {
	let canvasLoadingTarget;
	const init = () => {
		canvasLoadingTarget = new canvasLoading({
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
		canvasLoadingFunc();
		nxpgLogoFunc();
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