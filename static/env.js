const passThrough = [
        'href',
        'protocol',
        'host',
        'hostname',
        'port',
        'pathname',
        'search',
        'hash',
        'origin',
    ],
    readonly = [
        'origin',
        'toString',
        'assign',
        'reload',
        'replace',
    ],
    target = new class {
        get notSupported(){
            console.warn('window.location seems to be an another Location object. So nothing to do here')
        }
    };
class Location{
    constructor(url){
        if(typeof url != 'string') throw new TypeError('Class constructor Location cannot be invoked without first string argument');
        const a = document.createElement('a');
        a.href = url;
        return new Proxy({
            toString: () => a.href,
            assign: url => a.href = url,
            reload: () => target.notSupported,
            replace: () => target.notSupported,
        }, {
            set(target, name, value){
                if (readonly.indexOf(name) != -1) throw new TypeError(`Cannot assign to read only property '${name}' of object '[object Location]'`);
                (passThrough.indexOf(name) != -1 ? a: target)[name] = value;
                return true
            },
            get(target, name){
                return (passThrough.indexOf(name) + 1 ? a: target)[name]
            }
        })
    }
}
exports.Location = Location;
