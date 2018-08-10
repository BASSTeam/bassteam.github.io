import {write} from 'components/fs';
import uglify from 'uglify-es';
export default () => write(uglify.minify(`(${(() => {
    const cacheName = 'v1';
    self.addEventListener('install', event => {
        event.waitUntil(caches.open(cacheName).then(cache => cache.addAll([
            '/404.html',
            '/app.js',
            '/index.html'
        ])))
    });

    self.addEventListener('fetch', event => {
        event.respondWith(caches.match(event.request).then(response => {
            if (response !== undefined) return response; else {
                return fetch(event.request).then(response => {
                    let responseClone = response.clone();
                    caches.open(cacheName).then(function (cache) {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                }).catch(() => {
                    return caches.match('/index.html');
                });
            }
        }));
    });      
}).toString()})()`).code, './sw.js')



