const attrs = Symbol('[[ElementAttributes]]'),
    childs = Symbol('[[ChildrenElements]]'),
    content = Symbol('[[ElementContent]]'),
    _ = Symbol('[[ElementData]]'),
    realNode = Symbol('[[Node]]');
class ElementData{}
class Element {
    constructor(name, data){
        this[_] = Object.assign(new ElementData, data);
        this[realNode] = document.createElement(name);
        for(var i in (this[_][attrs] || {})) this[realNode].setAttribute(i, this[_][attrs][i] || '');
        if(this[_][content]) this[realNode].innerHTML = this[_][content];
        for(var i in (this[_][childs] || {})) this[realNode].appendChild(this[_][childs][i][realNode]);
    }
    set node(value){}
    get node(){
        return this[realNode]
    }
    get src(){
        return this[realNode].outerHTML
    }
}
const defaultHead = [
    new Element('meta', {
        [attrs]: {
            charset: 'utf-8'
        }
    }),
];
class Page{
    constructor({head, body}){
        this.head = new Element('head', (head => {
            head[childs] = head[childs] || [];
            for(var i = defaultHead.length - 1; i > 0; i--) head[childs].unshift(elem);
            return head
        })(head || {}));
        this.body = new Element('body', body || {});
    }
    get src(){
        return this.head.src + this.body.src
    }
}
module.exports = {Page, Element, ElementData: _, attrs, childs, content};
