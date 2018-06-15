let { createElement } = require("./element");
let ulOne = createElement("ul", { className: 'list' }, [createElement("li", { className: "item" }, ['文本节点1']), createElement("li", { className: "item" }, ['文本节点2']),createElement("li", { className: "item" }, ['文本节点4'])]);

let root = ulOne.render();
document.body.appendChild(root);