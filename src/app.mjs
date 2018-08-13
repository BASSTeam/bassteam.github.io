import {write} from 'components/fs';
import uglify from 'uglify-es';
import https from 'https';
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
    await write('./app.js', _ + uglify.minify(`(${(async () => {

        /******************************\
        |                              |
        | Main executable function     |
        |                              |
        \******************************/
    
        function getArgs(locationLike){
            var search = locationLike.search.slice(1), args = {};
            if (search){
                search.split('&').forEach(arg => {
                    arg = arg.split('=');
                    args[decodeURIComponent(arg.shift())] = decodeURIComponent(arg.join('='))
                })
            }
            return args
        }
        async function routeTo(route, args){
            history.pushState(null, null, route);
        }
    
        var args = getArgs(location);
        routeTo(args.routeTo || '/', (delete args.routeTo, args));
    
        if ('serviceWorker' in navigator){
            try{
                let reg = await navigator.serviceWorker.register('/sw.js');
                if(reg.installing){
                    console.log('Service worker installing');
                } else if(reg.waiting){
                    console.log('Service worker installed');
                } else if(reg.active){
                    console.log('Service worker active');
                }
            } catch(e){
                console.log(`Registration failed with ${e}`)
            }
        }
        
    }).toString()})()`).code)
}
