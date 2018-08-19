function httpGet(url){
    var xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) reject(new Error(`Cannot get requested module from ${url}. Error ${xhr.status}: ${xhr.statusText}`)); else resolve(xhr.responseText);
        };
        xhr.send()
    })
}
var [appSrc, storeSrc] = await Promise.all([
    httpGet(__dirname + '/app.js'),
    httpGet(__dirname + '/firestore.js'),
]);
var firebase;
(() => {
    var module = {exports:{}}, exports = new Proxy(module.exports, {});
    eval(appSrc);
    firebase = module.exports;
})();
eval(storeSrc);
module.exports = firebase
