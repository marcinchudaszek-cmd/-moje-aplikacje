(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}})();const sd="modulepreload",od=function(n,e){return new URL(n,e).href},Ic={},cd=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){let l=function(u){return Promise.all(u.map(d=>Promise.resolve(d).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const s=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");r=l(t.map(u=>{if(u=od(u,i),u in Ic)return;Ic[u]=!0;const d=u.endsWith(".css"),h=d?'[rel="stylesheet"]':"";if(i)for(let g=s.length-1;g>=0;g--){const _=s[g];if(_.href===u&&(!d||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${u}"]${h}`))return;const f=document.createElement("link");if(f.rel=d?"stylesheet":sd,d||(f.as="script"),f.crossOrigin="",f.href=u,c&&f.setAttribute("nonce",c),document.head.appendChild(f),d)return new Promise((g,_)=>{f.addEventListener("load",g),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(s){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=s,window.dispatchEvent(o),!o.defaultPrevented)throw s}return r.then(s=>{for(const o of s||[])o.status==="rejected"&&a(o.reason);return e().catch(a)})};var vr;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(vr||(vr={}));class ps extends Error{constructor(e,t,i){super(e),this.message=e,this.code=t,this.data=i}}const ld=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},ud=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},i=t.Plugins=t.Plugins||{},r=()=>e!==null?e.name:ld(n),a=()=>r()!=="web",s=d=>{const h=l.get(d);return!!(h?.platforms.has(r())||o(d))},o=d=>{var h;return(h=t.PluginHeaders)===null||h===void 0?void 0:h.find(f=>f.name===d)},c=d=>n.console.error(d),l=new Map,u=(d,h={})=>{const f=l.get(d);if(f)return console.warn(`Capacitor plugin "${d}" already registered. Cannot register plugins twice.`),f.proxy;const g=r(),_=o(d);let m;const p=async()=>(!m&&g in h?m=typeof h[g]=="function"?m=await h[g]():m=h[g]:e!==null&&!m&&"web"in h&&(m=typeof h.web=="function"?m=await h.web():m=h.web),m),R=(z,b)=>{var M,L;if(_){const I=_?.methods.find(F=>b===F.name);if(I)return I.rtype==="promise"?F=>t.nativePromise(d,b.toString(),F):(F,G)=>t.nativeCallback(d,b.toString(),F,G);if(z)return(M=z[b])===null||M===void 0?void 0:M.bind(z)}else{if(z)return(L=z[b])===null||L===void 0?void 0:L.bind(z);throw new ps(`"${d}" plugin is not implemented on ${g}`,vr.Unimplemented)}},w=z=>{let b;const M=(...L)=>{const I=p().then(F=>{const G=R(F,z);if(G){const j=G(...L);return b=j?.remove,j}else throw new ps(`"${d}.${z}()" is not implemented on ${g}`,vr.Unimplemented)});return z==="addListener"&&(I.remove=async()=>b()),I};return M.toString=()=>`${z.toString()}() { [capacitor code] }`,Object.defineProperty(M,"name",{value:z,writable:!1,configurable:!1}),M},A=w("addListener"),E=w("removeListener"),y=(z,b)=>{const M=A({eventName:z},b),L=async()=>{const F=await M;E({eventName:z,callbackId:F},b)},I=new Promise(F=>M.then(()=>F({remove:L})));return I.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await L()},I},D=new Proxy({},{get(z,b){switch(b){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return _?y:A;case"removeListener":return E;default:return w(b)}}});return i[d]=D,l.set(d,{name:d,proxy:D,platforms:new Set([...Object.keys(h),..._?[g]:[]])}),D};return t.convertFileSrc||(t.convertFileSrc=d=>d),t.getPlatform=r,t.handleError=c,t.isNativePlatform=a,t.isPluginAvailable=s,t.registerPlugin=u,t.Exception=ps,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},dd=n=>n.Capacitor=ud(n),Ka=dd(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),nc=Ka.registerPlugin;class ic{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let i=!1;this.listeners[e]||(this.listeners[e]=[],i=!0),this.listeners[e].push(t);const a=this.windowListeners[e];a&&!a.registered&&this.addWindowListener(a),i&&this.sendRetainedArgumentsForEvent(e);const s=async()=>this.removeListener(e,t);return Promise.resolve({remove:s})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,i){const r=this.listeners[e];if(!r){if(i){let a=this.retainedEventArguments[e];a||(a=[]),a.push(t),this.retainedEventArguments[e]=a}return}r.forEach(a=>a(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:i=>{this.notifyListeners(t,i)}}}unimplemented(e="not implemented"){return new Ka.Exception(e,vr.Unimplemented)}unavailable(e="not available"){return new Ka.Exception(e,vr.Unavailable)}async removeListener(e,t){const i=this.listeners[e];if(!i)return;const r=i.indexOf(t);this.listeners[e].splice(r,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(i=>{this.notifyListeners(e,i)}))}}const Nc=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Fc=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class hd extends ic{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[r,a]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");r=Fc(r).trim(),a=Fc(a).trim(),t[r]=a}),t}async setCookie(e){try{const t=Nc(e.key),i=Nc(e.value),r=e.expires?`; expires=${e.expires.replace("expires=","")}`:"",a=(e.path||"/").replace("path=",""),s=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${i||""}${r}; path=${a}; ${s};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}nc("CapacitorCookies",{web:()=>new hd});const fd=async n=>new Promise((e,t)=>{const i=new FileReader;i.onload=()=>{const r=i.result;e(r.indexOf(",")>=0?r.split(",")[1]:r)},i.onerror=r=>t(r),i.readAsDataURL(n)}),pd=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(r=>r.toLocaleLowerCase()).reduce((r,a,s)=>(r[a]=n[e[s]],r),{})},md=(n,e=!0)=>n?Object.entries(n).reduce((i,r)=>{const[a,s]=r;let o,c;return Array.isArray(s)?(c="",s.forEach(l=>{o=e?encodeURIComponent(l):l,c+=`${a}=${o}&`}),c.slice(0,-1)):(o=e?encodeURIComponent(s):s,c=`${a}=${o}`),`${i}&${c}`},"").substr(1):null,xd=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),r=pd(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(r.includes("application/x-www-form-urlencoded")){const a=new URLSearchParams;for(const[s,o]of Object.entries(n.data||{}))a.set(s,o);t.body=a.toString()}else if(r.includes("multipart/form-data")||n.data instanceof FormData){const a=new FormData;if(n.data instanceof FormData)n.data.forEach((o,c)=>{a.append(c,o)});else for(const o of Object.keys(n.data))a.append(o,n.data[o]);t.body=a;const s=new Headers(t.headers);s.delete("content-type"),t.headers=s}else(r.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class gd extends ic{async request(e){const t=xd(e,e.webFetchExtra),i=md(e.params,e.shouldEncodeUrlParams),r=i?`${e.url}?${i}`:e.url,a=await fetch(r,t),s=a.headers.get("content-type")||"";let{responseType:o="text"}=a.ok?e:{};s.includes("application/json")&&(o="json");let c,l;switch(o){case"arraybuffer":case"blob":l=await a.blob(),c=await fd(l);break;case"json":c=await a.json();break;default:c=await a.text()}const u={};return a.headers.forEach((d,h)=>{u[h]=d}),{data:c,headers:u,status:a.status,url:a.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}nc("CapacitorHttp",{web:()=>new gd});var kc;(function(n){n.Dark="DARK",n.Light="LIGHT",n.Default="DEFAULT"})(kc||(kc={}));var Oc;(function(n){n.StatusBar="StatusBar",n.NavigationBar="NavigationBar"})(Oc||(Oc={}));class vd extends ic{async setStyle(){this.unavailable("not available for web")}async setAnimation(){this.unavailable("not available for web")}async show(){this.unavailable("not available for web")}async hide(){this.unavailable("not available for web")}}nc("SystemBars",{web:()=>new vd});const rc="181",_d=0,Bc=1,yd=2,lu=1,Md=2,jn=3,ei=0,nn=1,Sn=2,Zn=0,mr=1,Ii=2,Vc=3,Gc=4,bd=5,Li=100,Sd=101,wd=102,Ed=103,Td=104,Ad=200,Cd=201,Rd=202,Pd=203,no=204,io=205,Ld=206,Dd=207,zd=208,Ud=209,Id=210,Nd=211,Fd=212,kd=213,Od=214,ro=0,ao=1,so=2,_r=3,oo=4,co=5,lo=6,uo=7,uu=0,Bd=1,Vd=2,yi=0,Gd=1,Hd=2,Wd=3,Xd=4,qd=5,jd=6,Yd=7,du=300,yr=301,Mr=302,ho=303,fo=304,ls=306,po=1e3,$n=1001,mo=1002,fn=1003,$d=1004,ha=1005,hn=1006,ms=1007,Ni=1008,ti=1009,hu=1010,fu=1011,Zr=1012,ac=1013,Vi=1014,Dn=1015,Er=1016,sc=1017,oc=1018,Jr=1020,pu=35902,mu=35899,xu=1021,gu=1022,Tn=1023,Qr=1026,ea=1027,cc=1028,lc=1029,uc=1030,dc=1031,hc=1033,Xa=33776,qa=33777,ja=33778,Ya=33779,xo=35840,go=35841,vo=35842,_o=35843,yo=36196,Mo=37492,bo=37496,So=37808,wo=37809,Eo=37810,To=37811,Ao=37812,Co=37813,Ro=37814,Po=37815,Lo=37816,Do=37817,zo=37818,Uo=37819,Io=37820,No=37821,Fo=36492,ko=36494,Oo=36495,Bo=36283,Vo=36284,Go=36285,Ho=36286,Kd=3200,Zd=3201,Jd=0,Qd=1,gi="",kt="srgb",br="srgb-linear",Za="linear",ut="srgb",ji=7680,Hc=519,eh=512,th=513,nh=514,vu=515,ih=516,rh=517,ah=518,sh=519,Wo=35044,Wc="300 es",zn=2e3,Ja=2001;function _u(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function ta(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function oh(){const n=ta("canvas");return n.style.display="block",n}const Xc={};function Qa(...n){const e="THREE."+n.shift();console.log(e,...n)}function $e(...n){const e="THREE."+n.shift();console.warn(e,...n)}function Mt(...n){const e="THREE."+n.shift();console.error(e,...n)}function na(...n){const e=n.join(" ");e in Xc||(Xc[e]=!0,$e(...n))}function ch(n,e,t){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}}setTimeout(a,t)})}class Tr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const a=r.indexOf(t);a!==-1&&r.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let a=0,s=r.length;a<s;a++)r[a].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let qc=1234567;const Wr=Math.PI/180,ia=180/Math.PI;function Jn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function et(n,e,t){return Math.max(e,Math.min(t,n))}function fc(n,e){return(n%e+e)%e}function lh(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function uh(n,e,t){return n!==e?(t-n)/(e-n):0}function Xr(n,e,t){return(1-t)*n+t*e}function dh(n,e,t,i){return Xr(n,e,1-Math.exp(-t*i))}function hh(n,e=1){return e-Math.abs(fc(n,e*2)-e)}function fh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function ph(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function mh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function xh(n,e){return n+Math.random()*(e-n)}function gh(n){return n*(.5-Math.random())}function vh(n){n!==void 0&&(qc=n);let e=qc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function _h(n){return n*Wr}function yh(n){return n*ia}function Mh(n){return(n&n-1)===0&&n!==0}function bh(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Sh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function wh(n,e,t,i,r){const a=Math.cos,s=Math.sin,o=a(t/2),c=s(t/2),l=a((e+i)/2),u=s((e+i)/2),d=a((e-i)/2),h=s((e-i)/2),f=a((i-e)/2),g=s((i-e)/2);switch(r){case"XYX":n.set(o*u,c*d,c*h,o*l);break;case"YZY":n.set(c*h,o*u,c*d,o*l);break;case"ZXZ":n.set(c*d,c*h,o*u,o*l);break;case"XZX":n.set(o*u,c*g,c*f,o*l);break;case"YXY":n.set(c*f,o*u,c*g,o*l);break;case"ZYZ":n.set(c*g,c*f,o*u,o*l);break;default:$e("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function wn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ct(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Et={DEG2RAD:Wr,RAD2DEG:ia,generateUUID:Jn,clamp:et,euclideanModulo:fc,mapLinear:lh,inverseLerp:uh,lerp:Xr,damp:dh,pingpong:hh,smoothstep:fh,smootherstep:ph,randInt:mh,randFloat:xh,randFloatSpread:gh,seededRandom:vh,degToRad:_h,radToDeg:yh,isPowerOfTwo:Mh,ceilPowerOfTwo:bh,floorPowerOfTwo:Sh,setQuaternionFromProperEuler:wh,normalize:ct,denormalize:wn};class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*r+e.x,this.y=a*r+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,a,s,o){let c=i[r+0],l=i[r+1],u=i[r+2],d=i[r+3],h=a[s+0],f=a[s+1],g=a[s+2],_=a[s+3];if(o<=0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=h,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==h||l!==f||u!==g){let m=c*h+l*f+u*g+d*_;m<0&&(h=-h,f=-f,g=-g,_=-_,m=-m);let p=1-o;if(m<.9995){const R=Math.acos(m),w=Math.sin(R);p=Math.sin(p*R)/w,o=Math.sin(o*R)/w,c=c*p+h*o,l=l*p+f*o,u=u*p+g*o,d=d*p+_*o}else{c=c*p+h*o,l=l*p+f*o,u=u*p+g*o,d=d*p+_*o;const R=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=R,l*=R,u*=R,d*=R}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,r,a,s){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],d=a[s],h=a[s+1],f=a[s+2],g=a[s+3];return e[t]=o*g+u*d+c*f-l*h,e[t+1]=c*g+u*h+l*d-o*f,e[t+2]=l*g+u*f+o*h-c*d,e[t+3]=u*g-o*d-c*h-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,a=e._z,s=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),d=o(a/2),h=c(i/2),f=c(r/2),g=c(a/2);switch(s){case"XYZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d+h*f*g;break;case"YZX":this._x=h*u*d+l*f*g,this._y=l*f*d+h*u*g,this._z=l*u*g-h*f*d,this._w=l*u*d-h*f*g;break;case"XZY":this._x=h*u*d-l*f*g,this._y=l*f*d-h*u*g,this._z=l*u*g+h*f*d,this._w=l*u*d+h*f*g;break;default:$e("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],a=t[8],s=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-c)*f,this._y=(a-l)*f,this._z=(s-r)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(u-c)/f,this._x=.25*f,this._y=(r+s)/f,this._z=(a+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(a-l)/f,this._x=(r+s)/f,this._y=.25*f,this._z=(c+u)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(s-r)/f,this._x=(a+l)/f,this._y=(c+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,a=e._z,s=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+s*o+r*l-a*c,this._y=r*u+s*c+a*o-i*l,this._z=a*u+s*l+i*c-r*o,this._w=s*u-i*o-r*c-a*l,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,r=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,a=-a,s=-s,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+a*t,this._w=this._w*c+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,i=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(jc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(jc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*r,this.y=a[1]*t+a[4]*i+a[7]*r,this.z=a[2]*t+a[5]*i+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*r+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*r+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*r+a[14])*s,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,a=e.x,s=e.y,o=e.z,c=e.w,l=2*(s*r-o*i),u=2*(o*t-a*r),d=2*(a*i-s*t);return this.x=t+c*l+s*d-o*u,this.y=i+c*u+o*l-a*d,this.z=r+c*d+a*u-s*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r,this.y=a[1]*t+a[5]*i+a[9]*r,this.z=a[2]*t+a[6]*i+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,a=e.z,s=t.x,o=t.y,c=t.z;return this.x=r*c-a*o,this.y=a*s-i*c,this.z=i*o-r*s,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xs.copy(this).projectOnVector(e),this.sub(xs)}reflect(e){return this.sub(xs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xs=new k,jc=new Gi;class Ze{constructor(e,t,i,r,a,s,o,c,l){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l)}set(e,t,i,r,a,s,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=a,u[5]=c,u[6]=i,u[7]=s,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],_=r[0],m=r[3],p=r[6],R=r[1],w=r[4],A=r[7],E=r[2],y=r[5],D=r[8];return a[0]=s*_+o*R+c*E,a[3]=s*m+o*w+c*y,a[6]=s*p+o*A+c*D,a[1]=l*_+u*R+d*E,a[4]=l*m+u*w+d*y,a[7]=l*p+u*A+d*D,a[2]=h*_+f*R+g*E,a[5]=h*m+f*w+g*y,a[8]=h*p+f*A+g*D,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*s*u-t*o*l-i*a*u+i*o*c+r*a*l-r*s*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*s-o*l,h=o*c-u*a,f=l*a-s*c,g=t*d+i*h+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(r*l-u*i)*_,e[2]=(o*i-r*s)*_,e[3]=h*_,e[4]=(u*t-r*c)*_,e[5]=(r*a-o*t)*_,e[6]=f*_,e[7]=(i*c-l*t)*_,e[8]=(s*t-i*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,a,s,o){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*s+l*o)+s+e,-r*l,r*c,-r*(-l*s+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(gs.makeScale(e,t)),this}rotate(e){return this.premultiply(gs.makeRotation(-e)),this}translate(e,t){return this.premultiply(gs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gs=new Ze,Yc=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$c=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eh(){const n={enabled:!0,workingColorSpace:br,spaces:{},convert:function(r,a,s){return this.enabled===!1||a===s||!a||!s||(this.spaces[a].transfer===ut&&(r.r=Qn(r.r),r.g=Qn(r.g),r.b=Qn(r.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===ut&&(r.r=xr(r.r),r.g=xr(r.g),r.b=xr(r.b))),r},workingToColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},colorSpaceToWorking:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===gi?Za:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,s){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,a){return na("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,a)},toWorkingColorSpace:function(r,a){return na("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[br]:{primaries:e,whitePoint:i,transfer:Za,toXYZ:Yc,fromXYZ:$c,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:i,transfer:ut,toXYZ:Yc,fromXYZ:$c,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),n}const at=Eh();function Qn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function xr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Yi;class Th{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Yi===void 0&&(Yi=ta("canvas")),Yi.width=e.width,Yi.height=e.height;const r=Yi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Yi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ta("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),a=r.data;for(let s=0;s<a.length;s++)a[s]=Qn(a[s]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Qn(t[i]/255)*255):t[i]=Qn(t[i]);return{data:t,width:e.width,height:e.height}}else return $e("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ah=0;class pc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ah++}),this.uuid=Jn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let s=0,o=r.length;s<o;s++)r[s].isDataTexture?a.push(vs(r[s].image)):a.push(vs(r[s]))}else a=vs(r);i.url=a}return t||(e.images[this.uuid]=i),i}}function vs(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Th.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:($e("Texture: Unable to serialize Texture."),{})}let Ch=0;const _s=new k;class Ot extends Tr{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=$n,r=$n,a=hn,s=Ni,o=Tn,c=ti,l=Ot.DEFAULT_ANISOTROPY,u=gi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Jn(),this.name="",this.source=new pc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=s,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(_s).x}get height(){return this.source.getSize(_s).y}get depth(){return this.source.getSize(_s).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){$e(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){$e(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case po:e.x=e.x-Math.floor(e.x);break;case $n:e.x=e.x<0?0:1;break;case mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case po:e.y=e.y-Math.floor(e.y);break;case $n:e.y=e.y<0?0:1;break;case mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=du;Ot.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,t=0,i=0,r=1){Tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*r+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*r+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*r+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,a;const c=e.elements,l=c[0],u=c[4],d=c[8],h=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,A=(f+1)/2,E=(p+1)/2,y=(u+h)/4,D=(d+_)/4,z=(g+m)/4;return w>A&&w>E?w<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(w),r=y/i,a=D/i):A>E?A<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(A),i=y/r,a=z/r):E<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(E),i=D/a,r=z/a),this.set(i,r,a,t),this}let R=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(R)<.001&&(R=1),this.x=(m-g)/R,this.y=(d-_)/R,this.z=(h-u)/R,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rh extends Tr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Tt(0,0,e,t),this.scissorTest=!1,this.viewport=new Tt(0,0,e,t);const r={width:e,height:t,depth:i.depth},a=new Ot(r);this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new pc(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Hi extends Rh{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class yu extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ph extends Ot{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=fn,this.minFilter=fn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wi{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,yn):yn.fromBufferAttribute(a,s),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),fa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),fa.copy(i.boundingBox)),fa.applyMatrix4(e.matrixWorld),this.union(fa)}const r=e.children;for(let a=0,s=r.length;a<s;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rr),pa.subVectors(this.max,Rr),$i.subVectors(e.a,Rr),Ki.subVectors(e.b,Rr),Zi.subVectors(e.c,Rr),ui.subVectors(Ki,$i),di.subVectors(Zi,Ki),Si.subVectors($i,Zi);let t=[0,-ui.z,ui.y,0,-di.z,di.y,0,-Si.z,Si.y,ui.z,0,-ui.x,di.z,0,-di.x,Si.z,0,-Si.x,-ui.y,ui.x,0,-di.y,di.x,0,-Si.y,Si.x,0];return!ys(t,$i,Ki,Zi,pa)||(t=[1,0,0,0,1,0,0,0,1],!ys(t,$i,Ki,Zi,pa))?!1:(ma.crossVectors(ui,di),t=[ma.x,ma.y,ma.z],ys(t,$i,Ki,Zi,pa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Vn=[new k,new k,new k,new k,new k,new k,new k,new k],yn=new k,fa=new Wi,$i=new k,Ki=new k,Zi=new k,ui=new k,di=new k,Si=new k,Rr=new k,pa=new k,ma=new k,wi=new k;function ys(n,e,t,i,r){for(let a=0,s=n.length-3;a<=s;a+=3){wi.fromArray(n,a);const o=r.x*Math.abs(wi.x)+r.y*Math.abs(wi.y)+r.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),u=i.dot(wi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Lh=new Wi,Pr=new k,Ms=new k;class Nn{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Lh.setFromPoints(e).getCenter(i);let r=0;for(let a=0,s=e.length;a<s;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Pr.subVectors(e,this.center);const t=Pr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Pr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ms.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Pr.copy(e.center).add(Ms)),this.expandByPoint(Pr.copy(e.center).sub(Ms))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Gn=new k,bs=new k,xa=new k,hi=new k,Ss=new k,ga=new k,ws=new k;class sa{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){bs.copy(e).add(t).multiplyScalar(.5),xa.copy(t).sub(e).normalize(),hi.copy(this.origin).sub(bs);const a=e.distanceTo(t)*.5,s=-this.direction.dot(xa),o=hi.dot(this.direction),c=-hi.dot(xa),l=hi.lengthSq(),u=Math.abs(1-s*s);let d,h,f,g;if(u>0)if(d=s*c-o,h=s*o-c,g=a*u,d>=0)if(h>=-g)if(h<=g){const _=1/u;d*=_,h*=_,f=d*(d+s*h+2*o)+h*(s*d+h+2*c)+l}else h=a,d=Math.max(0,-(s*h+o)),f=-d*d+h*(h+2*c)+l;else h=-a,d=Math.max(0,-(s*h+o)),f=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-s*a+o)),h=d>0?-a:Math.min(Math.max(-a,-c),a),f=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-a,-c),a),f=h*(h+2*c)+l):(d=Math.max(0,-(s*a+o)),h=d>0?a:Math.min(Math.max(-a,-c),a),f=-d*d+h*(h+2*c)+l);else h=s>0?-a:a,d=Math.max(0,-(s*h+o)),f=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(bs).addScaledVector(xa,h),f}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);const i=Gn.dot(this.direction),r=Gn.dot(Gn)-i*i,a=e.radius*e.radius;if(r>a)return null;const s=Math.sqrt(a-r),o=i-s,c=i+s;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,a,s,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(e.min.x-h.x)*l,r=(e.max.x-h.x)*l):(i=(e.max.x-h.x)*l,r=(e.min.x-h.x)*l),u>=0?(a=(e.min.y-h.y)*u,s=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,s=(e.min.y-h.y)*u),i>s||a>r||((a>i||isNaN(i))&&(i=a),(s<r||isNaN(r))&&(r=s),d>=0?(o=(e.min.z-h.z)*d,c=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,c=(e.min.z-h.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,i,r,a){Ss.subVectors(t,e),ga.subVectors(i,e),ws.crossVectors(Ss,ga);let s=this.direction.dot(ws),o;if(s>0){if(r)return null;o=1}else if(s<0)o=-1,s=-s;else return null;hi.subVectors(this.origin,e);const c=o*this.direction.dot(ga.crossVectors(hi,ga));if(c<0)return null;const l=o*this.direction.dot(Ss.cross(hi));if(l<0||c+l>s)return null;const u=-o*hi.dot(ws);return u<0?null:this.at(u/s,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dt{constructor(e,t,i,r,a,s,o,c,l,u,d,h,f,g,_,m){dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,a,s,o,c,l,u,d,h,f,g,_,m)}set(e,t,i,r,a,s,o,c,l,u,d,h,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=a,p[5]=s,p[9]=o,p[13]=c,p[2]=l,p[6]=u,p[10]=d,p[14]=h,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ji.setFromMatrixColumn(e,0).length(),a=1/Ji.setFromMatrixColumn(e,1).length(),s=1/Ji.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=s*u,f=s*d,g=o*u,_=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=h-_*l,t[9]=-o*c,t[2]=_-h*l,t[6]=g+f*l,t[10]=s*c}else if(e.order==="YXZ"){const h=c*u,f=c*d,g=l*u,_=l*d;t[0]=h+_*o,t[4]=g*o-f,t[8]=s*l,t[1]=s*d,t[5]=s*u,t[9]=-o,t[2]=f*o-g,t[6]=_+h*o,t[10]=s*c}else if(e.order==="ZXY"){const h=c*u,f=c*d,g=l*u,_=l*d;t[0]=h-_*o,t[4]=-s*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=s*u,t[9]=_-h*o,t[2]=-s*l,t[6]=o,t[10]=s*c}else if(e.order==="ZYX"){const h=s*u,f=s*d,g=o*u,_=o*d;t[0]=c*u,t[4]=g*l-f,t[8]=h*l+_,t[1]=c*d,t[5]=_*l+h,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=s*c}else if(e.order==="YZX"){const h=s*c,f=s*l,g=o*c,_=o*l;t[0]=c*u,t[4]=_-h*d,t[8]=g*d+f,t[1]=d,t[5]=s*u,t[9]=-o*u,t[2]=-l*u,t[6]=f*d+g,t[10]=h-_*d}else if(e.order==="XZY"){const h=s*c,f=s*l,g=o*c,_=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=h*d+_,t[5]=s*u,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*u,t[10]=_*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dh,e,zh)}lookAt(e,t,i){const r=this.elements;return on.subVectors(e,t),on.lengthSq()===0&&(on.z=1),on.normalize(),fi.crossVectors(i,on),fi.lengthSq()===0&&(Math.abs(i.z)===1?on.x+=1e-4:on.z+=1e-4,on.normalize(),fi.crossVectors(i,on)),fi.normalize(),va.crossVectors(on,fi),r[0]=fi.x,r[4]=va.x,r[8]=on.x,r[1]=fi.y,r[5]=va.y,r[9]=on.y,r[2]=fi.z,r[6]=va.z,r[10]=on.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,a=this.elements,s=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],_=i[6],m=i[10],p=i[14],R=i[3],w=i[7],A=i[11],E=i[15],y=r[0],D=r[4],z=r[8],b=r[12],M=r[1],L=r[5],I=r[9],F=r[13],G=r[2],j=r[6],W=r[10],oe=r[14],q=r[3],ae=r[7],ce=r[11],he=r[15];return a[0]=s*y+o*M+c*G+l*q,a[4]=s*D+o*L+c*j+l*ae,a[8]=s*z+o*I+c*W+l*ce,a[12]=s*b+o*F+c*oe+l*he,a[1]=u*y+d*M+h*G+f*q,a[5]=u*D+d*L+h*j+f*ae,a[9]=u*z+d*I+h*W+f*ce,a[13]=u*b+d*F+h*oe+f*he,a[2]=g*y+_*M+m*G+p*q,a[6]=g*D+_*L+m*j+p*ae,a[10]=g*z+_*I+m*W+p*ce,a[14]=g*b+_*F+m*oe+p*he,a[3]=R*y+w*M+A*G+E*q,a[7]=R*D+w*L+A*j+E*ae,a[11]=R*z+w*I+A*W+E*ce,a[15]=R*b+w*F+A*oe+E*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],a=e[12],s=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],h=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+a*c*d-r*l*d-a*o*h+i*l*h+r*o*f-i*c*f)+_*(+t*c*f-t*l*h+a*s*h-r*s*f+r*l*u-a*c*u)+m*(+t*l*d-t*o*f-a*s*d+i*s*f+a*o*u-i*l*u)+p*(-r*o*u-t*c*d+t*o*h+r*s*d-i*s*h+i*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],a=e[3],s=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],h=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],R=d*m*l-_*h*l+_*c*f-o*m*f-d*c*p+o*h*p,w=g*h*l-u*m*l-g*c*f+s*m*f+u*c*p-s*h*p,A=u*_*l-g*d*l+g*o*f-s*_*f-u*o*p+s*d*p,E=g*d*c-u*_*c-g*o*h+s*_*h+u*o*m-s*d*m,y=t*R+i*w+r*A+a*E;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/y;return e[0]=R*D,e[1]=(_*h*a-d*m*a-_*r*f+i*m*f+d*r*p-i*h*p)*D,e[2]=(o*m*a-_*c*a+_*r*l-i*m*l-o*r*p+i*c*p)*D,e[3]=(d*c*a-o*h*a-d*r*l+i*h*l+o*r*f-i*c*f)*D,e[4]=w*D,e[5]=(u*m*a-g*h*a+g*r*f-t*m*f-u*r*p+t*h*p)*D,e[6]=(g*c*a-s*m*a-g*r*l+t*m*l+s*r*p-t*c*p)*D,e[7]=(s*h*a-u*c*a+u*r*l-t*h*l-s*r*f+t*c*f)*D,e[8]=A*D,e[9]=(g*d*a-u*_*a-g*i*f+t*_*f+u*i*p-t*d*p)*D,e[10]=(s*_*a-g*o*a+g*i*l-t*_*l-s*i*p+t*o*p)*D,e[11]=(u*o*a-s*d*a-u*i*l+t*d*l+s*i*f-t*o*f)*D,e[12]=E*D,e[13]=(u*_*r-g*d*r+g*i*h-t*_*h-u*i*m+t*d*m)*D,e[14]=(g*o*r-s*_*r-g*i*c+t*_*c+s*i*m-t*o*m)*D,e[15]=(s*d*r-u*o*r+u*i*c-t*d*c-s*i*h+t*o*h)*D,this}scale(e){const t=this.elements,i=e.x,r=e.y,a=e.z;return t[0]*=i,t[4]*=r,t[8]*=a,t[1]*=i,t[5]*=r,t[9]*=a,t[2]*=i,t[6]*=r,t[10]*=a,t[3]*=i,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),a=1-i,s=e.x,o=e.y,c=e.z,l=a*s,u=a*o;return this.set(l*s+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*s,0,l*c-r*o,u*c+r*s,a*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,a,s){return this.set(1,i,a,0,e,1,s,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,a=t._x,s=t._y,o=t._z,c=t._w,l=a+a,u=s+s,d=o+o,h=a*l,f=a*u,g=a*d,_=s*u,m=s*d,p=o*d,R=c*l,w=c*u,A=c*d,E=i.x,y=i.y,D=i.z;return r[0]=(1-(_+p))*E,r[1]=(f+A)*E,r[2]=(g-w)*E,r[3]=0,r[4]=(f-A)*y,r[5]=(1-(h+p))*y,r[6]=(m+R)*y,r[7]=0,r[8]=(g+w)*D,r[9]=(m-R)*D,r[10]=(1-(h+_))*D,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let a=Ji.set(r[0],r[1],r[2]).length();const s=Ji.set(r[4],r[5],r[6]).length(),o=Ji.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Mn.copy(this);const l=1/a,u=1/s,d=1/o;return Mn.elements[0]*=l,Mn.elements[1]*=l,Mn.elements[2]*=l,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=d,Mn.elements[9]*=d,Mn.elements[10]*=d,t.setFromRotationMatrix(Mn),i.x=a,i.y=s,i.z=o,this}makePerspective(e,t,i,r,a,s,o=zn,c=!1){const l=this.elements,u=2*a/(t-e),d=2*a/(i-r),h=(t+e)/(t-e),f=(i+r)/(i-r);let g,_;if(c)g=a/(s-a),_=s*a/(s-a);else if(o===zn)g=-(s+a)/(s-a),_=-2*s*a/(s-a);else if(o===Ja)g=-s/(s-a),_=-s*a/(s-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,a,s,o=zn,c=!1){const l=this.elements,u=2/(t-e),d=2/(i-r),h=-(t+e)/(t-e),f=-(i+r)/(i-r);let g,_;if(c)g=1/(s-a),_=s/(s-a);else if(o===zn)g=-2/(s-a),_=-(s+a)/(s-a);else if(o===Ja)g=-1/(s-a),_=-a/(s-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ji=new k,Mn=new dt,Dh=new k(0,0,0),zh=new k(1,1,1),fi=new k,va=new k,on=new k,Kc=new dt,Zc=new Gi;class ni{constructor(e=0,t=0,i=0,r=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,a=r[0],s=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],h=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-s,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-et(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-s,l));break;case"YZX":this._z=Math.asin(et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-et(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-u,f),this._y=0);break;default:$e("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Kc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Kc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Zc.setFromEuler(this),this.setFromQuaternion(Zc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class mc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Uh=0;const Jc=new k,Qi=new Gi,Hn=new dt,_a=new k,Lr=new k,Ih=new k,Nh=new Gi,Qc=new k(1,0,0),el=new k(0,1,0),tl=new k(0,0,1),nl={type:"added"},Fh={type:"removed"},er={type:"childadded",child:null},Es={type:"childremoved",child:null};class $t extends Tr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=Jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$t.DEFAULT_UP.clone();const e=new k,t=new ni,i=new Gi,r=new k(1,1,1);function a(){i.setFromEuler(t,!1)}function s(){t.setFromQuaternion(i,void 0,!1)}t._onChange(a),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new dt},normalMatrix:{value:new Ze}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=$t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(e,t){return Qi.setFromAxisAngle(e,t),this.quaternion.premultiply(Qi),this}rotateX(e){return this.rotateOnAxis(Qc,e)}rotateY(e){return this.rotateOnAxis(el,e)}rotateZ(e){return this.rotateOnAxis(tl,e)}translateOnAxis(e,t){return Jc.copy(e).applyQuaternion(this.quaternion),this.position.add(Jc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qc,e)}translateY(e){return this.translateOnAxis(el,e)}translateZ(e){return this.translateOnAxis(tl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?_a.copy(e):_a.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Lr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(Lr,_a,this.up):Hn.lookAt(_a,Lr,this.up),this.quaternion.setFromRotationMatrix(Hn),r&&(Hn.extractRotation(r.matrixWorld),Qi.setFromRotationMatrix(Hn),this.quaternion.premultiply(Qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nl),er.child=e,this.dispatchEvent(er),er.child=null):Mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Fh),Es.child=e,this.dispatchEvent(Es),Es.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nl),er.child=e,this.dispatchEvent(er),er.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const s=this.children[i].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,e,Ih),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Lr,Nh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,s=r.length;a<s;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function a(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];a(e.shapes,d)}else a(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(a(e.materials,this.material[c]));r.material=o}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(a(e.animations,c))}}if(t){const o=s(e.geometries),c=s(e.materials),l=s(e.textures),u=s(e.images),d=s(e.shapes),h=s(e.skeletons),f=s(e.animations),g=s(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function s(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}$t.DEFAULT_UP=new k(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const bn=new k,Wn=new k,Ts=new k,Xn=new k,tr=new k,nr=new k,il=new k,As=new k,Cs=new k,Rs=new k,Ps=new Tt,Ls=new Tt,Ds=new Tt;class _n{constructor(e=new k,t=new k,i=new k){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),bn.subVectors(e,t),r.cross(bn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,i,r,a){bn.subVectors(r,t),Wn.subVectors(i,t),Ts.subVectors(e,t);const s=bn.dot(bn),o=bn.dot(Wn),c=bn.dot(Ts),l=Wn.dot(Wn),u=Wn.dot(Ts),d=s*l-o*o;if(d===0)return a.set(0,0,0),null;const h=1/d,f=(l*c-o*u)*h,g=(s*u-o*c)*h;return a.set(1-f-g,g,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,i,r,a,s,o,c){return this.getBarycoord(e,t,i,r,Xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,Xn.x),c.addScaledVector(s,Xn.y),c.addScaledVector(o,Xn.z),c)}static getInterpolatedAttribute(e,t,i,r,a,s){return Ps.setScalar(0),Ls.setScalar(0),Ds.setScalar(0),Ps.fromBufferAttribute(e,t),Ls.fromBufferAttribute(e,i),Ds.fromBufferAttribute(e,r),s.setScalar(0),s.addScaledVector(Ps,a.x),s.addScaledVector(Ls,a.y),s.addScaledVector(Ds,a.z),s}static isFrontFacing(e,t,i,r){return bn.subVectors(i,t),Wn.subVectors(e,t),bn.cross(Wn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),bn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return _n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return _n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,a){return _n.getInterpolation(e,this.a,this.b,this.c,t,i,r,a)}containsPoint(e){return _n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return _n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,a=this.c;let s,o;tr.subVectors(r,i),nr.subVectors(a,i),As.subVectors(e,i);const c=tr.dot(As),l=nr.dot(As);if(c<=0&&l<=0)return t.copy(i);Cs.subVectors(e,r);const u=tr.dot(Cs),d=nr.dot(Cs);if(u>=0&&d<=u)return t.copy(r);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return s=c/(c-u),t.copy(i).addScaledVector(tr,s);Rs.subVectors(e,a);const f=tr.dot(Rs),g=nr.dot(Rs);if(g>=0&&f<=g)return t.copy(a);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(nr,o);const m=u*g-f*d;if(m<=0&&d-u>=0&&f-g>=0)return il.subVectors(a,r),o=(d-u)/(d-u+(f-g)),t.copy(r).addScaledVector(il,o);const p=1/(m+_+h);return s=_*p,o=h*p,t.copy(i).addScaledVector(tr,s).addScaledVector(nr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Mu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},pi={h:0,s:0,l:0},ya={h:0,s:0,l:0};function zs(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class it{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=at.workingColorSpace){return this.r=e,this.g=t,this.b=i,at.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=at.workingColorSpace){if(e=fc(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=zs(s,a,e+1/3),this.g=zs(s,a,e),this.b=zs(s,a,e-1/3)}return at.colorSpaceToWorking(this,r),this}setStyle(e,t=kt){function i(a){a!==void 0&&parseFloat(a)<1&&$e("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const s=r[1],o=r[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:$e("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);$e("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const i=Mu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):$e("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qn(e.r),this.g=Qn(e.g),this.b=Qn(e.b),this}copyLinearToSRGB(e){return this.r=xr(e.r),this.g=xr(e.g),this.b=xr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return at.workingToColorSpace(Xt.copy(this),e),Math.round(et(Xt.r*255,0,255))*65536+Math.round(et(Xt.g*255,0,255))*256+Math.round(et(Xt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(Xt.copy(this),t);const i=Xt.r,r=Xt.g,a=Xt.b,s=Math.max(i,r,a),o=Math.min(i,r,a);let c,l;const u=(o+s)/2;if(o===s)c=0,l=0;else{const d=s-o;switch(l=u<=.5?d/(s+o):d/(2-s-o),s){case i:c=(r-a)/d+(r<a?6:0);break;case r:c=(a-i)/d+2;break;case a:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=kt){at.workingToColorSpace(Xt.copy(this),e);const t=Xt.r,i=Xt.g,r=Xt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(pi),this.setHSL(pi.h+e,pi.s+t,pi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(pi),e.getHSL(ya);const i=Xr(pi.h,ya.h,t),r=Xr(pi.s,ya.s,t),a=Xr(pi.l,ya.l,t);return this.setHSL(i,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*r,this.g=a[1]*t+a[4]*i+a[7]*r,this.b=a[2]*t+a[5]*i+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new it;it.NAMES=Mu;let kh=0;class Xi extends Tr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=Jn(),this.name="",this.type="Material",this.blending=mr,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=no,this.blendDst=io,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new it(0,0,0),this.blendAlpha=0,this.depthFunc=_r,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){$e(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){$e(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==mr&&(i.blending=this.blending),this.side!==ei&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==no&&(i.blendSrc=this.blendSrc),this.blendDst!==io&&(i.blendDst=this.blendDst),this.blendEquation!==Li&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_r&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const s=[];for(const o in a){const c=a[o];delete c.metadata,s.push(c)}return s}if(t){const a=r(e.textures),s=r(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class vi extends Xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new it(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=uu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ct=new k,Ma=new qe;let Oh=0;class rn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Wo,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ma.fromBufferAttribute(this,t),Ma.applyMatrix3(e),this.setXY(t,Ma.x,Ma.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=wn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array),a=ct(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Wo&&(e.usage=this.usage),e}}class bu extends rn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Su extends rn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ht extends rn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Bh=0;const gn=new dt,Us=new $t,ir=new k,cn=new Wi,Dr=new Wi,It=new k;class At extends Tr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_u(e)?Su:bu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Ze().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return gn.makeRotationFromQuaternion(e),this.applyMatrix4(gn),this}rotateX(e){return gn.makeRotationX(e),this.applyMatrix4(gn),this}rotateY(e){return gn.makeRotationY(e),this.applyMatrix4(gn),this}rotateZ(e){return gn.makeRotationZ(e),this.applyMatrix4(gn),this}translate(e,t,i){return gn.makeTranslation(e,t,i),this.applyMatrix4(gn),this}scale(e,t,i){return gn.makeScale(e,t,i),this.applyMatrix4(gn),this}lookAt(e){return Us.lookAt(e),Us.updateMatrix(),this.applyMatrix4(Us.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ir).negate(),this.translate(ir.x,ir.y,ir.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,a=e.length;r<a;r++){const s=e[r];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new ht(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const a=e[r];t.setXYZ(r,a.x,a.y,a.z||0)}e.length>t.count&&$e("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const a=t[i];cn.setFromBufferAttribute(a),this.morphTargetsRelative?(It.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(It),It.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(It)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const i=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){const o=t[a];Dr.setFromBufferAttribute(o),this.morphTargetsRelative?(It.addVectors(cn.min,Dr.min),cn.expandByPoint(It),It.addVectors(cn.max,Dr.max),cn.expandByPoint(It)):(cn.expandByPoint(Dr.min),cn.expandByPoint(Dr.max))}cn.getCenter(i);let r=0;for(let a=0,s=e.count;a<s;a++)It.fromBufferAttribute(e,a),r=Math.max(r,i.distanceToSquared(It));if(t)for(let a=0,s=t.length;a<s;a++){const o=t[a],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)It.fromBufferAttribute(o,l),c&&(ir.fromBufferAttribute(e,l),It.add(ir)),r=Math.max(r,i.distanceToSquared(It))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new rn(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],c=[];for(let z=0;z<i.count;z++)o[z]=new k,c[z]=new k;const l=new k,u=new k,d=new k,h=new qe,f=new qe,g=new qe,_=new k,m=new k;function p(z,b,M){l.fromBufferAttribute(i,z),u.fromBufferAttribute(i,b),d.fromBufferAttribute(i,M),h.fromBufferAttribute(a,z),f.fromBufferAttribute(a,b),g.fromBufferAttribute(a,M),u.sub(l),d.sub(l),f.sub(h),g.sub(h);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(L),m.copy(d).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(L),o[z].add(_),o[b].add(_),o[M].add(_),c[z].add(m),c[b].add(m),c[M].add(m))}let R=this.groups;R.length===0&&(R=[{start:0,count:e.count}]);for(let z=0,b=R.length;z<b;++z){const M=R[z],L=M.start,I=M.count;for(let F=L,G=L+I;F<G;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const w=new k,A=new k,E=new k,y=new k;function D(z){E.fromBufferAttribute(r,z),y.copy(E);const b=o[z];w.copy(b),w.sub(E.multiplyScalar(E.dot(b))).normalize(),A.crossVectors(y,b);const L=A.dot(c[z])<0?-1:1;s.setXYZW(z,w.x,w.y,w.z,L)}for(let z=0,b=R.length;z<b;++z){const M=R[z],L=M.start,I=M.count;for(let F=L,G=L+I;F<G;F+=3)D(e.getX(F+0)),D(e.getX(F+1)),D(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new rn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const r=new k,a=new k,s=new k,o=new k,c=new k,l=new k,u=new k,d=new k;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),_=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,_),s.fromBufferAttribute(t,m),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,_),l.fromBufferAttribute(i,m),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let h=0,f=t.count;h<f;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),s.fromBufferAttribute(t,h+2),u.subVectors(s,a),d.subVectors(r,a),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)It.fromBufferAttribute(e,t),It.normalize(),e.setXYZ(t,It.x,It.y,It.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*u;for(let p=0;p<u;p++)h[g++]=l[f++]}return new rn(h,u,d)}if(this.index===null)return $e("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new At,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const a=this.morphAttributes;for(const o in a){const c=[],l=a[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],f=e(h,i);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,c=s.length;o<c;o++){const l=s[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const f=l[d];u.push(f.toJSON(e.data))}u.length>0&&(r[c]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const a=e.morphAttributes;for(const l in a){const u=[],d=a[l];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const s=e.groups;for(let l=0,u=s.length;l<u;l++){const d=s[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rl=new dt,Ei=new sa,ba=new Nn,al=new k,Sa=new k,wa=new k,Ea=new k,Is=new k,Ta=new k,sl=new k,Aa=new k;class Pt extends $t{constructor(e=new At,t=new vi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(a&&o){Ta.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const u=o[c],d=a[c];u!==0&&(Is.fromBufferAttribute(d,e),s?Ta.addScaledVector(Is,u):Ta.addScaledVector(Is.sub(t),u))}t.add(Ta)}return t}raycast(e,t){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(a),Ei.copy(e.ray).recast(e.near),!(ba.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(ba,al)===null||Ei.origin.distanceToSquared(al)>(e.far-e.near)**2))&&(rl.copy(a).invert(),Ei.copy(e.ray).applyMatrix4(rl),!(i.boundingBox!==null&&Ei.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,i){let r;const a=this.geometry,s=this.material,o=a.index,c=a.attributes.position,l=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(s))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=s[m.materialIndex],R=Math.max(m.start,f.start),w=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let A=R,E=w;A<E;A+=3){const y=o.getX(A),D=o.getX(A+1),z=o.getX(A+2);r=Ca(this,p,e,i,l,u,d,y,D,z),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const R=o.getX(m),w=o.getX(m+1),A=o.getX(m+2);r=Ca(this,s,e,i,l,u,d,R,w,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(s))for(let g=0,_=h.length;g<_;g++){const m=h[g],p=s[m.materialIndex],R=Math.max(m.start,f.start),w=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let A=R,E=w;A<E;A+=3){const y=A,D=A+1,z=A+2;r=Ca(this,p,e,i,l,u,d,y,D,z),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const R=m,w=m+1,A=m+2;r=Ca(this,s,e,i,l,u,d,R,w,A),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function Vh(n,e,t,i,r,a,s,o){let c;if(e.side===nn?c=i.intersectTriangle(s,a,r,!0,o):c=i.intersectTriangle(r,a,s,e.side===ei,o),c===null)return null;Aa.copy(o),Aa.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Aa);return l<t.near||l>t.far?null:{distance:l,point:Aa.clone(),object:n}}function Ca(n,e,t,i,r,a,s,o,c,l){n.getVertexPosition(o,Sa),n.getVertexPosition(c,wa),n.getVertexPosition(l,Ea);const u=Vh(n,e,t,i,Sa,wa,Ea,sl);if(u){const d=new k;_n.getBarycoord(sl,Sa,wa,Ea,d),r&&(u.uv=_n.getInterpolatedAttribute(r,o,c,l,d,new qe)),a&&(u.uv1=_n.getInterpolatedAttribute(a,o,c,l,d,new qe)),s&&(u.normal=_n.getInterpolatedAttribute(s,o,c,l,d,new k),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new k,materialIndex:0};_n.getNormal(Sa,wa,Ea,h.normal),u.face=h,u.barycoord=d}return u}class oa extends At{constructor(e=1,t=1,i=1,r=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:a,depthSegments:s};const o=this;r=Math.floor(r),a=Math.floor(a),s=Math.floor(s);const c=[],l=[],u=[],d=[];let h=0,f=0;g("z","y","x",-1,-1,i,t,e,s,a,0),g("z","y","x",1,-1,i,t,-e,s,a,1),g("x","z","y",1,1,e,i,t,r,s,2),g("x","z","y",1,-1,e,i,-t,r,s,3),g("x","y","z",1,-1,e,t,i,r,a,4),g("x","y","z",-1,-1,e,t,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(u,3)),this.setAttribute("uv",new ht(d,2));function g(_,m,p,R,w,A,E,y,D,z,b){const M=A/D,L=E/z,I=A/2,F=E/2,G=y/2,j=D+1,W=z+1;let oe=0,q=0;const ae=new k;for(let ce=0;ce<W;ce++){const he=ce*L-F;for(let me=0;me<j;me++){const Ge=me*M-I;ae[_]=Ge*R,ae[m]=he*w,ae[p]=G,l.push(ae.x,ae.y,ae.z),ae[_]=0,ae[m]=0,ae[p]=y>0?1:-1,u.push(ae.x,ae.y,ae.z),d.push(me/D),d.push(1-ce/z),oe+=1}}for(let ce=0;ce<z;ce++)for(let he=0;he<D;he++){const me=h+he+j*ce,Ge=h+he+j*(ce+1),Be=h+(he+1)+j*(ce+1),ye=h+(he+1)+j*ce;c.push(me,Ge,ye),c.push(Ge,Be,ye),q+=6}o.addGroup(f,q,b),f+=q,h+=oe}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Sr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?($e("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function tn(n){const e={};for(let t=0;t<n.length;t++){const i=Sr(n[t]);for(const r in i)e[r]=i[r]}return e}function Gh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function wu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const Hh={clone:Sr,merge:tn};var Wh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pn extends Xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wh,this.fragmentShader=Xh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Sr(e.uniforms),this.uniformsGroups=Gh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Eu extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const mi=new k,ol=new qe,cl=new qe;class vn extends Eu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ia*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ia*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(mi.x,mi.y).multiplyScalar(-e/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(mi.x,mi.y).multiplyScalar(-e/mi.z)}getViewSize(e,t){return this.getViewBounds(e,ol,cl),t.subVectors(cl,ol)}setViewOffset(e,t,i,r,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Wr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,a=-.5*r;const s=this.view;if(this.view!==null&&this.view.enabled){const c=s.fullWidth,l=s.fullHeight;a+=s.offsetX*r/c,t-=s.offsetY*i/l,r*=s.width/c,i*=s.height/l}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const rr=-90,ar=1;class qh extends $t{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new vn(rr,ar,e,t);r.layers=this.layers,this.add(r);const a=new vn(rr,ar,e,t);a.layers=this.layers,this.add(a);const s=new vn(rr,ar,e,t);s.layers=this.layers,this.add(s);const o=new vn(rr,ar,e,t);o.layers=this.layers,this.add(o);const c=new vn(rr,ar,e,t);c.layers=this.layers,this.add(c);const l=new vn(rr,ar,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,a,s,o,c]=t;for(const l of t)this.remove(l);if(e===zn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ja)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,s,o,c,l,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,a),e.setRenderTarget(i,1,r),e.render(t,s),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Tu extends Ot{constructor(e=[],t=yr,i,r,a,s,o,c,l,u){super(e,t,i,r,a,s,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jh extends Hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Tu(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new oa(5,5,5),a=new pn({name:"CubemapFromEquirect",uniforms:Sr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:nn,blending:Zn});a.uniforms.tEquirect.value=t;const s=new Pt(r,a),o=t.minFilter;return t.minFilter===Ni&&(t.minFilter=hn),new qh(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,r);e.setRenderTarget(a)}}class An extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yh={type:"move"};class Ns{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new An,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new An,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new An,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,a=null,s=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){s=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&h>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&h<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Yh)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new An;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class $h extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Kh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Wo,this.updateRanges=[],this.version=0,this.uuid=Jn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,a=this.stride;r<a;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const en=new k;class es{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=wn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ct(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),i=ct(i,this.array),r=ct(r,this.array),a=ct(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=a,this}clone(e){if(e===void 0){Qa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[r+a])}return new rn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new es(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Qa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[r+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class xc extends Xi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let sr;const zr=new k,or=new k,cr=new k,lr=new qe,Ur=new qe,Au=new dt,Ra=new k,Ir=new k,Pa=new k,ll=new qe,Fs=new qe,ul=new qe;class Cu extends $t{constructor(e=new xc){if(super(),this.isSprite=!0,this.type="Sprite",sr===void 0){sr=new At;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Kh(t,5);sr.setIndex([0,1,2,0,2,3]),sr.setAttribute("position",new es(i,3,0,!1)),sr.setAttribute("uv",new es(i,2,3,!1))}this.geometry=sr,this.material=e,this.center=new qe(.5,.5),this.count=1}raycast(e,t){e.camera===null&&Mt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),or.setFromMatrixScale(this.matrixWorld),Au.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),cr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&or.multiplyScalar(-cr.z);const i=this.material.rotation;let r,a;i!==0&&(a=Math.cos(i),r=Math.sin(i));const s=this.center;La(Ra.set(-.5,-.5,0),cr,s,or,r,a),La(Ir.set(.5,-.5,0),cr,s,or,r,a),La(Pa.set(.5,.5,0),cr,s,or,r,a),ll.set(0,0),Fs.set(1,0),ul.set(1,1);let o=e.ray.intersectTriangle(Ra,Ir,Pa,!1,zr);if(o===null&&(La(Ir.set(-.5,.5,0),cr,s,or,r,a),Fs.set(0,1),o=e.ray.intersectTriangle(Ra,Pa,Ir,!1,zr),o===null))return;const c=e.ray.origin.distanceTo(zr);c<e.near||c>e.far||t.push({distance:c,point:zr.clone(),uv:_n.getInterpolation(zr,Ra,Ir,Pa,ll,Fs,ul,new qe),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function La(n,e,t,i,r,a){lr.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(Ur.x=a*lr.x-r*lr.y,Ur.y=r*lr.x+a*lr.y):Ur.copy(lr),n.copy(e),n.x+=Ur.x,n.y+=Ur.y,n.applyMatrix4(Au)}class gc extends Ot{constructor(e=null,t=1,i=1,r,a,s,o,c,l=fn,u=fn,d,h){super(null,s,o,c,l,u,r,a,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class dl extends rn{constructor(e,t,i,r=1){super(e,t,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ur=new dt,hl=new dt,Da=[],fl=new Wi,Zh=new dt,Nr=new Pt,Fr=new Nn;class Jh extends Pt{constructor(e,t,i){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new dl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,Zh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Wi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ur),fl.copy(e.boundingBox).applyMatrix4(ur),this.boundingBox.union(fl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<t;i++)this.getMatrixAt(i,ur),Fr.copy(e.boundingSphere).applyMatrix4(ur),this.boundingSphere.union(Fr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const i=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=i.length+1,s=e*a+1;for(let o=0;o<i.length;o++)i[o]=r[s+o]}raycast(e,t){const i=this.matrixWorld,r=this.count;if(Nr.geometry=this.geometry,Nr.material=this.material,Nr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fr.copy(this.boundingSphere),Fr.applyMatrix4(i),e.ray.intersectsSphere(Fr)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,ur),hl.multiplyMatrices(i,ur),Nr.matrixWorld=hl,Nr.raycast(e,Da);for(let s=0,o=Da.length;s<o;s++){const c=Da[s];c.instanceId=a,c.object=this,t.push(c)}Da.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new dl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const i=t.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new gc(new Float32Array(r*this.count),r,this.count,cc,Dn));const a=this.morphTexture.source.data.data;let s=0;for(let l=0;l<i.length;l++)s+=i[l];const o=this.geometry.morphTargetsRelative?1:1-s,c=r*e;a[c]=o,a.set(i,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ks=new k,Qh=new k,ef=new Ze;class Pi{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=ks.subVectors(i,t).cross(Qh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(ks),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||ef.getNormalMatrix(e),r=this.coplanarPoint(ks).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new Nn,tf=new qe(.5,.5),za=new k;class Ru{constructor(e=new Pi,t=new Pi,i=new Pi,r=new Pi,a=new Pi,s=new Pi){this.planes=[e,t,i,r,a,s]}set(e,t,i,r,a,s){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(a),o[5].copy(s),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=zn,i=!1){const r=this.planes,a=e.elements,s=a[0],o=a[1],c=a[2],l=a[3],u=a[4],d=a[5],h=a[6],f=a[7],g=a[8],_=a[9],m=a[10],p=a[11],R=a[12],w=a[13],A=a[14],E=a[15];if(r[0].setComponents(l-s,f-u,p-g,E-R).normalize(),r[1].setComponents(l+s,f+u,p+g,E+R).normalize(),r[2].setComponents(l+o,f+d,p+_,E+w).normalize(),r[3].setComponents(l-o,f-d,p-_,E-w).normalize(),i)r[4].setComponents(c,h,m,A).normalize(),r[5].setComponents(l-c,f-h,p-m,E-A).normalize();else if(r[4].setComponents(l-c,f-h,p-m,E-A).normalize(),t===zn)r[5].setComponents(l+c,f+h,p+m,E+A).normalize();else if(t===Ja)r[5].setComponents(c,h,m,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){Ti.center.set(0,0,0);const t=tf.distanceTo(e.center);return Ti.radius=.7071067811865476+t,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(za.x=r.normal.x>0?e.max.x:e.min.x,za.y=r.normal.y>0?e.max.y:e.min.y,za.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(za)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pr extends Xi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new it(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ts=new k,ns=new k,pl=new dt,kr=new sa,Ua=new Nn,Os=new k,ml=new k;class Xo extends $t{constructor(e=new At,t=new pr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,a=t.count;r<a;r++)ts.fromBufferAttribute(t,r-1),ns.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=ts.distanceTo(ns);e.setAttribute("lineDistance",new ht(i,1))}else $e("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ua.copy(i.boundingSphere),Ua.applyMatrix4(r),Ua.radius+=a,e.ray.intersectsSphere(Ua)===!1)return;pl.copy(r).invert(),kr.copy(e.ray).applyMatrix4(pl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const f=Math.max(0,s.start),g=Math.min(u.count,s.start+s.count);for(let _=f,m=g-1;_<m;_+=l){const p=u.getX(_),R=u.getX(_+1),w=Ia(this,e,kr,c,p,R,_);w&&t.push(w)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(f),p=Ia(this,e,kr,c,_,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,s.start),g=Math.min(h.count,s.start+s.count);for(let _=f,m=g-1;_<m;_+=l){const p=Ia(this,e,kr,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){const _=Ia(this,e,kr,c,g-1,f,g-1);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Ia(n,e,t,i,r,a,s){const o=n.geometry.attributes.position;if(ts.fromBufferAttribute(o,r),ns.fromBufferAttribute(o,a),t.distanceSqToSegment(ts,ns,Os,ml)>i)return;Os.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Os);if(!(l<e.near||l>e.far))return{distance:l,point:ml.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const xl=new k,gl=new k;class vl extends Xo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,a=t.count;r<a;r+=2)xl.fromBufferAttribute(t,r),gl.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+xl.distanceTo(gl);e.setAttribute("lineDistance",new ht(i,1))}else $e("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Pu extends Xi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new it(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const _l=new dt,qo=new sa,Na=new Nn,Fa=new k;class nf extends $t{constructor(e=new At,t=new Pu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,a=e.params.Points.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Na.copy(i.boundingSphere),Na.applyMatrix4(r),Na.radius+=a,e.ray.intersectsSphere(Na)===!1)return;_l.copy(r).invert(),qo.copy(e.ray).applyMatrix4(_l);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,s.start),f=Math.min(l.count,s.start+s.count);for(let g=h,_=f;g<_;g++){const m=l.getX(g);Fa.fromBufferAttribute(d,m),yl(Fa,m,c,r,e,t,this)}}else{const h=Math.max(0,s.start),f=Math.min(d.count,s.start+s.count);for(let g=h,_=f;g<_;g++)Fa.fromBufferAttribute(d,g),yl(Fa,g,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,s=r.length;a<s;a++){const o=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function yl(n,e,t,i,r,a,s){const o=qo.distanceSqToPoint(n);if(o<t){const c=new k;qo.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;a.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}class Lu extends Ot{constructor(e,t,i,r,a,s,o,c,l){super(e,t,i,r,a,s,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Du extends Ot{constructor(e,t,i=Vi,r,a,s,o=fn,c=fn,l,u=Qr,d=1){if(u!==Qr&&u!==ea)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,r,a,s,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class zu extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class vc extends At{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const a=[],s=[],o=[],c=[],l=new k,u=new qe;s.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,h=3;d<=t;d++,h+=3){const f=i+d/t*r;l.x=e*Math.cos(f),l.y=e*Math.sin(f),s.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(s[h]/e+1)/2,u.y=(s[h+1]/e+1)/2,c.push(u.x,u.y)}for(let d=1;d<=t;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new ht(s,3)),this.setAttribute("normal",new ht(o,3)),this.setAttribute("uv",new ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vc(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class _c extends At{constructor(e=1,t=1,i=1,r=32,a=1,s=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:c};const l=this;r=Math.floor(r),a=Math.floor(a);const u=[],d=[],h=[],f=[];let g=0;const _=[],m=i/2;let p=0;R(),s===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(u),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(f,2));function R(){const A=new k,E=new k;let y=0;const D=(t-e)/i;for(let z=0;z<=a;z++){const b=[],M=z/a,L=M*(t-e)+e;for(let I=0;I<=r;I++){const F=I/r,G=F*c+o,j=Math.sin(G),W=Math.cos(G);E.x=L*j,E.y=-M*i+m,E.z=L*W,d.push(E.x,E.y,E.z),A.set(j,D,W).normalize(),h.push(A.x,A.y,A.z),f.push(F,1-M),b.push(g++)}_.push(b)}for(let z=0;z<r;z++)for(let b=0;b<a;b++){const M=_[b][z],L=_[b+1][z],I=_[b+1][z+1],F=_[b][z+1];(e>0||b!==0)&&(u.push(M,L,F),y+=3),(t>0||b!==a-1)&&(u.push(L,I,F),y+=3)}l.addGroup(p,y,0),p+=y}function w(A){const E=g,y=new qe,D=new k;let z=0;const b=A===!0?e:t,M=A===!0?1:-1;for(let I=1;I<=r;I++)d.push(0,m*M,0),h.push(0,M,0),f.push(.5,.5),g++;const L=g;for(let I=0;I<=r;I++){const G=I/r*c+o,j=Math.cos(G),W=Math.sin(G);D.x=b*W,D.y=m*M,D.z=b*j,d.push(D.x,D.y,D.z),h.push(0,M,0),y.x=j*.5+.5,y.y=W*.5*M+.5,f.push(y.x,y.y),g++}for(let I=0;I<r;I++){const F=E+I,G=L+I;A===!0?u.push(G,G+1,F):u.push(G+1,G,F),z+=3}l.addGroup(p,z,A===!0?1:2),p+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _c(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ai{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){$e("Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),a+=i.distanceTo(r),t.push(a),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let r=0;const a=i.length;let s;t?s=t:s=e*i[a-1];let o=0,c=a-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=i[r]-s,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===s)return r/(a-1);const u=i[r],h=i[r+1]-u,f=(s-u)/h;return(r+f)/(a-1)}getTangent(e,t){let r=e-1e-4,a=e+1e-4;r<0&&(r=0),a>1&&(a=1);const s=this.getPoint(r),o=this.getPoint(a),c=t||(s.isVector2?new qe:new k);return c.copy(o).sub(s).normalize(),c}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new k,r=[],a=[],s=[],o=new k,c=new dt;for(let f=0;f<=e;f++){const g=f/e;r[f]=this.getTangentAt(g,new k)}a[0]=new k,s[0]=new k;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),h<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),a[0].crossVectors(r[0],o),s[0].crossVectors(r[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),s[f]=s[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(et(r[f-1].dot(r[f]),-1,1));a[f].applyMatrix4(c.makeRotationAxis(o,g))}s[f].crossVectors(r[f],a[f])}if(t===!0){let f=Math.acos(et(a[0].dot(a[e]),-1,1));f/=e,r[0].dot(o.crossVectors(a[0],a[e]))>0&&(f=-f);for(let g=1;g<=e;g++)a[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),s[g].crossVectors(r[g],a[g])}return{tangents:r,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Uu extends ai{constructor(e=0,t=0,i=1,r=1,a=0,s=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new qe){const i=t,r=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(s?a=0:a=r),this.aClockwise===!0&&!s&&(a===r?a=-r:a=a-r);const o=this.aStartAngle+e*a;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=c-this.aX,f=l-this.aY;c=h*u-f*d+this.aX,l=h*d+f*u+this.aY}return i.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class rf extends Uu{constructor(e,t,i,r,a,s){super(e,t,i,i,r,a,s),this.isArcCurve=!0,this.type="ArcCurve"}}function yc(){let n=0,e=0,t=0,i=0;function r(a,s,o,c){n=a,e=o,t=-3*a+3*s-2*o-c,i=2*a-2*s+o+c}return{initCatmullRom:function(a,s,o,c,l){r(s,o,l*(o-a),l*(c-s))},initNonuniformCatmullRom:function(a,s,o,c,l,u,d){let h=(s-a)/l-(o-a)/(l+u)+(o-s)/u,f=(o-s)/u-(c-s)/(u+d)+(c-o)/d;h*=u,f*=u,r(s,o,h,f)},calc:function(a){const s=a*a,o=s*a;return n+e*a+t*s+i*o}}}const ka=new k,Bs=new yc,Vs=new yc,Gs=new yc;class Iu extends ai{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new k){const i=t,r=this.points,a=r.length,s=(a-(this.closed?0:1))*e;let o=Math.floor(s),c=s-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:c===0&&o===a-1&&(o=a-2,c=1);let l,u;this.closed||o>0?l=r[(o-1)%a]:(ka.subVectors(r[0],r[1]).add(r[0]),l=ka);const d=r[o%a],h=r[(o+1)%a];if(this.closed||o+2<a?u=r[(o+2)%a]:(ka.subVectors(r[a-1],r[a-2]).add(r[a-1]),u=ka),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Bs.initNonuniformCatmullRom(l.x,d.x,h.x,u.x,g,_,m),Vs.initNonuniformCatmullRom(l.y,d.y,h.y,u.y,g,_,m),Gs.initNonuniformCatmullRom(l.z,d.z,h.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Bs.initCatmullRom(l.x,d.x,h.x,u.x,this.tension),Vs.initCatmullRom(l.y,d.y,h.y,u.y,this.tension),Gs.initCatmullRom(l.z,d.z,h.z,u.z,this.tension));return i.set(Bs.calc(c),Vs.calc(c),Gs.calc(c)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new k().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Ml(n,e,t,i,r){const a=(i-e)*.5,s=(r-t)*.5,o=n*n,c=n*o;return(2*t-2*i+a+s)*c+(-3*t+3*i-2*a-s)*o+a*n+t}function af(n,e){const t=1-n;return t*t*e}function sf(n,e){return 2*(1-n)*n*e}function of(n,e){return n*n*e}function qr(n,e,t,i){return af(n,e)+sf(n,t)+of(n,i)}function cf(n,e){const t=1-n;return t*t*t*e}function lf(n,e){const t=1-n;return 3*t*t*n*e}function uf(n,e){return 3*(1-n)*n*n*e}function df(n,e){return n*n*n*e}function jr(n,e,t,i,r){return cf(n,e)+lf(n,t)+uf(n,i)+df(n,r)}class hf extends ai{constructor(e=new qe,t=new qe,i=new qe,r=new qe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new qe){const i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(jr(e,r.x,a.x,s.x,o.x),jr(e,r.y,a.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ff extends ai{constructor(e=new k,t=new k,i=new k,r=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new k){const i=t,r=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(jr(e,r.x,a.x,s.x,o.x),jr(e,r.y,a.y,s.y,o.y),jr(e,r.z,a.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class pf extends ai{constructor(e=new qe,t=new qe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new qe){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new qe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class mf extends ai{constructor(e=new k,t=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new k){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new k){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xf extends ai{constructor(e=new qe,t=new qe,i=new qe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new qe){const i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(qr(e,r.x,a.x,s.x),qr(e,r.y,a.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Nu extends ai{constructor(e=new k,t=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new k){const i=t,r=this.v0,a=this.v1,s=this.v2;return i.set(qr(e,r.x,a.x,s.x),qr(e,r.y,a.y,s.y),qr(e,r.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class gf extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new qe){const i=t,r=this.points,a=(r.length-1)*e,s=Math.floor(a),o=a-s,c=r[s===0?s:s-1],l=r[s],u=r[s>r.length-2?r.length-1:s+1],d=r[s>r.length-3?r.length-1:s+2];return i.set(Ml(o,c.x,l.x,u.x,d.x),Ml(o,c.y,l.y,u.y,d.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new qe().fromArray(r))}return this}}var vf=Object.freeze({__proto__:null,ArcCurve:rf,CatmullRomCurve3:Iu,CubicBezierCurve:hf,CubicBezierCurve3:ff,EllipseCurve:Uu,LineCurve:pf,LineCurve3:mf,QuadraticBezierCurve:xf,QuadraticBezierCurve3:Nu,SplineCurve:gf});class us extends At{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const a=e/2,s=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,d=e/o,h=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const R=p*h-s;for(let w=0;w<l;w++){const A=w*d-a;g.push(A,-R,0),_.push(0,0,1),m.push(w/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let R=0;R<o;R++){const w=R+l*p,A=R+l*(p+1),E=R+1+l*(p+1),y=R+1+l*p;f.push(w,A,y),f.push(A,E,y)}this.setIndex(f),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.width,e.height,e.widthSegments,e.heightSegments)}}class Mc extends At{constructor(e=.5,t=1,i=32,r=1,a=0,s=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:a,thetaLength:s},i=Math.max(3,i),r=Math.max(1,r);const o=[],c=[],l=[],u=[];let d=e;const h=(t-e)/r,f=new k,g=new qe;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const p=a+m/i*s;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,u.push(g.x,g.y)}d+=h}for(let _=0;_<r;_++){const m=_*(i+1);for(let p=0;p<i;p++){const R=p+m,w=R,A=R+i+1,E=R+i+2,y=R+1;o.push(w,A,y),o.push(A,E,y)}}this.setIndex(o),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Di extends At{constructor(e=1,t=32,i=16,r=0,a=Math.PI*2,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(s+o,Math.PI);let l=0;const u=[],d=new k,h=new k,f=[],g=[],_=[],m=[];for(let p=0;p<=i;p++){const R=[],w=p/i;let A=0;p===0&&s===0?A=.5/t:p===i&&c===Math.PI&&(A=-.5/t);for(let E=0;E<=t;E++){const y=E/t;d.x=-e*Math.cos(r+y*a)*Math.sin(s+w*o),d.y=e*Math.cos(s+w*o),d.z=e*Math.sin(r+y*a)*Math.sin(s+w*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),m.push(y+A,1-w),R.push(l++)}u.push(R)}for(let p=0;p<i;p++)for(let R=0;R<t;R++){const w=u[p][R+1],A=u[p][R],E=u[p+1][R],y=u[p+1][R+1];(p!==0||s>0)&&f.push(w,A,y),(p!==i-1||c<Math.PI)&&f.push(A,E,y)}this.setIndex(f),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(_,3)),this.setAttribute("uv",new ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Di(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class bc extends At{constructor(e=new Nu(new k(-1,-1,0),new k(-1,1,0),new k(1,1,0)),t=64,i=1,r=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:a};const s=e.computeFrenetFrames(t,a);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;const o=new k,c=new k,l=new qe;let u=new k;const d=[],h=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new ht(d,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(f,2));function _(){for(let w=0;w<t;w++)m(w);m(a===!1?t:0),R(),p()}function m(w){u=e.getPointAt(w/t,u);const A=s.normals[w],E=s.binormals[w];for(let y=0;y<=r;y++){const D=y/r*Math.PI*2,z=Math.sin(D),b=-Math.cos(D);c.x=b*A.x+z*E.x,c.y=b*A.y+z*E.y,c.z=b*A.z+z*E.z,c.normalize(),h.push(c.x,c.y,c.z),o.x=u.x+i*c.x,o.y=u.y+i*c.y,o.z=u.z+i*c.z,d.push(o.x,o.y,o.z)}}function p(){for(let w=1;w<=t;w++)for(let A=1;A<=r;A++){const E=(r+1)*(w-1)+(A-1),y=(r+1)*w+(A-1),D=(r+1)*w+A,z=(r+1)*(w-1)+A;g.push(E,y,z),g.push(y,D,z)}}function R(){for(let w=0;w<=t;w++)for(let A=0;A<=r;A++)l.x=w/t,l.y=A/r,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new bc(new vf[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class _f extends Xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Kd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yf extends Xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Mf extends pr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const Hs={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class bf{constructor(e,t,i){const r=this;let a=!1,s=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,a===!1&&r.onStart!==void 0&&r.onStart(u,s,o),a=!0},this.itemEnd=function(u){s++,r.onProgress!==void 0&&r.onProgress(u,s,o),s===o&&(a=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=l.length;d<h;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Sf=new bf;class Sc{constructor(e){this.manager=e!==void 0?e:Sf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,a){i.load(e,r,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Sc.DEFAULT_MATERIAL_NAME="__DEFAULT";const dr=new WeakMap;class wf extends Sc{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const a=this,s=Hs.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)a.manager.itemStart(e),setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0);else{let d=dr.get(s);d===void 0&&(d=[],dr.set(s,d)),d.push({onLoad:t,onError:r})}return s}const o=ta("img");function c(){u(),t&&t(this);const d=dr.get(this)||[];for(let h=0;h<d.length;h++){const f=d[h];f.onLoad&&f.onLoad(this)}dr.delete(this),a.manager.itemEnd(e)}function l(d){u(),r&&r(d),Hs.remove(`image:${e}`);const h=dr.get(this)||[];for(let f=0;f<h.length;f++){const g=h[f];g.onError&&g.onError(d)}dr.delete(this),a.manager.itemError(e),a.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Hs.add(`image:${e}`,o),a.manager.itemStart(e),o.src=e,o}}class wc extends Sc{constructor(e){super(e)}load(e,t,i,r){const a=new Ot,s=new wf(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},i,r),a}}class Ef extends Eu{constructor(e=-1,t=1,i=1,r=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-e,s=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,s=a+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Tf extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Af{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const bl=new dt;class Cf{constructor(e,t,i=0,r=1/0){this.ray=new sa(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new mc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Mt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return bl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bl),this}intersectObject(e,t=!0,i=[]){return jo(e,this,i,t),i.sort(Sl),i}intersectObjects(e,t=!0,i=[]){for(let r=0,a=e.length;r<a;r++)jo(e[r],this,i,t);return i.sort(Sl),i}}function Sl(n,e){return n.distance-e.distance}function jo(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){const a=n.children;for(let s=0,o=a.length;s<o;s++)jo(a[s],e,t,!0)}}class Oa{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=et(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}function wl(n,e,t,i){const r=Rf(i);switch(t){case xu:return n*e;case cc:return n*e/r.components*r.byteLength;case lc:return n*e/r.components*r.byteLength;case uc:return n*e*2/r.components*r.byteLength;case dc:return n*e*2/r.components*r.byteLength;case gu:return n*e*3/r.components*r.byteLength;case Tn:return n*e*4/r.components*r.byteLength;case hc:return n*e*4/r.components*r.byteLength;case Xa:case qa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ja:case Ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case go:case _o:return Math.max(n,16)*Math.max(e,8)/4;case xo:case vo:return Math.max(n,8)*Math.max(e,8)/2;case yo:case Mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case bo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case So:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case To:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Co:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ro:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Po:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Lo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Do:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case zo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Io:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case No:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Fo:case ko:case Oo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Bo:case Vo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Go:case Ho:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Rf(n){switch(n){case ti:case hu:return{byteLength:1,components:1};case Zr:case fu:case Er:return{byteLength:2,components:1};case sc:case oc:return{byteLength:2,components:4};case Vi:case ac:case Dn:return{byteLength:4,components:1};case pu:case mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rc}}));typeof window<"u"&&(window.__THREE__?$e("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rc);function Fu(){let n=null,e=!1,t=null,i=null;function r(a,s){t(a,s),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){n=a}}}function Pf(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=n.createBuffer();n.bindBuffer(c,h),n.bufferData(c,l,u),o.onUploadCallback();let f;if(l instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=n.SHORT;else if(l instanceof Uint32Array)f=n.UNSIGNED_INT;else if(l instanceof Int32Array)f=n.INT;else if(l instanceof Int8Array)f=n.BYTE;else if(l instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c.updateRanges;if(n.bindBuffer(l,o),d.length===0)n.bufferSubData(l,0,u);else{d.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<d.length;f++){const g=d[h],_=d[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++h,d[h]=_)}d.length=h+1;for(let f=0,g=d.length;f<g;f++){const _=d[f];n.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function s(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:a,update:s}}var Lf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Df=`#ifdef USE_ALPHAHASH
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
#endif`,zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Uf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,If=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ff=`#ifdef USE_AOMAP
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
#endif`,kf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Of=`#ifdef USE_BATCHING
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
#endif`,Bf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Vf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Gf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wf=`#ifdef USE_IRIDESCENCE
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
#endif`,Xf=`#ifdef USE_BUMPMAP
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
#endif`,qf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,jf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Qf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ep=`#define PI 3.141592653589793
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
} // validated`,tp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,np=`vec3 transformedNormal = objectNormal;
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
#endif`,ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,rp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ap=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,op="gl_FragColor = linearToOutputTexel( gl_FragColor );",cp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lp=`#ifdef USE_ENVMAP
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
#endif`,up=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,dp=`#ifdef USE_ENVMAP
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
#endif`,hp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fp=`#ifdef USE_ENVMAP
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
#endif`,pp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,vp=`#ifdef USE_GRADIENTMAP
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
}`,_p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bp=`uniform bool receiveShadow;
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
#endif`,Sp=`#ifdef USE_ENVMAP
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
#endif`,wp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ep=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Cp=`PhysicalMaterial material;
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
#endif`,Rp=`uniform sampler2D dfgLUT;
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
}`,Pp=`
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
#endif`,Lp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Dp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zp=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Up=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ip=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Np=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,kp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Bp=`#if defined( USE_POINTS_UV )
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
#endif`,Vp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qp=`#ifdef USE_MORPHTARGETS
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
#endif`,jp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$p=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qp=`#ifdef USE_NORMALMAP
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
#endif`,e0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,t0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,n0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,i0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,r0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,a0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,s0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,o0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,c0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,l0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,u0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,d0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,h0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,f0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,p0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,m0=`float getShadowMask() {
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
}`,x0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g0=`#ifdef USE_SKINNING
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
#endif`,v0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_0=`#ifdef USE_SKINNING
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
#endif`,y0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,M0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,b0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,S0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,w0=`#ifdef USE_TRANSMISSION
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
#endif`,E0=`#ifdef USE_TRANSMISSION
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
#endif`,T0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,A0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,C0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const P0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,L0=`uniform sampler2D t2D;
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
}`,D0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,z0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,U0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N0=`#include <common>
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
}`,F0=`#if DEPTH_PACKING == 3200
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
}`,k0=`#define DISTANCE
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
}`,O0=`#define DISTANCE
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
}`,B0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,V0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,G0=`uniform float scale;
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
}`,H0=`uniform vec3 diffuse;
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
}`,W0=`#include <common>
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
}`,X0=`uniform vec3 diffuse;
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
}`,q0=`#define LAMBERT
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
}`,j0=`#define LAMBERT
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
}`,Y0=`#define MATCAP
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
}`,$0=`#define MATCAP
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
}`,K0=`#define NORMAL
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
}`,Z0=`#define NORMAL
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
}`,J0=`#define PHONG
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
}`,Q0=`#define PHONG
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
}`,em=`#define STANDARD
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
}`,tm=`#define STANDARD
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
}`,nm=`#define TOON
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
}`,im=`#define TOON
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
}`,rm=`uniform float size;
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
}`,am=`uniform vec3 diffuse;
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
}`,sm=`#include <common>
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
}`,om=`uniform vec3 color;
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
}`,cm=`uniform float rotation;
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
}`,lm=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:Lf,alphahash_pars_fragment:Df,alphamap_fragment:zf,alphamap_pars_fragment:Uf,alphatest_fragment:If,alphatest_pars_fragment:Nf,aomap_fragment:Ff,aomap_pars_fragment:kf,batching_pars_vertex:Of,batching_vertex:Bf,begin_vertex:Vf,beginnormal_vertex:Gf,bsdfs:Hf,iridescence_fragment:Wf,bumpmap_pars_fragment:Xf,clipping_planes_fragment:qf,clipping_planes_pars_fragment:jf,clipping_planes_pars_vertex:Yf,clipping_planes_vertex:$f,color_fragment:Kf,color_pars_fragment:Zf,color_pars_vertex:Jf,color_vertex:Qf,common:ep,cube_uv_reflection_fragment:tp,defaultnormal_vertex:np,displacementmap_pars_vertex:ip,displacementmap_vertex:rp,emissivemap_fragment:ap,emissivemap_pars_fragment:sp,colorspace_fragment:op,colorspace_pars_fragment:cp,envmap_fragment:lp,envmap_common_pars_fragment:up,envmap_pars_fragment:dp,envmap_pars_vertex:hp,envmap_physical_pars_fragment:Sp,envmap_vertex:fp,fog_vertex:pp,fog_pars_vertex:mp,fog_fragment:xp,fog_pars_fragment:gp,gradientmap_pars_fragment:vp,lightmap_pars_fragment:_p,lights_lambert_fragment:yp,lights_lambert_pars_fragment:Mp,lights_pars_begin:bp,lights_toon_fragment:wp,lights_toon_pars_fragment:Ep,lights_phong_fragment:Tp,lights_phong_pars_fragment:Ap,lights_physical_fragment:Cp,lights_physical_pars_fragment:Rp,lights_fragment_begin:Pp,lights_fragment_maps:Lp,lights_fragment_end:Dp,logdepthbuf_fragment:zp,logdepthbuf_pars_fragment:Up,logdepthbuf_pars_vertex:Ip,logdepthbuf_vertex:Np,map_fragment:Fp,map_pars_fragment:kp,map_particle_fragment:Op,map_particle_pars_fragment:Bp,metalnessmap_fragment:Vp,metalnessmap_pars_fragment:Gp,morphinstance_vertex:Hp,morphcolor_vertex:Wp,morphnormal_vertex:Xp,morphtarget_pars_vertex:qp,morphtarget_vertex:jp,normal_fragment_begin:Yp,normal_fragment_maps:$p,normal_pars_fragment:Kp,normal_pars_vertex:Zp,normal_vertex:Jp,normalmap_pars_fragment:Qp,clearcoat_normal_fragment_begin:e0,clearcoat_normal_fragment_maps:t0,clearcoat_pars_fragment:n0,iridescence_pars_fragment:i0,opaque_fragment:r0,packing:a0,premultiplied_alpha_fragment:s0,project_vertex:o0,dithering_fragment:c0,dithering_pars_fragment:l0,roughnessmap_fragment:u0,roughnessmap_pars_fragment:d0,shadowmap_pars_fragment:h0,shadowmap_pars_vertex:f0,shadowmap_vertex:p0,shadowmask_pars_fragment:m0,skinbase_vertex:x0,skinning_pars_vertex:g0,skinning_vertex:v0,skinnormal_vertex:_0,specularmap_fragment:y0,specularmap_pars_fragment:M0,tonemapping_fragment:b0,tonemapping_pars_fragment:S0,transmission_fragment:w0,transmission_pars_fragment:E0,uv_pars_fragment:T0,uv_pars_vertex:A0,uv_vertex:C0,worldpos_vertex:R0,background_vert:P0,background_frag:L0,backgroundCube_vert:D0,backgroundCube_frag:z0,cube_vert:U0,cube_frag:I0,depth_vert:N0,depth_frag:F0,distanceRGBA_vert:k0,distanceRGBA_frag:O0,equirect_vert:B0,equirect_frag:V0,linedashed_vert:G0,linedashed_frag:H0,meshbasic_vert:W0,meshbasic_frag:X0,meshlambert_vert:q0,meshlambert_frag:j0,meshmatcap_vert:Y0,meshmatcap_frag:$0,meshnormal_vert:K0,meshnormal_frag:Z0,meshphong_vert:J0,meshphong_frag:Q0,meshphysical_vert:em,meshphysical_frag:tm,meshtoon_vert:nm,meshtoon_frag:im,points_vert:rm,points_frag:am,shadow_vert:sm,shadow_frag:om,sprite_vert:cm,sprite_frag:lm},De={common:{diffuse:{value:new it(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new it(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new it(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new it(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},Ln={basic:{uniforms:tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new it(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:tn([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new it(0)},specular:{value:new it(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:tn([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new it(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:tn([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new it(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:tn([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:tn([De.points,De.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:tn([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:tn([De.common,De.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:tn([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:tn([De.sprite,De.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:tn([De.common,De.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:tn([De.lights,De.fog,{color:{value:new it(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Ln.physical={uniforms:tn([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new it(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new it(0)},specularColor:{value:new it(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const Ba={r:0,b:0,g:0},Ai=new ni,um=new dt;function dm(n,e,t,i,r,a,s){const o=new it(0);let c=a===!0?0:1,l,u,d=null,h=0,f=null;function g(w){let A=w.isScene===!0?w.background:null;return A&&A.isTexture&&(A=(w.backgroundBlurriness>0?t:e).get(A)),A}function _(w){let A=!1;const E=g(w);E===null?p(o,c):E&&E.isColor&&(p(E,1),A=!0);const y=n.xr.getEnvironmentBlendMode();y==="additive"?i.buffers.color.setClear(0,0,0,1,s):y==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(n.autoClear||A)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(w,A){const E=g(A);E&&(E.isCubeTexture||E.mapping===ls)?(u===void 0&&(u=new Pt(new oa(1,1,1),new pn({name:"BackgroundCubeMaterial",uniforms:Sr(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:nn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(y,D,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ai.copy(A.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(um.makeRotationFromEuler(Ai)),u.material.toneMapped=at.getTransfer(E.colorSpace)!==ut,(d!==E||h!==E.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=E,h=E.version,f=n.toneMapping),u.layers.enableAll(),w.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new Pt(new us(2,2),new pn({name:"BackgroundMaterial",uniforms:Sr(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=at.getTransfer(E.colorSpace)!==ut,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||h!==E.version||f!==n.toneMapping)&&(l.material.needsUpdate=!0,d=E,h=E.version,f=n.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function p(w,A){w.getRGB(Ba,wu(n)),i.buffers.color.setClear(Ba.r,Ba.g,Ba.b,A,s)}function R(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,A=1){o.set(w),c=A,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(w){c=w,p(o,c)},render:_,addToRenderList:m,dispose:R}}function hm(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=h(null);let a=r,s=!1;function o(M,L,I,F,G){let j=!1;const W=d(F,I,L);a!==W&&(a=W,l(a.object)),j=f(M,F,I,G),j&&g(M,F,I,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,A(M,L,I,F),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function d(M,L,I){const F=I.wireframe===!0;let G=i[M.id];G===void 0&&(G={},i[M.id]=G);let j=G[L.id];j===void 0&&(j={},G[L.id]=j);let W=j[F];return W===void 0&&(W=h(c()),j[F]=W),W}function h(M){const L=[],I=[],F=[];for(let G=0;G<t;G++)L[G]=0,I[G]=0,F[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:I,attributeDivisors:F,object:M,attributes:{},index:null}}function f(M,L,I,F){const G=a.attributes,j=L.attributes;let W=0;const oe=I.getAttributes();for(const q in oe)if(oe[q].location>=0){const ce=G[q];let he=j[q];if(he===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(he=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(he=M.instanceColor)),ce===void 0||ce.attribute!==he||he&&ce.data!==he.data)return!0;W++}return a.attributesNum!==W||a.index!==F}function g(M,L,I,F){const G={},j=L.attributes;let W=0;const oe=I.getAttributes();for(const q in oe)if(oe[q].location>=0){let ce=j[q];ce===void 0&&(q==="instanceMatrix"&&M.instanceMatrix&&(ce=M.instanceMatrix),q==="instanceColor"&&M.instanceColor&&(ce=M.instanceColor));const he={};he.attribute=ce,ce&&ce.data&&(he.data=ce.data),G[q]=he,W++}a.attributes=G,a.attributesNum=W,a.index=F}function _(){const M=a.newAttributes;for(let L=0,I=M.length;L<I;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const I=a.newAttributes,F=a.enabledAttributes,G=a.attributeDivisors;I[M]=1,F[M]===0&&(n.enableVertexAttribArray(M),F[M]=1),G[M]!==L&&(n.vertexAttribDivisor(M,L),G[M]=L)}function R(){const M=a.newAttributes,L=a.enabledAttributes;for(let I=0,F=L.length;I<F;I++)L[I]!==M[I]&&(n.disableVertexAttribArray(I),L[I]=0)}function w(M,L,I,F,G,j,W){W===!0?n.vertexAttribIPointer(M,L,I,G,j):n.vertexAttribPointer(M,L,I,F,G,j)}function A(M,L,I,F){_();const G=F.attributes,j=I.getAttributes(),W=L.defaultAttributeValues;for(const oe in j){const q=j[oe];if(q.location>=0){let ae=G[oe];if(ae===void 0&&(oe==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),oe==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),ae!==void 0){const ce=ae.normalized,he=ae.itemSize,me=e.get(ae);if(me===void 0)continue;const Ge=me.buffer,Be=me.type,ye=me.bytesPerElement,O=Be===n.INT||Be===n.UNSIGNED_INT||ae.gpuType===ac;if(ae.isInterleavedBufferAttribute){const ee=ae.data,H=ee.stride,Ae=ae.offset;if(ee.isInstancedInterleavedBuffer){for(let Z=0;Z<q.locationSize;Z++)p(q.location+Z,ee.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Z=0;Z<q.locationSize;Z++)m(q.location+Z);n.bindBuffer(n.ARRAY_BUFFER,Ge);for(let Z=0;Z<q.locationSize;Z++)w(q.location+Z,he/q.locationSize,Be,ce,H*ye,(Ae+he/q.locationSize*Z)*ye,O)}else{if(ae.isInstancedBufferAttribute){for(let ee=0;ee<q.locationSize;ee++)p(q.location+ee,ae.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ee=0;ee<q.locationSize;ee++)m(q.location+ee);n.bindBuffer(n.ARRAY_BUFFER,Ge);for(let ee=0;ee<q.locationSize;ee++)w(q.location+ee,he/q.locationSize,Be,ce,he*ye,he/q.locationSize*ee*ye,O)}}else if(W!==void 0){const ce=W[oe];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(q.location,ce);break;case 3:n.vertexAttrib3fv(q.location,ce);break;case 4:n.vertexAttrib4fv(q.location,ce);break;default:n.vertexAttrib1fv(q.location,ce)}}}}R()}function E(){z();for(const M in i){const L=i[M];for(const I in L){const F=L[I];for(const G in F)u(F[G].object),delete F[G];delete L[I]}delete i[M]}}function y(M){if(i[M.id]===void 0)return;const L=i[M.id];for(const I in L){const F=L[I];for(const G in F)u(F[G].object),delete F[G];delete L[I]}delete i[M.id]}function D(M){for(const L in i){const I=i[L];if(I[M.id]===void 0)continue;const F=I[M.id];for(const G in F)u(F[G].object),delete F[G];delete I[M.id]}}function z(){b(),s=!0,a!==r&&(a=r,l(a.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:z,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:y,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:m,disableUnusedAttributes:R}}function fm(n,e,t){let i;function r(l){i=l}function a(l,u){n.drawArrays(i,l,u),t.update(u,i,1)}function s(l,u,d){d!==0&&(n.drawArraysInstanced(i,l,u,d),t.update(u,i,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let f=0;for(let g=0;g<d;g++)f+=u[g];t.update(f,i,1)}function c(l,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)s(l[g],u[g],h[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*h[_];t.update(g,i,1)}}this.setMode=r,this.render=a,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function pm(n,e,t,i){let r;function a(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(D){return!(D!==Tn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){const z=D===Er&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==ti&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==Dn&&!z)}function c(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&($e("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),R=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),A=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,y=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:s,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:R,maxVaryings:w,maxFragmentUniforms:A,vertexTextures:E,maxSamples:y}}function mm(n){const e=this;let t=null,i=0,r=!1,a=!1;const s=new Pi,o=new Ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||r;return r=h,i=d.length,f},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!r||g===null||g.length===0||a&&!m)a?u(null):l();else{const R=a?0:i,w=R*4;let A=p.clippingState||null;c.value=A,A=u(g,h,w,f);for(let E=0;E!==w;++E)A[E]=t[E];p.clippingState=A,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=R}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,R=h.matrixWorldInverse;o.getNormalMatrix(R),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,A=f;w!==_;++w,A+=4)s.copy(d[w]).applyMatrix4(R,o),s.normal.toArray(m,A),m[A+3]=s.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function xm(n){let e=new WeakMap;function t(s,o){return o===ho?s.mapping=yr:o===fo&&(s.mapping=Mr),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===ho||o===fo)if(e.has(s)){const c=e.get(s).texture;return t(c,s.mapping)}else{const c=s.image;if(c&&c.height>0){const l=new jh(c.height);return l.fromEquirectangularTexture(n,s),e.set(s,l),s.addEventListener("dispose",r),t(l.texture,s.mapping)}else return null}}return s}function r(s){const o=s.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function a(){e=new WeakMap}return{get:i,dispose:a}}const _i=4,El=[.125,.215,.35,.446,.526,.582],zi=20,gm=256,Or=new Ef,Tl=new it;let Ws=null,Xs=0,qs=0,js=!1;const vm=new k;class Al{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,r=100,a={}){const{size:s=256,position:o=vm}=a;Ws=this._renderer.getRenderTarget(),Xs=this._renderer.getActiveCubeFace(),qs=this._renderer.getActiveMipmapLevel(),js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ws,Xs,qs),this._renderer.xr.enabled=js,e.scissorTest=!1,hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===yr||e.mapping===Mr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ws=this._renderer.getRenderTarget(),Xs=this._renderer.getActiveCubeFace(),qs=this._renderer.getActiveMipmapLevel(),js=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:Er,format:Tn,colorSpace:br,depthBuffer:!1},r=Cl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cl(e,t,i);const{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_m(a)),this._blurMaterial=Mm(a,e,t),this._ggxMaterial=ym(a,e,t)}return r}_compileMaterial(e){const t=new Pt(new At,e);this._renderer.compile(t,Or)}_sceneToCubeUV(e,t,i,r,a){const c=new vn(90,1,t,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Tl),d.toneMapping=yi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pt(new oa,new vi({name:"PMREM.Background",side:nn,depthWrite:!1,depthTest:!1})));const _=this._backgroundBox,m=_.material;let p=!1;const R=e.background;R?R.isColor&&(m.color.copy(R),e.background=null,p=!0):(m.color.copy(Tl),p=!0);for(let w=0;w<6;w++){const A=w%3;A===0?(c.up.set(0,l[w],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x+u[w],a.y,a.z)):A===1?(c.up.set(0,0,l[w]),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y+u[w],a.z)):(c.up.set(0,l[w],0),c.position.set(a.x,a.y,a.z),c.lookAt(a.x,a.y,a.z+u[w]));const E=this._cubeSize;hr(r,A*E,w>2?E:0,E,E),d.setRenderTarget(r),p&&d.render(_,c),d.render(e,c)}d.toneMapping=f,d.autoClear=h,e.background=R}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===yr||e.mapping===Mr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const a=r?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a;const o=a.uniforms;o.envMap.value=e;const c=this._cubeSize;hr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(s,Or)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let a=1;a<r;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){const r=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;const c=s.uniforms,l=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=.05+l*.95,f=d*h,{_lodMax:g}=this,_=this._sizeLods[i],m=3*_*(i>g-_i?i-g+_i:0),p=4*(this._cubeSize-_);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,hr(a,m,p,3*_,2*_),r.setRenderTarget(a),r.render(o,Or),c.envMap.value=a.texture,c.roughness.value=0,c.mipInt.value=g-i,hr(e,m,p,3*_,2*_),r.setRenderTarget(e),r.render(o,Or)}_blur(e,t,i,r,a){const s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,r,"latitudinal",a),this._halfBlur(s,e,i,i,r,"longitudinal",a)}_halfBlur(e,t,i,r,a,s,o){const c=this._renderer,l=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&Mt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const h=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(a)?Math.PI/(2*f):2*Math.PI/(2*zi-1),_=a/g,m=isFinite(a)?1+Math.floor(u*_):zi;m>zi&&$e(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zi}`);const p=[];let R=0;for(let D=0;D<zi;++D){const z=D/_,b=Math.exp(-z*z/2);p.push(b),D===0?R+=b:D<m&&(R+=2*b)}for(let D=0;D<p.length;D++)p[D]=p[D]/R;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=p,h.latitudinal.value=s==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:w}=this;h.dTheta.value=g,h.mipInt.value=w-i;const A=this._sizeLods[r],E=3*A*(r>w-_i?r-w+_i:0),y=4*(this._cubeSize-A);hr(t,E,y,3*A,2*A),c.setRenderTarget(t),c.render(d,Or)}}function _m(n){const e=[],t=[],i=[];let r=n;const a=n-_i+1+El.length;for(let s=0;s<a;s++){const o=Math.pow(2,r);e.push(o);let c=1/o;s>n-_i?c=El[s-n+_i-1]:s===0&&(c=0),t.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,m=2,p=1,R=new Float32Array(_*g*f),w=new Float32Array(m*g*f),A=new Float32Array(p*g*f);for(let y=0;y<f;y++){const D=y%3*2/3-1,z=y>2?0:-1,b=[D,z,0,D+2/3,z,0,D+2/3,z+1,0,D,z,0,D+2/3,z+1,0,D,z+1,0];R.set(b,_*g*y),w.set(h,m*g*y);const M=[y,y,y,y,y,y];A.set(M,p*g*y)}const E=new At;E.setAttribute("position",new rn(R,_)),E.setAttribute("uv",new rn(w,m)),E.setAttribute("faceIndex",new rn(A,p)),i.push(new Pt(E,null)),r>_i&&r--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function Cl(n,e,t){const i=new Hi(n,e,t);return i.texture.mapping=ls,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function ym(n,e,t){return new pn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:gm,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ds(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Mm(n,e,t){const i=new Float32Array(zi),r=new k(0,1,0);return new pn({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ds(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Rl(){return new pn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ds(),fragmentShader:`

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
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function Pl(){return new pn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zn,depthTest:!1,depthWrite:!1})}function ds(){return`

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
	`}function bm(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===ho||c===fo,u=c===yr||c===Mr;if(l||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Al(n)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return l&&f&&f.height>0||u&&f&&r(f)?(t===null&&(t=new Al(n)),d=l?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function r(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function a(o){const c=o.target;c.removeEventListener("dispose",a);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function s(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:s}}function Sm(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&na("WebGLRenderer: "+i+" extension not supported."),r}}}function wm(n,e,t,i){const r={},a=new WeakMap;function s(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",s),delete r[h.id];const f=a.get(h);f&&(e.remove(f),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return r[h.id]===!0||(h.addEventListener("dispose",s),r[h.id]=!0,t.memory.geometries++),h}function c(d){const h=d.attributes;for(const f in h)e.update(h[f],n.ARRAY_BUFFER)}function l(d){const h=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const R=f.array;_=f.version;for(let w=0,A=R.length;w<A;w+=3){const E=R[w+0],y=R[w+1],D=R[w+2];h.push(E,y,y,D,D,E)}}else if(g!==void 0){const R=g.array;_=g.version;for(let w=0,A=R.length/3-1;w<A;w+=3){const E=w+0,y=w+1,D=w+2;h.push(E,y,y,D,D,E)}}else return;const m=new(_u(h)?Su:bu)(h,1);m.version=_;const p=a.get(d);p&&e.remove(p),a.set(d,m)}function u(d){const h=a.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&l(d)}else l(d);return a.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Em(n,e,t){let i;function r(h){i=h}let a,s;function o(h){a=h.type,s=h.bytesPerElement}function c(h,f){n.drawElements(i,f,a,h*s),t.update(f,i,1)}function l(h,f,g){g!==0&&(n.drawElementsInstanced(i,f,a,h*s,g),t.update(f,i,g))}function u(h,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,a,h,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function d(h,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<h.length;p++)l(h[p]/s,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,a,h,0,_,0,g);let p=0;for(let R=0;R<g;R++)p+=f[R]*_[R];t.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Tm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,s,o){switch(t.calls++,s){case n.TRIANGLES:t.triangles+=o*(a/3);break;case n.LINES:t.lines+=o*(a/2);break;case n.LINE_STRIP:t.lines+=o*(a-1);break;case n.LINE_LOOP:t.lines+=o*a;break;case n.POINTS:t.points+=o*a;break;default:Mt("WebGLInfo: Unknown draw mode:",s);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Am(n,e,t){const i=new WeakMap,r=new Tt;function a(s,o,c){const l=s.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let b=function(){D.dispose(),i.delete(o),o.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],R=o.morphAttributes.color||[];let w=0;f===!0&&(w=1),g===!0&&(w=2),_===!0&&(w=3);let A=o.attributes.position.count*w,E=1;A>e.maxTextureSize&&(E=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const y=new Float32Array(A*E*4*d),D=new yu(y,A,E,d);D.type=Dn,D.needsUpdate=!0;const z=w*4;for(let M=0;M<d;M++){const L=m[M],I=p[M],F=R[M],G=A*E*4*M;for(let j=0;j<L.count;j++){const W=j*z;f===!0&&(r.fromBufferAttribute(L,j),y[G+W+0]=r.x,y[G+W+1]=r.y,y[G+W+2]=r.z,y[G+W+3]=0),g===!0&&(r.fromBufferAttribute(I,j),y[G+W+4]=r.x,y[G+W+5]=r.y,y[G+W+6]=r.z,y[G+W+7]=0),_===!0&&(r.fromBufferAttribute(F,j),y[G+W+8]=r.x,y[G+W+9]=r.y,y[G+W+10]=r.z,y[G+W+11]=F.itemSize===4?r.w:1)}}h={count:d,texture:D,size:new qe(A,E)},i.set(o,h),o.addEventListener("dispose",b)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",s.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:a}}function Cm(n,e,t,i){let r=new WeakMap;function a(c){const l=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==l&&(e.update(d),r.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const h=c.skeleton;r.get(h)!==l&&(h.update(),r.set(h,l))}return d}function s(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:a,dispose:s}}const ku=new Ot,Ll=new Du(1,1),Ou=new yu,Bu=new Ph,Vu=new Tu,Dl=[],zl=[],Ul=new Float32Array(16),Il=new Float32Array(9),Nl=new Float32Array(4);function Ar(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let a=Dl[r];if(a===void 0&&(a=new Float32Array(r),Dl[r]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,n[s].toArray(a,o)}return a}function Lt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Dt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function hs(n,e){let t=zl[e];t===void 0&&(t=new Int32Array(e),zl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Rm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2fv(this.addr,e),Dt(t,e)}}function Lm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Lt(t,e))return;n.uniform3fv(this.addr,e),Dt(t,e)}}function Dm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4fv(this.addr,e),Dt(t,e)}}function zm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;Nl.set(i),n.uniformMatrix2fv(this.addr,!1,Nl),Dt(t,i)}}function Um(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;Il.set(i),n.uniformMatrix3fv(this.addr,!1,Il),Dt(t,i)}}function Im(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Lt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Dt(t,e)}else{if(Lt(t,i))return;Ul.set(i),n.uniformMatrix4fv(this.addr,!1,Ul),Dt(t,i)}}function Nm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2iv(this.addr,e),Dt(t,e)}}function km(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3iv(this.addr,e),Dt(t,e)}}function Om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4iv(this.addr,e),Dt(t,e)}}function Bm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Lt(t,e))return;n.uniform2uiv(this.addr,e),Dt(t,e)}}function Gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Lt(t,e))return;n.uniform3uiv(this.addr,e),Dt(t,e)}}function Hm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Lt(t,e))return;n.uniform4uiv(this.addr,e),Dt(t,e)}}function Wm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(Ll.compareFunction=vu,a=Ll):a=ku,t.setTexture2D(e||a,r)}function Xm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Bu,r)}function qm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Vu,r)}function jm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ou,r)}function Ym(n){switch(n){case 5126:return Rm;case 35664:return Pm;case 35665:return Lm;case 35666:return Dm;case 35674:return zm;case 35675:return Um;case 35676:return Im;case 5124:case 35670:return Nm;case 35667:case 35671:return Fm;case 35668:case 35672:return km;case 35669:case 35673:return Om;case 5125:return Bm;case 36294:return Vm;case 36295:return Gm;case 36296:return Hm;case 35678:case 36198:case 36298:case 36306:case 35682:return Wm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return qm;case 36289:case 36303:case 36311:case 36292:return jm}}function $m(n,e){n.uniform1fv(this.addr,e)}function Km(n,e){const t=Ar(e,this.size,2);n.uniform2fv(this.addr,t)}function Zm(n,e){const t=Ar(e,this.size,3);n.uniform3fv(this.addr,t)}function Jm(n,e){const t=Ar(e,this.size,4);n.uniform4fv(this.addr,t)}function Qm(n,e){const t=Ar(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function ex(n,e){const t=Ar(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function tx(n,e){const t=Ar(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function nx(n,e){n.uniform1iv(this.addr,e)}function ix(n,e){n.uniform2iv(this.addr,e)}function rx(n,e){n.uniform3iv(this.addr,e)}function ax(n,e){n.uniform4iv(this.addr,e)}function sx(n,e){n.uniform1uiv(this.addr,e)}function ox(n,e){n.uniform2uiv(this.addr,e)}function cx(n,e){n.uniform3uiv(this.addr,e)}function lx(n,e){n.uniform4uiv(this.addr,e)}function ux(n,e,t){const i=this.cache,r=e.length,a=hs(t,r);Lt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let s=0;s!==r;++s)t.setTexture2D(e[s]||ku,a[s])}function dx(n,e,t){const i=this.cache,r=e.length,a=hs(t,r);Lt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let s=0;s!==r;++s)t.setTexture3D(e[s]||Bu,a[s])}function hx(n,e,t){const i=this.cache,r=e.length,a=hs(t,r);Lt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let s=0;s!==r;++s)t.setTextureCube(e[s]||Vu,a[s])}function fx(n,e,t){const i=this.cache,r=e.length,a=hs(t,r);Lt(i,a)||(n.uniform1iv(this.addr,a),Dt(i,a));for(let s=0;s!==r;++s)t.setTexture2DArray(e[s]||Ou,a[s])}function px(n){switch(n){case 5126:return $m;case 35664:return Km;case 35665:return Zm;case 35666:return Jm;case 35674:return Qm;case 35675:return ex;case 35676:return tx;case 5124:case 35670:return nx;case 35667:case 35671:return ix;case 35668:case 35672:return rx;case 35669:case 35673:return ax;case 5125:return sx;case 36294:return ox;case 36295:return cx;case 36296:return lx;case 35678:case 36198:case 36298:case 36306:case 35682:return ux;case 35679:case 36299:case 36307:return dx;case 35680:case 36300:case 36308:case 36293:return hx;case 36289:case 36303:case 36311:case 36292:return fx}}class mx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=Ym(t.type)}}class xx{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=px(t.type)}}class gx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let a=0,s=r.length;a!==s;++a){const o=r[a];o.setValue(e,t[o.id],i)}}}const Ys=/(\w+)(\])?(\[|\.)?/g;function Fl(n,e){n.seq.push(e),n.map[e.id]=e}function vx(n,e,t){const i=n.name,r=i.length;for(Ys.lastIndex=0;;){const a=Ys.exec(i),s=Ys.lastIndex;let o=a[1];const c=a[2]==="]",l=a[3];if(c&&(o=o|0),l===void 0||l==="["&&s+2===r){Fl(t,l===void 0?new mx(o,n,e):new xx(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new gx(o),Fl(t,d)),t=d}}}class $a{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=e.getActiveUniform(t,r),s=e.getUniformLocation(t,a.name);vx(a,s,this)}}setValue(e,t,i,r){const a=this.map[t];a!==void 0&&a.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let a=0,s=t.length;a!==s;++a){const o=t[a],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,a=e.length;r!==a;++r){const s=e[r];s.id in t&&i.push(s)}return i}}function kl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const _x=37297;let yx=0;function Mx(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let s=r;s<a;s++){const o=s+1;i.push(`${o===e?">":" "} ${o}: ${t[s]}`)}return i.join(`
`)}const Ol=new Ze;function bx(n){at._getMatrix(Ol,at.workingColorSpace,n);const e=`mat3( ${Ol.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(n)){case Za:return[e,"LinearTransferOETF"];case ut:return[e,"sRGBTransferOETF"];default:return $e("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Bl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),a=(n.getShaderInfoLog(e)||"").trim();if(i&&a==="")return"";const s=/ERROR: 0:(\d+)/.exec(a);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+a+`

`+Mx(n.getShaderSource(e),o)}else return a}function Sx(n,e){const t=bx(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function wx(n,e){let t;switch(e){case Gd:t="Linear";break;case Hd:t="Reinhard";break;case Wd:t="Cineon";break;case Xd:t="ACESFilmic";break;case jd:t="AgX";break;case Yd:t="Neutral";break;case qd:t="Custom";break;default:$e("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Va=new k;function Ex(){at.getLuminanceCoefficients(Va);const n=Va.x.toFixed(4),e=Va.y.toFixed(4),t=Va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Tx(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Vr).join(`
`)}function Ax(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function Cx(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(e,r),s=a.name;let o=1;a.type===n.FLOAT_MAT2&&(o=2),a.type===n.FLOAT_MAT3&&(o=3),a.type===n.FLOAT_MAT4&&(o=4),t[s]={type:a.type,location:n.getAttribLocation(e,s),locationSize:o}}return t}function Vr(n){return n!==""}function Vl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Rx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yo(n){return n.replace(Rx,Lx)}const Px=new Map;function Lx(n,e){let t=Qe[e];if(t===void 0){const i=Px.get(e);if(i!==void 0)t=Qe[i],$e('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Yo(t)}const Dx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(n){return n.replace(Dx,zx)}function zx(n,e,t,i){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Wl(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function Ux(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===lu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Md?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===jn&&(e="SHADOWMAP_TYPE_VSM"),e}function Ix(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case yr:case Mr:e="ENVMAP_TYPE_CUBE";break;case ls:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Nx(n){let e="ENVMAP_MODE_REFLECTION";return n.envMap&&n.envMapMode===Mr&&(e="ENVMAP_MODE_REFRACTION"),e}function Fx(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case uu:e="ENVMAP_BLENDING_MULTIPLY";break;case Bd:e="ENVMAP_BLENDING_MIX";break;case Vd:e="ENVMAP_BLENDING_ADD";break}return e}function kx(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function Ox(n,e,t,i){const r=n.getContext(),a=t.defines;let s=t.vertexShader,o=t.fragmentShader;const c=Ux(t),l=Ix(t),u=Nx(t),d=Fx(t),h=kx(t),f=Tx(t),g=Ax(a),_=r.createProgram();let m,p,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Vr).join(`
`),p.length>0&&(p+=`
`)):(m=[Wl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Vr).join(`
`),p=[Wl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Qe.tonemapping_pars_fragment:"",t.toneMapping!==yi?wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,Sx("linearToOutputTexel",t.outputColorSpace),Ex(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Vr).join(`
`)),s=Yo(s),s=Vl(s,t),s=Gl(s,t),o=Yo(o),o=Vl(o,t),o=Gl(o,t),s=Hl(s),o=Hl(o),t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Wc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=R+m+s,A=R+p+o,E=kl(r,r.VERTEX_SHADER,w),y=kl(r,r.FRAGMENT_SHADER,A);r.attachShader(_,E),r.attachShader(_,y),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function D(L){if(n.debug.checkShaderErrors){const I=r.getProgramInfoLog(_)||"",F=r.getShaderInfoLog(E)||"",G=r.getShaderInfoLog(y)||"",j=I.trim(),W=F.trim(),oe=G.trim();let q=!0,ae=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,E,y);else{const ce=Bl(r,E,"vertex"),he=Bl(r,y,"fragment");Mt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+j+`
`+ce+`
`+he)}else j!==""?$e("WebGLProgram: Program Info Log:",j):(W===""||oe==="")&&(ae=!1);ae&&(L.diagnostics={runnable:q,programLog:j,vertexShader:{log:W,prefix:m},fragmentShader:{log:oe,prefix:p}})}r.deleteShader(E),r.deleteShader(y),z=new $a(r,_),b=Cx(r,_)}let z;this.getUniforms=function(){return z===void 0&&D(this),z};let b;this.getAttributes=function(){return b===void 0&&D(this),b};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(_,_x)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yx++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=y,this}let Bx=0;class Vx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(i),s=this._getShaderCacheForMaterial(e);return s.has(r)===!1&&(s.add(r),r.usedTimes++),s.has(a)===!1&&(s.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Gx(e),t.set(e,i)),i}}class Gx{constructor(e){this.id=Bx++,this.code=e,this.usedTimes=0}}function Hx(n,e,t,i,r,a,s){const o=new mc,c=new Vx,l=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let f=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(b){return l.add(b),b===0?"uv":`uv${b}`}function m(b,M,L,I,F){const G=I.fog,j=F.geometry,W=b.isMeshStandardMaterial?I.environment:null,oe=(b.isMeshStandardMaterial?t:e).get(b.envMap||W),q=oe&&oe.mapping===ls?oe.image.height:null,ae=g[b.type];b.precision!==null&&(f=r.getMaxPrecision(b.precision),f!==b.precision&&$e("WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const ce=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,he=ce!==void 0?ce.length:0;let me=0;j.morphAttributes.position!==void 0&&(me=1),j.morphAttributes.normal!==void 0&&(me=2),j.morphAttributes.color!==void 0&&(me=3);let Ge,Be,ye,O;if(ae){const Ye=Ln[ae];Ge=Ye.vertexShader,Be=Ye.fragmentShader}else Ge=b.vertexShader,Be=b.fragmentShader,c.update(b),ye=c.getVertexShaderID(b),O=c.getFragmentShaderID(b);const ee=n.getRenderTarget(),H=n.state.buffers.depth.getReversed(),Ae=F.isInstancedMesh===!0,Z=F.isBatchedMesh===!0,Me=!!b.map,Pe=!!b.matcap,de=!!oe,pe=!!b.aoMap,C=!!b.lightMap,be=!!b.bumpMap,Se=!!b.normalMap,Ue=!!b.displacementMap,fe=!!b.emissiveMap,ve=!!b.metalnessMap,ge=!!b.roughnessMap,Re=b.anisotropy>0,T=b.clearcoat>0,v=b.dispersion>0,N=b.iridescence>0,J=b.sheen>0,ne=b.transmission>0,X=Re&&!!b.anisotropyMap,Te=T&&!!b.clearcoatMap,xe=T&&!!b.clearcoatNormalMap,Le=T&&!!b.clearcoatRoughnessMap,x=N&&!!b.iridescenceMap,re=N&&!!b.iridescenceThicknessMap,ue=J&&!!b.sheenColorMap,Fe=J&&!!b.sheenRoughnessMap,Ne=!!b.specularMap,U=!!b.specularColorMap,te=!!b.specularIntensityMap,P=ne&&!!b.transmissionMap,se=ne&&!!b.thicknessMap,ie=!!b.gradientMap,le=!!b.alphaMap,Q=b.alphaTest>0,Y=!!b.alphaHash,we=!!b.extensions;let Ve=yi;b.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Ve=n.toneMapping);const Ke={shaderID:ae,shaderType:b.type,shaderName:b.name,vertexShader:Ge,fragmentShader:Be,defines:b.defines,customVertexShaderID:ye,customFragmentShaderID:O,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:Z,batchingColor:Z&&F._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&F.instanceColor!==null,instancingMorph:Ae&&F.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:br,alphaToCoverage:!!b.alphaToCoverage,map:Me,matcap:Pe,envMap:de,envMapMode:de&&oe.mapping,envMapCubeUVHeight:q,aoMap:pe,lightMap:C,bumpMap:be,normalMap:Se,displacementMap:h&&Ue,emissiveMap:fe,normalMapObjectSpace:Se&&b.normalMapType===Qd,normalMapTangentSpace:Se&&b.normalMapType===Jd,metalnessMap:ve,roughnessMap:ge,anisotropy:Re,anisotropyMap:X,clearcoat:T,clearcoatMap:Te,clearcoatNormalMap:xe,clearcoatRoughnessMap:Le,dispersion:v,iridescence:N,iridescenceMap:x,iridescenceThicknessMap:re,sheen:J,sheenColorMap:ue,sheenRoughnessMap:Fe,specularMap:Ne,specularColorMap:U,specularIntensityMap:te,transmission:ne,transmissionMap:P,thicknessMap:se,gradientMap:ie,opaque:b.transparent===!1&&b.blending===mr&&b.alphaToCoverage===!1,alphaMap:le,alphaTest:Q,alphaHash:Y,combine:b.combine,mapUv:Me&&_(b.map.channel),aoMapUv:pe&&_(b.aoMap.channel),lightMapUv:C&&_(b.lightMap.channel),bumpMapUv:be&&_(b.bumpMap.channel),normalMapUv:Se&&_(b.normalMap.channel),displacementMapUv:Ue&&_(b.displacementMap.channel),emissiveMapUv:fe&&_(b.emissiveMap.channel),metalnessMapUv:ve&&_(b.metalnessMap.channel),roughnessMapUv:ge&&_(b.roughnessMap.channel),anisotropyMapUv:X&&_(b.anisotropyMap.channel),clearcoatMapUv:Te&&_(b.clearcoatMap.channel),clearcoatNormalMapUv:xe&&_(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Le&&_(b.clearcoatRoughnessMap.channel),iridescenceMapUv:x&&_(b.iridescenceMap.channel),iridescenceThicknessMapUv:re&&_(b.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&_(b.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&_(b.sheenRoughnessMap.channel),specularMapUv:Ne&&_(b.specularMap.channel),specularColorMapUv:U&&_(b.specularColorMap.channel),specularIntensityMapUv:te&&_(b.specularIntensityMap.channel),transmissionMapUv:P&&_(b.transmissionMap.channel),thicknessMapUv:se&&_(b.thicknessMap.channel),alphaMapUv:le&&_(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Se||Re),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!j.attributes.uv&&(Me||le),fog:!!G,useFog:b.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:H,skinning:F.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:me,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Me&&b.map.isVideoTexture===!0&&at.getTransfer(b.map.colorSpace)===ut,decodeVideoTextureEmissive:fe&&b.emissiveMap.isVideoTexture===!0&&at.getTransfer(b.emissiveMap.colorSpace)===ut,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Sn,flipSided:b.side===nn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:we&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(we&&b.extensions.multiDraw===!0||Z)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Ke.vertexUv1s=l.has(1),Ke.vertexUv2s=l.has(2),Ke.vertexUv3s=l.has(3),l.clear(),Ke}function p(b){const M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(const L in b.defines)M.push(L),M.push(b.defines[L]);return b.isRawShaderMaterial===!1&&(R(M,b),w(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function R(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function w(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function A(b){const M=g[b.type];let L;if(M){const I=Ln[M];L=Hh.clone(I.uniforms)}else L=b.uniforms;return L}function E(b,M){let L;for(let I=0,F=u.length;I<F;I++){const G=u[I];if(G.cacheKey===M){L=G,++L.usedTimes;break}}return L===void 0&&(L=new Ox(n,M,b,a),u.push(L)),L}function y(b){if(--b.usedTimes===0){const M=u.indexOf(b);u[M]=u[u.length-1],u.pop(),b.destroy()}}function D(b){c.remove(b)}function z(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:A,acquireProgram:E,releaseProgram:y,releaseShaderCache:D,programs:u,dispose:z}}function Wx(){let n=new WeakMap;function e(s){return n.has(s)}function t(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function i(s){n.delete(s)}function r(s,o,c){n.get(s)[o]=c}function a(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:a}}function Xx(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Xl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ql(){const n=[];let e=0;const t=[],i=[],r=[];function a(){e=0,t.length=0,i.length=0,r.length=0}function s(d,h,f,g,_,m){let p=n[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},n[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function o(d,h,f,g,_,m){const p=s(d,h,f,g,_,m);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):t.push(p)}function c(d,h,f,g,_,m){const p=s(d,h,f,g,_,m);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function l(d,h){t.length>1&&t.sort(d||Xx),i.length>1&&i.sort(h||Xl),r.length>1&&r.sort(h||Xl)}function u(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:r,init:a,push:o,unshift:c,finish:u,sort:l}}function qx(){let n=new WeakMap;function e(i,r){const a=n.get(i);let s;return a===void 0?(s=new ql,n.set(i,[s])):r>=a.length?(s=new ql,a.push(s)):s=a[r],s}function t(){n=new WeakMap}return{get:e,dispose:t}}function jx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new it};break;case"SpotLight":t={position:new k,direction:new k,color:new it,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new it,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new it,groundColor:new it};break;case"RectAreaLight":t={color:new it,position:new k,halfWidth:new k,halfHeight:new k};break}return n[e.id]=t,t}}}function Yx(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let $x=0;function Kx(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Zx(n){const e=new jx,t=Yx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new k);const r=new k,a=new dt,s=new dt;function o(l){let u=0,d=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,R=0,w=0,A=0,E=0,y=0,D=0;l.sort(Kx);for(let b=0,M=l.length;b<M;b++){const L=l[b],I=L.color,F=L.intensity,G=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=I.r*F,d+=I.g*F,h+=I.b*F;else if(L.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(L.sh.coefficients[W],F);D++}else if(L.isDirectionalLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const oe=L.shadow,q=t.get(L);q.shadowIntensity=oe.intensity,q.shadowBias=oe.bias,q.shadowNormalBias=oe.normalBias,q.shadowRadius=oe.radius,q.shadowMapSize=oe.mapSize,i.directionalShadow[f]=q,i.directionalShadowMap[f]=j,i.directionalShadowMatrix[f]=L.shadow.matrix,R++}i.directional[f]=W,f++}else if(L.isSpotLight){const W=e.get(L);W.position.setFromMatrixPosition(L.matrixWorld),W.color.copy(I).multiplyScalar(F),W.distance=G,W.coneCos=Math.cos(L.angle),W.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),W.decay=L.decay,i.spot[_]=W;const oe=L.shadow;if(L.map&&(i.spotLightMap[E]=L.map,E++,oe.updateMatrices(L),L.castShadow&&y++),i.spotLightMatrix[_]=oe.matrix,L.castShadow){const q=t.get(L);q.shadowIntensity=oe.intensity,q.shadowBias=oe.bias,q.shadowNormalBias=oe.normalBias,q.shadowRadius=oe.radius,q.shadowMapSize=oe.mapSize,i.spotShadow[_]=q,i.spotShadowMap[_]=j,A++}_++}else if(L.isRectAreaLight){const W=e.get(L);W.color.copy(I).multiplyScalar(F),W.halfWidth.set(L.width*.5,0,0),W.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=W,m++}else if(L.isPointLight){const W=e.get(L);if(W.color.copy(L.color).multiplyScalar(L.intensity),W.distance=L.distance,W.decay=L.decay,L.castShadow){const oe=L.shadow,q=t.get(L);q.shadowIntensity=oe.intensity,q.shadowBias=oe.bias,q.shadowNormalBias=oe.normalBias,q.shadowRadius=oe.radius,q.shadowMapSize=oe.mapSize,q.shadowCameraNear=oe.camera.near,q.shadowCameraFar=oe.camera.far,i.pointShadow[g]=q,i.pointShadowMap[g]=j,i.pointShadowMatrix[g]=L.shadow.matrix,w++}i.point[g]=W,g++}else if(L.isHemisphereLight){const W=e.get(L);W.skyColor.copy(L.color).multiplyScalar(F),W.groundColor.copy(L.groundColor).multiplyScalar(F),i.hemi[p]=W,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=De.LTC_FLOAT_1,i.rectAreaLTC2=De.LTC_FLOAT_2):(i.rectAreaLTC1=De.LTC_HALF_1,i.rectAreaLTC2=De.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const z=i.hash;(z.directionalLength!==f||z.pointLength!==g||z.spotLength!==_||z.rectAreaLength!==m||z.hemiLength!==p||z.numDirectionalShadows!==R||z.numPointShadows!==w||z.numSpotShadows!==A||z.numSpotMaps!==E||z.numLightProbes!==D)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=A,i.spotShadowMap.length=A,i.directionalShadowMatrix.length=R,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=A+E-y,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=y,i.numLightProbes=D,z.directionalLength=f,z.pointLength=g,z.spotLength=_,z.rectAreaLength=m,z.hemiLength=p,z.numDirectionalShadows=R,z.numPointShadows=w,z.numSpotShadows=A,z.numSpotMaps=E,z.numLightProbes=D,i.version=$x++)}function c(l,u){let d=0,h=0,f=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,R=l.length;p<R;p++){const w=l[p];if(w.isDirectionalLight){const A=i.directional[d];A.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),d++}else if(w.isSpotLight){const A=i.spot[f];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(w.matrixWorld),r.setFromMatrixPosition(w.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(m),f++}else if(w.isRectAreaLight){const A=i.rectArea[g];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(m),s.identity(),a.copy(w.matrixWorld),a.premultiply(m),s.extractRotation(a),A.halfWidth.set(w.width*.5,0,0),A.halfHeight.set(0,w.height*.5,0),A.halfWidth.applyMatrix4(s),A.halfHeight.applyMatrix4(s),g++}else if(w.isPointLight){const A=i.point[h];A.position.setFromMatrixPosition(w.matrixWorld),A.position.applyMatrix4(m),h++}else if(w.isHemisphereLight){const A=i.hemi[_];A.direction.setFromMatrixPosition(w.matrixWorld),A.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:i}}function jl(n){const e=new Zx(n),t=[],i=[];function r(u){l.camera=u,t.length=0,i.length=0}function a(u){t.push(u)}function s(u){i.push(u)}function o(){e.setup(t)}function c(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:a,pushShadow:s}}function Jx(n){let e=new WeakMap;function t(r,a=0){const s=e.get(r);let o;return s===void 0?(o=new jl(n),e.set(r,[o])):a>=s.length?(o=new jl(n),s.push(o)):o=s[a],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Qx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,eg=`uniform sampler2D shadow_pass;
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
}`;function tg(n,e,t){let i=new Ru;const r=new qe,a=new qe,s=new Tt,o=new _f({depthPacking:Zd}),c=new yf,l={},u=t.maxTextureSize,d={[ei]:nn,[nn]:ei,[Sn]:Sn},h=new pn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:Qx,fragmentShader:eg}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new At;g.setAttribute("position",new rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Pt(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let p=this.type;this.render=function(y,D,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const b=n.getRenderTarget(),M=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Zn),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=p!==jn&&this.type===jn,G=p===jn&&this.type!==jn;for(let j=0,W=y.length;j<W;j++){const oe=y[j],q=oe.shadow;if(q===void 0){$e("WebGLShadowMap:",oe,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const ae=q.getFrameExtents();if(r.multiply(ae),a.copy(q.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ae.x),r.x=a.x*ae.x,q.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ae.y),r.y=a.y*ae.y,q.mapSize.y=a.y)),q.map===null||F===!0||G===!0){const he=this.type!==jn?{minFilter:fn,magFilter:fn}:{};q.map!==null&&q.map.dispose(),q.map=new Hi(r.x,r.y,he),q.map.texture.name=oe.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const ce=q.getViewportCount();for(let he=0;he<ce;he++){const me=q.getViewport(he);s.set(a.x*me.x,a.y*me.y,a.x*me.z,a.y*me.w),I.viewport(s),q.updateMatrices(oe,he),i=q.getFrustum(),A(D,z,q.camera,oe,this.type)}q.isPointLightShadow!==!0&&this.type===jn&&R(q,z),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,M,L)};function R(y,D){const z=e.update(_);h.defines.VSM_SAMPLES!==y.blurSamples&&(h.defines.VSM_SAMPLES=y.blurSamples,f.defines.VSM_SAMPLES=y.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Hi(r.x,r.y)),h.uniforms.shadow_pass.value=y.map.texture,h.uniforms.resolution.value=y.mapSize,h.uniforms.radius.value=y.radius,n.setRenderTarget(y.mapPass),n.clear(),n.renderBufferDirect(D,null,z,h,_,null),f.uniforms.shadow_pass.value=y.mapPass.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,n.setRenderTarget(y.map),n.clear(),n.renderBufferDirect(D,null,z,f,_,null)}function w(y,D,z,b){let M=null;const L=z.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(L!==void 0)M=L;else if(M=z.isPointLight===!0?c:o,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const I=M.uuid,F=D.uuid;let G=l[I];G===void 0&&(G={},l[I]=G);let j=G[F];j===void 0&&(j=M.clone(),G[F]=j,D.addEventListener("dispose",E)),M=j}if(M.visible=D.visible,M.wireframe=D.wireframe,b===jn?M.side=D.shadowSide!==null?D.shadowSide:D.side:M.side=D.shadowSide!==null?D.shadowSide:d[D.side],M.alphaMap=D.alphaMap,M.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,M.map=D.map,M.clipShadows=D.clipShadows,M.clippingPlanes=D.clippingPlanes,M.clipIntersection=D.clipIntersection,M.displacementMap=D.displacementMap,M.displacementScale=D.displacementScale,M.displacementBias=D.displacementBias,M.wireframeLinewidth=D.wireframeLinewidth,M.linewidth=D.linewidth,z.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const I=n.properties.get(M);I.light=z}return M}function A(y,D,z,b,M){if(y.visible===!1)return;if(y.layers.test(D.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&M===jn)&&(!y.frustumCulled||i.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,y.matrixWorld);const F=e.update(y),G=y.material;if(Array.isArray(G)){const j=F.groups;for(let W=0,oe=j.length;W<oe;W++){const q=j[W],ae=G[q.materialIndex];if(ae&&ae.visible){const ce=w(y,ae,b,M);y.onBeforeShadow(n,y,D,z,F,ce,q),n.renderBufferDirect(z,null,F,ce,y,q),y.onAfterShadow(n,y,D,z,F,ce,q)}}}else if(G.visible){const j=w(y,G,b,M);y.onBeforeShadow(n,y,D,z,F,j,null),n.renderBufferDirect(z,null,F,j,y,null),y.onAfterShadow(n,y,D,z,F,j,null)}}const I=y.children;for(let F=0,G=I.length;F<G;F++)A(I[F],D,z,b,M)}function E(y){y.target.removeEventListener("dispose",E);for(const z in l){const b=l[z],M=y.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}const ng={[ro]:ao,[so]:lo,[oo]:uo,[_r]:co,[ao]:ro,[lo]:so,[uo]:oo,[co]:_r};function ig(n,e){function t(){let P=!1;const se=new Tt;let ie=null;const le=new Tt(0,0,0,0);return{setMask:function(Q){ie!==Q&&!P&&(n.colorMask(Q,Q,Q,Q),ie=Q)},setLocked:function(Q){P=Q},setClear:function(Q,Y,we,Ve,Ke){Ke===!0&&(Q*=Ve,Y*=Ve,we*=Ve),se.set(Q,Y,we,Ve),le.equals(se)===!1&&(n.clearColor(Q,Y,we,Ve),le.copy(se))},reset:function(){P=!1,ie=null,le.set(-1,0,0,0)}}}function i(){let P=!1,se=!1,ie=null,le=null,Q=null;return{setReversed:function(Y){if(se!==Y){const we=e.get("EXT_clip_control");Y?we.clipControlEXT(we.LOWER_LEFT_EXT,we.ZERO_TO_ONE_EXT):we.clipControlEXT(we.LOWER_LEFT_EXT,we.NEGATIVE_ONE_TO_ONE_EXT),se=Y;const Ve=Q;Q=null,this.setClear(Ve)}},getReversed:function(){return se},setTest:function(Y){Y?ee(n.DEPTH_TEST):H(n.DEPTH_TEST)},setMask:function(Y){ie!==Y&&!P&&(n.depthMask(Y),ie=Y)},setFunc:function(Y){if(se&&(Y=ng[Y]),le!==Y){switch(Y){case ro:n.depthFunc(n.NEVER);break;case ao:n.depthFunc(n.ALWAYS);break;case so:n.depthFunc(n.LESS);break;case _r:n.depthFunc(n.LEQUAL);break;case oo:n.depthFunc(n.EQUAL);break;case co:n.depthFunc(n.GEQUAL);break;case lo:n.depthFunc(n.GREATER);break;case uo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}le=Y}},setLocked:function(Y){P=Y},setClear:function(Y){Q!==Y&&(se&&(Y=1-Y),n.clearDepth(Y),Q=Y)},reset:function(){P=!1,ie=null,le=null,Q=null,se=!1}}}function r(){let P=!1,se=null,ie=null,le=null,Q=null,Y=null,we=null,Ve=null,Ke=null;return{setTest:function(Ye){P||(Ye?ee(n.STENCIL_TEST):H(n.STENCIL_TEST))},setMask:function(Ye){se!==Ye&&!P&&(n.stencilMask(Ye),se=Ye)},setFunc:function(Ye,_t,yt){(ie!==Ye||le!==_t||Q!==yt)&&(n.stencilFunc(Ye,_t,yt),ie=Ye,le=_t,Q=yt)},setOp:function(Ye,_t,yt){(Y!==Ye||we!==_t||Ve!==yt)&&(n.stencilOp(Ye,_t,yt),Y=Ye,we=_t,Ve=yt)},setLocked:function(Ye){P=Ye},setClear:function(Ye){Ke!==Ye&&(n.clearStencil(Ye),Ke=Ye)},reset:function(){P=!1,se=null,ie=null,le=null,Q=null,Y=null,we=null,Ve=null,Ke=null}}}const a=new t,s=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,R=null,w=null,A=null,E=null,y=null,D=new it(0,0,0),z=0,b=!1,M=null,L=null,I=null,F=null,G=null;const j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,oe=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(q)[1]),W=oe>=1):q.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),W=oe>=2);let ae=null,ce={};const he=n.getParameter(n.SCISSOR_BOX),me=n.getParameter(n.VIEWPORT),Ge=new Tt().fromArray(he),Be=new Tt().fromArray(me);function ye(P,se,ie,le){const Q=new Uint8Array(4),Y=n.createTexture();n.bindTexture(P,Y),n.texParameteri(P,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(P,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let we=0;we<ie;we++)P===n.TEXTURE_3D||P===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,le,0,n.RGBA,n.UNSIGNED_BYTE,Q):n.texImage2D(se+we,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Q);return Y}const O={};O[n.TEXTURE_2D]=ye(n.TEXTURE_2D,n.TEXTURE_2D,1),O[n.TEXTURE_CUBE_MAP]=ye(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),O[n.TEXTURE_2D_ARRAY]=ye(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),O[n.TEXTURE_3D]=ye(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),s.setClear(1),o.setClear(0),ee(n.DEPTH_TEST),s.setFunc(_r),be(!1),Se(Bc),ee(n.CULL_FACE),pe(Zn);function ee(P){u[P]!==!0&&(n.enable(P),u[P]=!0)}function H(P){u[P]!==!1&&(n.disable(P),u[P]=!1)}function Ae(P,se){return d[P]!==se?(n.bindFramebuffer(P,se),d[P]=se,P===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=se),P===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=se),!0):!1}function Z(P,se){let ie=f,le=!1;if(P){ie=h.get(se),ie===void 0&&(ie=[],h.set(se,ie));const Q=P.textures;if(ie.length!==Q.length||ie[0]!==n.COLOR_ATTACHMENT0){for(let Y=0,we=Q.length;Y<we;Y++)ie[Y]=n.COLOR_ATTACHMENT0+Y;ie.length=Q.length,le=!0}}else ie[0]!==n.BACK&&(ie[0]=n.BACK,le=!0);le&&n.drawBuffers(ie)}function Me(P){return g!==P?(n.useProgram(P),g=P,!0):!1}const Pe={[Li]:n.FUNC_ADD,[Sd]:n.FUNC_SUBTRACT,[wd]:n.FUNC_REVERSE_SUBTRACT};Pe[Ed]=n.MIN,Pe[Td]=n.MAX;const de={[Ad]:n.ZERO,[Cd]:n.ONE,[Rd]:n.SRC_COLOR,[no]:n.SRC_ALPHA,[Id]:n.SRC_ALPHA_SATURATE,[zd]:n.DST_COLOR,[Ld]:n.DST_ALPHA,[Pd]:n.ONE_MINUS_SRC_COLOR,[io]:n.ONE_MINUS_SRC_ALPHA,[Ud]:n.ONE_MINUS_DST_COLOR,[Dd]:n.ONE_MINUS_DST_ALPHA,[Nd]:n.CONSTANT_COLOR,[Fd]:n.ONE_MINUS_CONSTANT_COLOR,[kd]:n.CONSTANT_ALPHA,[Od]:n.ONE_MINUS_CONSTANT_ALPHA};function pe(P,se,ie,le,Q,Y,we,Ve,Ke,Ye){if(P===Zn){_===!0&&(H(n.BLEND),_=!1);return}if(_===!1&&(ee(n.BLEND),_=!0),P!==bd){if(P!==m||Ye!==b){if((p!==Li||A!==Li)&&(n.blendEquation(n.FUNC_ADD),p=Li,A=Li),Ye)switch(P){case mr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ii:n.blendFunc(n.ONE,n.ONE);break;case Vc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Gc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Mt("WebGLState: Invalid blending: ",P);break}else switch(P){case mr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ii:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Vc:Mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gc:Mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Mt("WebGLState: Invalid blending: ",P);break}R=null,w=null,E=null,y=null,D.set(0,0,0),z=0,m=P,b=Ye}return}Q=Q||se,Y=Y||ie,we=we||le,(se!==p||Q!==A)&&(n.blendEquationSeparate(Pe[se],Pe[Q]),p=se,A=Q),(ie!==R||le!==w||Y!==E||we!==y)&&(n.blendFuncSeparate(de[ie],de[le],de[Y],de[we]),R=ie,w=le,E=Y,y=we),(Ve.equals(D)===!1||Ke!==z)&&(n.blendColor(Ve.r,Ve.g,Ve.b,Ke),D.copy(Ve),z=Ke),m=P,b=!1}function C(P,se){P.side===Sn?H(n.CULL_FACE):ee(n.CULL_FACE);let ie=P.side===nn;se&&(ie=!ie),be(ie),P.blending===mr&&P.transparent===!1?pe(Zn):pe(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),s.setFunc(P.depthFunc),s.setTest(P.depthTest),s.setMask(P.depthWrite),a.setMask(P.colorWrite);const le=P.stencilWrite;o.setTest(le),le&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),fe(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):H(n.SAMPLE_ALPHA_TO_COVERAGE)}function be(P){M!==P&&(P?n.frontFace(n.CW):n.frontFace(n.CCW),M=P)}function Se(P){P!==_d?(ee(n.CULL_FACE),P!==L&&(P===Bc?n.cullFace(n.BACK):P===yd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):H(n.CULL_FACE),L=P}function Ue(P){P!==I&&(W&&n.lineWidth(P),I=P)}function fe(P,se,ie){P?(ee(n.POLYGON_OFFSET_FILL),(F!==se||G!==ie)&&(n.polygonOffset(se,ie),F=se,G=ie)):H(n.POLYGON_OFFSET_FILL)}function ve(P){P?ee(n.SCISSOR_TEST):H(n.SCISSOR_TEST)}function ge(P){P===void 0&&(P=n.TEXTURE0+j-1),ae!==P&&(n.activeTexture(P),ae=P)}function Re(P,se,ie){ie===void 0&&(ae===null?ie=n.TEXTURE0+j-1:ie=ae);let le=ce[ie];le===void 0&&(le={type:void 0,texture:void 0},ce[ie]=le),(le.type!==P||le.texture!==se)&&(ae!==ie&&(n.activeTexture(ie),ae=ie),n.bindTexture(P,se||O[P]),le.type=P,le.texture=se)}function T(){const P=ce[ae];P!==void 0&&P.type!==void 0&&(n.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function J(){try{n.texSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function ne(){try{n.texSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function X(){try{n.compressedTexSubImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function Te(){try{n.compressedTexSubImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function xe(){try{n.texStorage2D(...arguments)}catch(P){P("WebGLState:",P)}}function Le(){try{n.texStorage3D(...arguments)}catch(P){P("WebGLState:",P)}}function x(){try{n.texImage2D(...arguments)}catch(P){P("WebGLState:",P)}}function re(){try{n.texImage3D(...arguments)}catch(P){P("WebGLState:",P)}}function ue(P){Ge.equals(P)===!1&&(n.scissor(P.x,P.y,P.z,P.w),Ge.copy(P))}function Fe(P){Be.equals(P)===!1&&(n.viewport(P.x,P.y,P.z,P.w),Be.copy(P))}function Ne(P,se){let ie=l.get(se);ie===void 0&&(ie=new WeakMap,l.set(se,ie));let le=ie.get(P);le===void 0&&(le=n.getUniformBlockIndex(se,P.name),ie.set(P,le))}function U(P,se){const le=l.get(se).get(P);c.get(se)!==le&&(n.uniformBlockBinding(se,le,P.__bindingPointIndex),c.set(se,le))}function te(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),s.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ae=null,ce={},d={},h=new WeakMap,f=[],g=null,_=!1,m=null,p=null,R=null,w=null,A=null,E=null,y=null,D=new it(0,0,0),z=0,b=!1,M=null,L=null,I=null,F=null,G=null,Ge.set(0,0,n.canvas.width,n.canvas.height),Be.set(0,0,n.canvas.width,n.canvas.height),a.reset(),s.reset(),o.reset()}return{buffers:{color:a,depth:s,stencil:o},enable:ee,disable:H,bindFramebuffer:Ae,drawBuffers:Z,useProgram:Me,setBlending:pe,setMaterial:C,setFlipSided:be,setCullFace:Se,setLineWidth:Ue,setPolygonOffset:fe,setScissorTest:ve,activeTexture:ge,bindTexture:Re,unbindTexture:T,compressedTexImage2D:v,compressedTexImage3D:N,texImage2D:x,texImage3D:re,updateUBOMapping:Ne,uniformBlockBinding:U,texStorage2D:xe,texStorage3D:Le,texSubImage2D:J,texSubImage3D:ne,compressedTexSubImage2D:X,compressedTexSubImage3D:Te,scissor:ue,viewport:Fe,reset:te}}function rg(n,e,t,i,r,a,s){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new qe,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,v){return f?new OffscreenCanvas(T,v):ta("canvas")}function _(T,v,N){let J=1;const ne=Re(T);if((ne.width>N||ne.height>N)&&(J=N/Math.max(ne.width,ne.height)),J<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const X=Math.floor(J*ne.width),Te=Math.floor(J*ne.height);d===void 0&&(d=g(X,Te));const xe=v?g(X,Te):d;return xe.width=X,xe.height=Te,xe.getContext("2d").drawImage(T,0,0,X,Te),$e("WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+X+"x"+Te+")."),xe}else return"data"in T&&$e("WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),T;return T}function m(T){return T.generateMipmaps}function p(T){n.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(T,v,N,J,ne=!1){if(T!==null){if(n[T]!==void 0)return n[T];$e("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=v;if(v===n.RED&&(N===n.FLOAT&&(X=n.R32F),N===n.HALF_FLOAT&&(X=n.R16F),N===n.UNSIGNED_BYTE&&(X=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(X=n.R8UI),N===n.UNSIGNED_SHORT&&(X=n.R16UI),N===n.UNSIGNED_INT&&(X=n.R32UI),N===n.BYTE&&(X=n.R8I),N===n.SHORT&&(X=n.R16I),N===n.INT&&(X=n.R32I)),v===n.RG&&(N===n.FLOAT&&(X=n.RG32F),N===n.HALF_FLOAT&&(X=n.RG16F),N===n.UNSIGNED_BYTE&&(X=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(X=n.RG8UI),N===n.UNSIGNED_SHORT&&(X=n.RG16UI),N===n.UNSIGNED_INT&&(X=n.RG32UI),N===n.BYTE&&(X=n.RG8I),N===n.SHORT&&(X=n.RG16I),N===n.INT&&(X=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(X=n.RGB8UI),N===n.UNSIGNED_SHORT&&(X=n.RGB16UI),N===n.UNSIGNED_INT&&(X=n.RGB32UI),N===n.BYTE&&(X=n.RGB8I),N===n.SHORT&&(X=n.RGB16I),N===n.INT&&(X=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),N===n.UNSIGNED_INT&&(X=n.RGBA32UI),N===n.BYTE&&(X=n.RGBA8I),N===n.SHORT&&(X=n.RGBA16I),N===n.INT&&(X=n.RGBA32I)),v===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(X=n.R11F_G11F_B10F)),v===n.RGBA){const Te=ne?Za:at.getTransfer(J);N===n.FLOAT&&(X=n.RGBA32F),N===n.HALF_FLOAT&&(X=n.RGBA16F),N===n.UNSIGNED_BYTE&&(X=Te===ut?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function A(T,v){let N;return T?v===null||v===Vi||v===Jr?N=n.DEPTH24_STENCIL8:v===Dn?N=n.DEPTH32F_STENCIL8:v===Zr&&(N=n.DEPTH24_STENCIL8,$e("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Vi||v===Jr?N=n.DEPTH_COMPONENT24:v===Dn?N=n.DEPTH_COMPONENT32F:v===Zr&&(N=n.DEPTH_COMPONENT16),N}function E(T,v){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==fn&&T.minFilter!==hn?Math.log2(Math.max(v.width,v.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?v.mipmaps.length:1}function y(T){const v=T.target;v.removeEventListener("dispose",y),z(v),v.isVideoTexture&&u.delete(v)}function D(T){const v=T.target;v.removeEventListener("dispose",D),M(v)}function z(T){const v=i.get(T);if(v.__webglInit===void 0)return;const N=T.source,J=h.get(N);if(J){const ne=J[v.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&b(T),Object.keys(J).length===0&&h.delete(N)}i.remove(T)}function b(T){const v=i.get(T);n.deleteTexture(v.__webglTexture);const N=T.source,J=h.get(N);delete J[v.__cacheKey],s.memory.textures--}function M(T){const v=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(v.__webglFramebuffer[J]))for(let ne=0;ne<v.__webglFramebuffer[J].length;ne++)n.deleteFramebuffer(v.__webglFramebuffer[J][ne]);else n.deleteFramebuffer(v.__webglFramebuffer[J]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[J])}else{if(Array.isArray(v.__webglFramebuffer))for(let J=0;J<v.__webglFramebuffer.length;J++)n.deleteFramebuffer(v.__webglFramebuffer[J]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let J=0;J<v.__webglColorRenderbuffer.length;J++)v.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[J]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=T.textures;for(let J=0,ne=N.length;J<ne;J++){const X=i.get(N[J]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),s.memory.textures--),i.remove(N[J])}i.remove(T)}let L=0;function I(){L=0}function F(){const T=L;return T>=r.maxTextures&&$e("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),L+=1,T}function G(T){const v=[];return v.push(T.wrapS),v.push(T.wrapT),v.push(T.wrapR||0),v.push(T.magFilter),v.push(T.minFilter),v.push(T.anisotropy),v.push(T.internalFormat),v.push(T.format),v.push(T.type),v.push(T.generateMipmaps),v.push(T.premultiplyAlpha),v.push(T.flipY),v.push(T.unpackAlignment),v.push(T.colorSpace),v.join()}function j(T,v){const N=i.get(T);if(T.isVideoTexture&&ve(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&N.__version!==T.version){const J=T.image;if(J===null)$e("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)$e("WebGLRenderer: Texture marked for update but image is incomplete");else{O(N,T,v);return}}else T.isExternalTexture&&(N.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function W(T,v){const N=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){O(N,T,v);return}else T.isExternalTexture&&(N.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function oe(T,v){const N=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){O(N,T,v);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function q(T,v){const N=i.get(T);if(T.version>0&&N.__version!==T.version){ee(N,T,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}const ae={[po]:n.REPEAT,[$n]:n.CLAMP_TO_EDGE,[mo]:n.MIRRORED_REPEAT},ce={[fn]:n.NEAREST,[$d]:n.NEAREST_MIPMAP_NEAREST,[ha]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[ms]:n.LINEAR_MIPMAP_NEAREST,[Ni]:n.LINEAR_MIPMAP_LINEAR},he={[eh]:n.NEVER,[sh]:n.ALWAYS,[th]:n.LESS,[vu]:n.LEQUAL,[nh]:n.EQUAL,[ah]:n.GEQUAL,[ih]:n.GREATER,[rh]:n.NOTEQUAL};function me(T,v){if(v.type===Dn&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===hn||v.magFilter===ms||v.magFilter===ha||v.magFilter===Ni||v.minFilter===hn||v.minFilter===ms||v.minFilter===ha||v.minFilter===Ni)&&$e("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,ae[v.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,ae[v.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,ae[v.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ce[v.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ce[v.minFilter]),v.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,he[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===fn||v.minFilter!==ha&&v.minFilter!==Ni||v.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(T,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,r.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Ge(T,v){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,v.addEventListener("dispose",y));const J=v.source;let ne=h.get(J);ne===void 0&&(ne={},h.set(J,ne));const X=G(v);if(X!==T.__cacheKey){ne[X]===void 0&&(ne[X]={texture:n.createTexture(),usedTimes:0},s.memory.textures++,N=!0),ne[X].usedTimes++;const Te=ne[T.__cacheKey];Te!==void 0&&(ne[T.__cacheKey].usedTimes--,Te.usedTimes===0&&b(v)),T.__cacheKey=X,T.__webglTexture=ne[X].texture}return N}function Be(T,v,N){return Math.floor(Math.floor(T/N)/v)}function ye(T,v,N,J){const X=T.updateRanges;if(X.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,N,J,v.data);else{X.sort((re,ue)=>re.start-ue.start);let Te=0;for(let re=1;re<X.length;re++){const ue=X[Te],Fe=X[re],Ne=ue.start+ue.count,U=Be(Fe.start,v.width,4),te=Be(ue.start,v.width,4);Fe.start<=Ne+1&&U===te&&Be(Fe.start+Fe.count-1,v.width,4)===U?ue.count=Math.max(ue.count,Fe.start+Fe.count-ue.start):(++Te,X[Te]=Fe)}X.length=Te+1;const xe=n.getParameter(n.UNPACK_ROW_LENGTH),Le=n.getParameter(n.UNPACK_SKIP_PIXELS),x=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let re=0,ue=X.length;re<ue;re++){const Fe=X[re],Ne=Math.floor(Fe.start/4),U=Math.ceil(Fe.count/4),te=Ne%v.width,P=Math.floor(Ne/v.width),se=U,ie=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,te),n.pixelStorei(n.UNPACK_SKIP_ROWS,P),t.texSubImage2D(n.TEXTURE_2D,0,te,P,se,ie,N,J,v.data)}T.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,xe),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Le),n.pixelStorei(n.UNPACK_SKIP_ROWS,x)}}function O(T,v,N){let J=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(J=n.TEXTURE_3D);const ne=Ge(T,v),X=v.source;t.bindTexture(J,T.__webglTexture,n.TEXTURE0+N);const Te=i.get(X);if(X.version!==Te.__version||ne===!0){t.activeTexture(n.TEXTURE0+N);const xe=at.getPrimaries(at.workingColorSpace),Le=v.colorSpace===gi?null:at.getPrimaries(v.colorSpace),x=v.colorSpace===gi||xe===Le?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,x);let re=_(v.image,!1,r.maxTextureSize);re=ge(v,re);const ue=a.convert(v.format,v.colorSpace),Fe=a.convert(v.type);let Ne=w(v.internalFormat,ue,Fe,v.colorSpace,v.isVideoTexture);me(J,v);let U;const te=v.mipmaps,P=v.isVideoTexture!==!0,se=Te.__version===void 0||ne===!0,ie=X.dataReady,le=E(v,re);if(v.isDepthTexture)Ne=A(v.format===ea,v.type),se&&(P?t.texStorage2D(n.TEXTURE_2D,1,Ne,re.width,re.height):t.texImage2D(n.TEXTURE_2D,0,Ne,re.width,re.height,0,ue,Fe,null));else if(v.isDataTexture)if(te.length>0){P&&se&&t.texStorage2D(n.TEXTURE_2D,le,Ne,te[0].width,te[0].height);for(let Q=0,Y=te.length;Q<Y;Q++)U=te[Q],P?ie&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,U.width,U.height,ue,Fe,U.data):t.texImage2D(n.TEXTURE_2D,Q,Ne,U.width,U.height,0,ue,Fe,U.data);v.generateMipmaps=!1}else P?(se&&t.texStorage2D(n.TEXTURE_2D,le,Ne,re.width,re.height),ie&&ye(v,re,ue,Fe)):t.texImage2D(n.TEXTURE_2D,0,Ne,re.width,re.height,0,ue,Fe,re.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){P&&se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,Ne,te[0].width,te[0].height,re.depth);for(let Q=0,Y=te.length;Q<Y;Q++)if(U=te[Q],v.format!==Tn)if(ue!==null)if(P){if(ie)if(v.layerUpdates.size>0){const we=wl(U.width,U.height,v.format,v.type);for(const Ve of v.layerUpdates){const Ke=U.data.subarray(Ve*we/U.data.BYTES_PER_ELEMENT,(Ve+1)*we/U.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,Ve,U.width,U.height,1,ue,Ke)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,U.width,U.height,re.depth,ue,U.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Q,Ne,U.width,U.height,re.depth,0,U.data,0,0);else $e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else P?ie&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,Q,0,0,0,U.width,U.height,re.depth,ue,Fe,U.data):t.texImage3D(n.TEXTURE_2D_ARRAY,Q,Ne,U.width,U.height,re.depth,0,ue,Fe,U.data)}else{P&&se&&t.texStorage2D(n.TEXTURE_2D,le,Ne,te[0].width,te[0].height);for(let Q=0,Y=te.length;Q<Y;Q++)U=te[Q],v.format!==Tn?ue!==null?P?ie&&t.compressedTexSubImage2D(n.TEXTURE_2D,Q,0,0,U.width,U.height,ue,U.data):t.compressedTexImage2D(n.TEXTURE_2D,Q,Ne,U.width,U.height,0,U.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):P?ie&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,U.width,U.height,ue,Fe,U.data):t.texImage2D(n.TEXTURE_2D,Q,Ne,U.width,U.height,0,ue,Fe,U.data)}else if(v.isDataArrayTexture)if(P){if(se&&t.texStorage3D(n.TEXTURE_2D_ARRAY,le,Ne,re.width,re.height,re.depth),ie)if(v.layerUpdates.size>0){const Q=wl(re.width,re.height,v.format,v.type);for(const Y of v.layerUpdates){const we=re.data.subarray(Y*Q/re.data.BYTES_PER_ELEMENT,(Y+1)*Q/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Y,re.width,re.height,1,ue,Fe,we)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ue,Fe,re.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ne,re.width,re.height,re.depth,0,ue,Fe,re.data);else if(v.isData3DTexture)P?(se&&t.texStorage3D(n.TEXTURE_3D,le,Ne,re.width,re.height,re.depth),ie&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ue,Fe,re.data)):t.texImage3D(n.TEXTURE_3D,0,Ne,re.width,re.height,re.depth,0,ue,Fe,re.data);else if(v.isFramebufferTexture){if(se)if(P)t.texStorage2D(n.TEXTURE_2D,le,Ne,re.width,re.height);else{let Q=re.width,Y=re.height;for(let we=0;we<le;we++)t.texImage2D(n.TEXTURE_2D,we,Ne,Q,Y,0,ue,Fe,null),Q>>=1,Y>>=1}}else if(te.length>0){if(P&&se){const Q=Re(te[0]);t.texStorage2D(n.TEXTURE_2D,le,Ne,Q.width,Q.height)}for(let Q=0,Y=te.length;Q<Y;Q++)U=te[Q],P?ie&&t.texSubImage2D(n.TEXTURE_2D,Q,0,0,ue,Fe,U):t.texImage2D(n.TEXTURE_2D,Q,Ne,ue,Fe,U);v.generateMipmaps=!1}else if(P){if(se){const Q=Re(re);t.texStorage2D(n.TEXTURE_2D,le,Ne,Q.width,Q.height)}ie&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ue,Fe,re)}else t.texImage2D(n.TEXTURE_2D,0,Ne,ue,Fe,re);m(v)&&p(J),Te.__version=X.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function ee(T,v,N){if(v.image.length!==6)return;const J=Ge(T,v),ne=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+N);const X=i.get(ne);if(ne.version!==X.__version||J===!0){t.activeTexture(n.TEXTURE0+N);const Te=at.getPrimaries(at.workingColorSpace),xe=v.colorSpace===gi?null:at.getPrimaries(v.colorSpace),Le=v.colorSpace===gi||Te===xe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const x=v.isCompressedTexture||v.image[0].isCompressedTexture,re=v.image[0]&&v.image[0].isDataTexture,ue=[];for(let Y=0;Y<6;Y++)!x&&!re?ue[Y]=_(v.image[Y],!0,r.maxCubemapSize):ue[Y]=re?v.image[Y].image:v.image[Y],ue[Y]=ge(v,ue[Y]);const Fe=ue[0],Ne=a.convert(v.format,v.colorSpace),U=a.convert(v.type),te=w(v.internalFormat,Ne,U,v.colorSpace),P=v.isVideoTexture!==!0,se=X.__version===void 0||J===!0,ie=ne.dataReady;let le=E(v,Fe);me(n.TEXTURE_CUBE_MAP,v);let Q;if(x){P&&se&&t.texStorage2D(n.TEXTURE_CUBE_MAP,le,te,Fe.width,Fe.height);for(let Y=0;Y<6;Y++){Q=ue[Y].mipmaps;for(let we=0;we<Q.length;we++){const Ve=Q[we];v.format!==Tn?Ne!==null?P?ie&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we,0,0,Ve.width,Ve.height,Ne,Ve.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we,te,Ve.width,Ve.height,0,Ve.data):$e("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we,0,0,Ve.width,Ve.height,Ne,U,Ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we,te,Ve.width,Ve.height,0,Ne,U,Ve.data)}}}else{if(Q=v.mipmaps,P&&se){Q.length>0&&le++;const Y=Re(ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,le,te,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(re){P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,ue[Y].width,ue[Y].height,Ne,U,ue[Y].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,te,ue[Y].width,ue[Y].height,0,Ne,U,ue[Y].data);for(let we=0;we<Q.length;we++){const Ke=Q[we].image[Y].image;P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we+1,0,0,Ke.width,Ke.height,Ne,U,Ke.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we+1,te,Ke.width,Ke.height,0,Ne,U,Ke.data)}}else{P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,Ne,U,ue[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,te,Ne,U,ue[Y]);for(let we=0;we<Q.length;we++){const Ve=Q[we];P?ie&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we+1,0,0,Ne,U,Ve.image[Y]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Y,we+1,te,Ne,U,Ve.image[Y])}}}m(v)&&p(n.TEXTURE_CUBE_MAP),X.__version=ne.version,v.onUpdate&&v.onUpdate(v)}T.__version=v.version}function H(T,v,N,J,ne,X){const Te=a.convert(N.format,N.colorSpace),xe=a.convert(N.type),Le=w(N.internalFormat,Te,xe,N.colorSpace),x=i.get(v),re=i.get(N);if(re.__renderTarget=v,!x.__hasExternalTextures){const ue=Math.max(1,v.width>>X),Fe=Math.max(1,v.height>>X);ne===n.TEXTURE_3D||ne===n.TEXTURE_2D_ARRAY?t.texImage3D(ne,X,Le,ue,Fe,v.depth,0,Te,xe,null):t.texImage2D(ne,X,Le,ue,Fe,0,Te,xe,null)}t.bindFramebuffer(n.FRAMEBUFFER,T),fe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,ne,re.__webglTexture,0,Ue(v)):(ne===n.TEXTURE_2D||ne>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,ne,re.__webglTexture,X),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ae(T,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,T),v.depthBuffer){const J=v.depthTexture,ne=J&&J.isDepthTexture?J.type:null,X=A(v.stencilBuffer,ne),Te=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,xe=Ue(v);fe(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xe,X,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,xe,X,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,X,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Te,n.RENDERBUFFER,T)}else{const J=v.textures;for(let ne=0;ne<J.length;ne++){const X=J[ne],Te=a.convert(X.format,X.colorSpace),xe=a.convert(X.type),Le=w(X.internalFormat,Te,xe,X.colorSpace),x=Ue(v);N&&fe(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,x,Le,v.width,v.height):fe(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,x,Le,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Le,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Z(T,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,T),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(v.depthTexture);J.__renderTarget=v,(!J.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),j(v.depthTexture,0);const ne=J.__webglTexture,X=Ue(v);if(v.depthTexture.format===Qr)fe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ne,0);else if(v.depthTexture.format===ea)fe(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Me(T){const v=i.get(T),N=T.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==T.depthTexture){const J=T.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),J){const ne=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,J.removeEventListener("dispose",ne)};J.addEventListener("dispose",ne),v.__depthDisposeCallback=ne}v.__boundDepthTexture=J}if(T.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");const J=T.texture.mipmaps;J&&J.length>0?Z(v.__webglFramebuffer[0],T):Z(v.__webglFramebuffer,T)}else if(N){v.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[J]),v.__webglDepthbuffer[J]===void 0)v.__webglDepthbuffer[J]=n.createRenderbuffer(),Ae(v.__webglDepthbuffer[J],T,!1);else{const ne=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,X)}}else{const J=T.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Ae(v.__webglDepthbuffer,T,!1);else{const ne=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,ne,n.RENDERBUFFER,X)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Pe(T,v,N){const J=i.get(T);v!==void 0&&H(J.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Me(T)}function de(T){const v=T.texture,N=i.get(T),J=i.get(v);T.addEventListener("dispose",D);const ne=T.textures,X=T.isWebGLCubeRenderTarget===!0,Te=ne.length>1;if(Te||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=v.version,s.memory.textures++),X){N.__webglFramebuffer=[];for(let xe=0;xe<6;xe++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[xe]=[];for(let Le=0;Le<v.mipmaps.length;Le++)N.__webglFramebuffer[xe][Le]=n.createFramebuffer()}else N.__webglFramebuffer[xe]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let xe=0;xe<v.mipmaps.length;xe++)N.__webglFramebuffer[xe]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(Te)for(let xe=0,Le=ne.length;xe<Le;xe++){const x=i.get(ne[xe]);x.__webglTexture===void 0&&(x.__webglTexture=n.createTexture(),s.memory.textures++)}if(T.samples>0&&fe(T)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let xe=0;xe<ne.length;xe++){const Le=ne[xe];N.__webglColorRenderbuffer[xe]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[xe]);const x=a.convert(Le.format,Le.colorSpace),re=a.convert(Le.type),ue=w(Le.internalFormat,x,re,Le.colorSpace,T.isXRRenderTarget===!0),Fe=Ue(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,ue,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,N.__webglColorRenderbuffer[xe])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),Ae(N.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),me(n.TEXTURE_CUBE_MAP,v);for(let xe=0;xe<6;xe++)if(v.mipmaps&&v.mipmaps.length>0)for(let Le=0;Le<v.mipmaps.length;Le++)H(N.__webglFramebuffer[xe][Le],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Le);else H(N.__webglFramebuffer[xe],T,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0);m(v)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let xe=0,Le=ne.length;xe<Le;xe++){const x=ne[xe],re=i.get(x);let ue=n.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ue=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ue,re.__webglTexture),me(ue,x),H(N.__webglFramebuffer,T,x,n.COLOR_ATTACHMENT0+xe,ue,0),m(x)&&p(ue)}t.unbindTexture()}else{let xe=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(xe=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(xe,J.__webglTexture),me(xe,v),v.mipmaps&&v.mipmaps.length>0)for(let Le=0;Le<v.mipmaps.length;Le++)H(N.__webglFramebuffer[Le],T,v,n.COLOR_ATTACHMENT0,xe,Le);else H(N.__webglFramebuffer,T,v,n.COLOR_ATTACHMENT0,xe,0);m(v)&&p(xe),t.unbindTexture()}T.depthBuffer&&Me(T)}function pe(T){const v=T.textures;for(let N=0,J=v.length;N<J;N++){const ne=v[N];if(m(ne)){const X=R(T),Te=i.get(ne).__webglTexture;t.bindTexture(X,Te),p(X),t.unbindTexture()}}}const C=[],be=[];function Se(T){if(T.samples>0){if(fe(T)===!1){const v=T.textures,N=T.width,J=T.height;let ne=n.COLOR_BUFFER_BIT;const X=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Te=i.get(T),xe=v.length>1;if(xe)for(let x=0;x<v.length;x++)t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+x,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+x,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const Le=T.texture.mipmaps;Le&&Le.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let x=0;x<v.length;x++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ne|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ne|=n.STENCIL_BUFFER_BIT)),xe){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Te.__webglColorRenderbuffer[x]);const re=i.get(v[x]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,re,0)}n.blitFramebuffer(0,0,N,J,0,0,N,J,ne,n.NEAREST),c===!0&&(C.length=0,be.length=0,C.push(n.COLOR_ATTACHMENT0+x),T.depthBuffer&&T.resolveDepthBuffer===!1&&(C.push(X),be.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,be)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,C))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),xe)for(let x=0;x<v.length;x++){t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+x,n.RENDERBUFFER,Te.__webglColorRenderbuffer[x]);const re=i.get(v[x]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Te.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+x,n.TEXTURE_2D,re,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const v=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function Ue(T){return Math.min(r.maxSamples,T.samples)}function fe(T){const v=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function ve(T){const v=s.render.frame;u.get(T)!==v&&(u.set(T,v),T.update())}function ge(T,v){const N=T.colorSpace,J=T.format,ne=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||N!==br&&N!==gi&&(at.getTransfer(N)===ut?(J!==Tn||ne!==ti)&&$e("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Mt("WebGLTextures: Unsupported texture color space:",N)),v}function Re(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=I,this.setTexture2D=j,this.setTexture2DArray=W,this.setTexture3D=oe,this.setTextureCube=q,this.rebindTextures=Pe,this.setupRenderTarget=de,this.updateRenderTargetMipmap=pe,this.updateMultisampleRenderTarget=Se,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=H,this.useMultisampledRTT=fe}function ag(n,e){function t(i,r=gi){let a;const s=at.getTransfer(r);if(i===ti)return n.UNSIGNED_BYTE;if(i===sc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===oc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===pu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===mu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===hu)return n.BYTE;if(i===fu)return n.SHORT;if(i===Zr)return n.UNSIGNED_SHORT;if(i===ac)return n.INT;if(i===Vi)return n.UNSIGNED_INT;if(i===Dn)return n.FLOAT;if(i===Er)return n.HALF_FLOAT;if(i===xu)return n.ALPHA;if(i===gu)return n.RGB;if(i===Tn)return n.RGBA;if(i===Qr)return n.DEPTH_COMPONENT;if(i===ea)return n.DEPTH_STENCIL;if(i===cc)return n.RED;if(i===lc)return n.RED_INTEGER;if(i===uc)return n.RG;if(i===dc)return n.RG_INTEGER;if(i===hc)return n.RGBA_INTEGER;if(i===Xa||i===qa||i===ja||i===Ya)if(s===ut)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Xa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===qa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ja)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ya)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Xa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===qa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ja)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ya)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===xo||i===go||i===vo||i===_o)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===xo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===go)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===_o)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yo||i===Mo||i===bo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(i===yo||i===Mo)return s===ut?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===bo)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===So||i===wo||i===Eo||i===To||i===Ao||i===Co||i===Ro||i===Po||i===Lo||i===Do||i===zo||i===Uo||i===Io||i===No)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(i===So)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wo)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Eo)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===To)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ao)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Co)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ro)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Po)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Lo)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Do)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===zo)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Uo)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Io)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===No)return s===ut?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Fo||i===ko||i===Oo)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(i===Fo)return s===ut?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ko)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Oo)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Bo||i===Vo||i===Go||i===Ho)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(i===Bo)return a.COMPRESSED_RED_RGTC1_EXT;if(i===Vo)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Go)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ho)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Jr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const sg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,og=`
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

}`;class cg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new zu(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new pn({vertexShader:sg,fragmentShader:og,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pt(new us(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lg extends Tr{constructor(e,t){super();const i=this;let r=null,a=1,s=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,f=null,g=null;const _=typeof XRWebGLBinding<"u",m=new cg,p={},R=t.getContextAttributes();let w=null,A=null;const E=[],y=[],D=new qe;let z=null;const b=new vn;b.viewport=new Tt;const M=new vn;M.viewport=new Tt;const L=[b,M],I=new Tf;let F=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(O){let ee=E[O];return ee===void 0&&(ee=new Ns,E[O]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(O){let ee=E[O];return ee===void 0&&(ee=new Ns,E[O]=ee),ee.getGripSpace()},this.getHand=function(O){let ee=E[O];return ee===void 0&&(ee=new Ns,E[O]=ee),ee.getHandSpace()};function j(O){const ee=y.indexOf(O.inputSource);if(ee===-1)return;const H=E[ee];H!==void 0&&(H.update(O.inputSource,O.frame,l||s),H.dispatchEvent({type:O.type,data:O.inputSource}))}function W(){r.removeEventListener("select",j),r.removeEventListener("selectstart",j),r.removeEventListener("selectend",j),r.removeEventListener("squeeze",j),r.removeEventListener("squeezestart",j),r.removeEventListener("squeezeend",j),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",oe);for(let O=0;O<E.length;O++){const ee=y[O];ee!==null&&(y[O]=null,E[O].disconnect(ee))}F=null,G=null,m.reset();for(const O in p)delete p[O];e.setRenderTarget(w),f=null,h=null,d=null,r=null,A=null,ye.stop(),i.isPresenting=!1,e.setPixelRatio(z),e.setSize(D.width,D.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(O){a=O,i.isPresenting===!0&&$e("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(O){o=O,i.isPresenting===!0&&$e("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||s},this.setReferenceSpace=function(O){l=O},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(O){if(r=O,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",j),r.addEventListener("selectstart",j),r.addEventListener("selectend",j),r.addEventListener("squeeze",j),r.addEventListener("squeezestart",j),r.addEventListener("squeezeend",j),r.addEventListener("end",W),r.addEventListener("inputsourceschange",oe),R.xrCompatible!==!0&&await t.makeXRCompatible(),z=e.getPixelRatio(),e.getSize(D),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let H=null,Ae=null,Z=null;R.depth&&(Z=R.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,H=R.stencil?ea:Qr,Ae=R.stencil?Jr:Vi);const Me={colorFormat:t.RGBA8,depthFormat:Z,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(Me),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),A=new Hi(h.textureWidth,h.textureHeight,{format:Tn,type:ti,depthTexture:new Du(h.textureWidth,h.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,H),stencilBuffer:R.stencil,colorSpace:e.outputColorSpace,samples:R.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const H={antialias:R.antialias,alpha:!0,depth:R.depth,stencil:R.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(r,t,H),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),A=new Hi(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:ti,colorSpace:e.outputColorSpace,stencilBuffer:R.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,s=await r.requestReferenceSpace(o),ye.setContext(r),ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function oe(O){for(let ee=0;ee<O.removed.length;ee++){const H=O.removed[ee],Ae=y.indexOf(H);Ae>=0&&(y[Ae]=null,E[Ae].disconnect(H))}for(let ee=0;ee<O.added.length;ee++){const H=O.added[ee];let Ae=y.indexOf(H);if(Ae===-1){for(let Me=0;Me<E.length;Me++)if(Me>=y.length){y.push(H),Ae=Me;break}else if(y[Me]===null){y[Me]=H,Ae=Me;break}if(Ae===-1)break}const Z=E[Ae];Z&&Z.connect(H)}}const q=new k,ae=new k;function ce(O,ee,H){q.setFromMatrixPosition(ee.matrixWorld),ae.setFromMatrixPosition(H.matrixWorld);const Ae=q.distanceTo(ae),Z=ee.projectionMatrix.elements,Me=H.projectionMatrix.elements,Pe=Z[14]/(Z[10]-1),de=Z[14]/(Z[10]+1),pe=(Z[9]+1)/Z[5],C=(Z[9]-1)/Z[5],be=(Z[8]-1)/Z[0],Se=(Me[8]+1)/Me[0],Ue=Pe*be,fe=Pe*Se,ve=Ae/(-be+Se),ge=ve*-be;if(ee.matrixWorld.decompose(O.position,O.quaternion,O.scale),O.translateX(ge),O.translateZ(ve),O.matrixWorld.compose(O.position,O.quaternion,O.scale),O.matrixWorldInverse.copy(O.matrixWorld).invert(),Z[10]===-1)O.projectionMatrix.copy(ee.projectionMatrix),O.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const Re=Pe+ve,T=de+ve,v=Ue-ge,N=fe+(Ae-ge),J=pe*de/T*Re,ne=C*de/T*Re;O.projectionMatrix.makePerspective(v,N,J,ne,Re,T),O.projectionMatrixInverse.copy(O.projectionMatrix).invert()}}function he(O,ee){ee===null?O.matrixWorld.copy(O.matrix):O.matrixWorld.multiplyMatrices(ee.matrixWorld,O.matrix),O.matrixWorldInverse.copy(O.matrixWorld).invert()}this.updateCamera=function(O){if(r===null)return;let ee=O.near,H=O.far;m.texture!==null&&(m.depthNear>0&&(ee=m.depthNear),m.depthFar>0&&(H=m.depthFar)),I.near=M.near=b.near=ee,I.far=M.far=b.far=H,(F!==I.near||G!==I.far)&&(r.updateRenderState({depthNear:I.near,depthFar:I.far}),F=I.near,G=I.far),I.layers.mask=O.layers.mask|6,b.layers.mask=I.layers.mask&3,M.layers.mask=I.layers.mask&5;const Ae=O.parent,Z=I.cameras;he(I,Ae);for(let Me=0;Me<Z.length;Me++)he(Z[Me],Ae);Z.length===2?ce(I,b,M):I.projectionMatrix.copy(b.projectionMatrix),me(O,I,Ae)};function me(O,ee,H){H===null?O.matrix.copy(ee.matrixWorld):(O.matrix.copy(H.matrixWorld),O.matrix.invert(),O.matrix.multiply(ee.matrixWorld)),O.matrix.decompose(O.position,O.quaternion,O.scale),O.updateMatrixWorld(!0),O.projectionMatrix.copy(ee.projectionMatrix),O.projectionMatrixInverse.copy(ee.projectionMatrixInverse),O.isPerspectiveCamera&&(O.fov=ia*2*Math.atan(1/O.projectionMatrix.elements[5]),O.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(h===null&&f===null))return c},this.setFoveation=function(O){c=O,h!==null&&(h.fixedFoveation=O),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=O)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(O){return p[O]};let Ge=null;function Be(O,ee){if(u=ee.getViewerPose(l||s),g=ee,u!==null){const H=u.views;f!==null&&(e.setRenderTargetFramebuffer(A,f.framebuffer),e.setRenderTarget(A));let Ae=!1;H.length!==I.cameras.length&&(I.cameras.length=0,Ae=!0);for(let de=0;de<H.length;de++){const pe=H[de];let C=null;if(f!==null)C=f.getViewport(pe);else{const Se=d.getViewSubImage(h,pe);C=Se.viewport,de===0&&(e.setRenderTargetTextures(A,Se.colorTexture,Se.depthStencilTexture),e.setRenderTarget(A))}let be=L[de];be===void 0&&(be=new vn,be.layers.enable(de),be.viewport=new Tt,L[de]=be),be.matrix.fromArray(pe.transform.matrix),be.matrix.decompose(be.position,be.quaternion,be.scale),be.projectionMatrix.fromArray(pe.projectionMatrix),be.projectionMatrixInverse.copy(be.projectionMatrix).invert(),be.viewport.set(C.x,C.y,C.width,C.height),de===0&&(I.matrix.copy(be.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Ae===!0&&I.cameras.push(be)}const Z=r.enabledFeatures;if(Z&&Z.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&_){d=i.getBinding();const de=d.getDepthInformation(H[0]);de&&de.isValid&&de.texture&&m.init(de,r.renderState)}if(Z&&Z.includes("camera-access")&&_){e.state.unbindTexture(),d=i.getBinding();for(let de=0;de<H.length;de++){const pe=H[de].camera;if(pe){let C=p[pe];C||(C=new zu,p[pe]=C);const be=d.getCameraImage(pe);C.sourceTexture=be}}}}for(let H=0;H<E.length;H++){const Ae=y[H],Z=E[H];Ae!==null&&Z!==void 0&&Z.update(Ae,ee,l||s)}Ge&&Ge(O,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),g=null}const ye=new Fu;ye.setAnimationLoop(Be),this.setAnimationLoop=function(O){Ge=O},this.dispose=function(){}}}const Ci=new ni,ug=new dt;function dg(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,wu(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,R,w,A){p.isMeshBasicMaterial||p.isMeshLambertMaterial?a(m,p):p.isMeshToonMaterial?(a(m,p),d(m,p)):p.isMeshPhongMaterial?(a(m,p),u(m,p)):p.isMeshStandardMaterial?(a(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,A)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),_(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(s(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,R,w):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const R=e.get(p),w=R.envMap,A=R.envMapRotation;w&&(m.envMap.value=w,Ci.copy(A),Ci.x*=-1,Ci.y*=-1,Ci.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ci.y*=-1,Ci.z*=-1),m.envMapRotation.value.setFromMatrix4(ug.makeRotationFromEuler(Ci)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function s(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,R,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*R,m.scale.value=w*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,R){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=R.texture,m.transmissionSamplerSize.value.set(R.width,R.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const R=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(R.matrixWorld),m.nearDistance.value=R.shadow.camera.near,m.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function hg(n,e,t,i){let r={},a={},s=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(R,w){const A=w.program;i.uniformBlockBinding(R,A)}function l(R,w){let A=r[R.id];A===void 0&&(g(R),A=u(R),r[R.id]=A,R.addEventListener("dispose",m));const E=w.program;i.updateUBOMapping(R,E);const y=e.render.frame;a[R.id]!==y&&(h(R),a[R.id]=y)}function u(R){const w=d();R.__bindingPointIndex=w;const A=n.createBuffer(),E=R.__size,y=R.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,E,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,A),A}function d(){for(let R=0;R<o;R++)if(s.indexOf(R)===-1)return s.push(R),R;return Mt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(R){const w=r[R.id],A=R.uniforms,E=R.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let y=0,D=A.length;y<D;y++){const z=Array.isArray(A[y])?A[y]:[A[y]];for(let b=0,M=z.length;b<M;b++){const L=z[b];if(f(L,y,b,E)===!0){const I=L.__offset,F=Array.isArray(L.value)?L.value:[L.value];let G=0;for(let j=0;j<F.length;j++){const W=F[j],oe=_(W);typeof W=="number"||typeof W=="boolean"?(L.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,I+G,L.__data)):W.isMatrix3?(L.__data[0]=W.elements[0],L.__data[1]=W.elements[1],L.__data[2]=W.elements[2],L.__data[3]=0,L.__data[4]=W.elements[3],L.__data[5]=W.elements[4],L.__data[6]=W.elements[5],L.__data[7]=0,L.__data[8]=W.elements[6],L.__data[9]=W.elements[7],L.__data[10]=W.elements[8],L.__data[11]=0):(W.toArray(L.__data,G),G+=oe.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(R,w,A,E){const y=R.value,D=w+"_"+A;if(E[D]===void 0)return typeof y=="number"||typeof y=="boolean"?E[D]=y:E[D]=y.clone(),!0;{const z=E[D];if(typeof y=="number"||typeof y=="boolean"){if(z!==y)return E[D]=y,!0}else if(z.equals(y)===!1)return z.copy(y),!0}return!1}function g(R){const w=R.uniforms;let A=0;const E=16;for(let D=0,z=w.length;D<z;D++){const b=Array.isArray(w[D])?w[D]:[w[D]];for(let M=0,L=b.length;M<L;M++){const I=b[M],F=Array.isArray(I.value)?I.value:[I.value];for(let G=0,j=F.length;G<j;G++){const W=F[G],oe=_(W),q=A%E,ae=q%oe.boundary,ce=q+ae;A+=ae,ce!==0&&E-ce<oe.storage&&(A+=E-ce),I.__data=new Float32Array(oe.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=A,A+=oe.storage}}}const y=A%E;return y>0&&(A+=E-y),R.__size=A,R.__cache={},this}function _(R){const w={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(w.boundary=4,w.storage=4):R.isVector2?(w.boundary=8,w.storage=8):R.isVector3||R.isColor?(w.boundary=16,w.storage=12):R.isVector4?(w.boundary=16,w.storage=16):R.isMatrix3?(w.boundary=48,w.storage=48):R.isMatrix4?(w.boundary=64,w.storage=64):R.isTexture?$e("WebGLRenderer: Texture samplers can not be part of an uniforms group."):$e("WebGLRenderer: Unsupported uniform value type.",R),w}function m(R){const w=R.target;w.removeEventListener("dispose",m);const A=s.indexOf(w.__bindingPointIndex);s.splice(A,1),n.deleteBuffer(r[w.id]),delete r[w.id],delete a[w.id]}function p(){for(const R in r)n.deleteBuffer(r[R]);s=[],r={},a={}}return{bind:c,update:l,dispose:p}}const fg=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let qn=null;function pg(){return qn===null&&(qn=new gc(fg,32,32,uc,Er),qn.minFilter=hn,qn.magFilter=hn,qn.wrapS=$n,qn.wrapT=$n,qn.generateMipmaps=!1,qn.needsUpdate=!0),qn}class mg{constructor(e={}){const{canvas:t=oh(),context:i=null,depth:r=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=s;const g=new Set([hc,dc,lc]),_=new Set([ti,Vi,Zr,Jr,sc,oc]),m=new Uint32Array(4),p=new Int32Array(4);let R=null,w=null;const A=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let D=!1;this._outputColorSpace=kt;let z=0,b=0,M=null,L=-1,I=null;const F=new Tt,G=new Tt;let j=null;const W=new it(0);let oe=0,q=t.width,ae=t.height,ce=1,he=null,me=null;const Ge=new Tt(0,0,q,ae),Be=new Tt(0,0,q,ae);let ye=!1;const O=new Ru;let ee=!1,H=!1;const Ae=new dt,Z=new k,Me=new Tt,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function pe(){return M===null?ce:1}let C=i;function be(S,B){return t.getContext(S,B)}try{const S={alpha:!0,depth:r,stencil:a,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rc}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",Y,!1),t.addEventListener("webglcontextcreationerror",we,!1),C===null){const B="webgl2";if(C=be(B,S),C===null)throw be(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw S("WebGLRenderer: "+S.message),S}let Se,Ue,fe,ve,ge,Re,T,v,N,J,ne,X,Te,xe,Le,x,re,ue,Fe,Ne,U,te,P,se;function ie(){Se=new Sm(C),Se.init(),te=new ag(C,Se),Ue=new pm(C,Se,e,te),fe=new ig(C,Se),Ue.reversedDepthBuffer&&h&&fe.buffers.depth.setReversed(!0),ve=new Tm(C),ge=new Wx,Re=new rg(C,Se,fe,ge,Ue,te,ve),T=new xm(y),v=new bm(y),N=new Pf(C),P=new hm(C,N),J=new wm(C,N,ve,P),ne=new Cm(C,J,N,ve),Fe=new Am(C,Ue,Re),x=new mm(ge),X=new Hx(y,T,v,Se,Ue,P,x),Te=new dg(y,ge),xe=new qx,Le=new Jx(Se),ue=new dm(y,T,v,fe,ne,f,c),re=new tg(y,ne,Ue),se=new hg(C,ve,Ue,fe),Ne=new fm(C,Se,ve),U=new Em(C,Se,ve),ve.programs=X.programs,y.capabilities=Ue,y.extensions=Se,y.properties=ge,y.renderLists=xe,y.shadowMap=re,y.state=fe,y.info=ve}ie();const le=new lg(y,C);this.xr=le,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=Se.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Se.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(S){S!==void 0&&(ce=S,this.setSize(q,ae,!1))},this.getSize=function(S){return S.set(q,ae)},this.setSize=function(S,B,$=!0){if(le.isPresenting){$e("WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,ae=B,t.width=Math.floor(S*ce),t.height=Math.floor(B*ce),$===!0&&(t.style.width=S+"px",t.style.height=B+"px"),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(q*ce,ae*ce).floor()},this.setDrawingBufferSize=function(S,B,$){q=S,ae=B,ce=$,t.width=Math.floor(S*$),t.height=Math.floor(B*$),this.setViewport(0,0,S,B)},this.getCurrentViewport=function(S){return S.copy(F)},this.getViewport=function(S){return S.copy(Ge)},this.setViewport=function(S,B,$,K){S.isVector4?Ge.set(S.x,S.y,S.z,S.w):Ge.set(S,B,$,K),fe.viewport(F.copy(Ge).multiplyScalar(ce).round())},this.getScissor=function(S){return S.copy(Be)},this.setScissor=function(S,B,$,K){S.isVector4?Be.set(S.x,S.y,S.z,S.w):Be.set(S,B,$,K),fe.scissor(G.copy(Be).multiplyScalar(ce).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(S){fe.setScissorTest(ye=S)},this.setOpaqueSort=function(S){he=S},this.setTransparentSort=function(S){me=S},this.getClearColor=function(S){return S.copy(ue.getClearColor())},this.setClearColor=function(){ue.setClearColor(...arguments)},this.getClearAlpha=function(){return ue.getClearAlpha()},this.setClearAlpha=function(){ue.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,$=!0){let K=0;if(S){let V=!1;if(M!==null){const _e=M.texture.format;V=g.has(_e)}if(V){const _e=M.texture.type,ze=_.has(_e),ke=ue.getClearColor(),Ie=ue.getClearAlpha(),He=ke.r,je=ke.g,We=ke.b;ze?(m[0]=He,m[1]=je,m[2]=We,m[3]=Ie,C.clearBufferuiv(C.COLOR,0,m)):(p[0]=He,p[1]=je,p[2]=We,p[3]=Ie,C.clearBufferiv(C.COLOR,0,p))}else K|=C.COLOR_BUFFER_BIT}B&&(K|=C.DEPTH_BUFFER_BIT),$&&(K|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",Y,!1),t.removeEventListener("webglcontextcreationerror",we,!1),ue.dispose(),xe.dispose(),Le.dispose(),ge.dispose(),T.dispose(),v.dispose(),ne.dispose(),P.dispose(),se.dispose(),X.dispose(),le.dispose(),le.removeEventListener("sessionstart",Kt),le.removeEventListener("sessionend",Bt),Zt.stop()};function Q(S){S.preventDefault(),Qa("WebGLRenderer: Context Lost."),D=!0}function Y(){Qa("WebGLRenderer: Context Restored."),D=!1;const S=ve.autoReset,B=re.enabled,$=re.autoUpdate,K=re.needsUpdate,V=re.type;ie(),ve.autoReset=S,re.enabled=B,re.autoUpdate=$,re.needsUpdate=K,re.type=V}function we(S){Mt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ve(S){const B=S.target;B.removeEventListener("dispose",Ve),Ke(B)}function Ke(S){Ye(S),ge.remove(S)}function Ye(S){const B=ge.get(S).programs;B!==void 0&&(B.forEach(function($){X.releaseProgram($)}),S.isShaderMaterial&&X.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,$,K,V,_e){B===null&&(B=Pe);const ze=V.isMesh&&V.matrixWorld.determinant()<0,ke=ci(S,B,$,K,V);fe.setMaterial(K,ze);let Ie=$.index,He=1;if(K.wireframe===!0){if(Ie=J.getWireframeAttribute($),Ie===void 0)return;He=2}const je=$.drawRange,We=$.attributes.position;let Je=je.start*He,rt=(je.start+je.count)*He;_e!==null&&(Je=Math.max(Je,_e.start*He),rt=Math.min(rt,(_e.start+_e.count)*He)),Ie!==null?(Je=Math.max(Je,0),rt=Math.min(rt,Ie.count)):We!=null&&(Je=Math.max(Je,0),rt=Math.min(rt,We.count));const ot=rt-Je;if(ot<0||ot===1/0)return;P.setup(V,K,ke,$,Ie);let ft,st=Ne;if(Ie!==null&&(ft=N.get(Ie),st=U,st.setIndex(ft)),V.isMesh)K.wireframe===!0?(fe.setLineWidth(K.wireframeLinewidth*pe()),st.setMode(C.LINES)):st.setMode(C.TRIANGLES);else if(V.isLine){let Xe=K.linewidth;Xe===void 0&&(Xe=1),fe.setLineWidth(Xe*pe()),V.isLineSegments?st.setMode(C.LINES):V.isLineLoop?st.setMode(C.LINE_LOOP):st.setMode(C.LINE_STRIP)}else V.isPoints?st.setMode(C.POINTS):V.isSprite&&st.setMode(C.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)na("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),st.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(Se.get("WEBGL_multi_draw"))st.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Xe=V._multiDrawStarts,lt=V._multiDrawCounts,tt=V._multiDrawCount,Nt=Ie?N.get(Ie).bytesPerElement:1,Pn=ge.get(K).currentProgram.getUniforms();for(let Qt=0;Qt<tt;Qt++)Pn.setValue(C,"_gl_DrawID",Qt),st.render(Xe[Qt]/Nt,lt[Qt])}else if(V.isInstancedMesh)st.renderInstances(Je,ot,V.count);else if($.isInstancedBufferGeometry){const Xe=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,lt=Math.min($.instanceCount,Xe);st.renderInstances(Je,ot,lt)}else st.render(Je,ot)};function _t(S,B,$){S.transparent===!0&&S.side===Sn&&S.forceSinglePass===!1?(S.side=nn,S.needsUpdate=!0,Vt(S,B,$),S.side=ei,S.needsUpdate=!0,Vt(S,B,$),S.side=Sn):Vt(S,B,$)}this.compile=function(S,B,$=null){$===null&&($=S),w=Le.get($),w.init(B),E.push(w),$.traverseVisible(function(V){V.isLight&&V.layers.test(B.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),S!==$&&S.traverseVisible(function(V){V.isLight&&V.layers.test(B.layers)&&(w.pushLight(V),V.castShadow&&w.pushShadow(V))}),w.setupLights();const K=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const _e=V.material;if(_e)if(Array.isArray(_e))for(let ze=0;ze<_e.length;ze++){const ke=_e[ze];_t(ke,$,V),K.add(ke)}else _t(_e,$,V),K.add(_e)}),w=E.pop(),K},this.compileAsync=function(S,B,$=null){const K=this.compile(S,B,$);return new Promise(V=>{function _e(){if(K.forEach(function(ze){ge.get(ze).currentProgram.isReady()&&K.delete(ze)}),K.size===0){V(S);return}setTimeout(_e,10)}Se.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let yt=null;function Ee(S){yt&&yt(S)}function Kt(){Zt.stop()}function Bt(){Zt.start()}const Zt=new Fu;Zt.setAnimationLoop(Ee),typeof self<"u"&&Zt.setContext(self),this.setAnimationLoop=function(S){yt=S,le.setAnimationLoop(S),S===null?Zt.stop():Zt.start()},le.addEventListener("sessionstart",Kt),le.addEventListener("sessionend",Bt),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){Mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),le.enabled===!0&&le.isPresenting===!0&&(le.cameraAutoUpdate===!0&&le.updateCamera(B),B=le.getCamera()),S.isScene===!0&&S.onBeforeRender(y,S,B,M),w=Le.get(S,E.length),w.init(B),E.push(w),Ae.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),O.setFromProjectionMatrix(Ae,zn,B.reversedDepth),H=this.localClippingEnabled,ee=x.init(this.clippingPlanes,H),R=xe.get(S,A.length),R.init(),A.push(R),le.enabled===!0&&le.isPresenting===!0){const _e=y.xr.getDepthSensingMesh();_e!==null&&nt(_e,B,-1/0,y.sortObjects)}nt(S,B,0,y.sortObjects),R.finish(),y.sortObjects===!0&&R.sort(he,me),de=le.enabled===!1||le.isPresenting===!1||le.hasDepthSensing()===!1,de&&ue.addToRenderList(R,S),this.info.render.frame++,ee===!0&&x.beginShadows();const $=w.state.shadowsArray;re.render($,S,B),ee===!0&&x.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=R.opaque,V=R.transmissive;if(w.setupLights(),B.isArrayCamera){const _e=B.cameras;if(V.length>0)for(let ze=0,ke=_e.length;ze<ke;ze++){const Ie=_e[ze];oi(K,V,S,Ie)}de&&ue.render(S);for(let ze=0,ke=_e.length;ze<ke;ze++){const Ie=_e[ze];kn(R,S,Ie,Ie.viewport)}}else V.length>0&&oi(K,V,S,B),de&&ue.render(S),kn(R,S,B);M!==null&&b===0&&(Re.updateMultisampleRenderTarget(M),Re.updateRenderTargetMipmap(M)),S.isScene===!0&&S.onAfterRender(y,S,B),P.resetDefaultState(),L=-1,I=null,E.pop(),E.length>0?(w=E[E.length-1],ee===!0&&x.setGlobalState(y.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?R=A[A.length-1]:R=null};function nt(S,B,$,K){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)$=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||O.intersectsSprite(S)){K&&Me.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ae);const ze=ne.update(S),ke=S.material;ke.visible&&R.push(S,ze,ke,$,Me.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||O.intersectsObject(S))){const ze=ne.update(S),ke=S.material;if(K&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Me.copy(S.boundingSphere.center)):(ze.boundingSphere===null&&ze.computeBoundingSphere(),Me.copy(ze.boundingSphere.center)),Me.applyMatrix4(S.matrixWorld).applyMatrix4(Ae)),Array.isArray(ke)){const Ie=ze.groups;for(let He=0,je=Ie.length;He<je;He++){const We=Ie[He],Je=ke[We.materialIndex];Je&&Je.visible&&R.push(S,ze,Je,$,Me.z,We)}}else ke.visible&&R.push(S,ze,ke,$,Me.z,null)}}const _e=S.children;for(let ze=0,ke=_e.length;ze<ke;ze++)nt(_e[ze],B,$,K)}function kn(S,B,$,K){const{opaque:V,transmissive:_e,transparent:ze}=S;w.setupLightsView($),ee===!0&&x.setGlobalState(y.clippingPlanes,$),K&&fe.viewport(F.copy(K)),V.length>0&&Rn(V,B,$),_e.length>0&&Rn(_e,B,$),ze.length>0&&Rn(ze,B,$),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function oi(S,B,$,K){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;w.state.transmissionRenderTarget[K.id]===void 0&&(w.state.transmissionRenderTarget[K.id]=new Hi(1,1,{generateMipmaps:!0,type:Se.has("EXT_color_buffer_half_float")||Se.has("EXT_color_buffer_float")?Er:ti,minFilter:Ni,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace}));const _e=w.state.transmissionRenderTarget[K.id],ze=K.viewport||F;_e.setSize(ze.z*y.transmissionResolutionScale,ze.w*y.transmissionResolutionScale);const ke=y.getRenderTarget(),Ie=y.getActiveCubeFace(),He=y.getActiveMipmapLevel();y.setRenderTarget(_e),y.getClearColor(W),oe=y.getClearAlpha(),oe<1&&y.setClearColor(16777215,.5),y.clear(),de&&ue.render($);const je=y.toneMapping;y.toneMapping=yi;const We=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),w.setupLightsView(K),ee===!0&&x.setGlobalState(y.clippingPlanes,K),Rn(S,$,K),Re.updateMultisampleRenderTarget(_e),Re.updateRenderTargetMipmap(_e),Se.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let rt=0,ot=B.length;rt<ot;rt++){const ft=B[rt],{object:st,geometry:Xe,material:lt,group:tt}=ft;if(lt.side===Sn&&st.layers.test(K.layers)){const Nt=lt.side;lt.side=nn,lt.needsUpdate=!0,xn(st,$,K,Xe,lt,tt),lt.side=Nt,lt.needsUpdate=!0,Je=!0}}Je===!0&&(Re.updateMultisampleRenderTarget(_e),Re.updateRenderTargetMipmap(_e))}y.setRenderTarget(ke,Ie,He),y.setClearColor(W,oe),We!==void 0&&(K.viewport=We),y.toneMapping=je}function Rn(S,B,$){const K=B.isScene===!0?B.overrideMaterial:null;for(let V=0,_e=S.length;V<_e;V++){const ze=S[V],{object:ke,geometry:Ie,group:He}=ze;let je=ze.material;je.allowOverride===!0&&K!==null&&(je=K),ke.layers.test($.layers)&&xn(ke,B,$,Ie,je,He)}}function xn(S,B,$,K,V,_e){S.onBeforeRender(y,B,$,K,V,_e),S.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(y,B,$,K,S,_e),V.transparent===!0&&V.side===Sn&&V.forceSinglePass===!1?(V.side=nn,V.needsUpdate=!0,y.renderBufferDirect($,B,K,V,S,_e),V.side=ei,V.needsUpdate=!0,y.renderBufferDirect($,B,K,V,S,_e),V.side=Sn):y.renderBufferDirect($,B,K,V,S,_e),S.onAfterRender(y,B,$,K,V,_e)}function Vt(S,B,$){B.isScene!==!0&&(B=Pe);const K=ge.get(S),V=w.state.lights,_e=w.state.shadowsArray,ze=V.state.version,ke=X.getParameters(S,V.state,_e,B,$),Ie=X.getProgramCacheKey(ke);let He=K.programs;K.environment=S.isMeshStandardMaterial?B.environment:null,K.fog=B.fog,K.envMap=(S.isMeshStandardMaterial?v:T).get(S.envMap||K.environment),K.envMapRotation=K.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,He===void 0&&(S.addEventListener("dispose",Ve),He=new Map,K.programs=He);let je=He.get(Ie);if(je!==void 0){if(K.currentProgram===je&&K.lightsStateVersion===ze)return Jt(S,ke),je}else ke.uniforms=X.getUniforms(S),S.onBeforeCompile(ke,y),je=X.acquireProgram(ke,Ie),He.set(Ie,je),K.uniforms=ke.uniforms;const We=K.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(We.clippingPlanes=x.uniform),Jt(S,ke),K.needsLights=zt(S),K.lightsStateVersion=ze,K.needsLights&&(We.ambientLightColor.value=V.state.ambient,We.lightProbe.value=V.state.probe,We.directionalLights.value=V.state.directional,We.directionalLightShadows.value=V.state.directionalShadow,We.spotLights.value=V.state.spot,We.spotLightShadows.value=V.state.spotShadow,We.rectAreaLights.value=V.state.rectArea,We.ltc_1.value=V.state.rectAreaLTC1,We.ltc_2.value=V.state.rectAreaLTC2,We.pointLights.value=V.state.point,We.pointLightShadows.value=V.state.pointShadow,We.hemisphereLights.value=V.state.hemi,We.directionalShadowMap.value=V.state.directionalShadowMap,We.directionalShadowMatrix.value=V.state.directionalShadowMatrix,We.spotShadowMap.value=V.state.spotShadowMap,We.spotLightMatrix.value=V.state.spotLightMatrix,We.spotLightMap.value=V.state.spotLightMap,We.pointShadowMap.value=V.state.pointShadowMap,We.pointShadowMatrix.value=V.state.pointShadowMatrix),K.currentProgram=je,K.uniformsList=null,je}function St(S){if(S.uniformsList===null){const B=S.currentProgram.getUniforms();S.uniformsList=$a.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function Jt(S,B){const $=ge.get(S);$.outputColorSpace=B.outputColorSpace,$.batching=B.batching,$.batchingColor=B.batchingColor,$.instancing=B.instancing,$.instancingColor=B.instancingColor,$.instancingMorph=B.instancingMorph,$.skinning=B.skinning,$.morphTargets=B.morphTargets,$.morphNormals=B.morphNormals,$.morphColors=B.morphColors,$.morphTargetsCount=B.morphTargetsCount,$.numClippingPlanes=B.numClippingPlanes,$.numIntersection=B.numClipIntersection,$.vertexAlphas=B.vertexAlphas,$.vertexTangents=B.vertexTangents,$.toneMapping=B.toneMapping}function ci(S,B,$,K,V){B.isScene!==!0&&(B=Pe),Re.resetTextureUnits();const _e=B.fog,ze=K.isMeshStandardMaterial?B.environment:null,ke=M===null?y.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:br,Ie=(K.isMeshStandardMaterial?v:T).get(K.envMap||ze),He=K.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,je=!!$.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),We=!!$.morphAttributes.position,Je=!!$.morphAttributes.normal,rt=!!$.morphAttributes.color;let ot=yi;K.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(ot=y.toneMapping);const ft=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,st=ft!==void 0?ft.length:0,Xe=ge.get(K),lt=w.state.lights;if(ee===!0&&(H===!0||S!==I)){const Ft=S===I&&K.id===L;x.setState(K,S,Ft)}let tt=!1;K.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==lt.state.version||Xe.outputColorSpace!==ke||V.isBatchedMesh&&Xe.batching===!1||!V.isBatchedMesh&&Xe.batching===!0||V.isBatchedMesh&&Xe.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Xe.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Xe.instancing===!1||!V.isInstancedMesh&&Xe.instancing===!0||V.isSkinnedMesh&&Xe.skinning===!1||!V.isSkinnedMesh&&Xe.skinning===!0||V.isInstancedMesh&&Xe.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Xe.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Xe.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Xe.instancingMorph===!1&&V.morphTexture!==null||Xe.envMap!==Ie||K.fog===!0&&Xe.fog!==_e||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==x.numPlanes||Xe.numIntersection!==x.numIntersection)||Xe.vertexAlphas!==He||Xe.vertexTangents!==je||Xe.morphTargets!==We||Xe.morphNormals!==Je||Xe.morphColors!==rt||Xe.toneMapping!==ot||Xe.morphTargetsCount!==st)&&(tt=!0):(tt=!0,Xe.__version=K.version);let Nt=Xe.currentProgram;tt===!0&&(Nt=Vt(K,B,V));let Pn=!1,Qt=!1,bi=!1;const mt=Nt.getUniforms(),Gt=Xe.uniforms;if(fe.useProgram(Nt.program)&&(Pn=!0,Qt=!0,bi=!0),K.id!==L&&(L=K.id,Qt=!0),Pn||I!==S){fe.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),mt.setValue(C,"projectionMatrix",S.projectionMatrix),mt.setValue(C,"viewMatrix",S.matrixWorldInverse);const Ht=mt.map.cameraPosition;Ht!==void 0&&Ht.setValue(C,Z.setFromMatrixPosition(S.matrixWorld)),Ue.logarithmicDepthBuffer&&mt.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&mt.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),I!==S&&(I=S,Qt=!0,bi=!0)}if(V.isSkinnedMesh){mt.setOptional(C,V,"bindMatrix"),mt.setOptional(C,V,"bindMatrixInverse");const Ft=V.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),mt.setValue(C,"boneTexture",Ft.boneTexture,Re))}V.isBatchedMesh&&(mt.setOptional(C,V,"batchingTexture"),mt.setValue(C,"batchingTexture",V._matricesTexture,Re),mt.setOptional(C,V,"batchingIdTexture"),mt.setValue(C,"batchingIdTexture",V._indirectTexture,Re),mt.setOptional(C,V,"batchingColorTexture"),V._colorsTexture!==null&&mt.setValue(C,"batchingColorTexture",V._colorsTexture,Re));const an=$.morphAttributes;if((an.position!==void 0||an.normal!==void 0||an.color!==void 0)&&Fe.update(V,$,Nt),(Qt||Xe.receiveShadow!==V.receiveShadow)&&(Xe.receiveShadow=V.receiveShadow,mt.setValue(C,"receiveShadow",V.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(Gt.envMap.value=Ie,Gt.flipEnvMap.value=Ie.isCubeTexture&&Ie.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&B.environment!==null&&(Gt.envMapIntensity.value=B.environmentIntensity),Gt.dfgLUT!==void 0&&(Gt.dfgLUT.value=pg()),Qt&&(mt.setValue(C,"toneMappingExposure",y.toneMappingExposure),Xe.needsLights&&li(Gt,bi),_e&&K.fog===!0&&Te.refreshFogUniforms(Gt,_e),Te.refreshMaterialUniforms(Gt,K,ce,ae,w.state.transmissionRenderTarget[S.id]),$a.upload(C,St(Xe),Gt,Re)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&($a.upload(C,St(Xe),Gt,Re),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&mt.setValue(C,"center",V.center),mt.setValue(C,"modelViewMatrix",V.modelViewMatrix),mt.setValue(C,"normalMatrix",V.normalMatrix),mt.setValue(C,"modelMatrix",V.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Ft=K.uniformsGroups;for(let Ht=0,Cr=Ft.length;Ht<Cr;Ht++){const Bn=Ft[Ht];se.update(Bn,Nt),se.bind(Bn,Nt)}}return Nt}function li(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function zt(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(S,B,$){const K=ge.get(S);K.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),ge.get(S.texture).__webglTexture=B,ge.get(S.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:$,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){const $=ge.get(S);$.__webglFramebuffer=B,$.__useDefaultFramebuffer=B===void 0};const Ut=C.createFramebuffer();this.setRenderTarget=function(S,B=0,$=0){M=S,z=B,b=$;let K=!0,V=null,_e=!1,ze=!1;if(S){const Ie=ge.get(S);if(Ie.__useDefaultFramebuffer!==void 0)fe.bindFramebuffer(C.FRAMEBUFFER,null),K=!1;else if(Ie.__webglFramebuffer===void 0)Re.setupRenderTarget(S);else if(Ie.__hasExternalTextures)Re.rebindTextures(S,ge.get(S.texture).__webglTexture,ge.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const We=S.depthTexture;if(Ie.__boundDepthTexture!==We){if(We!==null&&ge.has(We)&&(S.width!==We.image.width||S.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Re.setupDepthRenderbuffer(S)}}const He=S.texture;(He.isData3DTexture||He.isDataArrayTexture||He.isCompressedArrayTexture)&&(ze=!0);const je=ge.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(je[B])?V=je[B][$]:V=je[B],_e=!0):S.samples>0&&Re.useMultisampledRTT(S)===!1?V=ge.get(S).__webglMultisampledFramebuffer:Array.isArray(je)?V=je[$]:V=je,F.copy(S.viewport),G.copy(S.scissor),j=S.scissorTest}else F.copy(Ge).multiplyScalar(ce).floor(),G.copy(Be).multiplyScalar(ce).floor(),j=ye;if($!==0&&(V=Ut),fe.bindFramebuffer(C.FRAMEBUFFER,V)&&K&&fe.drawBuffers(S,V),fe.viewport(F),fe.scissor(G),fe.setScissorTest(j),_e){const Ie=ge.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ie.__webglTexture,$)}else if(ze){const Ie=B;for(let He=0;He<S.textures.length;He++){const je=ge.get(S.textures[He]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+He,je.__webglTexture,$,Ie)}}else if(S!==null&&$!==0){const Ie=ge.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ie.__webglTexture,$)}L=-1},this.readRenderTargetPixels=function(S,B,$,K,V,_e,ze,ke=0){if(!(S&&S.isWebGLRenderTarget)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=ge.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ze!==void 0&&(Ie=Ie[ze]),Ie){fe.bindFramebuffer(C.FRAMEBUFFER,Ie);try{const He=S.textures[ke],je=He.format,We=He.type;if(!Ue.textureFormatReadable(je)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ue.textureTypeReadable(We)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-K&&$>=0&&$<=S.height-V&&(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ke),C.readPixels(B,$,K,V,te.convert(je),te.convert(We),_e))}finally{const He=M!==null?ge.get(M).__webglFramebuffer:null;fe.bindFramebuffer(C.FRAMEBUFFER,He)}}},this.readRenderTargetPixelsAsync=async function(S,B,$,K,V,_e,ze,ke=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=ge.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ze!==void 0&&(Ie=Ie[ze]),Ie)if(B>=0&&B<=S.width-K&&$>=0&&$<=S.height-V){fe.bindFramebuffer(C.FRAMEBUFFER,Ie);const He=S.textures[ke],je=He.format,We=He.type;if(!Ue.textureFormatReadable(je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ue.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Je),C.bufferData(C.PIXEL_PACK_BUFFER,_e.byteLength,C.STREAM_READ),S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ke),C.readPixels(B,$,K,V,te.convert(je),te.convert(We),0);const rt=M!==null?ge.get(M).__webglFramebuffer:null;fe.bindFramebuffer(C.FRAMEBUFFER,rt);const ot=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await ch(C,ot,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Je),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,_e),C.deleteBuffer(Je),C.deleteSync(ot),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,$=0){const K=Math.pow(2,-$),V=Math.floor(S.image.width*K),_e=Math.floor(S.image.height*K),ze=B!==null?B.x:0,ke=B!==null?B.y:0;Re.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,$,0,0,ze,ke,V,_e),fe.unbindTexture()};const xt=C.createFramebuffer(),On=C.createFramebuffer();this.copyTextureToTexture=function(S,B,$=null,K=null,V=0,_e=null){_e===null&&(V!==0?(na("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),_e=V,V=0):_e=0);let ze,ke,Ie,He,je,We,Je,rt,ot;const ft=S.isCompressedTexture?S.mipmaps[_e]:S.image;if($!==null)ze=$.max.x-$.min.x,ke=$.max.y-$.min.y,Ie=$.isBox3?$.max.z-$.min.z:1,He=$.min.x,je=$.min.y,We=$.isBox3?$.min.z:0;else{const an=Math.pow(2,-V);ze=Math.floor(ft.width*an),ke=Math.floor(ft.height*an),S.isDataArrayTexture?Ie=ft.depth:S.isData3DTexture?Ie=Math.floor(ft.depth*an):Ie=1,He=0,je=0,We=0}K!==null?(Je=K.x,rt=K.y,ot=K.z):(Je=0,rt=0,ot=0);const st=te.convert(B.format),Xe=te.convert(B.type);let lt;B.isData3DTexture?(Re.setTexture3D(B,0),lt=C.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Re.setTexture2DArray(B,0),lt=C.TEXTURE_2D_ARRAY):(Re.setTexture2D(B,0),lt=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,B.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,B.unpackAlignment);const tt=C.getParameter(C.UNPACK_ROW_LENGTH),Nt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Pn=C.getParameter(C.UNPACK_SKIP_PIXELS),Qt=C.getParameter(C.UNPACK_SKIP_ROWS),bi=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,ft.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ft.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,He),C.pixelStorei(C.UNPACK_SKIP_ROWS,je),C.pixelStorei(C.UNPACK_SKIP_IMAGES,We);const mt=S.isDataArrayTexture||S.isData3DTexture,Gt=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){const an=ge.get(S),Ft=ge.get(B),Ht=ge.get(an.__renderTarget),Cr=ge.get(Ft.__renderTarget);fe.bindFramebuffer(C.READ_FRAMEBUFFER,Ht.__webglFramebuffer),fe.bindFramebuffer(C.DRAW_FRAMEBUFFER,Cr.__webglFramebuffer);for(let Bn=0;Bn<Ie;Bn++)mt&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ge.get(S).__webglTexture,V,We+Bn),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,ge.get(B).__webglTexture,_e,ot+Bn)),C.blitFramebuffer(He,je,ze,ke,Je,rt,ze,ke,C.DEPTH_BUFFER_BIT,C.NEAREST);fe.bindFramebuffer(C.READ_FRAMEBUFFER,null),fe.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||ge.has(S)){const an=ge.get(S),Ft=ge.get(B);fe.bindFramebuffer(C.READ_FRAMEBUFFER,xt),fe.bindFramebuffer(C.DRAW_FRAMEBUFFER,On);for(let Ht=0;Ht<Ie;Ht++)mt?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,an.__webglTexture,V,We+Ht):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,an.__webglTexture,V),Gt?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ft.__webglTexture,_e,ot+Ht):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ft.__webglTexture,_e),V!==0?C.blitFramebuffer(He,je,ze,ke,Je,rt,ze,ke,C.COLOR_BUFFER_BIT,C.NEAREST):Gt?C.copyTexSubImage3D(lt,_e,Je,rt,ot+Ht,He,je,ze,ke):C.copyTexSubImage2D(lt,_e,Je,rt,He,je,ze,ke);fe.bindFramebuffer(C.READ_FRAMEBUFFER,null),fe.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else Gt?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(lt,_e,Je,rt,ot,ze,ke,Ie,st,Xe,ft.data):B.isCompressedArrayTexture?C.compressedTexSubImage3D(lt,_e,Je,rt,ot,ze,ke,Ie,st,ft.data):C.texSubImage3D(lt,_e,Je,rt,ot,ze,ke,Ie,st,Xe,ft):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,_e,Je,rt,ze,ke,st,Xe,ft.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,_e,Je,rt,ft.width,ft.height,st,ft.data):C.texSubImage2D(C.TEXTURE_2D,_e,Je,rt,ze,ke,st,Xe,ft);C.pixelStorei(C.UNPACK_ROW_LENGTH,tt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Nt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Pn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Qt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,bi),_e===0&&B.generateMipmaps&&C.generateMipmap(lt),fe.unbindTexture()},this.initRenderTarget=function(S){ge.get(S).__webglFramebuffer===void 0&&Re.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Re.setTextureCube(S,0):S.isData3DTexture?Re.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Re.setTexture2DArray(S,0):Re.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){z=0,b=0,M=null,fe.reset(),P.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const jt=Math.PI/180,xg=6371,gg=946728e6;function Gu(n){const e=(n.getTime()-gg)/864e5,t=(357.529+.98560028*e)*jt,i=280.459+.98564736*e,r=(i+1.915*Math.sin(t)+.02*Math.sin(2*t))*jt,a=(23.439-36e-8*e)*jt,s=Math.atan2(Math.cos(a)*Math.sin(r),Math.cos(r))/jt,o=Math.asin(Math.sin(a)*Math.sin(r))/jt;let c=(i-s)/15;c=((c+12)%24+24)%24-12;const l=n.getUTCHours()+n.getUTCMinutes()/60+n.getUTCSeconds()/3600;return{lat:o,lng:vg(-15*(l-12+c))}}function Ec(n,e,t){const i=Gu(t);return 90-Hu(n,e,i.lat,i.lng)/jt}function vg(n){return((n+180)%360+360)%360-180}function Hu(n,e,t,i){const r=(t-n)*jt,a=(i-e)*jt,s=Math.sin(r/2)**2+Math.cos(n*jt)*Math.cos(t*jt)*Math.sin(a/2)**2;return 2*Math.asin(Math.min(1,Math.sqrt(s)))}function Tc(n,e,t,i){return Hu(n,e,t,i)*xg}function _g(n,e,t=64){const i=Yl(n.lat,n.lng),r=Yl(e.lat,e.lng),a=Math.acos(Math.max(-1,Math.min(1,i[0]*r[0]+i[1]*r[1]+i[2]*r[2]))),s=[];for(let o=0;o<=t;o++){const c=o/t;let l;if(a<1e-6)l=i;else{const u=Math.sin(a),d=Math.sin((1-c)*a)/u,h=Math.sin(c*a)/u;l=[i[0]*d+r[0]*h,i[1]*d+r[1]*h,i[2]*d+r[2]*h]}s.push({lat:Math.asin(l[2])/jt,lng:Math.atan2(l[1],l[0])/jt,t:c})}return s}function Yl(n,e){const t=Math.cos(n*jt);return[t*Math.cos(e*jt),t*Math.sin(e*jt),Math.sin(n*jt)]}function yg(n){return n<25?1e3:Math.max(0,Math.round(1e3*Math.exp(-n/1600)))}function Mg(n){return Math.round(n/850*60+30)}const bg=new Intl.NumberFormat("pl-PL",{maximumFractionDigits:0});function Wu(n){return n<10?n.toFixed(1).replace(".",",")+" km":bg.format(Math.round(n))+" km"}function Sg(n){const e=Math.floor(n/60),t=n%60;return e?`${e} h ${String(t).padStart(2,"0")} min`:`${t} min`}function ca(n,e){return`${Math.abs(n).toFixed(2).replace(".",",")}° ${n>=0?"N":"S"}   ${Math.abs(e).toFixed(2).replace(".",",")}° ${e>=0?"E":"W"}`}const $l=new Map;function Xu(n,e,t){if(e){let r=$l.get(e);return r||$l.set(e,r=new Intl.DateTimeFormat("pl-PL",{timeZone:e,hour:"2-digit",minute:"2-digit"})),r.format(n)}const i=new Date(n.getTime()+t/15*36e5);return`${String(i.getUTCHours()).padStart(2,"0")}:${String(i.getUTCMinutes()).padStart(2,"0")}`}function wg(n){return n>6?`dzień, Słońce ${Math.round(n)}° nad horyzontem`:n>-.8?"wschód albo zachód Słońca":n>-6?"zmierzch cywilny":n>-18?"zmierzch, niebo jeszcze nie całkiem ciemne":"noc"}const qu="https://tiles.maps.eox.at/wmts/1.0.0/",Eg=(n,e,t)=>`${qu}s2cloudless_3857/default/g/${n}/${t}/${e}.jpg`,Tg=(n,e,t)=>`${qu}overlay_bright_3857/default/g/${n}/${t}/${e}.png`,Ag=14,Cg=64,Kl=240,Rg=8,Pg=1.0001,Lg=1.00015,Zl=85.0511,Dg=`
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  }
`,zg=`
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
`,Ug=`
  uniform sampler2D map;
  uniform float opacity;
  varying vec2 vUv;
  void main() {
    vec4 t = texture2D(map, vUv);
    gl_FragColor = vec4(t.rgb, t.a * opacity);
    #include <colorspace_fragment>
  }
`;function Ig(n,e){const t=Math.PI-2*Math.PI*n/2**e;return Math.atan(Math.sinh(t))*180/Math.PI}function $s(n,e){return(n+180)/360*2**e}function Ks(n,e){const t=Math.max(-Zl,Math.min(Zl,n))*Math.PI/180;return(1-Math.log(Math.tan(t)+1/Math.cos(t))/Math.PI)/2*2**e}function Ng(n,e,t,i,r){const a=Math.max(4,Math.min(64,Math.ceil(360/2**n/.5))),s=[],o=[],c=[],l=[];for(let d=0;d<=a;d++){const h=Ig(t+d/a,n);for(let f=0;f<=a;f++){const g=(e+f/a)/2**n*360-180,_=r(h,g,i);s.push(_.x,_.y,_.z),_.normalize(),o.push(_.x,_.y,_.z),c.push(f/a,1-d/a)}}for(let d=0;d<a;d++)for(let h=0;h<a;h++){const f=d*(a+1)+h;l.push(f,f+a+1,f+1,f+1,f+a+1,f+a+2)}const u=new At;return u.setAttribute("position",new ht(s,3)),u.setAttribute("normal",new ht(o,3)),u.setAttribute("uv",new ht(c,2)),u.setIndex(l),u}function Fg({parent:n,sunDir:e,latLngLocal:t,onActive:i}){const r=new An;n.add(r);const a=new wc,s=new Map,o=[];let c=0,l=!0,u=5,d=!0,h=!1,f=0;function g(E,y,D,z){const b=`${E}/${y}/${D}/${z}`;let M=s.get(b);if(!M){const L=E==="l",I=new pn({uniforms:L?{map:{value:null},opacity:{value:0}}:{map:{value:null},sunDir:{value:e},opacity:{value:0}},vertexShader:Dg,fragmentShader:L?Ug:zg,transparent:!0,depthWrite:!1}),F=new Pt(Ng(y,D,z,L?Lg:Pg,t),I);F.renderOrder=(L?200:100)+y,F.visible=!1,F.frustumCulled=!1,r.add(F),M={key:b,mesh:F,z:y,x:D,y:z,label:L,used:0,state:"new",fade:0},s.set(b,M)}return M}function _(E){E.state="loading",c+=1;const y=(E.label?Tg:Eg)(E.z,E.x,E.y);a.load(y,D=>{if(c-=1,E.state==="gone")return D.dispose();D.colorSpace=kt,D.anisotropy=4,E.mesh.material.uniforms.map.value=D,E.state="ready",m()},void 0,()=>{c-=1,E.state="error",m()})}function m(){for(;c<Rg&&o.length;){const E=o.shift();E.state==="new"&&_(E)}}function p(){if(s.size<=Kl)return;const E=[...s.values()].filter(y=>y.used<f).sort((y,D)=>y.used-D.used);for(const y of E.slice(0,s.size-Kl))y.state="gone",r.remove(y.mesh),y.mesh.geometry.dispose(),y.mesh.material.uniforms.map.value?.dispose(),y.mesh.material.dispose(),s.delete(y.key)}function R(E){E!==h&&(h=E,i?.(E))}function w(E){f+=1;const y=new Set;if(d&&E.alt<.9){const D=Math.max(.05,Math.cos(E.lat*Math.PI/180)),z=Math.tan(E.fovV*Math.PI/360),M=2*E.alt*z*6371/(E.heightPx*Math.min(2,window.devicePixelRatio||1));let L=Math.floor(Math.log2(40075*D/(256*M))+.3);L=Math.max(3,Math.min(Ag,L));const I=Math.acos(1/(1+E.alt)),G=Math.min(I,Math.atan(E.alt*z*Math.max(1,E.aspect)*1.1))*180/Math.PI,j=he=>{const me=Math.min(180,G/D),Ge=Math.floor($s(E.lng-me,he)),Be=Math.floor($s(E.lng+me,he)),ye=Math.max(0,Math.floor(Ks(E.lat+G,he))),O=Math.min(2**he-1,Math.floor(Ks(E.lat-G,he)));return{x0:Ge,x1:Be,y0:ye,y1:O,count:(Be-Ge+1)*(O-ye+1)}};let W=j(L);for(;W.count>Cg&&L>3;)W=j(--L);const oe=[L,Math.max(2,L-3)],q=$s(E.lng,L),ae=Ks(E.lat,L),ce=[];for(const he of oe){const me=he===L?W:j(he),Ge=2**he;for(let Be=me.y0;Be<=me.y1;Be++)for(let ye=me.x0;ye<=me.x1;ye++){const O=(ye%Ge+Ge)%Ge,ee=l&&he===L&&L>=u?["i","l"]:["i"];for(const H of ee){const Ae=g(H,he,O,Be);Ae.used=f,y.add(Ae),ce.push({t:Ae,d:he===L?Math.hypot(ye+.5-q,Be+.5-ae):-1})}}}ce.sort((he,me)=>he.d-me.d),o.length=0;for(const{t:he}of ce)he.state==="new"&&o.push(he);m()}for(const D of s.values())y.has(D)&&D.state==="ready"?D.mesh.visible=!0:(D.mesh.visible=!1,D.fade=0,D.mesh.material.uniforms.opacity.value=0);R(y.size>0),p()}function A(E){for(const y of s.values())!y.mesh.visible||y.fade>=1||(y.fade=Math.min(1,y.fade+E*4),y.mesh.material.uniforms.opacity.value=y.fade)}return{update:w,animate:A,setLabels(E){l=E},setEnabled(E){d=E},setLabelMinZoom(E){u=E}}}const is=Et.degToRad(23.4),Ac=new k(0,0,1),Ga=.0016,Zs=3.8,Ha=matchMedia("(prefers-reduced-motion: reduce)").matches;function dn(n,e,t){const i=(90-n)*Math.PI/180,r=(e+180)*Math.PI/180,a=Math.sin(i);return new k(-t*a*Math.cos(r),t*Math.cos(i),t*a*Math.sin(r))}function Js(n,e,t){return dn(n,e,t).applyAxisAngle(Ac,is)}function Qs(n){const e=n.clone().applyAxisAngle(Ac,-is).normalize(),t=90-Math.acos(Et.clamp(e.y,-1,1))*180/Math.PI;let i=Math.atan2(e.z,-e.x)*180/Math.PI-180;return i<-180&&(i+=360),{lat:t,lng:i}}function Jl(n,e,t,i){const r=Math.atan2(Math.sin(e-n),Math.cos(e-n));return n+r*(1-Math.exp(-t*i))}const eo=`
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
`,kg=`
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
`,Og=`
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
`,Bg=`
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
`;function Vg(n,{texturesBase:e="textures/",onPlace:t,onGround:i,onTiles:r,onPick:a}){const s=new mg({antialias:!0,powerPreference:"high-performance"});s.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),s.setClearColor(329484),n.appendChild(s.domElement);const o=s.domElement,c=new $h,l=new vn(38,1,.05,200),u=new k(1,.3,.6).normalize();{const te=new Float32Array(5400),P=new Float32Array(1800*3);for(let ie=0;ie<1800;ie++){const le=30+Math.random()*40,Q=Math.random()*Math.PI*2,Y=Math.acos(2*Math.random()-1);te.set([le*Math.sin(Y)*Math.cos(Q),le*Math.cos(Y),le*Math.sin(Y)*Math.sin(Q)],ie*3);const we=Math.random(),Ve=.55+Math.random()*.45;P.set([Ve,Ve*(.9+we*.08),Ve*(1.05-we*.2)],ie*3)}const se=new At;se.setAttribute("position",new rn(te,3)),se.setAttribute("color",new rn(P,3)),c.add(new nf(se,new Pu({size:.07,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1})))}const d=new An;d.rotation.z=is,c.add(d);const h=new wc,f=new gc(new Uint8Array([0,0,0,255]),1,1);f.needsUpdate=!0;const g=s.capabilities.getMaxAnisotropy(),_=s.capabilities.maxTextureSize;let m=4,p=null;const R=(U,te)=>{const P=h.load(e+U,()=>{m-=1,m===0&&p&&p()});return te&&(P.colorSpace=kt),P.anisotropy=Math.min(8,g),P},A=Math.max(screen.width,screen.height)*(window.devicePixelRatio||1)>2200&&!matchMedia("(pointer: coarse)").matches&&_>=4096?"":"-2k",E=new pn({uniforms:{dayMap:{value:R(`earth-day${A}.webp`,!0)},nightMap:{value:R(`earth-night${A}.webp`,!0)},waterMap:{value:R("earth-water.webp",!1)},sunDir:{value:u},nightGain:{value:1.35},photoMap:{value:f},photoMix:{value:0}},vertexShader:eo,fragmentShader:kg}),y=new Pt(new Di(1,128,96),E);d.add(y);const D=new pn({uniforms:{cloudMap:{value:R("earth-clouds.webp",!1)},sunDir:{value:u},opacity:{value:.62}},vertexShader:eo,fragmentShader:Og,transparent:!0,depthWrite:!1}),z=new Pt(new Di(1.008,96,72),D);z.renderOrder=300,d.add(z);const b=Fg({parent:d,sunDir:u,latLngLocal:dn,onActive:r}),M=(U,te,P,se)=>new Pt(new Di(U,64,48),new pn({uniforms:{sunDir:{value:u},power:{value:P},strength:{value:se}},vertexShader:eo,fragmentShader:Bg,transparent:!0,depthWrite:!1,side:te,blending:Ii}));c.add(M(1.075,nn,2.4,.95),M(1.012,ei,3.2,.35));const L=[],I=[],F=new An;F.rotation.z=is,c.add(F);const G=new Map,j=new Di(.011,16,12),W=new Mc(.02,.027,40),oe=new Di(.045,8,6),q=new _c(.0022,6e-4,.16,8);function ae(U,te=16766090){const P=dn(U.lat,U.lng,1.0003),se=new An;se.position.copy(P),se.quaternion.setFromUnitVectors(Ac,P.clone().normalize());const ie=new Pt(j,new vi({color:te})),le=new Pt(W,new vi({color:te,transparent:!0,opacity:.5,side:Sn,depthWrite:!1,blending:Ii}));le.position.z=.002;const Q=new Pt(oe,new vi({visible:!1}));Q.userData.placeId=U.id;const Y=new Pt(q,new vi({color:16771e3,transparent:!0,opacity:.85,depthWrite:!1,blending:Ii}));return Y.rotation.x=Math.PI/2,Y.position.z=.08,Y.visible=!1,se.add(ie,le,Q,Y),{group:se,core:ie,ring:le,beam:Y,place:U,color:te}}const ce=new Map;function he(U,te,P=9425919){const se=ce.get(U);if(se&&(F.remove(se.group),ce.delete(U)),!te)return;const ie=ae({id:null,...te},P);ie.beam.visible=!0,ie.beam.material=ie.beam.material.clone(),ie.beam.material.color.set(P),ie.ring.material.opacity=.9,F.add(ie.group),ce.set(U,ie)}let me=null;function Ge(U,te){if(me&&(F.remove(me),me.geometry.dispose(),me=null),!U||!te)return;const P=_g(U,te,96),ie=.02+Math.acos(Et.clamp(dn(U.lat,U.lng,1).dot(dn(te.lat,te.lng,1)),-1,1))*.09,le=new Iu(P.map(Q=>dn(Q.lat,Q.lng,1.0006+Math.sin(Q.t*Math.PI)*ie)));me=new Pt(new bc(le,160,.0028,6,!1),new vi({color:15975546,transparent:!0,opacity:.95,blending:Ii,depthWrite:!1})),me.renderOrder=2,F.add(me)}let Be=null;function ye(U){for(const te of G.values())F.remove(te.group);G.clear();for(const te of U){const P=ae(te,te.cat==="own"?10477760:16766090);F.add(P.group),G.set(te.id,P)}O()}function O(){for(const U of G.values()){const te=U.place.id===Be;U.core.material.color.set(te?16775142:U.color),U.ring.material.opacity=te?.95:.45,U.beam.visible=te}}const ee=new Oa().setFromVector3(Js(30,15,3.4)),H={theta:ee.theta,phi:ee.phi,radius:3.4,velT:0,velP:0,resumeAt:0,focus:null,spin:!Ha},Ae=new Oa;function Z(U,te,P){const se=new Oa().setFromVector3(Js(U,te,1));H.focus={theta:se.theta,phi:se.phi,radius:P??Et.clamp(H.radius,1.75,2.3)}}function Me(){H.focus=null,H.resumeAt=performance.now()+600}function Pe(U,{fly:te=!0}={}){Be=U,O();const P=G.get(U);P&&te&&Z(P.place.lat,P.place.lng,H.radius>2.3?2.05:void 0)}const de=new Map;let pe=null,C=null;const be=new Cf,Se=new qe;o.addEventListener("pointerdown",U=>{if(!(U.pointerType==="mouse"&&U.button!==0)){if(o.setPointerCapture(U.pointerId),de.set(U.pointerId,{x:U.clientX,y:U.clientY}),de.size===2){const[te,P]=[...de.values()];C={dist:Math.hypot(te.x-P.x,te.y-P.y),alt:H.radius-1},pe=null}else pe={x:U.clientX,y:U.clientY,moved:0,t:performance.now()},H.velT=H.velP=0;o.classList.add("grabbing")}}),o.addEventListener("pointermove",U=>{if(!de.has(U.pointerId))return;if(de.set(U.pointerId,{x:U.clientX,y:U.clientY}),C&&de.size>=2){const[Q,Y]=[...de.values()],we=Math.hypot(Q.x-Y.x,Q.y-Y.y);v(C.alt*(C.dist/Math.max(we,1)));return}if(!pe)return;const te=U.clientX-pe.x,P=U.clientY-pe.y;if(pe.x=U.clientX,pe.y=U.clientY,pe.moved+=Math.abs(te)+Math.abs(P),pe.moved<5)return;H.focus=null;const se=H.radius-1,ie=2*se*Math.tan(Et.degToRad(l.fov/2))/Math.max(1,n.clientHeight),le=Math.min(.0052*((H.radius-.85)/2),ie*Et.lerp(1,3,Et.smoothstep(se,.05,1)));H.velT=-te*le,H.velP=-P*le,H.theta+=H.velT,H.phi=Et.clamp(H.phi+H.velP,.12,Math.PI-.12)});const Ue=U=>{if(!de.has(U.pointerId)||(de.delete(U.pointerId),de.size<2&&(C=null),de.size===0&&o.classList.remove("grabbing"),!pe))return;const te=pe.moved<8&&performance.now()-pe.t<600;pe=null,H.resumeAt=performance.now()+2500,te&&U.type==="pointerup"&&fe(U)};o.addEventListener("pointerup",Ue),o.addEventListener("pointercancel",Ue),o.addEventListener("wheel",U=>{U.preventDefault(),v((H.radius-1)*Math.exp(U.deltaY*.0016)),H.resumeAt=performance.now()+1500},{passive:!1});function fe(U){const te=o.getBoundingClientRect();Se.x=(U.clientX-te.left)/te.width*2-1,Se.y=-((U.clientY-te.top)/te.height)*2+1,be.setFromCamera(Se,l);const P=be.intersectObjects(L.filter(Y=>Y.visible),!0).find(Y=>Y.object.userData.pick);if(P){a?.(P.object.userData.pick,P.instanceId);return}const se=[...G.values()].filter(Y=>Y.group.visible).map(Y=>Y.group),ie=be.intersectObjects(se,!0).find(Y=>Y.object.userData.placeId);if(ie){t?.(ie.object.userData.placeId);return}const le=T(be.ray);if(!le)return;const Q=performance.now();if(ve&&Q-ve.t<380&&Math.hypot(U.clientX-ve.x,U.clientY-ve.y)<30){ve=null;const Y=Qs(le);Z(Y.lat,Y.lng,1+Math.max(Ga,(H.radius-1)/3.5));return}ve={t:Q,x:U.clientX,y:U.clientY},i?.(Qs(le))}let ve=null;const ge=new k,Re=new Nn(new k,1);function T(U){return U.intersectSphere(Re,ge)?ge.clone():null}function v(U){H.radius=1+Et.clamp(U,Ga,Zs),H.focus&&(H.focus.radius=H.radius)}let N={real:!0};function J(U,te){N={real:U,date:te},X()}const ne=new k;function X(){if(N.real)u.copy(Js(N.lat??0,N.lng??0,1));else{ne.copy(l.position).normalize();const U=new k().crossVectors(l.up,ne).normalize();u.copy(ne).addScaledVector(U,-.55).addScaledVector(l.up,.35).normalize()}}function Te(U,te){N.lat=U,N.lng=te,X()}let xe={x:0,y:0};function Le(U,te){xe={x:U,y:te},x()}function x(){const U=n.clientWidth,te=n.clientHeight;s.setSize(U,te,!1),l.aspect=U/te,l.fov=l.aspect<1?2*Math.atan(Math.tan(Et.degToRad(19))/l.aspect)*180/Math.PI:38,l.setViewOffset(U,te,-xe.x,xe.y,U,te),l.updateProjectionMatrix()}new ResizeObserver(x).observe(n),x();const re=new Af;let ue=!0,Fe=!1,Ne=0;return s.setAnimationLoop(()=>{const U=Math.min(re.getDelta(),.05),te=re.elapsedTime;ue&&!Ha&&(z.rotation.y+=U*.004);const P=Ha?14:2.8;if(!pe&&H.focus){H.theta=Jl(H.theta,H.focus.theta,P,U),H.phi=Et.clamp(Jl(H.phi,H.focus.phi,P,U),.12,Math.PI-.12);const Q=Et.damp(Math.log(H.radius-1),Math.log(H.focus.radius-1),P*.9,U);H.radius=1+Math.exp(Q),H.velT=H.velP=0}else if(!pe){H.theta+=H.velT,H.phi=Et.clamp(H.phi+H.velP,.12,Math.PI-.12);const Q=Math.exp(-U*3.1);H.velT*=Q,H.velP*=Q,H.spin&&!C&&H.radius>1.5&&performance.now()>H.resumeAt&&Math.abs(H.velT)<3e-4&&(H.theta+=U*.05*((H.radius-.9)/2))}const se=Et.clamp((H.radius-1)/2.7,7e-4,1.2);for(const Q of G.values()){const Y=Q.place.id===Be,we=1+Math.sin(te*2.3+Q.place.lat)*(Y?.14:.05);Q.group.scale.setScalar(se),Q.core.scale.setScalar((Y?1.6:1)*we)}for(const Q of ce.values())Q.group.scale.setScalar(se);Ae.set(H.radius,H.phi,H.theta),l.position.setFromSpherical(Ae),l.lookAt(0,0,0);const ie=H.radius-1,le=Et.clamp(ie*.25,2e-4,.05);if(Math.abs(l.near-le)>le*.05&&(l.near=le,l.updateProjectionMatrix()),D.uniforms.opacity.value=.62*Et.smoothstep(ie,.08,.5),Ne-=U,Ne<=0){Ne=.15;const Q=Qs(l.position);b.update({lat:Q.lat,lng:Q.lng,alt:ie,fovV:l.fov,aspect:l.aspect,heightPx:n.clientHeight})}b.animate(U);for(const Q of I)Q({dt:U,alt:ie,markerScale:se,camera:l});N.real||X(),s.render(c,l)}),{setPlaces:ye,select:Pe,focus:Z,release:Me,setPin:he,setArc:Ge,setSun:J,setSubsolar:Te,setViewShift:Le,setClouds(U){ue=U,z.visible=U&&!Fe},setSpin(U){H.spin=U&&!Ha},setMarkersVisible(U){for(const te of G.values())te.group.visible=U},get radius(){return H.radius},get debug(){return{radius:H.radius,theta:H.theta,phi:H.phi,velT:H.velT,velP:H.velP,focus:H.focus,drag:!!pe,pinch:!!C}},zoomBy(U){const te=Et.clamp((H.radius-1)*U,Ga,Zs),P=new Oa().setFromVector3(l.position);H.focus={theta:H.focus?.theta??P.theta,phi:H.focus?.phi??P.phi,radius:1+te}},zoomTo(U,te,P){Z(U,te,1+Et.clamp(P,Ga,Zs))},setTiles(U){b.setEnabled(U)},layerRoot:F,addPickable(U){L.push(U)},onFrame(U){I.push(U)},setPhoto(U){E.uniforms.photoMap.value=U||f,E.uniforms.photoMix.value=U?1:0,z.visible=ue&&!U,Fe=!!U},get maxTextureSize(){return _},setLabels(U){b.setLabels(U)},setLabelMinZoom(U){b.setLabelMinZoom(U)},whenReady(U){m===0?U():p=U}}}var Cn=Math.PI,gt=Cn*2,Gr=Cn/180,Gg=1440,Hg=398600.8,ln=6378.135,Kn=60/Math.sqrt(ln*ln*ln/Hg),to=ln*Kn/60,Wg=1/Kn,Fi=.001082616,Xg=-253881e-11,qg=-165597e-11,ki=Xg/Fi,ra=2/3,jg=1440/(2*Cn);function Yg(n,e){for(var t=[31,n%4===0?29:28,31,30,31,30,31,31,30,31,30,31],i=Math.floor(e),r=1,a=0;i>a+t[r-1]&&r<12;)a+=t[r-1],r+=1;var s=r,o=i-a,c=(e-i)*24,l=Math.floor(c);c=(c-l)*60;var u=Math.floor(c),d=(c-u)*60;return{mon:s,day:o,hr:l,minute:u,sec:d}}function Ql(n,e,t,i,r,a){var s=arguments.length>6&&arguments[6]!==void 0?arguments[6]:0;return 367*n-Math.floor(7*(n+Math.floor((e+9)/12))*.25)+Math.floor(275*e/9)+t+17210135e-1+((s/6e4+a/60+r)/60+i)/24}function Cc(n,e,t,i,r,a){var s=arguments.length>6&&arguments[6]!==void 0?arguments[6]:0;if(n instanceof Date){var o=n;return Ql(o.getUTCFullYear(),o.getUTCMonth()+1,o.getUTCDate(),o.getUTCHours(),o.getUTCMinutes(),o.getUTCSeconds(),o.getUTCMilliseconds())}return Ql(n,e,t,i,r,a,s)}function ju(n,e){var t=n.e3,i=n.ee2,r=n.peo,a=n.pgho,s=n.pho,o=n.pinco,c=n.plo,l=n.se2,u=n.se3,d=n.sgh2,h=n.sgh3,f=n.sgh4,g=n.sh2,_=n.sh3,m=n.si2,p=n.si3,R=n.sl2,w=n.sl3,A=n.sl4,E=n.t,y=n.xgh2,D=n.xgh3,z=n.xgh4,b=n.xh2,M=n.xh3,L=n.xi2,I=n.xi3,F=n.xl2,G=n.xl3,j=n.xl4,W=n.zmol,oe=n.zmos,q=e.init,ae=e.opsmode,ce=e.ep,he=e.inclp,me=e.nodep,Ge=e.argpp,Be=e.mp,ye,O,ee,H,Ae,Z,Me,Pe,de,pe,C,be,Se,Ue,fe,ve,ge,Re,T,v,N,J=119459e-10,ne=.01675,X=.00015835218,Te=.0549;N=oe+J*E,q==="y"&&(N=oe),v=N+2*ne*Math.sin(N),ge=Math.sin(v),pe=.5*ge*ge-.25,C=-.5*ge*Math.cos(v);var xe=l*pe+u*C,Le=m*pe+p*C,x=R*pe+w*C+A*ge,re=d*pe+h*C+f*ge,ue=g*pe+_*C;N=W+X*E,q==="y"&&(N=W),v=N+2*Te*Math.sin(N),ge=Math.sin(v),pe=.5*ge*ge-.25,C=-.5*ge*Math.cos(v);var Fe=i*pe+t*C,Ne=L*pe+I*C,U=F*pe+G*C+j*ge,te=y*pe+D*C+z*ge,P=b*pe+M*C;return be=xe+Fe,fe=Le+Ne,ve=x+U,Se=re+te,Ue=ue+P,q==="n"&&(be-=r,fe-=o,ve-=c,Se-=a,Ue-=s,he+=fe,ce+=be,H=Math.sin(he),ee=Math.cos(he),he>=.2?(Ue/=H,Se-=ee*Ue,Ge+=Se,me+=Ue,Be+=ve):(Z=Math.sin(me),Ae=Math.cos(me),ye=H*Z,O=H*Ae,Me=Ue*Ae+fe*ee*Z,Pe=-Ue*Z+fe*ee*Ae,ye+=Me,O+=Pe,me%=gt,me<0&&ae==="a"&&(me+=gt),Re=Be+Ge+ee*me,de=ve+Se-fe*me*H,Re+=de,T=me,me=Math.atan2(ye,O),me<0&&ae==="a"&&(me+=gt),Math.abs(T-me)>Cn&&(me<T?me+=gt:me-=gt),Be+=ve,Ge=Re-Be-ee*me)),{ep:ce,inclp:he,nodep:me,argpp:Ge,mp:Be}}function $g(n){var e=n.epoch,t=n.ep,i=n.argpp,r=n.tc,a=n.inclp,s=n.nodep,o=n.np,c,l,u,d,h,f,g,_,m,p,R,w,A,E,y,D,z,b,M,L,I,F,G,j,W,oe,q,ae,ce,he,me,Ge,Be,ye,O,ee,H,Ae,Z,Me,Pe,de,pe,C,be,Se,Ue,fe,ve,ge,Re,T,v,N,J,ne,X,Te,xe,Le,x,re,ue,Fe=.01675,Ne=.0549,U=29864797e-13,te=47968065e-14,P=.39785416,se=.91744867,ie=.1945905,le=-.98088458,Q=o,Y=t,we=Math.sin(s),Ve=Math.cos(s),Ke=Math.sin(i),Ye=Math.cos(i),_t=Math.sin(a),yt=Math.cos(a),Ee=Y*Y,Kt=1-Ee,Bt=Math.sqrt(Kt),Zt=0,nt=0,kn=0,oi=0,Rn=0,xn=e+18261.5+r/1440,Vt=(4.523602-.00092422029*xn)%gt,St=Math.sin(Vt),Jt=Math.cos(Vt),ci=.91375164-.03568096*Jt,li=Math.sqrt(1-ci*ci),zt=.089683511*St/li,Ut=Math.sqrt(1-zt*zt),xt=5.8351514+.001944368*xn,On=.39785416*St/li,S=Ut*Jt+.91744867*zt*St;On=Math.atan2(On,S),On+=xt-Vt;var B=Math.cos(On),$=Math.sin(On);L=ie,I=le,j=se,W=P,F=Ve,G=we,R=U;for(var K=1/Q,V=0;V<2;)V+=1,c=L*F+I*j*G,u=-I*F+L*j*G,g=-L*G+I*j*F,_=I*W,m=I*G+L*j*F,p=L*W,l=yt*g+_t*_,d=yt*m+_t*p,h=-_t*g+yt*_,f=-_t*m+yt*p,w=c*Ye+l*Ke,A=u*Ye+d*Ke,E=-c*Ke+l*Ye,y=-u*Ke+d*Ye,D=h*Ke,z=f*Ke,b=h*Ye,M=f*Ye,x=12*w*w-3*E*E,re=24*w*A-6*E*y,ue=12*A*A-3*y*y,T=3*(c*c+l*l)+x*Ee,v=6*(c*u+l*d)+re*Ee,N=3*(u*u+d*d)+ue*Ee,J=-6*c*h+Ee*(-24*w*b-6*E*D),ne=-6*(c*f+u*h)+Ee*(-24*(A*b+w*M)+-6*(E*z+y*D)),X=-6*u*f+Ee*(-24*A*M-6*y*z),Te=6*l*h+Ee*(24*w*D-6*E*b),xe=6*(d*h+l*f)+Ee*(24*(A*D+w*z)-6*(y*b+E*M)),Le=6*d*f+Ee*(24*A*z-6*y*M),T=T+T+Kt*x,v=v+v+Kt*re,N=N+N+Kt*ue,Ue=R*K,Se=-.5*Ue/Bt,fe=Ue*Bt,be=-15*Y*fe,ve=w*E+A*y,ge=A*E+w*y,Re=A*y-w*E,V===1&&(oe=be,q=Se,ae=Ue,ce=fe,he=ve,me=ge,Ge=Re,Be=T,ye=v,O=N,ee=J,H=ne,Ae=X,Z=Te,Me=xe,Pe=Le,de=x,pe=re,C=ue,L=B,I=$,j=ci,W=li,F=Ut*Ve+zt*we,G=we*Ut-Ve*zt,R=te);var _e=(4.7199672+(.2299715*xn-xt))%gt,ze=(6.2565837+.017201977*xn)%gt,ke=2*oe*me,Ie=2*oe*Ge,He=2*q*H,je=2*q*(Ae-ee),We=-2*ae*ye,Je=-2*ae*(O-Be),rt=-2*ae*(-21-9*Ee)*Fe,ot=2*ce*pe,ft=2*ce*(C-de),st=-18*ce*Fe,Xe=-2*q*Me,lt=-2*q*(Pe-Z),tt=2*be*ge,Nt=2*be*Re,Pn=2*Se*ne,Qt=2*Se*(X-J),bi=-2*Ue*v,mt=-2*Ue*(N-T),Gt=-2*Ue*(-21-9*Ee)*Ne,an=2*fe*re,Ft=2*fe*(ue-x),Ht=-18*fe*Ne,Cr=-2*Se*xe,Bn=-2*Se*(Le-Te);return{snodm:we,cnodm:Ve,sinim:_t,cosim:yt,sinomm:Ke,cosomm:Ye,day:xn,e3:Nt,ee2:tt,em:Y,emsq:Ee,gam:xt,peo:Zt,pgho:oi,pho:Rn,pinco:nt,plo:kn,rtemsq:Bt,se2:ke,se3:Ie,sgh2:ot,sgh3:ft,sgh4:st,sh2:Xe,sh3:lt,si2:He,si3:je,sl2:We,sl3:Je,sl4:rt,s1:be,s2:Se,s3:Ue,s4:fe,s5:ve,s6:ge,s7:Re,ss1:oe,ss2:q,ss3:ae,ss4:ce,ss5:he,ss6:me,ss7:Ge,sz1:Be,sz2:ye,sz3:O,sz11:ee,sz12:H,sz13:Ae,sz21:Z,sz22:Me,sz23:Pe,sz31:de,sz32:pe,sz33:C,xgh2:an,xgh3:Ft,xgh4:Ht,xh2:Cr,xh3:Bn,xi2:Pn,xi3:Qt,xl2:bi,xl3:mt,xl4:Gt,nm:Q,z1:T,z2:v,z3:N,z11:J,z12:ne,z13:X,z21:Te,z22:xe,z23:Le,z31:x,z32:re,z33:ue,zmol:_e,zmos:ze}}function Kg(n){var e=n.cosim,t=n.argpo,i=n.s1,r=n.s2,a=n.s3,s=n.s4,o=n.s5,c=n.sinim,l=n.ss1,u=n.ss2,d=n.ss3,h=n.ss4,f=n.ss5,g=n.sz1,_=n.sz3,m=n.sz11,p=n.sz13,R=n.sz21,w=n.sz23,A=n.sz31,E=n.sz33,y=n.t,D=n.tc,z=n.gsto,b=n.mo,M=n.mdot,L=n.no,I=n.nodeo,F=n.nodedot,G=n.xpidot,j=n.z1,W=n.z3,oe=n.z11,q=n.z13,ae=n.z21,ce=n.z23,he=n.z31,me=n.z33,Ge=n.ecco,Be=n.eccsq,ye=n.emsq,O=n.em,ee=n.argpm,H=n.inclm,Ae=n.mm,Z=n.nm,Me=n.nodem,Pe=n.irez,de=n.atime,pe=n.d2201,C=n.d2211,be=n.d3210,Se=n.d3222,Ue=n.d4410,fe=n.d4422,ve=n.d5220,ge=n.d5232,Re=n.d5421,T=n.d5433,v=n.dedt,N=n.didt,J=n.dmdt,ne=n.dnodt,X=n.domdt,Te=n.del1,xe=n.del2,Le=n.del3,x=n.xfact,re=n.xlamo,ue=n.xli,Fe=n.xni,Ne,U,te,P,se,ie,le,Q,Y,we,Ve,Ke,Ye,_t,yt,Ee,Kt,Bt,Zt,nt,kn,oi,Rn,xn,Vt,St,Jt,ci,li,zt,Ut,xt,On=17891679e-13,S=21460748e-13,B=22123015e-14,$=17891679e-13,K=73636953e-16,V=21765803e-16,_e=.0043752690880113,ze=37393792e-14,ke=11428639e-14,Ie=.00015835218,He=119459e-10;Pe=0,Z<.0052359877&&Z>.0034906585&&(Pe=1),Z>=.00826&&Z<=.00924&&O>=.5&&(Pe=2);var je=l*He*f,We=u*He*(m+p),Je=-He*d*(g+_-14-6*ye),rt=h*He*(A+E-6),ot=-He*u*(R+w);(H<.052359877||H>Cn-.052359877)&&(ot=0),c!==0&&(ot/=c);var ft=rt-e*ot;v=je+i*Ie*o,N=We+r*Ie*(oe+q),J=Je-Ie*a*(j+W-14-6*ye);var st=s*Ie*(he+me-6),Xe=-Ie*r*(ae+ce);(H<.052359877||H>Cn-.052359877)&&(Xe=0),X=ft+st,ne=ot,c!==0&&(X-=e/c*Xe,ne+=Xe/c);var lt=0,tt=(z+D*_e)%gt;if(O+=v*y,H+=N*y,ee+=X*y,Me+=ne*y,Ae+=J*y,Pe!==0){if(zt=Math.pow(Z/Kn,ra),Pe===2){Ut=e*e;var Nt=O;O=Ge;var Pn=ye;ye=Be,xt=O*ye,_t=-.306-(O-.64)*.44,O<=.65?(yt=3.616-13.247*O+16.29*ye,Kt=-19.302+117.39*O-228.419*ye+156.591*xt,Bt=-18.9068+109.7927*O-214.6334*ye+146.5816*xt,Zt=-41.122+242.694*O-471.094*ye+313.953*xt,nt=-146.407+841.88*O-1629.014*ye+1083.435*xt,kn=-532.114+3017.977*O-5740.032*ye+3708.276*xt):(yt=-72.099+331.819*O-508.738*ye+266.724*xt,Kt=-346.844+1582.851*O-2415.925*ye+1246.113*xt,Bt=-342.585+1554.908*O-2366.899*ye+1215.972*xt,Zt=-1052.797+4758.686*O-7193.992*ye+3651.957*xt,nt=-3581.69+16178.11*O-24462.77*ye+12422.52*xt,O>.715?kn=-5149.66+29936.92*O-54087.36*ye+31324.56*xt:kn=1464.74-4664.75*O+3763.64*ye),O<.7?(xn=-919.2277+4988.61*O-9064.77*ye+5542.21*xt,oi=-822.71072+4568.6173*O-8491.4146*ye+5337.524*xt,Rn=-853.666+4690.25*O-8624.77*ye+5341.4*xt):(xn=-37995.78+161616.52*O-229838.2*ye+109377.94*xt,oi=-51752.104+218913.95*O-309468.16*ye+146349.42*xt,Rn=-40023.88+170470.89*O-242699.48*ye+115605.82*xt),Vt=c*c,Ne=.75*(1+2*e+Ut),U=1.5*Vt,P=1.875*c*(1-2*e-3*Ut),se=-1.875*c*(1+2*e-3*Ut),le=35*Vt*Ne,Q=39.375*Vt*Vt,Y=9.84375*c*(Vt*(1-2*e-5*Ut)+.33333333*(-2+4*e+6*Ut)),we=c*(4.92187512*Vt*(-2-4*e+10*Ut)+6.56250012*(1+2*e-3*Ut)),Ve=29.53125*c*(2-8*e+Ut*(-12+8*e+10*Ut)),Ke=29.53125*c*(-2-8*e+Ut*(12+8*e-10*Ut)),ci=Z*Z,li=zt*zt,Jt=3*ci*li,St=Jt*$,pe=St*Ne*_t,C=St*U*yt,Jt*=zt,St=Jt*ze,be=St*P*Kt,Se=St*se*Bt,Jt*=zt,St=2*Jt*K,Ue=St*le*Zt,fe=St*Q*nt,Jt*=zt,St=Jt*ke,ve=St*Y*kn,ge=St*we*Rn,St=2*Jt*V,Re=St*Ve*oi,T=St*Ke*xn,re=(b+I+I-(tt+tt))%gt,x=M+J+2*(F+ne-_e)-L,O=Nt,ye=Pn}Pe===1&&(Ye=1+ye*(-2.5+.8125*ye),Kt=1+2*ye,Ee=1+ye*(-6+6.60937*ye),Ne=.75*(1+e)*(1+e),te=.9375*c*c*(1+3*e)-.75*(1+e),ie=1+e,ie*=1.875*ie*ie,Te=3*Z*Z*zt*zt,xe=2*Te*Ne*Ye*On,Le=3*Te*ie*Ee*B*zt,Te=Te*te*Kt*S*zt,re=(b+I+t-tt)%gt,x=M+G+J+X+ne-(L+_e)),ue=re,Fe=L,de=0,Z=L+lt}return{em:O,argpm:ee,inclm:H,mm:Ae,nm:Z,nodem:Me,irez:Pe,atime:de,d2201:pe,d2211:C,d3210:be,d3222:Se,d4410:Ue,d4422:fe,d5220:ve,d5232:ge,d5421:Re,d5433:T,dedt:v,didt:N,dmdt:J,dndt:lt,dnodt:ne,domdt:X,del1:Te,del2:xe,del3:Le,xfact:x,xlamo:re,xli:ue,xni:Fe}}function eu(n){var e=(n-2451545)/36525,t=-62e-7*e*e*e+.093104*e*e+(876600*3600+8640184812866e-6)*e+67310.54841;return t=t*Gr/240%gt,t<0&&(t+=gt),t}function Yu(n,e,t,i,r,a,s){return n instanceof Date?eu(Cc(n)):eu(n)}function Zg(n){var e=n.ecco,t=n.epoch,i=n.inclo,r=n.opsmode,a=n.no,s=e*e,o=1-s,c=Math.sqrt(o),l=Math.cos(i),u=l*l,d=Math.pow(Kn/a,ra),h=.75*Fi*(3*u-1)/(c*o),f=h/(d*d),g=d*(1-f*f-f*(1/3+134*f*f/81));f=h/(g*g),a/=1+f;var _=Math.pow(Kn/a,ra),m=Math.sin(i),p=_*o,R=1-5*u,w=-R-u-u,A=1/_,E=p*p,y=_*(1-e),D="n",z;if(r==="a"){var b=t-7305,M=Math.floor(b+1e-8),L=b-M,I=.017202791694070362,F=1.7321343856509375,G=5075514194322695e-30,j=I+gt;z=(F+I*M+j*L+b*b*G)%gt,z<0&&(z+=gt)}else z=Yu(t+24332815e-1);return{no:a,method:D,ainv:A,ao:_,con41:w,con42:R,cosio:l,cosio2:u,eccsq:s,omeosq:o,posq:E,rp:y,rteosq:c,sinio:m,gsto:z}}function Jg(n){var e=n.irez,t=n.d2201,i=n.d2211,r=n.d3210,a=n.d3222,s=n.d4410,o=n.d4422,c=n.d5220,l=n.d5232,u=n.d5421,d=n.d5433,h=n.dedt,f=n.del1,g=n.del2,_=n.del3,m=n.didt,p=n.dmdt,R=n.dnodt,w=n.domdt,A=n.argpo,E=n.argpdot,y=n.t,D=n.tc,z=n.gsto,b=n.xfact,M=n.xlamo,L=n.no,I=n.atime,F=n.em,G=n.argpm,j=n.inclm,W=n.xli,oe=n.mm,q=n.xni,ae=n.nodem,ce=n.nm,he=.13130908,me=2.8843198,Ge=.37448087,Be=5.7686396,ye=.95240898,O=1.8014998,ee=1.050833,H=4.4108898,Ae=.0043752690880113,Z=720,Me=-720,Pe=259200,de,pe,C,be,Se,Ue,fe,ve,ge=0,Re=0,T=(z+D*Ae)%gt;if(F+=h*y,j+=m*y,G+=w*y,ae+=R*y,oe+=p*y,e!==0){(I===0||y*I<=0||Math.abs(y)<Math.abs(I))&&(I=0,q=L,W=M),y>0?de=Z:de=Me;for(var v=381;v===381;)e!==2?(fe=f*Math.sin(W-he)+g*Math.sin(2*(W-me))+_*Math.sin(3*(W-Ge)),Se=q+b,Ue=f*Math.cos(W-he)+2*g*Math.cos(2*(W-me))+3*_*Math.cos(3*(W-Ge)),Ue*=Se):(ve=A+E*I,C=ve+ve,pe=W+W,fe=t*Math.sin(C+W-Be)+i*Math.sin(W-Be)+r*Math.sin(ve+W-ye)+a*Math.sin(-ve+W-ye)+s*Math.sin(C+pe-O)+o*Math.sin(pe-O)+c*Math.sin(ve+W-ee)+l*Math.sin(-ve+W-ee)+u*Math.sin(ve+pe-H)+d*Math.sin(-ve+pe-H),Se=q+b,Ue=t*Math.cos(C+W-Be)+i*Math.cos(W-Be)+r*Math.cos(ve+W-ye)+a*Math.cos(-ve+W-ye)+c*Math.cos(ve+W-ee)+l*Math.cos(-ve+W-ee)+2*(s*Math.cos(C+pe-O)+o*Math.cos(pe-O)+u*Math.cos(ve+pe-H)+d*Math.cos(-ve+pe-H)),Ue*=Se),Math.abs(y-I)>=Z?v=381:(Re=y-I,v=0),v===381&&(W+=Se*de+fe*Pe,q+=fe*de+Ue*Pe,I+=de);ce=q+fe*Re+Ue*Re*Re*.5,be=W+Se*Re+fe*Re*Re*.5,e!==1?(oe=be-2*ae+2*T,ge=ce-L):(oe=be-ae-G+T,ge=ce-L),ce=L+ge}return{atime:I,em:F,argpm:G,inclm:j,xli:W,mm:oe,xni:q,nodem:ae,dndt:ge,nm:ce}}var xi;(function(n){n[n.None=0]="None",n[n.MeanEccentricityOutOfRange=1]="MeanEccentricityOutOfRange",n[n.MeanMotionBelowZero=2]="MeanMotionBelowZero",n[n.PerturbedEccentricityOutOfRange=3]="PerturbedEccentricityOutOfRange",n[n.SemiLatusRectumBelowZero=4]="SemiLatusRectumBelowZero",n[n.Decayed=6]="Decayed"})(xi||(xi={}));function $u(n,e){var t,i,r,a,s,o,c,l,u,d,h,f,g,_,m,p,R,w,A,E,y,D,z,b,M,L,I,F=15e-13;n.t=e,n.error=xi.None;var G=n.mo+n.mdot*n.t,j=n.argpo+n.argpdot*n.t,W=n.nodeo+n.nodedot*n.t;u=j,y=G;var oe=n.t*n.t;if(z=W+n.nodecf*oe,R=1-n.cc1*n.t,w=n.bstar*n.cc4*n.t,A=n.t2cof*oe,n.isimp!==1){c=n.omgcof*n.t;var q=1+n.eta*Math.cos(G);o=n.xmcof*(q*q*q-n.delmo),p=c+o,y=G+p,u=j-p,f=oe*n.t,g=f*n.t,R=R-n.d2*oe-n.d3*f-n.d4*g,w+=n.bstar*n.cc5*(Math.sin(y)-n.sinmao),A=A+n.t3cof*f+g*(n.t4cof+n.t*n.t5cof)}D=n.no;var ae=n.ecco;if(E=n.inclo,n.method==="d"){_=n.t;var ce={irez:n.irez,d2201:n.d2201,d2211:n.d2211,d3210:n.d3210,d3222:n.d3222,d4410:n.d4410,d4422:n.d4422,d5220:n.d5220,d5232:n.d5232,d5421:n.d5421,d5433:n.d5433,dedt:n.dedt,del1:n.del1,del2:n.del2,del3:n.del3,didt:n.didt,dmdt:n.dmdt,dnodt:n.dnodt,domdt:n.domdt,argpo:n.argpo,argpdot:n.argpdot,t:n.t,tc:_,gsto:n.gsto,xfact:n.xfact,xlamo:n.xlamo,no:n.no,atime:n.atime,em:ae,argpm:u,inclm:E,xli:n.xli,mm:y,xni:n.xni,nodem:z,nm:D},he=Jg(ce);ae=he.em,u=he.argpm,E=he.inclm,y=he.mm,z=he.nodem,D=he.nm}if(D<=0)return n.error=xi.MeanMotionBelowZero,null;var me=Math.pow(Kn/D,ra)*R*R;if(D=Kn/Math.pow(me,1.5),ae-=w,ae>=1||ae<-.001)return n.error=xi.MeanEccentricityOutOfRange,null;ae<1e-6&&(ae=1e-6),y+=n.no*A,M=y+u+z,z%=gt,u%=gt,M%=gt,y=(M-u-z)%gt;var Ge={am:me,em:ae,im:E,Om:z,om:u,mm:y,nm:D},Be=Math.sin(E),ye=Math.cos(E),O=ae;if(b=E,d=u,I=z,L=y,a=Be,r=ye,n.method==="d"){var ee={inclo:n.inclo,init:"n",ep:O,inclp:b,nodep:I,argpp:d,mp:L,opsmode:n.operationmode},H=ju(n,ee);if(O=H.ep,I=H.nodep,d=H.argpp,L=H.mp,b=H.inclp,b<0&&(b=-b,I+=Cn,d-=Cn),O<0||O>1)return n.error=xi.PerturbedEccentricityOutOfRange,null}n.method==="d"&&(a=Math.sin(b),r=Math.cos(b),n.aycof=-.5*ki*a,Math.abs(r+1)>15e-13?n.xlcof=-.25*ki*a*(3+5*r)/(1+r):n.xlcof=-.25*ki*a*(3+5*r)/F);var Ae=O*Math.cos(d);p=1/(me*(1-O*O));var Z=O*Math.sin(d)+p*n.aycof,Me=L+d+I+p*n.xlcof*Ae,Pe=(Me-I)%gt;l=Pe,m=9999.9;for(var de=1;Math.abs(m)>=1e-12&&de<=10;)i=Math.sin(l),t=Math.cos(l),m=1-t*Ae-i*Z,m=(Pe-Z*t+Ae*i-l)/m,Math.abs(m)>=.95&&(m>0?m=.95:m=-.95),l+=m,de+=1;var pe=Ae*t+Z*i,C=Ae*i-Z*t,be=Ae*Ae+Z*Z,Se=me*(1-be);if(Se<0)return n.error=xi.SemiLatusRectumBelowZero,null;var Ue=me*(1-pe),fe=Math.sqrt(me)*C/Ue,ve=Math.sqrt(Se)/Ue,ge=Math.sqrt(1-be);p=C/(1+ge);var Re=me/Ue*(i-Z-Ae*p),T=me/Ue*(t-Ae+Z*p);h=Math.atan2(Re,T);var v=(T+T)*Re,N=1-2*Re*Re;p=1/Se;var J=.5*Fi*p,ne=J*p;n.method==="d"&&(s=r*r,n.con41=3*s-1,n.x1mth2=1-s,n.x7thm1=7*s-1);var X=Ue*(1-1.5*ne*ge*n.con41)+.5*J*n.x1mth2*N;if(X<1)return n.error=xi.Decayed,null;h-=.25*ne*n.x7thm1*v;var Te=I+1.5*ne*r*v,xe=b+1.5*ne*r*a*N,Le=fe-D*J*n.x1mth2*v/Kn,x=ve+D*J*(n.x1mth2*N+1.5*n.con41)/Kn,re=Math.sin(h),ue=Math.cos(h),Fe=Math.sin(Te),Ne=Math.cos(Te),U=Math.sin(xe),te=Math.cos(xe),P=-Fe*te,se=Ne*te,ie=P*re+Ne*ue,le=se*re+Fe*ue,Q=U*re,Y=P*ue-Ne*re,we=se*ue-Fe*re,Ve=U*ue,Ke={x:X*ie*ln,y:X*le*ln,z:X*Q*ln},Ye={x:(Le*ie+x*Y)*to,y:(Le*le+x*we)*to,z:(Le*Q+x*Ve)*to};return{position:Ke,velocity:Ye,meanElements:Ge}}function Qg(n,e){var t=e.opsmode,i=e.epoch,r=e.xbstar,a=e.xecco,s=e.xargpo,o=e.xinclo,c=e.xmo,l=e.xno,u=e.xnodeo,d,h,f,g,_,m,p,R,w,A,E,y,D,z,b,M,L,I,F,G,j,W,oe,q,ae,ce,he,me,Ge,Be,ye,O,ee,H,Ae,Z,Me,Pe,de,pe,C,be,Se,Ue,fe,ve,ge,Re,T,v,N,J,ne,X,Te,xe,Le=15e-13,x=n;x.isimp=0,x.method="n",x.aycof=0,x.con41=0,x.cc1=0,x.cc4=0,x.cc5=0,x.d2=0,x.d3=0,x.d4=0,x.delmo=0,x.eta=0,x.argpdot=0,x.omgcof=0,x.sinmao=0,x.t=0,x.t2cof=0,x.t3cof=0,x.t4cof=0,x.t5cof=0,x.x1mth2=0,x.x7thm1=0,x.mdot=0,x.nodedot=0,x.xlcof=0,x.xmcof=0,x.nodecf=0,x.irez=0,x.d2201=0,x.d2211=0,x.d3210=0,x.d3222=0,x.d4410=0,x.d4422=0,x.d5220=0,x.d5232=0,x.d5421=0,x.d5433=0,x.dedt=0,x.del1=0,x.del2=0,x.del3=0,x.didt=0,x.dmdt=0,x.dnodt=0,x.domdt=0,x.e3=0,x.ee2=0,x.peo=0,x.pgho=0,x.pho=0,x.pinco=0,x.plo=0,x.se2=0,x.se3=0,x.sgh2=0,x.sgh3=0,x.sgh4=0,x.sh2=0,x.sh3=0,x.si2=0,x.si3=0,x.sl2=0,x.sl3=0,x.sl4=0,x.gsto=0,x.xfact=0,x.xgh2=0,x.xgh3=0,x.xgh4=0,x.xh2=0,x.xh3=0,x.xi2=0,x.xi3=0,x.xl2=0,x.xl3=0,x.xl4=0,x.xlamo=0,x.zmol=0,x.zmos=0,x.atime=0,x.xli=0,x.xni=0,x.bstar=r,x.ecco=a,x.argpo=s,x.inclo=o,x.mo=c,x.no=l,x.nodeo=u,x.operationmode=t;var re=78/ln+1,ue=42/ln,Fe=ue*ue*ue*ue;x.init="y",x.t=0;var Ne={ecco:x.ecco,epoch:i,inclo:x.inclo,no:x.no,method:x.method,opsmode:x.operationmode},U=Zg(Ne),te=U.ao,P=U.con42,se=U.cosio,ie=U.cosio2,le=U.eccsq,Q=U.omeosq,Y=U.posq,we=U.rp,Ve=U.rteosq,Ke=U.sinio;if(x.no=U.no,x.con41=U.con41,x.gsto=U.gsto,x.a=Math.pow(x.no*Wg,-2/3),x.alta=x.a*(1+x.ecco)-1,x.altp=x.a*(1-x.ecco)-1,x.error=0,Q>=0||x.no>=0){if(x.isimp=0,we<220/ln+1&&(x.isimp=1),he=re,j=Fe,I=(we-1)*ln,I<156){he=I-78,I<98&&(he=20);var Ye=(120-he)/ln;j=Ye*Ye*Ye*Ye,he=he/ln+1}F=1/Y,ve=1/(te-he),x.eta=te*x.ecco*ve,y=x.eta*x.eta,E=x.ecco*x.eta,G=Math.abs(1-y),m=j*Math.pow(ve,4),p=m/Math.pow(G,3.5),g=p*x.no*(te*(1+1.5*y+E*(4+y))+.375*Fi*ve/G*x.con41*(8+3*y*(8+y))),x.cc1=x.bstar*g,_=0,x.ecco>1e-4&&(_=-2*m*ve*ki*x.no*Ke/x.ecco),x.x1mth2=1-ie,x.cc4=2*x.no*p*te*Q*(x.eta*(2+.5*y)+x.ecco*(.5+2*y)-Fi*ve/(te*G)*(-3*x.con41*(1-2*E+y*(1.5-.5*E))+.75*x.x1mth2*(2*y-E*(1+y))*Math.cos(2*x.argpo))),x.cc5=2*p*te*Q*(1+2.75*(y+E)+E*y),R=ie*ie,Se=1.5*Fi*F*x.no,Ue=.5*Se*Fi*F,fe=-.46875*qg*F*F*x.no,x.mdot=x.no+.5*Se*Ve*x.con41+.0625*Ue*Ve*(13-78*ie+137*R),x.argpdot=-.5*Se*P+.0625*Ue*(7-114*ie+395*R)+fe*(3-36*ie+49*R),Re=-Se*se,x.nodedot=Re+(.5*Ue*(4-19*ie)+2*fe*(3-7*ie))*se,ge=x.argpdot+x.nodedot,x.omgcof=x.bstar*_*Math.cos(x.argpo),x.xmcof=0,x.ecco>1e-4&&(x.xmcof=-ra*m*x.bstar/E),x.nodecf=3.5*Q*Re*x.cc1,x.t2cof=1.5*x.cc1,Math.abs(se+1)>15e-13?x.xlcof=-.25*ki*Ke*(3+5*se)/(1+se):x.xlcof=-.25*ki*Ke*(3+5*se)/Le,x.aycof=-.5*ki*Ke;var _t=1+x.eta*Math.cos(x.mo);if(x.delmo=_t*_t*_t,x.sinmao=Math.sin(x.mo),x.x7thm1=7*ie-1,2*Cn/x.no>=225){x.method="d",x.isimp=1,C=0,b=x.inclo;var yt={epoch:i,ep:x.ecco,argpp:x.argpo,tc:C,inclp:x.inclo,nodep:x.nodeo,np:x.no,e3:x.e3,ee2:x.ee2,peo:x.peo,pgho:x.pgho,pho:x.pho,pinco:x.pinco,plo:x.plo,se2:x.se2,se3:x.se3,sgh2:x.sgh2,sgh3:x.sgh3,sgh4:x.sgh4,sh2:x.sh2,sh3:x.sh3,si2:x.si2,si3:x.si3,sl2:x.sl2,sl3:x.sl3,sl4:x.sl4,xgh2:x.xgh2,xgh3:x.xgh3,xgh4:x.xgh4,xh2:x.xh2,xh3:x.xh3,xi2:x.xi2,xi3:x.xi3,xl2:x.xl2,xl3:x.xl3,xl4:x.xl4,zmol:x.zmol,zmos:x.zmos},Ee=$g(yt);x.e3=Ee.e3,x.ee2=Ee.ee2,x.peo=Ee.peo,x.pgho=Ee.pgho,x.pho=Ee.pho,x.pinco=Ee.pinco,x.plo=Ee.plo,x.se2=Ee.se2,x.se3=Ee.se3,x.sgh2=Ee.sgh2,x.sgh3=Ee.sgh3,x.sgh4=Ee.sgh4,x.sh2=Ee.sh2,x.sh3=Ee.sh3,x.si2=Ee.si2,x.si3=Ee.si3,x.sl2=Ee.sl2,x.sl3=Ee.sl3,x.sl4=Ee.sl4,h=Ee.sinim,d=Ee.cosim,w=Ee.em,A=Ee.emsq,W=Ee.s1,oe=Ee.s2,q=Ee.s3,ae=Ee.s4,ce=Ee.s5,me=Ee.ss1,Ge=Ee.ss2,Be=Ee.ss3,ye=Ee.ss4,O=Ee.ss5,ee=Ee.sz1,H=Ee.sz3,Ae=Ee.sz11,Z=Ee.sz13,Me=Ee.sz21,Pe=Ee.sz23,de=Ee.sz31,pe=Ee.sz33,x.xgh2=Ee.xgh2,x.xgh3=Ee.xgh3,x.xgh4=Ee.xgh4,x.xh2=Ee.xh2,x.xh3=Ee.xh3,x.xi2=Ee.xi2,x.xi3=Ee.xi3,x.xl2=Ee.xl2,x.xl3=Ee.xl3,x.xl4=Ee.xl4,x.zmol=Ee.zmol,x.zmos=Ee.zmos,L=Ee.nm,T=Ee.z1,v=Ee.z3,N=Ee.z11,J=Ee.z13,ne=Ee.z21,X=Ee.z23,Te=Ee.z31,xe=Ee.z33;var Kt={inclo:b,init:x.init,ep:x.ecco,inclp:x.inclo,nodep:x.nodeo,argpp:x.argpo,mp:x.mo,opsmode:x.operationmode},Bt=ju(x,Kt);x.ecco=Bt.ep,x.inclo=Bt.inclp,x.nodeo=Bt.nodep,x.argpo=Bt.argpp,x.mo=Bt.mp,D=0,z=0,M=0;var Zt={cosim:d,emsq:A,argpo:x.argpo,s1:W,s2:oe,s3:q,s4:ae,s5:ce,sinim:h,ss1:me,ss2:Ge,ss3:Be,ss4:ye,ss5:O,sz1:ee,sz3:H,sz11:Ae,sz13:Z,sz21:Me,sz23:Pe,sz31:de,sz33:pe,t:x.t,tc:C,gsto:x.gsto,mo:x.mo,mdot:x.mdot,no:x.no,nodeo:x.nodeo,nodedot:x.nodedot,xpidot:ge,z1:T,z3:v,z11:N,z13:J,z21:ne,z23:X,z31:Te,z33:xe,ecco:x.ecco,eccsq:le,em:w,argpm:D,inclm:b,mm:M,nm:L,nodem:z,irez:x.irez,atime:x.atime,d2201:x.d2201,d2211:x.d2211,d3210:x.d3210,d3222:x.d3222,d4410:x.d4410,d4422:x.d4422,d5220:x.d5220,d5232:x.d5232,d5421:x.d5421,d5433:x.d5433,dedt:x.dedt,didt:x.didt,dmdt:x.dmdt,dnodt:x.dnodt,domdt:x.domdt,del1:x.del1,del2:x.del2,del3:x.del3,xfact:x.xfact,xlamo:x.xlamo,xli:x.xli,xni:x.xni},nt=Kg(Zt);x.irez=nt.irez,x.atime=nt.atime,x.d2201=nt.d2201,x.d2211=nt.d2211,x.d3210=nt.d3210,x.d3222=nt.d3222,x.d4410=nt.d4410,x.d4422=nt.d4422,x.d5220=nt.d5220,x.d5232=nt.d5232,x.d5421=nt.d5421,x.d5433=nt.d5433,x.dedt=nt.dedt,x.didt=nt.didt,x.dmdt=nt.dmdt,x.dnodt=nt.dnodt,x.domdt=nt.domdt,x.del1=nt.del1,x.del2=nt.del2,x.del3=nt.del3,x.xfact=nt.xfact,x.xlamo=nt.xlamo,x.xli=nt.xli,x.xni=nt.xni}x.isimp!==1&&(f=x.cc1*x.cc1,x.d2=4*te*ve*f,be=x.d2*ve*x.cc1/3,x.d3=(17*te+he)*be,x.d4=.5*be*te*ve*(221*te+31*he)*x.cc1,x.t3cof=x.d2+2*f,x.t4cof=.25*(3*x.d3+x.cc1*(12*x.d2+10*f)),x.t5cof=.2*(3*x.d4+12*x.cc1*x.d3+6*x.d2*x.d2+15*f*(2*x.d2+f)))}$u(x,0),x.init="n"}function ev(n,e){var t="i",i=0,r=n.substring(2,7),a=parseInt(n.substring(18,20),10),s=parseFloat(n.substring(20,32)),o=parseFloat(n.substring(33,43)),c=parseFloat("".concat(n.substring(44,45),".").concat(n.substring(45,50),"E").concat(n.substring(50,52))),l=parseFloat("".concat(n.substring(53,54),".").concat(n.substring(54,59),"E").concat(n.substring(59,61))),u=parseFloat(e.substring(8,16))*Gr,d=parseFloat(e.substring(17,25))*Gr,h=parseFloat(".".concat(e.substring(26,33).replace(/\s/g,"0"))),f=parseFloat(e.substring(34,42))*Gr,g=parseFloat(e.substring(43,51))*Gr,_=parseFloat(e.substring(52,63))/jg,m=a<57?a+2e3:a+1900,p=Yg(m,s),R=p.mon,w=p.day,A=p.hr,E=p.minute,y=p.sec,D=Cc(m,R,w,A,E,y),z={error:i,satnum:r,epochyr:a,epochdays:s,ndot:o,nddot:c,bstar:l,inclo:u,nodeo:d,ecco:h,argpo:f,mo:g,no:_,jdsatepoch:D};return Qg(z,{opsmode:t,satn:z.satnum,epoch:z.jdsatepoch-24332815e-1,xbstar:z.bstar,xecco:z.ecco,xargpo:z.argpo,xinclo:z.inclo,xmo:z.mo,xno:z.no,xnodeo:z.nodeo}),z}function tv(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),i=1;i<e;i++)t[i-1]=arguments[i];var r=Cc.apply(void 0,t),a=(r-n.jdsatepoch)*Gg;return $u(n,a)}function nv(n,e){for(var t=6378.137,i=6356.7523142,r=Math.sqrt(n.x*n.x+n.y*n.y),a=(t-i)/t,s=2*a-a*a,o=Math.atan2(n.y,n.x)-e;o<-Cn;)o+=gt;for(;o>Cn;)o-=gt;for(var c=20,l=0,u=Math.atan2(n.z,Math.sqrt(n.x*n.x+n.y*n.y)),d;l++<c;)d=1/Math.sqrt(1-s*(Math.sin(u)*Math.sin(u))),u=Math.atan2(n.z+t*d*s*Math.sin(u),r);var h=r/Math.cos(u)-t*d;return{longitude:o,latitude:u,height:h}}function iv(n){for(const e of n)e.box=e.p.map(t=>{let i=180,r=-180,a=90,s=-90;for(const[o,c]of t[0])o<i&&(i=o),o>r&&(r=o),c<a&&(a=c),c>s&&(s=c);return[i,a,r,s]});return n}function tu(n,e,t){let i=!1;for(let r=0,a=n.length-1;r<n.length;a=r++){const[s,o]=n[r],[c,l]=n[a];o>t!=l>t&&e<(c-s)*(t-o)/(l-o)+s&&(i=!i)}return i}function fs(n,e,t){for(const i of n)for(let r=0;r<i.p.length;r++){const[a,s,o,c]=i.box[r];if(t<a||t>o||e<s||e>c)continue;const l=i.p[r];if(tu(l[0],t,e)&&!l.slice(1).some(u=>tu(u,t,e)))return i}return null}function rv(n,e=1){const t=[];for(const i of n)for(const r of i.p)for(const a of r)for(let s=1;s<a.length;s++){const[o,c]=a[s-1],[l,u]=a[s];if(Math.abs(l-o)>180)continue;const d=Math.max(1,Math.ceil(Math.max(Math.abs(l-o),Math.abs(u-c))/e));for(let h=0;h<d;h++){const f=h/d,g=(h+1)/d;t.push([c+(u-c)*f,o+(l-o)*f,c+(u-c)*g,o+(l-o)*g])}}return t}const av="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson",sv="https://api.wheretheiss.at/v1/satellites/25544/tles";function ov(n){return(n.features||[]).filter(e=>e.geometry&&Number.isFinite(e.properties?.mag)).map(e=>({id:e.id,mag:e.properties.mag,lng:e.geometry.coordinates[0],lat:e.geometry.coordinates[1],depth:e.geometry.coordinates[2],time:e.properties.time,place:e.properties.place||"",url:e.properties.url,tsunami:e.properties.tsunami===1})).sort((e,t)=>e.mag-t.mag)}function Ku(n,e=Date.now()){const t=Math.max(0,Math.round((e-n)/6e4));if(t<2)return"przed chwilą";if(t<60)return`${t} min temu`;const i=Math.round(t/60);if(i<24)return`${i} godz. temu`;const r=Math.round(i/24);return r===1?"wczoraj":`${r} dni temu`}function cv(n){return n>=7?"bardzo silne":n>=6?"silne":n>=5?"umiarkowane":n>=4?"lekkie":"słabe"}function Zu(n){return"M "+n.toFixed(1).replace(".",",")}function lv(n,e,t,i){const r=Math.acos(6371/(6371+t))*180/Math.PI;return Ec(n,e,i)>-r}function uv(n=new Date){return new Date(n.getTime()-864e5).toISOString().slice(0,10)}function dv(n,e){return`https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=VIIRS_SNPP_CorrectedReflectance_TrueColor,VIIRS_NOAA20_CorrectedReflectance_TrueColor&CRS=EPSG:4326&BBOX=-90,-180,90,180&WIDTH=${e}&HEIGHT=${e/2}&FORMAT=image/jpeg&TIME=${n}`}const hv=new k(0,0,1),nu=180/Math.PI,iu=6371;function ru(n,e){const t=new Float32Array(n.length*6);n.forEach(([r,a,s,o],c)=>{const l=dn(r,a,e),u=dn(s,o,e);t.set([l.x,l.y,l.z,u.x,u.y,u.z],c*6)});const i=new At;return i.setAttribute("position",new rn(t,3)),i}function Br(n,e){const t=[];for(let i=-180;i<=180;i+=1)t.push(dn(n,i,e));return new At().setFromPoints(t)}function au(n,{size:e=30,color:t="#ece7db",weight:i=500}={}){const r=`${i} ${e}px Outfit, system-ui, sans-serif`,a=document.createElement("canvas"),s=a.getContext("2d");s.font=r;const o=Math.ceil(s.measureText(n).width)+16;a.width=o,a.height=e+16,s.font=r,s.textBaseline="middle",s.lineWidth=5,s.strokeStyle="rgba(5,7,12,0.85)",s.strokeText(n,8,a.height/2),s.fillStyle=t,s.fillText(n,8,a.height/2);const c=new Lu(a);c.colorSpace=kt,c.minFilter=hn;const l=new Cu(new xc({map:c,transparent:!0,depthWrite:!1,depthTest:!1}));return l.userData.aspect=a.width/a.height,l.renderOrder=500,l}function fv(n){const e=document.createElement("canvas");e.width=e.height=64;const t=e.getContext("2d"),i=t.createRadialGradient(32,32,0,32,32,32);i.addColorStop(0,"rgba(255,255,255,1)"),i.addColorStop(.25,n),i.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=i,t.fillRect(0,0,64,64);const r=new Lu(e);r.colorSpace=kt;const a=new Cu(new xc({map:r,transparent:!0,depthWrite:!1,blending:Ii}));return a.renderOrder=510,a}function pv(n,{dataBase:e="data/",onCountries:t,onQuakes:i,onIss:r}){const a=n.layerRoot,s={borders:!1,grid:!1,quakes:!1,iss:!1};let o=[];const c=new An;c.visible=!1,a.add(c);const l=new pr({color:14673650,transparent:!0,opacity:.4,depthWrite:!1}),u=[];let d=null;function h(){return d||(d=fetch(e+"countries.json").then(Z=>Z.json()).then(async Z=>{o=iv(Z);const Me=new vl(ru(rv(o),1.0008),l);Me.renderOrder=400,c.add(Me),await document.fonts?.ready;for(const Pe of o){const de=au(Pe.n,{size:Pe.r<=2?34:28,weight:Pe.r<=2?600:500});de.position.copy(dn(Pe.ly,Pe.lx,1.004)),de.userData.base=de.position.clone(),de.userData.rank=Pe.r,de.userData.pop=Pe.pop||0,de.userData.normal=de.position.clone().normalize(),c.add(de),u.push(de)}return t?.(o),o}).catch(()=>{d=null}),d)}const f=new An;f.visible=!1,a.add(f);{const Me=(C,be)=>new Mf({color:C,transparent:!0,opacity:be,dashSize:.012,gapSize:.01,depthWrite:!1}),Pe=(C,be)=>{const Se=new Xo(C,be);Se.computeLineDistances(),Se.renderOrder=400,f.add(Se)};Pe(Br(0,1.0009),new pr({color:14988650,transparent:!0,opacity:.75,depthWrite:!1})),Pe(Br(23.44,1.0009),Me(15769696,.6)),Pe(Br(-23.44,1.0009),Me(15769696,.6)),Pe(Br(66.56,1.0009),Me(9425919,.6)),Pe(Br(-66.56,1.0009),Me(9425919,.6));const de=[];for(let C=-180;C<180;C+=15)for(let be=-80;be<80;be+=2)de.push([be,C,be+2,C]);const pe=new vl(ru(de,1.0009),new pr({color:16777215,transparent:!0,opacity:.13,depthWrite:!1}));pe.renderOrder=400,f.add(pe)}const g=2e3;let _=[];const m=new Jh(new vc(1,28),new vi({transparent:!0,opacity:.72,depthWrite:!1,side:Sn}),g);m.count=0,m.visible=!1,m.frustumCulled=!1,m.renderOrder=450,m.userData.pick={kind:"quake"},m.boundingSphere=new Nn(new k,1.2),a.add(m),n.addPickable(m);let p=null;function R(Z,Me){const Pe=(Me-Z.time)/36e5;return Pe<1?new it(16731469):Pe<24?new it(16751164):new it(15979130)}function w(){fetch(av).then(Z=>Z.json()).then(Z=>{_=ov(Z).slice(-g);const Me=Date.now();_.forEach((Pe,de)=>m.setColorAt(de,R(Pe,Me))),m.count=_.length,m.instanceColor&&(m.instanceColor.needsUpdate=!0),i?.(_,null)}).catch(()=>i?.(_,"Nie udało się pobrać danych USGS — sprawdź internet."))}const A=new k,E=new Gi,y=new k,D=new dt;function z(Z,Me){const Pe=Date.now();for(let de=0;de<_.length;de++){const pe=_[de];A.copy(dn(pe.lat,pe.lng,1.0005)),E.setFromUnitVectors(hv,A.clone().normalize());let C=(.0045+.0042*Math.pow(Math.max(0,pe.mag-2.4),1.35))*Z;Pe-pe.time<864e5&&(C*=1+.18*Math.sin(Me*3+de)),y.set(C,C,C),D.compose(A,E,y),m.setMatrixAt(de,D)}m.instanceMatrix.needsUpdate=!0}const b=new An;b.visible=!1,a.add(b);const M=fv("rgba(143,211,255,0.9)");M.userData.pick={kind:"iss"};const L=au("ISS",{size:30,color:"#bfe6ff",weight:600});b.add(M,L),n.addPickable(M);const I=new pr({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1});let F=null,G=null,j=null,W=0,oe=0;function q(){oe=Date.now(),fetch(sv).then(Z=>Z.json()).then(Z=>{G=ev(Z.line1,Z.line2),W=0}).catch(()=>{oe=0,r?.(null,"Nie udało się pobrać orbity ISS — sprawdź internet.")})}function ae(Z){const Me=tv(G,Z);if(!Me||!Me.position)return null;const Pe=nv(Me.position,Yu(Z)),de=Me.velocity;return{lat:Pe.latitude*nu,lng:Pe.longitude*nu,alt:Pe.height,speed:Math.hypot(de.x,de.y,de.z)*3600}}function ce(Z){F&&(b.remove(F),F.geometry.dispose());const Me=[],Pe=[];for(let pe=-40;pe<=92;pe+=.5){const C=ae(new Date(Z+pe*6e4));if(!C)continue;Me.push(dn(C.lat,C.lng,1+C.alt/iu));const be=pe<0?.25+.35*(1+pe/40):.9-.5*(pe/92);Pe.push(.56*be,.83*be,1*be)}const de=new At().setFromPoints(Me);de.setAttribute("color",new ht(Pe,3)),F=new Xo(de,I),F.renderOrder=480,b.add(F)}let he=0;const me=new k;function Ge(Z,Me){const Pe=Z<.05,de=Z>1.1?3:Z>.5?4:Z>.15?5:7,pe=Me.position.clone().normalize(),C=window.innerWidth,be=window.innerHeight,Se=Math.tan(Et.degToRad(Me.fov/2)),Ue=[],fe=u.filter(ve=>{const ge=!Pe&&ve.userData.rank<=de&&ve.userData.normal.dot(pe)>.3;return ge||(ve.visible=!1),ge});fe.sort((ve,ge)=>ve.userData.rank-ge.userData.rank||ge.userData.pop-ve.userData.pop),Be.set(0,1,0).applyQuaternion(Me.quaternion).applyQuaternion(a.getWorldQuaternion(ye).invert());for(const ve of fe){const ge=ve.userData.base;a.localToWorld(me.copy(ge));const Re=Me.position.distanceTo(me),T=ve.userData.rank<=2?15:13,v=T*1.6/be*2*Re*Se;ve.scale.set(v*ve.userData.aspect,v,1);const N=T*1.6*ve.userData.aspect/2,J=T*1.6/2;let ne=!1;for(const X of[0,.75,-.75]){ve.position.copy(ge).addScaledVector(Be,X*v),a.localToWorld(me.copy(ve.position)).project(Me);const Te=(me.x+1)/2*C,xe=(1-me.y)/2*be,Le=[Te-N,xe-J*.8,Te+N,xe+J*.8];if(!Ue.some(x=>Le[0]<x[2]&&Le[2]>x[0]&&Le[1]<x[3]&&Le[3]>x[1])){Ue.push(Le),ne=!0;break}}ve.visible=ne}}const Be=new k,ye=new Gi;let O=0;const ee=new sa,H=new k,Ae=new Nn(new k,1);return n.onFrame(({dt:Z,alt:Me,markerScale:Pe,camera:de})=>{if(O+=Z,s.borders&&u.length&&(l.opacity=.4*Et.smoothstep(Me,.004,.03),he=(he+1)%6,he===0&&Ge(Me,de)),s.quakes&&_.length&&z(Math.max(Pe,.004),O),s.iss&&G){const pe=Date.now(),C=ae(new Date(pe));if(C){j=C;const be=dn(C.lat,C.lng,1+C.alt/iu);M.position.copy(be);const Se=n.layerRoot.localToWorld(be.clone()),Ue=de.position.distanceTo(Se),fe=Et.clamp(Ue*.05,.004,.2);M.scale.set(fe,fe,1),L.position.copy(be).multiplyScalar(1+fe*.6),L.scale.set(fe*.6*L.userData.aspect,fe*.6,1),ee.set(de.position,Se.clone().sub(de.position).normalize());const ve=ee.intersectSphere(Ae,H);L.visible=!ve||de.position.distanceTo(ve)>Ue}pe-W>2e4&&(W=pe,ce(pe),r?.(j,null)),pe-oe>6*36e5&&q()}}),{get countries(){return o},loadCountries:h,setBorders(Z){s.borders=Z,c.visible=Z,Z&&h()},setGrid(Z){s.grid=Z,f.visible=Z},setQuakes(Z){s.quakes=Z,m.visible=Z,clearInterval(p),Z&&(w(),p=setInterval(w,10*6e4))},setIss(Z){s.iss=Z,b.visible=Z,Z&&!G&&q()},quake(Z){return _[Z]},get quakes(){return _},get iss(){return j}}}const mv=[{id:"all",label:"Wszystkie"},{id:"fav",label:"Ulubione"},{id:"p",label:"Polska"},{id:"d",label:"Niemcy"},{id:"m",label:"Miasta"},{id:"c",label:"Cuda i zabytki"},{id:"n",label:"Przyroda"},{id:"own",label:"Moje"}],xv=[["krakow","Kraków","Polska","p",50.0614,19.9366,"Europe/Warsaw","Rynek, Wawel i ciepły kamień starego miasta nad Wisłą."],["warszawa","Warszawa","Polska","p",52.2297,21.0122,"Europe/Warsaw","Odbudowana Starówka, Łazienki i panorama wieżowców nad Wisłą."],["gdansk","Gdańsk","Polska","p",54.352,18.6466,"Europe/Warsaw","Długi Targ, Żuraw nad Motławą i bursztynowe kamienice."],["wroclaw","Wrocław","Polska","p",51.1079,17.0385,"Europe/Warsaw","Miasto mostów i wysp na Odrze, z krasnalami na każdym rogu."],["torun","Toruń","Polska","p",53.0138,18.5984,"Europe/Warsaw","Gotyk z czerwonej cegły, miasto Kopernika i pierników."],["poznan","Poznań","Polska","p",52.4064,16.9252,"Europe/Warsaw","Kolorowy Stary Rynek i koziołki trykające się na ratuszu w południe."],["morskie-oko","Morskie Oko","Tatry, Polska","p",49.2013,20.071,"Europe/Warsaw","Największe jezioro Tatr pod ścianą Mięguszowieckich Szczytów."],["malbork","Zamek w Malborku","Polska","p",54.0398,19.0277,"Europe/Warsaw","Największy ceglany zamek świata, dawna stolica zakonu krzyżackiego."],["wieliczka","Kopalnia soli Wieliczka","Polska","p",49.983,20.055,"Europe/Warsaw","Komory, kaplice i jeziora wykute w soli setki metrów pod ziemią."],["bialowieza","Puszcza Białowieska","Polska i Białoruś","p",52.7008,23.8693,"Europe/Warsaw","Ostatni tak duży las nizinny Europy i dom żubrów."],["leba","Ruchome wydmy w Łebie","Słowiński PN, Polska","p",54.7631,17.5559,"Europe/Warsaw","Piaszczysta pustynia nad Bałtykiem, wędrująca nawet kilka metrów rocznie."],["tarnica","Tarnica","Bieszczady, Polska","p",49.0747,22.7264,"Europe/Warsaw","Najwyższy szczyt polskich Bieszczad, z widokiem na połoniny."],["zamosc","Zamość","Polska","p",50.7231,23.252,"Europe/Warsaw","Renesansowe „miasto idealne” Zamoyskich, z ormiańskimi kamienicami przy Rynku Wielkim."],["lublin","Lublin","Polska","p",51.2465,22.5684,"Europe/Warsaw","Stare Miasto na wzgórzu, zamek z kaplicą Świętej Trójcy i Brama Krakowska."],["lodz","Łódź","Polska","p",51.7592,19.456,"Europe/Warsaw","Fabrykanckie miasto z ulicą Piotrkowską i ceglanymi zakładami zamienionymi w lofty."],["szczecin","Szczecin","Polska","p",53.4285,14.5528,"Europe/Warsaw","Wały Chrobrego nad Odrą, Zamek Książąt Pomorskich i port blisko Bałtyku."],["kazimierz","Kazimierz Dolny","Polska","p",51.3214,21.9486,"Europe/Warsaw","Miasteczko artystów nad Wisłą, z ruinami zamku i lessowymi wąwozami."],["czestochowa","Jasna Góra","Częstochowa, Polska","p",50.8122,19.0973,"Europe/Warsaw","Klasztor paulinów z obrazem Czarnej Madonny, cel pielgrzymek z całej Polski."],["mikolajki","Mikołajki","Mazury, Polska","p",53.8031,21.5734,"Europe/Warsaw","Żeglarska stolica Mazur nad jeziorami Mikołajskim i Tałty."],["hel","Hel","Polska","p",54.608,18.8,"Europe/Warsaw","Koniec wąskiego półwyspu między Zatoką Gdańską a otwartym Bałtykiem."],["sniezka","Śnieżka","Karkonosze, Polska i Czechy","p",50.736,15.74,"Europe/Warsaw","Najwyższy szczyt Sudetów, 1603 m, z obserwatorium przypominającym latające spodki."],["szczeliniec","Szczeliniec Wielki","Góry Stołowe, Polska","p",50.4859,16.3392,"Europe/Warsaw","Labirynt piaskowcowych skał i szczelin na najwyższym szczycie Gór Stołowych."],["ksiaz","Zamek Książ","Wałbrzych, Polska","p",50.8423,16.2919,"Europe/Warsaw","Jeden z największych zamków w Polsce, na skale nad przełomem Pełcznicy."],["swidnica","Kościół Pokoju w Świdnicy","Polska","p",50.846,16.4818,"Europe/Warsaw","Ogromna drewniana świątynia z XVII wieku, wpisana na listę UNESCO."],["boleslawiec","Bolesławiec","Polska","p",51.2645,15.5697,"Europe/Warsaw","Miasto ceramiki w niebieskie wzory, znanej na całym świecie."],["eichendorf","Eichendorf","Dolna Bawaria, Niemcy","d",48.6336,12.8564,"Europe/Berlin","Gmina targowa w dolinie Vils, wśród pól i lasów powiatu Dingolfing-Landau."],["monachium","Monachium","Bawaria, Niemcy","d",48.1351,11.582,"Europe/Berlin","Stolica Bawarii: Marienplatz, Ogród Angielski i Oktoberfest na Theresienwiese."],["ratyzbona","Ratyzbona","Bawaria, Niemcy","d",49.0134,12.1016,"Europe/Berlin","Średniowieczne stare miasto nad Dunajem z kamiennym mostem z XII wieku."],["pasawa","Pasawa","Bawaria, Niemcy","d",48.5667,13.4319,"Europe/Berlin","Miasto trzech rzek, gdzie do Dunaju wpadają Inn i Ilz."],["dingolfing","Dingolfing","Dolna Bawaria, Niemcy","d",48.63,12.495,"Europe/Berlin","Miasto nad Izarą z jedną z największych fabryk BMW."],["landau-isar","Landau an der Isar","Dolna Bawaria, Niemcy","d",48.6747,12.6936,"Europe/Berlin","Miasteczko na skarpie nad doliną Izary."],["straubing","Straubing","Dolna Bawaria, Niemcy","d",48.8777,12.573,"Europe/Berlin","Miasto nad Dunajem z wieżą miejską na długim rynku i jarmarkiem Gäubodenvolksfest."],["las-bawarski","Las Bawarski","Bawaria, Niemcy","d",48.939,13.505,"Europe/Berlin","Najstarszy park narodowy Niemiec, przy granicy z Czechami."],["neuschwanstein","Zamek Neuschwanstein","Bawaria, Niemcy","d",47.5576,10.7498,"Europe/Berlin","Bajkowy zamek króla Ludwika II na skale u stóp Alp."],["zugspitze","Zugspitze","Bawaria, Niemcy","d",47.4211,10.9853,"Europe/Berlin","Najwyższy szczyt Niemiec, 2962 m, na granicy z Austrią."],["konigssee","Königssee","Bawaria, Niemcy","d",47.558,12.98,"Europe/Berlin","Wąskie, szmaragdowe jezioro wśród ścian Alp Berchtesgadeńskich."],["norymberga","Norymberga","Bawaria, Niemcy","d",49.4521,11.0767,"Europe/Berlin","Cesarski zamek nad czerwonymi dachami starego miasta i słynny jarmark bożonarodzeniowy."],["bamberg","Bamberg","Bawaria, Niemcy","d",49.8917,10.8917,"Europe/Berlin","Stare miasto z listy UNESCO, z ratuszem na wyspie pośrodku rzeki Regnitz."],["rothenburg","Rothenburg ob der Tauber","Bawaria, Niemcy","d",49.3772,10.1866,"Europe/Berlin","Średniowieczne miasteczko otoczone murami, z szachulcowymi domami."],["berlin","Berlin","Niemcy","d",52.52,13.405,"Europe/Berlin","Brama Brandenburska, ślady muru i jedna z najbardziej zielonych stolic Europy."],["drezno","Drezno","Saksonia, Niemcy","d",51.0504,13.7373,"Europe/Berlin","Barokowa „Florencja nad Łabą”, z odbudowanym kościołem Frauenkirche."],["hamburg","Hamburg","Niemcy","d",53.5511,9.9937,"Europe/Berlin","Wielki port nad Łabą, ceglane magazyny Speicherstadt i filharmonia nad wodą."],["kolonia","Kolonia","Nadrenia, Niemcy","d",50.9375,6.9603,"Europe/Berlin","Gotycka katedra nad Renem, budowana przez ponad 600 lat."],["barcelona","Barcelona","Katalonia, Hiszpania","m",41.3874,2.1686,"Europe/Madrid","Gotyckie zaułki, Sagrada Família i światło latarni nad morzem."],["paryz","Paryż","Francja","m",48.8566,2.3522,"Europe/Paris","Bulwary nad Sekwaną i wieża Eiffla rozświetlana co godzinę po zmroku."],["londyn","Londyn","Wielka Brytania","m",51.5074,-.1278,"Europe/London","Tamiza, Big Ben i miasto, przez które biegnie południk zerowy."],["rzym","Rzym","Włochy","m",41.9028,12.4964,"Europe/Rome","Fora, fontanny i trzy tysiące lat historii na siedmiu wzgórzach."],["wenecja","Wenecja","Włochy","m",45.4408,12.3155,"Europe/Rome","Miasto na ponad stu wyspach, gdzie ulicami są kanały."],["lizbona","Lizbona","Portugalia","m",38.7223,-9.1393,"Europe/Lisbon","Żółte tramwaje na stromych wzgórzach i ujście Tagu do Atlantyku."],["praga","Praga","Czechy","m",50.0755,14.4378,"Europe/Prague","Most Karola, Hradczany i zegar astronomiczny na Rynku Staromiejskim."],["wieden","Wiedeń","Austria","m",48.2082,16.3738,"Europe/Vienna","Pałace Habsburgów, kawiarnie i walce w sali Musikvereinu."],["amsterdam","Amsterdam","Holandia","m",52.3676,4.9041,"Europe/Amsterdam","Pierścienie kanałów, wąskie kamienice i więcej rowerów niż mieszkańców."],["reykjavik","Reykjavík","Islandia","m",64.1466,-21.9426,"Atlantic/Reykjavik","Najdalej na północ położona stolica państwa, zimą pod zorzą polarną."],["tromso","Tromsø","Norwegia","m",69.6492,18.9553,"Europe/Oslo","Za kołem podbiegunowym: noc polarna zimą, słońce o północy latem."],["stambul","Stambuł","Turcja","m",41.0082,28.9784,"Europe/Istanbul","Miasto na dwóch kontynentach nad cieśniną Bosfor."],["kair","Kair","Egipt","m",30.0444,31.2357,"Africa/Cairo","Największe miasto świata arabskiego, rozciągnięte wzdłuż Nilu."],["marrakesz","Marrakesz","Maroko","m",31.6295,-7.9811,"Africa/Casablanca","Czerwone mury medyny i zapach przypraw na placu Dżamaa al-Fana."],["kapsztad","Kapsztad","Republika Południowej Afryki","m",-33.9249,18.4241,"Africa/Johannesburg","Góra Stołowa nad zatoką, niedaleko Przylądka Dobrej Nadziei."],["dubaj","Dubaj","Zjednoczone Emiraty Arabskie","m",25.2048,55.2708,"Asia/Dubai","Burdż Chalifa, najwyższy budynek świata, wyrasta prosto z pustyni."],["tokio","Tokio","Japonia","m",35.6762,139.6503,"Asia/Tokyo","Największa aglomeracja świata — neony Shinjuku i ciche świątynie obok."],["kioto","Kioto","Japonia","m",35.0116,135.7681,"Asia/Tokyo","Dawna stolica: świątynie, klonowe ogrody i drewniane uliczki Gion."],["singapur","Singapur","Singapur","m",1.3521,103.8198,"Asia/Singapore","Miasto-państwo tuż przy równiku, z ogrodami wśród wieżowców."],["hongkong","Hongkong","Chiny","m",22.3193,114.1694,"Asia/Hong_Kong","Las wieżowców między górami a portem Wiktorii."],["bangkok","Bangkok","Tajlandia","m",13.7563,100.5018,"Asia/Bangkok","Złote świątynie, pływające targi i rzeka Menam."],["sydney","Sydney","Australia","m",-33.8688,151.2093,"Australia/Sydney","Port, muszle Opery i most Harbour Bridge nad zatoką."],["nowy-jork","Nowy Jork","Stany Zjednoczone","m",40.7128,-74.006,"America/New_York","Siatka ulic Manhattanu i światła mostów nad East River."],["san-francisco","San Francisco","Stany Zjednoczone","m",37.7749,-122.4194,"America/Los_Angeles","Golden Gate we mgle i strome ulice z tramwajami linowymi."],["vancouver","Vancouver","Kanada","m",49.2827,-123.1207,"America/Vancouver","Miasto między oceanem a ośnieżonymi Górami Nadbrzeżnymi."],["meksyk","Meksyk","Meksyk","m",19.4326,-99.1332,"America/Mexico_City","Ogromna stolica na miejscu azteckiego Tenochtitlán, 2240 m n.p.m."],["hawana","Hawana","Kuba","m",23.1136,-82.3666,"America/Havana","Kolonialne fasady, stare amerykańskie auta i nadmorski Malecón."],["rio","Rio de Janeiro","Brazylia","m",-22.9068,-43.1729,"America/Sao_Paulo","Głowa Cukru, Copacabana i Chrystus Odkupiciel na szczycie Corcovado."],["buenos-aires","Buenos Aires","Argentyna","m",-34.6037,-58.3816,"America/Argentina/Buenos_Aires","Tango w San Telmo i szerokie aleje nad estuarium La Platy."],["kopenhaga","Kopenhaga","Dania","m",55.6761,12.5683,"Europe/Copenhagen","Kolorowe domy nad kanałem Nyhavn i miasto, w którym wszędzie dojedziesz rowerem."],["sztokholm","Sztokholm","Szwecja","m",59.3293,18.0686,"Europe/Stockholm","Stolica rozłożona na kilkunastu wyspach, ze średniowieczną Gamla Stan."],["budapeszt","Budapeszt","Węgry","m",47.4979,19.0402,"Europe/Budapest","Buda i Peszt po obu stronach Dunaju, parlament nad rzeką i termalne łaźnie."],["edynburg","Edynburg","Szkocja, Wielka Brytania","m",55.9533,-3.1883,"Europe/London","Zamek na wulkanicznej skale nad Royal Mile i stare miasto z kamienia."],["dublin","Dublin","Irlandia","m",53.3498,-6.2603,"Europe/Dublin","Georgiańskie drzwi, puby Temple Bar i rzeka Liffey."],["wilno","Wilno","Litwa","m",54.6872,25.2797,"Europe/Vilnius","Barokowe stare miasto, Ostra Brama i wzgórze Giedymina."],["lwow","Lwów","Ukraina","m",49.8397,24.0297,"Europe/Kyiv","Rynek z ratuszem, kamienice wielu kultur i słynne kawiarnie."],["jerozolima","Jerozolima","Bliski Wschód","m",31.7683,35.2137,"Asia/Jerusalem","Stare Miasto święte dla trzech religii, otoczone kamiennymi murami."],["mumbaj","Mumbaj","Indie","m",19.076,72.8777,"Asia/Kolkata","Finansowe serce Indii z Bramą Indii nad Morzem Arabskim i Bollywood."],["pekin","Pekin","Chiny","m",39.9042,116.4074,"Asia/Shanghai","Stolica Chin z placem Tiananmen, hutongami i Zakazanym Miastem."],["szanghaj","Szanghaj","Chiny","m",31.2304,121.4737,"Asia/Shanghai","Bulwar Bund naprzeciw wieżowców Pudong nad rzeką Huangpu."],["seul","Seul","Korea Południowa","m",37.5665,126.978,"Asia/Seoul","Pałace dynastii Joseon wśród neonów i gór otaczających miasto."],["nairobi","Nairobi","Kenia","m",-1.2921,36.8219,"Africa/Nairobi","Stolica z parkiem narodowym, w którym żyrafy pasą się na tle wieżowców."],["chicago","Chicago","Stany Zjednoczone","m",41.8781,-87.6298,"America/Chicago","Kolebka drapaczy chmur nad jeziorem Michigan."],["los-angeles","Los Angeles","Stany Zjednoczone","m",34.0522,-118.2437,"America/Los_Angeles","Hollywood, plaże Pacyfiku i miasto rozlane między górami a oceanem."],["toronto","Toronto","Kanada","m",43.6532,-79.3832,"America/Toronto","Największe miasto Kanady z wieżą CN Tower nad jeziorem Ontario."],["auckland","Auckland","Nowa Zelandia","m",-36.8485,174.7633,"Pacific/Auckland","Miasto żagli na przesmyku między dwoma morzami, wśród dawnych wulkanów."],["giza","Piramidy w Gizie","Egipt","c",29.9792,31.1342,"Africa/Cairo","Jedyny z siedmiu cudów świata starożytnego, który przetrwał do dziś."],["petra","Petra","Jordania","c",30.3285,35.4444,"Asia/Amman","Miasto Nabatejczyków wykute w różowym piaskowcu."],["wielki-mur","Wielki Mur (Mutianyu)","Chiny","c",40.4319,116.5704,"Asia/Shanghai","Odcinek muru wijący się po zalesionych grzbietach na północ od Pekinu."],["tadz-mahal","Tadż Mahal","Agra, Indie","c",27.1751,78.0421,"Asia/Kolkata","Marmurowe mauzoleum wzniesione przez szacha Dżahana dla zmarłej żony."],["koloseum","Koloseum","Rzym, Włochy","c",41.8902,12.4922,"Europe/Rome","Amfiteatr na około 50 tysięcy widzów, otwarty w 80 roku n.e."],["machu-picchu","Machu Picchu","Peru","c",-13.1631,-72.545,"America/Lima","Inkaskie miasto na grzbiecie Andów, odkryte dla świata w 1911 roku."],["chichen-itza","Chichén Itzá","Jukatan, Meksyk","c",20.6843,-88.5678,"America/Merida","Piramida Kukulkana, po której w równonoc pełznie świetlny wąż."],["angkor-wat","Angkor Wat","Kambodża","c",13.4125,103.867,"Asia/Phnom_Penh","Największa świątynia świata, otoczona fosą i dżunglą."],["akropol","Akropol","Ateny, Grecja","c",37.9715,23.7257,"Europe/Athens","Partenon na skalistym wzgórzu nad Atenami."],["stonehenge","Stonehenge","Anglia, Wielka Brytania","c",51.1789,-1.8262,"Europe/London","Krąg kamieni ustawiony ponad 4500 lat temu, zgrany z przesileniami."],["rapa-nui","Posągi moai","Rapa Nui (Wyspa Wielkanocna), Chile","c",-27.1127,-109.3497,"Pacific/Easter","Kamienne głowy na jednej z najbardziej odludnych zamieszkanych wysp."],["sagrada","Sagrada Família","Barcelona, Hiszpania","c",41.4036,2.1744,"Europe/Madrid","Bazylika Gaudíego budowana od 1882 roku."],["alhambra","Alhambra","Grenada, Hiszpania","c",37.1761,-3.5881,"Europe/Madrid","Mauretański pałac z dziedzińcami, fontannami i arabeskami pod Sierra Nevada."],["mont-saint-michel","Mont-Saint-Michel","Normandia, Francja","c",48.6361,-1.5115,"Europe/Paris","Opactwo na skalistej wyspie, którą przypływ odcina od lądu."],["hagia-sophia","Hagia Sophia","Stambuł, Turcja","c",41.0086,28.9802,"Europe/Istanbul","Bizantyjska świątynia z VI wieku z ogromną kopułą."],["kreml","Kreml i plac Czerwony","Moskwa, Rosja","c",55.7539,37.6208,"Europe/Moscow","Czerwone mury twierdzy i kolorowe kopuły soboru Wasyla Błogosławionego."],["zakazane-miasto","Zakazane Miasto","Pekin, Chiny","c",39.9163,116.3972,"Asia/Shanghai","Pałac cesarzy Chin z setkami budynków za purpurowymi murami."],["borobudur","Borobudur","Jawa, Indonezja","c",-7.6079,110.2038,"Asia/Jakarta","Największa świątynia buddyjska świata, z setkami stup i płaskorzeźb."],["abu-simbel","Abu Simbel","Egipt","c",22.3372,31.6258,"Africa/Cairo","Świątynie Ramzesa II, przeniesione w całości przed zalaniem przez Jezioro Nasera."],["statua-wolnosci","Statua Wolności","Nowy Jork, Stany Zjednoczone","c",40.6892,-74.0445,"America/New_York","Miedziany posąg, dar Francji, witający statki u wejścia do portu."],["teotihuacan","Teotihuacán","Meksyk","c",19.6925,-98.8438,"America/Mexico_City","Piramidy Słońca i Księżyca przy Alei Zmarłych, starsze od Azteków."],["wielki-kanion","Wielki Kanion","Arizona, Stany Zjednoczone","n",36.0544,-112.1401,"America/Phoenix","Rzeka Kolorado wyrzeźbiła wąwóz głęboki na prawie 1,9 km."],["niagara","Wodospad Niagara","Kanada i Stany Zjednoczone","n",43.0962,-79.0377,"America/Toronto","Trzy wodospady na granicy, z ogromnym przepływem wody."],["everest","Mount Everest","Nepal i Chiny","n",27.9881,86.925,"Asia/Kathmandu","Najwyższy szczyt Ziemi, 8849 m nad poziomem morza."],["wiktoria","Wodospad Wiktorii","Zambia i Zimbabwe","n",-17.9243,25.8572,"Africa/Harare","Zambezi spada ponad stumetrowym progiem; miejscowi mówią o „dymie, który grzmi”."],["kilimandzaro","Kilimandżaro","Tanzania","n",-3.0674,37.3556,"Africa/Dar_es_Salaam","Najwyższa góra Afryki, wulkan ze śniegiem niemal na równiku."],["serengeti","Serengeti","Tanzania","n",-2.3333,34.8333,"Africa/Dar_es_Salaam","Sawanna wielkiej wędrówki gnu i zebr."],["sahara","Erg Chebbi","Sahara, Maroko","n",31.15,-3.9667,"Africa/Casablanca","Pomarańczowe wydmy na skraju największej gorącej pustyni świata."],["galapagos","Galápagos","Ekwador","n",-.9538,-90.9656,"Pacific/Galapagos","Wulkaniczne wyspy żółwi olbrzymich, które zainspirowały Darwina."],["iguazu","Wodospady Iguazú","Argentyna i Brazylia","n",-25.6953,-54.4367,"America/Argentina/Buenos_Aires","Ponad 270 kaskad w podzwrotnikowym lesie, z Gardzielą Diabła."],["rafa","Wielka Rafa Koralowa","Australia","n",-18.2871,147.6992,"Australia/Brisbane","Największa struktura zbudowana przez organizmy żywe, widoczna z orbity."],["uluru","Uluru","Australia","n",-25.3444,131.0369,"Australia/Darwin","Święta skała Anangu, czerwieniejąca o zachodzie słońca."],["ha-long","Zatoka Ha Long","Wietnam","n",20.9101,107.1839,"Asia/Ho_Chi_Minh","Prawie dwa tysiące wapiennych wysp wyrastających z morza."],["bajkal","Bajkał","Syberia, Rosja","n",53.5587,108.165,"Asia/Irkutsk","Najgłębsze jezioro świata, z około 20% słodkiej wody powierzchniowej Ziemi."],["geiranger","Geirangerfjord","Norwegia","n",62.1049,7.0947,"Europe/Oslo","Wąski fiord wśród stromych ścian i wodospadów."],["santorini","Santorini","Grecja","n",36.3932,25.4615,"Europe/Athens","Białe domy na krawędzi kaldery po wybuchu wulkanu sprzed 3600 lat."],["antarktyda","Biegun Południowy","Antarktyda","n",-90,0,"Antarctica/McMurdo","Lodowa wyżyna na wysokości 2800 m, gdzie zbiegają się wszystkie południki."],["fudzi","Fudżi","Japonia","n",35.3606,138.7274,"Asia/Tokyo","Najwyższa góra Japonii, 3776 m — symetryczny wulkan widoczny z Tokio w pogodne dni."],["matterhorn","Matterhorn","Szwajcaria i Włochy","n",45.9763,7.6586,"Europe/Zurich","Ostra piramida skalna nad Zermatt, jeden z najsłynniejszych szczytów Alp."],["tre-cime","Tre Cime di Lavaredo","Dolomity, Włochy","n",46.6187,12.3022,"Europe/Rome","Trzy pionowe turnie z jasnego dolomitu, ikona włoskich Alp."],["plitwice","Jeziora Plitwickie","Chorwacja","n",44.8654,15.582,"Europe/Zagreb","Kaskada turkusowych jezior połączonych wodospadami."],["etna","Etna","Sycylia, Włochy","n",37.751,14.9934,"Europe/Rome","Najwyższy czynny wulkan Europy, wciąż regularnie wybuchający."],["kapadocja","Kapadocja","Turcja","n",38.6431,34.8289,"Europe/Istanbul","Kominy skalne, podziemne miasta i balony nad doliną o świcie."],["morze-martwe","Morze Martwe","Bliski Wschód","n",31.559,35.4732,"Asia/Jerusalem","Słone jezioro w najniższym miejscu na lądzie, ponad 400 m poniżej poziomu morza."],["jokulsarlon","Jökulsárlón","Islandia","n",64.0784,-16.2306,"Atlantic/Reykjavik","Laguna, po której dryfują góry lodowe oderwane od lodowca."],["yellowstone","Yellowstone","Stany Zjednoczone","n",44.4605,-110.8281,"America/Denver","Pierwszy park narodowy świata, z gejzerem Old Faithful."],["yosemite","Yosemite","Kalifornia, Stany Zjednoczone","n",37.8651,-119.5383,"America/Los_Angeles","Granitowe ściany El Capitan i Half Dome nad doliną z wodospadami."],["uyuni","Salar de Uyuni","Boliwia","n",-20.1338,-67.4891,"America/La_Paz","Największa solna równina świata — po deszczu zmienia się w lustro nieba."],["perito-moreno","Lodowiec Perito Moreno","Patagonia, Argentyna","n",-50.4967,-73.1377,"America/Argentina/Rio_Gallegos","Lodowa ściana nad jeziorem, z której z hukiem odpadają bloki lodu."],["torres-del-paine","Torres del Paine","Patagonia, Chile","n",-50.9423,-73.4068,"America/Punta_Arenas","Granitowe wieże nad jeziorami i lodowcami na końcu Andów."],["manaus","Spotkanie wód","Amazonia, Brazylia","n",-3.1395,-59.8975,"America/Manaus","Ciemna Rio Negro i piaszczysta Solimões płyną obok siebie, zanim się zmieszają."],["okawango","Delta Okawango","Botswana","n",-19.3,22.9,"Africa/Gaborone","Śródlądowa delta na Kalahari, która co roku zalewa się wodą i ożywa."],["baobaby","Aleja Baobabów","Madagaskar","n",-20.2508,44.4184,"Indian/Antananarivo","Szpaler wielkich baobabów przy drodze, najpiękniejszy o zachodzie słońca."],["aoraki","Aoraki / Mount Cook","Nowa Zelandia","n",-43.595,170.1418,"Pacific/Auckland","Najwyższy szczyt Nowej Zelandii w Alpach Południowych."],["biegun-polnocny","Biegun Północny","Arktyka","n",90,0,null,"Dryfujący lód na Oceanie Arktycznym — stąd każdy kierunek prowadzi na południe."]],Hr=xv.map(([n,e,t,i,r,a,s,o])=>({id:n,name:e,region:t,cat:i,lat:r,lng:a,tz:s,blurb:o})),Ce=n=>document.querySelector(n),gv=Ka.isNativePlatform(),Yt={get(n,e){try{const t=localStorage.getItem("meridian-"+n);return t==null?e:JSON.parse(t)}catch{return e}},set(n,e){try{localStorage.setItem("meridian-"+n,JSON.stringify(e))}catch{}}},vt={real:!0,clouds:!0,spin:!0,tiles:!0,labels:!0,...Yt.get("settings",{})},qt={borders:!0,grid:!1,quakes:!1,iss:!0,photo:!1,...Yt.get("layers",{})},Yn=new Set(Yt.get("favorites",[]));let fr=Yt.get("own",[]).filter(n=>n&&n.name&&Number.isFinite(n.lat)&&Number.isFinite(n.lng)),Rt=Yt.get("home",null);const Ui=Yt.get("best",{}),wr=()=>Hr.concat(fr.map(n=>({...n,cat:"own",region:"Moje miejsce",tz:null,blurb:""}))),Rc=n=>wr().find(e=>e.id===n),Ri=n=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${n}</svg>`,un={tour:Ri('<path d="M3 11l18-8-8 18-2-8-8-2z"/>'),quiz:Ri('<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7"/><path d="M12 17h.01"/>'),settings:Ri('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),close:Ri('<path d="M6 6l12 12M18 6L6 18"/>'),star:Ri('<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),stop:Ri('<rect x="6" y="6" width="12" height="12" rx="2"/>'),layers:Ri('<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>')};Ce("#btn-layers").innerHTML=un.layers;Ce("#btn-tour").innerHTML=un.tour;Ce("#btn-quiz").innerHTML=un.quiz;Ce("#btn-settings").innerHTML=un.settings;Ce("#version").textContent="wersja 1.3.0";let pt=null,wt="places";const Oe=Vg(Ce("#view"),{onPlace:n=>{wt==="places"&&la(n,{scroll:!0})},onGround:n=>{wt==="quiz"?Rv(n):wt==="places"&&Mv(n)},onTiles:n=>Ce("#attrib").hidden=!n,onPick:(n,e)=>{if(!(wt!=="places"&&wt!=="layers"))if(n.kind==="quake"){const t=bt.quake(e);t&&ss({type:"quake",id:t.id})}else n.kind==="iss"&&ss({type:"iss"})}}),bt=pv(Oe,{onCountries:()=>{pt?.type==="point"&&sn()},onQuakes:(n,e)=>Oi("quakes",e),onIss:(n,e)=>{Oi("iss",e),pt?.type==="iss"&&wt==="places"&&sn()}});Ce("#zoom-in").onclick=()=>Oe.zoomBy(.4);Ce("#zoom-out").onclick=()=>Oe.zoomBy(2.5);Oe.whenReady(()=>Ce("#loading").classList.add("done"));let Yr=0;const rs=()=>new Date(Date.now()+Yr*36e5),vv=new Intl.DateTimeFormat("pl-PL",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});function Pc(){Oe.setSun(vt.real);const n=Gu(rs());Oe.setSubsolar(n.lat,n.lng);const e=Yr?` <b>${Yr>0?"+":"−"}${Ju(Math.abs(Yr))}</b>`:"";Ce("#clock").innerHTML=vt.real?vv.format(rs())+e:"Zawsze dzień"}function Ju(n){const e=Math.floor(n),t=Math.round((n-e)*60);return t?`${e} h ${t} min`:`${e} h`}function _v(){Pc(),wt==="places"&&(Mi(),sn())}setInterval(_v,3e4);let En=Yt.get("filter","all"),Qu="";const su=n=>n.toLowerCase().normalize("NFD").replace(new RegExp("\\p{Diacritic}","gu"),"").replace(/ł/g,"l");function Lc(){const n=su(Qu.trim());return wr().filter(e=>En==="fav"&&!Yn.has(e.id)||En!=="all"&&En!=="fav"&&e.cat!==En?!1:!n||su(e.name+" "+e.region).includes(n))}function $r(){const n=wr(),e=t=>t==="all"?n.length:t==="fav"?n.filter(i=>Yn.has(i.id)).length:n.filter(i=>i.cat===t).length;Ce("#chips").innerHTML="";for(const t of mv){const i=e(t.id);if(!i&&(t.id==="fav"||t.id==="own")&&En!==t.id)continue;const r=document.createElement("button");r.type="button",r.className="chip"+(En===t.id?" on":""),r.setAttribute("role","tab"),r.setAttribute("aria-selected",String(En===t.id)),r.innerHTML=`${t.label}<small>${i}</small>`,r.onclick=()=>{En=t.id,Yt.set("filter",En),$r(),Mi()},Ce("#chips").appendChild(r)}}function yv(n){return n>0?"":n>-6?"dusk":"night"}function Mi(){const n=Ce("#list"),e=Lc(),t=rs();if(n.innerHTML="",!e.length){n.innerHTML=`<li class="empty">${En==="fav"?"Nie masz jeszcze ulubionych. Otwórz miejsce i dotknij gwiazdki.":En==="own"?"Dotknij globusu w dowolnym punkcie, żeby dodać własne miejsce.":"Nic nie pasuje do wyszukiwania."}</li>`;return}for(const i of e){const r=document.createElement("li"),a=document.createElement("button");a.type="button",a.dataset.id=i.id;const s=pt?.type==="place"&&pt.id===i.id;a.className=s?"on":"";const o=Ec(i.lat,i.lng,t);a.innerHTML=`<i class="mark${i.cat==="own"?" own":""}"></i><span class="copy"><strong></strong><span class="sub"></span></span><span class="time"><i class="sun-dot ${yv(o)}"></i>${Xu(t,i.tz,i.lng)}</span>`,a.querySelector("strong").textContent=i.name,a.querySelector(".sub").textContent=i.region,a.onclick=()=>{Fn(),la(i.id)},r.appendChild(a),n.appendChild(r)}}Ce("#q").addEventListener("input",n=>{Qu=n.target.value,Mi()});Ce("#q").addEventListener("keydown",n=>{if(n.key==="Enter"){const e=Lc()[0];e&&la(e.id),n.target.blur()}});function la(n,{scroll:e=!1,fly:t=!0}={}){const i=Rc(n);if(i){if(pt?.type==="place"&&pt.id===n&&!Bi){Un();return}pt={type:"place",id:n},Oe.setPin("tap",null),Oe.select(n,{fly:t}),as(i),sn(),Mi(),e&&Ce(`#list button[data-id="${CSS.escape(n)}"]`)?.scrollIntoView({block:"nearest",behavior:"smooth"})}}function Mv(n){Fn(),pt={type:"point",lat:n.lat,lng:n.lng},Oe.select(null,{fly:!1}),Oe.setPin("tap",n,9425919),as(n),sn(),Mi(),aa()==="mini"&&mn("peek")}function Un(){pt=null,Oe.select(null,{fly:!1}),Oe.setPin("tap",null),Oe.setArc(null),Oe.release(),sn(),Mi()}function as(n){Rt&&n&&Tc(Rt.lat,Rt.lng,n.lat,n.lng)>30?Oe.setArc(Rt,n):Oe.setArc(null)}function ou(n,e,t,i=!0){const r=rs(),a=Ec(n,e,r),s=Xu(r,t,e),o=[`<span>${t?"Czas lokalny":"Czas słoneczny (przybliżony)"}: <b>${s}</b></span>`,`<span>Teraz: <b>${wg(a)}</b></span>`];if(Rt){const c=Tc(Rt.lat,Rt.lng,n,e);c>30?o.push(`<span class="km">Od mojego punktu: <b>${Wu(c)}</b> · lot ok. ${Sg(Mg(c))}</span>`):o.push('<span class="km">To jest <b>tuż obok</b> twojego punktu</span>')}return i&&o.push(`<span>${ca(n,e)}</span>`),`<div class="facts">${o.join("")}</div>`}function sn(){const n=Ce("#detail");if(!pt){n.innerHTML='<p class="hint">Przeciągnij globus, szczypnij, przewiń albo dotknij dwa razy, żeby przybliżyć — z bliska widać zdjęcia satelitarne. Dotknij świecącego znacznika lub miejsca z listy — kamera tam doleci. Dotknij dowolnego punktu Ziemi, żeby sprawdzić, która tam godzina.</p>';return}if(pt.type==="place"){const s=Rc(pt.id);if(!s)return Un();const o=Yn.has(s.id);n.innerHTML=`<div class="card">
      <div class="card-head"><div><p class="region"></p><h2></h2></div>
      <button class="star${o?" on":""}" type="button" aria-pressed="${o}" aria-label="${o?"Usuń z ulubionych":"Dodaj do ulubionych"}">${un.star}</button></div>
      ${s.blurb?'<p class="blurb"></p>':""}
      ${ou(s.lat,s.lng,s.tz)}
      <div class="card-actions">
        <button class="ghost small" data-act="close" type="button">Zamknij</button>
        <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
        <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
        ${s.cat==="own"?'<button class="ghost small danger" data-act="delete" type="button">Usuń miejsce</button>':""}
      </div></div>`,n.querySelector(".region").textContent=s.region,n.querySelector("h2").textContent=s.name,s.blurb&&(n.querySelector(".blurb").textContent=s.blurb),n.querySelector(".star").onclick=()=>{Yn.has(s.id)?Yn.delete(s.id):Yn.add(s.id),Yt.set("favorites",[...Yn]),sn(),$r()},n.querySelector('[data-act="close"]').onclick=Un,n.querySelector('[data-act="home"]').onclick=()=>cs({lat:s.lat,lng:s.lng,label:s.name}),n.querySelector('[data-act="zoom"]').onclick=()=>$o(s),n.querySelector('[data-act="delete"]')?.addEventListener("click",()=>{fr=fr.filter(c=>c.id!==s.id),Yn.delete(s.id),Yt.set("own",fr),Yt.set("favorites",[...Yn]),Oe.setPlaces(wr()),Un(),$r(),ri(`Usunięto „${s.name}”.`)});return}if(pt.type==="quake")return bv(n);if(pt.type==="iss")return Sv(n);const{lat:e,lng:t}=pt,i=bt.countries.length?fs(bt.countries,e,t):null,r=i?gr(i.n)+(i.cap?" · stolica: "+gr(i.cap):""):bt.countries.length?"Morze albo ocean":"Wybrany punkt";n.innerHTML=`<div class="card">
    <p class="region">${r}</p><h2>${ca(e,t).replace(/\s{3}/,", ")}</h2>
    ${ou(e,t,null,!1)}
    <form class="name-form" hidden><input type="text" maxlength="40" placeholder="Nazwa miejsca" aria-label="Nazwa miejsca" required /><button class="solid" type="submit">Zapisz</button></form>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
      <button class="ghost small" data-act="add" type="button">Dodaj do moich miejsc</button>
      <button class="ghost small" data-act="home" type="button">Ustaw jako mój punkt</button>
    </div></div>`;const a=n.querySelector(".name-form");n.querySelector('[data-act="close"]').onclick=Un,n.querySelector('[data-act="home"]').onclick=()=>cs({lat:e,lng:t,label:null}),n.querySelector('[data-act="zoom"]').onclick=()=>$o({lat:e,lng:t}),n.querySelector('[data-act="add"]').onclick=s=>{a.hidden=!1,s.currentTarget.hidden=!0,a.querySelector("input").focus()},a.onsubmit=s=>{s.preventDefault();const o=a.querySelector("input").value.trim();if(!o)return;const c={id:"own-"+Date.now().toString(36),name:o,lat:+e.toFixed(4),lng:+t.toFixed(4)};fr.push(c),Yt.set("own",fr),Oe.setPlaces(wr()),$r(),la(c.id,{fly:!1}),ri(`Dodano „${o}” do moich miejsc.`)}}function gr(n){return String(n).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e])}let In=!1;function ss(n){if(Fn(),wt!=="places"&&ii("places"),In=!1,pt=n,Oe.select(null,{fly:!1}),Oe.setPin("tap",null),Oe.setArc(null),n.type==="quake"){const e=bt.quakes.find(t=>t.id===n.id);e&&Oe.focus(e.lat,e.lng)}sn(),Mi(),aa()==="mini"&&mn("peek")}function ed(n,e){const t=bt.countries.length?fs(bt.countries,n,e):null;return t?"nad: "+t.n:"nad morzem albo oceanem"}function bv(n){const e=bt.quakes.find(r=>r.id===pt.id);if(!e)return Un();const t=bt.countries.length?fs(bt.countries,e.lat,e.lng):null,i=new Intl.DateTimeFormat("pl-PL",{day:"numeric",month:"long",hour:"2-digit",minute:"2-digit"}).format(new Date(e.time));n.innerHTML=`<div class="card">
    <p class="region">Trzęsienie ziemi · ${cv(e.mag)}</p>
    <h2>${Zu(e.mag)} · ${t?gr(t.n):"pod morzem"}</h2>
    <div class="facts">
      <span>Kiedy: <b>${Ku(e.time)}</b> (${i})</span>
      <span>Głębokość: <b>${Math.round(e.depth)} km</b>${e.tsunami?" · duże zdarzenie w strefie oceanicznej":""}</span>
      <span>Opis USGS: ${gr(e.place)}</span>
      <span>${ca(e.lat,e.lng)}</span>
    </div>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="zoom" type="button">Przybliż</button>
      <a class="ghost small link" href="${gr(e.url)}" target="_blank" rel="noopener">Szczegóły w USGS</a>
    </div></div>`,n.querySelector('[data-act="close"]').onclick=Un,n.querySelector('[data-act="zoom"]').onclick=()=>$o(e)}function Sv(n){const e=bt.iss;if(!e){n.innerHTML='<div class="card"><p class="region">Międzynarodowa Stacja Kosmiczna</p><h2>Liczę orbitę…</h2></div>';return}const t=lv(e.lat,e.lng,e.alt,new Date);n.innerHTML=`<div class="card">
    <p class="region">Międzynarodowa Stacja Kosmiczna · na żywo</p>
    <h2>ISS ${gr(ed(e.lat,e.lng))}</h2>
    <div class="facts">
      <span>Wysokość: <b>${Math.round(e.alt)} km</b> · prędkość: <b>${Math.round(e.speed).toLocaleString("pl-PL")} km/h</b></span>
      <span>Teraz: <b>${t?"w słońcu":"w cieniu Ziemi"}</b> · jedno okrążenie trwa ok. 92 minuty</span>
      <span>${ca(e.lat,e.lng)}</span>
    </div>
    <div class="card-actions">
      <button class="ghost small" data-act="close" type="button">Zamknij</button>
      <button class="ghost small" data-act="follow" type="button">${In?"Przestań śledzić":"Śledź ISS"}</button>
    </div></div>`,n.querySelector('[data-act="close"]').onclick=Un,n.querySelector('[data-act="follow"]').onclick=()=>{In=!In,In?Dc():Oe.release(),sn()}}function Dc(){const n=bt.iss;In&&n&&Oe.focus(n.lat,n.lng,Math.max(Oe.radius,1.6))}setInterval(()=>{In&&pt?.type==="iss"&&(Dc(),wt==="places"&&sn())},1500);Ce("#view canvas").addEventListener("pointerdown",()=>{In&&(In=!1,pt?.type==="iss"&&sn())});let Wa=null,os=null;function td(){bt.setBorders(qt.borders),Oe.setLabelMinZoom(qt.borders?8:5),bt.setGrid(qt.grid),bt.setQuakes(qt.quakes),bt.setIss(qt.iss),qt.photo?wv():Oe.setPhoto(null);for(const n of Object.keys(qt)){const e=Ce(`#layer-${n}`);e&&(e.checked=qt[n])}Oi()}function wv(){const n=uv();if(Wa&&os===n)return Oe.setPhoto(Wa);const e=Oe.maxTextureSize>=4096&&!matchMedia("(pointer: coarse)").matches;Oi("photo",null,"Pobieram zdjęcie z satelitów NASA…"),new wc().load(dv(n,e?4096:2048),t=>{t.colorSpace=kt,t.anisotropy=8,Wa?.dispose(),Wa=t,os=n,qt.photo&&Oe.setPhoto(t),Oi("photo")},void 0,()=>Oi("photo","Nie udało się pobrać zdjęcia NASA — sprawdź internet."))}const Ev=new Intl.DateTimeFormat("pl-PL",{day:"numeric",month:"long",timeZone:"UTC"});function Oi(n,e,t){const i=a=>!n||n===a,r=(a,s)=>Ce(`#status-${a}`).textContent=s;if(i("quakes")){const a=bt.quakes;if(e)r("quakes",e);else if(!qt.quakes)r("quakes","Z ostatnich 7 dni, od M 2,5. Dane USGS, odświeżane co 10 minut.");else if(!a.length)r("quakes","Pobieram dane USGS…");else{const s=a[a.length-1],o=a.filter(l=>Date.now()-l.time<864e5).length,c=bt.countries.length?fs(bt.countries,s.lat,s.lng):null;r("quakes",`${a.length} trzęsień w 7 dni, ${o} z ostatniej doby. Najsilniejsze: ${Zu(s.mag)}, ${c?c.n:"pod morzem"}, ${Ku(s.time)}.`)}Ce("#show-quake").hidden=!qt.quakes||!a.length}if(i("iss")){const a=bt.iss;e?r("iss",e):qt.iss?a?r("iss",`Teraz ${ed(a.lat,a.lng)}, ${Math.round(a.alt)} km nad ziemią, ${Math.round(a.speed).toLocaleString("pl-PL")} km/h.`):r("iss","Pobieram orbitę…"):r("iss","Pozycja liczona na żywo z aktualnej orbity, linia pokazuje najbliższe okrążenie."),Ce("#show-iss").hidden=!qt.iss||!a}i("photo")&&(e?r("photo",e):t?r("photo",t):qt.photo&&os?r("photo",`Zdjęcie z ${Ev.format(new Date(os+"T12:00:00Z"))}, z satelitów Suomi NPP i NOAA-20. Zastępuje mozaikę chmur.`):r("photo","Prawdziwe chmury, śnieg i dym z wczorajszego dnia, sklejone z przelotów satelitów NASA."))}for(const n of["borders","grid","quakes","iss","photo"])Ce(`#layer-${n}`).onchange=e=>{qt[n]=e.target.checked,Yt.set("layers",qt),td()};Ce("#show-quake").onclick=()=>{const n=bt.quakes[bt.quakes.length-1];n&&ss({type:"quake",id:n.id})};Ce("#show-iss").onclick=()=>{ss({type:"iss"}),In=!0,Dc(),sn()};function $o(n){Fn(),Oe.zoomTo(n.lat,n.lng,.005),si()||mn("mini"),vt.tiles||ri("Włącz w ustawieniach zdjęcia satelitarne, żeby widzieć szczegóły.")}function cs(n){Rt=n?{lat:Math.round(n.lat*100)/100,lng:Math.round(n.lng*100)/100,label:n.label||null}:null,Yt.set("home",Rt),Oe.setPin("home",Rt,10477760),nd(),pt?.type==="place"?as(Rc(pt.id)):pt?.type==="point"&&as(pt),sn(),n&&ri("Zapisano twój punkt — przy każdym miejscu zobaczysz odległość.")}function nd(){Ce("#home-info").textContent=Rt?`${Rt.label?Rt.label+" · ":""}${ca(Rt.lat,Rt.lng)}`:"Nie ustawiono. Z mojego punktu liczę odległości i rysuję trasę lotu.",Ce("#home-clear").hidden=!Rt}Ce("#home-clear").onclick=()=>{cs(null),ri("Usunięto twój punkt.")};Ce("#home-gps").onclick=()=>{if(!navigator.geolocation)return ri("To urządzenie nie udostępnia lokalizacji.");Ce("#home-gps").disabled=!0,navigator.geolocation.getCurrentPosition(n=>{Ce("#home-gps").disabled=!1,cs({lat:n.coords.latitude,lng:n.coords.longitude,label:"Moja lokalizacja"}),Oe.focus(Rt.lat,Rt.lng)},()=>{Ce("#home-gps").disabled=!1,ri("Nie udało się pobrać lokalizacji. Możesz dotknąć globusu i ustawić punkt ręcznie.")},{enableHighAccuracy:!1,timeout:15e3,maximumAge:6e5})};const Ko=Ce("#opt-real"),Zo=Ce("#opt-clouds"),Jo=Ce("#opt-spin"),Qo=Ce("#opt-tiles"),ec=Ce("#opt-labels");Qo.checked=vt.tiles;ec.checked=vt.labels;Qo.onchange=()=>{vt.tiles=Qo.checked,Oe.setTiles(vt.tiles),ua()};ec.onchange=()=>{vt.labels=ec.checked,Oe.setLabels(vt.labels),ua()};const tc=Ce("#opt-time");Ko.checked=vt.real;Zo.checked=vt.clouds;Jo.checked=vt.spin;function ua(){Yt.set("settings",vt)}Ko.onchange=()=>{vt.real=Ko.checked,Ce("#time-box").hidden=!vt.real,ua(),Pc()};Zo.onchange=()=>{vt.clouds=Zo.checked,Oe.setClouds(vt.clouds),ua()};Jo.onchange=()=>{vt.spin=Jo.checked,Oe.setSpin(vt.spin),Oe.setTiles(vt.tiles),Oe.setLabels(vt.labels),ua()};function zc(n){Yr=n,tc.value=String(n),Ce("#time-out").textContent=n?(n>0?"+":"−")+Ju(Math.abs(n)):"teraz",Ce("#time-now").hidden=!n,Pc()}tc.oninput=()=>zc(Number(tc.value));Ce("#time-now").onclick=()=>zc(0);const Kr=Ce("#panel"),si=()=>matchMedia("(min-width: 820px)").matches,aa=()=>Kr.dataset.sheet;function mn(n){Kr.dataset.sheet=n}function ii(n){wt=n;for(const e of["places","quiz","settings","layers"])Ce(`#view-${e}`).hidden=e!==n;Ce("#btn-layers").classList.toggle("on",n==="layers"),Ce("#btn-layers").innerHTML=n==="layers"?un.close:un.layers,Ce("#btn-quiz").classList.toggle("on",n==="quiz"),Ce("#btn-settings").classList.toggle("on",n==="settings"),Ce("#btn-quiz").innerHTML=n==="quiz"?un.close:un.quiz,Ce("#btn-settings").innerHTML=n==="settings"?un.close:un.settings,n==="places"&&(Mi(),sn())}Ce("#btn-settings").onclick=()=>{Fn(),wt==="quiz"&&da(),ii(wt==="settings"?"places":"settings"),si()||mn(wt==="settings"?"full":"peek")};Ce("#btn-layers").onclick=()=>{Fn(),wt==="quiz"&&da(),ii(wt==="layers"?"places":"layers"),wt==="layers"&&Oi(),si()||mn(wt==="layers"?"full":"peek")};{const n=Ce("#grip");let e=null;n.addEventListener("pointerdown",t=>{e=t.clientY,n.setPointerCapture(t.pointerId)}),n.addEventListener("pointerup",t=>{if(e==null)return;const i=t.clientY-e;e=null;const r=["mini","peek","full"],a=r.indexOf(aa());i<-24?mn(r[Math.min(2,a+1)]):i>24?mn(r[Math.max(0,a-1)]):mn(aa()==="full"?"peek":"full")})}new ResizeObserver(()=>{si()?Oe.setViewShift((Kr.offsetWidth+16)/2,0):Oe.setViewShift(0,Math.min(Kr.offsetHeight,window.innerHeight*.6)/2)}).observe(Kr);let Bi=null;function Tv(){const n=Lc();if(n.length<2)return ri("Za mało miejsc na liście, żeby ruszyć w wycieczkę.");wt!=="places"&&ii("places");let e=pt?.type==="place"?n.findIndex(i=>i.id===pt.id):-1;const t=()=>{e=(e+1)%n.length,la(n[e].id,{scroll:!0})};Bi=setInterval(t,7e3),t(),Ce("#btn-tour").classList.add("on"),Ce("#btn-tour").innerHTML=un.stop,Ce("#btn-tour").setAttribute("aria-label","Zatrzymaj wycieczkę"),ri(`Wycieczka po ${n.length} miejscach. Dotknij globusu, żeby przerwać.`)}function Fn(){Bi&&(clearInterval(Bi),Bi=null,Ce("#btn-tour").classList.remove("on"),Ce("#btn-tour").innerHTML=un.tour,Ce("#btn-tour").setAttribute("aria-label","Wycieczka po miejscach"))}Ce("#btn-tour").onclick=()=>Bi?Fn():Tv();Ce("#view canvas").addEventListener("pointerdown",Fn);const Av=[{id:"easy",label:"Łatwy",desc:"Miasta świata, z podpowiedzią kraju",pool:()=>Hr.filter(n=>n.cat==="m"),hint:!0},{id:"world",label:"Cały świat",desc:"Miasta, cuda i przyroda — bez podpowiedzi",pool:()=>Hr,hint:!1},{id:"pl",label:"Polska",desc:"Miejsca w Polsce — tu liczy się każdy kilometr",pool:()=>Hr.filter(n=>n.cat==="p"),hint:!1,scale:8},{id:"de",label:"Niemcy",desc:"Bawaria i reszta Niemiec — z Eichendorfem włącznie",pool:()=>Hr.filter(n=>n.cat==="d"),hint:!1,scale:6}],id=10;let qi=null;function Cv(n){const e=n.slice();for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}Ce("#btn-quiz").onclick=()=>{if(Fn(),wt==="quiz"){da(),ii("places");return}Un(),ii("quiz"),Oe.setMarkersVisible(!1),Oe.setPin("home",null),Uc()};function Uc(){qi=null;const n=Ce("#view-quiz");n.innerHTML=`<h2 class="section-title">Gdzie to jest?</h2>
    <p class="hint">Dostajesz nazwę miejsca i dotykasz globusu tam, gdzie twoim zdaniem leży. Im bliżej, tym więcej punktów — maksymalnie 1000 za rundę, ${id} rund.</p>
    <div class="levels"></div>`;for(const e of Av){const t=document.createElement("button");t.type="button",t.className="level",t.innerHTML=`<strong>${e.label}</strong><small>${e.desc}${Ui[e.id]?` · rekord ${Ui[e.id]}`:""}</small>`,t.onclick=()=>rd(e),n.querySelector(".levels").appendChild(t)}si()||mn("peek")}function rd(n){qi={level:n,list:Cv(n.pool()).slice(0,id),round:0,score:0,answered:!1},ad()}function ad(){const n=qi,e=n.list[n.round];n.answered=!1,Oe.setPin("guess",null),Oe.setPin("target",null),Oe.setArc(null),Oe.release(),Ce("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${n.round+1}</b> z ${n.list.length}</span><span>Wynik <b>${n.score}</b></span></div>
    <div class="progress"><i style="width:${n.round/n.list.length*100}%"></i></div>
    <p class="hint">Gdzie leży…</p>
    <p class="quiz-target"></p>
    ${n.level.hint?'<p class="region quiz-hint"></p>':""}
    <p class="hint">Obróć globus i dotknij miejsca, które obstawiasz.</p>`,Ce("#view-quiz .quiz-target").textContent=e.name,n.level.hint&&(Ce("#view-quiz .quiz-hint").textContent=e.region),si()||mn("mini")}function Rv(n){const e=qi;if(!e||e.answered)return;e.answered=!0;const t=e.list[e.round],i=Tc(n.lat,n.lng,t.lat,t.lng),r=yg(i*(e.level.scale||1));e.score+=r,Oe.setPin("guess",n,9425919),Oe.setPin("target",t,16766090),Oe.setArc(n,t);const a={lat:(n.lat+t.lat)/2,lng:Math.abs(n.lng-t.lng)>180?(n.lng+t.lng+360)/2%360:(n.lng+t.lng)/2};Oe.focus(a.lat,a.lng>180?a.lng-360:a.lng,Math.min(4.2,1.9+i/4e3));const s=i<50?"W punkt!":i<300?"Bardzo blisko.":i<1e3?"Niedaleko.":i<3e3?"Ten sam kawałek świata.":"Daleko…",o=e.round+1>=e.list.length;Ce("#view-quiz").innerHTML=`
    <div class="quiz-meta"><span>Runda <b>${e.round+1}</b> z ${e.list.length}</span><span>Wynik <b>${e.score}</b></span></div>
    <div class="progress"><i style="width:${(e.round+1)/e.list.length*100}%"></i></div>
    <p class="quiz-target"></p>
    <p class="quiz-result"><span class="pts">+${r}</span><br>${s} Twój strzał był <b>${Wu(i)}</b> od celu.</p>
    <p class="blurb"></p>
    <div class="row-buttons"><button class="solid" type="button" id="quiz-next">${o?"Zobacz wynik":"Dalej"}</button></div>`,Ce("#view-quiz .quiz-target").textContent=t.name,Ce("#view-quiz .blurb").textContent=`${t.region}. ${t.blurb}`,Ce("#quiz-next").onclick=()=>{e.round+=1,e.round>=e.list.length?Pv():ad()},si()||mn("peek")}function Pv(){const n=qi,e=n.list.length*1e3,t=n.score>(Ui[n.level.id]||0);t&&(Ui[n.level.id]=n.score,Yt.set("best",Ui)),Oe.setPin("guess",null),Oe.setPin("target",null),Oe.setArc(null),Oe.release();const i=n.score/e,r=i>.85?"Mistrzowska orientacja!":i>.65?"Świetny wynik.":i>.4?"Całkiem nieźle.":"Globus czeka na kolejne podejście.";Ce("#view-quiz").innerHTML=`
    <h2 class="section-title">Koniec quizu</h2>
    <p class="quiz-result"><span class="pts">${n.score}</span> / ${e}<br>${r}${t?" <b>To twój nowy rekord!</b>":Ui[n.level.id]?` Rekord: ${Ui[n.level.id]}.`:""}</p>
    <div class="row-buttons">
      <button class="solid" type="button" id="quiz-again">Jeszcze raz</button>
      <button class="ghost" type="button" id="quiz-levels">Inny poziom</button>
      <button class="ghost" type="button" id="quiz-close">Zamknij quiz</button>
    </div>`,Ce("#quiz-again").onclick=()=>rd(n.level),Ce("#quiz-levels").onclick=Uc,Ce("#quiz-close").onclick=()=>{da(),ii("places")},si()||mn("peek")}function da(){qi=null,Oe.setPin("guess",null),Oe.setPin("target",null),Oe.setArc(null),Oe.setMarkersVisible(!0),Oe.setPin("home",Rt,10477760),Oe.release()}let cu=0;function ri(n){const e=Ce("#toast");e.textContent=n,e.hidden=!1,clearTimeout(cu),cu=setTimeout(()=>e.hidden=!0,3600)}gv&&cd(async()=>{const{App:n}=await import("./index-BC9BNRRm.js");return{App:n}},[],import.meta.url).then(({App:n})=>{n.addListener("backButton",()=>{Bi?Fn():wt==="quiz"&&qi?Uc():wt!=="places"?(wt==="quiz"&&da(),ii("places")):pt?Un():!si()&&aa()==="full"?mn("peek"):n.exitApp()})});Oe.setPlaces(wr());Oe.setClouds(vt.clouds);Oe.setSpin(vt.spin);Oe.setPin("home",Rt,10477760);bt.loadCountries();td();Ce("#time-box").hidden=!vt.real;zc(0);$r();nd();ii("places");"serviceWorker"in navigator&&window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));export{ic as W,cd as _,nc as r};
