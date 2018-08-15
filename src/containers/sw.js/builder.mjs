import {write} from 'components/fs';
import uglify from 'uglify-es';
import {main} from './sw';
export default async () => {
    var _ = main.toString()
    await write('./sw.js', uglify.minify(`(${_})()`).code);
    return _
}
