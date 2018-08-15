module.exports = async args => {
    const {Page, Element, ElementData, attrs, childs, content, node} = await require('/static/page.min.js');
    return new Page({
        body: {
            [childs]: [
                new Element('div', {
                    [content]: 'Not Found',
                    [attrs]: {
                        id: 'main'
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
