import page from './page';
import {write} from 'components/fs';
export default async () => {
    var _ = (await page()).src;
    await write('./404.html', _);
    return _
}
