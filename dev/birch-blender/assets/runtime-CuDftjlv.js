import{b as I,c as C,D as L,R,p as W,G as z,M as E,V as P,B as F,q as H,r as T}from"./GLTFLoader-BXPGfoyk.js";function k(n,i=.4){const f=new Map,a=(r,c,e)=>[e[0]*r[c]+e[4]*r[c+1]+e[8]*r[c+2]+e[12],e[1]*r[c]+e[5]*r[c+1]+e[9]*r[c+2]+e[13],e[2]*r[c]+e[6]*r[c+1]+e[10]*r[c+2]+e[14]];let _=0;for(const{positions:r,indices:c,matrix:e}of n)for(let o=0;o<c.length;o+=3){const l=a(r,c[o]*3,e),s=a(r,c[o+1]*3,e),u=a(r,c[o+2]*3,e),m=s[0]-l[0],p=s[2]-l[2],w=u[0]-l[0],v=u[2]-l[2],y=m*v-p*w;if(Math.abs(y)<1e-10)continue;const b=s[1]-l[1],A=u[1]-l[1],x=[b*v-p*A,-y,m*A-b*w],M=x[1]<0?-1:1,t=Math.hypot(...x);for(let d=0;d<3;d++)x[d]*=M/t;const g={a:l,dx:m,dz:p,ex:w,ez:v,dy:b,ey:A,det:y,normal:x};_++;for(let d=Math.floor(Math.min(l[0],s[0],u[0])/i);d<=Math.floor(Math.max(l[0],s[0],u[0])/i);d++)for(let h=Math.floor(Math.min(l[2],s[2],u[2])/i);h<=Math.floor(Math.max(l[2],s[2],u[2])/i);h++){const D=d+","+h;f.has(D)||f.set(D,[]),f.get(D).push(g)}}return{triangleCount:_,sample(r,c){let e=null;for(const o of f.get(Math.floor(r/i)+","+Math.floor(c/i))||[]){const l=r-o.a[0],s=c-o.a[2],u=(l*o.ez-s*o.ex)/o.det,m=(o.dx*s-o.dz*l)/o.det;if(u<-1e-7||m<-1e-7||u+m>1+1e-7)continue;const p=o.a[1]+u*o.dy+m*o.ey;(!e||p>e.height)&&(e={height:p,normal:o.normal})}return e}}}const O=""+new URL("island-BkrdanYh.glb",import.meta.url).href,B=1,$="a97da474953f641919677878b1dacaa64776dbd70065d9b16248960661dd0b3a",j="e42eb298af3bf1f11cef3daa8b14539e6eda768a9d2a56f23e1e9a56125b8586",U=[.05,.86,-.38],V={"terrain/Cliff_and_boulders":"terrain","terrain/Earth_under_the_meadow":"terrain","terrain/Meadow":"terrain","terrain/Sand_and_path_stones":"terrain","grass/Windblown_grass":"grass","flowers/Wildflowers":"flowers","flowers/flowers_from_Hanging_vines_and_ferns":"flowers","vines/vines_from_Hanging_vines_and_ferns":"vines","ferns/ferns_from_Hanging_vines_and_ferns":"ferns","props/Fence_and_lantern_post":"props","props/Lantern_bronze":"props","props/Lantern_warm_glass":"props"},X={vertices:102561,triangles:96272},G={"terrain/Cliff_and_boulders":{vertices:7176,triangles:2392},"terrain/Earth_under_the_meadow":{vertices:200,triangles:200},"terrain/Meadow":{vertices:2201,triangles:4300},"terrain/Sand_and_path_stones":{vertices:1120,triangles:458},"grass/Windblown_grass":{vertices:30880,triangles:18528},"flowers/Wildflowers":{vertices:10335,triangles:10176},"flowers/flowers_from_Hanging_vines_and_ferns":{vertices:1908,triangles:3180},"vines/vines_from_Hanging_vines_and_ferns":{vertices:17760,triangles:21840},"ferns/ferns_from_Hanging_vines_and_ferns":{vertices:30450,triangles:35e3},"props/Fence_and_lantern_post":{vertices:252,triangles:84},"props/Lantern_bronze":{vertices:243,triangles:102},"props/Lantern_warm_glass":{vertices:36,triangles:12}},N={version:B,sourceSha256:$,assetSha256:j,anchor:U,nodes:V,counts:X,meshes:G},K=`
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
`;function Y(n){n.fragmentShader=n.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
${K}`)}const Z=`
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
}`,q="varying vec3 vAeriaPos; varying vec3 vAeriaNormal;",J=`varying vec3 vAeriaPos; varying vec3 vAeriaNormal;
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
}`;function Q(n){return n<.5?"diffuseColor.rgb *= .95 + .1 * aeriaNoise(vAeriaPos.xz * 20.0 + vAeriaPos.y * 8.0);":n>5.5&&n<6.5?`{
    vec3 aeriaN = normalize(vAeriaNormal); if (!gl_FrontFacing) aeriaN = -aeriaN;
    float mineral = aeriaFbm(vAeriaPos.xz * 8.0 + vAeriaPos.y * 2.2);
    float strata = aeriaNoise(vec2(vAeriaPos.y * 7.0 + sin(vAeriaPos.x * 2.0) * .28, vAeriaPos.z * 1.2));
    diffuseColor.rgb *= .85 + .27 * mineral + .12 * strata;
    float moss = smoothstep(.35, .83, vAeriaPos.y + mineral * .30) * smoothstep(.16, .72, aeriaN.y);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(.16, .27, .055), moss * .72);
  }`:""}const ee=`if (vAeriaPos.y < 1.5 && vAeriaPos.y > .5) {
    reflectedLight.indirectDiffuse *= .66 + .34 * smoothstep(.6, 2.15, length(vAeriaPos.xz - vec2(.05, -.38)));
  }`,re=new Set(["Earth_under_the_meadow"]);function te(n){if(n.userData.aeriaOutward)return;n.userData.aeriaOutward=!0;const i=n.getAttribute("normal");for(let a=0;a<i.count;a++)i.setXYZ(a,-i.getX(a),-i.getY(a),-i.getZ(a));i.needsUpdate=!0;const f=n.getIndex();if(f){for(let a=0;a<f.count;a+=3){const _=f.getX(a+1);f.setX(a+1,f.getX(a+2)),f.setX(a+2,_)}f.needsUpdate=!0}}function ae(n,i){if(Array.isArray(n.material)||!(n.material instanceof I))throw Error("AERIA: unsupported material");const f=n.material,a=Number(f.userData.shaderKind??0),_=`uniform float uTime,uWind; attribute vec4 _wind;
