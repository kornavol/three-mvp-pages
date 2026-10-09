import{b as E,c as L,D as b,R as N,p as S,G as M,M as A,V as _,B as I,q as C,r as R}from"./GLTFLoader-BXPGfoyk.js";const z=""+new URL("island-BkrdanYh.glb",import.meta.url).href,F=1,W="a97da474953f641919677878b1dacaa64776dbd70065d9b16248960661dd0b3a",H="e42eb298af3bf1f11cef3daa8b14539e6eda768a9d2a56f23e1e9a56125b8586",T=[.05,.86,-.38],O={"terrain/Cliff_and_boulders":"terrain","terrain/Earth_under_the_meadow":"terrain","terrain/Meadow":"terrain","terrain/Sand_and_path_stones":"terrain","grass/Windblown_grass":"grass","flowers/Wildflowers":"flowers","flowers/flowers_from_Hanging_vines_and_ferns":"flowers","vines/vines_from_Hanging_vines_and_ferns":"vines","ferns/ferns_from_Hanging_vines_and_ferns":"ferns","props/Fence_and_lantern_post":"props","props/Lantern_bronze":"props","props/Lantern_warm_glass":"props"},k={vertices:102561,triangles:96272},B={"terrain/Cliff_and_boulders":{vertices:7176,triangles:2392},"terrain/Earth_under_the_meadow":{vertices:200,triangles:200},"terrain/Meadow":{vertices:2201,triangles:4300},"terrain/Sand_and_path_stones":{vertices:1120,triangles:458},"grass/Windblown_grass":{vertices:30880,triangles:18528},"flowers/Wildflowers":{vertices:10335,triangles:10176},"flowers/flowers_from_Hanging_vines_and_ferns":{vertices:1908,triangles:3180},"vines/vines_from_Hanging_vines_and_ferns":{vertices:17760,triangles:21840},"ferns/ferns_from_Hanging_vines_and_ferns":{vertices:30450,triangles:35e3},"props/Fence_and_lantern_post":{vertices:252,triangles:84},"props/Lantern_bronze":{vertices:243,triangles:102},"props/Lantern_warm_glass":{vertices:36,triangles:12}},x={version:F,sourceSha256:W,assetSha256:H,anchor:T,nodes:O,counts:k,meshes:B},$=`
void RE_Direct_Aeria( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
  RE_Direct_Physical( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#if NUM_DIR_LIGHTS > 0
  if ( dot( directLight.direction, directionalLights[ 0 ].direction ) > .9999 ) {
    vec3 sun = directionalLights[ 0 ].color;
    float full = max( dot( sun, vec3( .2126, .7152, .0722 ) ), 1e-5 );
    float shadow = clamp( dot( directLight.color, vec3( .2126, .7152, .0722 ) ) / full, 0.0, 1.0 );
    float lambert = max( dot( geometryNormal, directLight.direction ), 0.0 );
    float translucency = pow( max( dot( -geometryViewDir, directLight.direction ), 0.0 ), 3.0 );
    float rim = pow( 1.0 - max( dot( geometryNormal, geometryViewDir ), 0.0 ), 3.0 );
    vec3 unit = sun / ( 2.55 * PI );
    reflectedLight.directDiffuse += material.diffuseColor * unit * ( ( .19 + .48 * translucency ) * ( 1.0 - lambert ) * ( .5 + .5 * shadow ) + rim * .14 * shadow );
  }
#endif
}
#undef RE_Direct
#define RE_Direct RE_Direct_Aeria
`;function j(e){e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
${$}`)}const V=`
vec3 bend(vec3 p, vec4 w, float kind) {
  if (kind > 1.5 && kind < 2.5) {
    p.x += sin(w.y * 20.0 - uTime * 3.3 + w.z * 2.0) * .025 * w.w;
    p.z += sin(w.y * 25.0 - uTime * 2.7 + w.z) * .025 * w.w;
  } else if (w.x > 0.0) {
    float gust = sin(uTime * 1.65 + p.x * .58 + p.z * .42);
    float breeze = sin(uTime * 2.7 + w.y + p.y * .4) * .36;
    p.x += (gust * .105 + breeze * .065 + .055) * w.x * uWind;
    p.z += (sin(uTime * 1.2 + p.x * .5 + w.y) * .045) * w.x * uWind;
    p.y += sin(uTime * 3.0 + w.y) * .021 * w.x * uWind;
  }
  return p;
}`,U="varying vec3 vAeriaPos; varying vec3 vAeriaNormal;",X=`varying vec3 vAeriaPos; varying vec3 vAeriaNormal;
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
}`;function G(e){return e<.5?"diffuseColor.rgb *= .95 + .1 * aeriaNoise(vAeriaPos.xz * 20.0 + vAeriaPos.y * 8.0);":e>5.5&&e<6.5?`{
    vec3 aeriaN = normalize(vAeriaNormal); if (!gl_FrontFacing) aeriaN = -aeriaN;
    float mineral = aeriaFbm(vAeriaPos.xz * 8.0 + vAeriaPos.y * 2.2);
    float strata = aeriaNoise(vec2(vAeriaPos.y * 7.0 + sin(vAeriaPos.x * 2.0) * .28, vAeriaPos.z * 1.2));
    diffuseColor.rgb *= .85 + .27 * mineral + .12 * strata;
    float moss = smoothstep(.35, .83, vAeriaPos.y + mineral * .30) * smoothstep(.16, .72, aeriaN.y);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.16, .27, .055), moss * .72);
  }`:""}const K=`if (vAeriaPos.y < 1.5 && vAeriaPos.y > .5) {
    reflectedLight.indirectDiffuse *= .66 + .34 * smoothstep(.6, 2.15, length(vAeriaPos.xz - vec2(.05, -.38)));
  }`,Y=new Set(["Earth_under_the_meadow"]);function Z(e){if(e.userData.aeriaOutward)return;e.userData.aeriaOutward=!0;const i=e.getAttribute("normal");for(let r=0;r<i.count;r++)i.setXYZ(r,-i.getX(r),-i.getY(r),-i.getZ(r));i.needsUpdate=!0;const n=e.getIndex();if(n){for(let r=0;r<n.count;r+=3){const m=n.getX(r+1);n.setX(r+1,n.getX(r+2)),n.setX(r+2,m)}n.needsUpdate=!0}}function q(e,i){if(Array.isArray(e.material)||!(e.material instanceof E))throw Error("AERIA: unsupported material");const n=e.material,r=Number(n.userData.shaderKind??0),m=`uniform float uTime,uWind; attribute vec4 _wind;
