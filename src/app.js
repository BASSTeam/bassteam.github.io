exports.main /* For properly handling in some IDEs */ = async () => {

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
}