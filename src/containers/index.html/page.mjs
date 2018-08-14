import Page, {attrs, childs, content, Element} from 'components/page';

export default new Page({
    body: {
        [childs]: [
            new Element('script', {
                [attrs]: {
                    src: '/app.js',
                    async: ''
                }
            }),
        ],
        [content]: 'Routing complete'
    }
})
