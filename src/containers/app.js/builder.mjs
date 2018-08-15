import {write} from 'components/fs';
import uglify from 'uglify-es';
import https from 'https';
import app from './app'
function download(url){
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            var res = '';
            response
                .on('data', data => res += data)
                .on('end', () => resolve(res))
                .on('error', err => reject(err))
        })
    })
}
export default async () => {
    process.stdout.write('Downloading latest module system... ');
    try{
        var _ = await download('https://raw.githubusercontent.com/KaMeHb-UA/require/master/modern_pluggable.js');
    } catch(e){
        console.log('Cannot download. Aborting...');
        throw e
    }
    console.log('Done');
    var __ = app.main.toString();
    await write('./app.js', _ + uglify.minify(`(${__})()`).code);
    return __;
}
