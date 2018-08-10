import {write} from 'components/fs';
import uglify from 'uglify-es';
export default () => write(uglify.minify(`(${(() => {
    self.addEventListener('install', event => {
        /*
        event.waitUntil(caches.open('v1').then(cache => cache.addAll([
            '/sw-test/',
            '/sw-test/index.html',
            '/sw-test/style.css',
            '/sw-test/app.js',
            '/sw-test/image-list.js',
            '/sw-test/star-wars-logo.jpg',
            '/sw-test/gallery/bountyHunters.jpg',
            '/sw-test/gallery/myLittleVader.jpg',
            '/sw-test/gallery/snowTroopers.jpg'
        ])))
        */
    });

    self.addEventListener('fetch', event => {
        return new Promise(resolve => {
            resolve(`Access to: ${event.request}`)
        })
        /*
        event.respondWith(caches.match(event.request).then(function(response){
          if (response !== undefined) {
            return response;
          } else {
            return fetch(event.request).then(function (response) {
              // response may be used only once
              // we need to save clone to put one copy in cache
              // and serve second one
              let responseClone = response.clone();
              
              caches.open('v1').then(function (cache) {
                cache.put(event.request, responseClone);
              });
              return response;
            }).catch(function () {
              return caches.match('/sw-test/gallery/myLittleVader.jpg');
            });
          }
        }));
        */
    });      
}).toString()})()`).code, './sw.js')



