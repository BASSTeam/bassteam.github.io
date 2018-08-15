import Page, {attrs, childs, content, Element} from 'components/page';
import loading, {style} from 'containers/loading-animation';

export default async () => {
    return new Page({
        body: {
            [childs]: [
                new Element('style', {
                    [content]: style
                }),
                await loading(),
                new Element('div', {
                    [attrs]: {
                        id: 'body'
                    }
                }),
                new Element('script', {
                    [attrs]: {
                        src: '/app.js',
                        async: ''
                    }
                }),
            ],
        }
    })
}
