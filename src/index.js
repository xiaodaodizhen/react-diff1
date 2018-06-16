let { createElement, renderDom } = require("./element");
let { diff } = require("./diff");
let {patches} = require("./patch");
let ulOne = createElement("ul", { class: 'list' }, [createElement("li", { class: "item" }, ['文本节点1']), createElement("li", { class: "item" }, ['文本节点2']), createElement("li", { class: "item" }, ['文本节点4'])]);
let ulTwo = createElement("ul", { class: 'list-group' }, [createElement("li", { class: "item" }, ['文本节点1']), createElement("div", { class: "item" }, ['文本节点2']), createElement("li", { class: "item" }, ['文本节点45454545454'])]);
// 获得虚拟dom元素
let root = ulOne.render();
// 将元素插入到页面内
renderDom(root, window.root);
// 获取元素的补丁
let patch = diff(ulOne, ulTwo);


// 给元素打补丁，重新更新视图

patches(root,patch);

/**
 * dom diff 比较两个虚拟dom的区别，比较两个对象的区别
 * dom diff 作用：根据两个虚拟dom对象创建补丁，描述改变的内容，将这个补丁用来更新dom
 * 
*/