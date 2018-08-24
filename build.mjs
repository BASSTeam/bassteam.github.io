import {write, list, remove} from 'components/fs';
import notFound from 'containers/404.html';
import app from 'containers/app.js';
import staticjs from 'containers/static';
import serviceWorker from 'containers/sw.js';
import router from 'containers/router.js';
import {createHash} from 'crypto';
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
        '_README.md',
    ];
    // Cleaning first
    var flist = [];
    (await list('.')).forEach(file => {
        if (sources.indexOf(file) == -1) flist.push(remove(file));
    });
    await Promise.all(flist); // wait until all the files have been removed
    await Promise.all([
        notFound(),
        app(),
        //serviceWorker(),
        staticjs(),
        router(),
    ])
})()
