
let utils = {
  setAttr(ele, attr, val) {
    // 标签属性  className id  value style...
    switch (attr) {
      case "style":
        ele.style.cssText = val;
        break;
      case "value":
        let tagName = ele.tagName.toLowerCase();
        if (tagName == "input" || tagName == "textarea") {
          ele.value = val;
        } else {
          ele.setAttribute(attr, val);
        }
        break;
      default:
        ele.setAttribute(attr, val);
        break;
    }

    ele.setAttribute(attr, val);
  }
};
module.exports = utils;