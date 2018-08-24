declare const Page = (() => {
    class Element {
        constructor(name: String, data: Object){}
    }
    return class Page {
        constructor(pageRef: { head: Element, body: Element }){}
        static Element: Element
        static ElementData: Symbol;
        static attrs: Symbol;
        static childs: Symbol;
        static content: Symbol;
        static node: Symbol;
        head: Element;
        body: Element;
    }
})();
