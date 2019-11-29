'use strict'
require("@babel/polyfill");
const comSet = require('../_include/_pages/_p_common/_p_common.js');
const componentSet = require('../_include/_pages/_p_component/_p_component.js');
const canvasSet = require('../_include/_pages/_p_canvas/_p_canvas.js');
const uaSet = require('../_include/_modules/_m_javascript/_m_ua/_m_ua.js');

let option = {
	SP_WIDTH: 768,
	PC_WIDTH: 1200,
	UA: new uaSet().dvType(),
	PAGE_FLAG: "html",
}
const init = () => {
	comSet(option);
	componentSet(option);
	canvasSet(option);
}
init();