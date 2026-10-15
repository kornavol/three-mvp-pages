import{c as d}from"./sprout-Da82Yigq.js";import{r as m,j as s}from"./index-fIUMplUj.js";import{X as g}from"./x-BT035lvz.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=d("Link2",[["path",{d:"M9 17H7A5 5 0 0 1 7 7h2",key:"8i5ue5"}],["path",{d:"M15 7h2a5 5 0 1 1 0 10h-2",key:"1b9ql8"}],["line",{x1:"8",x2:"16",y1:"12",y2:"12",key:"1jonct"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=d("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=d("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=d("Trees",[["path",{d:"M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z",key:"1l6gj6"}],["path",{d:"M7 16v6",key:"1a82de"}],["path",{d:"M13 19v3",key:"13sx9i"}],["path",{d:"M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",key:"1sj9kv"}]]),x=new Set(["page.parent","task.lock","task.reorder","pack.manage","plant.lock","family.manage","family.leave","ui.version","forest.plant","forest.gifts"]);function S(n,r){const l=n==="child"?"child":r;return{role:n,mode:l,can(t){return t==="mode.enter"?n!=="child"&&l==="child":n==="local"?t==="forest.plant"||t==="forest.gifts"&&l==="parent":t==="family.leave"&&n==="child"?!0:n==="parent"&&l==="parent"&&x.has(t)}}}function D({children:n,onClose:r,label:l,cinematic:t=!1,balance:p,departure:f,story:k=!1}){const c=m.useRef(null);m.useEffect(()=>{const e=document.activeElement instanceof HTMLElement?document.activeElement:null,a=c.current;return a==null||a.showModal(),()=>{a==null||a.close(),e!=null&&e.isConnected&&e.focus()}},[]);const h=s.jsxs(s.Fragment,{children:[s.jsx("button",{className:"icon-button modal-close","aria-label":"Закрыть",onClick:r,children:s.jsx(g,{size:20})}),n]});return s.jsxs("dialog",{ref:c,className:k?"modal rostok-modal":t?"result-dialog":"modal","aria-label":l,onKeyDown:e=>{var u;if(e.key!=="Tab")return;const a=Array.from(((u=c.current)==null?void 0:u.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]'))??[]).filter(y=>y.getClientRects().length>0),o=a[0],i=a.at(-1);e.shiftKey&&document.activeElement===o?(e.preventDefault(),i==null||i.focus()):!e.shiftKey&&document.activeElement===i&&(e.preventDefault(),o==null||o.focus())},onCancel:e=>{e.preventDefault(),r()},onClick:e=>{e.target===c.current&&r()},children:[t&&s.jsx("div",{className:"result-hud",children:p}),t?s.jsx("div",{className:`modal result-panel${f?" departing":""}`,style:f?{animationDuration:`${f}ms`}:void 0,children:h}):h]})}export{L,D as M,b as S,E as T,A as a,S as c};
