import page from './page';
import {write} from 'components/fs';
export default () => write('./404.html', page.src)
