module.exports = (op) => {
	const uaSet = require('../_m_ua/_m_ua.js');

	let _g_defaultOp = {
		className: '.js-matchHeight', //要素
		UA: new uaSet().dvType(),
	}
	let _g_op = Object.assign(_g_defaultOp, op);

	let elm = document.querySelectorAll(_g_op.className);
	if(elm != null) {
		let arrayLength = 0; arrayCount = 0;

		let init = () => {
			let _t = this;
				_t.timeoutId = 1;
				_t.array = [];
				_t.currentWidth = window.innerWidth;
			
			arrayLengthSet(_t.array);

			//リサイズ
			window.addEventListener("resize", () => {
				timeoutFunc(_t.timeoutId, () => {
					// ios resize制御
					if(_g_op.UA != 'pc'){
						if (_t.currentWidth == window.innerWidth) return;
						_t.currentWidth = window.innerWidth;
						arrayLengthSet(_t.array);
					} else {
						arrayLengthSet(_t.array);
					}
				})
			});

			_t.timeoutId = setTimeout( () => {
				_t.timeoutId = 0;
			}, 100 ) ;
		}

		//横並びじゃない要素が何箇所あるか
		function arrayLengthSet(ar) {
			let _t = this;
				_t.offTop = 0;
			[].slice.call(elm).forEach(function(event, i) {
				//同じ位置に居なければ次の配列へ、同じなら配列の長さを追加
				if(_t.offTop !== 0 && _t.offTop !== event.getBoundingClientRect().top + window.pageYOffset) {
					arrayLength++;
				}
				_t.offTop = event.getBoundingClientRect().top + window.pageYOffset;
			});
			for(let i = 0; i <= arrayLength; i++) {
				ar.push([]);
			}
			arraySetFunc(ar);
		}

		//横並びの要素を各配列に追加
		function arraySetFunc(ar) {
			let _t = this;
				_t.offTop = 0;
			[].slice.call(elm).forEach(function(event, i) {
				//同じ位置に居なければ次の配列へ、同じなら配列に追加
				if(_t.offTop !== 0 && _t.offTop !== event.getBoundingClientRect().top + window.pageYOffset) {
					arrayCount++;
				}
				ar[arrayCount].push(event);
				_t.offTop = event.getBoundingClientRect().top + window.pageYOffset;
			});
			heightSetFunc(ar);
		}

		//横並びの要素ごとに高さを設定
		function heightSetFunc(ar) {
			let _t = this;
				_t.height = 0;
			for(let i = 0; i <= arrayCount; i++) {
				_t.height = 0;
				ar[i].forEach(function(event, index) {
					if (index === 0 || index % ar[i].length === 0) {

						//初期化
						for (let n = index; n <= index + index + ar[i].length - 1; n++) {
							ar[i][n].style.height = 'inherit';
						}

						//横並びの要素で一番高い高さを取得
						height = event.clientHeight;
						for (let n = index + 1; n <= index + ar[i].length - 1; n++) {
							if (_t.height < ar[i][n].clientHeight) {
								_t.height = ar[i][n].clientHeight;
							}
						}

						//高さを設定
						for (let n = index; n <= index + index + ar[i].length - 1; n++) {
							ar[i][n].style.height = _t.height + "px" ;
						}
					}
				});
			}
		}

		//resizeとscrollのtimeout
		let timeoutFunc = (tId, callback) => {
			if (tId) return ;
			tId = setTimeout( () => {
				tId = 0 ;
				callback();
			}, 100 ) ;
		}

		init();
	}
}

