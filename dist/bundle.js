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

/***/ "./src/element.js":
/*!************************!*\
  !*** ./src/element.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\r\n\r\nlet utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\r\n/**\r\n * 1.标签类型  h1  div ...\r\n * 2.属性  className id  value style\r\n * 3.子元素 可能是一个数组，也可能未定义\r\n */\r\nclass Element {\r\n  // 标签名  属性对象  子元素数组，可能能为空\r\n  constructor(tagName, attrs, childrend) {\r\n    this.tagName = tagName;\r\n    this.attrs = attrs;\r\n    this.childrend = childrend || [];\r\n  }\r\n  // 把一个虚拟的dom节点渲染成一个真实的dom节点\r\n  render() {\r\n    // 通过标签名创建真实的dom节点\r\n    let element = document.createElement(this.tagName);\r\n    // 给element 真实dom 增加属性\r\n    for (var attr in this.attrs) {\r\n      utils.setAttr(element, attr, this.attrs[attr]);\r\n    }\r\n    // 先序深度遍历\r\n    this.childrend.forEach((child) => {\r\n      // 如果是元素的话，就将虚拟dom转换为真实dom,如果是一个字符串的话，就创建一个文本节点就可以了\r\n      let childElement = (child instanceof Element) ? child.render() : document.createTextNode(child);\r\n      element.appendChild(childElement);\r\n    });\r\n    return element;\r\n  }\r\n}\r\n\r\nfunction createElement(tagName, attrs, children) {\r\n  return new Element(tagName, attrs, children);\r\n}\r\nmodule.exports = { createElement };\n\n//# sourceURL=webpack:///./src/element.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let { createElement } = __webpack_require__(/*! ./element */ \"./src/element.js\");\nlet ulOne = createElement(\"ul\", { className: 'list' }, [createElement(\"li\", { className: \"item\" }, ['文本节点1']), createElement(\"li\", { className: \"item\" }, ['文本节点2']),createElement(\"li\", { className: \"item\" }, ['文本节点4'])]);\n\nlet root = ulOne.render();\ndocument.body.appendChild(root);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\nlet utils = {\r\n  setAttr(ele, attr, val) {\r\n    // 标签属性  className id  value style...\r\n    switch (attr) {\r\n      case \"style\":\r\n        ele.style.cssText = val;\r\n        break;\r\n      case \"value\":\r\n        let tagName = ele.tagName.toLowerCase();\r\n        if (tagName == \"input\" || tagName == \"textarea\") {\r\n          ele.value = val;\r\n        } else {\r\n          ele.setAttribute(attr, val);\r\n        }\r\n        break;\r\n      default:\r\n        ele.setAttribute(attr, val);\r\n        break;\r\n    }\r\n\r\n    ele.setAttribute(attr, val);\r\n  }\r\n};\r\nmodule.exports = utils;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });