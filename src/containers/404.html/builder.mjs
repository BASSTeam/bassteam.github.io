import page from './page';
import {write} from 'components/fs';
export default async () => await write('./404.html', (await page()).src)
