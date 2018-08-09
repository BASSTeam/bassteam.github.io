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
function routeTo(route, args){
    history.pushState(null, null, route);
}

var args = getArgs(location);
routeTo(args['routeTo'] || '/', (delete args['routeTo'], args));
