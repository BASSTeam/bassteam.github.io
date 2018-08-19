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
var firebase;
await(async () => {
    var module = {exports:{}}, exports = new Proxy(module.exports, {});
    await(async () => {
        eval(await httpGet('app.js'));
    })();
    firebase = module.exports;
})();
eval(await httpGet('firestore.js'));
module.exports = firebase
