(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const Jd="modulepreload",Qd=function(n,e){return new URL(n,e).href},ul={},Gu=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const s=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");r=l(t.map(u=>{if(u=Qd(u,i),u in ul)return;ul[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(i)for(let x=s.length-1;x>=0;x--){const _=s[x];if(_.href===u&&(!d||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Jd,d||(p.as="script"),p.crossOrigin="",p.href=u,c&&p.setAttribute("nonce",c),document.head.appendChild(p),d)return new Promise((x,_)=>{p.addEventListener("load",x),p.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return r.then(s=>{for(const o of s||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};var Tr;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Tr||(Tr={}));class Os extends Error{constructor(e,t,i){super(e),this.message=e,this.code=t,this.data=i}}const eh=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},th=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},i=t.Plugins=t.Plugins||{},r=()=>e!==null?e.name:eh(n),a=()=>r()!=="web",s=d=>{const h=l.get(d);return!!(h?.platforms.has(r())||o(d))},o=d=>{var h;return(h=t.PluginHeaders)===null||h===void 0?void 0:h.find(p=>p.name===d)},c=d=>n.console.error(d),l=new Map,u=(d,h={})=>{const p=l.get(d);if(p)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),p.proxy;const x=r(),_=o(d);let m;const f=async()=>(!m&&x in h?m=typeof h[x]=="function"?m=await h[x]():m=h[x]:e!==null&&!m&&"web"in h&&(m=typeof h.web=="function"?m=await h.web():m=h.web),m),C=(D,b)=>{var M,P;if(_){const I=_?.methods.find(k=>b===k.name);if(I)return I.rtype==="promise"?k=>t.nativePromise(d,b.toString(),k):(k,H)=>t.nativeCallback(d,b.toString(),k,H);if(D)return(M=D[b])===null||M===void 0?void 0:M.bind(D)}else{if(D)return(P=D[b])===null||P===void 0?void 0:P.bind(D);throw new Os(`"${d}" plugin is not implemented on ${x}`,Tr.Unimplemented)}},S=D=>{let b;const M=(...P)=>{const I=f().then(k=>{const H=C(k,D);if(H){const j=H(...P);return b=j?.remove,j}else throw new Os(`"${d}.${D}()" is not implemented on ${x}`,Tr.Unimplemented)});return D==="addListener"&&(I.remove=async()=>b()),I};return M.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:D,writable:!1,configurable:!1}),M},E=S("addListener"),T=S("removeListener"),y=(D,b)=>{const M=E({eventName:D},b),P=async()=>{const k=await M;T({eventName:D,callbackId:k},b)},I=new Promise(k=>M.then(()=>k({remove:P})));return I.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await P()},I},R=new Proxy({},{get(D,b){switch(b){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return _?y:E;case"removeListener":return T;default:return S(b)}}});return i[d]=R,l.set(d,{name:d,proxy:R,platforms:new Set([...Object.keys(h),..._?[x]:[]])}),R};return t.convertFileSrc||(t.convertFileSrc=d=>d),t.getPlatform=r,t.handleError=c,t.isNativePlatform=a,t.isPluginAvailable=s,t.registerPlugin=u,t.Exception=Os,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},nh=n=>n.Capacitor=th(n),_s=nh(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Pc=_s.registerPlugin;class Lc{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let i=!1;this.listeners[e]||(this.listeners[e]=[],i=!0),this.listeners[e].push(t);const a=this.windowListeners[e];a&&!a.registered&&this.addWindowListener(a),i&&this.sendRetainedArgumentsForEvent(e);const s=async()=>this.removeListener(e,t);return Promise.resolve({remove:s})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,i){const r=this.listeners[e];if(!r){if(i){let a=this.retainedEventArguments[e];a||(a=[]),a.push(t),this.retainedEventArguments[e]=a}return}r.forEach(a=>a(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:i=>{this.notifyListeners(t,i)}}}unimplemented(e="not implemented"){return new _s.Exception(e,Tr.Unimplemented)}unavailable(e="not available"){return new _s.Exception(e,Tr.Unavailable)}async removeListener(e,t){const i=this.listeners[e];if(!i)return;const r=i.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(i=>{this.notifyListeners(e,i)}))}}const dl=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),hl=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class ih extends Lc{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[r,a]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=hl(r).trim(),a=hl(a).trim(),t[r]=a}),t}async setCookie(e){try{const t=dl(e.key),i=dl(e.value),r=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",a=(e.path||"/").replace("path=",""),s=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${i||""}${r}; path=${a}; ${s};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Pc("CapacitorCookies",{web:()=>new ih});const rh=async n=>new Promise((e,t)=>{const i=new FileReader;i.onload=()=>{const r=i.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},i.onerror=r=>t(r),i.readAsDataURL(n)}),ah=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(r=>r.toLocaleLowerCase()).reduce((r,a,s)=>(r[a]=n[e[s]],r),{})},sh=(n,e=!0)=>n?Object.entries(n).reduce((i,r)=>{const[a,s]=r;let o,c;return Array.isArray(s)?(c="",s.forEach(l=>{o=e?encodeURIComponent(l):l,c+=`${a}=${o}&`}),c.slice(0,-1)):(o=e?encodeURIComponent(s):s,c=`${a}=${o}`),`${i}&${c}`},"").substr(1):null,oh=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),r=ah(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(r.includes("application/x-www-form-urlencoded")){const a=new URLSearchParams;for(const[s,o]of Object.entries(n.data||{}))a.set(s,o);t.body=a.toString()}else if(r.includes("multipart/form-data")||n.data instanceof FormData){const a=new FormData;if(n.data instanceof FormData)n.data.forEach((o,c)=>{a.append(c,o)});else for(const o of Object.keys(n.data))a.append(o,n.data[o]);t.body=a;const s=new Headers(t.headers);s.delete("content-type"),t.headers=s}else(r.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class ch extends Lc{async request(e){const t=oh(e,e.webFetchExtra),i=sh(e.params,e.shouldEncodeUrlParams),r=i?`${e.url}?${i}`:e.url,a=await fetch(r,t),s=a.headers.get("content-type")||"";let{responseType:o="text"}=a.ok?e:{};s.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await a.blob(),c=await rh(l);break;case"json":c=await a.json();break;default:c=await a.text()}const u={};return a.headers.forEach((d,h)=>{u[h]=d}),{data:c,headers:u,status:a.status,url:a.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Pc("CapacitorHttp",{web:()=>new ch});var fl;(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(fl||(fl={}));var pl;(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(pl||(pl={}));class lh extends Lc{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Pc("SystemBars",{web:()=>new lh});const Dc="181",uh=0,ml=1,dh=2,Hu=1,hh=2,ii=3,hi=0,cn=1,En=2,li=0,br=1,Ci=2,xl=3,gl=4,fh=5,Bi=100,ph=101,mh=102,xh=103,gh=104,vh=200,_h=201,yh=202,Mh=203,Ro=204,Po=205,bh=206,Sh=207,wh=208,Eh=209,Th=210,Ah=211,Ch=212,Rh=213,Ph=214,Lo=0,Do=1,zo=2,Ar=3,Io=4,Uo=5,No=6,Fo=7,Wu=0,Lh=1,Dh=2,Pi=0,zh=1,Ih=2,Uh=3,Nh=4,Fh=5,kh=6,Oh=7,Xu=300,Cr=301,Rr=302,ko=303,Oo=304,Rs=306,Bo=1e3,oi=1001,Vo=1002,yn=1003,Bh=1004,La=1005,vn=1006,Bs=1007,Hi=1008,fi=1009,qu=1010,ju=1011,la=1012,zc=1013,Yi=1014,Hn=1015,Ir=1016,Ic=1017,Uc=1018,ua=1020,$u=35902,Yu=35899,Zu=1021,Ku=1022,zn=1023,da=1026,ha=1027,Nc=1028,Fc=1029,kc=1030,Oc=1031,Bc=1033,ps=33776,ms=33777,xs=33778,gs=33779,Go=35840,Ho=35841,Wo=35842,Xo=35843,qo=36196,jo=37492,$o=37496,Yo=37808,Zo=37809,Ko=37810,Jo=37811,Qo=37812,ec=37813,tc=37814,nc=37815,ic=37816,rc=37817,ac=37818,sc=37819,oc=37820,cc=37821,lc=36492,uc=36494,dc=36495,hc=36283,fc=36284,pc=36285,mc=36286,Vh=3200,Gh=3201,Hh=0,Wh=1,Ai="",Dt="srgb",Pr="srgb-linear",ys="linear",ht="srgb",nr=7680,vl=519,Xh=512,qh=513,jh=514,Ju=515,$h=516,Yh=517,Zh=518,Kh=519,xc=35044,_l="300 es",Wn=2e3,Ms=2001;function Qu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function fa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Jh(){const n=fa("canvas");return n.style.display="block",n}const yl={};function bs(...n){const e="THREE."+n.shift();console.log(e,...n)}function Ze(...n){const e="THREE."+n.shift();console.warn(e,...n)}function wt(...n){const e="THREE."+n.shift();console.error(e,...n)}function pa(...n){const e=n.join(" ");e in yl||(yl[e]=!0,Ze(...n))}function Qh(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}class Ur{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ml=1234567;const na=Math.PI/180,ma=180/Math.PI;function ui(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function Vc(n,e){return(n%e+e)%e}function ef(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function tf(n,e,t){return n!==e?(t-n)/(e-n):0}function ia(n,e,t){return(1-t)*n+t*e}function nf(n,e,t,i){return ia(n,e,1-Math.exp(-t*i))}function rf(n,e=1){return e-Math.abs(Vc(n,e*2)-e)}function af(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function sf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function of(n,e){return n+Math.floor(Math.random()*(e-n+1))}function cf(n,e){return n+Math.random()*(e-n)}function lf(n){return n*(.5-Math.random())}function uf(n){n!==void 0&&(Ml=n);let e=Ml+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function df(n){return n*na}function hf(n){return n*ma}function ff(n){return(n&n-1)===0&&n!==0}function pf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function mf(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function xf(n,e,t,i,r){const a=Math.cos,s=Math.sin,o=a(t/2),c=s(t/2),l=a((e+i)/2),u=s((e+i)/2),d=a((e-i)/2),h=s((e-i)/2),p=a((i-e)/2),x=s((i-e)/2);switch(r){case"XYX":n.set(o*u,c*d,c*h,o*l);break;case"YZY":n.set(c*h,o*u,c*d,o*l);break;case"ZXZ":n.set(c*d,c*h,o*u,o*l);break;case"XZX":n.set(o*u,c*x,c*p,o*l);break;case"YXY":n.set(c*p,o*u,c*x,o*l);break;case"ZYZ":n.set(c*x,c*p,o*u,o*l);break;default:Ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ut(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Ct={DEG2RAD:na,RAD2DEG:ma,generateUUID:ui,clamp:et,euclideanModulo:Vc,mapLinear:ef,inverseLerp:tf,lerp:ia,damp:nf,pingpong:rf,smoothstep:af,smootherstep:sf,randInt:of,randFloat:cf,randFloatSpread:lf,seededRandom:uf,degToRad:df,radToDeg:hf,isPowerOfTwo:ff,ceilPowerOfTwo:pf,floorPowerOfTwo:mf,setQuaternionFromProperEuler:xf,normalize:ut,denormalize:Ln};class He{constructor(e=0,t=0){He.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],h=a[s+0],p=a[s+1],x=a[s+2],_=a[s+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=h,e[t+1]=p,e[t+2]=x,e[t+3]=_;return}if(d!==_||c!==h||l!==p||u!==x){let m=c*h+l*p+u*x+d*_;m<0&&(h=-h,p=-p,x=-x,_=-_,m=-m);let f=1-o;if(m<.9995){const C=Math.acos(m),S=Math.sin(C);f=Math.sin(f*C)/S,o=Math.sin(o*C)/S,c=c*f+h*o,l=l*f+p*o,u=u*f+x*o,d=d*f+_*o}else{c=c*f+h*o,l=l*f+p*o,u=u*f+x*o,d=d*f+_*o;const C=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=C,l*=C,u*=C,d*=C}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,a,s){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=a[s],h=a[s+1],p=a[s+2],x=a[s+3];return e[t]=o*x+u*d+c*p-l*h,e[t+1]=c*x+u*h+l*d-o*p,e[t+2]=l*x+u*p+o*h-c*d,e[t+3]=u*x-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),d=o(a/2),h=c(i/2),p=c(r/2),x=c(a/2);switch(s){case"XYZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"YXZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"ZXY":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"ZYX":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"YZX":this._x=h*u*d+l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d-h*p*x;break;case"XZY":this._x=h*u*d-l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d+h*p*x;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(a-l)*p,this._z=(s-r)*p}else if(i>o&&i>d){const p=2*Math.sqrt(1+i-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-i-d);this._w=(a-l)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-i-o);this._w=(s-r)/p,this._x=(a+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+s*o+r*l-a*c,this._y=r*u+s*c+a*o-i*l,this._z=a*u+s*l+i*c-r*o,this._w=s*u-i*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,i=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*i),u=2*(o*t-a*r),d=2*(a*i-s*t);return this.x=t+c*l+s*d-o*u,this.y=i+c*u+o*l-a*d,this.z=r+c*d+a*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-i*c,this.z=i*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Vs.copy(this).projectOnVector(e),this.sub(Vs)}reflect(e){return this.sub(Vs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vs=new F,bl=new Zi;class Ke{constructor(e,t,i,r,a,s,o,c,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l)}set(e,t,i,r,a,s,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],p=i[5],x=i[8],_=r[0],m=r[3],f=r[6],C=r[1],S=r[4],E=r[7],T=r[2],y=r[5],R=r[8];return a[0]=s*_+o*C+c*T,a[3]=s*m+o*S+c*y,a[6]=s*f+o*E+c*R,a[1]=l*_+u*C+d*T,a[4]=l*m+u*S+d*y,a[7]=l*f+u*E+d*R,a[2]=h*_+p*C+x*T,a[5]=h*m+p*S+x*y,a[8]=h*f+p*E+x*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*o*l-i*a*u+i*o*c+r*a*l-r*s*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*s-o*l,h=o*c-u*a,p=l*a-s*c,x=t*d+i*h+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/x;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(o*i-r*s)*_,e[3]=h*_,e[4]=(u*t-r*c)*_,e[5]=(r*a-o*t)*_,e[6]=p*_,e[7]=(i*c-l*t)*_,e[8]=(s*t-i*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Gs.makeScale(e,t)),this}rotate(e){return this.premultiply(Gs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Gs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Gs=new Ke,Sl=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wl=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function gf(){const n={enabled:!0,workingColorSpace:Pr,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===ht&&(r.r=di(r.r),r.g=di(r.g),r.b=di(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===ht&&(r.r=Sr(r.r),r.g=Sr(r.g),r.b=Sr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ai?ys:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return pa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return pa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Pr]:{primaries:e,whitePoint:i,transfer:ys,toXYZ:Sl,fromXYZ:wl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:Sl,fromXYZ:wl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),n}const at=gf();function di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Sr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ir;class vf{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{ir===void 0&&(ir=fa("canvas")),ir.width=e.width,ir.height=e.height;const r=ir.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=ir}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fa("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=di(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(di(t[i]/255)*255):t[i]=di(t[i]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let _f=0;class Gc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=ui(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(Hs(r[s].image)):a.push(Hs(r[s]))}else a=Hs(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function Hs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?vf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}let yf=0;const Ws=new F;class Wt extends Ur{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=oi,r=oi,a=vn,s=Hi,o=zn,c=fi,l=Wt.DEFAULT_ANISOTROPY,u=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:yf++}),this.uuid=ui(),this.name="",this.source=new Gc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new He(0,0),this.repeat=new He(1,1),this.center=new He(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ws).x}get height(){return this.source.getSize(Ws).y}get depth(){return this.source.getSize(Ws).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bo:e.x=e.x-Math.floor(e.x);break;case oi:e.x=e.x<0?0:1;break;case Vo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bo:e.y=e.y-Math.floor(e.y);break;case oi:e.y=e.y<0?0:1;break;case Vo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Xu;Wt.DEFAULT_ANISOTROPY=1;class Pt{constructor(e=0,t=0,i=0,r=1){Pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],x=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,E=(p+1)/2,T=(f+1)/2,y=(u+h)/4,R=(d+_)/4,D=(x+m)/4;return S>E&&S>T?S<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(S),r=y/i,a=R/i):E>T?E<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(E),i=y/r,a=D/r):T<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(T),i=R/a,r=D/a),this.set(i,r,a,t),this}let C=Math.sqrt((m-x)*(m-x)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(C)<.001&&(C=1),this.x=(m-x)/C,this.y=(d-_)/C,this.z=(h-u)/C,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mf extends Ur{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Pt(0,0,e,t),this.scissorTest=!1,this.viewport=new Pt(0,0,e,t);const r={width:e,height:t,depth:i.depth},a=new Wt(r);this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Gc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ki extends Mf{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ed extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class bf extends Wt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=yn,this.minFilter=yn,this.wrapR=oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qi{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Cn):Cn.fromBufferAttribute(a,s),Cn.applyMatrix4(e.matrixWorld),this.expandByPoint(Cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Da.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Da.copy(i.boundingBox)),Da.applyMatrix4(e.matrixWorld),this.union(Da)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cn),Cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Br),za.subVectors(this.max,Br),rr.subVectors(e.a,Br),ar.subVectors(e.b,Br),sr.subVectors(e.c,Br),yi.subVectors(ar,rr),Mi.subVectors(sr,ar),Di.subVectors(rr,sr);let t=[0,-yi.z,yi.y,0,-Mi.z,Mi.y,0,-Di.z,Di.y,yi.z,0,-yi.x,Mi.z,0,-Mi.x,Di.z,0,-Di.x,-yi.y,yi.x,0,-Mi.y,Mi.x,0,-Di.y,Di.x,0];return!Xs(t,rr,ar,sr,za)||(t=[1,0,0,0,1,0,0,0,1],!Xs(t,rr,ar,sr,za))?!1:(Ia.crossVectors(yi,Mi),t=[Ia.x,Ia.y,Ia.z],Xs(t,rr,ar,sr,za))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Kn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Kn=[new F,new F,new F,new F,new F,new F,new F,new F],Cn=new F,Da=new Qi,rr=new F,ar=new F,sr=new F,yi=new F,Mi=new F,Di=new F,Br=new F,za=new F,Ia=new F,zi=new F;function Xs(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){zi.fromArray(n,a);const o=r.x*Math.abs(zi.x)+r.y*Math.abs(zi.y)+r.z*Math.abs(zi.z),c=e.dot(zi),l=t.dot(zi),u=i.dot(zi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Sf=new Qi,Vr=new F,qs=new F;class qn{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Sf.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Vr.subVectors(e,this.center);const t=Vr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Vr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Vr.copy(e.center).add(qs)),this.expandByPoint(Vr.copy(e.center).sub(qs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Jn=new F,js=new F,Ua=new F,bi=new F,$s=new F,Na=new F,Ys=new F;class wa{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Jn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Jn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Jn.copy(this.origin).addScaledVector(this.direction,t),Jn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){js.copy(e).add(t).multiplyScalar(.5),Ua.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(js);const a=e.distanceTo(t)*.5,s=-this.direction.dot(Ua),o=bi.dot(this.direction),c=-bi.dot(Ua),l=bi.lengthSq(),u=Math.abs(1-s*s);let d,h,p,x;if(u>0)if(d=s*c-o,h=s*o-c,x=a*u,d>=0)if(h>=-x)if(h<=x){const _=1/u;d*=_,h*=_,p=d*(d+s*h+2*o)+h*(s*d+h+2*c)+l}else h=a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h=-a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-x?(d=Math.max(0,-(-s*a+o)),h=d>0?-a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l):h<=x?(d=0,h=Math.min(Math.max(-a,-c),a),p=h*(h+2*c)+l):(d=Math.max(0,-(s*a+o)),h=d>0?a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l);else h=s>0?-a:a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(js).addScaledVector(Ua,h),p}intersectSphere(e,t){Jn.subVectors(e.center,this.origin);const i=Jn.dot(this.direction),r=Jn.dot(Jn)-i*i,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=i-s,c=i+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(a=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Jn)!==null}intersectTriangle(e,t,i,r,a){$s.subVectors(t,e),Na.subVectors(i,e),Ys.crossVectors($s,Na);let s=this.direction.dot(Ys),o;if(s>0){if(r)return null;o=1}else if(s<0)o=-1,s=-s;else return null;bi.subVectors(this.origin,e);const c=o*this.direction.dot(Na.crossVectors(bi,Na));if(c<0)return null;const l=o*this.direction.dot($s.cross(bi));if(l<0||c+l>s)return null;const u=-o*bi.dot(Ys);return u<0?null:this.at(u/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ft{constructor(e,t,i,r,a,s,o,c,l,u,d,h,p,x,_,m){ft.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l,u,d,h,p,x,_,m)}set(e,t,i,r,a,s,o,c,l,u,d,h,p,x,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=a,f[5]=s,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=x,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ft().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/or.setFromMatrixColumn(e,0).length(),a=1/or.setFromMatrixColumn(e,1).length(),s=1/or.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=s*u,p=s*d,x=o*u,_=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+x*l,t[5]=h-_*l,t[9]=-o*c,t[2]=_-h*l,t[6]=x+p*l,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,x=l*u,_=l*d;t[0]=h+_*o,t[4]=x*o-p,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-o,t[2]=p*o-x,t[6]=_+h*o,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,x=l*u,_=l*d;t[0]=h-_*o,t[4]=-s*d,t[8]=x+p*o,t[1]=p+x*o,t[5]=s*u,t[9]=_-h*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,p=s*d,x=o*u,_=o*d;t[0]=c*u,t[4]=x*l-p,t[8]=h*l+_,t[1]=c*d,t[5]=_*l+h,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,p=s*l,x=o*c,_=o*l;t[0]=c*u,t[4]=_-h*d,t[8]=x*d+p,t[1]=d,t[5]=s*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+x,t[10]=h-_*d}else if(e.order==="XZY"){const h=s*c,p=s*l,x=o*c,_=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+_,t[5]=s*u,t[9]=p*d-x,t[2]=x*d-p,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wf,e,Ef)}lookAt(e,t,i){const r=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Si.crossVectors(i,hn),Si.lengthSq()===0&&(Math.abs(i.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Si.crossVectors(i,hn)),Si.normalize(),Fa.crossVectors(hn,Si),r[0]=Si.x,r[4]=Fa.x,r[8]=hn.x,r[1]=Si.y,r[5]=Fa.y,r[9]=hn.y,r[2]=Si.z,r[6]=Fa.z,r[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],p=i[13],x=i[2],_=i[6],m=i[10],f=i[14],C=i[3],S=i[7],E=i[11],T=i[15],y=r[0],R=r[4],D=r[8],b=r[12],M=r[1],P=r[5],I=r[9],k=r[13],H=r[2],j=r[6],O=r[10],se=r[14],$=r[3],ce=r[7],ue=r[11],fe=r[15];return a[0]=s*y+o*M+c*H+l*$,a[4]=s*R+o*P+c*j+l*ce,a[8]=s*D+o*I+c*O+l*ue,a[12]=s*b+o*k+c*se+l*fe,a[1]=u*y+d*M+h*H+p*$,a[5]=u*R+d*P+h*j+p*ce,a[9]=u*D+d*I+h*O+p*ue,a[13]=u*b+d*k+h*se+p*fe,a[2]=x*y+_*M+m*H+f*$,a[6]=x*R+_*P+m*j+f*ce,a[10]=x*D+_*I+m*O+f*ue,a[14]=x*b+_*k+m*se+f*fe,a[3]=C*y+S*M+E*H+T*$,a[7]=C*R+S*P+E*j+T*ce,a[11]=C*D+S*I+E*O+T*ue,a[15]=C*b+S*k+E*se+T*fe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],x=e[3],_=e[7],m=e[11],f=e[15];return x*(+a*c*d-r*l*d-a*o*h+i*l*h+r*o*p-i*c*p)+_*(+t*c*p-t*l*h+a*s*h-r*s*p+r*l*u-a*c*u)+m*(+t*l*d-t*o*p-a*s*d+i*s*p+a*o*u-i*l*u)+f*(-r*o*u-t*c*d+t*o*h+r*s*d-i*s*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],x=e[12],_=e[13],m=e[14],f=e[15],C=d*m*l-_*h*l+_*c*p-o*m*p-d*c*f+o*h*f,S=x*h*l-u*m*l-x*c*p+s*m*p+u*c*f-s*h*f,E=u*_*l-x*d*l+x*o*p-s*_*p-u*o*f+s*d*f,T=x*d*c-u*_*c-x*o*h+s*_*h+u*o*m-s*d*m,y=t*C+i*S+r*E+a*T;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/y;return e[0]=C*R,e[1]=(_*h*a-d*m*a-_*r*p+i*m*p+d*r*f-i*h*f)*R,e[2]=(o*m*a-_*c*a+_*r*l-i*m*l-o*r*f+i*c*f)*R,e[3]=(d*c*a-o*h*a-d*r*l+i*h*l+o*r*p-i*c*p)*R,e[4]=S*R,e[5]=(u*m*a-x*h*a+x*r*p-t*m*p-u*r*f+t*h*f)*R,e[6]=(x*c*a-s*m*a-x*r*l+t*m*l+s*r*f-t*c*f)*R,e[7]=(s*h*a-u*c*a+u*r*l-t*h*l-s*r*p+t*c*p)*R,e[8]=E*R,e[9]=(x*d*a-u*_*a-x*i*p+t*_*p+u*i*f-t*d*f)*R,e[10]=(s*_*a-x*o*a+x*i*l-t*_*l-s*i*f+t*o*f)*R,e[11]=(u*o*a-s*d*a-u*i*l+t*d*l+s*i*p-t*o*p)*R,e[12]=T*R,e[13]=(u*_*r-x*d*r+x*i*h-t*_*h-u*i*m+t*d*m)*R,e[14]=(x*o*r-s*_*r-x*i*c+t*_*c+s*i*m-t*o*m)*R,e[15]=(s*d*r-u*o*r+u*i*c-t*d*c-s*i*h+t*o*h)*R,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,c=e.z,l=a*s,u=a*o;return this.set(l*s+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*s,0,l*c-r*o,u*c+r*s,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,u=s+s,d=o+o,h=a*l,p=a*u,x=a*d,_=s*u,m=s*d,f=o*d,C=c*l,S=c*u,E=c*d,T=i.x,y=i.y,R=i.z;return r[0]=(1-(_+f))*T,r[1]=(p+E)*T,r[2]=(x-S)*T,r[3]=0,r[4]=(p-E)*y,r[5]=(1-(h+f))*y,r[6]=(m+C)*y,r[7]=0,r[8]=(x+S)*R,r[9]=(m-C)*R,r[10]=(1-(h+_))*R,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let a=or.set(r[0],r[1],r[2]).length();const s=or.set(r[4],r[5],r[6]).length(),o=or.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Rn.copy(this);const l=1/a,u=1/s,d=1/o;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=d,Rn.elements[9]*=d,Rn.elements[10]*=d,t.setFromRotationMatrix(Rn),i.x=a,i.y=s,i.z=o,this}makePerspective(e,t,i,r,a,s,o=Wn,c=!1){const l=this.elements,u=2*a/(t-e),d=2*a/(i-r),h=(t+e)/(t-e),p=(i+r)/(i-r);let x,_;if(c)x=a/(s-a),_=s*a/(s-a);else if(o===Wn)x=-(s+a)/(s-a),_=-2*s*a/(s-a);else if(o===Ms)x=-s/(s-a),_=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=Wn,c=!1){const l=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),p=-(i+r)/(i-r);let x,_;if(c)x=1/(s-a),_=s/(s-a);else if(o===Wn)x=-2/(s-a),_=-(s+a)/(s-a);else if(o===Ms)x=-1/(s-a),_=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const or=new F,Rn=new ft,wf=new F(0,0,0),Ef=new F(1,1,1),Si=new F,Fa=new F,hn=new F,El=new ft,Tl=new Zi;class pi{constructor(e=0,t=0,i=0,r=pi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-et(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-et(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return El.makeRotationFromQuaternion(e),this.setFromRotationMatrix(El,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tl.setFromEuler(this),this.setFromQuaternion(Tl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pi.DEFAULT_ORDER="XYZ";class Hc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Tf=0;const Al=new F,cr=new Zi,Qn=new ft,ka=new F,Gr=new F,Af=new F,Cf=new Zi,Cl=new F(1,0,0),Rl=new F(0,1,0),Pl=new F(0,0,1),Ll={type:"added"},Rf={type:"removed"},lr={type:"childadded",child:null},Zs={type:"childremoved",child:null};class en extends Ur{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const e=new F,t=new pi,i=new Zi,r=new F(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new Ke}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.multiply(cr),this}rotateOnWorldAxis(e,t){return cr.setFromAxisAngle(e,t),this.quaternion.premultiply(cr),this}rotateX(e){return this.rotateOnAxis(Cl,e)}rotateY(e){return this.rotateOnAxis(Rl,e)}rotateZ(e){return this.rotateOnAxis(Pl,e)}translateOnAxis(e,t){return Al.copy(e).applyQuaternion(this.quaternion),this.position.add(Al.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cl,e)}translateY(e){return this.translateOnAxis(Rl,e)}translateZ(e){return this.translateOnAxis(Pl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ka.copy(e):ka.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qn.lookAt(Gr,ka,this.up):Qn.lookAt(ka,Gr,this.up),this.quaternion.setFromRotationMatrix(Qn),r&&(Qn.extractRotation(r.matrixWorld),cr.setFromRotationMatrix(Qn),this.quaternion.premultiply(cr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(wt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ll),lr.child=e,this.dispatchEvent(lr),lr.child=null):wt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rf),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ll),lr.child=e,this.dispatchEvent(lr),lr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,e,Af),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gr,Cf,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),p=s(e.animations),x=s(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=r,i;function s(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}en.DEFAULT_UP=new F(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pn=new F,ei=new F,Ks=new F,ti=new F,ur=new F,dr=new F,Dl=new F,Js=new F,Qs=new F,eo=new F,to=new Pt,no=new Pt,io=new Pt;class Tn{constructor(e=new F,t=new F,i=new F){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Pn.subVectors(e,t),r.cross(Pn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){Pn.subVectors(r,t),ei.subVectors(i,t),Ks.subVectors(e,t);const s=Pn.dot(Pn),o=Pn.dot(ei),c=Pn.dot(Ks),l=ei.dot(ei),u=ei.dot(Ks),d=s*l-o*o;if(d===0)return a.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,x=(s*u-o*c)*h;return a.set(1-p-x,x,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,ti)===null?!1:ti.x>=0&&ti.y>=0&&ti.x+ti.y<=1}static getInterpolation(e,t,i,r,a,s,o,c){return this.getBarycoord(e,t,i,r,ti)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,ti.x),c.addScaledVector(s,ti.y),c.addScaledVector(o,ti.z),c)}static getInterpolatedAttribute(e,t,i,r,a,s){return to.setScalar(0),no.setScalar(0),io.setScalar(0),to.fromBufferAttribute(e,t),no.fromBufferAttribute(e,i),io.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(to,a.x),s.addScaledVector(no,a.y),s.addScaledVector(io,a.z),s}static isFrontFacing(e,t,i,r){return Pn.subVectors(i,t),ei.subVectors(e,t),Pn.cross(ei).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),Pn.cross(ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Tn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Tn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return Tn.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return Tn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Tn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let s,o;ur.subVectors(r,i),dr.subVectors(a,i),Js.subVectors(e,i);const c=ur.dot(Js),l=dr.dot(Js);if(c<=0&&l<=0)return t.copy(i);Qs.subVectors(e,r);const u=ur.dot(Qs),d=dr.dot(Qs);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(ur,s);eo.subVectors(e,a);const p=ur.dot(eo),x=dr.dot(eo);if(x>=0&&p<=x)return t.copy(a);const _=p*l-c*x;if(_<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(i).addScaledVector(dr,o);const m=u*x-p*d;if(m<=0&&d-u>=0&&p-x>=0)return Dl.subVectors(a,r),o=(d-u)/(d-u+(p-x)),t.copy(r).addScaledVector(Dl,o);const f=1/(m+_+h);return s=_*f,o=h*f,t.copy(i).addScaledVector(ur,s).addScaledVector(dr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const td={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wi={h:0,s:0,l:0},Oa={h:0,s:0,l:0};function ro(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class nt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=at.workingColorSpace){if(e=Vc(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=ro(s,a,e+1/3),this.g=ro(s,a,e),this.b=ro(s,a,e-1/3)}return at.colorSpaceToWorking(this,r),this}setStyle(e,t=Dt){function i(a){a!==void 0&&parseFloat(a)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const i=td[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=Sr(e.r),this.g=Sr(e.g),this.b=Sr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return at.workingToColorSpace(Kt.copy(this),e),Math.round(et(Kt.r*255,0,255))*65536+Math.round(et(Kt.g*255,0,255))*256+Math.round(et(Kt.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Kt.copy(this),t);const i=Kt.r,r=Kt.g,a=Kt.b,s=Math.max(i,r,a),o=Math.min(i,r,a);let c,l;const u=(o+s)/2;if(o===s)c=0,l=0;else{const d=s-o;switch(l=u<=.5?d/(s+o):d/(2-s-o),s){case i:c=(r-a)/d+(r<a?6:0);break;case r:c=(a-i)/d+2;break;case a:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Kt.copy(this),t),e.r=Kt.r,e.g=Kt.g,e.b=Kt.b,e}getStyle(e=Dt){at.workingToColorSpace(Kt.copy(this),e);const t=Kt.r,i=Kt.g,r=Kt.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(wi),this.setHSL(wi.h+e,wi.s+t,wi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(wi),e.getHSL(Oa);const i=ia(wi.h,Oa.h,t),r=ia(wi.s,Oa.s,t),a=ia(wi.l,Oa.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Kt=new nt;nt.NAMES=td;let Pf=0;class er extends Ur{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pf++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=br,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ro,this.blendDst=Po,this.blendEquation=Bi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new nt(0,0,0),this.blendAlpha=0,this.depthFunc=Ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nr,this.stencilZFail=nr,this.stencilZPass=nr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==br&&(i.blending=this.blending),this.side!==hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ro&&(i.blendSrc=this.blendSrc),this.blendDst!==Po&&(i.blendDst=this.blendDst),this.blendEquation!==Bi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ar&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==nr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==nr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==nr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class si extends er{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=Wu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Lt=new F,Ba=new He;let Lf=0;class Vt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Lf++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=xc,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ba.fromBufferAttribute(this,t),Ba.applyMatrix3(e),this.setXY(t,Ba.x,Ba.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix3(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ut(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ln(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ln(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ln(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ln(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),r=ut(r,this.array),a=ut(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xc&&(e.usage=this.usage),e}}class nd extends Vt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class id extends Vt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ct extends Vt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Df=0;const bn=new ft,ao=new en,hr=new F,fn=new Qi,Hr=new Qi,Bt=new F;class bt extends Ur{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qu(e)?id:nd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ke().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return bn.makeRotationFromQuaternion(e),this.applyMatrix4(bn),this}rotateX(e){return bn.makeRotationX(e),this.applyMatrix4(bn),this}rotateY(e){return bn.makeRotationY(e),this.applyMatrix4(bn),this}rotateZ(e){return bn.makeRotationZ(e),this.applyMatrix4(bn),this}translate(e,t,i){return bn.makeTranslation(e,t,i),this.applyMatrix4(bn),this}scale(e,t,i){return bn.makeScale(e,t,i),this.applyMatrix4(bn),this}lookAt(e){return ao.lookAt(e),ao.updateMatrix(),this.applyMatrix4(ao.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hr).negate(),this.translate(hr.x,hr.y,hr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new ct(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];fn.setFromBufferAttribute(a),this.morphTargetsRelative?(Bt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Bt),Bt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Bt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&wt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){wt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Hr.setFromBufferAttribute(o),this.morphTargetsRelative?(Bt.addVectors(fn.min,Hr.min),fn.expandByPoint(Bt),Bt.addVectors(fn.max,Hr.max),fn.expandByPoint(Bt)):(fn.expandByPoint(Hr.min),fn.expandByPoint(Hr.max))}fn.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)Bt.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(Bt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Bt.fromBufferAttribute(o,l),c&&(hr.fromBufferAttribute(e,l),Bt.add(hr)),r=Math.max(r,i.distanceToSquared(Bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&wt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){wt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Vt(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<i.count;D++)o[D]=new F,c[D]=new F;const l=new F,u=new F,d=new F,h=new He,p=new He,x=new He,_=new F,m=new F;function f(D,b,M){l.fromBufferAttribute(i,D),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,M),h.fromBufferAttribute(a,D),p.fromBufferAttribute(a,b),x.fromBufferAttribute(a,M),u.sub(l),d.sub(l),p.sub(h),x.sub(h);const P=1/(p.x*x.y-x.x*p.y);isFinite(P)&&(_.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(P),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(P),o[D].add(_),o[b].add(_),o[M].add(_),c[D].add(m),c[b].add(m),c[M].add(m))}let C=this.groups;C.length===0&&(C=[{start:0,count:e.count}]);for(let D=0,b=C.length;D<b;++D){const M=C[D],P=M.start,I=M.count;for(let k=P,H=P+I;k<H;k+=3)f(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const S=new F,E=new F,T=new F,y=new F;function R(D){T.fromBufferAttribute(r,D),y.copy(T);const b=o[D];S.copy(b),S.sub(T.multiplyScalar(T.dot(b))).normalize(),E.crossVectors(y,b);const P=E.dot(c[D])<0?-1:1;s.setXYZW(D,S.x,S.y,S.z,P)}for(let D=0,b=C.length;D<b;++D){const M=C[D],P=M.start,I=M.count;for(let k=P,H=P+I;k<H;k+=3)R(e.getX(k+0)),R(e.getX(k+1)),R(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Vt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new F,a=new F,s=new F,o=new F,c=new F,l=new F,u=new F,d=new F;if(e)for(let h=0,p=e.count;h<p;h+=3){const x=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,_),s.fromBufferAttribute(t,m),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),o.fromBufferAttribute(i,x),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(x,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Bt.fromBufferAttribute(e,t),Bt.normalize(),e.setXYZ(t,Bt.x,Bt.y,Bt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,x=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*u;for(let f=0;f<u;f++)h[x++]=l[p++]}return new Vt(h,u,d)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new bt,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,i);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const a=e.morphAttributes;for(const l in a){const u=[],d=a[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zl=new ft,Ii=new wa,Va=new qn,Il=new F,Ga=new F,Ha=new F,Wa=new F,so=new F,Xa=new F,Ul=new F,qa=new F;class Rt extends en{constructor(e=new bt,t=new si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){Xa.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const u=o[c],d=a[c];u!==0&&(so.fromBufferAttribute(d,e),s?Xa.addScaledVector(so,u):Xa.addScaledVector(so.sub(t),u))}t.add(Xa)}return t}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Va.copy(i.boundingSphere),Va.applyMatrix4(a),Ii.copy(e.ray).recast(e.near),!(Va.containsPoint(Ii.origin)===!1&&(Ii.intersectSphere(Va,Il)===null||Ii.origin.distanceToSquared(Il)>(e.far-e.near)**2))&&(zl.copy(a).invert(),Ii.copy(e.ray).applyMatrix4(zl),!(i.boundingBox!==null&&Ii.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ii)))}_computeIntersections(e,t,i){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let x=0,_=h.length;x<_;x++){const m=h[x],f=s[m.materialIndex],C=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let E=C,T=S;E<T;E+=3){const y=o.getX(E),R=o.getX(E+1),D=o.getX(E+2);r=ja(this,f,e,i,l,u,d,y,R,D),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=x,f=_;m<f;m+=3){const C=o.getX(m),S=o.getX(m+1),E=o.getX(m+2);r=ja(this,s,e,i,l,u,d,C,S,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let x=0,_=h.length;x<_;x++){const m=h[x],f=s[m.materialIndex],C=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=C,T=S;E<T;E+=3){const y=E,R=E+1,D=E+2;r=ja(this,f,e,i,l,u,d,y,R,D),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=x,f=_;m<f;m+=3){const C=m,S=m+1,E=m+2;r=ja(this,s,e,i,l,u,d,C,S,E),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function zf(n,e,t,i,r,a,s,o){let c;if(e.side===cn?c=i.intersectTriangle(s,a,r,!0,o):c=i.intersectTriangle(r,a,s,e.side===hi,o),c===null)return null;qa.copy(o),qa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(qa);return l<t.near||l>t.far?null:{distance:l,point:qa.clone(),object:n}}function ja(n,e,t,i,r,a,s,o,c,l){n.getVertexPosition(o,Ga),n.getVertexPosition(c,Ha),n.getVertexPosition(l,Wa);const u=zf(n,e,t,i,Ga,Ha,Wa,Ul);if(u){const d=new F;Tn.getBarycoord(Ul,Ga,Ha,Wa,d),r&&(u.uv=Tn.getInterpolatedAttribute(r,o,c,l,d,new He)),a&&(u.uv1=Tn.getInterpolatedAttribute(a,o,c,l,d,new He)),s&&(u.normal=Tn.getInterpolatedAttribute(s,o,c,l,d,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new F,materialIndex:0};Tn.getNormal(Ga,Ha,Wa,h.normal),u.face=h,u.barycoord=d}return u}class Ea extends bt{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],l=[],u=[],d=[];let h=0,p=0;x("z","y","x",-1,-1,i,t,e,s,a,0),x("z","y","x",1,-1,i,t,-e,s,a,1),x("x","z","y",1,1,e,i,t,r,s,2),x("x","z","y",1,-1,e,i,-t,r,s,3),x("x","y","z",1,-1,e,t,i,r,a,4),x("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new ct(l,3)),this.setAttribute("normal",new ct(u,3)),this.setAttribute("uv",new ct(d,2));function x(_,m,f,C,S,E,T,y,R,D,b){const M=E/R,P=T/D,I=E/2,k=T/2,H=y/2,j=R+1,O=D+1;let se=0,$=0;const ce=new F;for(let ue=0;ue<O;ue++){const fe=ue*P-k;for(let be=0;be<j;be++){const Be=be*M-I;ce[_]=Be*C,ce[m]=fe*S,ce[f]=H,l.push(ce.x,ce.y,ce.z),ce[_]=0,ce[m]=0,ce[f]=y>0?1:-1,u.push(ce.x,ce.y,ce.z),d.push(be/R),d.push(1-ue/D),se+=1}}for(let ue=0;ue<D;ue++)for(let fe=0;fe<R;fe++){const be=h+fe+j*ue,Be=h+fe+j*(ue+1),Ge=h+(fe+1)+j*(ue+1),Me=h+(fe+1)+j*ue;c.push(be,Be,Me),c.push(Be,Ge,Me),$+=6}o.addGroup(p,$,b),p+=$,h+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ea(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Lr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function on(n){const e={};for(let t=0;t<n.length;t++){const i=Lr(n[t]);for(const r in i)e[r]=i[r]}return e}function If(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function rd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Uf={clone:Lr,merge:on};var Nf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ff=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qt extends er{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nf,this.fragmentShader=Ff,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Lr(e.uniforms),this.uniformsGroups=If(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class ad extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=Wn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ei=new F,Nl=new He,Fl=new He;class wn extends ad{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ma*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(na*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ma*2*Math.atan(Math.tan(na*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z),Ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ei.x,Ei.y).multiplyScalar(-e/Ei.z)}getViewSize(e,t){return this.getViewBounds(e,Nl,Fl),t.subVectors(Fl,Nl)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(na*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const fr=-90,pr=1;class kf extends en{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(fr,pr,e,t);r.layers=this.layers,this.add(r);const a=new wn(fr,pr,e,t);a.layers=this.layers,this.add(a);const s=new wn(fr,pr,e,t);s.layers=this.layers,this.add(s);const o=new wn(fr,pr,e,t);o.layers=this.layers,this.add(o);const c=new wn(fr,pr,e,t);c.layers=this.layers,this.add(c);const l=new wn(fr,pr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,c]=t;for(const l of t)this.remove(l);if(e===Wn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ms)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,a),e.setRenderTarget(i,1,r),e.render(t,s),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class sd extends Wt{constructor(e=[],t=Cr,i,r,a,s,o,c,l,u){super(e,t,i,r,a,s,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Of extends Ki{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new sd(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ea(5,5,5),a=new Qt({name:"CubemapFromEquirect",uniforms:Lr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:li});a.uniforms.tEquirect.value=t;const s=new Rt(r,a),o=t.minFilter;return t.minFilter===Hi&&(t.minFilter=vn),new kf(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}}class _n extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bf={type:"move"};class oo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _n,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _n,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _n,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,x=.005;l.inputState.pinching&&h>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bf)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new _n;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Vf extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pi,this.environmentIntensity=1,this.environmentRotation=new pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Gf{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=xc,this.updateRanges=[],this.version=0,this.uuid=ui()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,a=this.stride;r<a;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ui()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const sn=new F;class Ss{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ut(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ln(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ln(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ln(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ln(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),i=ut(i,this.array),r=ut(r,this.array),a=ut(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=a,this}clone(e){if(e===void 0){bs("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[r+a])}return new Vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ss(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){bs("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[r+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ps extends er{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let mr;const Wr=new F,xr=new F,gr=new F,vr=new He,Xr=new He,od=new ft,$a=new F,qr=new F,Ya=new F,kl=new He,co=new He,Ol=new He;class Wc extends en{constructor(e=new Ps){if(super(),this.isSprite=!0,this.type="Sprite",mr===void 0){mr=new bt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Gf(t,5);mr.setIndex([0,1,2,0,2,3]),mr.setAttribute("position",new Ss(i,3,0,!1)),mr.setAttribute("uv",new Ss(i,2,3,!1))}this.geometry=mr,this.material=e,this.center=new He(.5,.5),this.count=1}raycast(e,t){e.camera===null&&wt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),xr.setFromMatrixScale(this.matrixWorld),od.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),gr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&xr.multiplyScalar(-gr.z);const i=this.material.rotation;let r,a;i!==0&&(a=Math.cos(i),r=Math.sin(i));const s=this.center;Za($a.set(-.5,-.5,0),gr,s,xr,r,a),Za(qr.set(.5,-.5,0),gr,s,xr,r,a),Za(Ya.set(.5,.5,0),gr,s,xr,r,a),kl.set(0,0),co.set(1,0),Ol.set(1,1);let o=e.ray.intersectTriangle($a,qr,Ya,!1,Wr);if(o===null&&(Za(qr.set(-.5,.5,0),gr,s,xr,r,a),co.set(0,1),o=e.ray.intersectTriangle($a,Ya,qr,!1,Wr),o===null))return;const c=e.ray.origin.distanceTo(Wr);c<e.near||c>e.far||t.push({distance:c,point:Wr.clone(),uv:Tn.getInterpolation(Wr,$a,qr,Ya,kl,co,Ol,new He),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Za(n,e,t,i,r,a){vr.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Xr.x=a*vr.x-r*vr.y,Xr.y=r*vr.x+a*vr.y):Xr.copy(vr),n.copy(e),n.x+=Xr.x,n.y+=Xr.y,n.applyMatrix4(od)}class Xc extends Wt{constructor(e=null,t=1,i=1,r,a,s,o,c,l=yn,u=yn,d,h){super(null,s,o,c,l,u,r,a,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bl extends Vt{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _r=new ft,Vl=new ft,Ka=[],Gl=new Qi,Hf=new ft,jr=new Rt,$r=new qn;class Wf extends Rt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Hf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_r),Gl.copy(e.boundingBox).applyMatrix4(_r),this.boundingBox.union(Gl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new qn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,_r),$r.copy(e.boundingSphere).applyMatrix4(_r),this.boundingSphere.union($r)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,s=e*a+1;for(let o=0;o<i.length;o++)i[o]=r[s+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(jr.geometry=this.geometry,jr.material=this.material,jr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$r.copy(this.boundingSphere),$r.applyMatrix4(i),e.ray.intersectsSphere($r)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,_r),Vl.multiplyMatrices(i,_r),jr.matrixWorld=Vl,jr.raycast(e,Ka);for(let s=0,o=Ka.length;s<o;s++){const c=Ka[s];c.instanceId=a,c.object=this,t.push(c)}Ka.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Bl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new Xc(new Float32Array(r*this.count),r,this.count,Nc,Hn));const a=this.morphTexture.source.data.data;let s=0;for(let l=0;l<i.length;l++)s+=i[l];const o=this.geometry.morphTargetsRelative?1:1-s,c=r*e;a[c]=o,a.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const lo=new F,Xf=new F,qf=new Ke;class Oi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=lo.subVectors(i,t).cross(Xf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(lo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||qf.getNormalMatrix(e),r=this.coplanarPoint(lo).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ui=new qn,jf=new He(.5,.5),Ja=new F;class cd{constructor(e=new Oi,t=new Oi,i=new Oi,r=new Oi,a=new Oi,s=new Oi){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Wn,i=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],l=a[3],u=a[4],d=a[5],h=a[6],p=a[7],x=a[8],_=a[9],m=a[10],f=a[11],C=a[12],S=a[13],E=a[14],T=a[15];if(r[0].setComponents(l-s,p-u,f-x,T-C).normalize(),r[1].setComponents(l+s,p+u,f+x,T+C).normalize(),r[2].setComponents(l+o,p+d,f+_,T+S).normalize(),r[3].setComponents(l-o,p-d,f-_,T-S).normalize(),i)r[4].setComponents(c,h,m,E).normalize(),r[5].setComponents(l-c,p-h,f-m,T-E).normalize();else if(r[4].setComponents(l-c,p-h,f-m,T-E).normalize(),t===Wn)r[5].setComponents(l+c,p+h,f+m,T+E).normalize();else if(t===Ms)r[5].setComponents(c,h,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(e){Ui.center.set(0,0,0);const t=jf.distanceTo(e.center);return Ui.radius=.7071067811865476+t,Ui.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Ja.x=r.normal.x>0?e.max.x:e.min.x,Ja.y=r.normal.y>0?e.max.y:e.min.y,Ja.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ja)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wi extends er{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new nt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ws=new F,Es=new F,Hl=new ft,Yr=new wa,Qa=new qn,uo=new F,Wl=new F;class gc extends en{constructor(e=new bt,t=new Wi){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,a=t.count;r<a;r++)ws.fromBufferAttribute(t,r-1),Es.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ws.distanceTo(Es);e.setAttribute("lineDistance",new ct(i,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Qa.copy(i.boundingSphere),Qa.applyMatrix4(r),Qa.radius+=a,e.ray.intersectsSphere(Qa)===!1)return;Hl.copy(r).invert(),Yr.copy(e.ray).applyMatrix4(Hl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const p=Math.max(0,s.start),x=Math.min(u.count,s.start+s.count);for(let _=p,m=x-1;_<m;_+=l){const f=u.getX(_),C=u.getX(_+1),S=es(this,e,Yr,c,f,C,_);S&&t.push(S)}if(this.isLineLoop){const _=u.getX(x-1),m=u.getX(p),f=es(this,e,Yr,c,_,m,x-1);f&&t.push(f)}}else{const p=Math.max(0,s.start),x=Math.min(h.count,s.start+s.count);for(let _=p,m=x-1;_<m;_+=l){const f=es(this,e,Yr,c,_,_+1,_);f&&t.push(f)}if(this.isLineLoop){const _=es(this,e,Yr,c,x-1,p,x-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function es(n,e,t,i,r,a,s){const o=n.geometry.attributes.position;if(ws.fromBufferAttribute(o,r),Es.fromBufferAttribute(o,a),t.distanceSqToSegment(ws,Es,uo,Wl)>i)return;uo.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(uo);if(!(l<e.near||l>e.far))return{distance:l,point:Wl.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const Xl=new F,ql=new F;class vc extends gc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,a=t.count;r<a;r+=2)Xl.fromBufferAttribute(t,r),ql.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Xl.distanceTo(ql);e.setAttribute("lineDistance",new ct(i,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ld extends er{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new nt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jl=new ft,_c=new wa,ts=new qn,ns=new F;class ud extends en{constructor(e=new bt,t=new ld){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ts.copy(i.boundingSphere),ts.applyMatrix4(r),ts.radius+=a,e.ray.intersectsSphere(ts)===!1)return;jl.copy(r).invert(),_c.copy(e.ray).applyMatrix4(jl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,s.start),p=Math.min(l.count,s.start+s.count);for(let x=h,_=p;x<_;x++){const m=l.getX(x);ns.fromBufferAttribute(d,m),$l(ns,m,c,r,e,t,this)}}else{const h=Math.max(0,s.start),p=Math.min(d.count,s.start+s.count);for(let x=h,_=p;x<_;x++)ns.fromBufferAttribute(d,x),$l(ns,x,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function $l(n,e,t,i,r,a,s){const o=_c.distanceSqToPoint(n);if(o<t){const c=new F;_c.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;a.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class qc extends Wt{constructor(e,t,i,r,a,s,o,c,l){super(e,t,i,r,a,s,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class dd extends Wt{constructor(e,t,i=Yi,r,a,s,o=yn,c=yn,l,u=da,d=1){if(u!==da&&u!==ha)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,a,s,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Gc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class hd extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class jc extends bt{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const a=[],s=[],o=[],c=[],l=new F,u=new He;s.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const p=i+d/t*r;l.x=e*Math.cos(p),l.y=e*Math.sin(p),s.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(s[h]/e+1)/2,u.y=(s[h+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new ct(s,3)),this.setAttribute("normal",new ct(o,3)),this.setAttribute("uv",new ct(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class $c extends bt{constructor(e=1,t=1,i=1,r=32,a=1,s=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),a=Math.floor(a);const u=[],d=[],h=[],p=[];let x=0;const _=[],m=i/2;let f=0;C(),s===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new ct(d,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(p,2));function C(){const E=new F,T=new F;let y=0;const R=(t-e)/i;for(let D=0;D<=a;D++){const b=[],M=D/a,P=M*(t-e)+e;for(let I=0;I<=r;I++){const k=I/r,H=k*c+o,j=Math.sin(H),O=Math.cos(H);T.x=P*j,T.y=-M*i+m,T.z=P*O,d.push(T.x,T.y,T.z),E.set(j,R,O).normalize(),h.push(E.x,E.y,E.z),p.push(k,1-M),b.push(x++)}_.push(b)}for(let D=0;D<r;D++)for(let b=0;b<a;b++){const M=_[b][D],P=_[b+1][D],I=_[b+1][D+1],k=_[b][D+1];(e>0||b!==0)&&(u.push(M,P,k),y+=3),(t>0||b!==a-1)&&(u.push(P,I,k),y+=3)}l.addGroup(f,y,0),f+=y}function S(E){const T=x,y=new He,R=new F;let D=0;const b=E===!0?e:t,M=E===!0?1:-1;for(let I=1;I<=r;I++)d.push(0,m*M,0),h.push(0,M,0),p.push(.5,.5),x++;const P=x;for(let I=0;I<=r;I++){const H=I/r*c+o,j=Math.cos(H),O=Math.sin(H);R.x=b*O,R.y=m*M,R.z=b*j,d.push(R.x,R.y,R.z),h.push(0,M,0),y.x=j*.5+.5,y.y=O*.5*M+.5,p.push(y.x,y.y),x++}for(let I=0;I<r;I++){const k=T+I,H=P+I;E===!0?u.push(H,H+1,k):u.push(H+1,H,k),D+=3}l.addGroup(f,D,E===!0?1:2),f+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $c(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class xi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ze("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const a=i.length;let s;t?s=t:s=e*i[a-1];let o=0,c=a-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=i[r]-s,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===s)return r/(a-1);const u=i[r],h=i[r+1]-u,p=(s-u)/h;return(r+p)/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);const s=this.getPoint(r),o=this.getPoint(a),c=t||(s.isVector2?new He:new F);return c.copy(o).sub(s).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new F,r=[],a=[],s=[],o=new F,c=new ft;for(let p=0;p<=e;p++){const x=p/e;r[p]=this.getTangentAt(x,new F)}a[0]=new F,s[0]=new F;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),h<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],o),s[0].crossVectors(r[0],a[0]);for(let p=1;p<=e;p++){if(a[p]=a[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const x=Math.acos(et(r[p-1].dot(r[p]),-1,1));a[p].applyMatrix4(c.makeRotationAxis(o,x))}s[p].crossVectors(r[p],a[p])}if(t===!0){let p=Math.acos(et(a[0].dot(a[e]),-1,1));p/=e,r[0].dot(o.crossVectors(a[0],a[e]))>0&&(p=-p);for(let x=1;x<=e;x++)a[x].applyMatrix4(c.makeRotationAxis(r[x],p*x)),s[x].crossVectors(r[x],a[x])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class fd extends xi{constructor(e=0,t=0,i=1,r=1,a=0,s=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new He){const i=t,r=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(s?a=0:a=r),this.aClockwise===!0&&!s&&(a===r?a=-r:a=a-r);const o=this.aStartAngle+e*a;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,p=l-this.aY;c=h*u-p*d+this.aX,l=h*d+p*u+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class $f extends fd{constructor(e,t,i,r,a,s){super(e,t,i,i,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}}function Yc(){let n=0,e=0,t=0,i=0;function r(a,s,o,c){n=a,e=o,t=-3*a+3*s-2*o-c,i=2*a-2*s+o+c}return{initCatmullRom:function(a,s,o,c,l){r(s,o,l*(o-a),l*(c-s))},initNonuniformCatmullRom:function(a,s,o,c,l,u,d){let h=(s-a)/l-(o-a)/(l+u)+(o-s)/u,p=(o-s)/u-(c-s)/(u+d)+(c-o)/d;h*=u,p*=u,r(s,o,h,p)},calc:function(a){const s=a*a,o=s*a;return n+e*a+t*s+i*o}}}const is=new F,ho=new Yc,fo=new Yc,po=new Yc;class pd extends xi{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new F){const i=t,r=this.points,a=r.length,s=(a-(this.closed?0:1))*e;let o=Math.floor(s),c=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:c===0&&o===a-1&&(o=a-2,c=1);let l,u;this.closed||o>0?l=r[(o-1)%a]:(is.subVectors(r[0],r[1]).add(r[0]),l=is);const d=r[o%a],h=r[(o+1)%a];if(this.closed||o+2<a?u=r[(o+2)%a]:(is.subVectors(r[a-1],r[a-2]).add(r[a-1]),u=is),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);_<1e-4&&(_=1),x<1e-4&&(x=_),m<1e-4&&(m=_),ho.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,x,_,m),fo.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,x,_,m),po.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,x,_,m)}else this.curveType==="catmullrom"&&(ho.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),fo.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),po.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return i.set(ho.calc(c),fo.calc(c),po.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new F().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Yl(n,e,t,i,r){const a=(i-e)*.5,s=(r-t)*.5,o=n*n,c=n*o;return(2*t-2*i+a+s)*c+(-3*t+3*i-2*a-s)*o+a*n+t}function Yf(n,e){const t=1-n;return t*t*e}function Zf(n,e){return 2*(1-n)*n*e}function Kf(n,e){return n*n*e}function ra(n,e,t,i){return Yf(n,e)+Zf(n,t)+Kf(n,i)}function Jf(n,e){const t=1-n;return t*t*t*e}function Qf(n,e){const t=1-n;return 3*t*t*n*e}function ep(n,e){return 3*(1-n)*n*n*e}function tp(n,e){return n*n*n*e}function aa(n,e,t,i,r){return Jf(n,e)+Qf(n,t)+ep(n,i)+tp(n,r)}class np extends xi{constructor(e=new He,t=new He,i=new He,r=new He){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new He){const i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(aa(e,r.x,a.x,s.x,o.x),aa(e,r.y,a.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ip extends xi{constructor(e=new F,t=new F,i=new F,r=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new F){const i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(aa(e,r.x,a.x,s.x,o.x),aa(e,r.y,a.y,s.y,o.y),aa(e,r.z,a.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class rp extends xi{constructor(e=new He,t=new He){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new He){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new He){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ap extends xi{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sp extends xi{constructor(e=new He,t=new He,i=new He){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new He){const i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(ra(e,r.x,a.x,s.x),ra(e,r.y,a.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class md extends xi{constructor(e=new F,t=new F,i=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new F){const i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(ra(e,r.x,a.x,s.x),ra(e,r.y,a.y,s.y),ra(e,r.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class op extends xi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new He){const i=t,r=this.points,a=(r.length-1)*e,s=Math.floor(a),o=a-s,c=r[s===0?s:s-1],l=r[s],u=r[s>r.length-2?r.length-1:s+1],d=r[s>r.length-3?r.length-1:s+2];return i.set(Yl(o,c.x,l.x,u.x,d.x),Yl(o,c.y,l.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new He().fromArray(r))}return this}}var cp=Object.freeze({__proto__:null,ArcCurve:$f,CatmullRomCurve3:pd,CubicBezierCurve:np,CubicBezierCurve3:ip,EllipseCurve:fd,LineCurve:rp,LineCurve3:ap,QuadraticBezierCurve:sp,QuadraticBezierCurve3:md,SplineCurve:op});function lp(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let a=xd(n,0,r,t,!0);const s=[];if(!a||a.next===a.prev)return s;let o,c,l;if(i&&(a=pp(n,e,a,t)),n.length>80*t){o=n[0],c=n[1];let u=o,d=c;for(let h=t;h<r;h+=t){const p=n[h],x=n[h+1];p<o&&(o=p),x<c&&(c=x),p>u&&(u=p),x>d&&(d=x)}l=Math.max(u-o,d-c),l=l!==0?32767/l:0}return xa(a,s,t,o,c,l,0),s}function xd(n,e,t,i,r){let a;if(r===Ep(n,e,t,i)>0)for(let s=e;s<t;s+=i)a=Zl(s/i|0,n[s],n[s+1],a);else for(let s=t-i;s>=e;s-=i)a=Zl(s/i|0,n[s],n[s+1],a);return a&&Dr(a,a.next)&&(va(a),a=a.next),a}function Ji(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Dr(t,t.next)||Et(t.prev,t,t.next)===0)){if(va(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function xa(n,e,t,i,r,a,s){if(!n)return;!s&&a&&_p(n,i,r,a);let o=n;for(;n.prev!==n.next;){const c=n.prev,l=n.next;if(a?dp(n,i,r,a):up(n)){e.push(c.i,n.i,l.i),va(n),n=l.next,o=l.next;continue}if(n=l,n===o){s?s===1?(n=hp(Ji(n),e),xa(n,e,t,i,r,a,2)):s===2&&fp(n,e,t,i,r,a):xa(Ji(n),e,t,i,r,a,1);break}}}function up(n){const e=n.prev,t=n,i=n.next;if(Et(e,t,i)>=0)return!1;const r=e.x,a=t.x,s=i.x,o=e.y,c=t.y,l=i.y,u=Math.min(r,a,s),d=Math.min(o,c,l),h=Math.max(r,a,s),p=Math.max(o,c,l);let x=i.next;for(;x!==e;){if(x.x>=u&&x.x<=h&&x.y>=d&&x.y<=p&&Jr(r,o,a,c,s,l,x.x,x.y)&&Et(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function dp(n,e,t,i){const r=n.prev,a=n,s=n.next;if(Et(r,a,s)>=0)return!1;const o=r.x,c=a.x,l=s.x,u=r.y,d=a.y,h=s.y,p=Math.min(o,c,l),x=Math.min(u,d,h),_=Math.max(o,c,l),m=Math.max(u,d,h),f=yc(p,x,e,t,i),C=yc(_,m,e,t,i);let S=n.prevZ,E=n.nextZ;for(;S&&S.z>=f&&E&&E.z<=C;){if(S.x>=p&&S.x<=_&&S.y>=x&&S.y<=m&&S!==r&&S!==s&&Jr(o,u,c,d,l,h,S.x,S.y)&&Et(S.prev,S,S.next)>=0||(S=S.prevZ,E.x>=p&&E.x<=_&&E.y>=x&&E.y<=m&&E!==r&&E!==s&&Jr(o,u,c,d,l,h,E.x,E.y)&&Et(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;S&&S.z>=f;){if(S.x>=p&&S.x<=_&&S.y>=x&&S.y<=m&&S!==r&&S!==s&&Jr(o,u,c,d,l,h,S.x,S.y)&&Et(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;E&&E.z<=C;){if(E.x>=p&&E.x<=_&&E.y>=x&&E.y<=m&&E!==r&&E!==s&&Jr(o,u,c,d,l,h,E.x,E.y)&&Et(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function hp(n,e){let t=n;do{const i=t.prev,r=t.next.next;!Dr(i,r)&&vd(i,t,t.next,r)&&ga(i,r)&&ga(r,i)&&(e.push(i.i,t.i,r.i),va(t),va(t.next),t=n=r),t=t.next}while(t!==n);return Ji(t)}function fp(n,e,t,i,r,a){let s=n;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&bp(s,o)){let c=_d(s,o);s=Ji(s,s.next),c=Ji(c,c.next),xa(s,e,t,i,r,a,0),xa(c,e,t,i,r,a,0);return}o=o.next}s=s.next}while(s!==n)}function pp(n,e,t,i){const r=[];for(let a=0,s=e.length;a<s;a++){const o=e[a]*i,c=a<s-1?e[a+1]*i:n.length,l=xd(n,o,c,i,!1);l===l.next&&(l.steiner=!0),r.push(Mp(l))}r.sort(mp);for(let a=0;a<r.length;a++)t=xp(r[a],t);return t}function mp(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function xp(n,e){const t=gp(n,e);if(!t)return e;const i=_d(t,n);return Ji(i,i.next),Ji(t,t.next)}function gp(n,e){let t=e;const i=n.x,r=n.y;let a=-1/0,s;if(Dr(n,t))return t;do{if(Dr(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){const d=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=i&&d>a&&(a=d,s=t.x<t.next.x?t:t.next,d===i))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,c=s.x,l=s.y;let u=1/0;t=s;do{if(i>=t.x&&t.x>=c&&i!==t.x&&gd(r<l?i:a,r,c,l,r<l?a:i,r,t.x,t.y)){const d=Math.abs(r-t.y)/(i-t.x);ga(t,n)&&(d<u||d===u&&(t.x>s.x||t.x===s.x&&vp(s,t)))&&(s=t,u=d)}t=t.next}while(t!==o);return s}function vp(n,e){return Et(n.prev,n,e.prev)<0&&Et(e.next,n,n.next)<0}function _p(n,e,t,i){let r=n;do r.z===0&&(r.z=yc(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,yp(r)}function yp(n){let e,t=1;do{let i=n,r;n=null;let a=null;for(e=0;i;){e++;let s=i,o=0;for(let l=0;l<t&&(o++,s=s.nextZ,!!s);l++);let c=t;for(;o>0||c>0&&s;)o!==0&&(c===0||!s||i.z<=s.z)?(r=i,i=i.nextZ,o--):(r=s,s=s.nextZ,c--),a?a.nextZ=r:n=r,r.prevZ=a,a=r;i=s}a.nextZ=null,t*=2}while(e>1);return n}function yc(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Mp(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function gd(n,e,t,i,r,a,s,o){return(r-s)*(e-o)>=(n-s)*(a-o)&&(n-s)*(i-o)>=(t-s)*(e-o)&&(t-s)*(a-o)>=(r-s)*(i-o)}function Jr(n,e,t,i,r,a,s,o){return!(n===s&&e===o)&&gd(n,e,t,i,r,a,s,o)}function bp(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Sp(n,e)&&(ga(n,e)&&ga(e,n)&&wp(n,e)&&(Et(n.prev,n,e.prev)||Et(n,e.prev,e))||Dr(n,e)&&Et(n.prev,n,n.next)>0&&Et(e.prev,e,e.next)>0)}function Et(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Dr(n,e){return n.x===e.x&&n.y===e.y}function vd(n,e,t,i){const r=as(Et(n,e,t)),a=as(Et(n,e,i)),s=as(Et(t,i,n)),o=as(Et(t,i,e));return!!(r!==a&&s!==o||r===0&&rs(n,t,e)||a===0&&rs(n,i,e)||s===0&&rs(t,n,i)||o===0&&rs(t,e,i))}function rs(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function as(n){return n>0?1:n<0?-1:0}function Sp(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&vd(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function ga(n,e){return Et(n.prev,n,n.next)<0?Et(n,e,n.next)>=0&&Et(n,n.prev,e)>=0:Et(n,e,n.prev)<0||Et(n,n.next,e)<0}function wp(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,a=(n.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&r<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function _d(n,e){const t=Mc(n.i,n.x,n.y),i=Mc(e.i,e.x,e.y),r=n.next,a=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function Zl(n,e,t,i){const r=Mc(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function va(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Mc(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Ep(n,e,t,i){let r=0;for(let a=e,s=t-i;a<t;a+=i)r+=(n[s]-n[a])*(n[a+1]+n[s+1]),s=a;return r}class Tp{static triangulate(e,t,i=2){return lp(e,t,i)}}class Zc{static area(e){const t=e.length;let i=0;for(let r=t-1,a=0;a<t;r=a++)i+=e[r].x*e[a].y-e[a].x*e[r].y;return i*.5}static isClockWise(e){return Zc.area(e)<0}static triangulateShape(e,t){const i=[],r=[],a=[];Kl(e),Jl(i,e);let s=e.length;t.forEach(Kl);for(let c=0;c<t.length;c++)r.push(s),s+=t[c].length,Jl(i,t[c]);const o=Tp.triangulate(i,r);for(let c=0;c<o.length;c+=3)a.push(o.slice(c,c+3));return a}}function Kl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Jl(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class Ls extends bt{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],x=[],_=[],m=[];for(let f=0;f<u;f++){const C=f*h-s;for(let S=0;S<l;S++){const E=S*d-a;x.push(E,-C,0),_.push(0,0,1),m.push(S/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let C=0;C<o;C++){const S=C+l*f,E=C+l*(f+1),T=C+1+l*(f+1),y=C+1+l*f;p.push(S,E,y),p.push(E,T,y)}this.setIndex(p),this.setAttribute("position",new ct(x,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ls(e.width,e.height,e.widthSegments,e.heightSegments)}}class Kc extends bt{constructor(e=.5,t=1,i=32,r=1,a=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:a,thetaLength:s},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/r,p=new F,x=new He;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const f=a+m/i*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,u.push(x.x,x.y)}d+=h}for(let _=0;_<r;_++){const m=_*(i+1);for(let f=0;f<i;f++){const C=f+m,S=C,E=C+i+1,T=C+i+2,y=C+1;o.push(S,E,y),o.push(E,T,y)}}this.setIndex(o),this.setAttribute("position",new ct(c,3)),this.setAttribute("normal",new ct(l,3)),this.setAttribute("uv",new ct(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ai extends bt{constructor(e=1,t=32,i=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(s+o,Math.PI);let l=0;const u=[],d=new F,h=new F,p=[],x=[],_=[],m=[];for(let f=0;f<=i;f++){const C=[],S=f/i;let E=0;f===0&&s===0?E=.5/t:f===i&&c===Math.PI&&(E=-.5/t);for(let T=0;T<=t;T++){const y=T/t;d.x=-e*Math.cos(r+y*a)*Math.sin(s+S*o),d.y=e*Math.cos(s+S*o),d.z=e*Math.sin(r+y*a)*Math.sin(s+S*o),x.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(y+E,1-S),C.push(l++)}u.push(C)}for(let f=0;f<i;f++)for(let C=0;C<t;C++){const S=u[f][C+1],E=u[f][C],T=u[f+1][C],y=u[f+1][C+1];(f!==0||s>0)&&p.push(S,E,y),(f!==i-1||c<Math.PI)&&p.push(E,T,y)}this.setIndex(p),this.setAttribute("position",new ct(x,3)),this.setAttribute("normal",new ct(_,3)),this.setAttribute("uv",new ct(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ai(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Jc extends bt{constructor(e=new md(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),t=64,i=1,r=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:a};const s=e.computeFrenetFrames(t,a);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;const o=new F,c=new F,l=new He;let u=new F;const d=[],h=[],p=[],x=[];_(),this.setIndex(x),this.setAttribute("position",new ct(d,3)),this.setAttribute("normal",new ct(h,3)),this.setAttribute("uv",new ct(p,2));function _(){for(let S=0;S<t;S++)m(S);m(a===!1?t:0),C(),f()}function m(S){u=e.getPointAt(S/t,u);const E=s.normals[S],T=s.binormals[S];for(let y=0;y<=r;y++){const R=y/r*Math.PI*2,D=Math.sin(R),b=-Math.cos(R);c.x=b*E.x+D*T.x,c.y=b*E.y+D*T.y,c.z=b*E.z+D*T.z,c.normalize(),h.push(c.x,c.y,c.z),o.x=u.x+i*c.x,o.y=u.y+i*c.y,o.z=u.z+i*c.z,d.push(o.x,o.y,o.z)}}function f(){for(let S=1;S<=t;S++)for(let E=1;E<=r;E++){const T=(r+1)*(S-1)+(E-1),y=(r+1)*S+(E-1),R=(r+1)*S+E,D=(r+1)*(S-1)+E;x.push(T,y,D),x.push(y,R,D)}}function C(){for(let S=0;S<=t;S++)for(let E=0;E<=r;E++)l.x=S/t,l.y=E/r,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Jc(new cp[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Ap extends er{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Vh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cp extends er{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Rp extends Wi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const mo={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Pp{constructor(e,t,i){const r=this;let a=!1,s=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,a===!1&&r.onStart!==void 0&&r.onStart(u,s,o),a=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const p=l[d],x=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Lp=new Pp;class Qc{constructor(e){this.manager=e!==void 0?e:Lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Qc.DEFAULT_MATERIAL_NAME="__DEFAULT";const yr=new WeakMap;class Dp extends Qc{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,s=mo.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)a.manager.itemStart(e),setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0);else{let d=yr.get(s);d===void 0&&(d=[],yr.set(s,d)),d.push({onLoad:t,onError:r})}return s}const o=fa("img");function c(){u(),t&&t(this);const d=yr.get(this)||[];for(let h=0;h<d.length;h++){const p=d[h];p.onLoad&&p.onLoad(this)}yr.delete(this),a.manager.itemEnd(e)}function l(d){u(),r&&r(d),mo.remove(`image:${e}`);const h=yr.get(this)||[];for(let p=0;p<h.length;p++){const x=h[p];x.onError&&x.onError(d)}yr.delete(this),a.manager.itemError(e),a.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),mo.add(`image:${e}`,o),a.manager.itemStart(e),o.src=e,o}}class Ta extends Qc{constructor(e){super(e)}load(e,t,i,r){const a=new Wt,s=new Dp(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},i,r),a}}class zp extends ad{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,s=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ip extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Up{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Ql=new ft;class Np{constructor(e,t,i=0,r=1/0){this.ray=new wa(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Hc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):wt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ql.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ql),this}intersectObject(e,t=!0,i=[]){return bc(e,this,i,t),i.sort(eu),i}intersectObjects(e,t=!0,i=[]){for(let r=0,a=e.length;r<a;r++)bc(e[r],this,i,t);return i.sort(eu),i}}function eu(n,e){return n.distance-e.distance}function bc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const a=n.children;for(let s=0,o=a.length;s<o;s++)bc(a[s],e,t,!0)}}class ss{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}function tu(n,e,t,i){const r=Fp(i);switch(t){case Zu:return n*e;case Nc:return n*e/r.components*r.byteLength;case Fc:return n*e/r.components*r.byteLength;case kc:return n*e*2/r.components*r.byteLength;case Oc:return n*e*2/r.components*r.byteLength;case Ku:return n*e*3/r.components*r.byteLength;case zn:return n*e*4/r.components*r.byteLength;case Bc:return n*e*4/r.components*r.byteLength;case ps:case ms:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case xs:case gs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ho:case Xo:return Math.max(n,16)*Math.max(e,8)/4;case Go:case Wo:return Math.max(n,8)*Math.max(e,8)/2;case qo:case jo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case $o:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Qo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case ec:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case tc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case nc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ic:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case rc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case ac:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case sc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case oc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case cc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case lc:case uc:case dc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case hc:case fc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case pc:case mc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Fp(n){switch(n){case fi:case qu:return{byteLength:1,components:1};case la:case ju:case Ir:return{byteLength:2,components:1};case Ic:case Uc:return{byteLength:2,components:4};case Yi:case zc:case Hn:return{byteLength:4,components:1};case $u:case Yu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Dc}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Dc);function yd(){let n=null,e=!1,t=null,i=null;function r(a,s){t(a,s),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function kp(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,u);else{d.sort((p,x)=>p.start-x.start);let h=0;for(let p=1;p<d.length;p++){const x=d[h],_=d[p];_.start<=x.start+x.count+1?x.count=Math.max(x.count,_.start+_.count-x.start):(++h,d[h]=_)}d.length=h+1;for(let p=0,x=d.length;p<x;p++){const _=d[p];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}var Op=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Wp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Xp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,qp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,$p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Zp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Jp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Qp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,e0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,t0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,n0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,i0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,r0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,a0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,s0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,o0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,c0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,l0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,u0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,d0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,h0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,f0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,p0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,m0="gl_FragColor = linearToOutputTexel( gl_FragColor );",x0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,g0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,v0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,y0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,M0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,b0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,S0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,w0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,E0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,T0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,A0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,C0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,R0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,P0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,L0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,D0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,I0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,U0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,N0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,F0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,k0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,O0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,B0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,V0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,G0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,H0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,W0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,X0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,q0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,j0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,$0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Y0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Z0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,K0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,J0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Q0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,em=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,tm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,nm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,im=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,rm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,am=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,om=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,cm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,um=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,dm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,pm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,vm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_m=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ym=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,bm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Em=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Am=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Cm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Lm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Dm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,zm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Fm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Om=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Wm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Xm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,qm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,jm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,$m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ym=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ex=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ix=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ax=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ox=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,fx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,px=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:Op,alphahash_pars_fragment:Bp,alphamap_fragment:Vp,alphamap_pars_fragment:Gp,alphatest_fragment:Hp,alphatest_pars_fragment:Wp,aomap_fragment:Xp,aomap_pars_fragment:qp,batching_pars_vertex:jp,batching_vertex:$p,begin_vertex:Yp,beginnormal_vertex:Zp,bsdfs:Kp,iridescence_fragment:Jp,bumpmap_pars_fragment:Qp,clipping_planes_fragment:e0,clipping_planes_pars_fragment:t0,clipping_planes_pars_vertex:n0,clipping_planes_vertex:i0,color_fragment:r0,color_pars_fragment:a0,color_pars_vertex:s0,color_vertex:o0,common:c0,cube_uv_reflection_fragment:l0,defaultnormal_vertex:u0,displacementmap_pars_vertex:d0,displacementmap_vertex:h0,emissivemap_fragment:f0,emissivemap_pars_fragment:p0,colorspace_fragment:m0,colorspace_pars_fragment:x0,envmap_fragment:g0,envmap_common_pars_fragment:v0,envmap_pars_fragment:_0,envmap_pars_vertex:y0,envmap_physical_pars_fragment:L0,envmap_vertex:M0,fog_vertex:b0,fog_pars_vertex:S0,fog_fragment:w0,fog_pars_fragment:E0,gradientmap_pars_fragment:T0,lightmap_pars_fragment:A0,lights_lambert_fragment:C0,lights_lambert_pars_fragment:R0,lights_pars_begin:P0,lights_toon_fragment:D0,lights_toon_pars_fragment:z0,lights_phong_fragment:I0,lights_phong_pars_fragment:U0,lights_physical_fragment:N0,lights_physical_pars_fragment:F0,lights_fragment_begin:k0,lights_fragment_maps:O0,lights_fragment_end:B0,logdepthbuf_fragment:V0,logdepthbuf_pars_fragment:G0,logdepthbuf_pars_vertex:H0,logdepthbuf_vertex:W0,map_fragment:X0,map_pars_fragment:q0,map_particle_fragment:j0,map_particle_pars_fragment:$0,metalnessmap_fragment:Y0,metalnessmap_pars_fragment:Z0,morphinstance_vertex:K0,morphcolor_vertex:J0,morphnormal_vertex:Q0,morphtarget_pars_vertex:em,morphtarget_vertex:tm,normal_fragment_begin:nm,normal_fragment_maps:im,normal_pars_fragment:rm,normal_pars_vertex:am,normal_vertex:sm,normalmap_pars_fragment:om,clearcoat_normal_fragment_begin:cm,clearcoat_normal_fragment_maps:lm,clearcoat_pars_fragment:um,iridescence_pars_fragment:dm,opaque_fragment:hm,packing:fm,premultiplied_alpha_fragment:pm,project_vertex:mm,dithering_fragment:xm,dithering_pars_fragment:gm,roughnessmap_fragment:vm,roughnessmap_pars_fragment:_m,shadowmap_pars_fragment:ym,shadowmap_pars_vertex:Mm,shadowmap_vertex:bm,shadowmask_pars_fragment:Sm,skinbase_vertex:wm,skinning_pars_vertex:Em,skinning_vertex:Tm,skinnormal_vertex:Am,specularmap_fragment:Cm,specularmap_pars_fragment:Rm,tonemapping_fragment:Pm,tonemapping_pars_fragment:Lm,transmission_fragment:Dm,transmission_pars_fragment:zm,uv_pars_fragment:Im,uv_pars_vertex:Um,uv_vertex:Nm,worldpos_vertex:Fm,background_vert:km,background_frag:Om,backgroundCube_vert:Bm,backgroundCube_frag:Vm,cube_vert:Gm,cube_frag:Hm,depth_vert:Wm,depth_frag:Xm,distanceRGBA_vert:qm,distanceRGBA_frag:jm,equirect_vert:$m,equirect_frag:Ym,linedashed_vert:Zm,linedashed_frag:Km,meshbasic_vert:Jm,meshbasic_frag:Qm,meshlambert_vert:ex,meshlambert_frag:tx,meshmatcap_vert:nx,meshmatcap_frag:ix,meshnormal_vert:rx,meshnormal_frag:ax,meshphong_vert:sx,meshphong_frag:ox,meshphysical_vert:cx,meshphysical_frag:lx,meshtoon_vert:ux,meshtoon_frag:dx,points_vert:hx,points_frag:fx,shadow_vert:px,shadow_frag:mx,sprite_vert:xx,sprite_frag:gx},De={common:{diffuse:{value:new nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new He(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new nt(16777215)},opacity:{value:1},center:{value:new He(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Gn={basic:{uniforms:on([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:on([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new nt(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:on([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new nt(0)},specular:{value:new nt(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:on([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:on([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new nt(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:on([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:on([De.points,De.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:on([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:on([De.common,De.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:on([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:on([De.sprite,De.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:on([De.common,De.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:on([De.lights,De.fog,{color:{value:new nt(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Gn.physical={uniforms:on([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new He(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new He},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new nt(0)},specularColor:{value:new nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new He},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const os={r:0,b:0,g:0},Ni=new pi,vx=new ft;function _x(n,e,t,i,r,a,s){const o=new nt(0);let c=a===!0?0:1,l,u,d=null,h=0,p=null;function x(S){let E=S.isScene===!0?S.background:null;return E&&E.isTexture&&(E=(S.backgroundBlurriness>0?t:e).get(E)),E}function _(S){let E=!1;const T=x(S);T===null?f(o,c):T&&T.isColor&&(f(T,1),E=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,E){const T=x(E);T&&(T.isCubeTexture||T.mapping===Rs)?(u===void 0&&(u=new Rt(new Ea(1,1,1),new Qt({name:"BackgroundCubeMaterial",uniforms:Lr(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(y,R,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ni.copy(E.backgroundRotation),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(vx.makeRotationFromEuler(Ni)),u.material.toneMapped=at.getTransfer(T.colorSpace)!==ht,(d!==T||h!==T.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=T,h=T.version,p=n.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new Rt(new Ls(2,2),new Qt({name:"BackgroundMaterial",uniforms:Lr(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=at.getTransfer(T.colorSpace)!==ht,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||h!==T.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=T,h=T.version,p=n.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function f(S,E){S.getRGB(os,rd(n)),i.buffers.color.setClear(os.r,os.g,os.b,E,s)}function C(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,E=1){o.set(S),c=E,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(o,c)},render:_,addToRenderList:m,dispose:C}}function yx(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let a=r,s=!1;function o(M,P,I,k,H){let j=!1;const O=d(k,I,P);a!==O&&(a=O,l(a.object)),j=p(M,k,I,H),j&&x(M,k,I,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,E(M,P,I,k),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,P,I){const k=I.wireframe===!0;let H=i[M.id];H===void 0&&(H={},i[M.id]=H);let j=H[P.id];j===void 0&&(j={},H[P.id]=j);let O=j[k];return O===void 0&&(O=h(c()),j[k]=O),O}function h(M){const P=[],I=[],k=[];for(let H=0;H<t;H++)P[H]=0,I[H]=0,k[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:k,object:M,attributes:{},index:null}}function p(M,P,I,k){const H=a.attributes,j=P.attributes;let O=0;const se=I.getAttributes();for(const $ in se)if(se[$].location>=0){const ue=H[$];let fe=j[$];if(fe===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(fe=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(fe=M.instanceColor)),ue===void 0||ue.attribute!==fe||fe&&ue.data!==fe.data)return!0;O++}return a.attributesNum!==O||a.index!==k}function x(M,P,I,k){const H={},j=P.attributes;let O=0;const se=I.getAttributes();for(const $ in se)if(se[$].location>=0){let ue=j[$];ue===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(ue=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(ue=M.instanceColor));const fe={};fe.attribute=ue,ue&&ue.data&&(fe.data=ue.data),H[$]=fe,O++}a.attributes=H,a.attributesNum=O,a.index=k}function _(){const M=a.newAttributes;for(let P=0,I=M.length;P<I;P++)M[P]=0}function m(M){f(M,0)}function f(M,P){const I=a.newAttributes,k=a.enabledAttributes,H=a.attributeDivisors;I[M]=1,k[M]===0&&(n.enableVertexAttribArray(M),k[M]=1),H[M]!==P&&(n.vertexAttribDivisor(M,P),H[M]=P)}function C(){const M=a.newAttributes,P=a.enabledAttributes;for(let I=0,k=P.length;I<k;I++)P[I]!==M[I]&&(n.disableVertexAttribArray(I),P[I]=0)}function S(M,P,I,k,H,j,O){O===!0?n.vertexAttribIPointer(M,P,I,H,j):n.vertexAttribPointer(M,P,I,k,H,j)}function E(M,P,I,k){_();const H=k.attributes,j=I.getAttributes(),O=P.defaultAttributeValues;for(const se in j){const $=j[se];if($.location>=0){let ce=H[se];if(ce===void 0&&(se==="instanceMatrix"&&M.instanceMatrix&&(ce=M.instanceMatrix),se==="instanceColor"&&M.instanceColor&&(ce=M.instanceColor)),ce!==void 0){const ue=ce.normalized,fe=ce.itemSize,be=e.get(ce);if(be===void 0)continue;const Be=be.buffer,Ge=be.type,Me=be.bytesPerElement,V=Ge===n.INT||Ge===n.UNSIGNED_INT||ce.gpuType===zc;if(ce.isInterleavedBufferAttribute){const ee=ce.data,me=ee.stride,Re=ce.offset;if(ee.isInstancedInterleavedBuffer){for(let ve=0;ve<$.locationSize;ve++)f($.location+ve,ee.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ve=0;ve<$.locationSize;ve++)m($.location+ve);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let ve=0;ve<$.locationSize;ve++)S($.location+ve,fe/$.locationSize,Ge,ue,me*Me,(Re+fe/$.locationSize*ve)*Me,V)}else{if(ce.isInstancedBufferAttribute){for(let ee=0;ee<$.locationSize;ee++)f($.location+ee,ce.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ee=0;ee<$.locationSize;ee++)m($.location+ee);n.bindBuffer(n.ARRAY_BUFFER,Be);for(let ee=0;ee<$.locationSize;ee++)S($.location+ee,fe/$.locationSize,Ge,ue,fe*Me,fe/$.locationSize*ee*Me,V)}}else if(O!==void 0){const ue=O[se];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv($.location,ue);break;case 3:n.vertexAttrib3fv($.location,ue);break;case 4:n.vertexAttrib4fv($.location,ue);break;default:n.vertexAttrib1fv($.location,ue)}}}}C()}function T(){D();for(const M in i){const P=i[M];for(const I in P){const k=P[I];for(const H in k)u(k[H].object),delete k[H];delete P[I]}delete i[M]}}function y(M){if(i[M.id]===void 0)return;const P=i[M.id];for(const I in P){const k=P[I];for(const H in k)u(k[H].object),delete k[H];delete P[I]}delete i[M.id]}function R(M){for(const P in i){const I=i[P];if(I[M.id]===void 0)continue;const k=I[M.id];for(const H in k)u(k[H].object),delete k[H];delete I[M.id]}}function D(){b(),s=!0,a!==r&&(a=r,l(a.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:y,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:C}}function Mx(n,e,t){let i;function r(l){i=l}function a(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function s(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=u[x];t.update(p,i,1)}function c(l,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<l.length;x++)s(l[x],u[x],h[x]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let x=0;for(let _=0;_<d;_++)x+=u[_]*h[_];t.update(x,i,1)}}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function bx(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(R){return!(R!==zn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const D=R===Ir&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==fi&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Hn&&!D)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Ze("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),C=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=x>0,y=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:x,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:C,maxVaryings:S,maxFragmentUniforms:E,vertexTextures:T,maxSamples:y}}function Sx(n){const e=this;let t=null,i=0,r=!1,a=!1;const s=new Oi,o=new Ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const x=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=n.get(d);if(!r||x===null||x.length===0||a&&!m)a?u(null):l();else{const C=a?0:i,S=C*4;let E=f.clippingState||null;c.value=E,E=u(x,h,S,p);for(let T=0;T!==S;++T)E[T]=t[T];f.clippingState=E,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=C}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,p,x){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,x!==!0||m===null){const f=p+_*4,C=h.matrixWorldInverse;o.getNormalMatrix(C),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,E=p;S!==_;++S,E+=4)s.copy(d[S]).applyMatrix4(C,o),s.normal.toArray(m,E),m[E+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function wx(n){let e=new WeakMap;function t(s,o){return o===ko?s.mapping=Cr:o===Oo&&(s.mapping=Rr),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===ko||o===Oo)if(e.has(s)){const c=e.get(s).texture;return t(c,s.mapping)}else{const c=s.image;if(c&&c.height>0){const l=new Of(c.height);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){const o=s.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const Ri=4,nu=[.125,.215,.35,.446,.526,.582],Vi=20,Ex=256,Zr=new zp,iu=new nt;let xo=null,go=0,vo=0,_o=!1;const Tx=new F;class ru{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:s=256,position:o=Tx}=a;xo=this._renderer.getRenderTarget(),go=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),_o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ou(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=su(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(xo,go,vo),this._renderer.xr.enabled=_o,e.scissorTest=!1,Mr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Cr||e.mapping===Rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xo=this._renderer.getRenderTarget(),go=this._renderer.getActiveCubeFace(),vo=this._renderer.getActiveMipmapLevel(),_o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vn,minFilter:vn,generateMipmaps:!1,type:Ir,format:zn,colorSpace:Pr,depthBuffer:!1},r=au(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=au(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ax(a)),this._blurMaterial=Rx(a,e,t),this._ggxMaterial=Cx(a,e,t)}return r}_compileMaterial(e){const t=new Rt(new bt,e);this._renderer.compile(t,Zr)}_sceneToCubeUV(e,t,i,r,a){const c=new wn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(iu),d.toneMapping=Pi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Rt(new Ea,new si({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let f=!1;const C=e.background;C?C.isColor&&(m.color.copy(C),e.background=null,f=!0):(m.color.copy(iu),f=!0);for(let S=0;S<6;S++){const E=S%3;E===0?(c.up.set(0,l[S],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+u[S],a.y,a.z)):E===1?(c.up.set(0,0,l[S]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+u[S],a.z)):(c.up.set(0,l[S],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+u[S]));const T=this._cubeSize;Mr(r,E*T,S>2?T:0,T,T),d.setRenderTarget(r),f&&d.render(_,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=C}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Cr||e.mapping===Rr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ou()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=su());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;Mr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,Zr)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;const c=s.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=.05+l*.95,p=d*h,{_lodMax:x}=this,_=this._sizeLods[i],m=3*_*(i>x-Ri?i-x+Ri:0),f=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=x-t,Mr(a,m,f,3*_,2*_),r.setRenderTarget(a),r.render(o,Zr),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=x-i,Mr(e,m,f,3*_,2*_),r.setRenderTarget(e),r.render(o,Zr)}_blur(e,t,i,r,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",a),this._halfBlur(s,e,i,i,r,"longitudinal",a)}_halfBlur(e,t,i,r,a,s,o){const c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&wt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const h=l.uniforms,p=this._sizeLods[i]-1,x=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*Vi-1),_=a/x,m=isFinite(a)?1+Math.floor(u*_):Vi;m>Vi&&Ze(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vi}`);const f=[];let C=0;for(let R=0;R<Vi;++R){const D=R/_,b=Math.exp(-D*D/2);f.push(b),R===0?C+=b:R<m&&(C+=2*b)}for(let R=0;R<f.length;R++)f[R]=f[R]/C;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=s==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:S}=this;h.dTheta.value=x,h.mipInt.value=S-i;const E=this._sizeLods[r],T=3*E*(r>S-Ri?r-S+Ri:0),y=4*(this._cubeSize-E);Mr(t,T,y,3*E,2*E),c.setRenderTarget(t),c.render(d,Zr)}}function Ax(n){const e=[],t=[],i=[];let r=n;const a=n-Ri+1+nu.length;for(let s=0;s<a;s++){const o=Math.pow(2,r);e.push(o);let c=1/o;s>n-Ri?c=nu[s-n+Ri-1]:s===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,x=6,_=3,m=2,f=1,C=new Float32Array(_*x*p),S=new Float32Array(m*x*p),E=new Float32Array(f*x*p);for(let y=0;y<p;y++){const R=y%3*2/3-1,D=y>2?0:-1,b=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];C.set(b,_*x*y),S.set(h,m*x*y);const M=[y,y,y,y,y,y];E.set(M,f*x*y)}const T=new bt;T.setAttribute("position",new Vt(C,_)),T.setAttribute("uv",new Vt(S,m)),T.setAttribute("faceIndex",new Vt(E,f)),i.push(new Rt(T,null)),r>Ri&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function au(n,e,t){const i=new Ki(n,e,t);return i.texture.mapping=Rs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Mr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Cx(n,e,t){return new Qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ex,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ds(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Rx(n,e,t){const i=new Float32Array(Vi),r=new F(0,1,0);return new Qt({name:"SphericalGaussianBlur",defines:{n:Vi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function su(){return new Qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function ou(){return new Qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:li,depthTest:!1,depthWrite:!1})}function Ds(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Px(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===ko||c===Oo,u=c===Cr||c===Rr;if(l||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new ru(n)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new ru(n)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function a(o){const c=o.target;c.removeEventListener("dispose",a);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function Lx(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&pa("WebGLRenderer: "+i+" extension not supported."),r}}}function Dx(n,e,t,i){const r={},a=new WeakMap;function s(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",s),delete r[h.id];const p=a.get(h);p&&(e.remove(p),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],n.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,x=d.attributes.position;let _=0;if(p!==null){const C=p.array;_=p.version;for(let S=0,E=C.length;S<E;S+=3){const T=C[S+0],y=C[S+1],R=C[S+2];h.push(T,y,y,R,R,T)}}else if(x!==void 0){const C=x.array;_=x.version;for(let S=0,E=C.length/3-1;S<E;S+=3){const T=S+0,y=S+1,R=S+2;h.push(T,y,y,R,R,T)}}else return;const m=new(Qu(h)?id:nd)(h,1);m.version=_;const f=a.get(d);f&&e.remove(f),a.set(d,m)}function u(d){const h=a.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function zx(n,e,t){let i;function r(h){i=h}let a,s;function o(h){a=h.type,s=h.bytesPerElement}function c(h,p){n.drawElements(i,p,a,h*s),t.update(p,i,1)}function l(h,p,x){x!==0&&(n.drawElementsInstanced(i,p,a,h*s,x),t.update(p,i,x))}function u(h,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,h,0,x);let m=0;for(let f=0;f<x;f++)m+=p[f];t.update(m,i,1)}function d(h,p,x,_){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/s,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,h,0,_,0,x);let f=0;for(let C=0;C<x;C++)f+=p[C]*_[C];t.update(f,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Ix(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:wt("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Ux(n,e,t){const i=new WeakMap,r=new Pt;function a(s,o,c){const l=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let b=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),x===!0&&(S=2),_===!0&&(S=3);let E=o.attributes.position.count*S,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const y=new Float32Array(E*T*4*d),R=new ed(y,E,T,d);R.type=Hn,R.needsUpdate=!0;const D=S*4;for(let M=0;M<d;M++){const P=m[M],I=f[M],k=C[M],H=E*T*4*M;for(let j=0;j<P.count;j++){const O=j*D;p===!0&&(r.fromBufferAttribute(P,j),y[H+O+0]=r.x,y[H+O+1]=r.y,y[H+O+2]=r.z,y[H+O+3]=0),x===!0&&(r.fromBufferAttribute(I,j),y[H+O+4]=r.x,y[H+O+5]=r.y,y[H+O+6]=r.z,y[H+O+7]=0),_===!0&&(r.fromBufferAttribute(k,j),y[H+O+8]=r.x,y[H+O+9]=r.y,y[H+O+10]=r.z,y[H+O+11]=k.itemSize===4?r.w:1)}}h={count:d,texture:R,size:new He(E,T)},i.set(o,h),o.addEventListener("dispose",b)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",x),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function Nx(n,e,t,i){let r=new WeakMap;function a(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function s(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:a,dispose:s}}const Md=new Wt,cu=new dd(1,1),bd=new ed,Sd=new bf,wd=new sd,lu=[],uu=[],du=new Float32Array(16),hu=new Float32Array(9),fu=new Float32Array(4);function Nr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=lu[r];if(a===void 0&&(a=new Float32Array(r),lu[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Ft(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function zs(n,e){let t=uu[e];t===void 0&&(t=new Int32Array(e),uu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Fx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function kx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),Ft(t,e)}}function Ox(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),Ft(t,e)}}function Bx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),Ft(t,e)}}function Vx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;fu.set(i),n.uniformMatrix2fv(this.addr,!1,fu),Ft(t,i)}}function Gx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;hu.set(i),n.uniformMatrix3fv(this.addr,!1,hu),Ft(t,i)}}function Hx(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Ft(t,e)}else{if(Nt(t,i))return;du.set(i),n.uniformMatrix4fv(this.addr,!1,du),Ft(t,i)}}function Wx(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Xx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),Ft(t,e)}}function qx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),Ft(t,e)}}function jx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),Ft(t,e)}}function $x(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Yx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),Ft(t,e)}}function Zx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),Ft(t,e)}}function Kx(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),Ft(t,e)}}function Jx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(cu.compareFunction=Ju,a=cu):a=Md,t.setTexture2D(e||a,r)}function Qx(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Sd,r)}function eg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||wd,r)}function tg(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||bd,r)}function ng(n){switch(n){case 5126:return Fx;case 35664:return kx;case 35665:return Ox;case 35666:return Bx;case 35674:return Vx;case 35675:return Gx;case 35676:return Hx;case 5124:case 35670:return Wx;case 35667:case 35671:return Xx;case 35668:case 35672:return qx;case 35669:case 35673:return jx;case 5125:return $x;case 36294:return Yx;case 36295:return Zx;case 36296:return Kx;case 35678:case 36198:case 36298:case 36306:case 35682:return Jx;case 35679:case 36299:case 36307:return Qx;case 35680:case 36300:case 36308:case 36293:return eg;case 36289:case 36303:case 36311:case 36292:return tg}}function ig(n,e){n.uniform1fv(this.addr,e)}function rg(n,e){const t=Nr(e,this.size,2);n.uniform2fv(this.addr,t)}function ag(n,e){const t=Nr(e,this.size,3);n.uniform3fv(this.addr,t)}function sg(n,e){const t=Nr(e,this.size,4);n.uniform4fv(this.addr,t)}function og(n,e){const t=Nr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function cg(n,e){const t=Nr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function lg(n,e){const t=Nr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function ug(n,e){n.uniform1iv(this.addr,e)}function dg(n,e){n.uniform2iv(this.addr,e)}function hg(n,e){n.uniform3iv(this.addr,e)}function fg(n,e){n.uniform4iv(this.addr,e)}function pg(n,e){n.uniform1uiv(this.addr,e)}function mg(n,e){n.uniform2uiv(this.addr,e)}function xg(n,e){n.uniform3uiv(this.addr,e)}function gg(n,e){n.uniform4uiv(this.addr,e)}function vg(n,e,t){const i=this.cache,r=e.length,a=zs(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||Md,a[s])}function _g(n,e,t){const i=this.cache,r=e.length,a=zs(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Sd,a[s])}function yg(n,e,t){const i=this.cache,r=e.length,a=zs(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||wd,a[s])}function Mg(n,e,t){const i=this.cache,r=e.length,a=zs(t,r);Nt(i,a)||(n.uniform1iv(this.addr,a),Ft(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||bd,a[s])}function bg(n){switch(n){case 5126:return ig;case 35664:return rg;case 35665:return ag;case 35666:return sg;case 35674:return og;case 35675:return cg;case 35676:return lg;case 5124:case 35670:return ug;case 35667:case 35671:return dg;case 35668:case 35672:return hg;case 35669:case 35673:return fg;case 5125:return pg;case 36294:return mg;case 36295:return xg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return vg;case 35679:case 36299:case 36307:return _g;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return Mg}}class Sg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ng(t.type)}}class wg{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bg(t.type)}}class Eg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],i)}}}const yo=/(\w+)(\])?(\[|\.)?/g;function pu(n,e){n.seq.push(e),n.map[e.id]=e}function Tg(n,e,t){const i=n.name,r=i.length;for(yo.lastIndex=0;;){const a=yo.exec(i),s=yo.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){pu(t,l===void 0?new Sg(o,n,e):new wg(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new Eg(o),pu(t,d)),t=d}}}class vs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=e.getActiveUniform(t,r),s=e.getUniformLocation(t,a.name);Tg(a,s,this)}}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function mu(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Ag=37297;let Cg=0;function Rg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const xu=new Ke;function Pg(n){at._getMatrix(xu,at.workingColorSpace,n);const e=`mat3( ${xu.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case ys:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function gu(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+Rg(n.getShaderSource(e),o)}else return a}function Lg(n,e){const t=Pg(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Dg(n,e){let t;switch(e){case zh:t="Linear";break;case Ih:t="Reinhard";break;case Uh:t="Cineon";break;case Nh:t="ACESFilmic";break;case kh:t="AgX";break;case Oh:t="Neutral";break;case Fh:t="Custom";break;default:Ze("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const cs=new F;function zg(){at.getLuminanceCoefficients(cs);const n=cs.x.toFixed(4),e=cs.y.toFixed(4),t=cs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ig(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qr).join(`
`)}function Ug(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Ng(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),s=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Qr(n){return n!==""}function vu(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _u(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Fg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sc(n){return n.replace(Fg,Og)}const kg=new Map;function Og(n,e){let t=Qe[e];if(t===void 0){const i=kg.get(e);if(i!==void 0)t=Qe[i],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Sc(t)}const Bg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yu(n){return n.replace(Bg,Vg)}function Vg(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Mu(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Gg(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Hu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===hh?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ii&&(e="SHADOWMAP_TYPE_VSM"),e}function Hg(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Cr:case Rr:e="ENVMAP_TYPE_CUBE";break;case Rs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Wg(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Rr&&(e="ENVMAP_MODE_REFRACTION"),e}function Xg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Wu:e="ENVMAP_BLENDING_MULTIPLY";break;case Lh:e="ENVMAP_BLENDING_MIX";break;case Dh:e="ENVMAP_BLENDING_ADD";break}return e}function qg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function jg(n,e,t,i){const r=n.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=Gg(t),l=Hg(t),u=Wg(t),d=Xg(t),h=qg(t),p=Ig(t),x=Ug(a),_=r.createProgram();let m,f,C=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Qr).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Qr).join(`
`),f.length>0&&(f+=`
`)):(m=[Mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qr).join(`
`),f=[Mu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pi?"#define TONE_MAPPING":"",t.toneMapping!==Pi?Qe.tonemapping_pars_fragment:"",t.toneMapping!==Pi?Dg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Lg("linearToOutputTexel",t.outputColorSpace),zg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Qr).join(`
`)),s=Sc(s),s=vu(s,t),s=_u(s,t),o=Sc(o),o=vu(o,t),o=_u(o,t),s=yu(s),o=yu(o),t.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===_l?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===_l?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=C+m+s,E=C+f+o,T=mu(r,r.VERTEX_SHADER,S),y=mu(r,r.FRAGMENT_SHADER,E);r.attachShader(_,T),r.attachShader(_,y),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function R(P){if(n.debug.checkShaderErrors){const I=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(T)||"",H=r.getShaderInfoLog(y)||"",j=I.trim(),O=k.trim(),se=H.trim();let $=!0,ce=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if($=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,T,y);else{const ue=gu(r,T,"vertex"),fe=gu(r,y,"fragment");wt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+j+`
`+ue+`
`+fe)}else j!==""?Ze("WebGLProgram: Program Info Log:",j):(O===""||se==="")&&(ce=!1);ce&&(P.diagnostics={runnable:$,programLog:j,vertexShader:{log:O,prefix:m},fragmentShader:{log:se,prefix:f}})}r.deleteShader(T),r.deleteShader(y),D=new vs(r,_),b=Ng(r,_)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,Ag)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Cg++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=y,this}let $g=0;class Yg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Zg(e),t.set(e,i)),i}}class Zg{constructor(e){this.id=$g++,this.code=e,this.usedTimes=0}}function Kg(n,e,t,i,r,a,s){const o=new Hc,c=new Yg,l=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,P,I,k){const H=I.fog,j=k.geometry,O=b.isMeshStandardMaterial?I.environment:null,se=(b.isMeshStandardMaterial?t:e).get(b.envMap||O),$=se&&se.mapping===Rs?se.image.height:null,ce=x[b.type];b.precision!==null&&(p=r.getMaxPrecision(b.precision),p!==b.precision&&Ze("WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const ue=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,fe=ue!==void 0?ue.length:0;let be=0;j.morphAttributes.position!==void 0&&(be=1),j.morphAttributes.normal!==void 0&&(be=2),j.morphAttributes.color!==void 0&&(be=3);let Be,Ge,Me,V;if(ce){const je=Gn[ce];Be=je.vertexShader,Ge=je.fragmentShader}else Be=b.vertexShader,Ge=b.fragmentShader,c.update(b),Me=c.getVertexShaderID(b),V=c.getFragmentShaderID(b);const ee=n.getRenderTarget(),me=n.state.buffers.depth.getReversed(),Re=k.isInstancedMesh===!0,ve=k.isBatchedMesh===!0,ae=!!b.map,Ye=!!b.matcap,ke=!!se,Ve=!!b.aoMap,L=!!b.lightMap,ie=!!b.bumpMap,oe=!!b.normalMap,he=!!b.displacementMap,Q=!!b.emissiveMap,_e=!!b.metalnessMap,le=!!b.roughnessMap,ge=b.anisotropy>0,A=b.clearcoat>0,g=b.dispersion>0,U=b.iridescence>0,X=b.sheen>0,Z=b.transmission>0,q=ge&&!!b.anisotropyMap,Ee=A&&!!b.clearcoatMap,pe=A&&!!b.clearcoatNormalMap,Te=A&&!!b.clearcoatRoughnessMap,v=U&&!!b.iridescenceMap,re=U&&!!b.iridescenceThicknessMap,de=X&&!!b.sheenColorMap,Fe=X&&!!b.sheenRoughnessMap,Ie=!!b.specularMap,xe=!!b.specularColorMap,Le=!!b.specularIntensityMap,z=Z&&!!b.transmissionMap,N=Z&&!!b.thicknessMap,W=!!b.gradientMap,te=!!b.alphaMap,ne=b.alphaTest>0,Y=!!b.alphaHash,ye=!!b.extensions;let Se=Pi;b.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Se=n.toneMapping);const Ne={shaderID:ce,shaderType:b.type,shaderName:b.name,vertexShader:Be,fragmentShader:Ge,defines:b.defines,customVertexShaderID:Me,customFragmentShaderID:V,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:ve,batchingColor:ve&&k._colorsTexture!==null,instancing:Re,instancingColor:Re&&k.instanceColor!==null,instancingMorph:Re&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Pr,alphaToCoverage:!!b.alphaToCoverage,map:ae,matcap:Ye,envMap:ke,envMapMode:ke&&se.mapping,envMapCubeUVHeight:$,aoMap:Ve,lightMap:L,bumpMap:ie,normalMap:oe,displacementMap:h&&he,emissiveMap:Q,normalMapObjectSpace:oe&&b.normalMapType===Wh,normalMapTangentSpace:oe&&b.normalMapType===Hh,metalnessMap:_e,roughnessMap:le,anisotropy:ge,anisotropyMap:q,clearcoat:A,clearcoatMap:Ee,clearcoatNormalMap:pe,clearcoatRoughnessMap:Te,dispersion:g,iridescence:U,iridescenceMap:v,iridescenceThicknessMap:re,sheen:X,sheenColorMap:de,sheenRoughnessMap:Fe,specularMap:Ie,specularColorMap:xe,specularIntensityMap:Le,transmission:Z,transmissionMap:z,thicknessMap:N,gradientMap:W,opaque:b.transparent===!1&&b.blending===br&&b.alphaToCoverage===!1,alphaMap:te,alphaTest:ne,alphaHash:Y,combine:b.combine,mapUv:ae&&_(b.map.channel),aoMapUv:Ve&&_(b.aoMap.channel),lightMapUv:L&&_(b.lightMap.channel),bumpMapUv:ie&&_(b.bumpMap.channel),normalMapUv:oe&&_(b.normalMap.channel),displacementMapUv:he&&_(b.displacementMap.channel),emissiveMapUv:Q&&_(b.emissiveMap.channel),metalnessMapUv:_e&&_(b.metalnessMap.channel),roughnessMapUv:le&&_(b.roughnessMap.channel),anisotropyMapUv:q&&_(b.anisotropyMap.channel),clearcoatMapUv:Ee&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:pe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:v&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:de&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(b.sheenRoughnessMap.channel),specularMapUv:Ie&&_(b.specularMap.channel),specularColorMapUv:xe&&_(b.specularColorMap.channel),specularIntensityMapUv:Le&&_(b.specularIntensityMap.channel),transmissionMapUv:z&&_(b.transmissionMap.channel),thicknessMapUv:N&&_(b.thicknessMap.channel),alphaMapUv:te&&_(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(oe||ge),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!j.attributes.uv&&(ae||te),fog:!!H,useFog:b.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:k.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:fe,morphTextureStride:be,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:Se,decodeVideoTexture:ae&&b.map.isVideoTexture===!0&&at.getTransfer(b.map.colorSpace)===ht,decodeVideoTextureEmissive:Q&&b.emissiveMap.isVideoTexture===!0&&at.getTransfer(b.emissiveMap.colorSpace)===ht,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===En,flipSided:b.side===cn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:ye&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&b.extensions.multiDraw===!0||ve)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function f(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const P in b.defines)M.push(P),M.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(C(M,b),S(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function C(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function S(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function E(b){const M=x[b.type];let P;if(M){const I=Gn[M];P=Uf.clone(I.uniforms)}else P=b.uniforms;return P}function T(b,M){let P;for(let I=0,k=u.length;I<k;I++){const H=u[I];if(H.cacheKey===M){P=H,++P.usedTimes;break}}return P===void 0&&(P=new jg(n,M,b,a),u.push(P)),P}function y(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function R(b){c.remove(b)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:E,acquireProgram:T,releaseProgram:y,releaseShaderCache:R,programs:u,dispose:D}}function Jg(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,c){n.get(s)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function Qg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function bu(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Su(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(d,h,p,x,_,m){let f=n[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:x,renderOrder:d.renderOrder,z:_,group:m},n[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=x,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function o(d,h,p,x,_,m){const f=s(d,h,p,x,_,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(d,h,p,x,_,m){const f=s(d,h,p,x,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(d,h){t.length>1&&t.sort(d||Qg),i.length>1&&i.sort(h||bu),r.length>1&&r.sort(h||bu)}function u(){for(let d=e,h=n.length;d<h;d++){const p=n[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:o,unshift:c,finish:u,sort:l}}function ev(){let n=new WeakMap;function e(i,r){const a=n.get(i);let s;return a===void 0?(s=new Su,n.set(i,[s])):r>=a.length?(s=new Su,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function tv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new nt};break;case"SpotLight":t={position:new F,direction:new F,color:new nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new nt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new nt,groundColor:new nt};break;case"RectAreaLight":t={color:new nt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[e.id]=t,t}}}function nv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new He,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let iv=0;function rv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function av(n){const e=new tv,t=nv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);const r=new F,a=new ft,s=new ft;function o(l){let u=0,d=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,x=0,_=0,m=0,f=0,C=0,S=0,E=0,T=0,y=0,R=0;l.sort(rv);for(let b=0,M=l.length;b<M;b++){const P=l[b],I=P.color,k=P.intensity,H=P.distance,j=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=I.r*k,d+=I.g*k,h+=I.b*k;else if(P.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(P.sh.coefficients[O],k);R++}else if(P.isDirectionalLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const se=P.shadow,$=t.get(P);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,i.directionalShadow[p]=$,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=P.shadow.matrix,C++}i.directional[p]=O,p++}else if(P.isSpotLight){const O=e.get(P);O.position.setFromMatrixPosition(P.matrixWorld),O.color.copy(I).multiplyScalar(k),O.distance=H,O.coneCos=Math.cos(P.angle),O.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),O.decay=P.decay,i.spot[_]=O;const se=P.shadow;if(P.map&&(i.spotLightMap[T]=P.map,T++,se.updateMatrices(P),P.castShadow&&y++),i.spotLightMatrix[_]=se.matrix,P.castShadow){const $=t.get(P);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,i.spotShadow[_]=$,i.spotShadowMap[_]=j,E++}_++}else if(P.isRectAreaLight){const O=e.get(P);O.color.copy(I).multiplyScalar(k),O.halfWidth.set(P.width*.5,0,0),O.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=O,m++}else if(P.isPointLight){const O=e.get(P);if(O.color.copy(P.color).multiplyScalar(P.intensity),O.distance=P.distance,O.decay=P.decay,P.castShadow){const se=P.shadow,$=t.get(P);$.shadowIntensity=se.intensity,$.shadowBias=se.bias,$.shadowNormalBias=se.normalBias,$.shadowRadius=se.radius,$.shadowMapSize=se.mapSize,$.shadowCameraNear=se.camera.near,$.shadowCameraFar=se.camera.far,i.pointShadow[x]=$,i.pointShadowMap[x]=j,i.pointShadowMatrix[x]=P.shadow.matrix,S++}i.point[x]=O,x++}else if(P.isHemisphereLight){const O=e.get(P);O.skyColor.copy(P.color).multiplyScalar(k),O.groundColor.copy(P.groundColor).multiplyScalar(k),i.hemi[f]=O,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=De.LTC_FLOAT_1,i.rectAreaLTC2=De.LTC_FLOAT_2):(i.rectAreaLTC1=De.LTC_HALF_1,i.rectAreaLTC2=De.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const D=i.hash;(D.directionalLength!==p||D.pointLength!==x||D.spotLength!==_||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==C||D.numPointShadows!==S||D.numSpotShadows!==E||D.numSpotMaps!==T||D.numLightProbes!==R)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=x,i.hemi.length=f,i.directionalShadow.length=C,i.directionalShadowMap.length=C,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=C,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=E+T-y,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=R,D.directionalLength=p,D.pointLength=x,D.spotLength=_,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=C,D.numPointShadows=S,D.numSpotShadows=E,D.numSpotMaps=T,D.numLightProbes=R,i.version=iv++)}function c(l,u){let d=0,h=0,p=0,x=0,_=0;const m=u.matrixWorldInverse;for(let f=0,C=l.length;f<C;f++){const S=l[f];if(S.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),d++}else if(S.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const E=i.rectArea[x];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),s.identity(),a.copy(S.matrixWorld),a.premultiply(m),s.extractRotation(a),E.halfWidth.set(S.width*.5,0,0),E.halfHeight.set(0,S.height*.5,0),E.halfWidth.applyMatrix4(s),E.halfHeight.applyMatrix4(s),x++}else if(S.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(S.matrixWorld),E.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const E=i.hemi[_];E.direction.setFromMatrixPosition(S.matrixWorld),E.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:i}}function wu(n){const e=new av(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function a(u){t.push(u)}function s(u){i.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:s}}function sv(n){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new wu(n),e.set(r,[o])):a>=s.length?(o=new wu(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const ov=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,cv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function lv(n,e,t){let i=new cd;const r=new He,a=new He,s=new Pt,o=new Ap({depthPacking:Gh}),c=new Cp,l={},u=t.maxTextureSize,d={[hi]:cn,[cn]:hi,[En]:En},h=new Qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new He},radius:{value:4}},vertexShader:ov,fragmentShader:cv}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const x=new bt;x.setAttribute("position",new Vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Rt(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Hu;let f=this.type;this.render=function(y,R,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const b=n.getRenderTarget(),M=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),I=n.state;I.setBlending(li),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const k=f!==ii&&this.type===ii,H=f===ii&&this.type!==ii;for(let j=0,O=y.length;j<O;j++){const se=y[j],$=se.shadow;if($===void 0){Ze("WebGLShadowMap:",se,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;r.copy($.mapSize);const ce=$.getFrameExtents();if(r.multiply(ce),a.copy($.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ce.x),r.x=a.x*ce.x,$.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ce.y),r.y=a.y*ce.y,$.mapSize.y=a.y)),$.map===null||k===!0||H===!0){const fe=this.type!==ii?{minFilter:yn,magFilter:yn}:{};$.map!==null&&$.map.dispose(),$.map=new Ki(r.x,r.y,fe),$.map.texture.name=se.name+".shadowMap",$.camera.updateProjectionMatrix()}n.setRenderTarget($.map),n.clear();const ue=$.getViewportCount();for(let fe=0;fe<ue;fe++){const be=$.getViewport(fe);s.set(a.x*be.x,a.y*be.y,a.x*be.z,a.y*be.w),I.viewport(s),$.updateMatrices(se,fe),i=$.getFrustum(),E(R,D,$.camera,se,this.type)}$.isPointLightShadow!==!0&&this.type===ii&&C($,D),$.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(b,M,P)};function C(y,R){const D=e.update(_);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Ki(r.x,r.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(R,null,D,h,_,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(R,null,D,p,_,null)}function S(y,R,D,b){let M=null;const P=D.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(P!==void 0)M=P;else if(M=D.isPointLight===!0?c:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const I=M.uuid,k=R.uuid;let H=l[I];H===void 0&&(H={},l[I]=H);let j=H[k];j===void 0&&(j=M.clone(),H[k]=j,R.addEventListener("dispose",T)),M=j}if(M.visible=R.visible,M.wireframe=R.wireframe,b===ii?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const I=n.properties.get(M);I.light=D}return M}function E(y,R,D,b,M){if(y.visible===!1)return;if(y.layers.test(R.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===ii)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,y.matrixWorld);const k=e.update(y),H=y.material;if(Array.isArray(H)){const j=k.groups;for(let O=0,se=j.length;O<se;O++){const $=j[O],ce=H[$.materialIndex];if(ce&&ce.visible){const ue=S(y,ce,b,M);y.onBeforeShadow(n,y,R,D,k,ue,$),n.renderBufferDirect(D,null,k,ue,y,$),y.onAfterShadow(n,y,R,D,k,ue,$)}}}else if(H.visible){const j=S(y,H,b,M);y.onBeforeShadow(n,y,R,D,k,j,null),n.renderBufferDirect(D,null,k,j,y,null),y.onAfterShadow(n,y,R,D,k,j,null)}}const I=y.children;for(let k=0,H=I.length;k<H;k++)E(I[k],R,D,b,M)}function T(y){y.target.removeEventListener("dispose",T);for(const D in l){const b=l[D],M=y.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const uv={[Lo]:Do,[zo]:No,[Io]:Fo,[Ar]:Uo,[Do]:Lo,[No]:zo,[Fo]:Io,[Uo]:Ar};function dv(n,e){function t(){let z=!1;const N=new Pt;let W=null;const te=new Pt(0,0,0,0);return{setMask:function(ne){W!==ne&&!z&&(n.colorMask(ne,ne,ne,ne),W=ne)},setLocked:function(ne){z=ne},setClear:function(ne,Y,ye,Se,Ne){Ne===!0&&(ne*=Se,Y*=Se,ye*=Se),N.set(ne,Y,ye,Se),te.equals(N)===!1&&(n.clearColor(ne,Y,ye,Se),te.copy(N))},reset:function(){z=!1,W=null,te.set(-1,0,0,0)}}}function i(){let z=!1,N=!1,W=null,te=null,ne=null;return{setReversed:function(Y){if(N!==Y){const ye=e.get("EXT_clip_control");Y?ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.ZERO_TO_ONE_EXT):ye.clipControlEXT(ye.LOWER_LEFT_EXT,ye.NEGATIVE_ONE_TO_ONE_EXT),N=Y;const Se=ne;ne=null,this.setClear(Se)}},getReversed:function(){return N},setTest:function(Y){Y?ee(n.DEPTH_TEST):me(n.DEPTH_TEST)},setMask:function(Y){W!==Y&&!z&&(n.depthMask(Y),W=Y)},setFunc:function(Y){if(N&&(Y=uv[Y]),te!==Y){switch(Y){case Lo:n.depthFunc(n.NEVER);break;case Do:n.depthFunc(n.ALWAYS);break;case zo:n.depthFunc(n.LESS);break;case Ar:n.depthFunc(n.LEQUAL);break;case Io:n.depthFunc(n.EQUAL);break;case Uo:n.depthFunc(n.GEQUAL);break;case No:n.depthFunc(n.GREATER);break;case Fo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}te=Y}},setLocked:function(Y){z=Y},setClear:function(Y){ne!==Y&&(N&&(Y=1-Y),n.clearDepth(Y),ne=Y)},reset:function(){z=!1,W=null,te=null,ne=null,N=!1}}}function r(){let z=!1,N=null,W=null,te=null,ne=null,Y=null,ye=null,Se=null,Ne=null;return{setTest:function(je){z||(je?ee(n.STENCIL_TEST):me(n.STENCIL_TEST))},setMask:function(je){N!==je&&!z&&(n.stencilMask(je),N=je)},setFunc:function(je,pt,St){(W!==je||te!==pt||ne!==St)&&(n.stencilFunc(je,pt,St),W=je,te=pt,ne=St)},setOp:function(je,pt,St){(Y!==je||ye!==pt||Se!==St)&&(n.stencilOp(je,pt,St),Y=je,ye=pt,Se=St)},setLocked:function(je){z=je},setClear:function(je){Ne!==je&&(n.clearStencil(je),Ne=je)},reset:function(){z=!1,N=null,W=null,te=null,ne=null,Y=null,ye=null,Se=null,Ne=null}}}const a=new t,s=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,p=[],x=null,_=!1,m=null,f=null,C=null,S=null,E=null,T=null,y=null,R=new nt(0,0,0),D=0,b=!1,M=null,P=null,I=null,k=null,H=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,se=0;const $=n.getParameter(n.VERSION);$.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec($)[1]),O=se>=1):$.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),O=se>=2);let ce=null,ue={};const fe=n.getParameter(n.SCISSOR_BOX),be=n.getParameter(n.VIEWPORT),Be=new Pt().fromArray(fe),Ge=new Pt().fromArray(be);function Me(z,N,W,te){const ne=new Uint8Array(4),Y=n.createTexture();n.bindTexture(z,Y),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ye=0;ye<W;ye++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(N,0,n.RGBA,1,1,te,0,n.RGBA,n.UNSIGNED_BYTE,ne):n.texImage2D(N+ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ne);return Y}const V={};V[n.TEXTURE_2D]=Me(n.TEXTURE_2D,n.TEXTURE_2D,1),V[n.TEXTURE_CUBE_MAP]=Me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),V[n.TEXTURE_2D_ARRAY]=Me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),V[n.TEXTURE_3D]=Me(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),s.setFunc(Ar),ie(!1),oe(ml),ee(n.CULL_FACE),Ve(li);function ee(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function me(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function Re(z,N){return d[z]!==N?(n.bindFramebuffer(z,N),d[z]=N,z===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=N),z===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=N),!0):!1}function ve(z,N){let W=p,te=!1;if(z){W=h.get(N),W===void 0&&(W=[],h.set(N,W));const ne=z.textures;if(W.length!==ne.length||W[0]!==n.COLOR_ATTACHMENT0){for(let Y=0,ye=ne.length;Y<ye;Y++)W[Y]=n.COLOR_ATTACHMENT0+Y;W.length=ne.length,te=!0}}else W[0]!==n.BACK&&(W[0]=n.BACK,te=!0);te&&n.drawBuffers(W)}function ae(z){return x!==z?(n.useProgram(z),x=z,!0):!1}const Ye={[Bi]:n.FUNC_ADD,[ph]:n.FUNC_SUBTRACT,[mh]:n.FUNC_REVERSE_SUBTRACT};Ye[xh]=n.MIN,Ye[gh]=n.MAX;const ke={[vh]:n.ZERO,[_h]:n.ONE,[yh]:n.SRC_COLOR,[Ro]:n.SRC_ALPHA,[Th]:n.SRC_ALPHA_SATURATE,[wh]:n.DST_COLOR,[bh]:n.DST_ALPHA,[Mh]:n.ONE_MINUS_SRC_COLOR,[Po]:n.ONE_MINUS_SRC_ALPHA,[Eh]:n.ONE_MINUS_DST_COLOR,[Sh]:n.ONE_MINUS_DST_ALPHA,[Ah]:n.CONSTANT_COLOR,[Ch]:n.ONE_MINUS_CONSTANT_COLOR,[Rh]:n.CONSTANT_ALPHA,[Ph]:n.ONE_MINUS_CONSTANT_ALPHA};function Ve(z,N,W,te,ne,Y,ye,Se,Ne,je){if(z===li){_===!0&&(me(n.BLEND),_=!1);return}if(_===!1&&(ee(n.BLEND),_=!0),z!==fh){if(z!==m||je!==b){if((f!==Bi||E!==Bi)&&(n.blendEquation(n.FUNC_ADD),f=Bi,E=Bi),je)switch(z){case br:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ci:n.blendFunc(n.ONE,n.ONE);break;case xl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case gl:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:wt("WebGLState: Invalid blending: ",z);break}else switch(z){case br:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ci:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case xl:wt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gl:wt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:wt("WebGLState: Invalid blending: ",z);break}C=null,S=null,T=null,y=null,R.set(0,0,0),D=0,m=z,b=je}return}ne=ne||N,Y=Y||W,ye=ye||te,(N!==f||ne!==E)&&(n.blendEquationSeparate(Ye[N],Ye[ne]),f=N,E=ne),(W!==C||te!==S||Y!==T||ye!==y)&&(n.blendFuncSeparate(ke[W],ke[te],ke[Y],ke[ye]),C=W,S=te,T=Y,y=ye),(Se.equals(R)===!1||Ne!==D)&&(n.blendColor(Se.r,Se.g,Se.b,Ne),R.copy(Se),D=Ne),m=z,b=!1}function L(z,N){z.side===En?me(n.CULL_FACE):ee(n.CULL_FACE);let W=z.side===cn;N&&(W=!W),ie(W),z.blending===br&&z.transparent===!1?Ve(li):Ve(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),s.setFunc(z.depthFunc),s.setTest(z.depthTest),s.setMask(z.depthWrite),a.setMask(z.colorWrite);const te=z.stencilWrite;o.setTest(te),te&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Q(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):me(n.SAMPLE_ALPHA_TO_COVERAGE)}function ie(z){M!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),M=z)}function oe(z){z!==uh?(ee(n.CULL_FACE),z!==P&&(z===ml?n.cullFace(n.BACK):z===dh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):me(n.CULL_FACE),P=z}function he(z){z!==I&&(O&&n.lineWidth(z),I=z)}function Q(z,N,W){z?(ee(n.POLYGON_OFFSET_FILL),(k!==N||H!==W)&&(n.polygonOffset(N,W),k=N,H=W)):me(n.POLYGON_OFFSET_FILL)}function _e(z){z?ee(n.SCISSOR_TEST):me(n.SCISSOR_TEST)}function le(z){z===void 0&&(z=n.TEXTURE0+j-1),ce!==z&&(n.activeTexture(z),ce=z)}function ge(z,N,W){W===void 0&&(ce===null?W=n.TEXTURE0+j-1:W=ce);let te=ue[W];te===void 0&&(te={type:void 0,texture:void 0},ue[W]=te),(te.type!==z||te.texture!==N)&&(ce!==W&&(n.activeTexture(W),ce=W),n.bindTexture(z,N||V[z]),te.type=z,te.texture=N)}function A(){const z=ue[ce];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function g(){try{n.compressedTexImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function X(){try{n.texSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Z(){try{n.texSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function q(){try{n.compressedTexSubImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Ee(){try{n.compressedTexSubImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function pe(){try{n.texStorage2D(...arguments)}catch(z){z("WebGLState:",z)}}function Te(){try{n.texStorage3D(...arguments)}catch(z){z("WebGLState:",z)}}function v(){try{n.texImage2D(...arguments)}catch(z){z("WebGLState:",z)}}function re(){try{n.texImage3D(...arguments)}catch(z){z("WebGLState:",z)}}function de(z){Be.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),Be.copy(z))}function Fe(z){Ge.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),Ge.copy(z))}function Ie(z,N){let W=l.get(N);W===void 0&&(W=new WeakMap,l.set(N,W));let te=W.get(z);te===void 0&&(te=n.getUniformBlockIndex(N,z.name),W.set(z,te))}function xe(z,N){const te=l.get(N).get(z);c.get(N)!==te&&(n.uniformBlockBinding(N,te,z.__bindingPointIndex),c.set(N,te))}function Le(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ce=null,ue={},d={},h=new WeakMap,p=[],x=null,_=!1,m=null,f=null,C=null,S=null,E=null,T=null,y=null,R=new nt(0,0,0),D=0,b=!1,M=null,P=null,I=null,k=null,H=null,Be.set(0,0,n.canvas.width,n.canvas.height),Ge.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:ee,disable:me,bindFramebuffer:Re,drawBuffers:ve,useProgram:ae,setBlending:Ve,setMaterial:L,setFlipSided:ie,setCullFace:oe,setLineWidth:he,setPolygonOffset:Q,setScissorTest:_e,activeTexture:le,bindTexture:ge,unbindTexture:A,compressedTexImage2D:g,compressedTexImage3D:U,texImage2D:v,texImage3D:re,updateUBOMapping:Ie,uniformBlockBinding:xe,texStorage2D:pe,texStorage3D:Te,texSubImage2D:X,texSubImage3D:Z,compressedTexSubImage2D:q,compressedTexSubImage3D:Ee,scissor:de,viewport:Fe,reset:Le}}function hv(n,e,t,i,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new He,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,g){return p?new OffscreenCanvas(A,g):fa("canvas")}function _(A,g,U){let X=1;const Z=ge(A);if((Z.width>U||Z.height>U)&&(X=U/Math.max(Z.width,Z.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const q=Math.floor(X*Z.width),Ee=Math.floor(X*Z.height);d===void 0&&(d=x(q,Ee));const pe=g?x(q,Ee):d;return pe.width=q,pe.height=Ee,pe.getContext("2d").drawImage(A,0,0,q,Ee),Ze("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+q+"x"+Ee+")."),pe}else return"data"in A&&Ze("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function m(A){return A.generateMipmaps}function f(A){n.generateMipmap(A)}function C(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(A,g,U,X,Z=!1){if(A!==null){if(n[A]!==void 0)return n[A];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=g;if(g===n.RED&&(U===n.FLOAT&&(q=n.R32F),U===n.HALF_FLOAT&&(q=n.R16F),U===n.UNSIGNED_BYTE&&(q=n.R8)),g===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.R8UI),U===n.UNSIGNED_SHORT&&(q=n.R16UI),U===n.UNSIGNED_INT&&(q=n.R32UI),U===n.BYTE&&(q=n.R8I),U===n.SHORT&&(q=n.R16I),U===n.INT&&(q=n.R32I)),g===n.RG&&(U===n.FLOAT&&(q=n.RG32F),U===n.HALF_FLOAT&&(q=n.RG16F),U===n.UNSIGNED_BYTE&&(q=n.RG8)),g===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.RG8UI),U===n.UNSIGNED_SHORT&&(q=n.RG16UI),U===n.UNSIGNED_INT&&(q=n.RG32UI),U===n.BYTE&&(q=n.RG8I),U===n.SHORT&&(q=n.RG16I),U===n.INT&&(q=n.RG32I)),g===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.RGB8UI),U===n.UNSIGNED_SHORT&&(q=n.RGB16UI),U===n.UNSIGNED_INT&&(q=n.RGB32UI),U===n.BYTE&&(q=n.RGB8I),U===n.SHORT&&(q=n.RGB16I),U===n.INT&&(q=n.RGB32I)),g===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),U===n.UNSIGNED_INT&&(q=n.RGBA32UI),U===n.BYTE&&(q=n.RGBA8I),U===n.SHORT&&(q=n.RGBA16I),U===n.INT&&(q=n.RGBA32I)),g===n.RGB&&(U===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),U===n.UNSIGNED_INT_10F_11F_11F_REV&&(q=n.R11F_G11F_B10F)),g===n.RGBA){const Ee=Z?ys:at.getTransfer(X);U===n.FLOAT&&(q=n.RGBA32F),U===n.HALF_FLOAT&&(q=n.RGBA16F),U===n.UNSIGNED_BYTE&&(q=Ee===ht?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function E(A,g){let U;return A?g===null||g===Yi||g===ua?U=n.DEPTH24_STENCIL8:g===Hn?U=n.DEPTH32F_STENCIL8:g===la&&(U=n.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Yi||g===ua?U=n.DEPTH_COMPONENT24:g===Hn?U=n.DEPTH_COMPONENT32F:g===la&&(U=n.DEPTH_COMPONENT16),U}function T(A,g){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==yn&&A.minFilter!==vn?Math.log2(Math.max(g.width,g.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?g.mipmaps.length:1}function y(A){const g=A.target;g.removeEventListener("dispose",y),D(g),g.isVideoTexture&&u.delete(g)}function R(A){const g=A.target;g.removeEventListener("dispose",R),M(g)}function D(A){const g=i.get(A);if(g.__webglInit===void 0)return;const U=A.source,X=h.get(U);if(X){const Z=X[g.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&b(A),Object.keys(X).length===0&&h.delete(U)}i.remove(A)}function b(A){const g=i.get(A);n.deleteTexture(g.__webglTexture);const U=A.source,X=h.get(U);delete X[g.__cacheKey],s.memory.textures--}function M(A){const g=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(g.__webglFramebuffer[X]))for(let Z=0;Z<g.__webglFramebuffer[X].length;Z++)n.deleteFramebuffer(g.__webglFramebuffer[X][Z]);else n.deleteFramebuffer(g.__webglFramebuffer[X]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[X])}else{if(Array.isArray(g.__webglFramebuffer))for(let X=0;X<g.__webglFramebuffer.length;X++)n.deleteFramebuffer(g.__webglFramebuffer[X]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let X=0;X<g.__webglColorRenderbuffer.length;X++)g.__webglColorRenderbuffer[X]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[X]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const U=A.textures;for(let X=0,Z=U.length;X<Z;X++){const q=i.get(U[X]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),s.memory.textures--),i.remove(U[X])}i.remove(A)}let P=0;function I(){P=0}function k(){const A=P;return A>=r.maxTextures&&Ze("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),P+=1,A}function H(A){const g=[];return g.push(A.wrapS),g.push(A.wrapT),g.push(A.wrapR||0),g.push(A.magFilter),g.push(A.minFilter),g.push(A.anisotropy),g.push(A.internalFormat),g.push(A.format),g.push(A.type),g.push(A.generateMipmaps),g.push(A.premultiplyAlpha),g.push(A.flipY),g.push(A.unpackAlignment),g.push(A.colorSpace),g.join()}function j(A,g){const U=i.get(A);if(A.isVideoTexture&&_e(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&U.__version!==A.version){const X=A.image;if(X===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{V(U,A,g);return}}else A.isExternalTexture&&(U.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+g)}function O(A,g){const U=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){V(U,A,g);return}else A.isExternalTexture&&(U.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+g)}function se(A,g){const U=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&U.__version!==A.version){V(U,A,g);return}t.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+g)}function $(A,g){const U=i.get(A);if(A.version>0&&U.__version!==A.version){ee(U,A,g);return}t.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+g)}const ce={[Bo]:n.REPEAT,[oi]:n.CLAMP_TO_EDGE,[Vo]:n.MIRRORED_REPEAT},ue={[yn]:n.NEAREST,[Bh]:n.NEAREST_MIPMAP_NEAREST,[La]:n.NEAREST_MIPMAP_LINEAR,[vn]:n.LINEAR,[Bs]:n.LINEAR_MIPMAP_NEAREST,[Hi]:n.LINEAR_MIPMAP_LINEAR},fe={[Xh]:n.NEVER,[Kh]:n.ALWAYS,[qh]:n.LESS,[Ju]:n.LEQUAL,[jh]:n.EQUAL,[Zh]:n.GEQUAL,[$h]:n.GREATER,[Yh]:n.NOTEQUAL};function be(A,g){if(g.type===Hn&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===vn||g.magFilter===Bs||g.magFilter===La||g.magFilter===Hi||g.minFilter===vn||g.minFilter===Bs||g.minFilter===La||g.minFilter===Hi)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,ce[g.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ce[g.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ce[g.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ue[g.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ue[g.minFilter]),g.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,fe[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===yn||g.minFilter!==La&&g.minFilter!==Hi||g.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const U=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function Be(A,g){let U=!1;A.__webglInit===void 0&&(A.__webglInit=!0,g.addEventListener("dispose",y));const X=g.source;let Z=h.get(X);Z===void 0&&(Z={},h.set(X,Z));const q=H(g);if(q!==A.__cacheKey){Z[q]===void 0&&(Z[q]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,U=!0),Z[q].usedTimes++;const Ee=Z[A.__cacheKey];Ee!==void 0&&(Z[A.__cacheKey].usedTimes--,Ee.usedTimes===0&&b(g)),A.__cacheKey=q,A.__webglTexture=Z[q].texture}return U}function Ge(A,g,U){return Math.floor(Math.floor(A/U)/g)}function Me(A,g,U,X){const q=A.updateRanges;if(q.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,g.width,g.height,U,X,g.data);else{q.sort((re,de)=>re.start-de.start);let Ee=0;for(let re=1;re<q.length;re++){const de=q[Ee],Fe=q[re],Ie=de.start+de.count,xe=Ge(Fe.start,g.width,4),Le=Ge(de.start,g.width,4);Fe.start<=Ie+1&&xe===Le&&Ge(Fe.start+Fe.count-1,g.width,4)===xe?de.count=Math.max(de.count,Fe.start+Fe.count-de.start):(++Ee,q[Ee]=Fe)}q.length=Ee+1;const pe=n.getParameter(n.UNPACK_ROW_LENGTH),Te=n.getParameter(n.UNPACK_SKIP_PIXELS),v=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,g.width);for(let re=0,de=q.length;re<de;re++){const Fe=q[re],Ie=Math.floor(Fe.start/4),xe=Math.ceil(Fe.count/4),Le=Ie%g.width,z=Math.floor(Ie/g.width),N=xe,W=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Le),n.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,Le,z,N,W,U,X,g.data)}A.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,pe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Te),n.pixelStorei(n.UNPACK_SKIP_ROWS,v)}}function V(A,g,U){let X=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(X=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(X=n.TEXTURE_3D);const Z=Be(A,g),q=g.source;t.bindTexture(X,A.__webglTexture,n.TEXTURE0+U);const Ee=i.get(q);if(q.version!==Ee.__version||Z===!0){t.activeTexture(n.TEXTURE0+U);const pe=at.getPrimaries(at.workingColorSpace),Te=g.colorSpace===Ai?null:at.getPrimaries(g.colorSpace),v=g.colorSpace===Ai||pe===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,v);let re=_(g.image,!1,r.maxTextureSize);re=le(g,re);const de=a.convert(g.format,g.colorSpace),Fe=a.convert(g.type);let Ie=S(g.internalFormat,de,Fe,g.colorSpace,g.isVideoTexture);be(X,g);let xe;const Le=g.mipmaps,z=g.isVideoTexture!==!0,N=Ee.__version===void 0||Z===!0,W=q.dataReady,te=T(g,re);if(g.isDepthTexture)Ie=E(g.format===ha,g.type),N&&(z?t.texStorage2D(n.TEXTURE_2D,1,Ie,re.width,re.height):t.texImage2D(n.TEXTURE_2D,0,Ie,re.width,re.height,0,de,Fe,null));else if(g.isDataTexture)if(Le.length>0){z&&N&&t.texStorage2D(n.TEXTURE_2D,te,Ie,Le[0].width,Le[0].height);for(let ne=0,Y=Le.length;ne<Y;ne++)xe=Le[ne],z?W&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,xe.width,xe.height,de,Fe,xe.data):t.texImage2D(n.TEXTURE_2D,ne,Ie,xe.width,xe.height,0,de,Fe,xe.data);g.generateMipmaps=!1}else z?(N&&t.texStorage2D(n.TEXTURE_2D,te,Ie,re.width,re.height),W&&Me(g,re,de,Fe)):t.texImage2D(n.TEXTURE_2D,0,Ie,re.width,re.height,0,de,Fe,re.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){z&&N&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,Ie,Le[0].width,Le[0].height,re.depth);for(let ne=0,Y=Le.length;ne<Y;ne++)if(xe=Le[ne],g.format!==zn)if(de!==null)if(z){if(W)if(g.layerUpdates.size>0){const ye=tu(xe.width,xe.height,g.format,g.type);for(const Se of g.layerUpdates){const Ne=xe.data.subarray(Se*ye/xe.data.BYTES_PER_ELEMENT,(Se+1)*ye/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,Se,xe.width,xe.height,1,de,Ne)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,xe.width,xe.height,re.depth,de,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ne,Ie,xe.width,xe.height,re.depth,0,xe.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?W&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ne,0,0,0,xe.width,xe.height,re.depth,de,Fe,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ne,Ie,xe.width,xe.height,re.depth,0,de,Fe,xe.data)}else{z&&N&&t.texStorage2D(n.TEXTURE_2D,te,Ie,Le[0].width,Le[0].height);for(let ne=0,Y=Le.length;ne<Y;ne++)xe=Le[ne],g.format!==zn?de!==null?z?W&&t.compressedTexSubImage2D(n.TEXTURE_2D,ne,0,0,xe.width,xe.height,de,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,ne,Ie,xe.width,xe.height,0,xe.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?W&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,xe.width,xe.height,de,Fe,xe.data):t.texImage2D(n.TEXTURE_2D,ne,Ie,xe.width,xe.height,0,de,Fe,xe.data)}else if(g.isDataArrayTexture)if(z){if(N&&t.texStorage3D(n.TEXTURE_2D_ARRAY,te,Ie,re.width,re.height,re.depth),W)if(g.layerUpdates.size>0){const ne=tu(re.width,re.height,g.format,g.type);for(const Y of g.layerUpdates){const ye=re.data.subarray(Y*ne/re.data.BYTES_PER_ELEMENT,(Y+1)*ne/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,re.width,re.height,1,de,Fe,ye)}g.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,de,Fe,re.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ie,re.width,re.height,re.depth,0,de,Fe,re.data);else if(g.isData3DTexture)z?(N&&t.texStorage3D(n.TEXTURE_3D,te,Ie,re.width,re.height,re.depth),W&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,de,Fe,re.data)):t.texImage3D(n.TEXTURE_3D,0,Ie,re.width,re.height,re.depth,0,de,Fe,re.data);else if(g.isFramebufferTexture){if(N)if(z)t.texStorage2D(n.TEXTURE_2D,te,Ie,re.width,re.height);else{let ne=re.width,Y=re.height;for(let ye=0;ye<te;ye++)t.texImage2D(n.TEXTURE_2D,ye,Ie,ne,Y,0,de,Fe,null),ne>>=1,Y>>=1}}else if(Le.length>0){if(z&&N){const ne=ge(Le[0]);t.texStorage2D(n.TEXTURE_2D,te,Ie,ne.width,ne.height)}for(let ne=0,Y=Le.length;ne<Y;ne++)xe=Le[ne],z?W&&t.texSubImage2D(n.TEXTURE_2D,ne,0,0,de,Fe,xe):t.texImage2D(n.TEXTURE_2D,ne,Ie,de,Fe,xe);g.generateMipmaps=!1}else if(z){if(N){const ne=ge(re);t.texStorage2D(n.TEXTURE_2D,te,Ie,ne.width,ne.height)}W&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,de,Fe,re)}else t.texImage2D(n.TEXTURE_2D,0,Ie,de,Fe,re);m(g)&&f(X),Ee.__version=q.version,g.onUpdate&&g.onUpdate(g)}A.__version=g.version}function ee(A,g,U){if(g.image.length!==6)return;const X=Be(A,g),Z=g.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+U);const q=i.get(Z);if(Z.version!==q.__version||X===!0){t.activeTexture(n.TEXTURE0+U);const Ee=at.getPrimaries(at.workingColorSpace),pe=g.colorSpace===Ai?null:at.getPrimaries(g.colorSpace),Te=g.colorSpace===Ai||Ee===pe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const v=g.isCompressedTexture||g.image[0].isCompressedTexture,re=g.image[0]&&g.image[0].isDataTexture,de=[];for(let Y=0;Y<6;Y++)!v&&!re?de[Y]=_(g.image[Y],!0,r.maxCubemapSize):de[Y]=re?g.image[Y].image:g.image[Y],de[Y]=le(g,de[Y]);const Fe=de[0],Ie=a.convert(g.format,g.colorSpace),xe=a.convert(g.type),Le=S(g.internalFormat,Ie,xe,g.colorSpace),z=g.isVideoTexture!==!0,N=q.__version===void 0||X===!0,W=Z.dataReady;let te=T(g,Fe);be(n.TEXTURE_CUBE_MAP,g);let ne;if(v){z&&N&&t.texStorage2D(n.TEXTURE_CUBE_MAP,te,Le,Fe.width,Fe.height);for(let Y=0;Y<6;Y++){ne=de[Y].mipmaps;for(let ye=0;ye<ne.length;ye++){const Se=ne[ye];g.format!==zn?Ie!==null?z?W&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,0,0,Se.width,Se.height,Ie,Se.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,Le,Se.width,Se.height,0,Se.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?W&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,0,0,Se.width,Se.height,Ie,xe,Se.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye,Le,Se.width,Se.height,0,Ie,xe,Se.data)}}}else{if(ne=g.mipmaps,z&&N){ne.length>0&&te++;const Y=ge(de[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,te,Le,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(re){z?W&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,de[Y].width,de[Y].height,Ie,xe,de[Y].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Le,de[Y].width,de[Y].height,0,Ie,xe,de[Y].data);for(let ye=0;ye<ne.length;ye++){const Ne=ne[ye].image[Y].image;z?W&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,0,0,Ne.width,Ne.height,Ie,xe,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,Le,Ne.width,Ne.height,0,Ie,xe,Ne.data)}}else{z?W&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ie,xe,de[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,Le,Ie,xe,de[Y]);for(let ye=0;ye<ne.length;ye++){const Se=ne[ye];z?W&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,0,0,Ie,xe,Se.image[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,ye+1,Le,Ie,xe,Se.image[Y])}}}m(g)&&f(n.TEXTURE_CUBE_MAP),q.__version=Z.version,g.onUpdate&&g.onUpdate(g)}A.__version=g.version}function me(A,g,U,X,Z,q){const Ee=a.convert(U.format,U.colorSpace),pe=a.convert(U.type),Te=S(U.internalFormat,Ee,pe,U.colorSpace),v=i.get(g),re=i.get(U);if(re.__renderTarget=g,!v.__hasExternalTextures){const de=Math.max(1,g.width>>q),Fe=Math.max(1,g.height>>q);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,q,Te,de,Fe,g.depth,0,Ee,pe,null):t.texImage2D(Z,q,Te,de,Fe,0,Ee,pe,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Q(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,X,Z,re.__webglTexture,0,he(g)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,X,Z,re.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(A,g,U){if(n.bindRenderbuffer(n.RENDERBUFFER,A),g.depthBuffer){const X=g.depthTexture,Z=X&&X.isDepthTexture?X.type:null,q=E(g.stencilBuffer,Z),Ee=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=he(g);Q(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pe,q,g.width,g.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,pe,q,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,q,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ee,n.RENDERBUFFER,A)}else{const X=g.textures;for(let Z=0;Z<X.length;Z++){const q=X[Z],Ee=a.convert(q.format,q.colorSpace),pe=a.convert(q.type),Te=S(q.internalFormat,Ee,pe,q.colorSpace),v=he(g);U&&Q(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,v,Te,g.width,g.height):Q(g)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,v,Te,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,Te,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ve(A,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=i.get(g.depthTexture);X.__renderTarget=g,(!X.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),j(g.depthTexture,0);const Z=X.__webglTexture,q=he(g);if(g.depthTexture.format===da)Q(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(g.depthTexture.format===ha)Q(g)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function ae(A){const g=i.get(A),U=A.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==A.depthTexture){const X=A.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),X){const Z=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,X.removeEventListener("dispose",Z)};X.addEventListener("dispose",Z),g.__depthDisposeCallback=Z}g.__boundDepthTexture=X}if(A.depthTexture&&!g.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const X=A.texture.mipmaps;X&&X.length>0?ve(g.__webglFramebuffer[0],A):ve(g.__webglFramebuffer,A)}else if(U){g.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[X]),g.__webglDepthbuffer[X]===void 0)g.__webglDepthbuffer[X]=n.createRenderbuffer(),Re(g.__webglDepthbuffer[X],A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=g.__webglDepthbuffer[X];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,q)}}else{const X=A.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),Re(g.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,q)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ye(A,g,U){const X=i.get(A);g!==void 0&&me(X.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&ae(A)}function ke(A){const g=A.texture,U=i.get(A),X=i.get(g);A.addEventListener("dispose",R);const Z=A.textures,q=A.isWebGLCubeRenderTarget===!0,Ee=Z.length>1;if(Ee||(X.__webglTexture===void 0&&(X.__webglTexture=n.createTexture()),X.__version=g.version,s.memory.textures++),q){U.__webglFramebuffer=[];for(let pe=0;pe<6;pe++)if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer[pe]=[];for(let Te=0;Te<g.mipmaps.length;Te++)U.__webglFramebuffer[pe][Te]=n.createFramebuffer()}else U.__webglFramebuffer[pe]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){U.__webglFramebuffer=[];for(let pe=0;pe<g.mipmaps.length;pe++)U.__webglFramebuffer[pe]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(Ee)for(let pe=0,Te=Z.length;pe<Te;pe++){const v=i.get(Z[pe]);v.__webglTexture===void 0&&(v.__webglTexture=n.createTexture(),s.memory.textures++)}if(A.samples>0&&Q(A)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let pe=0;pe<Z.length;pe++){const Te=Z[pe];U.__webglColorRenderbuffer[pe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[pe]);const v=a.convert(Te.format,Te.colorSpace),re=a.convert(Te.type),de=S(Te.internalFormat,v,re,Te.colorSpace,A.isXRRenderTarget===!0),Fe=he(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,de,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+pe,n.RENDERBUFFER,U.__webglColorRenderbuffer[pe])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Re(U.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,X.__webglTexture),be(n.TEXTURE_CUBE_MAP,g);for(let pe=0;pe<6;pe++)if(g.mipmaps&&g.mipmaps.length>0)for(let Te=0;Te<g.mipmaps.length;Te++)me(U.__webglFramebuffer[pe][Te],A,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Te);else me(U.__webglFramebuffer[pe],A,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0);m(g)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let pe=0,Te=Z.length;pe<Te;pe++){const v=Z[pe],re=i.get(v);let de=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,re.__webglTexture),be(de,v),me(U.__webglFramebuffer,A,v,n.COLOR_ATTACHMENT0+pe,de,0),m(v)&&f(de)}t.unbindTexture()}else{let pe=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(pe=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(pe,X.__webglTexture),be(pe,g),g.mipmaps&&g.mipmaps.length>0)for(let Te=0;Te<g.mipmaps.length;Te++)me(U.__webglFramebuffer[Te],A,g,n.COLOR_ATTACHMENT0,pe,Te);else me(U.__webglFramebuffer,A,g,n.COLOR_ATTACHMENT0,pe,0);m(g)&&f(pe),t.unbindTexture()}A.depthBuffer&&ae(A)}function Ve(A){const g=A.textures;for(let U=0,X=g.length;U<X;U++){const Z=g[U];if(m(Z)){const q=C(A),Ee=i.get(Z).__webglTexture;t.bindTexture(q,Ee),f(q),t.unbindTexture()}}}const L=[],ie=[];function oe(A){if(A.samples>0){if(Q(A)===!1){const g=A.textures,U=A.width,X=A.height;let Z=n.COLOR_BUFFER_BIT;const q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ee=i.get(A),pe=g.length>1;if(pe)for(let v=0;v<g.length;v++)t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+v,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+v,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const Te=A.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let v=0;v<g.length;v++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),pe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[v]);const re=i.get(g[v]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,re,0)}n.blitFramebuffer(0,0,U,X,0,0,U,X,Z,n.NEAREST),c===!0&&(L.length=0,ie.length=0,L.push(n.COLOR_ATTACHMENT0+v),A.depthBuffer&&A.resolveDepthBuffer===!1&&(L.push(q),ie.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ie)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,L))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),pe)for(let v=0;v<g.length;v++){t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+v,n.RENDERBUFFER,Ee.__webglColorRenderbuffer[v]);const re=i.get(g[v]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ee.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+v,n.TEXTURE_2D,re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const g=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function he(A){return Math.min(r.maxSamples,A.samples)}function Q(A){const g=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function _e(A){const g=s.render.frame;u.get(A)!==g&&(u.set(A,g),A.update())}function le(A,g){const U=A.colorSpace,X=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||U!==Pr&&U!==Ai&&(at.getTransfer(U)===ht?(X!==zn||Z!==fi)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):wt("WebGLTextures: Unsupported texture color space:",U)),g}function ge(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=I,this.setTexture2D=j,this.setTexture2DArray=O,this.setTexture3D=se,this.setTextureCube=$,this.rebindTextures=Ye,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=Ve,this.updateMultisampleRenderTarget=oe,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Q}function fv(n,e){function t(i,r=Ai){let a;const s=at.getTransfer(r);if(i===fi)return n.UNSIGNED_BYTE;if(i===Ic)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Uc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$u)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Yu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===qu)return n.BYTE;if(i===ju)return n.SHORT;if(i===la)return n.UNSIGNED_SHORT;if(i===zc)return n.INT;if(i===Yi)return n.UNSIGNED_INT;if(i===Hn)return n.FLOAT;if(i===Ir)return n.HALF_FLOAT;if(i===Zu)return n.ALPHA;if(i===Ku)return n.RGB;if(i===zn)return n.RGBA;if(i===da)return n.DEPTH_COMPONENT;if(i===ha)return n.DEPTH_STENCIL;if(i===Nc)return n.RED;if(i===Fc)return n.RED_INTEGER;if(i===kc)return n.RG;if(i===Oc)return n.RG_INTEGER;if(i===Bc)return n.RGBA_INTEGER;if(i===ps||i===ms||i===xs||i===gs)if(s===ht)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===ps)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ms)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===gs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===ps)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ms)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xs)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===gs)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Go||i===Ho||i===Wo||i===Xo)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Go)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ho)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Wo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Xo)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===qo||i===jo||i===$o)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===qo||i===jo)return s===ht?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===$o)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Yo||i===Zo||i===Ko||i===Jo||i===Qo||i===ec||i===tc||i===nc||i===ic||i===rc||i===ac||i===sc||i===oc||i===cc)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Yo)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Zo)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ko)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Jo)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Qo)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ec)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===tc)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===nc)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ic)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===rc)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ac)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===sc)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===oc)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===cc)return s===ht?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===lc||i===uc||i===dc)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===lc)return s===ht?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===uc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===hc||i===fc||i===pc||i===mc)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===hc)return a.COMPRESSED_RED_RGTC1_EXT;if(i===fc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===pc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===mc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ua?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class xv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new hd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Qt({vertexShader:pv,fragmentShader:mv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Rt(new Ls(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class gv extends Ur{constructor(e,t){super();const i=this;let r=null,a=1,s=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,x=null;const _=typeof XRWebGLBinding<"u",m=new xv,f={},C=t.getContextAttributes();let S=null,E=null;const T=[],y=[],R=new He;let D=null;const b=new wn;b.viewport=new Pt;const M=new wn;M.viewport=new Pt;const P=[b,M],I=new Ip;let k=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let ee=T[V];return ee===void 0&&(ee=new oo,T[V]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(V){let ee=T[V];return ee===void 0&&(ee=new oo,T[V]=ee),ee.getGripSpace()},this.getHand=function(V){let ee=T[V];return ee===void 0&&(ee=new oo,T[V]=ee),ee.getHandSpace()};function j(V){const ee=y.indexOf(V.inputSource);if(ee===-1)return;const me=T[ee];me!==void 0&&(me.update(V.inputSource,V.frame,l||s),me.dispatchEvent({type:V.type,data:V.inputSource}))}function O(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",O),r.removeEventListener("inputsourceschange",se);for(let V=0;V<T.length;V++){const ee=y[V];ee!==null&&(y[V]=null,T[V].disconnect(ee))}k=null,H=null,m.reset();for(const V in f)delete f[V];e.setRenderTarget(S),p=null,h=null,d=null,r=null,E=null,Me.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){a=V,i.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,i.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",O),r.addEventListener("inputsourceschange",se),C.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(R),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Re=null,ve=null;C.depth&&(ve=C.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=C.stencil?ha:da,Re=C.stencil?ua:Yi);const ae={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(ae),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),E=new Ki(h.textureWidth,h.textureHeight,{format:zn,type:fi,depthTexture:new dd(h.textureWidth,h.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:C.stencil,colorSpace:e.outputColorSpace,samples:C.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const me={antialias:C.antialias,alpha:!0,depth:C.depth,stencil:C.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,me),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),E=new Ki(p.framebufferWidth,p.framebufferHeight,{format:zn,type:fi,colorSpace:e.outputColorSpace,stencilBuffer:C.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),Me.setContext(r),Me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se(V){for(let ee=0;ee<V.removed.length;ee++){const me=V.removed[ee],Re=y.indexOf(me);Re>=0&&(y[Re]=null,T[Re].disconnect(me))}for(let ee=0;ee<V.added.length;ee++){const me=V.added[ee];let Re=y.indexOf(me);if(Re===-1){for(let ae=0;ae<T.length;ae++)if(ae>=y.length){y.push(me),Re=ae;break}else if(y[ae]===null){y[ae]=me,Re=ae;break}if(Re===-1)break}const ve=T[Re];ve&&ve.connect(me)}}const $=new F,ce=new F;function ue(V,ee,me){$.setFromMatrixPosition(ee.matrixWorld),ce.setFromMatrixPosition(me.matrixWorld);const Re=$.distanceTo(ce),ve=ee.projectionMatrix.elements,ae=me.projectionMatrix.elements,Ye=ve[14]/(ve[10]-1),ke=ve[14]/(ve[10]+1),Ve=(ve[9]+1)/ve[5],L=(ve[9]-1)/ve[5],ie=(ve[8]-1)/ve[0],oe=(ae[8]+1)/ae[0],he=Ye*ie,Q=Ye*oe,_e=Re/(-ie+oe),le=_e*-ie;if(ee.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(le),V.translateZ(_e),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),ve[10]===-1)V.projectionMatrix.copy(ee.projectionMatrix),V.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const ge=Ye+_e,A=ke+_e,g=he-le,U=Q+(Re-le),X=Ve*ke/A*ge,Z=L*ke/A*ge;V.projectionMatrix.makePerspective(g,U,X,Z,ge,A),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function fe(V,ee){ee===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(ee.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;let ee=V.near,me=V.far;m.texture!==null&&(m.depthNear>0&&(ee=m.depthNear),m.depthFar>0&&(me=m.depthFar)),I.near=M.near=b.near=ee,I.far=M.far=b.far=me,(k!==I.near||H!==I.far)&&(r.updateRenderState({depthNear:I.near,depthFar:I.far}),k=I.near,H=I.far),I.layers.mask=V.layers.mask|6,b.layers.mask=I.layers.mask&3,M.layers.mask=I.layers.mask&5;const Re=V.parent,ve=I.cameras;fe(I,Re);for(let ae=0;ae<ve.length;ae++)fe(ve[ae],Re);ve.length===2?ue(I,b,M):I.projectionMatrix.copy(b.projectionMatrix),be(V,I,Re)};function be(V,ee,me){me===null?V.matrix.copy(ee.matrixWorld):(V.matrix.copy(me.matrixWorld),V.matrix.invert(),V.matrix.multiply(ee.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(ee.projectionMatrix),V.projectionMatrixInverse.copy(ee.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=ma*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function(V){c=V,h!==null&&(h.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(V){return f[V]};let Be=null;function Ge(V,ee){if(u=ee.getViewerPose(l||s),x=ee,u!==null){const me=u.views;p!==null&&(e.setRenderTargetFramebuffer(E,p.framebuffer),e.setRenderTarget(E));let Re=!1;me.length!==I.cameras.length&&(I.cameras.length=0,Re=!0);for(let ke=0;ke<me.length;ke++){const Ve=me[ke];let L=null;if(p!==null)L=p.getViewport(Ve);else{const oe=d.getViewSubImage(h,Ve);L=oe.viewport,ke===0&&(e.setRenderTargetTextures(E,oe.colorTexture,oe.depthStencilTexture),e.setRenderTarget(E))}let ie=P[ke];ie===void 0&&(ie=new wn,ie.layers.enable(ke),ie.viewport=new Pt,P[ke]=ie),ie.matrix.fromArray(Ve.transform.matrix),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.projectionMatrix.fromArray(Ve.projectionMatrix),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert(),ie.viewport.set(L.x,L.y,L.width,L.height),ke===0&&(I.matrix.copy(ie.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Re===!0&&I.cameras.push(ie)}const ve=r.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const ke=d.getDepthInformation(me[0]);ke&&ke.isValid&&ke.texture&&m.init(ke,r.renderState)}if(ve&&ve.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let ke=0;ke<me.length;ke++){const Ve=me[ke].camera;if(Ve){let L=f[Ve];L||(L=new hd,f[Ve]=L);const ie=d.getCameraImage(Ve);L.sourceTexture=ie}}}}for(let me=0;me<T.length;me++){const Re=y[me],ve=T[me];Re!==null&&ve!==void 0&&ve.update(Re,ee,l||s)}Be&&Be(V,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),x=null}const Me=new yd;Me.setAnimationLoop(Ge),this.setAnimationLoop=function(V){Be=V},this.dispose=function(){}}}const Fi=new pi,vv=new ft;function _v(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,rd(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,C,S,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(m,f):f.isMeshToonMaterial?(a(m,f),d(m,f)):f.isMeshPhongMaterial?(a(m,f),u(m,f)):f.isMeshStandardMaterial?(a(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,E)):f.isMeshMatcapMaterial?(a(m,f),x(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),_(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,C,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===cn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===cn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const C=e.get(f),S=C.envMap,E=C.envMapRotation;S&&(m.envMap.value=S,Fi.copy(E),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),m.envMapRotation.value.setFromMatrix4(vv.makeRotationFromEuler(Fi)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,C,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*C,m.scale.value=S*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,C){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===cn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=C.texture,m.transmissionSamplerSize.value.set(C.width,C.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const C=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(C.matrixWorld),m.nearDistance.value=C.shadow.camera.near,m.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function yv(n,e,t,i){let r={},a={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(C,S){const E=S.program;i.uniformBlockBinding(C,E)}function l(C,S){let E=r[C.id];E===void 0&&(x(C),E=u(C),r[C.id]=E,C.addEventListener("dispose",m));const T=S.program;i.updateUBOMapping(C,T);const y=e.render.frame;a[C.id]!==y&&(h(C),a[C.id]=y)}function u(C){const S=d();C.__bindingPointIndex=S;const E=n.createBuffer(),T=C.__size,y=C.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,T,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,E),E}function d(){for(let C=0;C<o;C++)if(s.indexOf(C)===-1)return s.push(C),C;return wt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(C){const S=r[C.id],E=C.uniforms,T=C.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let y=0,R=E.length;y<R;y++){const D=Array.isArray(E[y])?E[y]:[E[y]];for(let b=0,M=D.length;b<M;b++){const P=D[b];if(p(P,y,b,T)===!0){const I=P.__offset,k=Array.isArray(P.value)?P.value:[P.value];let H=0;for(let j=0;j<k.length;j++){const O=k[j],se=_(O);typeof O=="number"||typeof O=="boolean"?(P.__data[0]=O,n.bufferSubData(n.UNIFORM_BUFFER,I+H,P.__data)):O.isMatrix3?(P.__data[0]=O.elements[0],P.__data[1]=O.elements[1],P.__data[2]=O.elements[2],P.__data[3]=0,P.__data[4]=O.elements[3],P.__data[5]=O.elements[4],P.__data[6]=O.elements[5],P.__data[7]=0,P.__data[8]=O.elements[6],P.__data[9]=O.elements[7],P.__data[10]=O.elements[8],P.__data[11]=0):(O.toArray(P.__data,H),H+=se.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(C,S,E,T){const y=C.value,R=S+"_"+E;if(T[R]===void 0)return typeof y=="number"||typeof y=="boolean"?T[R]=y:T[R]=y.clone(),!0;{const D=T[R];if(typeof y=="number"||typeof y=="boolean"){if(D!==y)return T[R]=y,!0}else if(D.equals(y)===!1)return D.copy(y),!0}return!1}function x(C){const S=C.uniforms;let E=0;const T=16;for(let R=0,D=S.length;R<D;R++){const b=Array.isArray(S[R])?S[R]:[S[R]];for(let M=0,P=b.length;M<P;M++){const I=b[M],k=Array.isArray(I.value)?I.value:[I.value];for(let H=0,j=k.length;H<j;H++){const O=k[H],se=_(O),$=E%T,ce=$%se.boundary,ue=$+ce;E+=ce,ue!==0&&T-ue<se.storage&&(E+=T-ue),I.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=E,E+=se.storage}}}const y=E%T;return y>0&&(E+=T-y),C.__size=E,C.__cache={},this}function _(C){const S={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(S.boundary=4,S.storage=4):C.isVector2?(S.boundary=8,S.storage=8):C.isVector3||C.isColor?(S.boundary=16,S.storage=12):C.isVector4?(S.boundary=16,S.storage=16):C.isMatrix3?(S.boundary=48,S.storage=48):C.isMatrix4?(S.boundary=64,S.storage=64):C.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ze("WebGLRenderer: Unsupported uniform value type.",C),S}function m(C){const S=C.target;S.removeEventListener("dispose",m);const E=s.indexOf(S.__bindingPointIndex);s.splice(E,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete a[S.id]}function f(){for(const C in r)n.deleteBuffer(r[C]);s=[],r={},a={}}return{bind:c,update:l,dispose:f}}const Mv=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let ni=null;function bv(){return ni===null&&(ni=new Xc(Mv,32,32,kc,Ir),ni.minFilter=vn,ni.magFilter=vn,ni.wrapS=oi,ni.wrapT=oi,ni.generateMipmaps=!1,ni.needsUpdate=!0),ni}class Sv{constructor(e={}){const{canvas:t=Jh(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=s;const x=new Set([Bc,Oc,Fc]),_=new Set([fi,Yi,la,ua,Ic,Uc]),m=new Uint32Array(4),f=new Int32Array(4);let C=null,S=null;const E=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let R=!1;this._outputColorSpace=Dt;let D=0,b=0,M=null,P=-1,I=null;const k=new Pt,H=new Pt;let j=null;const O=new nt(0);let se=0,$=t.width,ce=t.height,ue=1,fe=null,be=null;const Be=new Pt(0,0,$,ce),Ge=new Pt(0,0,$,ce);let Me=!1;const V=new cd;let ee=!1,me=!1;const Re=new ft,ve=new F,ae=new Pt,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ke=!1;function Ve(){return M===null?ue:1}let L=i;function ie(w,B){return t.getContext(w,B)}try{const w={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Dc}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",Y,!1),t.addEventListener("webglcontextcreationerror",ye,!1),L===null){const B="webgl2";if(L=ie(B,w),L===null)throw ie(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw w("WebGLRenderer: "+w.message),w}let oe,he,Q,_e,le,ge,A,g,U,X,Z,q,Ee,pe,Te,v,re,de,Fe,Ie,xe,Le,z,N;function W(){oe=new Lx(L),oe.init(),Le=new fv(L,oe),he=new bx(L,oe,e,Le),Q=new dv(L,oe),he.reversedDepthBuffer&&h&&Q.buffers.depth.setReversed(!0),_e=new Ix(L),le=new Jg,ge=new hv(L,oe,Q,le,he,Le,_e),A=new wx(y),g=new Px(y),U=new kp(L),z=new yx(L,U),X=new Dx(L,U,_e,z),Z=new Nx(L,X,U,_e),Fe=new Ux(L,he,ge),v=new Sx(le),q=new Kg(y,A,g,oe,he,z,v),Ee=new _v(y,le),pe=new ev,Te=new sv(oe),de=new _x(y,A,g,Q,Z,p,c),re=new lv(y,Z,he),N=new yv(L,_e,he,Q),Ie=new Mx(L,oe,_e),xe=new zx(L,oe,_e),_e.programs=q.programs,y.capabilities=he,y.extensions=oe,y.properties=le,y.renderLists=pe,y.shadowMap=re,y.state=Q,y.info=_e}W();const te=new gv(y,L);this.xr=te,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const w=oe.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=oe.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(w){w!==void 0&&(ue=w,this.setSize($,ce,!1))},this.getSize=function(w){return w.set($,ce)},this.setSize=function(w,B,K=!0){if(te.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}$=w,ce=B,t.width=Math.floor(w*ue),t.height=Math.floor(B*ue),K===!0&&(t.style.width=w+"px",t.style.height=B+"px"),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set($*ue,ce*ue).floor()},this.setDrawingBufferSize=function(w,B,K){$=w,ce=B,ue=K,t.width=Math.floor(w*K),t.height=Math.floor(B*K),this.setViewport(0,0,w,B)},this.getCurrentViewport=function(w){return w.copy(k)},this.getViewport=function(w){return w.copy(Be)},this.setViewport=function(w,B,K,J){w.isVector4?Be.set(w.x,w.y,w.z,w.w):Be.set(w,B,K,J),Q.viewport(k.copy(Be).multiplyScalar(ue).round())},this.getScissor=function(w){return w.copy(Ge)},this.setScissor=function(w,B,K,J){w.isVector4?Ge.set(w.x,w.y,w.z,w.w):Ge.set(w,B,K,J),Q.scissor(H.copy(Ge).multiplyScalar(ue).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(w){Q.setScissorTest(Me=w)},this.setOpaqueSort=function(w){fe=w},this.setTransparentSort=function(w){be=w},this.getClearColor=function(w){return w.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(w=!0,B=!0,K=!0){let J=0;if(w){let G=!1;if(M!==null){const we=M.texture.format;G=x.has(we)}if(G){const we=M.texture.type,ze=_.has(we),Oe=de.getClearColor(),Ue=de.getClearAlpha(),We=Oe.r,$e=Oe.g,Xe=Oe.b;ze?(m[0]=We,m[1]=$e,m[2]=Xe,m[3]=Ue,L.clearBufferuiv(L.COLOR,0,m)):(f[0]=We,f[1]=$e,f[2]=Xe,f[3]=Ue,L.clearBufferiv(L.COLOR,0,f))}else J|=L.COLOR_BUFFER_BIT}B&&(J|=L.DEPTH_BUFFER_BIT),K&&(J|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",Y,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),de.dispose(),pe.dispose(),Te.dispose(),le.dispose(),A.dispose(),g.dispose(),Z.dispose(),z.dispose(),N.dispose(),q.dispose(),te.dispose(),te.removeEventListener("sessionstart",tn),te.removeEventListener("sessionend",qt),nn.stop()};function ne(w){w.preventDefault(),bs("WebGLRenderer: Context Lost."),R=!0}function Y(){bs("WebGLRenderer: Context Restored."),R=!1;const w=_e.autoReset,B=re.enabled,K=re.autoUpdate,J=re.needsUpdate,G=re.type;W(),_e.autoReset=w,re.enabled=B,re.autoUpdate=K,re.needsUpdate=J,re.type=G}function ye(w){wt("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Se(w){const B=w.target;B.removeEventListener("dispose",Se),Ne(B)}function Ne(w){je(w),le.remove(w)}function je(w){const B=le.get(w).programs;B!==void 0&&(B.forEach(function(K){q.releaseProgram(K)}),w.isShaderMaterial&&q.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,K,J,G,we){B===null&&(B=Ye);const ze=G.isMesh&&G.matrixWorld.determinant()<0,Oe=vi(w,B,K,J,G);Q.setMaterial(J,ze);let Ue=K.index,We=1;if(J.wireframe===!0){if(Ue=X.getWireframeAttribute(K),Ue===void 0)return;We=2}const $e=K.drawRange,Xe=K.attributes.position;let Je=$e.start*We,rt=($e.start+$e.count)*We;we!==null&&(Je=Math.max(Je,we.start*We),rt=Math.min(rt,(we.start+we.count)*We)),Ue!==null?(Je=Math.max(Je,0),rt=Math.min(rt,Ue.count)):Xe!=null&&(Je=Math.max(Je,0),rt=Math.min(rt,Xe.count));const lt=rt-Je;if(lt<0||lt===1/0)return;z.setup(G,J,Oe,K,Ue);let gt,st=Ie;if(Ue!==null&&(gt=U.get(Ue),st=xe,st.setIndex(gt)),G.isMesh)J.wireframe===!0?(Q.setLineWidth(J.wireframeLinewidth*Ve()),st.setMode(L.LINES)):st.setMode(L.TRIANGLES);else if(G.isLine){let qe=J.linewidth;qe===void 0&&(qe=1),Q.setLineWidth(qe*Ve()),G.isLineSegments?st.setMode(L.LINES):G.isLineLoop?st.setMode(L.LINE_LOOP):st.setMode(L.LINE_STRIP)}else G.isPoints?st.setMode(L.POINTS):G.isSprite&&st.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)pa("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(oe.get("WEBGL_multi_draw"))st.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const qe=G._multiDrawStarts,dt=G._multiDrawCounts,tt=G._multiDrawCount,Gt=Ue?U.get(Ue).bytesPerElement:1,Bn=le.get(J).currentProgram.getUniforms();for(let an=0;an<tt;an++)Bn.setValue(L,"_gl_DrawID",an),st.render(qe[an]/Gt,dt[an])}else if(G.isInstancedMesh)st.renderInstances(Je,lt,G.count);else if(K.isInstancedBufferGeometry){const qe=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,dt=Math.min(K.instanceCount,qe);st.renderInstances(Je,lt,dt)}else st.render(Je,lt)};function pt(w,B,K){w.transparent===!0&&w.side===En&&w.forceSinglePass===!1?(w.side=cn,w.needsUpdate=!0,jt(w,B,K),w.side=hi,w.needsUpdate=!0,jt(w,B,K),w.side=En):jt(w,B,K)}this.compile=function(w,B,K=null){K===null&&(K=w),S=Te.get(K),S.init(B),T.push(S),K.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),w!==K&&w.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(S.pushLight(G),G.castShadow&&S.pushShadow(G))}),S.setupLights();const J=new Set;return w.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const we=G.material;if(we)if(Array.isArray(we))for(let ze=0;ze<we.length;ze++){const Oe=we[ze];pt(Oe,K,G),J.add(Oe)}else pt(we,K,G),J.add(we)}),S=T.pop(),J},this.compileAsync=function(w,B,K=null){const J=this.compile(w,B,K);return new Promise(G=>{function we(){if(J.forEach(function(ze){le.get(ze).currentProgram.isReady()&&J.delete(ze)}),J.size===0){G(w);return}setTimeout(we,10)}oe.get("KHR_parallel_shader_compile")!==null?we():setTimeout(we,10)})};let St=null;function Ae(w){St&&St(w)}function tn(){nn.stop()}function qt(){nn.start()}const nn=new yd;nn.setAnimationLoop(Ae),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(w){St=w,te.setAnimationLoop(w),w===null?nn.stop():nn.start()},te.addEventListener("sessionstart",tn),te.addEventListener("sessionend",qt),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){wt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),te.enabled===!0&&te.isPresenting===!0&&(te.cameraAutoUpdate===!0&&te.updateCamera(B),B=te.getCamera()),w.isScene===!0&&w.onBeforeRender(y,w,B,M),S=Te.get(w,T.length),S.init(B),T.push(S),Re.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),V.setFromProjectionMatrix(Re,Wn,B.reversedDepth),me=this.localClippingEnabled,ee=v.init(this.clippingPlanes,me),C=pe.get(w,E.length),C.init(),E.push(C),te.enabled===!0&&te.isPresenting===!0){const we=y.xr.getDepthSensingMesh();we!==null&&it(we,B,-1/0,y.sortObjects)}it(w,B,0,y.sortObjects),C.finish(),y.sortObjects===!0&&C.sort(fe,be),ke=te.enabled===!1||te.isPresenting===!1||te.hasDepthSensing()===!1,ke&&de.addToRenderList(C,w),this.info.render.frame++,ee===!0&&v.beginShadows();const K=S.state.shadowsArray;re.render(K,w,B),ee===!0&&v.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=C.opaque,G=C.transmissive;if(S.setupLights(),B.isArrayCamera){const we=B.cameras;if(G.length>0)for(let ze=0,Oe=we.length;ze<Oe;ze++){const Ue=we[ze];gi(J,G,w,Ue)}ke&&de.render(w);for(let ze=0,Oe=we.length;ze<Oe;ze++){const Ue=we[ze];$n(C,w,Ue,Ue.viewport)}}else G.length>0&&gi(J,G,w,B),ke&&de.render(w),$n(C,w,B);M!==null&&b===0&&(ge.updateMultisampleRenderTarget(M),ge.updateRenderTargetMipmap(M)),w.isScene===!0&&w.onAfterRender(y,w,B),z.resetDefaultState(),P=-1,I=null,T.pop(),T.length>0?(S=T[T.length-1],ee===!0&&v.setGlobalState(y.clippingPlanes,S.state.camera)):S=null,E.pop(),E.length>0?C=E[E.length-1]:C=null};function it(w,B,K,J){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)K=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLight)S.pushLight(w),w.castShadow&&S.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||V.intersectsSprite(w)){J&&ae.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Re);const ze=Z.update(w),Oe=w.material;Oe.visible&&C.push(w,ze,Oe,K,ae.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||V.intersectsObject(w))){const ze=Z.update(w),Oe=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ae.copy(w.boundingSphere.center)):(ze.boundingSphere===null&&ze.computeBoundingSphere(),ae.copy(ze.boundingSphere.center)),ae.applyMatrix4(w.matrixWorld).applyMatrix4(Re)),Array.isArray(Oe)){const Ue=ze.groups;for(let We=0,$e=Ue.length;We<$e;We++){const Xe=Ue[We],Je=Oe[Xe.materialIndex];Je&&Je.visible&&C.push(w,ze,Je,K,ae.z,Xe)}}else Oe.visible&&C.push(w,ze,Oe,K,ae.z,null)}}const we=w.children;for(let ze=0,Oe=we.length;ze<Oe;ze++)it(we[ze],B,K,J)}function $n(w,B,K,J){const{opaque:G,transmissive:we,transparent:ze}=w;S.setupLightsView(K),ee===!0&&v.setGlobalState(y.clippingPlanes,K),J&&Q.viewport(k.copy(J)),G.length>0&&On(G,B,K),we.length>0&&On(we,B,K),ze.length>0&&On(ze,B,K),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function gi(w,B,K,J){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[J.id]===void 0&&(S.state.transmissionRenderTarget[J.id]=new Ki(1,1,{generateMipmaps:!0,type:oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float")?Ir:fi,minFilter:Hi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const we=S.state.transmissionRenderTarget[J.id],ze=J.viewport||k;we.setSize(ze.z*y.transmissionResolutionScale,ze.w*y.transmissionResolutionScale);const Oe=y.getRenderTarget(),Ue=y.getActiveCubeFace(),We=y.getActiveMipmapLevel();y.setRenderTarget(we),y.getClearColor(O),se=y.getClearAlpha(),se<1&&y.setClearColor(16777215,.5),y.clear(),ke&&de.render(K);const $e=y.toneMapping;y.toneMapping=Pi;const Xe=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),S.setupLightsView(J),ee===!0&&v.setGlobalState(y.clippingPlanes,J),On(w,K,J),ge.updateMultisampleRenderTarget(we),ge.updateRenderTargetMipmap(we),oe.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let rt=0,lt=B.length;rt<lt;rt++){const gt=B[rt],{object:st,geometry:qe,material:dt,group:tt}=gt;if(dt.side===En&&st.layers.test(J.layers)){const Gt=dt.side;dt.side=cn,dt.needsUpdate=!0,Mn(st,K,J,qe,dt,tt),dt.side=Gt,dt.needsUpdate=!0,Je=!0}}Je===!0&&(ge.updateMultisampleRenderTarget(we),ge.updateRenderTargetMipmap(we))}y.setRenderTarget(Oe,Ue,We),y.setClearColor(O,se),Xe!==void 0&&(J.viewport=Xe),y.toneMapping=$e}function On(w,B,K){const J=B.isScene===!0?B.overrideMaterial:null;for(let G=0,we=w.length;G<we;G++){const ze=w[G],{object:Oe,geometry:Ue,group:We}=ze;let $e=ze.material;$e.allowOverride===!0&&J!==null&&($e=J),Oe.layers.test(K.layers)&&Mn(Oe,B,K,Ue,$e,We)}}function Mn(w,B,K,J,G,we){w.onBeforeRender(y,B,K,J,G,we),w.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),G.onBeforeRender(y,B,K,J,w,we),G.transparent===!0&&G.side===En&&G.forceSinglePass===!1?(G.side=cn,G.needsUpdate=!0,y.renderBufferDirect(K,B,J,G,w,we),G.side=hi,G.needsUpdate=!0,y.renderBufferDirect(K,B,J,G,w,we),G.side=En):y.renderBufferDirect(K,B,J,G,w,we),w.onAfterRender(y,B,K,J,G,we)}function jt(w,B,K){B.isScene!==!0&&(B=Ye);const J=le.get(w),G=S.state.lights,we=S.state.shadowsArray,ze=G.state.version,Oe=q.getParameters(w,G.state,we,B,K),Ue=q.getProgramCacheKey(Oe);let We=J.programs;J.environment=w.isMeshStandardMaterial?B.environment:null,J.fog=B.fog,J.envMap=(w.isMeshStandardMaterial?g:A).get(w.envMap||J.environment),J.envMapRotation=J.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,We===void 0&&(w.addEventListener("dispose",Se),We=new Map,J.programs=We);let $e=We.get(Ue);if($e!==void 0){if(J.currentProgram===$e&&J.lightsStateVersion===ze)return rn(w,Oe),$e}else Oe.uniforms=q.getUniforms(w),w.onBeforeCompile(Oe,y),$e=q.acquireProgram(Oe,Ue),We.set(Ue,$e),J.uniforms=Oe.uniforms;const Xe=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Xe.clippingPlanes=v.uniform),rn(w,Oe),J.needsLights=kt(w),J.lightsStateVersion=ze,J.needsLights&&(Xe.ambientLightColor.value=G.state.ambient,Xe.lightProbe.value=G.state.probe,Xe.directionalLights.value=G.state.directional,Xe.directionalLightShadows.value=G.state.directionalShadow,Xe.spotLights.value=G.state.spot,Xe.spotLightShadows.value=G.state.spotShadow,Xe.rectAreaLights.value=G.state.rectArea,Xe.ltc_1.value=G.state.rectAreaLTC1,Xe.ltc_2.value=G.state.rectAreaLTC2,Xe.pointLights.value=G.state.point,Xe.pointLightShadows.value=G.state.pointShadow,Xe.hemisphereLights.value=G.state.hemi,Xe.directionalShadowMap.value=G.state.directionalShadowMap,Xe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Xe.spotShadowMap.value=G.state.spotShadowMap,Xe.spotLightMatrix.value=G.state.spotLightMatrix,Xe.spotLightMap.value=G.state.spotLightMap,Xe.pointShadowMap.value=G.state.pointShadowMap,Xe.pointShadowMatrix.value=G.state.pointShadowMatrix),J.currentProgram=$e,J.uniformsList=null,$e}function At(w){if(w.uniformsList===null){const B=w.currentProgram.getUniforms();w.uniformsList=vs.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function rn(w,B){const K=le.get(w);K.outputColorSpace=B.outputColorSpace,K.batching=B.batching,K.batchingColor=B.batchingColor,K.instancing=B.instancing,K.instancingColor=B.instancingColor,K.instancingMorph=B.instancingMorph,K.skinning=B.skinning,K.morphTargets=B.morphTargets,K.morphNormals=B.morphNormals,K.morphColors=B.morphColors,K.morphTargetsCount=B.morphTargetsCount,K.numClippingPlanes=B.numClippingPlanes,K.numIntersection=B.numClipIntersection,K.vertexAlphas=B.vertexAlphas,K.vertexTangents=B.vertexTangents,K.toneMapping=B.toneMapping}function vi(w,B,K,J,G){B.isScene!==!0&&(B=Ye),ge.resetTextureUnits();const we=B.fog,ze=J.isMeshStandardMaterial?B.environment:null,Oe=M===null?y.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Pr,Ue=(J.isMeshStandardMaterial?g:A).get(J.envMap||ze),We=J.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,$e=!!K.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Xe=!!K.morphAttributes.position,Je=!!K.morphAttributes.normal,rt=!!K.morphAttributes.color;let lt=Pi;J.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(lt=y.toneMapping);const gt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,st=gt!==void 0?gt.length:0,qe=le.get(J),dt=S.state.lights;if(ee===!0&&(me===!0||w!==I)){const Ht=w===I&&J.id===P;v.setState(J,w,Ht)}let tt=!1;J.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==dt.state.version||qe.outputColorSpace!==Oe||G.isBatchedMesh&&qe.batching===!1||!G.isBatchedMesh&&qe.batching===!0||G.isBatchedMesh&&qe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&qe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&qe.instancing===!1||!G.isInstancedMesh&&qe.instancing===!0||G.isSkinnedMesh&&qe.skinning===!1||!G.isSkinnedMesh&&qe.skinning===!0||G.isInstancedMesh&&qe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&qe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&qe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&qe.instancingMorph===!1&&G.morphTexture!==null||qe.envMap!==Ue||J.fog===!0&&qe.fog!==we||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==v.numPlanes||qe.numIntersection!==v.numIntersection)||qe.vertexAlphas!==We||qe.vertexTangents!==$e||qe.morphTargets!==Xe||qe.morphNormals!==Je||qe.morphColors!==rt||qe.toneMapping!==lt||qe.morphTargetsCount!==st)&&(tt=!0):(tt=!0,qe.__version=J.version);let Gt=qe.currentProgram;tt===!0&&(Gt=jt(J,B,G));let Bn=!1,an=!1,Li=!1;const vt=Gt.getUniforms(),$t=qe.uniforms;if(Q.useProgram(Gt.program)&&(Bn=!0,an=!0,Li=!0),J.id!==P&&(P=J.id,an=!0),Bn||I!==w){Q.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),vt.setValue(L,"projectionMatrix",w.projectionMatrix),vt.setValue(L,"viewMatrix",w.matrixWorldInverse);const Yt=vt.map.cameraPosition;Yt!==void 0&&Yt.setValue(L,ve.setFromMatrixPosition(w.matrixWorld)),he.logarithmicDepthBuffer&&vt.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&vt.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),I!==w&&(I=w,an=!0,Li=!0)}if(G.isSkinnedMesh){vt.setOptional(L,G,"bindMatrix"),vt.setOptional(L,G,"bindMatrixInverse");const Ht=G.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),vt.setValue(L,"boneTexture",Ht.boneTexture,ge))}G.isBatchedMesh&&(vt.setOptional(L,G,"batchingTexture"),vt.setValue(L,"batchingTexture",G._matricesTexture,ge),vt.setOptional(L,G,"batchingIdTexture"),vt.setValue(L,"batchingIdTexture",G._indirectTexture,ge),vt.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&vt.setValue(L,"batchingColorTexture",G._colorsTexture,ge));const un=K.morphAttributes;if((un.position!==void 0||un.normal!==void 0||un.color!==void 0)&&Fe.update(G,K,Gt),(an||qe.receiveShadow!==G.receiveShadow)&&(qe.receiveShadow=G.receiveShadow,vt.setValue(L,"receiveShadow",G.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&($t.envMap.value=Ue,$t.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&B.environment!==null&&($t.envMapIntensity.value=B.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=bv()),an&&(vt.setValue(L,"toneMappingExposure",y.toneMappingExposure),qe.needsLights&&_i($t,Li),we&&J.fog===!0&&Ee.refreshFogUniforms($t,we),Ee.refreshMaterialUniforms($t,J,ue,ce,S.state.transmissionRenderTarget[w.id]),vs.upload(L,At(qe),$t,ge)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(vs.upload(L,At(qe),$t,ge),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&vt.setValue(L,"center",G.center),vt.setValue(L,"modelViewMatrix",G.modelViewMatrix),vt.setValue(L,"normalMatrix",G.normalMatrix),vt.setValue(L,"modelMatrix",G.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const Ht=J.uniformsGroups;for(let Yt=0,Or=Ht.length;Yt<Or;Yt++){const Zn=Ht[Yt];N.update(Zn,Gt),N.bind(Zn,Gt)}}return Gt}function _i(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function kt(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(w,B,K){const J=le.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),le.get(w.texture).__webglTexture=B,le.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:K,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,B){const K=le.get(w);K.__webglFramebuffer=B,K.__useDefaultFramebuffer=B===void 0};const Ot=L.createFramebuffer();this.setRenderTarget=function(w,B=0,K=0){M=w,D=B,b=K;let J=!0,G=null,we=!1,ze=!1;if(w){const Ue=le.get(w);if(Ue.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(L.FRAMEBUFFER,null),J=!1;else if(Ue.__webglFramebuffer===void 0)ge.setupRenderTarget(w);else if(Ue.__hasExternalTextures)ge.rebindTextures(w,le.get(w.texture).__webglTexture,le.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Xe=w.depthTexture;if(Ue.__boundDepthTexture!==Xe){if(Xe!==null&&le.has(Xe)&&(w.width!==Xe.image.width||w.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ge.setupDepthRenderbuffer(w)}}const We=w.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(ze=!0);const $e=le.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray($e[B])?G=$e[B][K]:G=$e[B],we=!0):w.samples>0&&ge.useMultisampledRTT(w)===!1?G=le.get(w).__webglMultisampledFramebuffer:Array.isArray($e)?G=$e[K]:G=$e,k.copy(w.viewport),H.copy(w.scissor),j=w.scissorTest}else k.copy(Be).multiplyScalar(ue).floor(),H.copy(Ge).multiplyScalar(ue).floor(),j=Me;if(K!==0&&(G=Ot),Q.bindFramebuffer(L.FRAMEBUFFER,G)&&J&&Q.drawBuffers(w,G),Q.viewport(k),Q.scissor(H),Q.setScissorTest(j),we){const Ue=le.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ue.__webglTexture,K)}else if(ze){const Ue=B;for(let We=0;We<w.textures.length;We++){const $e=le.get(w.textures[We]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+We,$e.__webglTexture,K,Ue)}}else if(w!==null&&K!==0){const Ue=le.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ue.__webglTexture,K)}P=-1},this.readRenderTargetPixels=function(w,B,K,J,G,we,ze,Oe=0){if(!(w&&w.isWebGLRenderTarget)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=le.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ze!==void 0&&(Ue=Ue[ze]),Ue){Q.bindFramebuffer(L.FRAMEBUFFER,Ue);try{const We=w.textures[Oe],$e=We.format,Xe=We.type;if(!he.textureFormatReadable($e)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!he.textureTypeReadable(Xe)){wt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-J&&K>=0&&K<=w.height-G&&(w.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Oe),L.readPixels(B,K,J,G,Le.convert($e),Le.convert(Xe),we))}finally{const We=M!==null?le.get(M).__webglFramebuffer:null;Q.bindFramebuffer(L.FRAMEBUFFER,We)}}},this.readRenderTargetPixelsAsync=async function(w,B,K,J,G,we,ze,Oe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=le.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ze!==void 0&&(Ue=Ue[ze]),Ue)if(B>=0&&B<=w.width-J&&K>=0&&K<=w.height-G){Q.bindFramebuffer(L.FRAMEBUFFER,Ue);const We=w.textures[Oe],$e=We.format,Xe=We.type;if(!he.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!he.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Je),L.bufferData(L.PIXEL_PACK_BUFFER,we.byteLength,L.STREAM_READ),w.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Oe),L.readPixels(B,K,J,G,Le.convert($e),Le.convert(Xe),0);const rt=M!==null?le.get(M).__webglFramebuffer:null;Q.bindFramebuffer(L.FRAMEBUFFER,rt);const lt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Qh(L,lt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Je),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,we),L.deleteBuffer(Je),L.deleteSync(lt),we}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,B=null,K=0){const J=Math.pow(2,-K),G=Math.floor(w.image.width*J),we=Math.floor(w.image.height*J),ze=B!==null?B.x:0,Oe=B!==null?B.y:0;ge.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,K,0,0,ze,Oe,G,we),Q.unbindTexture()};const _t=L.createFramebuffer(),Yn=L.createFramebuffer();this.copyTextureToTexture=function(w,B,K=null,J=null,G=0,we=null){we===null&&(G!==0?(pa("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),we=G,G=0):we=0);let ze,Oe,Ue,We,$e,Xe,Je,rt,lt;const gt=w.isCompressedTexture?w.mipmaps[we]:w.image;if(K!==null)ze=K.max.x-K.min.x,Oe=K.max.y-K.min.y,Ue=K.isBox3?K.max.z-K.min.z:1,We=K.min.x,$e=K.min.y,Xe=K.isBox3?K.min.z:0;else{const un=Math.pow(2,-G);ze=Math.floor(gt.width*un),Oe=Math.floor(gt.height*un),w.isDataArrayTexture?Ue=gt.depth:w.isData3DTexture?Ue=Math.floor(gt.depth*un):Ue=1,We=0,$e=0,Xe=0}J!==null?(Je=J.x,rt=J.y,lt=J.z):(Je=0,rt=0,lt=0);const st=Le.convert(B.format),qe=Le.convert(B.type);let dt;B.isData3DTexture?(ge.setTexture3D(B,0),dt=L.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(ge.setTexture2DArray(B,0),dt=L.TEXTURE_2D_ARRAY):(ge.setTexture2D(B,0),dt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,B.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,B.unpackAlignment);const tt=L.getParameter(L.UNPACK_ROW_LENGTH),Gt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Bn=L.getParameter(L.UNPACK_SKIP_PIXELS),an=L.getParameter(L.UNPACK_SKIP_ROWS),Li=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,gt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,gt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,We),L.pixelStorei(L.UNPACK_SKIP_ROWS,$e),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Xe);const vt=w.isDataArrayTexture||w.isData3DTexture,$t=B.isDataArrayTexture||B.isData3DTexture;if(w.isDepthTexture){const un=le.get(w),Ht=le.get(B),Yt=le.get(un.__renderTarget),Or=le.get(Ht.__renderTarget);Q.bindFramebuffer(L.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,Or.__webglFramebuffer);for(let Zn=0;Zn<Ue;Zn++)vt&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,le.get(w).__webglTexture,G,Xe+Zn),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,le.get(B).__webglTexture,we,lt+Zn)),L.blitFramebuffer(We,$e,ze,Oe,Je,rt,ze,Oe,L.DEPTH_BUFFER_BIT,L.NEAREST);Q.bindFramebuffer(L.READ_FRAMEBUFFER,null),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(G!==0||w.isRenderTargetTexture||le.has(w)){const un=le.get(w),Ht=le.get(B);Q.bindFramebuffer(L.READ_FRAMEBUFFER,_t),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,Yn);for(let Yt=0;Yt<Ue;Yt++)vt?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,un.__webglTexture,G,Xe+Yt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,un.__webglTexture,G),$t?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ht.__webglTexture,we,lt+Yt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ht.__webglTexture,we),G!==0?L.blitFramebuffer(We,$e,ze,Oe,Je,rt,ze,Oe,L.COLOR_BUFFER_BIT,L.NEAREST):$t?L.copyTexSubImage3D(dt,we,Je,rt,lt+Yt,We,$e,ze,Oe):L.copyTexSubImage2D(dt,we,Je,rt,We,$e,ze,Oe);Q.bindFramebuffer(L.READ_FRAMEBUFFER,null),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else $t?w.isDataTexture||w.isData3DTexture?L.texSubImage3D(dt,we,Je,rt,lt,ze,Oe,Ue,st,qe,gt.data):B.isCompressedArrayTexture?L.compressedTexSubImage3D(dt,we,Je,rt,lt,ze,Oe,Ue,st,gt.data):L.texSubImage3D(dt,we,Je,rt,lt,ze,Oe,Ue,st,qe,gt):w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,we,Je,rt,ze,Oe,st,qe,gt.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,we,Je,rt,gt.width,gt.height,st,gt.data):L.texSubImage2D(L.TEXTURE_2D,we,Je,rt,ze,Oe,st,qe,gt);L.pixelStorei(L.UNPACK_ROW_LENGTH,tt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Gt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Bn),L.pixelStorei(L.UNPACK_SKIP_ROWS,an),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Li),we===0&&B.generateMipmaps&&L.generateMipmap(dt),Q.unbindTexture()},this.initRenderTarget=function(w){le.get(w).__webglFramebuffer===void 0&&ge.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?ge.setTextureCube(w,0):w.isData3DTexture?ge.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?ge.setTexture2DArray(w,0):ge.setTexture2D(w,0),Q.unbindTexture()},this.resetState=function(){D=0,b=0,M=null,Q.reset(),z.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const Jt=Math.PI/180,wv=6371,Ev=946728e6;function Ed(n){const e=(n.getTime()-Ev)/864e5,t=(357.529+.98560028*e)*Jt,i=280.459+.98564736*e,r=(i+1.915*Math.sin(t)+.02*Math.sin(2*t))*Jt,a=(23.439-36e-8*e)*Jt,s=Math.atan2(Math.cos(a)*Math.sin(r),Math.cos(r))/Jt,o=Math.asin(Math.sin(a)*Math.sin(r))/Jt;let c=(i-s)/15;c=((c+12)%24+24)%24-12;const l=n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600;return{lat:o,lng:Tv(-15*(l-12+c))}}function el(n,e,t){const i=Ed(t);return 90-Td(n,e,i.lat,i.lng)/Jt}function Tv(n){return((n+180)%360+360)%360-180}function Td(n,e,t,i){const r=(t-n)*Jt,a=(i-e)*Jt,s=Math.sin(r/2)**2+Math.cos(n*Jt)*Math.cos(t*Jt)*Math.sin(a/2)**2;return 2*Math.asin(Math.min(1,Math.sqrt(s)))}function Is(n,e,t,i){return Td(n,e,t,i)*wv}function Av(n,e,t=64){const i=Eu(n.lat,n.lng),r=Eu(e.lat,e.lng),a=Math.acos(Math.max(-1,Math.min(1,i[0]*r[0]+i[1]*r[1]+i[2]*r[2]))),s=[];for(let o=0;o<=t;o++){const c=o/t;let l;if(a<1e-6)l=i;else{const u=Math.sin(a),d=Math.sin((1-c)*a)/u,h=Math.sin(c*a)/u;l=[i[0]*d+r[0]*h,i[1]*d+r[1]*h,i[2]*d+r[2]*h]}s.push({lat:Math.asin(l[2])/Jt,lng:Math.atan2(l[1],l[0])/Jt,t:c})}return s}function Eu(n,e){const t=Math.cos(n*Jt);return[t*Math.cos(e*Jt),t*Math.sin(e*Jt),Math.sin(n*Jt)]}function Cv(n){return n<25?1e3:Math.max(0,Math.round(1e3*Math.exp(-n/1600)))}function Rv(n){return Math.round(n/850*60+30)}const Pv=new Intl.NumberFormat("pl-PL",{maximumFractionDigits:0});function Ad(n){return n<10?n.toFixed(1).replace(".",",")+" km":Pv.format(Math.round(n))+" km"}function Lv(n){const e=Math.floor(n/60),t=n%60;return e?`${e} h ${String(t).padStart(2,"0")} min`:`${t} min`}function Aa(n,e){return`${Math.abs(n).toFixed(2).replace(".",",")}° ${n>=0?"N":"S"}   ${Math.abs(e).toFixed(2).replace(".",",")}° ${e>=0?"E":"W"}`}const Tu=new Map;function Cd(n,e,t){if(e){let r=Tu.get(e);return r||Tu.set(e,r=new Intl.DateTimeFormat("pl-PL",{timeZone:e,hour:"2-digit",minute:"2-digit"})),r.format(n)}const i=new Date(n.getTime()+t/15*36e5);return`${String(i.getUTCHours()).padStart(2,"0")}:${String(i.getUTCMinutes()).padStart(2,"0")}`}function Dv(n){return n>6?`dzień, Słońce ${Math.round(n)}° nad horyzontem`:n>-.8?"wschód albo zachód Słońca":n>-6?"zmierzch cywilny":n>-18?"zmierzch, niebo jeszcze nie całkiem ciemne":"noc"}const Rd="https://tiles.maps.eox.at/wmts/1.0.0/",zv=(n,e,t)=>`${Rd}s2cloudless_3857/default/g/${n}/${t}/${e}.jpg`,Iv=(n,e,t)=>`${Rd}overlay_bright_3857/default/g/${n}/${t}/${e}.png`,Uv=14,Nv=64,Au=240,Fv=8,kv=1.0001,Ov=1.00015,Cu=85.0511,Bv=`
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`,Vv=`
  uniform sampler2D map;
  uniform vec3 sunDir;
  uniform float opacity;
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    float ndl = dot(normalize(vN), sunDir);
    float dayMix = smoothstep(-0.1, 0.16, ndl);
    // zdjęcie satelitarne ma już własne cienie — oświetlamy łagodniej niż teksturę globusu, żeby było czytelne
    vec4 t = texture2D(map, vUv);
    vec3 c = t.rgb * (0.2 + 0.78 * smoothstep(-0.05, 0.45, ndl));
    // brak danych: przezroczysty PNG albo czysta biel — wtedy widać teksturę bazową globusu
    float data = t.a * (1.0 - step(0.993, min(t.r, min(t.g, t.b))));
    gl_FragColor = vec4(c, opacity * dayMix * data);
    #include <colorspace_fragment>
  }
`,Gv=`
  uniform sampler2D map;
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    vec4 t = texture2D(map, vUv);
    gl_FragColor = vec4(t.rgb, t.a * opacity);
    #include <colorspace_fragment>
  }
`;function Hv(n,e){const t=Math.PI-2*Math.PI*n/2**e;return Math.atan(Math.sinh(t))*180/Math.PI}function Mo(n,e){return(n+180)/360*2**e}function bo(n,e){const t=Math.max(-Cu,Math.min(Cu,n))*Math.PI/180;return(1-Math.log(Math.tan(t)+1/Math.cos(t))/Math.PI)/2*2**e}function Wv(n,e,t,i,r){const a=Math.max(4,Math.min(64,Math.ceil(360/2**n/.5))),s=[],o=[],c=[],l=[];for(let d=0;d<=a;d++){const h=Hv(t+d/a,n);for(let p=0;p<=a;p++){const x=(e+p/a)/2**n*360-180,_=r(h,x,i);s.push(_.x,_.y,_.z),_.normalize(),o.push(_.x,_.y,_.z),c.push(p/a,1-d/a)}}for(let d=0;d<a;d++)for(let h=0;h<a;h++){const p=d*(a+1)+h;l.push(p,p+a+1,p+1,p+1,p+a+1,p+a+2)}const u=new bt;return u.setAttribute("position",new ct(s,3)),u.setAttribute("normal",new ct(o,3)),u.setAttribute("uv",new ct(c,2)),u.setIndex(l),u}function Xv({parent:n,sunDir:e,latLngLocal:t,onActive:i}){const r=new _n;n.add(r);const a=new Ta,s=new Map,o=[];let c=0,l=!0,u=5,d=!0,h=!1,p=0;function x(T,y,R,D){const b=`${T}/${y}/${R}/${D}`;let M=s.get(b);if(!M){const P=T==="l",I=new Qt({uniforms:P?{map:{value:null},opacity:{value:0}}:{map:{value:null},sunDir:{value:e},opacity:{value:0}},vertexShader:Bv,fragmentShader:P?Gv:Vv,transparent:!0,depthWrite:!1}),k=new Rt(Wv(y,R,D,P?Ov:kv,t),I);k.renderOrder=(P?200:100)+y,k.visible=!1,k.frustumCulled=!1,r.add(k),M={key:b,mesh:k,z:y,x:R,y:D,label:P,used:0,state:"new",fade:0},s.set(b,M)}return M}function _(T){T.state="loading",c+=1;const y=(T.label?Iv:zv)(T.z,T.x,T.y);a.load(y,R=>{if(c-=1,T.state==="gone")return R.dispose();R.colorSpace=Dt,R.anisotropy=4,T.mesh.material.uniforms.map.value=R,T.state="ready",m()},void 0,()=>{c-=1,T.state="error",m()})}function m(){for(;c<Fv&&o.length;){const T=o.shift();T.state==="new"&&_(T)}}function f(){if(s.size<=Au)return;const T=[...s.values()].filter(y=>y.used<p).sort((y,R)=>y.used-R.used);for(const y of T.slice(0,s.size-Au))y.state="gone",r.remove(y.mesh),y.mesh.geometry.dispose(),y.mesh.material.uniforms.map.value?.dispose(),y.mesh.material.dispose(),s.delete(y.key)}function C(T){T!==h&&(h=T,i?.(T))}function S(T){p+=1;const y=new Set;if(d&&T.alt<.9){const R=Math.max(.05,Math.cos(T.lat*Math.PI/180)),D=Math.tan(T.fovV*Math.PI/360),M=2*T.alt*D*6371/(T.heightPx*Math.min(2,window.devicePixelRatio||1));let P=Math.floor(Math.log2(40075*R/(256*M))+.3);P=Math.max(3,Math.min(Uv,P));const I=Math.acos(1/(1+T.alt)),H=Math.min(I,Math.atan(T.alt*D*Math.max(1,T.aspect)*1.1))*180/Math.PI,j=fe=>{const be=Math.min(180,H/R),Be=Math.floor(Mo(T.lng-be,fe)),Ge=Math.floor(Mo(T.lng+be,fe)),Me=Math.max(0,Math.floor(bo(T.lat+H,fe))),V=Math.min(2**fe-1,Math.floor(bo(T.lat-H,fe)));return{x0:Be,x1:Ge,y0:Me,y1:V,count:(Ge-Be+1)*(V-Me+1)}};let O=j(P);for(;O.count>Nv&&P>3;)O=j(--P);const se=[P,Math.max(2,P-3)],$=Mo(T.lng,P),ce=bo(T.lat,P),ue=[];for(const fe of se){const be=fe===P?O:j(fe),Be=2**fe;for(let Ge=be.y0;Ge<=be.y1;Ge++)for(let Me=be.x0;Me<=be.x1;Me++){const V=(Me%Be+Be)%Be,ee=l&&fe===P&&P>=u?["i","l"]:["i"];for(const me of ee){const Re=x(me,fe,V,Ge);Re.used=p,y.add(Re),ue.push({t:Re,d:fe===P?Math.hypot(Me+.5-$,Ge+.5-ce):-1})}}}ue.sort((fe,be)=>fe.d-be.d),o.length=0;for(const{t:fe}of ue)fe.state==="new"&&o.push(fe);m()}for(const R of s.values())y.has(R)&&R.state==="ready"?R.mesh.visible=!0:(R.mesh.visible=!1,R.fade=0,R.mesh.material.uniforms.opacity.value=0);C(y.size>0),f()}function E(T){for(const y of s.values())!y.mesh.visible||y.fade>=1||(y.fade=Math.min(1,y.fade+T*4),y.mesh.material.uniforms.opacity.value=y.fade)}return{update:S,animate:E,setLabels(T){l=T},setEnabled(T){d=T},setLabelMinZoom(T){u=T}}}const Ts=Ct.degToRad(23.4),tl=new F(0,0,1),ls=.0016,So=3.8,us=matchMedia("(prefers-reduced-motion: reduce)").matches;function Ut(n,e,t){const i=(90-n)*Math.PI/180,r=(e+180)*Math.PI/180,a=Math.sin(i);return new F(-t*a*Math.cos(r),t*Math.cos(i),t*a*Math.sin(r))}function wo(n,e,t){return Ut(n,e,t).applyAxisAngle(tl,Ts)}function Eo(n){const e=n.clone().applyAxisAngle(tl,-Ts).normalize(),t=90-Math.acos(Ct.clamp(e.y,-1,1))*180/Math.PI;let i=Math.atan2(e.z,-e.x)*180/Math.PI-180;return i<-180&&(i+=360),{lat:t,lng:i}}function Ru(n,e,t,i){const r=Math.atan2(Math.sin(e-n),Math.cos(e-n));return n+r*(1-Math.exp(-t*i))}const ds=`
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vW;
  void main() {
    vUv = uv;
    vec4 w = modelMatrix * vec4(position, 1.0);
    vW = w.xyz;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`,qv=`
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D waterMap;
  uniform sampler2D photoMap;
  uniform float photoMix;
  uniform vec3 sunDir;
  uniform float nightGain;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vW;
  void main() {
    vec3 n = normalize(vN);
    vec3 v = normalize(cameraPosition - vW);
    float ndl = dot(n, sunDir);
    float dayMix = smoothstep(-0.1, 0.16, ndl);
    vec3 day = texture2D(dayMap, vUv).rgb;
    // „Ziemia z wczoraj”: dzienne zdjęcie NASA; czarne pola (noc polarna, brak danych) zostają z tekstury bazowej
    vec3 photo = texture2D(photoMap, vUv).rgb;
    float photoLum = dot(photo, vec3(0.299, 0.587, 0.114));
    day = mix(day, photo, photoMix * smoothstep(0.004, 0.03, photoLum));
    vec3 lit = day * (0.035 + 1.18 * max(ndl, 0.0));
    vec3 night = texture2D(nightMap, vUv).rgb * nightGain;
    vec3 col = mix(night + day * 0.025, lit, dayMix);
    // pomarańczowa poświata na linii terminatora
    // (kolor jest jeszcze liniowy — po zamianie na sRGB nawet mała wartość mocno świeci)
    float dusk = 1.0 - smoothstep(0.0, 0.07, abs(ndl - 0.02));
    col += vec3(1.0, 0.4, 0.12) * dusk * 0.012 * (1.0 - dayMix * 0.5);
    // odblask słońca tylko na wodzie
    float water = texture2D(waterMap, vUv).r;
    vec3 h = normalize(sunDir + v);
    float spec = pow(max(dot(n, h), 0.0), 60.0) * water * dayMix * (1.0 - photoMix * smoothstep(0.08, 0.3, photoLum));
    col += vec3(1.0, 0.93, 0.8) * spec * 0.55;
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,jv=`
  uniform sampler2D cloudMap;
  uniform vec3 sunDir;
  uniform float opacity;
  varying vec2 vUv;
  varying vec3 vN;
  varying vec3 vW;
  void main() {
    vec3 n = normalize(vN);
    float ndl = dot(n, sunDir);
    float a = texture2D(cloudMap, vUv).r;
    float light = 0.04 + 0.96 * smoothstep(-0.12, 0.35, ndl);
    vec3 col = mix(vec3(1.0, 0.7, 0.5), vec3(1.0), smoothstep(-0.02, 0.25, ndl)) * light;
    gl_FragColor = vec4(col, a * opacity * (0.12 + 0.88 * light));
    #include <colorspace_fragment>
  }
`,$v=`
  uniform vec3 sunDir;
  uniform float power;
  uniform float strength;
  varying vec3 vN;
  varying vec3 vW;
  void main() {
    vec3 n = normalize(vN);
    vec3 v = normalize(cameraPosition - vW);
    float rim = pow(1.0 - abs(dot(n, v)), power);
    float d = dot(n, sunDir);
    float sunSide = 0.08 + 0.92 * smoothstep(-0.3, 0.4, d);
    // na nocnej stronie przygaszony granat, pomarańcz tylko wąsko przy terminatorze
    vec3 col = mix(vec3(0.95, 0.52, 0.3), vec3(0.42, 0.64, 1.0), smoothstep(-0.05, 0.3, d));
    col = mix(vec3(0.18, 0.26, 0.5), col, smoothstep(-0.35, -0.1, d));
    gl_FragColor = vec4(col, rim * strength * sunSide);
  }
`;function Yv(n,{texturesBase:e="textures/",onPlace:t,onGround:i,onTiles:r,onPick:a}){const s=new Sv({antialias:!0,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.setClearColor(329484),n.appendChild(s.domElement);const o=s.domElement,c=new Vf,l=new wn(38,1,.05,200),u=new F(1,.3,.6).normalize();let d=null;{const W=new Float32Array(5400),te=new Float32Array(1800*3);for(let Y=0;Y<1800;Y++){const ye=30+Math.random()*40,Se=Math.random()*Math.PI*2,Ne=Math.acos(2*Math.random()-1);W.set([ye*Math.sin(Ne)*Math.cos(Se),ye*Math.cos(Ne),ye*Math.sin(Ne)*Math.sin(Se)],Y*3);const je=Math.random(),pt=.55+Math.random()*.45;te.set([pt,pt*(.9+je*.08),pt*(1.05-je*.2)],Y*3)}const ne=new bt;ne.setAttribute("position",new Vt(W,3)),ne.setAttribute("color",new Vt(te,3)),d=new ud(ne,new ld({size:.07,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1})),c.add(d)}const h=new _n;h.rotation.z=Ts,c.add(h);const p=new Ta,x=new Xc(new Uint8Array([0,0,0,255]),1,1);x.needsUpdate=!0;const _=s.capabilities.getMaxAnisotropy(),m=s.capabilities.maxTextureSize;let f=4;const C=[],S=(N,W)=>{const te=p.load(e+N,()=>{f-=1,f===0&&C.splice(0).forEach(ne=>ne())});return W&&(te.colorSpace=Dt),te.anisotropy=Math.min(8,_),te},T=Math.max(screen.width,screen.height)*(window.devicePixelRatio||1)>2200&&!matchMedia("(pointer: coarse)").matches&&m>=4096?"":"-2k",y=new Qt({uniforms:{dayMap:{value:S(`earth-day${T}.webp`,!0)},nightMap:{value:S(`earth-night${T}.webp`,!0)},waterMap:{value:S("earth-water.webp",!1)},sunDir:{value:u},nightGain:{value:1.35},photoMap:{value:x},photoMix:{value:0}},vertexShader:ds,fragmentShader:qv}),R=new Rt(new ai(1,128,96),y);h.add(R);const D=new Qt({uniforms:{cloudMap:{value:S("earth-clouds.webp",!1)},sunDir:{value:u},opacity:{value:.62}},vertexShader:ds,fragmentShader:jv,transparent:!0,depthWrite:!1}),b=new Rt(new ai(1.008,96,72),D);b.renderOrder=300,h.add(b);const M=Xv({parent:h,sunDir:u,latLngLocal:Ut,onActive:r}),P=new Qt({uniforms:{map:{value:x},tint:{value:new nt(1,1,1)},useTint:{value:0},opacity:{value:.9}},vertexShader:ds,fragmentShader:`
      uniform sampler2D map;
      uniform vec3 tint;
      uniform float useTint;
      uniform float opacity;
      varying vec2 vUv;
      void main() {
        vec4 t = texture2D(map, vUv);
        gl_FragColor = vec4(mix(t.rgb, tint, useTint), t.a * opacity);
        #include <colorspace_fragment>
      }
    `,transparent:!0,depthWrite:!1}),I=new Rt(new ai(1.0015,128,96),P);I.renderOrder=320,I.visible=!1,h.add(I);const k=(N,W,te,ne)=>new Rt(new ai(N,64,48),new Qt({uniforms:{sunDir:{value:u},power:{value:te},strength:{value:ne}},vertexShader:ds,fragmentShader:$v,transparent:!0,depthWrite:!1,side:W,blending:Ci}));c.add(k(1.075,cn,2.4,.95),k(1.012,hi,3.2,.35));const H=[],j=[],O=new _n;O.rotation.z=Ts,c.add(O);const se=new Map,$=new ai(.011,16,12),ce=new Kc(.02,.027,40),ue=new ai(.045,8,6),fe=new $c(.0022,6e-4,.16,8);function be(N,W=16766090){const te=Ut(N.lat,N.lng,1.0003),ne=new _n;ne.position.copy(te),ne.quaternion.setFromUnitVectors(tl,te.clone().normalize());const Y=new Rt($,new si({color:W})),ye=new Rt(ce,new si({color:W,transparent:!0,opacity:.5,side:En,depthWrite:!1,blending:Ci}));ye.position.z=.002;const Se=new Rt(ue,new si({visible:!1}));Se.userData.placeId=N.id;const Ne=new Rt(fe,new si({color:16771e3,transparent:!0,opacity:.85,depthWrite:!1,blending:Ci}));return Ne.rotation.x=Math.PI/2,Ne.position.z=.08,Ne.visible=!1,ne.add(Y,ye,Se,Ne),{group:ne,core:Y,ring:ye,beam:Ne,place:N,color:W}}const Be=new Map;function Ge(N,W,te=9425919){const ne=Be.get(N);if(ne&&(O.remove(ne.group),Be.delete(N)),!W)return;const Y=be({id:null,...W},te);Y.beam.visible=!0,Y.beam.material=Y.beam.material.clone(),Y.beam.material.color.set(te),Y.ring.material.opacity=.9,O.add(Y.group),Be.set(N,Y)}let Me=null;function V(N,W){if(Me&&(O.remove(Me),Me.geometry.dispose(),Me=null),!N||!W)return;const te=Av(N,W,96),Y=.02+Math.acos(Ct.clamp(Ut(N.lat,N.lng,1).dot(Ut(W.lat,W.lng,1)),-1,1))*.09,ye=new pd(te.map(Se=>Ut(Se.lat,Se.lng,1.0006+Math.sin(Se.t*Math.PI)*Y)));Me=new Rt(new Jc(ye,160,.0028,6,!1),new si({color:15975546,transparent:!0,opacity:.95,blending:Ci,depthWrite:!1})),Me.renderOrder=2,O.add(Me)}let ee=null;function me(N){for(const W of se.values())O.remove(W.group);se.clear();for(const W of N){const te=be(W,W.cat==="own"?10477760:16766090);O.add(te.group),se.set(W.id,te)}Re()}function Re(){for(const N of se.values()){const W=N.place.id===ee;N.core.material.color.set(W?16775142:N.color),N.ring.material.opacity=W?.95:.45,N.beam.visible=W}}const ve=new ss().setFromVector3(wo(30,15,3.4)),ae={theta:ve.theta,phi:ve.phi,radius:3.4,velT:0,velP:0,resumeAt:0,focus:null,spin:!us},Ye=new ss;function ke(N,W,te){const ne=new ss().setFromVector3(wo(N,W,1));ae.focus={theta:ne.theta,phi:ne.phi,radius:te??Ct.clamp(ae.radius,1.75,2.3)}}function Ve(){ae.focus=null,ae.resumeAt=performance.now()+600}function L(N,{fly:W=!0}={}){ee=N,Re();const te=se.get(N);te&&W&&ke(te.place.lat,te.place.lng,ae.radius>2.3?2.05:void 0)}const ie=new Map;let oe=null,he=null;const Q=new Np,_e=new He;o.addEventListener("pointerdown",N=>{if(!(N.pointerType==="mouse"&&N.button!==0)){if(o.setPointerCapture(N.pointerId),ie.set(N.pointerId,{x:N.clientX,y:N.clientY}),ie.size===2){const[W,te]=[...ie.values()];he={dist:Math.hypot(W.x-te.x,W.y-te.y),alt:ae.radius-1},oe=null}else oe={x:N.clientX,y:N.clientY,moved:0,t:performance.now()},ae.velT=ae.velP=0;o.classList.add("grabbing")}}),o.addEventListener("pointermove",N=>{if(!ie.has(N.pointerId))return;if(ie.set(N.pointerId,{x:N.clientX,y:N.clientY}),he&&ie.size>=2){const[Se,Ne]=[...ie.values()],je=Math.hypot(Se.x-Ne.x,Se.y-Ne.y);Z(he.alt*(he.dist/Math.max(je,1)));return}if(!oe)return;const W=N.clientX-oe.x,te=N.clientY-oe.y;if(oe.x=N.clientX,oe.y=N.clientY,oe.moved+=Math.abs(W)+Math.abs(te),oe.moved<5)return;ae.focus=null;const ne=ae.radius-1,Y=2*ne*Math.tan(Ct.degToRad(l.fov/2))/Math.max(1,n.clientHeight),ye=Math.min(.0052*((ae.radius-.85)/2),Y*Ct.lerp(1,3,Ct.smoothstep(ne,.05,1)));ae.velT=-W*ye,ae.velP=-te*ye,ae.theta+=ae.velT,ae.phi=Ct.clamp(ae.phi+ae.velP,.12,Math.PI-.12)});const le=N=>{if(!ie.has(N.pointerId)||(ie.delete(N.pointerId),ie.size<2&&(he=null),ie.size===0&&o.classList.remove("grabbing"),!oe))return;const W=oe.moved<8&&performance.now()-oe.t<600;oe=null,ae.resumeAt=performance.now()+2500,W&&N.type==="pointerup"&&ge(N)};o.addEventListener("pointerup",le),o.addEventListener("pointercancel",le),o.addEventListener("wheel",N=>{N.preventDefault(),Z((ae.radius-1)*Math.exp(N.deltaY*.0016)),ae.resumeAt=performance.now()+1500},{passive:!1});function ge(N){const W=o.getBoundingClientRect();_e.x=(N.clientX-W.left)/W.width*2-1,_e.y=-((N.clientY-W.top)/W.height)*2+1,Q.setFromCamera(_e,l);const te=Q.intersectObjects(H.filter(Ne=>Ne.visible),!0).find(Ne=>Ne.object.userData.pick);if(te){a?.(te.object.userData.pick,te.instanceId);return}const ne=[...se.values()].filter(Ne=>Ne.group.visible).map(Ne=>Ne.group),Y=Q.intersectObjects(ne,!0).find(Ne=>Ne.object.userData.placeId);if(Y){t?.(Y.object.userData.placeId);return}const ye=X(Q.ray);if(!ye)return;const Se=performance.now();if(A&&Se-A.t<380&&Math.hypot(N.clientX-A.x,N.clientY-A.y)<30){A=null;const Ne=Eo(ye);ke(Ne.lat,Ne.lng,1+Math.max(ls,(ae.radius-1)/3.5));return}A={t:Se,x:N.clientX,y:N.clientY},i?.(Eo(ye))}let A=null;const g=new F,U=new qn(new F,1);function X(N){return N.intersectSphere(U,g)?g.clone():null}function Z(N){ae.radius=1+Ct.clamp(N,ls,So),ae.focus&&(ae.focus.radius=ae.radius)}let q={real:!0};function Ee(N,W){q={real:N,date:W},Te()}const pe=new F;function Te(){if(q.real)u.copy(wo(q.lat??0,q.lng??0,1));else{pe.copy(l.position).normalize();const N=new F().crossVectors(l.up,pe).normalize();u.copy(pe).addScaledVector(N,-.55).addScaledVector(l.up,.35).normalize()}}function v(N,W){q.lat=N,q.lng=W,Te()}let re={x:0,y:0};function de(N,W){re={x:N,y:W},Fe()}function Fe(){const N=n.clientWidth,W=n.clientHeight;s.setSize(N,W,!1),l.aspect=N/W,l.fov=l.aspect<1?2*Math.atan(Math.tan(Ct.degToRad(19))/l.aspect)*180/Math.PI:38,l.setViewOffset(N,W,-re.x,re.y,N,W),l.updateProjectionMatrix()}new ResizeObserver(Fe).observe(n),Fe();const Ie=new Up;let xe=!0,Le=!1,z=0;return s.setAnimationLoop(()=>{const N=Math.min(Ie.getDelta(),.05),W=Ie.elapsedTime;xe&&!us&&(b.rotation.y+=N*.004);const te=us?14:2.8;if(!oe&&ae.focus){ae.theta=Ru(ae.theta,ae.focus.theta,te,N),ae.phi=Ct.clamp(Ru(ae.phi,ae.focus.phi,te,N),.12,Math.PI-.12);const Se=Ct.damp(Math.log(ae.radius-1),Math.log(ae.focus.radius-1),te*.9,N);ae.radius=1+Math.exp(Se),ae.velT=ae.velP=0}else if(!oe){ae.theta+=ae.velT,ae.phi=Ct.clamp(ae.phi+ae.velP,.12,Math.PI-.12);const Se=Math.exp(-N*3.1);ae.velT*=Se,ae.velP*=Se,ae.spin&&!he&&ae.radius>1.5&&performance.now()>ae.resumeAt&&Math.abs(ae.velT)<3e-4&&(ae.theta+=N*.05*((ae.radius-.9)/2))}const ne=Ct.clamp((ae.radius-1)/2.7,7e-4,1.2);for(const Se of se.values()){const Ne=Se.place.id===ee,je=1+Math.sin(W*2.3+Se.place.lat)*(Ne?.14:.05);Se.group.scale.setScalar(ne),Se.core.scale.setScalar((Ne?1.6:1)*je)}for(const Se of Be.values())Se.group.scale.setScalar(ne);Ye.set(ae.radius,ae.phi,ae.theta),l.position.setFromSpherical(Ye),l.lookAt(0,0,0);const Y=ae.radius-1,ye=Ct.clamp(Y*.25,2e-4,.05);if(Math.abs(l.near-ye)>ye*.05&&(l.near=ye,l.updateProjectionMatrix()),D.uniforms.opacity.value=.62*Ct.smoothstep(Y,.08,.5),z-=N,z<=0){z=.15;const Se=Eo(l.position);M.update({lat:Se.lat,lng:Se.lng,alt:Y,fovV:l.fov,aspect:l.aspect,heightPx:n.clientHeight})}M.animate(N);for(const Se of j)Se({dt:N,alt:Y,markerScale:ne,camera:l});q.real||Te(),s.render(c,l)}),{setPlaces:me,select:L,focus:ke,release:Ve,setPin:Ge,setArc:V,setSun:Ee,setSubsolar:v,setViewShift:de,setClouds(N){xe=N,b.visible=N&&!Le},setSpin(N){ae.spin=N&&!us},setMarkersVisible(N){for(const W of se.values())W.group.visible=N},get radius(){return ae.radius},get debug(){return{radius:ae.radius,theta:ae.theta,phi:ae.phi,velT:ae.velT,velP:ae.velP,focus:ae.focus,drag:!!oe,pinch:!!he}},zoomBy(N){const W=Ct.clamp((ae.radius-1)*N,ls,So),te=new ss().setFromVector3(l.position);ae.focus={theta:ae.focus?.theta??te.theta,phi:ae.focus?.phi??te.phi,radius:1+W}},zoomTo(N,W,te){ke(N,W,1+Ct.clamp(te,ls,So))},setTiles(N){M.setEnabled(N)},layerRoot:O,addPickable(N){H.push(N)},onFrame(N){j.push(N)},setOverlay(N,W=null){I.visible=!!N,P.uniforms.map.value=N||x,P.uniforms.useTint.value=W?1:0,W&&P.uniforms.tint.value.set(W)},hideRandomStars(){d&&(d.visible=!1)},get sunDir(){return u},setPhoto(N){y.uniforms.photoMap.value=N||x,y.uniforms.photoMix.value=N?1:0,b.visible=xe&&!N,Le=!!N},get maxTextureSize(){return m},setLabels(N){M.setLabels(N)},setLabelMinZoom(N){M.setLabelMinZoom(N)},whenReady(N){f===0?N():C.push(N)}}}var In=Math.PI,yt=In*2,ea=In/180,Zv=1440,Kv=398600.8,mn=6378.135,ci=60/Math.sqrt(mn*mn*mn/Kv),To=mn*ci/60,Jv=1/ci,Xi=.001082616,Qv=-253881e-11,e_=-165597e-11,qi=Qv/Xi,_a=2/3,t_=1440/(2*In);function n_(n,e){for(var t=[31,n%4===0?29:28,31,30,31,30,31,31,30,31,30,31],i=Math.floor(e),r=1,a=0;i>a+t[r-1]&&r<12;)a+=t[r-1],r+=1;var s=r,o=i-a,c=(e-i)*24,l=Math.floor(c);c=(c-l)*60;var u=Math.floor(c),d=(c-u)*60;return{mon:s,day:o,hr:l,minute:u,sec:d}}function Pu(n,e,t,i,r,a){var s=arguments.length>6&&arguments[6]!==void 0?arguments[6]:0;return 367*n-Math.floor(7*(n+Math.floor((e+9)/12))*.25)+Math.floor(275*e/9)+t+17210135e-1+((s/6e4+a/60+r)/60+i)/24}function nl(n,e,t,i,r,a){var s=arguments.length>6&&arguments[6]!==void 0?arguments[6]:0;if(n instanceof Date){var o=n;return Pu(o.getUTCFullYear(),o.getUTCMonth()+1,o.getUTCDate(),o.getUTCHours(),o.getUTCMinutes(),o.getUTCSeconds(),o.getUTCMilliseconds())}return Pu(n,e,t,i,r,a,s)}function Pd(n,e){var t=n.e3,i=n.ee2,r=n.peo,a=n.pgho,s=n.pho,o=n.pinco,c=n.plo,l=n.se2,u=n.se3,d=n.sgh2,h=n.sgh3,p=n.sgh4,x=n.sh2,_=n.sh3,m=n.si2,f=n.si3,C=n.sl2,S=n.sl3,E=n.sl4,T=n.t,y=n.xgh2,R=n.xgh3,D=n.xgh4,b=n.xh2,M=n.xh3,P=n.xi2,I=n.xi3,k=n.xl2,H=n.xl3,j=n.xl4,O=n.zmol,se=n.zmos,$=e.init,ce=e.opsmode,ue=e.ep,fe=e.inclp,be=e.nodep,Be=e.argpp,Ge=e.mp,Me,V,ee,me,Re,ve,ae,Ye,ke,Ve,L,ie,oe,he,Q,_e,le,ge,A,g,U,X=119459e-10,Z=.01675,q=.00015835218,Ee=.0549;U=se+X*T,$==="y"&&(U=se),g=U+2*Z*Math.sin(U),le=Math.sin(g),Ve=.5*le*le-.25,L=-.5*le*Math.cos(g);var pe=l*Ve+u*L,Te=m*Ve+f*L,v=C*Ve+S*L+E*le,re=d*Ve+h*L+p*le,de=x*Ve+_*L;U=O+q*T,$==="y"&&(U=O),g=U+2*Ee*Math.sin(U),le=Math.sin(g),Ve=.5*le*le-.25,L=-.5*le*Math.cos(g);var Fe=i*Ve+t*L,Ie=P*Ve+I*L,xe=k*Ve+H*L+j*le,Le=y*Ve+R*L+D*le,z=b*Ve+M*L;return ie=pe+Fe,Q=Te+Ie,_e=v+xe,oe=re+Le,he=de+z,$==="n"&&(ie-=r,Q-=o,_e-=c,oe-=a,he-=s,fe+=Q,ue+=ie,me=Math.sin(fe),ee=Math.cos(fe),fe>=.2?(he/=me,oe-=ee*he,Be+=oe,be+=he,Ge+=_e):(ve=Math.sin(be),Re=Math.cos(be),Me=me*ve,V=me*Re,ae=he*Re+Q*ee*ve,Ye=-he*ve+Q*ee*Re,Me+=ae,V+=Ye,be%=yt,be<0&&ce==="a"&&(be+=yt),ge=Ge+Be+ee*be,ke=_e+oe-Q*be*me,ge+=ke,A=be,be=Math.atan2(Me,V),be<0&&ce==="a"&&(be+=yt),Math.abs(A-be)>In&&(be<A?be+=yt:be-=yt),Ge+=_e,Be=ge-Ge-ee*be)),{ep:ue,inclp:fe,nodep:be,argpp:Be,mp:Ge}}function i_(n){var e=n.epoch,t=n.ep,i=n.argpp,r=n.tc,a=n.inclp,s=n.nodep,o=n.np,c,l,u,d,h,p,x,_,m,f,C,S,E,T,y,R,D,b,M,P,I,k,H,j,O,se,$,ce,ue,fe,be,Be,Ge,Me,V,ee,me,Re,ve,ae,Ye,ke,Ve,L,ie,oe,he,Q,_e,le,ge,A,g,U,X,Z,q,Ee,pe,Te,v,re,de,Fe=.01675,Ie=.0549,xe=29864797e-13,Le=47968065e-14,z=.39785416,N=.91744867,W=.1945905,te=-.98088458,ne=o,Y=t,ye=Math.sin(s),Se=Math.cos(s),Ne=Math.sin(i),je=Math.cos(i),pt=Math.sin(a),St=Math.cos(a),Ae=Y*Y,tn=1-Ae,qt=Math.sqrt(tn),nn=0,it=0,$n=0,gi=0,On=0,Mn=e+18261.5+r/1440,jt=(4.523602-.00092422029*Mn)%yt,At=Math.sin(jt),rn=Math.cos(jt),vi=.91375164-.03568096*rn,_i=Math.sqrt(1-vi*vi),kt=.089683511*At/_i,Ot=Math.sqrt(1-kt*kt),_t=5.8351514+.001944368*Mn,Yn=.39785416*At/_i,w=Ot*rn+.91744867*kt*At;Yn=Math.atan2(Yn,w),Yn+=_t-jt;var B=Math.cos(Yn),K=Math.sin(Yn);P=W,I=te,j=N,O=z,k=Se,H=ye,C=xe;for(var J=1/ne,G=0;G<2;)G+=1,c=P*k+I*j*H,u=-I*k+P*j*H,x=-P*H+I*j*k,_=I*O,m=I*H+P*j*k,f=P*O,l=St*x+pt*_,d=St*m+pt*f,h=-pt*x+St*_,p=-pt*m+St*f,S=c*je+l*Ne,E=u*je+d*Ne,T=-c*Ne+l*je,y=-u*Ne+d*je,R=h*Ne,D=p*Ne,b=h*je,M=p*je,v=12*S*S-3*T*T,re=24*S*E-6*T*y,de=12*E*E-3*y*y,A=3*(c*c+l*l)+v*Ae,g=6*(c*u+l*d)+re*Ae,U=3*(u*u+d*d)+de*Ae,X=-6*c*h+Ae*(-24*S*b-6*T*R),Z=-6*(c*p+u*h)+Ae*(-24*(E*b+S*M)+-6*(T*D+y*R)),q=-6*u*p+Ae*(-24*E*M-6*y*D),Ee=6*l*h+Ae*(24*S*R-6*T*b),pe=6*(d*h+l*p)+Ae*(24*(E*R+S*D)-6*(y*b+T*M)),Te=6*d*p+Ae*(24*E*D-6*y*M),A=A+A+tn*v,g=g+g+tn*re,U=U+U+tn*de,he=C*J,oe=-.5*he/qt,Q=he*qt,ie=-15*Y*Q,_e=S*T+E*y,le=E*T+S*y,ge=E*y-S*T,G===1&&(se=ie,$=oe,ce=he,ue=Q,fe=_e,be=le,Be=ge,Ge=A,Me=g,V=U,ee=X,me=Z,Re=q,ve=Ee,ae=pe,Ye=Te,ke=v,Ve=re,L=de,P=B,I=K,j=vi,O=_i,k=Ot*Se+kt*ye,H=ye*Ot-Se*kt,C=Le);var we=(4.7199672+(.2299715*Mn-_t))%yt,ze=(6.2565837+.017201977*Mn)%yt,Oe=2*se*be,Ue=2*se*Be,We=2*$*me,$e=2*$*(Re-ee),Xe=-2*ce*Me,Je=-2*ce*(V-Ge),rt=-2*ce*(-21-9*Ae)*Fe,lt=2*ue*Ve,gt=2*ue*(L-ke),st=-18*ue*Fe,qe=-2*$*ae,dt=-2*$*(Ye-ve),tt=2*ie*le,Gt=2*ie*ge,Bn=2*oe*Z,an=2*oe*(q-X),Li=-2*he*g,vt=-2*he*(U-A),$t=-2*he*(-21-9*Ae)*Ie,un=2*Q*re,Ht=2*Q*(de-v),Yt=-18*Q*Ie,Or=-2*oe*pe,Zn=-2*oe*(Te-Ee);return{snodm:ye,cnodm:Se,sinim:pt,cosim:St,sinomm:Ne,cosomm:je,day:Mn,e3:Gt,ee2:tt,em:Y,emsq:Ae,gam:_t,peo:nn,pgho:gi,pho:On,pinco:it,plo:$n,rtemsq:qt,se2:Oe,se3:Ue,sgh2:lt,sgh3:gt,sgh4:st,sh2:qe,sh3:dt,si2:We,si3:$e,sl2:Xe,sl3:Je,sl4:rt,s1:ie,s2:oe,s3:he,s4:Q,s5:_e,s6:le,s7:ge,ss1:se,ss2:$,ss3:ce,ss4:ue,ss5:fe,ss6:be,ss7:Be,sz1:Ge,sz2:Me,sz3:V,sz11:ee,sz12:me,sz13:Re,sz21:ve,sz22:ae,sz23:Ye,sz31:ke,sz32:Ve,sz33:L,xgh2:un,xgh3:Ht,xgh4:Yt,xh2:Or,xh3:Zn,xi2:Bn,xi3:an,xl2:Li,xl3:vt,xl4:$t,nm:ne,z1:A,z2:g,z3:U,z11:X,z12:Z,z13:q,z21:Ee,z22:pe,z23:Te,z31:v,z32:re,z33:de,zmol:we,zmos:ze}}function r_(n){var e=n.cosim,t=n.argpo,i=n.s1,r=n.s2,a=n.s3,s=n.s4,o=n.s5,c=n.sinim,l=n.ss1,u=n.ss2,d=n.ss3,h=n.ss4,p=n.ss5,x=n.sz1,_=n.sz3,m=n.sz11,f=n.sz13,C=n.sz21,S=n.sz23,E=n.sz31,T=n.sz33,y=n.t,R=n.tc,D=n.gsto,b=n.mo,M=n.mdot,P=n.no,I=n.nodeo,k=n.nodedot,H=n.xpidot,j=n.z1,O=n.z3,se=n.z11,$=n.z13,ce=n.z21,ue=n.z23,fe=n.z31,be=n.z33,Be=n.ecco,Ge=n.eccsq,Me=n.emsq,V=n.em,ee=n.argpm,me=n.inclm,Re=n.mm,ve=n.nm,ae=n.nodem,Ye=n.irez,ke=n.atime,Ve=n.d2201,L=n.d2211,ie=n.d3210,oe=n.d3222,he=n.d4410,Q=n.d4422,_e=n.d5220,le=n.d5232,ge=n.d5421,A=n.d5433,g=n.dedt,U=n.didt,X=n.dmdt,Z=n.dnodt,q=n.domdt,Ee=n.del1,pe=n.del2,Te=n.del3,v=n.xfact,re=n.xlamo,de=n.xli,Fe=n.xni,Ie,xe,Le,z,N,W,te,ne,Y,ye,Se,Ne,je,pt,St,Ae,tn,qt,nn,it,$n,gi,On,Mn,jt,At,rn,vi,_i,kt,Ot,_t,Yn=17891679e-13,w=21460748e-13,B=22123015e-14,K=17891679e-13,J=73636953e-16,G=21765803e-16,we=.0043752690880113,ze=37393792e-14,Oe=11428639e-14,Ue=.00015835218,We=119459e-10;Ye=0,ve<.0052359877&&ve>.0034906585&&(Ye=1),ve>=.00826&&ve<=.00924&&V>=.5&&(Ye=2);var $e=l*We*p,Xe=u*We*(m+f),Je=-We*d*(x+_-14-6*Me),rt=h*We*(E+T-6),lt=-We*u*(C+S);(me<.052359877||me>In-.052359877)&&(lt=0),c!==0&&(lt/=c);var gt=rt-e*lt;g=$e+i*Ue*o,U=Xe+r*Ue*(se+$),X=Je-Ue*a*(j+O-14-6*Me);var st=s*Ue*(fe+be-6),qe=-Ue*r*(ce+ue);(me<.052359877||me>In-.052359877)&&(qe=0),q=gt+st,Z=lt,c!==0&&(q-=e/c*qe,Z+=qe/c);var dt=0,tt=(D+R*we)%yt;if(V+=g*y,me+=U*y,ee+=q*y,ae+=Z*y,Re+=X*y,Ye!==0){if(kt=Math.pow(ve/ci,_a),Ye===2){Ot=e*e;var Gt=V;V=Be;var Bn=Me;Me=Ge,_t=V*Me,pt=-.306-(V-.64)*.44,V<=.65?(St=3.616-13.247*V+16.29*Me,tn=-19.302+117.39*V-228.419*Me+156.591*_t,qt=-18.9068+109.7927*V-214.6334*Me+146.5816*_t,nn=-41.122+242.694*V-471.094*Me+313.953*_t,it=-146.407+841.88*V-1629.014*Me+1083.435*_t,$n=-532.114+3017.977*V-5740.032*Me+3708.276*_t):(St=-72.099+331.819*V-508.738*Me+266.724*_t,tn=-346.844+1582.851*V-2415.925*Me+1246.113*_t,qt=-342.585+1554.908*V-2366.899*Me+1215.972*_t,nn=-1052.797+4758.686*V-7193.992*Me+3651.957*_t,it=-3581.69+16178.11*V-24462.77*Me+12422.52*_t,V>.715?$n=-5149.66+29936.92*V-54087.36*Me+31324.56*_t:$n=1464.74-4664.75*V+3763.64*Me),V<.7?(Mn=-919.2277+4988.61*V-9064.77*Me+5542.21*_t,gi=-822.71072+4568.6173*V-8491.4146*Me+5337.524*_t,On=-853.666+4690.25*V-8624.77*Me+5341.4*_t):(Mn=-37995.78+161616.52*V-229838.2*Me+109377.94*_t,gi=-51752.104+218913.95*V-309468.16*Me+146349.42*_t,On=-40023.88+170470.89*V-242699.48*Me+115605.82*_t),jt=c*c,Ie=.75*(1+2*e+Ot),xe=1.5*jt,z=1.875*c*(1-2*e-3*Ot),N=-1.875*c*(1+2*e-3*Ot),te=35*jt*Ie,ne=39.375*jt*jt,Y=9.84375*c*(jt*(1-2*e-5*Ot)+.33333333*(-2+4*e+6*Ot)),ye=c*(4.92187512*jt*(-2-4*e+10*Ot)+6.56250012*(1+2*e-3*Ot)),Se=29.53125*c*(2-8*e+Ot*(-12+8*e+10*Ot)),Ne=29.53125*c*(-2-8*e+Ot*(12+8*e-10*Ot)),vi=ve*ve,_i=kt*kt,rn=3*vi*_i,At=rn*K,Ve=At*Ie*pt,L=At*xe*St,rn*=kt,At=rn*ze,ie=At*z*tn,oe=At*N*qt,rn*=kt,At=2*rn*J,he=At*te*nn,Q=At*ne*it,rn*=kt,At=rn*Oe,_e=At*Y*$n,le=At*ye*On,At=2*rn*G,ge=At*Se*gi,A=At*Ne*Mn,re=(b+I+I-(tt+tt))%yt,v=M+X+2*(k+Z-we)-P,V=Gt,Me=Bn}Ye===1&&(je=1+Me*(-2.5+.8125*Me),tn=1+2*Me,Ae=1+Me*(-6+6.60937*Me),Ie=.75*(1+e)*(1+e),Le=.9375*c*c*(1+3*e)-.75*(1+e),W=1+e,W*=1.875*W*W,Ee=3*ve*ve*kt*kt,pe=2*Ee*Ie*je*Yn,Te=3*Ee*W*Ae*B*kt,Ee=Ee*Le*tn*w*kt,re=(b+I+t-tt)%yt,v=M+H+X+q+Z-(P+we)),de=re,Fe=P,ke=0,ve=P+dt}return{em:V,argpm:ee,inclm:me,mm:Re,nm:ve,nodem:ae,irez:Ye,atime:ke,d2201:Ve,d2211:L,d3210:ie,d3222:oe,d4410:he,d4422:Q,d5220:_e,d5232:le,d5421:ge,d5433:A,dedt:g,didt:U,dmdt:X,dndt:dt,dnodt:Z,domdt:q,del1:Ee,del2:pe,del3:Te,xfact:v,xlamo:re,xli:de,xni:Fe}}function Lu(n){var e=(n-2451545)/36525,t=-62e-7*e*e*e+.093104*e*e+(876600*3600+8640184812866e-6)*e+67310.54841;return t=t*ea/240%yt,t<0&&(t+=yt),t}function il(n,e,t,i,r,a,s){return n instanceof Date?Lu(nl(n)):Lu(n)}function a_(n){var e=n.ecco,t=n.epoch,i=n.inclo,r=n.opsmode,a=n.no,s=e*e,o=1-s,c=Math.sqrt(o),l=Math.cos(i),u=l*l,d=Math.pow(ci/a,_a),h=.75*Xi*(3*u-1)/(c*o),p=h/(d*d),x=d*(1-p*p-p*(1/3+134*p*p/81));p=h/(x*x),a/=1+p;var _=Math.pow(ci/a,_a),m=Math.sin(i),f=_*o,C=1-5*u,S=-C-u-u,E=1/_,T=f*f,y=_*(1-e),R="n",D;if(r==="a"){var b=t-7305,M=Math.floor(b+1e-8),P=b-M,I=.017202791694070362,k=1.7321343856509375,H=5075514194322695e-30,j=I+yt;D=(k+I*M+j*P+b*b*H)%yt,D<0&&(D+=yt)}else D=il(t+24332815e-1);return{no:a,method:R,ainv:E,ao:_,con41:S,con42:C,cosio:l,cosio2:u,eccsq:s,omeosq:o,posq:T,rp:y,rteosq:c,sinio:m,gsto:D}}function s_(n){var e=n.irez,t=n.d2201,i=n.d2211,r=n.d3210,a=n.d3222,s=n.d4410,o=n.d4422,c=n.d5220,l=n.d5232,u=n.d5421,d=n.d5433,h=n.dedt,p=n.del1,x=n.del2,_=n.del3,m=n.didt,f=n.dmdt,C=n.dnodt,S=n.domdt,E=n.argpo,T=n.argpdot,y=n.t,R=n.tc,D=n.gsto,b=n.xfact,M=n.xlamo,P=n.no,I=n.atime,k=n.em,H=n.argpm,j=n.inclm,O=n.xli,se=n.mm,$=n.xni,ce=n.nodem,ue=n.nm,fe=.13130908,be=2.8843198,Be=.37448087,Ge=5.7686396,Me=.95240898,V=1.8014998,ee=1.050833,me=4.4108898,Re=.0043752690880113,ve=720,ae=-720,Ye=259200,ke,Ve,L,ie,oe,he,Q,_e,le=0,ge=0,A=(D+R*Re)%yt;if(k+=h*y,j+=m*y,H+=S*y,ce+=C*y,se+=f*y,e!==0){(I===0||y*I<=0||Math.abs(y)<Math.abs(I))&&(I=0,$=P,O=M),y>0?ke=ve:ke=ae;for(var g=381;g===381;)e!==2?(Q=p*Math.sin(O-fe)+x*Math.sin(2*(O-be))+_*Math.sin(3*(O-Be)),oe=$+b,he=p*Math.cos(O-fe)+2*x*Math.cos(2*(O-be))+3*_*Math.cos(3*(O-Be)),he*=oe):(_e=E+T*I,L=_e+_e,Ve=O+O,Q=t*Math.sin(L+O-Ge)+i*Math.sin(O-Ge)+r*Math.sin(_e+O-Me)+a*Math.sin(-_e+O-Me)+s*Math.sin(L+Ve-V)+o*Math.sin(Ve-V)+c*Math.sin(_e+O-ee)+l*Math.sin(-_e+O-ee)+u*Math.sin(_e+Ve-me)+d*Math.sin(-_e+Ve-me),oe=$+b,he=t*Math.cos(L+O-Ge)+i*Math.cos(O-Ge)+r*Math.cos(_e+O-Me)+a*Math.cos(-_e+O-Me)+c*Math.cos(_e+O-ee)+l*Math.cos(-_e+O-ee)+2*(s*Math.cos(L+Ve-V)+o*Math.cos(Ve-V)+u*Math.cos(_e+Ve-me)+d*Math.cos(-_e+Ve-me)),he*=oe),Math.abs(y-I)>=ve?g=381:(ge=y-I,g=0),g===381&&(O+=oe*ke+Q*Ye,$+=Q*ke+he*Ye,I+=ke);ue=$+Q*ge+he*ge*ge*.5,ie=O+oe*ge+Q*ge*ge*.5,e!==1?(se=ie-2*ce+2*A,le=ue-P):(se=ie-ce-H+A,le=ue-P),ue=P+le}return{atime:I,em:k,argpm:H,inclm:j,xli:O,mm:se,xni:$,nodem:ce,dndt:le,nm:ue}}var Ti;(function(n){n[n.None=0]="None",n[n.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",n[n.MeanMotionBelowZero=2]="MeanMotionBelowZero",n[n.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",n[n.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",n[n.Decayed=6]="Decayed"})(Ti||(Ti={}));function Ld(n,e){var t,i,r,a,s,o,c,l,u,d,h,p,x,_,m,f,C,S,E,T,y,R,D,b,M,P,I,k=15e-13;n.t=e,n.error=Ti.None;var H=n.mo+n.mdot*n.t,j=n.argpo+n.argpdot*n.t,O=n.nodeo+n.nodedot*n.t;u=j,y=H;var se=n.t*n.t;if(D=O+n.nodecf*se,C=1-n.cc1*n.t,S=n.bstar*n.cc4*n.t,E=n.t2cof*se,n.isimp!==1){c=n.omgcof*n.t;var $=1+n.eta*Math.cos(H);o=n.xmcof*($*$*$-n.delmo),f=c+o,y=H+f,u=j-f,p=se*n.t,x=p*n.t,C=C-n.d2*se-n.d3*p-n.d4*x,S+=n.bstar*n.cc5*(Math.sin(y)-n.sinmao),E=E+n.t3cof*p+x*(n.t4cof+n.t*n.t5cof)}R=n.no;var ce=n.ecco;if(T=n.inclo,n.method==="d"){_=n.t;var ue={irez:n.irez,d2201:n.d2201,d2211:n.d2211,d3210:n.d3210,d3222:n.d3222,d4410:n.d4410,d4422:n.d4422,d5220:n.d5220,d5232:n.d5232,d5421:n.d5421,d5433:n.d5433,dedt:n.dedt,del1:n.del1,del2:n.del2,del3:n.del3,didt:n.didt,dmdt:n.dmdt,dnodt:n.dnodt,domdt:n.domdt,argpo:n.argpo,argpdot:n.argpdot,t:n.t,tc:_,gsto:n.gsto,xfact:n.xfact,xlamo:n.xlamo,no:n.no,atime:n.atime,em:ce,argpm:u,inclm:T,xli:n.xli,mm:y,xni:n.xni,nodem:D,nm:R},fe=s_(ue);ce=fe.em,u=fe.argpm,T=fe.inclm,y=fe.mm,D=fe.nodem,R=fe.nm}if(R<=0)return n.error=Ti.MeanMotionBelowZero,null;var be=Math.pow(ci/R,_a)*C*C;if(R=ci/Math.pow(be,1.5),ce-=S,ce>=1||ce<-.001)return n.error=Ti.MeanEccentricityOutOfRange,null;ce<1e-6&&(ce=1e-6),y+=n.no*E,M=y+u+D,D%=yt,u%=yt,M%=yt,y=(M-u-D)%yt;var Be={am:be,em:ce,im:T,Om:D,om:u,mm:y,nm:R},Ge=Math.sin(T),Me=Math.cos(T),V=ce;if(b=T,d=u,I=D,P=y,a=Ge,r=Me,n.method==="d"){var ee={inclo:n.inclo,init:"n",ep:V,inclp:b,nodep:I,argpp:d,mp:P,opsmode:n.operationmode},me=Pd(n,ee);if(V=me.ep,I=me.nodep,d=me.argpp,P=me.mp,b=me.inclp,b<0&&(b=-b,I+=In,d-=In),V<0||V>1)return n.error=Ti.PerturbedEccentricityOutOfRange,null}n.method==="d"&&(a=Math.sin(b),r=Math.cos(b),n.aycof=-.5*qi*a,Math.abs(r+1)>15e-13?n.xlcof=-.25*qi*a*(3+5*r)/(1+r):n.xlcof=-.25*qi*a*(3+5*r)/k);var Re=V*Math.cos(d);f=1/(be*(1-V*V));var ve=V*Math.sin(d)+f*n.aycof,ae=P+d+I+f*n.xlcof*Re,Ye=(ae-I)%yt;l=Ye,m=9999.9;for(var ke=1;Math.abs(m)>=1e-12&&ke<=10;)i=Math.sin(l),t=Math.cos(l),m=1-t*Re-i*ve,m=(Ye-ve*t+Re*i-l)/m,Math.abs(m)>=.95&&(m>0?m=.95:m=-.95),l+=m,ke+=1;var Ve=Re*t+ve*i,L=Re*i-ve*t,ie=Re*Re+ve*ve,oe=be*(1-ie);if(oe<0)return n.error=Ti.SemiLatusRectumBelowZero,null;var he=be*(1-Ve),Q=Math.sqrt(be)*L/he,_e=Math.sqrt(oe)/he,le=Math.sqrt(1-ie);f=L/(1+le);var ge=be/he*(i-ve-Re*f),A=be/he*(t-Re+ve*f);h=Math.atan2(ge,A);var g=(A+A)*ge,U=1-2*ge*ge;f=1/oe;var X=.5*Xi*f,Z=X*f;n.method==="d"&&(s=r*r,n.con41=3*s-1,n.x1mth2=1-s,n.x7thm1=7*s-1);var q=he*(1-1.5*Z*le*n.con41)+.5*X*n.x1mth2*U;if(q<1)return n.error=Ti.Decayed,null;h-=.25*Z*n.x7thm1*g;var Ee=I+1.5*Z*r*g,pe=b+1.5*Z*r*a*U,Te=Q-R*X*n.x1mth2*g/ci,v=_e+R*X*(n.x1mth2*U+1.5*n.con41)/ci,re=Math.sin(h),de=Math.cos(h),Fe=Math.sin(Ee),Ie=Math.cos(Ee),xe=Math.sin(pe),Le=Math.cos(pe),z=-Fe*Le,N=Ie*Le,W=z*re+Ie*de,te=N*re+Fe*de,ne=xe*re,Y=z*de-Ie*re,ye=N*de-Fe*re,Se=xe*de,Ne={x:q*W*mn,y:q*te*mn,z:q*ne*mn},je={x:(Te*W+v*Y)*To,y:(Te*te+v*ye)*To,z:(Te*ne+v*Se)*To};return{position:Ne,velocity:je,meanElements:Be}}function o_(n,e){var t=e.opsmode,i=e.epoch,r=e.xbstar,a=e.xecco,s=e.xargpo,o=e.xinclo,c=e.xmo,l=e.xno,u=e.xnodeo,d,h,p,x,_,m,f,C,S,E,T,y,R,D,b,M,P,I,k,H,j,O,se,$,ce,ue,fe,be,Be,Ge,Me,V,ee,me,Re,ve,ae,Ye,ke,Ve,L,ie,oe,he,Q,_e,le,ge,A,g,U,X,Z,q,Ee,pe,Te=15e-13,v=n;v.isimp=0,v.method="n",v.aycof=0,v.con41=0,v.cc1=0,v.cc4=0,v.cc5=0,v.d2=0,v.d3=0,v.d4=0,v.delmo=0,v.eta=0,v.argpdot=0,v.omgcof=0,v.sinmao=0,v.t=0,v.t2cof=0,v.t3cof=0,v.t4cof=0,v.t5cof=0,v.x1mth2=0,v.x7thm1=0,v.mdot=0,v.nodedot=0,v.xlcof=0,v.xmcof=0,v.nodecf=0,v.irez=0,v.d2201=0,v.d2211=0,v.d3210=0,v.d3222=0,v.d4410=0,v.d4422=0,v.d5220=0,v.d5232=0,v.d5421=0,v.d5433=0,v.dedt=0,v.del1=0,v.del2=0,v.del3=0,v.didt=0,v.dmdt=0,v.dnodt=0,v.domdt=0,v.e3=0,v.ee2=0,v.peo=0,v.pgho=0,v.pho=0,v.pinco=0,v.plo=0,v.se2=0,v.se3=0,v.sgh2=0,v.sgh3=0,v.sgh4=0,v.sh2=0,v.sh3=0,v.si2=0,v.si3=0,v.sl2=0,v.sl3=0,v.sl4=0,v.gsto=0,v.xfact=0,v.xgh2=0,v.xgh3=0,v.xgh4=0,v.xh2=0,v.xh3=0,v.xi2=0,v.xi3=0,v.xl2=0,v.xl3=0,v.xl4=0,v.xlamo=0,v.zmol=0,v.zmos=0,v.atime=0,v.xli=0,v.xni=0,v.bstar=r,v.ecco=a,v.argpo=s,v.inclo=o,v.mo=c,v.no=l,v.nodeo=u,v.operationmode=t;var re=78/mn+1,de=42/mn,Fe=de*de*de*de;v.init="y",v.t=0;var Ie={ecco:v.ecco,epoch:i,inclo:v.inclo,no:v.no,method:v.method,opsmode:v.operationmode},xe=a_(Ie),Le=xe.ao,z=xe.con42,N=xe.cosio,W=xe.cosio2,te=xe.eccsq,ne=xe.omeosq,Y=xe.posq,ye=xe.rp,Se=xe.rteosq,Ne=xe.sinio;if(v.no=xe.no,v.con41=xe.con41,v.gsto=xe.gsto,v.a=Math.pow(v.no*Jv,-2/3),v.alta=v.a*(1+v.ecco)-1,v.altp=v.a*(1-v.ecco)-1,v.error=0,ne>=0||v.no>=0){if(v.isimp=0,ye<220/mn+1&&(v.isimp=1),fe=re,j=Fe,I=(ye-1)*mn,I<156){fe=I-78,I<98&&(fe=20);var je=(120-fe)/mn;j=je*je*je*je,fe=fe/mn+1}k=1/Y,_e=1/(Le-fe),v.eta=Le*v.ecco*_e,y=v.eta*v.eta,T=v.ecco*v.eta,H=Math.abs(1-y),m=j*Math.pow(_e,4),f=m/Math.pow(H,3.5),x=f*v.no*(Le*(1+1.5*y+T*(4+y))+.375*Xi*_e/H*v.con41*(8+3*y*(8+y))),v.cc1=v.bstar*x,_=0,v.ecco>1e-4&&(_=-2*m*_e*qi*v.no*Ne/v.ecco),v.x1mth2=1-W,v.cc4=2*v.no*f*Le*ne*(v.eta*(2+.5*y)+v.ecco*(.5+2*y)-Xi*_e/(Le*H)*(-3*v.con41*(1-2*T+y*(1.5-.5*T))+.75*v.x1mth2*(2*y-T*(1+y))*Math.cos(2*v.argpo))),v.cc5=2*f*Le*ne*(1+2.75*(y+T)+T*y),C=W*W,oe=1.5*Xi*k*v.no,he=.5*oe*Xi*k,Q=-.46875*e_*k*k*v.no,v.mdot=v.no+.5*oe*Se*v.con41+.0625*he*Se*(13-78*W+137*C),v.argpdot=-.5*oe*z+.0625*he*(7-114*W+395*C)+Q*(3-36*W+49*C),ge=-oe*N,v.nodedot=ge+(.5*he*(4-19*W)+2*Q*(3-7*W))*N,le=v.argpdot+v.nodedot,v.omgcof=v.bstar*_*Math.cos(v.argpo),v.xmcof=0,v.ecco>1e-4&&(v.xmcof=-_a*m*v.bstar/T),v.nodecf=3.5*ne*ge*v.cc1,v.t2cof=1.5*v.cc1,Math.abs(N+1)>15e-13?v.xlcof=-.25*qi*Ne*(3+5*N)/(1+N):v.xlcof=-.25*qi*Ne*(3+5*N)/Te,v.aycof=-.5*qi*Ne;var pt=1+v.eta*Math.cos(v.mo);if(v.delmo=pt*pt*pt,v.sinmao=Math.sin(v.mo),v.x7thm1=7*W-1,2*In/v.no>=225){v.method="d",v.isimp=1,L=0,b=v.inclo;var St={epoch:i,ep:v.ecco,argpp:v.argpo,tc:L,inclp:v.inclo,nodep:v.nodeo,np:v.no,e3:v.e3,ee2:v.ee2,peo:v.peo,pgho:v.pgho,pho:v.pho,pinco:v.pinco,plo:v.plo,se2:v.se2,se3:v.se3,sgh2:v.sgh2,sgh3:v.sgh3,sgh4:v.sgh4,sh2:v.sh2,sh3:v.sh3,si2:v.si2,si3:v.si3,sl2:v.sl2,sl3:v.sl3,sl4:v.sl4,xgh2:v.xgh2,xgh3:v.xgh3,xgh4:v.xgh4,xh2:v.xh2,xh3:v.xh3,xi2:v.xi2,xi3:v.xi3,xl2:v.xl2,xl3:v.xl3,xl4:v.xl4,zmol:v.zmol,zmos:v.zmos},Ae=i_(St);v.e3=Ae.e3,v.ee2=Ae.ee2,v.peo=Ae.peo,v.pgho=Ae.pgho,v.pho=Ae.pho,v.pinco=Ae.pinco,v.plo=Ae.plo,v.se2=Ae.se2,v.se3=Ae.se3,v.sgh2=Ae.sgh2,v.sgh3=Ae.sgh3,v.sgh4=Ae.sgh4,v.sh2=Ae.sh2,v.sh3=Ae.sh3,v.si2=Ae.si2,v.si3=Ae.si3,v.sl2=Ae.sl2,v.sl3=Ae.sl3,v.sl4=Ae.sl4,h=Ae.sinim,d=Ae.cosim,S=Ae.em,E=Ae.emsq,O=Ae.s1,se=Ae.s2,$=Ae.s3,ce=Ae.s4,ue=Ae.s5,be=Ae.ss1,Be=Ae.ss2,Ge=Ae.ss3,Me=Ae.ss4,V=Ae.ss5,ee=Ae.sz1,me=Ae.sz3,Re=Ae.sz11,ve=Ae.sz13,ae=Ae.sz21,Ye=Ae.sz23,ke=Ae.sz31,Ve=Ae.sz33,v.xgh2=Ae.xgh2,v.xgh3=Ae.xgh3,v.xgh4=Ae.xgh4,v.xh2=Ae.xh2,v.xh3=Ae.xh3,v.xi2=Ae.xi2,v.xi3=Ae.xi3,v.xl2=Ae.xl2,v.xl3=Ae.xl3,v.xl4=Ae.xl4,v.zmol=Ae.zmol,v.zmos=Ae.zmos,P=Ae.nm,A=Ae.z1,g=Ae.z3,U=Ae.z11,X=Ae.z13,Z=Ae.z21,q=Ae.z23,Ee=Ae.z31,pe=Ae.z33;var tn={inclo:b,init:v.init,ep:v.ecco,inclp:v.inclo,nodep:v.nodeo,argpp:v.argpo,mp:v.mo,opsmode:v.operationmode},qt=Pd(v,tn);v.ecco=qt.ep,v.inclo=qt.inclp,v.nodeo=qt.nodep,v.argpo=qt.argpp,v.mo=qt.mp,R=0,D=0,M=0;var nn={cosim:d,emsq:E,argpo:v.argpo,s1:O,s2:se,s3:$,s4:ce,s5:ue,sinim:h,ss1:be,ss2:Be,ss3:Ge,ss4:Me,ss5:V,sz1:ee,sz3:me,sz11:Re,sz13:ve,sz21:ae,sz23:Ye,sz31:ke,sz33:Ve,t:v.t,tc:L,gsto:v.gsto,mo:v.mo,mdot:v.mdot,no:v.no,nodeo:v.nodeo,nodedot:v.nodedot,xpidot:le,z1:A,z3:g,z11:U,z13:X,z21:Z,z23:q,z31:Ee,z33:pe,ecco:v.ecco,eccsq:te,em:S,argpm:R,inclm:b,mm:M,nm:P,nodem:D,irez:v.irez,atime:v.atime,d2201:v.d2201,d2211:v.d2211,d3210:v.d3210,d3222:v.d3222,d4410:v.d4410,d4422:v.d4422,d5220:v.d5220,d5232:v.d5232,d5421:v.d5421,d5433:v.d5433,dedt:v.dedt,didt:v.didt,dmdt:v.dmdt,dnodt:v.dnodt,domdt:v.domdt,del1:v.del1,del2:v.del2,del3:v.del3,xfact:v.xfact,xlamo:v.xlamo,xli:v.xli,xni:v.xni},it=r_(nn);v.irez=it.irez,v.atime=it.atime,v.d2201=it.d2201,v.d2211=it.d2211,v.d3210=it.d3210,v.d3222=it.d3222,v.d4410=it.d4410,v.d4422=it.d4422,v.d5220=it.d5220,v.d5232=it.d5232,v.d5421=it.d5421,v.d5433=it.d5433,v.dedt=it.dedt,v.didt=it.didt,v.dmdt=it.dmdt,v.dnodt=it.dnodt,v.domdt=it.domdt,v.del1=it.del1,v.del2=it.del2,v.del3=it.del3,v.xfact=it.xfact,v.xlamo=it.xlamo,v.xli=it.xli,v.xni=it.xni}v.isimp!==1&&(p=v.cc1*v.cc1,v.d2=4*Le*_e*p,ie=v.d2*_e*v.cc1/3,v.d3=(17*Le+fe)*ie,v.d4=.5*ie*Le*_e*(221*Le+31*fe)*v.cc1,v.t3cof=v.d2+2*p,v.t4cof=.25*(3*v.d3+v.cc1*(12*v.d2+10*p)),v.t5cof=.2*(3*v.d4+12*v.cc1*v.d3+6*v.d2*v.d2+15*p*(2*v.d2+p)))}Ld(v,0),v.init="n"}function c_(n,e){var t="i",i=0,r=n.substring(2,7),a=parseInt(n.substring(18,20),10),s=parseFloat(n.substring(20,32)),o=parseFloat(n.substring(33,43)),c=parseFloat("".concat(n.substring(44,45),".").concat(n.substring(45,50),"E").concat(n.substring(50,52))),l=parseFloat("".concat(n.substring(53,54),".").concat(n.substring(54,59),"E").concat(n.substring(59,61))),u=parseFloat(e.substring(8,16))*ea,d=parseFloat(e.substring(17,25))*ea,h=parseFloat(".".concat(e.substring(26,33).replace(/\s/g,"0"))),p=parseFloat(e.substring(34,42))*ea,x=parseFloat(e.substring(43,51))*ea,_=parseFloat(e.substring(52,63))/t_,m=a<57?a+2e3:a+1900,f=n_(m,s),C=f.mon,S=f.day,E=f.hr,T=f.minute,y=f.sec,R=nl(m,C,S,E,T,y),D={error:i,satnum:r,epochyr:a,epochdays:s,ndot:o,nddot:c,bstar:l,inclo:u,nodeo:d,ecco:h,argpo:p,mo:x,no:_,jdsatepoch:R};return o_(D,{opsmode:t,satn:D.satnum,epoch:D.jdsatepoch-24332815e-1,xbstar:D.bstar,xecco:D.ecco,xargpo:D.argpo,xinclo:D.inclo,xmo:D.mo,xno:D.no,xnodeo:D.nodeo}),D}function l_(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];var r=nl.apply(void 0,t),a=(r-n.jdsatepoch)*Zv;return Ld(n,a)}function u_(n,e){for(var t=6378.137,i=6356.7523142,r=Math.sqrt(n.x*n.x+n.y*n.y),a=(t-i)/t,s=2*a-a*a,o=Math.atan2(n.y,n.x)-e;o<-In;)o+=yt;for(;o>In;)o-=yt;for(var c=20,l=0,u=Math.atan2(n.z,Math.sqrt(n.x*n.x+n.y*n.y)),d;l++<c;)d=1/Math.sqrt(1-s*(Math.sin(u)*Math.sin(u))),u=Math.atan2(n.z+t*d*s*Math.sin(u),r);var h=r/Math.cos(u)-t*d;return{longitude:o,latitude:u,height:h}}function d_(n){for(const e of n)e.box=e.p.map(t=>{let i=180,r=-180,a=90,s=-90;for(const[o,c]of t[0])o<i&&(i=o),o>r&&(r=o),c<a&&(a=c),c>s&&(s=c);return[i,a,r,s]});return n}function Du(n,e,t){let i=!1;for(let r=0,a=n.length-1;r<n.length;a=r++){const[s,o]=n[r],[c,l]=n[a];o>t!=l>t&&e<(c-s)*(t-o)/(l-o)+s&&(i=!i)}return i}function Us(n,e,t){for(const i of n)for(let r=0;r<i.p.length;r++){const[a,s,o,c]=i.box[r];if(t<a||t>o||e<s||e>c)continue;const l=i.p[r];if(Du(l[0],t,e)&&!l.slice(1).some(u=>Du(u,t,e)))return i}return null}function h_(n,e=1){const t=[];for(const i of n)for(const r of i.p)for(const a of r)for(let s=1;s<a.length;s++){const[o,c]=a[s-1],[l,u]=a[s];if(Math.abs(l-o)>180)continue;const d=Math.max(1,Math.ceil(Math.max(Math.abs(l-o),Math.abs(u-c))/e));for(let h=0;h<d;h++){const p=h/d,x=(h+1)/d;t.push([c+(u-c)*p,o+(l-o)*p,c+(u-c)*x,o+(l-o)*x])}}return t}const f_="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",p_="https://api.wheretheiss.at/v1/satellites/25544/tles";function m_(n){return(n.features||[]).filter(e=>e.geometry&&Number.isFinite(e.properties?.mag)).map(e=>({id:e.id,mag:e.properties.mag,lng:e.geometry.coordinates[0],lat:e.geometry.coordinates[1],depth:e.geometry.coordinates[2],time:e.properties.time,place:e.properties.place||"",url:e.properties.url,tsunami:e.properties.tsunami===1})).sort((e,t)=>e.mag-t.mag)}function Dd(n,e=Date.now()){const t=Math.max(0,Math.round((e-n)/6e4));if(t<2)return"przed chwilą";if(t<60)return`${t} min temu`;const i=Math.round(t/60);if(i<24)return`${i} godz. temu`;const r=Math.round(i/24);return r===1?"wczoraj":`${r} dni temu`}function x_(n){return n>=7?"bardzo silne":n>=6?"silne":n>=5?"umiarkowane":n>=4?"lekkie":"słabe"}function zd(n){return"M "+n.toFixed(1).replace(".",",")}function g_(n,e,t,i){const r=Math.acos(6371/(6371+t))*180/Math.PI;return el(n,e,i)>-r}function v_(n=new Date){return new Date(n.getTime()-864e5).toISOString().slice(0,10)}const Id={fires:{layers:"VIIRS_SNPP_Thermal_Anomalies_375m_All,VIIRS_NOAA20_Thermal_Anomalies_375m_All",daysAgo:1,tint:null},sst:{layers:"GHRSST_L4_MUR_Sea_Surface_Temperature",daysAgo:2,tint:null},snow:{layers:"MODIS_Terra_L3_Snow_Extent_8Day,GHRSST_L4_MUR_Sea_Ice_Concentration",daysAgo:9,tint:10476799}};function __(n,e,t=new Date){const i=Id[n],r=new Date(t.getTime()-i.daysAgo*864e5).toISOString().slice(0,10);return{date:r,url:`https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=${i.layers}&CRS=EPSG:4326&BBOX=-90,-180,90,180&WIDTH=${e}&HEIGHT=${e/2}&FORMAT=image/png&TRANSPARENT=true&TIME=${r}`}}function y_(n,e){return`https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor,VIIRS_NOAA20_CorrectedReflectance_TrueColor&CRS=EPSG:4326&BBOX=-90,-180,90,180&WIDTH=${e}&HEIGHT=${e/2}&FORMAT=image/jpeg&TIME=${n}`}const M_=new F(0,0,1),zu=180/Math.PI,Iu=6371;function Uu(n,e){const t=new Float32Array(n.length*6);n.forEach(([r,a,s,o],c)=>{const l=Ut(r,a,e),u=Ut(s,o,e);t.set([l.x,l.y,l.z,u.x,u.y,u.z],c*6)});const i=new bt;return i.setAttribute("position",new Vt(t,3)),i}function Kr(n,e){const t=[];for(let i=-180;i<=180;i+=1)t.push(Ut(n,i,e));return new bt().setFromPoints(t)}function Nu(n,{size:e=30,color:t="#ece7db",weight:i=500}={}){const r=`${i} ${e}px Outfit, system-ui, sans-serif`,a=document.createElement("canvas"),s=a.getContext("2d");s.font=r;const o=Math.ceil(s.measureText(n).width)+16;a.width=o,a.height=e+16,s.font=r,s.textBaseline="middle",s.lineWidth=5,s.strokeStyle="rgba(5,7,12,0.85)",s.strokeText(n,8,a.height/2),s.fillStyle=t,s.fillText(n,8,a.height/2);const c=new qc(a);c.colorSpace=Dt,c.minFilter=vn;const l=new Wc(new Ps({map:c,transparent:!0,depthWrite:!1,depthTest:!1}));return l.userData.aspect=a.width/a.height,l.renderOrder=500,l}function b_(n){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),i=t.createRadialGradient(32,32,0,32,32,32);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.25,n),i.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=i,t.fillRect(0,0,64,64);const r=new qc(e);r.colorSpace=Dt;const a=new Wc(new Ps({map:r,transparent:!0,depthWrite:!1,blending:Ci}));return a.renderOrder=510,a}function S_(n,{dataBase:e="data/",onCountries:t,onQuakes:i,onIss:r}){const a=n.layerRoot,s={borders:!1,grid:!1,quakes:!1,iss:!1};let o=[];const c=new _n;c.visible=!1,a.add(c);const l=new Wi({color:14673650,transparent:!0,opacity:.4,depthWrite:!1}),u=[];let d=null;function h(){return d||(d=fetch(e+"countries.json").then(ie=>ie.json()).then(async ie=>{o=d_(ie);const oe=new vc(Uu(h_(o),1.0008),l);oe.renderOrder=400,c.add(oe),await document.fonts?.ready;for(const he of o){const Q=Nu(he.n,{size:he.r<=2?34:28,weight:he.r<=2?600:500});Q.position.copy(Ut(he.ly,he.lx,1.004)),Q.userData.base=Q.position.clone(),Q.userData.rank=he.r,Q.userData.pop=he.pop||0,Q.userData.normal=Q.position.clone().normalize(),c.add(Q),u.push(Q)}return C(),t?.(o),o}).catch(()=>{d=null}),d)}const p=new si({color:10477760,transparent:!0,opacity:.32,depthWrite:!1,side:En});let x=null,_=new Set,m=!0;function f(ie,oe){const he=[],Q=g=>{const U=Ut(g[1],g[0],oe);he.push(U.x,U.y,U.z)},_e=(g,U)=>[(g[0]+U[0])/2,(g[1]+U[1])/2],le=(g,U,X,Z)=>{const q=Math.max(Math.hypot(g[0]-U[0],g[1]-U[1]),Math.hypot(U[0]-X[0],U[1]-X[1]),Math.hypot(X[0]-g[0],X[1]-g[1]));if(Z<7&&q>2.5){const Ee=_e(g,U),pe=_e(U,X),Te=_e(X,g);le(g,Ee,Te,Z+1),le(Ee,U,pe,Z+1),le(Te,pe,X,Z+1),le(Ee,pe,Te,Z+1)}else Q(g),Q(U),Q(X)},ge=g=>{const U=g.map(([X,Z])=>new He(X,Z));return U.length>1&&U[0].equals(U[U.length-1])&&U.pop(),U};for(const g of ie)for(const U of g.p){const X=ge(U[0]),Z=U.slice(1).map(ge),q=X.concat(...Z);for(const[Ee,pe,Te]of Zc.triangulateShape(X,Z))le([q[Ee].x,q[Ee].y],[q[pe].x,q[pe].y],[q[Te].x,q[Te].y],0)}const A=new bt;return A.setAttribute("position",new ct(he,3)),A}function C(){x&&(a.remove(x),x.geometry.dispose(),x=null);const ie=o.filter(oe=>_.has(oe.iso));ie.length&&(x=new Rt(f(ie,1.0007),p),x.renderOrder=390,x.visible=m,a.add(x))}const S=new _n;S.visible=!1,a.add(S);{const oe=(le,ge)=>new Rp({color:le,transparent:!0,opacity:ge,dashSize:.012,gapSize:.01,depthWrite:!1}),he=(le,ge)=>{const A=new gc(le,ge);A.computeLineDistances(),A.renderOrder=400,S.add(A)};he(Kr(0,1.0009),new Wi({color:14988650,transparent:!0,opacity:.75,depthWrite:!1})),he(Kr(23.44,1.0009),oe(15769696,.6)),he(Kr(-23.44,1.0009),oe(15769696,.6)),he(Kr(66.56,1.0009),oe(9425919,.6)),he(Kr(-66.56,1.0009),oe(9425919,.6));const Q=[];for(let le=-180;le<180;le+=15)for(let ge=-80;ge<80;ge+=2)Q.push([ge,le,ge+2,le]);const _e=new vc(Uu(Q,1.0009),new Wi({color:16777215,transparent:!0,opacity:.13,depthWrite:!1}));_e.renderOrder=400,S.add(_e)}const E=2e3;let T=[];const y=new Wf(new jc(1,28),new si({transparent:!0,opacity:.72,depthWrite:!1,side:En}),E);y.count=0,y.visible=!1,y.frustumCulled=!1,y.renderOrder=450,y.userData.pick={kind:"quake"},y.boundingSphere=new qn(new F,1.2),a.add(y),n.addPickable(y);let R=null;function D(ie,oe){const he=(oe-ie.time)/36e5;return he<1?new nt(16731469):he<24?new nt(16751164):new nt(15979130)}function b(){fetch(f_).then(ie=>ie.json()).then(ie=>{T=m_(ie).slice(-E);const oe=Date.now();T.forEach((he,Q)=>y.setColorAt(Q,D(he,oe))),y.count=T.length,y.instanceColor&&(y.instanceColor.needsUpdate=!0),i?.(T,null)}).catch(()=>i?.(T,"Nie udało się pobrać danych USGS — sprawdź internet."))}const M=new F,P=new Zi,I=new F,k=new ft;function H(ie,oe){const he=Date.now();for(let Q=0;Q<T.length;Q++){const _e=T[Q];M.copy(Ut(_e.lat,_e.lng,1.0005)),P.setFromUnitVectors(M_,M.clone().normalize());let le=(.0045+.0042*Math.pow(Math.max(0,_e.mag-2.4),1.35))*ie;he-_e.time<864e5&&(le*=1+.18*Math.sin(oe*3+Q)),I.set(le,le,le),k.compose(M,P,I),y.setMatrixAt(Q,k)}y.instanceMatrix.needsUpdate=!0}const j=new _n;j.visible=!1,a.add(j);const O=b_("rgba(143,211,255,0.9)");O.userData.pick={kind:"iss"};const se=Nu("ISS",{size:30,color:"#bfe6ff",weight:600});j.add(O,se),n.addPickable(O);const $=new Wi({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1});let ce=null,ue=null,fe=null,be=0,Be=0;function Ge(){Be=Date.now(),fetch(p_).then(ie=>ie.json()).then(ie=>{ue=c_(ie.line1,ie.line2),be=0}).catch(()=>{Be=0,r?.(null,"Nie udało się pobrać orbity ISS — sprawdź internet.")})}function Me(ie){const oe=l_(ue,ie);if(!oe||!oe.position)return null;const he=u_(oe.position,il(ie)),Q=oe.velocity;return{lat:he.latitude*zu,lng:he.longitude*zu,alt:he.height,speed:Math.hypot(Q.x,Q.y,Q.z)*3600}}function V(ie){ce&&(j.remove(ce),ce.geometry.dispose());const oe=[],he=[];for(let _e=-40;_e<=92;_e+=.5){const le=Me(new Date(ie+_e*6e4));if(!le)continue;oe.push(Ut(le.lat,le.lng,1+le.alt/Iu));const ge=_e<0?.25+.35*(1+_e/40):.9-.5*(_e/92);he.push(.56*ge,.83*ge,1*ge)}const Q=new bt().setFromPoints(oe);Q.setAttribute("color",new ct(he,3)),ce=new gc(Q,$),ce.renderOrder=480,j.add(ce)}let ee=0;const me=new F;function Re(ie,oe){const he=ie<.05,Q=ie>1.1?3:ie>.5?4:ie>.15?5:7,_e=oe.position.clone().normalize(),le=window.innerWidth,ge=window.innerHeight,A=Math.tan(Ct.degToRad(oe.fov/2)),g=[],U=u.filter(X=>{const Z=!he&&X.userData.rank<=Q&&X.userData.normal.dot(_e)>.3;return Z||(X.visible=!1),Z});U.sort((X,Z)=>X.userData.rank-Z.userData.rank||Z.userData.pop-X.userData.pop),ve.set(0,1,0).applyQuaternion(oe.quaternion).applyQuaternion(a.getWorldQuaternion(ae).invert());for(const X of U){const Z=X.userData.base;a.localToWorld(me.copy(Z));const q=oe.position.distanceTo(me),Ee=X.userData.rank<=2?15:13,pe=Ee*1.6/ge*2*q*A;X.scale.set(pe*X.userData.aspect,pe,1);const Te=Ee*1.6*X.userData.aspect/2,v=Ee*1.6/2;let re=!1;for(const de of[0,.75,-.75]){X.position.copy(Z).addScaledVector(ve,de*pe),a.localToWorld(me.copy(X.position)).project(oe);const Fe=(me.x+1)/2*le,Ie=(1-me.y)/2*ge,xe=[Fe-Te,Ie-v*.8,Fe+Te,Ie+v*.8];if(!g.some(Le=>xe[0]<Le[2]&&xe[2]>Le[0]&&xe[1]<Le[3]&&xe[3]>Le[1])){g.push(xe),re=!0;break}}X.visible=re}}const ve=new F,ae=new Zi;let Ye=0;const ke=new wa,Ve=new F,L=new qn(new F,1);return n.onFrame(({dt:ie,alt:oe,markerScale:he,camera:Q})=>{if(Ye+=ie,s.borders&&u.length&&(l.opacity=.4*Ct.smoothstep(oe,.004,.03),ee=(ee+1)%6,ee===0&&Re(oe,Q)),s.quakes&&T.length&&H(Math.max(he,.004),Ye),s.iss&&ue){const _e=Date.now(),le=Me(new Date(_e));if(le){fe=le;const ge=Ut(le.lat,le.lng,1+le.alt/Iu);O.position.copy(ge);const A=n.layerRoot.localToWorld(ge.clone()),g=Q.position.distanceTo(A),U=Ct.clamp(g*.05,.004,.2);O.scale.set(U,U,1),se.position.copy(ge).multiplyScalar(1+U*.6),se.scale.set(U*.6*se.userData.aspect,U*.6,1),ke.set(Q.position,A.clone().sub(Q.position).normalize());const X=ke.intersectSphere(L,Ve);se.visible=!X||Q.position.distanceTo(X)>g}_e-be>2e4&&(be=_e,V(_e),r?.(fe,null)),_e-Be>6*36e5&&Ge()}}),{get countries(){return o},loadCountries:h,setBorders(ie){s.borders=ie,c.visible=ie,ie&&h()},setVisited(ie){_=new Set(ie),o.length&&C()},showVisited(ie){m=ie,x&&(x.visible=ie)},setGrid(ie){s.grid=ie,S.visible=ie},setQuakes(ie){s.quakes=ie,y.visible=ie,clearInterval(R),ie&&(b(),R=setInterval(b,10*6e4))},setIss(ie){s.iss=ie,j.visible=ie,ie&&!ue&&Ge()},quake(ie){return T[ie]},get quakes(){return T},get iss(){return fe}}}const Sn=Math.PI/180,pn=29.530588,sa=n=>(n%360+360)%360;function Ud(n){return sa(il(n)/Sn)}function w_(n){const e=(357.529+.98560028*n)*Sn,t=280.459+.98564736*n;return sa(t+1.915*Math.sin(e)+.02*Math.sin(2*e))}const E_=[[0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[1,0,-1,0,-5163]],T_=[[0,0,1,0,-20905355],[2,0,-1,0,-3699111],[2,0,0,0,-2955968],[0,0,2,0,-569925],[0,1,0,0,48888],[0,0,0,2,-3149],[2,0,-2,0,246158],[2,-1,-1,0,-152138],[2,0,1,0,-170733],[2,-1,0,0,-204586],[0,1,-1,0,-129620],[1,0,0,0,108743],[0,1,1,0,104755]],A_=[[0,0,0,1,5128122],[0,0,1,1,280602],[0,0,1,-1,277693],[2,0,0,-1,173237],[2,0,-1,1,55413],[2,0,-1,-1,46271],[2,0,0,1,32573],[0,0,2,1,17198],[2,0,1,-1,9266],[0,0,2,-1,8822]];function C_(n){const e=n.getTime()/864e5+24405875e-1-2451545,t=e/36525,i=218.3164477+481267.88123421*t,r=(297.8501921+445267.1114034*t)*Sn,a=(357.5291092+35999.0502909*t)*Sn,s=(134.9633964+477198.8675055*t)*Sn,o=(93.272095+483202.0175233*t)*Sn,c=([R,D,b,M])=>R*r+D*a+b*s+M*o;let l=0,u=0,d=0;for(const R of E_)l+=R[4]*Math.sin(c(R));for(const R of T_)u+=R[4]*Math.cos(c(R));for(const R of A_)d+=R[4]*Math.sin(c(R));const h=sa(i+l/1e6),p=d/1e6,x=385000.56+u/1e3,_=(23.4393-.013*t)*Sn,m=h*Sn,f=p*Sn,C=sa(Math.atan2(Math.sin(m)*Math.cos(_)-Math.tan(f)*Math.sin(_),Math.cos(m))/Sn),S=Math.asin(Math.sin(f)*Math.cos(_)+Math.cos(f)*Math.sin(_)*Math.sin(m))/Sn,E=sa(h-w_(e)),T=Math.cos(f)*Math.cos(E*Sn),y=((C-Ud(n))%360+540)%360-180;return{ra:C,dec:S,dist:x,lat:S,lng:y,illum:(1-T)/2,waxing:E<180,age:E/360*pn}}function As(n){const e=n.age;return e<1.2||e>pn-1.2?"nów":Math.abs(e-pn/2)<1.2?"pełnia":Math.abs(e-pn/4)<1.2?"pierwsza kwadra":Math.abs(e-3*pn/4)<1.2?"ostatnia kwadra":e<pn/4?"przybywający sierp":e<pn/2?"przybywający garb":e<3*pn/4?"ubywający garb":"ubywający sierp"}function R_(n){const e=(pn/2-n.age+pn)%pn,t=(pn-n.age)%pn;return{toFull:e,toNew:t}}const hs=60,P_=7,L_=.45,D_=`
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;
  varying float vSize;
  uniform float pixelRatio;
  void main() {
    vColor = color;
    vSize = size;
    gl_PointSize = size * pixelRatio;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,z_=`
  varying vec3 vColor;
  varying float vSize;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * clamp(vSize / 2.2, 0.35, 1.0));
  }
`,I_=`
  uniform sampler2D map;
  uniform vec3 sunDir;
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    float ndl = dot(normalize(vN), sunDir);
    vec3 c = texture2D(map, vUv).rgb * (0.02 + 1.1 * smoothstep(-0.03, 0.25, ndl));
    gl_FragColor = vec4(c, 1.0);
    #include <colorspace_fragment>
  }
`,U_=`
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`;function N_(n){const t="500 26px Outfit, system-ui, sans-serif",i=document.createElement("canvas"),r=i.getContext("2d");r.font=t,i.width=Math.ceil(r.measureText(n).width)+12,i.height=38,r.font=t,r.textBaseline="middle",r.fillStyle="rgba(170, 190, 225, 0.85)",r.fillText(n,6,i.height/2);const a=new qc(i);a.colorSpace=Dt;const s=new Wc(new Ps({map:a,transparent:!0,depthWrite:!1}));return s.userData.aspect=i.width/i.height,s}function F_(n,{dataBase:e="data/",texturesBase:t="textures/",onMoon:i}){const r=n.layerRoot,a=new _n;r.add(a);const s=new _n;s.visible=!1,a.add(s);const o=[];let c=!1;fetch(e+"sky.json").then(f=>f.json()).then(async f=>{const C=f.s.length,S=new Float32Array(C*3),E=new Float32Array(C*3),T=new Float32Array(C);f.s.forEach(([M,P,I,k,H,j],O)=>{const se=Ut(P,M>180?M-360:M,hs);S.set([se.x,se.y,se.z],O*3),E.set([k,H,j],O*3),T[O]=Math.max(.9,4.2*Math.pow(10,-.16*(I+1)))});const y=new bt;y.setAttribute("position",new Vt(S,3)),y.setAttribute("color",new Vt(E,3)),y.setAttribute("size",new Vt(T,1));const R=new ud(y,new Qt({uniforms:{pixelRatio:{value:Math.min(2,window.devicePixelRatio||1)}},vertexShader:D_,fragmentShader:z_,transparent:!0,depthWrite:!1,blending:Ci}));R.frustumCulled=!1,a.add(R);const D=[];for(const M of f.l)for(let P=1;P<M.length;P++){const I=Ut(M[P-1][1],M[P-1][0]>180?M[P-1][0]-360:M[P-1][0],hs*.99),k=Ut(M[P][1],M[P][0]>180?M[P][0]-360:M[P][0],hs*.99);D.push(I.x,I.y,I.z,k.x,k.y,k.z)}const b=new bt;b.setAttribute("position",new ct(D,3)),s.add(new vc(b,new Wi({color:7308984,transparent:!0,opacity:.45,depthWrite:!1}))),await document.fonts?.ready;for(const[M,P,I,k]of f.n){const H=N_(I);H.position.copy(Ut(P,M>180?M-360:M,hs*.98)),H.userData.rank=k,s.add(H),o.push(H)}c=!0,n.hideRandomStars()}).catch(()=>{});const l=new Ta().load(t+"moon.webp");l.colorSpace=Dt;const u=new Rt(new ai(L_,64,48),new Qt({uniforms:{map:{value:l},sunDir:{value:n.sunDir}},vertexShader:U_,fragmentShader:I_}));u.userData.pick={kind:"moon"},r.add(u),n.addPickable(u);let d=null;const h=new F(1,0,0);function p(f){a.rotation.y=-Ud(f)*Math.PI/180,d=C_(f);const C=Ut(d.lat,d.lng,1);u.position.copy(C).multiplyScalar(P_),u.quaternion.setFromUnitVectors(h,C.clone().negate()),i?.(d)}let x=()=>new Date,_=0;const m=new F;return n.onFrame(({dt:f,camera:C})=>{if(_-=f,_<=0&&(_=20,p(x())),c&&s.visible){const S=window.innerHeight,E=Math.tan(Ct.degToRad(C.fov/2)),T=C.position.length()-1,y=T>2.5?1:T>1.2?2:3;for(const R of o){if(R.visible=R.userData.rank<=y,!R.visible)continue;r.localToWorld(m.copy(R.position));const D=12*1.45/S*2*C.position.distanceTo(m)*E;R.scale.set(D*R.userData.aspect,D,1)}}}),{setConstellations(f){s.visible=f},setMoon(f){u.visible=f},setClock(f){x=f,_=0},get moon(){return d}}}const k_="https://nominatim.openstreetmap.org/search",Nd="https://pl.wikipedia.org";async function O_(n){const e=`${k_}?q=${encodeURIComponent(n)}&format=jsonv2&limit=8&accept-language=pl`,t=await fetch(e,{headers:{Accept:"application/json"}});if(!t.ok)throw new Error("Nominatim "+t.status);return(await t.json()).map(i=>{const r=i.display_name.split(", "),a=i.name||r[0];return{name:a,region:r.filter(s=>s!==a&&!/\d/.test(s)).slice(-3).join(", "),lat:Number(i.lat),lng:Number(i.lon),kind:i.addresstype||i.type}})}const Ao=new Map;async function Fu(n){const e=await fetch(`${Nd}/api/rest_v1/page/summary/${encodeURIComponent(n.replace(/ /g,"_"))}`);if(!e.ok)return null;const t=await e.json();return t.type!=="standard"||!t.extract?null:{title:t.title,extract:t.extract,thumb:t.thumbnail?.source||null,url:t.content_urls?.mobile?.page||t.content_urls?.desktop?.page,coords:t.coordinates?{lat:t.coordinates.lat,lng:t.coordinates.lon}:null}}function Co(n,e,t,i){return n&&(!n.coords||Is(e,t,n.coords.lat,n.coords.lng)<i)}async function B_({name:n,lat:e,lng:t,region:i=""},r=150){const a=`${n}|${e.toFixed(2)}|${t.toFixed(2)}`;if(Ao.has(a))return Ao.get(a);const s=(async()=>{const o=await Fu(n);if(Co(o,e,t,r)&&o.coords)return o;const c=`${n} ${i.split(",")[0]||""}`.trim(),l=await fetch(`${Nd}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(c)}&srlimit=4&format=json&origin=*`),u=l.ok?(await l.json()).query?.search?.map(d=>d.title)||[]:[];for(const d of u){const h=await Fu(d);if(h?.coords&&Co(h,e,t,r))return h}return Co(o,e,t,r)?o:null})().catch(()=>null);return Ao.set(a,s),s}const V_=[{id:"all",label:"Wszystkie"},{id:"fav",label:"Ulubione"},{id:"p",label:"Polska"},{id:"d",label:"Niemcy"},{id:"m",label:"Miasta"},{id:"c",label:"Cuda i zabytki"},{id:"n",label:"Przyroda"},{id:"own",label:"Moje"}],G_=[["krakow","Kraków","Polska","p",50.0614,19.9366,"Europe/Warsaw","Rynek, Wawel i ciepły kamień starego miasta nad Wisłą."],["warszawa","Warszawa","Polska","p",52.2297,21.0122,"Europe/Warsaw","Odbudowana Starówka, Łazienki i panorama wieżowców nad Wisłą."],["gdansk","Gdańsk","Polska","p",54.352,18.6466,"Europe/Warsaw","Długi Targ, Żuraw nad Motławą i bursztynowe kamienice."],["wroclaw","Wrocław","Polska","p",51.1079,17.0385,"Europe/Warsaw","Miasto mostów i wysp na Odrze, z krasnalami na każdym rogu."],["torun","Toruń","Polska","p",53.0138,18.5984,"Europe/Warsaw","Gotyk z czerwonej cegły, miasto Kopernika i pierników."],["poznan","Poznań","Polska","p",52.4064,16.9252,"Europe/Warsaw","Kolorowy Stary Rynek i koziołki trykające się na ratuszu w południe."],["morskie-oko","Morskie Oko","Tatry, Polska","p",49.2013,20.071,"Europe/Warsaw","Jedno z największych jezior Tatr, pod ścianą Mięguszowieckich Szczytów."],["malbork","Zamek w Malborku","Polska","p",54.0398,19.0277,"Europe/Warsaw","Największy ceglany zamek świata, dawna stolica zakonu krzyżackiego."],["wieliczka","Kopalnia soli Wieliczka","Polska","p",49.983,20.055,"Europe/Warsaw","Komory, kaplice i jeziora wykute w soli setki metrów pod ziemią."],["bialowieza","Puszcza Białowieska","Polska i Białoruś","p",52.7008,23.8693,"Europe/Warsaw","Ostatni tak duży las nizinny Europy i dom żubrów."],["leba","Ruchome wydmy w Łebie","Słowiński PN, Polska","p",54.7631,17.5559,"Europe/Warsaw","Piaszczysta pustynia nad Bałtykiem, wędrująca nawet kilka metrów rocznie."],["tarnica","Tarnica","Bieszczady, Polska","p",49.0747,22.7264,"Europe/Warsaw","Najwyższy szczyt polskich Bieszczad, z widokiem na połoniny."],["zamosc","Zamość","Polska","p",50.7231,23.252,"Europe/Warsaw","Renesansowe „miasto idealne” Zamoyskich, z ormiańskimi kamienicami przy Rynku Wielkim."],["lublin","Lublin","Polska","p",51.2465,22.5684,"Europe/Warsaw","Stare Miasto na wzgórzu, zamek z kaplicą Świętej Trójcy i Brama Krakowska."],["lodz","Łódź","Polska","p",51.7592,19.456,"Europe/Warsaw","Fabrykanckie miasto z ulicą Piotrkowską i ceglanymi zakładami zamienionymi w lofty."],["szczecin","Szczecin","Polska","p",53.4285,14.5528,"Europe/Warsaw","Wały Chrobrego nad Odrą, Zamek Książąt Pomorskich i port blisko Bałtyku."],["kazimierz","Kazimierz Dolny","Polska","p",51.3214,21.9486,"Europe/Warsaw","Miasteczko artystów nad Wisłą, z ruinami zamku i lessowymi wąwozami."],["czestochowa","Jasna Góra","Częstochowa, Polska","p",50.8122,19.0973,"Europe/Warsaw","Klasztor paulinów z obrazem Czarnej Madonny, cel pielgrzymek z całej Polski."],["mikolajki","Mikołajki","Mazury, Polska","p",53.8031,21.5734,"Europe/Warsaw","Żeglarska stolica Mazur nad jeziorami Mikołajskim i Tałty."],["hel","Hel","Polska","p",54.608,18.8,"Europe/Warsaw","Koniec wąskiego półwyspu między Zatoką Gdańską a otwartym Bałtykiem."],["sniezka","Śnieżka","Karkonosze, Polska i Czechy","p",50.736,15.74,"Europe/Warsaw","Najwyższy szczyt Sudetów, 1603 m, z obserwatorium przypominającym latające spodki."],["szczeliniec","Szczeliniec Wielki","Góry Stołowe, Polska","p",50.4859,16.3392,"Europe/Warsaw","Labirynt piaskowcowych skał i szczelin na najwyższym szczycie Gór Stołowych."],["ksiaz","Zamek Książ","Wałbrzych, Polska","p",50.8423,16.2919,"Europe/Warsaw","Jeden z największych zamków w Polsce, na skale nad przełomem Pełcznicy."],["swidnica","Kościół Pokoju w Świdnicy","Polska","p",50.846,16.4818,"Europe/Warsaw","Ogromna drewniana świątynia z XVII wieku, wpisana na listę UNESCO."],["boleslawiec","Bolesławiec","Polska","p",51.2645,15.5697,"Europe/Warsaw","Miasto ceramiki w niebieskie wzory, znanej na całym świecie."],["eichendorf","Eichendorf","Dolna Bawaria, Niemcy","d",48.6336,12.8564,"Europe/Berlin","Gmina targowa w dolinie Vils, wśród pól i lasów powiatu Dingolfing-Landau."],["monachium","Monachium","Bawaria, Niemcy","d",48.1351,11.582,"Europe/Berlin","Stolica Bawarii: Marienplatz, Ogród Angielski i Oktoberfest na Theresienwiese."],["ratyzbona","Ratyzbona","Bawaria, Niemcy","d",49.0134,12.1016,"Europe/Berlin","Średniowieczne stare miasto nad Dunajem z kamiennym mostem z XII wieku."],["pasawa","Pasawa","Bawaria, Niemcy","d",48.5667,13.4319,"Europe/Berlin","Miasto trzech rzek, gdzie do Dunaju wpadają Inn i Ilz."],["dingolfing","Dingolfing","Dolna Bawaria, Niemcy","d",48.63,12.495,"Europe/Berlin","Miasto nad Izarą z jedną z największych fabryk BMW."],["landau-isar","Landau an der Isar","Dolna Bawaria, Niemcy","d",48.6747,12.6936,"Europe/Berlin","Miasteczko na skarpie nad doliną Izary."],["straubing","Straubing","Dolna Bawaria, Niemcy","d",48.8777,12.573,"Europe/Berlin","Miasto nad Dunajem z wieżą miejską na długim rynku i jarmarkiem Gäubodenvolksfest."],["las-bawarski","Las Bawarski","Bawaria, Niemcy","d",48.939,13.505,"Europe/Berlin","Najstarszy park narodowy Niemiec, przy granicy z Czechami."],["neuschwanstein","Zamek Neuschwanstein","Bawaria, Niemcy","d",47.5576,10.7498,"Europe/Berlin","Bajkowy zamek króla Ludwika II na skale u stóp Alp."],["zugspitze","Zugspitze","Bawaria, Niemcy","d",47.4211,10.9853,"Europe/Berlin","Najwyższy szczyt Niemiec, 2962 m, na granicy z Austrią."],["konigssee","Königssee","Bawaria, Niemcy","d",47.558,12.98,"Europe/Berlin","Wąskie, szmaragdowe jezioro wśród ścian Alp Berchtesgadeńskich."],["norymberga","Norymberga","Bawaria, Niemcy","d",49.4521,11.0767,"Europe/Berlin","Cesarski zamek nad czerwonymi dachami starego miasta i słynny jarmark bożonarodzeniowy."],["bamberg","Bamberg","Bawaria, Niemcy","d",49.8917,10.8917,"Europe/Berlin","Stare miasto z listy UNESCO, z ratuszem na wyspie pośrodku rzeki Regnitz."],["rothenburg","Rothenburg ob der Tauber","Bawaria, Niemcy","d",49.3772,10.1866,"Europe/Berlin","Średniowieczne miasteczko otoczone murami, z szachulcowymi domami."],["berlin","Berlin","Niemcy","d",52.52,13.405,"Europe/Berlin","Brama Brandenburska, ślady muru i jedna z najbardziej zielonych stolic Europy."],["drezno","Drezno","Saksonia, Niemcy","d",51.0504,13.7373,"Europe/Berlin","Barokowa „Florencja nad Łabą”, z odbudowanym kościołem Frauenkirche."],["hamburg","Hamburg","Niemcy","d",53.5511,9.9937,"Europe/Berlin","Wielki port nad Łabą, ceglane magazyny Speicherstadt i filharmonia nad wodą."],["kolonia","Kolonia","Nadrenia, Niemcy","d",50.9375,6.9603,"Europe/Berlin","Gotycka katedra nad Renem, budowana przez ponad 600 lat."],["barcelona","Barcelona","Katalonia, Hiszpania","m",41.3874,2.1686,"Europe/Madrid","Gotyckie zaułki, Sagrada Família i światło latarni nad morzem."],["paryz","Paryż","Francja","m",48.8566,2.3522,"Europe/Paris","Bulwary nad Sekwaną i wieża Eiffla rozświetlana co godzinę po zmroku."],["londyn","Londyn","Wielka Brytania","m",51.5074,-.1278,"Europe/London","Tamiza, Big Ben i miasto, przez które biegnie południk zerowy."],["rzym","Rzym","Włochy","m",41.9028,12.4964,"Europe/Rome","Fora, fontanny i trzy tysiące lat historii na siedmiu wzgórzach."],["wenecja","Wenecja","Włochy","m",45.4408,12.3155,"Europe/Rome","Miasto na ponad stu wyspach, gdzie ulicami są kanały."],["lizbona","Lizbona","Portugalia","m",38.7223,-9.1393,"Europe/Lisbon","Żółte tramwaje na stromych wzgórzach i ujście Tagu do Atlantyku."],["praga","Praga","Czechy","m",50.0755,14.4378,"Europe/Prague","Most Karola, Hradczany i zegar astronomiczny na Rynku Staromiejskim."],["wieden","Wiedeń","Austria","m",48.2082,16.3738,"Europe/Vienna","Pałace Habsburgów, kawiarnie i walce w sali Musikvereinu."],["amsterdam","Amsterdam","Holandia","m",52.3676,4.9041,"Europe/Amsterdam","Pierścienie kanałów, wąskie kamienice i więcej rowerów niż mieszkańców."],["reykjavik","Reykjavík","Islandia","m",64.1466,-21.9426,"Atlantic/Reykjavik","Najdalej na północ położona stolica państwa, zimą pod zorzą polarną."],["tromso","Tromsø","Norwegia","m",69.6492,18.9553,"Europe/Oslo","Za kołem podbiegunowym: noc polarna zimą, słońce o północy latem."],["stambul","Stambuł","Turcja","m",41.0082,28.9784,"Europe/Istanbul","Miasto na dwóch kontynentach nad cieśniną Bosfor."],["kair","Kair","Egipt","m",30.0444,31.2357,"Africa/Cairo","Największe miasto świata arabskiego, rozciągnięte wzdłuż Nilu."],["marrakesz","Marrakesz","Maroko","m",31.6295,-7.9811,"Africa/Casablanca","Czerwone mury medyny i zapach przypraw na placu Dżamaa al-Fana."],["kapsztad","Kapsztad","Republika Południowej Afryki","m",-33.9249,18.4241,"Africa/Johannesburg","Góra Stołowa nad zatoką, niedaleko Przylądka Dobrej Nadziei."],["dubaj","Dubaj","Zjednoczone Emiraty Arabskie","m",25.2048,55.2708,"Asia/Dubai","Burdż Chalifa, najwyższy budynek świata, wyrasta prosto z pustyni."],["tokio","Tokio","Japonia","m",35.6762,139.6503,"Asia/Tokyo","Największa aglomeracja świata — neony Shinjuku i ciche świątynie obok."],["kioto","Kioto","Japonia","m",35.0116,135.7681,"Asia/Tokyo","Dawna stolica: świątynie, klonowe ogrody i drewniane uliczki Gion."],["singapur","Singapur","Singapur","m",1.3521,103.8198,"Asia/Singapore","Miasto-państwo tuż przy równiku, z ogrodami wśród wieżowców."],["hongkong","Hongkong","Chiny","m",22.3193,114.1694,"Asia/Hong_Kong","Las wieżowców między górami a portem Wiktorii."],["bangkok","Bangkok","Tajlandia","m",13.7563,100.5018,"Asia/Bangkok","Złote świątynie, pływające targi i rzeka Menam."],["sydney","Sydney","Australia","m",-33.8688,151.2093,"Australia/Sydney","Port, muszle Opery i most Harbour Bridge nad zatoką."],["nowy-jork","Nowy Jork","Stany Zjednoczone","m",40.7128,-74.006,"America/New_York","Siatka ulic Manhattanu i światła mostów nad East River."],["san-francisco","San Francisco","Stany Zjednoczone","m",37.7749,-122.4194,"America/Los_Angeles","Golden Gate we mgle i strome ulice z tramwajami linowymi."],["vancouver","Vancouver","Kanada","m",49.2827,-123.1207,"America/Vancouver","Miasto między oceanem a ośnieżonymi Górami Nadbrzeżnymi."],["meksyk","Meksyk","Meksyk","m",19.4326,-99.1332,"America/Mexico_City","Ogromna stolica na miejscu azteckiego Tenochtitlán, 2240 m n.p.m."],["hawana","Hawana","Kuba","m",23.1136,-82.3666,"America/Havana","Kolonialne fasady, stare amerykańskie auta i nadmorski Malecón."],["rio","Rio de Janeiro","Brazylia","m",-22.9068,-43.1729,"America/Sao_Paulo","Głowa Cukru, Copacabana i Chrystus Odkupiciel na szczycie Corcovado."],["buenos-aires","Buenos Aires","Argentyna","m",-34.6037,-58.3816,"America/Argentina/Buenos_Aires","Tango w San Telmo i szerokie aleje nad estuarium La Platy."],["kopenhaga","Kopenhaga","Dania","m",55.6761,12.5683,"Europe/Copenhagen","Kolorowe domy nad kanałem Nyhavn i miasto, w którym wszędzie dojedziesz rowerem."],["sztokholm","Sztokholm","Szwecja","m",59.3293,18.0686,"Europe/Stockholm","Stolica rozłożona na kilkunastu wyspach, ze średniowieczną Gamla Stan."],["budapeszt","Budapeszt","Węgry","m",47.4979,19.0402,"Europe/Budapest","Buda i Peszt po obu stronach Dunaju, parlament nad rzeką i termalne łaźnie."],["edynburg","Edynburg","Szkocja, Wielka Brytania","m",55.9533,-3.1883,"Europe/London","Zamek na wulkanicznej skale nad Royal Mile i stare miasto z kamienia."],["dublin","Dublin","Irlandia","m",53.3498,-6.2603,"Europe/Dublin","Georgiańskie drzwi, puby Temple Bar i rzeka Liffey."],["wilno","Wilno","Litwa","m",54.6872,25.2797,"Europe/Vilnius","Barokowe stare miasto, Ostra Brama i wzgórze Giedymina."],["lwow","Lwów","Ukraina","m",49.8397,24.0297,"Europe/Kyiv","Rynek z ratuszem, kamienice wielu kultur i słynne kawiarnie."],["jerozolima","Jerozolima","Bliski Wschód","m",31.7683,35.2137,"Asia/Jerusalem","Stare Miasto święte dla trzech religii, otoczone kamiennymi murami."],["mumbaj","Mumbaj","Indie","m",19.076,72.8777,"Asia/Kolkata","Finansowe serce Indii z Bramą Indii nad Morzem Arabskim i Bollywood."],["pekin","Pekin","Chiny","m",39.9042,116.4074,"Asia/Shanghai","Stolica Chin z placem Tiananmen, hutongami i Zakazanym Miastem."],["szanghaj","Szanghaj","Chiny","m",31.2304,121.4737,"Asia/Shanghai","Bulwar Bund naprzeciw wieżowców Pudong nad rzeką Huangpu."],["seul","Seul","Korea Południowa","m",37.5665,126.978,"Asia/Seoul","Pałace dynastii Joseon wśród neonów i gór otaczających miasto."],["nairobi","Nairobi","Kenia","m",-1.2921,36.8219,"Africa/Nairobi","Stolica z parkiem narodowym, w którym żyrafy pasą się na tle wieżowców."],["chicago","Chicago","Stany Zjednoczone","m",41.8781,-87.6298,"America/Chicago","Kolebka drapaczy chmur nad jeziorem Michigan."],["los-angeles","Los Angeles","Stany Zjednoczone","m",34.0522,-118.2437,"America/Los_Angeles","Hollywood, plaże Pacyfiku i miasto rozlane między górami a oceanem."],["toronto","Toronto","Kanada","m",43.6532,-79.3832,"America/Toronto","Największe miasto Kanady z wieżą CN Tower nad jeziorem Ontario."],["auckland","Auckland","Nowa Zelandia","m",-36.8485,174.7633,"Pacific/Auckland","Miasto żagli na przesmyku między dwoma morzami, wśród dawnych wulkanów."],["giza","Piramidy w Gizie","Egipt","c",29.9792,31.1342,"Africa/Cairo","Jedyny z siedmiu cudów świata starożytnego, który przetrwał do dziś."],["petra","Petra","Jordania","c",30.3285,35.4444,"Asia/Amman","Miasto Nabatejczyków wykute w różowym piaskowcu."],["wielki-mur","Wielki Mur (Mutianyu)","Chiny","c",40.4319,116.5704,"Asia/Shanghai","Odcinek muru wijący się po zalesionych grzbietach na północ od Pekinu."],["tadz-mahal","Tadż Mahal","Agra, Indie","c",27.1751,78.0421,"Asia/Kolkata","Marmurowe mauzoleum wzniesione przez szacha Dżahana dla zmarłej żony."],["koloseum","Koloseum","Rzym, Włochy","c",41.8902,12.4922,"Europe/Rome","Amfiteatr na około 50 tysięcy widzów, otwarty w 80 roku n.e."],["machu-picchu","Machu Picchu","Peru","c",-13.1631,-72.545,"America/Lima","Inkaskie miasto na grzbiecie Andów, odkryte dla świata w 1911 roku."],["chichen-itza","Chichén Itzá","Jukatan, Meksyk","c",20.6843,-88.5678,"America/Merida","Piramida Kukulkana, po której w równonoc pełznie świetlny wąż."],["angkor-wat","Angkor Wat","Kambodża","c",13.4125,103.867,"Asia/Phnom_Penh","Największa świątynia świata, otoczona fosą i dżunglą."],["akropol","Akropol","Ateny, Grecja","c",37.9715,23.7257,"Europe/Athens","Partenon na skalistym wzgórzu nad Atenami."],["stonehenge","Stonehenge","Anglia, Wielka Brytania","c",51.1789,-1.8262,"Europe/London","Krąg kamieni ustawiony ponad 4500 lat temu, zgrany z przesileniami."],["rapa-nui","Posągi moai","Rapa Nui (Wyspa Wielkanocna), Chile","c",-27.1127,-109.3497,"Pacific/Easter","Kamienne głowy na jednej z najbardziej odludnych zamieszkanych wysp."],["sagrada","Sagrada Família","Barcelona, Hiszpania","c",41.4036,2.1744,"Europe/Madrid","Bazylika Gaudíego budowana od 1882 roku."],["alhambra","Alhambra","Grenada, Hiszpania","c",37.1761,-3.5881,"Europe/Madrid","Mauretański pałac z dziedzińcami, fontannami i arabeskami pod Sierra Nevada."],["mont-saint-michel","Mont-Saint-Michel","Normandia, Francja","c",48.6361,-1.5115,"Europe/Paris","Opactwo na skalistej wyspie, którą przypływ odcina od lądu."],["hagia-sophia","Hagia Sophia","Stambuł, Turcja","c",41.0086,28.9802,"Europe/Istanbul","Bizantyjska świątynia z VI wieku z ogromną kopułą."],["kreml","Kreml i plac Czerwony","Moskwa, Rosja","c",55.7539,37.6208,"Europe/Moscow","Czerwone mury twierdzy i kolorowe kopuły soboru Wasyla Błogosławionego."],["zakazane-miasto","Zakazane Miasto","Pekin, Chiny","c",39.9163,116.3972,"Asia/Shanghai","Pałac cesarzy Chin z setkami budynków za purpurowymi murami."],["borobudur","Borobudur","Jawa, Indonezja","c",-7.6079,110.2038,"Asia/Jakarta","Największa świątynia buddyjska świata, z setkami stup i płaskorzeźb."],["abu-simbel","Abu Simbel","Egipt","c",22.3372,31.6258,"Africa/Cairo","Świątynie Ramzesa II, przeniesione w całości przed zalaniem przez Jezioro Nasera."],["statua-wolnosci","Statua Wolności","Nowy Jork, Stany Zjednoczone","c",40.6892,-74.0445,"America/New_York","Miedziany posąg, dar Francji, witający statki u wejścia do portu."],["teotihuacan","Teotihuacán","Meksyk","c",19.6925,-98.8438,"America/Mexico_City","Piramidy Słońca i Księżyca przy Alei Zmarłych, starsze od Azteków."],["wielki-kanion","Wielki Kanion","Arizona, Stany Zjednoczone","n",36.0544,-112.1401,"America/Phoenix","Rzeka Kolorado wyrzeźbiła wąwóz głęboki na prawie 1,9 km."],["niagara","Wodospad Niagara","Kanada i Stany Zjednoczone","n",43.0962,-79.0377,"America/Toronto","Trzy wodospady na granicy, z ogromnym przepływem wody."],["everest","Mount Everest","Nepal i Chiny","n",27.9881,86.925,"Asia/Kathmandu","Najwyższy szczyt Ziemi, 8849 m nad poziomem morza."],["wiktoria","Wodospad Wiktorii","Zambia i Zimbabwe","n",-17.9243,25.8572,"Africa/Harare","Zambezi spada ponad stumetrowym progiem; miejscowi mówią o „dymie, który grzmi”."],["kilimandzaro","Kilimandżaro","Tanzania","n",-3.0674,37.3556,"Africa/Dar_es_Salaam","Najwyższa góra Afryki, wulkan ze śniegiem niemal na równiku."],["serengeti","Serengeti","Tanzania","n",-2.3333,34.8333,"Africa/Dar_es_Salaam","Sawanna wielkiej wędrówki gnu i zebr."],["sahara","Erg Chebbi","Sahara, Maroko","n",31.15,-3.9667,"Africa/Casablanca","Pomarańczowe wydmy na skraju największej gorącej pustyni świata."],["galapagos","Galápagos","Ekwador","n",-.9538,-90.9656,"Pacific/Galapagos","Wulkaniczne wyspy żółwi olbrzymich, które zainspirowały Darwina."],["iguazu","Wodospady Iguazú","Argentyna i Brazylia","n",-25.6953,-54.4367,"America/Argentina/Buenos_Aires","Ponad 270 kaskad w podzwrotnikowym lesie, z Gardzielą Diabła."],["rafa","Wielka Rafa Koralowa","Australia","n",-18.2871,147.6992,"Australia/Brisbane","Największa struktura zbudowana przez organizmy żywe, widoczna z orbity."],["uluru","Uluru","Australia","n",-25.3444,131.0369,"Australia/Darwin","Święta skała Anangu, czerwieniejąca o zachodzie słońca."],["ha-long","Zatoka Ha Long","Wietnam","n",20.9101,107.1839,"Asia/Ho_Chi_Minh","Prawie dwa tysiące wapiennych wysp wyrastających z morza."],["bajkal","Bajkał","Syberia, Rosja","n",53.5587,108.165,"Asia/Irkutsk","Najgłębsze jezioro świata, z około 20% słodkiej wody powierzchniowej Ziemi."],["geiranger","Geirangerfjord","Norwegia","n",62.1049,7.0947,"Europe/Oslo","Wąski fiord wśród stromych ścian i wodospadów."],["santorini","Santorini","Grecja","n",36.3932,25.4615,"Europe/Athens","Białe domy na krawędzi kaldery po wybuchu wulkanu sprzed 3600 lat."],["antarktyda","Biegun Południowy","Antarktyda","n",-90,0,"Antarctica/McMurdo","Lodowa wyżyna na wysokości 2800 m, gdzie zbiegają się wszystkie południki."],["fudzi","Fudżi","Japonia","n",35.3606,138.7274,"Asia/Tokyo","Najwyższa góra Japonii, 3776 m — symetryczny wulkan widoczny z Tokio w pogodne dni."],["matterhorn","Matterhorn","Szwajcaria i Włochy","n",45.9763,7.6586,"Europe/Zurich","Ostra piramida skalna nad Zermatt, jeden z najsłynniejszych szczytów Alp."],["tre-cime","Tre Cime di Lavaredo","Dolomity, Włochy","n",46.6187,12.3022,"Europe/Rome","Trzy pionowe turnie z jasnego dolomitu, ikona włoskich Alp."],["plitwice","Jeziora Plitwickie","Chorwacja","n",44.8654,15.582,"Europe/Zagreb","Kaskada turkusowych jezior połączonych wodospadami."],["etna","Etna","Sycylia, Włochy","n",37.751,14.9934,"Europe/Rome","Najwyższy czynny wulkan Europy, wciąż regularnie wybuchający."],["kapadocja","Kapadocja","Turcja","n",38.6431,34.8289,"Europe/Istanbul","Kominy skalne, podziemne miasta i balony nad doliną o świcie."],["morze-martwe","Morze Martwe","Bliski Wschód","n",31.559,35.4732,"Asia/Jerusalem","Słone jezioro w najniższym miejscu na lądzie, ponad 400 m poniżej poziomu morza."],["jokulsarlon","Jökulsárlón","Islandia","n",64.0784,-16.2306,"Atlantic/Reykjavik","Laguna, po której dryfują góry lodowe oderwane od lodowca."],["yellowstone","Yellowstone","Stany Zjednoczone","n",44.4605,-110.8281,"America/Denver","Pierwszy park narodowy świata, z gejzerem Old Faithful."],["yosemite","Yosemite","Kalifornia, Stany Zjednoczone","n",37.8651,-119.5383,"America/Los_Angeles","Granitowe ściany El Capitan i Half Dome nad doliną z wodospadami."],["uyuni","Salar de Uyuni","Boliwia","n",-20.1338,-67.4891,"America/La_Paz","Największa solna równina świata — po deszczu zmienia się w lustro nieba."],["perito-moreno","Lodowiec Perito Moreno","Patagonia, Argentyna","n",-50.4967,-73.1377,"America/Argentina/Rio_Gallegos","Lodowa ściana nad jeziorem, z której z hukiem odpadają bloki lodu."],["torres-del-paine","Torres del Paine","Patagonia, Chile","n",-50.9423,-73.4068,"America/Punta_Arenas","Granitowe wieże nad jeziorami i lodowcami na końcu Andów."],["manaus","Spotkanie wód","Amazonia, Brazylia","n",-3.1395,-59.8975,"America/Manaus","Ciemna Rio Negro i piaszczysta Solimões płyną obok siebie, zanim się zmieszają."],["okawango","Delta Okawango","Botswana","n",-19.3,22.9,"Africa/Gaborone","Śródlądowa delta na Kalahari, która co roku zalewa się wodą i ożywa."],["baobaby","Aleja Baobabów","Madagaskar","n",-20.2508,44.4184,"Indian/Antananarivo","Szpaler wielkich baobabów przy drodze, najpiękniejszy o zachodzie słońca."],["aoraki","Aoraki / Mount Cook","Nowa Zelandia","n",-43.595,170.1418,"Pacific/Auckland","Najwyższy szczyt Nowej Zelandii w Alpach Południowych."],["biegun-polnocny","Biegun Północny","Arktyka","n",90,0,null,"Dryfujący lód na Oceanie Arktycznym — stąd każdy kierunek prowadzi na południe."]],ta=G_.map(([n,e,t,i,r,a,s,o])=>({id:n,name:e,region:t,cat:i,lat:r,lng:a,tz:s,blurb:o})),Ce=n=>document.querySelector(n),Fd=_s.isNativePlatform(),It={get(n,e){try{const t=localStorage.getItem("meridian-"+n);return t==null?e:JSON.parse(t)}catch{return e}},set(n,e){try{localStorage.setItem("meridian-"+n,JSON.stringify(e))}catch{}}},Mt={real:!0,clouds:!0,spin:!0,tiles:!0,labels:!0,...It.get("settings",{})},mt={borders:!0,grid:!1,quakes:!1,iss:!0,photo:!1,constellations:!1,moon:!0,visited:!0,nasa:"none",...It.get("layers",{})},Vn=new Set(It.get("visited",[])),ri=new Set(It.get("favorites",[]));let wr=It.get("own",[]).filter(n=>n&&n.name&&Number.isFinite(n.lat)&&Number.isFinite(n.lng)),zt=It.get("home",null);const Gi=It.get("best",{}),Fr=()=>ta.concat(wr.map(n=>({...n,cat:"own",region:"Moje miejsce",tz:null,blurb:""}))),Ns=n=>Fr().find(e=>e.id===n),ki=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`,xn={tour:ki('<path d="M3 11l18-8-8 18-2-8-8-2z"/>'),quiz:ki('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><path d="M12 17h.01"/>'),settings:ki('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),close:ki('<path d="M6 6l12 12M18 6L6 18"/>'),star:ki('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),stop:ki('<rect x="6" y="6" width="12" height="12" rx="2"/>'),layers:ki('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>')};Ce("#btn-layers").innerHTML=xn.layers;Ce("#btn-tour").innerHTML=xn.tour;Ce("#btn-quiz").innerHTML=xn.quiz;Ce("#btn-settings").innerHTML=xn.settings;Ce("#version").textContent="wersja 1.4.0";let ot=null,Tt="places";const Pe=Yv(Ce("#view"),{onPlace:n=>{Tt==="places"&&kr(n,{scroll:!0})},onGround:n=>{Tt==="quiz"?oy(n):Tt==="places"&&Vd(n)},onTiles:n=>Ce("#attrib").hidden=!n,onPick:(n,e)=>{if(!(Tt!=="places"&&Tt!=="layers"))if(n.kind==="quake"){const t=xt.quake(e);t&&Er({type:"quake",id:t.id})}else n.kind==="iss"?Er({type:"iss"}):n.kind==="moon"&&Er({type:"moon"})}}),xt=S_(Pe,{onCountries:()=>{ot&&ot.type!=="quake"&&Xt(),dn("visited")},onQuakes:(n,e)=>dn("quakes",e),onIss:(n,e)=>{dn("iss",e),ot?.type==="iss"&&Tt==="places"&&Xt()}}),ya=F_(Pe,{onMoon:()=>{dn("moon"),ot?.type==="moon"&&Tt==="places"&&Xt()}});Ce("#zoom-in").onclick=()=>Pe.zoomBy(.4);Ce("#zoom-out").onclick=()=>Pe.zoomBy(2.5);Pe.whenReady(()=>Ce("#loading").classList.add("done"));let oa=0;const Ma=()=>new Date(Date.now()+oa*36e5),H_=new Intl.DateTimeFormat("pl-PL",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});function rl(){Pe.setSun(Mt.real);const n=Ed(Ma());Pe.setSubsolar(n.lat,n.lng);const e=oa?` <b>${oa>0?"+":"−"}${kd(Math.abs(oa))}</b>`:"";Ce("#clock").innerHTML=Mt.real?H_.format(Ma())+e:"Zawsze dzień"}function kd(n){const e=Math.floor(n),t=Math.round((n-e)*60);return t?`${e} h ${t} min`:`${e} h`}function W_(){rl(),Tt==="places"&&(Un(),Xt())}setInterval(W_,3e4);let Dn=It.get("filter","all"),Ca="";const ku=n=>n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").replace(/ł/g,"l");function al(){const n=ku(Ca.trim());return Fr().filter(e=>Dn==="fav"&&!ri.has(e.id)||Dn!=="all"&&Dn!=="fav"&&e.cat!==Dn?!1:!n||ku(e.name+" "+e.region).includes(n))}function ba(){const n=Fr(),e=t=>t==="all"?n.length:t==="fav"?n.filter(i=>ri.has(i.id)).length:n.filter(i=>i.cat===t).length;Ce("#chips").innerHTML="";for(const t of V_){const i=e(t.id);if(!i&&(t.id==="fav"||t.id==="own")&&Dn!==t.id)continue;const r=document.createElement("button");r.type="button",r.className="chip"+(Dn===t.id?" on":""),r.setAttribute("role","tab"),r.setAttribute("aria-selected",String(Dn===t.id)),r.innerHTML=`${t.label}<small>${i}</small>`,r.onclick=()=>{Dn=t.id,It.set("filter",Dn),ba(),Un()},Ce("#chips").appendChild(r)}}function X_(n){return n>0?"":n>-6?"dusk":"night"}function Un(){const n=Ce("#list"),e=al(),t=Ma();n.innerHTML="";const i=Ca.trim();if(gn&&gn.q===i&&q_(n),!e.length&&!i){n.innerHTML=`<li class="empty">${Dn==="fav"?"Nie masz jeszcze ulubionych. Otwórz miejsce i dotknij gwiazdki.":Dn==="own"?"Dotknij globusu w dowolnym punkcie, żeby dodać własne miejsce.":"Nic tu nie ma."}</li>`;return}if(i.length>=2&&!(gn&&gn.q===i)){const r=document.createElement("li");r.innerHTML=`<button type="button" class="world-btn"><span class="copy"><strong></strong><span class="sub">${e.length?"albo poszukaj poza katalogiem":"w katalogu nie ma takiego miejsca"} — OpenStreetMap</span></span></button>`,r.querySelector("strong").textContent=`Szukaj „${i}” na mapie świata`,r.querySelector("button").onclick=()=>Od(i),n.appendChild(r)}for(const r of e){const a=document.createElement("li"),s=document.createElement("button");s.type="button",s.dataset.id=r.id;const o=ot?.type==="place"&&ot.id===r.id;s.className=o?"on":"";const c=el(r.lat,r.lng,t);s.innerHTML=`<i class="mark${r.cat==="own"?" own":""}"></i><span class="copy"><strong></strong><span class="sub"></span></span><span class="time"><i class="sun-dot ${X_(c)}"></i>${Cd(t,r.tz,r.lng)}</span>`,s.querySelector("strong").textContent=r.name,s.querySelector(".sub").textContent=r.region,s.onclick=()=>{kn(),kr(r.id)},a.appendChild(s),n.appendChild(a)}}let gn=null;async function Od(n){gn={q:n,loading:!0,results:[],error:null},Un();try{gn.results=await O_(n)}catch{gn.error="Nie udało się połączyć z OpenStreetMap — sprawdź internet."}gn.loading=!1,gn.q===Ca.trim()&&Un()}function q_(n){const e=document.createElement("li");e.className="list-head",e.textContent=gn.loading?"Szukam na mapie świata…":gn.error||(gn.results.length?"Na mapie świata · © OpenStreetMap":"Na mapie świata nic nie znalazłem."),n.appendChild(e);for(const t of gn.results){const i=document.createElement("li"),r=document.createElement("button");r.type="button",r.innerHTML='<i class="mark world"></i><span class="copy"><strong></strong><span class="sub"></span></span>',r.querySelector("strong").textContent=t.name,r.querySelector(".sub").textContent=t.region,r.onclick=()=>j_(t),i.appendChild(r),n.appendChild(i)}}function j_(n){kn(),ot={type:"point",lat:n.lat,lng:n.lng,name:n.name,region:n.region},Pe.select(null,{fly:!1}),Pe.setPin("tap",n,9425919),Sa(n),Pe.zoomTo(n.lat,n.lng,.03),Xt(),Un(),zr()==="mini"&&ln("peek")}Ce("#q").addEventListener("input",n=>{Ca=n.target.value,Un()});Ce("#q").addEventListener("keydown",n=>{if(n.key==="Enter"){const e=Ca.trim(),t=al()[0];t?kr(t.id):e.length>=2&&Od(e),n.target.blur()}});function $_(n){n&&(Vn.has(n.iso)?Vn.delete(n.iso):Vn.add(n.iso),It.set("visited",[...Vn]),xt.setVisited(Vn),dn("visited"),Fn(Vn.has(n.iso)?`Dodano: ${n.n}. Odwiedzone kraje: ${Vn.size}.`:`Usunięto: ${n.n}.`))}const Y_="https://beagleapps.pl/apps/meridian/";async function Z_({lat:n,lng:e,name:t,id:i}){const r=Math.max(.002,Math.min(3,Pe.radius-1)),a=`${Y_}#m=${n.toFixed(4)},${e.toFixed(4)},${r.toFixed(4)}${i&&!i.startsWith("own-")?","+i:""}`,s=t?`${t} — Meridian`:"Meridian — atlas nocy";try{if(Fd){const{Share:o}=await Gu(async()=>{const{Share:c}=await import("./index-eEcizuHF.js");return{Share:c}},[],import.meta.url);await o.share({title:s,text:t?`Zobacz ${t} na globusie:`:"Zobacz to miejsce na globusie:",url:a,dialogTitle:"Udostępnij widok"})}else navigator.share?await navigator.share({title:s,url:a}):(await navigator.clipboard.writeText(a),Fn("Skopiowano link do schowka."))}catch{}}function Bd(){const n=location.hash.match(/m=(-?[\d.]+),(-?[\d.]+),([\d.]+)(?:,([a-z0-9-]+))?/);if(!n)return;const[e,t,i]=[Number(n[1]),Number(n[2]),Number(n[3])];if(!Number.isFinite(e)||!Number.isFinite(t))return;const r=n[4]&&Ns(n[4]);r?kr(r.id,{fly:!1}):Vd({lat:e,lng:t}),Pe.zoomTo(e,t,i)}function kr(n,{scroll:e=!1,fly:t=!0}={}){const i=Ns(n);if(i){if(ot?.type==="place"&&ot.id===n&&!$i){Nn();return}ot={type:"place",id:n},Pe.setPin("tap",null),Pe.select(n,{fly:t}),Sa(i),Xt(),Un(),e&&Ce(`#list button[data-id="${CSS.escape(n)}"]`)?.scrollIntoView({block:"nearest",behavior:"smooth"})}}function Vd(n){kn(),ot={type:"point",lat:n.lat,lng:n.lng},Pe.select(null,{fly:!1}),Pe.setPin("tap",n,9425919),Sa(n),Xt(),Un(),zr()==="mini"&&ln("peek")}function Nn(){ot=null,Pe.select(null,{fly:!1}),Pe.setPin("tap",null),Pe.setArc(null),Pe.release(),Xt(),Un()}function Sa(n){zt&&n&&Is(zt.lat,zt.lng,n.lat,n.lng)>30?Pe.setArc(zt,n):Pe.setArc(null)}function Gd(n,e,t,i=!0){const r=Ma(),a=el(n,e,r),s=Cd(r,t,e),o=[`<span>${t?"Czas lokalny":"Czas słoneczny (przybliżony)"}: <b>${s}</b></span>`,`<span>Teraz: <b>${Dv(a)}</b></span>`];if(zt){const c=Is(zt.lat,zt.lng,n,e);c>30?o.push(`<span class="km">Od mojego punktu: <b>${Ad(c)}</b> · lot ok. ${Lv(Rv(c))}</span>`):o.push('<span class="km">To jest <b>tuż obok</b> twojego punktu</span>')}return i&&o.push(`<span>${Aa(n,e)}</span>`),`<div class="facts">${o.join("")}</div>`}function Xt(){const n=Ce("#detail");if(!ot){n.innerHTML='<p class="hint">Przeciągnij globus, szczypnij, przewiń albo dotknij dwa razy, żeby przybliżyć — z bliska widać zdjęcia satelitarne. Dotknij świecącego znacznika lub miejsca z listy — kamera tam doleci. Dotknij dowolnego punktu Ziemi, żeby sprawdzić, która tam godzina.</p>';return}return ot.type==="quake"?ey(n):ot.type==="iss"?ty(n):ot.type==="moon"?Q_(n):ot.type==="place"?K_(n):J_(n)}function Hd(n,e){return xt.countries.length?Us(xt.countries,n,e):null}function Wd(n){if(!n)return"";const e=Vn.has(n.iso);return`<button class="ghost small${e?" on-mint":""}" data-act="visited" type="button" aria-pressed="${e}">${e?"✓ Byłem tu":"Byłem tu"} · ${An(n.n)}</button>`}function Xd(n,{lat:e,lng:t,name:i,id:r,country:a}){n.querySelector('[data-act="close"]').onclick=Nn,n.querySelector('[data-act="zoom"]').onclick=()=>jd({lat:e,lng:t}),n.querySelector('[data-act="share"]').onclick=()=>Z_({lat:e,lng:t,name:i,id:r}),n.querySelector('[data-act="visited"]')?.addEventListener("click",()=>{$_(a),Xt()})}function qd(n,e){const t=n.querySelector(".wiki");if(!t)return;const i=t.dataset.token=Math.random().toString(36);B_(e).then(r=>{if(t.dataset.token!==i||!t.isConnected)return;if(!r){t.remove();return}const a=r.extract.length>420?r.extract.slice(0,420).replace(/\s+\S*$/,"")+"…":r.extract;t.innerHTML=`${r.thumb?`<img src="${An(r.thumb)}" alt="" loading="lazy" />`:""}<p></p>
      <a href="${An(r.url)}" target="_blank" rel="noopener">Czytaj w Wikipedii</a><small>Wikipedia, CC BY-SA 4.0</small>`,t.querySelector("p").textContent=a,t.classList.add("ready")})}function K_(n){const e=Ns(ot.id);if(!e)return Nn();const t=ri.has(e.id),i=Hd(e.lat,e.lng);n.innerHTML=`<div class="card">
    <div class="card-head"><div><p class="region"></p><h2></h2></div>
    <button class="star${t?" on":""}" type="button" aria-pressed="${t}" aria-label="${t?"Usuń z ulubionych":"Dodaj do ulubionych"}">${xn.star}</button></div>
    ${e.blurb?'<p class="blurb"></p>':""}
    ${Gd(e.lat,e.lng,e.tz)}
    ${e.cat!=="own"?'<div class="wiki">Szukam opisu w Wikipedii…</div>':""}
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
      <button class="ghost small" data-act="share" type="button">Udostępnij</button>
      <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
      ${Wd(i)}
      ${e.cat==="own"?'<button class="ghost small danger" data-act="delete" type="button">Usuń miejsce</button>':""}
    </div></div>`,n.querySelector(".region").textContent=e.region,n.querySelector("h2").textContent=e.name,e.blurb&&(n.querySelector(".blurb").textContent=e.blurb),n.querySelector(".star").onclick=()=>{ri.has(e.id)?ri.delete(e.id):ri.add(e.id),It.set("favorites",[...ri]),Xt(),ba()},Xd(n,{lat:e.lat,lng:e.lng,name:e.name,id:e.id,country:i}),n.querySelector('[data-act="home"]').onclick=()=>ks({lat:e.lat,lng:e.lng,label:e.name}),n.querySelector('[data-act="delete"]')?.addEventListener("click",()=>{wr=wr.filter(r=>r.id!==e.id),ri.delete(e.id),It.set("own",wr),It.set("favorites",[...ri]),Pe.setPlaces(Fr()),Nn(),ba(),Fn(`Usunięto „${e.name}”.`)}),qd(n,e)}function J_(n){const{lat:e,lng:t,name:i,region:r}=ot,a=Hd(e,t),s=a?An(a.n)+(a.cap?" · stolica: "+An(a.cap):""):xt.countries.length?"Morze albo ocean":"Wybrany punkt";n.innerHTML=`<div class="card">
    <p class="region">${i?An(r||s):s}</p><h2>${i?An(i):Aa(e,t).replace(/\s{3}/,", ")}</h2>
    ${Gd(e,t,null,!!i)}
    ${i?'<div class="wiki">Szukam opisu w Wikipedii…</div>':""}
    <form class="name-form" hidden><input type="text" maxlength="40" placeholder="Nazwa miejsca" aria-label="Nazwa miejsca" required /><button class="solid" type="submit">Zapisz</button></form>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
      <button class="ghost small" data-act="share" type="button">Udostępnij</button>
      <button class="ghost small" data-act="add" type="button">Dodaj do moich miejsc</button>
      <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
      ${Wd(a)}
    </div></div>`;const o=n.querySelector(".name-form");Xd(n,{lat:e,lng:t,name:i,country:a}),n.querySelector('[data-act="home"]').onclick=()=>ks({lat:e,lng:t,label:i||null}),n.querySelector('[data-act="add"]').onclick=c=>{o.hidden=!1,c.currentTarget.hidden=!0;const l=o.querySelector("input");i&&(l.value=i.slice(0,40)),l.focus()},o.onsubmit=c=>{c.preventDefault();const l=o.querySelector("input").value.trim();if(!l)return;const u={id:"own-"+Date.now().toString(36),name:l,lat:+e.toFixed(4),lng:+t.toFixed(4)};wr.push(u),It.set("own",wr),Pe.setPlaces(Fr()),ba(),kr(u.id,{fly:!1}),Fn(`Dodano „${l}” do moich miejsc.`)},i&&qd(n,{name:i,lat:e,lng:t,region:r})}function Q_(n){const e=ya.moon;if(!e)return Nn();const{toFull:t,toNew:i}=R_(e),r=a=>a<1?"mniej niż dzień":`${Math.round(a)} ${Math.round(a)===1?"dzień":"dni"}`;n.innerHTML=`<div class="card">
    <p class="region">Księżyc · ${e.waxing?"przybywa":"ubywa"}</p>
    <h2>${As(e)[0].toUpperCase()+As(e).slice(1)}, oświetlone ${Math.round(e.illum*100)}%</h2>
    <div class="facts">
      <span>Wiek od nowiu: <b>${e.age.toFixed(1).replace(".",",")} dnia</b></span>
      <span>Pełnia za: <b>${r(t)}</b> · nów za: <b>${r(i)}</b></span>
      <span>Odległość od Ziemi: <b>${Math.round(e.dist).toLocaleString("pl-PL")} km</b></span>
      <span>W zenicie ${An(sl(e.lat,e.lng).replace(/^nad: /,"nad krajem: "))}</span>
    </div>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="view" type="button">Pokaż Księżyc</button>
      <button class="ghost small" data-act="under" type="button">Punkt pod Księżycem</button>
    </div></div>`,n.querySelector('[data-act="close"]').onclick=Nn,n.querySelector('[data-act="under"]').onclick=()=>Pe.focus(e.lat,e.lng,2.6),n.querySelector('[data-act="view"]').onclick=()=>{const a=Math.max(-65,Math.min(65,-e.lat+(e.lat>0?-30:30)));Pe.zoomTo(a,(e.lng+360)%360-180,3.8),jn()||ln("mini")}}function An(n){return String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}let Xn=!1;function Er(n){if(kn(),Tt!=="places"&&mi("places"),Xn=!1,ot=n,Pe.select(null,{fly:!1}),Pe.setPin("tap",null),Pe.setArc(null),n.type==="quake"){const e=xt.quakes.find(t=>t.id===n.id);e&&Pe.focus(e.lat,e.lng)}Xt(),Un(),zr()==="mini"&&ln("peek")}function sl(n,e){const t=xt.countries.length?Us(xt.countries,n,e):null;return t?"nad: "+t.n:"nad morzem albo oceanem"}function ey(n){const e=xt.quakes.find(r=>r.id===ot.id);if(!e)return Nn();const t=xt.countries.length?Us(xt.countries,e.lat,e.lng):null,i=new Intl.DateTimeFormat("pl-PL",{day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"}).format(new Date(e.time));n.innerHTML=`<div class="card">
    <p class="region">Trzęsienie ziemi · ${x_(e.mag)}</p>
    <h2>${zd(e.mag)} · ${t?An(t.n):"pod morzem"}</h2>
    <div class="facts">
      <span>Kiedy: <b>${Dd(e.time)}</b> (${i})</span>
      <span>Głębokość: <b>${Math.round(e.depth)} km</b>${e.tsunami?" · duże zdarzenie w strefie oceanicznej":""}</span>
      <span>Opis USGS: ${An(e.place)}</span>
      <span>${Aa(e.lat,e.lng)}</span>
    </div>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
      <a class="ghost small link" href="${An(e.url)}" target="_blank" rel="noopener">Szczegóły w USGS</a>
    </div></div>`,n.querySelector('[data-act="close"]').onclick=Nn,n.querySelector('[data-act="zoom"]').onclick=()=>jd(e)}function ty(n){const e=xt.iss;if(!e){n.innerHTML='<div class="card"><p class="region">Międzynarodowa Stacja Kosmiczna</p><h2>Liczę orbitę…</h2></div>';return}const t=g_(e.lat,e.lng,e.alt,new Date);n.innerHTML=`<div class="card">
    <p class="region">Międzynarodowa Stacja Kosmiczna · na żywo</p>
    <h2>ISS ${An(sl(e.lat,e.lng))}</h2>
    <div class="facts">
      <span>Wysokość: <b>${Math.round(e.alt)} km</b> · prędkość: <b>${Math.round(e.speed).toLocaleString("pl-PL")} km/h</b></span>
      <span>Teraz: <b>${t?"w słońcu":"w cieniu Ziemi"}</b> · jedno okrążenie trwa ok. 92 minuty</span>
      <span>${Aa(e.lat,e.lng)}</span>
    </div>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="follow" type="button">${Xn?"Przestań śledzić":"Śledź ISS"}</button>
    </div></div>`,n.querySelector('[data-act="close"]').onclick=Nn,n.querySelector('[data-act="follow"]').onclick=()=>{Xn=!Xn,Xn?ol():Pe.release(),Xt()}}function ol(){const n=xt.iss;Xn&&n&&Pe.focus(n.lat,n.lng,Math.max(Pe.radius,1.6))}setInterval(()=>{Xn&&ot?.type==="iss"&&(ol(),Tt==="places"&&Xt())},1500);Ce("#view canvas").addEventListener("pointerdown",()=>{Xn&&(Xn=!1,ot?.type==="iss"&&Xt())});let fs=null,Cs=null;function Fs(){xt.setBorders(mt.borders),Pe.setLabelMinZoom(mt.borders?8:5),xt.setGrid(mt.grid),xt.setQuakes(mt.quakes),xt.setIss(mt.iss),mt.photo?iy():Pe.setPhoto(null),ya.setConstellations(mt.constellations),ya.setMoon(mt.moon),xt.setVisited(Vn),xt.showVisited(mt.visited),ny(mt.nasa);for(const e of Object.keys(mt)){const t=Ce(`#layer-${e}`);t&&(t.checked=mt[e])}const n=document.querySelector(`input[name="nasa"][value="${mt.nasa}"]`);n&&(n.checked=!0),document.querySelectorAll(".nasa-legend").forEach(e=>e.hidden=e.dataset.kind!==mt.nasa),dn()}const ji={};let Ou="none";function ny(n){if(Ou=n,n==="none")return Pe.setOverlay(null);const e=Id[n].tint;if(ji[n])return Pe.setOverlay(ji[n].tex,e),dn("nasa");const t=Pe.maxTextureSize>=4096&&!matchMedia("(pointer: coarse)").matches,{url:i,date:r}=__(n,t?4096:2048);dn("nasa",null,"Pobieram dane NASA…"),new Ta().load(i,a=>{a.colorSpace=Dt,ji[n]={tex:a,date:r},Ou===n&&Pe.setOverlay(a,e),dn("nasa")},void 0,()=>dn("nasa","Nie udało się pobrać danych NASA — sprawdź internet."))}function iy(){const n=v_();if(fs&&Cs===n)return Pe.setPhoto(fs);const e=Pe.maxTextureSize>=4096&&!matchMedia("(pointer: coarse)").matches;dn("photo",null,"Pobieram zdjęcie z satelitów NASA…"),new Ta().load(y_(n,e?4096:2048),t=>{t.colorSpace=Dt,t.anisotropy=8,fs?.dispose(),fs=t,Cs=n,mt.photo&&Pe.setPhoto(t),dn("photo")},void 0,()=>dn("photo","Nie udało się pobrać zdjęcia NASA — sprawdź internet."))}const Bu=new Intl.DateTimeFormat("pl-PL",{day:"numeric",month:"long",timeZone:"UTC"});function dn(n,e,t){const i=a=>!n||n===a,r=(a,s)=>Ce(`#status-${a}`).textContent=s;if(i("quakes")){const a=xt.quakes;if(e)r("quakes",e);else if(!mt.quakes)r("quakes","Z ostatnich 7 dni, od M 2,5. Dane USGS, odświeżane co 10 minut.");else if(!a.length)r("quakes","Pobieram dane USGS…");else{const s=a[a.length-1],o=a.filter(l=>Date.now()-l.time<864e5).length,c=xt.countries.length?Us(xt.countries,s.lat,s.lng):null;r("quakes",`${a.length} trzęsień w 7 dni, ${o} z ostatniej doby. Najsilniejsze: ${zd(s.mag)}, ${c?c.n:"pod morzem"}, ${Dd(s.time)}.`)}Ce("#show-quake").hidden=!mt.quakes||!a.length}if(i("iss")){const a=xt.iss;e?r("iss",e):mt.iss?a?r("iss",`Teraz ${sl(a.lat,a.lng)}, ${Math.round(a.alt)} km nad ziemią, ${Math.round(a.speed).toLocaleString("pl-PL")} km/h.`):r("iss","Pobieram orbitę…"):r("iss","Pozycja liczona na żywo z aktualnej orbity, linia pokazuje najbliższe okrążenie."),Ce("#show-iss").hidden=!mt.iss||!a}if(i("photo")&&(e?r("photo",e):t?r("photo",t):mt.photo&&Cs?r("photo",`Zdjęcie z ${Bu.format(new Date(Cs+"T12:00:00Z"))}, z satelitów Suomi NPP i NOAA-20. Zastępuje mozaikę chmur.`):r("photo","Prawdziwe chmury, śnieg i dym z wczorajszego dnia, sklejone z przelotów satelitów NASA.")),i("nasa")){const a=mt.nasa,s=o=>Bu.format(new Date(o+"T12:00:00Z"));e?r("nasa",e):t?r("nasa",t):a==="none"?r("nasa","Dane z satelitów NASA nałożone na globus — jedna warstwa naraz."):ji[a]?a==="fires"?r("nasa",`Pożary i inne gorące punkty wykryte ${s(ji[a].date)} przez satelity Suomi NPP i NOAA-20.`):a==="sst"?r("nasa",`Temperatura powierzchni morza z ${s(ji[a].date)} (analiza MUR, ok. 1 km).`):r("nasa",`Zasięg śniegu z 8 dni od ${s(ji[a].date)} (MODIS) i lód morski.`):r("nasa","Pobieram dane NASA…")}if(i("moon")){const a=ya.moon;r("moon",a?`${As(a)[0].toUpperCase()+As(a).slice(1)}, oświetlone ${Math.round(a.illum*100)}%. Dotknij Księżyca na niebie albo przycisku niżej.`:"Liczę położenie Księżyca…")}if(i("visited")){const a=xt.countries.filter(o=>Vn.has(o.iso)),s=new Set(a.map(o=>o.con).filter(o=>o!=="Antarktyda"||a.length));r("visited",a.length?`${a.length} ${a.length===1?"kraj":a.length%10>=2&&a.length%10<=4&&(a.length%100<10||a.length%100>=20)?"kraje":"krajów"} na ${s.size} ${s.size===1?"kontynencie":"kontynentach"}: ${a.map(o=>o.n).sort((o,c)=>o.localeCompare(c,"pl")).join(", ")}.`:"Dotknij lądu na globusie albo otwórz miejsce i wybierz „Byłem tu”, a kraj podświetli się na mapie.")}}for(const n of["constellations","moon","visited"])Ce(`#layer-${n}`).onchange=e=>{mt[n]=e.target.checked,It.set("layers",mt),Fs()};document.querySelectorAll('input[name="nasa"]').forEach(n=>{n.onchange=()=>{mt.nasa=n.value,It.set("layers",mt),Fs()}});Ce("#show-moon").onclick=()=>Er({type:"moon"});for(const n of["borders","grid","quakes","iss","photo"])Ce(`#layer-${n}`).onchange=e=>{mt[n]=e.target.checked,It.set("layers",mt),Fs()};Ce("#show-quake").onclick=()=>{const n=xt.quakes[xt.quakes.length-1];n&&Er({type:"quake",id:n.id})};Ce("#show-iss").onclick=()=>{Er({type:"iss"}),Xn=!0,ol(),Xt()};function jd(n){kn(),Pe.zoomTo(n.lat,n.lng,.005),jn()||ln("mini"),Mt.tiles||Fn("Włącz w ustawieniach zdjęcia satelitarne, żeby widzieć szczegóły.")}function ks(n){zt=n?{lat:Math.round(n.lat*100)/100,lng:Math.round(n.lng*100)/100,label:n.label||null}:null,It.set("home",zt),Pe.setPin("home",zt,10477760),$d(),ot?.type==="place"?Sa(Ns(ot.id)):ot?.type==="point"&&Sa(ot),Xt(),n&&Fn("Zapisano twój punkt — przy każdym miejscu zobaczysz odległość.")}function $d(){Ce("#home-info").textContent=zt?`${zt.label?zt.label+" · ":""}${Aa(zt.lat,zt.lng)}`:"Nie ustawiono. Z mojego punktu liczę odległości i rysuję trasę lotu.",Ce("#home-clear").hidden=!zt}Ce("#home-clear").onclick=()=>{ks(null),Fn("Usunięto twój punkt.")};Ce("#home-gps").onclick=()=>{if(!navigator.geolocation)return Fn("To urządzenie nie udostępnia lokalizacji.");Ce("#home-gps").disabled=!0,navigator.geolocation.getCurrentPosition(n=>{Ce("#home-gps").disabled=!1,ks({lat:n.coords.latitude,lng:n.coords.longitude,label:"Moja lokalizacja"}),Pe.focus(zt.lat,zt.lng)},()=>{Ce("#home-gps").disabled=!1,Fn("Nie udało się pobrać lokalizacji. Możesz dotknąć globusu i ustawić punkt ręcznie.")},{enableHighAccuracy:!1,timeout:15e3,maximumAge:6e5})};const wc=Ce("#opt-real"),Ec=Ce("#opt-clouds"),Tc=Ce("#opt-spin"),Ac=Ce("#opt-tiles"),Cc=Ce("#opt-labels");Ac.checked=Mt.tiles;Cc.checked=Mt.labels;Ac.onchange=()=>{Mt.tiles=Ac.checked,Pe.setTiles(Mt.tiles),Ra()};Cc.onchange=()=>{Mt.labels=Cc.checked,Pe.setLabels(Mt.labels),Ra()};const Rc=Ce("#opt-time");wc.checked=Mt.real;Ec.checked=Mt.clouds;Tc.checked=Mt.spin;function Ra(){It.set("settings",Mt)}wc.onchange=()=>{Mt.real=wc.checked,Ce("#time-box").hidden=!Mt.real,Ra(),rl()};Ec.onchange=()=>{Mt.clouds=Ec.checked,Pe.setClouds(Mt.clouds),Ra()};Tc.onchange=()=>{Mt.spin=Tc.checked,Pe.setSpin(Mt.spin),Pe.setTiles(Mt.tiles),Pe.setLabels(Mt.labels),Ra()};function cl(n){oa=n,Rc.value=String(n),Ce("#time-out").textContent=n?(n>0?"+":"−")+kd(Math.abs(n)):"teraz",Ce("#time-now").hidden=!n,rl(),ya.setClock(Ma)}Rc.oninput=()=>cl(Number(Rc.value));Ce("#time-now").onclick=()=>cl(0);const ca=Ce("#panel"),jn=()=>matchMedia("(min-width: 820px)").matches,zr=()=>ca.dataset.sheet;function ln(n){ca.dataset.sheet=n}function mi(n){Tt=n;for(const e of["places","quiz","settings","layers"])Ce(`#view-${e}`).hidden=e!==n;Ce("#btn-layers").classList.toggle("on",n==="layers"),Ce("#btn-layers").innerHTML=n==="layers"?xn.close:xn.layers,Ce("#btn-quiz").classList.toggle("on",n==="quiz"),Ce("#btn-settings").classList.toggle("on",n==="settings"),Ce("#btn-quiz").innerHTML=n==="quiz"?xn.close:xn.quiz,Ce("#btn-settings").innerHTML=n==="settings"?xn.close:xn.settings,n==="places"&&(Un(),Xt())}Ce("#btn-settings").onclick=()=>{kn(),Tt==="quiz"&&Pa(),mi(Tt==="settings"?"places":"settings"),jn()||ln(Tt==="settings"?"full":"peek")};Ce("#btn-layers").onclick=()=>{kn(),Tt==="quiz"&&Pa(),mi(Tt==="layers"?"places":"layers"),Tt==="layers"&&dn(),jn()||ln(Tt==="layers"?"full":"peek")};{const n=Ce("#grip");let e=null;n.addEventListener("pointerdown",t=>{e=t.clientY,n.setPointerCapture(t.pointerId)}),n.addEventListener("pointerup",t=>{if(e==null)return;const i=t.clientY-e;e=null;const r=["mini","peek","full"],a=r.indexOf(zr());i<-24?ln(r[Math.min(2,a+1)]):i>24?ln(r[Math.max(0,a-1)]):ln(zr()==="full"?"peek":"full")})}new ResizeObserver(()=>{jn()?Pe.setViewShift((ca.offsetWidth+16)/2,0):Pe.setViewShift(0,Math.min(ca.offsetHeight,window.innerHeight*.6)/2)}).observe(ca);let $i=null;function ry(){const n=al();if(n.length<2)return Fn("Za mało miejsc na liście, żeby ruszyć w wycieczkę.");Tt!=="places"&&mi("places");let e=ot?.type==="place"?n.findIndex(i=>i.id===ot.id):-1;const t=()=>{e=(e+1)%n.length,kr(n[e].id,{scroll:!0})};$i=setInterval(t,7e3),t(),Ce("#btn-tour").classList.add("on"),Ce("#btn-tour").innerHTML=xn.stop,Ce("#btn-tour").setAttribute("aria-label","Zatrzymaj wycieczkę"),Fn(`Wycieczka po ${n.length} miejscach. Dotknij globusu, żeby przerwać.`)}function kn(){$i&&(clearInterval($i),$i=null,Ce("#btn-tour").classList.remove("on"),Ce("#btn-tour").innerHTML=xn.tour,Ce("#btn-tour").setAttribute("aria-label","Wycieczka po miejscach"))}Ce("#btn-tour").onclick=()=>$i?kn():ry();Ce("#view canvas").addEventListener("pointerdown",kn);const ay=[{id:"easy",label:"Łatwy",desc:"Miasta świata, z podpowiedzią kraju",pool:()=>ta.filter(n=>n.cat==="m"),hint:!0},{id:"world",label:"Cały świat",desc:"Miasta, cuda i przyroda — bez podpowiedzi",pool:()=>ta,hint:!1},{id:"pl",label:"Polska",desc:"Miejsca w Polsce — tu liczy się każdy kilometr",pool:()=>ta.filter(n=>n.cat==="p"),hint:!1,scale:8},{id:"de",label:"Niemcy",desc:"Bawaria i reszta Niemiec — z Eichendorfem włącznie",pool:()=>ta.filter(n=>n.cat==="d"),hint:!1,scale:6}],Yd=10;let tr=null;function sy(n){const e=n.slice();for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}Ce("#btn-quiz").onclick=()=>{if(kn(),Tt==="quiz"){Pa(),mi("places");return}Nn(),mi("quiz"),Pe.setMarkersVisible(!1),Pe.setPin("home",null),ll()};function ll(){tr=null;const n=Ce("#view-quiz");n.innerHTML=`<h2 class="section-title">Gdzie to jest?</h2>
    <p class="hint">Dostajesz nazwę miejsca i dotykasz globusu tam, gdzie twoim zdaniem leży. Im bliżej, tym więcej punktów — maksymalnie 1000 za rundę, ${Yd} rund.</p>
    <div class="levels"></div>`;for(const e of ay){const t=document.createElement("button");t.type="button",t.className="level",t.innerHTML=`<strong>${e.label}</strong><small>${e.desc}${Gi[e.id]?` · rekord ${Gi[e.id]}`:""}</small>`,t.onclick=()=>Zd(e),n.querySelector(".levels").appendChild(t)}jn()||ln("peek")}function Zd(n){tr={level:n,list:sy(n.pool()).slice(0,Yd),round:0,score:0,answered:!1},Kd()}function Kd(){const n=tr,e=n.list[n.round];n.answered=!1,Pe.setPin("guess",null),Pe.setPin("target",null),Pe.setArc(null),Pe.release(),Ce("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${n.round+1}</b> z ${n.list.length}</span><span>Wynik <b>${n.score}</b></span></div>
    <div class="progress"><i style="width:${n.round/n.list.length*100}%"></i></div>
    <p class="hint">Gdzie leży…</p>
    <p class="quiz-target"></p>
    ${n.level.hint?'<p class="region quiz-hint"></p>':""}
    <p class="hint">Obróć globus i dotknij miejsca, które obstawiasz.</p>`,Ce("#view-quiz .quiz-target").textContent=e.name,n.level.hint&&(Ce("#view-quiz .quiz-hint").textContent=e.region),jn()||ln("mini")}function oy(n){const e=tr;if(!e||e.answered)return;e.answered=!0;const t=e.list[e.round],i=Is(n.lat,n.lng,t.lat,t.lng),r=Cv(i*(e.level.scale||1));e.score+=r,Pe.setPin("guess",n,9425919),Pe.setPin("target",t,16766090),Pe.setArc(n,t);const a={lat:(n.lat+t.lat)/2,lng:Math.abs(n.lng-t.lng)>180?(n.lng+t.lng+360)/2%360:(n.lng+t.lng)/2};Pe.focus(a.lat,a.lng>180?a.lng-360:a.lng,Math.min(4.2,1.9+i/4e3));const s=i<50?"W punkt!":i<300?"Bardzo blisko.":i<1e3?"Niedaleko.":i<3e3?"Ten sam kawałek świata.":"Daleko…",o=e.round+1>=e.list.length;Ce("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${e.round+1}</b> z ${e.list.length}</span><span>Wynik <b>${e.score}</b></span></div>
    <div class="progress"><i style="width:${(e.round+1)/e.list.length*100}%"></i></div>
    <p class="quiz-target"></p>
    <p class="quiz-result"><span class="pts">+${r}</span><br>${s} Twój strzał był <b>${Ad(i)}</b> od celu.</p>
    <p class="blurb"></p>
    <div class="row-buttons"><button class="solid" type="button" id="quiz-next">${o?"Zobacz wynik":"Dalej"}</button></div>`,Ce("#view-quiz .quiz-target").textContent=t.name,Ce("#view-quiz .blurb").textContent=`${t.region}. ${t.blurb}`,Ce("#quiz-next").onclick=()=>{e.round+=1,e.round>=e.list.length?cy():Kd()},jn()||ln("peek")}function cy(){const n=tr,e=n.list.length*1e3,t=n.score>(Gi[n.level.id]||0);t&&(Gi[n.level.id]=n.score,It.set("best",Gi)),Pe.setPin("guess",null),Pe.setPin("target",null),Pe.setArc(null),Pe.release();const i=n.score/e,r=i>.85?"Mistrzowska orientacja!":i>.65?"Świetny wynik.":i>.4?"Całkiem nieźle.":"Globus czeka na kolejne podejście.";Ce("#view-quiz").innerHTML=`
    <h2 class="section-title">Koniec quizu</h2>
    <p class="quiz-result"><span class="pts">${n.score}</span> / ${e}<br>${r}${t?" <b>To twój nowy rekord!</b>":Gi[n.level.id]?` Rekord: ${Gi[n.level.id]}.`:""}</p>
    <div class="row-buttons">
      <button class="solid" type="button" id="quiz-again">Jeszcze raz</button>
      <button class="ghost" type="button" id="quiz-levels">Inny poziom</button>
      <button class="ghost" type="button" id="quiz-close">Zamknij quiz</button>
    </div>`,Ce("#quiz-again").onclick=()=>Zd(n.level),Ce("#quiz-levels").onclick=ll,Ce("#quiz-close").onclick=()=>{Pa(),mi("places")},jn()||ln("peek")}function Pa(){tr=null,Pe.setPin("guess",null),Pe.setPin("target",null),Pe.setArc(null),Pe.setMarkersVisible(!0),Pe.setPin("home",zt,10477760),Pe.release()}let Vu=0;function Fn(n){const e=Ce("#toast");e.textContent=n,e.hidden=!1,clearTimeout(Vu),Vu=setTimeout(()=>e.hidden=!0,3600)}Fd&&Gu(async()=>{const{App:n}=await import("./index-Cn9n22ZI.js");return{App:n}},[],import.meta.url).then(({App:n})=>{n.addListener("backButton",()=>{$i?kn():Tt==="quiz"&&tr?ll():Tt!=="places"?(Tt==="quiz"&&Pa(),mi("places")):ot?Nn():!jn()&&zr()==="full"?ln("peek"):n.exitApp()})});Pe.setPlaces(Fr());Pe.setClouds(Mt.clouds);Pe.setSpin(Mt.spin);Pe.setPin("home",zt,10477760);xt.loadCountries();Fs();Ce("#time-box").hidden=!Mt.real;cl(0);ba();$d();mi("places");Pe.whenReady(Bd);window.addEventListener("hashchange",Bd);"serviceWorker"in navigator&&window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));export{Lc as W,Gu as _,Pc as r};
