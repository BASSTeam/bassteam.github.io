import {list, copy, remove} from 'components/fs';

(async () => {
    const sources = [
        // List that prevents deleting source files
        '.git',
        'components',
        'node_modules',
        'src',
        'static',
        '.gitignore',
        'build.mjs',
        'package.json',
        'yarn.lock',
    ];
    // Cleaning first
    (await list('.')).forEach(file => {
        if (sources.indexOf(file) == -1) remove(file)
    });
    // Just for test, copy files without building
    const src = `src`;
    (await list(src)).forEach(file => {
        copy(`${src}/${file}`, `${file}`)
    });
})()
