const attrs = Symbol('[[ElementAttributes]]'),
    childs = Symbol('[[ChildrenElements]]'),
    content = Symbol('[[ElementContent]]'),
    _ = Symbol('[[ElementData]]'),
    realNode = Symbol('[[Node]]');
const Element = (() => {
    var defaults;
    class ElementData{}
    class Element {
        constructor(name, data){
            this[_] = Object.assign(new ElementData, data);
            this[realNode] = document.createElement(name);
            for(var i in (this[_][attrs] || {})) this[realNode].setAttribute(i, this[_][attrs][i] || '');
            if(this[_][content]) this[realNode].innerHTML = this[_][content];
            this[_][childs] = this[_][childs] || [];
            if(defaults && defaults[name]) for(var i = defaults[name].length - 1; i >= 0; i--) this[_][childs].unshift(defaults[name][i]);
            this[_][childs].forEach(element => this[realNode].appendChild(element[realNode]))
        }
        set node(value){}
        get node(){
            return this[realNode]
        }
        get src(){
            return this[realNode].outerHTML
        }
    }
    defaults = {
        head: [
            new Element('meta', {
                [attrs]: {
                    charset: 'utf-8'
                }
            }),
        ],
        body: [
            //
        ]
    }
    return Element
})();
class Page{
    constructor({head, body}){
        this.head = new Element('head', head || {});
        this.body = new Element('body', body || {});
    }
    get src(){
        return this.head.src + this.body.src
    }
}
module.exports = {Page, Element, ElementData: _, attrs, childs, content};
