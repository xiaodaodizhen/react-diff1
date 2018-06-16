/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/diff.js":
/*!*********************!*\
  !*** ./src/diff.js ***!
  \*********************/
/*! exports provided: diff */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"diff\", function() { return diff; });\nfunction diff(oldTree, newTree) {\r\n  let patches = {};\r\n\r\n  // index 是按顺序比较的dom的序号\r\n  let index = 0;\r\n  walk(oldTree, newTree, index, patches);\r\n  console.log(patches);\r\n\r\n  return patches;\r\n}\r\n\r\n// 声明常量和变量\r\nconst ATTRS = \"ATTRS\";\r\nconst TEXT = \"TEXT\";\r\nconst REMOVE = \"REMOVE\";\r\nconst REPLACE = \"REPLACE\";\r\nlet Index = 0;\r\n\r\n// 比较属性的方法\r\nfunction diffAttr(oldAttrs, newAttrs) {\r\n  let patch = {};\r\n  // 判断老属性和新属性的关系\r\n  for (let key in oldAttrs) {\r\n    if (oldAttrs[key] !== newAttrs[key]) {\r\n      patch[key] = newAttrs[key];// 有可能是undefind\r\n    }\r\n  }\r\n  //老节点没有新节点的属性的情况\r\n  for (let key in newAttrs) {\r\n    if (!oldAttrs.hasOwnProperty(key)) {\r\n      patch[key] = newAttrs[key];\r\n    }\r\n  }\r\n  return patch;\r\n}\r\n\r\n// 比较子元素的不同\r\nfunction diffChildren(oldChild, newChild, patches) {\r\n  // 比较老的某一个子元素和新的某一个子元素\r\n  oldChild.forEach((e, idx) => { //e代表的是老的子元素\r\n    // 此处索引Index，每次调用的时候walk的时候递增\r\n    walk(e, newChild[idx], ++Index, patches);\r\n  });\r\n}\r\n\r\n// 判断节点是不是字符串\r\nfunction isString(node) {\r\n  return Object.prototype.toString.call(node) === \"[Object String]\";\r\n}\r\n\r\nfunction walk(oldTree, newTree, index, patches) {\r\n  let currentPatch = [];// 每个元素都有一个补丁包\r\n\r\n  if (!newTree) {// 3. 当新节点不存在的情况（意思是把老节点删除掉了，所以新节点为空）\r\n    currentPatch.push({ type: REMOVE, index });\r\n  } else if (isString(oldTree) && isString(newTree)) { // 1.元素是文本节点的情况\r\n    if (oldTree !== newTree) {// 检测文本是否变化\r\n      currentPatch.push({ type: TEXT, text: newTree });\r\n    }\r\n  } else if (oldTree.tagName == newTree.tagName) { // 2. 当dom节点类型是否相同\r\n    // dom节点相同，比较属性是否相同\r\n    let attrs = diffAttr(oldTree.attrs, newTree.attrs);\r\n    let arrAttrs = Object.keys(attrs);// 将attrs转换为数组\r\n    if (arrAttrs.length > 0) {\r\n      currentPatch.push({ type: ATTRS, attrs });\r\n    }\r\n    // 如果有子元素，遍历子元素\r\n    if (oldTree.children) {\r\n      diffChildren(oldTree.children, newTree.children, patches);\r\n    }\r\n  } else { // 4. 说明老元素节点被新元素节点替换\r\n    currentPatch.push({ type: REPLACE, newTree });\r\n  }\r\n  // 将差异放到patches对象中\r\n  if (currentPatch.length > 0) {\r\n    // 将元素和补丁对应起来，放到大补丁包中\r\n    patches[index] = currentPatch;\r\n  }\r\n\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n/**\r\n * 规则：\r\n * 1、当dom节点类型相同时，检查属性是否相同，如不相同会产生一个属性的补丁包{type:\"ATTRS\",attrs:{calss:'list-group'}}\r\n * 2、当dom节点不存在，产生一个节点的补丁包{type:\"REMOVE\",index:11}\r\n * 3、当dom节点类型不相同时，直接采用替换模式，产生一个替换节点的补丁包{type:\"REPLACE\",newNode:newNode}\r\n * 4、当dom的文本节点变化，直接产生一个补丁包{type:\"TEXT\",text:\"新文本\"}\r\n * \r\n */\n\n//# sourceURL=webpack:///./src/diff.js?");

/***/ }),

