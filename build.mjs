import {list, copy, remove} from 'components/fs';
import notFound from './src/404';
import index from './src/index';
import app from './src/app';
import serviceWorker from './src/service-worker';
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
    var flist = [];
    (await list('.')).forEach(file => {
        if (sources.indexOf(file) == -1) flist.push(remove(file));
    });
    await Promise.all(flist); // wait until all the files have been removed
    await Promise.all([notFound(), index(), app(), serviceWorker()])
})()
