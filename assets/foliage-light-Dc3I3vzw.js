const S=`
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
}`,d=`
vec3 tone(vec3 x) {
  x = max(x, vec3(0.0));
  return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0.0, 1.0);
}
vec3 outputColor(vec3 c) {
  return pow(tone(c), vec3(1.0 / 2.2));
}
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = .5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = mat2(1.6, -1.2, 1.2, 1.6) * p + 3.1;
    a *= .5;
  }
  return v;
}`,T=`#version 300 es
precision highp float;
out vec2 vUV;
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  vUV = p;
  gl_Position = vec4(p * 2.0 - 1.0, 0, 1);
}`,b=`#version 300 es
precision highp float;
in vec2 vUV;
uniform vec3 uEye, uRight, uUp, uForward, uSun;
uniform float uAspect, uTan, uTime, uSunset;
out vec4 outColor;
${d}
vec3 sky(vec3 rd) {
  float t = pow(clamp(rd.y * .75 + .17, 0.0, 1.0), .65);
  vec3 top = mix(vec3(.035, .21, .61), vec3(.09, .115, .32), uSunset);
  vec3 low = mix(vec3(.36, .62, .83), vec3(.85, .45, .26), uSunset);
  vec3 col = mix(low, top, t);
  float sun = max(dot(rd, uSun), 0.0);
  col += vec3(1.0, .81, .44) * pow(sun, 18.0) * .18;
  col += vec3(1.0, .9, .6) * pow(sun, 700.0) * 2.0;
  if (rd.y > -.06) {
    vec2 q = rd.xz / max(rd.y + .28, .06) * 2.35 + vec2(uTime * .008, 0.0);
    float n = fbm(q);
    float edge = smoothstep(.54, .77, n);
    float mask = smoothstep(-.06, .13, rd.y) * (1.0 - smoothstep(.63, .95, rd.y));
    vec3 cloud = mix(vec3(.65, .79, .88), vec3(1.20, 1.20, 1.10), smoothstep(.57, .77, n));
    cloud = mix(cloud, cloud * vec3(1.1, .84, .74), uSunset);
    col = mix(col, cloud, edge * mask * .90);
  }
  return col;
}
void main() {
  vec2 uv = vUV * 2.0 - 1.0;
  vec3 rd = normalize(uForward + uv.x * uAspect * uTan * uRight + uv.y * uTan * uUp);
  vec3 col = sky(rd);
  if (rd.y < -.001) {
    float d = (-9.0 - uEye.y) / rd.y;
    if (d > 0.0) {
      vec3 p = uEye + rd * d;
      float a = sin(p.x * .65 + p.z * .4 + uTime * .85), b = sin(p.z * 1.23 - p.x * .37 - uTime * .6);
      vec3 N = normalize(vec3((a + sin(p.x * 2.0 + uTime)) * .030, 1.0, b * .030));
      vec3 reflected = reflect(rd, N);
      float fresnel = .09 + .91 * pow(1.0 - max(dot(-rd, N), 0.0), 4.0);
      float shoal = fbm(p.xz * .054);
      vec3 water = mix(vec3(.006, .095, .285), vec3(.015, .35, .43), smoothstep(.33, .79, shoal));
      water = mix(water, water * vec3(.91, .63, .75), uSunset * .5);
      float ripple = pow(max(.0, sin(p.x * 2.8 + p.z * 4.5 + uTime) * sin(p.z * 2.6 - p.x * 1.7 - uTime * .8)), 14.0);
      water += vec3(.06, .10, .12) * ripple * exp(-d * .035);
      vec3 reflection = mix(vec3(.36, .57, .71), vec3(.09, .32, .60), max(0.0, reflected.y));
      col = mix(water, reflection, fresnel * .46);
      float spec = pow(max(dot(reflected, uSun), 0.0), 220.0);
      col += vec3(1.2, .95, .5) * spec;
      float mist = 1.0 - exp(-max(d - 30.0, 0.0) * .0045);
      col = mix(col, sky(vec3(rd.x, .008, rd.z)), mist * .85);
    }
  }
  col = outputColor(col);
  float vignette = 1.0 - .075 * dot(uv * .68, uv * .68);
  outColor = vec4(col * vignette, 1.0);
}`,L=`#version 300 es
precision highp float;
layout(location=0) in vec4 aSeed;
uniform mat4 uVP;
uniform vec3 uEye;
uniform float uTime, uWind, uHeight, uSparkle;
uniform vec3 uVisitor;
out float vAlpha, vType;
void main() {
  float type = aSeed.w;
  float s = aSeed.x;
  float a = aSeed.y;
  float r = aSeed.z;
  vec3 p;
  if (type > 2.5) {
    float a0 = s * 6.283 + uTime * .65;
    float h = fract(r + uTime * .18);
    p = uVisitor + vec3(cos(a0) * (.24 + .52 * a), h * 2.9, sin(a0) * (.24 + .52 * a));
    vAlpha = sin(h * 3.14159) * uSparkle * .85;
  } else if (type < .5) {
    p = vec3(sin(s * 37.0) * 4.8, 1.4 + fract(s + uTime * .028) * 6.1, cos(s * 29.0) * 3.0);
    p.x += sin(uTime * .5 + s * 60.0) * .28 * uWind;
    p.z += cos(uTime * .4 + s * 40.0) * .22;
    vAlpha = pow(sin(fract(s + uTime * .028) * 3.14159), .6) * .65;
  } else {
    float age = fract(s + uTime * (.30 + r * .16));
    vec3 origin = type < 1.5 ? vec3(4.17, -5.1, 3.22) : vec3(-4.15, -5.75, 2.59);
    p = origin + vec3(cos(a * 6.283) * age * (.20 + r * .7), -age * 1.2 + sin(age * 3.14) * .40, sin(a * 6.283) * age * (.2 + r * .8));
    vAlpha = (1.0 - age) * .38;
  }
  vType = type;
  gl_Position = uVP * vec4(p, 1.0);
  float dist = length(uEye - p);
  gl_PointSize = clamp((type > 2.5 ? 4.0 + r * 5.0 : type < .5 ? 2.2 : 11.0 + r * 23.0) * uHeight / 850.0 * 18.0 / dist, 1.0, 62.0);
}`,z=`#version 300 es
precision highp float;
in float vAlpha, vType;
out vec4 outColor;
void main() {
  float d = length(gl_PointCoord - .5) * 2.0;
  if (d > 1.0) discard;
  float a = pow(1.0 - d, (vType < .5 || vType > 2.5) ? 1.3 : 2.0) * vAlpha;
  vec3 c = (vType < .5 || vType > 2.5) ? vec3(1.0, .83, .36) : vec3(.86, .97, 1.0);
  outColor = vec4(c, a);
}`,v=1,p="a97da474953f641919677878b1dacaa64776dbd70065d9b16248960661dd0b3a",u="e42eb298af3bf1f11cef3daa8b14539e6eda768a9d2a56f23e1e9a56125b8586",m=[.05,.86,-.38],g={"terrain/Cliff_and_boulders":"terrain","terrain/Earth_under_the_meadow":"terrain","terrain/Meadow":"terrain","terrain/Sand_and_path_stones":"terrain","grass/Windblown_grass":"grass","flowers/Wildflowers":"flowers","flowers/flowers_from_Hanging_vines_and_ferns":"flowers","vines/vines_from_Hanging_vines_and_ferns":"vines","ferns/ferns_from_Hanging_vines_and_ferns":"ferns","props/Fence_and_lantern_post":"props","props/Lantern_bronze":"props","props/Lantern_warm_glass":"props"},h={vertices:102561,triangles:96272},_={"terrain/Cliff_and_boulders":{vertices:7176,triangles:2392},"terrain/Earth_under_the_meadow":{vertices:200,triangles:200},"terrain/Meadow":{vertices:2201,triangles:4300},"terrain/Sand_and_path_stones":{vertices:1120,triangles:458},"grass/Windblown_grass":{vertices:30880,triangles:18528},"flowers/Wildflowers":{vertices:10335,triangles:10176},"flowers/flowers_from_Hanging_vines_and_ferns":{vertices:1908,triangles:3180},"vines/vines_from_Hanging_vines_and_ferns":{vertices:17760,triangles:21840},"ferns/ferns_from_Hanging_vines_and_ferns":{vertices:30450,triangles:35e3},"props/Fence_and_lantern_post":{vertices:252,triangles:84},"props/Lantern_bronze":{vertices:243,triangles:102},"props/Lantern_warm_glass":{vertices:36,triangles:12}},C={version:v,sourceSha256:p,assetSha256:u,anchor:m,nodes:g,counts:h,meshes:_},y=`
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
`;function w(e){e.fragmentShader=e.fragmentShader.replace("#include <lights_physical_pars_fragment>",`#include <lights_physical_pars_fragment>
${y}`)}function x(e,i){e.vertexShader=`varying float vAeriaHeight;
${e.vertexShader}`.replace("#include <project_vertex>",`{
      vec4 aeriaPoint = vec4( transformed, 1.0 );
      #ifdef USE_INSTANCING
        aeriaPoint = instanceMatrix * aeriaPoint;
      #endif
      vAeriaHeight = ( modelMatrix * aeriaPoint ).y + ${i.toFixed(4)};
    }
    #include <project_vertex>`),e.fragmentShader=`varying float vAeriaHeight;
${e.fragmentShader}`.replace("#include <aomap_fragment>",`#include <aomap_fragment>
    if ( vAeriaHeight > 4.4 ) reflectedLight.indirectDiffuse *= .7 + .3 * smoothstep( 4.4, 8.0, vAeriaHeight );`)}const n=new WeakSet;function P(e,i){e.traverse(s=>{const r=s;if(!r.isMesh)return;const o=r.isInstancedMesh===!0;for(const t of[].concat(r.material)){if(n.has(t))continue;n.add(t);const c=t.onBeforeCompile.bind(t),l=t.customProgramCacheKey.bind(t);t.onBeforeCompile=(a,f)=>{c(a,f),x(a,i),o&&w(a)},t.customProgramCacheKey=()=>`${l()}-aeria-tree-${o?1:0}-${i}-1`,t.needsUpdate=!0}})}export{T as a,L as b,P as c,S as d,C as m,z as p,b as s,w};
