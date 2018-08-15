import createdBy from './created-by';
import index from './index';
import notFound from './not-found';

var routes = {
    '/': index,
    '/createdBy': createdBy,
}, res = `var routes = (()=>{var notFound = ${notFound.toString()}; return new Proxy({`;
for (var i in routes){
    res += `${JSON.stringify(i)}: ${routes[i].toString()},`
}
export default res.slice(0, -1) + `}, {
    get(target, name){
        if(name in target) return target[name]; else return notFound
    }
})})(); module.exports=(path, args)=>{return routes[path](args)}`;
