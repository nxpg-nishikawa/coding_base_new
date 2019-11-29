const initFunc = require('../../_modules/_m_javascript/_m_initFunc/_m_initFunc.js');

// 追加module
const matchHeight = require('../../_modules/_m_javascript/_m_matchHeight/_m_matchHeight.js');
const smoothScroll = require('../../_modules/_m_javascript/_m_smoothScroll/_m_smoothScroll.js');
const spTellLink = require('../../_modules/_m_javascript/_m_spTellLink/_m_spTellLink.js');
const accordionSet = require('../../_modules/_m_javascript/_m_accordionSet/_m_accordionSet.js');
const inView = require('../../_modules/_m_javascript/_m_inView/_m_inView.js');
const slick = require('../../_modules/_m_javascript/_m_slick/_m_slick.js');

// マークアップアコーディオン用
function markupBlock() {

	function init() {
		let _t = this;
		_t.$target = $(".l-markupBlock");
		replaceWord(_t.$target,'.pug+.source code', '                        ')
		replaceWord(_t.$target,'.js+.source code', '                        ')
	}
	function replaceAll(_f_str, _f_beforeStr, _f_afterStr){
		let _t = this;
		_t.reg = new RegExp(_f_beforeStr, "g");
		return _f_str.replace(_t.reg, _f_afterStr);
	}
	function replaceWord(_f_$tg, _f_tg, _f_word) {
		let _t = this;
		_f_$tg.each(function(){
			_t.$str = $(this).find(_f_tg).text();
			_t.$str = replaceAll(_t.$str, _f_word, '');
			$(this).find(_f_tg).text(_t.$str);
		});
	}
	init();
}

function memoSet01() {
	let $target = $(".c-memoSet01"),
		tab = '.group.is-before .tab li',
		content = '.group.is-primary';

	$target.on('click',tab, function(){
		$(this).parents(".c-memoSet01").find(tab).removeClass('is-current');
		$(this).parents(".c-memoSet01").find(content).removeClass('is-current');
		$(this).addClass('is-current');
		$(this).parents(".c-memoSet01").find(content).eq($(this).index()).addClass('is-current');
	});
}

// init
class initSet {
	DOMReadBefore(op) {
		// DOM読み込み前
	}
	DOMReadAfter(op) {
		// DOM読み込み後
		smoothScroll();
		matchHeight();
		spTellLink();
		accordionSet();
		inView();
		markupBlock();
		memoSet01();
		hljs.initHighlightingOnLoad();

		let mainvisualSet01 = new slick();
		mainvisualSet01.set('.js-mainvisualSet01');
		mainvisualSet01.option({
			arrows: true,
			appendArrows: $('.c-mainvisualSet01'),
			prevArrow: '<p class="slick-prev"></p>',
			nextArrow: '<p class="slick-next"></p>',
			customPaging: function(slick, index){
				return '<span></span>';
			},
			dots: true,
		});

		let slickSlider = new slick();
		slickSlider.set('.js-slickSlider');
		slickSlider.option();
		let swiper = new Swiper('.js-swiperSlider');

		
	}
	imageReadAfter(op) {
		// 画像読み込み後
		
	}
	windowResize(op) {
		// リサイズ
	}
	windowScroll(op) {
		// スクロール
	}
}

module.exports = (option) => {
	let init = new initSet();
	initFunc(init, option, 'is-component');
}