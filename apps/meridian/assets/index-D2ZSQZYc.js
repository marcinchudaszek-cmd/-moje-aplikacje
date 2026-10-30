(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const wl="modulepreload",Cl=function(i,e){return new URL(i,e).href},vo={},Rl=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");r=l(t.map(u=>{if(u=Cl(u,n),u in vo)return;vo[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(n)for(let x=a.length-1;x>=0;x--){const _=a[x];if(_.href===u&&(!d||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const p=document.createElement("link");if(p.rel=d?"stylesheet":wl,d||(p.as="script"),p.crossOrigin="",p.href=u,c&&p.setAttribute("nonce",c),document.head.appendChild(p),d)return new Promise((x,_)=>{p.addEventListener("load",x),p.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function s(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return r.then(a=>{for(const o of a||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};var Ri;(function(i){i.Unimplemented="UNIMPLEMENTED",i.Unavailable="UNAVAILABLE"})(Ri||(Ri={}));class os extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}}const Pl=i=>{var e,t;return i?.androidBridge?"android":!((t=(e=i?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},Ll=i=>{const e=i.CapacitorCustomPlatform||null,t=i.Capacitor||{},n=t.Plugins=t.Plugins||{},r=()=>e!==null?e.name:Pl(i),s=()=>r()!=="web",a=d=>{const h=l.get(d);return!!(h?.platforms.has(r())||o(d))},o=d=>{var h;return(h=t.PluginHeaders)===null||h===void 0?void 0:h.find(p=>p.name===d)},c=d=>i.console.error(d),l=new Map,u=(d,h={})=>{const p=l.get(d);if(p)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),p.proxy;const x=r(),_=o(d);let m;const f=async()=>(!m&&x in h?m=typeof h[x]=="function"?m=await h[x]():m=h[x]:e!==null&&!m&&"web"in h&&(m=typeof h.web=="function"?m=await h.web():m=h.web),m),w=(U,b)=>{var M,D;if(_){const z=_?.methods.find(k=>b===k.name);if(z)return z.rtype==="promise"?k=>t.nativePromise(d,b.toString(),k):(k,W)=>t.nativeCallback(d,b.toString(),k,W);if(U)return(M=U[b])===null||M===void 0?void 0:M.bind(U)}else{if(U)return(D=U[b])===null||D===void 0?void 0:D.bind(U);throw new os(`"${d}" plugin is not implemented on ${x}`,Ri.Unimplemented)}},S=U=>{let b;const M=(...D)=>{const z=f().then(k=>{const W=w(k,U);if(W){const Y=W(...D);return b=Y?.remove,Y}else throw new os(`"${d}.${U}()" is not implemented on ${x}`,Ri.Unimplemented)});return U==="addListener"&&(z.remove=async()=>b()),z};return M.toString=()=>`${U.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:U,writable:!1,configurable:!1}),M},A=S("addListener"),P=S("removeListener"),y=(U,b)=>{const M=A({eventName:U},b),D=async()=>{const k=await M;P({eventName:U,callbackId:k},b)},z=new Promise(k=>M.then(()=>k({remove:D})));return z.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await D()},z},L=new Proxy({},{get(U,b){switch(b){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return _?y:A;case"removeListener":return P;default:return S(b)}}});return n[d]=L,l.set(d,{name:d,proxy:L,platforms:new Set([...Object.keys(h),..._?[x]:[]])}),L};return t.convertFileSrc||(t.convertFileSrc=d=>d),t.getPlatform=r,t.handleError=c,t.isNativePlatform=s,t.isPluginAvailable=a,t.registerPlugin=u,t.Exception=os,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},Dl=i=>i.Capacitor=Ll(i),qr=Dl(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),Oa=qr.registerPlugin;class za{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);const s=this.windowListeners[e];s&&!s.registered&&this.addWindowListener(s),n&&this.sendRetainedArgumentsForEvent(e);const a=async()=>this.removeListener(e,t);return Promise.resolve({remove:a})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){const r=this.listeners[e];if(!r){if(n){let s=this.retainedEventArguments[e];s||(s=[]),s.push(t),this.retainedEventArguments[e]=s}return}r.forEach(s=>s(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:n=>{this.notifyListeners(t,n)}}}unimplemented(e="not implemented"){return new qr.Exception(e,Ri.Unimplemented)}unavailable(e="not available"){return new qr.Exception(e,Ri.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const r=n.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(n=>{this.notifyListeners(e,n)}))}}const Mo=i=>encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),bo=i=>i.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Ul extends za{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(n=>{if(n.length<=0)return;let[r,s]=n.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=bo(r).trim(),s=bo(s).trim(),t[r]=s}),t}async setCookie(e){try{const t=Mo(e.key),n=Mo(e.value),r=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",s=(e.path||"/").replace("path=",""),a=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${n||""}${r}; path=${s}; ${a};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}Oa("CapacitorCookies",{web:()=>new Ul});const Il=async i=>new Promise((e,t)=>{const n=new FileReader;n.onload=()=>{const r=n.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},n.onerror=r=>t(r),n.readAsDataURL(i)}),Nl=(i={})=>{const e=Object.keys(i);return Object.keys(i).map(r=>r.toLocaleLowerCase()).reduce((r,s,a)=>(r[s]=i[e[a]],r),{})},Fl=(i,e=!0)=>i?Object.entries(i).reduce((n,r)=>{const[s,a]=r;let o,c;return Array.isArray(a)?(c="",a.forEach(l=>{o=e?encodeURIComponent(l):l,c+=`${s}=${o}&`}),c.slice(0,-1)):(o=e?encodeURIComponent(a):a,c=`${s}=${o}`),`${n}&${c}`},"").substr(1):null,Ol=(i,e={})=>{const t=Object.assign({method:i.method||"GET",headers:i.headers},e),r=Nl(i.headers)["content-type"]||"";if(typeof i.data=="string")t.body=i.data;else if(r.includes("application/x-www-form-urlencoded")){const s=new URLSearchParams;for(const[a,o]of Object.entries(i.data||{}))s.set(a,o);t.body=s.toString()}else if(r.includes("multipart/form-data")||i.data instanceof FormData){const s=new FormData;if(i.data instanceof FormData)i.data.forEach((o,c)=>{s.append(c,o)});else for(const o of Object.keys(i.data))s.append(o,i.data[o]);t.body=s;const a=new Headers(t.headers);a.delete("content-type"),t.headers=a}else(r.includes("application/json")||typeof i.data=="object")&&(t.body=JSON.stringify(i.data));return t};class zl extends za{async request(e){const t=Ol(e,e.webFetchExtra),n=Fl(e.params,e.shouldEncodeUrlParams),r=n?`${e.url}?${n}`:e.url,s=await fetch(r,t),a=s.headers.get("content-type")||"";let{responseType:o="text"}=s.ok?e:{};a.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await s.blob(),c=await Il(l);break;case"json":c=await s.json();break;default:c=await s.text()}const u={};return s.headers.forEach((d,h)=>{u[h]=d}),{data:c,headers:u,status:s.status,url:s.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}Oa("CapacitorHttp",{web:()=>new zl});var So;(function(i){i.Dark="DARK",i.Light="LIGHT",i.Default="DEFAULT"})(So||(So={}));var yo;(function(i){i.StatusBar="StatusBar",i.NavigationBar="NavigationBar"})(yo||(yo={}));class Bl extends za{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}Oa("SystemBars",{web:()=>new Bl});const Ba="181",kl=0,Eo=1,Vl=2,Dc=1,Gl=2,mn=3,bn=0,Ct=1,sn=2,vn=0,wi=1,Ai=2,To=3,Ao=4,Hl=5,qn=100,Wl=101,Xl=102,ql=103,Yl=104,$l=200,jl=201,Kl=202,Zl=203,Hs=204,Ws=205,Jl=206,Ql=207,eu=208,tu=209,nu=210,iu=211,ru=212,su=213,au=214,Xs=0,qs=1,Ys=2,Pi=3,$s=4,js=5,Ks=6,Zs=7,Uc=0,ou=1,cu=2,Nn=0,lu=1,uu=2,du=3,hu=4,fu=5,pu=6,mu=7,Ic=300,Li=301,Di=302,Js=303,Qs=304,Qr=306,ea=1e3,gn=1001,ta=1002,kt=1003,xu=1004,xr=1005,qt=1006,cs=1007,jn=1008,Sn=1009,Nc=1010,Fc=1011,tr=1012,ka=1013,Qn=1014,_n=1015,Fi=1016,Va=1017,Ga=1018,nr=1020,Oc=35902,zc=35899,Bc=1021,kc=1022,tn=1023,ir=1026,rr=1027,Vc=1028,Ha=1029,Wa=1030,Xa=1031,qa=1033,kr=33776,Vr=33777,Gr=33778,Hr=33779,na=35840,ia=35841,ra=35842,sa=35843,aa=36196,oa=37492,ca=37496,la=37808,ua=37809,da=37810,ha=37811,fa=37812,pa=37813,ma=37814,xa=37815,ga=37816,_a=37817,va=37818,Ma=37819,ba=37820,Sa=37821,ya=36492,Ea=36494,Ta=36495,Aa=36283,wa=36284,Ca=36285,Ra=36286,gu=3200,_u=3201,vu=0,Mu=1,Un="",Bt="srgb",Ui="srgb-linear",Yr="linear",et="srgb",ci=7680,wo=519,bu=512,Su=513,yu=514,Gc=515,Eu=516,Tu=517,Au=518,wu=519,Co=35044,Ro="300 es",an=2e3,$r=2001;function Hc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cu(){const i=sr("canvas");return i.style.display="block",i}const Po={};function Lo(...i){const e="THREE."+i.shift();console.log(e,...i)}function Fe(...i){const e="THREE."+i.shift();console.warn(e,...i)}function lt(...i){const e="THREE."+i.shift();console.error(e,...i)}function ar(...i){const e=i.join(" ");e in Po||(Po[e]=!0,Fe(...i))}function Ru(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class Oi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Do=1234567;const $i=Math.PI/180,or=180/Math.PI;function zi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function Ge(i,e,t){return Math.max(e,Math.min(t,i))}function Ya(i,e){return(i%e+e)%e}function Pu(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function Lu(i,e,t){return i!==e?(t-i)/(e-i):0}function ji(i,e,t){return(1-t)*i+t*e}function Du(i,e,t,n){return ji(i,e,1-Math.exp(-t*n))}function Uu(i,e=1){return e-Math.abs(Ya(i,e*2)-e)}function Iu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Nu(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Fu(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Ou(i,e){return i+Math.random()*(e-i)}function zu(i){return i*(.5-Math.random())}function Bu(i){i!==void 0&&(Do=i);let e=Do+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ku(i){return i*$i}function Vu(i){return i*or}function Gu(i){return(i&i-1)===0&&i!==0}function Hu(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Wu(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Xu(i,e,t,n,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),u=a((e+n)/2),d=s((e-n)/2),h=a((e-n)/2),p=s((n-e)/2),x=a((n-e)/2);switch(r){case"XYX":i.set(o*u,c*d,c*h,o*l);break;case"YZY":i.set(c*h,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*h,o*u,o*l);break;case"XZX":i.set(o*u,c*x,c*p,o*l);break;case"YXY":i.set(c*p,o*u,c*x,o*l);break;case"ZYZ":i.set(c*x,c*p,o*u,o*l);break;default:Fe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Ei(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function At(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Wt={DEG2RAD:$i,RAD2DEG:or,generateUUID:zi,clamp:Ge,euclideanModulo:Ya,mapLinear:Pu,inverseLerp:Lu,lerp:ji,damp:Du,pingpong:Uu,smoothstep:Iu,smootherstep:Nu,randInt:Fu,randFloat:Ou,randFloatSpread:zu,seededRandom:Bu,degToRad:ku,radToDeg:Vu,isPowerOfTwo:Gu,ceilPowerOfTwo:Hu,floorPowerOfTwo:Wu,setQuaternionFromProperEuler:Xu,normalize:At,denormalize:Ei};class Re{constructor(e=0,t=0){Re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class lr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],h=s[a+0],p=s[a+1],x=s[a+2],_=s[a+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=h,e[t+1]=p,e[t+2]=x,e[t+3]=_;return}if(d!==_||c!==h||l!==p||u!==x){let m=c*h+l*p+u*x+d*_;m<0&&(h=-h,p=-p,x=-x,_=-_,m=-m);let f=1-o;if(m<.9995){const w=Math.acos(m),S=Math.sin(w);f=Math.sin(f*w)/S,o=Math.sin(o*w)/S,c=c*f+h*o,l=l*f+p*o,u=u*f+x*o,d=d*f+_*o}else{c=c*f+h*o,l=l*f+p*o,u=u*f+x*o,d=d*f+_*o;const w=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=w,l*=w,u*=w,d*=w}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=s[a],h=s[a+1],p=s[a+2],x=s[a+3];return e[t]=o*x+u*d+c*p-l*h,e[t+1]=c*x+u*h+l*d-o*p,e[t+2]=l*x+u*p+o*h-c*d,e[t+3]=u*x-o*d-c*h-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(s/2),h=c(n/2),p=c(r/2),x=c(s/2);switch(a){case"XYZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"YXZ":this._x=h*u*d+l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"ZXY":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d-h*p*x;break;case"ZYX":this._x=h*u*d-l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d+h*p*x;break;case"YZX":this._x=h*u*d+l*p*x,this._y=l*p*d+h*u*x,this._z=l*u*x-h*p*d,this._w=l*u*d-h*p*x;break;case"XZY":this._x=h*u*d-l*p*x,this._y=l*p*d-h*u*x,this._z=l*u*x+h*p*d,this._w=l*u*d+h*p*x;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=n+o+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-c)*p,this._y=(s-l)*p,this._z=(a-r)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(u-c)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(s-l)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-r)/p,this._x=(s+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ge(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-n*l,this._z=s*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(e=0,t=0,n=0){F.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Uo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Uo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-s*d,this.z=r+c*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ls.copy(this).projectOnVector(e),this.sub(ls)}reflect(e){return this.sub(ls.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ge(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ls=new F,Uo=new lr;class Oe{constructor(e,t,n,r,s,a,o,c,l){Oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l)}set(e,t,n,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],h=n[2],p=n[5],x=n[8],_=r[0],m=r[3],f=r[6],w=r[1],S=r[4],A=r[7],P=r[2],y=r[5],L=r[8];return s[0]=a*_+o*w+c*P,s[3]=a*m+o*S+c*y,s[6]=a*f+o*A+c*L,s[1]=l*_+u*w+d*P,s[4]=l*m+u*S+d*y,s[7]=l*f+u*A+d*L,s[2]=h*_+p*w+x*P,s[5]=h*m+p*S+x*y,s[8]=h*f+p*A+x*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,h=o*c-u*s,p=l*s-a*c,x=t*d+n*h+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/x;return e[0]=d*_,e[1]=(r*l-u*n)*_,e[2]=(o*n-r*a)*_,e[3]=h*_,e[4]=(u*t-r*c)*_,e[5]=(r*s-o*t)*_,e[6]=p*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(us.makeScale(e,t)),this}rotate(e){return this.premultiply(us.makeRotation(-e)),this}translate(e,t){return this.premultiply(us.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const us=new Oe,Io=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),No=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qu(){const i={enabled:!0,workingColorSpace:Ui,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===et&&(r.r=Mn(r.r),r.g=Mn(r.g),r.b=Mn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===et&&(r.r=Ci(r.r),r.g=Ci(r.g),r.b=Ci(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Un?Yr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ar("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ar("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ui]:{primaries:e,whitePoint:n,transfer:Yr,toXYZ:Io,fromXYZ:No,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:n,transfer:et,toXYZ:Io,fromXYZ:No,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),i}const qe=qu();function Mn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ci(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let li;class Yu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{li===void 0&&(li=sr("canvas")),li.width=e.width,li.height=e.height;const r=li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=sr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Mn(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Mn(t[n]/255)*255):t[n]=Mn(t[n]);return{data:t,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let $u=0;class $a{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(ds(r[a].image)):s.push(ds(r[a]))}else s=ds(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function ds(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Yu.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let ju=0;const hs=new F;class Et extends Oi{constructor(e=Et.DEFAULT_IMAGE,t=Et.DEFAULT_MAPPING,n=gn,r=gn,s=qt,a=jn,o=tn,c=Sn,l=Et.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ju++}),this.uuid=zi(),this.name="",this.source=new $a(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(hs).x}get height(){return this.source.getSize(hs).y}get depth(){return this.source.getSize(hs).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Fe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ic)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ea:e.x=e.x-Math.floor(e.x);break;case gn:e.x=e.x<0?0:1;break;case ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ea:e.y=e.y-Math.floor(e.y);break;case gn:e.y=e.y<0?0:1;break;case ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Et.DEFAULT_IMAGE=null;Et.DEFAULT_MAPPING=Ic;Et.DEFAULT_ANISOTROPY=1;class dt{constructor(e=0,t=0,n=0,r=1){dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],p=c[5],x=c[9],_=c[2],m=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(x-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const S=(l+1)/2,A=(p+1)/2,P=(f+1)/2,y=(u+h)/4,L=(d+_)/4,U=(x+m)/4;return S>A&&S>P?S<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(S),r=y/n,s=L/n):A>P?A<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),n=y/r,s=U/r):P<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),n=L/s,r=U/s),this.set(n,r,s,t),this}let w=Math.sqrt((m-x)*(m-x)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(w)<.001&&(w=1),this.x=(m-x)/w,this.y=(d-_)/w,this.z=(h-u)/w,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ge(this.x,e.x,t.x),this.y=Ge(this.y,e.y,t.y),this.z=Ge(this.z,e.z,t.z),this.w=Ge(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ge(this.x,e,t),this.y=Ge(this.y,e,t),this.z=Ge(this.z,e,t),this.w=Ge(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ge(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ku extends Oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new dt(0,0,e,t),this.scissorTest=!1,this.viewport=new dt(0,0,e,t);const r={width:e,height:t,depth:n.depth},s=new Et(r);this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new $a(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends Ku{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Wc extends Et{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zu extends Et{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=kt,this.minFilter=kt,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ur{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Kt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Kt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Kt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kt):Kt.fromBufferAttribute(s,a),Kt.applyMatrix4(e.matrixWorld),this.expandByPoint(Kt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(e.matrixWorld),this.union(gr)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kt),Kt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vi),_r.subVectors(this.max,Vi),ui.subVectors(e.a,Vi),di.subVectors(e.b,Vi),hi.subVectors(e.c,Vi),Tn.subVectors(di,ui),An.subVectors(hi,di),Bn.subVectors(ui,hi);let t=[0,-Tn.z,Tn.y,0,-An.z,An.y,0,-Bn.z,Bn.y,Tn.z,0,-Tn.x,An.z,0,-An.x,Bn.z,0,-Bn.x,-Tn.y,Tn.x,0,-An.y,An.x,0,-Bn.y,Bn.x,0];return!fs(t,ui,di,hi,_r)||(t=[1,0,0,0,1,0,0,0,1],!fs(t,ui,di,hi,_r))?!1:(vr.crossVectors(Tn,An),t=[vr.x,vr.y,vr.z],fs(t,ui,di,hi,_r))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ln=[new F,new F,new F,new F,new F,new F,new F,new F],Kt=new F,gr=new ur,ui=new F,di=new F,hi=new F,Tn=new F,An=new F,Bn=new F,Vi=new F,_r=new F,vr=new F,kn=new F;function fs(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){kn.fromArray(i,s);const o=r.x*Math.abs(kn.x)+r.y*Math.abs(kn.y)+r.z*Math.abs(kn.z),c=e.dot(kn),l=t.dot(kn),u=n.dot(kn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ju=new ur,Gi=new F,ps=new F;class es{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ju.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Gi.subVectors(e,this.center);const t=Gi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(Gi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ps.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Gi.copy(e.center).add(ps)),this.expandByPoint(Gi.copy(e.center).sub(ps))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const un=new F,ms=new F,Mr=new F,wn=new F,xs=new F,br=new F,gs=new F;class ja{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(un.copy(this.origin).addScaledVector(this.direction,t),un.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ms.copy(e).add(t).multiplyScalar(.5),Mr.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(ms);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Mr),o=wn.dot(this.direction),c=-wn.dot(Mr),l=wn.lengthSq(),u=Math.abs(1-a*a);let d,h,p,x;if(u>0)if(d=a*c-o,h=a*o-c,x=s*u,d>=0)if(h>=-x)if(h<=x){const _=1/u;d*=_,h*=_,p=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h=-s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;else h<=-x?(d=Math.max(0,-(-a*s+o)),h=d>0?-s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l):h<=x?(d=0,h=Math.min(Math.max(-s,-c),s),p=h*(h+2*c)+l):(d=Math.max(0,-(a*s+o)),h=d>0?s:Math.min(Math.max(-s,-c),s),p=-d*d+h*(h+2*c)+l);else h=a>0?-s:s,d=Math.max(0,-(a*h+o)),p=-d*d+h*(h+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(ms).addScaledVector(Mr,h),p}intersectSphere(e,t){un.subVectors(e.center,this.origin);const n=un.dot(this.direction),r=un.dot(un)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(n=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(n=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(s=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,un)!==null}intersectTriangle(e,t,n,r,s){xs.subVectors(t,e),br.subVectors(n,e),gs.crossVectors(xs,br);let a=this.direction.dot(gs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wn.subVectors(this.origin,e);const c=o*this.direction.dot(br.crossVectors(wn,br));if(c<0)return null;const l=o*this.direction.dot(xs.cross(wn));if(l<0||c+l>a)return null;const u=-o*wn.dot(gs);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,n,r,s,a,o,c,l,u,d,h,p,x,_,m){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,c,l,u,d,h,p,x,_,m)}set(e,t,n,r,s,a,o,c,l,u,d,h,p,x,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=x,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/fi.setFromMatrixColumn(e,0).length(),s=1/fi.setFromMatrixColumn(e,1).length(),a=1/fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=a*u,p=a*d,x=o*u,_=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=p+x*l,t[5]=h-_*l,t[9]=-o*c,t[2]=_-h*l,t[6]=x+p*l,t[10]=a*c}else if(e.order==="YXZ"){const h=c*u,p=c*d,x=l*u,_=l*d;t[0]=h+_*o,t[4]=x*o-p,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=p*o-x,t[6]=_+h*o,t[10]=a*c}else if(e.order==="ZXY"){const h=c*u,p=c*d,x=l*u,_=l*d;t[0]=h-_*o,t[4]=-a*d,t[8]=x+p*o,t[1]=p+x*o,t[5]=a*u,t[9]=_-h*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const h=a*u,p=a*d,x=o*u,_=o*d;t[0]=c*u,t[4]=x*l-p,t[8]=h*l+_,t[1]=c*d,t[5]=_*l+h,t[9]=p*l-x,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const h=a*c,p=a*l,x=o*c,_=o*l;t[0]=c*u,t[4]=_-h*d,t[8]=x*d+p,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*d+x,t[10]=h-_*d}else if(e.order==="XZY"){const h=a*c,p=a*l,x=o*c,_=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+_,t[5]=a*u,t[9]=p*d-x,t[2]=x*d-p,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qu,e,ed)}lookAt(e,t,n){const r=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Cn.crossVectors(n,Ot),Cn.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Cn.crossVectors(n,Ot)),Cn.normalize(),Sr.crossVectors(Ot,Cn),r[0]=Cn.x,r[4]=Sr.x,r[8]=Ot.x,r[1]=Cn.y,r[5]=Sr.y,r[9]=Ot.y,r[2]=Cn.z,r[6]=Sr.z,r[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],h=n[9],p=n[13],x=n[2],_=n[6],m=n[10],f=n[14],w=n[3],S=n[7],A=n[11],P=n[15],y=r[0],L=r[4],U=r[8],b=r[12],M=r[1],D=r[5],z=r[9],k=r[13],W=r[2],Y=r[6],q=r[10],se=r[14],X=r[3],re=r[7],ae=r[11],Se=r[15];return s[0]=a*y+o*M+c*W+l*X,s[4]=a*L+o*D+c*Y+l*re,s[8]=a*U+o*z+c*q+l*ae,s[12]=a*b+o*k+c*se+l*Se,s[1]=u*y+d*M+h*W+p*X,s[5]=u*L+d*D+h*Y+p*re,s[9]=u*U+d*z+h*q+p*ae,s[13]=u*b+d*k+h*se+p*Se,s[2]=x*y+_*M+m*W+f*X,s[6]=x*L+_*D+m*Y+f*re,s[10]=x*U+_*z+m*q+f*ae,s[14]=x*b+_*k+m*se+f*Se,s[3]=w*y+S*M+A*W+P*X,s[7]=w*L+S*D+A*Y+P*re,s[11]=w*U+S*z+A*q+P*ae,s[15]=w*b+S*k+A*se+P*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],p=e[14],x=e[3],_=e[7],m=e[11],f=e[15];return x*(+s*c*d-r*l*d-s*o*h+n*l*h+r*o*p-n*c*p)+_*(+t*c*p-t*l*h+s*a*h-r*a*p+r*l*u-s*c*u)+m*(+t*l*d-t*o*p-s*a*d+n*a*p+s*o*u-n*l*u)+f*(-r*o*u-t*c*d+t*o*h+r*a*d-n*a*h+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],p=e[11],x=e[12],_=e[13],m=e[14],f=e[15],w=d*m*l-_*h*l+_*c*p-o*m*p-d*c*f+o*h*f,S=x*h*l-u*m*l-x*c*p+a*m*p+u*c*f-a*h*f,A=u*_*l-x*d*l+x*o*p-a*_*p-u*o*f+a*d*f,P=x*d*c-u*_*c-x*o*h+a*_*h+u*o*m-a*d*m,y=t*w+n*S+r*A+s*P;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/y;return e[0]=w*L,e[1]=(_*h*s-d*m*s-_*r*p+n*m*p+d*r*f-n*h*f)*L,e[2]=(o*m*s-_*c*s+_*r*l-n*m*l-o*r*f+n*c*f)*L,e[3]=(d*c*s-o*h*s-d*r*l+n*h*l+o*r*p-n*c*p)*L,e[4]=S*L,e[5]=(u*m*s-x*h*s+x*r*p-t*m*p-u*r*f+t*h*f)*L,e[6]=(x*c*s-a*m*s-x*r*l+t*m*l+a*r*f-t*c*f)*L,e[7]=(a*h*s-u*c*s+u*r*l-t*h*l-a*r*p+t*c*p)*L,e[8]=A*L,e[9]=(x*d*s-u*_*s-x*n*p+t*_*p+u*n*f-t*d*f)*L,e[10]=(a*_*s-x*o*s+x*n*l-t*_*l-a*n*f+t*o*f)*L,e[11]=(u*o*s-a*d*s-u*n*l+t*d*l+a*n*p-t*o*p)*L,e[12]=P*L,e[13]=(u*_*r-x*d*r+x*n*h-t*_*h-u*n*m+t*d*m)*L,e[14]=(x*o*r-a*_*r-x*n*c+t*_*c+a*n*m-t*o*m)*L,e[15]=(a*d*r-u*o*r+u*n*c-t*d*c-a*n*h+t*o*h)*L,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,d=o+o,h=s*l,p=s*u,x=s*d,_=a*u,m=a*d,f=o*d,w=c*l,S=c*u,A=c*d,P=n.x,y=n.y,L=n.z;return r[0]=(1-(_+f))*P,r[1]=(p+A)*P,r[2]=(x-S)*P,r[3]=0,r[4]=(p-A)*y,r[5]=(1-(h+f))*y,r[6]=(m+w)*y,r[7]=0,r[8]=(x+S)*L,r[9]=(m-w)*L,r[10]=(1-(h+_))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let s=fi.set(r[0],r[1],r[2]).length();const a=fi.set(r[4],r[5],r[6]).length(),o=fi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Zt.copy(this);const l=1/s,u=1/a,d=1/o;return Zt.elements[0]*=l,Zt.elements[1]*=l,Zt.elements[2]*=l,Zt.elements[4]*=u,Zt.elements[5]*=u,Zt.elements[6]*=u,Zt.elements[8]*=d,Zt.elements[9]*=d,Zt.elements[10]*=d,t.setFromRotationMatrix(Zt),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,r,s,a,o=an,c=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(n-r),h=(t+e)/(t-e),p=(n+r)/(n-r);let x,_;if(c)x=s/(a-s),_=a*s/(a-s);else if(o===an)x=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===$r)x=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=an,c=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),h=-(t+e)/(t-e),p=-(n+r)/(n-r);let x,_;if(c)x=1/(a-s),_=a/(a-s);else if(o===an)x=-2/(a-s),_=-(a+s)/(a-s);else if(o===$r)x=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=x,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const fi=new F,Zt=new ut,Qu=new F(0,0,0),ed=new F(1,1,1),Cn=new F,Sr=new F,Ot=new F,Fo=new ut,Oo=new lr;class yn{constructor(e=0,t=0,n=0,r=yn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ge(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ge(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ge(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oo.setFromEuler(this),this.setFromQuaternion(Oo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yn.DEFAULT_ORDER="XYZ";class Ka{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let td=0;const zo=new F,pi=new lr,dn=new ut,yr=new F,Hi=new F,nd=new F,id=new lr,Bo=new F(1,0,0),ko=new F(0,1,0),Vo=new F(0,0,1),Go={type:"added"},rd={type:"removed"},mi={type:"childadded",child:null},_s={type:"childremoved",child:null};class Ut extends Oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new F,t=new yn,n=new lr,r=new F(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ut},normalMatrix:{value:new Oe}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ka,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.multiply(pi),this}rotateOnWorldAxis(e,t){return pi.setFromAxisAngle(e,t),this.quaternion.premultiply(pi),this}rotateX(e){return this.rotateOnAxis(Bo,e)}rotateY(e){return this.rotateOnAxis(ko,e)}rotateZ(e){return this.rotateOnAxis(Vo,e)}translateOnAxis(e,t){return zo.copy(e).applyQuaternion(this.quaternion),this.position.add(zo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Bo,e)}translateY(e){return this.translateOnAxis(ko,e)}translateZ(e){return this.translateOnAxis(Vo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yr.copy(e):yr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Hi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Hi,yr,this.up):dn.lookAt(yr,Hi,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),pi.setFromRotationMatrix(dn),this.quaternion.premultiply(pi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Go),mi.child=e,this.dispatchEvent(mi),mi.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(rd),_s.child=e,this.dispatchEvent(_s),_s.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Go),mi.child=e,this.dispatchEvent(mi),mi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,e,nd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hi,id,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),p=a(e.animations),x=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Ut.DEFAULT_UP=new F(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Jt=new F,hn=new F,vs=new F,fn=new F,xi=new F,gi=new F,Ho=new F,Ms=new F,bs=new F,Ss=new F,ys=new dt,Es=new dt,Ts=new dt;class Qt{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Jt.subVectors(e,t),r.cross(Jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Jt.subVectors(r,t),hn.subVectors(n,t),vs.subVectors(e,t);const a=Jt.dot(Jt),o=Jt.dot(hn),c=Jt.dot(vs),l=hn.dot(hn),u=hn.dot(vs),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(l*c-o*u)*h,x=(a*u-o*c)*h;return s.set(1-p-x,x,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,fn)===null?!1:fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(e,t,n,r,s,a,o,c){return this.getBarycoord(e,t,n,r,fn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,fn.x),c.addScaledVector(a,fn.y),c.addScaledVector(o,fn.z),c)}static getInterpolatedAttribute(e,t,n,r,s,a){return ys.setScalar(0),Es.setScalar(0),Ts.setScalar(0),ys.fromBufferAttribute(e,t),Es.fromBufferAttribute(e,n),Ts.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ys,s.x),a.addScaledVector(Es,s.y),a.addScaledVector(Ts,s.z),a}static isFrontFacing(e,t,n,r){return Jt.subVectors(n,t),hn.subVectors(e,t),Jt.cross(hn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Jt.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Qt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Qt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Qt.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Qt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Qt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;xi.subVectors(r,n),gi.subVectors(s,n),Ms.subVectors(e,n);const c=xi.dot(Ms),l=gi.dot(Ms);if(c<=0&&l<=0)return t.copy(n);bs.subVectors(e,r);const u=xi.dot(bs),d=gi.dot(bs);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(xi,a);Ss.subVectors(e,s);const p=xi.dot(Ss),x=gi.dot(Ss);if(x>=0&&p<=x)return t.copy(s);const _=p*l-c*x;if(_<=0&&l>=0&&x<=0)return o=l/(l-x),t.copy(n).addScaledVector(gi,o);const m=u*x-p*d;if(m<=0&&d-u>=0&&p-x>=0)return Ho.subVectors(s,r),o=(d-u)/(d-u+(p-x)),t.copy(r).addScaledVector(Ho,o);const f=1/(m+_+h);return a=_*f,o=h*f,t.copy(n).addScaledVector(xi,a).addScaledVector(gi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Xc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},Er={h:0,s:0,l:0};function As(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=qe.workingColorSpace){if(e=Ya(e,1),t=Ge(t,0,1),n=Ge(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=As(a,s,e+1/3),this.g=As(a,s,e),this.b=As(a,s,e-1/3)}return qe.colorSpaceToWorking(this,r),this}setStyle(e,t=Bt){function n(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){const n=Xc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Mn(e.r),this.g=Mn(e.g),this.b=Mn(e.b),this}copyLinearToSRGB(e){return this.r=Ci(e.r),this.g=Ci(e.g),this.b=Ci(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return qe.workingToColorSpace(St.copy(this),e),Math.round(Ge(St.r*255,0,255))*65536+Math.round(Ge(St.g*255,0,255))*256+Math.round(Ge(St.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(St.copy(this),t);const n=St.r,r=St.g,s=St.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-n)/d+2;break;case s:c=(n-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(St.copy(this),t),e.r=St.r,e.g=St.g,e.b=St.b,e}getStyle(e=Bt){qe.workingToColorSpace(St.copy(this),e);const t=St.r,n=St.g,r=St.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Rn),this.setHSL(Rn.h+e,Rn.s+t,Rn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Rn),e.getHSL(Er);const n=ji(Rn.h,Er.h,t),r=ji(Rn.s,Er.s,t),s=ji(Rn.l,Er.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const St=new Ke;Ke.NAMES=Xc;let sd=0;class dr extends Oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=zi(),this.name="",this.type="Material",this.blending=wi,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hs,this.blendDst=Ws,this.blendEquation=qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Fe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Fe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==wi&&(n.blending=this.blending),this.side!==bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Hs&&(n.blendSrc=this.blendSrc),this.blendDst!==Ws&&(n.blendDst=this.blendDst),this.blendEquation!==qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ln extends dr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=Uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ft=new F,Tr=new Re;let ad=0;class Yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ad++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Co,this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Tr.fromBufferAttribute(this,t),Tr.applyMatrix3(e),this.setXY(t,Tr.x,Tr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix3(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyMatrix4(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.applyNormalMatrix(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ft.fromBufferAttribute(this,t),ft.transformDirection(e),this.setXYZ(t,ft.x,ft.y,ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ei(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=At(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ei(t,this.array)),t}setX(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ei(t,this.array)),t}setY(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ei(t,this.array)),t}setZ(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ei(t,this.array)),t}setW(e,t){return this.normalized&&(t=At(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),r=At(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=At(t,this.array),n=At(n,this.array),r=At(r,this.array),s=At(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Co&&(e.usage=this.usage),e}}class qc extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Yc extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let od=0;const Ht=new ut,ws=new Ut,_i=new F,zt=new ur,Wi=new ur,_t=new F;class It extends Oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Hc(e)?Yc:qc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Oe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,n){return Ht.makeTranslation(e,t,n),this.applyMatrix4(Ht),this}scale(e,t,n){return Ht.makeScale(e,t,n),this.applyMatrix4(Ht),this}lookAt(e){return ws.lookAt(e),ws.updateMatrix(),this.applyMatrix4(ws.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_i).negate(),this.translate(_i.x,_i.y,_i.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new mt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];zt.setFromBufferAttribute(s),this.morphTargetsRelative?(_t.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(_t),_t.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(_t)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new es);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Wi.setFromBufferAttribute(o),this.morphTargetsRelative?(_t.addVectors(zt.min,Wi.min),zt.expandByPoint(_t),_t.addVectors(zt.max,Wi.max),zt.expandByPoint(_t)):(zt.expandByPoint(Wi.min),zt.expandByPoint(Wi.max))}zt.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)_t.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(_t));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)_t.fromBufferAttribute(o,l),c&&(_i.fromBufferAttribute(e,l),_t.add(_i)),r=Math.max(r,n.distanceToSquared(_t))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Yt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let U=0;U<n.count;U++)o[U]=new F,c[U]=new F;const l=new F,u=new F,d=new F,h=new Re,p=new Re,x=new Re,_=new F,m=new F;function f(U,b,M){l.fromBufferAttribute(n,U),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,M),h.fromBufferAttribute(s,U),p.fromBufferAttribute(s,b),x.fromBufferAttribute(s,M),u.sub(l),d.sub(l),p.sub(h),x.sub(h);const D=1/(p.x*x.y-x.x*p.y);isFinite(D)&&(_.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(D),m.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(D),o[U].add(_),o[b].add(_),o[M].add(_),c[U].add(m),c[b].add(m),c[M].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let U=0,b=w.length;U<b;++U){const M=w[U],D=M.start,z=M.count;for(let k=D,W=D+z;k<W;k+=3)f(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const S=new F,A=new F,P=new F,y=new F;function L(U){P.fromBufferAttribute(r,U),y.copy(P);const b=o[U];S.copy(b),S.sub(P.multiplyScalar(P.dot(b))).normalize(),A.crossVectors(y,b);const D=A.dot(c[U])<0?-1:1;a.setXYZW(U,S.x,S.y,S.z,D)}for(let U=0,b=w.length;U<b;++U){const M=w[U],D=M.start,z=M.count;for(let k=D,W=D+z;k<W;k+=3)L(e.getX(k+0)),L(e.getX(k+1)),L(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new F,s=new F,a=new F,o=new F,c=new F,l=new F,u=new F,d=new F;if(e)for(let h=0,p=e.count;h<p;h+=3){const x=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,x),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)_t.fromBufferAttribute(e,t),_t.normalize(),e.setXYZ(t,_t.x,_t.y,_t.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let p=0,x=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*u;for(let f=0;f<u;f++)h[x++]=l[p++]}return new Yt(h,u,d)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new It,n=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],p=e(h,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const p=l[d];u.push(p.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new ut,Vn=new ja,Ar=new es,Xo=new F,wr=new F,Cr=new F,Rr=new F,Cs=new F,Pr=new F,qo=new F,Lr=new F;class Mt extends Ut{constructor(e=new It,t=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Pr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],d=s[c];u!==0&&(Cs.fromBufferAttribute(d,e),a?Pr.addScaledVector(Cs,u):Pr.addScaledVector(Cs.sub(t),u))}t.add(Pr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(s),Vn.copy(e.ray).recast(e.near),!(Ar.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(Ar,Xo)===null||Vn.origin.distanceToSquared(Xo)>(e.far-e.near)**2))&&(Wo.copy(s).invert(),Vn.copy(e.ray).applyMatrix4(Wo),!(n.boundingBox!==null&&Vn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,_=h.length;x<_;x++){const m=h[x],f=a[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let A=w,P=S;A<P;A+=3){const y=o.getX(A),L=o.getX(A+1),U=o.getX(A+2);r=Dr(this,f,e,n,l,u,d,y,L,U),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=x,f=_;m<f;m+=3){const w=o.getX(m),S=o.getX(m+1),A=o.getX(m+2);r=Dr(this,a,e,n,l,u,d,w,S,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let x=0,_=h.length;x<_;x++){const m=h[x],f=a[m.materialIndex],w=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let A=w,P=S;A<P;A+=3){const y=A,L=A+1,U=A+2;r=Dr(this,f,e,n,l,u,d,y,L,U),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const x=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=x,f=_;m<f;m+=3){const w=m,S=m+1,A=m+2;r=Dr(this,a,e,n,l,u,d,w,S,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function cd(i,e,t,n,r,s,a,o){let c;if(e.side===Ct?c=n.intersectTriangle(a,s,r,!0,o):c=n.intersectTriangle(r,s,a,e.side===bn,o),c===null)return null;Lr.copy(o),Lr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Lr);return l<t.near||l>t.far?null:{distance:l,point:Lr.clone(),object:i}}function Dr(i,e,t,n,r,s,a,o,c,l){i.getVertexPosition(o,wr),i.getVertexPosition(c,Cr),i.getVertexPosition(l,Rr);const u=cd(i,e,t,n,wr,Cr,Rr,qo);if(u){const d=new F;Qt.getBarycoord(qo,wr,Cr,Rr,d),r&&(u.uv=Qt.getInterpolatedAttribute(r,o,c,l,d,new Re)),s&&(u.uv1=Qt.getInterpolatedAttribute(s,o,c,l,d,new Re)),a&&(u.normal=Qt.getInterpolatedAttribute(a,o,c,l,d,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new F,materialIndex:0};Qt.getNormal(wr,Cr,Rr,h.normal),u.face=h,u.barycoord=d}return u}class hr extends It{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,p=0;x("z","y","x",-1,-1,n,t,e,a,s,0),x("z","y","x",1,-1,n,t,-e,a,s,1),x("x","z","y",1,1,e,n,t,r,a,2),x("x","z","y",1,-1,e,n,-t,r,a,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(u,3)),this.setAttribute("uv",new mt(d,2));function x(_,m,f,w,S,A,P,y,L,U,b){const M=A/L,D=P/U,z=A/2,k=P/2,W=y/2,Y=L+1,q=U+1;let se=0,X=0;const re=new F;for(let ae=0;ae<q;ae++){const Se=ae*D-k;for(let Q=0;Q<Y;Q++){const Ye=Q*M-z;re[_]=Ye*w,re[m]=Se*S,re[f]=W,l.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[f]=y>0?1:-1,u.push(re.x,re.y,re.z),d.push(Q/L),d.push(1-ae/U),se+=1}}for(let ae=0;ae<U;ae++)for(let Se=0;Se<L;Se++){const Q=h+Se+Y*ae,Ye=h+Se+Y*(ae+1),je=h+(Se+1)+Y*(ae+1),Ze=h+(Se+1)+Y*ae;c.push(Q,Ye,Ze),c.push(Ye,je,Ze),X+=6}o.addGroup(p,X,b),p+=X,h+=se}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ii(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function wt(i){const e={};for(let t=0;t<i.length;t++){const n=Ii(i[t]);for(const r in n)e[r]=n[r]}return e}function ld(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function $c(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const ud={clone:Ii,merge:wt};var dd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $t extends dr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dd,this.fragmentShader=hd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ii(e.uniforms),this.uniformsGroups=ld(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jc extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=an,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new F,Yo=new Re,$o=new Re;class Xt extends jc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($i*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return or*2*Math.atan(Math.tan($i*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z)}getViewSize(e,t){return this.getViewBounds(e,Yo,$o),t.subVectors($o,Yo)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($i*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*n/l,r*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const vi=-90,Mi=1;class fd extends Ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Xt(vi,Mi,e,t);r.layers=this.layers,this.add(r);const s=new Xt(vi,Mi,e,t);s.layers=this.layers,this.add(s);const a=new Xt(vi,Mi,e,t);a.layers=this.layers,this.add(a);const o=new Xt(vi,Mi,e,t);o.layers=this.layers,this.add(o);const c=new Xt(vi,Mi,e,t);c.layers=this.layers,this.add(c);const l=new Xt(vi,Mi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===an)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===$r)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,s),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,o),e.setRenderTarget(n,3,r),e.render(t,c),e.setRenderTarget(n,4,r),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Kc extends Et{constructor(e=[],t=Li,n,r,s,a,o,c,l,u){super(e,t,n,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class pd extends ei{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Kc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new hr(5,5,5),s=new $t({name:"CubemapFromEquirect",uniforms:Ii(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ct,blending:vn});s.uniforms.tEquirect.value=t;const a=new Mt(r,s),o=t.minFilter;return t.minFilter===jn&&(t.minFilter=qt),new fd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}class Kn extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const md={type:"move"};class Rs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),f=this._getHandJoint(l,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,x=.005;l.inputState.pinching&&h>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(md)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Kn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class xd extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class gd extends Et{constructor(e=null,t=1,n=1,r,s,a,o,c,l=kt,u=kt,d,h){super(null,a,o,c,l,u,r,s,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ps=new F,_d=new F,vd=new Oe;class Xn{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Ps.subVectors(n,t).cross(_d.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Ps),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vd.getNormalMatrix(e),r=this.coplanarPoint(Ps).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gn=new es,Md=new Re(.5,.5),Ur=new F;class Zc{constructor(e=new Xn,t=new Xn,n=new Xn,r=new Xn,s=new Xn,a=new Xn){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=an,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],d=s[5],h=s[6],p=s[7],x=s[8],_=s[9],m=s[10],f=s[11],w=s[12],S=s[13],A=s[14],P=s[15];if(r[0].setComponents(l-a,p-u,f-x,P-w).normalize(),r[1].setComponents(l+a,p+u,f+x,P+w).normalize(),r[2].setComponents(l+o,p+d,f+_,P+S).normalize(),r[3].setComponents(l-o,p-d,f-_,P-S).normalize(),n)r[4].setComponents(c,h,m,A).normalize(),r[5].setComponents(l-c,p-h,f-m,P-A).normalize();else if(r[4].setComponents(l-c,p-h,f-m,P-A).normalize(),t===an)r[5].setComponents(l+c,p+h,f+m,P+A).normalize();else if(t===$r)r[5].setComponents(c,h,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gn)}intersectsSprite(e){Gn.center.set(0,0,0);const t=Md.distanceTo(e.center);return Gn.radius=.7071067811865476+t,Gn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Ur.x=r.normal.x>0?e.max.x:e.min.x,Ur.y=r.normal.y>0?e.max.y:e.min.y,Ur.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Jc extends dr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jo=new ut,Pa=new ja,Ir=new es,Nr=new F;class bd extends Ut{constructor(e=new It,t=new Jc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ir.copy(n.boundingSphere),Ir.applyMatrix4(r),Ir.radius+=s,e.ray.intersectsSphere(Ir)===!1)return;jo.copy(r).invert(),Pa.copy(e.ray).applyMatrix4(jo);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const h=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let x=h,_=p;x<_;x++){const m=l.getX(x);Nr.fromBufferAttribute(d,m),Ko(Nr,m,c,r,e,t,this)}}else{const h=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let x=h,_=p;x<_;x++)Nr.fromBufferAttribute(d,x),Ko(Nr,x,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ko(i,e,t,n,r,s,a){const o=Pa.distanceSqToPoint(i);if(o<t){const c=new F;Pa.closestPointToPoint(i,c),c.applyMatrix4(n);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Qc extends Et{constructor(e,t,n=Qn,r,s,a,o=kt,c=kt,l,u=ir,d=1){if(u!==ir&&u!==rr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,s,a,o,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $a(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class el extends Et{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Za extends It{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],h=[],p=[];let x=0;const _=[],m=n/2;let f=0;w(),a===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new mt(d,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(p,2));function w(){const A=new F,P=new F;let y=0;const L=(t-e)/n;for(let U=0;U<=s;U++){const b=[],M=U/s,D=M*(t-e)+e;for(let z=0;z<=r;z++){const k=z/r,W=k*c+o,Y=Math.sin(W),q=Math.cos(W);P.x=D*Y,P.y=-M*n+m,P.z=D*q,d.push(P.x,P.y,P.z),A.set(Y,L,q).normalize(),h.push(A.x,A.y,A.z),p.push(k,1-M),b.push(x++)}_.push(b)}for(let U=0;U<r;U++)for(let b=0;b<s;b++){const M=_[b][U],D=_[b+1][U],z=_[b+1][U+1],k=_[b][U+1];(e>0||b!==0)&&(u.push(M,D,k),y+=3),(t>0||b!==s-1)&&(u.push(D,z,k),y+=3)}l.addGroup(f,y,0),f+=y}function S(A){const P=x,y=new Re,L=new F;let U=0;const b=A===!0?e:t,M=A===!0?1:-1;for(let z=1;z<=r;z++)d.push(0,m*M,0),h.push(0,M,0),p.push(.5,.5),x++;const D=x;for(let z=0;z<=r;z++){const W=z/r*c+o,Y=Math.cos(W),q=Math.sin(W);L.x=b*q,L.y=m*M,L.z=b*Y,d.push(L.x,L.y,L.z),h.push(0,M,0),y.x=Y*.5+.5,y.y=q*.5*M+.5,p.push(y.x,y.y),x++}for(let z=0;z<r;z++){const k=P+z,W=D+z;A===!0?u.push(W,W+1,k):u.push(W+1,W,k),U+=3}l.addGroup(f,U,A===!0?1:2),f+=U}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Za(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class En{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(r),t.push(s),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let r=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=n[r]-a,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===a)return r/(s-1);const u=n[r],h=n[r+1]-u,p=(a-u)/h;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),c=t||(a.isVector2?new Re:new F);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new F,r=[],s=[],a=[],o=new F,c=new ut;for(let p=0;p<=e;p++){const x=p/e;r[p]=this.getTangentAt(x,new F)}s[0]=new F,a[0]=new F;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),h<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const x=Math.acos(Ge(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(c.makeRotationAxis(o,x))}a[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Ge(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let x=1;x<=e;x++)s[x].applyMatrix4(c.makeRotationAxis(r[x],p*x)),a[x].crossVectors(r[x],s[x])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class tl extends En{constructor(e=0,t=0,n=1,r=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new Re){const n=t,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,p=l-this.aY;c=h*u-p*d+this.aX,l=h*d+p*u+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Sd extends tl{constructor(e,t,n,r,s,a){super(e,t,n,n,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Ja(){let i=0,e=0,t=0,n=0;function r(s,a,o,c){i=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){r(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,u,d){let h=(a-s)/l-(o-s)/(l+u)+(o-a)/u,p=(o-a)/u-(c-a)/(u+d)+(c-o)/d;h*=u,p*=u,r(a,o,h,p)},calc:function(s){const a=s*s,o=a*s;return i+e*s+t*a+n*o}}}const Fr=new F,Ls=new Ja,Ds=new Ja,Us=new Ja;class nl extends En{constructor(e=[],t=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new F){const n=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,u;this.closed||o>0?l=r[(o-1)%s]:(Fr.subVectors(r[0],r[1]).add(r[0]),l=Fr);const d=r[o%s],h=r[(o+1)%s];if(this.closed||o+2<s?u=r[(o+2)%s]:(Fr.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Fr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let x=Math.pow(l.distanceToSquared(d),p),_=Math.pow(d.distanceToSquared(h),p),m=Math.pow(h.distanceToSquared(u),p);_<1e-4&&(_=1),x<1e-4&&(x=_),m<1e-4&&(m=_),Ls.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,x,_,m),Ds.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,x,_,m),Us.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,x,_,m)}else this.curveType==="catmullrom"&&(Ls.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),Ds.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),Us.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return n.set(Ls.calc(c),Ds.calc(c),Us.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new F().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Zo(i,e,t,n,r){const s=(n-e)*.5,a=(r-t)*.5,o=i*i,c=i*o;return(2*t-2*n+s+a)*c+(-3*t+3*n-2*s-a)*o+s*i+t}function yd(i,e){const t=1-i;return t*t*e}function Ed(i,e){return 2*(1-i)*i*e}function Td(i,e){return i*i*e}function Ki(i,e,t,n){return yd(i,e)+Ed(i,t)+Td(i,n)}function Ad(i,e){const t=1-i;return t*t*t*e}function wd(i,e){const t=1-i;return 3*t*t*i*e}function Cd(i,e){return 3*(1-i)*i*i*e}function Rd(i,e){return i*i*i*e}function Zi(i,e,t,n,r){return Ad(i,e)+wd(i,t)+Cd(i,n)+Rd(i,r)}class Pd extends En{constructor(e=new Re,t=new Re,n=new Re,r=new Re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new Re){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zi(e,r.x,s.x,a.x,o.x),Zi(e,r.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Ld extends En{constructor(e=new F,t=new F,n=new F,r=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new F){const n=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(Zi(e,r.x,s.x,a.x,o.x),Zi(e,r.y,s.y,a.y,o.y),Zi(e,r.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Dd extends En{constructor(e=new Re,t=new Re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Re){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ud extends En{constructor(e=new F,t=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new F){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new F){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Id extends En{constructor(e=new Re,t=new Re,n=new Re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new Re){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ki(e,r.x,s.x,a.x),Ki(e,r.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class il extends En{constructor(e=new F,t=new F,n=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new F){const n=t,r=this.v0,s=this.v1,a=this.v2;return n.set(Ki(e,r.x,s.x,a.x),Ki(e,r.y,s.y,a.y),Ki(e,r.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nd extends En{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Re){const n=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,c=r[a===0?a:a-1],l=r[a],u=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(Zo(o,c.x,l.x,u.x,d.x),Zo(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const r=e.points[t];this.points.push(new Re().fromArray(r))}return this}}var Fd=Object.freeze({__proto__:null,ArcCurve:Sd,CatmullRomCurve3:nl,CubicBezierCurve:Pd,CubicBezierCurve3:Ld,EllipseCurve:tl,LineCurve:Dd,LineCurve3:Ud,QuadraticBezierCurve:Id,QuadraticBezierCurve3:il,SplineCurve:Nd});class ts extends It{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,p=[],x=[],_=[],m=[];for(let f=0;f<u;f++){const w=f*h-a;for(let S=0;S<l;S++){const A=S*d-s;x.push(A,-w,0),_.push(0,0,1),m.push(S/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let w=0;w<o;w++){const S=w+l*f,A=w+l*(f+1),P=w+1+l*(f+1),y=w+1+l*f;p.push(S,A,y),p.push(A,P,y)}this.setIndex(p),this.setAttribute("position",new mt(x,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ts(e.width,e.height,e.widthSegments,e.heightSegments)}}class Qa extends It{constructor(e=.5,t=1,n=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/r,p=new F,x=new Re;for(let _=0;_<=r;_++){for(let m=0;m<=n;m++){const f=s+m/n*a;p.x=d*Math.cos(f),p.y=d*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/t+1)/2,x.y=(p.y/t+1)/2,u.push(x.x,x.y)}d+=h}for(let _=0;_<r;_++){const m=_*(n+1);for(let f=0;f<n;f++){const w=f+m,S=w,A=w+n+1,P=w+n+2,y=w+1;o.push(S,A,y),o.push(A,P,y)}}this.setIndex(o),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Dn extends It{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new F,h=new F,p=[],x=[],_=[],m=[];for(let f=0;f<=n;f++){const w=[],S=f/n;let A=0;f===0&&a===0?A=.5/t:f===n&&c===Math.PI&&(A=-.5/t);for(let P=0;P<=t;P++){const y=P/t;d.x=-e*Math.cos(r+y*s)*Math.sin(a+S*o),d.y=e*Math.cos(a+S*o),d.z=e*Math.sin(r+y*s)*Math.sin(a+S*o),x.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(y+A,1-S),w.push(l++)}u.push(w)}for(let f=0;f<n;f++)for(let w=0;w<t;w++){const S=u[f][w+1],A=u[f][w],P=u[f+1][w],y=u[f+1][w+1];(f!==0||a>0)&&p.push(S,A,y),(f!==n-1||c<Math.PI)&&p.push(A,P,y)}this.setIndex(p),this.setAttribute("position",new mt(x,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class eo extends It{constructor(e=new il(new F(-1,-1,0),new F(-1,1,0),new F(1,1,0)),t=64,n=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new F,c=new F,l=new Re;let u=new F;const d=[],h=[],p=[],x=[];_(),this.setIndex(x),this.setAttribute("position",new mt(d,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(p,2));function _(){for(let S=0;S<t;S++)m(S);m(s===!1?t:0),w(),f()}function m(S){u=e.getPointAt(S/t,u);const A=a.normals[S],P=a.binormals[S];for(let y=0;y<=r;y++){const L=y/r*Math.PI*2,U=Math.sin(L),b=-Math.cos(L);c.x=b*A.x+U*P.x,c.y=b*A.y+U*P.y,c.z=b*A.z+U*P.z,c.normalize(),h.push(c.x,c.y,c.z),o.x=u.x+n*c.x,o.y=u.y+n*c.y,o.z=u.z+n*c.z,d.push(o.x,o.y,o.z)}}function f(){for(let S=1;S<=t;S++)for(let A=1;A<=r;A++){const P=(r+1)*(S-1)+(A-1),y=(r+1)*S+(A-1),L=(r+1)*S+A,U=(r+1)*(S-1)+A;x.push(P,y,U),x.push(y,L,U)}}function w(){for(let S=0;S<=t;S++)for(let A=0;A<=r;A++)l.x=S/t,l.y=A/r,p.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new eo(new Fd[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Od extends dr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class zd extends dr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Is={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class Bd{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const p=l[d],x=l[d+1];if(p.global&&(p.lastIndex=0),p.test(u))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const kd=new Bd;class to{constructor(e){this.manager=e!==void 0?e:kd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}to.DEFAULT_MATERIAL_NAME="__DEFAULT";const bi=new WeakMap;class Vd extends to{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Is.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let d=bi.get(a);d===void 0&&(d=[],bi.set(a,d)),d.push({onLoad:t,onError:r})}return a}const o=sr("img");function c(){u(),t&&t(this);const d=bi.get(this)||[];for(let h=0;h<d.length;h++){const p=d[h];p.onLoad&&p.onLoad(this)}bi.delete(this),s.manager.itemEnd(e)}function l(d){u(),r&&r(d),Is.remove(`image:${e}`);const h=bi.get(this)||[];for(let p=0;p<h.length;p++){const x=h[p];x.onError&&x.onError(d)}bi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Is.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class Gd extends to{constructor(e){super(e)}load(e,t,n,r){const s=new Et,a=new Vd(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Hd extends jc{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Wd extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Xd{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const Jo=new ut;class qd{constructor(e,t,n=0,r=1/0){this.ray=new ja(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ka,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):lt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Jo.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jo),this}intersectObject(e,t=!0,n=[]){return La(e,this,n,t),n.sort(Qo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)La(e[r],this,n,t);return n.sort(Qo),n}}function Qo(i,e){return i.distance-e.distance}function La(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)La(s[a],e,t,!0)}}class Ns{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ge(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ge(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}function ec(i,e,t,n){const r=Yd(n);switch(t){case Bc:return i*e;case Vc:return i*e/r.components*r.byteLength;case Ha:return i*e/r.components*r.byteLength;case Wa:return i*e*2/r.components*r.byteLength;case Xa:return i*e*2/r.components*r.byteLength;case kc:return i*e*3/r.components*r.byteLength;case tn:return i*e*4/r.components*r.byteLength;case qa:return i*e*4/r.components*r.byteLength;case kr:case Vr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Hr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ia:case sa:return Math.max(i,16)*Math.max(e,8)/4;case na:case ra:return Math.max(i,8)*Math.max(e,8)/2;case aa:case oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case la:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ua:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case da:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ha:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case fa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case pa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ma:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case xa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ga:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case _a:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case va:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ma:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ba:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Sa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ya:case Ea:case Ta:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Aa:case wa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ca:case Ra:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Yd(i){switch(i){case Sn:case Nc:return{byteLength:1,components:1};case tr:case Fc:case Fi:return{byteLength:2,components:1};case Va:case Ga:return{byteLength:2,components:4};case Qn:case ka:case _n:return{byteLength:4,components:1};case Oc:case zc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ba}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ba);function rl(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function $d(i){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=i.createBuffer();i.bindBuffer(c,h),i.bufferData(c,l,u),o.onUploadCallback();let p;if(l instanceof Float32Array)p=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((p,x)=>p.start-x.start);let h=0;for(let p=1;p<d.length;p++){const x=d[h],_=d[p];_.start<=x.start+x.count+1?x.count=Math.max(x.count,_.start+_.count-x.start):(++h,d[h]=_)}d.length=h+1;for(let p=0,x=d.length;p<x;p++){const _=d[p];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var jd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kd=`#ifdef USE_ALPHAHASH
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
#endif`,Zd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,th=`#ifdef USE_AOMAP
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
#endif`,nh=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ih=`#ifdef USE_BATCHING
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
#endif`,rh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ah=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,oh=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ch=`#ifdef USE_IRIDESCENCE
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
#endif`,lh=`#ifdef USE_BUMPMAP
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
#endif`,uh=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,dh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hh=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ph=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,xh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gh=`#if defined( USE_COLOR_ALPHA )
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
#endif`,_h=`#define PI 3.141592653589793
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
} // validated`,vh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Mh=`vec3 transformedNormal = objectNormal;
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
#endif`,bh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Eh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Th="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ah=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wh=`#ifdef USE_ENVMAP
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
#endif`,Ch=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rh=`#ifdef USE_ENVMAP
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
#endif`,Ph=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lh=`#ifdef USE_ENVMAP
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
#endif`,Dh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ih=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Nh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fh=`#ifdef USE_GRADIENTMAP
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
}`,Oh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kh=`uniform bool receiveShadow;
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
#endif`,Vh=`#ifdef USE_ENVMAP
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
#endif`,Gh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wh=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qh=`PhysicalMaterial material;
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
#endif`,Yh=`uniform sampler2D dfgLUT;
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
}`,$h=`
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
#endif`,jh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Kh=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jh=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qh=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ef=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sf=`#if defined( USE_POINTS_UV )
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
#endif`,af=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,of=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,df=`#ifdef USE_MORPHTARGETS
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
#endif`,hf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ff=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,pf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,mf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_f=`#ifdef USE_NORMALMAP
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
#endif`,vf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ef=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Af=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Df=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Uf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,If=`float getShadowMask() {
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
}`,Nf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ff=`#ifdef USE_SKINNING
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
#endif`,Of=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zf=`#ifdef USE_SKINNING
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
#endif`,Bf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hf=`#ifdef USE_TRANSMISSION
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
#endif`,Wf=`#ifdef USE_TRANSMISSION
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
#endif`,Xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$f=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const jf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kf=`uniform sampler2D t2D;
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
}`,Zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Jf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ep=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tp=`#include <common>
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
}`,np=`#if DEPTH_PACKING == 3200
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
}`,ip=`#define DISTANCE
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
}`,rp=`#define DISTANCE
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
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ap=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,op=`uniform float scale;
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
}`,cp=`uniform vec3 diffuse;
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
}`,lp=`#include <common>
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
}`,up=`uniform vec3 diffuse;
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
}`,dp=`#define LAMBERT
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
}`,hp=`#define LAMBERT
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
}`,fp=`#define MATCAP
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
}`,pp=`#define MATCAP
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
}`,mp=`#define NORMAL
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
}`,xp=`#define NORMAL
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
}`,gp=`#define PHONG
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
}`,_p=`#define PHONG
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
}`,vp=`#define STANDARD
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
}`,Mp=`#define STANDARD
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
}`,bp=`#define TOON
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
}`,Sp=`#define TOON
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
}`,yp=`uniform float size;
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
}`,Ep=`uniform vec3 diffuse;
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
}`,Tp=`#include <common>
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
}`,Ap=`uniform vec3 color;
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
}`,wp=`uniform float rotation;
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
}`,Cp=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:jd,alphahash_pars_fragment:Kd,alphamap_fragment:Zd,alphamap_pars_fragment:Jd,alphatest_fragment:Qd,alphatest_pars_fragment:eh,aomap_fragment:th,aomap_pars_fragment:nh,batching_pars_vertex:ih,batching_vertex:rh,begin_vertex:sh,beginnormal_vertex:ah,bsdfs:oh,iridescence_fragment:ch,bumpmap_pars_fragment:lh,clipping_planes_fragment:uh,clipping_planes_pars_fragment:dh,clipping_planes_pars_vertex:hh,clipping_planes_vertex:fh,color_fragment:ph,color_pars_fragment:mh,color_pars_vertex:xh,color_vertex:gh,common:_h,cube_uv_reflection_fragment:vh,defaultnormal_vertex:Mh,displacementmap_pars_vertex:bh,displacementmap_vertex:Sh,emissivemap_fragment:yh,emissivemap_pars_fragment:Eh,colorspace_fragment:Th,colorspace_pars_fragment:Ah,envmap_fragment:wh,envmap_common_pars_fragment:Ch,envmap_pars_fragment:Rh,envmap_pars_vertex:Ph,envmap_physical_pars_fragment:Vh,envmap_vertex:Lh,fog_vertex:Dh,fog_pars_vertex:Uh,fog_fragment:Ih,fog_pars_fragment:Nh,gradientmap_pars_fragment:Fh,lightmap_pars_fragment:Oh,lights_lambert_fragment:zh,lights_lambert_pars_fragment:Bh,lights_pars_begin:kh,lights_toon_fragment:Gh,lights_toon_pars_fragment:Hh,lights_phong_fragment:Wh,lights_phong_pars_fragment:Xh,lights_physical_fragment:qh,lights_physical_pars_fragment:Yh,lights_fragment_begin:$h,lights_fragment_maps:jh,lights_fragment_end:Kh,logdepthbuf_fragment:Zh,logdepthbuf_pars_fragment:Jh,logdepthbuf_pars_vertex:Qh,logdepthbuf_vertex:ef,map_fragment:tf,map_pars_fragment:nf,map_particle_fragment:rf,map_particle_pars_fragment:sf,metalnessmap_fragment:af,metalnessmap_pars_fragment:of,morphinstance_vertex:cf,morphcolor_vertex:lf,morphnormal_vertex:uf,morphtarget_pars_vertex:df,morphtarget_vertex:hf,normal_fragment_begin:ff,normal_fragment_maps:pf,normal_pars_fragment:mf,normal_pars_vertex:xf,normal_vertex:gf,normalmap_pars_fragment:_f,clearcoat_normal_fragment_begin:vf,clearcoat_normal_fragment_maps:Mf,clearcoat_pars_fragment:bf,iridescence_pars_fragment:Sf,opaque_fragment:yf,packing:Ef,premultiplied_alpha_fragment:Tf,project_vertex:Af,dithering_fragment:wf,dithering_pars_fragment:Cf,roughnessmap_fragment:Rf,roughnessmap_pars_fragment:Pf,shadowmap_pars_fragment:Lf,shadowmap_pars_vertex:Df,shadowmap_vertex:Uf,shadowmask_pars_fragment:If,skinbase_vertex:Nf,skinning_pars_vertex:Ff,skinning_vertex:Of,skinnormal_vertex:zf,specularmap_fragment:Bf,specularmap_pars_fragment:kf,tonemapping_fragment:Vf,tonemapping_pars_fragment:Gf,transmission_fragment:Hf,transmission_pars_fragment:Wf,uv_pars_fragment:Xf,uv_pars_vertex:qf,uv_vertex:Yf,worldpos_vertex:$f,background_vert:jf,background_frag:Kf,backgroundCube_vert:Zf,backgroundCube_frag:Jf,cube_vert:Qf,cube_frag:ep,depth_vert:tp,depth_frag:np,distanceRGBA_vert:ip,distanceRGBA_frag:rp,equirect_vert:sp,equirect_frag:ap,linedashed_vert:op,linedashed_frag:cp,meshbasic_vert:lp,meshbasic_frag:up,meshlambert_vert:dp,meshlambert_frag:hp,meshmatcap_vert:fp,meshmatcap_frag:pp,meshnormal_vert:mp,meshnormal_frag:xp,meshphong_vert:gp,meshphong_frag:_p,meshphysical_vert:vp,meshphysical_frag:Mp,meshtoon_vert:bp,meshtoon_frag:Sp,points_vert:yp,points_frag:Ep,shadow_vert:Tp,shadow_frag:Ap,sprite_vert:wp,sprite_frag:Cp},ue={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},rn={basic:{uniforms:wt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:wt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:wt([ue.common,ue.specularmap,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:wt([ue.common,ue.envmap,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.roughnessmap,ue.metalnessmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:wt([ue.common,ue.aomap,ue.lightmap,ue.emissivemap,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.gradientmap,ue.fog,ue.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:wt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,ue.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:wt([ue.points,ue.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:wt([ue.common,ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:wt([ue.common,ue.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:wt([ue.common,ue.bumpmap,ue.normalmap,ue.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:wt([ue.sprite,ue.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:wt([ue.common,ue.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:wt([ue.lights,ue.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};rn.physical={uniforms:wt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Or={r:0,b:0,g:0},Hn=new yn,Rp=new ut;function Pp(i,e,t,n,r,s,a){const o=new Ke(0);let c=s===!0?0:1,l,u,d=null,h=0,p=null;function x(S){let A=S.isScene===!0?S.background:null;return A&&A.isTexture&&(A=(S.backgroundBlurriness>0?t:e).get(A)),A}function _(S){let A=!1;const P=x(S);P===null?f(o,c):P&&P.isColor&&(f(P,1),A=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,A){const P=x(A);P&&(P.isCubeTexture||P.mapping===Qr)?(u===void 0&&(u=new Mt(new hr(1,1,1),new $t({name:"BackgroundCubeMaterial",uniforms:Ii(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Ct,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(y,L,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Hn.copy(A.backgroundRotation),Hn.x*=-1,Hn.y*=-1,Hn.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(Hn.y*=-1,Hn.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Rp.makeRotationFromEuler(Hn)),u.material.toneMapped=qe.getTransfer(P.colorSpace)!==et,(d!==P||h!==P.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,d=P,h=P.version,p=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(l===void 0&&(l=new Mt(new ts(2,2),new $t({name:"BackgroundMaterial",uniforms:Ii(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=P,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=qe.getTransfer(P.colorSpace)!==et,P.matrixAutoUpdate===!0&&P.updateMatrix(),l.material.uniforms.uvTransform.value.copy(P.matrix),(d!==P||h!==P.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,d=P,h=P.version,p=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function f(S,A){S.getRGB(Or,$c(i)),n.buffers.color.setClear(Or.r,Or.g,Or.b,A,a)}function w(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,A=1){o.set(S),c=A,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,f(o,c)},render:_,addToRenderList:m,dispose:w}}function Lp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=h(null);let s=r,a=!1;function o(M,D,z,k,W){let Y=!1;const q=d(k,z,D);s!==q&&(s=q,l(s.object)),Y=p(M,k,z,W),Y&&x(M,k,z,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,A(M,D,z,k),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function d(M,D,z){const k=z.wireframe===!0;let W=n[M.id];W===void 0&&(W={},n[M.id]=W);let Y=W[D.id];Y===void 0&&(Y={},W[D.id]=Y);let q=Y[k];return q===void 0&&(q=h(c()),Y[k]=q),q}function h(M){const D=[],z=[],k=[];for(let W=0;W<t;W++)D[W]=0,z[W]=0,k[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:z,attributeDivisors:k,object:M,attributes:{},index:null}}function p(M,D,z,k){const W=s.attributes,Y=D.attributes;let q=0;const se=z.getAttributes();for(const X in se)if(se[X].location>=0){const ae=W[X];let Se=Y[X];if(Se===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(Se=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(Se=M.instanceColor)),ae===void 0||ae.attribute!==Se||Se&&ae.data!==Se.data)return!0;q++}return s.attributesNum!==q||s.index!==k}function x(M,D,z,k){const W={},Y=D.attributes;let q=0;const se=z.getAttributes();for(const X in se)if(se[X].location>=0){let ae=Y[X];ae===void 0&&(X==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),X==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor));const Se={};Se.attribute=ae,ae&&ae.data&&(Se.data=ae.data),W[X]=Se,q++}s.attributes=W,s.attributesNum=q,s.index=k}function _(){const M=s.newAttributes;for(let D=0,z=M.length;D<z;D++)M[D]=0}function m(M){f(M,0)}function f(M,D){const z=s.newAttributes,k=s.enabledAttributes,W=s.attributeDivisors;z[M]=1,k[M]===0&&(i.enableVertexAttribArray(M),k[M]=1),W[M]!==D&&(i.vertexAttribDivisor(M,D),W[M]=D)}function w(){const M=s.newAttributes,D=s.enabledAttributes;for(let z=0,k=D.length;z<k;z++)D[z]!==M[z]&&(i.disableVertexAttribArray(z),D[z]=0)}function S(M,D,z,k,W,Y,q){q===!0?i.vertexAttribIPointer(M,D,z,W,Y):i.vertexAttribPointer(M,D,z,k,W,Y)}function A(M,D,z,k){_();const W=k.attributes,Y=z.getAttributes(),q=D.defaultAttributeValues;for(const se in Y){const X=Y[se];if(X.location>=0){let re=W[se];if(re===void 0&&(se==="instanceMatrix"&&M.instanceMatrix&&(re=M.instanceMatrix),se==="instanceColor"&&M.instanceColor&&(re=M.instanceColor)),re!==void 0){const ae=re.normalized,Se=re.itemSize,Q=e.get(re);if(Q===void 0)continue;const Ye=Q.buffer,je=Q.type,Ze=Q.bytesPerElement,$=je===i.INT||je===i.UNSIGNED_INT||re.gpuType===ka;if(re.isInterleavedBufferAttribute){const j=re.data,oe=j.stride,we=re.offset;if(j.isInstancedInterleavedBuffer){for(let be=0;be<X.locationSize;be++)f(X.location+be,j.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let be=0;be<X.locationSize;be++)m(X.location+be);i.bindBuffer(i.ARRAY_BUFFER,Ye);for(let be=0;be<X.locationSize;be++)S(X.location+be,Se/X.locationSize,je,ae,oe*Ze,(we+Se/X.locationSize*be)*Ze,$)}else{if(re.isInstancedBufferAttribute){for(let j=0;j<X.locationSize;j++)f(X.location+j,re.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let j=0;j<X.locationSize;j++)m(X.location+j);i.bindBuffer(i.ARRAY_BUFFER,Ye);for(let j=0;j<X.locationSize;j++)S(X.location+j,Se/X.locationSize,je,ae,Se*Ze,Se/X.locationSize*j*Ze,$)}}else if(q!==void 0){const ae=q[se];if(ae!==void 0)switch(ae.length){case 2:i.vertexAttrib2fv(X.location,ae);break;case 3:i.vertexAttrib3fv(X.location,ae);break;case 4:i.vertexAttrib4fv(X.location,ae);break;default:i.vertexAttrib1fv(X.location,ae)}}}}w()}function P(){U();for(const M in n){const D=n[M];for(const z in D){const k=D[z];for(const W in k)u(k[W].object),delete k[W];delete D[z]}delete n[M]}}function y(M){if(n[M.id]===void 0)return;const D=n[M.id];for(const z in D){const k=D[z];for(const W in k)u(k[W].object),delete k[W];delete D[z]}delete n[M.id]}function L(M){for(const D in n){const z=n[D];if(z[M.id]===void 0)continue;const k=z[M.id];for(const W in k)u(k[W].object),delete k[W];delete z[M.id]}}function U(){b(),a=!0,s!==r&&(s=r,l(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:U,resetDefaultState:b,dispose:P,releaseStatesOfGeometry:y,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:m,disableUnusedAttributes:w}}function Dp(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=u[x];t.update(p,n,1)}function c(l,u,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<l.length;x++)a(l[x],u[x],h[x]);else{p.multiDrawArraysInstancedWEBGL(n,l,0,u,0,h,0,d);let x=0;for(let _=0;_<d;_++)x+=u[_]*h[_];t.update(x,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Up(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(L){return!(L!==tn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(L){const U=L===Fi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==Sn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==_n&&!U)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(Fe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),P=x>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:x,maxTextureSize:_,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:w,maxVaryings:S,maxFragmentUniforms:A,vertexTextures:P,maxSamples:y}}function Ip(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new Xn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||n!==0||r;return r=h,n=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,p){const x=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!r||x===null||x.length===0||s&&!m)s?u(null):l();else{const w=s?0:n,S=w*4;let A=f.clippingState||null;c.value=A,A=u(x,h,S,p);for(let P=0;P!==S;++P)A[P]=t[P];f.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,p,x){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,x!==!0||m===null){const f=p+_*4,w=h.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,A=p;S!==_;++S,A+=4)a.copy(d[S]).applyMatrix4(w,o),a.normal.toArray(m,A),m[A+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Np(i){let e=new WeakMap;function t(a,o){return o===Js?a.mapping=Li:o===Qs&&(a.mapping=Di),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Js||o===Qs)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new pd(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const In=4,tc=[.125,.215,.35,.446,.526,.582],Yn=20,Fp=256,Xi=new Hd,nc=new Ke;let Fs=null,Os=0,zs=0,Bs=!1;const Op=new F;class ic{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=Op}=s;Fs=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),zs=this._renderer.getActiveMipmapLevel(),Bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ac(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=sc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fs,Os,zs),this._renderer.xr.enabled=Bs,e.scissorTest=!1,Si(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Li||e.mapping===Di?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fs=this._renderer.getRenderTarget(),Os=this._renderer.getActiveCubeFace(),zs=this._renderer.getActiveMipmapLevel(),Bs=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:qt,minFilter:qt,generateMipmaps:!1,type:Fi,format:tn,colorSpace:Ui,depthBuffer:!1},r=rc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=rc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=zp(s)),this._blurMaterial=kp(s,e,t),this._ggxMaterial=Bp(s,e,t)}return r}_compileMaterial(e){const t=new Mt(new It,e);this._renderer.compile(t,Xi)}_sceneToCubeUV(e,t,n,r,s){const c=new Xt(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(nc),d.toneMapping=Nn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Mt(new hr,new Ln({name:"PMREM.Background",side:Ct,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let f=!1;const w=e.background;w?w.isColor&&(m.color.copy(w),e.background=null,f=!0):(m.color.copy(nc),f=!0);for(let S=0;S<6;S++){const A=S%3;A===0?(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[S],s.y,s.z)):A===1?(c.up.set(0,0,l[S]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[S],s.z)):(c.up.set(0,l[S],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[S]));const P=this._cubeSize;Si(r,A*P,S>2?P:0,P,P),d.setRenderTarget(r),f&&d.render(_,c),d.render(e,c)}d.toneMapping=p,d.autoClear=h,e.background=w}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Li||e.mapping===Di;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ac()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=sc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Si(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Xi)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=.05+l*.95,p=d*h,{_lodMax:x}=this,_=this._sizeLods[n],m=3*_*(n>x-In?n-x+In:0),f=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=p,c.mipInt.value=x-t,Si(s,m,f,3*_,2*_),r.setRenderTarget(s),r.render(o,Xi),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=x-n,Si(e,m,f,3*_,2*_),r.setRenderTarget(e),r.render(o,Xi)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&lt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const h=l.uniforms,p=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Yn-1),_=s/x,m=isFinite(s)?1+Math.floor(u*_):Yn;m>Yn&&Fe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Yn}`);const f=[];let w=0;for(let L=0;L<Yn;++L){const U=L/_,b=Math.exp(-U*U/2);f.push(b),L===0?w+=b:L<m&&(w+=2*b)}for(let L=0;L<f.length;L++)f[L]=f[L]/w;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:S}=this;h.dTheta.value=x,h.mipInt.value=S-n;const A=this._sizeLods[r],P=3*A*(r>S-In?r-S+In:0),y=4*(this._cubeSize-A);Si(t,P,y,3*A,2*A),c.setRenderTarget(t),c.render(d,Xi)}}function zp(i){const e=[],t=[],n=[];let r=i;const s=i-In+1+tc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>i-In?c=tc[a-i+In-1]:a===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,x=6,_=3,m=2,f=1,w=new Float32Array(_*x*p),S=new Float32Array(m*x*p),A=new Float32Array(f*x*p);for(let y=0;y<p;y++){const L=y%3*2/3-1,U=y>2?0:-1,b=[L,U,0,L+2/3,U,0,L+2/3,U+1,0,L,U,0,L+2/3,U+1,0,L,U+1,0];w.set(b,_*x*y),S.set(h,m*x*y);const M=[y,y,y,y,y,y];A.set(M,f*x*y)}const P=new It;P.setAttribute("position",new Yt(w,_)),P.setAttribute("uv",new Yt(S,m)),P.setAttribute("faceIndex",new Yt(A,f)),n.push(new Mt(P,null)),r>In&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function rc(i,e,t){const n=new ei(i,e,t);return n.texture.mapping=Qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Si(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function Bp(i,e,t){return new $t({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ns(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function kp(i,e,t){const n=new Float32Array(Yn),r=new F(0,1,0);return new $t({name:"SphericalGaussianBlur",defines:{n:Yn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ns(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function sc(){return new $t({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ns(),fragmentShader:`

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
		`,blending:vn,depthTest:!1,depthWrite:!1})}function ac(){return new $t({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ns(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vn,depthTest:!1,depthWrite:!1})}function ns(){return`

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
	`}function Vp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Js||c===Qs,u=c===Li||c===Di;if(l||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new ic(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const p=o.image;return l&&p&&p.height>0||u&&p&&r(p)?(t===null&&(t=new ic(i)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",s),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Gp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ar("WebGLRenderer: "+n+" extension not supported."),r}}}function Hp(i,e,t,n){const r={},s=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const x in h.attributes)e.remove(h.attributes[x]);h.removeEventListener("dispose",a),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const p in h)e.update(h[p],i.ARRAY_BUFFER)}function l(d){const h=[],p=d.index,x=d.attributes.position;let _=0;if(p!==null){const w=p.array;_=p.version;for(let S=0,A=w.length;S<A;S+=3){const P=w[S+0],y=w[S+1],L=w[S+2];h.push(P,y,y,L,L,P)}}else if(x!==void 0){const w=x.array;_=x.version;for(let S=0,A=w.length/3-1;S<A;S+=3){const P=S+0,y=S+1,L=S+2;h.push(P,y,y,L,L,P)}}else return;const m=new(Hc(h)?Yc:qc)(h,1);m.version=_;const f=s.get(d);f&&e.remove(f),s.set(d,m)}function u(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Wp(i,e,t){let n;function r(h){n=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,p){i.drawElements(n,p,s,h*a),t.update(p,n,1)}function l(h,p,x){x!==0&&(i.drawElementsInstanced(n,p,s,h*a,x),t.update(p,n,x))}function u(h,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,s,h,0,x);let m=0;for(let f=0;f<x;f++)m+=p[f];t.update(m,n,1)}function d(h,p,x,_){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<h.length;f++)l(h[f]/a,p[f],_[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,s,h,0,_,0,x);let f=0;for(let w=0;w<x;w++)f+=p[w]*_[w];t.update(f,n,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Xp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:lt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function qp(i,e,t){const n=new WeakMap,r=new dt;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(o);if(h===void 0||h.count!==d){let b=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const p=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),x===!0&&(S=2),_===!0&&(S=3);let A=o.attributes.position.count*S,P=1;A>e.maxTextureSize&&(P=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const y=new Float32Array(A*P*4*d),L=new Wc(y,A,P,d);L.type=_n,L.needsUpdate=!0;const U=S*4;for(let M=0;M<d;M++){const D=m[M],z=f[M],k=w[M],W=A*P*4*M;for(let Y=0;Y<D.count;Y++){const q=Y*U;p===!0&&(r.fromBufferAttribute(D,Y),y[W+q+0]=r.x,y[W+q+1]=r.y,y[W+q+2]=r.z,y[W+q+3]=0),x===!0&&(r.fromBufferAttribute(z,Y),y[W+q+4]=r.x,y[W+q+5]=r.y,y[W+q+6]=r.z,y[W+q+7]=0),_===!0&&(r.fromBufferAttribute(k,Y),y[W+q+8]=r.x,y[W+q+9]=r.y,y[W+q+10]=r.z,y[W+q+11]=k.itemSize===4?r.w:1)}}h={count:d,texture:L,size:new Re(A,P)},n.set(o,h),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let _=0;_<l.length;_++)p+=l[_];const x=o.morphTargetsRelative?1:1-p;c.getUniforms().setValue(i,"morphTargetBaseInfluence",x),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:s}}function Yp(i,e,t,n){let r=new WeakMap;function s(c){const l=n.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const sl=new Et,oc=new Qc(1,1),al=new Wc,ol=new Zu,cl=new Kc,cc=[],lc=[],uc=new Float32Array(16),dc=new Float32Array(9),hc=new Float32Array(4);function Bi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=cc[r];if(s===void 0&&(s=new Float32Array(r),cc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function is(i,e){let t=lc[e];t===void 0&&(t=new Int32Array(e),lc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function $p(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function Kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function Jp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(xt(t,n))return;hc.set(n),i.uniformMatrix2fv(this.addr,!1,hc),gt(t,n)}}function Qp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(xt(t,n))return;dc.set(n),i.uniformMatrix3fv(this.addr,!1,dc),gt(t,n)}}function em(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(xt(t,n))return;uc.set(n),i.uniformMatrix4fv(this.addr,!1,uc),gt(t,n)}}function tm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function im(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function sm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function om(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function lm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(oc.compareFunction=Gc,s=oc):s=sl,t.setTexture2D(e||s,r)}function um(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ol,r)}function dm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||cl,r)}function hm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||al,r)}function fm(i){switch(i){case 5126:return $p;case 35664:return jp;case 35665:return Kp;case 35666:return Zp;case 35674:return Jp;case 35675:return Qp;case 35676:return em;case 5124:case 35670:return tm;case 35667:case 35671:return nm;case 35668:case 35672:return im;case 35669:case 35673:return rm;case 5125:return sm;case 36294:return am;case 36295:return om;case 36296:return cm;case 35678:case 36198:case 36298:case 36306:case 35682:return lm;case 35679:case 36299:case 36307:return um;case 35680:case 36300:case 36308:case 36293:return dm;case 36289:case 36303:case 36311:case 36292:return hm}}function pm(i,e){i.uniform1fv(this.addr,e)}function mm(i,e){const t=Bi(e,this.size,2);i.uniform2fv(this.addr,t)}function xm(i,e){const t=Bi(e,this.size,3);i.uniform3fv(this.addr,t)}function gm(i,e){const t=Bi(e,this.size,4);i.uniform4fv(this.addr,t)}function _m(i,e){const t=Bi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function vm(i,e){const t=Bi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Mm(i,e){const t=Bi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function bm(i,e){i.uniform1iv(this.addr,e)}function Sm(i,e){i.uniform2iv(this.addr,e)}function ym(i,e){i.uniform3iv(this.addr,e)}function Em(i,e){i.uniform4iv(this.addr,e)}function Tm(i,e){i.uniform1uiv(this.addr,e)}function Am(i,e){i.uniform2uiv(this.addr,e)}function wm(i,e){i.uniform3uiv(this.addr,e)}function Cm(i,e){i.uniform4uiv(this.addr,e)}function Rm(i,e,t){const n=this.cache,r=e.length,s=is(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||sl,s[a])}function Pm(i,e,t){const n=this.cache,r=e.length,s=is(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||ol,s[a])}function Lm(i,e,t){const n=this.cache,r=e.length,s=is(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||cl,s[a])}function Dm(i,e,t){const n=this.cache,r=e.length,s=is(t,r);xt(n,s)||(i.uniform1iv(this.addr,s),gt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||al,s[a])}function Um(i){switch(i){case 5126:return pm;case 35664:return mm;case 35665:return xm;case 35666:return gm;case 35674:return _m;case 35675:return vm;case 35676:return Mm;case 5124:case 35670:return bm;case 35667:case 35671:return Sm;case 35668:case 35672:return ym;case 35669:case 35673:return Em;case 5125:return Tm;case 36294:return Am;case 36295:return wm;case 36296:return Cm;case 35678:case 36198:case 36298:case 36306:case 35682:return Rm;case 35679:case 36299:case 36307:return Pm;case 35680:case 36300:case 36308:case 36293:return Lm;case 36289:case 36303:case 36311:case 36292:return Dm}}class Im{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=fm(t.type)}}class Nm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Um(t.type)}}class Fm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const ks=/(\w+)(\])?(\[|\.)?/g;function fc(i,e){i.seq.push(e),i.map[e.id]=e}function Om(i,e,t){const n=i.name,r=n.length;for(ks.lastIndex=0;;){const s=ks.exec(n),a=ks.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){fc(t,l===void 0?new Im(o,i,e):new Nm(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Fm(o),fc(t,d)),t=d}}}class Wr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Om(s,a,this)}}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function pc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const zm=37297;let Bm=0;function km(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const mc=new Oe;function Vm(i){qe._getMatrix(mc,qe.workingColorSpace,i);const e=`mat3( ${mc.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(i)){case Yr:return[e,"LinearTransferOETF"];case et:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function xc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+km(i.getShaderSource(e),o)}else return s}function Gm(i,e){const t=Vm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Hm(i,e){let t;switch(e){case lu:t="Linear";break;case uu:t="Reinhard";break;case du:t="Cineon";break;case hu:t="ACESFilmic";break;case pu:t="AgX";break;case mu:t="Neutral";break;case fu:t="Custom";break;default:Fe("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const zr=new F;function Wm(){qe.getLuminanceCoefficients(zr);const i=zr.x.toFixed(4),e=zr.y.toFixed(4),t=zr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qi).join(`
`)}function qm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ym(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function qi(i){return i!==""}function gc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function _c(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const $m=/^[ \t]*#include +<([\w\d./]+)>/gm;function Da(i){return i.replace($m,Km)}const jm=new Map;function Km(i,e){let t=Ve[e];if(t===void 0){const n=jm.get(e);if(n!==void 0)t=Ve[n],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Da(t)}const Zm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vc(i){return i.replace(Zm,Jm)}function Jm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Mc(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Qm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Dc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Gl?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===mn&&(e="SHADOWMAP_TYPE_VSM"),e}function e0(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Li:case Di:e="ENVMAP_TYPE_CUBE";break;case Qr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function t0(i){let e="ENVMAP_MODE_REFLECTION";return i.envMap&&i.envMapMode===Di&&(e="ENVMAP_MODE_REFRACTION"),e}function n0(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Uc:e="ENVMAP_BLENDING_MULTIPLY";break;case ou:e="ENVMAP_BLENDING_MIX";break;case cu:e="ENVMAP_BLENDING_ADD";break}return e}function i0(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function r0(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Qm(t),l=e0(t),u=t0(t),d=n0(t),h=i0(t),p=Xm(t),x=qm(s),_=r.createProgram();let m,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(qi).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(qi).join(`
`),f.length>0&&(f+=`
`)):(m=[Mc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qi).join(`
`),f=[Mc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Nn?"#define TONE_MAPPING":"",t.toneMapping!==Nn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Nn?Hm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Gm("linearToOutputTexel",t.outputColorSpace),Wm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qi).join(`
`)),a=Da(a),a=gc(a,t),a=_c(a,t),o=Da(o),o=gc(o,t),o=_c(o,t),a=vc(a),o=vc(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Ro?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ro?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=w+m+a,A=w+f+o,P=pc(r,r.VERTEX_SHADER,S),y=pc(r,r.FRAGMENT_SHADER,A);r.attachShader(_,P),r.attachShader(_,y),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function L(D){if(i.debug.checkShaderErrors){const z=r.getProgramInfoLog(_)||"",k=r.getShaderInfoLog(P)||"",W=r.getShaderInfoLog(y)||"",Y=z.trim(),q=k.trim(),se=W.trim();let X=!0,re=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,P,y);else{const ae=xc(r,P,"vertex"),Se=xc(r,y,"fragment");lt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Y+`
`+ae+`
`+Se)}else Y!==""?Fe("WebGLProgram: Program Info Log:",Y):(q===""||se==="")&&(re=!1);re&&(D.diagnostics={runnable:X,programLog:Y,vertexShader:{log:q,prefix:m},fragmentShader:{log:se,prefix:f}})}r.deleteShader(P),r.deleteShader(y),U=new Wr(r,_),b=Ym(r,_)}let U;this.getUniforms=function(){return U===void 0&&L(this),U};let b;this.getAttributes=function(){return b===void 0&&L(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,zm)),M},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Bm++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=y,this}let s0=0;class a0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new o0(e),t.set(e,n)),n}}class o0{constructor(e){this.id=s0++,this.code=e,this.usedTimes=0}}function c0(i,e,t,n,r,s,a){const o=new Ka,c=new a0,l=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,D,z,k){const W=z.fog,Y=k.geometry,q=b.isMeshStandardMaterial?z.environment:null,se=(b.isMeshStandardMaterial?t:e).get(b.envMap||q),X=se&&se.mapping===Qr?se.image.height:null,re=x[b.type];b.precision!==null&&(p=r.getMaxPrecision(b.precision),p!==b.precision&&Fe("WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const ae=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Se=ae!==void 0?ae.length:0;let Q=0;Y.morphAttributes.position!==void 0&&(Q=1),Y.morphAttributes.normal!==void 0&&(Q=2),Y.morphAttributes.color!==void 0&&(Q=3);let Ye,je,Ze,$;if(re){const Je=rn[re];Ye=Je.vertexShader,je=Je.fragmentShader}else Ye=b.vertexShader,je=b.fragmentShader,c.update(b),Ze=c.getVertexShaderID(b),$=c.getFragmentShaderID(b);const j=i.getRenderTarget(),oe=i.state.buffers.depth.getReversed(),we=k.isInstancedMesh===!0,be=k.isBatchedMesh===!0,ze=!!b.map,ht=!!b.matcap,Be=!!se,it=!!b.aoMap,C=!!b.lightMap,He=!!b.bumpMap,ke=!!b.normalMap,$e=!!b.displacementMap,ge=!!b.emissiveMap,tt=!!b.metalnessMap,ye=!!b.roughnessMap,Le=b.anisotropy>0,E=b.clearcoat>0,g=b.dispersion>0,T=b.iridescence>0,I=b.sheen>0,G=b.transmission>0,B=Le&&!!b.anisotropyMap,te=E&&!!b.clearcoatMap,J=E&&!!b.clearcoatNormalMap,me=E&&!!b.clearcoatRoughnessMap,pe=T&&!!b.iridescenceMap,Z=T&&!!b.iridescenceThicknessMap,ne=I&&!!b.sheenColorMap,Pe=I&&!!b.sheenRoughnessMap,Ae=!!b.specularMap,fe=!!b.specularColorMap,Ue=!!b.specularIntensityMap,R=G&&!!b.transmissionMap,de=G&&!!b.thicknessMap,ce=!!b.gradientMap,le=!!b.alphaMap,ee=b.alphaTest>0,K=!!b.alphaHash,_e=!!b.extensions;let Ne=Nn;b.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ne=i.toneMapping);const rt={shaderID:re,shaderType:b.type,shaderName:b.name,vertexShader:Ye,fragmentShader:je,defines:b.defines,customVertexShaderID:Ze,customFragmentShaderID:$,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:be,batchingColor:be&&k._colorsTexture!==null,instancing:we,instancingColor:we&&k.instanceColor!==null,instancingMorph:we&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:j===null?i.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Ui,alphaToCoverage:!!b.alphaToCoverage,map:ze,matcap:ht,envMap:Be,envMapMode:Be&&se.mapping,envMapCubeUVHeight:X,aoMap:it,lightMap:C,bumpMap:He,normalMap:ke,displacementMap:h&&$e,emissiveMap:ge,normalMapObjectSpace:ke&&b.normalMapType===Mu,normalMapTangentSpace:ke&&b.normalMapType===vu,metalnessMap:tt,roughnessMap:ye,anisotropy:Le,anisotropyMap:B,clearcoat:E,clearcoatMap:te,clearcoatNormalMap:J,clearcoatRoughnessMap:me,dispersion:g,iridescence:T,iridescenceMap:pe,iridescenceThicknessMap:Z,sheen:I,sheenColorMap:ne,sheenRoughnessMap:Pe,specularMap:Ae,specularColorMap:fe,specularIntensityMap:Ue,transmission:G,transmissionMap:R,thicknessMap:de,gradientMap:ce,opaque:b.transparent===!1&&b.blending===wi&&b.alphaToCoverage===!1,alphaMap:le,alphaTest:ee,alphaHash:K,combine:b.combine,mapUv:ze&&_(b.map.channel),aoMapUv:it&&_(b.aoMap.channel),lightMapUv:C&&_(b.lightMap.channel),bumpMapUv:He&&_(b.bumpMap.channel),normalMapUv:ke&&_(b.normalMap.channel),displacementMapUv:$e&&_(b.displacementMap.channel),emissiveMapUv:ge&&_(b.emissiveMap.channel),metalnessMapUv:tt&&_(b.metalnessMap.channel),roughnessMapUv:ye&&_(b.roughnessMap.channel),anisotropyMapUv:B&&_(b.anisotropyMap.channel),clearcoatMapUv:te&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:J&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:me&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&_(b.sheenRoughnessMap.channel),specularMapUv:Ae&&_(b.specularMap.channel),specularColorMapUv:fe&&_(b.specularColorMap.channel),specularIntensityMapUv:Ue&&_(b.specularIntensityMap.channel),transmissionMapUv:R&&_(b.transmissionMap.channel),thicknessMapUv:de&&_(b.thicknessMap.channel),alphaMapUv:le&&_(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ke||Le),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Y.attributes.uv&&(ze||le),fog:!!W,useFog:b.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:oe,skinning:k.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:Q,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ne,decodeVideoTexture:ze&&b.map.isVideoTexture===!0&&qe.getTransfer(b.map.colorSpace)===et,decodeVideoTextureEmissive:ge&&b.emissiveMap.isVideoTexture===!0&&qe.getTransfer(b.emissiveMap.colorSpace)===et,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===sn,flipSided:b.side===Ct,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:_e&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(_e&&b.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return rt.vertexUv1s=l.has(1),rt.vertexUv2s=l.has(2),rt.vertexUv3s=l.has(3),l.clear(),rt}function f(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)M.push(D),M.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(w(M,b),S(M,b),M.push(i.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function w(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function S(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function A(b){const M=x[b.type];let D;if(M){const z=rn[M];D=ud.clone(z.uniforms)}else D=b.uniforms;return D}function P(b,M){let D;for(let z=0,k=u.length;z<k;z++){const W=u[z];if(W.cacheKey===M){D=W,++D.usedTimes;break}}return D===void 0&&(D=new r0(i,M,b,s),u.push(D)),D}function y(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function L(b){c.remove(b)}function U(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:A,acquireProgram:P,releaseProgram:y,releaseShaderCache:L,programs:u,dispose:U}}function l0(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,c){i.get(a)[o]=c}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function u0(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function bc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Sc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(d,h,p,x,_,m){let f=i[e];return f===void 0?(f={id:d.id,object:d,geometry:h,material:p,groupOrder:x,renderOrder:d.renderOrder,z:_,group:m},i[e]=f):(f.id=d.id,f.object=d,f.geometry=h,f.material=p,f.groupOrder=x,f.renderOrder=d.renderOrder,f.z=_,f.group=m),e++,f}function o(d,h,p,x,_,m){const f=a(d,h,p,x,_,m);p.transmission>0?n.push(f):p.transparent===!0?r.push(f):t.push(f)}function c(d,h,p,x,_,m){const f=a(d,h,p,x,_,m);p.transmission>0?n.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function l(d,h){t.length>1&&t.sort(d||u0),n.length>1&&n.sort(h||bc),r.length>1&&r.sort(h||bc)}function u(){for(let d=e,h=i.length;d<h;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:o,unshift:c,finish:u,sort:l}}function d0(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Sc,i.set(n,[a])):r>=s.length?(a=new Sc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function h0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new F,color:new Ke};break;case"SpotLight":t={position:new F,direction:new F,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function f0(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let p0=0;function m0(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function x0(i){const e=new h0,t=f0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const r=new F,s=new ut,a=new ut;function o(l){let u=0,d=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,x=0,_=0,m=0,f=0,w=0,S=0,A=0,P=0,y=0,L=0;l.sort(m0);for(let b=0,M=l.length;b<M;b++){const D=l[b],z=D.color,k=D.intensity,W=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=z.r*k,d+=z.g*k,h+=z.b*k;else if(D.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(D.sh.coefficients[q],k);L++}else if(D.isDirectionalLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const se=D.shadow,X=t.get(D);X.shadowIntensity=se.intensity,X.shadowBias=se.bias,X.shadowNormalBias=se.normalBias,X.shadowRadius=se.radius,X.shadowMapSize=se.mapSize,n.directionalShadow[p]=X,n.directionalShadowMap[p]=Y,n.directionalShadowMatrix[p]=D.shadow.matrix,w++}n.directional[p]=q,p++}else if(D.isSpotLight){const q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(z).multiplyScalar(k),q.distance=W,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,n.spot[_]=q;const se=D.shadow;if(D.map&&(n.spotLightMap[P]=D.map,P++,se.updateMatrices(D),D.castShadow&&y++),n.spotLightMatrix[_]=se.matrix,D.castShadow){const X=t.get(D);X.shadowIntensity=se.intensity,X.shadowBias=se.bias,X.shadowNormalBias=se.normalBias,X.shadowRadius=se.radius,X.shadowMapSize=se.mapSize,n.spotShadow[_]=X,n.spotShadowMap[_]=Y,A++}_++}else if(D.isRectAreaLight){const q=e.get(D);q.color.copy(z).multiplyScalar(k),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=q,m++}else if(D.isPointLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const se=D.shadow,X=t.get(D);X.shadowIntensity=se.intensity,X.shadowBias=se.bias,X.shadowNormalBias=se.normalBias,X.shadowRadius=se.radius,X.shadowMapSize=se.mapSize,X.shadowCameraNear=se.camera.near,X.shadowCameraFar=se.camera.far,n.pointShadow[x]=X,n.pointShadowMap[x]=Y,n.pointShadowMatrix[x]=D.shadow.matrix,S++}n.point[x]=q,x++}else if(D.isHemisphereLight){const q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(k),q.groundColor.copy(D.groundColor).multiplyScalar(k),n.hemi[f]=q,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ue.LTC_FLOAT_1,n.rectAreaLTC2=ue.LTC_FLOAT_2):(n.rectAreaLTC1=ue.LTC_HALF_1,n.rectAreaLTC2=ue.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const U=n.hash;(U.directionalLength!==p||U.pointLength!==x||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==f||U.numDirectionalShadows!==w||U.numPointShadows!==S||U.numSpotShadows!==A||U.numSpotMaps!==P||U.numLightProbes!==L)&&(n.directional.length=p,n.spot.length=_,n.rectArea.length=m,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=A+P-y,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=L,U.directionalLength=p,U.pointLength=x,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=f,U.numDirectionalShadows=w,U.numPointShadows=S,U.numSpotShadows=A,U.numSpotMaps=P,U.numLightProbes=L,n.version=p0++)}function c(l,u){let d=0,h=0,p=0,x=0,_=0;const m=u.matrixWorldInverse;for(let f=0,w=l.length;f<w;f++){const S=l[f];if(S.isDirectionalLight){const A=n.directional[d];A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),d++}else if(S.isSpotLight){const A=n.spot[p];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),A.halfWidth.set(S.width*.5,0,0),A.halfHeight.set(0,S.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),x++}else if(S.isPointLight){const A=n.point[h];A.position.setFromMatrixPosition(S.matrixWorld),A.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const A=n.hemi[_];A.direction.setFromMatrixPosition(S.matrixWorld),A.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function yc(i){const e=new x0(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function g0(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new yc(i),e.set(r,[o])):s>=a.length?(o=new yc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const _0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,v0=`uniform sampler2D shadow_pass;
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
}`;function M0(i,e,t){let n=new Zc;const r=new Re,s=new Re,a=new dt,o=new Od({depthPacking:_u}),c=new zd,l={},u=t.maxTextureSize,d={[bn]:Ct,[Ct]:bn,[sn]:sn},h=new $t({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:_0,fragmentShader:v0}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const x=new It;x.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Mt(x,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dc;let f=this.type;this.render=function(y,L,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const b=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),z=i.state;z.setBlending(vn),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const k=f!==mn&&this.type===mn,W=f===mn&&this.type!==mn;for(let Y=0,q=y.length;Y<q;Y++){const se=y[Y],X=se.shadow;if(X===void 0){Fe("WebGLShadowMap:",se,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;r.copy(X.mapSize);const re=X.getFrameExtents();if(r.multiply(re),s.copy(X.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/re.x),r.x=s.x*re.x,X.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/re.y),r.y=s.y*re.y,X.mapSize.y=s.y)),X.map===null||k===!0||W===!0){const Se=this.type!==mn?{minFilter:kt,magFilter:kt}:{};X.map!==null&&X.map.dispose(),X.map=new ei(r.x,r.y,Se),X.map.texture.name=se.name+".shadowMap",X.camera.updateProjectionMatrix()}i.setRenderTarget(X.map),i.clear();const ae=X.getViewportCount();for(let Se=0;Se<ae;Se++){const Q=X.getViewport(Se);a.set(s.x*Q.x,s.y*Q.y,s.x*Q.z,s.y*Q.w),z.viewport(a),X.updateMatrices(se,Se),n=X.getFrustum(),A(L,U,X.camera,se,this.type)}X.isPointLightShadow!==!0&&this.type===mn&&w(X,U),X.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(b,M,D)};function w(y,L){const U=e.update(_);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new ei(r.x,r.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(L,null,U,h,_,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(L,null,U,p,_,null)}function S(y,L,U,b){let M=null;const D=U.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(D!==void 0)M=D;else if(M=U.isPointLight===!0?c:o,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const z=M.uuid,k=L.uuid;let W=l[z];W===void 0&&(W={},l[z]=W);let Y=W[k];Y===void 0&&(Y=M.clone(),W[k]=Y,L.addEventListener("dispose",P)),M=Y}if(M.visible=L.visible,M.wireframe=L.wireframe,b===mn?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:d[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const z=i.properties.get(M);z.light=U}return M}function A(y,L,U,b,M){if(y.visible===!1)return;if(y.layers.test(L.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===mn)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,y.matrixWorld);const k=e.update(y),W=y.material;if(Array.isArray(W)){const Y=k.groups;for(let q=0,se=Y.length;q<se;q++){const X=Y[q],re=W[X.materialIndex];if(re&&re.visible){const ae=S(y,re,b,M);y.onBeforeShadow(i,y,L,U,k,ae,X),i.renderBufferDirect(U,null,k,ae,y,X),y.onAfterShadow(i,y,L,U,k,ae,X)}}}else if(W.visible){const Y=S(y,W,b,M);y.onBeforeShadow(i,y,L,U,k,Y,null),i.renderBufferDirect(U,null,k,Y,y,null),y.onAfterShadow(i,y,L,U,k,Y,null)}}const z=y.children;for(let k=0,W=z.length;k<W;k++)A(z[k],L,U,b,M)}function P(y){y.target.removeEventListener("dispose",P);for(const U in l){const b=l[U],M=y.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const b0={[Xs]:qs,[Ys]:Ks,[$s]:Zs,[Pi]:js,[qs]:Xs,[Ks]:Ys,[Zs]:$s,[js]:Pi};function S0(i,e){function t(){let R=!1;const de=new dt;let ce=null;const le=new dt(0,0,0,0);return{setMask:function(ee){ce!==ee&&!R&&(i.colorMask(ee,ee,ee,ee),ce=ee)},setLocked:function(ee){R=ee},setClear:function(ee,K,_e,Ne,rt){rt===!0&&(ee*=Ne,K*=Ne,_e*=Ne),de.set(ee,K,_e,Ne),le.equals(de)===!1&&(i.clearColor(ee,K,_e,Ne),le.copy(de))},reset:function(){R=!1,ce=null,le.set(-1,0,0,0)}}}function n(){let R=!1,de=!1,ce=null,le=null,ee=null;return{setReversed:function(K){if(de!==K){const _e=e.get("EXT_clip_control");K?_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.ZERO_TO_ONE_EXT):_e.clipControlEXT(_e.LOWER_LEFT_EXT,_e.NEGATIVE_ONE_TO_ONE_EXT),de=K;const Ne=ee;ee=null,this.setClear(Ne)}},getReversed:function(){return de},setTest:function(K){K?j(i.DEPTH_TEST):oe(i.DEPTH_TEST)},setMask:function(K){ce!==K&&!R&&(i.depthMask(K),ce=K)},setFunc:function(K){if(de&&(K=b0[K]),le!==K){switch(K){case Xs:i.depthFunc(i.NEVER);break;case qs:i.depthFunc(i.ALWAYS);break;case Ys:i.depthFunc(i.LESS);break;case Pi:i.depthFunc(i.LEQUAL);break;case $s:i.depthFunc(i.EQUAL);break;case js:i.depthFunc(i.GEQUAL);break;case Ks:i.depthFunc(i.GREATER);break;case Zs:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}le=K}},setLocked:function(K){R=K},setClear:function(K){ee!==K&&(de&&(K=1-K),i.clearDepth(K),ee=K)},reset:function(){R=!1,ce=null,le=null,ee=null,de=!1}}}function r(){let R=!1,de=null,ce=null,le=null,ee=null,K=null,_e=null,Ne=null,rt=null;return{setTest:function(Je){R||(Je?j(i.STENCIL_TEST):oe(i.STENCIL_TEST))},setMask:function(Je){de!==Je&&!R&&(i.stencilMask(Je),de=Je)},setFunc:function(Je,nn,jt){(ce!==Je||le!==nn||ee!==jt)&&(i.stencilFunc(Je,nn,jt),ce=Je,le=nn,ee=jt)},setOp:function(Je,nn,jt){(K!==Je||_e!==nn||Ne!==jt)&&(i.stencilOp(Je,nn,jt),K=Je,_e=nn,Ne=jt)},setLocked:function(Je){R=Je},setClear:function(Je){rt!==Je&&(i.clearStencil(Je),rt=Je)},reset:function(){R=!1,de=null,ce=null,le=null,ee=null,K=null,_e=null,Ne=null,rt=null}}}const s=new t,a=new n,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,p=[],x=null,_=!1,m=null,f=null,w=null,S=null,A=null,P=null,y=null,L=new Ke(0,0,0),U=0,b=!1,M=null,D=null,z=null,k=null,W=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,se=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(X)[1]),q=se>=1):X.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),q=se>=2);let re=null,ae={};const Se=i.getParameter(i.SCISSOR_BOX),Q=i.getParameter(i.VIEWPORT),Ye=new dt().fromArray(Se),je=new dt().fromArray(Q);function Ze(R,de,ce,le){const ee=new Uint8Array(4),K=i.createTexture();i.bindTexture(R,K),i.texParameteri(R,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(R,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let _e=0;_e<ce;_e++)R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,ee):i.texImage2D(de+_e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ee);return K}const $={};$[i.TEXTURE_2D]=Ze(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=Ze(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=Ze(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=Ze(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(i.DEPTH_TEST),a.setFunc(Pi),He(!1),ke(Eo),j(i.CULL_FACE),it(vn);function j(R){u[R]!==!0&&(i.enable(R),u[R]=!0)}function oe(R){u[R]!==!1&&(i.disable(R),u[R]=!1)}function we(R,de){return d[R]!==de?(i.bindFramebuffer(R,de),d[R]=de,R===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=de),R===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=de),!0):!1}function be(R,de){let ce=p,le=!1;if(R){ce=h.get(de),ce===void 0&&(ce=[],h.set(de,ce));const ee=R.textures;if(ce.length!==ee.length||ce[0]!==i.COLOR_ATTACHMENT0){for(let K=0,_e=ee.length;K<_e;K++)ce[K]=i.COLOR_ATTACHMENT0+K;ce.length=ee.length,le=!0}}else ce[0]!==i.BACK&&(ce[0]=i.BACK,le=!0);le&&i.drawBuffers(ce)}function ze(R){return x!==R?(i.useProgram(R),x=R,!0):!1}const ht={[qn]:i.FUNC_ADD,[Wl]:i.FUNC_SUBTRACT,[Xl]:i.FUNC_REVERSE_SUBTRACT};ht[ql]=i.MIN,ht[Yl]=i.MAX;const Be={[$l]:i.ZERO,[jl]:i.ONE,[Kl]:i.SRC_COLOR,[Hs]:i.SRC_ALPHA,[nu]:i.SRC_ALPHA_SATURATE,[eu]:i.DST_COLOR,[Jl]:i.DST_ALPHA,[Zl]:i.ONE_MINUS_SRC_COLOR,[Ws]:i.ONE_MINUS_SRC_ALPHA,[tu]:i.ONE_MINUS_DST_COLOR,[Ql]:i.ONE_MINUS_DST_ALPHA,[iu]:i.CONSTANT_COLOR,[ru]:i.ONE_MINUS_CONSTANT_COLOR,[su]:i.CONSTANT_ALPHA,[au]:i.ONE_MINUS_CONSTANT_ALPHA};function it(R,de,ce,le,ee,K,_e,Ne,rt,Je){if(R===vn){_===!0&&(oe(i.BLEND),_=!1);return}if(_===!1&&(j(i.BLEND),_=!0),R!==Hl){if(R!==m||Je!==b){if((f!==qn||A!==qn)&&(i.blendEquation(i.FUNC_ADD),f=qn,A=qn),Je)switch(R){case wi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFunc(i.ONE,i.ONE);break;case To:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Ao:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:lt("WebGLState: Invalid blending: ",R);break}else switch(R){case wi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case To:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ao:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",R);break}w=null,S=null,P=null,y=null,L.set(0,0,0),U=0,m=R,b=Je}return}ee=ee||de,K=K||ce,_e=_e||le,(de!==f||ee!==A)&&(i.blendEquationSeparate(ht[de],ht[ee]),f=de,A=ee),(ce!==w||le!==S||K!==P||_e!==y)&&(i.blendFuncSeparate(Be[ce],Be[le],Be[K],Be[_e]),w=ce,S=le,P=K,y=_e),(Ne.equals(L)===!1||rt!==U)&&(i.blendColor(Ne.r,Ne.g,Ne.b,rt),L.copy(Ne),U=rt),m=R,b=!1}function C(R,de){R.side===sn?oe(i.CULL_FACE):j(i.CULL_FACE);let ce=R.side===Ct;de&&(ce=!ce),He(ce),R.blending===wi&&R.transparent===!1?it(vn):it(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),a.setFunc(R.depthFunc),a.setTest(R.depthTest),a.setMask(R.depthWrite),s.setMask(R.colorWrite);const le=R.stencilWrite;o.setTest(le),le&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),ge(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?j(i.SAMPLE_ALPHA_TO_COVERAGE):oe(i.SAMPLE_ALPHA_TO_COVERAGE)}function He(R){M!==R&&(R?i.frontFace(i.CW):i.frontFace(i.CCW),M=R)}function ke(R){R!==kl?(j(i.CULL_FACE),R!==D&&(R===Eo?i.cullFace(i.BACK):R===Vl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):oe(i.CULL_FACE),D=R}function $e(R){R!==z&&(q&&i.lineWidth(R),z=R)}function ge(R,de,ce){R?(j(i.POLYGON_OFFSET_FILL),(k!==de||W!==ce)&&(i.polygonOffset(de,ce),k=de,W=ce)):oe(i.POLYGON_OFFSET_FILL)}function tt(R){R?j(i.SCISSOR_TEST):oe(i.SCISSOR_TEST)}function ye(R){R===void 0&&(R=i.TEXTURE0+Y-1),re!==R&&(i.activeTexture(R),re=R)}function Le(R,de,ce){ce===void 0&&(re===null?ce=i.TEXTURE0+Y-1:ce=re);let le=ae[ce];le===void 0&&(le={type:void 0,texture:void 0},ae[ce]=le),(le.type!==R||le.texture!==de)&&(re!==ce&&(i.activeTexture(ce),re=ce),i.bindTexture(R,de||$[R]),le.type=R,le.texture=de)}function E(){const R=ae[re];R!==void 0&&R.type!==void 0&&(i.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function g(){try{i.compressedTexImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function T(){try{i.compressedTexImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function I(){try{i.texSubImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function G(){try{i.texSubImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function B(){try{i.compressedTexSubImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function te(){try{i.compressedTexSubImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function J(){try{i.texStorage2D(...arguments)}catch(R){R("WebGLState:",R)}}function me(){try{i.texStorage3D(...arguments)}catch(R){R("WebGLState:",R)}}function pe(){try{i.texImage2D(...arguments)}catch(R){R("WebGLState:",R)}}function Z(){try{i.texImage3D(...arguments)}catch(R){R("WebGLState:",R)}}function ne(R){Ye.equals(R)===!1&&(i.scissor(R.x,R.y,R.z,R.w),Ye.copy(R))}function Pe(R){je.equals(R)===!1&&(i.viewport(R.x,R.y,R.z,R.w),je.copy(R))}function Ae(R,de){let ce=l.get(de);ce===void 0&&(ce=new WeakMap,l.set(de,ce));let le=ce.get(R);le===void 0&&(le=i.getUniformBlockIndex(de,R.name),ce.set(R,le))}function fe(R,de){const le=l.get(de).get(R);c.get(de)!==le&&(i.uniformBlockBinding(de,le,R.__bindingPointIndex),c.set(de,le))}function Ue(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},re=null,ae={},d={},h=new WeakMap,p=[],x=null,_=!1,m=null,f=null,w=null,S=null,A=null,P=null,y=null,L=new Ke(0,0,0),U=0,b=!1,M=null,D=null,z=null,k=null,W=null,Ye.set(0,0,i.canvas.width,i.canvas.height),je.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:j,disable:oe,bindFramebuffer:we,drawBuffers:be,useProgram:ze,setBlending:it,setMaterial:C,setFlipSided:He,setCullFace:ke,setLineWidth:$e,setPolygonOffset:ge,setScissorTest:tt,activeTexture:ye,bindTexture:Le,unbindTexture:E,compressedTexImage2D:g,compressedTexImage3D:T,texImage2D:pe,texImage3D:Z,updateUBOMapping:Ae,uniformBlockBinding:fe,texStorage2D:J,texStorage3D:me,texSubImage2D:I,texSubImage3D:G,compressedTexSubImage2D:B,compressedTexSubImage3D:te,scissor:ne,viewport:Pe,reset:Ue}}function y0(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Re,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(E,g){return p?new OffscreenCanvas(E,g):sr("canvas")}function _(E,g,T){let I=1;const G=Le(E);if((G.width>T||G.height>T)&&(I=T/Math.max(G.width,G.height)),I<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const B=Math.floor(I*G.width),te=Math.floor(I*G.height);d===void 0&&(d=x(B,te));const J=g?x(B,te):d;return J.width=B,J.height=te,J.getContext("2d").drawImage(E,0,0,B,te),Fe("WebGLRenderer: Texture has been resized from ("+G.width+"x"+G.height+") to ("+B+"x"+te+")."),J}else return"data"in E&&Fe("WebGLRenderer: Image in DataTexture is too big ("+G.width+"x"+G.height+")."),E;return E}function m(E){return E.generateMipmaps}function f(E){i.generateMipmap(E)}function w(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(E,g,T,I,G=!1){if(E!==null){if(i[E]!==void 0)return i[E];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let B=g;if(g===i.RED&&(T===i.FLOAT&&(B=i.R32F),T===i.HALF_FLOAT&&(B=i.R16F),T===i.UNSIGNED_BYTE&&(B=i.R8)),g===i.RED_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.R8UI),T===i.UNSIGNED_SHORT&&(B=i.R16UI),T===i.UNSIGNED_INT&&(B=i.R32UI),T===i.BYTE&&(B=i.R8I),T===i.SHORT&&(B=i.R16I),T===i.INT&&(B=i.R32I)),g===i.RG&&(T===i.FLOAT&&(B=i.RG32F),T===i.HALF_FLOAT&&(B=i.RG16F),T===i.UNSIGNED_BYTE&&(B=i.RG8)),g===i.RG_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.RG8UI),T===i.UNSIGNED_SHORT&&(B=i.RG16UI),T===i.UNSIGNED_INT&&(B=i.RG32UI),T===i.BYTE&&(B=i.RG8I),T===i.SHORT&&(B=i.RG16I),T===i.INT&&(B=i.RG32I)),g===i.RGB_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.RGB8UI),T===i.UNSIGNED_SHORT&&(B=i.RGB16UI),T===i.UNSIGNED_INT&&(B=i.RGB32UI),T===i.BYTE&&(B=i.RGB8I),T===i.SHORT&&(B=i.RGB16I),T===i.INT&&(B=i.RGB32I)),g===i.RGBA_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.RGBA8UI),T===i.UNSIGNED_SHORT&&(B=i.RGBA16UI),T===i.UNSIGNED_INT&&(B=i.RGBA32UI),T===i.BYTE&&(B=i.RGBA8I),T===i.SHORT&&(B=i.RGBA16I),T===i.INT&&(B=i.RGBA32I)),g===i.RGB&&(T===i.UNSIGNED_INT_5_9_9_9_REV&&(B=i.RGB9_E5),T===i.UNSIGNED_INT_10F_11F_11F_REV&&(B=i.R11F_G11F_B10F)),g===i.RGBA){const te=G?Yr:qe.getTransfer(I);T===i.FLOAT&&(B=i.RGBA32F),T===i.HALF_FLOAT&&(B=i.RGBA16F),T===i.UNSIGNED_BYTE&&(B=te===et?i.SRGB8_ALPHA8:i.RGBA8),T===i.UNSIGNED_SHORT_4_4_4_4&&(B=i.RGBA4),T===i.UNSIGNED_SHORT_5_5_5_1&&(B=i.RGB5_A1)}return(B===i.R16F||B===i.R32F||B===i.RG16F||B===i.RG32F||B===i.RGBA16F||B===i.RGBA32F)&&e.get("EXT_color_buffer_float"),B}function A(E,g){let T;return E?g===null||g===Qn||g===nr?T=i.DEPTH24_STENCIL8:g===_n?T=i.DEPTH32F_STENCIL8:g===tr&&(T=i.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Qn||g===nr?T=i.DEPTH_COMPONENT24:g===_n?T=i.DEPTH_COMPONENT32F:g===tr&&(T=i.DEPTH_COMPONENT16),T}function P(E,g){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==kt&&E.minFilter!==qt?Math.log2(Math.max(g.width,g.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?g.mipmaps.length:1}function y(E){const g=E.target;g.removeEventListener("dispose",y),U(g),g.isVideoTexture&&u.delete(g)}function L(E){const g=E.target;g.removeEventListener("dispose",L),M(g)}function U(E){const g=n.get(E);if(g.__webglInit===void 0)return;const T=E.source,I=h.get(T);if(I){const G=I[g.__cacheKey];G.usedTimes--,G.usedTimes===0&&b(E),Object.keys(I).length===0&&h.delete(T)}n.remove(E)}function b(E){const g=n.get(E);i.deleteTexture(g.__webglTexture);const T=E.source,I=h.get(T);delete I[g.__cacheKey],a.memory.textures--}function M(E){const g=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let I=0;I<6;I++){if(Array.isArray(g.__webglFramebuffer[I]))for(let G=0;G<g.__webglFramebuffer[I].length;G++)i.deleteFramebuffer(g.__webglFramebuffer[I][G]);else i.deleteFramebuffer(g.__webglFramebuffer[I]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[I])}else{if(Array.isArray(g.__webglFramebuffer))for(let I=0;I<g.__webglFramebuffer.length;I++)i.deleteFramebuffer(g.__webglFramebuffer[I]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let I=0;I<g.__webglColorRenderbuffer.length;I++)g.__webglColorRenderbuffer[I]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[I]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const T=E.textures;for(let I=0,G=T.length;I<G;I++){const B=n.get(T[I]);B.__webglTexture&&(i.deleteTexture(B.__webglTexture),a.memory.textures--),n.remove(T[I])}n.remove(E)}let D=0;function z(){D=0}function k(){const E=D;return E>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),D+=1,E}function W(E){const g=[];return g.push(E.wrapS),g.push(E.wrapT),g.push(E.wrapR||0),g.push(E.magFilter),g.push(E.minFilter),g.push(E.anisotropy),g.push(E.internalFormat),g.push(E.format),g.push(E.type),g.push(E.generateMipmaps),g.push(E.premultiplyAlpha),g.push(E.flipY),g.push(E.unpackAlignment),g.push(E.colorSpace),g.join()}function Y(E,g){const T=n.get(E);if(E.isVideoTexture&&tt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&T.__version!==E.version){const I=E.image;if(I===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(I.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{$(T,E,g);return}}else E.isExternalTexture&&(T.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,T.__webglTexture,i.TEXTURE0+g)}function q(E,g){const T=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&T.__version!==E.version){$(T,E,g);return}else E.isExternalTexture&&(T.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,T.__webglTexture,i.TEXTURE0+g)}function se(E,g){const T=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&T.__version!==E.version){$(T,E,g);return}t.bindTexture(i.TEXTURE_3D,T.__webglTexture,i.TEXTURE0+g)}function X(E,g){const T=n.get(E);if(E.version>0&&T.__version!==E.version){j(T,E,g);return}t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+g)}const re={[ea]:i.REPEAT,[gn]:i.CLAMP_TO_EDGE,[ta]:i.MIRRORED_REPEAT},ae={[kt]:i.NEAREST,[xu]:i.NEAREST_MIPMAP_NEAREST,[xr]:i.NEAREST_MIPMAP_LINEAR,[qt]:i.LINEAR,[cs]:i.LINEAR_MIPMAP_NEAREST,[jn]:i.LINEAR_MIPMAP_LINEAR},Se={[bu]:i.NEVER,[wu]:i.ALWAYS,[Su]:i.LESS,[Gc]:i.LEQUAL,[yu]:i.EQUAL,[Au]:i.GEQUAL,[Eu]:i.GREATER,[Tu]:i.NOTEQUAL};function Q(E,g){if(g.type===_n&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===qt||g.magFilter===cs||g.magFilter===xr||g.magFilter===jn||g.minFilter===qt||g.minFilter===cs||g.minFilter===xr||g.minFilter===jn)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,re[g.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,re[g.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,re[g.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,ae[g.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,ae[g.minFilter]),g.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,Se[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===kt||g.minFilter!==xr&&g.minFilter!==jn||g.type===_n&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){const T=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function Ye(E,g){let T=!1;E.__webglInit===void 0&&(E.__webglInit=!0,g.addEventListener("dispose",y));const I=g.source;let G=h.get(I);G===void 0&&(G={},h.set(I,G));const B=W(g);if(B!==E.__cacheKey){G[B]===void 0&&(G[B]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,T=!0),G[B].usedTimes++;const te=G[E.__cacheKey];te!==void 0&&(G[E.__cacheKey].usedTimes--,te.usedTimes===0&&b(g)),E.__cacheKey=B,E.__webglTexture=G[B].texture}return T}function je(E,g,T){return Math.floor(Math.floor(E/T)/g)}function Ze(E,g,T,I){const B=E.updateRanges;if(B.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,T,I,g.data);else{B.sort((Z,ne)=>Z.start-ne.start);let te=0;for(let Z=1;Z<B.length;Z++){const ne=B[te],Pe=B[Z],Ae=ne.start+ne.count,fe=je(Pe.start,g.width,4),Ue=je(ne.start,g.width,4);Pe.start<=Ae+1&&fe===Ue&&je(Pe.start+Pe.count-1,g.width,4)===fe?ne.count=Math.max(ne.count,Pe.start+Pe.count-ne.start):(++te,B[te]=Pe)}B.length=te+1;const J=i.getParameter(i.UNPACK_ROW_LENGTH),me=i.getParameter(i.UNPACK_SKIP_PIXELS),pe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let Z=0,ne=B.length;Z<ne;Z++){const Pe=B[Z],Ae=Math.floor(Pe.start/4),fe=Math.ceil(Pe.count/4),Ue=Ae%g.width,R=Math.floor(Ae/g.width),de=fe,ce=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ue),i.pixelStorei(i.UNPACK_SKIP_ROWS,R),t.texSubImage2D(i.TEXTURE_2D,0,Ue,R,de,ce,T,I,g.data)}E.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,J),i.pixelStorei(i.UNPACK_SKIP_PIXELS,me),i.pixelStorei(i.UNPACK_SKIP_ROWS,pe)}}function $(E,g,T){let I=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(I=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(I=i.TEXTURE_3D);const G=Ye(E,g),B=g.source;t.bindTexture(I,E.__webglTexture,i.TEXTURE0+T);const te=n.get(B);if(B.version!==te.__version||G===!0){t.activeTexture(i.TEXTURE0+T);const J=qe.getPrimaries(qe.workingColorSpace),me=g.colorSpace===Un?null:qe.getPrimaries(g.colorSpace),pe=g.colorSpace===Un||J===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe);let Z=_(g.image,!1,r.maxTextureSize);Z=ye(g,Z);const ne=s.convert(g.format,g.colorSpace),Pe=s.convert(g.type);let Ae=S(g.internalFormat,ne,Pe,g.colorSpace,g.isVideoTexture);Q(I,g);let fe;const Ue=g.mipmaps,R=g.isVideoTexture!==!0,de=te.__version===void 0||G===!0,ce=B.dataReady,le=P(g,Z);if(g.isDepthTexture)Ae=A(g.format===rr,g.type),de&&(R?t.texStorage2D(i.TEXTURE_2D,1,Ae,Z.width,Z.height):t.texImage2D(i.TEXTURE_2D,0,Ae,Z.width,Z.height,0,ne,Pe,null));else if(g.isDataTexture)if(Ue.length>0){R&&de&&t.texStorage2D(i.TEXTURE_2D,le,Ae,Ue[0].width,Ue[0].height);for(let ee=0,K=Ue.length;ee<K;ee++)fe=Ue[ee],R?ce&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,fe.width,fe.height,ne,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,ee,Ae,fe.width,fe.height,0,ne,Pe,fe.data);g.generateMipmaps=!1}else R?(de&&t.texStorage2D(i.TEXTURE_2D,le,Ae,Z.width,Z.height),ce&&Ze(g,Z,ne,Pe)):t.texImage2D(i.TEXTURE_2D,0,Ae,Z.width,Z.height,0,ne,Pe,Z.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){R&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Ae,Ue[0].width,Ue[0].height,Z.depth);for(let ee=0,K=Ue.length;ee<K;ee++)if(fe=Ue[ee],g.format!==tn)if(ne!==null)if(R){if(ce)if(g.layerUpdates.size>0){const _e=ec(fe.width,fe.height,g.format,g.type);for(const Ne of g.layerUpdates){const rt=fe.data.subarray(Ne*_e/fe.data.BYTES_PER_ELEMENT,(Ne+1)*_e/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Ne,fe.width,fe.height,1,ne,rt)}g.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,fe.width,fe.height,Z.depth,ne,fe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Ae,fe.width,fe.height,Z.depth,0,fe.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else R?ce&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,fe.width,fe.height,Z.depth,ne,Pe,fe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Ae,fe.width,fe.height,Z.depth,0,ne,Pe,fe.data)}else{R&&de&&t.texStorage2D(i.TEXTURE_2D,le,Ae,Ue[0].width,Ue[0].height);for(let ee=0,K=Ue.length;ee<K;ee++)fe=Ue[ee],g.format!==tn?ne!==null?R?ce&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,fe.width,fe.height,ne,fe.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Ae,fe.width,fe.height,0,fe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):R?ce&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,fe.width,fe.height,ne,Pe,fe.data):t.texImage2D(i.TEXTURE_2D,ee,Ae,fe.width,fe.height,0,ne,Pe,fe.data)}else if(g.isDataArrayTexture)if(R){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Ae,Z.width,Z.height,Z.depth),ce)if(g.layerUpdates.size>0){const ee=ec(Z.width,Z.height,g.format,g.type);for(const K of g.layerUpdates){const _e=Z.data.subarray(K*ee/Z.data.BYTES_PER_ELEMENT,(K+1)*ee/Z.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,Z.width,Z.height,1,ne,Pe,_e)}g.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ne,Pe,Z.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,Z.width,Z.height,Z.depth,0,ne,Pe,Z.data);else if(g.isData3DTexture)R?(de&&t.texStorage3D(i.TEXTURE_3D,le,Ae,Z.width,Z.height,Z.depth),ce&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ne,Pe,Z.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,Z.width,Z.height,Z.depth,0,ne,Pe,Z.data);else if(g.isFramebufferTexture){if(de)if(R)t.texStorage2D(i.TEXTURE_2D,le,Ae,Z.width,Z.height);else{let ee=Z.width,K=Z.height;for(let _e=0;_e<le;_e++)t.texImage2D(i.TEXTURE_2D,_e,Ae,ee,K,0,ne,Pe,null),ee>>=1,K>>=1}}else if(Ue.length>0){if(R&&de){const ee=Le(Ue[0]);t.texStorage2D(i.TEXTURE_2D,le,Ae,ee.width,ee.height)}for(let ee=0,K=Ue.length;ee<K;ee++)fe=Ue[ee],R?ce&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ne,Pe,fe):t.texImage2D(i.TEXTURE_2D,ee,Ae,ne,Pe,fe);g.generateMipmaps=!1}else if(R){if(de){const ee=Le(Z);t.texStorage2D(i.TEXTURE_2D,le,Ae,ee.width,ee.height)}ce&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ne,Pe,Z)}else t.texImage2D(i.TEXTURE_2D,0,Ae,ne,Pe,Z);m(g)&&f(I),te.__version=B.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function j(E,g,T){if(g.image.length!==6)return;const I=Ye(E,g),G=g.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+T);const B=n.get(G);if(G.version!==B.__version||I===!0){t.activeTexture(i.TEXTURE0+T);const te=qe.getPrimaries(qe.workingColorSpace),J=g.colorSpace===Un?null:qe.getPrimaries(g.colorSpace),me=g.colorSpace===Un||te===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const pe=g.isCompressedTexture||g.image[0].isCompressedTexture,Z=g.image[0]&&g.image[0].isDataTexture,ne=[];for(let K=0;K<6;K++)!pe&&!Z?ne[K]=_(g.image[K],!0,r.maxCubemapSize):ne[K]=Z?g.image[K].image:g.image[K],ne[K]=ye(g,ne[K]);const Pe=ne[0],Ae=s.convert(g.format,g.colorSpace),fe=s.convert(g.type),Ue=S(g.internalFormat,Ae,fe,g.colorSpace),R=g.isVideoTexture!==!0,de=B.__version===void 0||I===!0,ce=G.dataReady;let le=P(g,Pe);Q(i.TEXTURE_CUBE_MAP,g);let ee;if(pe){R&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ue,Pe.width,Pe.height);for(let K=0;K<6;K++){ee=ne[K].mipmaps;for(let _e=0;_e<ee.length;_e++){const Ne=ee[_e];g.format!==tn?Ae!==null?R?ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,0,0,Ne.width,Ne.height,Ae,Ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,Ue,Ne.width,Ne.height,0,Ne.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,0,0,Ne.width,Ne.height,Ae,fe,Ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e,Ue,Ne.width,Ne.height,0,Ae,fe,Ne.data)}}}else{if(ee=g.mipmaps,R&&de){ee.length>0&&le++;const K=Le(ne[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ue,K.width,K.height)}for(let K=0;K<6;K++)if(Z){R?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ne[K].width,ne[K].height,Ae,fe,ne[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ue,ne[K].width,ne[K].height,0,Ae,fe,ne[K].data);for(let _e=0;_e<ee.length;_e++){const rt=ee[_e].image[K].image;R?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,0,0,rt.width,rt.height,Ae,fe,rt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,Ue,rt.width,rt.height,0,Ae,fe,rt.data)}}else{R?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ae,fe,ne[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ue,Ae,fe,ne[K]);for(let _e=0;_e<ee.length;_e++){const Ne=ee[_e];R?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,0,0,Ae,fe,Ne.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,_e+1,Ue,Ae,fe,Ne.image[K])}}}m(g)&&f(i.TEXTURE_CUBE_MAP),B.__version=G.version,g.onUpdate&&g.onUpdate(g)}E.__version=g.version}function oe(E,g,T,I,G,B){const te=s.convert(T.format,T.colorSpace),J=s.convert(T.type),me=S(T.internalFormat,te,J,T.colorSpace),pe=n.get(g),Z=n.get(T);if(Z.__renderTarget=g,!pe.__hasExternalTextures){const ne=Math.max(1,g.width>>B),Pe=Math.max(1,g.height>>B);G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?t.texImage3D(G,B,me,ne,Pe,g.depth,0,te,J,null):t.texImage2D(G,B,me,ne,Pe,0,te,J,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),ge(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,I,G,Z.__webglTexture,0,$e(g)):(G===i.TEXTURE_2D||G>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&G<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,I,G,Z.__webglTexture,B),t.bindFramebuffer(i.FRAMEBUFFER,null)}function we(E,g,T){if(i.bindRenderbuffer(i.RENDERBUFFER,E),g.depthBuffer){const I=g.depthTexture,G=I&&I.isDepthTexture?I.type:null,B=A(g.stencilBuffer,G),te=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=$e(g);ge(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,B,g.width,g.height):T?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,B,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,B,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,E)}else{const I=g.textures;for(let G=0;G<I.length;G++){const B=I[G],te=s.convert(B.format,B.colorSpace),J=s.convert(B.type),me=S(B.internalFormat,te,J,B.colorSpace),pe=$e(g);T&&ge(g)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,me,g.width,g.height):ge(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pe,me,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,me,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(E,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const I=n.get(g.depthTexture);I.__renderTarget=g,(!I.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y(g.depthTexture,0);const G=I.__webglTexture,B=$e(g);if(g.depthTexture.format===ir)ge(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,G,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,G,0);else if(g.depthTexture.format===rr)ge(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,G,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,G,0);else throw new Error("Unknown depthTexture format")}function ze(E){const g=n.get(E),T=E.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==E.depthTexture){const I=E.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),I){const G=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,I.removeEventListener("dispose",G)};I.addEventListener("dispose",G),g.__depthDisposeCallback=G}g.__boundDepthTexture=I}if(E.depthTexture&&!g.__autoAllocateDepthBuffer){if(T)throw new Error("target.depthTexture not supported in Cube render targets");const I=E.texture.mipmaps;I&&I.length>0?be(g.__webglFramebuffer[0],E):be(g.__webglFramebuffer,E)}else if(T){g.__webglDepthbuffer=[];for(let I=0;I<6;I++)if(t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[I]),g.__webglDepthbuffer[I]===void 0)g.__webglDepthbuffer[I]=i.createRenderbuffer(),we(g.__webglDepthbuffer[I],E,!1);else{const G=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=g.__webglDepthbuffer[I];i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,B)}}else{const I=E.texture.mipmaps;if(I&&I.length>0?t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),we(g.__webglDepthbuffer,E,!1);else{const G=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,B)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(E,g,T){const I=n.get(E);g!==void 0&&oe(I.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),T!==void 0&&ze(E)}function Be(E){const g=E.texture,T=n.get(E),I=n.get(g);E.addEventListener("dispose",L);const G=E.textures,B=E.isWebGLCubeRenderTarget===!0,te=G.length>1;if(te||(I.__webglTexture===void 0&&(I.__webglTexture=i.createTexture()),I.__version=g.version,a.memory.textures++),B){T.__webglFramebuffer=[];for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0){T.__webglFramebuffer[J]=[];for(let me=0;me<g.mipmaps.length;me++)T.__webglFramebuffer[J][me]=i.createFramebuffer()}else T.__webglFramebuffer[J]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){T.__webglFramebuffer=[];for(let J=0;J<g.mipmaps.length;J++)T.__webglFramebuffer[J]=i.createFramebuffer()}else T.__webglFramebuffer=i.createFramebuffer();if(te)for(let J=0,me=G.length;J<me;J++){const pe=n.get(G[J]);pe.__webglTexture===void 0&&(pe.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&ge(E)===!1){T.__webglMultisampledFramebuffer=i.createFramebuffer(),T.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let J=0;J<G.length;J++){const me=G[J];T.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,T.__webglColorRenderbuffer[J]);const pe=s.convert(me.format,me.colorSpace),Z=s.convert(me.type),ne=S(me.internalFormat,pe,Z,me.colorSpace,E.isXRRenderTarget===!0),Pe=$e(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,ne,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,T.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(T.__webglDepthRenderbuffer=i.createRenderbuffer(),we(T.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(B){t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture),Q(i.TEXTURE_CUBE_MAP,g);for(let J=0;J<6;J++)if(g.mipmaps&&g.mipmaps.length>0)for(let me=0;me<g.mipmaps.length;me++)oe(T.__webglFramebuffer[J][me],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,me);else oe(T.__webglFramebuffer[J],E,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(g)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(te){for(let J=0,me=G.length;J<me;J++){const pe=G[J],Z=n.get(pe);let ne=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ne=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,Z.__webglTexture),Q(ne,pe),oe(T.__webglFramebuffer,E,pe,i.COLOR_ATTACHMENT0+J,ne,0),m(pe)&&f(ne)}t.unbindTexture()}else{let J=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(J=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(J,I.__webglTexture),Q(J,g),g.mipmaps&&g.mipmaps.length>0)for(let me=0;me<g.mipmaps.length;me++)oe(T.__webglFramebuffer[me],E,g,i.COLOR_ATTACHMENT0,J,me);else oe(T.__webglFramebuffer,E,g,i.COLOR_ATTACHMENT0,J,0);m(g)&&f(J),t.unbindTexture()}E.depthBuffer&&ze(E)}function it(E){const g=E.textures;for(let T=0,I=g.length;T<I;T++){const G=g[T];if(m(G)){const B=w(E),te=n.get(G).__webglTexture;t.bindTexture(B,te),f(B),t.unbindTexture()}}}const C=[],He=[];function ke(E){if(E.samples>0){if(ge(E)===!1){const g=E.textures,T=E.width,I=E.height;let G=i.COLOR_BUFFER_BIT;const B=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=n.get(E),J=g.length>1;if(J)for(let pe=0;pe<g.length;pe++)t.bindFramebuffer(i.FRAMEBUFFER,te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,te.__webglMultisampledFramebuffer);const me=E.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,te.__webglFramebuffer);for(let pe=0;pe<g.length;pe++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(G|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(G|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,te.__webglColorRenderbuffer[pe]);const Z=n.get(g[pe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Z,0)}i.blitFramebuffer(0,0,T,I,0,0,T,I,G,i.NEAREST),c===!0&&(C.length=0,He.length=0,C.push(i.COLOR_ATTACHMENT0+pe),E.depthBuffer&&E.resolveDepthBuffer===!1&&(C.push(B),He.push(B),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,He)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,C))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let pe=0;pe<g.length;pe++){t.bindFramebuffer(i.FRAMEBUFFER,te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.RENDERBUFFER,te.__webglColorRenderbuffer[pe]);const Z=n.get(g[pe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+pe,i.TEXTURE_2D,Z,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,te.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const g=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function $e(E){return Math.min(r.maxSamples,E.samples)}function ge(E){const g=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function tt(E){const g=a.render.frame;u.get(E)!==g&&(u.set(E,g),E.update())}function ye(E,g){const T=E.colorSpace,I=E.format,G=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||T!==Ui&&T!==Un&&(qe.getTransfer(T)===et?(I!==tn||G!==Sn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",T)),g}function Le(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=z,this.setTexture2D=Y,this.setTexture2DArray=q,this.setTexture3D=se,this.setTextureCube=X,this.rebindTextures=ht,this.setupRenderTarget=Be,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=ze,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=ge}function E0(i,e){function t(n,r=Un){let s;const a=qe.getTransfer(r);if(n===Sn)return i.UNSIGNED_BYTE;if(n===Va)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ga)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Oc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===zc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Nc)return i.BYTE;if(n===Fc)return i.SHORT;if(n===tr)return i.UNSIGNED_SHORT;if(n===ka)return i.INT;if(n===Qn)return i.UNSIGNED_INT;if(n===_n)return i.FLOAT;if(n===Fi)return i.HALF_FLOAT;if(n===Bc)return i.ALPHA;if(n===kc)return i.RGB;if(n===tn)return i.RGBA;if(n===ir)return i.DEPTH_COMPONENT;if(n===rr)return i.DEPTH_STENCIL;if(n===Vc)return i.RED;if(n===Ha)return i.RED_INTEGER;if(n===Wa)return i.RG;if(n===Xa)return i.RG_INTEGER;if(n===qa)return i.RGBA_INTEGER;if(n===kr||n===Vr||n===Gr||n===Hr)if(a===et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Vr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===na||n===ia||n===ra||n===sa)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===na)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ia)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ra)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===aa||n===oa||n===ca)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===aa||n===oa)return a===et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===ca)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===la||n===ua||n===da||n===ha||n===fa||n===pa||n===ma||n===xa||n===ga||n===_a||n===va||n===Ma||n===ba||n===Sa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===la)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ua)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===da)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ha)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===fa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ma)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ga)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_a)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===va)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ma)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ba)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sa)return a===et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ya||n===Ea||n===Ta)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ya)return a===et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ea)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ta)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Aa||n===wa||n===Ca||n===Ra)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Aa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===wa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ca)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ra)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===nr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const T0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,A0=`
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

}`;class w0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new el(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new $t({vertexShader:T0,fragmentShader:A0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Mt(new ts(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class C0 extends Oi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,p=null,x=null;const _=typeof XRWebGLBinding<"u",m=new w0,f={},w=t.getContextAttributes();let S=null,A=null;const P=[],y=[],L=new Re;let U=null;const b=new Xt;b.viewport=new dt;const M=new Xt;M.viewport=new dt;const D=[b,M],z=new Wd;let k=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let j=P[$];return j===void 0&&(j=new Rs,P[$]=j),j.getTargetRaySpace()},this.getControllerGrip=function($){let j=P[$];return j===void 0&&(j=new Rs,P[$]=j),j.getGripSpace()},this.getHand=function($){let j=P[$];return j===void 0&&(j=new Rs,P[$]=j),j.getHandSpace()};function Y($){const j=y.indexOf($.inputSource);if(j===-1)return;const oe=P[j];oe!==void 0&&(oe.update($.inputSource,$.frame,l||a),oe.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){r.removeEventListener("select",Y),r.removeEventListener("selectstart",Y),r.removeEventListener("selectend",Y),r.removeEventListener("squeeze",Y),r.removeEventListener("squeezestart",Y),r.removeEventListener("squeezeend",Y),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",se);for(let $=0;$<P.length;$++){const j=y[$];j!==null&&(y[$]=null,P[$].disconnect(j))}k=null,W=null,m.reset();for(const $ in f)delete f[$];e.setRenderTarget(S),p=null,h=null,d=null,r=null,A=null,Ze.stop(),n.isPresenting=!1,e.setPixelRatio(U),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",Y),r.addEventListener("selectstart",Y),r.addEventListener("selectend",Y),r.addEventListener("squeeze",Y),r.addEventListener("squeezestart",Y),r.addEventListener("squeezeend",Y),r.addEventListener("end",q),r.addEventListener("inputsourceschange",se),w.xrCompatible!==!0&&await t.makeXRCompatible(),U=e.getPixelRatio(),e.getSize(L),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let oe=null,we=null,be=null;w.depth&&(be=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,oe=w.stencil?rr:ir,we=w.stencil?nr:Qn);const ze={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};d=this.getBinding(),h=d.createProjectionLayer(ze),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),A=new ei(h.textureWidth,h.textureHeight,{format:tn,type:Sn,depthTexture:new Qc(h.textureWidth,h.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,oe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const oe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,oe),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),A=new ei(p.framebufferWidth,p.framebufferHeight,{format:tn,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Ze.setContext(r),Ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function se($){for(let j=0;j<$.removed.length;j++){const oe=$.removed[j],we=y.indexOf(oe);we>=0&&(y[we]=null,P[we].disconnect(oe))}for(let j=0;j<$.added.length;j++){const oe=$.added[j];let we=y.indexOf(oe);if(we===-1){for(let ze=0;ze<P.length;ze++)if(ze>=y.length){y.push(oe),we=ze;break}else if(y[ze]===null){y[ze]=oe,we=ze;break}if(we===-1)break}const be=P[we];be&&be.connect(oe)}}const X=new F,re=new F;function ae($,j,oe){X.setFromMatrixPosition(j.matrixWorld),re.setFromMatrixPosition(oe.matrixWorld);const we=X.distanceTo(re),be=j.projectionMatrix.elements,ze=oe.projectionMatrix.elements,ht=be[14]/(be[10]-1),Be=be[14]/(be[10]+1),it=(be[9]+1)/be[5],C=(be[9]-1)/be[5],He=(be[8]-1)/be[0],ke=(ze[8]+1)/ze[0],$e=ht*He,ge=ht*ke,tt=we/(-He+ke),ye=tt*-He;if(j.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ye),$.translateZ(tt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),be[10]===-1)$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const Le=ht+tt,E=Be+tt,g=$e-ye,T=ge+(we-ye),I=it*Be/E*Le,G=C*Be/E*Le;$.projectionMatrix.makePerspective(g,T,I,G,Le,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Se($,j){j===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(j.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let j=$.near,oe=$.far;m.texture!==null&&(m.depthNear>0&&(j=m.depthNear),m.depthFar>0&&(oe=m.depthFar)),z.near=M.near=b.near=j,z.far=M.far=b.far=oe,(k!==z.near||W!==z.far)&&(r.updateRenderState({depthNear:z.near,depthFar:z.far}),k=z.near,W=z.far),z.layers.mask=$.layers.mask|6,b.layers.mask=z.layers.mask&3,M.layers.mask=z.layers.mask&5;const we=$.parent,be=z.cameras;Se(z,we);for(let ze=0;ze<be.length;ze++)Se(be[ze],we);be.length===2?ae(z,b,M):z.projectionMatrix.copy(b.projectionMatrix),Q($,z,we)};function Q($,j,oe){oe===null?$.matrix.copy(j.matrixWorld):($.matrix.copy(oe.matrixWorld),$.matrix.invert(),$.matrix.multiply(j.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=or*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(h===null&&p===null))return c},this.setFoveation=function($){c=$,h!==null&&(h.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(z)},this.getCameraTexture=function($){return f[$]};let Ye=null;function je($,j){if(u=j.getViewerPose(l||a),x=j,u!==null){const oe=u.views;p!==null&&(e.setRenderTargetFramebuffer(A,p.framebuffer),e.setRenderTarget(A));let we=!1;oe.length!==z.cameras.length&&(z.cameras.length=0,we=!0);for(let Be=0;Be<oe.length;Be++){const it=oe[Be];let C=null;if(p!==null)C=p.getViewport(it);else{const ke=d.getViewSubImage(h,it);C=ke.viewport,Be===0&&(e.setRenderTargetTextures(A,ke.colorTexture,ke.depthStencilTexture),e.setRenderTarget(A))}let He=D[Be];He===void 0&&(He=new Xt,He.layers.enable(Be),He.viewport=new dt,D[Be]=He),He.matrix.fromArray(it.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(it.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(C.x,C.y,C.width,C.height),Be===0&&(z.matrix.copy(He.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),we===!0&&z.cameras.push(He)}const be=r.enabledFeatures;if(be&&be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=n.getBinding();const Be=d.getDepthInformation(oe[0]);Be&&Be.isValid&&Be.texture&&m.init(Be,r.renderState)}if(be&&be.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let Be=0;Be<oe.length;Be++){const it=oe[Be].camera;if(it){let C=f[it];C||(C=new el,f[it]=C);const He=d.getCameraImage(it);C.sourceTexture=He}}}}for(let oe=0;oe<P.length;oe++){const we=y[oe],be=P[oe];we!==null&&be!==void 0&&be.update(we,j,l||a)}Ye&&Ye($,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),x=null}const Ze=new rl;Ze.setAnimationLoop(je),this.setAnimationLoop=function($){Ye=$},this.dispose=function(){}}}const Wn=new yn,R0=new ut;function P0(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,$c(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,w,S,A){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),d(m,f)):f.isMeshPhongMaterial?(s(m,f),u(m,f)):f.isMeshStandardMaterial?(s(m,f),h(m,f),f.isMeshPhysicalMaterial&&p(m,f,A)):f.isMeshMatcapMaterial?(s(m,f),x(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,w,S):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ct&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ct&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const w=e.get(f),S=w.envMap,A=w.envMapRotation;S&&(m.envMap.value=S,Wn.copy(A),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),m.envMapRotation.value.setFromMatrix4(R0.makeRotationFromEuler(Wn)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,w,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=S*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function h(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ct&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const w=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function L0(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,S){const A=S.program;n.uniformBlockBinding(w,A)}function l(w,S){let A=r[w.id];A===void 0&&(x(w),A=u(w),r[w.id]=A,w.addEventListener("dispose",m));const P=S.program;n.updateUBOMapping(w,P);const y=e.render.frame;s[w.id]!==y&&(h(w),s[w.id]=y)}function u(w){const S=d();w.__bindingPointIndex=S;const A=i.createBuffer(),P=w.__size,y=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,P,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,A),A}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(w){const S=r[w.id],A=w.uniforms,P=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let y=0,L=A.length;y<L;y++){const U=Array.isArray(A[y])?A[y]:[A[y]];for(let b=0,M=U.length;b<M;b++){const D=U[b];if(p(D,y,b,P)===!0){const z=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let W=0;for(let Y=0;Y<k.length;Y++){const q=k[Y],se=_(q);typeof q=="number"||typeof q=="boolean"?(D.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,z+W,D.__data)):q.isMatrix3?(D.__data[0]=q.elements[0],D.__data[1]=q.elements[1],D.__data[2]=q.elements[2],D.__data[3]=0,D.__data[4]=q.elements[3],D.__data[5]=q.elements[4],D.__data[6]=q.elements[5],D.__data[7]=0,D.__data[8]=q.elements[6],D.__data[9]=q.elements[7],D.__data[10]=q.elements[8],D.__data[11]=0):(q.toArray(D.__data,W),W+=se.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(w,S,A,P){const y=w.value,L=S+"_"+A;if(P[L]===void 0)return typeof y=="number"||typeof y=="boolean"?P[L]=y:P[L]=y.clone(),!0;{const U=P[L];if(typeof y=="number"||typeof y=="boolean"){if(U!==y)return P[L]=y,!0}else if(U.equals(y)===!1)return U.copy(y),!0}return!1}function x(w){const S=w.uniforms;let A=0;const P=16;for(let L=0,U=S.length;L<U;L++){const b=Array.isArray(S[L])?S[L]:[S[L]];for(let M=0,D=b.length;M<D;M++){const z=b[M],k=Array.isArray(z.value)?z.value:[z.value];for(let W=0,Y=k.length;W<Y;W++){const q=k[W],se=_(q),X=A%P,re=X%se.boundary,ae=X+re;A+=re,ae!==0&&P-ae<se.storage&&(A+=P-ae),z.__data=new Float32Array(se.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=A,A+=se.storage}}}const y=A%P;return y>0&&(A+=P-y),w.__size=A,w.__cache={},this}function _(w){const S={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(S.boundary=4,S.storage=4):w.isVector2?(S.boundary=8,S.storage=8):w.isVector3||w.isColor?(S.boundary=16,S.storage=12):w.isVector4?(S.boundary=16,S.storage=16):w.isMatrix3?(S.boundary=48,S.storage=48):w.isMatrix4?(S.boundary=64,S.storage=64):w.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Fe("WebGLRenderer: Unsupported uniform value type.",w),S}function m(w){const S=w.target;S.removeEventListener("dispose",m);const A=a.indexOf(S.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function f(){for(const w in r)i.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:c,update:l,dispose:f}}const D0=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let pn=null;function U0(){return pn===null&&(pn=new gd(D0,32,32,Wa,Fi),pn.minFilter=qt,pn.magFilter=qt,pn.wrapS=gn,pn.wrapT=gn,pn.generateMipmaps=!1,pn.needsUpdate=!0),pn}class I0{constructor(e={}){const{canvas:t=Cu(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const x=new Set([qa,Xa,Ha]),_=new Set([Sn,Qn,tr,nr,Va,Ga]),m=new Uint32Array(4),f=new Int32Array(4);let w=null,S=null;const A=[],P=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Nn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let L=!1;this._outputColorSpace=Bt;let U=0,b=0,M=null,D=-1,z=null;const k=new dt,W=new dt;let Y=null;const q=new Ke(0);let se=0,X=t.width,re=t.height,ae=1,Se=null,Q=null;const Ye=new dt(0,0,X,re),je=new dt(0,0,X,re);let Ze=!1;const $=new Zc;let j=!1,oe=!1;const we=new ut,be=new F,ze=new dt,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Be=!1;function it(){return M===null?ae:1}let C=n;function He(v,N){return t.getContext(v,N)}try{const v={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ba}`),t.addEventListener("webglcontextlost",ee,!1),t.addEventListener("webglcontextrestored",K,!1),t.addEventListener("webglcontextcreationerror",_e,!1),C===null){const N="webgl2";if(C=He(N,v),C===null)throw He(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw v("WebGLRenderer: "+v.message),v}let ke,$e,ge,tt,ye,Le,E,g,T,I,G,B,te,J,me,pe,Z,ne,Pe,Ae,fe,Ue,R,de;function ce(){ke=new Gp(C),ke.init(),Ue=new E0(C,ke),$e=new Up(C,ke,e,Ue),ge=new S0(C,ke),$e.reversedDepthBuffer&&h&&ge.buffers.depth.setReversed(!0),tt=new Xp(C),ye=new l0,Le=new y0(C,ke,ge,ye,$e,Ue,tt),E=new Np(y),g=new Vp(y),T=new $d(C),R=new Lp(C,T),I=new Hp(C,T,tt,R),G=new Yp(C,I,T,tt),Pe=new qp(C,$e,Le),pe=new Ip(ye),B=new c0(y,E,g,ke,$e,R,pe),te=new P0(y,ye),J=new d0,me=new g0(ke),ne=new Pp(y,E,g,ge,G,p,c),Z=new M0(y,G,$e),de=new L0(C,tt,$e,ge),Ae=new Dp(C,ke,tt),fe=new Wp(C,ke,tt),tt.programs=B.programs,y.capabilities=$e,y.extensions=ke,y.properties=ye,y.renderLists=J,y.shadowMap=Z,y.state=ge,y.info=tt}ce();const le=new C0(y,C);this.xr=le,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const v=ke.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=ke.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(v){v!==void 0&&(ae=v,this.setSize(X,re,!1))},this.getSize=function(v){return v.set(X,re)},this.setSize=function(v,N,V=!0){if(le.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}X=v,re=N,t.width=Math.floor(v*ae),t.height=Math.floor(N*ae),V===!0&&(t.style.width=v+"px",t.style.height=N+"px"),this.setViewport(0,0,v,N)},this.getDrawingBufferSize=function(v){return v.set(X*ae,re*ae).floor()},this.setDrawingBufferSize=function(v,N,V){X=v,re=N,ae=V,t.width=Math.floor(v*V),t.height=Math.floor(N*V),this.setViewport(0,0,v,N)},this.getCurrentViewport=function(v){return v.copy(k)},this.getViewport=function(v){return v.copy(Ye)},this.setViewport=function(v,N,V,H){v.isVector4?Ye.set(v.x,v.y,v.z,v.w):Ye.set(v,N,V,H),ge.viewport(k.copy(Ye).multiplyScalar(ae).round())},this.getScissor=function(v){return v.copy(je)},this.setScissor=function(v,N,V,H){v.isVector4?je.set(v.x,v.y,v.z,v.w):je.set(v,N,V,H),ge.scissor(W.copy(je).multiplyScalar(ae).round())},this.getScissorTest=function(){return Ze},this.setScissorTest=function(v){ge.setScissorTest(Ze=v)},this.setOpaqueSort=function(v){Se=v},this.setTransparentSort=function(v){Q=v},this.getClearColor=function(v){return v.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(v=!0,N=!0,V=!0){let H=0;if(v){let O=!1;if(M!==null){const ie=M.texture.format;O=x.has(ie)}if(O){const ie=M.texture.type,he=_.has(ie),ve=ne.getClearColor(),xe=ne.getClearAlpha(),Ce=ve.r,De=ve.g,Ee=ve.b;he?(m[0]=Ce,m[1]=De,m[2]=Ee,m[3]=xe,C.clearBufferuiv(C.COLOR,0,m)):(f[0]=Ce,f[1]=De,f[2]=Ee,f[3]=xe,C.clearBufferiv(C.COLOR,0,f))}else H|=C.COLOR_BUFFER_BIT}N&&(H|=C.DEPTH_BUFFER_BIT),V&&(H|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ee,!1),t.removeEventListener("webglcontextrestored",K,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ne.dispose(),J.dispose(),me.dispose(),ye.dispose(),E.dispose(),g.dispose(),G.dispose(),R.dispose(),de.dispose(),B.dispose(),le.dispose(),le.removeEventListener("sessionstart",ho),le.removeEventListener("sessionend",fo),On.stop()};function ee(v){v.preventDefault(),Lo("WebGLRenderer: Context Lost."),L=!0}function K(){Lo("WebGLRenderer: Context Restored."),L=!1;const v=tt.autoReset,N=Z.enabled,V=Z.autoUpdate,H=Z.needsUpdate,O=Z.type;ce(),tt.autoReset=v,Z.enabled=N,Z.autoUpdate=V,Z.needsUpdate=H,Z.type=O}function _e(v){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Ne(v){const N=v.target;N.removeEventListener("dispose",Ne),rt(N)}function rt(v){Je(v),ye.remove(v)}function Je(v){const N=ye.get(v).programs;N!==void 0&&(N.forEach(function(V){B.releaseProgram(V)}),v.isShaderMaterial&&B.releaseShaderCache(v))}this.renderBufferDirect=function(v,N,V,H,O,ie){N===null&&(N=ht);const he=O.isMesh&&O.matrixWorld.determinant()<0,ve=bl(v,N,V,H,O);ge.setMaterial(H,he);let xe=V.index,Ce=1;if(H.wireframe===!0){if(xe=I.getWireframeAttribute(V),xe===void 0)return;Ce=2}const De=V.drawRange,Ee=V.attributes.position;let We=De.start*Ce,Qe=(De.start+De.count)*Ce;ie!==null&&(We=Math.max(We,ie.start*Ce),Qe=Math.min(Qe,(ie.start+ie.count)*Ce)),xe!==null?(We=Math.max(We,0),Qe=Math.min(Qe,xe.count)):Ee!=null&&(We=Math.max(We,0),Qe=Math.min(Qe,Ee.count));const ot=Qe-We;if(ot<0||ot===1/0)return;R.setup(O,H,ve,V,xe);let ct,nt=Ae;if(xe!==null&&(ct=T.get(xe),nt=fe,nt.setIndex(ct)),O.isMesh)H.wireframe===!0?(ge.setLineWidth(H.wireframeLinewidth*it()),nt.setMode(C.LINES)):nt.setMode(C.TRIANGLES);else if(O.isLine){let Te=H.linewidth;Te===void 0&&(Te=1),ge.setLineWidth(Te*it()),O.isLineSegments?nt.setMode(C.LINES):O.isLineLoop?nt.setMode(C.LINE_LOOP):nt.setMode(C.LINE_STRIP)}else O.isPoints?nt.setMode(C.POINTS):O.isSprite&&nt.setMode(C.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)ar("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),nt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(ke.get("WEBGL_multi_draw"))nt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Te=O._multiDrawStarts,st=O._multiDrawCounts,Xe=O._multiDrawCount,Nt=xe?T.get(xe).bytesPerElement:1,oi=ye.get(H).currentProgram.getUniforms();for(let Ft=0;Ft<Xe;Ft++)oi.setValue(C,"_gl_DrawID",Ft),nt.render(Te[Ft]/Nt,st[Ft])}else if(O.isInstancedMesh)nt.renderInstances(We,ot,O.count);else if(V.isInstancedBufferGeometry){const Te=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,st=Math.min(V.instanceCount,Te);nt.renderInstances(We,ot,st)}else nt.render(We,ot)};function nn(v,N,V){v.transparent===!0&&v.side===sn&&v.forceSinglePass===!1?(v.side=Ct,v.needsUpdate=!0,mr(v,N,V),v.side=bn,v.needsUpdate=!0,mr(v,N,V),v.side=sn):mr(v,N,V)}this.compile=function(v,N,V=null){V===null&&(V=v),S=me.get(V),S.init(N),P.push(S),V.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),v!==V&&v.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(S.pushLight(O),O.castShadow&&S.pushShadow(O))}),S.setupLights();const H=new Set;return v.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ie=O.material;if(ie)if(Array.isArray(ie))for(let he=0;he<ie.length;he++){const ve=ie[he];nn(ve,V,O),H.add(ve)}else nn(ie,V,O),H.add(ie)}),S=P.pop(),H},this.compileAsync=function(v,N,V=null){const H=this.compile(v,N,V);return new Promise(O=>{function ie(){if(H.forEach(function(he){ye.get(he).currentProgram.isReady()&&H.delete(he)}),H.size===0){O(v);return}setTimeout(ie,10)}ke.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let jt=null;function Ml(v){jt&&jt(v)}function ho(){On.stop()}function fo(){On.start()}const On=new rl;On.setAnimationLoop(Ml),typeof self<"u"&&On.setContext(self),this.setAnimationLoop=function(v){jt=v,le.setAnimationLoop(v),v===null?On.stop():On.start()},le.addEventListener("sessionstart",ho),le.addEventListener("sessionend",fo),this.render=function(v,N){if(N!==void 0&&N.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(N),N=le.getCamera()),v.isScene===!0&&v.onBeforeRender(y,v,N,M),S=me.get(v,P.length),S.init(N),P.push(S),we.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),$.setFromProjectionMatrix(we,an,N.reversedDepth),oe=this.localClippingEnabled,j=pe.init(this.clippingPlanes,oe),w=J.get(v,A.length),w.init(),A.push(w),le.enabled===!0&&le.isPresenting===!0){const ie=y.xr.getDepthSensingMesh();ie!==null&&ss(ie,N,-1/0,y.sortObjects)}ss(v,N,0,y.sortObjects),w.finish(),y.sortObjects===!0&&w.sort(Se,Q),Be=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,Be&&ne.addToRenderList(w,v),this.info.render.frame++,j===!0&&pe.beginShadows();const V=S.state.shadowsArray;Z.render(V,v,N),j===!0&&pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=w.opaque,O=w.transmissive;if(S.setupLights(),N.isArrayCamera){const ie=N.cameras;if(O.length>0)for(let he=0,ve=ie.length;he<ve;he++){const xe=ie[he];mo(H,O,v,xe)}Be&&ne.render(v);for(let he=0,ve=ie.length;he<ve;he++){const xe=ie[he];po(w,v,xe,xe.viewport)}}else O.length>0&&mo(H,O,v,N),Be&&ne.render(v),po(w,v,N);M!==null&&b===0&&(Le.updateMultisampleRenderTarget(M),Le.updateRenderTargetMipmap(M)),v.isScene===!0&&v.onAfterRender(y,v,N),R.resetDefaultState(),D=-1,z=null,P.pop(),P.length>0?(S=P[P.length-1],j===!0&&pe.setGlobalState(y.clippingPlanes,S.state.camera)):S=null,A.pop(),A.length>0?w=A[A.length-1]:w=null};function ss(v,N,V,H){if(v.visible===!1)return;if(v.layers.test(N.layers)){if(v.isGroup)V=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(N);else if(v.isLight)S.pushLight(v),v.castShadow&&S.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||$.intersectsSprite(v)){H&&ze.setFromMatrixPosition(v.matrixWorld).applyMatrix4(we);const he=G.update(v),ve=v.material;ve.visible&&w.push(v,he,ve,V,ze.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||$.intersectsObject(v))){const he=G.update(v),ve=v.material;if(H&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ze.copy(v.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),ze.copy(he.boundingSphere.center)),ze.applyMatrix4(v.matrixWorld).applyMatrix4(we)),Array.isArray(ve)){const xe=he.groups;for(let Ce=0,De=xe.length;Ce<De;Ce++){const Ee=xe[Ce],We=ve[Ee.materialIndex];We&&We.visible&&w.push(v,he,We,V,ze.z,Ee)}}else ve.visible&&w.push(v,he,ve,V,ze.z,null)}}const ie=v.children;for(let he=0,ve=ie.length;he<ve;he++)ss(ie[he],N,V,H)}function po(v,N,V,H){const{opaque:O,transmissive:ie,transparent:he}=v;S.setupLightsView(V),j===!0&&pe.setGlobalState(y.clippingPlanes,V),H&&ge.viewport(k.copy(H)),O.length>0&&pr(O,N,V),ie.length>0&&pr(ie,N,V),he.length>0&&pr(he,N,V),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function mo(v,N,V,H){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;S.state.transmissionRenderTarget[H.id]===void 0&&(S.state.transmissionRenderTarget[H.id]=new ei(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")||ke.has("EXT_color_buffer_float")?Fi:Sn,minFilter:jn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const ie=S.state.transmissionRenderTarget[H.id],he=H.viewport||k;ie.setSize(he.z*y.transmissionResolutionScale,he.w*y.transmissionResolutionScale);const ve=y.getRenderTarget(),xe=y.getActiveCubeFace(),Ce=y.getActiveMipmapLevel();y.setRenderTarget(ie),y.getClearColor(q),se=y.getClearAlpha(),se<1&&y.setClearColor(16777215,.5),y.clear(),Be&&ne.render(V);const De=y.toneMapping;y.toneMapping=Nn;const Ee=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),S.setupLightsView(H),j===!0&&pe.setGlobalState(y.clippingPlanes,H),pr(v,V,H),Le.updateMultisampleRenderTarget(ie),Le.updateRenderTargetMipmap(ie),ke.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Qe=0,ot=N.length;Qe<ot;Qe++){const ct=N[Qe],{object:nt,geometry:Te,material:st,group:Xe}=ct;if(st.side===sn&&nt.layers.test(H.layers)){const Nt=st.side;st.side=Ct,st.needsUpdate=!0,xo(nt,V,H,Te,st,Xe),st.side=Nt,st.needsUpdate=!0,We=!0}}We===!0&&(Le.updateMultisampleRenderTarget(ie),Le.updateRenderTargetMipmap(ie))}y.setRenderTarget(ve,xe,Ce),y.setClearColor(q,se),Ee!==void 0&&(H.viewport=Ee),y.toneMapping=De}function pr(v,N,V){const H=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ie=v.length;O<ie;O++){const he=v[O],{object:ve,geometry:xe,group:Ce}=he;let De=he.material;De.allowOverride===!0&&H!==null&&(De=H),ve.layers.test(V.layers)&&xo(ve,N,V,xe,De,Ce)}}function xo(v,N,V,H,O,ie){v.onBeforeRender(y,N,V,H,O,ie),v.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),O.onBeforeRender(y,N,V,H,v,ie),O.transparent===!0&&O.side===sn&&O.forceSinglePass===!1?(O.side=Ct,O.needsUpdate=!0,y.renderBufferDirect(V,N,H,O,v,ie),O.side=bn,O.needsUpdate=!0,y.renderBufferDirect(V,N,H,O,v,ie),O.side=sn):y.renderBufferDirect(V,N,H,O,v,ie),v.onAfterRender(y,N,V,H,O,ie)}function mr(v,N,V){N.isScene!==!0&&(N=ht);const H=ye.get(v),O=S.state.lights,ie=S.state.shadowsArray,he=O.state.version,ve=B.getParameters(v,O.state,ie,N,V),xe=B.getProgramCacheKey(ve);let Ce=H.programs;H.environment=v.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(v.isMeshStandardMaterial?g:E).get(v.envMap||H.environment),H.envMapRotation=H.environment!==null&&v.envMap===null?N.environmentRotation:v.envMapRotation,Ce===void 0&&(v.addEventListener("dispose",Ne),Ce=new Map,H.programs=Ce);let De=Ce.get(xe);if(De!==void 0){if(H.currentProgram===De&&H.lightsStateVersion===he)return _o(v,ve),De}else ve.uniforms=B.getUniforms(v),v.onBeforeCompile(ve,y),De=B.acquireProgram(ve,xe),Ce.set(xe,De),H.uniforms=ve.uniforms;const Ee=H.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Ee.clippingPlanes=pe.uniform),_o(v,ve),H.needsLights=yl(v),H.lightsStateVersion=he,H.needsLights&&(Ee.ambientLightColor.value=O.state.ambient,Ee.lightProbe.value=O.state.probe,Ee.directionalLights.value=O.state.directional,Ee.directionalLightShadows.value=O.state.directionalShadow,Ee.spotLights.value=O.state.spot,Ee.spotLightShadows.value=O.state.spotShadow,Ee.rectAreaLights.value=O.state.rectArea,Ee.ltc_1.value=O.state.rectAreaLTC1,Ee.ltc_2.value=O.state.rectAreaLTC2,Ee.pointLights.value=O.state.point,Ee.pointLightShadows.value=O.state.pointShadow,Ee.hemisphereLights.value=O.state.hemi,Ee.directionalShadowMap.value=O.state.directionalShadowMap,Ee.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ee.spotShadowMap.value=O.state.spotShadowMap,Ee.spotLightMatrix.value=O.state.spotLightMatrix,Ee.spotLightMap.value=O.state.spotLightMap,Ee.pointShadowMap.value=O.state.pointShadowMap,Ee.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=De,H.uniformsList=null,De}function go(v){if(v.uniformsList===null){const N=v.currentProgram.getUniforms();v.uniformsList=Wr.seqWithValue(N.seq,v.uniforms)}return v.uniformsList}function _o(v,N){const V=ye.get(v);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function bl(v,N,V,H,O){N.isScene!==!0&&(N=ht),Le.resetTextureUnits();const ie=N.fog,he=H.isMeshStandardMaterial?N.environment:null,ve=M===null?y.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Ui,xe=(H.isMeshStandardMaterial?g:E).get(H.envMap||he),Ce=H.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,De=!!V.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ee=!!V.morphAttributes.position,We=!!V.morphAttributes.normal,Qe=!!V.morphAttributes.color;let ot=Nn;H.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(ot=y.toneMapping);const ct=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,nt=ct!==void 0?ct.length:0,Te=ye.get(H),st=S.state.lights;if(j===!0&&(oe===!0||v!==z)){const Tt=v===z&&H.id===D;pe.setState(H,v,Tt)}let Xe=!1;H.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==st.state.version||Te.outputColorSpace!==ve||O.isBatchedMesh&&Te.batching===!1||!O.isBatchedMesh&&Te.batching===!0||O.isBatchedMesh&&Te.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Te.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Te.instancing===!1||!O.isInstancedMesh&&Te.instancing===!0||O.isSkinnedMesh&&Te.skinning===!1||!O.isSkinnedMesh&&Te.skinning===!0||O.isInstancedMesh&&Te.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Te.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Te.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Te.instancingMorph===!1&&O.morphTexture!==null||Te.envMap!==xe||H.fog===!0&&Te.fog!==ie||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==pe.numPlanes||Te.numIntersection!==pe.numIntersection)||Te.vertexAlphas!==Ce||Te.vertexTangents!==De||Te.morphTargets!==Ee||Te.morphNormals!==We||Te.morphColors!==Qe||Te.toneMapping!==ot||Te.morphTargetsCount!==nt)&&(Xe=!0):(Xe=!0,Te.__version=H.version);let Nt=Te.currentProgram;Xe===!0&&(Nt=mr(H,N,O));let oi=!1,Ft=!1,ki=!1;const at=Nt.getUniforms(),Pt=Te.uniforms;if(ge.useProgram(Nt.program)&&(oi=!0,Ft=!0,ki=!0),H.id!==D&&(D=H.id,Ft=!0),oi||z!==v){ge.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),at.setValue(C,"projectionMatrix",v.projectionMatrix),at.setValue(C,"viewMatrix",v.matrixWorldInverse);const Lt=at.map.cameraPosition;Lt!==void 0&&Lt.setValue(C,be.setFromMatrixPosition(v.matrixWorld)),$e.logarithmicDepthBuffer&&at.setValue(C,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&at.setValue(C,"isOrthographic",v.isOrthographicCamera===!0),z!==v&&(z=v,Ft=!0,ki=!0)}if(O.isSkinnedMesh){at.setOptional(C,O,"bindMatrix"),at.setOptional(C,O,"bindMatrixInverse");const Tt=O.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),at.setValue(C,"boneTexture",Tt.boneTexture,Le))}O.isBatchedMesh&&(at.setOptional(C,O,"batchingTexture"),at.setValue(C,"batchingTexture",O._matricesTexture,Le),at.setOptional(C,O,"batchingIdTexture"),at.setValue(C,"batchingIdTexture",O._indirectTexture,Le),at.setOptional(C,O,"batchingColorTexture"),O._colorsTexture!==null&&at.setValue(C,"batchingColorTexture",O._colorsTexture,Le));const Gt=V.morphAttributes;if((Gt.position!==void 0||Gt.normal!==void 0||Gt.color!==void 0)&&Pe.update(O,V,Nt),(Ft||Te.receiveShadow!==O.receiveShadow)&&(Te.receiveShadow=O.receiveShadow,at.setValue(C,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Pt.envMap.value=xe,Pt.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(Pt.envMapIntensity.value=N.environmentIntensity),Pt.dfgLUT!==void 0&&(Pt.dfgLUT.value=U0()),Ft&&(at.setValue(C,"toneMappingExposure",y.toneMappingExposure),Te.needsLights&&Sl(Pt,ki),ie&&H.fog===!0&&te.refreshFogUniforms(Pt,ie),te.refreshMaterialUniforms(Pt,H,ae,re,S.state.transmissionRenderTarget[v.id]),Wr.upload(C,go(Te),Pt,Le)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Wr.upload(C,go(Te),Pt,Le),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&at.setValue(C,"center",O.center),at.setValue(C,"modelViewMatrix",O.modelViewMatrix),at.setValue(C,"normalMatrix",O.normalMatrix),at.setValue(C,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Tt=H.uniformsGroups;for(let Lt=0,as=Tt.length;Lt<as;Lt++){const zn=Tt[Lt];de.update(zn,Nt),de.bind(zn,Nt)}}return Nt}function Sl(v,N){v.ambientLightColor.needsUpdate=N,v.lightProbe.needsUpdate=N,v.directionalLights.needsUpdate=N,v.directionalLightShadows.needsUpdate=N,v.pointLights.needsUpdate=N,v.pointLightShadows.needsUpdate=N,v.spotLights.needsUpdate=N,v.spotLightShadows.needsUpdate=N,v.rectAreaLights.needsUpdate=N,v.hemisphereLights.needsUpdate=N}function yl(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return U},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(v,N,V){const H=ye.get(v);H.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),ye.get(v.texture).__webglTexture=N,ye.get(v.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:V,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,N){const V=ye.get(v);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};const El=C.createFramebuffer();this.setRenderTarget=function(v,N=0,V=0){M=v,U=N,b=V;let H=!0,O=null,ie=!1,he=!1;if(v){const xe=ye.get(v);if(xe.__useDefaultFramebuffer!==void 0)ge.bindFramebuffer(C.FRAMEBUFFER,null),H=!1;else if(xe.__webglFramebuffer===void 0)Le.setupRenderTarget(v);else if(xe.__hasExternalTextures)Le.rebindTextures(v,ye.get(v.texture).__webglTexture,ye.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Ee=v.depthTexture;if(xe.__boundDepthTexture!==Ee){if(Ee!==null&&ye.has(Ee)&&(v.width!==Ee.image.width||v.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Le.setupDepthRenderbuffer(v)}}const Ce=v.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(he=!0);const De=ye.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(De[N])?O=De[N][V]:O=De[N],ie=!0):v.samples>0&&Le.useMultisampledRTT(v)===!1?O=ye.get(v).__webglMultisampledFramebuffer:Array.isArray(De)?O=De[V]:O=De,k.copy(v.viewport),W.copy(v.scissor),Y=v.scissorTest}else k.copy(Ye).multiplyScalar(ae).floor(),W.copy(je).multiplyScalar(ae).floor(),Y=Ze;if(V!==0&&(O=El),ge.bindFramebuffer(C.FRAMEBUFFER,O)&&H&&ge.drawBuffers(v,O),ge.viewport(k),ge.scissor(W),ge.setScissorTest(Y),ie){const xe=ye.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,xe.__webglTexture,V)}else if(he){const xe=N;for(let Ce=0;Ce<v.textures.length;Ce++){const De=ye.get(v.textures[Ce]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ce,De.__webglTexture,V,xe)}}else if(v!==null&&V!==0){const xe=ye.get(v.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,xe.__webglTexture,V)}D=-1},this.readRenderTargetPixels=function(v,N,V,H,O,ie,he,ve=0){if(!(v&&v.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=ye.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&he!==void 0&&(xe=xe[he]),xe){ge.bindFramebuffer(C.FRAMEBUFFER,xe);try{const Ce=v.textures[ve],De=Ce.format,Ee=Ce.type;if(!$e.textureFormatReadable(De)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$e.textureTypeReadable(Ee)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=v.width-H&&V>=0&&V<=v.height-O&&(v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ve),C.readPixels(N,V,H,O,Ue.convert(De),Ue.convert(Ee),ie))}finally{const Ce=M!==null?ye.get(M).__webglFramebuffer:null;ge.bindFramebuffer(C.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(v,N,V,H,O,ie,he,ve=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=ye.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&he!==void 0&&(xe=xe[he]),xe)if(N>=0&&N<=v.width-H&&V>=0&&V<=v.height-O){ge.bindFramebuffer(C.FRAMEBUFFER,xe);const Ce=v.textures[ve],De=Ce.format,Ee=Ce.type;if(!$e.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$e.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const We=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,We),C.bufferData(C.PIXEL_PACK_BUFFER,ie.byteLength,C.STREAM_READ),v.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ve),C.readPixels(N,V,H,O,Ue.convert(De),Ue.convert(Ee),0);const Qe=M!==null?ye.get(M).__webglFramebuffer:null;ge.bindFramebuffer(C.FRAMEBUFFER,Qe);const ot=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Ru(C,ot,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,We),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ie),C.deleteBuffer(We),C.deleteSync(ot),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,N=null,V=0){const H=Math.pow(2,-V),O=Math.floor(v.image.width*H),ie=Math.floor(v.image.height*H),he=N!==null?N.x:0,ve=N!==null?N.y:0;Le.setTexture2D(v,0),C.copyTexSubImage2D(C.TEXTURE_2D,V,0,0,he,ve,O,ie),ge.unbindTexture()};const Tl=C.createFramebuffer(),Al=C.createFramebuffer();this.copyTextureToTexture=function(v,N,V=null,H=null,O=0,ie=null){ie===null&&(O!==0?(ar("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=O,O=0):ie=0);let he,ve,xe,Ce,De,Ee,We,Qe,ot;const ct=v.isCompressedTexture?v.mipmaps[ie]:v.image;if(V!==null)he=V.max.x-V.min.x,ve=V.max.y-V.min.y,xe=V.isBox3?V.max.z-V.min.z:1,Ce=V.min.x,De=V.min.y,Ee=V.isBox3?V.min.z:0;else{const Gt=Math.pow(2,-O);he=Math.floor(ct.width*Gt),ve=Math.floor(ct.height*Gt),v.isDataArrayTexture?xe=ct.depth:v.isData3DTexture?xe=Math.floor(ct.depth*Gt):xe=1,Ce=0,De=0,Ee=0}H!==null?(We=H.x,Qe=H.y,ot=H.z):(We=0,Qe=0,ot=0);const nt=Ue.convert(N.format),Te=Ue.convert(N.type);let st;N.isData3DTexture?(Le.setTexture3D(N,0),st=C.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Le.setTexture2DArray(N,0),st=C.TEXTURE_2D_ARRAY):(Le.setTexture2D(N,0),st=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const Xe=C.getParameter(C.UNPACK_ROW_LENGTH),Nt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),oi=C.getParameter(C.UNPACK_SKIP_PIXELS),Ft=C.getParameter(C.UNPACK_SKIP_ROWS),ki=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ct.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ct.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,De),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ee);const at=v.isDataArrayTexture||v.isData3DTexture,Pt=N.isDataArrayTexture||N.isData3DTexture;if(v.isDepthTexture){const Gt=ye.get(v),Tt=ye.get(N),Lt=ye.get(Gt.__renderTarget),as=ye.get(Tt.__renderTarget);ge.bindFramebuffer(C.READ_FRAMEBUFFER,Lt.__webglFramebuffer),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,as.__webglFramebuffer);for(let zn=0;zn<xe;zn++)at&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ye.get(v).__webglTexture,O,Ee+zn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ye.get(N).__webglTexture,ie,ot+zn)),C.blitFramebuffer(Ce,De,he,ve,We,Qe,he,ve,C.DEPTH_BUFFER_BIT,C.NEAREST);ge.bindFramebuffer(C.READ_FRAMEBUFFER,null),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(O!==0||v.isRenderTargetTexture||ye.has(v)){const Gt=ye.get(v),Tt=ye.get(N);ge.bindFramebuffer(C.READ_FRAMEBUFFER,Tl),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,Al);for(let Lt=0;Lt<xe;Lt++)at?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Gt.__webglTexture,O,Ee+Lt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Gt.__webglTexture,O),Pt?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Tt.__webglTexture,ie,ot+Lt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Tt.__webglTexture,ie),O!==0?C.blitFramebuffer(Ce,De,he,ve,We,Qe,he,ve,C.COLOR_BUFFER_BIT,C.NEAREST):Pt?C.copyTexSubImage3D(st,ie,We,Qe,ot+Lt,Ce,De,he,ve):C.copyTexSubImage2D(st,ie,We,Qe,Ce,De,he,ve);ge.bindFramebuffer(C.READ_FRAMEBUFFER,null),ge.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Pt?v.isDataTexture||v.isData3DTexture?C.texSubImage3D(st,ie,We,Qe,ot,he,ve,xe,nt,Te,ct.data):N.isCompressedArrayTexture?C.compressedTexSubImage3D(st,ie,We,Qe,ot,he,ve,xe,nt,ct.data):C.texSubImage3D(st,ie,We,Qe,ot,he,ve,xe,nt,Te,ct):v.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ie,We,Qe,he,ve,nt,Te,ct.data):v.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ie,We,Qe,ct.width,ct.height,nt,ct.data):C.texSubImage2D(C.TEXTURE_2D,ie,We,Qe,he,ve,nt,Te,ct);C.pixelStorei(C.UNPACK_ROW_LENGTH,Xe),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Nt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,oi),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ft),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ki),ie===0&&N.generateMipmaps&&C.generateMipmap(st),ge.unbindTexture()},this.initRenderTarget=function(v){ye.get(v).__webglFramebuffer===void 0&&Le.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?Le.setTextureCube(v,0):v.isData3DTexture?Le.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?Le.setTexture2DArray(v,0):Le.setTexture2D(v,0),ge.unbindTexture()},this.resetState=function(){U=0,b=0,M=null,ge.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return an}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const yt=Math.PI/180,N0=6371,F0=946728e6;function ll(i){const e=(i.getTime()-F0)/864e5,t=(357.529+.98560028*e)*yt,n=280.459+.98564736*e,r=(n+1.915*Math.sin(t)+.02*Math.sin(2*t))*yt,s=(23.439-36e-8*e)*yt,a=Math.atan2(Math.cos(s)*Math.sin(r),Math.cos(r))/yt,o=Math.asin(Math.sin(s)*Math.sin(r))/yt;let c=(n-a)/15;c=((c+12)%24+24)%24-12;const l=i.getUTCHours()+i.getUTCMinutes()/60+i.getUTCSeconds()/3600;return{lat:o,lng:O0(-15*(l-12+c))}}function ul(i,e,t){const n=ll(t);return 90-dl(i,e,n.lat,n.lng)/yt}function O0(i){return((i+180)%360+360)%360-180}function dl(i,e,t,n){const r=(t-i)*yt,s=(n-e)*yt,a=Math.sin(r/2)**2+Math.cos(i*yt)*Math.cos(t*yt)*Math.sin(s/2)**2;return 2*Math.asin(Math.min(1,Math.sqrt(a)))}function no(i,e,t,n){return dl(i,e,t,n)*N0}function z0(i,e,t=64){const n=Ec(i.lat,i.lng),r=Ec(e.lat,e.lng),s=Math.acos(Math.max(-1,Math.min(1,n[0]*r[0]+n[1]*r[1]+n[2]*r[2]))),a=[];for(let o=0;o<=t;o++){const c=o/t;let l;if(s<1e-6)l=n;else{const u=Math.sin(s),d=Math.sin((1-c)*s)/u,h=Math.sin(c*s)/u;l=[n[0]*d+r[0]*h,n[1]*d+r[1]*h,n[2]*d+r[2]*h]}a.push({lat:Math.asin(l[2])/yt,lng:Math.atan2(l[1],l[0])/yt,t:c})}return a}function Ec(i,e){const t=Math.cos(i*yt);return[t*Math.cos(e*yt),t*Math.sin(e*yt),Math.sin(i*yt)]}function B0(i){return i<25?1e3:Math.max(0,Math.round(1e3*Math.exp(-i/1600)))}function k0(i){return Math.round(i/850*60+30)}const V0=new Intl.NumberFormat("pl-PL",{maximumFractionDigits:0});function hl(i){return i<10?i.toFixed(1).replace(".",",")+" km":V0.format(Math.round(i))+" km"}function G0(i){const e=Math.floor(i/60),t=i%60;return e?`${e} h ${String(t).padStart(2,"0")} min`:`${t} min`}function io(i,e){return`${Math.abs(i).toFixed(2).replace(".",",")}° ${i>=0?"N":"S"}   ${Math.abs(e).toFixed(2).replace(".",",")}° ${e>=0?"E":"W"}`}const Tc=new Map;function fl(i,e,t){if(e){let r=Tc.get(e);return r||Tc.set(e,r=new Intl.DateTimeFormat("pl-PL",{timeZone:e,hour:"2-digit",minute:"2-digit"})),r.format(i)}const n=new Date(i.getTime()+t/15*36e5);return`${String(n.getUTCHours()).padStart(2,"0")}:${String(n.getUTCMinutes()).padStart(2,"0")}`}function H0(i){return i>6?`dzień, Słońce ${Math.round(i)}° nad horyzontem`:i>-.8?"wschód albo zachód Słońca":i>-6?"zmierzch cywilny":i>-18?"zmierzch, niebo jeszcze nie całkiem ciemne":"noc"}const jr=Wt.degToRad(23.4),ro=new F(0,0,1),Ac=1.32,wc=4.8,Br=matchMedia("(prefers-reduced-motion: reduce)").matches;function Yi(i,e,t){const n=(90-i)*Math.PI/180,r=(e+180)*Math.PI/180,s=Math.sin(n);return new F(-t*s*Math.cos(r),t*Math.cos(n),t*s*Math.sin(r))}function Vs(i,e,t){return Yi(i,e,t).applyAxisAngle(ro,jr)}function W0(i){const e=i.clone().applyAxisAngle(ro,-jr).normalize(),t=90-Math.acos(Wt.clamp(e.y,-1,1))*180/Math.PI;let n=Math.atan2(e.z,-e.x)*180/Math.PI-180;return n<-180&&(n+=360),{lat:t,lng:n}}function Cc(i,e,t,n){const r=Math.atan2(Math.sin(e-i),Math.cos(e-i));return i+r*(1-Math.exp(-t*n))}const Gs=`
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
`,X0=`
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
`,q0=`
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
`,Y0=`
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
`;function $0(i,{texturesBase:e="textures/",onPlace:t,onGround:n}){const r=new I0({antialias:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setClearColor(329484),i.appendChild(r.domElement);const s=r.domElement,a=new xd,o=new Xt(38,1,.05,200),c=new F(1,.3,.6).normalize();{const I=new Float32Array(5400),G=new Float32Array(1800*3);for(let te=0;te<1800;te++){const J=30+Math.random()*40,me=Math.random()*Math.PI*2,pe=Math.acos(2*Math.random()-1);I.set([J*Math.sin(pe)*Math.cos(me),J*Math.cos(pe),J*Math.sin(pe)*Math.sin(me)],te*3);const Z=Math.random(),ne=.55+Math.random()*.45;G.set([ne,ne*(.9+Z*.08),ne*(1.05-Z*.2)],te*3)}const B=new It;B.setAttribute("position",new Yt(I,3)),B.setAttribute("color",new Yt(G,3)),a.add(new bd(B,new Jc({size:.07,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1})))}const l=new Kn;l.rotation.z=jr,a.add(l);const u=new Gd,d=r.capabilities.getMaxAnisotropy(),h=r.capabilities.maxTextureSize;let p=4,x=null;const _=(T,I)=>{const G=u.load(e+T,()=>{p-=1,p===0&&x&&x()});return I&&(G.colorSpace=Bt),G.anisotropy=Math.min(8,d),G},f=Math.max(screen.width,screen.height)*(window.devicePixelRatio||1)>2200&&!matchMedia("(pointer: coarse)").matches&&h>=4096?"":"-2k",w=new $t({uniforms:{dayMap:{value:_(`earth-day${f}.webp`,!0)},nightMap:{value:_(`earth-night${f}.webp`,!0)},waterMap:{value:_("earth-water.webp",!1)},sunDir:{value:c},nightGain:{value:1.35}},vertexShader:Gs,fragmentShader:X0}),S=new Mt(new Dn(1,128,96),w);l.add(S);const A=new $t({uniforms:{cloudMap:{value:_("earth-clouds.webp",!1)},sunDir:{value:c},opacity:{value:.62}},vertexShader:Gs,fragmentShader:q0,transparent:!0,depthWrite:!1}),P=new Mt(new Dn(1.008,96,72),A);l.add(P);const y=(T,I,G,B)=>new Mt(new Dn(T,64,48),new $t({uniforms:{sunDir:{value:c},power:{value:G},strength:{value:B}},vertexShader:Gs,fragmentShader:Y0,transparent:!0,depthWrite:!1,side:I,blending:Ai}));a.add(y(1.075,Ct,2.4,.95),y(1.012,bn,3.2,.35));const L=new Kn;L.rotation.z=jr,a.add(L);const U=new Map,b=new Dn(.011,16,12),M=new Qa(.02,.027,40),D=new Dn(.045,8,6),z=new Za(.0022,6e-4,.16,8);function k(T,I=16766090){const G=Yi(T.lat,T.lng,1.004),B=new Kn;B.position.copy(G),B.quaternion.setFromUnitVectors(ro,G.clone().normalize());const te=new Mt(b,new Ln({color:I})),J=new Mt(M,new Ln({color:I,transparent:!0,opacity:.5,side:sn,depthWrite:!1,blending:Ai}));J.position.z=.002;const me=new Mt(D,new Ln({visible:!1}));me.userData.placeId=T.id;const pe=new Mt(z,new Ln({color:16771e3,transparent:!0,opacity:.85,depthWrite:!1,blending:Ai}));return pe.rotation.x=Math.PI/2,pe.position.z=.08,pe.visible=!1,B.add(te,J,me,pe),{group:B,core:te,ring:J,beam:pe,place:T,color:I}}const W=new Map;function Y(T,I,G=9425919){const B=W.get(T);if(B&&(L.remove(B.group),W.delete(T)),!I)return;const te=k({id:null,...I},G);te.beam.visible=!0,te.beam.material=te.beam.material.clone(),te.beam.material.color.set(G),te.ring.material.opacity=.9,L.add(te.group),W.set(T,te)}let q=null;function se(T,I){if(q&&(L.remove(q),q.geometry.dispose(),q=null),!T||!I)return;const G=z0(T,I,96),te=.02+Math.acos(Wt.clamp(Yi(T.lat,T.lng,1).dot(Yi(I.lat,I.lng,1)),-1,1))*.09,J=new nl(G.map(me=>Yi(me.lat,me.lng,1.004+Math.sin(me.t*Math.PI)*te)));q=new Mt(new eo(J,160,.0028,6,!1),new Ln({color:15975546,transparent:!0,opacity:.95,blending:Ai,depthWrite:!1})),q.renderOrder=2,L.add(q)}let X=null;function re(T){for(const I of U.values())L.remove(I.group);U.clear();for(const I of T){const G=k(I,I.cat==="own"?10477760:16766090);L.add(G.group),U.set(I.id,G)}ae()}function ae(){for(const T of U.values()){const I=T.place.id===X;T.core.material.color.set(I?16775142:T.color),T.ring.material.opacity=I?.95:.45,T.beam.visible=I}}const Se=new Ns().setFromVector3(Vs(30,15,3.4)),Q={theta:Se.theta,phi:Se.phi,radius:3.4,velT:0,velP:0,resumeAt:0,focus:null,spin:!Br},Ye=new Ns;function je(T,I,G){const B=new Ns().setFromVector3(Vs(T,I,1));Q.focus={theta:B.theta,phi:B.phi,radius:G??Wt.clamp(Q.radius,1.75,2.3)}}function Ze(){Q.focus=null,Q.resumeAt=performance.now()+600}function $(T,{fly:I=!0}={}){X=T,ae();const G=U.get(T);G&&I&&je(G.place.lat,G.place.lng,Q.radius>2.3?2.05:void 0)}const j=new Map;let oe=null,we=null;const be=new qd,ze=new Re,ht=new Mt(new Dn(1,48,32),new Ln({visible:!1}));a.add(ht),s.addEventListener("pointerdown",T=>{if(!(T.pointerType==="mouse"&&T.button!==0)){if(s.setPointerCapture(T.pointerId),j.set(T.pointerId,{x:T.clientX,y:T.clientY}),j.size===2){const[I,G]=[...j.values()];we={dist:Math.hypot(I.x-G.x,I.y-G.y),radius:Q.radius},oe=null}else oe={x:T.clientX,y:T.clientY,moved:0,t:performance.now()},Q.velT=Q.velP=0;s.classList.add("grabbing")}}),s.addEventListener("pointermove",T=>{if(!j.has(T.pointerId))return;if(j.set(T.pointerId,{x:T.clientX,y:T.clientY}),we&&j.size>=2){const[te,J]=[...j.values()],me=Math.hypot(te.x-J.x,te.y-J.y);Q.radius=Wt.clamp(we.radius*(we.dist/Math.max(me,1)),Ac,wc),Q.focus&&(Q.focus.radius=Q.radius);return}if(!oe)return;const I=T.clientX-oe.x,G=T.clientY-oe.y;if(oe.x=T.clientX,oe.y=T.clientY,oe.moved+=Math.abs(I)+Math.abs(G),oe.moved<5)return;Q.focus=null;const B=.0052*((Q.radius-.85)/2);Q.velT=-I*B,Q.velP=-G*B,Q.theta+=Q.velT,Q.phi=Wt.clamp(Q.phi+Q.velP,.12,Math.PI-.12)});const Be=T=>{if(!j.has(T.pointerId)||(j.delete(T.pointerId),j.size<2&&(we=null),j.size===0&&s.classList.remove("grabbing"),!oe))return;const I=oe.moved<8&&performance.now()-oe.t<600;oe=null,Q.resumeAt=performance.now()+2500,I&&T.type==="pointerup"&&it(T)};s.addEventListener("pointerup",Be),s.addEventListener("pointercancel",Be),s.addEventListener("wheel",T=>{T.preventDefault(),Q.radius=Wt.clamp(Q.radius*Math.exp(T.deltaY*.0012),Ac,wc),Q.focus&&(Q.focus.radius=Q.radius),Q.resumeAt=performance.now()+1500},{passive:!1});function it(T){const I=s.getBoundingClientRect();ze.x=(T.clientX-I.left)/I.width*2-1,ze.y=-((T.clientY-I.top)/I.height)*2+1,be.setFromCamera(ze,o);const G=[...U.values()].filter(J=>J.group.visible).map(J=>J.group),B=be.intersectObjects(G,!0).find(J=>J.object.userData.placeId);if(B){t?.(B.object.userData.placeId);return}const te=be.intersectObject(ht)[0];te&&n?.(W0(te.point))}let C={real:!0};function He(T,I){C={real:T,date:I},$e()}const ke=new F;function $e(){if(C.real)c.copy(Vs(C.lat??0,C.lng??0,1));else{ke.copy(o.position).normalize();const T=new F().crossVectors(o.up,ke).normalize();c.copy(ke).addScaledVector(T,-.55).addScaledVector(o.up,.35).normalize()}}function ge(T,I){C.lat=T,C.lng=I,$e()}let tt={x:0,y:0};function ye(T,I){tt={x:T,y:I},Le()}function Le(){const T=i.clientWidth,I=i.clientHeight;r.setSize(T,I,!1),o.aspect=T/I,o.fov=o.aspect<1?2*Math.atan(Math.tan(Wt.degToRad(19))/o.aspect)*180/Math.PI:38,o.setViewOffset(T,I,-tt.x,tt.y,T,I),o.updateProjectionMatrix()}new ResizeObserver(Le).observe(i),Le();const E=new Xd;let g=!0;return r.setAnimationLoop(()=>{const T=Math.min(E.getDelta(),.05),I=E.elapsedTime;g&&!Br&&(P.rotation.y+=T*.004);const G=Br?14:2.8;if(!oe&&Q.focus)Q.theta=Cc(Q.theta,Q.focus.theta,G,T),Q.phi=Wt.clamp(Cc(Q.phi,Q.focus.phi,G,T),.12,Math.PI-.12),Q.radius=Wt.damp(Q.radius,Q.focus.radius,G,T),Q.velT=Q.velP=0;else if(!oe){Q.theta+=Q.velT,Q.phi=Wt.clamp(Q.phi+Q.velP,.12,Math.PI-.12);const te=Math.exp(-T*3.1);Q.velT*=te,Q.velP*=te,Q.spin&&!we&&performance.now()>Q.resumeAt&&Math.abs(Q.velT)<3e-4&&(Q.theta+=T*.05*((Q.radius-.9)/2))}const B=Wt.clamp((Q.radius-1)/2.7,.2,1.2);for(const te of U.values()){const J=te.place.id===X,me=1+Math.sin(I*2.3+te.place.lat)*(J?.14:.05);te.group.scale.setScalar(B),te.core.scale.setScalar((J?1.6:1)*me)}for(const te of W.values())te.group.scale.setScalar(B);Ye.set(Q.radius,Q.phi,Q.theta),o.position.setFromSpherical(Ye),o.lookAt(0,0,0),C.real||$e(),r.render(a,o)}),{setPlaces:re,select:$,focus:je,release:Ze,setPin:Y,setArc:se,setSun:He,setSubsolar:ge,setViewShift:ye,setClouds(T){g=T,P.visible=T},setSpin(T){Q.spin=T&&!Br},setMarkersVisible(T){for(const I of U.values())I.group.visible=T},get radius(){return Q.radius},whenReady(T){p===0?T():x=T}}}const j0=[{id:"all",label:"Wszystkie"},{id:"fav",label:"Ulubione"},{id:"p",label:"Polska"},{id:"m",label:"Miasta"},{id:"c",label:"Cuda i zabytki"},{id:"n",label:"Przyroda"},{id:"own",label:"Moje"}],K0=[["krakow","Kraków","Polska","p",50.0614,19.9366,"Europe/Warsaw","Rynek, Wawel i ciepły kamień starego miasta nad Wisłą."],["warszawa","Warszawa","Polska","p",52.2297,21.0122,"Europe/Warsaw","Odbudowana Starówka, Łazienki i panorama wieżowców nad Wisłą."],["gdansk","Gdańsk","Polska","p",54.352,18.6466,"Europe/Warsaw","Długi Targ, Żuraw nad Motławą i bursztynowe kamienice."],["wroclaw","Wrocław","Polska","p",51.1079,17.0385,"Europe/Warsaw","Miasto mostów i wysp na Odrze, z krasnalami na każdym rogu."],["torun","Toruń","Polska","p",53.0138,18.5984,"Europe/Warsaw","Gotyk z czerwonej cegły, miasto Kopernika i pierników."],["poznan","Poznań","Polska","p",52.4064,16.9252,"Europe/Warsaw","Kolorowy Stary Rynek i koziołki trykające się na ratuszu w południe."],["morskie-oko","Morskie Oko","Tatry, Polska","p",49.2013,20.071,"Europe/Warsaw","Największe jezioro Tatr pod ścianą Mięguszowieckich Szczytów."],["malbork","Zamek w Malborku","Polska","p",54.0398,19.0277,"Europe/Warsaw","Największy ceglany zamek świata, dawna stolica zakonu krzyżackiego."],["wieliczka","Kopalnia soli Wieliczka","Polska","p",49.983,20.055,"Europe/Warsaw","Komory, kaplice i jeziora wykute w soli setki metrów pod ziemią."],["bialowieza","Puszcza Białowieska","Polska i Białoruś","p",52.7008,23.8693,"Europe/Warsaw","Ostatni tak duży las nizinny Europy i dom żubrów."],["leba","Ruchome wydmy w Łebie","Słowiński PN, Polska","p",54.7631,17.5559,"Europe/Warsaw","Piaszczysta pustynia nad Bałtykiem, wędrująca nawet kilka metrów rocznie."],["tarnica","Tarnica","Bieszczady, Polska","p",49.0747,22.7264,"Europe/Warsaw","Najwyższy szczyt polskich Bieszczad, z widokiem na połoniny."],["barcelona","Barcelona","Katalonia, Hiszpania","m",41.3874,2.1686,"Europe/Madrid","Gotyckie zaułki, Sagrada Família i światło latarni nad morzem."],["paryz","Paryż","Francja","m",48.8566,2.3522,"Europe/Paris","Bulwary nad Sekwaną i wieża Eiffla rozświetlana co godzinę po zmroku."],["londyn","Londyn","Wielka Brytania","m",51.5074,-.1278,"Europe/London","Tamiza, Big Ben i miasto, przez które biegnie południk zerowy."],["rzym","Rzym","Włochy","m",41.9028,12.4964,"Europe/Rome","Fora, fontanny i trzy tysiące lat historii na siedmiu wzgórzach."],["wenecja","Wenecja","Włochy","m",45.4408,12.3155,"Europe/Rome","Miasto na ponad stu wyspach, gdzie ulicami są kanały."],["lizbona","Lizbona","Portugalia","m",38.7223,-9.1393,"Europe/Lisbon","Żółte tramwaje na stromych wzgórzach i ujście Tagu do Atlantyku."],["praga","Praga","Czechy","m",50.0755,14.4378,"Europe/Prague","Most Karola, Hradczany i zegar astronomiczny na Rynku Staromiejskim."],["wieden","Wiedeń","Austria","m",48.2082,16.3738,"Europe/Vienna","Pałace Habsburgów, kawiarnie i walce w sali Musikvereinu."],["amsterdam","Amsterdam","Holandia","m",52.3676,4.9041,"Europe/Amsterdam","Pierścienie kanałów, wąskie kamienice i więcej rowerów niż mieszkańców."],["reykjavik","Reykjavík","Islandia","m",64.1466,-21.9426,"Atlantic/Reykjavik","Najdalej na północ położona stolica państwa, zimą pod zorzą polarną."],["tromso","Tromsø","Norwegia","m",69.6492,18.9553,"Europe/Oslo","Za kołem podbiegunowym: noc polarna zimą, słońce o północy latem."],["stambul","Stambuł","Turcja","m",41.0082,28.9784,"Europe/Istanbul","Miasto na dwóch kontynentach nad cieśniną Bosfor."],["kair","Kair","Egipt","m",30.0444,31.2357,"Africa/Cairo","Największe miasto świata arabskiego, rozciągnięte wzdłuż Nilu."],["marrakesz","Marrakesz","Maroko","m",31.6295,-7.9811,"Africa/Casablanca","Czerwone mury medyny i zapach przypraw na placu Dżamaa al-Fana."],["kapsztad","Kapsztad","Republika Południowej Afryki","m",-33.9249,18.4241,"Africa/Johannesburg","Góra Stołowa nad zatoką, niedaleko Przylądka Dobrej Nadziei."],["dubaj","Dubaj","Zjednoczone Emiraty Arabskie","m",25.2048,55.2708,"Asia/Dubai","Burdż Chalifa, najwyższy budynek świata, wyrasta prosto z pustyni."],["tokio","Tokio","Japonia","m",35.6762,139.6503,"Asia/Tokyo","Największa aglomeracja świata — neony Shinjuku i ciche świątynie obok."],["kioto","Kioto","Japonia","m",35.0116,135.7681,"Asia/Tokyo","Dawna stolica: świątynie, klonowe ogrody i drewniane uliczki Gion."],["singapur","Singapur","Singapur","m",1.3521,103.8198,"Asia/Singapore","Miasto-państwo tuż przy równiku, z ogrodami wśród wieżowców."],["hongkong","Hongkong","Chiny","m",22.3193,114.1694,"Asia/Hong_Kong","Las wieżowców między górami a portem Wiktorii."],["bangkok","Bangkok","Tajlandia","m",13.7563,100.5018,"Asia/Bangkok","Złote świątynie, pływające targi i rzeka Menam."],["sydney","Sydney","Australia","m",-33.8688,151.2093,"Australia/Sydney","Port, muszle Opery i most Harbour Bridge nad zatoką."],["nowy-jork","Nowy Jork","Stany Zjednoczone","m",40.7128,-74.006,"America/New_York","Siatka ulic Manhattanu i światła mostów nad East River."],["san-francisco","San Francisco","Stany Zjednoczone","m",37.7749,-122.4194,"America/Los_Angeles","Golden Gate we mgle i strome ulice z tramwajami linowymi."],["vancouver","Vancouver","Kanada","m",49.2827,-123.1207,"America/Vancouver","Miasto między oceanem a ośnieżonymi Górami Nadbrzeżnymi."],["meksyk","Meksyk","Meksyk","m",19.4326,-99.1332,"America/Mexico_City","Ogromna stolica na miejscu azteckiego Tenochtitlán, 2240 m n.p.m."],["hawana","Hawana","Kuba","m",23.1136,-82.3666,"America/Havana","Kolonialne fasady, stare amerykańskie auta i nadmorski Malecón."],["rio","Rio de Janeiro","Brazylia","m",-22.9068,-43.1729,"America/Sao_Paulo","Głowa Cukru, Copacabana i Chrystus Odkupiciel na szczycie Corcovado."],["buenos-aires","Buenos Aires","Argentyna","m",-34.6037,-58.3816,"America/Argentina/Buenos_Aires","Tango w San Telmo i szerokie aleje nad estuarium La Platy."],["giza","Piramidy w Gizie","Egipt","c",29.9792,31.1342,"Africa/Cairo","Jedyny z siedmiu cudów świata starożytnego, który przetrwał do dziś."],["petra","Petra","Jordania","c",30.3285,35.4444,"Asia/Amman","Miasto Nabatejczyków wykute w różowym piaskowcu."],["wielki-mur","Wielki Mur (Mutianyu)","Chiny","c",40.4319,116.5704,"Asia/Shanghai","Odcinek muru wijący się po zalesionych grzbietach na północ od Pekinu."],["tadz-mahal","Tadż Mahal","Agra, Indie","c",27.1751,78.0421,"Asia/Kolkata","Marmurowe mauzoleum wzniesione przez szacha Dżahana dla zmarłej żony."],["koloseum","Koloseum","Rzym, Włochy","c",41.8902,12.4922,"Europe/Rome","Amfiteatr na około 50 tysięcy widzów, otwarty w 80 roku n.e."],["machu-picchu","Machu Picchu","Peru","c",-13.1631,-72.545,"America/Lima","Inkaskie miasto na grzbiecie Andów, odkryte dla świata w 1911 roku."],["chichen-itza","Chichén Itzá","Jukatan, Meksyk","c",20.6843,-88.5678,"America/Merida","Piramida Kukulkana, po której w równonoc pełznie świetlny wąż."],["angkor-wat","Angkor Wat","Kambodża","c",13.4125,103.867,"Asia/Phnom_Penh","Największa świątynia świata, otoczona fosą i dżunglą."],["akropol","Akropol","Ateny, Grecja","c",37.9715,23.7257,"Europe/Athens","Partenon na skalistym wzgórzu nad Atenami."],["stonehenge","Stonehenge","Anglia, Wielka Brytania","c",51.1789,-1.8262,"Europe/London","Krąg kamieni ustawiony ponad 4500 lat temu, zgrany z przesileniami."],["rapa-nui","Posągi moai","Rapa Nui (Wyspa Wielkanocna), Chile","c",-27.1127,-109.3497,"Pacific/Easter","Kamienne głowy na jednej z najbardziej odludnych zamieszkanych wysp."],["sagrada","Sagrada Família","Barcelona, Hiszpania","c",41.4036,2.1744,"Europe/Madrid","Bazylika Gaudíego budowana od 1882 roku."],["wielki-kanion","Wielki Kanion","Arizona, Stany Zjednoczone","n",36.0544,-112.1401,"America/Phoenix","Rzeka Kolorado wyrzeźbiła wąwóz głęboki na prawie 1,9 km."],["niagara","Wodospad Niagara","Kanada i Stany Zjednoczone","n",43.0962,-79.0377,"America/Toronto","Trzy wodospady na granicy, z ogromnym przepływem wody."],["everest","Mount Everest","Nepal i Chiny","n",27.9881,86.925,"Asia/Kathmandu","Najwyższy szczyt Ziemi, 8849 m nad poziomem morza."],["wiktoria","Wodospad Wiktorii","Zambia i Zimbabwe","n",-17.9243,25.8572,"Africa/Harare","Zambezi spada ponad stumetrowym progiem; miejscowi mówią o „dymie, który grzmi”."],["kilimandzaro","Kilimandżaro","Tanzania","n",-3.0674,37.3556,"Africa/Dar_es_Salaam","Najwyższa góra Afryki, wulkan ze śniegiem niemal na równiku."],["serengeti","Serengeti","Tanzania","n",-2.3333,34.8333,"Africa/Dar_es_Salaam","Sawanna wielkiej wędrówki gnu i zebr."],["sahara","Erg Chebbi","Sahara, Maroko","n",31.15,-3.9667,"Africa/Casablanca","Pomarańczowe wydmy na skraju największej gorącej pustyni świata."],["galapagos","Galápagos","Ekwador","n",-.9538,-90.9656,"Pacific/Galapagos","Wulkaniczne wyspy żółwi olbrzymich, które zainspirowały Darwina."],["iguazu","Wodospady Iguazú","Argentyna i Brazylia","n",-25.6953,-54.4367,"America/Argentina/Buenos_Aires","Ponad 270 kaskad w podzwrotnikowym lesie, z Gardzielą Diabła."],["rafa","Wielka Rafa Koralowa","Australia","n",-18.2871,147.6992,"Australia/Brisbane","Największa struktura zbudowana przez organizmy żywe, widoczna z orbity."],["uluru","Uluru","Australia","n",-25.3444,131.0369,"Australia/Darwin","Święta skała Anangu, czerwieniejąca o zachodzie słońca."],["ha-long","Zatoka Ha Long","Wietnam","n",20.9101,107.1839,"Asia/Ho_Chi_Minh","Prawie dwa tysiące wapiennych wysp wyrastających z morza."],["bajkal","Bajkał","Syberia, Rosja","n",53.5587,108.165,"Asia/Irkutsk","Najgłębsze jezioro świata, z około 20% słodkiej wody powierzchniowej Ziemi."],["geiranger","Geirangerfjord","Norwegia","n",62.1049,7.0947,"Europe/Oslo","Wąski fiord wśród stromych ścian i wodospadów."],["santorini","Santorini","Grecja","n",36.3932,25.4615,"Europe/Athens","Białe domy na krawędzi kaldery po wybuchu wulkanu sprzed 3600 lat."],["antarktyda","Biegun Południowy","Antarktyda","n",-90,0,"Antarctica/McMurdo","Lodowa wyżyna na wysokości 2800 m, gdzie zbiegają się wszystkie południki."]],Xr=K0.map(([i,e,t,n,r,s,a,o])=>({id:i,name:e,region:t,cat:n,lat:r,lng:s,tz:a,blurb:o})),Me=i=>document.querySelector(i),Z0=qr.isNativePlatform(),Dt={get(i,e){try{const t=localStorage.getItem("meridian-"+i);return t==null?e:JSON.parse(t)}catch{return e}},set(i,e){try{localStorage.setItem("meridian-"+i,JSON.stringify(e))}catch{}}},Rt={real:!0,clouds:!0,spin:!0,...Dt.get("settings",{})},xn=new Set(Dt.get("favorites",[]));let Ti=Dt.get("own",[]).filter(i=>i&&i.name&&Number.isFinite(i.lat)&&Number.isFinite(i.lng)),pt=Dt.get("home",null);const $n=Dt.get("best",{}),Ni=()=>Xr.concat(Ti.map(i=>({...i,cat:"own",region:"Moje miejsce",tz:null,blurb:""}))),so=i=>Ni().find(e=>e.id===i),yi=i=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`,on={tour:yi('<path d="M3 11l18-8-8 18-2-8-8-2z"/>'),quiz:yi('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><path d="M12 17h.01"/>'),settings:yi('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),close:yi('<path d="M6 6l12 12M18 6L6 18"/>'),star:yi('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),stop:yi('<rect x="6" y="6" width="12" height="12" rx="2"/>')};Me("#btn-tour").innerHTML=on.tour;Me("#btn-quiz").innerHTML=on.quiz;Me("#btn-settings").innerHTML=on.settings;Me("#version").textContent="wersja 1.0.0";let vt=null,Vt="places";const Ie=$0(Me("#view"),{onPlace:i=>{Vt==="places"&&fr(i,{scroll:!0})},onGround:i=>{Vt==="quiz"?sx(i):Vt==="places"&&tx(i)}});Ie.whenReady(()=>Me("#loading").classList.add("done"));let Ji=0;const Kr=()=>new Date(Date.now()+Ji*36e5),J0=new Intl.DateTimeFormat("pl-PL",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});function ao(){Ie.setSun(Rt.real);const i=ll(Kr());Ie.setSubsolar(i.lat,i.lng);const e=Ji?` <b>${Ji>0?"+":"−"}${pl(Math.abs(Ji))}</b>`:"";Me("#clock").innerHTML=Rt.real?J0.format(Kr())+e:"Zawsze dzień"}function pl(i){const e=Math.floor(i),t=Math.round((i-e)*60);return t?`${e} h ${t} min`:`${e} h`}function Q0(){ao(),Vt==="places"&&(ni(),ii())}setInterval(Q0,3e4);let en=Dt.get("filter","all"),ml="";const Rc=i=>i.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").replace(/ł/g,"l");function oo(){const i=Rc(ml.trim());return Ni().filter(e=>en==="fav"&&!xn.has(e.id)||en!=="all"&&en!=="fav"&&e.cat!==en?!1:!i||Rc(e.name+" "+e.region).includes(i))}function Qi(){const i=Ni(),e=t=>t==="all"?i.length:t==="fav"?i.filter(n=>xn.has(n.id)).length:i.filter(n=>n.cat===t).length;Me("#chips").innerHTML="";for(const t of j0){const n=e(t.id);if(!n&&(t.id==="fav"||t.id==="own")&&en!==t.id)continue;const r=document.createElement("button");r.type="button",r.className="chip"+(en===t.id?" on":""),r.setAttribute("role","tab"),r.setAttribute("aria-selected",String(en===t.id)),r.innerHTML=`${t.label}<small>${n}</small>`,r.onclick=()=>{en=t.id,Dt.set("filter",en),Qi(),ni()},Me("#chips").appendChild(r)}}function ex(i){return i>0?"":i>-6?"dusk":"night"}function ni(){const i=Me("#list"),e=oo(),t=Kr();if(i.innerHTML="",!e.length){i.innerHTML=`<li class="empty">${en==="fav"?"Nie masz jeszcze ulubionych. Otwórz miejsce i dotknij gwiazdki.":en==="own"?"Dotknij globusu w dowolnym punkcie, żeby dodać własne miejsce.":"Nic nie pasuje do wyszukiwania."}</li>`;return}for(const n of e){const r=document.createElement("li"),s=document.createElement("button");s.type="button",s.dataset.id=n.id;const a=vt?.type==="place"&&vt.id===n.id;s.className=a?"on":"";const o=ul(n.lat,n.lng,t);s.innerHTML=`<i class="mark${n.cat==="own"?" own":""}"></i><span class="copy"><strong></strong><span class="sub"></span></span><span class="time"><i class="sun-dot ${ex(o)}"></i>${fl(t,n.tz,n.lng)}</span>`,s.querySelector("strong").textContent=n.name,s.querySelector(".sub").textContent=n.region,s.onclick=()=>{si(),fr(n.id)},r.appendChild(s),i.appendChild(r)}}Me("#q").addEventListener("input",i=>{ml=i.target.value,ni()});Me("#q").addEventListener("keydown",i=>{if(i.key==="Enter"){const e=oo()[0];e&&fr(e.id),i.target.blur()}});function fr(i,{scroll:e=!1,fly:t=!0}={}){const n=so(i);if(n){if(vt?.type==="place"&&vt.id===i&&!Jn){Zn();return}vt={type:"place",id:i},Ie.setPin("tap",null),Ie.select(i,{fly:t}),Zr(n),ii(),ni(),e&&Me(`#list button[data-id="${CSS.escape(i)}"]`)?.scrollIntoView({block:"nearest",behavior:"smooth"})}}function tx(i){si(),vt={type:"point",lat:i.lat,lng:i.lng},Ie.select(null,{fly:!1}),Ie.setPin("tap",i,9425919),Zr(i),ii(),ni(),cr()==="mini"&&cn("peek")}function Zn(){vt=null,Ie.select(null,{fly:!1}),Ie.setPin("tap",null),Ie.setArc(null),Ie.release(),ii(),ni()}function Zr(i){pt&&i&&no(pt.lat,pt.lng,i.lat,i.lng)>30?Ie.setArc(pt,i):Ie.setArc(null)}function Pc(i,e,t,n=!0){const r=Kr(),s=ul(i,e,r),a=fl(r,t,e),o=[`<span>${t?"Czas lokalny":"Czas słoneczny (przybliżony)"}: <b>${a}</b></span>`,`<span>Teraz: <b>${H0(s)}</b></span>`];if(pt){const c=no(pt.lat,pt.lng,i,e);c>30?o.push(`<span class="km">Od mojego punktu: <b>${hl(c)}</b> · lot ok. ${G0(k0(c))}</span>`):o.push('<span class="km">To jest <b>tuż obok</b> twojego punktu</span>')}return n&&o.push(`<span>${io(i,e)}</span>`),`<div class="facts">${o.join("")}</div>`}function ii(){const i=Me("#detail");if(!vt){i.innerHTML='<p class="hint">Przeciągnij globus, szczypnij albo przewiń, żeby przybliżyć. Dotknij świecącego znacznika lub miejsca z listy — kamera tam doleci. Dotknij dowolnego punktu Ziemi, żeby sprawdzić, która tam godzina.</p>';return}if(vt.type==="place"){const r=so(vt.id);if(!r)return Zn();const s=xn.has(r.id);i.innerHTML=`<div class="card">
      <div class="card-head"><div><p class="region"></p><h2></h2></div>
      <button class="star${s?" on":""}" type="button" aria-pressed="${s}" aria-label="${s?"Usuń z ulubionych":"Dodaj do ulubionych"}">${on.star}</button></div>
      ${r.blurb?'<p class="blurb"></p>':""}
      ${Pc(r.lat,r.lng,r.tz)}
      <div class="card-actions">
        <button class="ghost small" data-act="close" type="button">Zamknij</button>
        <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
        ${r.cat==="own"?'<button class="ghost small danger" data-act="delete" type="button">Usuń miejsce</button>':""}
      </div></div>`,i.querySelector(".region").textContent=r.region,i.querySelector("h2").textContent=r.name,r.blurb&&(i.querySelector(".blurb").textContent=r.blurb),i.querySelector(".star").onclick=()=>{xn.has(r.id)?xn.delete(r.id):xn.add(r.id),Dt.set("favorites",[...xn]),ii(),Qi()},i.querySelector('[data-act="close"]').onclick=Zn,i.querySelector('[data-act="home"]').onclick=()=>Jr({lat:r.lat,lng:r.lng,label:r.name}),i.querySelector('[data-act="delete"]')?.addEventListener("click",()=>{Ti=Ti.filter(a=>a.id!==r.id),xn.delete(r.id),Dt.set("own",Ti),Dt.set("favorites",[...xn]),Ie.setPlaces(Ni()),Zn(),Qi(),Fn(`Usunięto „${r.name}”.`)});return}const{lat:e,lng:t}=vt;i.innerHTML=`<div class="card">
    <p class="region">Wybrany punkt</p><h2>${io(e,t).replace(/\s{3}/,", ")}</h2>
    ${Pc(e,t,null,!1)}
    <form class="name-form" hidden><input type="text" maxlength="40" placeholder="Nazwa miejsca" aria-label="Nazwa miejsca" required /><button class="solid" type="submit">Zapisz</button></form>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="add" type="button">Dodaj do moich miejsc</button>
      <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
    </div></div>`;const n=i.querySelector(".name-form");i.querySelector('[data-act="close"]').onclick=Zn,i.querySelector('[data-act="home"]').onclick=()=>Jr({lat:e,lng:t,label:null}),i.querySelector('[data-act="add"]').onclick=r=>{n.hidden=!1,r.currentTarget.hidden=!0,n.querySelector("input").focus()},n.onsubmit=r=>{r.preventDefault();const s=n.querySelector("input").value.trim();if(!s)return;const a={id:"own-"+Date.now().toString(36),name:s,lat:+e.toFixed(4),lng:+t.toFixed(4)};Ti.push(a),Dt.set("own",Ti),Ie.setPlaces(Ni()),Qi(),fr(a.id,{fly:!1}),Fn(`Dodano „${s}” do moich miejsc.`)}}function Jr(i){pt=i?{lat:Math.round(i.lat*100)/100,lng:Math.round(i.lng*100)/100,label:i.label||null}:null,Dt.set("home",pt),Ie.setPin("home",pt,10477760),xl(),vt?.type==="place"?Zr(so(vt.id)):vt?.type==="point"&&Zr(vt),ii(),i&&Fn("Zapisano twój punkt — przy każdym miejscu zobaczysz odległość.")}function xl(){Me("#home-info").textContent=pt?`${pt.label?pt.label+" · ":""}${io(pt.lat,pt.lng)}`:"Nie ustawiono. Z mojego punktu liczę odległości i rysuję trasę lotu.",Me("#home-clear").hidden=!pt}Me("#home-clear").onclick=()=>{Jr(null),Fn("Usunięto twój punkt.")};Me("#home-gps").onclick=()=>{if(!navigator.geolocation)return Fn("To urządzenie nie udostępnia lokalizacji.");Me("#home-gps").disabled=!0,navigator.geolocation.getCurrentPosition(i=>{Me("#home-gps").disabled=!1,Jr({lat:i.coords.latitude,lng:i.coords.longitude,label:"Moja lokalizacja"}),Ie.focus(pt.lat,pt.lng)},()=>{Me("#home-gps").disabled=!1,Fn("Nie udało się pobrać lokalizacji. Możesz dotknąć globusu i ustawić punkt ręcznie.")},{enableHighAccuracy:!1,timeout:15e3,maximumAge:6e5})};const Ua=Me("#opt-real"),Ia=Me("#opt-clouds"),Na=Me("#opt-spin"),Fa=Me("#opt-time");Ua.checked=Rt.real;Ia.checked=Rt.clouds;Na.checked=Rt.spin;function co(){Dt.set("settings",Rt)}Ua.onchange=()=>{Rt.real=Ua.checked,Me("#time-box").hidden=!Rt.real,co(),ao()};Ia.onchange=()=>{Rt.clouds=Ia.checked,Ie.setClouds(Rt.clouds),co()};Na.onchange=()=>{Rt.spin=Na.checked,Ie.setSpin(Rt.spin),co()};function lo(i){Ji=i,Fa.value=String(i),Me("#time-out").textContent=i?(i>0?"+":"−")+pl(Math.abs(i)):"teraz",Me("#time-now").hidden=!i,ao()}Fa.oninput=()=>lo(Number(Fa.value));Me("#time-now").onclick=()=>lo(0);const er=Me("#panel"),ri=()=>matchMedia("(min-width: 820px)").matches,cr=()=>er.dataset.sheet;function cn(i){er.dataset.sheet=i}function ti(i){Vt=i;for(const e of["places","quiz","settings"])Me(`#view-${e}`).hidden=e!==i;Me("#btn-quiz").classList.toggle("on",i==="quiz"),Me("#btn-settings").classList.toggle("on",i==="settings"),Me("#btn-quiz").innerHTML=i==="quiz"?on.close:on.quiz,Me("#btn-settings").innerHTML=i==="settings"?on.close:on.settings,i==="places"&&(ni(),ii())}Me("#btn-settings").onclick=()=>{si(),Vt==="quiz"&&rs(),ti(Vt==="settings"?"places":"settings"),Vt==="settings"&&cr()!=="full"&&!ri()&&cn("full")};{const i=Me("#grip");let e=null;i.addEventListener("pointerdown",t=>{e=t.clientY,i.setPointerCapture(t.pointerId)}),i.addEventListener("pointerup",t=>{if(e==null)return;const n=t.clientY-e;e=null;const r=["mini","peek","full"],s=r.indexOf(cr());n<-24?cn(r[Math.min(2,s+1)]):n>24?cn(r[Math.max(0,s-1)]):cn(cr()==="full"?"peek":"full")})}new ResizeObserver(()=>{ri()?Ie.setViewShift((er.offsetWidth+16)/2,0):Ie.setViewShift(0,Math.min(er.offsetHeight,window.innerHeight*.6)/2)}).observe(er);let Jn=null;function nx(){const i=oo();if(i.length<2)return Fn("Za mało miejsc na liście, żeby ruszyć w wycieczkę.");Vt!=="places"&&ti("places");let e=vt?.type==="place"?i.findIndex(n=>n.id===vt.id):-1;const t=()=>{e=(e+1)%i.length,fr(i[e].id,{scroll:!0})};Jn=setInterval(t,7e3),t(),Me("#btn-tour").classList.add("on"),Me("#btn-tour").innerHTML=on.stop,Me("#btn-tour").setAttribute("aria-label","Zatrzymaj wycieczkę"),Fn(`Wycieczka po ${i.length} miejscach. Dotknij globusu, żeby przerwać.`)}function si(){Jn&&(clearInterval(Jn),Jn=null,Me("#btn-tour").classList.remove("on"),Me("#btn-tour").innerHTML=on.tour,Me("#btn-tour").setAttribute("aria-label","Wycieczka po miejscach"))}Me("#btn-tour").onclick=()=>Jn?si():nx();Me("#view canvas").addEventListener("pointerdown",si);const ix=[{id:"easy",label:"Łatwy",desc:"Miasta świata, z podpowiedzią kraju",pool:()=>Xr.filter(i=>i.cat==="m"),hint:!0},{id:"world",label:"Cały świat",desc:"Miasta, cuda i przyroda — bez podpowiedzi",pool:()=>Xr,hint:!1},{id:"pl",label:"Polska",desc:"Miejsca w Polsce — tu liczy się każdy kilometr",pool:()=>Xr.filter(i=>i.cat==="p"),hint:!1,scale:8}],gl=10;let ai=null;function rx(i){const e=i.slice();for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}return e}Me("#btn-quiz").onclick=()=>{if(si(),Vt==="quiz"){rs(),ti("places");return}Zn(),ti("quiz"),Ie.setMarkersVisible(!1),Ie.setPin("home",null),uo()};function uo(){ai=null;const i=Me("#view-quiz");i.innerHTML=`<h2 class="section-title">Gdzie to jest?</h2>
    <p class="hint">Dostajesz nazwę miejsca i dotykasz globusu tam, gdzie twoim zdaniem leży. Im bliżej, tym więcej punktów — maksymalnie 1000 za rundę, ${gl} rund.</p>
    <div class="levels"></div>`;for(const e of ix){const t=document.createElement("button");t.type="button",t.className="level",t.innerHTML=`<strong>${e.label}</strong><small>${e.desc}${$n[e.id]?` · rekord ${$n[e.id]}`:""}</small>`,t.onclick=()=>_l(e),i.querySelector(".levels").appendChild(t)}ri()||cn("peek")}function _l(i){ai={level:i,list:rx(i.pool()).slice(0,gl),round:0,score:0,answered:!1},vl()}function vl(){const i=ai,e=i.list[i.round];i.answered=!1,Ie.setPin("guess",null),Ie.setPin("target",null),Ie.setArc(null),Ie.release(),Me("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${i.round+1}</b> z ${i.list.length}</span><span>Wynik <b>${i.score}</b></span></div>
    <div class="progress"><i style="width:${i.round/i.list.length*100}%"></i></div>
    <p class="hint">Gdzie leży…</p>
    <p class="quiz-target"></p>
    ${i.level.hint?'<p class="region quiz-hint"></p>':""}
    <p class="hint">Obróć globus i dotknij miejsca, które obstawiasz.</p>`,Me("#view-quiz .quiz-target").textContent=e.name,i.level.hint&&(Me("#view-quiz .quiz-hint").textContent=e.region),ri()||cn("mini")}function sx(i){const e=ai;if(!e||e.answered)return;e.answered=!0;const t=e.list[e.round],n=no(i.lat,i.lng,t.lat,t.lng),r=B0(n*(e.level.scale||1));e.score+=r,Ie.setPin("guess",i,9425919),Ie.setPin("target",t,16766090),Ie.setArc(i,t);const s={lat:(i.lat+t.lat)/2,lng:Math.abs(i.lng-t.lng)>180?(i.lng+t.lng+360)/2%360:(i.lng+t.lng)/2};Ie.focus(s.lat,s.lng>180?s.lng-360:s.lng,Math.min(4.2,1.9+n/4e3));const a=n<50?"W punkt!":n<300?"Bardzo blisko.":n<1e3?"Niedaleko.":n<3e3?"Ten sam kawałek świata.":"Daleko…",o=e.round+1>=e.list.length;Me("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${e.round+1}</b> z ${e.list.length}</span><span>Wynik <b>${e.score}</b></span></div>
    <div class="progress"><i style="width:${(e.round+1)/e.list.length*100}%"></i></div>
    <p class="quiz-target"></p>
    <p class="quiz-result"><span class="pts">+${r}</span><br>${a} Twój strzał był <b>${hl(n)}</b> od celu.</p>
    <p class="blurb"></p>
    <div class="row-buttons"><button class="solid" type="button" id="quiz-next">${o?"Zobacz wynik":"Dalej"}</button></div>`,Me("#view-quiz .quiz-target").textContent=t.name,Me("#view-quiz .blurb").textContent=`${t.region}. ${t.blurb}`,Me("#quiz-next").onclick=()=>{e.round+=1,e.round>=e.list.length?ax():vl()},ri()||cn("peek")}function ax(){const i=ai,e=i.list.length*1e3,t=i.score>($n[i.level.id]||0);t&&($n[i.level.id]=i.score,Dt.set("best",$n)),Ie.setPin("guess",null),Ie.setPin("target",null),Ie.setArc(null),Ie.release();const n=i.score/e,r=n>.85?"Mistrzowska orientacja!":n>.65?"Świetny wynik.":n>.4?"Całkiem nieźle.":"Globus czeka na kolejne podejście.";Me("#view-quiz").innerHTML=`
    <h2 class="section-title">Koniec quizu</h2>
    <p class="quiz-result"><span class="pts">${i.score}</span> / ${e}<br>${r}${t?" <b>To twój nowy rekord!</b>":$n[i.level.id]?` Rekord: ${$n[i.level.id]}.`:""}</p>
    <div class="row-buttons">
      <button class="solid" type="button" id="quiz-again">Jeszcze raz</button>
      <button class="ghost" type="button" id="quiz-levels">Inny poziom</button>
      <button class="ghost" type="button" id="quiz-close">Zamknij quiz</button>
    </div>`,Me("#quiz-again").onclick=()=>_l(i.level),Me("#quiz-levels").onclick=uo,Me("#quiz-close").onclick=()=>{rs(),ti("places")},ri()||cn("peek")}function rs(){ai=null,Ie.setPin("guess",null),Ie.setPin("target",null),Ie.setArc(null),Ie.setMarkersVisible(!0),Ie.setPin("home",pt,10477760),Ie.release()}let Lc=0;function Fn(i){const e=Me("#toast");e.textContent=i,e.hidden=!1,clearTimeout(Lc),Lc=setTimeout(()=>e.hidden=!0,3600)}Z0&&Rl(async()=>{const{App:i}=await import("./index-BNkctwPQ.js");return{App:i}},[],import.meta.url).then(({App:i})=>{i.addListener("backButton",()=>{Jn?si():Vt==="quiz"&&ai?uo():Vt!=="places"?(Vt==="quiz"&&rs(),ti("places")):vt?Zn():!ri()&&cr()==="full"?cn("peek"):i.exitApp()})});Ie.setPlaces(Ni());Ie.setClouds(Rt.clouds);Ie.setSpin(Rt.spin);Ie.setPin("home",pt,10477760);Me("#time-box").hidden=!Rt.real;lo(0);Qi();xl();ti("places");"serviceWorker"in navigator&&window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));export{za as W,Rl as _,Oa as r};
