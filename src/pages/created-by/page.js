module.exports = async args => {
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
}
