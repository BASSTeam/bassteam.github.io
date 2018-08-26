const attrs = Symbol('[[ElementAttributes]]'),
    childs = Symbol('[[ChildrenElements]]'),
    content = Symbol('[[ElementContent]]'),
    _ = Symbol('[[ElementData]]'),
    realNode = Symbol('[[Node]]');
class ElementData{}
const Element = (defaults => {
    return class Element {
        constructor(name, data){
            this[_] = Object.assign(new ElementData, data);
            this[realNode] = document.createElement(name);
            for(var i in (this[_][attrs] || {})) this[realNode].setAttribute(i, this[_][attrs][i] || '');
            if(this[_][content]) this[realNode].innerHTML = this[_][content];
            this[_][childs] = this[_][childs] || [];
            if(defaults[name]) for(var i = defaults[name].length - 1; i >= 0; i--) this[_][childs].unshift(defaults[name][i]);
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
})({
    // defaults
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
}); 
const prependChilds = (defaults => {
    return element => {
        var targetNode = element[realNode].tagName.toLowerCase();
        if(defaults[targetNode]){
            element[childs] = element[childs] || [];
            
        }
        return element
    }
})();
class Page{
    constructor({head, body}){
        this.head = prependChilds(new Element('head', head || {}));
        this.body = prependChilds(new Element('body', body || {}));
    }
    get src(){
        return this.head.src + this.body.src
    }
}
module.exports = {Page, Element, ElementData: _, attrs, childs, content};
