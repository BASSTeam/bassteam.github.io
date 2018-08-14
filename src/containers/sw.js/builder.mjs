import {write} from 'components/fs';
import uglify from 'uglify-es';
import {main} from './sw';
export default () => write('./sw.js', uglify.minify(`(${main.toString()})()`).code)



