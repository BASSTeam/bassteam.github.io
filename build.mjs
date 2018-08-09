import {list, copy} from 'components/fs';

(async () => {
    // Just for test, copy files without building
    const src = `src`;
    (await list(src)).forEach(file => {
        copy(`${src}/${file}`, `${file}`)
    });
})()
