import{P as X,b as re,I as se,V as ae,_ as oe,a as ie,c as ce}from"./aeria-document-DLf63BJB.js";import{a as le,I as de,c as me,e as ue,f as pe,_ as he,h as fe,i as ge,j as be}from"./render-ZTG5n3CN.js";import{r as x,j as a}from"./index-BDs14Cqj.js";import{selectedOakCrown as ye,createOakCrownStudy as we,oakCrownRecipe as xe}from"./oak-crown-DEt1vE_s.js";import{a as Y,d as K,ad as ve,M as Ee,I as $,g as Q,ae as ke,V as ee,p as te,i as Ae}from"./GLTFLoader-C54nj8zD.js";import{a as Me,d as Se}from"./files-BUdSmzEh.js";import{p as _e}from"./package-BiM92feq.js";const Te=`import template from "../../experimental/boy-visit/source/viewer.template.html?raw";
import viewer from "../../experimental/boy-visit/source/viewer.js?raw";
import inventory from "../../experimental/boy-visit/source/performance.js?raw";
import modelUrl from "../../experimental/boy-visit/ostrov_boy.glb?url";
import { createPerformanceCollector } from "../dev-kit/performance/collector";

/** Fail loudly on upstream edits; never silently compare two different renderers. */
export function replaceOnce(source: string, from: string, to: string) {
  if (source.split(from).length !== 2)
    throw Error(\`AERIA adapter anchor changed: \${from.slice(0, 70)}\`);
  return source.replace(from, to);
}

export const PLACEMENT = {
  scale: 1,
  translation: [0.05, 0.86, -0.38],
  rotation: [0, 0, 0],
  rule: "Same world unit, no height normalization; source trunk origin (0,0,0) at original AERIA trunk foot",
};
export const VIEWS = {
  island: { yaw: 0.32, pitch: 0.24, dist: 32.5, target: [0, 1.8, 0] },
  front: { yaw: 0.025, pitch: 0.07, dist: 23, target: [0, 4.4, 0] },
  side: { yaw: Math.PI / 2, pitch: 0.07, dist: 23, target: [0, 4.4, 0] },
};

export const ISLAND_VIEWS = {
  composition: {yaw:.32,pitch:.24,dist:32.5,target:[0,1.8,0]},
  terrain: {yaw:.32,pitch:.36,dist:23,target:[0,-.6,0]},
  reverse: {yaw:Math.PI+.32,pitch:.24,dist:23,target:[0,-.6,0]},
  surface: {yaw:.32,pitch:.8,dist:18,target:[0,.86,0]},
  planting: {yaw:.1,pitch:.26,dist:10,target:[0,.86,0]},
};

export function buildComparisonDocument(base: string, fullAmbiance = false, quietAmbiance = false) {
  let script = viewer;
  // Source indentation is deliberately not relied on for the simulation block.
  const simulation = / let seed;[\\s\\S]*?visitor=createVisitor\\([\\s\\S]*?\\n/.exec(
    script,
  )?.[0];
  if (!simulation) throw Error("AERIA simulation anchor changed");
  script = replaceOnce(
    script,
    simulation,
    " // Static comparison: no bird or visitor simulation.\\n",
  );
  const load =
    / const base64=\\$\\('model-data'\\)[\\s\\S]*?\\n parseGLB\\(blobBytes\\);/.exec(
      script,
    )?.[0];
  if (!load) throw Error("AERIA load anchor changed");
  script = replaceOnce(
    script,
    load,
    \` const response=await fetch(\${JSON.stringify(new URL(modelUrl, base).href)});\\n if(!response.ok)throw Error('AERIA GLB '+response.status);\\n blobBytes=new Uint8Array(await response.arrayBuffer());\\n parseGLB(blobBytes);\`,
  );
  const sunny =
    / const sunnyRaw=[\\s\\S]*?selectBoyMode\\(boyMode\\);updateSunny\\(0\\);\\n/.exec(
      script,
    )?.[0];
  if (!sunny) throw Error("AERIA Sunny anchor changed");
  script = replaceOnce(
    script,
    sunny,
    " // Static comparison: no Sunny avatar.\\n selectBoyMode('none');\\n",
  );
  script = replaceOnce(
    script,
    "col+=vec3(1.0,.48,.1)*lamp*base*.9;",
    "// Lantern light disabled for both variants.",
  );
  script = replaceOnce(
    script,
    "gl.drawArrays(gl.POINTS,0,particleCount);",
    // Block comment: the draw call shares its line with the closing brace.
    "/* Mist, waterfall spray and visitor sparkles disabled. */",
  );
  const hook = \`
const treeNames=new Set(['Twisted_trunk_and_roots','Living_tree_leaves','Perching_branches']);
const removedNames=new Set(['Waterfalls_and_stream','Waterfall_foam','Fence_and_lantern_post','Lantern_bronze','Lantern_warm_glass']);
const islandNames=new Set(['Cliff_and_boulders','Earth_under_the_meadow','Meadow','Sand_and_path_stones','Windblown_grass','Wildflowers','Hanging_vines_and_ferns']);
let original=[],oak=[],variant='A',islands={},islandVariant='aeria',treeVisible=true;
function select(value){
 if(value!=='A'&&value!=='B')throw Error('Only A/B supported');
 if(value==='B'&&!oak.length)throw Error('Oak not loaded');
 variant=value;
 for(const m of original)m.hidden=!!(m.birdPart||m.boyPart||removedNames.has(m.name)||(treeNames.has(m.name)&&(value==='B'||!treeVisible))||(islandNames.has(m.name)&&islandVariant!=='aeria'));
 for(const m of oak)m.hidden=value!=='B'||!treeVisible;
 for(const [key,list] of Object.entries(islands))for(const m of list)m.hidden=key!==islandVariant;
}
function view(name){const p=(\${JSON.stringify({...VIEWS,...ISLAND_VIEWS})})[name];if(!p)throw Error('Unknown view');cam.target=[...p.target];window.__island.setCamera(p.yaw,p.pitch,p.dist);}
window.__comparison={
 install(bytes){
  if(oak.length)throw Error('Snapshot already installed');
  original=[...meshes];const start=meshes.length;parseGLB(bytes);oak=meshes.slice(start);
  const placement=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,\${PLACEMENT.translation.join(",")},1]);
  for(const m of oak)m.model=M.mul(placement,m.model);
  Object.assign(S,{time:0,wind:0,auto:false,paused:true,sunset:0,targetSunset:0,quality:'high'});forcedTime=0;setupShadows();
  select('A');view('island');$('loading').style.display='none';
 },select,view,
 installIslands(snapshots){
  if(Object.keys(islands).length)throw Error('Islands already installed');
  for(const name of islandNames)if(!original.some(m=>m.name===name))throw Error('Missing AERIA island part: '+name);
  for(const [key,bytes] of Object.entries(snapshots)){const start=meshes.length;parseGLB(bytes);islands[key]=meshes.slice(start);}
  select(variant);
 },
 selectIsland(value){if(value!=='aeria'&&!islands[value])throw Error('Unknown island');islandVariant=value;select(variant);},
 showTree(value){treeVisible=!!value;select(variant);},
 report:()=>({variant,islandVariant,treeVisible,islandMeshes:Object.fromEntries(Object.entries(islands).map(([key,list])=>[key,list.length])),state:{...S},camera:JSON.parse(JSON.stringify(cam)),sun:[...sun],shadowSize,lightMatrix:Array.from(lightMatrix),viewport:[innerWidth,innerHeight],canvas:[canvas.width,canvas.height],dpr:devicePixelRatio,
  placement:\${JSON.stringify(PLACEMENT)},particles:false,lanternLight:false,
  visible:meshes.filter(m=>!m.hidden).map(m=>({name:m.name,triangles:m.count/3,kind:m.kind,model:Array.from(m.model)})),
  hidden:meshes.filter(m=>m.hidden).map(m=>m.name),oakMeshes:oak.length,glError:gl.getError()})
};
\`;
  script = replaceOnce(script, "start();\\n})();", hook + "\\nstart();\\n})();");
  script = replaceOnce(
    script,
    "window.__ready=true;requestAnimationFrame(render);",
    "window.__ready=true; S.paused=true; S.wind=0; forcedTime=0; requestAnimationFrame(render);",
  );
  if (fullAmbiance) {
    script = replaceOnce(script, '// Lantern light disabled for both variants.', 'col+=vec3(1.0,.48,.1)*lamp*base*.9;');
    script = replaceOnce(script, '/* Mist, waterfall spray and visitor sparkles disabled. */', 'gl.drawArrays(gl.POINTS,0,500);');
    script = replaceOnce(script, "const removedNames=new Set(['Waterfalls_and_stream','Waterfall_foam','Fence_and_lantern_post','Lantern_bronze','Lantern_warm_glass']);", 'const removedNames=new Set();');
    script = replaceOnce(script, 'particles:false,lanternLight:false,', 'particles:true,lanternLight:true,');
  }
  if (quietAmbiance) {
    script = replaceOnce(script, '// Lantern light disabled for both variants.', 'col+=vec3(1.0,.48,.1)*lamp*base*.9;');
    script = replaceOnce(script, '/* Mist, waterfall spray and visitor sparkles disabled. */', 'gl.drawArrays(gl.POINTS,0,90);');
    script = replaceOnce(script, "const removedNames=new Set(['Waterfalls_and_stream','Waterfall_foam','Fence_and_lantern_post','Lantern_bronze','Lantern_warm_glass']);", "const removedNames=new Set(['Waterfalls_and_stream','Waterfall_foam']);");
    script = replaceOnce(script, 'drawMeshes(main,env,bgVP);', '/* Distant islands excluded by the agreed scene scope. */');
    script = replaceOnce(script, 'particles:false,lanternLight:false,', 'particles:true,lanternLight:true,waterfalls:false,distantIslands:false,');
  }
  // The packaged viewer expects the DevKit collector and Aeria inventory beside it (see package.py).
  script = \`const AERIA_HTML_BYTES=0;\\nconst createPerformanceCollector=\${String(createPerformanceCollector)};\\n\${inventory}\\n\${script}\`;
  const css = \`<style>header,.intro,.scenebadge,.side-tools,.dock,footer,#hint,.bird-card,#show-ui,#toast{display:none!important}</style>\`;
  return template
    .replace(
      "Объёмный остров с деревом и девятью разноцветными птицами.",
      "Статическое сравнение дерева AERIA и дуба на одном острове.",
    )
    .replace("</head>", css + "</head>")
    .replace("__MODEL__", "")
    .replace("__SUNNY__", "")
    .replace("__SUNNY_RUNTIME__", "")
    // Function replacer: the viewer source is full of \`$\` that must not act as patterns.
    .replace("__SCRIPT__", () => script.replace(/<\\/script/gi, "<\\\\/script"));
}
`,Re=`import * as T from "three";

export type MeshRecord = {
  name: string;
  vertices: number;
  triangles: number;
  instances: number;
  sourceVertices: number;
  sourceTriangles: number;
  shaderKind: number;
};
export type ExportMetadata = {
  bounds: { min: number[]; max: number[] };
  meshes: MeshRecord[];
  vertices: number;
  triangles: number;
  instances: number;
  colorSpace: string;
};
export type AeriaSnapshot = { bytes: Uint8Array; metadata: ExportMetadata };
type Accessor = {
  bufferView: number;
  componentType: number;
  count: number;
  type: string;
  min?: number[];
  max?: number[];
};

/** Static opaque triangle snapshots only. Colors stay linear, as in Three's runtime
 * and AERIA's lighting input; no display gamma is applied to stored attributes. */
export function exportAeriaSnapshot(root: T.Object3D): AeriaSnapshot {
  root.updateWorldMatrix(true, true);
  const records: MeshRecord[] = [],
    chunks: Uint8Array[] = [],
    accessors: Accessor[] = [];
  const views: { buffer: number; byteOffset: number; byteLength: number }[] =
    [];
  const primitives: {
    attributes: Record<string, number>;
    indices: number;
    material: number;
  }[] = [];
  const materials: {
    pbrMetallicRoughness: {
      baseColorFactor: number[];
      roughnessFactor: number;
      metallicFactor: number;
    };
    extras: { shaderKind: number };
    doubleSided: boolean;
  }[] = [];
  let byteLength = 0;
  const bounds = new T.Box3();
  function attribute(
    array: Float32Array | Uint32Array,
    size: number,
    box?: T.Box3,
  ) {
    const id = accessors.length;
    views.push({
      buffer: 0,
      byteOffset: byteLength,
      byteLength: array.byteLength,
    });
    chunks.push(new Uint8Array(array.buffer));
    byteLength += array.byteLength;
    accessors.push({
      bufferView: id,
      componentType: array instanceof Uint32Array ? 5125 : 5126,
      count: array.length / size,
      type: size === 1 ? "SCALAR" : \`VEC\${size}\`,
      ...(box ? { min: box.min.toArray(), max: box.max.toArray() } : {}),
    });
    return id;
  }
  root.traverseVisible((object) => {
    if (!(object instanceof T.Mesh)) return;
    if (object instanceof T.SkinnedMesh || Array.isArray(object.material))
      throw Error("Unsupported skinned/multi-material mesh");
    const material = object.material;
    if (
      !(material instanceof T.MeshStandardMaterial) ||
      material.map ||
      material.alphaMap ||
      material.normalMap ||
      material.displacementMap ||
      material.transparent ||
      material.opacity !== 1
    )
      throw Error("Snapshot requires opaque untextured MeshStandardMaterial");
    if (!material.visible) return;
    const g = object.geometry;
    if (
      Object.values(g.morphAttributes).some(
        (a) => Array.isArray(a) && a.length > 0,
      ) ||
      g.drawRange.start !== 0 ||
      g.drawRange.count !== Infinity
    )
      throw Error("Unsupported morph targets or partial draw range");
    const p = g.getAttribute("position"),
      n = g.getAttribute("normal"),
      c = material.vertexColors ? g.getAttribute("color") : undefined;
    if (
      !p ||
      !n ||
      p.count !== n.count ||
      p.itemSize !== 3 ||
      n.itemSize !== 3 ||
      (c && (c.count !== p.count || c.itemSize !== 3))
    )
      throw Error("Invalid position/normal/RGB attributes");
    const instances = object instanceof T.InstancedMesh ? object.count : 1;
    if (!instances) return;
    const indexCount = g.index?.count ?? p.count;
    if (indexCount % 3) throw Error("Only triangle geometry is supported");
    const positions = new Float32Array(p.count * instances * 3),
      normals = new Float32Array(positions.length);
    const colors = new Float32Array(p.count * instances * 4),
      indices = new Uint32Array(indexCount * instances);
    const matrix = new T.Matrix4(),
      local = new T.Matrix4(),
      normalMatrix = new T.Matrix3();
    const point = new T.Vector3(),
      normal = new T.Vector3(),
      tint = new T.Color(),
      box = new T.Box3();
    for (let instance = 0; instance < instances; instance++) {
      matrix.copy(object.matrixWorld);
      tint.copy(material.color);
      if (object instanceof T.InstancedMesh) {
        object.getMatrixAt(instance, local);
        matrix.multiply(local);
        if (object.instanceColor) {
          const color = new T.Color();
          object.getColorAt(instance, color);
          tint.multiply(color);
        }
      }
      const determinant = matrix.determinant();
      if (!Number.isFinite(determinant) || Math.abs(determinant) < 1e-15)
        throw Error("Singular or invalid transform");
      normalMatrix.getNormalMatrix(matrix);
      for (let i = 0; i < p.count; i++) {
        const offset = instance * p.count + i;
        point.fromBufferAttribute(p, i).applyMatrix4(matrix);
        normal.fromBufferAttribute(n, i).applyMatrix3(normalMatrix).normalize();
        positions.set(point.toArray(), offset * 3);
        normals.set(normal.toArray(), offset * 3);
        // Bounds describe the actual Float32 export, not a double precision estimate.
        point.fromArray(positions, offset * 3);
        box.expandByPoint(point);
        colors.set(
          [
            tint.r * (c?.getX(i) ?? 1),
            tint.g * (c?.getY(i) ?? 1),
            tint.b * (c?.getZ(i) ?? 1),
            1,
          ],
          offset * 4,
        );
      }
      for (let i = 0; i < indexCount; i += 3)
        for (let j = 0; j < 3; j++) {
          const source = i + (determinant < 0 && j > 0 ? 3 - j : j);
          const index = g.index?.getX(source) ?? source;
          if (!Number.isInteger(index) || index < 0 || index >= p.count)
            throw Error("Invalid triangle index");
          indices[instance * indexCount + i + j] = instance * p.count + index;
        }
    }
    for (const array of [positions, normals, colors])
      if (array.some((x) => !Number.isFinite(x)))
        throw Error("Non-finite attribute");
    const shaderKind =
      object.userData.aeriaKind ?? (object instanceof T.InstancedMesh ? 1 : 0);
    if (shaderKind !== 0 && shaderKind !== 1)
      throw Error("Unsupported shader kind");
    const id = records.length;
    primitives.push({
      attributes: {
        POSITION: attribute(positions, 3, box),
        NORMAL: attribute(normals, 3),
        COLOR_0: attribute(colors, 4),
      },
      indices: attribute(indices, 1),
      material: id,
    });
    materials.push({
      pbrMetallicRoughness: {
        baseColorFactor: [1, 1, 1, 1],
        roughnessFactor: material.roughness,
        metallicFactor: 0,
      },
      extras: { shaderKind },
      doubleSided: true,
    });
    records.push({
      name: object.name || \`Mesh_\${id}\`,
      vertices: p.count * instances,
      triangles: (indexCount * instances) / 3,
      instances: object instanceof T.InstancedMesh ? instances : 0,
      sourceVertices: p.count,
      sourceTriangles: indexCount / 3,
      shaderKind,
    });
    bounds.union(box);
  });
  if (!records.length) throw Error("No visible geometry");
  const json = {
    asset: {
      version: "2.0",
      generator: "Quiet Garden AERIA static snapshot 1",
    },
    scene: 0,
    scenes: [{ nodes: records.map((_, i) => i) }],
    nodes: records.map((r, i) => ({ name: r.name, mesh: i })),
    meshes: records.map((r, i) => ({
      name: r.name,
      primitives: [primitives[i]],
    })),
    materials,
    accessors,
    bufferViews: views,
    buffers: [{ byteLength }],
  };
  const encoded = new TextEncoder().encode(JSON.stringify(json));
  const jsonLength = Math.ceil(encoded.length / 4) * 4;
  const bytes = new Uint8Array(28 + jsonLength + byteLength),
    header = new DataView(bytes.buffer);
  header.setUint32(0, 0x46546c67, true);
  header.setUint32(4, 2, true);
  header.setUint32(8, bytes.length, true);
  header.setUint32(12, jsonLength, true);
  header.setUint32(16, 0x4e4f534a, true);
  bytes.fill(32, 20, 20 + jsonLength);
  bytes.set(encoded, 20);
  header.setUint32(20 + jsonLength, byteLength, true);
  header.setUint32(24 + jsonLength, 0x004e4942, true);
  let offset = 28 + jsonLength;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return {
    bytes,
    metadata: {
      bounds: { min: bounds.min.toArray(), max: bounds.max.toArray() },
      meshes: records,
      vertices: records.reduce((s, r) => s + r.vertices, 0),
      triangles: records.reduce((s, r) => s + r.triangles, 0),
      instances: records.reduce((s, r) => s + r.instances, 0),
      colorSpace:
        "linear RGB; runtime vertex × material × instance; AERIA lighting without material emissive",
    },
  };
}
`,Ie=`import * as T from 'three';
import { createIslandSurface, ISLAND_DEFAULTS } from '../island-generator/engine';
import { createIslandObject } from '../island-generator/render';
import { exportAeriaSnapshot } from './export';
import { PLACEMENT } from './aeria-document';

/** Split material groups for the existing AERIA exporter, without changing source geometry. */
export function exportIslandSnapshot(foundation: 'standard' | 'tapered') {
  const parameters = {...ISLAND_DEFAULTS, foundation};
  const surface = createIslandSurface(32768, parameters);
  const island = createIslandObject(surface), snapshot = new T.Group();
  const copies: T.BufferGeometry[] = [];
  const translation = [PLACEMENT.translation[0], PLACEMENT.translation[1] - surface.heightAt(0,0), PLACEMENT.translation[2]];
  try {
    island.group.updateMatrixWorld(true);
    island.group.traverseVisible(object => {
      if (!(object instanceof T.Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      const groups = Array.isArray(object.material) ? object.geometry.groups : [{start:0,count:object.geometry.index?.count ?? object.geometry.getAttribute('position').count,materialIndex:0}];
      for(const [part,group] of groups.entries()) {
        const geometry = object.geometry.clone();copies.push(geometry);
        const index = object.geometry.index;
        geometry.setIndex(Array.from({length:group.count},(_,i)=>index ? index.getX(group.start+i) : group.start+i));
        geometry.clearGroups();
        const mesh = new T.Mesh(geometry,materials[group.materialIndex ?? 0]);
        mesh.name=\`OurIsland_\${snapshot.children.length}_\${object.name || 'Mesh'}_\${part}\`;
        mesh.matrix.copy(object.matrixWorld);mesh.matrixAutoUpdate=false;
        snapshot.add(mesh);
      }
    });
    snapshot.position.fromArray(translation);
    const result=exportAeriaSnapshot(snapshot);
    return {...result,recipe:{seed:32768,parameters},placement:{scale:1,translation,rotation:[0,0,0],rule:'Unscaled source geometry; planting surface at the fixed oak origin. No per-variant camera fitting.'}};
  } finally {
    copies.forEach(g=>g.dispose());island.dispose();snapshot.clear();
  }
}
`,je=`export type IslandParameters = {
  foundation?: 'standard' | 'tapered';
  width: number;
  depth: number;
  thickness: number;
  relief: number;
  irregularity: number;
  rocks: number;
  roundness: number;
  decorations: number;
  decorScale: number;
  clearing: number;
  grassColor: string;
  stoneColor: string;
};
export const ISLAND_DEFAULTS: IslandParameters = {
  width: 6.2,
  depth: 4.5,
  thickness: 0.8,
  relief: 0.18,
  irregularity: 0.15,
  rocks: 8,
  roundness: 0.6,
  decorations: 6,
  decorScale: 1,
  clearing: 0.45,
  grassColor: "#abc468",
  stoneColor: "#939689",
};
export const ISLAND_CONTROLS = {
  width: ["Ширина", 4, 8, 0.1],
  depth: ["Глубина", 3, 6, 0.1],
  thickness: ["Толщина основания", 0.4, 1.4, 0.05],
  relief: ["Высота рельефа", 0, 0.5, 0.01],
  irregularity: ["Неровность края", 0, 0.3, 0.01],
  rocks: ["Крупные камни", 5, 14, 1],
  roundness: ["Округлость камней", 0, 1, 0.05],
  decorations: ["Группы растений", 0, 12, 1],
  decorScale: ["Размер растений", 0.5, 2, 0.05],
  clearing: ["Свободная зона", 0.25, 0.65, 0.01],
} as const;
export type IslandControl = keyof typeof ISLAND_CONTROLS;
export type IslandElement = {
  id: number;
  x: number;
  z: number;
  angle: number;
  size: number;
};
export type IslandSurface = {
  seed: number;
  parameters: IslandParameters;
  edgeRadius: (angle: number) => number;
  heightAt: (x: number, z: number) => number;
  contains: (x: number, z: number) => boolean;
  rocks: IslandElement[];
  decorations: IslandElement[];
};

// Independent keyed samples keep every element stable as counts change.
function sample(seed: number, id: number, channel: number) {
  let n =
    (seed ^
      Math.imul(id + 1, 0x9e3779b9) ^
      Math.imul(channel + 1, 0x85ebca6b)) >>>
    0;
  n = Math.imul(n ^ (n >>> 16), 0x21f0aaad);
  n = Math.imul(n ^ (n >>> 15), 0x735a2d97);
  return ((n ^ (n >>> 15)) >>> 0) / 4294967296;
}

export function createIslandSurface(
  seed: number,
  input: IslandParameters,
): IslandSurface {
  const p = { ...input };
  const offset = sample(seed, 0, 20) * Math.PI * 2;
  const edgeRadius = (a: number) =>
    1 +
    p.irregularity *
      (Math.sin(a * 3 + offset) * 0.38 +
        Math.sin(a * 5 - offset) * 0.2 +
        Math.cos(a * 7) * 0.08);
  const normalized = (x: number, z: number) => {
    const nx = x / (p.width / 2),
      nz = z / (p.depth / 2);
    return Math.hypot(nx, nz) / edgeRadius(Math.atan2(nz, nx));
  };
  const heightAt = (x: number, z: number) => {
    const r = Math.min(1, normalized(x, z));
    return (
      0.1 +
      p.relief *
        ((1 - r * r) * 0.7 +
          Math.sin(x * 1.4 + offset) *
            Math.cos(z * 1.6 - offset) *
            (1 - r) *
            0.3)
    );
  };
  const elements = (
    count: number,
    channel: number,
    inner: number,
    outer: number,
  ) =>
    Array.from({ length: count }, (_, id) => {
      const angle =
        offset + id * 2.3999632297 + (sample(seed, id, channel) - 0.5) * 0.14;
      const r = inner + sample(seed, id, channel + 1) * (outer - inner);
      return {
        id,
        angle,
        x: (Math.cos(angle) * r * edgeRadius(angle) * p.width) / 2,
        z: (Math.sin(angle) * r * edgeRadius(angle) * p.depth) / 2,
        size: 0.85 + sample(seed, id, channel + 2) * 0.3,
      };
    });
  return {
    seed,
    parameters: p,
    edgeRadius,
    heightAt,
    contains: (x, z) => normalized(x, z) <= 1,
    rocks: elements(p.rocks, 2, 0.79, 0.89),
    decorations: elements(p.decorations, 10, p.clearing + 0.09, 0.86),
  };
}
`,Ce=`import * as THREE from 'three';
import type { IslandSurface } from './engine';

/** Trial 1: a continuous, offset rock mass under the unchanged planting surface. */
export function createTaperedFoundation(surface: IslandSurface, segments = 80) {
  const p = surface.parameters;
  const phase = (surface.seed >>> 0) / 4294967296 * Math.PI * 2;
  const depth = p.thickness * 2.8;
  const levels = [
    { radius: 1, drop: 0, shift: 0 },
    { radius: 1.01, drop: .1, shift: 0 },
    { radius: .98, drop: .3, shift: .12 },
    { radius: .79, drop: .66, shift: .5 },
    { radius: .48, drop: .9, shift: .8 },
    { radius: .16, drop: 1, shift: 1 },
  ];
  const positions: number[] = [], indices: number[] = [];
  const offsetX = p.width * .065 * Math.cos(phase + .8);
  const offsetZ = p.depth * .075 * Math.sin(phase + .8);
  for (let level = 0; level < levels.length; level++) {
    const profile = levels[level];
    for (let i = 0; i < segments; i++) {
      const a = i * Math.PI * 2 / segments;
      // Piecewise-linear broad faces, not high-frequency noise or stacked rings.
      const sector = a / (Math.PI * 2) * 13;
      const k = Math.floor(sector), f = sector - k;
      const ridge = (j: number) => Math.sin(j * Math.PI * 2 / 13 * 3 + phase) * .6
        + Math.cos(j * Math.PI * 2 / 13 * 5 - phase) * .4;
      const fold = THREE.MathUtils.lerp(ridge(k), ridge(k + 1), f);
      const strength = [0, .02, .085, .14, .1, .035][level];
      const radius = surface.edgeRadius(a) * profile.radius * (1 + fold * strength);
      const x = Math.cos(a) * p.width / 2 * radius + offsetX * profile.shift;
      const z = Math.sin(a) * p.depth / 2 * radius + offsetZ * profile.shift;
      const y = level === 0 ? surface.heightAt(x,z)
        : level === 1 ? .025 - .1 * (.5 + .5 * Math.sin(a * 5 + .8))
        : .1 - depth * profile.drop + depth * .045 * Math.sin(a * 3 + phase + level * .6) * Math.sin(profile.drop * Math.PI);
      positions.push(x,y,z);
    }
  }
  for(let level=0;level<levels.length-1;level++)for(let i=0;i<segments;i++){
    const j=(i+1)%segments,a=level*segments,b=a+segments;
    indices.push(a+i,a+j,b+i,a+j,b+j,b+i);
  }
  const bottom=positions.length/3;
  positions.push(offsetX,.1-depth*1.04,offsetZ);
  for(let i=0;i<segments;i++)indices.push(bottom,(levels.length-1)*segments+i,(levels.length-1)*segments+(i+1)%segments);
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  geometry.setIndex(indices);geometry.computeVertexNormals();
  // Exact rim shares the old turf/stone boundary and planting height.
  geometry.addGroup(0,segments*6,0);
  geometry.addGroup(segments*6,indices.length-segments*6,1);
  return geometry;
}
`,Ve=`import * as THREE from "three";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import type { IslandSurface } from "./engine";
import { createTaperedFoundation } from './foundation';

export function createIslandObject(surface: IslandSurface) {
  const p = surface.parameters;
  const group = new THREE.Group();
  group.name = "ProceduralIsland";
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const material = (color: string, flatShading = false) => {
    const result = new THREE.MeshStandardMaterial({
      color,
      roughness: 1,
      flatShading,
    });
    materials.add(result);
    return result;
  };
  const grass = material(p.grassColor);
  const stone = material(p.stoneColor, p.roundness < 0.35);
  const darkerStone = material(
    new THREE.Color(p.stoneColor).multiplyScalar(0.83).getStyle(),
  );
  const foliage = material(
    new THREE.Color(p.grassColor).multiplyScalar(0.75).getStyle(),
  );
  const petals = material("#fff3c8");
  const center = material("#e3bc66");
  const add = (
    geometry: THREE.BufferGeometry,
    mat: THREE.Material,
    parent = group,
  ) => {
    geometries.add(geometry);
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  // A closed radial surface. All planting uses exactly the same height function.
  const segments = 80,
    rings = 12;
  const positions: number[] = [0, surface.heightAt(0, 0), 0];
  for (let ring = 1; ring <= rings; ring++) {
    for (let i = 0; i < segments; i++) {
      const a = (i * Math.PI * 2) / segments;
      const r = (ring / rings) * surface.edgeRadius(a);
      const x = ((Math.cos(a) * p.width) / 2) * r,
        z = ((Math.sin(a) * p.depth) / 2) * r;
      positions.push(x, surface.heightAt(x, z), z);
    }
  }
  const indices: number[] = [];
  for (let i = 0; i < segments; i++)
    indices.push(0, 1 + ((i + 1) % segments), 1 + i);
  for (let ring = 1; ring < rings; ring++) {
    const prev = 1 + (ring - 1) * segments,
      next = prev + segments;
    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments;
      indices.push(prev + i, prev + j, next + i, prev + j, next + j, next + i);
    }
  }
  const top = new THREE.BufferGeometry();
  top.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  top.setIndex(indices);
  top.computeVertexNormals();
  add(top, grass);

  const sidePositions: number[] = [],
    sideIndices: number[] = [];
  for (let level = 0; level < 4; level++) {
    for (let i = 0; i < segments; i++) {
      const a = (i * Math.PI * 2) / segments;
      const r = surface.edgeRadius(a) * [1, 1.015, 0.97, 0.79][level];
      sidePositions.push(
        ((Math.cos(a) * p.width) / 2) * r,
        [
          0.1,
          0.025 - 0.1 * (0.5 + 0.5 * Math.sin(a * 5 + 0.8)),
          -p.thickness * 0.73,
          -p.thickness,
        ][level],
        ((Math.sin(a) * p.depth) / 2) * r,
      );
    }
  }
  for (let l = 0; l < 3; l++)
    for (let i = 0; i < segments; i++) {
      const j = (i + 1) % segments,
        a = l * segments,
        b = a + segments;
      sideIndices.push(a + i, a + j, b + i, a + j, b + j, b + i);
    }
  const bottom = sidePositions.length / 3;
  sidePositions.push(0, -p.thickness, 0);
  for (let i = 0; i < segments; i++)
    sideIndices.push(
      bottom,
      3 * segments + i,
      3 * segments + ((i + 1) % segments),
    );
  const side = new THREE.BufferGeometry();
  side.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(sidePositions, 3),
  );
  side.setIndex(sideIndices);
  side.computeVertexNormals();
  // Thin green turf lip over the continuous stone core.
  side.clearGroups();
  side.addGroup(0, segments * 6, 0);
  side.addGroup(segments * 6, sideIndices.length - segments * 6, 1);
  const foundation = p.foundation === 'tapered' ? createTaperedFoundation(surface) : side;
  if (foundation !== side) side.dispose();
  geometries.add(foundation);
  const rim = new THREE.Mesh(foundation, [grass, darkerStone]);
  rim.name = 'IslandFoundation';
  rim.castShadow = true;
  rim.receiveShadow = true;
  group.add(rim);

  const rawRock = new THREE.IcosahedronGeometry(1, 1);
  rawRock.deleteAttribute("normal");
  rawRock.deleteAttribute("uv");
  const smoothRock = mergeVertices(rawRock);
  rawRock.dispose();
  smoothRock.computeVertexNormals();
  const rockGeometry = smoothRock.toNonIndexed();
  smoothRock.dispose();
  const a = rockGeometry.getAttribute("position");
  for (let i = 0; i < a.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(a, i);
    // Broad, rounded boulders with restrained irregularity, independent of count.
    const bump =
      Math.sin(v.x * 5 + v.z * 3) *
      Math.cos(v.y * 4) *
      0.07 *
      (1 - p.roundness);
    v.multiplyScalar(1 + bump);
    a.setXYZ(i, v.x, v.y, v.z);
  }
  const smoothNormals = rockGeometry.getAttribute("normal").clone();
  rockGeometry.computeVertexNormals();
  const normals = rockGeometry.getAttribute("normal");
  for (let i = 0; i < normals.count; i++) {
    const normal = new THREE.Vector3()
      .fromBufferAttribute(normals, i)
      .lerp(
        new THREE.Vector3().fromBufferAttribute(smoothNormals, i),
        p.roundness,
      )
      .normalize();
    normals.setXYZ(i, normal.x, normal.y, normal.z);
  }
  geometries.add(rockGeometry);
  for (const rock of surface.rocks) {
    const mesh = add(rockGeometry, stone);
    mesh.name = \`rock-\${rock.id}\`;
    mesh.position.set(
      rock.x,
      surface.heightAt(rock.x, rock.z) - p.thickness * 0.7,
      rock.z,
    );
    mesh.rotation.set(
      0.12 * Math.sin(rock.id),
      -rock.angle,
      0.08 * Math.cos(rock.id),
    );
    mesh.scale.set(
      p.width * 0.17 * rock.size,
      p.thickness * 0.64,
      p.depth * 0.16 * rock.size,
    );
  }

  // Shared small leaf and flower geometry; dimensions stay fixed through tree growth.
  const leafGeometry = new THREE.SphereGeometry(1, 5, 4);
  const petalGeometry = new THREE.SphereGeometry(1, 6, 4);
  const stalkGeometry = new THREE.CylinderGeometry(0.003, 0.004, 0.07, 5);
  const centerGeometry = new THREE.SphereGeometry(0.006, 6, 4);
  [leafGeometry, petalGeometry, stalkGeometry, centerGeometry].forEach((g) =>
    geometries.add(g),
  );
  for (const plant of surface.decorations) {
    const patch = new THREE.Group();
    patch.name = \`decor-\${plant.id}\`;
    patch.position.set(plant.x, surface.heightAt(plant.x, plant.z), plant.z);
    patch.rotation.y = plant.angle;
    patch.scale.setScalar(p.decorScale);
    group.add(patch);
    for (let i = 0; i < 4; i++) {
      const angle = i * 2.4;
      const leaf = add(leafGeometry, foliage, patch);
      leaf.scale.set(0.013, 0.03, 0.007);
      leaf.position.set(
        Math.cos(angle) * 0.014,
        0.026,
        Math.sin(angle) * 0.014,
      );
      leaf.rotation.set(Math.cos(angle) * 0.6, angle, Math.sin(angle) * 0.6);
    }
    if (plant.id % 2 === 0) {
      const flower = new THREE.Group();
      flower.position.x = 0.035;
      patch.add(flower);
      const stalk = add(stalkGeometry, foliage, flower);
      stalk.position.y = 0.035;
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const petal = add(petalGeometry, petals, flower);
        petal.position.set(
          Math.cos(angle) * 0.014,
          0.073,
          Math.sin(angle) * 0.014,
        );
        petal.scale.set(0.011, 0.004, 0.011);
      }
      const heart = add(centerGeometry, center, flower);
      heart.position.y = 0.076;
    }
  }
  return {
    group,
    surface,
    dispose() {
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      group.clear();
    },
  };
}
`,Oe=`import * as T from "three";
import { createBlenderTree } from "../oak-growth/render";
import { freshScenario } from "../oak-growth/engine";

import { applyOakDome, DOME_RECIPE, FULL_DOME_RECIPE } from "./oak-dome";

export type OakCrown = "original" | "cap-v1" | "dome-v1" | "dome-v2";
export function oakCrownRecipe(crown: OakCrown) {
  return crown === 'dome-v2' ? FULL_DOME_RECIPE : crown === 'dome-v1' ? DOME_RECIPE : crown === 'cap-v1' ? CAP_RECIPE : {id:'original'};
}
export const CAP_RECIPE = {
  id: "cap-v1", transition: [1.6, 3.2], center: [0.1, 4.5, 0],
  height: 4.35, verticalSpread: 0.64, dome: 0.025, width: 0.78, depth: 1.08,
  hypothesis: "Bring existing crown tiers into a broad connected dome; no new leaves or branches",
  scope: "Static adult art trial only; growth and wind not approved",
} as const;
export function selectedOakCrown(search: string): OakCrown {
  const crown = new URLSearchParams(search).get('crown');
  return crown === 'cap-v1' || crown === 'dome-v1' || crown === 'dome-v2' ? crown : 'original';
}

/** One smooth spatial field moves wood and attachment points together.
 * Leaf geometry remains rigid; local orientation follows the deformed wood. */
function warp(p: T.Vector3, out: T.Vector3) {
  const r=CAP_RECIPE, u=T.MathUtils.clamp((p.y-r.transition[0])/(r.transition[1]-r.transition[0]),0,1);
  const w=u*u*(3-2*u), x=p.x-r.center[0], z=p.z-r.center[2];
  return out.set(r.center[0]+x*(1+w*(r.width-1)),
    T.MathUtils.lerp(p.y,r.height+r.verticalSpread*(p.y-r.center[1])-r.dome*(x*x+z*z),w),
    r.center[2]+z*(1+w*(r.depth-1)));
}
function derivative(p: T.Vector3, out: T.Matrix3) {
  const h=1e-4, plus=new T.Vector3(),minus=new T.Vector3(),a=new T.Vector3(),b=new T.Vector3();
  const columns=[];
  for(let axis=0;axis<3;axis++) {
    plus.copy(p).setComponent(axis,p.getComponent(axis)+h);
    minus.copy(p).setComponent(axis,p.getComponent(axis)-h);
    columns.push(warp(plus,a).sub(warp(minus,b)).multiplyScalar(1/(2*h)).clone());
  }
  return out.set(columns[0].x,columns[1].x,columns[2].x,columns[0].y,columns[1].y,columns[2].y,columns[0].z,columns[1].z,columns[2].z);
}
export function applyOakCrown(group: T.Group) {
  const p=new T.Vector3(),q=new T.Vector3(),n=new T.Vector3(),j=new T.Matrix3();
  group.traverse(o=>{
    if(!(o instanceof T.Mesh)||!o.visible)return;
    if(o instanceof T.InstancedMesh) {
      const matrix=new T.Matrix4(),position=new T.Vector3(),rotation=new T.Quaternion(),scale=new T.Vector3();
      const x=new T.Vector3(),y=new T.Vector3(),z=new T.Vector3(),basis=new T.Matrix4();
      for(let i=0;i<o.count;i++) {
        o.getMatrixAt(i,matrix);matrix.decompose(position,rotation,scale);derivative(position,j);
        x.set(1,0,0).applyQuaternion(rotation).applyMatrix3(j).normalize();
        y.set(0,1,0).applyQuaternion(rotation).applyMatrix3(j);y.addScaledVector(x,-y.dot(x)).normalize();
        z.crossVectors(x,y).normalize();basis.makeBasis(x,y,z);rotation.setFromRotationMatrix(basis);
        warp(position,q);matrix.compose(q,rotation,scale);o.setMatrixAt(i,matrix);
      }
      o.instanceMatrix.needsUpdate=true;
      o.computeBoundingBox();o.computeBoundingSphere();
    } else {
      const g=o.geometry,positions=g.getAttribute('position'),normals=g.getAttribute('normal');
      for(let i=0;i<positions.count;i++) {
        p.fromBufferAttribute(positions,i);derivative(p,j);
        n.fromBufferAttribute(normals,i).applyMatrix3(j.invert().transpose()).normalize();
        warp(p,q);positions.setXYZ(i,q.x,q.y,q.z);normals.setXYZ(i,n.x,n.y,n.z);
      }
      positions.needsUpdate=true;normals.needsUpdate=true;g.computeBoundingBox();g.computeBoundingSphere();
    }
  });
}

export async function createOakCrownStudy(signal: AbortSignal | undefined, crown: OakCrown) {
  const tree=await createBlenderTree(signal);
  try {
    tree.updateGrowth(1,freshScenario());tree.updateWind(0,0,0);
    const originalBounds=tree.getBounds();
    if(crown==='cap-v1')applyOakCrown(tree.group);
    if(crown==='dome-v1')applyOakDome(tree.group);
    if(crown==='dome-v2')applyOakDome(tree.group, FULL_DOME_RECIPE);
    tree.group.name=\`Oak adult study · \${crown}\`;
    return {...tree,
      // These studies intentionally do not expose a misleading growth preview.
      updateGrowth: () => {}, updateWind: () => {},
      getBounds: () => originalBounds.clone(),
    };
  } catch(error) {tree.dispose();throw error;}
}
`,Le=`import * as T from "three";
import rawStructure from "../oak-growth/assets/structure.json";
import placements from "../oak-growth/assets/instances.json";
import { bez, type Structure, type Vec } from "../oak-growth/engine";

type DomeRecipe = {
  id: string; center: readonly [number,number,number]; radius: readonly [number,number,number];
  minimumElevation: number; groupRootBlend: number; revision: number; hypothesis: string; scope: string;
  distributeShoots?: boolean;
};
export const DOME_RECIPE: DomeRecipe = {
  id: "dome-v1", center: [0, 4.05, 0], radius: [2.35, 1.7, 2.1],
  minimumElevation: 0.02, groupRootBlend: 0.45, revision: 2,
  hypothesis: "Redistribute entire secondary shoot groups on a rounded dome; preserve leaves and their rigid shape",
  scope: "Static adult art trial; growth and full joint verification deferred",
} as const;

export const FULL_DOME_RECIPE: DomeRecipe = {
  ...DOME_RECIPE, id: 'dome-v2', revision: 2, distributeShoots: true,
  center: [0,3.8,0], radius: [3.65,2.65,3.05], minimumElevation: -0.18,
  hypothesis: 'Broader taller plush cap with low side skirts following docs/references/trees/05-plush-dome-oak.png; keep dome-v1 primary branching and leaf count',
};

/** Keep leaf-bearing shoots rigid. Only the supporting branch bases bend to
 * their new attachments; roots and the lower trunk are never remapped. */
export function createOakDomeLayout(recipe: DomeRecipe = DOME_RECIPE) {
  const data=rawStructure as Structure, branches=data.branches;
  const secondary=branches.flatMap((b,id)=>b.kind==='secondary'?[id]:[]);
  const owner=branches.map((_,id)=>{
    while(id>=0 && branches[id].kind!=='secondary')id=branches[id].parent;
    return id;
  });
  // Terminal shoots attached directly to a primary join its nearest crown group.
  branches.forEach((branch,id)=>{
    if(branch.kind!=='shoot'||owner[id]>=0)return;
    const siblings=secondary.filter(s=>branches[s].parent===branch.parent);
    const candidates=siblings.length?siblings:secondary;
    owner[id]=candidates.reduce((best,s)=>new T.Vector3(...branches[s].points[3]).distanceToSquared(new T.Vector3(...branch.points[3]))<new T.Vector3(...branches[best].points[3]).distanceToSquared(new T.Vector3(...branch.points[3]))?s:best,candidates[0]);
  });
  const centers=new Map(secondary.map(id=>[id,new T.Vector3()]));
  const counts=new Map(secondary.map(id=>[id,0]));
  placements.instances.forEach((p,i)=>{
    const id=owner[data.attachments[i][0]];
    if(!centers.has(id))throw Error('Leaf has no secondary crown group');
    centers.get(id)!.add(new T.Vector3(p[0],p[1],p[2]));counts.set(id,counts.get(id)!+1);
  });
  for(const id of secondary)centers.get(id)!.divideScalar(counts.get(id)!);
  const r=recipe;
  const targets=secondary.map((_,i)=>{
    const h=r.minimumElevation+(1-r.minimumElevation)*(i+.5)/secondary.length;
    const radial=Math.sqrt(1-h*h),angle=i*Math.PI*(3-Math.sqrt(5));
    return new T.Vector3(r.center[0]+r.radius[0]*radial*Math.cos(angle),r.center[1]+r.radius[1]*h,r.center[2]+r.radius[2]*radial*Math.sin(angle));
  });
  // Deterministic nearest assignment, followed by pair swaps to reduce crossing.
  const pairs=secondary.flatMap((id,i)=>targets.map((p,j)=>({i,j,d:centers.get(id)!.distanceToSquared(p)}))).sort((a,b)=>a.d-b.d);
  const assignment=new Array<number>(secondary.length).fill(-1),used=new Set<number>();
  for(const {i,j} of pairs)if(assignment[i]<0&&!used.has(j)){assignment[i]=j;used.add(j);}
  for(let pass=0;pass<secondary.length;pass++){
    let changed=false;
    for(let i=0;i<secondary.length;i++)for(let j=i+1;j<secondary.length;j++){
      const a=centers.get(secondary[i])!,b=centers.get(secondary[j])!;
      const before=a.distanceToSquared(targets[assignment[i]])+b.distanceToSquared(targets[assignment[j]]);
      const after=a.distanceToSquared(targets[assignment[j]])+b.distanceToSquared(targets[assignment[i]]);
      if(after+1e-8<before){[assignment[i],assignment[j]]=[assignment[j],assignment[i]];changed=true;}
    }
    if(!changed)break;
  }
  const delta=new Map(secondary.map((id,i)=>[id,targets[assignment[i]].clone().sub(centers.get(id)!)]));
  const shootDelta = new Map<number,T.Vector3>();
  if(r.distributeShoots) {
    const shootCenters = new Map<number,T.Vector3>(), shootCounts = new Map<number,number>();
    placements.instances.forEach((p,i)=>{
      const id=data.attachments[i][0];
      if(!shootCenters.has(id)){shootCenters.set(id,new T.Vector3());shootCounts.set(id,0);}
      shootCenters.get(id)!.add(new T.Vector3(p[0],p[1],p[2]));shootCounts.set(id,shootCounts.get(id)!+1);
    });
    for(const [id,p] of shootCenters)p.divideScalar(shootCounts.get(id)!);
    const ids=[...shootCenters.keys()];
    const destinations=ids.map((_,i)=>{
      const h=r.minimumElevation+(1-r.minimumElevation)*(i+.5)/ids.length;
      const angle=i*Math.PI*(3-Math.sqrt(5)),radial=Math.sqrt(1-h*h);
      // A shallow irregular layer, not an empty mathematically exact shell.
      const depth=.93+.07*Math.sin(i*2.399+1);
      return new T.Vector3(r.center[0]+r.radius[0]*radial*Math.cos(angle)*depth,
        r.center[1]+r.radius[1]*h*depth,r.center[2]+r.radius[2]*radial*Math.sin(angle)*depth);
    });
    const edges=ids.flatMap((id,i)=>{const expected=shootCenters.get(id)!.clone().add(delta.get(owner[id])!);return destinations.map((p,j)=>({i,j,d:expected.distanceToSquared(p)}));}).sort((a,b)=>a.d-b.d);
    const assigned=new Set<number>(),occupied=new Set<number>();
    for(const {i,j} of edges)if(!assigned.has(i)&&!occupied.has(j)){
      assigned.add(i);occupied.add(j);shootDelta.set(ids[i],destinations[j].clone().sub(shootCenters.get(ids[i])!));
    }
  }
  const branchShift=(id:number)=>shootDelta.get(id)??delta.get(owner[id])!;
  const curves: Vec[][]=[], shifts:T.Vector3[]=[];
  const next:Vec=[0,0,0];
  function center(id:number,t:number,out:Vec):Vec {
    const b=branches[id];
    if(b.kind==='secondary'||b.kind==='shoot'){
      bez(b.points,t,out);const shift=branchShift(id);
      const blend = b.kind === 'shoot' ? 0.1 : r.groupRootBlend;
      const correction=shifts[id],u=T.MathUtils.clamp(t/blend,0,1),w=1-u*u*(3-2*u);
      for(let k=0;k<3;k++)out[k]+=shift.getComponent(k)+correction.getComponent(k)*w;
      return out;
    }
    return bez(curves[id],t,out);
  }
  branches.forEach((b,id)=>{
    const points=b.points.map(p=>[...p] as Vec);curves[id]=points;
    if(b.kind==='root'||b.kind==='trunk')return;
    center(b.parent,b.attach,next);
    if(b.kind==='primary'){
      const tip=new T.Vector3(...b.points[3]);
      const radial=T.MathUtils.clamp(Math.hypot(tip.x/DOME_RECIPE.radius[0],tip.z/DOME_RECIPE.radius[2]),0,1);
      const target=new T.Vector3(tip.x*.7,3.85+1.35*Math.sqrt(1-radial*radial),tip.z*.8);
      const startShift=new T.Vector3(...next).sub(new T.Vector3(...b.points[0]));
      const endShift=target.sub(tip);
      for(let i=0;i<4;i++)for(let k=0;k<3;k++)points[i][k]+=T.MathUtils.lerp(startShift.getComponent(k),endShift.getComponent(k),i/3);
    } else {
      shifts[id]=new T.Vector3(...next).sub(new T.Vector3(...b.points[0])).sub(branchShift(id));
    }
  });
  const a:Vec=[0,0,0],b:Vec=[0,0,0],c:Vec=[0,0,0],d:Vec=[0,0,0];
  const oldTangent=new T.Vector3(),newTangent=new T.Vector3(),rotation=new T.Quaternion();
  function frameRotation(id:number,t:number) {
    const left=Math.max(0,t-1e-4),right=Math.min(1,t+1e-4);
    bez(branches[id].points,left,a);bez(branches[id].points,right,b);
    center(id,left,c);center(id,right,d);
    oldTangent.set(b[0]-a[0],b[1]-a[1],b[2]-a[2]).normalize();
    newTangent.set(d[0]-c[0],d[1]-c[1],d[2]-c[2]).normalize();
    return rotation.setFromUnitVectors(oldTangent,newTangent);
  }
  return {
    data, center, frameRotation,
    metadata: {recipe:r,groups:secondary.map((id,i)=>({id,leaves:counts.get(id),before:centers.get(id)!.toArray(),target:targets[assignment[i]].toArray()}))},
  };
}

export function applyOakDome(group: T.Group, recipe: DomeRecipe = DOME_RECIPE, layout = createOakDomeLayout(recipe)) {
  const {data,center,frameRotation}=layout;
  const branches=data.branches,old:Vec=[0,0,0],next:Vec=[0,0,0],offset=new T.Vector3();
  const wood=group.getObjectByName('Wood') as T.Mesh;
  if(!wood)throw Error('Missing bound wood geometry');
  const g=wood.geometry,pos=g.getAttribute('position');
  const rest=Float32Array.from(pos.array),result=new Float32Array(rest.length);
  for(let slot=0;slot<4;slot++){
    const ids=g.getAttribute('_branch'+(slot||'')),ts=g.getAttribute('_along'+(slot||'')),weights=g.getAttribute('_weight'+slot);
    if(!ids||!ts||!weights)throw Error('Missing branch attachment data');
    for(let i=0;i<pos.count;i++){
      const w=weights.getX(i);if(w<1e-7)continue;
      const id=Math.round(ids.getX(i)),t=ts.getX(i);
      bez(branches[id].points,t,old);center(id,t,next);
      offset.set(rest[i*3]-old[0],rest[i*3+1]-old[1],rest[i*3+2]-old[2]).applyQuaternion(frameRotation(id,t));
      for(let k=0;k<3;k++)result[i*3+k]+=w*(next[k]+offset.getComponent(k));
    }
  }
  pos.array.set(result);pos.needsUpdate=true;g.computeVertexNormals();g.computeBoundingBox();g.computeBoundingSphere();
  const batches=group.children.filter((o):o is T.InstancedMesh=>o instanceof T.InstancedMesh&&o.visible);
  if(batches.length!==3)throw Error('Unexpected adult leaf variants');
  const matrix=new T.Matrix4(),position=new T.Vector3(),leafRotation=new T.Quaternion(),scale=new T.Vector3();
  batches.forEach((batch,variant)=>{
    let index=0;
    placements.instances.forEach((p,i)=>{
      if(p[8]!==variant)return;
      const [id,t]=data.attachments[i];bez(branches[id].points,t,old);center(id,t,next);
      batch.getMatrixAt(index,matrix);matrix.decompose(position,leafRotation,scale);
      const rotation=frameRotation(id,t);
      position.sub(new T.Vector3(...old)).applyQuaternion(rotation).add(new T.Vector3(...next));
      leafRotation.premultiply(rotation);matrix.compose(position,leafRotation,scale);
      batch.setMatrixAt(index++,matrix);
    });
    if(index!==batch.count)throw Error('Leaf count mismatch');
    batch.instanceMatrix.needsUpdate=true;batch.computeBoundingBox();batch.computeBoundingSphere();
  });
  group.userData.crownLayout=layout.metadata;
  return layout;
}
`,Be=`import { smooth } from "./math";

export type Vec = [number, number, number];
export type Kind = "trunk" | "root" | "primary" | "secondary" | "shoot";
export type Branch = {
  name: string;
  parent: number;
  attach: number;
  kind: Kind;
  points: Vec[];
};
export type Structure = {
  version: number;
  model: string;
  branches: Branch[];
  attachments: number[][];
};
export type Stage = {
  height: number;
  thickness: number;
  spread: number;
  leaf: number;
};
export type Scenario = {
  version: 1;
  model: "oak-adult-251005-v1";
  name: string;
  stages: Stage[];
  timing: Record<
    "primary" | "secondary" | "shoot" | "leaves",
    [number, number]
  >;
};
export const MODEL = "oak-adult-251005-v1";
export const STAGES = [
  "Росток",
  "Саженец",
  "Молодой ствол",
  "Первые ветви",
  "Молодой дуб",
  "Вся структура",
  "Развитие",
  "Утолщение",
  "Взросление",
  "Принятый дуб",
];
export const DEFAULT_SCENARIO: Scenario = {
  version: 1,
  model: MODEL,
  name: "Рост дуба · проба 01",
  stages: [
    [0.080, 0.018, 0.035, 0.55],
    [0.18, 0.035, 0.09, 0.68],
    [0.29, 0.065, 0.18, 0.78],
    [0.40, 0.12, 0.31, 0.83],
    [0.51, 0.23, 0.46, 0.88],
    [0.62, 0.46, 0.64, 0.92],
    [0.72, 0.6, 0.74, 0.94],
    [0.82, 0.74, 0.83, 0.96],
    [0.91, 0.88, 0.92, 0.98],
    [1, 1, 1, 1],
  ].map(([height, thickness, spread, leaf]) => ({
    height,
    thickness,
    spread,
    leaf,
  })),
  timing: {
    primary: [1.9, 4.6],
    secondary: [2.6, 5.1],
    shoot: [3.0, 5.6],
    leaves: [3.0, 6],
  },
};
export function freshScenario(): Scenario {
  return structuredClone(DEFAULT_SCENARIO);
}
export function decodeScenario(input: unknown): Scenario {
  if (!input || typeof input !== "object")
    throw Error("Ожидается сценарий роста");
  const s = input as Scenario;
  if (s.version !== 1 || s.model !== MODEL)
    throw Error("Сценарий относится к другой модели или версии");
  if (typeof s.name !== "string" || !s.name.trim() || s.name.length > 80)
    throw Error("Имя должно содержать 1–80 символов");
  if (!Array.isArray(s.stages) || s.stages.length !== 10)
    throw Error("Нужно десять стадий");
  for (const key of ["height", "thickness", "spread", "leaf"] as const) {
    let previous = 0;
    for (let i = 0; i < 10; i++) {
      const v = s.stages[i]?.[key];
      if (!Number.isFinite(v) || v < 0.005 || v > 1 || v < previous)
        throw Error("Пропорции должны плавно возрастать в пределах 0,5–100%");
      if (i === 9 && v !== 1) throw Error("Взрослая форма закреплена на 100%");
      previous = v;
    }
  }
  for (const key of ["primary", "secondary", "shoot", "leaves"] as const) {
    const v = s.timing?.[key];
    if (
      !Array.isArray(v) ||
      v.length !== 2 ||
      !v.every(Number.isFinite) ||
      v[0] < 1 ||
      v[1] > 6 ||
      v[1] - v[0] < 0.1
    )
      throw Error("Раскрытие: начало раньше конца, в пределах стадий 1–6");
  }
  return {
    version: 1,
    model: MODEL,
    name: s.name.trim(),
    stages: s.stages.map((v) => ({
      height: v.height,
      thickness: v.thickness,
      spread: v.spread,
      leaf: v.leaf,
    })),
    timing: structuredClone(s.timing),
  };
}
// Same monotone Hermite rule used by the existing tenStageV2 engine. No overshoot.
export type GrowthScenario = Pick<Scenario, 'stages' | 'timing'>;
export type CurveSampler = (id: number, t: number, out: Vec) => Vec;

export function stageValue(
  s: GrowthScenario,
  key: keyof Stage,
  progress: number,
): number {
  const x = Math.max(0, Math.min(1, progress)) * 9,
    i = Math.min(8, Math.floor(x)),
    t = x - i;
  const a = s.stages[i][key],
    b = s.stages[i + 1][key],
    d = b - a;
  const tangent = (l: number, r: number) =>
    l * r <= 0 ? 0 : (2 * l * r) / (l + r);
  const m0 = i === 0 ? d : tangent(a - s.stages[i - 1][key], d),
    m1 = i === 8 ? d : tangent(d, s.stages[i + 2][key] - b);
  return (
    (2 * t ** 3 - 3 * t * t + 1) * a +
    (t ** 3 - 2 * t * t + t) * m0 +
    (-2 * t ** 3 + 3 * t * t) * b +
    (t ** 3 - t * t) * m1
  );
}
export function bez(points: Vec[], t: number, out: Vec): Vec {
  const u = 1 - t;
  for (let k = 0; k < 3; k++)
    out[k] =
      u * u * u * points[0][k] +
      3 * u * u * t * points[1][k] +
      3 * u * t * t * points[2][k] +
      t * t * t * points[3][k];
  return out;
}
export function createGrowthState(data: Structure) {
  return {
    progress: 1,
    shape: { height: 1, thickness: 1, spread: 1, leaf: 1 },
    branches: data.branches.map(() => ({
      origin: [0, 0, 0] as Vec,
      growth: 1,
      radius: 1,
    })),
    leafGrowth: new Float32Array(data.attachments.length),
  };
}
export type GrowthState = ReturnType<typeof createGrowthState>;
export function pointAt(
  data: Structure,
  state: GrowthState,
  id: number,
  t: number,
  out: Vec,
  sample?: CurveSampler,
): Vec {
  const b = data.branches[id],
    s = state.branches[id];
  if (state.progress === 1) return sample ? sample(id, t, out) : bez(b.points, t, out);
  const start = sample ? sample(id, 0, [0,0,0]) : b.points[0];
  if (sample) sample(id, t * s.growth, out);
  else bez(b.points, t * s.growth, out);
  const h = state.shape.height,
    spread = b.kind === "trunk" ? h : b.kind === "root" ? state.shape.thickness : state.shape.spread;
  for (let k = 0; k < 3; k++)
    out[k] = s.origin[k] + (out[k] - start[k]) * (k === 1 ? h : spread);
  return out;
}
export function evaluateGrowth(
  data: Structure,
  progress: number,
  scenario: GrowthScenario,
  state = createGrowthState(data),
  sample?: CurveSampler,
): GrowthState {
  if (!Number.isFinite(progress)) throw Error("Некорректный прогресс");
  state.progress = Math.max(0, Math.min(1, progress));
  const p = state.progress,
    phase = 1 + p * 9;
  for (const key of ["height", "thickness", "spread", "leaf"] as const)
    state.shape[key] = stageValue(scenario, key, p);
  const schedule = (key: keyof Scenario["timing"], rank: number) => {
    const [start, end] = scenario.timing[key],
      birth = start + (end - start) * 0.45 * rank;
    return smooth((phase - birth) / (end - birth));
  };
  data.branches.forEach((b, i) => {
    const s = state.branches[i];
    if (b.parent >= 0) pointAt(data, state, b.parent, b.attach, s.origin, sample);
    else
      for (let k = 0; k < 3; k++)
        s.origin[k] =
          b.points[0][k] * (k === 1 ? state.shape.height : b.kind === "root" ? state.shape.thickness : state.shape.spread);
    if (b.kind === "trunk") s.growth = 1;
    else if (b.kind === "root") s.growth = smooth(p / 0.4);
    else
      s.growth =
        schedule(b.kind, b.attach) *
        smooth(
          (state.branches[b.parent].growth - b.attach) /
            Math.min(0.16, 1 - b.attach),
        );
    s.radius =
      state.shape.thickness * (b.kind === "trunk" ? 1 : Math.sqrt(s.growth));
  });
  data.attachments.forEach(([id, t], i) => {
    const g = state.branches[id].growth;
    state.leafGrowth[i] =
      schedule("leaves", t) * smooth((g - t) / Math.min(0.12, 1 - t));
  });
  return state;
}
`,Ge=`export function smooth(value: number) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}
`,Ue=`import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import woodUrl from "./assets/wood.glb?url";
import leavesUrl from "./assets/leaves.glb?url";
import structureUrl from "./assets/structure.json?url";
import instancesUrl from "./assets/instances.json?url";
import manifest from "./assets/manifest.json";
import {
  createGrowthState,
  evaluateGrowth,
  pointAt,
  bez,
  type GrowthScenario,
  type CurveSampler,
  type Structure,
  type Vec,
} from "./engine";
import { smooth } from "./math";
import { addWind } from "./wind";

export type AdultPreparation = (group: THREE.Group) => CurveSampler;

export async function createBlenderTree(signal?: AbortSignal, prepareAdult?: AdultPreparation) {
  const read = async (url: string) => {
    const r = await fetch(url, { signal });
    if (!r.ok) throw Error(\`Не удалось загрузить дерево (\${r.status})\`);
    return r;
  };
  const [woodBuffer, leafBuffer, data, placement] = await Promise.all([
    read(woodUrl).then((r) => r.arrayBuffer()),
    read(leavesUrl).then((r) => r.arrayBuffer()),
    read(structureUrl).then((r) => r.json()) as Promise<Structure>,
    read(instancesUrl).then((r) => r.json()) as Promise<{
      instances: number[][];
    }>,
  ]);
  const loader = new GLTFLoader();
  const [wood, leaves] = await Promise.all([
    loader.parseAsync(woodBuffer, ""),
    loader.parseAsync(leafBuffer, ""),
  ]);
  const group = new THREE.Group();
  group.name = "Blender oak growth";
  const uniforms = {
    uTime: { value: 0 },
    uWind: { value: 0 },
    uDirection: { value: Math.PI / 4 },
  };
  const geometries = new Set<THREE.BufferGeometry>(),
    materials = new Set<THREE.Material>();
  const register = (root: THREE.Object3D) =>
    root.traverse((o) => {
      if (o instanceof THREE.Mesh) {
        geometries.add(o.geometry);
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) =>
          materials.add(m),
        );
      }
    });
  register(wood.scene);
  register(leaves.scene);
  function material(leaf: boolean) {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: leaf ? 0.88 : 0.92,
      side: leaf ? THREE.DoubleSide : THREE.FrontSide,
    });
    if (leaf) {
      mat.emissive.set("#24320a");
      mat.emissiveIntensity = 0.14;
    }
    const depth = new THREE.MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking,
      side: leaf ? THREE.DoubleSide : THREE.FrontSide,
    });
    addWind(mat, leaf, uniforms);
    addWind(depth, leaf, uniforms);
    materials.add(mat);
    materials.add(depth);
    return { mat, depth };
  }
  wood.scene.updateMatrixWorld(true);
  leaves.scene.updateMatrixWorld(true);
  const mesh = wood.scene.getObjectByName("Wood") as THREE.Mesh;
  mesh.geometry.applyMatrix4(mesh.matrixWorld);
  mesh.position.set(0, 0, 0);
  mesh.quaternion.identity();
  mesh.scale.set(1, 1, 1);
  const wm = material(false);
  mesh.material = wm.mat;
  mesh.customDepthMaterial = wm.depth;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;
  group.add(mesh);
  const pos = mesh.geometry.getAttribute("position") as THREE.BufferAttribute;
  const normal = mesh.geometry.getAttribute("normal") as THREE.BufferAttribute;
  const color = mesh.geometry.getAttribute("color") as THREE.BufferAttribute;
  const restColors = Float32Array.from(
    { length: color.count * 3 },
    (_, i) =>
      [
        color.getX(Math.floor(i / 3)),
        color.getY(Math.floor(i / 3)),
        color.getZ(Math.floor(i / 3)),
      ][i % 3],
  );
  const owners = mesh.geometry.getAttribute("_branch"),
    along = mesh.geometry.getAttribute("_along");
  if (!owners || !along) throw Error("В экспорте нет данных роста");
  const rest = new Float32Array(pos.array),
    restNormals = new Float32Array(normal.array);
  const center: Vec = [0,0,0], current: Vec = [0,0,0];
  const bindings = [0,1,2,3].map(slot => {
    const ids = mesh.geometry.getAttribute("_branch"+(slot || ""));
    const ts = mesh.geometry.getAttribute("_along"+(slot || ""));
    const weights = mesh.geometry.getAttribute("_weight"+slot);
    const offsets = new Float32Array(rest.length);
    for(let i=0;i<pos.count;i++) {
      bez(data.branches[Math.round(ids.getX(i))].points,ts.getX(i),center);
      for(let k=0;k<3;k++) offsets[i*3+k]=rest[i*3+k]-center[k];
    }
    return {ids,ts,weights,offsets};
  });
  const dummy = new THREE.Object3D(),
    v = new THREE.Vector3();
  const leafMeshes: { mesh: THREE.InstancedMesh; indices: number[] }[] = [];
  for (let variant = 0; variant < 3; variant++) {
    const src = leaves.scene.getObjectByName(\`Leaf_\${variant}\`) as THREE.Mesh;
    const geo = src.geometry.clone().applyMatrix4(src.matrixWorld);
    geometries.add(geo);
    const indices = placement.instances.flatMap((p, i) =>
        p[8] === variant ? [i] : [],
      ),
      m = material(true);
    const inst = new THREE.InstancedMesh(geo, m.mat, indices.length);
    inst.customDepthMaterial = m.depth;
    inst.castShadow = true;
    inst.receiveShadow = true;
    inst.frustumCulled = false;
    group.add(inst);
    leafMeshes.push({ mesh: inst, indices });
  }
  const jm = material(true),
    juvenile = new THREE.InstancedMesh(leafMeshes[0].mesh.geometry, jm.mat, 8);
  juvenile.customDepthMaterial = jm.depth;
  juvenile.castShadow = true;
  juvenile.receiveShadow = true;
  juvenile.frustumCulled = false;
  group.add(juvenile);
  let sample: CurveSampler | undefined;
  const leafOffsets = new Float32Array(placement.instances.length * 3);
  if (prepareAdult) {
    // Populate the authored adult before rebinding. No growth deformation accumulates.
    juvenile.visible = false;
    for (const batch of leafMeshes) batch.indices.forEach((index, j) => {
      const p=placement.instances[index];
      dummy.position.fromArray(p);dummy.quaternion.set(p[3],p[4],p[5],p[6]);dummy.scale.setScalar(p[7]);
      dummy.updateMatrix();batch.mesh.setMatrixAt(j,dummy.matrix);
    });
    try { sample = prepareAdult(group); }
    catch(error) {
      geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());
      leafMeshes.forEach(b=>b.mesh.dispose());juvenile.dispose();group.clear();throw error;
    }
    rest.set(pos.array);restNormals.set(normal.array);
    for (const {ids,ts,offsets} of bindings) for(let i=0;i<pos.count;i++) {
      sample(Math.round(ids.getX(i)),ts.getX(i),center);
      for(let k=0;k<3;k++)offsets[i*3+k]=rest[i*3+k]-center[k];
    }
    const matrix=new THREE.Matrix4(),rotation=new THREE.Quaternion(),scale=new THREE.Vector3();
    for(const batch of leafMeshes)batch.indices.forEach((index,j)=>{
      batch.mesh.getMatrixAt(j,matrix);matrix.decompose(v,rotation,scale);
      const p=placement.instances[index];p.splice(0,8,...v.toArray(),...rotation.toArray(),scale.x);
      const [id,t]=data.attachments[index];sample!(id,t,center);
      for(let k=0;k<3;k++)leafOffsets[index*3+k]=p[k]-center[k];
    });
  }
  const state = createGrowthState(data),
    bounds = new THREE.Box3();
  let disposed = false;
  function updateGrowth(progress: number, scenario: GrowthScenario) {
    if (disposed) return;
    evaluateGrowth(data, progress, scenario, state, sample);
    if (state.progress === 1) {
      pos.array.set(rest);
      normal.array.set(restNormals);
      normal.needsUpdate = true;
    } else {
      pos.array.fill(0);
      for (const binding of bindings) {
        const {ids,ts,weights,offsets}=binding;
        for(let i=0;i<pos.count;i++) {
          const weight=weights.getX(i); if(weight<1e-7)continue;
          const id=Math.round(ids.getX(i)), t=ts.getX(i);
          pointAt(data,state,id,t,current,sample);
          const branch=state.branches[id];
          const radius=branch.radius;
          for(let k=0;k<3;k++) pos.array[i*3+k]+=weight*(current[k]+offsets[i*3+k]*radius);
        }
      }
      mesh.geometry.computeVertexNormals();
    }
    pos.needsUpdate = true;
    mesh.geometry.computeBoundingBox();
    bounds.copy(mesh.geometry.boundingBox!);
    const bark = smooth((state.progress - 0.13) / 0.4),
      young = [0.19, 0.245, 0.075];
    for (let i = 0; i < color.count; i++)
      color.setXYZ(
        i,
        young[0] * (1 - bark) + restColors[i * 3] * bark,
        young[1] * (1 - bark) + restColors[i * 3 + 1] * bark,
        young[2] * (1 - bark) + restColors[i * 3 + 2] * bark,
      );
    color.needsUpdate = true;
    for (const batch of leafMeshes) {
      batch.indices.forEach((index, j) => {
        const p = placement.instances[index],
          [id, t] = data.attachments[index];
        if (state.progress === 1) dummy.position.set(p[0], p[1], p[2]);
        else {
          pointAt(data, state, id, t, current, sample);
          dummy.position.fromArray(current);
          if(sample)for(let k=0;k<3;k++)dummy.position.setComponent(k,
            dummy.position.getComponent(k)+leafOffsets[index*3+k]*state.branches[id].radius);
        }
        dummy.quaternion.set(p[3], p[4], p[5], p[6]);
        dummy.scale.setScalar(
          Math.max(1e-6, p[7] * state.shape.leaf * state.leafGrowth[index]),
        );
        dummy.updateMatrix();
        batch.mesh.setMatrixAt(j, dummy.matrix);
        if (dummy.scale.x > 0.001) {
          v.copy(dummy.position).addScalar(dummy.scale.x);
          bounds.expandByPoint(v);
          v.copy(dummy.position).addScalar(-dummy.scale.x);
          bounds.expandByPoint(v);
        }
      });
      batch.mesh.instanceMatrix.needsUpdate = true;
    }
    const fade = 1 - smooth((state.progress - 0.38) / 0.25);
    juvenile.visible = fade > 0;
    for (let i = 0; i < 8; i++) {
      const t = i < 2 ? 0.76 + i * 0.045 : 0.38 + ((i - 2) / 5) * 0.54;
      pointAt(data, state, 0, t, current, sample);
      dummy.position.fromArray(current);
      const a = i * 2.399;
      v.set(Math.cos(a), 0.35, Math.sin(a)).normalize();
      dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), v);
      const born =
        i < 2 ? 1 : smooth((state.progress - (i - 2) * 0.025) / 0.08);
      dummy.scale.setScalar(
        Math.max(1e-6, 0.28 * state.shape.leaf * fade * born),
      );
      dummy.updateMatrix();
      juvenile.setMatrixAt(i, dummy.matrix);
      if (dummy.scale.x > 0.001) {
        v.copy(dummy.position).addScalar(dummy.scale.x);
        bounds.expandByPoint(v);
        v.copy(dummy.position).addScalar(-dummy.scale.x);
        bounds.expandByPoint(v);
      }
    }
    juvenile.instanceMatrix.needsUpdate = true;
  }
  return {
    group,
    manifest,
    state,
    updateGrowth,
    updateWind(time: number, strength: number, direction: number) {
      uniforms.uTime.value = time;
      uniforms.uWind.value = strength;
      uniforms.uDirection.value = direction;
    },
    getBounds() {
      return bounds.clone();
    },
    dispose() {
      if(disposed)return;
      disposed = true;
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      leafMeshes.forEach((b) => b.mesh.dispose());
      juvenile.dispose();
      group.clear();
    },
  };
}
export type BlenderTree = Awaited<ReturnType<typeof createBlenderTree>>;
`,ze=`import * as THREE from "three";
export type WindUniforms = {
  uTime: { value: number };
  uWind: { value: number };
  uDirection: { value: number };
};
// Shared continuous displacement keeps branch junctions and leaf bases together.
// Leaf flutter has a zero pivot at its twig attachment, and is used by depth shaders too.
const windGLSL = \`
uniform float uTime; uniform float uWind; uniform float uDirection;
vec3 windOffset(vec3 p) {
  float h = max(p.y, 0.0);
  float radial = length(p.xz);
  float gust = .65 + .25*sin(uTime*.37) + .10*sin(uTime*.81);
  float broad = h*h*.0018 * sin(uTime*.83 + p.y*.21);
  float fine = smoothstep(.28,1.7,radial) * smoothstep(.15,1.8,h) * .030 * sin(uTime*1.72 + p.x*.83 + p.z*.64);
  vec2 d = vec2(cos(uDirection),sin(uDirection));
  return vec3(d.x*(broad+fine), fine*.12, d.y*(broad+fine)) * uWind * gust;
}
float leafAngle(vec3 anchor) { return uWind*.22*sin(uTime*3.8+anchor.x*8.1+anchor.y*3.2+anchor.z*6.7); }
mat3 leafTurn(float a) { float c=cos(a),s=sin(a); return mat3(1.,0.,0.,0.,c,s,0.,-s,c); }
\`;

export function addWind(
  material: THREE.Material,
  leaf: boolean,
  uniforms: WindUniforms,
) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = windGLSL + shader.vertexShader;
    if (leaf) {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <beginnormal_vertex>",
        \`#include <beginnormal_vertex>
        objectNormal = leafTurn(leafAngle(instanceMatrix[3].xyz)) * objectNormal;\`,
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        \`#include <begin_vertex>
        transformed = leafTurn(leafAngle(instanceMatrix[3].xyz)) * transformed;
        vec3 worldP = (instanceMatrix * vec4(transformed,1.)).xyz;
        mat3 oakInstanceBasis = mat3(instanceMatrix);
        transformed += inverse(oakInstanceBasis) * windOffset(worldP);\`,
      );
    } else {
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        \`#include <begin_vertex>
        transformed += windOffset(transformed);\`,
      );
    }
  };
  material.customProgramCacheKey = () =>
    leaf ? "oak-leaf-wind-v1" : "oak-wood-wind-v1";
}
`,Pe="data:application/json;base64,ewogICJzZWVkIjogMjUxMDA1LAogICJsZWF2ZXMiOiA1NDYyLAogICJ3b29kVHJpYW5nbGVzIjogMTQ3MDk4LAogICJsZWFmVHJpYW5nbGVzIjogMjc1Mjg0OCwKICAibGVhZlZhcmlhbnRzIjogMywKICAiYmxlbmRlciI6ICI1LjIuMiBMVFMiLAogICJsZWFmUmF0aW8iOiAwLjc1LAogICJ0cmVlVHJpYW5nbGVzIjogMjg5OTk0NiwKICAiYXNzZXRCeXRlcyI6IDg3ODQ1MDkKfQ==";function Z(i){i.updateWorldMatrix(!0,!0);const s=[],L=[],A=[],M=[],C=[],_=[];let f=0;const c=new Y;function V(e,n,u){const o=A.length;return M.push({buffer:0,byteOffset:f,byteLength:e.byteLength}),L.push(new Uint8Array(e.buffer)),f+=e.byteLength,A.push({bufferView:o,componentType:e instanceof Uint32Array?5125:5126,count:e.length/n,type:n===1?"SCALAR":`VEC${n}`,...u?{min:u.min.toArray(),max:u.max.toArray()}:{}}),o}if(i.traverseVisible(e=>{var d,g;if(!(e instanceof K))return;if(e instanceof ve||Array.isArray(e.material))throw Error("Unsupported skinned/multi-material mesh");const n=e.material;if(!(n instanceof Ee)||n.map||n.alphaMap||n.normalMap||n.displacementMap||n.transparent||n.opacity!==1)throw Error("Snapshot requires opaque untextured MeshStandardMaterial");if(!n.visible)return;const u=e.geometry;if(Object.values(u.morphAttributes).some(m=>Array.isArray(m)&&m.length>0)||u.drawRange.start!==0||u.drawRange.count!==1/0)throw Error("Unsupported morph targets or partial draw range");const o=u.getAttribute("position"),R=u.getAttribute("normal"),l=n.vertexColors?u.getAttribute("color"):void 0;if(!o||!R||o.count!==R.count||o.itemSize!==3||R.itemSize!==3||l&&(l.count!==o.count||l.itemSize!==3))throw Error("Invalid position/normal/RGB attributes");const S=e instanceof $?e.count:1;if(!S)return;const t=((d=u.index)==null?void 0:d.count)??o.count;if(t%3)throw Error("Only triangle geometry is supported");const r=new Float32Array(o.count*S*3),w=new Float32Array(r.length),P=new Float32Array(o.count*S*4),E=new Uint32Array(t*S),O=new Q,N=new Q,G=new ke,U=new ee,D=new ee,I=new te,j=new Y;for(let m=0;m<S;m++){if(O.copy(e.matrixWorld),I.copy(n.color),e instanceof $&&(e.getMatrixAt(m,N),O.multiply(N),e.instanceColor)){const h=new te;e.getColorAt(m,h),I.multiply(h)}const F=O.determinant();if(!Number.isFinite(F)||Math.abs(F)<1e-15)throw Error("Singular or invalid transform");G.getNormalMatrix(O);for(let h=0;h<o.count;h++){const k=m*o.count+h;U.fromBufferAttribute(o,h).applyMatrix4(O),D.fromBufferAttribute(R,h).applyMatrix3(G).normalize(),r.set(U.toArray(),k*3),w.set(D.toArray(),k*3),U.fromArray(r,k*3),j.expandByPoint(U),P.set([I.r*((l==null?void 0:l.getX(h))??1),I.g*((l==null?void 0:l.getY(h))??1),I.b*((l==null?void 0:l.getZ(h))??1),1],k*4)}for(let h=0;h<t;h+=3)for(let k=0;k<3;k++){const J=h+(F<0&&k>0?3-k:k),q=((g=u.index)==null?void 0:g.getX(J))??J;if(!Number.isInteger(q)||q<0||q>=o.count)throw Error("Invalid triangle index");E[m*t+h+k]=m*o.count+q}}for(const m of[r,w,P])if(m.some(F=>!Number.isFinite(F)))throw Error("Non-finite attribute");const z=e.userData.aeriaKind??(e instanceof $?1:0);if(z!==0&&z!==1)throw Error("Unsupported shader kind");const W=s.length;C.push({attributes:{POSITION:V(r,3,j),NORMAL:V(w,3),COLOR_0:V(P,4)},indices:V(E,1),material:W}),_.push({pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],roughnessFactor:n.roughness,metallicFactor:0},extras:{shaderKind:z},doubleSided:!0}),s.push({name:e.name||`Mesh_${W}`,vertices:o.count*S,triangles:t*S/3,instances:e instanceof $?S:0,sourceVertices:o.count,sourceTriangles:t/3,shaderKind:z}),c.union(j)}),!s.length)throw Error("No visible geometry");const T={asset:{version:"2.0",generator:"Quiet Garden AERIA static snapshot 1"},scene:0,scenes:[{nodes:s.map((e,n)=>n)}],nodes:s.map((e,n)=>({name:e.name,mesh:n})),meshes:s.map((e,n)=>({name:e.name,primitives:[C[n]]})),materials:_,accessors:A,bufferViews:M,buffers:[{byteLength:f}]},y=new TextEncoder().encode(JSON.stringify(T)),v=Math.ceil(y.length/4)*4,b=new Uint8Array(28+v+f),p=new DataView(b.buffer);p.setUint32(0,1179937895,!0),p.setUint32(4,2,!0),p.setUint32(8,b.length,!0),p.setUint32(12,v,!0),p.setUint32(16,1313821514,!0),b.fill(32,20,20+v),b.set(y,20),p.setUint32(20+v,f,!0),p.setUint32(24+v,5130562,!0);let B=28+v;for(const e of L)b.set(e,B),B+=e.length;return{bytes:b,metadata:{bounds:{min:c.min.toArray(),max:c.max.toArray()},meshes:s,vertices:s.reduce((e,n)=>e+n.vertices,0),triangles:s.reduce((e,n)=>e+n.triangles,0),instances:s.reduce((e,n)=>e+n.instances,0),colorSpace:"linear RGB; runtime vertex × material × instance; AERIA lighting without material emissive"}}}function ne(i){const s={...de,foundation:i},L=le(32768,s),A=me(L),M=new Ae,C=[],_=[X.translation[0],X.translation[1]-L.heightAt(0,0),X.translation[2]];try{return A.group.updateMatrixWorld(!0),A.group.traverseVisible(c=>{var y;if(!(c instanceof K))return;const V=Array.isArray(c.material)?c.material:[c.material],T=Array.isArray(c.material)?c.geometry.groups:[{start:0,count:((y=c.geometry.index)==null?void 0:y.count)??c.geometry.getAttribute("position").count,materialIndex:0}];for(const[v,b]of T.entries()){const p=c.geometry.clone();C.push(p);const B=c.geometry.index;p.setIndex(Array.from({length:b.count},(n,u)=>B?B.getX(b.start+u):b.start+u)),p.clearGroups();const e=new K(p,V[b.materialIndex??0]);e.name=`OurIsland_${M.children.length}_${c.name||"Mesh"}_${v}`,e.matrix.copy(c.matrixWorld),e.matrixAutoUpdate=!1,M.add(e)}}),M.position.fromArray(_),{...Z(M),recipe:{seed:32768,parameters:s},placement:{scale:1,translation:_,rotation:[0,0,0],rule:"Unscaled source geometry; planting surface at the fixed oak origin. No per-variant camera fitting."}}}finally{C.forEach(f=>f.dispose()),A.dispose(),M.clear()}}const Ne=Object.assign({"../../experimental/boy-visit/source/viewer.js":ie,"../../experimental/boy-visit/source/viewer.template.html":oe,"./aeria-document.ts":Te,"./export.ts":Re,"./island-snapshot.ts":Ie,"../island-generator/engine.ts":je,"../island-generator/foundation.ts":Ce,"../island-generator/render.ts":Ve,"../tree-generator/blender/oak-crown.ts":Oe,"../tree-generator/blender/oak-dome.ts":Le,"../tree-generator/oak-growth/engine.ts":Be,"../tree-generator/oak-growth/math.ts":Ge,"../tree-generator/oak-growth/render.ts":Ue,"../tree-generator/oak-growth/wind.ts":ze}),De=Object.assign({"../../experimental/boy-visit/ostrov_boy.glb":ce,"../tree-generator/oak-growth/assets/instances.json":be,"../tree-generator/oak-growth/assets/leaves.glb":ge,"../tree-generator/oak-growth/assets/manifest.json":Pe,"../tree-generator/oak-growth/assets/structure.json":fe,"../tree-generator/oak-growth/assets/wood.glb":he});async function H(i){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",i))).map(s=>s.toString(16).padStart(2,"0")).join("")}function Ze(){const i=new URLSearchParams(window.location.search).get("islands")==="1",s=i?"dome-v2":ye(window.location.search),[L,A]=x.useState("aeria"),[M,C]=x.useState(!0),_=x.useRef(null),f=x.useRef(null),[c]=x.useState(()=>re(window.location.href,new URLSearchParams(location.search).get("ambiance")==="full",new URLSearchParams(location.search).get("ambiance")==="quiet")),[V,T]=x.useState("Загрузка AERIA и экспорт взрослого дуба…"),[y,v]=x.useState(!1),[b,p]=x.useState("A"),[B,e]=x.useState(i?"composition":"island"),[n,u]=x.useState(0),[o,R]=x.useState(!1);x.useEffect(()=>{const t=new AbortController;let r=!1,w;async function P(){const E=s!=="original"?await we(t.signal,s):await ue(t.signal);try{let O=function(){var g;if(r)return;const d=(g=_.current)==null?void 0:g.contentWindow;if(!(d!=null&&d.__ready)||!d.__comparison){if(Date.now()>W){T("AERIA не загрузилась. Проверьте WebGL и повторите."),R(!0);return}w=setTimeout(O,100);return}try{d.__comparison.install(G.bytes),j&&(d.__comparison.installIslands({standard:j.standard.bytes,tapered:j.tapered.bytes}),d.__comparison.view("composition")),s!=="original"&&(d.__comparison.select("B"),p("B")),v(!0),T(i?"Три острова · одинаковый дуб, свет и камера · исходный масштаб 1:1":"A/B готово · время 0 · ветер 0 · масштаб 1:1 · посадка фиксирована")}catch(m){T(String(m)),R(!0)}};const N=pe();E.updateGrowth(1,N),E.updateWind(0,0,0);const G=Z(E.group),U=await H(G.bytes),D=await H(Z(E.group).bytes);if(U!==D)throw Error("Экспорт не воспроизводим");const I={};for(const[d,g]of Object.entries(Ne))I[d]=await H(new TextEncoder().encode(g));for(const[d,g]of Object.entries(De)){const m=await fetch(g,{signal:t.signal});if(!m.ok)throw Error(`${d}: ${m.status}`);I[d]=await H(new Uint8Array(await m.arrayBuffer()))}const j=i?{standard:ne("standard"),tapered:ne("tapered")}:null,z=j?Object.fromEntries(await Promise.all(Object.entries(j).map(async([d,g])=>[d,{recipe:g.recipe,placement:g.placement,geometry:g.metadata,sha256:await H(g.bytes)}]))):void 0;if(r)return;f.current={...G,description:{format:"aeria-static-1",applicationVersion:_e.version,sourceHashes:I,recipe:N,crown:xe(s),layout:E.group.userData.crownLayout,seed:251005,progress:1,islands:z,palette:"source vertex colors",wind:0,coordinateSystem:"right-handed Y-up; baked runtime world matrices",placement:X,geometry:G.metadata,sha256:U,repeatSha256:D,limitations:["AERIA shading, not Three PBR/emissive","Static adult only; not growth or performance acceptance"]}};const W=Date.now()+3e4;O()}finally{E.dispose()}}return P().catch(E=>{r||(T(String(E)),R(!0))}),()=>{r=!0,t.abort(),clearTimeout(w),f.current=null}},[n,s,i]);const l=()=>{var t,r;return(r=(t=_.current)==null?void 0:t.contentWindow)==null?void 0:r.__comparison},S=()=>{if(!f.current)return;const t=URL.createObjectURL(new Blob([f.current.bytes],{type:"model/gltf-binary"}));Se(t,"oak-aeria.glb"),setTimeout(()=>URL.revokeObjectURL(t),1e3)};return a.jsxs("main",{className:"fg-comparison",children:[a.jsx("iframe",{ref:_,srcDoc:c,title:"FG-01 · AERIA A/B"},n),a.jsxs("details",{className:"fg-controls","aria-label":"Сравнение моделей",open:!0,children:[a.jsx("summary",{children:i?"Острова · AERIA / до / проба":"AERIA · A/B — свернуть / раскрыть"}),i&&a.jsxs("div",{children:[Object.entries({aeria:"Остров AERIA",standard:"Наш · до",tapered:"Наш · проба"}).map(([t,r])=>a.jsx("button",{disabled:!y,"aria-pressed":L===t,onClick:()=>{var w;(w=l())==null||w.selectIsland(t),A(t)},children:r},t)),a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",disabled:!y,checked:!M,onChange:t=>{var w;const r=!t.target.checked;(w=l())==null||w.showTree(r),C(r)}}),"Без дерева"]})]}),a.jsx("div",{hidden:i,children:["A","B"].map(t=>a.jsx("button",{disabled:!y,"aria-pressed":b===t,onClick:()=>{var r;(r=l())==null||r.select(t),p(t)},children:t==="A"?"A · Дерево AERIA":"B · Наш дуб"},t))}),a.jsx("div",{children:Object.keys(i?se:ae).map(t=>a.jsx("button",{disabled:!y,"aria-pressed":B===t,onClick:()=>{var r;(r=l())==null||r.view(t),e(t)},children:{island:"Общий",front:"Крупно",side:"Сбоку",composition:"Композиция",terrain:"Скала",reverse:"Сзади",surface:"Поверхность",planting:"Посадка"}[t]},t))}),a.jsx("p",{role:"status",children:V}),a.jsxs("div",{children:[a.jsx("button",{disabled:!y,onClick:S,children:"GLB дуба"}),a.jsx("button",{disabled:!y,onClick:()=>{var t,r;return Me({...(t=f.current)==null?void 0:t.description,conditions:(r=l())==null?void 0:r.report()},"oak-aeria.json")},children:"Настройки JSON"})]}),o&&a.jsx("button",{onClick:()=>{R(!1),v(!1),p("A"),A("aeria"),C(!0),e(i?"composition":"island"),T("Повторная загрузка…"),u(t=>t+1)},children:"Повторить"}),a.jsxs("small",{children:[s!=="original"?`FG-01.3 · ${s} · ${s==="cap-v1"?"Сжатие отклонено":s==="dome-v2"?"Шапка художественно принята":"Предыдущая шапка"}. Рост не проверен.`:"Исходный дуб · форма не изменена.",new URLSearchParams(location.search).get("ambiance")==="quiet"?"Согласованное окружение: без водопадов, пены, брызг и дальних островов; небо, море, фонарь и воздушные частицы сохранены.":new URLSearchParams(location.search).get("ambiance")==="full"?"Полное окружение AERIA: фонарь, водопады и частицы включены; персонажи и исходное дерево скрыты при выборе нашего дуба.":i?"Только сравнение формы: вода и небо общие, водопады/персонажи/фонарь отключены. Верх наших островов не менялся. Масштаб не выровнен; свет AERIA, не игровой PBR.":"Без персонажей и водопадов. Полное сравнение островов — в отдельном режиме."]}),a.jsxs("div",{children:[a.jsx("a",{href:"?variant=comparison&islands=1",children:"Сравнить острова"}),a.jsx("a",{href:"?variant=comparison&crown=original",children:"Дуб до"}),a.jsx("a",{href:"?variant=comparison&crown=dome-v1",children:"Предыдущая шапка"}),a.jsx("a",{href:"?variant=comparison&crown=dome-v2",children:"Пышная шапка по рисунку"}),a.jsx("a",{href:"?variant=comparison&crown=cap-v1",children:"Отклонённое сжатие"})]}),a.jsx("a",{href:`${window.location.pathname.replace(/ostrov-boy\/?$/,"tree-generator")}?variant=blender&tree=oak&crown=${s}`,children:"Эта форма в мастерской"}),a.jsx("a",{href:"?seed=204",children:"Полная исходная AERIA"})]})]})}export{Ze as default,H as sha256};
