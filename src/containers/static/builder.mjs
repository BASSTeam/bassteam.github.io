import {write, read, list} from 'components/fs';
import uglify from 'components/uglify-wrapper';
export default async () => {
    var folder = 'static',
        mainStack = new Proxy([], {
            set(target, name, value){
                target.push(new Promise((resolve, reject) => {
                    value.then(contents => {
                        resolve({
                            name,
                            value: contents
                        })
                    }).catch(reject)
                }));
                return true
            }
        });
    (await list(folder)).forEach(file => {
        var file = file.split('.');
        if(file.pop() == 'js' && file[file.length - 1] != 'min'){
            file = file.join('.');
            mainStack[file] = read(`${folder}/${file}.js`)
        }
    });
    mainStack = await Promise.all(mainStack);
    var res = ( _ => {
        var res = '';
        _.forEach(({name, value}) => res += JSON.stringify({name, value}));
        return res
    })(mainStack);
    mainStack.forEach(({name, value}, index) => {
        mainStack[index] = write(`${folder}/${name}.min.js`, uglify.minify(value).code)
    });
    await Promise.all(mainStack);
    return res;
}
