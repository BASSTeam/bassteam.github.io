var routes = (()=>{var notFound = async args => {
    const {Element, ElementData, attrs, childs, content} = Page;
    return new Page({
        body: {
            [childs]: [
                new Element('div', {
                    [content]: 'Not Found',
                    [attrs]: {
                        id: 'main'
                    }
                }),
                new Element('br'),
                new Element('a', {
                    [content]: 'Перейти на главную',
                    [attrs]: {
                        href: '/'
                    }
                })
            ]
        }
    })
}; return new Proxy({"/": async args => {
    const {Element, ElementData, attrs, childs, content} = Page;
    return new Page({
        head: {
            [childs]: [
                new Element('title', {
                    [content]: 'Material Design Lite'
                }),
            ]
        },
        body: {
            [childs]: [
                new Element('div', {
                    [content]: 'Main page',
                    [attrs]: {
                        id: 'main'
                    }
                }),
                new Element('br'),
                new Element('a', {
                    [content]: 'Перейти на createdBy',
                    [attrs]: {
                        href: '/createdBy'
                    }
                }),
                new Element('br'),
                new Element('a', {
                    [content]: 'Перейти на 404',
                    [attrs]: {
                        href: '/2131231321313'
                    }
                }),
                new Element('br'),
                new Element('a', {
                    [content]: 'Перейти на главную',
                    [attrs]: {
                        href: '/'
                    }
                })
            ]
        }
    })
},"/createdBy": async args => {
    const {Element, ElementData, attrs, childs, content} = Page;
    return new Page({
        body: {
            [childs]: [
                new Element('div', {
                    [content]: 'Created by KaMeHb-UA',
                    [attrs]: {
                        id: 'main'
                    }
                }),
                new Element('br'),
                new Element('a', {
                    [content]: 'Перейти на главную',
                    [attrs]: {
                        href: '/'
                    }
                }),
            ]
        }
    })
}}, {
    get(target, name){
        if(name in target) return target[name]; else return notFound
    }
})})(); module.exports=(path, args)=>{return routes[path](args)}