${V}`,o=t=>{Object.assign(t.uniforms,i),t.vertexShader=m+`
`+t.vertexShader,t.vertexShader=t.vertexShader.replace("#include <begin_vertex>",`vec3 transformed=bend(position,_wind,${r.toFixed(1)});`)},u=G(r);if(n.onBeforeCompile=t=>{o(t),t.vertexShader=U+`
`+t.vertexShader.replace("#include <project_vertex>",`vAeriaPos = transformed; vAeriaNormal = objectNormal;
#include <project_vertex>`),t.fragmentShader=X+`
`+t.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+u).replace("#include <aomap_fragment>",`#include <aomap_fragment>
`+K),r>.5&&r<1.5&&j(t)},n.customProgramCacheKey=()=>`aeria-pbr-${r}-3`,Y.has(n.name)&&Z(e.geometry),e.castShadow=r!==3,e.receiveShadow=!0,e.castShadow){const t=new L({depthPacking:N,side:b});t.onBeforeCompile=o,t.customProgramCacheKey=()=>`aeria-depth-${r}-1`,e.customDepthMaterial=t;const c=new S({side:b});c.onBeforeCompile=o,c.customProgramCacheKey=()=>`aeria-distance-${r}-1`,e.customDistanceMaterial=c}e.frustumCulled=!1}async function Q(e,i){i==null||i.throwIfAborted();const n=await fetch(z,{signal:i});if(!n.ok)throw Error(`AERIA: ${n.status}`);const r=await n.arrayBuffer();i==null||i.throwIfAborted();const o=(await new M().parseAsync(r,"")).scene,u=new Set,t=new Set;let c=!1;const w=()=>{c||(c=!0,o.removeFromParent(),u.forEach(s=>s.dispose()),t.forEach(s=>s.dispose()),o.clear())};o.traverse(s=>{s instanceof A&&(u.add(s.geometry),(Array.isArray(s.material)?s.material:[s.material]).forEach(l=>t.add(l)))});try{i==null||i.throwIfAborted();const s=new _(...x.anchor),l={uTime:{value:0},uWind:{value:0}};o.position.copy(s).negate(),o.name="AERIA island";const p=x.nodes;let g;if(o.traverse(a=>{if(!(a instanceof A))return;const f=a.userData.name??a.name,d=p[f]??p[Object.keys(p).find(P=>P.replace(/[^a-zA-Z0-9_-]/g,"")===a.name)??""];if(!d)throw Error(`AERIA: unknown group ${f}`);a.userData.aeriaCategory=d,d in e.plants&&(a.visible=e.plants[d]),(f.endsWith("/Meadow")||a.name.endsWith("Meadow"))&&(g=a),q(a,l),a.customDepthMaterial&&t.add(a.customDepthMaterial),a.customDistanceMaterial&&t.add(a.customDistanceMaterial)}),!g)throw Error("AERIA: missing planting surface");o.updateMatrixWorld(!0);const h=new I().setFromObject(o,!0),y=new C,D=new _(0,-1,0),v=new R("#ffb449",2.5,3,2);return v.name="AERIA lantern light",v.position.set(-3.3,2.03,1.28),o.add(v),{group:o,bounds:()=>h.clone(),heightAt(a,f){if(!Number.isFinite(a)||!Number.isFinite(f))throw Error("Invalid terrain sample");o.updateMatrixWorld(!0),y.set(new _(a,h.max.y+10,f),D);const d=y.intersectObject(g,!1)[0];if(!d)throw Error("Point outside AERIA meadow");return d.point.y},update(a){c||(l.uTime.value=a.reduced?0:a.time,l.uWind.value=a.reduced?0:a.wind)},dispose:w}}catch(s){throw w(),s}}export{Q as createAeriaIsland};
