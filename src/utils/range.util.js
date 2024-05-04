// 光标类方法
export const RangeUtil = {
    // 当前光标位置插入文本
    insertHtmlAtCaret: (html) => {
      let sel, range;
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();
          // Range.createContextualFragment() would be useful here but is
          // non-standard and not supported in all browsers (IE9, for one)
          let el = document.createElement("div");
          el.innerHTML = html;
          let frag = document.createDocumentFragment(), node, lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          range.insertNode(frag);
          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if (document.selection && document.selection.type != "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
      }
    },
    // 保存光标位置
    saveRange: () => {
      let selection = window.getSelection ? window.getSelection() : document.selection;
      if (!selection.rangeCount) return;
      let range = selection.createRange ? selection.createRange() : selection.getRangeAt(0);
      window._range = range;
    },
    // 基于保存的光标插入内容
    insertContent(str) {
      let selection, range = window._range;
      if (!window.getSelection) {
        range.pasteHTML(str);
        range.collapse(false);
        range.select();
      } else {
        selection = window.getSelection ? window.getSelection() : document.selection;
        range.collapse(false);
        let hasR = range.createContextualFragment(str);
        let hasR_lastChild = hasR.lastChild;
        while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
          let e = hasR_lastChild;
          hasR_lastChild = hasR_lastChild.previousSibling;
          hasR.removeChild(e);
        }
        range.insertNode(hasR);
        if (hasR_lastChild) {
          range.setEndAfter(hasR_lastChild);
          range.setStartAfter(hasR_lastChild);
        }
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
  }