exports.page = async args => {
    const {Page, Element, ElementData, attrs, childs, content, node} = await require('/static/page.min.js');
    return new Page({
        body: {
            [childs]: [
                new Element('div', {
                    [content]: 'Created by',
                    [attrs]: {
                        id: 'main'
                    }
                }),
            ]
        }
    })
}
