

module.exports = (op) => {
	const uaSet = require('../_m_ua/_m_ua.js');
	
	// デフォルトオプション
	let _g_defaultOp = {
		className: '.js-inview',
		UA: new uaSet().dvType(),
		changeTiming: 0, // 0~0.5
		reverse: true, // 繰り返し
	}
	let _g_op = Object.assign(_g_defaultOp, op);

	let elm = document.querySelectorAll(_g_op.className);
	let scrollTopPos, scrollBottomPos;
	
	let init = () => {
		if(elm != null) {
			let _t = this;
				_t.target = elm;
				_t.array = {};
				_t.timeoutId = 1;
				_t.currentWidth = window.innerWidth;
			
			scrollTopSet();
			inviewSetFunc(_t, true);

			//リサイズ
			window.addEventListener("resize", () => {
				timeoutFunc(_t.timeoutId, () => {
					// ios resize制御
					if(_g_op.UA != 'pc'){
						if (_t.currentWidth == window.innerWidth) return;
						_t.currentWidth = window.innerWidth;
						inviewSetFunc(_t);
					} else {
						inviewSetFunc(_t);
					}
				})
			});

			//スクロール
			window.addEventListener("scroll", () => {
				timeoutFunc(_t.timeoutId, () => {
					inviewSetFunc(_t);
				})
			});

			_t.timeoutId = setTimeout( () => {
				_t.timeoutId = 0;
			}, 100 ) ;

		}
	}
	
	//inviewSetを設定 宣言のみtrueで走る
	let inviewSetFunc = (t, flag) => {
		[].slice.call(t.target).forEach(function(event, index) {
			if(flag == true) {
				t.array[index] = new inviewSet(event);
			}
			t.array[index].set();
			// t.array[index].debug();
		});
	}

	//ブラウザのトップとボトムの位置計算
	let scrollTopSet = () => {
		scrollTopPos = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
		scrollBottomPos = scrollTopPos + window.innerHeight;

		//表示タイミングの調整
		scrollTopPos = scrollTopPos + (window.innerHeight*_g_op.changeTiming);
		scrollBottomPos = scrollBottomPos - (window.innerHeight*_g_op.changeTiming);
	}

	//resizeとscrollのtimeout
	let timeoutFunc = (tId, callback) => {
		if (tId) return ;
		tId = setTimeout( () => {
			tId = 0 ;
			callback();
		}, 100 ) ;
	}

	//inviewのclass
	class inviewSet {
		constructor(_c_tg) {
			let _t = this;
			_t.tg = _c_tg;
		}
		set() {
			scrollTopSet();
			let _t = this;
				_t.tgRect = _t.tg.getBoundingClientRect();
				_t.tgTop = _t.tgRect.top + scrollTopPos;
				_t.tgBottom = _t.tgTop + _t.tg.clientHeight;

				
			if(scrollTopPos < _t.tgTop && _t.tgBottom < scrollBottomPos) {
				_t.tg.classList.add("is-inview");
			} else {
				if(_g_op.reverse == true) {
					_t.tg.classList.remove("is-inview");
				}
			}
		}
		debug() {
			let _t = this;
			console.log('スクロールトップ:' + scrollTopPos);
			console.log('スクロールボトム:' + scrollBottomPos);
			console.log('ターゲットトップ:' + _t.tgTop);
			console.log('ターゲットボトム:' + _t.tgBottom);
		}
	}

	init();

}

