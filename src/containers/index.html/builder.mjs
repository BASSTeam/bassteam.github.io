import page from './page';
import {write} from 'components/fs';
export default async () => await write('./index.html', (await page()).src)
