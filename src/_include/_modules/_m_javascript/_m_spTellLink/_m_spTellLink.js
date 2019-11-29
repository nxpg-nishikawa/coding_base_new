module.exports = (op) => {
	const uaSet = require('../_m_ua/_m_ua.js');
	
	let _g_defaultOp = {
		className: '.js-tellLink',
		UA: new uaSet().dvType(),
	}
	let _g_op = Object.assign(_g_defaultOp, op);

	let	linkTarget = document.querySelectorAll(_g_op.className);
	if(_g_op.UA == 'pc'){
		Array.prototype.slice.call(linkTarget).forEach(function(event) {
			event.outerHTML = event.innerHTML
		});
	}
}