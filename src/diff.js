export function diff(oldTree, newTree) {
  let patches = {};

  // index 是按顺序比较的dom的序号
  let index = 0;
  walk(oldTree, newTree, index, patches);
  console.log(patches);

  return patches;
}

// 声明常量和变量
const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = "REPLACE";
let Index = 0;

// 比较属性的方法
function diffAttr(oldAttrs, newAttrs) {
  let patch = {};
  // 判断老属性和新属性的关系
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key];// 有可能是undefind
    }
  }
  //老节点没有新节点的属性的情况
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key];
    }
  }
  return patch;
}

// 比较子元素的不同
function diffChildren(oldChild, newChild, patches) {
  // 比较老的某一个子元素和新的某一个子元素
  oldChild.forEach((e, idx) => { //e代表的是老的子元素
    // 此处索引Index，每次调用的时候walk的时候递增
    walk(e, newChild[idx], ++Index, patches);
  });
}

// 判断节点是不是字符串
function isString(node) {
  return Object.prototype.toString.call(node) === "[Object String]";
}

function walk(oldTree, newTree, index, patches) {
  let currentPatch = [];// 每个元素都有一个补丁包

  if (!newTree) {// 3. 当新节点不存在的情况（意思是把老节点删除掉了，所以新节点为空）
    currentPatch.push({ type: REMOVE, index });
  } else if (isString(oldTree) && isString(newTree)) { // 1.元素是文本节点的情况
    if (oldTree !== newTree) {// 检测文本是否变化
      currentPatch.push({ type: TEXT, text: newTree });
    }
  } else if (oldTree.tagName == newTree.tagName) { // 2. 当dom节点类型是否相同
    // dom节点相同，比较属性是否相同
    let attrs = diffAttr(oldTree.attrs, newTree.attrs);
    let arrAttrs = Object.keys(attrs);// 将attrs转换为数组
    if (arrAttrs.length > 0) {
      currentPatch.push({ type: ATTRS, attrs });
    }
    // 如果有子元素，遍历子元素
    if (oldTree.children) {
      diffChildren(oldTree.children, newTree.children, patches);
    }
  } else { // 4. 说明老元素节点被新元素节点替换
    currentPatch.push({ type: REPLACE, newTree });
  }
  // 将差异放到patches对象中
  if (currentPatch.length > 0) {
    // 将元素和补丁对应起来，放到大补丁包中
    patches[index] = currentPatch;
  }

}














/**
 * 规则：
 * 1、当dom节点类型相同时，检查属性是否相同，如不相同会产生一个属性的补丁包{type:"ATTRS",attrs:{calss:'list-group'}}
 * 2、当dom节点不存在，产生一个节点的补丁包{type:"REMOVE",index:11}
 * 3、当dom节点类型不相同时，直接采用替换模式，产生一个替换节点的补丁包{type:"REPLACE",newNode:newNode}
 * 4、当dom的文本节点变化，直接产生一个补丁包{type:"TEXT",text:"新文本"}
 * 
 */