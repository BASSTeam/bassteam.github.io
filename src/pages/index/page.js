module.exports = async args => {
    const {Page, Element, ElementData, attrs, childs, content, node} = await require('/static/page.min.js');
    return new Page({
        body: {
            [childs]: [
                new Element('div', {
                    [content]: 'Main page',
                    [attrs]: {
                        id: 'main'
                    }
                }),
                br(),
                new Element('a', {
                    [content]: 'Перейти на createdBy',
                    [attrs]: {
                        href: '/createdBy'
                    }
                }),
                br(),
                new Element('a', {
                    [content]: 'Перейти на 404',
                    [attrs]: {
                        href: '/2131231321313'
                    }
                }),
                br(),
                new Element('a', {
                    [content]: 'Перейти на главную',
                    [attrs]: {
                        href: '/'
                    }
                })
            ]
        }
    })
}
