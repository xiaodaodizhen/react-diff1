
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
  if (node.children && node.children.length > 0) {
    let nodeChild = node.children;
    for (var i = 0; i < nodeChild.length; i++) {
      var e = nodeChild[i];
      walk(e);

    }
  }

  if (currentPatch) {
    doPatch(node, currentPatch);
  }

}


function doPatch(node, patches) {
  patches.forEach(v => {
    switch (v.type) {
      case "ATTRS":
        console.log(3);
        for (var key in v.attrs) {
          let val = v.attrs[key]
          if (val) {
            utils.setAttr(node, key, val);
          } else {
            node.removeAttribute(key);
          }
        }
        break;
      case "TEXT":
        node.textContent = v.text;
        break;
      case "REMOVE":
        node.parentNode.removeChild(node);
      default:
      case "REPLACE":
        let newNode = (v.newTree instanceof Element) ? v.newTree.render() : document.createTextNode(v.newTree);
        node.parentNode.replaceChild(newNode, node);
        break;

    }
  });
}