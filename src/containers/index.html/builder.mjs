import page from './page';
import {write} from 'components/fs';
export default () => write('./index.html', page.src)
