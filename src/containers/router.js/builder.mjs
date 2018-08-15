import {write} from 'components/fs';
import uglify from 'uglify-es';
import pagesSrc from 'pages';
export default async () => {
    await write('./router.js', uglify.minify(pagesSrc).code);
    return pagesSrc
}