${Z}`,r=e=>{Object.assign(e.uniforms,i),e.vertexShader=_+`
`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`vec3 transformed=bend(position,_wind,${a.toFixed(1)});`)},c=Q(a);if(f.onBeforeCompile=e=>{r(e),e.vertexShader=q+`
`+e.vertexShader.replace("#include <project_vertex>",`vAeriaPos = transformed; vAeriaNormal = objectNormal;
#include <project_vertex>`),e.fragmentShader=J+`
`+e.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
`+c).replace("#include <aomap_fragment>",`#include <aomap_fragment>
`+ee),a>.5&&a<1.5&&Y(e)},f.customProgramCacheKey=()=>`aeria-pbr-${a}-3`,re.has(f.name)&&te(n.geometry),n.castShadow=a!==3,n.receiveShadow=!0,n.castShadow){const e=new C({depthPacking:R,side:L});e.onBeforeCompile=r,e.customProgramCacheKey=()=>`aeria-depth-${a}-1`,n.customDepthMaterial=e;const o=new W({side:L});o.onBeforeCompile=r,o.customProgramCacheKey=()=>`aeria-distance-${a}-1`,n.customDistanceMaterial=o}n.frustumCulled=!1}async function ie(n,i){i==null||i.throwIfAborted();const f=await fetch(O,{signal:i});if(!f.ok)throw Error(`AERIA: ${f.status}`);const a=await f.arrayBuffer();i==null||i.throwIfAborted();const r=(await new z().parseAsync(a,"")).scene,c=new Set,e=new Set;let o=!1;const l=()=>{o||(o=!0,r.removeFromParent(),c.forEach(s=>s.dispose()),e.forEach(s=>s.dispose()),r.clear())};r.traverse(s=>{s instanceof E&&(c.add(s.geometry),(Array.isArray(s.material)?s.material:[s.material]).forEach(u=>e.add(u)))});try{i==null||i.throwIfAborted();const s=new P(...N.anchor),u={uTime:{value:0},uWind:{value:0}};r.position.copy(s).negate(),r.name="AERIA island";const m=N.nodes;let p;if(r.traverse(t=>{if(!(t instanceof E))return;const g=t.userData.name??t.name,d=m[g]??m[Object.keys(m).find(h=>h.replace(/[^a-zA-Z0-9_-]/g,"")===t.name)??""];if(!d)throw Error(`AERIA: unknown group ${g}`);t.userData.aeriaCategory=d,d in n.plants&&(t.visible=n.plants[d]),(g.endsWith("/Meadow")||t.name.endsWith("Meadow"))&&(p=t),ae(t,u),t.customDepthMaterial&&e.add(t.customDepthMaterial),t.customDistanceMaterial&&e.add(t.customDistanceMaterial)}),!p)throw Error("AERIA: missing planting surface");r.updateMatrixWorld(!0);const w=[];r.traverse(t=>{if(!(t instanceof E))return;const g=String(t.userData.name??t.name).split("/").pop();if(g!=="Meadow"&&g!=="Sand_and_path_stones")return;const d=t.geometry.getAttribute("position"),h=t.geometry.getIndex();w.push({positions:d.array,indices:(h==null?void 0:h.array)??Uint32Array.from({length:d.count},(D,S)=>S),matrix:t.matrixWorld.elements})});let v,y;try{if(v=k(w),!v.triangleCount)throw Error("AERIA: missing contact triangles")}catch(t){v=void 0,y=String(t)}const b=new F().setFromObject(r,!0),A=new H,x=new P(0,-1,0),M=new T("#ffb449",2.5,3,2);return M.name="AERIA lantern light",M.position.set(-3.3,2.03,1.28),r.add(M),{group:r,contactSurface:v,contactSurfaceError:y,bounds:()=>b.clone(),heightAt(t,g){if(!Number.isFinite(t)||!Number.isFinite(g))throw Error("Invalid terrain sample");r.updateMatrixWorld(!0),A.set(new P(t,b.max.y+10,g),x);const d=A.intersectObject(p,!1)[0];if(!d)throw Error("Point outside AERIA meadow");return d.point.y},update(t){o||(u.uTime.value=t.reduced?0:t.time,u.uWind.value=t.reduced?0:t.wind)},dispose:l}}catch(s){throw l(),s}}export{ie as createAeriaIsland};
