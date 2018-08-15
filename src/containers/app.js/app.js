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
    })();
    new Thread(async () => {
        const [
                router,
            ] = await Promise.all([
                require('/router.js'),
            ]),
            doc = {
                body: document.getElementById('body'),
                head: document.head,
            };

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
            history.pushState(null, null, route);
            const {head, body} = (await router(route, args));
            doc.head.innerHTML = head.node.innerHTML;
            doc.body.innerHTML = body.node.innerHTML;
            doc.body.querySelectorAll('a').forEach(a => {
                a.addEventListener('click', ev => {
                    ev.preventDefault();
                    routeTo(ev.target.pathname, getArgs(ev.target)).then(disableLoadingAnim)
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
