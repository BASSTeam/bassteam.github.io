import {mkdir, list, copy} from 'components/fs';

(async () => {
    // Just for test, copy files without building
    const src = `src`,
        build = `docs`;
    await mkdir(build);
    (await list(src)).forEach(file => {
        copy(`${src}/${file}`, `${build}/${file}`)
    });
})()
