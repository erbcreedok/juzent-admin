"use strict";var precacheConfig=[["/refresh/index.html","50db07ec1a1fa23fa40e888e630813d9"],["/refresh/static/css/main.ab32b26e.css","0bac99f39e59deb4477e57a1dc5da7bd"],["/refresh/static/js/main.e8900d80.js","aa6927b42e9078ed291706c8f4be6e05"],["/refresh/static/media/HarmoniaSansProCyr-Bold.77081a5a.ttf","77081a5a83d4c4c571a951b34d026360"],["/refresh/static/media/HarmoniaSansProCyr-Regular.11c5e19f.ttf","11c5e19f17c725fbd2547e507b2c5696"],["/refresh/static/media/PTSans-Caption.25428048.ttf","254280480432b5d5af058ab426fe8bf2"],["/refresh/static/media/PTSans-CaptionBold.c41988af.ttf","c41988aff150b990bdace108fcad2a0c"],["/refresh/static/media/album_icon.0dec3ae3.png","0dec3ae32cdd83f4cf2767e93dfd92ae"],["/refresh/static/media/badge-black.fa37cdd1.png","fa37cdd114c3c004d22c28fef095183b"],["/refresh/static/media/disk.ec3bc4c5.png","ec3bc4c5859d9085f709a310d21c690d"],["/refresh/static/media/icomoon.679189a5.woff","679189a5a97195e1eece3cb2fa7ce87a"],["/refresh/static/media/icomoon.91947a13.svg","91947a132df4a06d1ce7c9633413a594"],["/refresh/static/media/icomoon.a92ab60a.ttf","a92ab60a810103b149cf94eb80efbe87"],["/refresh/static/media/icomoon.b83c95db.eot","b83c95dba3363806b38290cc0089a091"],["/refresh/static/media/logo-border.473697cb.svg","473697cb732b98431c7cf19d4dc33399"],["/refresh/static/media/slick.b7c9e1e4.woff","b7c9e1e479de3b53f1e4e30ebac2403a"],["/refresh/static/media/slick.ced611da.eot","ced611daf7709cc778da928fec876475"],["/refresh/static/media/slick.d41f55a7.ttf","d41f55a78e6f49a5512878df1737e58a"],["/refresh/static/media/slick.f97e3bbf.svg","f97e3bbf73254b0112091d0192f17aec"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),n=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(r){return setOfCachedUrls(r).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return r.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),r="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,r),e=urlsToCacheKeys.has(a));var n="/refresh/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});