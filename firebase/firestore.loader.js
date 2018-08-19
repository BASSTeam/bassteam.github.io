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
firebase.initializeApp({
    apiKey: "AIzaSyACoEdBhw3bgStudU9wmL0FPTzfhx8cFqg",
    authDomain: "bassteam-github-io.firebaseapp.com",
    databaseURL: "https://bassteam-github-io.firebaseio.com",
    projectId: "bassteam-github-io",
    storageBucket: "bassteam-github-io.appspot.com",
    messagingSenderId: "736958174627"
});
eval(storeSrc);
module.exports = firebase.firestore();
module.exports.settings({
    timestampsInSnapshots: true
});
delete window.firebase;
