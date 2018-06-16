
import { Element } from "./element";
let utils = require("./utils");
let index = 0;
let allPatchs;
export function patches(node, patchs) {
  allPatchs = patchs;
  walk(node); // 给某个元素打补丁
}


function walk(node) {
  let currentPatch = allPatchs[index++];
  // 如果有子元素，就递归，是倒叙（先给最后面的打补丁，最后给父级打补丁）深度执行，
  if (node.children && node.children.length > 0) {
    let nodeChild = node.children;
    for (var i = 0; i < nodeChild.length; i++) {
      var e = nodeChild[i];
      walk(e);
    }
  }
  // 如果有补丁，就给相应元素打补丁
  if (currentPatch) {
    doPatch(node, currentPatch);
  }

}

// 打补丁功能
function doPatch(node, patches) {// patches 是一个数组
  patches.forEach(v => {
    switch (v.type) {
      case "ATTRS":// 标签属性情况
        for (var key in v.attrs) {
          let val = v.attrs[key]
          if (val) {
            utils.setAttr(node, key, val);
          } else {// 如果属性值为false 的情况，就移除该属性，因为属性值允许undfinde,在diff中diffAttr方法
            node.removeAttribute(key);
          }
        }
        break;
      case "TEXT":// 文本情况
        node.textContent = v.text;
        break;
      case "REMOVE":// 标签移除情况
        node.parentNode.removeChild(node);
      default:
      case "REPLACE":// 标签被替换情况------------------？？？？document.createTextNode(v.newTree)和TEXT 文本情况有什么不同，不都是替换文本吗？？？？？？？？？？？？？？？
        let newNode = (v.newTree instanceof Element) ? v.newTree.render() : document.createTextNode(v.newTree);
        node.parentNode.replaceChild(newNode, node);
        break;
    }
  });
}