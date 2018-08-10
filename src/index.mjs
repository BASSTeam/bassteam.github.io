import Page, {attrs, childs, content, Element} from 'components/page';
import {write} from 'components/fs';
var src = (new Page({
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
})).src;
export default () => write(src, './index.html')
