const initFunc = require('../../_modules/_m_javascript/_m_initFunc/_m_initFunc.js');


const canvasLoading = () => {
	let target = document.querySelectorAll('.js-canvasLoadingAnimation');
	let loaderArray = {};
	const init = () => {
		[].slice.call(target).forEach(function(event, i) {
			loaderArray[i] = new loaderFunc({
				tg: event
			});
			loaderArray[i].set();
		});
	}
	class loaderFunc {
		constructor(op) {
			let _t = this;
				_t.target = op.tg;
				_t.contentsName = [{name:"type01",point:4,src:"../images/logo01.png"}];
				_t.containerArray = {};
				_t.graphicArray = {};
				_t.pointArray = {};
				_t.bgArray = {};
				_t.imageArray = {};
				_t.queue = new createjs.LoadQueue(false);
		}
		set() {
			let _t = this;
			
			const callFunction = () => {
				scaleInit();
				drawInit();
				tweenSet();
			}
			const initSet = () => {
				_t.stage = new createjs.Stage(_t.target);
				createjs.Ticker.addEventListener('tick', update , false);
				createjs.Ticker.setFPS(60);
				createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

				_t.queue.loadManifest(_t.contentsName);
				_t.queue.setMaxConnections(3);
				_t.queue.addEventListener('complete', (e) => {
					callFunction();
				});
				
				function update() {
					_t.stage.update();
				}
			}

			const scaleInit = () => {
				function set() {
					_t.stage.canvas.width = window.innerWidth;
					_t.stage.canvas.height = window.innerHeight;
					_t.stage.update();
				}
				set();
				window.addEventListener("resize", set);
			}

			const drawInit = () => {
				$.each(_t.contentsName, function(index, val) {
					
					_t.graphicArray[index] = new createjs.Shape();
					_t.imageArray[index] = new createjs.Bitmap(val.src);
					_t.containerArray[index] = new createjs.Container();
					// _t.stage.addChild(_t.graphicArray[index]);

					_t.bgArray[index] = new createjs.Shape();
					_t.stage.addChild(_t.containerArray[index]);
					_t.containerArray[index].addChild(_t.bgArray[index]);
					_t.containerArray[index].addChild(_t.imageArray[index]);
					
					_t.bgArray[index].graphics.beginFill("#355cfc").drawRect(0,0,_t.stage.canvas.width,_t.stage.canvas.height);

					_t.pointArray[index] = [];

					let chm = _t.stage.canvas.height/9,
						cw = _t.stage.canvas.width;
					
					_t.pointArray[index][0] = _t.graphicArray[index].graphics.moveTo(_t.stage.canvas.width/2,0).command;
					_t.pointArray[index][1] = _t.graphicArray[index].graphics.lineTo(cw - 450, 0).command;

					_t.pointArray[index][2] = _t.graphicArray[index].graphics.bezierCurveTo(cw - 300, chm*1, cw - 420, chm*2, cw - 300, chm*3).command;
					_t.pointArray[index][3] = _t.graphicArray[index].graphics.bezierCurveTo(cw - 200, chm*4, cw - 350, chm*5, cw-200, chm*6).command;
					_t.pointArray[index][4] = _t.graphicArray[index].graphics.bezierCurveTo(cw+100, chm*7, cw, chm*8, cw, chm*9).command;

					_t.pointArray[index][5] = _t.graphicArray[index].graphics.lineTo(_t.stage.canvas.width/2, _t.stage.canvas.height).command;
					_t.pointArray[index][6] = _t.graphicArray[index].graphics.closePath().command;
					
					_t.pointArray[index][7] = _t.graphicArray[index].graphics.moveTo(_t.stage.canvas.width/2+10,_t.stage.canvas.height).command;
					// _t.pointArray[index][9] = _t.graphicArray[index].graphics.lineTo(500, _t.stage.canvas.height).command;
					_t.pointArray[index][8] = _t.graphicArray[index].graphics.lineTo(0, _t.stage.canvas.height).command;
					// _t.pointArray[index][10] = _t.graphicArray[index].graphics.bezierCurveTo(300, chm*8, 420, chm*7, 300, chm*6).command;
					_t.pointArray[index][9] = _t.graphicArray[index].graphics.bezierCurveTo(0, chm*8, 0, chm*7, 0, chm*6).command;
					// _t.pointArray[index][11] = _t.graphicArray[index].graphics.bezierCurveTo(200, chm*5, 350, chm*4, 200, chm*3).command;
					_t.pointArray[index][10] = _t.graphicArray[index].graphics.bezierCurveTo(0, chm*5, 0, chm*4, 0, chm*3).command;
					// _t.pointArray[index][12] = _t.graphicArray[index].graphics.bezierCurveTo(100, chm*2, 0, chm*1, 0, 0).command;
					_t.pointArray[index][11] = _t.graphicArray[index].graphics.bezierCurveTo(0, chm*2, 0, chm*1, 0, 0).command;
					_t.pointArray[index][12] = _t.graphicArray[index].graphics.lineTo(_t.stage.canvas.width/2+10, 0).command;
					_t.graphicArray[index].set({
						x        : 0,
						y        : 0,
						scaleX: 1.0,
						scaleY: 1.0
					});
					_t.containerArray[index].set({
						mask : _t.graphicArray[index]
					});
					function bgReset() {
						$.each(_t.mv, function(index, val) {
							_t.slideImage[index].x = _t.stage.canvas.width/2;
							_t.slideImage[index].y = _t.stage.canvas.height/2;
		
							_t.slideImage[index].regX =  val.width / 2;
							_t.slideImage[index].regY = val.height / 2;
						});
					}
					bgReset();
					window.addEventListener("resize", bgReset);
				});
			}
			const tweenSet = () => {
				let _t = this;

				let cw = _t.stage.canvas.width;

				function start01() {
					createjs.Tween.get(_t.graphicArray[0], {override:true})
						.to({x:- _t.stage.canvas.width}, 0)
						.to({x:0}, 1200, createjs.Ease.cubicOut)
						.call(start02);

					createjs.Tween.get(_t.pointArray[0][1], {override:true})
						.to({x:cw-450}, 0)
						.to({x:cw}, 1400, createjs.Ease.cubicOut);
					createjs.Tween.get(_t.pointArray[0][2], {override:true})
						.to({cp1x: cw-300, cp2x: cw-420, x:cw-300}, 0)
						.to({cp1x: cw, cp2x: cw, x:cw}, 1200, createjs.Ease.cubicOut);
					createjs.Tween.get(_t.pointArray[0][3], {override:true})
						.to({cp1x: cw-200, cp2x: cw-350, x:cw-200}, 0)
						.to({cp1x: cw, cp2x: cw, x:cw}, 1100, createjs.Ease.cubicOut);
					createjs.Tween.get(_t.pointArray[0][4], {override:true})
						.to({cp1x: cw+100}, 0)
						.to({cp1x: cw}, 600, createjs.Ease.cubicOut);
				}
				function start02() {
					createjs.Tween.get(_t.graphicArray[0], {override:true})
						.to({x:0}, 0)
						.to({x:_t.stage.canvas.width}, 1400, createjs.Ease.cubicOut)
						.call(start01);

					createjs.Tween.get(_t.pointArray[0][8], {override:true})
						.to({x:0}, 0)
						.wait(100)
						.to({x:500}, 1000, createjs.Ease.cubicOut)
						.to({x:0}, 0);
					createjs.Tween.get(_t.pointArray[0][9], {override:true})
						.to({cp1x: 0, cp2x: 0, x:0}, 0)
						.wait(100)
						.to({cp1x: 300, cp2x: 420, x:300}, 1200, createjs.Ease.cubicOut)
						.to({cp1x: 0, cp2x: 0, x:0}, 0);
					createjs.Tween.get(_t.pointArray[0][10], {override:true})
						.to({cp1x: 0, cp2x: 0, x:0}, 0)
						.wait(100)
						.to({cp1x: 200, cp2x: 350, x:200}, 1300, createjs.Ease.cubicOut)
						.to({cp1x: 0, cp2x: 0, x:0}, 0);
					createjs.Tween.get(_t.pointArray[0][11], {override:true})
						.to({cp1x: 0}, 0)
						.wait(100)
						.to({cp1x: 100}, 2000, createjs.Ease.cubicOut)
						.to({cp1x: 0}, 0);
				}
				start01();
				
			}
			initSet();
		}
	}
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