const attrs = Symbol('[[ElementAttributes]]'),
    childs = Symbol('[[ChildrenElements]]'),
    content = Symbol('[[ElementContent]]'),
    _ = Symbol('[[ElementData]]'),
    node = Symbol('[[Node]]');
class ElementData{}
class Element {
    constructor(name, data){
        data = Object.assign(new ElementData, data);
        return new Proxy(document.createElement(name), {
            set(target, name, value){
                target.setAttribute(name, value)
            },
            get(target, name){
                switch(name){
                    case node: return target;
                    case _: return data;
                    default: return target.getAttribute(name)
                }
            }
        })
    }
}
class Page{
    //
}
module.exports = {Page, Element, ElementData: _, attrs, childs, content, node};
