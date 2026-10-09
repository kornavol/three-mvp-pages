import{M as E,j as N,D as b,R as S,ah as I,c as _,d as x,V as A,a as C,U as F,ai as R}from"./GLTFLoader-C54nj8zD.js";import{w as O,d as j,m as P}from"./foliage-light-Dc3I3vzw.js";const B="/three-mvp-pages/assets/island-BkrdanYh.glb",W="varying vec3 vAeriaPos; varying vec3 vAeriaNormal;",$=`varying vec3 vAeriaPos; varying vec3 vAeriaNormal;
float aeriaHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float aeriaNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(aeriaHash(i), aeriaHash(i + vec2(1, 0)), f.x), mix(aeriaHash(i + vec2(0, 1)), aeriaHash(i + vec2(1, 1)), f.x), f.y);
}
float aeriaFbm(vec2 p) {
  float v = 0.0, a = .5;
  for (int i = 0; i < 4; i++) { v += a * aeriaNoise(p); p = mat2(1.6, -1.2, 1.2, 1.6) * p + 3.1; a *= .5; }
  return v;
}`;function X(a){return a<.5?"diffuseColor.rgb *= .95 + .1 * aeriaNoise(vAeriaPos.xz * 20.0 + vAeriaPos.y * 8.0);":a>5.5&&a<6.5?`{
    vec3 aeriaN = normalize(vAeriaNormal); if (!gl_FrontFacing) aeriaN = -aeriaN;
    float mineral = aeriaFbm(vAeriaPos.xz * 8.0 + vAeriaPos.y * 2.2);
    float strata = aeriaNoise(vec2(vAeriaPos.y * 7.0 + sin(vAeriaPos.x * 2.0) * .28, vAeriaPos.z * 1.2));
    diffuseColor.rgb *= .85 + .27 * mineral + .12 * strata;
    float moss = smoothstep(.35, .83, vAeriaPos.y + mineral * .30) * smoothstep(.16, .72, aeriaN.y);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.16, .27, .055), moss * .72);
  }`:""}const k=`if (vAeriaPos.y < 1.5 && vAeriaPos.y > .5) {
    reflectedLight.indirectDiffuse *= .66 + .34 * smoothstep(.6, 2.15, length(vAeriaPos.xz - vec2(.05, -.38)));
  }`,z=new Set(["Earth_under_the_meadow"]);function H(a){if(a.userData.aeriaOutward)return;a.userData.aeriaOutward=!0;const i=a.getAttribute("normal");for(let e=0;e<i.count;e++)i.setXYZ(e,-i.getX(e),-i.getY(e),-i.getZ(e));i.needsUpdate=!0;const o=a.getIndex();if(o){for(let e=0;e<o.count;e+=3){const m=o.getX(e+1);o.setX(e+1,o.getX(e+2)),o.setX(e+2,m)}o.needsUpdate=!0}}function L(a,i){if(Array.isArray(a.material)||!(a.material instanceof E))throw Error("AERIA: unsupported material");const o=a.material,e=Number(o.userData.shaderKind??0),m=`uniform float uTime,uWind; attribute vec4 _wind;
${j}`,n=r=>{Object.assign(r.uniforms,i),r.vertexShader=m+`
`+r.vertexShader,r.vertexShader=r.vertexShader.replace("#include <begin_vertex>",`vec3 transformed=bend(position,_wind,${e.toFixed(1)});`)},l=X(e);if(o.onBeforeCompile=r=>{n(r),r.vertexShader=W+`
`+r.vertexShader.replace("#include <project_vertex>",`vAeriaPos = transformed; vAeriaNormal = objectNormal;
#include <project_vertex>`),r.fragmentShader=$+`
`+r.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+l).replace("#include <aomap_fragment>",`#include <aomap_fragment>
`+k),e>.5&&e<1.5&&O(r)},o.customProgramCacheKey=()=>`aeria-pbr-${e}-3`,z.has(o.name)&&H(a.geometry),a.castShadow=e!==3,a.receiveShadow=!0,a.castShadow){const r=new N({depthPacking:S,side:b});r.onBeforeCompile=n,r.customProgramCacheKey=()=>`aeria-depth-${e}-1`,a.customDepthMaterial=r;const c=new I({side:b});c.onBeforeCompile=n,c.customProgramCacheKey=()=>`aeria-distance-${e}-1`,a.customDistanceMaterial=c}a.frustumCulled=!1}async function K(a,i){i==null||i.throwIfAborted();const o=await fetch(B,{signal:i});if(!o.ok)throw Error(`AERIA: ${o.status}`);const e=await o.arrayBuffer();i==null||i.throwIfAborted();const n=(await new _().parseAsync(e,"")).scene,l=new Set,r=new Set;let c=!1;const w=()=>{c||(c=!0,n.removeFromParent(),l.forEach(s=>s.dispose()),r.forEach(s=>s.dispose()),n.clear())};n.traverse(s=>{s instanceof x&&(l.add(s.geometry),(Array.isArray(s.material)?s.material:[s.material]).forEach(u=>r.add(u)))});try{i==null||i.throwIfAborted();const s=new A(...P.anchor),u={uTime:{value:0},uWind:{value:0}};n.position.copy(s).negate(),n.name="AERIA island";const p=P.nodes;let v;if(n.traverse(t=>{if(!(t instanceof x))return;const f=t.userData.name??t.name,d=p[f]??p[Object.keys(p).find(M=>M.replace(/[^a-zA-Z0-9_-]/g,"")===t.name)??""];if(!d)throw Error(`AERIA: unknown group ${f}`);t.userData.aeriaCategory=d,d in a.plants&&(t.visible=a.plants[d]),(f.endsWith("/Meadow")||t.name.endsWith("Meadow"))&&(v=t),L(t,u),t.customDepthMaterial&&r.add(t.customDepthMaterial),t.customDistanceMaterial&&r.add(t.customDistanceMaterial)}),!v)throw Error("AERIA: missing planting surface");n.updateMatrixWorld(!0);const g=new C().setFromObject(n,!0),y=new F,D=new A(0,-1,0),h=new R("#ffb449",2.5,3,2);return h.name="AERIA lantern light",h.position.set(-3.3,2.03,1.28),n.add(h),{group:n,bounds:()=>g.clone(),heightAt(t,f){if(!Number.isFinite(t)||!Number.isFinite(f))throw Error("Invalid terrain sample");n.updateMatrixWorld(!0),y.set(new A(t,g.max.y+10,f),D);const d=y.intersectObject(v,!1)[0];if(!d)throw Error("Point outside AERIA meadow");return d.point.y},update(t){c||(u.uTime.value=t.reduced?0:t.time,u.uWind.value=t.reduced?0:t.wind)},dispose:w}}catch(s){throw w(),s}}export{K as createAeriaIsland};
