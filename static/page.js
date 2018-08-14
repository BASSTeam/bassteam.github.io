const attrs = Symbol('[[ElementAttributes]]'),
    childs = Symbol('[[ChildrenElements]]'),
    content = Symbol('[[ElementContent]]'),
    _ = Symbol('[[ElementData]]'),
    node = Symbol('[[Node]]');
const ElementData = new class ElementData{}
class Element {
    constructor(name, data){
        this[_] = Object.assign(ElementData, data);
        this[node] = document.createElement(name);
        for(var i in (this[_][attrs] || {})) this[node].setAttribute(i, this[_][attrs][i] || '');
        if(this[_][content]) this[node].innerHTML = this[_][content];
        for(var i in (this[_][childs] || {})) this[node].appendChild(this[_][childs][i].node);
    }
    set [node](value){}
    get src(){
        return this[node].outerHTML
    }
}
class Page{
    constructor({head, body}){
        this.head = new Element('head', head || {});
        this.body = new Element('body', body || {});
    }
    get src(){
        return this.head.src + this.body.src
    }
}
module.exports = {Page, Element, ElementData: _, attrs, childs, content, node};
