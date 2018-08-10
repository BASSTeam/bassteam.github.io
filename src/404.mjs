import Page, {attrs, childs, content, Element} from 'components/page';
import {write} from 'components/fs';
export default () => write((new Page({
    body: {
        [childs]: [
            new Element('script', {
                [content]: (() => {
                    var a = document.createElement('a');
                    a.href = document.referrer;
                    location.href = `/?routeTo=${encodeURIComponent(a.pathname + a.search)}`
                }).toString(),
                [attrs]: {
                    id: 'router'
                }
            }),
        ],
        [content]: 'Look to the console'
    }
})).src, './404.html')
