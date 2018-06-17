// dom中如何处理和识别keys
class Element {
  constructor(tagName, key, children) {
    this.tagName = tagName;
    this.key = key;
    this.children = children;
  }
  render() {
    let element = document.createElement(this.tagName);
    element.innerHTML = this.children;// 先暂时将children 看成是字符串文本，重点关注key功能
    element.setAttribute("key", this.key);
    return element;
  }
}

// 创建虚拟的dom实例

function el(tagName, key, children) {
  return new Element(tagName, key, children);
}
// 将虚拟dom渲染为真实dom，放到浏览器
function renderDom(ele, con) {
  return document.body.appendChild(ele, con);// 将ele元素，插入到con容器中
}




let oldChildren = [
  el("li", "A", "A"),
  el("li", "B", "B"),
  el("li", "C", "C"),
  el("li", "D", "D"),
  el("li", "H", "H"),
  el("li", "G", "G"),

];
let ul = document.createElement("ul");
oldChildren.forEach((e) => {
  ul.appendChild(e.render());// appendChild 参数是一个node节点，不是节点数组
});
renderDom(ul, window.root);


let newChildren = [
  el("li", "B", "B"),
  el("li", "C", "C"),
  el("li", "W", "W"),
  el("li", "D", "D"),
  el("li", "E", "E"),
];

// 定义补丁常量
const REMOVE = "REMOVE";
const INSERT = "INSERT";
// 获取补丁数组
let patchesArr = diff(oldChildren, newChildren);// 返回的结果应该为[{type:REMOVE,index:0},{tppe:INSERT,index:3,{key:3}}]
console.log(patchesArr);
patch(ul, patchesArr);
// #############################################################定义获取补丁的方法
function diff(oldChildren, newChildren) {
  let patches = [];
  // 将新数组中的key组合为一个数组
  let newKeys = newChildren.map(v => v.key);


  //## 第一步 ### 把老数组在新数组中没有的元素移除掉
  let oldIndex = 0;
  while (oldIndex < oldChildren.length) {
    let oldKey = oldChildren[oldIndex].key;
    if (!newKeys.includes(oldKey)) {// 新key数组中不包含oldKey ，说明在新数组中移除了oldkey对应的元素
      remove(oldIndex);// 将remove 补丁放到patches中
      oldChildren.splice(oldIndex, 1);// 移除oldIndex相对应的元素
      // 因为oldIndex 对应的元素删除掉了，所以他下一个元素值，会继续使用他的oldIndex,(此处不能++ 不然会漏掉他下一个元素--数组塌陷)
    } else {
      oldIndex++;
    }
  }

  // ###第二步##  处理新数组，把老数组中没有的插入进去
  oldIndex = 0;
  let newIndex = 0;
  while (newIndex < newChildren.length) {
    let newkey = (newChildren[newIndex] || {}).key;
    let oldkey = (oldChildren[oldIndex] || {}).key;
    if (!oldkey && newkey) {// 如果oldkey不存在，说明oldChildren 数组里没有oldIndex对应的本元素，newkey存在说明newChildren数组里有newIndex对应的元素而且本元素属于增加的元素，

      insert(newIndex, newkey);
      newIndex++;

    } else if (oldkey != newkey) {
      let nextOldKey = (oldChildren[oldIndex + 1] || {}).key;
      if (nextOldKey == newkey) { // 如果新数组中的newIndex 对应的元素，与老数组当前对应的下一项相等，就移除老数组中的这一项
        /**
         * 针对的是本种情况：见图三
         */
        remove(newkey);
        oldChildren.splice(oldIndex, 1);
      } else {
        insert(newIndex, newkey);
        newIndex++;
      }
    } else {
      oldIndex++;
      newIndex++;
    }
  }
  // ##### 把老数组中多余的删除掉
  while (oldIndex++ < oldChildren.length) {
    remove(newIndex);
  }


  // 操作补丁数组patches，（增删查改）
  function remove(index) {
    patches.push({ type: REMOVE, index });
  }
  function insert(index, key) {
    patches.push({ type: INSERT, index, node: el("li", key, key) });
  }
  return patches;
}

// ########################################################## 实现打补丁功能
function patch(root, patches = []) {

  let nodeMap = {};
  // 得到一个key和这个key 对应的dom之间的映射
  (Array.from(root.childNodes)).forEach(node => {
    nodeMap[node.getAttribute('key')] = node;
  });

  patches.forEach((patch) => {
    let oldNode;
    switch (patch.type) {
      case INSERT:
        let newNode = nodeMap[patch.node.key] || patch.node.render();//判断一下将要插入的key对应的元素老节点数组中有没有，如果有取出来，如果没有创建一个新节点的dom
        oldNode = root.childNodes[patch.index];// 获取老数组中的index对应的老元素节点
        if (oldNode) {
          root.insertBefore(newNode, oldNode);// 将新节点，插入到此老节点之前
        } else {
          root.appendChild(newNode);//将新节点，追加到末尾，
        }
        break;
      case REMOVE:
        oldNode = root.childNodes[patch.index];// 获取老数组中的index对应的老元素节点
        if (oldNode) {
          root.removeChild(oldNode);// 移除多余的
        }
        break;
      default:
        throw new Error("没有此补丁类型");
    }
  });
}


