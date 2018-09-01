const attrs = Symbol('[[ElementAttributes]]'),
    childs = Symbol('[[ChildrenElements]]'),
    content = Symbol('[[ElementContent]]'),
    _ = Symbol('[[ElementData]]'),
    singleElements = [
        'meta',
    ];

import uglify from 'components/uglify-wrapper';

class Element{
    constructor(name, reference){
        if(name == 'script' && reference[content]) reference[content] = uglify.minify(`(${reference[content]})()`).code;
        this[_] = {name, reference};
    }
    get src(){
        var res = `<${this[_].name}`, i;
        for(i in (this[_].reference[attrs] || {})){
            res += ` ${i}${this[_].reference[attrs][i] ? `="${this[_].reference[attrs][i]}"` : ''}`;
        }
        if(singleElements.indexOf(this[_].name) + 1) res += '/>'; else {
            res += `>${this[_].reference[content] || ''}`;
            for(i in (this[_].reference[childs] || {})) res += this[_].reference[childs][i].src;
            res += `</${this[_].name}>`
        }
        return res;
    }
}

export {attrs, childs, content, Element};
export default class Page{
    constructor({head, body}){
        this.head = new Element('head', head || {});
        this.body = new Element('body', body || {});
    }
    get src(){
        return `<html>${this.head.src}${this.body.src}</html>\n`
    }
}
