const require=(()=>{return exports=>{exports=(url=>{return{url,xhr:new XMLHttpRequest()}})(exports);return new Promise((__filename,__dirname)=>{exports.xhr.open('GET',exports.url,true);exports.xhr.send();exports.xhr.onreadystatechange=()=>{if(exports.xhr.readyState!=4)return;if(exports.xhr.status!=200)__dirname(new Error(`Cannot require module ${exports.url}: ${exports.xhr.status} (${exports.xhr.statusText})`));else{try{let module={exports:{}};eval(`Promise.resolve((async({__filename,__dirname,exports})=>{${exports.xhr.responseText}})({__filename:${JSON.stringify(exports.url)},__dirname:${JSON.stringify((a=>{a.pop();return a.join('/')})(exports.url.split('/')))},exports:new Proxy(module.exports,{})})).then(()=>{__filename(module.exports)})`);}catch(e){__dirname(e)}}}})}})(),__filename=(a=>{return `${a[a.length-3]}://${a[a.length-2]}`})((new Error('')).stack.split(/(\w+):\/\/(\S+):\d+:\d+/)),__dirname=(a=>{a.pop();return a.join('/')})(__filename.split('/'));(async()=>{new class{constructor(e){this.id=Symbol("[[ThreadIdentifier]]"),this.Promise=e()}}(async()=>{const[e,{Page:n,Element:t,ElementData:a,attrs:i,childs:o,content:s,node:r}]=await Promise.all([require("/router.js"),require("/static/page.min.js")]),d={body:document.getElementById("body"),head:document.head};function l(e){var n=e.search.slice(1),t={};return n&&n.split("&").forEach(e=>{e=e.split("="),t[decodeURIComponent(e.shift())]=decodeURIComponent(e.join("="))}),t}const{disableLoadingAnim:c,enableLoadingAnim:m}=(()=>{var e=document.getElementById("loading-anim");return{disableLoadingAnim:()=>(e.style.opacity=0,new Promise(n=>{setTimeout(()=>{e.style.display="none",n()},500)})),enableLoadingAnim:()=>(e.style.display="none",e.style.opacity=1,new Promise(e=>setTimeout(()=>e,500)))}})();await async function n(t,a){m(),history.pushState(null,null,t);const{head:i,body:o}=await e(t,a);d.head.innerHTML=i[r].innerHTML,d.body.innerHTML=o[r].innerHTML,d.body.querySelectorAll("a").forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),n(e.target.pathname,l(e.target)).then(c)})})}(location.pathname||"/",l(location)),await c()})})();