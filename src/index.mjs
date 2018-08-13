import Page, {attrs, childs, content, Element} from 'components/page';
import {write} from 'components/fs';
export default () => write('./index.html', (new Page({
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
})).src)