/***/ "./src/element.js":
/*!************************!*\
  !*** ./src/element.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\r\n\r\nlet utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n/**\r\n * 1.标签类型  h1  div ...\r\n * 2.属性  className id  value style\r\n * 3.子元素 可能是一个数组，也可能未定义\r\n */\r\nclass Element {\r\n  // 标签名  属性对象  子元素数组，可能能为空\r\n  constructor(tagName, attrs, children) {\r\n    this.tagName = tagName;\r\n    this.attrs = attrs;\r\n    this.children = children || [];\r\n  }\r\n  // 把一个虚拟的dom节点渲染成一个真实的dom节点\r\n  render() {\r\n    // 通过标签名创建真实的dom节点\r\n    let element = document.createElement(this.tagName);\r\n    // 给element 真实dom 增加属性\r\n    for (var attr in this.attrs) {\r\n      utils.setAttr(element, attr, this.attrs[attr]);\r\n    }\r\n    // 先序深度遍历\r\n    this.children.forEach((child) => {\r\n      // 如果是元素的话，就将虚拟dom转换为真实dom,如果是一个字符串的话，就创建一个文本节点就可以了\r\n      let childElement = (child instanceof Element) ? child.render() : document.createTextNode(child);\r\n      element.appendChild(childElement);\r\n    });\r\n    return element;\r\n  }\r\n}\r\n// 创建虚拟dom实例\r\nfunction createElement(tagName, attrs, children) {\r\n  return new Element(tagName, attrs, children);\r\n}\r\n// 将虚拟dom渲染为真实dom，到浏览器\r\nfunction renderDom(ele, con) {\r\n  document.body.appendChild(ele, con);\r\n}\r\nmodule.exports = { createElement, renderDom, Element };\n\n//# sourceURL=webpack:///./src/element.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let { createElement, renderDom } = __webpack_require__(/*! ./element */ \"./src/element.js\");\nlet { diff } = __webpack_require__(/*! ./diff */ \"./src/diff.js\");\nlet {patches} = __webpack_require__(/*! ./patch */ \"./src/patch.js\");\nlet ulOne = createElement(\"ul\", { class: 'list' }, [createElement(\"li\", { class: \"item\" }, ['文本节点1']), createElement(\"li\", { class: \"item\" }, ['文本节点2']), createElement(\"li\", { class: \"item\" }, ['文本节点4'])]);\nlet ulTwo = createElement(\"ul\", { class: 'list-group' }, [createElement(\"li\", { class: \"item\" }, ['文本节点1']), createElement(\"div\", { class: \"item\" }, ['文本节点2']), createElement(\"li\", { class: \"item\" }, ['文本节点45454545454'])]);\n// 获得虚拟dom元素\nlet root = ulOne.render();\n// 将元素插入到页面内\nrenderDom(root, window.root);\n// 获取元素的补丁\nlet patch = diff(ulOne, ulTwo);\n\n\n// 给元素打补丁，重新更新视图\n\npatches(root,patch);\n\n/**\n * dom diff 比较两个虚拟dom的区别，比较两个对象的区别\n * dom diff 作用：根据两个虚拟dom对象创建补丁，描述改变的内容，将这个补丁用来更新dom\n * \n*/\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/patch.js":
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/*! exports provided: patches */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"patches\", function() { return patches; });\n/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element */ \"./src/element.js\");\n/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_element__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nlet utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\nlet index = 0;\r\nlet allPatchs;\r\nfunction patches(node, patchs) {\r\n  allPatchs = patchs;\r\n  walk(node); // 给某个元素打补丁\r\n}\r\nfunction walk(node) {\r\n  let currentPatch = allPatchs[index++];\r\n  if (node.children && node.children.length > 0) {\r\n    let nodeChild = node.children;\r\n    for (var i = 0; i < nodeChild.length; i++) {\r\n      var e = nodeChild[i];\r\n      walk(e);\r\n\r\n    }\r\n  }\r\n\r\n  if (currentPatch) {\r\n    doPatch(node, currentPatch);\r\n  }\r\n\r\n}\r\n\r\n\r\nfunction doPatch(node, patches) {\r\n  patches.forEach(v => {\r\n    switch (v.type) {\r\n      case \"ATTRS\":\r\n        console.log(3);\r\n        for (var key in v.attrs) {\r\n          let val = v.attrs[key]\r\n          if (val) {\r\n            utils.setAttr(node, key, val);\r\n          } else {\r\n            node.removeAttribute(key);\r\n          }\r\n        }\r\n        break;\r\n      case \"TEXT\":\r\n        node.textContent = v.text;\r\n        break;\r\n      case \"REMOVE\":\r\n        node.parentNode.removeChild(node);\r\n      default:\r\n      case \"REPLACE\":\r\n        let newNode = (v.newTree instanceof _element__WEBPACK_IMPORTED_MODULE_0__[\"Element\"]) ? v.newTree.render() : document.createTextNode(v.newTree);\r\n        node.parentNode.replaceChild(newNode, node);\r\n        break;\r\n\r\n    }\r\n  });\r\n}\n\n//# sourceURL=webpack:///./src/patch.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// 封装公共方法\r\nlet utils = {\r\n  setAttr(ele, attr, val) {\r\n    // 标签属性  className id  value style...\r\n    switch (attr) {\r\n      case \"style\":\r\n        ele.style.cssText = val;\r\n        break;\r\n      case \"value\":\r\n        let tagName = ele.tagName.toLowerCase();\r\n        if (tagName == \"input\" || tagName == \"textarea\") {\r\n          ele.value = val;\r\n        } else {\r\n          ele.setAttribute(attr, val);\r\n        }\r\n        break;\r\n      default:\r\n        ele.setAttribute(attr, val);\r\n        break;\r\n    }\r\n\r\n    ele.setAttribute(attr, val);\r\n  }\r\n};\r\nmodule.exports = utils;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });