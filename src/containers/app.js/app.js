exports.main /* For properly handling in some IDEs */ = async () => {

    /******************************\
    |                              |
    | Main executable function     |
    |                              |
    \******************************/

    const Thread = (() => {
            var Threads = {};
            return class Thread{
                constructor(asyncFunc){
                    this.id = Symbol('[[ThreadIdentifier]]');
                    this.Promise = asyncFunc();
                    Threads[this.id] = this.Promise
                }
                static getById(id){
                    return Threads[id]
                }
            }
        })(),
        HTTP = new class {
            post(url, data, contentType = 'application/json'){
                var xhr = new XMLHttpRequest();
                return new Promise((resolve, reject) => {
                    xhr.open('POST', url, true);
                    xhr.setRequestHeader('Content-Type', contentType);
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState != 4) return;
                        if (xhr.status != 200) reject(new Error(`Cannot post to requested url. Error ${xhr.status}: ${xhr.statusText}`)); else resolve(xhr.responseText);
                    };
                    xhr.send(data);
                })
            }
            get(url){
                var xhr = new XMLHttpRequest();
                return new Promise((resolve, reject) => {
                    xhr.open('GET', url, true);
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState != 4) return;
                        if (xhr.status != 200) reject(new Error(`Cannot post to requested url. Error ${xhr.status}: ${xhr.statusText}`)); else resolve(xhr.responseText);
                    };
                    xhr.send();
                })
            }
        },
        logger = (() => {
            var url = 'https://bassteam-proxy.herokuapp.com/sendLog';
            async function send(data){
                await HTTP.post(url, JSON.stringify(data))
            }
            return new class Logger{
                constructor(){
                    this.err = this.error;
                }
                async log(msg){
                    await send({type: 'log', message: msg})
                }
                async warn(msg){
                    await send({type: 'warn', message: msg})
                }
                async error(msg){
                    await send({type: 'error', message: msg})
                }
            }
        })();
    new Thread(async () => {
        const {router, doc} = await (
            /**
             * @typedef Element
             * @property {HTMLElement} node
             * @property {String} src
             */
            /**
             * @typedef Page
             * @property {Element} head
             * @property {Element} body
             */
            /**
             * @callback Router
             * @param {String} router
             * @param {any} args
             * @return {Promise<Page>}
             */
            /**
             * @typedef Res
             * @property {Router} router
             * @property {{body: HTMLDivElement, head: HTMLHeadElement}} doc
             */
            /**
             * @return {Promise<Res>}
             */
            async () => {
                const [
                        router,
                        page
                    ] = await Promise.all([
                        require('/router.js'),
                        require('/static/page.min.js'),
                    ]),
                    doc = {
                        body: document.getElementById('body'),
                        head: document.head,
                    };
                window.Page = page.Page;
                delete page.Page;
                for(var i in page) window.Page[i] = page[i];
                return {router, doc}
            }
        )();
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
        const {disableLoadingAnim, enableLoadingAnim} = (() => {
            var anim = document.getElementById('loading-anim'),
                animationDuraton = 500;
            return {
                disableLoadingAnim(){
                    anim.style.opacity = 0;
                    return new Promise(resolve => {
                        setTimeout(() => {
                            anim.style.display = 'none';
                            resolve()
                        }, animationDuraton)
                    })
                },
                enableLoadingAnim(){
                    anim.style.display = 'none'
                    anim.style.opacity = 1;
                    return new Promise(resolve => setTimeout(() => resolve, animationDuraton))
                }
            }
        })();
        async function routeTo(route, args){
            enableLoadingAnim();
            logger.log(`Routing to ${route}...`);
            history.pushState(null, null, route);
            const {head, body} = (await router(route, args));
            doc.head.innerHTML = head.node.innerHTML;
            doc.body.innerHTML = body.node.innerHTML;

            doc.body.querySelectorAll('[__routeable="true"]').forEach(el => {
                el.addEventListener('click', ev => {
                    ev.preventDefault();
                    var link = el.querySelector('a');
                    if(!link || !link.getAttribute('href')) return;
                    routeTo(link.pathname, getArgs(link)).then(disableLoadingAnim)
                })
            })
        }
        await routeTo(location.pathname || '/', getArgs(location));
        await disableLoadingAnim();
    });
    /*
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
    */
}
