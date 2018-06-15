

let utils = require("./utils");
/**
 * 1.标签类型  h1  div ...
 * 2.属性  className id  value style
 * 3.子元素 可能是一个数组，也可能未定义
 */
class Element {
  // 标签名  属性对象  子元素数组，可能能为空
  constructor(tagName, attrs, childrend) {
    this.tagName = tagName;
    this.attrs = attrs;
    this.childrend = childrend || [];
  }
  // 把一个虚拟的dom节点渲染成一个真实的dom节点
  render() {
    // 通过标签名创建真实的dom节点
    let element = document.createElement(this.tagName);
    // 给element 真实dom 增加属性
    for (var attr in this.attrs) {
      utils.setAttr(element, attr, this.attrs[attr]);
    }
    // 先序深度遍历
    this.childrend.forEach((child) => {
      // 如果是元素的话，就将虚拟dom转换为真实dom,如果是一个字符串的话，就创建一个文本节点就可以了
      let childElement = (child instanceof Element) ? child.render() : document.createTextNode(child);
      element.appendChild(childElement);
    });
    return element;
  }
}

function createElement(tagName, attrs, children) {
  return new Element(tagName, attrs, children);
}
module.exports = { createElement };