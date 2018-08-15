module.exports = async args => {
    const {Page, Element, ElementData, attrs, childs, content, node} = await require('/static/page.min.js');
    const br = () => new Element('br')
    return new Page({
        body: {
            [childs]: [
                new Element('div', {
                    [content]: 'Created by KaMeHb-UA',
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
