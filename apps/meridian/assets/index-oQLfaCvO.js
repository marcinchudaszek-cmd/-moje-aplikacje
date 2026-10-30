(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const Fl="modulepreload",Ol=function(i,e){return new URL(i,e).href},To={},kl=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const s=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");r=l(t.map(u=>{if(u=Ol(u,n),u in To)return;To[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(n)for(let x=s.length-1;x>=0;x--){const v=s[x];if(v.href===u&&(!d||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":Fl,d||(p.as="script"),p.crossOrigin="",p.href=u,c&&p.setAttribute("nonce",c),document.head.appendChild(p),d)return new Promise((x,v)=>{p.addEventListener("load",x),p.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return r.then(s=>{for(const o of s||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};var Pi;(function(i){i.Unimplemented="UNIMPLEMENTED",i.Unavailable="UNAVAILABLE"})(Pi||(Pi={}));class ua extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}}const Bl=i=>{var e,t;return i?.androidBridge?"android":!((t=(e=i?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},Vl=i=>{const e=i.CapacitorCustomPlatform||null,t=i.Capacitor||{},n=t.Plugins=t.Plugins||{},r=()=>e!==null?e.name:Bl(i),a=()=>r()!=="web",s=d=>{const h=l.get(d);return!!(h?.platforms.has(r())||o(d))},o=d=>{var h;return(h=t.PluginHeaders)===null||h===void 0?void 0:h.find(p=>p.name===d)},c=d=>i.console.error(d),l=new Map,u=(d,h={})=>{const p=l.get(d);if(p)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),p.proxy;const x=r(),v=o(d);let m;const f=async()=>(!m&&x in h?m=typeof h[x]=="function"?m=await h[x]():m=h[x]:e!==null&&!m&&"web"in h&&(m=typeof h.web=="function"?m=await h.web():m=h.web),m),T=(D,y)=>{var _,L;if(v){const N=v?.methods.find(B=>y===B.name);if(N)return N.rtype==="promise"?B=>t.nativePromise(d,y.toString(),B):(B,H)=>t.nativeCallback(d,y.toString(),B,H);if(D)return(_=D[y])===null||_===void 0?void 0:_.bind(D)}else{if(D)return(L=D[y])===null||L===void 0?void 0:L.bind(D);throw new ua(`"${d}" plugin is not implemented on ${x}`,Pi.Unimplemented)}},E=D=>{let y;const _=(...L)=>{const N=f().then(B=>{const H=T(B,D);if(H){const j=H(...L);return y=j?.remove,j}else throw new ua(`"${d}.${D}()" is not implemented on ${x}`,Pi.Unimplemented)});return D==="addListener"&&(N.remove=async()=>y()),N};return _.toString=()=>`${D.toString()}() { [capacitor code] }`,Object.defineProperty(_,"name",{value:D,writable:!1,configurable:!1}),_},S=E("addListener"),A=E("removeListener"),b=(D,y)=>{const _=S({eventName:D},y),L=async()=>{const B=await _;A({eventName:D,callbackId:B},y)},N=new Promise(B=>_.then(()=>B({remove:L})));return N.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await L()},N},P=new Proxy({},{get(D,y){switch(y){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return v?b:S;case"removeListener":return A;default:return E(y)}}});return n[d]=P,l.set(d,{name:d,proxy:P,platforms:new Set([...Object.keys(h),...v?[x]:[]])}),P};return t.convertFileSrc||(t.convertFileSrc=d=>d),t.getPlatform=r,t.handleError=c,t.isNativePlatform=a,t.isPluginAvailable=s,t.registerPlugin=u,t.Exception=ua,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},Gl=i=>i.Capacitor=Vl(i),Kr=Gl(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Xs=Kr.registerPlugin;class qs{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);const a=this.windowListeners[e];a&&!a.registered&&this.addWindowListener(a),n&&this.sendRetainedArgumentsForEvent(e);const s=async()=>this.removeListener(e,t);return Promise.resolve({remove:s})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){const r=this.listeners[e];if(!r){if(n){let a=this.retainedEventArguments[e];a||(a=[]),a.push(t),this.retainedEventArguments[e]=a}return}r.forEach(a=>a(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:n=>{this.notifyListeners(t,n)}}}unimplemented(e="not implemented"){return new Kr.Exception(e,Pi.Unimplemented)}unavailable(e="not available"){return new Kr.Exception(e,Pi.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const r=n.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(n=>{this.notifyListeners(e,n)}))}}const Ao=i=>encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Co=i=>i.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Hl extends qs{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(n=>{if(n.length<=0)return;let[r,a]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Co(r).trim(),a=Co(a).trim(),t[r]=a}),t}async setCookie(e){try{const t=Ao(e.key),n=Ao(e.value),r=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",a=(e.path||"/").replace("path=",""),s=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${n||""}${r}; path=${a}; ${s};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Xs("CapacitorCookies",{web:()=>new Hl});const Wl=async i=>new Promise((e,t)=>{const n=new FileReader;n.onload=()=>{const r=n.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},n.onerror=r=>t(r),n.readAsDataURL(i)}),Xl=(i={})=>{const e=Object.keys(i);return Object.keys(i).map(r=>r.toLocaleLowerCase()).reduce((r,a,s)=>(r[a]=i[e[s]],r),{})},ql=(i,e=!0)=>i?Object.entries(i).reduce((n,r)=>{const[a,s]=r;let o,c;return Array.isArray(s)?(c="",s.forEach(l=>{o=e?encodeURIComponent(l):l,c+=`${a}=${o}&`}),c.slice(0,-1)):(o=e?encodeURIComponent(s):s,c=`${a}=${o}`),`${n}&${c}`},"").substr(1):null,jl=(i,e={})=>{const t=Object.assign({method:i.method||"GET",headers:i.headers},e),r=Xl(i.headers)["content-type"]||"";if(typeof i.data=="string")t.body=i.data;else if(r.includes("application/x-www-form-urlencoded")){const a=new URLSearchParams;for(const[s,o]of Object.entries(i.data||{}))a.set(s,o);t.body=a.toString()}else if(r.includes("multipart/form-data")||i.data instanceof FormData){const a=new FormData;if(i.data instanceof FormData)i.data.forEach((o,c)=>{a.append(c,o)});else for(const o of Object.keys(i.data))a.append(o,i.data[o]);t.body=a;const s=new Headers(t.headers);s.delete("content-type"),t.headers=s}else(r.includes("application/json")||typeof i.data=="object")&&(t.body=JSON.stringify(i.data));return t};class Yl extends qs{async request(e){const t=jl(e,e.webFetchExtra),n=ql(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,a=await fetch(r,t),s=a.headers.get("content-type")||"";let{responseType:o="text"}=a.ok?e:{};s.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await a.blob(),c=await Wl(l);break;case"json":c=await a.json();break;default:c=await a.text()}const u={};return a.headers.forEach((d,h)=>{u[h]=d}),{data:c,headers:u,status:a.status,url:a.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Xs("CapacitorHttp",{web:()=>new Yl});var Ro;(function(i){i.Dark="DARK",i.Light="LIGHT",i.Default="DEFAULT"})(Ro||(Ro={}));var Po;(function(i){i.StatusBar="StatusBar",i.NavigationBar="NavigationBar"})(Po||(Po={}));class $l extends qs{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Xs("SystemBars",{web:()=>new $l});const js="181",Kl=0,Lo=1,Zl=2,Bc=1,Jl=2,mn=3,yn=0,Pt=1,sn=2,vn=0,Ci=1,Ai=2,Do=3,Uo=4,Ql=5,jn=100,eu=101,tu=102,nu=103,iu=104,ru=200,au=201,su=202,ou=203,$a=204,Ka=205,cu=206,lu=207,uu=208,du=209,hu=210,fu=211,pu=212,mu=213,xu=214,Za=0,Ja=1,Qa=2,Li=3,es=4,ts=5,ns=6,is=7,Vc=0,gu=1,_u=2,Nn=0,vu=1,Mu=2,yu=3,bu=4,Su=5,Eu=6,wu=7,Gc=300,Di=301,Ui=302,rs=303,as=304,ia=306,ss=1e3,gn=1001,os=1002,Vt=1003,Tu=1004,vr=1005,jt=1006,da=1007,Jn=1008,bn=1009,Hc=1010,Wc=1011,nr=1012,Ys=1013,ti=1014,_n=1015,Fi=1016,$s=1017,Ks=1018,ir=1020,Xc=35902,qc=35899,jc=1021,Yc=1022,tn=1023,rr=1026,ar=1027,$c=1028,Zs=1029,Js=1030,Qs=1031,eo=1033,Xr=33776,qr=33777,jr=33778,Yr=33779,cs=35840,ls=35841,us=35842,ds=35843,hs=36196,fs=37492,ps=37496,ms=37808,xs=37809,gs=37810,_s=37811,vs=37812,Ms=37813,ys=37814,bs=37815,Ss=37816,Es=37817,ws=37818,Ts=37819,As=37820,Cs=37821,Rs=36492,Ps=36494,Ls=36495,Ds=36283,Us=36284,Is=36285,Ns=36286,Au=3200,Cu=3201,Ru=0,Pu=1,Dn="",It="srgb",Ii="srgb-linear",Zr="linear",et="srgb",ci=7680,Io=519,Lu=512,Du=513,Uu=514,Kc=515,Iu=516,Nu=517,zu=518,Fu=519,No=35044,zo="300 es",on=2e3,Jr=2001;function Zc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ou(){const i=sr("canvas");return i.style.display="block",i}const Fo={};function Oo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Oe(...i){const e="THREE."+i.shift();console.warn(e,...i)}function ut(...i){const e="THREE."+i.shift();console.error(e,...i)}function or(...i){const e=i.join(" ");e in Fo||(Fo[e]=!0,Oe(...i))}function ku(i,e,t){return new Promise(function(n,r){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}class Oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const St=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ko=1234567;const $i=Math.PI/180,cr=180/Math.PI;function ki(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(St[i&255]+St[i>>8&255]+St[i>>16&255]+St[i>>24&255]+"-"+St[e&255]+St[e>>8&255]+"-"+St[e>>16&15|64]+St[e>>24&255]+"-"+St[t&63|128]+St[t>>8&255]+"-"+St[t>>16&255]+St[t>>24&255]+St[n&255]+St[n>>8&255]+St[n>>16&255]+St[n>>24&255]).toLowerCase()}function He(i,e,t){return Math.max(e,Math.min(t,i))}function to(i,e){return(i%e+e)%e}function Bu(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Vu(i,e,t){return i!==e?(t-i)/(e-i):0}function Ki(i,e,t){return(1-t)*i+t*e}function Gu(i,e,t,n){return Ki(i,e,1-Math.exp(-t*n))}function Hu(i,e=1){return e-Math.abs(to(i,e*2)-e)}function Wu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Xu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function qu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ju(i,e){return i+Math.random()*(e-i)}function Yu(i){return i*(.5-Math.random())}function $u(i){i!==void 0&&(ko=i);let e=ko+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ku(i){return i*$i}function Zu(i){return i*cr}function Ju(i){return(i&i-1)===0&&i!==0}function Qu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ed(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function td(i,e,t,n,r){const a=Math.cos,s=Math.sin,o=a(t/2),c=s(t/2),l=a((e+n)/2),u=s((e+n)/2),d=a((e-n)/2),h=s((e-n)/2),p=a((n-e)/2),x=s((n-e)/2);switch(r){case"XYX":i.set(o*u,c*d,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*x,c*p,o*l);break;case"YXY":i.set(c*p,o*u,c*x,o*l);break;case"ZYZ":i.set(c*x,c*p,o*u,o*l);break;default:Oe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ei(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Mt={DEG2RAD:$i,RAD2DEG:cr,generateUUID:ki,clamp:He,euclideanModulo:to,mapLinear:Bu,inverseLerp:Vu,lerp:Ki,damp:Gu,pingpong:Hu,smoothstep:Wu,smootherstep:Xu,randInt:qu,randFloat:ju,randFloatSpread:Yu,seededRandom:$u,degToRad:Ku,radToDeg:Zu,isPowerOfTwo:Ju,ceilPowerOfTwo:Qu,floorPowerOfTwo:ed,setQuaternionFromProperEuler:td,normalize:Ct,denormalize:Ei};class De{constructor(e=0,t=0){De.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*n-s*r+e.x,this.y=a*r+s*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ur{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,s,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=a[s+0],p=a[s+1],x=a[s+2],v=a[s+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=h,e[t+1]=p,e[t+2]=x,e[t+3]=v;return}if(d!==v||c!==h||l!==p||u!==x){let m=c*h+l*p+u*x+d*v;m<0&&(h=-h,p=-p,x=-x,v=-v,m=-m);let f=1-o;if(m<.9995){const T=Math.acos(m),E=Math.sin(T);f=Math.sin(f*T)/E,o=Math.sin(o*T)/E,c=c*f+h*o,l=l*f+p*o,u=u*f+x*o,d=d*f+v*o}else{c=c*f+h*o,l=l*f+p*o,u=u*f+x*o,d=d*f+v*o;const T=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=T,l*=T,u*=T,d*=T}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,a,s){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=a[s],h=a[s+1],p=a[s+2],x=a[s+3];return e[t]=o*x+u*d+c*p-l*h,e[t+1]=c*x+u*h+l*d-o*p,e[t+2]=l*x+u*p+o*h-c*d,e[t+3]=u*x-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(a/2),h=c(n/2),p=c(r/2),x=c(a/2);switch(s){case"XYZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"YXZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"ZXY":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"ZYX":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"YZX":this._x=h*u*d+l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d-h*p*x;break;case"XZY":this._x=h*u*d-l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d+h*p*x;break;default:Oe("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(a-l)*p,this._z=(s-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+s)/p,this._z=(a+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(a-l)/p,this._x=(r+s)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(s-r)/p,this._x=(a+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(He(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+s*o+r*l-a*c,this._y=r*u+s*c+a*o-n*l,this._z=a*u+s*l+n*c-r*o,this._w=s*u-n*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*n),u=2*(o*t-a*r),d=2*(a*n-s*t);return this.x=t+c*l+s*d-o*u,this.y=n+c*u+o*l-a*d,this.z=r+c*d+a*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-n*c,this.z=n*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ha.copy(this).projectOnVector(e),this.sub(ha)}reflect(e){return this.sub(ha.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(He(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ha=new I,Bo=new ur;class Ve{constructor(e,t,n,r,a,s,o,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,c,l)}set(e,t,n,r,a,s,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=n,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],x=n[8],v=r[0],m=r[3],f=r[6],T=r[1],E=r[4],S=r[7],A=r[2],b=r[5],P=r[8];return a[0]=s*v+o*T+c*A,a[3]=s*m+o*E+c*b,a[6]=s*f+o*S+c*P,a[1]=l*v+u*T+d*A,a[4]=l*m+u*E+d*b,a[7]=l*f+u*S+d*P,a[2]=h*v+p*T+x*A,a[5]=h*m+p*E+x*b,a[8]=h*f+p*S+x*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*o*l-n*a*u+n*o*c+r*a*l-r*s*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*s-o*l,h=o*c-u*a,p=l*a-s*c,x=t*d+n*h+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return e[0]=d*v,e[1]=(r*l-u*n)*v,e[2]=(o*n-r*s)*v,e[3]=h*v,e[4]=(u*t-r*c)*v,e[5]=(r*a-o*t)*v,e[6]=p*v,e[7]=(n*c-l*t)*v,e[8]=(s*t-n*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,s,o){const c=Math.cos(a),l=Math.sin(a);return this.set(n*c,n*l,-n*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(fa.makeScale(e,t)),this}rotate(e){return this.premultiply(fa.makeRotation(-e)),this}translate(e,t){return this.premultiply(fa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const fa=new Ve,Vo=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Go=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function nd(){const i={enabled:!0,workingColorSpace:Ii,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===et&&(r.r=Mn(r.r),r.g=Mn(r.g),r.b=Mn(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===et&&(r.r=Ri(r.r),r.g=Ri(r.g),r.b=Ri(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Dn?Zr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return or("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return or("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ii]:{primaries:e,whitePoint:n,transfer:Zr,toXYZ:Vo,fromXYZ:Go,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:It},outputColorSpaceConfig:{drawingBufferColorSpace:It}},[It]:{primaries:e,whitePoint:n,transfer:et,toXYZ:Vo,fromXYZ:Go,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:It}}}),i}const $e=nd();function Mn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ri(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let li;class id{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{li===void 0&&(li=sr("canvas")),li.width=e.width,li.height=e.height;const r=li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=sr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Mn(a[s]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Mn(t[n]/255)*255):t[n]=Mn(t[n]);return{data:t,width:e.width,height:e.height}}else return Oe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let rd=0;class no{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=ki(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(pa(r[s].image)):a.push(pa(r[s]))}else a=pa(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function pa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?id.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Oe("Texture: Unable to serialize Texture."),{})}let ad=0;const ma=new I;class Tt extends Oi{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,n=gn,r=gn,a=jt,s=Jn,o=tn,c=bn,l=Tt.DEFAULT_ANISOTROPY,u=Dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=ki(),this.name="",this.source=new no(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new De(0,0),this.repeat=new De(1,1),this.center=new De(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(ma).x}get height(){return this.source.getSize(ma).y}get depth(){return this.source.getSize(ma).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Oe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ss:e.x=e.x-Math.floor(e.x);break;case gn:e.x=e.x<0?0:1;break;case os:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ss:e.y=e.y-Math.floor(e.y);break;case gn:e.y=e.y<0?0:1;break;case os:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Gc;Tt.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,n=0,r=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*n+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*n+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*n+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],x=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(l+1)/2,S=(p+1)/2,A=(f+1)/2,b=(u+h)/4,P=(d+v)/4,D=(x+m)/4;return E>S&&E>A?E<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(E),r=b/n,a=P/n):S>A?S<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(S),n=b/r,a=D/r):A<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(A),n=P/a,r=D/a),this.set(n,r,a,t),this}let T=Math.sqrt((m-x)*(m-x)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(T)<.001&&(T=1),this.x=(m-x)/T,this.y=(d-v)/T,this.z=(h-u)/T,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=He(this.x,e.x,t.x),this.y=He(this.y,e.y,t.y),this.z=He(this.z,e.z,t.z),this.w=He(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=He(this.x,e,t),this.y=He(this.y,e,t),this.z=He(this.z,e,t),this.w=He(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(He(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class sd extends Oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const r={width:e,height:t,depth:n.depth},a=new Tt(r);this.textures=[];const s=n.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new no(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends sd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Jc extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class od extends Tt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dr{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Kt):Kt.fromBufferAttribute(a,s),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Mr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mr.copy(n.boundingBox)),Mr.applyMatrix4(e.matrixWorld),this.union(Mr)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),yr.subVectors(this.max,Gi),ui.subVectors(e.a,Gi),di.subVectors(e.b,Gi),hi.subVectors(e.c,Gi),Tn.subVectors(di,ui),An.subVectors(hi,di),Bn.subVectors(ui,hi);let t=[0,-Tn.z,Tn.y,0,-An.z,An.y,0,-Bn.z,Bn.y,Tn.z,0,-Tn.x,An.z,0,-An.x,Bn.z,0,-Bn.x,-Tn.y,Tn.x,0,-An.y,An.x,0,-Bn.y,Bn.x,0];return!xa(t,ui,di,hi,yr)||(t=[1,0,0,0,1,0,0,0,1],!xa(t,ui,di,hi,yr))?!1:(br.crossVectors(Tn,An),t=[br.x,br.y,br.z],xa(t,ui,di,hi,yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ln=[new I,new I,new I,new I,new I,new I,new I,new I],Kt=new I,Mr=new dr,ui=new I,di=new I,hi=new I,Tn=new I,An=new I,Bn=new I,Gi=new I,yr=new I,br=new I,Vn=new I;function xa(i,e,t,n,r){for(let a=0,s=i.length-3;a<=s;a+=3){Vn.fromArray(i,a);const o=r.x*Math.abs(Vn.x)+r.y*Math.abs(Vn.y)+r.z*Math.abs(Vn.z),c=e.dot(Vn),l=t.dot(Vn),u=n.dot(Vn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const cd=new dr,Hi=new I,ga=new I;class hr{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cd.setFromPoints(e).getCenter(n);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hi.subVectors(e,this.center);const t=Hi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Hi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ga.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hi.copy(e.center).add(ga)),this.expandByPoint(Hi.copy(e.center).sub(ga))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const un=new I,_a=new I,Sr=new I,Cn=new I,va=new I,Er=new I,Ma=new I;class io{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(un.copy(this.origin).addScaledVector(this.direction,t),un.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){_a.copy(e).add(t).multiplyScalar(.5),Sr.copy(t).sub(e).normalize(),Cn.copy(this.origin).sub(_a);const a=e.distanceTo(t)*.5,s=-this.direction.dot(Sr),o=Cn.dot(this.direction),c=-Cn.dot(Sr),l=Cn.lengthSq(),u=Math.abs(1-s*s);let d,h,p,x;if(u>0)if(d=s*c-o,h=s*o-c,x=a*u,d>=0)if(h>=-x)if(h<=x){const v=1/u;d*=v,h*=v,p=d*(d+s*h+2*o)+h*(s*d+h+2*c)+l}else h=a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h=-a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-x?(d=Math.max(0,-(-s*a+o)),h=d>0?-a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l):h<=x?(d=0,h=Math.min(Math.max(-a,-c),a),p=h*(h+2*c)+l):(d=Math.max(0,-(s*a+o)),h=d>0?a:Math.min(Math.max(-a,-c),a),p=-d*d+h*(h+2*c)+l);else h=s>0?-a:a,d=Math.max(0,-(s*h+o)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(_a).addScaledVector(Sr,h),p}intersectSphere(e,t){un.subVectors(e.center,this.origin);const n=un.dot(this.direction),r=un.dot(un)-n*n,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=n-s,c=n+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,s,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(a=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),n>s||a>r||((a>n||isNaN(n))&&(n=a),(s<r||isNaN(r))&&(r=s),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,un)!==null}intersectTriangle(e,t,n,r,a){va.subVectors(t,e),Er.subVectors(n,e),Ma.crossVectors(va,Er);let s=this.direction.dot(Ma),o;if(s>0){if(r)return null;o=1}else if(s<0)o=-1,s=-s;else return null;Cn.subVectors(this.origin,e);const c=o*this.direction.dot(Er.crossVectors(Cn,Er));if(c<0)return null;const l=o*this.direction.dot(va.cross(Cn));if(l<0||c+l>s)return null;const u=-o*Cn.dot(Ma);return u<0?null:this.at(u/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dt{constructor(e,t,n,r,a,s,o,c,l,u,d,h,p,x,v,m){dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,s,o,c,l,u,d,h,p,x,v,m)}set(e,t,n,r,a,s,o,c,l,u,d,h,p,x,v,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=a,f[5]=s,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=x,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/fi.setFromMatrixColumn(e,0).length(),a=1/fi.setFromMatrixColumn(e,1).length(),s=1/fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*s,t[9]=n[9]*s,t[10]=n[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,s=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=s*u,p=s*d,x=o*u,v=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+x*l,t[5]=h-v*l,t[9]=-o*c,t[2]=v-h*l,t[6]=x+p*l,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,x=l*u,v=l*d;t[0]=h+v*o,t[4]=x*o-p,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-o,t[2]=p*o-x,t[6]=v+h*o,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,x=l*u,v=l*d;t[0]=h-v*o,t[4]=-s*d,t[8]=x+p*o,t[1]=p+x*o,t[5]=s*u,t[9]=v-h*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,p=s*d,x=o*u,v=o*d;t[0]=c*u,t[4]=x*l-p,t[8]=h*l+v,t[1]=c*d,t[5]=v*l+h,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,p=s*l,x=o*c,v=o*l;t[0]=c*u,t[4]=v-h*d,t[8]=x*d+p,t[1]=d,t[5]=s*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+x,t[10]=h-v*d}else if(e.order==="XZY"){const h=s*c,p=s*l,x=o*c,v=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+v,t[5]=s*u,t[9]=p*d-x,t[2]=x*d-p,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ld,e,ud)}lookAt(e,t,n){const r=this.elements;return kt.subVectors(e,t),kt.lengthSq()===0&&(kt.z=1),kt.normalize(),Rn.crossVectors(n,kt),Rn.lengthSq()===0&&(Math.abs(n.z)===1?kt.x+=1e-4:kt.z+=1e-4,kt.normalize(),Rn.crossVectors(n,kt)),Rn.normalize(),wr.crossVectors(kt,Rn),r[0]=Rn.x,r[4]=wr.x,r[8]=kt.x,r[1]=Rn.y,r[5]=wr.y,r[9]=kt.y,r[2]=Rn.z,r[6]=wr.z,r[10]=kt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,s=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],x=n[2],v=n[6],m=n[10],f=n[14],T=n[3],E=n[7],S=n[11],A=n[15],b=r[0],P=r[4],D=r[8],y=r[12],_=r[1],L=r[5],N=r[9],B=r[13],H=r[2],j=r[6],Y=r[10],ae=r[14],X=r[3],re=r[7],te=r[11],Me=r[15];return a[0]=s*b+o*_+c*H+l*X,a[4]=s*P+o*L+c*j+l*re,a[8]=s*D+o*N+c*Y+l*te,a[12]=s*y+o*B+c*ae+l*Me,a[1]=u*b+d*_+h*H+p*X,a[5]=u*P+d*L+h*j+p*re,a[9]=u*D+d*N+h*Y+p*te,a[13]=u*y+d*B+h*ae+p*Me,a[2]=x*b+v*_+m*H+f*X,a[6]=x*P+v*L+m*j+f*re,a[10]=x*D+v*N+m*Y+f*te,a[14]=x*y+v*B+m*ae+f*Me,a[3]=T*b+E*_+S*H+A*X,a[7]=T*P+E*L+S*j+A*re,a[11]=T*D+E*N+S*Y+A*te,a[15]=T*y+E*B+S*ae+A*Me,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],x=e[3],v=e[7],m=e[11],f=e[15];return x*(+a*c*d-r*l*d-a*o*h+n*l*h+r*o*p-n*c*p)+v*(+t*c*p-t*l*h+a*s*h-r*s*p+r*l*u-a*c*u)+m*(+t*l*d-t*o*p-a*s*d+n*s*p+a*o*u-n*l*u)+f*(-r*o*u-t*c*d+t*o*h+r*s*d-n*s*h+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],x=e[12],v=e[13],m=e[14],f=e[15],T=d*m*l-v*h*l+v*c*p-o*m*p-d*c*f+o*h*f,E=x*h*l-u*m*l-x*c*p+s*m*p+u*c*f-s*h*f,S=u*v*l-x*d*l+x*o*p-s*v*p-u*o*f+s*d*f,A=x*d*c-u*v*c-x*o*h+s*v*h+u*o*m-s*d*m,b=t*T+n*E+r*S+a*A;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/b;return e[0]=T*P,e[1]=(v*h*a-d*m*a-v*r*p+n*m*p+d*r*f-n*h*f)*P,e[2]=(o*m*a-v*c*a+v*r*l-n*m*l-o*r*f+n*c*f)*P,e[3]=(d*c*a-o*h*a-d*r*l+n*h*l+o*r*p-n*c*p)*P,e[4]=E*P,e[5]=(u*m*a-x*h*a+x*r*p-t*m*p-u*r*f+t*h*f)*P,e[6]=(x*c*a-s*m*a-x*r*l+t*m*l+s*r*f-t*c*f)*P,e[7]=(s*h*a-u*c*a+u*r*l-t*h*l-s*r*p+t*c*p)*P,e[8]=S*P,e[9]=(x*d*a-u*v*a-x*n*p+t*v*p+u*n*f-t*d*f)*P,e[10]=(s*v*a-x*o*a+x*n*l-t*v*l-s*n*f+t*o*f)*P,e[11]=(u*o*a-s*d*a-u*n*l+t*d*l+s*n*p-t*o*p)*P,e[12]=A*P,e[13]=(u*v*r-x*d*r+x*n*h-t*v*h-u*n*m+t*d*m)*P,e[14]=(x*o*r-s*v*r-x*n*c+t*v*c+s*n*m-t*o*m)*P,e[15]=(s*d*r-u*o*r+u*n*c-t*d*c-s*n*h+t*o*h)*P,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,s=e.x,o=e.y,c=e.z,l=a*s,u=a*o;return this.set(l*s+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*s,0,l*c-r*o,u*c+r*s,a*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,s){return this.set(1,n,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,u=s+s,d=o+o,h=a*l,p=a*u,x=a*d,v=s*u,m=s*d,f=o*d,T=c*l,E=c*u,S=c*d,A=n.x,b=n.y,P=n.z;return r[0]=(1-(v+f))*A,r[1]=(p+S)*A,r[2]=(x-E)*A,r[3]=0,r[4]=(p-S)*b,r[5]=(1-(h+f))*b,r[6]=(m+T)*b,r[7]=0,r[8]=(x+E)*P,r[9]=(m-T)*P,r[10]=(1-(h+v))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let a=fi.set(r[0],r[1],r[2]).length();const s=fi.set(r[4],r[5],r[6]).length(),o=fi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Zt.copy(this);const l=1/a,u=1/s,d=1/o;return Zt.elements[0]*=l,Zt.elements[1]*=l,Zt.elements[2]*=l,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=d,Zt.elements[9]*=d,Zt.elements[10]*=d,t.setFromRotationMatrix(Zt),n.x=a,n.y=s,n.z=o,this}makePerspective(e,t,n,r,a,s,o=on,c=!1){const l=this.elements,u=2*a/(t-e),d=2*a/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let x,v;if(c)x=a/(s-a),v=s*a/(s-a);else if(o===on)x=-(s+a)/(s-a),v=-2*s*a/(s-a);else if(o===Jr)x=-s/(s-a),v=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,a,s,o=on,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),p=-(n+r)/(n-r);let x,v;if(c)x=1/(s-a),v=s/(s-a);else if(o===on)x=-2/(s-a),v=-(s+a)/(s-a);else if(o===Jr)x=-1/(s-a),v=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const fi=new I,Zt=new dt,ld=new I(0,0,0),ud=new I(1,1,1),Rn=new I,wr=new I,kt=new I,Ho=new dt,Wo=new ur;class Sn{constructor(e=0,t=0,n=0,r=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(He(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-He(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(He(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-He(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(He(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-He(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Oe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ho.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ho,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wo.setFromEuler(this),this.setFromQuaternion(Wo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class ro{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let dd=0;const Xo=new I,pi=new ur,dn=new dt,Tr=new I,Wi=new I,hd=new I,fd=new ur,qo=new I(1,0,0),jo=new I(0,1,0),Yo=new I(0,0,1),$o={type:"added"},pd={type:"removed"},mi={type:"childadded",child:null},ya={type:"childremoved",child:null};class zt extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=zt.DEFAULT_UP.clone();const e=new I,t=new Sn,n=new ur,r=new I(1,1,1);function a(){n.setFromEuler(t,!1)}function s(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new Ve}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ro,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(qo,e)}rotateY(e){return this.rotateOnAxis(jo,e)}rotateZ(e){return this.rotateOnAxis(Yo,e)}translateOnAxis(e,t){return Xo.copy(e).applyQuaternion(this.quaternion),this.position.add(Xo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qo,e)}translateY(e){return this.translateOnAxis(jo,e)}translateZ(e){return this.translateOnAxis(Yo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Tr.copy(e):Tr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Wi,Tr,this.up):dn.lookAt(Tr,Wi,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),pi.setFromRotationMatrix(dn),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ut("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($o),mi.child=e,this.dispatchEvent(mi),mi.child=null):ut("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(pd),ya.child=e,this.dispatchEvent(ya),ya.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($o),mi.child=e,this.dispatchEvent(mi),mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,e,hd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,fd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),p=s(e.animations),x=s(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=r,n;function s(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}zt.DEFAULT_UP=new I(0,1,0);zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jt=new I,hn=new I,ba=new I,fn=new I,xi=new I,gi=new I,Ko=new I,Sa=new I,Ea=new I,wa=new I,Ta=new pt,Aa=new pt,Ca=new pt;class Qt{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jt.subVectors(e,t),r.cross(Jt);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){Jt.subVectors(r,t),hn.subVectors(n,t),ba.subVectors(e,t);const s=Jt.dot(Jt),o=Jt.dot(hn),c=Jt.dot(ba),l=hn.dot(hn),u=hn.dot(ba),d=s*l-o*o;if(d===0)return a.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,x=(s*u-o*c)*h;return a.set(1-p-x,x,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(e,t,n,r,a,s,o,c){return this.getBarycoord(e,t,n,r,fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,fn.x),c.addScaledVector(s,fn.y),c.addScaledVector(o,fn.z),c)}static getInterpolatedAttribute(e,t,n,r,a,s){return Ta.setScalar(0),Aa.setScalar(0),Ca.setScalar(0),Ta.fromBufferAttribute(e,t),Aa.fromBufferAttribute(e,n),Ca.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Ta,a.x),s.addScaledVector(Aa,a.y),s.addScaledVector(Ca,a.z),s}static isFrontFacing(e,t,n,r){return Jt.subVectors(n,t),hn.subVectors(e,t),Jt.cross(hn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Jt.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Qt.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let s,o;xi.subVectors(r,n),gi.subVectors(a,n),Sa.subVectors(e,n);const c=xi.dot(Sa),l=gi.dot(Sa);if(c<=0&&l<=0)return t.copy(n);Ea.subVectors(e,r);const u=xi.dot(Ea),d=gi.dot(Ea);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(n).addScaledVector(xi,s);wa.subVectors(e,a);const p=xi.dot(wa),x=gi.dot(wa);if(x>=0&&p<=x)return t.copy(a);const v=p*l-c*x;if(v<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(gi,o);const m=u*x-p*d;if(m<=0&&d-u>=0&&p-x>=0)return Ko.subVectors(a,r),o=(d-u)/(d-u+(p-x)),t.copy(r).addScaledVector(Ko,o);const f=1/(m+v+h);return s=v*f,o=h*f,t.copy(n).addScaledVector(xi,s).addScaledVector(gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Qc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pn={h:0,s:0,l:0},Ar={h:0,s:0,l:0};function Ra(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=$e.workingColorSpace){if(e=to(e,1),t=He(t,0,1),n=He(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,s=2*n-a;this.r=Ra(s,a,e+1/3),this.g=Ra(s,a,e),this.b=Ra(s,a,e-1/3)}return $e.colorSpaceToWorking(this,r),this}setStyle(e,t=It){function n(a){a!==void 0&&parseFloat(a)<1&&Oe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Oe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);Oe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const n=Qc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Oe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mn(e.r),this.g=Mn(e.g),this.b=Mn(e.b),this}copyLinearToSRGB(e){return this.r=Ri(e.r),this.g=Ri(e.g),this.b=Ri(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return $e.workingToColorSpace(Et.copy(this),e),Math.round(He(Et.r*255,0,255))*65536+Math.round(He(Et.g*255,0,255))*256+Math.round(He(Et.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.workingToColorSpace(Et.copy(this),t);const n=Et.r,r=Et.g,a=Et.b,s=Math.max(n,r,a),o=Math.min(n,r,a);let c,l;const u=(o+s)/2;if(o===s)c=0,l=0;else{const d=s-o;switch(l=u<=.5?d/(s+o):d/(2-s-o),s){case n:c=(r-a)/d+(r<a?6:0);break;case r:c=(a-n)/d+2;break;case a:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=$e.workingColorSpace){return $e.workingToColorSpace(Et.copy(this),t),e.r=Et.r,e.g=Et.g,e.b=Et.b,e}getStyle(e=It){$e.workingToColorSpace(Et.copy(this),e);const t=Et.r,n=Et.g,r=Et.b;return e!==It?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Pn),this.setHSL(Pn.h+e,Pn.s+t,Pn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Pn),e.getHSL(Ar);const n=Ki(Pn.h,Ar.h,t),r=Ki(Pn.s,Ar.s,t),a=Ki(Pn.l,Ar.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Et=new Ke;Ke.NAMES=Qc;let md=0;class fr extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=Ci,this.side=yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=$a,this.blendDst=Ka,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Li,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Io,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Oe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Oe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ci&&(n.blending=this.blending),this.side!==yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==$a&&(n.blendSrc=this.blendSrc),this.blendDst!==Ka&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Li&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Io&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(n.textures=a),s.length>0&&(n.images=s)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Yn extends fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new I,Cr=new De;let xd=0;class Yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:xd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=No,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cr.fromBufferAttribute(this,t),Cr.applyMatrix3(e),this.setXY(t,Cr.x,Cr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array),a=Ct(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==No&&(e.usage=this.usage),e}}class el extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tl extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ht extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let gd=0;const Xt=new dt,Pa=new zt,_i=new I,Bt=new dr,Xi=new dr,vt=new I;class Lt extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zc(e)?tl:el)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ve().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return Pa.lookAt(e),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];n.push(s.x,s.y,s.z||0)}this.setAttribute("position",new ht(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&Oe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];Bt.setFromBufferAttribute(a),this.morphTargetsRelative?(vt.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(vt),vt.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(vt)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(vt.addVectors(Bt.min,Xi.min),Bt.expandByPoint(vt),vt.addVectors(Bt.max,Xi.max),Bt.expandByPoint(vt)):(Bt.expandByPoint(Xi.min),Bt.expandByPoint(Xi.max))}Bt.getCenter(n);let r=0;for(let a=0,s=e.count;a<s;a++)vt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(vt));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)vt.fromBufferAttribute(o,l),c&&(_i.fromBufferAttribute(e,l),vt.add(_i)),r=Math.max(r,n.distanceToSquared(vt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));const s=this.getAttribute("tangent"),o=[],c=[];for(let D=0;D<n.count;D++)o[D]=new I,c[D]=new I;const l=new I,u=new I,d=new I,h=new De,p=new De,x=new De,v=new I,m=new I;function f(D,y,_){l.fromBufferAttribute(n,D),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,_),h.fromBufferAttribute(a,D),p.fromBufferAttribute(a,y),x.fromBufferAttribute(a,_),u.sub(l),d.sub(l),p.sub(h),x.sub(h);const L=1/(p.x*x.y-x.x*p.y);isFinite(L)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(L),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(L),o[D].add(v),o[y].add(v),o[_].add(v),c[D].add(m),c[y].add(m),c[_].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let D=0,y=T.length;D<y;++D){const _=T[D],L=_.start,N=_.count;for(let B=L,H=L+N;B<H;B+=3)f(e.getX(B+0),e.getX(B+1),e.getX(B+2))}const E=new I,S=new I,A=new I,b=new I;function P(D){A.fromBufferAttribute(r,D),b.copy(A);const y=o[D];E.copy(y),E.sub(A.multiplyScalar(A.dot(y))).normalize(),S.crossVectors(b,y);const L=S.dot(c[D])<0?-1:1;s.setXYZW(D,E.x,E.y,E.z,L)}for(let D=0,y=T.length;D<y;++D){const _=T[D],L=_.start,N=_.count;for(let B=L,H=L+N;B<H;B+=3)P(e.getX(B+0)),P(e.getX(B+1)),P(e.getX(B+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new I,a=new I,s=new I,o=new I,c=new I,l=new I,u=new I,d=new I;if(e)for(let h=0,p=e.count;h<p;h+=3){const x=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,v),s.fromBufferAttribute(t,m),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vt.fromBufferAttribute(e,t),vt.normalize(),e.setXYZ(t,vt.x,vt.y,vt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,x=0;for(let v=0,m=c.length;v<m;v++){o.isInterleavedBufferAttribute?p=c[v]*o.data.stride+o.offset:p=c[v]*u;for(let f=0;f<u;f++)h[x++]=l[p++]}return new Yt(h,u,d)}if(this.index===null)return Oe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const a=e.morphAttributes;for(const l in a){const u=[],d=a[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zo=new dt,Gn=new io,Rr=new hr,Jo=new I,Pr=new I,Lr=new I,Dr=new I,La=new I,Ur=new I,Qo=new I,Ir=new I;class bt extends zt{constructor(e=new Lt,t=new Yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,s=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){Ur.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const u=o[c],d=a[c];u!==0&&(La.fromBufferAttribute(d,e),s?Ur.addScaledVector(La,u):Ur.addScaledVector(La.sub(t),u))}t.add(Ur)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(a),Gn.copy(e.ray).recast(e.near),!(Rr.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(Rr,Jo)===null||Gn.origin.distanceToSquared(Jo)>(e.far-e.near)**2))&&(Zo.copy(a).invert(),Gn.copy(e.ray).applyMatrix4(Zo),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let x=0,v=h.length;x<v;x++){const m=h[x],f=s[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=T,A=E;S<A;S+=3){const b=o.getX(S),P=o.getX(S+1),D=o.getX(S+2);r=Nr(this,f,e,n,l,u,d,b,P,D),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=x,f=v;m<f;m+=3){const T=o.getX(m),E=o.getX(m+1),S=o.getX(m+2);r=Nr(this,s,e,n,l,u,d,T,E,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let x=0,v=h.length;x<v;x++){const m=h[x],f=s[m.materialIndex],T=Math.max(m.start,p.start),E=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let S=T,A=E;S<A;S+=3){const b=S,P=S+1,D=S+2;r=Nr(this,f,e,n,l,u,d,b,P,D),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=x,f=v;m<f;m+=3){const T=m,E=m+1,S=m+2;r=Nr(this,s,e,n,l,u,d,T,E,S),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function _d(i,e,t,n,r,a,s,o){let c;if(e.side===Pt?c=n.intersectTriangle(s,a,r,!0,o):c=n.intersectTriangle(r,a,s,e.side===yn,o),c===null)return null;Ir.copy(o),Ir.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ir);return l<t.near||l>t.far?null:{distance:l,point:Ir.clone(),object:i}}function Nr(i,e,t,n,r,a,s,o,c,l){i.getVertexPosition(o,Pr),i.getVertexPosition(c,Lr),i.getVertexPosition(l,Dr);const u=_d(i,e,t,n,Pr,Lr,Dr,Qo);if(u){const d=new I;Qt.getBarycoord(Qo,Pr,Lr,Dr,d),r&&(u.uv=Qt.getInterpolatedAttribute(r,o,c,l,d,new De)),a&&(u.uv1=Qt.getInterpolatedAttribute(a,o,c,l,d,new De)),s&&(u.normal=Qt.getInterpolatedAttribute(s,o,c,l,d,new I),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new I,materialIndex:0};Qt.getNormal(Pr,Lr,Dr,h.normal),u.face=h,u.barycoord=d}return u}class pr extends Lt{constructor(e=1,t=1,n=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],l=[],u=[],d=[];let h=0,p=0;x("z","y","x",-1,-1,n,t,e,s,a,0),x("z","y","x",1,-1,n,t,-e,s,a,1),x("x","z","y",1,1,e,n,t,r,s,2),x("x","z","y",1,-1,e,n,-t,r,s,3),x("x","y","z",1,-1,e,t,n,r,a,4),x("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(c),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2));function x(v,m,f,T,E,S,A,b,P,D,y){const _=S/P,L=A/D,N=S/2,B=A/2,H=b/2,j=P+1,Y=D+1;let ae=0,X=0;const re=new I;for(let te=0;te<Y;te++){const Me=te*L-B;for(let Ne=0;Ne<j;Ne++){const We=Ne*_-N;re[v]=We*T,re[m]=Me*E,re[f]=H,l.push(re.x,re.y,re.z),re[v]=0,re[m]=0,re[f]=b>0?1:-1,u.push(re.x,re.y,re.z),d.push(Ne/P),d.push(1-te/D),ae+=1}}for(let te=0;te<D;te++)for(let Me=0;Me<P;Me++){const Ne=h+Me+j*te,We=h+Me+j*(te+1),Q=h+(Me+1)+j*(te+1),je=h+(Me+1)+j*te;c.push(Ne,We,je),c.push(We,Q,je),X+=6}o.addGroup(p,X,y),p+=X,h+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ni(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Oe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=Ni(i[t]);for(const r in n)e[r]=n[r]}return e}function vd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function nl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const Md={clone:Ni,merge:Rt};var yd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,bd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gt extends fr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yd,this.fragmentShader=bd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ni(e.uniforms),this.uniformsGroups=vd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class il extends zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=on,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ln=new I,ec=new De,tc=new De;class qt extends il{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=cr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($i*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return cr*2*Math.atan(Math.tan($i*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ln.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ln.x,Ln.y).multiplyScalar(-e/Ln.z),Ln.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ln.x,Ln.y).multiplyScalar(-e/Ln.z)}getViewSize(e,t){return this.getViewBounds(e,ec,tc),t.subVectors(tc,ec)}setViewOffset(e,t,n,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($i*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*n/l,r*=s.width/c,n*=s.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vi=-90,Mi=1;class Sd extends zt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new qt(vi,Mi,e,t);r.layers=this.layers,this.add(r);const a=new qt(vi,Mi,e,t);a.layers=this.layers,this.add(a);const s=new qt(vi,Mi,e,t);s.layers=this.layers,this.add(s);const o=new qt(vi,Mi,e,t);o.layers=this.layers,this.add(o);const c=new qt(vi,Mi,e,t);c.layers=this.layers,this.add(c);const l=new qt(vi,Mi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,s,o,c]=t;for(const l of t)this.remove(l);if(e===on)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Jr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,s),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class rl extends Tt{constructor(e=[],t=Di,n,r,a,s,o,c,l,u){super(e,t,n,r,a,s,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ed extends ni{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new rl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pr(5,5,5),a=new Gt({name:"CubemapFromEquirect",uniforms:Ni(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:vn});a.uniforms.tEquirect.value=t;const s=new bt(r,a),o=t.minFilter;return t.minFilter===Jn&&(t.minFilter=jt),new Sd(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,n,r);e.setRenderTarget(a)}}class Un extends zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wd={type:"move"};class Da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,x=.005;l.inputState.pinching&&h>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wd)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Td extends zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Ad extends Tt{constructor(e=null,t=1,n=1,r,a,s,o,c,l=Vt,u=Vt,d,h){super(null,s,o,c,l,u,r,a,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ua=new I,Cd=new I,Rd=new Ve;class qn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ua.subVectors(n,t).cross(Cd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ua),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Rd.getNormalMatrix(e),r=this.coplanarPoint(Ua).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new hr,Pd=new De(.5,.5),zr=new I;class al{constructor(e=new qn,t=new qn,n=new qn,r=new qn,a=new qn,s=new qn){this.planes=[e,t,n,r,a,s]}set(e,t,n,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=on,n=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],l=a[3],u=a[4],d=a[5],h=a[6],p=a[7],x=a[8],v=a[9],m=a[10],f=a[11],T=a[12],E=a[13],S=a[14],A=a[15];if(r[0].setComponents(l-s,p-u,f-x,A-T).normalize(),r[1].setComponents(l+s,p+u,f+x,A+T).normalize(),r[2].setComponents(l+o,p+d,f+v,A+E).normalize(),r[3].setComponents(l-o,p-d,f-v,A-E).normalize(),n)r[4].setComponents(c,h,m,S).normalize(),r[5].setComponents(l-c,p-h,f-m,A-S).normalize();else if(r[4].setComponents(l-c,p-h,f-m,A-S).normalize(),t===on)r[5].setComponents(l+c,p+h,f+m,A+S).normalize();else if(t===Jr)r[5].setComponents(c,h,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){Hn.center.set(0,0,0);const t=Pd.distanceTo(e.center);return Hn.radius=.7071067811865476+t,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(zr.x=r.normal.x>0?e.max.x:e.min.x,zr.y=r.normal.y>0?e.max.y:e.min.y,zr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class sl extends fr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const nc=new dt,zs=new io,Fr=new hr,Or=new I;class Ld extends zt{constructor(e=new Lt,t=new sl){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,s=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(r),Fr.radius+=a,e.ray.intersectsSphere(Fr)===!1)return;nc.copy(r).invert(),zs.copy(e.ray).applyMatrix4(nc);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const h=Math.max(0,s.start),p=Math.min(l.count,s.start+s.count);for(let x=h,v=p;x<v;x++){const m=l.getX(x);Or.fromBufferAttribute(d,m),ic(Or,m,c,r,e,t,this)}}else{const h=Math.max(0,s.start),p=Math.min(d.count,s.start+s.count);for(let x=h,v=p;x<v;x++)Or.fromBufferAttribute(d,x),ic(Or,x,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function ic(i,e,t,n,r,a,s){const o=zs.distanceSqToPoint(i);if(o<t){const c=new I;zs.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;a.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class ol extends Tt{constructor(e,t,n=ti,r,a,s,o=Vt,c=Vt,l,u=rr,d=1){if(u!==rr&&u!==ar)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,a,s,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new no(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class cl extends Tt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ao extends Lt{constructor(e=1,t=1,n=1,r=32,a=1,s=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),a=Math.floor(a);const u=[],d=[],h=[],p=[];let x=0;const v=[],m=n/2;let f=0;T(),s===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(p,2));function T(){const S=new I,A=new I;let b=0;const P=(t-e)/n;for(let D=0;D<=a;D++){const y=[],_=D/a,L=_*(t-e)+e;for(let N=0;N<=r;N++){const B=N/r,H=B*c+o,j=Math.sin(H),Y=Math.cos(H);A.x=L*j,A.y=-_*n+m,A.z=L*Y,d.push(A.x,A.y,A.z),S.set(j,P,Y).normalize(),h.push(S.x,S.y,S.z),p.push(B,1-_),y.push(x++)}v.push(y)}for(let D=0;D<r;D++)for(let y=0;y<a;y++){const _=v[y][D],L=v[y+1][D],N=v[y+1][D+1],B=v[y][D+1];(e>0||y!==0)&&(u.push(_,L,B),b+=3),(t>0||y!==a-1)&&(u.push(L,N,B),b+=3)}l.addGroup(f,b,0),f+=b}function E(S){const A=x,b=new De,P=new I;let D=0;const y=S===!0?e:t,_=S===!0?1:-1;for(let N=1;N<=r;N++)d.push(0,m*_,0),h.push(0,_,0),p.push(.5,.5),x++;const L=x;for(let N=0;N<=r;N++){const H=N/r*c+o,j=Math.cos(H),Y=Math.sin(H);P.x=y*Y,P.y=m*_,P.z=y*j,d.push(P.x,P.y,P.z),h.push(0,_,0),b.x=j*.5+.5,b.y=Y*.5*_+.5,p.push(b.x,b.y),x++}for(let N=0;N<r;N++){const B=A+N,H=L+N;S===!0?u.push(H,H+1,B):u.push(H+1,H,B),D+=3}l.addGroup(f,D,S===!0?1:2),f+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Oe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)n=this.getPoint(s/e),a+=n.distanceTo(r),t.push(a),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const a=n.length;let s;t?s=t:s=e*n[a-1];let o=0,c=a-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=n[r]-s,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===s)return r/(a-1);const u=n[r],h=n[r+1]-u,p=(s-u)/h;return(r+p)/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);const s=this.getPoint(r),o=this.getPoint(a),c=t||(s.isVector2?new De:new I);return c.copy(o).sub(s).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new I,r=[],a=[],s=[],o=new I,c=new dt;for(let p=0;p<=e;p++){const x=p/e;r[p]=this.getTangentAt(x,new I)}a[0]=new I,s[0]=new I;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),h<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),a[0].crossVectors(r[0],o),s[0].crossVectors(r[0],a[0]);for(let p=1;p<=e;p++){if(a[p]=a[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const x=Math.acos(He(r[p-1].dot(r[p]),-1,1));a[p].applyMatrix4(c.makeRotationAxis(o,x))}s[p].crossVectors(r[p],a[p])}if(t===!0){let p=Math.acos(He(a[0].dot(a[e]),-1,1));p/=e,r[0].dot(o.crossVectors(a[0],a[e]))>0&&(p=-p);for(let x=1;x<=e;x++)a[x].applyMatrix4(c.makeRotationAxis(r[x],p*x)),s[x].crossVectors(r[x],a[x])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class ll extends wn{constructor(e=0,t=0,n=1,r=1,a=0,s=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new De){const n=t,r=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(s?a=0:a=r),this.aClockwise===!0&&!s&&(a===r?a=-r:a=a-r);const o=this.aStartAngle+e*a;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,p=l-this.aY;c=h*u-p*d+this.aX,l=h*d+p*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Dd extends ll{constructor(e,t,n,r,a,s){super(e,t,n,n,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}}function so(){let i=0,e=0,t=0,n=0;function r(a,s,o,c){i=a,e=o,t=-3*a+3*s-2*o-c,n=2*a-2*s+o+c}return{initCatmullRom:function(a,s,o,c,l){r(s,o,l*(o-a),l*(c-s))},initNonuniformCatmullRom:function(a,s,o,c,l,u,d){let h=(s-a)/l-(o-a)/(l+u)+(o-s)/u,p=(o-s)/u-(c-s)/(u+d)+(c-o)/d;h*=u,p*=u,r(s,o,h,p)},calc:function(a){const s=a*a,o=s*a;return i+e*a+t*s+n*o}}}const kr=new I,Ia=new so,Na=new so,za=new so;class ul extends wn{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new I){const n=t,r=this.points,a=r.length,s=(a-(this.closed?0:1))*e;let o=Math.floor(s),c=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:c===0&&o===a-1&&(o=a-2,c=1);let l,u;this.closed||o>0?l=r[(o-1)%a]:(kr.subVectors(r[0],r[1]).add(r[0]),l=kr);const d=r[o%a],h=r[(o+1)%a];if(this.closed||o+2<a?u=r[(o+2)%a]:(kr.subVectors(r[a-1],r[a-2]).add(r[a-1]),u=kr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(d),p),v=Math.pow(d.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);v<1e-4&&(v=1),x<1e-4&&(x=v),m<1e-4&&(m=v),Ia.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,x,v,m),Na.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,x,v,m),za.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,x,v,m)}else this.curveType==="catmullrom"&&(Ia.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),Na.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),za.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return n.set(Ia.calc(c),Na.calc(c),za.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new I().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function rc(i,e,t,n,r){const a=(n-e)*.5,s=(r-t)*.5,o=i*i,c=i*o;return(2*t-2*n+a+s)*c+(-3*t+3*n-2*a-s)*o+a*i+t}function Ud(i,e){const t=1-i;return t*t*e}function Id(i,e){return 2*(1-i)*i*e}function Nd(i,e){return i*i*e}function Zi(i,e,t,n){return Ud(i,e)+Id(i,t)+Nd(i,n)}function zd(i,e){const t=1-i;return t*t*t*e}function Fd(i,e){const t=1-i;return 3*t*t*i*e}function Od(i,e){return 3*(1-i)*i*i*e}function kd(i,e){return i*i*i*e}function Ji(i,e,t,n,r){return zd(i,e)+Fd(i,t)+Od(i,n)+kd(i,r)}class Bd extends wn{constructor(e=new De,t=new De,n=new De,r=new De){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new De){const n=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return n.set(Ji(e,r.x,a.x,s.x,o.x),Ji(e,r.y,a.y,s.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Vd extends wn{constructor(e=new I,t=new I,n=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new I){const n=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return n.set(Ji(e,r.x,a.x,s.x,o.x),Ji(e,r.y,a.y,s.y,o.y),Ji(e,r.z,a.z,s.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Gd extends wn{constructor(e=new De,t=new De){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new De){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new De){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Hd extends wn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Wd extends wn{constructor(e=new De,t=new De,n=new De){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new De){const n=t,r=this.v0,a=this.v1,s=this.v2;return n.set(Zi(e,r.x,a.x,s.x),Zi(e,r.y,a.y,s.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class dl extends wn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,r=this.v0,a=this.v1,s=this.v2;return n.set(Zi(e,r.x,a.x,s.x),Zi(e,r.y,a.y,s.y),Zi(e,r.z,a.z,s.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xd extends wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new De){const n=t,r=this.points,a=(r.length-1)*e,s=Math.floor(a),o=a-s,c=r[s===0?s:s-1],l=r[s],u=r[s>r.length-2?r.length-1:s+1],d=r[s>r.length-3?r.length-1:s+2];return n.set(rc(o,c.x,l.x,u.x,d.x),rc(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new De().fromArray(r))}return this}}var qd=Object.freeze({__proto__:null,ArcCurve:Dd,CatmullRomCurve3:ul,CubicBezierCurve:Bd,CubicBezierCurve3:Vd,EllipseCurve:ll,LineCurve:Gd,LineCurve3:Hd,QuadraticBezierCurve:Wd,QuadraticBezierCurve3:dl,SplineCurve:Xd});class ra extends Lt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],x=[],v=[],m=[];for(let f=0;f<u;f++){const T=f*h-s;for(let E=0;E<l;E++){const S=E*d-a;x.push(S,-T,0),v.push(0,0,1),m.push(E/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let T=0;T<o;T++){const E=T+l*f,S=T+l*(f+1),A=T+1+l*(f+1),b=T+1+l*f;p.push(E,S,b),p.push(S,A,b)}this.setIndex(p),this.setAttribute("position",new ht(x,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ra(e.width,e.height,e.widthSegments,e.heightSegments)}}class oo extends Lt{constructor(e=.5,t=1,n=32,r=1,a=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:a,thetaLength:s},n=Math.max(3,n),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/r,p=new I,x=new De;for(let v=0;v<=r;v++){for(let m=0;m<=n;m++){const f=a+m/n*s;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,u.push(x.x,x.y)}d+=h}for(let v=0;v<r;v++){const m=v*(n+1);for(let f=0;f<n;f++){const T=f+m,E=T,S=T+n+1,A=T+n+2,b=T+1;o.push(E,S,b),o.push(S,A,b)}}this.setIndex(o),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class $n extends Lt{constructor(e=1,t=32,n=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(s+o,Math.PI);let l=0;const u=[],d=new I,h=new I,p=[],x=[],v=[],m=[];for(let f=0;f<=n;f++){const T=[],E=f/n;let S=0;f===0&&s===0?S=.5/t:f===n&&c===Math.PI&&(S=-.5/t);for(let A=0;A<=t;A++){const b=A/t;d.x=-e*Math.cos(r+b*a)*Math.sin(s+E*o),d.y=e*Math.cos(s+E*o),d.z=e*Math.sin(r+b*a)*Math.sin(s+E*o),x.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),m.push(b+S,1-E),T.push(l++)}u.push(T)}for(let f=0;f<n;f++)for(let T=0;T<t;T++){const E=u[f][T+1],S=u[f][T],A=u[f+1][T],b=u[f+1][T+1];(f!==0||s>0)&&p.push(E,S,b),(f!==n-1||c<Math.PI)&&p.push(S,A,b)}this.setIndex(p),this.setAttribute("position",new ht(x,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class co extends Lt{constructor(e=new dl(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,r=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:a};const s=e.computeFrenetFrames(t,a);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;const o=new I,c=new I,l=new De;let u=new I;const d=[],h=[],p=[],x=[];v(),this.setIndex(x),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(p,2));function v(){for(let E=0;E<t;E++)m(E);m(a===!1?t:0),T(),f()}function m(E){u=e.getPointAt(E/t,u);const S=s.normals[E],A=s.binormals[E];for(let b=0;b<=r;b++){const P=b/r*Math.PI*2,D=Math.sin(P),y=-Math.cos(P);c.x=y*S.x+D*A.x,c.y=y*S.y+D*A.y,c.z=y*S.z+D*A.z,c.normalize(),h.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,d.push(o.x,o.y,o.z)}}function f(){for(let E=1;E<=t;E++)for(let S=1;S<=r;S++){const A=(r+1)*(E-1)+(S-1),b=(r+1)*E+(S-1),P=(r+1)*E+S,D=(r+1)*(E-1)+S;x.push(A,b,D),x.push(b,P,D)}}function T(){for(let E=0;E<=t;E++)for(let S=0;S<=r;S++)l.x=E/t,l.y=S/r,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new co(new qd[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class jd extends fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Au,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Yd extends fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Fa={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class $d{constructor(e,t,n){const r=this;let a=!1,s=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,a===!1&&r.onStart!==void 0&&r.onStart(u,s,o),a=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const p=l[d],x=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Kd=new $d;class lo{constructor(e){this.manager=e!==void 0?e:Kd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,a){n.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}lo.DEFAULT_MATERIAL_NAME="__DEFAULT";const yi=new WeakMap;class Zd extends lo{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,s=Fa.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)a.manager.itemStart(e),setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0);else{let d=yi.get(s);d===void 0&&(d=[],yi.set(s,d)),d.push({onLoad:t,onError:r})}return s}const o=sr("img");function c(){u(),t&&t(this);const d=yi.get(this)||[];for(let h=0;h<d.length;h++){const p=d[h];p.onLoad&&p.onLoad(this)}yi.delete(this),a.manager.itemEnd(e)}function l(d){u(),r&&r(d),Fa.remove(`image:${e}`);const h=yi.get(this)||[];for(let p=0;p<h.length;p++){const x=h[p];x.onError&&x.onError(d)}yi.delete(this),a.manager.itemError(e),a.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Fa.add(`image:${e}`,o),a.manager.itemStart(e),o.src=e,o}}class hl extends lo{constructor(e){super(e)}load(e,t,n,r){const a=new Tt,s=new Zd(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},n,r),a}}class Jd extends il{constructor(e=-1,t=1,n=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,s=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Qd extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class eh{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const ac=new dt;class th{constructor(e,t,n=0,r=1/0){this.ray=new io(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new ro,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ut("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ac.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ac),this}intersectObject(e,t=!0,n=[]){return Fs(e,this,n,t),n.sort(sc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)Fs(e[r],this,n,t);return n.sort(sc),n}}function sc(i,e){return i.distance-e.distance}function Fs(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let s=0,o=a.length;s<o;s++)Fs(a[s],e,t,!0)}}class Br{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=He(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(He(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}function oc(i,e,t,n){const r=nh(n);switch(t){case jc:return i*e;case $c:return i*e/r.components*r.byteLength;case Zs:return i*e/r.components*r.byteLength;case Js:return i*e*2/r.components*r.byteLength;case Qs:return i*e*2/r.components*r.byteLength;case Yc:return i*e*3/r.components*r.byteLength;case tn:return i*e*4/r.components*r.byteLength;case eo:return i*e*4/r.components*r.byteLength;case Xr:case qr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case jr:case Yr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ls:case ds:return Math.max(i,16)*Math.max(e,8)/4;case cs:case us:return Math.max(i,8)*Math.max(e,8)/2;case hs:case fs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ps:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ms:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xs:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case gs:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case _s:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case vs:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ms:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ys:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case bs:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ss:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Es:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ws:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ts:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case As:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Cs:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Rs:case Ps:case Ls:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ds:case Us:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Is:case Ns:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function nh(i){switch(i){case bn:case Hc:return{byteLength:1,components:1};case nr:case Wc:case Fi:return{byteLength:2,components:1};case $s:case Ks:return{byteLength:2,components:4};case ti:case Ys:case _n:return{byteLength:4,components:1};case Xc:case qc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:js}}));typeof window<"u"&&(window.__THREE__?Oe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=js);function fl(){let i=null,e=!1,t=null,n=null;function r(a,s){t(a,s),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function ih(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,x)=>p.start-x.start);let h=0;for(let p=1;p<d.length;p++){const x=d[h],v=d[p];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++h,d[h]=v)}d.length=h+1;for(let p=0,x=d.length;p<x;p++){const v=d[p];i.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}var rh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ah=`#ifdef USE_ALPHAHASH
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
#endif`,sh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,oh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ch=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uh=`#ifdef USE_AOMAP
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
#endif`,dh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hh=`#ifdef USE_BATCHING
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
#endif`,fh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ph=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gh=`#ifdef USE_IRIDESCENCE
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
#endif`,_h=`#ifdef USE_BUMPMAP
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
#endif`,vh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sh=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Eh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Th=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ah=`#define PI 3.141592653589793
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
} // validated`,Ch=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Rh=`vec3 transformedNormal = objectNormal;
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
#endif`,Ph=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Dh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Uh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ih="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nh=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,zh=`#ifdef USE_ENVMAP
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
#endif`,Fh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Oh=`#ifdef USE_ENVMAP
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
#endif`,kh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bh=`#ifdef USE_ENVMAP
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
#endif`,Vh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xh=`#ifdef USE_GRADIENTMAP
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
}`,qh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,jh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$h=`uniform bool receiveShadow;
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
#endif`,Kh=`#ifdef USE_ENVMAP
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
#endif`,Zh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ef=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
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
#endif`,nf=`uniform sampler2D dfgLUT;
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
}`,rf=`
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
#endif`,af=`#if defined( RE_IndirectDiffuse )
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
#endif`,sf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,of=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,df=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,hf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ff=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pf=`#if defined( USE_POINTS_UV )
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
#endif`,mf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_f=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Mf=`#ifdef USE_MORPHTARGETS
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
#endif`,yf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Sf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Af=`#ifdef USE_NORMALMAP
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
#endif`,Cf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Df=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Uf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,If=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ff=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Of=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Hf=`float getShadowMask() {
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
}`,Wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xf=`#ifdef USE_SKINNING
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
#endif`,qf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jf=`#ifdef USE_SKINNING
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
#endif`,Yf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$f=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jf=`#ifdef USE_TRANSMISSION
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
#endif`,Qf=`#ifdef USE_TRANSMISSION
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
#endif`,ep=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,np=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ip=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ap=`uniform sampler2D t2D;
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
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,op=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`#include <common>
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
}`,dp=`#if DEPTH_PACKING == 3200
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
}`,hp=`#define DISTANCE
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
}`,fp=`#define DISTANCE
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
}`,pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xp=`uniform float scale;
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
}`,gp=`uniform vec3 diffuse;
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
}`,_p=`#include <common>
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
}`,vp=`uniform vec3 diffuse;
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
}`,Mp=`#define LAMBERT
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
}`,yp=`#define LAMBERT
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
}`,bp=`#define MATCAP
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
}`,Sp=`#define MATCAP
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
}`,Ep=`#define NORMAL
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
}`,wp=`#define NORMAL
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
}`,Tp=`#define PHONG
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
}`,Ap=`#define PHONG
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
}`,Cp=`#define STANDARD
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
}`,Rp=`#define STANDARD
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
}`,Pp=`#define TOON
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
}`,Lp=`#define TOON
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
}`,Dp=`uniform float size;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Ip=`#include <common>
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
}`,Np=`uniform vec3 color;
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
}`,zp=`uniform float rotation;
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
}`,Fp=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:rh,alphahash_pars_fragment:ah,alphamap_fragment:sh,alphamap_pars_fragment:oh,alphatest_fragment:ch,alphatest_pars_fragment:lh,aomap_fragment:uh,aomap_pars_fragment:dh,batching_pars_vertex:hh,batching_vertex:fh,begin_vertex:ph,beginnormal_vertex:mh,bsdfs:xh,iridescence_fragment:gh,bumpmap_pars_fragment:_h,clipping_planes_fragment:vh,clipping_planes_pars_fragment:Mh,clipping_planes_pars_vertex:yh,clipping_planes_vertex:bh,color_fragment:Sh,color_pars_fragment:Eh,color_pars_vertex:wh,color_vertex:Th,common:Ah,cube_uv_reflection_fragment:Ch,defaultnormal_vertex:Rh,displacementmap_pars_vertex:Ph,displacementmap_vertex:Lh,emissivemap_fragment:Dh,emissivemap_pars_fragment:Uh,colorspace_fragment:Ih,colorspace_pars_fragment:Nh,envmap_fragment:zh,envmap_common_pars_fragment:Fh,envmap_pars_fragment:Oh,envmap_pars_vertex:kh,envmap_physical_pars_fragment:Kh,envmap_vertex:Bh,fog_vertex:Vh,fog_pars_vertex:Gh,fog_fragment:Hh,fog_pars_fragment:Wh,gradientmap_pars_fragment:Xh,lightmap_pars_fragment:qh,lights_lambert_fragment:jh,lights_lambert_pars_fragment:Yh,lights_pars_begin:$h,lights_toon_fragment:Zh,lights_toon_pars_fragment:Jh,lights_phong_fragment:Qh,lights_phong_pars_fragment:ef,lights_physical_fragment:tf,lights_physical_pars_fragment:nf,lights_fragment_begin:rf,lights_fragment_maps:af,lights_fragment_end:sf,logdepthbuf_fragment:of,logdepthbuf_pars_fragment:cf,logdepthbuf_pars_vertex:lf,logdepthbuf_vertex:uf,map_fragment:df,map_pars_fragment:hf,map_particle_fragment:ff,map_particle_pars_fragment:pf,metalnessmap_fragment:mf,metalnessmap_pars_fragment:xf,morphinstance_vertex:gf,morphcolor_vertex:_f,morphnormal_vertex:vf,morphtarget_pars_vertex:Mf,morphtarget_vertex:yf,normal_fragment_begin:bf,normal_fragment_maps:Sf,normal_pars_fragment:Ef,normal_pars_vertex:wf,normal_vertex:Tf,normalmap_pars_fragment:Af,clearcoat_normal_fragment_begin:Cf,clearcoat_normal_fragment_maps:Rf,clearcoat_pars_fragment:Pf,iridescence_pars_fragment:Lf,opaque_fragment:Df,packing:Uf,premultiplied_alpha_fragment:If,project_vertex:Nf,dithering_fragment:zf,dithering_pars_fragment:Ff,roughnessmap_fragment:Of,roughnessmap_pars_fragment:kf,shadowmap_pars_fragment:Bf,shadowmap_pars_vertex:Vf,shadowmap_vertex:Gf,shadowmask_pars_fragment:Hf,skinbase_vertex:Wf,skinning_pars_vertex:Xf,skinning_vertex:qf,skinnormal_vertex:jf,specularmap_fragment:Yf,specularmap_pars_fragment:$f,tonemapping_fragment:Kf,tonemapping_pars_fragment:Zf,transmission_fragment:Jf,transmission_pars_fragment:Qf,uv_pars_fragment:ep,uv_pars_vertex:tp,uv_vertex:np,worldpos_vertex:ip,background_vert:rp,background_frag:ap,backgroundCube_vert:sp,backgroundCube_frag:op,cube_vert:cp,cube_frag:lp,depth_vert:up,depth_frag:dp,distanceRGBA_vert:hp,distanceRGBA_frag:fp,equirect_vert:pp,equirect_frag:mp,linedashed_vert:xp,linedashed_frag:gp,meshbasic_vert:_p,meshbasic_frag:vp,meshlambert_vert:Mp,meshlambert_frag:yp,meshmatcap_vert:bp,meshmatcap_frag:Sp,meshnormal_vert:Ep,meshnormal_frag:wp,meshphong_vert:Tp,meshphong_frag:Ap,meshphysical_vert:Cp,meshphysical_frag:Rp,meshtoon_vert:Pp,meshtoon_frag:Lp,points_vert:Dp,points_frag:Up,shadow_vert:Ip,shadow_frag:Np,sprite_vert:zp,sprite_frag:Fp},pe={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new De(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new De(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},an={basic:{uniforms:Rt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Rt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Rt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Rt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Rt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Rt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Rt([pe.points,pe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Rt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Rt([pe.common,pe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Rt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Rt([pe.sprite,pe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:Rt([pe.common,pe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:Rt([pe.lights,pe.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};an.physical={uniforms:Rt([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new De(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new De},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new De},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Vr={r:0,b:0,g:0},Wn=new Sn,Op=new dt;function kp(i,e,t,n,r,a,s){const o=new Ke(0);let c=a===!0?0:1,l,u,d=null,h=0,p=null;function x(E){let S=E.isScene===!0?E.background:null;return S&&S.isTexture&&(S=(E.backgroundBlurriness>0?t:e).get(S)),S}function v(E){let S=!1;const A=x(E);A===null?f(o,c):A&&A.isColor&&(f(A,1),S=!0);const b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,s):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(E,S){const A=x(S);A&&(A.isCubeTexture||A.mapping===ia)?(u===void 0&&(u=new bt(new pr(1,1,1),new Gt({name:"BackgroundCubeMaterial",uniforms:Ni(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,P,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Wn.copy(S.backgroundRotation),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Op.makeRotationFromEuler(Wn)),u.material.toneMapped=$e.getTransfer(A.colorSpace)!==et,(d!==A||h!==A.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=A,h=A.version,p=i.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new bt(new ra(2,2),new Gt({name:"BackgroundMaterial",uniforms:Ni(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=$e.getTransfer(A.colorSpace)!==et,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(d!==A||h!==A.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=A,h=A.version,p=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function f(E,S){E.getRGB(Vr,nl(i)),n.buffers.color.setClear(Vr.r,Vr.g,Vr.b,S,s)}function T(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),c=S,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,f(o,c)},render:v,addToRenderList:m,dispose:T}}function Bp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let a=r,s=!1;function o(_,L,N,B,H){let j=!1;const Y=d(B,N,L);a!==Y&&(a=Y,l(a.object)),j=p(_,B,N,H),j&&x(_,B,N,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,S(_,L,N,B),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function c(){return i.createVertexArray()}function l(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function d(_,L,N){const B=N.wireframe===!0;let H=n[_.id];H===void 0&&(H={},n[_.id]=H);let j=H[L.id];j===void 0&&(j={},H[L.id]=j);let Y=j[B];return Y===void 0&&(Y=h(c()),j[B]=Y),Y}function h(_){const L=[],N=[],B=[];for(let H=0;H<t;H++)L[H]=0,N[H]=0,B[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:B,object:_,attributes:{},index:null}}function p(_,L,N,B){const H=a.attributes,j=L.attributes;let Y=0;const ae=N.getAttributes();for(const X in ae)if(ae[X].location>=0){const te=H[X];let Me=j[X];if(Me===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(Me=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(Me=_.instanceColor)),te===void 0||te.attribute!==Me||Me&&te.data!==Me.data)return!0;Y++}return a.attributesNum!==Y||a.index!==B}function x(_,L,N,B){const H={},j=L.attributes;let Y=0;const ae=N.getAttributes();for(const X in ae)if(ae[X].location>=0){let te=j[X];te===void 0&&(X==="instanceMatrix"&&_.instanceMatrix&&(te=_.instanceMatrix),X==="instanceColor"&&_.instanceColor&&(te=_.instanceColor));const Me={};Me.attribute=te,te&&te.data&&(Me.data=te.data),H[X]=Me,Y++}a.attributes=H,a.attributesNum=Y,a.index=B}function v(){const _=a.newAttributes;for(let L=0,N=_.length;L<N;L++)_[L]=0}function m(_){f(_,0)}function f(_,L){const N=a.newAttributes,B=a.enabledAttributes,H=a.attributeDivisors;N[_]=1,B[_]===0&&(i.enableVertexAttribArray(_),B[_]=1),H[_]!==L&&(i.vertexAttribDivisor(_,L),H[_]=L)}function T(){const _=a.newAttributes,L=a.enabledAttributes;for(let N=0,B=L.length;N<B;N++)L[N]!==_[N]&&(i.disableVertexAttribArray(N),L[N]=0)}function E(_,L,N,B,H,j,Y){Y===!0?i.vertexAttribIPointer(_,L,N,H,j):i.vertexAttribPointer(_,L,N,B,H,j)}function S(_,L,N,B){v();const H=B.attributes,j=N.getAttributes(),Y=L.defaultAttributeValues;for(const ae in j){const X=j[ae];if(X.location>=0){let re=H[ae];if(re===void 0&&(ae==="instanceMatrix"&&_.instanceMatrix&&(re=_.instanceMatrix),ae==="instanceColor"&&_.instanceColor&&(re=_.instanceColor)),re!==void 0){const te=re.normalized,Me=re.itemSize,Ne=e.get(re);if(Ne===void 0)continue;const We=Ne.buffer,Q=Ne.type,je=Ne.bytesPerElement,$=Q===i.INT||Q===i.UNSIGNED_INT||re.gpuType===Ys;if(re.isInterleavedBufferAttribute){const J=re.data,ge=J.stride,Ae=re.offset;if(J.isInstancedInterleavedBuffer){for(let me=0;me<X.locationSize;me++)f(X.location+me,J.meshPerAttribute);_.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let me=0;me<X.locationSize;me++)m(X.location+me);i.bindBuffer(i.ARRAY_BUFFER,We);for(let me=0;me<X.locationSize;me++)E(X.location+me,Me/X.locationSize,Q,te,ge*je,(Ae+Me/X.locationSize*me)*je,$)}else{if(re.isInstancedBufferAttribute){for(let J=0;J<X.locationSize;J++)f(X.location+J,re.meshPerAttribute);_.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let J=0;J<X.locationSize;J++)m(X.location+J);i.bindBuffer(i.ARRAY_BUFFER,We);for(let J=0;J<X.locationSize;J++)E(X.location+J,Me/X.locationSize,Q,te,Me*je,Me/X.locationSize*J*je,$)}}else if(Y!==void 0){const te=Y[ae];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(X.location,te);break;case 3:i.vertexAttrib3fv(X.location,te);break;case 4:i.vertexAttrib4fv(X.location,te);break;default:i.vertexAttrib1fv(X.location,te)}}}}T()}function A(){D();for(const _ in n){const L=n[_];for(const N in L){const B=L[N];for(const H in B)u(B[H].object),delete B[H];delete L[N]}delete n[_]}}function b(_){if(n[_.id]===void 0)return;const L=n[_.id];for(const N in L){const B=L[N];for(const H in B)u(B[H].object),delete B[H];delete L[N]}delete n[_.id]}function P(_){for(const L in n){const N=n[L];if(N[_.id]===void 0)continue;const B=N[_.id];for(const H in B)u(B[H].object),delete B[H];delete N[_.id]}}function D(){y(),s=!0,a!==r&&(a=r,l(a.object))}function y(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:D,resetDefaultState:y,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:m,disableUnusedAttributes:T}}function Vp(i,e,t){let n;function r(l){n=l}function a(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function s(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=u[x];t.update(p,n,1)}function c(l,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<l.length;x++)s(l[x],u[x],h[x]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,d);let x=0;for(let v=0;v<d;v++)x+=u[v]*h[v];t.update(x,n,1)}}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Gp(i,e,t,n){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(P){return!(P!==tn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const D=P===Fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==bn&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==_n&&!D)}function c(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Oe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=x>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:T,maxVaryings:E,maxFragmentUniforms:S,vertexTextures:A,maxSamples:b}}function Hp(i){const e=this;let t=null,n=0,r=!1,a=!1;const s=new qn,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const x=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||x===null||x.length===0||a&&!m)a?u(null):l();else{const T=a?0:n,E=T*4;let S=f.clippingState||null;c.value=S,S=u(x,h,E,p);for(let A=0;A!==E;++A)S[A]=t[A];f.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,x){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=c.value,x!==!0||m===null){const f=p+v*4,T=h.matrixWorldInverse;o.getNormalMatrix(T),(m===null||m.length<f)&&(m=new Float32Array(f));for(let E=0,S=p;E!==v;++E,S+=4)s.copy(d[E]).applyMatrix4(T,o),s.normal.toArray(m,S),m[S+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function Wp(i){let e=new WeakMap;function t(s,o){return o===rs?s.mapping=Di:o===as&&(s.mapping=Ui),s}function n(s){if(s&&s.isTexture){const o=s.mapping;if(o===rs||o===as)if(e.has(s)){const c=e.get(s).texture;return t(c,s.mapping)}else{const c=s.image;if(c&&c.height>0){const l=new Ed(c.height);return l.fromEquirectangularTexture(i,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){const o=s.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:n,dispose:a}}const In=4,cc=[.125,.215,.35,.446,.526,.582],Kn=20,Xp=256,qi=new Jd,lc=new Ke;let Oa=null,ka=0,Ba=0,Va=!1;const qp=new I;class uc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,a={}){const{size:s=256,position:o=qp}=a;Oa=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Oa,ka,Ba),this._renderer.xr.enabled=Va,e.scissorTest=!1,bi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Di||e.mapping===Ui?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Oa=this._renderer.getRenderTarget(),ka=this._renderer.getActiveCubeFace(),Ba=this._renderer.getActiveMipmapLevel(),Va=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Fi,format:tn,colorSpace:Ii,depthBuffer:!1},r=dc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dc(e,t,n);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=jp(a)),this._blurMaterial=$p(a,e,t),this._ggxMaterial=Yp(a,e,t)}return r}_compileMaterial(e){const t=new bt(new Lt,e);this._renderer.compile(t,qi)}_sceneToCubeUV(e,t,n,r,a){const c=new qt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(lc),d.toneMapping=Nn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new bt(new pr,new Yn({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1})));const v=this._backgroundBox,m=v.material;let f=!1;const T=e.background;T?T.isColor&&(m.color.copy(T),e.background=null,f=!0):(m.color.copy(lc),f=!0);for(let E=0;E<6;E++){const S=E%3;S===0?(c.up.set(0,l[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+u[E],a.y,a.z)):S===1?(c.up.set(0,0,l[E]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+u[E],a.z)):(c.up.set(0,l[E],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+u[E]));const A=this._cubeSize;bi(r,S*A,E>2?A:0,A,A),d.setRenderTarget(r),f&&d.render(v,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=T}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Di||e.mapping===Ui;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hc());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;bi(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(s,qi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[n];o.material=s;const c=s.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=.05+l*.95,p=d*h,{_lodMax:x}=this,v=this._sizeLods[n],m=3*v*(n>x-In?n-x+In:0),f=4*(this._cubeSize-v);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=x-t,bi(a,m,f,3*v,2*v),r.setRenderTarget(a),r.render(o,qi),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=x-n,bi(e,m,f,3*v,2*v),r.setRenderTarget(e),r.render(o,qi)}_blur(e,t,n,r,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,n,r,"latitudinal",a),this._halfBlur(s,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,s,o){const c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&ut("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const h=l.uniforms,p=this._sizeLods[n]-1,x=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*Kn-1),v=a/x,m=isFinite(a)?1+Math.floor(u*v):Kn;m>Kn&&Oe(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Kn}`);const f=[];let T=0;for(let P=0;P<Kn;++P){const D=P/v,y=Math.exp(-D*D/2);f.push(y),P===0?T+=y:P<m&&(T+=2*y)}for(let P=0;P<f.length;P++)f[P]=f[P]/T;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=s==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=x,h.mipInt.value=E-n;const S=this._sizeLods[r],A=3*S*(r>E-In?r-E+In:0),b=4*(this._cubeSize-S);bi(t,A,b,3*S,2*S),c.setRenderTarget(t),c.render(d,qi)}}function jp(i){const e=[],t=[],n=[];let r=i;const a=i-In+1+cc.length;for(let s=0;s<a;s++){const o=Math.pow(2,r);e.push(o);let c=1/o;s>i-In?c=cc[s-i+In-1]:s===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,x=6,v=3,m=2,f=1,T=new Float32Array(v*x*p),E=new Float32Array(m*x*p),S=new Float32Array(f*x*p);for(let b=0;b<p;b++){const P=b%3*2/3-1,D=b>2?0:-1,y=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];T.set(y,v*x*b),E.set(h,m*x*b);const _=[b,b,b,b,b,b];S.set(_,f*x*b)}const A=new Lt;A.setAttribute("position",new Yt(T,v)),A.setAttribute("uv",new Yt(E,m)),A.setAttribute("faceIndex",new Yt(S,f)),n.push(new bt(A,null)),r>In&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function dc(i,e,t){const n=new ni(i,e,t);return n.texture.mapping=ia,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function bi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Yp(i,e,t){return new Gt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Xp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:aa(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function $p(i,e,t){const n=new Float32Array(Kn),r=new I(0,1,0);return new Gt({name:"SphericalGaussianBlur",defines:{n:Kn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:aa(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function hc(){return new Gt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:aa(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function fc(){return new Gt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:aa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function aa(){return`

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
	`}function Kp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===rs||c===as,u=c===Di||c===Ui;if(l||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new uc(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new uc(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function a(o){const c=o.target;c.removeEventListener("dispose",a);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:s}}function Zp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&or("WebGLRenderer: "+n+" extension not supported."),r}}}function Jp(i,e,t,n){const r={},a=new WeakMap;function s(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",s),delete r[h.id];const p=a.get(h);p&&(e.remove(p),a.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,x=d.attributes.position;let v=0;if(p!==null){const T=p.array;v=p.version;for(let E=0,S=T.length;E<S;E+=3){const A=T[E+0],b=T[E+1],P=T[E+2];h.push(A,b,b,P,P,A)}}else if(x!==void 0){const T=x.array;v=x.version;for(let E=0,S=T.length/3-1;E<S;E+=3){const A=E+0,b=E+1,P=E+2;h.push(A,b,b,P,P,A)}}else return;const m=new(Zc(h)?tl:el)(h,1);m.version=v;const f=a.get(d);f&&e.remove(f),a.set(d,m)}function u(d){const h=a.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Qp(i,e,t){let n;function r(h){n=h}let a,s;function o(h){a=h.type,s=h.bytesPerElement}function c(h,p){i.drawElements(n,p,a,h*s),t.update(p,n,1)}function l(h,p,x){x!==0&&(i.drawElementsInstanced(n,p,a,h*s,x),t.update(p,n,x))}function u(h,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,a,h,0,x);let m=0;for(let f=0;f<x;f++)m+=p[f];t.update(m,n,1)}function d(h,p,x,v){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/s,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,a,h,0,v,0,x);let f=0;for(let T=0;T<x;T++)f+=p[T]*v[T];t.update(f,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function em(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,s,o){switch(t.calls++,s){case i.TRIANGLES:t.triangles+=o*(a/3);break;case i.LINES:t.lines+=o*(a/2);break;case i.LINE_STRIP:t.lines+=o*(a-1);break;case i.LINE_LOOP:t.lines+=o*a;break;case i.POINTS:t.points+=o*a;break;default:ut("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function tm(i,e,t){const n=new WeakMap,r=new pt;function a(s,o,c){const l=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let y=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",y)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let E=0;p===!0&&(E=1),x===!0&&(E=2),v===!0&&(E=3);let S=o.attributes.position.count*E,A=1;S>e.maxTextureSize&&(A=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const b=new Float32Array(S*A*4*d),P=new Jc(b,S,A,d);P.type=_n,P.needsUpdate=!0;const D=E*4;for(let _=0;_<d;_++){const L=m[_],N=f[_],B=T[_],H=S*A*4*_;for(let j=0;j<L.count;j++){const Y=j*D;p===!0&&(r.fromBufferAttribute(L,j),b[H+Y+0]=r.x,b[H+Y+1]=r.y,b[H+Y+2]=r.z,b[H+Y+3]=0),x===!0&&(r.fromBufferAttribute(N,j),b[H+Y+4]=r.x,b[H+Y+5]=r.y,b[H+Y+6]=r.z,b[H+Y+7]=0),v===!0&&(r.fromBufferAttribute(B,j),b[H+Y+8]=r.x,b[H+Y+9]=r.y,b[H+Y+10]=r.z,b[H+Y+11]=B.itemSize===4?r.w:1)}}h={count:d,texture:P,size:new De(S,A)},n.set(o,h),o.addEventListener("dispose",y)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",s.morphTexture,t);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:a}}function nm(i,e,t,n){let r=new WeakMap;function a(c){const l=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function s(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:a,dispose:s}}const pl=new Tt,pc=new ol(1,1),ml=new Jc,xl=new od,gl=new rl,mc=[],xc=[],gc=new Float32Array(16),_c=new Float32Array(9),vc=new Float32Array(4);function Bi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=mc[r];if(a===void 0&&(a=new Float32Array(r),mc[r]=a),e!==0){n.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,i[s].toArray(a,o)}return a}function gt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function _t(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function sa(i,e){let t=xc[e];t===void 0&&(t=new Int32Array(e),xc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function im(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2fv(this.addr,e),_t(t,e)}}function am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;i.uniform3fv(this.addr,e),_t(t,e)}}function sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4fv(this.addr,e),_t(t,e)}}function om(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;vc.set(n),i.uniformMatrix2fv(this.addr,!1,vc),_t(t,n)}}function cm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;_c.set(n),i.uniformMatrix3fv(this.addr,!1,_c),_t(t,n)}}function lm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;gc.set(n),i.uniformMatrix4fv(this.addr,!1,gc),_t(t,n)}}function um(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2iv(this.addr,e),_t(t,e)}}function hm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3iv(this.addr,e),_t(t,e)}}function fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4iv(this.addr,e),_t(t,e)}}function pm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function mm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;i.uniform2uiv(this.addr,e),_t(t,e)}}function xm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;i.uniform3uiv(this.addr,e),_t(t,e)}}function gm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;i.uniform4uiv(this.addr,e),_t(t,e)}}function _m(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let a;this.type===i.SAMPLER_2D_SHADOW?(pc.compareFunction=Kc,a=pc):a=pl,t.setTexture2D(e||a,r)}function vm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||xl,r)}function Mm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||gl,r)}function ym(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ml,r)}function bm(i){switch(i){case 5126:return im;case 35664:return rm;case 35665:return am;case 35666:return sm;case 35674:return om;case 35675:return cm;case 35676:return lm;case 5124:case 35670:return um;case 35667:case 35671:return dm;case 35668:case 35672:return hm;case 35669:case 35673:return fm;case 5125:return pm;case 36294:return mm;case 36295:return xm;case 36296:return gm;case 35678:case 36198:case 36298:case 36306:case 35682:return _m;case 35679:case 36299:case 36307:return vm;case 35680:case 36300:case 36308:case 36293:return Mm;case 36289:case 36303:case 36311:case 36292:return ym}}function Sm(i,e){i.uniform1fv(this.addr,e)}function Em(i,e){const t=Bi(e,this.size,2);i.uniform2fv(this.addr,t)}function wm(i,e){const t=Bi(e,this.size,3);i.uniform3fv(this.addr,t)}function Tm(i,e){const t=Bi(e,this.size,4);i.uniform4fv(this.addr,t)}function Am(i,e){const t=Bi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Cm(i,e){const t=Bi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Rm(i,e){const t=Bi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Pm(i,e){i.uniform1iv(this.addr,e)}function Lm(i,e){i.uniform2iv(this.addr,e)}function Dm(i,e){i.uniform3iv(this.addr,e)}function Um(i,e){i.uniform4iv(this.addr,e)}function Im(i,e){i.uniform1uiv(this.addr,e)}function Nm(i,e){i.uniform2uiv(this.addr,e)}function zm(i,e){i.uniform3uiv(this.addr,e)}function Fm(i,e){i.uniform4uiv(this.addr,e)}function Om(i,e,t){const n=this.cache,r=e.length,a=sa(t,r);gt(n,a)||(i.uniform1iv(this.addr,a),_t(n,a));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||pl,a[s])}function km(i,e,t){const n=this.cache,r=e.length,a=sa(t,r);gt(n,a)||(i.uniform1iv(this.addr,a),_t(n,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||xl,a[s])}function Bm(i,e,t){const n=this.cache,r=e.length,a=sa(t,r);gt(n,a)||(i.uniform1iv(this.addr,a),_t(n,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||gl,a[s])}function Vm(i,e,t){const n=this.cache,r=e.length,a=sa(t,r);gt(n,a)||(i.uniform1iv(this.addr,a),_t(n,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||ml,a[s])}function Gm(i){switch(i){case 5126:return Sm;case 35664:return Em;case 35665:return wm;case 35666:return Tm;case 35674:return Am;case 35675:return Cm;case 35676:return Rm;case 5124:case 35670:return Pm;case 35667:case 35671:return Lm;case 35668:case 35672:return Dm;case 35669:case 35673:return Um;case 5125:return Im;case 36294:return Nm;case 36295:return zm;case 36296:return Fm;case 35678:case 36198:case 36298:case 36306:case 35682:return Om;case 35679:case 36299:case 36307:return km;case 35680:case 36300:case 36308:case 36293:return Bm;case 36289:case 36303:case 36311:case 36292:return Vm}}class Hm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=bm(t.type)}}class Wm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Gm(t.type)}}class Xm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],n)}}}const Ga=/(\w+)(\])?(\[|\.)?/g;function Mc(i,e){i.seq.push(e),i.map[e.id]=e}function qm(i,e,t){const n=i.name,r=n.length;for(Ga.lastIndex=0;;){const a=Ga.exec(n),s=Ga.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){Mc(t,l===void 0?new Hm(o,i,e):new Wm(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Xm(o),Mc(t,d)),t=d}}}class $r{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r),s=e.getUniformLocation(t,a.name);qm(a,s,this)}}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&n.push(s)}return n}}function yc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const jm=37297;let Ym=0;function $m(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;n.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return n.join(`
`)}const bc=new Ve;function Km(i){$e._getMatrix(bc,$e.workingColorSpace,i);const e=`mat3( ${bc.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(i)){case Zr:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Oe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Sc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),a=(i.getShaderInfoLog(e)||"").trim();if(n&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+$m(i.getShaderSource(e),o)}else return a}function Zm(i,e){const t=Km(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Jm(i,e){let t;switch(e){case vu:t="Linear";break;case Mu:t="Reinhard";break;case yu:t="Cineon";break;case bu:t="ACESFilmic";break;case Eu:t="AgX";break;case wu:t="Neutral";break;case Su:t="Custom";break;default:Oe("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new I;function Qm(){$e.getLuminanceCoefficients(Gr);const i=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function e0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ji).join(`
`)}function t0(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function n0(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=i.getActiveAttrib(e,r),s=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:i.getAttribLocation(e,s),locationSize:o}}return t}function ji(i){return i!==""}function Ec(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const i0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Os(i){return i.replace(i0,a0)}const r0=new Map;function a0(i,e){let t=Ge[e];if(t===void 0){const n=r0.get(e);if(n!==void 0)t=Ge[n],Oe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Os(t)}const s0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tc(i){return i.replace(s0,o0)}function o0(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Ac(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function c0(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Bc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Jl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mn&&(e="SHADOWMAP_TYPE_VSM"),e}function l0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Di:case Ui:e="ENVMAP_TYPE_CUBE";break;case ia:e="ENVMAP_TYPE_CUBE_UV";break}return e}function u0(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Ui&&(e="ENVMAP_MODE_REFRACTION"),e}function d0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Vc:e="ENVMAP_BLENDING_MULTIPLY";break;case gu:e="ENVMAP_BLENDING_MIX";break;case _u:e="ENVMAP_BLENDING_ADD";break}return e}function h0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function f0(i,e,t,n){const r=i.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=c0(t),l=l0(t),u=u0(t),d=d0(t),h=h0(t),p=e0(t),x=t0(a),v=r.createProgram();let m,f,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ji).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(ji).join(`
`),f.length>0&&(f+=`
`)):(m=[Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ji).join(`
`),f=[Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Nn?Jm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Zm("linearToOutputTexel",t.outputColorSpace),Qm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ji).join(`
`)),s=Os(s),s=Ec(s,t),s=wc(s,t),o=Os(o),o=Ec(o,t),o=wc(o,t),s=Tc(s),o=Tc(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===zo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const E=T+m+s,S=T+f+o,A=yc(r,r.VERTEX_SHADER,E),b=yc(r,r.FRAGMENT_SHADER,S);r.attachShader(v,A),r.attachShader(v,b),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function P(L){if(i.debug.checkShaderErrors){const N=r.getProgramInfoLog(v)||"",B=r.getShaderInfoLog(A)||"",H=r.getShaderInfoLog(b)||"",j=N.trim(),Y=B.trim(),ae=H.trim();let X=!0,re=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,A,b);else{const te=Sc(r,A,"vertex"),Me=Sc(r,b,"fragment");ut("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+j+`
`+te+`
`+Me)}else j!==""?Oe("WebGLProgram: Program Info Log:",j):(Y===""||ae==="")&&(re=!1);re&&(L.diagnostics={runnable:X,programLog:j,vertexShader:{log:Y,prefix:m},fragmentShader:{log:ae,prefix:f}})}r.deleteShader(A),r.deleteShader(b),D=new $r(r,v),y=n0(r,v)}let D;this.getUniforms=function(){return D===void 0&&P(this),D};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let _=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=r.getProgramParameter(v,jm)),_},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Ym++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=b,this}let p0=0;class m0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new x0(e),t.set(e,n)),n}}class x0{constructor(e){this.id=p0++,this.code=e,this.usedTimes=0}}function g0(i,e,t,n,r,a,s){const o=new ro,c=new m0,l=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(y){return l.add(y),y===0?"uv":`uv${y}`}function m(y,_,L,N,B){const H=N.fog,j=B.geometry,Y=y.isMeshStandardMaterial?N.environment:null,ae=(y.isMeshStandardMaterial?t:e).get(y.envMap||Y),X=ae&&ae.mapping===ia?ae.image.height:null,re=x[y.type];y.precision!==null&&(p=r.getMaxPrecision(y.precision),p!==y.precision&&Oe("WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const te=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Me=te!==void 0?te.length:0;let Ne=0;j.morphAttributes.position!==void 0&&(Ne=1),j.morphAttributes.normal!==void 0&&(Ne=2),j.morphAttributes.color!==void 0&&(Ne=3);let We,Q,je,$;if(re){const Je=an[re];We=Je.vertexShader,Q=Je.fragmentShader}else We=y.vertexShader,Q=y.fragmentShader,c.update(y),je=c.getVertexShaderID(y),$=c.getFragmentShaderID(y);const J=i.getRenderTarget(),ge=i.state.buffers.depth.getReversed(),Ae=B.isInstancedMesh===!0,me=B.isBatchedMesh===!0,ze=!!y.map,ft=!!y.matcap,Be=!!ae,tt=!!y.aoMap,R=!!y.lightMap,ke=!!y.bumpMap,Xe=!!y.normalMap,Ze=!!y.displacementMap,ye=!!y.emissiveMap,it=!!y.metalnessMap,Ee=!!y.roughnessMap,Ie=y.anisotropy>0,w=y.clearcoat>0,g=y.dispersion>0,k=y.iridescence>0,K=y.sheen>0,ee=y.transmission>0,W=Ie&&!!y.anisotropyMap,we=w&&!!y.clearcoatMap,he=w&&!!y.clearcoatNormalMap,Te=w&&!!y.clearcoatRoughnessMap,F=k&&!!y.iridescenceMap,O=k&&!!y.iridescenceThicknessMap,q=K&&!!y.sheenColorMap,fe=K&&!!y.sheenRoughnessMap,de=!!y.specularMap,ie=!!y.specularColorMap,se=!!y.specularIntensityMap,C=ee&&!!y.transmissionMap,le=ee&&!!y.thicknessMap,oe=!!y.gradientMap,ue=!!y.alphaMap,ne=y.alphaTest>0,Z=!!y.alphaHash,be=!!y.extensions;let Fe=Nn;y.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Fe=i.toneMapping);const rt={shaderID:re,shaderType:y.type,shaderName:y.name,vertexShader:We,fragmentShader:Q,defines:y.defines,customVertexShaderID:je,customFragmentShaderID:$,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:me,batchingColor:me&&B._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&B.instanceColor!==null,instancingMorph:Ae&&B.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:J===null?i.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Ii,alphaToCoverage:!!y.alphaToCoverage,map:ze,matcap:ft,envMap:Be,envMapMode:Be&&ae.mapping,envMapCubeUVHeight:X,aoMap:tt,lightMap:R,bumpMap:ke,normalMap:Xe,displacementMap:h&&Ze,emissiveMap:ye,normalMapObjectSpace:Xe&&y.normalMapType===Pu,normalMapTangentSpace:Xe&&y.normalMapType===Ru,metalnessMap:it,roughnessMap:Ee,anisotropy:Ie,anisotropyMap:W,clearcoat:w,clearcoatMap:we,clearcoatNormalMap:he,clearcoatRoughnessMap:Te,dispersion:g,iridescence:k,iridescenceMap:F,iridescenceThicknessMap:O,sheen:K,sheenColorMap:q,sheenRoughnessMap:fe,specularMap:de,specularColorMap:ie,specularIntensityMap:se,transmission:ee,transmissionMap:C,thicknessMap:le,gradientMap:oe,opaque:y.transparent===!1&&y.blending===Ci&&y.alphaToCoverage===!1,alphaMap:ue,alphaTest:ne,alphaHash:Z,combine:y.combine,mapUv:ze&&v(y.map.channel),aoMapUv:tt&&v(y.aoMap.channel),lightMapUv:R&&v(y.lightMap.channel),bumpMapUv:ke&&v(y.bumpMap.channel),normalMapUv:Xe&&v(y.normalMap.channel),displacementMapUv:Ze&&v(y.displacementMap.channel),emissiveMapUv:ye&&v(y.emissiveMap.channel),metalnessMapUv:it&&v(y.metalnessMap.channel),roughnessMapUv:Ee&&v(y.roughnessMap.channel),anisotropyMapUv:W&&v(y.anisotropyMap.channel),clearcoatMapUv:we&&v(y.clearcoatMap.channel),clearcoatNormalMapUv:he&&v(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&v(y.clearcoatRoughnessMap.channel),iridescenceMapUv:F&&v(y.iridescenceMap.channel),iridescenceThicknessMapUv:O&&v(y.iridescenceThicknessMap.channel),sheenColorMapUv:q&&v(y.sheenColorMap.channel),sheenRoughnessMapUv:fe&&v(y.sheenRoughnessMap.channel),specularMapUv:de&&v(y.specularMap.channel),specularColorMapUv:ie&&v(y.specularColorMap.channel),specularIntensityMapUv:se&&v(y.specularIntensityMap.channel),transmissionMapUv:C&&v(y.transmissionMap.channel),thicknessMapUv:le&&v(y.thicknessMap.channel),alphaMapUv:ue&&v(y.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Xe||Ie),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!j.attributes.uv&&(ze||ue),fog:!!H,useFog:y.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ge,skinning:B.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Ne,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Fe,decodeVideoTexture:ze&&y.map.isVideoTexture===!0&&$e.getTransfer(y.map.colorSpace)===et,decodeVideoTextureEmissive:ye&&y.emissiveMap.isVideoTexture===!0&&$e.getTransfer(y.emissiveMap.colorSpace)===et,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===sn,flipSided:y.side===Pt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:be&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&y.extensions.multiDraw===!0||me)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return rt.vertexUv1s=l.has(1),rt.vertexUv2s=l.has(2),rt.vertexUv3s=l.has(3),l.clear(),rt}function f(y){const _=[];if(y.shaderID?_.push(y.shaderID):(_.push(y.customVertexShaderID),_.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)_.push(L),_.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(T(_,y),E(_,y),_.push(i.outputColorSpace)),_.push(y.customProgramCacheKey),_.join()}function T(y,_){y.push(_.precision),y.push(_.outputColorSpace),y.push(_.envMapMode),y.push(_.envMapCubeUVHeight),y.push(_.mapUv),y.push(_.alphaMapUv),y.push(_.lightMapUv),y.push(_.aoMapUv),y.push(_.bumpMapUv),y.push(_.normalMapUv),y.push(_.displacementMapUv),y.push(_.emissiveMapUv),y.push(_.metalnessMapUv),y.push(_.roughnessMapUv),y.push(_.anisotropyMapUv),y.push(_.clearcoatMapUv),y.push(_.clearcoatNormalMapUv),y.push(_.clearcoatRoughnessMapUv),y.push(_.iridescenceMapUv),y.push(_.iridescenceThicknessMapUv),y.push(_.sheenColorMapUv),y.push(_.sheenRoughnessMapUv),y.push(_.specularMapUv),y.push(_.specularColorMapUv),y.push(_.specularIntensityMapUv),y.push(_.transmissionMapUv),y.push(_.thicknessMapUv),y.push(_.combine),y.push(_.fogExp2),y.push(_.sizeAttenuation),y.push(_.morphTargetsCount),y.push(_.morphAttributeCount),y.push(_.numDirLights),y.push(_.numPointLights),y.push(_.numSpotLights),y.push(_.numSpotLightMaps),y.push(_.numHemiLights),y.push(_.numRectAreaLights),y.push(_.numDirLightShadows),y.push(_.numPointLightShadows),y.push(_.numSpotLightShadows),y.push(_.numSpotLightShadowsWithMaps),y.push(_.numLightProbes),y.push(_.shadowMapType),y.push(_.toneMapping),y.push(_.numClippingPlanes),y.push(_.numClipIntersection),y.push(_.depthPacking)}function E(y,_){o.disableAll(),_.supportsVertexTextures&&o.enable(0),_.instancing&&o.enable(1),_.instancingColor&&o.enable(2),_.instancingMorph&&o.enable(3),_.matcap&&o.enable(4),_.envMap&&o.enable(5),_.normalMapObjectSpace&&o.enable(6),_.normalMapTangentSpace&&o.enable(7),_.clearcoat&&o.enable(8),_.iridescence&&o.enable(9),_.alphaTest&&o.enable(10),_.vertexColors&&o.enable(11),_.vertexAlphas&&o.enable(12),_.vertexUv1s&&o.enable(13),_.vertexUv2s&&o.enable(14),_.vertexUv3s&&o.enable(15),_.vertexTangents&&o.enable(16),_.anisotropy&&o.enable(17),_.alphaHash&&o.enable(18),_.batching&&o.enable(19),_.dispersion&&o.enable(20),_.batchingColor&&o.enable(21),_.gradientMap&&o.enable(22),y.push(o.mask),o.disableAll(),_.fog&&o.enable(0),_.useFog&&o.enable(1),_.flatShading&&o.enable(2),_.logarithmicDepthBuffer&&o.enable(3),_.reversedDepthBuffer&&o.enable(4),_.skinning&&o.enable(5),_.morphTargets&&o.enable(6),_.morphNormals&&o.enable(7),_.morphColors&&o.enable(8),_.premultipliedAlpha&&o.enable(9),_.shadowMapEnabled&&o.enable(10),_.doubleSided&&o.enable(11),_.flipSided&&o.enable(12),_.useDepthPacking&&o.enable(13),_.dithering&&o.enable(14),_.transmission&&o.enable(15),_.sheen&&o.enable(16),_.opaque&&o.enable(17),_.pointsUvs&&o.enable(18),_.decodeVideoTexture&&o.enable(19),_.decodeVideoTextureEmissive&&o.enable(20),_.alphaToCoverage&&o.enable(21),y.push(o.mask)}function S(y){const _=x[y.type];let L;if(_){const N=an[_];L=Md.clone(N.uniforms)}else L=y.uniforms;return L}function A(y,_){let L;for(let N=0,B=u.length;N<B;N++){const H=u[N];if(H.cacheKey===_){L=H,++L.usedTimes;break}}return L===void 0&&(L=new f0(i,_,y,a),u.push(L)),L}function b(y){if(--y.usedTimes===0){const _=u.indexOf(y);u[_]=u[u.length-1],u.pop(),y.destroy()}}function P(y){c.remove(y)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:S,acquireProgram:A,releaseProgram:b,releaseShaderCache:P,programs:u,dispose:D}}function _0(){let i=new WeakMap;function e(s){return i.has(s)}function t(s){let o=i.get(s);return o===void 0&&(o={},i.set(s,o)),o}function n(s){i.delete(s)}function r(s,o,c){i.get(s)[o]=c}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:a}}function v0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Cc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Rc(){const i=[];let e=0;const t=[],n=[],r=[];function a(){e=0,t.length=0,n.length=0,r.length=0}function s(d,h,p,x,v,m){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:x,renderOrder:d.renderOrder,z:v,group:m},i[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=x,f.renderOrder=d.renderOrder,f.z=v,f.group=m),e++,f}function o(d,h,p,x,v,m){const f=s(d,h,p,x,v,m);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(d,h,p,x,v,m){const f=s(d,h,p,x,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(d,h){t.length>1&&t.sort(d||v0),n.length>1&&n.sort(h||Cc),r.length>1&&r.sort(h||Cc)}function u(){for(let d=e,h=i.length;d<h;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:a,push:o,unshift:c,finish:u,sort:l}}function M0(){let i=new WeakMap;function e(n,r){const a=i.get(n);let s;return a===void 0?(s=new Rc,i.set(n,[s])):r>=a.length?(s=new Rc,a.push(s)):s=a[r],s}function t(){i=new WeakMap}return{get:e,dispose:t}}function y0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Ke};break;case"SpotLight":t={position:new I,direction:new I,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function b0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new De,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let S0=0;function E0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function w0(i){const e=new y0,t=b0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const r=new I,a=new dt,s=new dt;function o(l){let u=0,d=0,h=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let p=0,x=0,v=0,m=0,f=0,T=0,E=0,S=0,A=0,b=0,P=0;l.sort(E0);for(let y=0,_=l.length;y<_;y++){const L=l[y],N=L.color,B=L.intensity,H=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=N.r*B,d+=N.g*B,h+=N.b*B;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(L.sh.coefficients[Y],B);P++}else if(L.isDirectionalLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const ae=L.shadow,X=t.get(L);X.shadowIntensity=ae.intensity,X.shadowBias=ae.bias,X.shadowNormalBias=ae.normalBias,X.shadowRadius=ae.radius,X.shadowMapSize=ae.mapSize,n.directionalShadow[p]=X,n.directionalShadowMap[p]=j,n.directionalShadowMatrix[p]=L.shadow.matrix,T++}n.directional[p]=Y,p++}else if(L.isSpotLight){const Y=e.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(N).multiplyScalar(B),Y.distance=H,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,n.spot[v]=Y;const ae=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,ae.updateMatrices(L),L.castShadow&&b++),n.spotLightMatrix[v]=ae.matrix,L.castShadow){const X=t.get(L);X.shadowIntensity=ae.intensity,X.shadowBias=ae.bias,X.shadowNormalBias=ae.normalBias,X.shadowRadius=ae.radius,X.shadowMapSize=ae.mapSize,n.spotShadow[v]=X,n.spotShadowMap[v]=j,S++}v++}else if(L.isRectAreaLight){const Y=e.get(L);Y.color.copy(N).multiplyScalar(B),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=Y,m++}else if(L.isPointLight){const Y=e.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){const ae=L.shadow,X=t.get(L);X.shadowIntensity=ae.intensity,X.shadowBias=ae.bias,X.shadowNormalBias=ae.normalBias,X.shadowRadius=ae.radius,X.shadowMapSize=ae.mapSize,X.shadowCameraNear=ae.camera.near,X.shadowCameraFar=ae.camera.far,n.pointShadow[x]=X,n.pointShadowMap[x]=j,n.pointShadowMatrix[x]=L.shadow.matrix,E++}n.point[x]=Y,x++}else if(L.isHemisphereLight){const Y=e.get(L);Y.skyColor.copy(L.color).multiplyScalar(B),Y.groundColor.copy(L.groundColor).multiplyScalar(B),n.hemi[f]=Y,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const D=n.hash;(D.directionalLength!==p||D.pointLength!==x||D.spotLength!==v||D.rectAreaLength!==m||D.hemiLength!==f||D.numDirectionalShadows!==T||D.numPointShadows!==E||D.numSpotShadows!==S||D.numSpotMaps!==A||D.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=S+A-b,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=P,D.directionalLength=p,D.pointLength=x,D.spotLength=v,D.rectAreaLength=m,D.hemiLength=f,D.numDirectionalShadows=T,D.numPointShadows=E,D.numSpotShadows=S,D.numSpotMaps=A,D.numLightProbes=P,n.version=S0++)}function c(l,u){let d=0,h=0,p=0,x=0,v=0;const m=u.matrixWorldInverse;for(let f=0,T=l.length;f<T;f++){const E=l[f];if(E.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),d++}else if(E.isSpotLight){const S=n.spot[p];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),p++}else if(E.isRectAreaLight){const S=n.rectArea[x];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),s.identity(),a.copy(E.matrixWorld),a.premultiply(m),s.extractRotation(a),S.halfWidth.set(E.width*.5,0,0),S.halfHeight.set(0,E.height*.5,0),S.halfWidth.applyMatrix4(s),S.halfHeight.applyMatrix4(s),x++}else if(E.isPointLight){const S=n.point[h];S.position.setFromMatrixPosition(E.matrixWorld),S.position.applyMatrix4(m),h++}else if(E.isHemisphereLight){const S=n.hemi[v];S.direction.setFromMatrixPosition(E.matrixWorld),S.direction.transformDirection(m),v++}}}return{setup:o,setupView:c,state:n}}function Pc(i){const e=new w0(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function a(u){t.push(u)}function s(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:s}}function T0(i){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new Pc(i),e.set(r,[o])):a>=s.length?(o=new Pc(i),s.push(o)):o=s[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const A0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C0=`uniform sampler2D shadow_pass;
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
}`;function R0(i,e,t){let n=new al;const r=new De,a=new De,s=new pt,o=new jd({depthPacking:Cu}),c=new Yd,l={},u=t.maxTextureSize,d={[yn]:Pt,[Pt]:yn,[sn]:sn},h=new Gt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new De},radius:{value:4}},vertexShader:A0,fragmentShader:C0}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const x=new Lt;x.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new bt(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bc;let f=this.type;this.render=function(b,P,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const y=i.getRenderTarget(),_=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),N=i.state;N.setBlending(vn),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const B=f!==mn&&this.type===mn,H=f===mn&&this.type!==mn;for(let j=0,Y=b.length;j<Y;j++){const ae=b[j],X=ae.shadow;if(X===void 0){Oe("WebGLShadowMap:",ae,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const re=X.getFrameExtents();if(r.multiply(re),a.copy(X.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/re.x),r.x=a.x*re.x,X.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/re.y),r.y=a.y*re.y,X.mapSize.y=a.y)),X.map===null||B===!0||H===!0){const Me=this.type!==mn?{minFilter:Vt,magFilter:Vt}:{};X.map!==null&&X.map.dispose(),X.map=new ni(r.x,r.y,Me),X.map.texture.name=ae.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const te=X.getViewportCount();for(let Me=0;Me<te;Me++){const Ne=X.getViewport(Me);s.set(a.x*Ne.x,a.y*Ne.y,a.x*Ne.z,a.y*Ne.w),N.viewport(s),X.updateMatrices(ae,Me),n=X.getFrustum(),S(P,D,X.camera,ae,this.type)}X.isPointLightShadow!==!0&&this.type===mn&&T(X,D),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(y,_,L)};function T(b,P){const D=e.update(v);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new ni(r.x,r.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(P,null,D,h,v,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(P,null,D,p,v,null)}function E(b,P,D,y){let _=null;const L=D.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)_=L;else if(_=D.isPointLight===!0?c:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const N=_.uuid,B=P.uuid;let H=l[N];H===void 0&&(H={},l[N]=H);let j=H[B];j===void 0&&(j=_.clone(),H[B]=j,P.addEventListener("dispose",A)),_=j}if(_.visible=P.visible,_.wireframe=P.wireframe,y===mn?_.side=P.shadowSide!==null?P.shadowSide:P.side:_.side=P.shadowSide!==null?P.shadowSide:d[P.side],_.alphaMap=P.alphaMap,_.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,_.map=P.map,_.clipShadows=P.clipShadows,_.clippingPlanes=P.clippingPlanes,_.clipIntersection=P.clipIntersection,_.displacementMap=P.displacementMap,_.displacementScale=P.displacementScale,_.displacementBias=P.displacementBias,_.wireframeLinewidth=P.wireframeLinewidth,_.linewidth=P.linewidth,D.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const N=i.properties.get(_);N.light=D}return _}function S(b,P,D,y,_){if(b.visible===!1)return;if(b.layers.test(P.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&_===mn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,b.matrixWorld);const B=e.update(b),H=b.material;if(Array.isArray(H)){const j=B.groups;for(let Y=0,ae=j.length;Y<ae;Y++){const X=j[Y],re=H[X.materialIndex];if(re&&re.visible){const te=E(b,re,y,_);b.onBeforeShadow(i,b,P,D,B,te,X),i.renderBufferDirect(D,null,B,te,b,X),b.onAfterShadow(i,b,P,D,B,te,X)}}}else if(H.visible){const j=E(b,H,y,_);b.onBeforeShadow(i,b,P,D,B,j,null),i.renderBufferDirect(D,null,B,j,b,null),b.onAfterShadow(i,b,P,D,B,j,null)}}const N=b.children;for(let B=0,H=N.length;B<H;B++)S(N[B],P,D,y,_)}function A(b){b.target.removeEventListener("dispose",A);for(const D in l){const y=l[D],_=b.target.uuid;_ in y&&(y[_].dispose(),delete y[_])}}}const P0={[Za]:Ja,[Qa]:ns,[es]:is,[Li]:ts,[Ja]:Za,[ns]:Qa,[is]:es,[ts]:Li};function L0(i,e){function t(){let C=!1;const le=new pt;let oe=null;const ue=new pt(0,0,0,0);return{setMask:function(ne){oe!==ne&&!C&&(i.colorMask(ne,ne,ne,ne),oe=ne)},setLocked:function(ne){C=ne},setClear:function(ne,Z,be,Fe,rt){rt===!0&&(ne*=Fe,Z*=Fe,be*=Fe),le.set(ne,Z,be,Fe),ue.equals(le)===!1&&(i.clearColor(ne,Z,be,Fe),ue.copy(le))},reset:function(){C=!1,oe=null,ue.set(-1,0,0,0)}}}function n(){let C=!1,le=!1,oe=null,ue=null,ne=null;return{setReversed:function(Z){if(le!==Z){const be=e.get("EXT_clip_control");Z?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),le=Z;const Fe=ne;ne=null,this.setClear(Fe)}},getReversed:function(){return le},setTest:function(Z){Z?J(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function(Z){oe!==Z&&!C&&(i.depthMask(Z),oe=Z)},setFunc:function(Z){if(le&&(Z=P0[Z]),ue!==Z){switch(Z){case Za:i.depthFunc(i.NEVER);break;case Ja:i.depthFunc(i.ALWAYS);break;case Qa:i.depthFunc(i.LESS);break;case Li:i.depthFunc(i.LEQUAL);break;case es:i.depthFunc(i.EQUAL);break;case ts:i.depthFunc(i.GEQUAL);break;case ns:i.depthFunc(i.GREATER);break;case is:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=Z}},setLocked:function(Z){C=Z},setClear:function(Z){ne!==Z&&(le&&(Z=1-Z),i.clearDepth(Z),ne=Z)},reset:function(){C=!1,oe=null,ue=null,ne=null,le=!1}}}function r(){let C=!1,le=null,oe=null,ue=null,ne=null,Z=null,be=null,Fe=null,rt=null;return{setTest:function(Je){C||(Je?J(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(Je){le!==Je&&!C&&(i.stencilMask(Je),le=Je)},setFunc:function(Je,rn,$t){(oe!==Je||ue!==rn||ne!==$t)&&(i.stencilFunc(Je,rn,$t),oe=Je,ue=rn,ne=$t)},setOp:function(Je,rn,$t){(Z!==Je||be!==rn||Fe!==$t)&&(i.stencilOp(Je,rn,$t),Z=Je,be=rn,Fe=$t)},setLocked:function(Je){C=Je},setClear:function(Je){rt!==Je&&(i.clearStencil(Je),rt=Je)},reset:function(){C=!1,le=null,oe=null,ue=null,ne=null,Z=null,be=null,Fe=null,rt=null}}}const a=new t,s=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,p=[],x=null,v=!1,m=null,f=null,T=null,E=null,S=null,A=null,b=null,P=new Ke(0,0,0),D=0,y=!1,_=null,L=null,N=null,B=null,H=null;const j=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,ae=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(X)[1]),Y=ae>=1):X.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),Y=ae>=2);let re=null,te={};const Me=i.getParameter(i.SCISSOR_BOX),Ne=i.getParameter(i.VIEWPORT),We=new pt().fromArray(Me),Q=new pt().fromArray(Ne);function je(C,le,oe,ue){const ne=new Uint8Array(4),Z=i.createTexture();i.bindTexture(C,Z),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<oe;be++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,ne):i.texImage2D(le+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ne);return Z}const $={};$[i.TEXTURE_2D]=je(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=je(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=je(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=je(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),J(i.DEPTH_TEST),s.setFunc(Li),ke(!1),Xe(Lo),J(i.CULL_FACE),tt(vn);function J(C){u[C]!==!0&&(i.enable(C),u[C]=!0)}function ge(C){u[C]!==!1&&(i.disable(C),u[C]=!1)}function Ae(C,le){return d[C]!==le?(i.bindFramebuffer(C,le),d[C]=le,C===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=le),C===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=le),!0):!1}function me(C,le){let oe=p,ue=!1;if(C){oe=h.get(le),oe===void 0&&(oe=[],h.set(le,oe));const ne=C.textures;if(oe.length!==ne.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,be=ne.length;Z<be;Z++)oe[Z]=i.COLOR_ATTACHMENT0+Z;oe.length=ne.length,ue=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,ue=!0);ue&&i.drawBuffers(oe)}function ze(C){return x!==C?(i.useProgram(C),x=C,!0):!1}const ft={[jn]:i.FUNC_ADD,[eu]:i.FUNC_SUBTRACT,[tu]:i.FUNC_REVERSE_SUBTRACT};ft[nu]=i.MIN,ft[iu]=i.MAX;const Be={[ru]:i.ZERO,[au]:i.ONE,[su]:i.SRC_COLOR,[$a]:i.SRC_ALPHA,[hu]:i.SRC_ALPHA_SATURATE,[uu]:i.DST_COLOR,[cu]:i.DST_ALPHA,[ou]:i.ONE_MINUS_SRC_COLOR,[Ka]:i.ONE_MINUS_SRC_ALPHA,[du]:i.ONE_MINUS_DST_COLOR,[lu]:i.ONE_MINUS_DST_ALPHA,[fu]:i.CONSTANT_COLOR,[pu]:i.ONE_MINUS_CONSTANT_COLOR,[mu]:i.CONSTANT_ALPHA,[xu]:i.ONE_MINUS_CONSTANT_ALPHA};function tt(C,le,oe,ue,ne,Z,be,Fe,rt,Je){if(C===vn){v===!0&&(ge(i.BLEND),v=!1);return}if(v===!1&&(J(i.BLEND),v=!0),C!==Ql){if(C!==m||Je!==y){if((f!==jn||S!==jn)&&(i.blendEquation(i.FUNC_ADD),f=jn,S=jn),Je)switch(C){case Ci:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFunc(i.ONE,i.ONE);break;case Do:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Uo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ut("WebGLState: Invalid blending: ",C);break}else switch(C){case Ci:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Do:ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uo:ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ut("WebGLState: Invalid blending: ",C);break}T=null,E=null,A=null,b=null,P.set(0,0,0),D=0,m=C,y=Je}return}ne=ne||le,Z=Z||oe,be=be||ue,(le!==f||ne!==S)&&(i.blendEquationSeparate(ft[le],ft[ne]),f=le,S=ne),(oe!==T||ue!==E||Z!==A||be!==b)&&(i.blendFuncSeparate(Be[oe],Be[ue],Be[Z],Be[be]),T=oe,E=ue,A=Z,b=be),(Fe.equals(P)===!1||rt!==D)&&(i.blendColor(Fe.r,Fe.g,Fe.b,rt),P.copy(Fe),D=rt),m=C,y=!1}function R(C,le){C.side===sn?ge(i.CULL_FACE):J(i.CULL_FACE);let oe=C.side===Pt;le&&(oe=!oe),ke(oe),C.blending===Ci&&C.transparent===!1?tt(vn):tt(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),s.setFunc(C.depthFunc),s.setTest(C.depthTest),s.setMask(C.depthWrite),a.setMask(C.colorWrite);const ue=C.stencilWrite;o.setTest(ue),ue&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),ye(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?J(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function ke(C){_!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),_=C)}function Xe(C){C!==Kl?(J(i.CULL_FACE),C!==L&&(C===Lo?i.cullFace(i.BACK):C===Zl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),L=C}function Ze(C){C!==N&&(Y&&i.lineWidth(C),N=C)}function ye(C,le,oe){C?(J(i.POLYGON_OFFSET_FILL),(B!==le||H!==oe)&&(i.polygonOffset(le,oe),B=le,H=oe)):ge(i.POLYGON_OFFSET_FILL)}function it(C){C?J(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function Ee(C){C===void 0&&(C=i.TEXTURE0+j-1),re!==C&&(i.activeTexture(C),re=C)}function Ie(C,le,oe){oe===void 0&&(re===null?oe=i.TEXTURE0+j-1:oe=re);let ue=te[oe];ue===void 0&&(ue={type:void 0,texture:void 0},te[oe]=ue),(ue.type!==C||ue.texture!==le)&&(re!==oe&&(i.activeTexture(oe),re=oe),i.bindTexture(C,le||$[C]),ue.type=C,ue.texture=le)}function w(){const C=te[re];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function g(){try{i.compressedTexImage2D(...arguments)}catch(C){C("WebGLState:",C)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(C){C("WebGLState:",C)}}function K(){try{i.texSubImage2D(...arguments)}catch(C){C("WebGLState:",C)}}function ee(){try{i.texSubImage3D(...arguments)}catch(C){C("WebGLState:",C)}}function W(){try{i.compressedTexSubImage2D(...arguments)}catch(C){C("WebGLState:",C)}}function we(){try{i.compressedTexSubImage3D(...arguments)}catch(C){C("WebGLState:",C)}}function he(){try{i.texStorage2D(...arguments)}catch(C){C("WebGLState:",C)}}function Te(){try{i.texStorage3D(...arguments)}catch(C){C("WebGLState:",C)}}function F(){try{i.texImage2D(...arguments)}catch(C){C("WebGLState:",C)}}function O(){try{i.texImage3D(...arguments)}catch(C){C("WebGLState:",C)}}function q(C){We.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),We.copy(C))}function fe(C){Q.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),Q.copy(C))}function de(C,le){let oe=l.get(le);oe===void 0&&(oe=new WeakMap,l.set(le,oe));let ue=oe.get(C);ue===void 0&&(ue=i.getUniformBlockIndex(le,C.name),oe.set(C,ue))}function ie(C,le){const ue=l.get(le).get(C);c.get(le)!==ue&&(i.uniformBlockBinding(le,ue,C.__bindingPointIndex),c.set(le,ue))}function se(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),s.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},re=null,te={},d={},h=new WeakMap,p=[],x=null,v=!1,m=null,f=null,T=null,E=null,S=null,A=null,b=null,P=new Ke(0,0,0),D=0,y=!1,_=null,L=null,N=null,B=null,H=null,We.set(0,0,i.canvas.width,i.canvas.height),Q.set(0,0,i.canvas.width,i.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:J,disable:ge,bindFramebuffer:Ae,drawBuffers:me,useProgram:ze,setBlending:tt,setMaterial:R,setFlipSided:ke,setCullFace:Xe,setLineWidth:Ze,setPolygonOffset:ye,setScissorTest:it,activeTexture:Ee,bindTexture:Ie,unbindTexture:w,compressedTexImage2D:g,compressedTexImage3D:k,texImage2D:F,texImage3D:O,updateUBOMapping:de,uniformBlockBinding:ie,texStorage2D:he,texStorage3D:Te,texSubImage2D:K,texSubImage3D:ee,compressedTexSubImage2D:W,compressedTexSubImage3D:we,scissor:q,viewport:fe,reset:se}}function D0(i,e,t,n,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new De,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(w,g){return p?new OffscreenCanvas(w,g):sr("canvas")}function v(w,g,k){let K=1;const ee=Ie(w);if((ee.width>k||ee.height>k)&&(K=k/Math.max(ee.width,ee.height)),K<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const W=Math.floor(K*ee.width),we=Math.floor(K*ee.height);d===void 0&&(d=x(W,we));const he=g?x(W,we):d;return he.width=W,he.height=we,he.getContext("2d").drawImage(w,0,0,W,we),Oe("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+W+"x"+we+")."),he}else return"data"in w&&Oe("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),w;return w}function m(w){return w.generateMipmaps}function f(w){i.generateMipmap(w)}function T(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(w,g,k,K,ee=!1){if(w!==null){if(i[w]!==void 0)return i[w];Oe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let W=g;if(g===i.RED&&(k===i.FLOAT&&(W=i.R32F),k===i.HALF_FLOAT&&(W=i.R16F),k===i.UNSIGNED_BYTE&&(W=i.R8)),g===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.R8UI),k===i.UNSIGNED_SHORT&&(W=i.R16UI),k===i.UNSIGNED_INT&&(W=i.R32UI),k===i.BYTE&&(W=i.R8I),k===i.SHORT&&(W=i.R16I),k===i.INT&&(W=i.R32I)),g===i.RG&&(k===i.FLOAT&&(W=i.RG32F),k===i.HALF_FLOAT&&(W=i.RG16F),k===i.UNSIGNED_BYTE&&(W=i.RG8)),g===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.RG8UI),k===i.UNSIGNED_SHORT&&(W=i.RG16UI),k===i.UNSIGNED_INT&&(W=i.RG32UI),k===i.BYTE&&(W=i.RG8I),k===i.SHORT&&(W=i.RG16I),k===i.INT&&(W=i.RG32I)),g===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.RGB8UI),k===i.UNSIGNED_SHORT&&(W=i.RGB16UI),k===i.UNSIGNED_INT&&(W=i.RGB32UI),k===i.BYTE&&(W=i.RGB8I),k===i.SHORT&&(W=i.RGB16I),k===i.INT&&(W=i.RGB32I)),g===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),k===i.UNSIGNED_INT&&(W=i.RGBA32UI),k===i.BYTE&&(W=i.RGBA8I),k===i.SHORT&&(W=i.RGBA16I),k===i.INT&&(W=i.RGBA32I)),g===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(W=i.R11F_G11F_B10F)),g===i.RGBA){const we=ee?Zr:$e.getTransfer(K);k===i.FLOAT&&(W=i.RGBA32F),k===i.HALF_FLOAT&&(W=i.RGBA16F),k===i.UNSIGNED_BYTE&&(W=we===et?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function S(w,g){let k;return w?g===null||g===ti||g===ir?k=i.DEPTH24_STENCIL8:g===_n?k=i.DEPTH32F_STENCIL8:g===nr&&(k=i.DEPTH24_STENCIL8,Oe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===ti||g===ir?k=i.DEPTH_COMPONENT24:g===_n?k=i.DEPTH_COMPONENT32F:g===nr&&(k=i.DEPTH_COMPONENT16),k}function A(w,g){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Vt&&w.minFilter!==jt?Math.log2(Math.max(g.width,g.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?g.mipmaps.length:1}function b(w){const g=w.target;g.removeEventListener("dispose",b),D(g),g.isVideoTexture&&u.delete(g)}function P(w){const g=w.target;g.removeEventListener("dispose",P),_(g)}function D(w){const g=n.get(w);if(g.__webglInit===void 0)return;const k=w.source,K=h.get(k);if(K){const ee=K[g.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&y(w),Object.keys(K).length===0&&h.delete(k)}n.remove(w)}function y(w){const g=n.get(w);i.deleteTexture(g.__webglTexture);const k=w.source,K=h.get(k);delete K[g.__cacheKey],s.memory.textures--}function _(w){const g=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(g.__webglFramebuffer[K]))for(let ee=0;ee<g.__webglFramebuffer[K].length;ee++)i.deleteFramebuffer(g.__webglFramebuffer[K][ee]);else i.deleteFramebuffer(g.__webglFramebuffer[K]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[K])}else{if(Array.isArray(g.__webglFramebuffer))for(let K=0;K<g.__webglFramebuffer.length;K++)i.deleteFramebuffer(g.__webglFramebuffer[K]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let K=0;K<g.__webglColorRenderbuffer.length;K++)g.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[K]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const k=w.textures;for(let K=0,ee=k.length;K<ee;K++){const W=n.get(k[K]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),s.memory.textures--),n.remove(k[K])}n.remove(w)}let L=0;function N(){L=0}function B(){const w=L;return w>=r.maxTextures&&Oe("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),L+=1,w}function H(w){const g=[];return g.push(w.wrapS),g.push(w.wrapT),g.push(w.wrapR||0),g.push(w.magFilter),g.push(w.minFilter),g.push(w.anisotropy),g.push(w.internalFormat),g.push(w.format),g.push(w.type),g.push(w.generateMipmaps),g.push(w.premultiplyAlpha),g.push(w.flipY),g.push(w.unpackAlignment),g.push(w.colorSpace),g.join()}function j(w,g){const k=n.get(w);if(w.isVideoTexture&&it(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&k.__version!==w.version){const K=w.image;if(K===null)Oe("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)Oe("WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,w,g);return}}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+g)}function Y(w,g){const k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){$(k,w,g);return}else w.isExternalTexture&&(k.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+g)}function ae(w,g){const k=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){$(k,w,g);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+g)}function X(w,g){const k=n.get(w);if(w.version>0&&k.__version!==w.version){J(k,w,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+g)}const re={[ss]:i.REPEAT,[gn]:i.CLAMP_TO_EDGE,[os]:i.MIRRORED_REPEAT},te={[Vt]:i.NEAREST,[Tu]:i.NEAREST_MIPMAP_NEAREST,[vr]:i.NEAREST_MIPMAP_LINEAR,[jt]:i.LINEAR,[da]:i.LINEAR_MIPMAP_NEAREST,[Jn]:i.LINEAR_MIPMAP_LINEAR},Me={[Lu]:i.NEVER,[Fu]:i.ALWAYS,[Du]:i.LESS,[Kc]:i.LEQUAL,[Uu]:i.EQUAL,[zu]:i.GEQUAL,[Iu]:i.GREATER,[Nu]:i.NOTEQUAL};function Ne(w,g){if(g.type===_n&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===jt||g.magFilter===da||g.magFilter===vr||g.magFilter===Jn||g.minFilter===jt||g.minFilter===da||g.minFilter===vr||g.minFilter===Jn)&&Oe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,re[g.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,re[g.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,re[g.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,te[g.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,te[g.minFilter]),g.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Me[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Vt||g.minFilter!==vr&&g.minFilter!==Jn||g.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function We(w,g){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,g.addEventListener("dispose",b));const K=g.source;let ee=h.get(K);ee===void 0&&(ee={},h.set(K,ee));const W=H(g);if(W!==w.__cacheKey){ee[W]===void 0&&(ee[W]={texture:i.createTexture(),usedTimes:0},s.memory.textures++,k=!0),ee[W].usedTimes++;const we=ee[w.__cacheKey];we!==void 0&&(ee[w.__cacheKey].usedTimes--,we.usedTimes===0&&y(g)),w.__cacheKey=W,w.__webglTexture=ee[W].texture}return k}function Q(w,g,k){return Math.floor(Math.floor(w/k)/g)}function je(w,g,k,K){const W=w.updateRanges;if(W.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,k,K,g.data);else{W.sort((O,q)=>O.start-q.start);let we=0;for(let O=1;O<W.length;O++){const q=W[we],fe=W[O],de=q.start+q.count,ie=Q(fe.start,g.width,4),se=Q(q.start,g.width,4);fe.start<=de+1&&ie===se&&Q(fe.start+fe.count-1,g.width,4)===ie?q.count=Math.max(q.count,fe.start+fe.count-q.start):(++we,W[we]=fe)}W.length=we+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),Te=i.getParameter(i.UNPACK_SKIP_PIXELS),F=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let O=0,q=W.length;O<q;O++){const fe=W[O],de=Math.floor(fe.start/4),ie=Math.ceil(fe.count/4),se=de%g.width,C=Math.floor(de/g.width),le=ie,oe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,se),i.pixelStorei(i.UNPACK_SKIP_ROWS,C),t.texSubImage2D(i.TEXTURE_2D,0,se,C,le,oe,k,K,g.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Te),i.pixelStorei(i.UNPACK_SKIP_ROWS,F)}}function $(w,g,k){let K=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(K=i.TEXTURE_3D);const ee=We(w,g),W=g.source;t.bindTexture(K,w.__webglTexture,i.TEXTURE0+k);const we=n.get(W);if(W.version!==we.__version||ee===!0){t.activeTexture(i.TEXTURE0+k);const he=$e.getPrimaries($e.workingColorSpace),Te=g.colorSpace===Dn?null:$e.getPrimaries(g.colorSpace),F=g.colorSpace===Dn||he===Te?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,F);let O=v(g.image,!1,r.maxTextureSize);O=Ee(g,O);const q=a.convert(g.format,g.colorSpace),fe=a.convert(g.type);let de=E(g.internalFormat,q,fe,g.colorSpace,g.isVideoTexture);Ne(K,g);let ie;const se=g.mipmaps,C=g.isVideoTexture!==!0,le=we.__version===void 0||ee===!0,oe=W.dataReady,ue=A(g,O);if(g.isDepthTexture)de=S(g.format===ar,g.type),le&&(C?t.texStorage2D(i.TEXTURE_2D,1,de,O.width,O.height):t.texImage2D(i.TEXTURE_2D,0,de,O.width,O.height,0,q,fe,null));else if(g.isDataTexture)if(se.length>0){C&&le&&t.texStorage2D(i.TEXTURE_2D,ue,de,se[0].width,se[0].height);for(let ne=0,Z=se.length;ne<Z;ne++)ie=se[ne],C?oe&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ie.width,ie.height,q,fe,ie.data):t.texImage2D(i.TEXTURE_2D,ne,de,ie.width,ie.height,0,q,fe,ie.data);g.generateMipmaps=!1}else C?(le&&t.texStorage2D(i.TEXTURE_2D,ue,de,O.width,O.height),oe&&je(g,O,q,fe)):t.texImage2D(i.TEXTURE_2D,0,de,O.width,O.height,0,q,fe,O.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){C&&le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,se[0].width,se[0].height,O.depth);for(let ne=0,Z=se.length;ne<Z;ne++)if(ie=se[ne],g.format!==tn)if(q!==null)if(C){if(oe)if(g.layerUpdates.size>0){const be=oc(ie.width,ie.height,g.format,g.type);for(const Fe of g.layerUpdates){const rt=ie.data.subarray(Fe*be/ie.data.BYTES_PER_ELEMENT,(Fe+1)*be/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,Fe,ie.width,ie.height,1,q,rt)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ie.width,ie.height,O.depth,q,ie.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ne,de,ie.width,ie.height,O.depth,0,ie.data,0,0);else Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else C?oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ne,0,0,0,ie.width,ie.height,O.depth,q,fe,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ne,de,ie.width,ie.height,O.depth,0,q,fe,ie.data)}else{C&&le&&t.texStorage2D(i.TEXTURE_2D,ue,de,se[0].width,se[0].height);for(let ne=0,Z=se.length;ne<Z;ne++)ie=se[ne],g.format!==tn?q!==null?C?oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ne,0,0,ie.width,ie.height,q,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,ne,de,ie.width,ie.height,0,ie.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):C?oe&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,ie.width,ie.height,q,fe,ie.data):t.texImage2D(i.TEXTURE_2D,ne,de,ie.width,ie.height,0,q,fe,ie.data)}else if(g.isDataArrayTexture)if(C){if(le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ue,de,O.width,O.height,O.depth),oe)if(g.layerUpdates.size>0){const ne=oc(O.width,O.height,g.format,g.type);for(const Z of g.layerUpdates){const be=O.data.subarray(Z*ne/O.data.BYTES_PER_ELEMENT,(Z+1)*ne/O.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,O.width,O.height,1,q,fe,be)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,O.width,O.height,O.depth,q,fe,O.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,de,O.width,O.height,O.depth,0,q,fe,O.data);else if(g.isData3DTexture)C?(le&&t.texStorage3D(i.TEXTURE_3D,ue,de,O.width,O.height,O.depth),oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,O.width,O.height,O.depth,q,fe,O.data)):t.texImage3D(i.TEXTURE_3D,0,de,O.width,O.height,O.depth,0,q,fe,O.data);else if(g.isFramebufferTexture){if(le)if(C)t.texStorage2D(i.TEXTURE_2D,ue,de,O.width,O.height);else{let ne=O.width,Z=O.height;for(let be=0;be<ue;be++)t.texImage2D(i.TEXTURE_2D,be,de,ne,Z,0,q,fe,null),ne>>=1,Z>>=1}}else if(se.length>0){if(C&&le){const ne=Ie(se[0]);t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height)}for(let ne=0,Z=se.length;ne<Z;ne++)ie=se[ne],C?oe&&t.texSubImage2D(i.TEXTURE_2D,ne,0,0,q,fe,ie):t.texImage2D(i.TEXTURE_2D,ne,de,q,fe,ie);g.generateMipmaps=!1}else if(C){if(le){const ne=Ie(O);t.texStorage2D(i.TEXTURE_2D,ue,de,ne.width,ne.height)}oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,q,fe,O)}else t.texImage2D(i.TEXTURE_2D,0,de,q,fe,O);m(g)&&f(K),we.__version=W.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function J(w,g,k){if(g.image.length!==6)return;const K=We(w,g),ee=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+k);const W=n.get(ee);if(ee.version!==W.__version||K===!0){t.activeTexture(i.TEXTURE0+k);const we=$e.getPrimaries($e.workingColorSpace),he=g.colorSpace===Dn?null:$e.getPrimaries(g.colorSpace),Te=g.colorSpace===Dn||we===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const F=g.isCompressedTexture||g.image[0].isCompressedTexture,O=g.image[0]&&g.image[0].isDataTexture,q=[];for(let Z=0;Z<6;Z++)!F&&!O?q[Z]=v(g.image[Z],!0,r.maxCubemapSize):q[Z]=O?g.image[Z].image:g.image[Z],q[Z]=Ee(g,q[Z]);const fe=q[0],de=a.convert(g.format,g.colorSpace),ie=a.convert(g.type),se=E(g.internalFormat,de,ie,g.colorSpace),C=g.isVideoTexture!==!0,le=W.__version===void 0||K===!0,oe=ee.dataReady;let ue=A(g,fe);Ne(i.TEXTURE_CUBE_MAP,g);let ne;if(F){C&&le&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ue,se,fe.width,fe.height);for(let Z=0;Z<6;Z++){ne=q[Z].mipmaps;for(let be=0;be<ne.length;be++){const Fe=ne[be];g.format!==tn?de!==null?C?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,0,0,Fe.width,Fe.height,de,Fe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,se,Fe.width,Fe.height,0,Fe.data):Oe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,0,0,Fe.width,Fe.height,de,ie,Fe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,se,Fe.width,Fe.height,0,de,ie,Fe.data)}}}else{if(ne=g.mipmaps,C&&le){ne.length>0&&ue++;const Z=Ie(q[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ue,se,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(O){C?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,q[Z].width,q[Z].height,de,ie,q[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,se,q[Z].width,q[Z].height,0,de,ie,q[Z].data);for(let be=0;be<ne.length;be++){const rt=ne[be].image[Z].image;C?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,0,0,rt.width,rt.height,de,ie,rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,se,rt.width,rt.height,0,de,ie,rt.data)}}else{C?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,de,ie,q[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,se,de,ie,q[Z]);for(let be=0;be<ne.length;be++){const Fe=ne[be];C?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,0,0,de,ie,Fe.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,se,de,ie,Fe.image[Z])}}}m(g)&&f(i.TEXTURE_CUBE_MAP),W.__version=ee.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function ge(w,g,k,K,ee,W){const we=a.convert(k.format,k.colorSpace),he=a.convert(k.type),Te=E(k.internalFormat,we,he,k.colorSpace),F=n.get(g),O=n.get(k);if(O.__renderTarget=g,!F.__hasExternalTextures){const q=Math.max(1,g.width>>W),fe=Math.max(1,g.height>>W);ee===i.TEXTURE_3D||ee===i.TEXTURE_2D_ARRAY?t.texImage3D(ee,W,Te,q,fe,g.depth,0,we,he,null):t.texImage2D(ee,W,Te,q,fe,0,we,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),ye(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,ee,O.__webglTexture,0,Ze(g)):(ee===i.TEXTURE_2D||ee>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,ee,O.__webglTexture,W),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ae(w,g,k){if(i.bindRenderbuffer(i.RENDERBUFFER,w),g.depthBuffer){const K=g.depthTexture,ee=K&&K.isDepthTexture?K.type:null,W=S(g.stencilBuffer,ee),we=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,he=Ze(g);ye(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,he,W,g.width,g.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,he,W,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,W,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,we,i.RENDERBUFFER,w)}else{const K=g.textures;for(let ee=0;ee<K.length;ee++){const W=K[ee],we=a.convert(W.format,W.colorSpace),he=a.convert(W.type),Te=E(W.internalFormat,we,he,W.colorSpace),F=Ze(g);k&&ye(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,F,Te,g.width,g.height):ye(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,F,Te,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,Te,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function me(w,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(g.depthTexture);K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),j(g.depthTexture,0);const ee=K.__webglTexture,W=Ze(g);if(g.depthTexture.format===rr)ye(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ee,0);else if(g.depthTexture.format===ar)ye(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function ze(w){const g=n.get(w),k=w.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==w.depthTexture){const K=w.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),K){const ee=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,K.removeEventListener("dispose",ee)};K.addEventListener("dispose",ee),g.__depthDisposeCallback=ee}g.__boundDepthTexture=K}if(w.depthTexture&&!g.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const K=w.texture.mipmaps;K&&K.length>0?me(g.__webglFramebuffer[0],w):me(g.__webglFramebuffer,w)}else if(k){g.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[K]),g.__webglDepthbuffer[K]===void 0)g.__webglDepthbuffer[K]=i.createRenderbuffer(),Ae(g.__webglDepthbuffer[K],w,!1);else{const ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=g.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,W)}}else{const K=w.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),Ae(g.__webglDepthbuffer,w,!1);else{const ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,W)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ft(w,g,k){const K=n.get(w);g!==void 0&&ge(K.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&ze(w)}function Be(w){const g=w.texture,k=n.get(w),K=n.get(g);w.addEventListener("dispose",P);const ee=w.textures,W=w.isWebGLCubeRenderTarget===!0,we=ee.length>1;if(we||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=g.version,s.memory.textures++),W){k.__webglFramebuffer=[];for(let he=0;he<6;he++)if(g.mipmaps&&g.mipmaps.length>0){k.__webglFramebuffer[he]=[];for(let Te=0;Te<g.mipmaps.length;Te++)k.__webglFramebuffer[he][Te]=i.createFramebuffer()}else k.__webglFramebuffer[he]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){k.__webglFramebuffer=[];for(let he=0;he<g.mipmaps.length;he++)k.__webglFramebuffer[he]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(we)for(let he=0,Te=ee.length;he<Te;he++){const F=n.get(ee[he]);F.__webglTexture===void 0&&(F.__webglTexture=i.createTexture(),s.memory.textures++)}if(w.samples>0&&ye(w)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let he=0;he<ee.length;he++){const Te=ee[he];k.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[he]);const F=a.convert(Te.format,Te.colorSpace),O=a.convert(Te.type),q=E(Te.internalFormat,F,O,Te.colorSpace,w.isXRRenderTarget===!0),fe=Ze(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,fe,q,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,k.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Ae(k.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Ne(i.TEXTURE_CUBE_MAP,g);for(let he=0;he<6;he++)if(g.mipmaps&&g.mipmaps.length>0)for(let Te=0;Te<g.mipmaps.length;Te++)ge(k.__webglFramebuffer[he][Te],w,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te);else ge(k.__webglFramebuffer[he],w,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);m(g)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let he=0,Te=ee.length;he<Te;he++){const F=ee[he],O=n.get(F);let q=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(q=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(q,O.__webglTexture),Ne(q,F),ge(k.__webglFramebuffer,w,F,i.COLOR_ATTACHMENT0+he,q,0),m(F)&&f(q)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(he=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,K.__webglTexture),Ne(he,g),g.mipmaps&&g.mipmaps.length>0)for(let Te=0;Te<g.mipmaps.length;Te++)ge(k.__webglFramebuffer[Te],w,g,i.COLOR_ATTACHMENT0,he,Te);else ge(k.__webglFramebuffer,w,g,i.COLOR_ATTACHMENT0,he,0);m(g)&&f(he),t.unbindTexture()}w.depthBuffer&&ze(w)}function tt(w){const g=w.textures;for(let k=0,K=g.length;k<K;k++){const ee=g[k];if(m(ee)){const W=T(w),we=n.get(ee).__webglTexture;t.bindTexture(W,we),f(W),t.unbindTexture()}}}const R=[],ke=[];function Xe(w){if(w.samples>0){if(ye(w)===!1){const g=w.textures,k=w.width,K=w.height;let ee=i.COLOR_BUFFER_BIT;const W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,we=n.get(w),he=g.length>1;if(he)for(let F=0;F<g.length;F++)t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const Te=w.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let F=0;F<g.length;F++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ee|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ee|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,we.__webglColorRenderbuffer[F]);const O=n.get(g[F]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,O,0)}i.blitFramebuffer(0,0,k,K,0,0,k,K,ee,i.NEAREST),c===!0&&(R.length=0,ke.length=0,R.push(i.COLOR_ATTACHMENT0+F),w.depthBuffer&&w.resolveDepthBuffer===!1&&(R.push(W),ke.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,R))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let F=0;F<g.length;F++){t.bindFramebuffer(i.FRAMEBUFFER,we.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.RENDERBUFFER,we.__webglColorRenderbuffer[F]);const O=n.get(g[F]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,we.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+F,i.TEXTURE_2D,O,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const g=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function Ze(w){return Math.min(r.maxSamples,w.samples)}function ye(w){const g=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function it(w){const g=s.render.frame;u.get(w)!==g&&(u.set(w,g),w.update())}function Ee(w,g){const k=w.colorSpace,K=w.format,ee=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==Ii&&k!==Dn&&($e.getTransfer(k)===et?(K!==tn||ee!==bn)&&Oe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ut("WebGLTextures: Unsupported texture color space:",k)),g}function Ie(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=N,this.setTexture2D=j,this.setTexture2DArray=Y,this.setTexture3D=ae,this.setTextureCube=X,this.rebindTextures=ft,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=Xe,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=ye}function U0(i,e){function t(n,r=Dn){let a;const s=$e.getTransfer(r);if(n===bn)return i.UNSIGNED_BYTE;if(n===$s)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ks)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Xc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===qc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Hc)return i.BYTE;if(n===Wc)return i.SHORT;if(n===nr)return i.UNSIGNED_SHORT;if(n===Ys)return i.INT;if(n===ti)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Fi)return i.HALF_FLOAT;if(n===jc)return i.ALPHA;if(n===Yc)return i.RGB;if(n===tn)return i.RGBA;if(n===rr)return i.DEPTH_COMPONENT;if(n===ar)return i.DEPTH_STENCIL;if(n===$c)return i.RED;if(n===Zs)return i.RED_INTEGER;if(n===Js)return i.RG;if(n===Qs)return i.RG_INTEGER;if(n===eo)return i.RGBA_INTEGER;if(n===Xr||n===qr||n===jr||n===Yr)if(s===et)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Xr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===jr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Yr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Xr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===jr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Yr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===cs||n===ls||n===us||n===ds)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===cs)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ls)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===us)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ds)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===hs||n===fs||n===ps)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===hs||n===fs)return s===et?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===ps)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ms||n===xs||n===gs||n===_s||n===vs||n===Ms||n===ys||n===bs||n===Ss||n===Es||n===ws||n===Ts||n===As||n===Cs)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===ms)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===xs)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===gs)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===_s)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===vs)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ms)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ys)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===bs)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ss)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Es)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ws)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ts)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===As)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Cs)return s===et?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Rs||n===Ps||n===Ls)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===Rs)return s===et?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ps)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ls)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ds||n===Us||n===Is||n===Ns)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===Ds)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Us)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Is)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ns)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ir?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const I0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,N0=`
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

}`;class z0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new cl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gt({vertexShader:I0,fragmentShader:N0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new bt(new ra(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class F0 extends Oi{constructor(e,t){super();const n=this;let r=null,a=1,s=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,x=null;const v=typeof XRWebGLBinding<"u",m=new z0,f={},T=t.getContextAttributes();let E=null,S=null;const A=[],b=[],P=new De;let D=null;const y=new qt;y.viewport=new pt;const _=new qt;_.viewport=new pt;const L=[y,_],N=new Qd;let B=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let J=A[$];return J===void 0&&(J=new Da,A[$]=J),J.getTargetRaySpace()},this.getControllerGrip=function($){let J=A[$];return J===void 0&&(J=new Da,A[$]=J),J.getGripSpace()},this.getHand=function($){let J=A[$];return J===void 0&&(J=new Da,A[$]=J),J.getHandSpace()};function j($){const J=b.indexOf($.inputSource);if(J===-1)return;const ge=A[J];ge!==void 0&&(ge.update($.inputSource,$.frame,l||s),ge.dispatchEvent({type:$.type,data:$.inputSource}))}function Y(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",ae);for(let $=0;$<A.length;$++){const J=b[$];J!==null&&(b[$]=null,A[$].disconnect(J))}B=null,H=null,m.reset();for(const $ in f)delete f[$];e.setRenderTarget(E),p=null,h=null,d=null,r=null,S=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(D),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){a=$,n.isPresenting===!0&&Oe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Oe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(E=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",ae),T.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(P),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Ae=null,me=null;T.depth&&(me=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=T.stencil?ar:rr,Ae=T.stencil?ir:ti);const ze={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(ze),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),S=new ni(h.textureWidth,h.textureHeight,{format:tn,type:bn,depthTexture:new ol(h.textureWidth,h.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ge={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,ge),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new ni(p.framebufferWidth,p.framebufferHeight,{format:tn,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),je.setContext(r),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ae($){for(let J=0;J<$.removed.length;J++){const ge=$.removed[J],Ae=b.indexOf(ge);Ae>=0&&(b[Ae]=null,A[Ae].disconnect(ge))}for(let J=0;J<$.added.length;J++){const ge=$.added[J];let Ae=b.indexOf(ge);if(Ae===-1){for(let ze=0;ze<A.length;ze++)if(ze>=b.length){b.push(ge),Ae=ze;break}else if(b[ze]===null){b[ze]=ge,Ae=ze;break}if(Ae===-1)break}const me=A[Ae];me&&me.connect(ge)}}const X=new I,re=new I;function te($,J,ge){X.setFromMatrixPosition(J.matrixWorld),re.setFromMatrixPosition(ge.matrixWorld);const Ae=X.distanceTo(re),me=J.projectionMatrix.elements,ze=ge.projectionMatrix.elements,ft=me[14]/(me[10]-1),Be=me[14]/(me[10]+1),tt=(me[9]+1)/me[5],R=(me[9]-1)/me[5],ke=(me[8]-1)/me[0],Xe=(ze[8]+1)/ze[0],Ze=ft*ke,ye=ft*Xe,it=Ae/(-ke+Xe),Ee=it*-ke;if(J.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ee),$.translateZ(it),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),me[10]===-1)$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const Ie=ft+it,w=Be+it,g=Ze-Ee,k=ye+(Ae-Ee),K=tt*Be/w*Ie,ee=R*Be/w*Ie;$.projectionMatrix.makePerspective(g,k,K,ee,Ie,w),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Me($,J){J===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(J.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let J=$.near,ge=$.far;m.texture!==null&&(m.depthNear>0&&(J=m.depthNear),m.depthFar>0&&(ge=m.depthFar)),N.near=_.near=y.near=J,N.far=_.far=y.far=ge,(B!==N.near||H!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),B=N.near,H=N.far),N.layers.mask=$.layers.mask|6,y.layers.mask=N.layers.mask&3,_.layers.mask=N.layers.mask&5;const Ae=$.parent,me=N.cameras;Me(N,Ae);for(let ze=0;ze<me.length;ze++)Me(me[ze],Ae);me.length===2?te(N,y,_):N.projectionMatrix.copy(y.projectionMatrix),Ne($,N,Ae)};function Ne($,J,ge){ge===null?$.matrix.copy(J.matrixWorld):($.matrix.copy(ge.matrixWorld),$.matrix.invert(),$.matrix.multiply(J.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(J.projectionMatrix),$.projectionMatrixInverse.copy(J.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=cr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function($){c=$,h!==null&&(h.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function($){return f[$]};let We=null;function Q($,J){if(u=J.getViewerPose(l||s),x=J,u!==null){const ge=u.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let Ae=!1;ge.length!==N.cameras.length&&(N.cameras.length=0,Ae=!0);for(let Be=0;Be<ge.length;Be++){const tt=ge[Be];let R=null;if(p!==null)R=p.getViewport(tt);else{const Xe=d.getViewSubImage(h,tt);R=Xe.viewport,Be===0&&(e.setRenderTargetTextures(S,Xe.colorTexture,Xe.depthStencilTexture),e.setRenderTarget(S))}let ke=L[Be];ke===void 0&&(ke=new qt,ke.layers.enable(Be),ke.viewport=new pt,L[Be]=ke),ke.matrix.fromArray(tt.transform.matrix),ke.matrix.decompose(ke.position,ke.quaternion,ke.scale),ke.projectionMatrix.fromArray(tt.projectionMatrix),ke.projectionMatrixInverse.copy(ke.projectionMatrix).invert(),ke.viewport.set(R.x,R.y,R.width,R.height),Be===0&&(N.matrix.copy(ke.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ae===!0&&N.cameras.push(ke)}const me=r.enabledFeatures;if(me&&me.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){d=n.getBinding();const Be=d.getDepthInformation(ge[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,r.renderState)}if(me&&me.includes("camera-access")&&v){e.state.unbindTexture(),d=n.getBinding();for(let Be=0;Be<ge.length;Be++){const tt=ge[Be].camera;if(tt){let R=f[tt];R||(R=new cl,f[tt]=R);const ke=d.getCameraImage(tt);R.sourceTexture=ke}}}}for(let ge=0;ge<A.length;ge++){const Ae=b[ge],me=A[ge];Ae!==null&&me!==void 0&&me.update(Ae,J,l||s)}We&&We($,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),x=null}const je=new fl;je.setAnimationLoop(Q),this.setAnimationLoop=function($){We=$},this.dispose=function(){}}}const Xn=new Sn,O0=new dt;function k0(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,nl(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,T,E,S){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(m,f):f.isMeshToonMaterial?(a(m,f),d(m,f)):f.isMeshPhongMaterial?(a(m,f),u(m,f)):f.isMeshStandardMaterial?(a(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(a(m,f),x(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),v(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(s(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,T,E):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Pt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Pt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const T=e.get(f),E=T.envMap,S=T.envMapRotation;E&&(m.envMap.value=E,Xn.copy(S),Xn.x*=-1,Xn.y*=-1,Xn.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Xn.y*=-1,Xn.z*=-1),m.envMapRotation.value.setFromMatrix4(O0.makeRotationFromEuler(Xn)),m.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function s(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,T,E){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*T,m.scale.value=E*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,T){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Pt&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const T=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function B0(i,e,t,n){let r={},a={},s=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,E){const S=E.program;n.uniformBlockBinding(T,S)}function l(T,E){let S=r[T.id];S===void 0&&(x(T),S=u(T),r[T.id]=S,T.addEventListener("dispose",m));const A=E.program;n.updateUBOMapping(T,A);const b=e.render.frame;a[T.id]!==b&&(h(T),a[T.id]=b)}function u(T){const E=d();T.__bindingPointIndex=E;const S=i.createBuffer(),A=T.__size,b=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,A,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,S),S}function d(){for(let T=0;T<o;T++)if(s.indexOf(T)===-1)return s.push(T),T;return ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(T){const E=r[T.id],S=T.uniforms,A=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let b=0,P=S.length;b<P;b++){const D=Array.isArray(S[b])?S[b]:[S[b]];for(let y=0,_=D.length;y<_;y++){const L=D[y];if(p(L,b,y,A)===!0){const N=L.__offset,B=Array.isArray(L.value)?L.value:[L.value];let H=0;for(let j=0;j<B.length;j++){const Y=B[j],ae=v(Y);typeof Y=="number"||typeof Y=="boolean"?(L.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,N+H,L.__data)):Y.isMatrix3?(L.__data[0]=Y.elements[0],L.__data[1]=Y.elements[1],L.__data[2]=Y.elements[2],L.__data[3]=0,L.__data[4]=Y.elements[3],L.__data[5]=Y.elements[4],L.__data[6]=Y.elements[5],L.__data[7]=0,L.__data[8]=Y.elements[6],L.__data[9]=Y.elements[7],L.__data[10]=Y.elements[8],L.__data[11]=0):(Y.toArray(L.__data,H),H+=ae.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(T,E,S,A){const b=T.value,P=E+"_"+S;if(A[P]===void 0)return typeof b=="number"||typeof b=="boolean"?A[P]=b:A[P]=b.clone(),!0;{const D=A[P];if(typeof b=="number"||typeof b=="boolean"){if(D!==b)return A[P]=b,!0}else if(D.equals(b)===!1)return D.copy(b),!0}return!1}function x(T){const E=T.uniforms;let S=0;const A=16;for(let P=0,D=E.length;P<D;P++){const y=Array.isArray(E[P])?E[P]:[E[P]];for(let _=0,L=y.length;_<L;_++){const N=y[_],B=Array.isArray(N.value)?N.value:[N.value];for(let H=0,j=B.length;H<j;H++){const Y=B[H],ae=v(Y),X=S%A,re=X%ae.boundary,te=X+re;S+=re,te!==0&&A-te<ae.storage&&(S+=A-te),N.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=S,S+=ae.storage}}}const b=S%A;return b>0&&(S+=A-b),T.__size=S,T.__cache={},this}function v(T){const E={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(E.boundary=4,E.storage=4):T.isVector2?(E.boundary=8,E.storage=8):T.isVector3||T.isColor?(E.boundary=16,E.storage=12):T.isVector4?(E.boundary=16,E.storage=16):T.isMatrix3?(E.boundary=48,E.storage=48):T.isMatrix4?(E.boundary=64,E.storage=64):T.isTexture?Oe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Oe("WebGLRenderer: Unsupported uniform value type.",T),E}function m(T){const E=T.target;E.removeEventListener("dispose",m);const S=s.indexOf(E.__bindingPointIndex);s.splice(S,1),i.deleteBuffer(r[E.id]),delete r[E.id],delete a[E.id]}function f(){for(const T in r)i.deleteBuffer(r[T]);s=[],r={},a={}}return{bind:c,update:l,dispose:f}}const V0=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let pn=null;function G0(){return pn===null&&(pn=new Ad(V0,32,32,Js,Fi),pn.minFilter=jt,pn.magFilter=jt,pn.wrapS=gn,pn.wrapT=gn,pn.generateMipmaps=!1,pn.needsUpdate=!0),pn}class H0{constructor(e={}){const{canvas:t=Ou(),context:n=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=s;const x=new Set([eo,Qs,Zs]),v=new Set([bn,ti,nr,ir,$s,Ks]),m=new Uint32Array(4),f=new Int32Array(4);let T=null,E=null;const S=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let P=!1;this._outputColorSpace=It;let D=0,y=0,_=null,L=-1,N=null;const B=new pt,H=new pt;let j=null;const Y=new Ke(0);let ae=0,X=t.width,re=t.height,te=1,Me=null,Ne=null;const We=new pt(0,0,X,re),Q=new pt(0,0,X,re);let je=!1;const $=new al;let J=!1,ge=!1;const Ae=new dt,me=new I,ze=new pt,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function tt(){return _===null?te:1}let R=n;function ke(M,U){return t.getContext(M,U)}try{const M={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${js}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",Z,!1),t.addEventListener("webglcontextcreationerror",be,!1),R===null){const U="webgl2";if(R=ke(U,M),R===null)throw ke(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw M("WebGLRenderer: "+M.message),M}let Xe,Ze,ye,it,Ee,Ie,w,g,k,K,ee,W,we,he,Te,F,O,q,fe,de,ie,se,C,le;function oe(){Xe=new Zp(R),Xe.init(),se=new U0(R,Xe),Ze=new Gp(R,Xe,e,se),ye=new L0(R,Xe),Ze.reversedDepthBuffer&&h&&ye.buffers.depth.setReversed(!0),it=new em(R),Ee=new _0,Ie=new D0(R,Xe,ye,Ee,Ze,se,it),w=new Wp(b),g=new Kp(b),k=new ih(R),C=new Bp(R,k),K=new Jp(R,k,it,C),ee=new nm(R,K,k,it),fe=new tm(R,Ze,Ie),F=new Hp(Ee),W=new g0(b,w,g,Xe,Ze,C,F),we=new k0(b,Ee),he=new M0,Te=new T0(Xe),q=new kp(b,w,g,ye,ee,p,c),O=new R0(b,ee,Ze),le=new B0(R,it,Ze,ye),de=new Vp(R,Xe,it),ie=new Qp(R,Xe,it),it.programs=W.programs,b.capabilities=Ze,b.extensions=Xe,b.properties=Ee,b.renderLists=he,b.shadowMap=O,b.state=ye,b.info=it}oe();const ue=new F0(b,R);this.xr=ue,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const M=Xe.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Xe.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return te},this.setPixelRatio=function(M){M!==void 0&&(te=M,this.setSize(X,re,!1))},this.getSize=function(M){return M.set(X,re)},this.setSize=function(M,U,V=!0){if(ue.isPresenting){Oe("WebGLRenderer: Can't change size while VR device is presenting.");return}X=M,re=U,t.width=Math.floor(M*te),t.height=Math.floor(U*te),V===!0&&(t.style.width=M+"px",t.style.height=U+"px"),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(X*te,re*te).floor()},this.setDrawingBufferSize=function(M,U,V){X=M,re=U,te=V,t.width=Math.floor(M*V),t.height=Math.floor(U*V),this.setViewport(0,0,M,U)},this.getCurrentViewport=function(M){return M.copy(B)},this.getViewport=function(M){return M.copy(We)},this.setViewport=function(M,U,V,G){M.isVector4?We.set(M.x,M.y,M.z,M.w):We.set(M,U,V,G),ye.viewport(B.copy(We).multiplyScalar(te).round())},this.getScissor=function(M){return M.copy(Q)},this.setScissor=function(M,U,V,G){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,U,V,G),ye.scissor(H.copy(Q).multiplyScalar(te).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(M){ye.setScissorTest(je=M)},this.setOpaqueSort=function(M){Me=M},this.setTransparentSort=function(M){Ne=M},this.getClearColor=function(M){return M.copy(q.getClearColor())},this.setClearColor=function(){q.setClearColor(...arguments)},this.getClearAlpha=function(){return q.getClearAlpha()},this.setClearAlpha=function(){q.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,V=!0){let G=0;if(M){let z=!1;if(_!==null){const ce=_.texture.format;z=x.has(ce)}if(z){const ce=_.texture.type,xe=v.has(ce),Se=q.getClearColor(),_e=q.getClearAlpha(),Le=Se.r,Ue=Se.g,Ce=Se.b;xe?(m[0]=Le,m[1]=Ue,m[2]=Ce,m[3]=_e,R.clearBufferuiv(R.COLOR,0,m)):(f[0]=Le,f[1]=Ue,f[2]=Ce,f[3]=_e,R.clearBufferiv(R.COLOR,0,f))}else G|=R.COLOR_BUFFER_BIT}U&&(G|=R.DEPTH_BUFFER_BIT),V&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",Z,!1),t.removeEventListener("webglcontextcreationerror",be,!1),q.dispose(),he.dispose(),Te.dispose(),Ee.dispose(),w.dispose(),g.dispose(),ee.dispose(),C.dispose(),le.dispose(),W.dispose(),ue.dispose(),ue.removeEventListener("sessionstart",vo),ue.removeEventListener("sessionend",Mo),On.stop()};function ne(M){M.preventDefault(),Oo("WebGLRenderer: Context Lost."),P=!0}function Z(){Oo("WebGLRenderer: Context Restored."),P=!1;const M=it.autoReset,U=O.enabled,V=O.autoUpdate,G=O.needsUpdate,z=O.type;oe(),it.autoReset=M,O.enabled=U,O.autoUpdate=V,O.needsUpdate=G,O.type=z}function be(M){ut("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Fe(M){const U=M.target;U.removeEventListener("dispose",Fe),rt(U)}function rt(M){Je(M),Ee.remove(M)}function Je(M){const U=Ee.get(M).programs;U!==void 0&&(U.forEach(function(V){W.releaseProgram(V)}),M.isShaderMaterial&&W.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,V,G,z,ce){U===null&&(U=ft);const xe=z.isMesh&&z.matrixWorld.determinant()<0,Se=Ll(M,U,V,G,z);ye.setMaterial(G,xe);let _e=V.index,Le=1;if(G.wireframe===!0){if(_e=K.getWireframeAttribute(V),_e===void 0)return;Le=2}const Ue=V.drawRange,Ce=V.attributes.position;let qe=Ue.start*Le,Qe=(Ue.start+Ue.count)*Le;ce!==null&&(qe=Math.max(qe,ce.start*Le),Qe=Math.min(Qe,(ce.start+ce.count)*Le)),_e!==null?(qe=Math.max(qe,0),Qe=Math.min(Qe,_e.count)):Ce!=null&&(qe=Math.max(qe,0),Qe=Math.min(Qe,Ce.count));const ct=Qe-qe;if(ct<0||ct===1/0)return;C.setup(z,G,Se,V,_e);let lt,nt=de;if(_e!==null&&(lt=k.get(_e),nt=ie,nt.setIndex(lt)),z.isMesh)G.wireframe===!0?(ye.setLineWidth(G.wireframeLinewidth*tt()),nt.setMode(R.LINES)):nt.setMode(R.TRIANGLES);else if(z.isLine){let Pe=G.linewidth;Pe===void 0&&(Pe=1),ye.setLineWidth(Pe*tt()),z.isLineSegments?nt.setMode(R.LINES):z.isLineLoop?nt.setMode(R.LINE_LOOP):nt.setMode(R.LINE_STRIP)}else z.isPoints?nt.setMode(R.POINTS):z.isSprite&&nt.setMode(R.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)or("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Xe.get("WEBGL_multi_draw"))nt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const Pe=z._multiDrawStarts,st=z._multiDrawCounts,Ye=z._multiDrawCount,Ft=_e?k.get(_e).bytesPerElement:1,oi=Ee.get(G).currentProgram.getUniforms();for(let Ot=0;Ot<Ye;Ot++)oi.setValue(R,"_gl_DrawID",Ot),nt.render(Pe[Ot]/Ft,st[Ot])}else if(z.isInstancedMesh)nt.renderInstances(qe,ct,z.count);else if(V.isInstancedBufferGeometry){const Pe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,st=Math.min(V.instanceCount,Pe);nt.renderInstances(qe,ct,st)}else nt.render(qe,ct)};function rn(M,U,V){M.transparent===!0&&M.side===sn&&M.forceSinglePass===!1?(M.side=Pt,M.needsUpdate=!0,_r(M,U,V),M.side=yn,M.needsUpdate=!0,_r(M,U,V),M.side=sn):_r(M,U,V)}this.compile=function(M,U,V=null){V===null&&(V=M),E=Te.get(V),E.init(U),A.push(E),V.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),M!==V&&M.traverseVisible(function(z){z.isLight&&z.layers.test(U.layers)&&(E.pushLight(z),z.castShadow&&E.pushShadow(z))}),E.setupLights();const G=new Set;return M.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const ce=z.material;if(ce)if(Array.isArray(ce))for(let xe=0;xe<ce.length;xe++){const Se=ce[xe];rn(Se,V,z),G.add(Se)}else rn(ce,V,z),G.add(ce)}),E=A.pop(),G},this.compileAsync=function(M,U,V=null){const G=this.compile(M,U,V);return new Promise(z=>{function ce(){if(G.forEach(function(xe){Ee.get(xe).currentProgram.isReady()&&G.delete(xe)}),G.size===0){z(M);return}setTimeout(ce,10)}Xe.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let $t=null;function Pl(M){$t&&$t(M)}function vo(){On.stop()}function Mo(){On.start()}const On=new fl;On.setAnimationLoop(Pl),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(M){$t=M,ue.setAnimationLoop(M),M===null?On.stop():On.start()},ue.addEventListener("sessionstart",vo),ue.addEventListener("sessionend",Mo),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ue.enabled===!0&&ue.isPresenting===!0&&(ue.cameraAutoUpdate===!0&&ue.updateCamera(U),U=ue.getCamera()),M.isScene===!0&&M.onBeforeRender(b,M,U,_),E=Te.get(M,A.length),E.init(U),A.push(E),Ae.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(Ae,on,U.reversedDepth),ge=this.localClippingEnabled,J=F.init(this.clippingPlanes,ge),T=he.get(M,S.length),T.init(),S.push(T),ue.enabled===!0&&ue.isPresenting===!0){const ce=b.xr.getDepthSensingMesh();ce!==null&&ca(ce,U,-1/0,b.sortObjects)}ca(M,U,0,b.sortObjects),T.finish(),b.sortObjects===!0&&T.sort(Me,Ne),Be=ue.enabled===!1||ue.isPresenting===!1||ue.hasDepthSensing()===!1,Be&&q.addToRenderList(T,M),this.info.render.frame++,J===!0&&F.beginShadows();const V=E.state.shadowsArray;O.render(V,M,U),J===!0&&F.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=T.opaque,z=T.transmissive;if(E.setupLights(),U.isArrayCamera){const ce=U.cameras;if(z.length>0)for(let xe=0,Se=ce.length;xe<Se;xe++){const _e=ce[xe];bo(G,z,M,_e)}Be&&q.render(M);for(let xe=0,Se=ce.length;xe<Se;xe++){const _e=ce[xe];yo(T,M,_e,_e.viewport)}}else z.length>0&&bo(G,z,M,U),Be&&q.render(M),yo(T,M,U);_!==null&&y===0&&(Ie.updateMultisampleRenderTarget(_),Ie.updateRenderTargetMipmap(_)),M.isScene===!0&&M.onAfterRender(b,M,U),C.resetDefaultState(),L=-1,N=null,A.pop(),A.length>0?(E=A[A.length-1],J===!0&&F.setGlobalState(b.clippingPlanes,E.state.camera)):E=null,S.pop(),S.length>0?T=S[S.length-1]:T=null};function ca(M,U,V,G){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)E.pushLight(M),M.castShadow&&E.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||$.intersectsSprite(M)){G&&ze.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ae);const xe=ee.update(M),Se=M.material;Se.visible&&T.push(M,xe,Se,V,ze.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||$.intersectsObject(M))){const xe=ee.update(M),Se=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),ze.copy(M.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),ze.copy(xe.boundingSphere.center)),ze.applyMatrix4(M.matrixWorld).applyMatrix4(Ae)),Array.isArray(Se)){const _e=xe.groups;for(let Le=0,Ue=_e.length;Le<Ue;Le++){const Ce=_e[Le],qe=Se[Ce.materialIndex];qe&&qe.visible&&T.push(M,xe,qe,V,ze.z,Ce)}}else Se.visible&&T.push(M,xe,Se,V,ze.z,null)}}const ce=M.children;for(let xe=0,Se=ce.length;xe<Se;xe++)ca(ce[xe],U,V,G)}function yo(M,U,V,G){const{opaque:z,transmissive:ce,transparent:xe}=M;E.setupLightsView(V),J===!0&&F.setGlobalState(b.clippingPlanes,V),G&&ye.viewport(B.copy(G)),z.length>0&&gr(z,U,V),ce.length>0&&gr(ce,U,V),xe.length>0&&gr(xe,U,V),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function bo(M,U,V,G){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;E.state.transmissionRenderTarget[G.id]===void 0&&(E.state.transmissionRenderTarget[G.id]=new ni(1,1,{generateMipmaps:!0,type:Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float")?Fi:bn,minFilter:Jn,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const ce=E.state.transmissionRenderTarget[G.id],xe=G.viewport||B;ce.setSize(xe.z*b.transmissionResolutionScale,xe.w*b.transmissionResolutionScale);const Se=b.getRenderTarget(),_e=b.getActiveCubeFace(),Le=b.getActiveMipmapLevel();b.setRenderTarget(ce),b.getClearColor(Y),ae=b.getClearAlpha(),ae<1&&b.setClearColor(16777215,.5),b.clear(),Be&&q.render(V);const Ue=b.toneMapping;b.toneMapping=Nn;const Ce=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),J===!0&&F.setGlobalState(b.clippingPlanes,G),gr(M,V,G),Ie.updateMultisampleRenderTarget(ce),Ie.updateRenderTargetMipmap(ce),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let Qe=0,ct=U.length;Qe<ct;Qe++){const lt=U[Qe],{object:nt,geometry:Pe,material:st,group:Ye}=lt;if(st.side===sn&&nt.layers.test(G.layers)){const Ft=st.side;st.side=Pt,st.needsUpdate=!0,So(nt,V,G,Pe,st,Ye),st.side=Ft,st.needsUpdate=!0,qe=!0}}qe===!0&&(Ie.updateMultisampleRenderTarget(ce),Ie.updateRenderTargetMipmap(ce))}b.setRenderTarget(Se,_e,Le),b.setClearColor(Y,ae),Ce!==void 0&&(G.viewport=Ce),b.toneMapping=Ue}function gr(M,U,V){const G=U.isScene===!0?U.overrideMaterial:null;for(let z=0,ce=M.length;z<ce;z++){const xe=M[z],{object:Se,geometry:_e,group:Le}=xe;let Ue=xe.material;Ue.allowOverride===!0&&G!==null&&(Ue=G),Se.layers.test(V.layers)&&So(Se,U,V,_e,Ue,Le)}}function So(M,U,V,G,z,ce){M.onBeforeRender(b,U,V,G,z,ce),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(b,U,V,G,M,ce),z.transparent===!0&&z.side===sn&&z.forceSinglePass===!1?(z.side=Pt,z.needsUpdate=!0,b.renderBufferDirect(V,U,G,z,M,ce),z.side=yn,z.needsUpdate=!0,b.renderBufferDirect(V,U,G,z,M,ce),z.side=sn):b.renderBufferDirect(V,U,G,z,M,ce),M.onAfterRender(b,U,V,G,z,ce)}function _r(M,U,V){U.isScene!==!0&&(U=ft);const G=Ee.get(M),z=E.state.lights,ce=E.state.shadowsArray,xe=z.state.version,Se=W.getParameters(M,z.state,ce,U,V),_e=W.getProgramCacheKey(Se);let Le=G.programs;G.environment=M.isMeshStandardMaterial?U.environment:null,G.fog=U.fog,G.envMap=(M.isMeshStandardMaterial?g:w).get(M.envMap||G.environment),G.envMapRotation=G.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Le===void 0&&(M.addEventListener("dispose",Fe),Le=new Map,G.programs=Le);let Ue=Le.get(_e);if(Ue!==void 0){if(G.currentProgram===Ue&&G.lightsStateVersion===xe)return wo(M,Se),Ue}else Se.uniforms=W.getUniforms(M),M.onBeforeCompile(Se,b),Ue=W.acquireProgram(Se,_e),Le.set(_e,Ue),G.uniforms=Se.uniforms;const Ce=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ce.clippingPlanes=F.uniform),wo(M,Se),G.needsLights=Ul(M),G.lightsStateVersion=xe,G.needsLights&&(Ce.ambientLightColor.value=z.state.ambient,Ce.lightProbe.value=z.state.probe,Ce.directionalLights.value=z.state.directional,Ce.directionalLightShadows.value=z.state.directionalShadow,Ce.spotLights.value=z.state.spot,Ce.spotLightShadows.value=z.state.spotShadow,Ce.rectAreaLights.value=z.state.rectArea,Ce.ltc_1.value=z.state.rectAreaLTC1,Ce.ltc_2.value=z.state.rectAreaLTC2,Ce.pointLights.value=z.state.point,Ce.pointLightShadows.value=z.state.pointShadow,Ce.hemisphereLights.value=z.state.hemi,Ce.directionalShadowMap.value=z.state.directionalShadowMap,Ce.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ce.spotShadowMap.value=z.state.spotShadowMap,Ce.spotLightMatrix.value=z.state.spotLightMatrix,Ce.spotLightMap.value=z.state.spotLightMap,Ce.pointShadowMap.value=z.state.pointShadowMap,Ce.pointShadowMatrix.value=z.state.pointShadowMatrix),G.currentProgram=Ue,G.uniformsList=null,Ue}function Eo(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=$r.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function wo(M,U){const V=Ee.get(M);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function Ll(M,U,V,G,z){U.isScene!==!0&&(U=ft),Ie.resetTextureUnits();const ce=U.fog,xe=G.isMeshStandardMaterial?U.environment:null,Se=_===null?b.outputColorSpace:_.isXRRenderTarget===!0?_.texture.colorSpace:Ii,_e=(G.isMeshStandardMaterial?g:w).get(G.envMap||xe),Le=G.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ue=!!V.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Ce=!!V.morphAttributes.position,qe=!!V.morphAttributes.normal,Qe=!!V.morphAttributes.color;let ct=Nn;G.toneMapped&&(_===null||_.isXRRenderTarget===!0)&&(ct=b.toneMapping);const lt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,nt=lt!==void 0?lt.length:0,Pe=Ee.get(G),st=E.state.lights;if(J===!0&&(ge===!0||M!==N)){const At=M===N&&G.id===L;F.setState(G,M,At)}let Ye=!1;G.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==st.state.version||Pe.outputColorSpace!==Se||z.isBatchedMesh&&Pe.batching===!1||!z.isBatchedMesh&&Pe.batching===!0||z.isBatchedMesh&&Pe.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&Pe.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&Pe.instancing===!1||!z.isInstancedMesh&&Pe.instancing===!0||z.isSkinnedMesh&&Pe.skinning===!1||!z.isSkinnedMesh&&Pe.skinning===!0||z.isInstancedMesh&&Pe.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Pe.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Pe.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Pe.instancingMorph===!1&&z.morphTexture!==null||Pe.envMap!==_e||G.fog===!0&&Pe.fog!==ce||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==F.numPlanes||Pe.numIntersection!==F.numIntersection)||Pe.vertexAlphas!==Le||Pe.vertexTangents!==Ue||Pe.morphTargets!==Ce||Pe.morphNormals!==qe||Pe.morphColors!==Qe||Pe.toneMapping!==ct||Pe.morphTargetsCount!==nt)&&(Ye=!0):(Ye=!0,Pe.__version=G.version);let Ft=Pe.currentProgram;Ye===!0&&(Ft=_r(G,U,z));let oi=!1,Ot=!1,Vi=!1;const ot=Ft.getUniforms(),Dt=Pe.uniforms;if(ye.useProgram(Ft.program)&&(oi=!0,Ot=!0,Vi=!0),G.id!==L&&(L=G.id,Ot=!0),oi||N!==M){ye.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),ot.setValue(R,"projectionMatrix",M.projectionMatrix),ot.setValue(R,"viewMatrix",M.matrixWorldInverse);const Ut=ot.map.cameraPosition;Ut!==void 0&&Ut.setValue(R,me.setFromMatrixPosition(M.matrixWorld)),Ze.logarithmicDepthBuffer&&ot.setValue(R,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&ot.setValue(R,"isOrthographic",M.isOrthographicCamera===!0),N!==M&&(N=M,Ot=!0,Vi=!0)}if(z.isSkinnedMesh){ot.setOptional(R,z,"bindMatrix"),ot.setOptional(R,z,"bindMatrixInverse");const At=z.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),ot.setValue(R,"boneTexture",At.boneTexture,Ie))}z.isBatchedMesh&&(ot.setOptional(R,z,"batchingTexture"),ot.setValue(R,"batchingTexture",z._matricesTexture,Ie),ot.setOptional(R,z,"batchingIdTexture"),ot.setValue(R,"batchingIdTexture",z._indirectTexture,Ie),ot.setOptional(R,z,"batchingColorTexture"),z._colorsTexture!==null&&ot.setValue(R,"batchingColorTexture",z._colorsTexture,Ie));const Wt=V.morphAttributes;if((Wt.position!==void 0||Wt.normal!==void 0||Wt.color!==void 0)&&fe.update(z,V,Ft),(Ot||Pe.receiveShadow!==z.receiveShadow)&&(Pe.receiveShadow=z.receiveShadow,ot.setValue(R,"receiveShadow",z.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Dt.envMap.value=_e,Dt.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&U.environment!==null&&(Dt.envMapIntensity.value=U.environmentIntensity),Dt.dfgLUT!==void 0&&(Dt.dfgLUT.value=G0()),Ot&&(ot.setValue(R,"toneMappingExposure",b.toneMappingExposure),Pe.needsLights&&Dl(Dt,Vi),ce&&G.fog===!0&&we.refreshFogUniforms(Dt,ce),we.refreshMaterialUniforms(Dt,G,te,re,E.state.transmissionRenderTarget[M.id]),$r.upload(R,Eo(Pe),Dt,Ie)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&($r.upload(R,Eo(Pe),Dt,Ie),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&ot.setValue(R,"center",z.center),ot.setValue(R,"modelViewMatrix",z.modelViewMatrix),ot.setValue(R,"normalMatrix",z.normalMatrix),ot.setValue(R,"modelMatrix",z.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const At=G.uniformsGroups;for(let Ut=0,la=At.length;Ut<la;Ut++){const kn=At[Ut];le.update(kn,Ft),le.bind(kn,Ft)}}return Ft}function Dl(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function Ul(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return _},this.setRenderTargetTextures=function(M,U,V){const G=Ee.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Ee.get(M.texture).__webglTexture=U,Ee.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:V,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const V=Ee.get(M);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0};const Il=R.createFramebuffer();this.setRenderTarget=function(M,U=0,V=0){_=M,D=U,y=V;let G=!0,z=null,ce=!1,xe=!1;if(M){const _e=Ee.get(M);if(_e.__useDefaultFramebuffer!==void 0)ye.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(_e.__webglFramebuffer===void 0)Ie.setupRenderTarget(M);else if(_e.__hasExternalTextures)Ie.rebindTextures(M,Ee.get(M.texture).__webglTexture,Ee.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ce=M.depthTexture;if(_e.__boundDepthTexture!==Ce){if(Ce!==null&&Ee.has(Ce)&&(M.width!==Ce.image.width||M.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(M)}}const Le=M.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(xe=!0);const Ue=Ee.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?z=Ue[U][V]:z=Ue[U],ce=!0):M.samples>0&&Ie.useMultisampledRTT(M)===!1?z=Ee.get(M).__webglMultisampledFramebuffer:Array.isArray(Ue)?z=Ue[V]:z=Ue,B.copy(M.viewport),H.copy(M.scissor),j=M.scissorTest}else B.copy(We).multiplyScalar(te).floor(),H.copy(Q).multiplyScalar(te).floor(),j=je;if(V!==0&&(z=Il),ye.bindFramebuffer(R.FRAMEBUFFER,z)&&G&&ye.drawBuffers(M,z),ye.viewport(B),ye.scissor(H),ye.setScissorTest(j),ce){const _e=Ee.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,_e.__webglTexture,V)}else if(xe){const _e=U;for(let Le=0;Le<M.textures.length;Le++){const Ue=Ee.get(M.textures[Le]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Le,Ue.__webglTexture,V,_e)}}else if(M!==null&&V!==0){const _e=Ee.get(M.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,_e.__webglTexture,V)}L=-1},this.readRenderTargetPixels=function(M,U,V,G,z,ce,xe,Se=0){if(!(M&&M.isWebGLRenderTarget)){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Ee.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xe!==void 0&&(_e=_e[xe]),_e){ye.bindFramebuffer(R.FRAMEBUFFER,_e);try{const Le=M.textures[Se],Ue=Le.format,Ce=Le.type;if(!Ze.textureFormatReadable(Ue)){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ze.textureTypeReadable(Ce)){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-G&&V>=0&&V<=M.height-z&&(M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+Se),R.readPixels(U,V,G,z,se.convert(Ue),se.convert(Ce),ce))}finally{const Le=_!==null?Ee.get(_).__webglFramebuffer:null;ye.bindFramebuffer(R.FRAMEBUFFER,Le)}}},this.readRenderTargetPixelsAsync=async function(M,U,V,G,z,ce,xe,Se=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Ee.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&xe!==void 0&&(_e=_e[xe]),_e)if(U>=0&&U<=M.width-G&&V>=0&&V<=M.height-z){ye.bindFramebuffer(R.FRAMEBUFFER,_e);const Le=M.textures[Se],Ue=Le.format,Ce=Le.type;if(!Ze.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ze.textureTypeReadable(Ce))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const qe=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,qe),R.bufferData(R.PIXEL_PACK_BUFFER,ce.byteLength,R.STREAM_READ),M.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+Se),R.readPixels(U,V,G,z,se.convert(Ue),se.convert(Ce),0);const Qe=_!==null?Ee.get(_).__webglFramebuffer:null;ye.bindFramebuffer(R.FRAMEBUFFER,Qe);const ct=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await ku(R,ct,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,qe),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,ce),R.deleteBuffer(qe),R.deleteSync(ct),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,V=0){const G=Math.pow(2,-V),z=Math.floor(M.image.width*G),ce=Math.floor(M.image.height*G),xe=U!==null?U.x:0,Se=U!==null?U.y:0;Ie.setTexture2D(M,0),R.copyTexSubImage2D(R.TEXTURE_2D,V,0,0,xe,Se,z,ce),ye.unbindTexture()};const Nl=R.createFramebuffer(),zl=R.createFramebuffer();this.copyTextureToTexture=function(M,U,V=null,G=null,z=0,ce=null){ce===null&&(z!==0?(or("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ce=z,z=0):ce=0);let xe,Se,_e,Le,Ue,Ce,qe,Qe,ct;const lt=M.isCompressedTexture?M.mipmaps[ce]:M.image;if(V!==null)xe=V.max.x-V.min.x,Se=V.max.y-V.min.y,_e=V.isBox3?V.max.z-V.min.z:1,Le=V.min.x,Ue=V.min.y,Ce=V.isBox3?V.min.z:0;else{const Wt=Math.pow(2,-z);xe=Math.floor(lt.width*Wt),Se=Math.floor(lt.height*Wt),M.isDataArrayTexture?_e=lt.depth:M.isData3DTexture?_e=Math.floor(lt.depth*Wt):_e=1,Le=0,Ue=0,Ce=0}G!==null?(qe=G.x,Qe=G.y,ct=G.z):(qe=0,Qe=0,ct=0);const nt=se.convert(U.format),Pe=se.convert(U.type);let st;U.isData3DTexture?(Ie.setTexture3D(U,0),st=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ie.setTexture2DArray(U,0),st=R.TEXTURE_2D_ARRAY):(Ie.setTexture2D(U,0),st=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const Ye=R.getParameter(R.UNPACK_ROW_LENGTH),Ft=R.getParameter(R.UNPACK_IMAGE_HEIGHT),oi=R.getParameter(R.UNPACK_SKIP_PIXELS),Ot=R.getParameter(R.UNPACK_SKIP_ROWS),Vi=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,lt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,lt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Le),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ue),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ce);const ot=M.isDataArrayTexture||M.isData3DTexture,Dt=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Wt=Ee.get(M),At=Ee.get(U),Ut=Ee.get(Wt.__renderTarget),la=Ee.get(At.__renderTarget);ye.bindFramebuffer(R.READ_FRAMEBUFFER,Ut.__webglFramebuffer),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,la.__webglFramebuffer);for(let kn=0;kn<_e;kn++)ot&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ee.get(M).__webglTexture,z,Ce+kn),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Ee.get(U).__webglTexture,ce,ct+kn)),R.blitFramebuffer(Le,Ue,xe,Se,qe,Qe,xe,Se,R.DEPTH_BUFFER_BIT,R.NEAREST);ye.bindFramebuffer(R.READ_FRAMEBUFFER,null),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(z!==0||M.isRenderTargetTexture||Ee.has(M)){const Wt=Ee.get(M),At=Ee.get(U);ye.bindFramebuffer(R.READ_FRAMEBUFFER,Nl),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,zl);for(let Ut=0;Ut<_e;Ut++)ot?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Wt.__webglTexture,z,Ce+Ut):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Wt.__webglTexture,z),Dt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,At.__webglTexture,ce,ct+Ut):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,At.__webglTexture,ce),z!==0?R.blitFramebuffer(Le,Ue,xe,Se,qe,Qe,xe,Se,R.COLOR_BUFFER_BIT,R.NEAREST):Dt?R.copyTexSubImage3D(st,ce,qe,Qe,ct+Ut,Le,Ue,xe,Se):R.copyTexSubImage2D(st,ce,qe,Qe,Le,Ue,xe,Se);ye.bindFramebuffer(R.READ_FRAMEBUFFER,null),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Dt?M.isDataTexture||M.isData3DTexture?R.texSubImage3D(st,ce,qe,Qe,ct,xe,Se,_e,nt,Pe,lt.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(st,ce,qe,Qe,ct,xe,Se,_e,nt,lt.data):R.texSubImage3D(st,ce,qe,Qe,ct,xe,Se,_e,nt,Pe,lt):M.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,ce,qe,Qe,xe,Se,nt,Pe,lt.data):M.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,ce,qe,Qe,lt.width,lt.height,nt,lt.data):R.texSubImage2D(R.TEXTURE_2D,ce,qe,Qe,xe,Se,nt,Pe,lt);R.pixelStorei(R.UNPACK_ROW_LENGTH,Ye),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ft),R.pixelStorei(R.UNPACK_SKIP_PIXELS,oi),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ot),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Vi),ce===0&&U.generateMipmaps&&R.generateMipmap(st),ye.unbindTexture()},this.initRenderTarget=function(M){Ee.get(M).__webglFramebuffer===void 0&&Ie.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Ie.setTextureCube(M,0):M.isData3DTexture?Ie.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Ie.setTexture2DArray(M,0):Ie.setTexture2D(M,0),ye.unbindTexture()},this.resetState=function(){D=0,y=0,_=null,ye.reset(),C.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return on}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}const wt=Math.PI/180,W0=6371,X0=946728e6;function _l(i){const e=(i.getTime()-X0)/864e5,t=(357.529+.98560028*e)*wt,n=280.459+.98564736*e,r=(n+1.915*Math.sin(t)+.02*Math.sin(2*t))*wt,a=(23.439-36e-8*e)*wt,s=Math.atan2(Math.cos(a)*Math.sin(r),Math.cos(r))/wt,o=Math.asin(Math.sin(a)*Math.sin(r))/wt;let c=(n-s)/15;c=((c+12)%24+24)%24-12;const l=i.getUTCHours()+i.getUTCMinutes()/60+i.getUTCSeconds()/3600;return{lat:o,lng:q0(-15*(l-12+c))}}function vl(i,e,t){const n=_l(t);return 90-Ml(i,e,n.lat,n.lng)/wt}function q0(i){return((i+180)%360+360)%360-180}function Ml(i,e,t,n){const r=(t-i)*wt,a=(n-e)*wt,s=Math.sin(r/2)**2+Math.cos(i*wt)*Math.cos(t*wt)*Math.sin(a/2)**2;return 2*Math.asin(Math.min(1,Math.sqrt(s)))}function uo(i,e,t,n){return Ml(i,e,t,n)*W0}function j0(i,e,t=64){const n=Lc(i.lat,i.lng),r=Lc(e.lat,e.lng),a=Math.acos(Math.max(-1,Math.min(1,n[0]*r[0]+n[1]*r[1]+n[2]*r[2]))),s=[];for(let o=0;o<=t;o++){const c=o/t;let l;if(a<1e-6)l=n;else{const u=Math.sin(a),d=Math.sin((1-c)*a)/u,h=Math.sin(c*a)/u;l=[n[0]*d+r[0]*h,n[1]*d+r[1]*h,n[2]*d+r[2]*h]}s.push({lat:Math.asin(l[2])/wt,lng:Math.atan2(l[1],l[0])/wt,t:c})}return s}function Lc(i,e){const t=Math.cos(i*wt);return[t*Math.cos(e*wt),t*Math.sin(e*wt),Math.sin(i*wt)]}function Y0(i){return i<25?1e3:Math.max(0,Math.round(1e3*Math.exp(-i/1600)))}function $0(i){return Math.round(i/850*60+30)}const K0=new Intl.NumberFormat("pl-PL",{maximumFractionDigits:0});function yl(i){return i<10?i.toFixed(1).replace(".",",")+" km":K0.format(Math.round(i))+" km"}function Z0(i){const e=Math.floor(i/60),t=i%60;return e?`${e} h ${String(t).padStart(2,"0")} min`:`${t} min`}function ho(i,e){return`${Math.abs(i).toFixed(2).replace(".",",")}° ${i>=0?"N":"S"}   ${Math.abs(e).toFixed(2).replace(".",",")}° ${e>=0?"E":"W"}`}const Dc=new Map;function bl(i,e,t){if(e){let r=Dc.get(e);return r||Dc.set(e,r=new Intl.DateTimeFormat("pl-PL",{timeZone:e,hour:"2-digit",minute:"2-digit"})),r.format(i)}const n=new Date(i.getTime()+t/15*36e5);return`${String(n.getUTCHours()).padStart(2,"0")}:${String(n.getUTCMinutes()).padStart(2,"0")}`}function J0(i){return i>6?`dzień, Słońce ${Math.round(i)}° nad horyzontem`:i>-.8?"wschód albo zachód Słońca":i>-6?"zmierzch cywilny":i>-18?"zmierzch, niebo jeszcze nie całkiem ciemne":"noc"}const Sl="https://tiles.maps.eox.at/wmts/1.0.0/",Q0=(i,e,t)=>`${Sl}s2cloudless-2017_3857/default/g/${i}/${t}/${e}.jpg`,ex=(i,e,t)=>`${Sl}overlay_bright_3857/default/g/${i}/${t}/${e}.png`,tx=14,nx=64,Uc=240,ix=8,rx=1.0001,ax=1.00015,Ic=85.0511,sx=`
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`,ox=`
  uniform sampler2D map;
  uniform vec3 sunDir;
  uniform float opacity;
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    float ndl = dot(normalize(vN), sunDir);
    float dayMix = smoothstep(-0.1, 0.16, ndl);
    // zdjęcie satelitarne ma już własne cienie — oświetlamy łagodniej niż teksturę globusu, żeby było czytelne
    vec3 c = texture2D(map, vUv).rgb * (0.22 + 0.9 * smoothstep(-0.05, 0.45, ndl));
    gl_FragColor = vec4(c, opacity * dayMix);
    #include <colorspace_fragment>
  }
`,cx=`
  uniform sampler2D map;
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    vec4 t = texture2D(map, vUv);
    gl_FragColor = vec4(t.rgb, t.a * opacity);
    #include <colorspace_fragment>
  }
`;function lx(i,e){const t=Math.PI-2*Math.PI*i/2**e;return Math.atan(Math.sinh(t))*180/Math.PI}function Ha(i,e){return(i+180)/360*2**e}function Wa(i,e){const t=Math.max(-Ic,Math.min(Ic,i))*Math.PI/180;return(1-Math.log(Math.tan(t)+1/Math.cos(t))/Math.PI)/2*2**e}function ux(i,e,t,n,r){const a=Math.max(4,Math.min(64,Math.ceil(360/2**i/.5))),s=[],o=[],c=[],l=[];for(let d=0;d<=a;d++){const h=lx(t+d/a,i);for(let p=0;p<=a;p++){const x=(e+p/a)/2**i*360-180,v=r(h,x,n);s.push(v.x,v.y,v.z),v.normalize(),o.push(v.x,v.y,v.z),c.push(p/a,1-d/a)}}for(let d=0;d<a;d++)for(let h=0;h<a;h++){const p=d*(a+1)+h;l.push(p,p+a+1,p+1,p+1,p+a+1,p+a+2)}const u=new Lt;return u.setAttribute("position",new ht(s,3)),u.setAttribute("normal",new ht(o,3)),u.setAttribute("uv",new ht(c,2)),u.setIndex(l),u}function dx({parent:i,sunDir:e,latLngLocal:t,onActive:n}){const r=new Un;i.add(r);const a=new hl,s=new Map,o=[];let c=0,l=!0,u=!0,d=!1,h=0;function p(S,A,b,P){const D=`${S}/${A}/${b}/${P}`;let y=s.get(D);if(!y){const _=S==="l",L=new Gt({uniforms:_?{map:{value:null},opacity:{value:0}}:{map:{value:null},sunDir:{value:e},opacity:{value:0}},vertexShader:sx,fragmentShader:_?cx:ox,transparent:!0,depthWrite:!1}),N=new bt(ux(A,b,P,_?ax:rx,t),L);N.renderOrder=(_?200:100)+A,N.visible=!1,N.frustumCulled=!1,r.add(N),y={key:D,mesh:N,z:A,x:b,y:P,label:_,used:0,state:"new",fade:0},s.set(D,y)}return y}function x(S){S.state="loading",c+=1;const A=(S.label?ex:Q0)(S.z,S.x,S.y);a.load(A,b=>{if(c-=1,S.state==="gone")return b.dispose();b.colorSpace=It,b.anisotropy=4,S.mesh.material.uniforms.map.value=b,S.state="ready",v()},void 0,()=>{c-=1,S.state="error",v()})}function v(){for(;c<ix&&o.length;){const S=o.shift();S.state==="new"&&x(S)}}function m(){if(s.size<=Uc)return;const S=[...s.values()].filter(A=>A.used<h).sort((A,b)=>A.used-b.used);for(const A of S.slice(0,s.size-Uc))A.state="gone",r.remove(A.mesh),A.mesh.geometry.dispose(),A.mesh.material.uniforms.map.value?.dispose(),A.mesh.material.dispose(),s.delete(A.key)}function f(S){S!==d&&(d=S,n?.(S))}function T(S){h+=1;const A=new Set;if(u&&S.alt<.9){const b=Math.max(.05,Math.cos(S.lat*Math.PI/180)),P=Math.tan(S.fovV*Math.PI/360),y=2*S.alt*P*6371/(S.heightPx*Math.min(2,window.devicePixelRatio||1));let _=Math.floor(Math.log2(40075*b/(256*y))+.3);_=Math.max(3,Math.min(tx,_));const L=Math.acos(1/(1+S.alt)),B=Math.min(L,Math.atan(S.alt*P*Math.max(1,S.aspect)*1.1))*180/Math.PI,H=te=>{const Me=Math.min(180,B/b),Ne=Math.floor(Ha(S.lng-Me,te)),We=Math.floor(Ha(S.lng+Me,te)),Q=Math.max(0,Math.floor(Wa(S.lat+B,te))),je=Math.min(2**te-1,Math.floor(Wa(S.lat-B,te)));return{x0:Ne,x1:We,y0:Q,y1:je,count:(We-Ne+1)*(je-Q+1)}};let j=H(_);for(;j.count>nx&&_>3;)j=H(--_);const Y=[_,Math.max(2,_-3)],ae=Ha(S.lng,_),X=Wa(S.lat,_),re=[];for(const te of Y){const Me=te===_?j:H(te),Ne=2**te;for(let We=Me.y0;We<=Me.y1;We++)for(let Q=Me.x0;Q<=Me.x1;Q++){const je=(Q%Ne+Ne)%Ne,$=l&&te===_&&_>=5?["i","l"]:["i"];for(const J of $){const ge=p(J,te,je,We);ge.used=h,A.add(ge),re.push({t:ge,d:te===_?Math.hypot(Q+.5-ae,We+.5-X):-1})}}}re.sort((te,Me)=>te.d-Me.d),o.length=0;for(const{t:te}of re)te.state==="new"&&o.push(te);v()}for(const b of s.values())A.has(b)&&b.state==="ready"?b.mesh.visible=!0:(b.mesh.visible=!1,b.fade=0,b.mesh.material.uniforms.opacity.value=0);f(A.size>0),m()}function E(S){for(const A of s.values())!A.mesh.visible||A.fade>=1||(A.fade=Math.min(1,A.fade+S*4),A.mesh.material.uniforms.opacity.value=A.fade)}return{update:T,animate:E,setLabels(S){l=S},setEnabled(S){u=S}}}const Qr=Mt.degToRad(23.4),fo=new I(0,0,1),Hr=.0016,Xa=3.8,Wr=matchMedia("(prefers-reduced-motion: reduce)").matches;function wi(i,e,t){const n=(90-i)*Math.PI/180,r=(e+180)*Math.PI/180,a=Math.sin(n);return new I(-t*a*Math.cos(r),t*Math.cos(n),t*a*Math.sin(r))}function qa(i,e,t){return wi(i,e,t).applyAxisAngle(fo,Qr)}function ja(i){const e=i.clone().applyAxisAngle(fo,-Qr).normalize(),t=90-Math.acos(Mt.clamp(e.y,-1,1))*180/Math.PI;let n=Math.atan2(e.z,-e.x)*180/Math.PI-180;return n<-180&&(n+=360),{lat:t,lng:n}}function Nc(i,e,t,n){const r=Math.atan2(Math.sin(e-i),Math.cos(e-i));return i+r*(1-Math.exp(-t*n))}const Ya=`
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
`,hx=`
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform sampler2D waterMap;
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
    float spec = pow(max(dot(n, h), 0.0), 60.0) * water * dayMix;
    col += vec3(1.0, 0.93, 0.8) * spec * 0.55;
    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,fx=`
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
`,px=`
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
`;function mx(i,{texturesBase:e="textures/",onPlace:t,onGround:n,onTiles:r}){const a=new H0({antialias:!0,powerPreference:"high-performance"});a.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),a.setClearColor(329484),i.appendChild(a.domElement);const s=a.domElement,o=new Td,c=new qt(38,1,.05,200),l=new I(1,.3,.6).normalize();{const O=new Float32Array(5400),q=new Float32Array(1800*3);for(let de=0;de<1800;de++){const ie=30+Math.random()*40,se=Math.random()*Math.PI*2,C=Math.acos(2*Math.random()-1);O.set([ie*Math.sin(C)*Math.cos(se),ie*Math.cos(C),ie*Math.sin(C)*Math.sin(se)],de*3);const le=Math.random(),oe=.55+Math.random()*.45;q.set([oe,oe*(.9+le*.08),oe*(1.05-le*.2)],de*3)}const fe=new Lt;fe.setAttribute("position",new Yt(O,3)),fe.setAttribute("color",new Yt(q,3)),o.add(new Ld(fe,new sl({size:.07,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1})))}const u=new Un;u.rotation.z=Qr,o.add(u);const d=new hl,h=a.capabilities.getMaxAnisotropy(),p=a.capabilities.maxTextureSize;let x=4,v=null;const m=(F,O)=>{const q=d.load(e+F,()=>{x-=1,x===0&&v&&v()});return O&&(q.colorSpace=It),q.anisotropy=Math.min(8,h),q},T=Math.max(screen.width,screen.height)*(window.devicePixelRatio||1)>2200&&!matchMedia("(pointer: coarse)").matches&&p>=4096?"":"-2k",E=new Gt({uniforms:{dayMap:{value:m(`earth-day${T}.webp`,!0)},nightMap:{value:m(`earth-night${T}.webp`,!0)},waterMap:{value:m("earth-water.webp",!1)},sunDir:{value:l},nightGain:{value:1.35}},vertexShader:Ya,fragmentShader:hx}),S=new bt(new $n(1,128,96),E);u.add(S);const A=new Gt({uniforms:{cloudMap:{value:m("earth-clouds.webp",!1)},sunDir:{value:l},opacity:{value:.62}},vertexShader:Ya,fragmentShader:fx,transparent:!0,depthWrite:!1}),b=new bt(new $n(1.008,96,72),A);b.renderOrder=300,u.add(b);const P=dx({parent:u,sunDir:l,latLngLocal:wi,onActive:r}),D=(F,O,q,fe)=>new bt(new $n(F,64,48),new Gt({uniforms:{sunDir:{value:l},power:{value:q},strength:{value:fe}},vertexShader:Ya,fragmentShader:px,transparent:!0,depthWrite:!1,side:O,blending:Ai}));o.add(D(1.075,Pt,2.4,.95),D(1.012,yn,3.2,.35));const y=new Un;y.rotation.z=Qr,o.add(y);const _=new Map,L=new $n(.011,16,12),N=new oo(.02,.027,40),B=new $n(.045,8,6),H=new ao(.0022,6e-4,.16,8);function j(F,O=16766090){const q=wi(F.lat,F.lng,1.0003),fe=new Un;fe.position.copy(q),fe.quaternion.setFromUnitVectors(fo,q.clone().normalize());const de=new bt(L,new Yn({color:O})),ie=new bt(N,new Yn({color:O,transparent:!0,opacity:.5,side:sn,depthWrite:!1,blending:Ai}));ie.position.z=.002;const se=new bt(B,new Yn({visible:!1}));se.userData.placeId=F.id;const C=new bt(H,new Yn({color:16771e3,transparent:!0,opacity:.85,depthWrite:!1,blending:Ai}));return C.rotation.x=Math.PI/2,C.position.z=.08,C.visible=!1,fe.add(de,ie,se,C),{group:fe,core:de,ring:ie,beam:C,place:F,color:O}}const Y=new Map;function ae(F,O,q=9425919){const fe=Y.get(F);if(fe&&(y.remove(fe.group),Y.delete(F)),!O)return;const de=j({id:null,...O},q);de.beam.visible=!0,de.beam.material=de.beam.material.clone(),de.beam.material.color.set(q),de.ring.material.opacity=.9,y.add(de.group),Y.set(F,de)}let X=null;function re(F,O){if(X&&(y.remove(X),X.geometry.dispose(),X=null),!F||!O)return;const q=j0(F,O,96),de=.02+Math.acos(Mt.clamp(wi(F.lat,F.lng,1).dot(wi(O.lat,O.lng,1)),-1,1))*.09,ie=new ul(q.map(se=>wi(se.lat,se.lng,1.0006+Math.sin(se.t*Math.PI)*de)));X=new bt(new co(ie,160,.0028,6,!1),new Yn({color:15975546,transparent:!0,opacity:.95,blending:Ai,depthWrite:!1})),X.renderOrder=2,y.add(X)}let te=null;function Me(F){for(const O of _.values())y.remove(O.group);_.clear();for(const O of F){const q=j(O,O.cat==="own"?10477760:16766090);y.add(q.group),_.set(O.id,q)}Ne()}function Ne(){for(const F of _.values()){const O=F.place.id===te;F.core.material.color.set(O?16775142:F.color),F.ring.material.opacity=O?.95:.45,F.beam.visible=O}}const We=new Br().setFromVector3(qa(30,15,3.4)),Q={theta:We.theta,phi:We.phi,radius:3.4,velT:0,velP:0,resumeAt:0,focus:null,spin:!Wr},je=new Br;function $(F,O,q){const fe=new Br().setFromVector3(qa(F,O,1));Q.focus={theta:fe.theta,phi:fe.phi,radius:q??Mt.clamp(Q.radius,1.75,2.3)}}function J(){Q.focus=null,Q.resumeAt=performance.now()+600}function ge(F,{fly:O=!0}={}){te=F,Ne();const q=_.get(F);q&&O&&$(q.place.lat,q.place.lng,Q.radius>2.3?2.05:void 0)}const Ae=new Map;let me=null,ze=null;const ft=new th,Be=new De;s.addEventListener("pointerdown",F=>{if(!(F.pointerType==="mouse"&&F.button!==0)){if(s.setPointerCapture(F.pointerId),Ae.set(F.pointerId,{x:F.clientX,y:F.clientY}),Ae.size===2){const[O,q]=[...Ae.values()];ze={dist:Math.hypot(O.x-q.x,O.y-q.y),alt:Q.radius-1},me=null}else me={x:F.clientX,y:F.clientY,moved:0,t:performance.now()},Q.velT=Q.velP=0;s.classList.add("grabbing")}}),s.addEventListener("pointermove",F=>{if(!Ae.has(F.pointerId))return;if(Ae.set(F.pointerId,{x:F.clientX,y:F.clientY}),ze&&Ae.size>=2){const[se,C]=[...Ae.values()],le=Math.hypot(se.x-C.x,se.y-C.y);it(ze.alt*(ze.dist/Math.max(le,1)));return}if(!me)return;const O=F.clientX-me.x,q=F.clientY-me.y;if(me.x=F.clientX,me.y=F.clientY,me.moved+=Math.abs(O)+Math.abs(q),me.moved<5)return;Q.focus=null;const fe=Q.radius-1,de=2*fe*Math.tan(Mt.degToRad(c.fov/2))/Math.max(1,i.clientHeight),ie=Math.min(.0052*((Q.radius-.85)/2),de*Mt.lerp(1,3,Mt.smoothstep(fe,.05,1)));Q.velT=-O*ie,Q.velP=-q*ie,Q.theta+=Q.velT,Q.phi=Mt.clamp(Q.phi+Q.velP,.12,Math.PI-.12)});const tt=F=>{if(!Ae.has(F.pointerId)||(Ae.delete(F.pointerId),Ae.size<2&&(ze=null),Ae.size===0&&s.classList.remove("grabbing"),!me))return;const O=me.moved<8&&performance.now()-me.t<600;me=null,Q.resumeAt=performance.now()+2500,O&&F.type==="pointerup"&&R(F)};s.addEventListener("pointerup",tt),s.addEventListener("pointercancel",tt),s.addEventListener("wheel",F=>{F.preventDefault(),it((Q.radius-1)*Math.exp(F.deltaY*.0016)),Q.resumeAt=performance.now()+1500},{passive:!1});function R(F){const O=s.getBoundingClientRect();Be.x=(F.clientX-O.left)/O.width*2-1,Be.y=-((F.clientY-O.top)/O.height)*2+1,ft.setFromCamera(Be,c);const q=[..._.values()].filter(se=>se.group.visible).map(se=>se.group),fe=ft.intersectObjects(q,!0).find(se=>se.object.userData.placeId);if(fe){t?.(fe.object.userData.placeId);return}const de=ye(ft.ray);if(!de)return;const ie=performance.now();if(ke&&ie-ke.t<380&&Math.hypot(F.clientX-ke.x,F.clientY-ke.y)<30){ke=null;const se=ja(de);$(se.lat,se.lng,1+Math.max(Hr,(Q.radius-1)/3.5));return}ke={t:ie,x:F.clientX,y:F.clientY},n?.(ja(de))}let ke=null;const Xe=new I,Ze=new hr(new I,1);function ye(F){return F.intersectSphere(Ze,Xe)?Xe.clone():null}function it(F){Q.radius=1+Mt.clamp(F,Hr,Xa),Q.focus&&(Q.focus.radius=Q.radius)}let Ee={real:!0};function Ie(F,O){Ee={real:F,date:O},g()}const w=new I;function g(){if(Ee.real)l.copy(qa(Ee.lat??0,Ee.lng??0,1));else{w.copy(c.position).normalize();const F=new I().crossVectors(c.up,w).normalize();l.copy(w).addScaledVector(F,-.55).addScaledVector(c.up,.35).normalize()}}function k(F,O){Ee.lat=F,Ee.lng=O,g()}let K={x:0,y:0};function ee(F,O){K={x:F,y:O},W()}function W(){const F=i.clientWidth,O=i.clientHeight;a.setSize(F,O,!1),c.aspect=F/O,c.fov=c.aspect<1?2*Math.atan(Math.tan(Mt.degToRad(19))/c.aspect)*180/Math.PI:38,c.setViewOffset(F,O,-K.x,K.y,F,O),c.updateProjectionMatrix()}new ResizeObserver(W).observe(i),W();const we=new eh;let he=!0,Te=0;return a.setAnimationLoop(()=>{const F=Math.min(we.getDelta(),.05),O=we.elapsedTime;he&&!Wr&&(b.rotation.y+=F*.004);const q=Wr?14:2.8;if(!me&&Q.focus){Q.theta=Nc(Q.theta,Q.focus.theta,q,F),Q.phi=Mt.clamp(Nc(Q.phi,Q.focus.phi,q,F),.12,Math.PI-.12);const se=Mt.damp(Math.log(Q.radius-1),Math.log(Q.focus.radius-1),q*.9,F);Q.radius=1+Math.exp(se),Q.velT=Q.velP=0}else if(!me){Q.theta+=Q.velT,Q.phi=Mt.clamp(Q.phi+Q.velP,.12,Math.PI-.12);const se=Math.exp(-F*3.1);Q.velT*=se,Q.velP*=se,Q.spin&&!ze&&Q.radius>1.5&&performance.now()>Q.resumeAt&&Math.abs(Q.velT)<3e-4&&(Q.theta+=F*.05*((Q.radius-.9)/2))}const fe=Mt.clamp((Q.radius-1)/2.7,7e-4,1.2);for(const se of _.values()){const C=se.place.id===te,le=1+Math.sin(O*2.3+se.place.lat)*(C?.14:.05);se.group.scale.setScalar(fe),se.core.scale.setScalar((C?1.6:1)*le)}for(const se of Y.values())se.group.scale.setScalar(fe);je.set(Q.radius,Q.phi,Q.theta),c.position.setFromSpherical(je),c.lookAt(0,0,0);const de=Q.radius-1,ie=Mt.clamp(de*.25,2e-4,.05);if(Math.abs(c.near-ie)>ie*.05&&(c.near=ie,c.updateProjectionMatrix()),A.uniforms.opacity.value=.62*Mt.smoothstep(de,.08,.5),Te-=F,Te<=0){Te=.15;const se=ja(c.position);P.update({lat:se.lat,lng:se.lng,alt:de,fovV:c.fov,aspect:c.aspect,heightPx:i.clientHeight})}P.animate(F),Ee.real||g(),a.render(o,c)}),{setPlaces:Me,select:ge,focus:$,release:J,setPin:ae,setArc:re,setSun:Ie,setSubsolar:k,setViewShift:ee,setClouds(F){he=F,b.visible=F},setSpin(F){Q.spin=F&&!Wr},setMarkersVisible(F){for(const O of _.values())O.group.visible=F},get radius(){return Q.radius},get debug(){return{radius:Q.radius,theta:Q.theta,phi:Q.phi,velT:Q.velT,velP:Q.velP,focus:Q.focus,drag:!!me,pinch:!!ze}},zoomBy(F){const O=Mt.clamp((Q.radius-1)*F,Hr,Xa),q=new Br().setFromVector3(c.position);Q.focus={theta:Q.focus?.theta??q.theta,phi:Q.focus?.phi??q.phi,radius:1+O}},zoomTo(F,O,q){$(F,O,1+Mt.clamp(q,Hr,Xa))},setTiles(F){P.setEnabled(F)},setLabels(F){P.setLabels(F)},whenReady(F){x===0?F():v=F}}}const xx=[{id:"all",label:"Wszystkie"},{id:"fav",label:"Ulubione"},{id:"p",label:"Polska"},{id:"d",label:"Niemcy"},{id:"m",label:"Miasta"},{id:"c",label:"Cuda i zabytki"},{id:"n",label:"Przyroda"},{id:"own",label:"Moje"}],gx=[["krakow","Kraków","Polska","p",50.0614,19.9366,"Europe/Warsaw","Rynek, Wawel i ciepły kamień starego miasta nad Wisłą."],["warszawa","Warszawa","Polska","p",52.2297,21.0122,"Europe/Warsaw","Odbudowana Starówka, Łazienki i panorama wieżowców nad Wisłą."],["gdansk","Gdańsk","Polska","p",54.352,18.6466,"Europe/Warsaw","Długi Targ, Żuraw nad Motławą i bursztynowe kamienice."],["wroclaw","Wrocław","Polska","p",51.1079,17.0385,"Europe/Warsaw","Miasto mostów i wysp na Odrze, z krasnalami na każdym rogu."],["torun","Toruń","Polska","p",53.0138,18.5984,"Europe/Warsaw","Gotyk z czerwonej cegły, miasto Kopernika i pierników."],["poznan","Poznań","Polska","p",52.4064,16.9252,"Europe/Warsaw","Kolorowy Stary Rynek i koziołki trykające się na ratuszu w południe."],["morskie-oko","Morskie Oko","Tatry, Polska","p",49.2013,20.071,"Europe/Warsaw","Największe jezioro Tatr pod ścianą Mięguszowieckich Szczytów."],["malbork","Zamek w Malborku","Polska","p",54.0398,19.0277,"Europe/Warsaw","Największy ceglany zamek świata, dawna stolica zakonu krzyżackiego."],["wieliczka","Kopalnia soli Wieliczka","Polska","p",49.983,20.055,"Europe/Warsaw","Komory, kaplice i jeziora wykute w soli setki metrów pod ziemią."],["bialowieza","Puszcza Białowieska","Polska i Białoruś","p",52.7008,23.8693,"Europe/Warsaw","Ostatni tak duży las nizinny Europy i dom żubrów."],["leba","Ruchome wydmy w Łebie","Słowiński PN, Polska","p",54.7631,17.5559,"Europe/Warsaw","Piaszczysta pustynia nad Bałtykiem, wędrująca nawet kilka metrów rocznie."],["tarnica","Tarnica","Bieszczady, Polska","p",49.0747,22.7264,"Europe/Warsaw","Najwyższy szczyt polskich Bieszczad, z widokiem na połoniny."],["zamosc","Zamość","Polska","p",50.7231,23.252,"Europe/Warsaw","Renesansowe „miasto idealne” Zamoyskich, z ormiańskimi kamienicami przy Rynku Wielkim."],["lublin","Lublin","Polska","p",51.2465,22.5684,"Europe/Warsaw","Stare Miasto na wzgórzu, zamek z kaplicą Świętej Trójcy i Brama Krakowska."],["lodz","Łódź","Polska","p",51.7592,19.456,"Europe/Warsaw","Fabrykanckie miasto z ulicą Piotrkowską i ceglanymi zakładami zamienionymi w lofty."],["szczecin","Szczecin","Polska","p",53.4285,14.5528,"Europe/Warsaw","Wały Chrobrego nad Odrą, Zamek Książąt Pomorskich i port blisko Bałtyku."],["kazimierz","Kazimierz Dolny","Polska","p",51.3214,21.9486,"Europe/Warsaw","Miasteczko artystów nad Wisłą, z ruinami zamku i lessowymi wąwozami."],["czestochowa","Jasna Góra","Częstochowa, Polska","p",50.8122,19.0973,"Europe/Warsaw","Klasztor paulinów z obrazem Czarnej Madonny, cel pielgrzymek z całej Polski."],["mikolajki","Mikołajki","Mazury, Polska","p",53.8031,21.5734,"Europe/Warsaw","Żeglarska stolica Mazur nad jeziorami Mikołajskim i Tałty."],["hel","Hel","Polska","p",54.608,18.8,"Europe/Warsaw","Koniec wąskiego półwyspu między Zatoką Gdańską a otwartym Bałtykiem."],["sniezka","Śnieżka","Karkonosze, Polska i Czechy","p",50.736,15.74,"Europe/Warsaw","Najwyższy szczyt Sudetów, 1603 m, z obserwatorium przypominającym latające spodki."],["szczeliniec","Szczeliniec Wielki","Góry Stołowe, Polska","p",50.4859,16.3392,"Europe/Warsaw","Labirynt piaskowcowych skał i szczelin na najwyższym szczycie Gór Stołowych."],["ksiaz","Zamek Książ","Wałbrzych, Polska","p",50.8423,16.2919,"Europe/Warsaw","Jeden z największych zamków w Polsce, na skale nad przełomem Pełcznicy."],["swidnica","Kościół Pokoju w Świdnicy","Polska","p",50.846,16.4818,"Europe/Warsaw","Ogromna drewniana świątynia z XVII wieku, wpisana na listę UNESCO."],["boleslawiec","Bolesławiec","Polska","p",51.2645,15.5697,"Europe/Warsaw","Miasto ceramiki w niebieskie wzory, znanej na całym świecie."],["eichendorf","Eichendorf","Dolna Bawaria, Niemcy","d",48.6336,12.8564,"Europe/Berlin","Gmina targowa w dolinie Vils, wśród pól i lasów powiatu Dingolfing-Landau."],["monachium","Monachium","Bawaria, Niemcy","d",48.1351,11.582,"Europe/Berlin","Stolica Bawarii: Marienplatz, Ogród Angielski i Oktoberfest na Theresienwiese."],["ratyzbona","Ratyzbona","Bawaria, Niemcy","d",49.0134,12.1016,"Europe/Berlin","Średniowieczne stare miasto nad Dunajem z kamiennym mostem z XII wieku."],["pasawa","Pasawa","Bawaria, Niemcy","d",48.5667,13.4319,"Europe/Berlin","Miasto trzech rzek, gdzie do Dunaju wpadają Inn i Ilz."],["dingolfing","Dingolfing","Dolna Bawaria, Niemcy","d",48.63,12.495,"Europe/Berlin","Miasto nad Izarą z jedną z największych fabryk BMW."],["landau-isar","Landau an der Isar","Dolna Bawaria, Niemcy","d",48.6747,12.6936,"Europe/Berlin","Miasteczko na skarpie nad doliną Izary."],["straubing","Straubing","Dolna Bawaria, Niemcy","d",48.8777,12.573,"Europe/Berlin","Miasto nad Dunajem z wieżą miejską na długim rynku i jarmarkiem Gäubodenvolksfest."],["las-bawarski","Las Bawarski","Bawaria, Niemcy","d",48.939,13.505,"Europe/Berlin","Najstarszy park narodowy Niemiec, przy granicy z Czechami."],["neuschwanstein","Zamek Neuschwanstein","Bawaria, Niemcy","d",47.5576,10.7498,"Europe/Berlin","Bajkowy zamek króla Ludwika II na skale u stóp Alp."],["zugspitze","Zugspitze","Bawaria, Niemcy","d",47.4211,10.9853,"Europe/Berlin","Najwyższy szczyt Niemiec, 2962 m, na granicy z Austrią."],["konigssee","Königssee","Bawaria, Niemcy","d",47.558,12.98,"Europe/Berlin","Wąskie, szmaragdowe jezioro wśród ścian Alp Berchtesgadeńskich."],["norymberga","Norymberga","Bawaria, Niemcy","d",49.4521,11.0767,"Europe/Berlin","Cesarski zamek nad czerwonymi dachami starego miasta i słynny jarmark bożonarodzeniowy."],["bamberg","Bamberg","Bawaria, Niemcy","d",49.8917,10.8917,"Europe/Berlin","Stare miasto z listy UNESCO, z ratuszem na wyspie pośrodku rzeki Regnitz."],["rothenburg","Rothenburg ob der Tauber","Bawaria, Niemcy","d",49.3772,10.1866,"Europe/Berlin","Średniowieczne miasteczko otoczone murami, z szachulcowymi domami."],["berlin","Berlin","Niemcy","d",52.52,13.405,"Europe/Berlin","Brama Brandenburska, ślady muru i jedna z najbardziej zielonych stolic Europy."],["drezno","Drezno","Saksonia, Niemcy","d",51.0504,13.7373,"Europe/Berlin","Barokowa „Florencja nad Łabą”, z odbudowanym kościołem Frauenkirche."],["hamburg","Hamburg","Niemcy","d",53.5511,9.9937,"Europe/Berlin","Wielki port nad Łabą, ceglane magazyny Speicherstadt i filharmonia nad wodą."],["kolonia","Kolonia","Nadrenia, Niemcy","d",50.9375,6.9603,"Europe/Berlin","Gotycka katedra nad Renem, budowana przez ponad 600 lat."],["barcelona","Barcelona","Katalonia, Hiszpania","m",41.3874,2.1686,"Europe/Madrid","Gotyckie zaułki, Sagrada Família i światło latarni nad morzem."],["paryz","Paryż","Francja","m",48.8566,2.3522,"Europe/Paris","Bulwary nad Sekwaną i wieża Eiffla rozświetlana co godzinę po zmroku."],["londyn","Londyn","Wielka Brytania","m",51.5074,-.1278,"Europe/London","Tamiza, Big Ben i miasto, przez które biegnie południk zerowy."],["rzym","Rzym","Włochy","m",41.9028,12.4964,"Europe/Rome","Fora, fontanny i trzy tysiące lat historii na siedmiu wzgórzach."],["wenecja","Wenecja","Włochy","m",45.4408,12.3155,"Europe/Rome","Miasto na ponad stu wyspach, gdzie ulicami są kanały."],["lizbona","Lizbona","Portugalia","m",38.7223,-9.1393,"Europe/Lisbon","Żółte tramwaje na stromych wzgórzach i ujście Tagu do Atlantyku."],["praga","Praga","Czechy","m",50.0755,14.4378,"Europe/Prague","Most Karola, Hradczany i zegar astronomiczny na Rynku Staromiejskim."],["wieden","Wiedeń","Austria","m",48.2082,16.3738,"Europe/Vienna","Pałace Habsburgów, kawiarnie i walce w sali Musikvereinu."],["amsterdam","Amsterdam","Holandia","m",52.3676,4.9041,"Europe/Amsterdam","Pierścienie kanałów, wąskie kamienice i więcej rowerów niż mieszkańców."],["reykjavik","Reykjavík","Islandia","m",64.1466,-21.9426,"Atlantic/Reykjavik","Najdalej na północ położona stolica państwa, zimą pod zorzą polarną."],["tromso","Tromsø","Norwegia","m",69.6492,18.9553,"Europe/Oslo","Za kołem podbiegunowym: noc polarna zimą, słońce o północy latem."],["stambul","Stambuł","Turcja","m",41.0082,28.9784,"Europe/Istanbul","Miasto na dwóch kontynentach nad cieśniną Bosfor."],["kair","Kair","Egipt","m",30.0444,31.2357,"Africa/Cairo","Największe miasto świata arabskiego, rozciągnięte wzdłuż Nilu."],["marrakesz","Marrakesz","Maroko","m",31.6295,-7.9811,"Africa/Casablanca","Czerwone mury medyny i zapach przypraw na placu Dżamaa al-Fana."],["kapsztad","Kapsztad","Republika Południowej Afryki","m",-33.9249,18.4241,"Africa/Johannesburg","Góra Stołowa nad zatoką, niedaleko Przylądka Dobrej Nadziei."],["dubaj","Dubaj","Zjednoczone Emiraty Arabskie","m",25.2048,55.2708,"Asia/Dubai","Burdż Chalifa, najwyższy budynek świata, wyrasta prosto z pustyni."],["tokio","Tokio","Japonia","m",35.6762,139.6503,"Asia/Tokyo","Największa aglomeracja świata — neony Shinjuku i ciche świątynie obok."],["kioto","Kioto","Japonia","m",35.0116,135.7681,"Asia/Tokyo","Dawna stolica: świątynie, klonowe ogrody i drewniane uliczki Gion."],["singapur","Singapur","Singapur","m",1.3521,103.8198,"Asia/Singapore","Miasto-państwo tuż przy równiku, z ogrodami wśród wieżowców."],["hongkong","Hongkong","Chiny","m",22.3193,114.1694,"Asia/Hong_Kong","Las wieżowców między górami a portem Wiktorii."],["bangkok","Bangkok","Tajlandia","m",13.7563,100.5018,"Asia/Bangkok","Złote świątynie, pływające targi i rzeka Menam."],["sydney","Sydney","Australia","m",-33.8688,151.2093,"Australia/Sydney","Port, muszle Opery i most Harbour Bridge nad zatoką."],["nowy-jork","Nowy Jork","Stany Zjednoczone","m",40.7128,-74.006,"America/New_York","Siatka ulic Manhattanu i światła mostów nad East River."],["san-francisco","San Francisco","Stany Zjednoczone","m",37.7749,-122.4194,"America/Los_Angeles","Golden Gate we mgle i strome ulice z tramwajami linowymi."],["vancouver","Vancouver","Kanada","m",49.2827,-123.1207,"America/Vancouver","Miasto między oceanem a ośnieżonymi Górami Nadbrzeżnymi."],["meksyk","Meksyk","Meksyk","m",19.4326,-99.1332,"America/Mexico_City","Ogromna stolica na miejscu azteckiego Tenochtitlán, 2240 m n.p.m."],["hawana","Hawana","Kuba","m",23.1136,-82.3666,"America/Havana","Kolonialne fasady, stare amerykańskie auta i nadmorski Malecón."],["rio","Rio de Janeiro","Brazylia","m",-22.9068,-43.1729,"America/Sao_Paulo","Głowa Cukru, Copacabana i Chrystus Odkupiciel na szczycie Corcovado."],["buenos-aires","Buenos Aires","Argentyna","m",-34.6037,-58.3816,"America/Argentina/Buenos_Aires","Tango w San Telmo i szerokie aleje nad estuarium La Platy."],["kopenhaga","Kopenhaga","Dania","m",55.6761,12.5683,"Europe/Copenhagen","Kolorowe domy nad kanałem Nyhavn i miasto, w którym wszędzie dojedziesz rowerem."],["sztokholm","Sztokholm","Szwecja","m",59.3293,18.0686,"Europe/Stockholm","Stolica rozłożona na kilkunastu wyspach, ze średniowieczną Gamla Stan."],["budapeszt","Budapeszt","Węgry","m",47.4979,19.0402,"Europe/Budapest","Buda i Peszt po obu stronach Dunaju, parlament nad rzeką i termalne łaźnie."],["edynburg","Edynburg","Szkocja, Wielka Brytania","m",55.9533,-3.1883,"Europe/London","Zamek na wulkanicznej skale nad Royal Mile i stare miasto z kamienia."],["dublin","Dublin","Irlandia","m",53.3498,-6.2603,"Europe/Dublin","Georgiańskie drzwi, puby Temple Bar i rzeka Liffey."],["wilno","Wilno","Litwa","m",54.6872,25.2797,"Europe/Vilnius","Barokowe stare miasto, Ostra Brama i wzgórze Giedymina."],["lwow","Lwów","Ukraina","m",49.8397,24.0297,"Europe/Kyiv","Rynek z ratuszem, kamienice wielu kultur i słynne kawiarnie."],["jerozolima","Jerozolima","Bliski Wschód","m",31.7683,35.2137,"Asia/Jerusalem","Stare Miasto święte dla trzech religii, otoczone kamiennymi murami."],["mumbaj","Mumbaj","Indie","m",19.076,72.8777,"Asia/Kolkata","Finansowe serce Indii z Bramą Indii nad Morzem Arabskim i Bollywood."],["pekin","Pekin","Chiny","m",39.9042,116.4074,"Asia/Shanghai","Stolica Chin z placem Tiananmen, hutongami i Zakazanym Miastem."],["szanghaj","Szanghaj","Chiny","m",31.2304,121.4737,"Asia/Shanghai","Bulwar Bund naprzeciw wieżowców Pudong nad rzeką Huangpu."],["seul","Seul","Korea Południowa","m",37.5665,126.978,"Asia/Seoul","Pałace dynastii Joseon wśród neonów i gór otaczających miasto."],["nairobi","Nairobi","Kenia","m",-1.2921,36.8219,"Africa/Nairobi","Stolica z parkiem narodowym, w którym żyrafy pasą się na tle wieżowców."],["chicago","Chicago","Stany Zjednoczone","m",41.8781,-87.6298,"America/Chicago","Kolebka drapaczy chmur nad jeziorem Michigan."],["los-angeles","Los Angeles","Stany Zjednoczone","m",34.0522,-118.2437,"America/Los_Angeles","Hollywood, plaże Pacyfiku i miasto rozlane między górami a oceanem."],["toronto","Toronto","Kanada","m",43.6532,-79.3832,"America/Toronto","Największe miasto Kanady z wieżą CN Tower nad jeziorem Ontario."],["auckland","Auckland","Nowa Zelandia","m",-36.8485,174.7633,"Pacific/Auckland","Miasto żagli na przesmyku między dwoma morzami, wśród dawnych wulkanów."],["giza","Piramidy w Gizie","Egipt","c",29.9792,31.1342,"Africa/Cairo","Jedyny z siedmiu cudów świata starożytnego, który przetrwał do dziś."],["petra","Petra","Jordania","c",30.3285,35.4444,"Asia/Amman","Miasto Nabatejczyków wykute w różowym piaskowcu."],["wielki-mur","Wielki Mur (Mutianyu)","Chiny","c",40.4319,116.5704,"Asia/Shanghai","Odcinek muru wijący się po zalesionych grzbietach na północ od Pekinu."],["tadz-mahal","Tadż Mahal","Agra, Indie","c",27.1751,78.0421,"Asia/Kolkata","Marmurowe mauzoleum wzniesione przez szacha Dżahana dla zmarłej żony."],["koloseum","Koloseum","Rzym, Włochy","c",41.8902,12.4922,"Europe/Rome","Amfiteatr na około 50 tysięcy widzów, otwarty w 80 roku n.e."],["machu-picchu","Machu Picchu","Peru","c",-13.1631,-72.545,"America/Lima","Inkaskie miasto na grzbiecie Andów, odkryte dla świata w 1911 roku."],["chichen-itza","Chichén Itzá","Jukatan, Meksyk","c",20.6843,-88.5678,"America/Merida","Piramida Kukulkana, po której w równonoc pełznie świetlny wąż."],["angkor-wat","Angkor Wat","Kambodża","c",13.4125,103.867,"Asia/Phnom_Penh","Największa świątynia świata, otoczona fosą i dżunglą."],["akropol","Akropol","Ateny, Grecja","c",37.9715,23.7257,"Europe/Athens","Partenon na skalistym wzgórzu nad Atenami."],["stonehenge","Stonehenge","Anglia, Wielka Brytania","c",51.1789,-1.8262,"Europe/London","Krąg kamieni ustawiony ponad 4500 lat temu, zgrany z przesileniami."],["rapa-nui","Posągi moai","Rapa Nui (Wyspa Wielkanocna), Chile","c",-27.1127,-109.3497,"Pacific/Easter","Kamienne głowy na jednej z najbardziej odludnych zamieszkanych wysp."],["sagrada","Sagrada Família","Barcelona, Hiszpania","c",41.4036,2.1744,"Europe/Madrid","Bazylika Gaudíego budowana od 1882 roku."],["alhambra","Alhambra","Grenada, Hiszpania","c",37.1761,-3.5881,"Europe/Madrid","Mauretański pałac z dziedzińcami, fontannami i arabeskami pod Sierra Nevada."],["mont-saint-michel","Mont-Saint-Michel","Normandia, Francja","c",48.6361,-1.5115,"Europe/Paris","Opactwo na skalistej wyspie, którą przypływ odcina od lądu."],["hagia-sophia","Hagia Sophia","Stambuł, Turcja","c",41.0086,28.9802,"Europe/Istanbul","Bizantyjska świątynia z VI wieku z ogromną kopułą."],["kreml","Kreml i plac Czerwony","Moskwa, Rosja","c",55.7539,37.6208,"Europe/Moscow","Czerwone mury twierdzy i kolorowe kopuły soboru Wasyla Błogosławionego."],["zakazane-miasto","Zakazane Miasto","Pekin, Chiny","c",39.9163,116.3972,"Asia/Shanghai","Pałac cesarzy Chin z setkami budynków za purpurowymi murami."],["borobudur","Borobudur","Jawa, Indonezja","c",-7.6079,110.2038,"Asia/Jakarta","Największa świątynia buddyjska świata, z setkami stup i płaskorzeźb."],["abu-simbel","Abu Simbel","Egipt","c",22.3372,31.6258,"Africa/Cairo","Świątynie Ramzesa II, przeniesione w całości przed zalaniem przez Jezioro Nasera."],["statua-wolnosci","Statua Wolności","Nowy Jork, Stany Zjednoczone","c",40.6892,-74.0445,"America/New_York","Miedziany posąg, dar Francji, witający statki u wejścia do portu."],["teotihuacan","Teotihuacán","Meksyk","c",19.6925,-98.8438,"America/Mexico_City","Piramidy Słońca i Księżyca przy Alei Zmarłych, starsze od Azteków."],["wielki-kanion","Wielki Kanion","Arizona, Stany Zjednoczone","n",36.0544,-112.1401,"America/Phoenix","Rzeka Kolorado wyrzeźbiła wąwóz głęboki na prawie 1,9 km."],["niagara","Wodospad Niagara","Kanada i Stany Zjednoczone","n",43.0962,-79.0377,"America/Toronto","Trzy wodospady na granicy, z ogromnym przepływem wody."],["everest","Mount Everest","Nepal i Chiny","n",27.9881,86.925,"Asia/Kathmandu","Najwyższy szczyt Ziemi, 8849 m nad poziomem morza."],["wiktoria","Wodospad Wiktorii","Zambia i Zimbabwe","n",-17.9243,25.8572,"Africa/Harare","Zambezi spada ponad stumetrowym progiem; miejscowi mówią o „dymie, który grzmi”."],["kilimandzaro","Kilimandżaro","Tanzania","n",-3.0674,37.3556,"Africa/Dar_es_Salaam","Najwyższa góra Afryki, wulkan ze śniegiem niemal na równiku."],["serengeti","Serengeti","Tanzania","n",-2.3333,34.8333,"Africa/Dar_es_Salaam","Sawanna wielkiej wędrówki gnu i zebr."],["sahara","Erg Chebbi","Sahara, Maroko","n",31.15,-3.9667,"Africa/Casablanca","Pomarańczowe wydmy na skraju największej gorącej pustyni świata."],["galapagos","Galápagos","Ekwador","n",-.9538,-90.9656,"Pacific/Galapagos","Wulkaniczne wyspy żółwi olbrzymich, które zainspirowały Darwina."],["iguazu","Wodospady Iguazú","Argentyna i Brazylia","n",-25.6953,-54.4367,"America/Argentina/Buenos_Aires","Ponad 270 kaskad w podzwrotnikowym lesie, z Gardzielą Diabła."],["rafa","Wielka Rafa Koralowa","Australia","n",-18.2871,147.6992,"Australia/Brisbane","Największa struktura zbudowana przez organizmy żywe, widoczna z orbity."],["uluru","Uluru","Australia","n",-25.3444,131.0369,"Australia/Darwin","Święta skała Anangu, czerwieniejąca o zachodzie słońca."],["ha-long","Zatoka Ha Long","Wietnam","n",20.9101,107.1839,"Asia/Ho_Chi_Minh","Prawie dwa tysiące wapiennych wysp wyrastających z morza."],["bajkal","Bajkał","Syberia, Rosja","n",53.5587,108.165,"Asia/Irkutsk","Najgłębsze jezioro świata, z około 20% słodkiej wody powierzchniowej Ziemi."],["geiranger","Geirangerfjord","Norwegia","n",62.1049,7.0947,"Europe/Oslo","Wąski fiord wśród stromych ścian i wodospadów."],["santorini","Santorini","Grecja","n",36.3932,25.4615,"Europe/Athens","Białe domy na krawędzi kaldery po wybuchu wulkanu sprzed 3600 lat."],["antarktyda","Biegun Południowy","Antarktyda","n",-90,0,"Antarctica/McMurdo","Lodowa wyżyna na wysokości 2800 m, gdzie zbiegają się wszystkie południki."],["fudzi","Fudżi","Japonia","n",35.3606,138.7274,"Asia/Tokyo","Najwyższa góra Japonii, 3776 m — symetryczny wulkan widoczny z Tokio w pogodne dni."],["matterhorn","Matterhorn","Szwajcaria i Włochy","n",45.9763,7.6586,"Europe/Zurich","Ostra piramida skalna nad Zermatt, jeden z najsłynniejszych szczytów Alp."],["tre-cime","Tre Cime di Lavaredo","Dolomity, Włochy","n",46.6187,12.3022,"Europe/Rome","Trzy pionowe turnie z jasnego dolomitu, ikona włoskich Alp."],["plitwice","Jeziora Plitwickie","Chorwacja","n",44.8654,15.582,"Europe/Zagreb","Kaskada turkusowych jezior połączonych wodospadami."],["etna","Etna","Sycylia, Włochy","n",37.751,14.9934,"Europe/Rome","Najwyższy czynny wulkan Europy, wciąż regularnie wybuchający."],["kapadocja","Kapadocja","Turcja","n",38.6431,34.8289,"Europe/Istanbul","Kominy skalne, podziemne miasta i balony nad doliną o świcie."],["morze-martwe","Morze Martwe","Bliski Wschód","n",31.559,35.4732,"Asia/Jerusalem","Słone jezioro w najniższym miejscu na lądzie, ponad 400 m poniżej poziomu morza."],["jokulsarlon","Jökulsárlón","Islandia","n",64.0784,-16.2306,"Atlantic/Reykjavik","Laguna, po której dryfują góry lodowe oderwane od lodowca."],["yellowstone","Yellowstone","Stany Zjednoczone","n",44.4605,-110.8281,"America/Denver","Pierwszy park narodowy świata, z gejzerem Old Faithful."],["yosemite","Yosemite","Kalifornia, Stany Zjednoczone","n",37.8651,-119.5383,"America/Los_Angeles","Granitowe ściany El Capitan i Half Dome nad doliną z wodospadami."],["uyuni","Salar de Uyuni","Boliwia","n",-20.1338,-67.4891,"America/La_Paz","Największa solna równina świata — po deszczu zmienia się w lustro nieba."],["perito-moreno","Lodowiec Perito Moreno","Patagonia, Argentyna","n",-50.4967,-73.1377,"America/Argentina/Rio_Gallegos","Lodowa ściana nad jeziorem, z której z hukiem odpadają bloki lodu."],["torres-del-paine","Torres del Paine","Patagonia, Chile","n",-50.9423,-73.4068,"America/Punta_Arenas","Granitowe wieże nad jeziorami i lodowcami na końcu Andów."],["manaus","Spotkanie wód","Amazonia, Brazylia","n",-3.1395,-59.8975,"America/Manaus","Ciemna Rio Negro i piaszczysta Solimões płyną obok siebie, zanim się zmieszają."],["okawango","Delta Okawango","Botswana","n",-19.3,22.9,"Africa/Gaborone","Śródlądowa delta na Kalahari, która co roku zalewa się wodą i ożywa."],["baobaby","Aleja Baobabów","Madagaskar","n",-20.2508,44.4184,"Indian/Antananarivo","Szpaler wielkich baobabów przy drodze, najpiękniejszy o zachodzie słońca."],["aoraki","Aoraki / Mount Cook","Nowa Zelandia","n",-43.595,170.1418,"Pacific/Auckland","Najwyższy szczyt Nowej Zelandii w Alpach Południowych."],["biegun-polnocny","Biegun Północny","Arktyka","n",90,0,null,"Dryfujący lód na Oceanie Arktycznym — stąd każdy kierunek prowadzi na południe."]],Yi=gx.map(([i,e,t,n,r,a,s,o])=>({id:i,name:e,region:t,cat:n,lat:r,lng:a,tz:s,blurb:o})),ve=i=>document.querySelector(i),_x=Kr.isNativePlatform(),Nt={get(i,e){try{const t=localStorage.getItem("meridian-"+i);return t==null?e:JSON.parse(t)}catch{return e}},set(i,e){try{localStorage.setItem("meridian-"+i,JSON.stringify(e))}catch{}}},at={real:!0,clouds:!0,spin:!0,tiles:!0,labels:!0,...Nt.get("settings",{})},xn=new Set(Nt.get("favorites",[]));let Ti=Nt.get("own",[]).filter(i=>i&&i.name&&Number.isFinite(i.lat)&&Number.isFinite(i.lng)),xt=Nt.get("home",null);const Zn=Nt.get("best",{}),zi=()=>Yi.concat(Ti.map(i=>({...i,cat:"own",region:"Moje miejsce",tz:null,blurb:""}))),po=i=>zi().find(e=>e.id===i),Si=i=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`,cn={tour:Si('<path d="M3 11l18-8-8 18-2-8-8-2z"/>'),quiz:Si('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><path d="M12 17h.01"/>'),settings:Si('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),close:Si('<path d="M6 6l12 12M18 6L6 18"/>'),star:Si('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),stop:Si('<rect x="6" y="6" width="12" height="12" rx="2"/>')};ve("#btn-tour").innerHTML=cn.tour;ve("#btn-quiz").innerHTML=cn.quiz;ve("#btn-settings").innerHTML=cn.settings;ve("#version").textContent="wersja 1.2.0";let yt=null,Ht="places";const Re=mx(ve("#view"),{onPlace:i=>{Ht==="places"&&mr(i,{scroll:!0})},onGround:i=>{Ht==="quiz"?Tx(i):Ht==="places"&&bx(i)},onTiles:i=>ve("#attrib").hidden=!i});ve("#zoom-in").onclick=()=>Re.zoomBy(.4);ve("#zoom-out").onclick=()=>Re.zoomBy(2.5);Re.whenReady(()=>ve("#loading").classList.add("done"));let Qi=0;const ea=()=>new Date(Date.now()+Qi*36e5),vx=new Intl.DateTimeFormat("pl-PL",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});function mo(){Re.setSun(at.real);const i=_l(ea());Re.setSubsolar(i.lat,i.lng);const e=Qi?` <b>${Qi>0?"+":"−"}${El(Math.abs(Qi))}</b>`:"";ve("#clock").innerHTML=at.real?vx.format(ea())+e:"Zawsze dzień"}function El(i){const e=Math.floor(i),t=Math.round((i-e)*60);return t?`${e} h ${t} min`:`${e} h`}function Mx(){mo(),Ht==="places"&&(ri(),ai())}setInterval(Mx,3e4);let en=Nt.get("filter","all"),wl="";const zc=i=>i.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").replace(/ł/g,"l");function xo(){const i=zc(wl.trim());return zi().filter(e=>en==="fav"&&!xn.has(e.id)||en!=="all"&&en!=="fav"&&e.cat!==en?!1:!i||zc(e.name+" "+e.region).includes(i))}function er(){const i=zi(),e=t=>t==="all"?i.length:t==="fav"?i.filter(n=>xn.has(n.id)).length:i.filter(n=>n.cat===t).length;ve("#chips").innerHTML="";for(const t of xx){const n=e(t.id);if(!n&&(t.id==="fav"||t.id==="own")&&en!==t.id)continue;const r=document.createElement("button");r.type="button",r.className="chip"+(en===t.id?" on":""),r.setAttribute("role","tab"),r.setAttribute("aria-selected",String(en===t.id)),r.innerHTML=`${t.label}<small>${n}</small>`,r.onclick=()=>{en=t.id,Nt.set("filter",en),er(),ri()},ve("#chips").appendChild(r)}}function yx(i){return i>0?"":i>-6?"dusk":"night"}function ri(){const i=ve("#list"),e=xo(),t=ea();if(i.innerHTML="",!e.length){i.innerHTML=`<li class="empty">${en==="fav"?"Nie masz jeszcze ulubionych. Otwórz miejsce i dotknij gwiazdki.":en==="own"?"Dotknij globusu w dowolnym punkcie, żeby dodać własne miejsce.":"Nic nie pasuje do wyszukiwania."}</li>`;return}for(const n of e){const r=document.createElement("li"),a=document.createElement("button");a.type="button",a.dataset.id=n.id;const s=yt?.type==="place"&&yt.id===n.id;a.className=s?"on":"";const o=vl(n.lat,n.lng,t);a.innerHTML=`<i class="mark${n.cat==="own"?" own":""}"></i><span class="copy"><strong></strong><span class="sub"></span></span><span class="time"><i class="sun-dot ${yx(o)}"></i>${bl(t,n.tz,n.lng)}</span>`,a.querySelector("strong").textContent=n.name,a.querySelector(".sub").textContent=n.region,a.onclick=()=>{Fn(),mr(n.id)},r.appendChild(a),i.appendChild(r)}}ve("#q").addEventListener("input",i=>{wl=i.target.value,ri()});ve("#q").addEventListener("keydown",i=>{if(i.key==="Enter"){const e=xo()[0];e&&mr(e.id),i.target.blur()}});function mr(i,{scroll:e=!1,fly:t=!0}={}){const n=po(i);if(n){if(yt?.type==="place"&&yt.id===i&&!ei){Qn();return}yt={type:"place",id:i},Re.setPin("tap",null),Re.select(i,{fly:t}),ta(n),ai(),ri(),e&&ve(`#list button[data-id="${CSS.escape(i)}"]`)?.scrollIntoView({block:"nearest",behavior:"smooth"})}}function bx(i){Fn(),yt={type:"point",lat:i.lat,lng:i.lng},Re.select(null,{fly:!1}),Re.setPin("tap",i,9425919),ta(i),ai(),ri(),lr()==="mini"&&nn("peek")}function Qn(){yt=null,Re.select(null,{fly:!1}),Re.setPin("tap",null),Re.setArc(null),Re.release(),ai(),ri()}function ta(i){xt&&i&&uo(xt.lat,xt.lng,i.lat,i.lng)>30?Re.setArc(xt,i):Re.setArc(null)}function Fc(i,e,t,n=!0){const r=ea(),a=vl(i,e,r),s=bl(r,t,e),o=[`<span>${t?"Czas lokalny":"Czas słoneczny (przybliżony)"}: <b>${s}</b></span>`,`<span>Teraz: <b>${J0(a)}</b></span>`];if(xt){const c=uo(xt.lat,xt.lng,i,e);c>30?o.push(`<span class="km">Od mojego punktu: <b>${yl(c)}</b> · lot ok. ${Z0($0(c))}</span>`):o.push('<span class="km">To jest <b>tuż obok</b> twojego punktu</span>')}return n&&o.push(`<span>${ho(i,e)}</span>`),`<div class="facts">${o.join("")}</div>`}function ai(){const i=ve("#detail");if(!yt){i.innerHTML='<p class="hint">Przeciągnij globus, szczypnij, przewiń albo dotknij dwa razy, żeby przybliżyć — z bliska widać zdjęcia satelitarne. Dotknij świecącego znacznika lub miejsca z listy — kamera tam doleci. Dotknij dowolnego punktu Ziemi, żeby sprawdzić, która tam godzina.</p>';return}if(yt.type==="place"){const r=po(yt.id);if(!r)return Qn();const a=xn.has(r.id);i.innerHTML=`<div class="card">
      <div class="card-head"><div><p class="region"></p><h2></h2></div>
      <button class="star${a?" on":""}" type="button" aria-pressed="${a}" aria-label="${a?"Usuń z ulubionych":"Dodaj do ulubionych"}">${cn.star}</button></div>
      ${r.blurb?'<p class="blurb"></p>':""}
      ${Fc(r.lat,r.lng,r.tz)}
      <div class="card-actions">
        <button class="ghost small" data-act="close" type="button">Zamknij</button>
        <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
        <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
        ${r.cat==="own"?'<button class="ghost small danger" data-act="delete" type="button">Usuń miejsce</button>':""}
      </div></div>`,i.querySelector(".region").textContent=r.region,i.querySelector("h2").textContent=r.name,r.blurb&&(i.querySelector(".blurb").textContent=r.blurb),i.querySelector(".star").onclick=()=>{xn.has(r.id)?xn.delete(r.id):xn.add(r.id),Nt.set("favorites",[...xn]),ai(),er()},i.querySelector('[data-act="close"]').onclick=Qn,i.querySelector('[data-act="home"]').onclick=()=>na({lat:r.lat,lng:r.lng,label:r.name}),i.querySelector('[data-act="zoom"]').onclick=()=>Oc(r),i.querySelector('[data-act="delete"]')?.addEventListener("click",()=>{Ti=Ti.filter(s=>s.id!==r.id),xn.delete(r.id),Nt.set("own",Ti),Nt.set("favorites",[...xn]),Re.setPlaces(zi()),Qn(),er(),En(`Usunięto „${r.name}”.`)});return}const{lat:e,lng:t}=yt;i.innerHTML=`<div class="card">
    <p class="region">Wybrany punkt</p><h2>${ho(e,t).replace(/\s{3}/,", ")}</h2>
    ${Fc(e,t,null,!1)}
    <form class="name-form" hidden><input type="text" maxlength="40" placeholder="Nazwa miejsca" aria-label="Nazwa miejsca" required /><button class="solid" type="submit">Zapisz</button></form>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
      <button class="ghost small" data-act="add" type="button">Dodaj do moich miejsc</button>
      <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
    </div></div>`;const n=i.querySelector(".name-form");i.querySelector('[data-act="close"]').onclick=Qn,i.querySelector('[data-act="home"]').onclick=()=>na({lat:e,lng:t,label:null}),i.querySelector('[data-act="zoom"]').onclick=()=>Oc({lat:e,lng:t}),i.querySelector('[data-act="add"]').onclick=r=>{n.hidden=!1,r.currentTarget.hidden=!0,n.querySelector("input").focus()},n.onsubmit=r=>{r.preventDefault();const a=n.querySelector("input").value.trim();if(!a)return;const s={id:"own-"+Date.now().toString(36),name:a,lat:+e.toFixed(4),lng:+t.toFixed(4)};Ti.push(s),Nt.set("own",Ti),Re.setPlaces(zi()),er(),mr(s.id,{fly:!1}),En(`Dodano „${a}” do moich miejsc.`)}}function Oc(i){Fn(),Re.zoomTo(i.lat,i.lng,.005),zn()||nn("mini"),at.tiles||En("Włącz w ustawieniach zdjęcia satelitarne, żeby widzieć szczegóły.")}function na(i){xt=i?{lat:Math.round(i.lat*100)/100,lng:Math.round(i.lng*100)/100,label:i.label||null}:null,Nt.set("home",xt),Re.setPin("home",xt,10477760),Tl(),yt?.type==="place"?ta(po(yt.id)):yt?.type==="point"&&ta(yt),ai(),i&&En("Zapisano twój punkt — przy każdym miejscu zobaczysz odległość.")}function Tl(){ve("#home-info").textContent=xt?`${xt.label?xt.label+" · ":""}${ho(xt.lat,xt.lng)}`:"Nie ustawiono. Z mojego punktu liczę odległości i rysuję trasę lotu.",ve("#home-clear").hidden=!xt}ve("#home-clear").onclick=()=>{na(null),En("Usunięto twój punkt.")};ve("#home-gps").onclick=()=>{if(!navigator.geolocation)return En("To urządzenie nie udostępnia lokalizacji.");ve("#home-gps").disabled=!0,navigator.geolocation.getCurrentPosition(i=>{ve("#home-gps").disabled=!1,na({lat:i.coords.latitude,lng:i.coords.longitude,label:"Moja lokalizacja"}),Re.focus(xt.lat,xt.lng)},()=>{ve("#home-gps").disabled=!1,En("Nie udało się pobrać lokalizacji. Możesz dotknąć globusu i ustawić punkt ręcznie.")},{enableHighAccuracy:!1,timeout:15e3,maximumAge:6e5})};const ks=ve("#opt-real"),Bs=ve("#opt-clouds"),Vs=ve("#opt-spin"),Gs=ve("#opt-tiles"),Hs=ve("#opt-labels");Gs.checked=at.tiles;Hs.checked=at.labels;Gs.onchange=()=>{at.tiles=Gs.checked,Re.setTiles(at.tiles),xr()};Hs.onchange=()=>{at.labels=Hs.checked,Re.setLabels(at.labels),xr()};const Ws=ve("#opt-time");ks.checked=at.real;Bs.checked=at.clouds;Vs.checked=at.spin;function xr(){Nt.set("settings",at)}ks.onchange=()=>{at.real=ks.checked,ve("#time-box").hidden=!at.real,xr(),mo()};Bs.onchange=()=>{at.clouds=Bs.checked,Re.setClouds(at.clouds),xr()};Vs.onchange=()=>{at.spin=Vs.checked,Re.setSpin(at.spin),Re.setTiles(at.tiles),Re.setLabels(at.labels),xr()};function go(i){Qi=i,Ws.value=String(i),ve("#time-out").textContent=i?(i>0?"+":"−")+El(Math.abs(i)):"teraz",ve("#time-now").hidden=!i,mo()}Ws.oninput=()=>go(Number(Ws.value));ve("#time-now").onclick=()=>go(0);const tr=ve("#panel"),zn=()=>matchMedia("(min-width: 820px)").matches,lr=()=>tr.dataset.sheet;function nn(i){tr.dataset.sheet=i}function ii(i){Ht=i;for(const e of["places","quiz","settings"])ve(`#view-${e}`).hidden=e!==i;ve("#btn-quiz").classList.toggle("on",i==="quiz"),ve("#btn-settings").classList.toggle("on",i==="settings"),ve("#btn-quiz").innerHTML=i==="quiz"?cn.close:cn.quiz,ve("#btn-settings").innerHTML=i==="settings"?cn.close:cn.settings,i==="places"&&(ri(),ai())}ve("#btn-settings").onclick=()=>{Fn(),Ht==="quiz"&&oa(),ii(Ht==="settings"?"places":"settings"),Ht==="settings"&&lr()!=="full"&&!zn()&&nn("full")};{const i=ve("#grip");let e=null;i.addEventListener("pointerdown",t=>{e=t.clientY,i.setPointerCapture(t.pointerId)}),i.addEventListener("pointerup",t=>{if(e==null)return;const n=t.clientY-e;e=null;const r=["mini","peek","full"],a=r.indexOf(lr());n<-24?nn(r[Math.min(2,a+1)]):n>24?nn(r[Math.max(0,a-1)]):nn(lr()==="full"?"peek":"full")})}new ResizeObserver(()=>{zn()?Re.setViewShift((tr.offsetWidth+16)/2,0):Re.setViewShift(0,Math.min(tr.offsetHeight,window.innerHeight*.6)/2)}).observe(tr);let ei=null;function Sx(){const i=xo();if(i.length<2)return En("Za mało miejsc na liście, żeby ruszyć w wycieczkę.");Ht!=="places"&&ii("places");let e=yt?.type==="place"?i.findIndex(n=>n.id===yt.id):-1;const t=()=>{e=(e+1)%i.length,mr(i[e].id,{scroll:!0})};ei=setInterval(t,7e3),t(),ve("#btn-tour").classList.add("on"),ve("#btn-tour").innerHTML=cn.stop,ve("#btn-tour").setAttribute("aria-label","Zatrzymaj wycieczkę"),En(`Wycieczka po ${i.length} miejscach. Dotknij globusu, żeby przerwać.`)}function Fn(){ei&&(clearInterval(ei),ei=null,ve("#btn-tour").classList.remove("on"),ve("#btn-tour").innerHTML=cn.tour,ve("#btn-tour").setAttribute("aria-label","Wycieczka po miejscach"))}ve("#btn-tour").onclick=()=>ei?Fn():Sx();ve("#view canvas").addEventListener("pointerdown",Fn);const Ex=[{id:"easy",label:"Łatwy",desc:"Miasta świata, z podpowiedzią kraju",pool:()=>Yi.filter(i=>i.cat==="m"),hint:!0},{id:"world",label:"Cały świat",desc:"Miasta, cuda i przyroda — bez podpowiedzi",pool:()=>Yi,hint:!1},{id:"pl",label:"Polska",desc:"Miejsca w Polsce — tu liczy się każdy kilometr",pool:()=>Yi.filter(i=>i.cat==="p"),hint:!1,scale:8},{id:"de",label:"Niemcy",desc:"Bawaria i reszta Niemiec — z Eichendorfem włącznie",pool:()=>Yi.filter(i=>i.cat==="d"),hint:!1,scale:6}],Al=10;let si=null;function wx(i){const e=i.slice();for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}ve("#btn-quiz").onclick=()=>{if(Fn(),Ht==="quiz"){oa(),ii("places");return}Qn(),ii("quiz"),Re.setMarkersVisible(!1),Re.setPin("home",null),_o()};function _o(){si=null;const i=ve("#view-quiz");i.innerHTML=`<h2 class="section-title">Gdzie to jest?</h2>
    <p class="hint">Dostajesz nazwę miejsca i dotykasz globusu tam, gdzie twoim zdaniem leży. Im bliżej, tym więcej punktów — maksymalnie 1000 za rundę, ${Al} rund.</p>
    <div class="levels"></div>`;for(const e of Ex){const t=document.createElement("button");t.type="button",t.className="level",t.innerHTML=`<strong>${e.label}</strong><small>${e.desc}${Zn[e.id]?` · rekord ${Zn[e.id]}`:""}</small>`,t.onclick=()=>Cl(e),i.querySelector(".levels").appendChild(t)}zn()||nn("peek")}function Cl(i){si={level:i,list:wx(i.pool()).slice(0,Al),round:0,score:0,answered:!1},Rl()}function Rl(){const i=si,e=i.list[i.round];i.answered=!1,Re.setPin("guess",null),Re.setPin("target",null),Re.setArc(null),Re.release(),ve("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${i.round+1}</b> z ${i.list.length}</span><span>Wynik <b>${i.score}</b></span></div>
    <div class="progress"><i style="width:${i.round/i.list.length*100}%"></i></div>
    <p class="hint">Gdzie leży…</p>
    <p class="quiz-target"></p>
    ${i.level.hint?'<p class="region quiz-hint"></p>':""}
    <p class="hint">Obróć globus i dotknij miejsca, które obstawiasz.</p>`,ve("#view-quiz .quiz-target").textContent=e.name,i.level.hint&&(ve("#view-quiz .quiz-hint").textContent=e.region),zn()||nn("mini")}function Tx(i){const e=si;if(!e||e.answered)return;e.answered=!0;const t=e.list[e.round],n=uo(i.lat,i.lng,t.lat,t.lng),r=Y0(n*(e.level.scale||1));e.score+=r,Re.setPin("guess",i,9425919),Re.setPin("target",t,16766090),Re.setArc(i,t);const a={lat:(i.lat+t.lat)/2,lng:Math.abs(i.lng-t.lng)>180?(i.lng+t.lng+360)/2%360:(i.lng+t.lng)/2};Re.focus(a.lat,a.lng>180?a.lng-360:a.lng,Math.min(4.2,1.9+n/4e3));const s=n<50?"W punkt!":n<300?"Bardzo blisko.":n<1e3?"Niedaleko.":n<3e3?"Ten sam kawałek świata.":"Daleko…",o=e.round+1>=e.list.length;ve("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${e.round+1}</b> z ${e.list.length}</span><span>Wynik <b>${e.score}</b></span></div>
    <div class="progress"><i style="width:${(e.round+1)/e.list.length*100}%"></i></div>
    <p class="quiz-target"></p>
    <p class="quiz-result"><span class="pts">+${r}</span><br>${s} Twój strzał był <b>${yl(n)}</b> od celu.</p>
    <p class="blurb"></p>
    <div class="row-buttons"><button class="solid" type="button" id="quiz-next">${o?"Zobacz wynik":"Dalej"}</button></div>`,ve("#view-quiz .quiz-target").textContent=t.name,ve("#view-quiz .blurb").textContent=`${t.region}. ${t.blurb}`,ve("#quiz-next").onclick=()=>{e.round+=1,e.round>=e.list.length?Ax():Rl()},zn()||nn("peek")}function Ax(){const i=si,e=i.list.length*1e3,t=i.score>(Zn[i.level.id]||0);t&&(Zn[i.level.id]=i.score,Nt.set("best",Zn)),Re.setPin("guess",null),Re.setPin("target",null),Re.setArc(null),Re.release();const n=i.score/e,r=n>.85?"Mistrzowska orientacja!":n>.65?"Świetny wynik.":n>.4?"Całkiem nieźle.":"Globus czeka na kolejne podejście.";ve("#view-quiz").innerHTML=`
    <h2 class="section-title">Koniec quizu</h2>
    <p class="quiz-result"><span class="pts">${i.score}</span> / ${e}<br>${r}${t?" <b>To twój nowy rekord!</b>":Zn[i.level.id]?` Rekord: ${Zn[i.level.id]}.`:""}</p>
    <div class="row-buttons">
      <button class="solid" type="button" id="quiz-again">Jeszcze raz</button>
      <button class="ghost" type="button" id="quiz-levels">Inny poziom</button>
      <button class="ghost" type="button" id="quiz-close">Zamknij quiz</button>
    </div>`,ve("#quiz-again").onclick=()=>Cl(i.level),ve("#quiz-levels").onclick=_o,ve("#quiz-close").onclick=()=>{oa(),ii("places")},zn()||nn("peek")}function oa(){si=null,Re.setPin("guess",null),Re.setPin("target",null),Re.setArc(null),Re.setMarkersVisible(!0),Re.setPin("home",xt,10477760),Re.release()}let kc=0;function En(i){const e=ve("#toast");e.textContent=i,e.hidden=!1,clearTimeout(kc),kc=setTimeout(()=>e.hidden=!0,3600)}_x&&kl(async()=>{const{App:i}=await import("./index-DdKYjgED.js");return{App:i}},[],import.meta.url).then(({App:i})=>{i.addListener("backButton",()=>{ei?Fn():Ht==="quiz"&&si?_o():Ht!=="places"?(Ht==="quiz"&&oa(),ii("places")):yt?Qn():!zn()&&lr()==="full"?nn("peek"):i.exitApp()})});Re.setPlaces(zi());Re.setClouds(at.clouds);Re.setSpin(at.spin);Re.setPin("home",xt,10477760);ve("#time-box").hidden=!at.real;go(0);er();Tl();ii("places");"serviceWorker"in navigator&&window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));export{qs as W,kl as _,Xs as r};
