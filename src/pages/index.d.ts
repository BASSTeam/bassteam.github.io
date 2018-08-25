declare const Page = (() => {
    var ElementData: Symbol;
    var attrs: Symbol;
    var childs: Symbol;
    var content: Symbol;
    var node: Symbol;
    interface ElementRefference{
        [childs]?: Array<Element>;
        [attrs]?: {[s: String]: String};
        [content]?: String;
    }
    class Element{
        constructor(name: String, data: ElementRefference){}
    }
    return class Page {
        constructor(pageRef: { head: ElementRefference, body: ElementRefference }){}
        static Element = Element;
        static ElementData = ElementData;
        static attrs = attrs;
        static childs = childs;
        static content = content;
        static node = node;
        head: Element;
        body: Element;
    }
})();
