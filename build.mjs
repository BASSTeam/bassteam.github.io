import {write, list, remove} from 'components/fs';
import notFound from './src/404';
import index from './src/index';
import app from './src/app_builder';
import staticjs from './src/static';
import serviceWorker from './src/service-worker';
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
    ];
    // Cleaning first
    var flist = [];
    (await list('.')).forEach(file => {
        if (sources.indexOf(file) == -1) flist.push(remove(file));
    });
    await Promise.all(flist); // wait until all the files have been removed
    await write('.buildhash', createHash('md5').update(
        (
            await Promise.all([
                notFound(),
                index(),
                app(),
                serviceWorker(),
                staticjs()
            ])
        ).join('')
    ).digest("hex"))
})()
