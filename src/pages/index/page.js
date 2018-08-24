module.exports = async args => {
    const {Element, ElementData, attrs, childs, content, node} = Page;
    return new Page({
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
}
