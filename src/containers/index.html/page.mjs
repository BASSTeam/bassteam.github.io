import Page, {attrs, childs, content, Element} from 'components/page';
import loading from 'containers/loading-animation';

export default async () => {
    return new Page({
        body: {
            [childs]: [
                await loading(),
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
