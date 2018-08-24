module.exports = async args => {
    const {Element, ElementData, attrs, childs, content, node} = Page;
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
}