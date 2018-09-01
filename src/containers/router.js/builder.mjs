import {write} from 'components/fs';
import uglify from 'components/uglify-wrapper';
import pagesSrc from 'pages';
export default async () => {
    await write('./router.js', uglify.minify(pagesSrc).code);
    return pagesSrc
}
