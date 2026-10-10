const L=`<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="icon" href="data:,">
<meta name="theme-color" content="#bfdde5">
<title>Aeria — Маленький гость</title>
<style>
:root{--ink:#203d3a;--muted:#496760;--line:rgba(44,77,65,.17);--paper:rgba(249,251,242,.84);--green:#386451}
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#bddce5;font-family:Arial,Helvetica,sans-serif;color:var(--ink)}
button,input{-webkit-tap-highlight-color:transparent}button{font:inherit;color:inherit;cursor:pointer;border:0}button:focus-visible,input:focus-visible{outline:2px solid #3c7768;outline-offset:5px}button:hover{filter:brightness(.96)}button:active{transform:translateY(1px)}svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;flex:none}
#world{display:block;width:100%;height:100%;touch-action:none;cursor:grab}#world:active{cursor:grabbing}
header{position:absolute;top:34px;left:38px;right:38px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;z-index:2}.brand{display:flex;gap:12px;align-items:center}.brand-mark{height:35px;width:35px;border:1px solid rgba(39,73,62,.48);border-radius:50%;display:grid;place-items:center}.brand-mark svg{width:24px;height:24px}.brand-name{font-size:15px;letter-spacing:.25em;font-weight:600}.brand-sub{font-size:8px;letter-spacing:.23em;margin-top:4px;color:var(--muted)}.top-actions{display:flex;gap:8px;pointer-events:auto}.round{height:39px;min-width:39px;border:1px solid rgba(250,255,252,.65);background:rgba(247,253,248,.48);backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;border-radius:50%}.quality{border-radius:30px;padding:0 14px;gap:9px;font-size:11px}.quality svg{width:16px;height:16px}.quality-dot{width:5px;height:5px;background:#538869;border-radius:50%}
.intro{position:absolute;top:149px;left:40px;width:280px;pointer-events:none;z-index:1}.eyebrow{font-size:9px;font-weight:600;letter-spacing:.18em;color:var(--muted);display:flex;align-items:center;gap:10px}.eyebrow:before{content:'';display:block;width:21px;height:1px;background:#618376}.intro h1{font-family:Georgia,'Times New Roman',serif;font-weight:400;letter-spacing:-.055em;font-size:57px;line-height:.99;margin:23px 0 23px}.intro h1 i{font-weight:400;color:#547c56}.intro p{font-size:12px;line-height:1.8;color:#46695e;margin:0;max-width:205px}.intro .note{display:flex;gap:7px;align-items:center;font-size:9px;letter-spacing:.03em;margin-top:27px;color:#507065}.note span{background:#668d6b;height:5px;width:5px;border-radius:50%;box-shadow:0 0 0 4px rgba(87,132,104,.10)}
.scenebadge{position:absolute;right:39px;top:calc(50% - 20px);display:flex;flex-direction:column;gap:7px;font-size:9px;letter-spacing:.15em;color:#446962;pointer-events:none;text-align:right}.scenebadge .num{font:italic 31px Georgia,serif;color:#466d58;letter-spacing:-.04em}.side-tools{position:absolute;right:39px;bottom:161px;display:flex;flex-direction:column;gap:8px;z-index:3}.side-tools .round{background:rgba(247,253,248,.69)}
#hint{position:absolute;bottom:159px;left:50%;transform:translateX(-50%);background:rgba(239,248,240,.45);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.3);color:#274f43;border-radius:30px;padding:9px 16px;font-size:10px;white-space:nowrap;display:flex;gap:8px;align-items:center;pointer-events:none;transition:opacity .6s}#hint svg{height:14px;width:14px}#hint.hidden{opacity:0}
.dock{position:absolute;bottom:43px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:0;background:var(--paper);backdrop-filter:blur(28px);border:1px solid rgba(255,255,255,.74);border-radius:22px;padding:17px 22px;box-shadow:0 10px 48px rgba(19,67,72,.14),0 1px 1px rgba(255,255,255,.6) inset;z-index:3;max-width:calc(100% - 60px)}.dock-section{padding:0 22px;border-right:1px solid var(--line)}.dock-section:first-child{padding-left:0}.dock-section:last-child{border-right:0;padding-right:0}.field-head{display:flex;align-items:center;justify-content:space-between;font-size:9px;letter-spacing:.075em;margin-bottom:11px;text-transform:uppercase;color:#62776a}.field-head svg{height:13px;width:13px;margin-right:6px}.field-label{display:flex;align-items:center}#wind-value{font-size:10px;font-variant-numeric:tabular-nums;color:#344f3e;font-weight:600}.wind-area{width:166px}.wind-row{display:flex;align-items:center;gap:9px}input[type=range]{width:100%;height:3px;margin:6px 0;accent-color:#456d49;cursor:pointer}input[type=range]::-webkit-slider-thumb{appearance:none;box-shadow:0 0 0 4px rgba(104,140,94,.12);border-radius:50%}.segmented{display:flex;gap:4px;background:rgba(69,108,81,.075);padding:3px;border-radius:20px}.segmented button{background:transparent;padding:6px 13px;border-radius:18px;font-size:10px;white-space:nowrap}.segmented button.active{background:#fffef4;box-shadow:0 1px 4px rgba(24,58,44,.1);color:#35583f}.dock-buttons{display:flex;gap:8px}.dock-button{background:transparent;display:flex;flex-direction:column;align-items:center;gap:8px;font-size:9px;min-width:48px;color:#4b6351}.dock-button svg{width:18px;height:18px}.dock-button[aria-pressed=true]{color:#246d46}.dock-button[aria-pressed=true] svg{background:rgba(108,153,90,.16);border-radius:50%;box-shadow:0 0 0 6px rgba(108,153,90,.16)}.export{background:#365c46;color:#f8fbed;border-radius:13px;min-height:47px;padding:0 15px;display:flex;gap:9px;align-items:center;font-size:10px;white-space:nowrap}.export svg{width:16px;height:16px}
footer{position:absolute;bottom:20px;left:40px;right:39px;display:flex;justify-content:space-between;pointer-events:none;font-size:8px;letter-spacing:.08em;color:rgba(239,250,244,.80);text-shadow:0 1px 8px rgba(15,62,72,.25)}.footer-right{display:flex;gap:14px}.footer-right span+span{opacity:.7}#fps{display:none}.diagnostics #fps{display:inline}
#toast{position:absolute;top:91px;left:50%;transform:translate(-50%,-8px);background:rgba(29,57,45,.90);color:#f7f9ef;padding:12px 20px;border-radius:40px;backdrop-filter:blur(20px);font-size:11px;opacity:0;transition:.2s;pointer-events:none;z-index:9;text-align:center;max-width:90vw}#toast.show{opacity:1;transform:translate(-50%,0)}
#loading{position:absolute;inset:0;display:grid;place-content:center;text-align:center;gap:16px;background:#c7dfe0;z-index:10;transition:opacity .6s}#loading.done{opacity:0;pointer-events:none}.load-title{font:36px Georgia,serif;letter-spacing:-.035em}#loading p{margin:0;font-size:12px;line-height:1.8;max-width:400px}.spinner{width:36px;height:36px;border:1px solid #99b4a9;border-top-color:#37664e;border-radius:50%;margin:0 auto 8px;animation:spin 1.5s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
#show-ui{position:absolute;bottom:23px;right:25px;display:none;z-index:8;opacity:.65}.side-tools #hide-ui span{display:none}.clean header,.clean .intro,.clean .scenebadge,.clean .side-tools,.clean .dock,.clean footer,.clean #hint{opacity:0;pointer-events:none}.clean #show-ui{display:flex}header,.intro,.scenebadge,.side-tools,.dock,footer{transition:opacity .3s}
@media(min-width:1650px){.intro{left:65px;top:175px}.intro h1{font-size:70px}.intro p{font-size:13px;max-width:230px}header{left:65px;right:55px;top:42px}.dock{bottom:49px;padding:20px 25px}.dock-section{padding:0 26px}.wind-area{width:188px}.side-tools{right:55px}.scenebadge{right:55px}}
@media(max-width:1050px){.intro{top:118px;left:28px;width:220px}.intro h1{font-size:44px}.intro p{font-size:11px;max-width:170px}.intro .note{display:none}header{left:28px;right:28px;top:25px}.dock{padding:16px 18px}.dock-section{padding:0 14px}.wind-area{width:144px}.side-tools{right:27px}.scenebadge{display:none}footer{left:28px;right:28px}}
@media(max-width:720px){header{top:20px;left:20px;right:20px}.brand-sub{font-size:7px}.brand-name{font-size:13px}.brand-mark{width:30px;height:30px}.quality{padding:0 10px}.quality svg{display:none}.intro{top:91px;left:22px}.intro .eyebrow{font-size:8px}.intro h1{font-size:36px;margin-top:15px;line-height:1.0}.intro p{display:none}.dock{bottom:38px;max-width:calc(100% - 28px);width:470px;padding:15px 14px;flex-wrap:wrap;row-gap:14px;border-radius:20px}.dock-section{padding:0 12px}.dock-section:nth-child(1){width:54%}.dock-section:nth-child(2){width:46%;border-right:0;padding-right:0}.wind-area{width:100%}.field-head{font-size:8px;margin-bottom:7px}.dock-section:nth-child(3){padding-left:0;width:54%}.dock-section:nth-child(4){width:46%;padding-right:0}.dock-buttons{justify-content:space-around}.dock-button{font-size:8px;gap:6px}.dock-button svg{height:16px;width:16px}.export{width:100%;justify-content:center;min-height:37px;font-size:10px}.segmented button{flex:1;padding:6px 8px;font-size:9px}.field-head #wind-label{font-size:8px}.side-tools{right:17px;bottom:221px;gap:7px}.side-tools .round{width:35px;height:35px;min-width:35px}.side-tools #hide-ui{width:auto;min-width:35px;padding:0 9px;gap:5px;border-radius:22px}.side-tools #hide-ui span{display:inline;font-size:8px;white-space:nowrap}#hint{bottom:224px;font-size:9px;padding:8px 12px}footer{bottom:14px;left:21px;right:21px;font-size:7px}.footer-right #polycount{display:none}#toast{top:70px;font-size:10px}.top-actions #fullscreen{display:none}}
@media(max-height:650px) and (min-width:721px){.intro{top:105px}.intro h1{font-size:39px}.intro p,.intro .note{display:none}.dock{bottom:30px;padding:11px 16px}.side-tools{bottom:124px}#hint{bottom:124px}.field-head{margin-bottom:7px}footer{bottom:11px}}

.bird-card{position:absolute;left:40px;bottom:164px;width:236px;padding:17px 17px 15px;border-radius:21px;background:var(--paper);border:1px solid rgba(255,255,255,.78);backdrop-filter:blur(22px);box-shadow:0 8px 30px rgba(24,66,61,.08);z-index:3;transition:opacity .3s}
.bird-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}.bird-heading h2{font:19px Georgia,serif;margin:0;letter-spacing:-.035em}.bird-dots{display:flex;gap:5px}.bird-dots span{height:8px;width:8px;border-radius:50%;background:#e64057}.bird-dots span:nth-child(2){background:#eab82f}.bird-dots span:nth-child(3){background:#32a47e}#bird-count{font-size:10px;color:#45665a;font-variant-numeric:tabular-nums}.bird-caption{font-size:9px;color:#748477;line-height:1.65;margin:7px 0 12px}.bird-actions{display:flex;gap:7px}.bird-actions button{border-radius:22px;display:flex;align-items:center;justify-content:center;gap:5px;font-size:9px;padding:9px 10px;white-space:nowrap;background:rgba(64,108,81,.08);border:1px solid rgba(64,108,81,.12)}.bird-actions button svg{width:13px;height:13px}.bird-actions #bird-scatter{background:#3a624d;color:#fbfff3;border-color:transparent}.bird-actions #bird-close[aria-pressed=true]{background:#e9ecd0}.clean .bird-card{opacity:0;pointer-events:none}
@media(min-width:1650px){.bird-card{left:65px}}
@media(max-width:1050px){.bird-card{left:28px;width:222px}}
@media(max-width:720px){.bird-card{left:17px;bottom:213px;width:220px;padding:11px 13px;border-radius:17px}.bird-heading{margin-bottom:5px}.bird-heading h2{font-size:16px}.bird-caption{display:none}.bird-actions{margin-top:8px}.bird-actions button{font-size:8px;padding:8px 10px}#bird-count{font-size:9px}#hint{display:none}.intro h1{font-size:29px}.intro{top:84px}.intro .eyebrow{font-size:7px}}
@media(max-height:720px) and (min-width:721px){.bird-card{bottom:143px;padding:12px 14px;width:215px}.bird-caption{display:none}.bird-actions{margin-top:10px}.bird-heading h2{font-size:17px}}
@media(max-height:570px) and (min-width:721px){.bird-card{left:auto;right:80px;bottom:135px}.intro h1{font-size:32px}}
.visitor-divider{height:1px;background:var(--line);margin:13px 0}.visitor-heading{font:17px Georgia,serif}#visitor-status{font-size:10px;line-height:1.55;color:#567262;min-height:30px;margin:7px 0 9px}.visitor-actions{display:flex;gap:6px}.visitor-actions button{font-size:9px;padding:9px 10px;border-radius:18px;background:#ecdfba;white-space:nowrap}.visitor-actions button:disabled{cursor:default;background:#e9eddc;color:#70816b}.visitor-actions #boy-close{background:rgba(64,108,81,.08)}.bird-caption:empty{display:none}
@media(max-width:720px){.bird-card{width:240px;bottom:205px}.visitor-divider{margin:8px 0}.visitor-heading{font-size:14px}#visitor-status{font-size:9px;min-height:0;margin:5px 0}.visitor-actions button{font-size:8px;padding:7px 9px}.intro h1{font-size:27px}.bird-heading h2{font-size:15px}}
.scene-controls-title{display:none;cursor:pointer;font-size:13px}@media(max-width:720px){.scene-controls-title{display:list-item}.scene-controls-title+div{margin-top:10px}}.sunny-field{display:block;font-size:11px;margin:8px 0}.sunny-field select{display:block;width:100%;margin-top:4px;padding:6px;border:1px solid #b8c7b2;border-radius:8px;background:#faf9ef;color:#365343}.sunny-row{display:flex;align-items:center;gap:8px;font-size:10px}.sunny-row button{padding:6px;border-radius:8px}.sunny-row select{max-width:75px}.sunny-seek{width:100%}#sunny-controls[hidden]{display:none}.bird-card{max-height:calc(100dvh - 245px);overflow:auto}@media(max-width:720px){.bird-card{max-height:calc(100dvh - 240px);width:240px}}
</style>
</head>
<body>
<canvas id="world" aria-label="Объёмный остров с деревом и девятью разноцветными птицами. Перетаскивайте для вращения; колёсико или щипок — масштаб." tabindex="0"></canvas>
<header><div class="brand"><div class="brand-mark"><svg viewBox="0 0 24 24"><path d="M4 15c5 2 11 2 16 0M6 17l6 5 6-5M12 15V9m0 3L8 9m4 1 4-3"/><path d="M6 8c-2-4 3-5 4-4 0-4 7-3 6 1 4-1 5 5 1 5M5 11h3"/></svg></div><div><div class="brand-name">AERIA</div><div class="brand-sub">ЖИВОЙ 3D-ОСТРОВ</div></div></div>
<div class="top-actions"><button class="round quality" id="quality" title="Переключить качество"><span class="quality-dot"></span><span id="quality-label">Высокое</span><svg viewBox="0 0 24 24"><path d="m9 10 3 3 3-3"/></svg></button><button class="round" id="fullscreen" title="Во весь экран" aria-label="Во весь экран"><svg viewBox="0 0 24 24"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></svg></button></div></header>
<section class="intro"><div class="eyebrow">03 &nbsp;/&nbsp; МАЛЕНЬКИЙ ГОСТЬ</div><h1>Там, где<br>рождается<br><i>дружба.</i></h1><p>Тихие шаги по тропинке.<br>Тёплые ладони, горстка зёрен<br>и девять крылатых друзей.</p><div class="note"><span></span>Настоящая геометрия · WebGL 2</div></details></section>
<div class="scenebadge"><span class="num">360°</span><span>СВОБОДНЫЙ ОБЗОР</span></div>
<div class="side-tools"><button class="round" id="reset" title="Начальный ракурс · R" aria-label="Вернуть начальный ракурс"><svg viewBox="0 0 24 24"><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/></svg></button><button class="round" id="photo" title="Сохранить кадр" aria-label="Сохранить кадр"><svg viewBox="0 0 24 24"><path d="M4 7h4l2-3h4l2 3h4v13H4z"/><circle cx="12" cy="13" r="3.5"/></svg></button><button class="round" id="hide-ui" title="Обзор: скрыть панели · H" aria-label="Обзор: скрыть все панели и показать остров"><svg viewBox="0 0 24 24"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg><span>Обзор</span></button></div>
<div id="hint"><svg viewBox="0 0 24 24"><path d="M8 13V5a2 2 0 0 1 4 0v7m0-3a2 2 0 0 1 4 0v3m0-1a2 2 0 0 1 4 0v5c0 4-3 6-6 6-3 0-4-1-6-4l-4-5c-1-2 1-4 3-2l1 1"/></svg>Перетащите, чтобы повернуть остров</div>
<div class="dock">
<div class="dock-section"><div class="wind-area"><div class="field-head"><span class="field-label"><svg viewBox="0 0 24 24"><path d="M2 8h13a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M2 16h6a3 3 0 1 1-3 3"/></svg><span id="wind-label">Морской бриз</span></span><span id="wind-value">100%</span></div><div class="wind-row"><input id="wind" type="range" min="0" max="220" step="5" value="100" aria-label="Сила ветра"></div></div></div>
<div class="dock-section"><div class="field-head">Освещение</div><div class="segmented"><button id="day" class="active">День</button><button id="golden">Закат</button></div></div>
<div class="dock-section"><div class="dock-buttons"><button class="dock-button" id="rotate" aria-pressed="false" title="Автоматическое вращение"><svg viewBox="0 0 24 24"><path d="M6 7a8 8 0 0 1 13 2m-1-6 1 6-6-1M18 17a8 8 0 0 1-13-2m1 6-1-6 6 1"/></svg><span>Облёт</span></button><button class="dock-button" id="pause" aria-pressed="false" title="Пауза анимации · пробел"><svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg><span id="pause-label">Пауза</span></button></div></div>
<div class="dock-section"><button class="export" id="export"><svg viewBox="0 0 24 24"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/></svg><span id="export-label">Sunny .GLB</span></button></div>
</div>
<section class="bird-card" aria-label="Управление птицами"><details id="scene-controls" open><summary class="scene-controls-title">Персонаж и птицы</summary>
<div class="bird-heading"><h2>Птичий сад</h2><div class="bird-dots" aria-label="Красные, жёлтые и зелёные птицы"><span></span><span></span><span></span></div></div>
<div id="bird-count">9 птиц просыпаются…</div><p class="bird-caption">Ни одного одинакового дня.</p><div class="visitor-divider"></div><div class="visitor-heading">Маленький гость</div><label class="sunny-field">Персонаж<select id="boy-model"><option value="sunny">Sunny · наша модель</option><option value="legacy">Прежний мальчик</option><option value="none">Без мальчика</option></select></label>
<div id="sunny-controls"><label class="sunny-field">Режим<select id="sunny-mode"><option value="clips">Клипы</option><option value="walk">Прогулка</option></select></label><div id="sunny-walk-controls" hidden><label class="sunny-field">Контакт с землёй<select id="sunny-correction"><option value="raw">Без коррекции</option><option value="corrected" selected>С коррекцией</option></select></label><button id="sunny-restart">Повторить прогулку</button></div><label class="sunny-field">Анимация<select id="sunny-clip"></select></label><div class="sunny-row"><button id="sunny-play">Пауза клипа</button><select id="sunny-speed" aria-label="Скорость клипа"><option value="0.25">¼×</option><option value="0.5">½×</option><option value="1" selected>1×</option></select><span id="sunny-time"></span></div><label class="sunny-field"><input id="sunny-root-motion" type="checkbox"> Перемещение по клипу</label><input id="sunny-seek" class="sunny-seek" aria-label="Время клипа" type="range" min="0" max="1" step="0.001" value="0"></div><p id="visitor-status">Гость скоро заглянет</p><div class="visitor-actions"><button id="call-boy">Позвать мальчика</button><button id="boy-close" aria-pressed="false">Рассмотреть</button></div><p class="bird-caption"></p>
<div class="bird-actions"><button id="bird-scatter" title="Поднять птиц с веток"><svg viewBox="0 0 24 24"><path d="m3 16 6-5-6-5 8 2 4-4 2 1 1 3 4 1-4 2-4 7-4-3-7 1Z"/></svg>Поднять стаю</button><button id="bird-close" aria-pressed="false" title="Рассмотреть птиц ближе"><svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6m-3-3v6"/></svg>Поближе</button></div></details></section>
<footer><span>ПРОЦЕДУРНЫЙ МИР &nbsp; / &nbsp; 003</span><div class="footer-right"><span id="polycount">3D</span><span id="fps">WEBGL 2</span></div></footer>
<button class="round" id="show-ui" title="Вернуть интерфейс" aria-label="Вернуть интерфейс"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
<div id="toast" role="status"></div>
<div id="loading"><div class="spinner"></div><div class="load-title">Пробуждаем остров.</div><p>Готовим тропинку, зёрнышки и девять крылатых друзей.</p></div>
<script id="model-data" type="application/octet-stream">__MODEL__<\/script>
<script id="sunny-data" type="application/octet-stream">__SUNNY__<\/script>
<script>__SUNNY_RUNTIME__<\/script>
<script>__SCRIPT__<\/script>
</body></html>
`,N=`/* Skyroot — self-contained WebGL 2 viewer. No external dependencies.
   The embedded GLB is also the downloadable model; custom wind attributes
   are consumed only by this viewer. MIT license for the viewer source. */
'use strict';
(()=>{
const $=id=>document.getElementById(id);
const canvas=$('world');
const perf=createPerformanceCollector(),perfInventory=createAeriaPerformanceInventory(perf);
let performanceBridgeReady=false;
let allocationBytes=0,visitorStage='Гость скоро заглянет',contextLost=false;
const gl=canvas.getContext('webgl2',{antialias:true,alpha:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
if(!gl){fatalPerformance('Нужен WebGL 2');$('loading').innerHTML='<div class="load-title">Нужен WebGL 2</div><p>Откройте этот HTML в браузере с включённым аппаратным ускорением.</p>';
return;}
const V={add:(a,b)=>a.map((x,i)=>x+b[i]),sub:(a,b)=>a.map((x,i)=>x-b[i]),scale:(a,b)=>a.map(x=>x*b),dot:(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),cross:(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm:a=>{let n=Math.hypot(...a)||1;return a.map(x=>x/n)}};
const M={
 mul:(a,b)=>{let o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o;},
 perspective:(f,asp,n,fa)=>{let t=1/Math.tan(f/2),nf=1/(n-fa);return new Float32Array([t/asp,0,0,0,0,t,0,0,0,0,(fa+n)*nf,-1,0,0,2*fa*n*nf,0]);},
 ortho:(l,r,b,t,n,f)=>new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1]),
 look:(eye,target)=>{let z=V.norm(V.sub(eye,target)),x=V.norm(V.cross([0,1,0],z)),y=V.cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-V.dot(x,eye),-V.dot(y,eye),-V.dot(z,eye),1]);}
};
function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
function program(v,f){const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,v));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));p.u={};const count=gl.getProgramParameter(p,gl.ACTIVE_UNIFORMS);for(let i=0;i<count;i++){let a=gl.getActiveUniform(p,i);p.u[a.name]=gl.getUniformLocation(p,a.name);}return p;}
function uf(p,k,x){if(p.u[k]!==undefined)gl.uniform1f(p.u[k],x)}
function uv(p,k,x){if(p.u[k]!==undefined)gl.uniform3fv(p.u[k],x)}
function um(p,k,x){if(p.u[k]!==undefined)gl.uniformMatrix4fv(p.u[k],false,x)}
const IDENTITY=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
let groundSampler=null;
let sunny=null,sunnyBytes=null,sunnyMeshes=[],boyMode=new URLSearchParams(location.search).get('boy')||'sunny';
let garden=null,visitor=null,birdMeshes=[],birdRoots=[],boyMeshes=[];let visitorPose={pos:[0,0,0],visible:0,sparkle:0};
const windCode=\`
vec3 bend(vec3 p,vec4 w,float kind){
 if(kind>1.5 && kind<2.5){
   p.x+=sin(w.y*20.0-uTime*3.3+w.z*2.0)*.025*w.w;
   p.z+=sin(w.y*25.0-uTime*2.7+w.z)*.025*w.w;
 }else if(w.x>0.0){
   float gust=sin(uTime*1.65+p.x*.58+p.z*.42);
   float breeze=sin(uTime*2.7+w.y+p.y*.4)*.36;
   p.x+=(gust*.105+breeze*.065+.055)*w.x*uWind;
   p.z+=(sin(uTime*1.2+p.x*.5+w.y)*.045)*w.x*uWind;
   p.y+=sin(uTime*3.0+w.y)*.021*w.x*uWind;
 }
 return p;
}\`;
const skinCode=\`
layout(location=5) in vec4 aJoints;
layout(location=6) in vec4 aWeights;
uniform float uSkinned;
uniform mat4 uBones[32],uBind,uBindInverse;
mat4 skinMatrix(){return uSkinned>.5?uBindInverse*(aWeights.x*uBones[int(aJoints.x)]+aWeights.y*uBones[int(aJoints.y)]+aWeights.z*uBones[int(aJoints.z)]+aWeights.w*uBones[int(aJoints.w)])*uBind:mat4(1.0);}
\`;
const meshVS=\`#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=1) in vec3 aNormal;
layout(location=2) in vec4 aColor;
layout(location=3) in vec4 aWind;
\${skinCode}
uniform mat4 uVP,uLight,uModel;
uniform float uTime,uWind,uKind;
layout(location=4) in vec2 aUV;
out vec2 vUV;
out vec3 vPos,vNormal,vColor;
out vec4 vShadow,vWind;
\${windCode}
void main(){vec3 p;if(uSkinned>.5){mat4 skin=skinMatrix();p=(uModel*skin*vec4(bend(aPosition,aWind,uKind),1.0)).xyz;vNormal=mat3(uModel)*mat3(skin)*aNormal;}else{p=(uModel*vec4(bend(aPosition,aWind,uKind),1.0)).xyz;vNormal=mat3(uModel)*aNormal;}vUV=aUV;vPos=p;vColor=aColor.rgb;vWind=aWind;vShadow=uLight*vec4(p,1.0);gl_Position=uVP*vec4(p,1.0);}\`;
const shadowVS=\`#version 300 es
precision highp float;
layout(location=0) in vec3 aPosition;
layout(location=3) in vec4 aWind;
\${skinCode}
uniform mat4 uVP,uModel;
uniform float uTime,uWind,uKind;
\${windCode}
void main(){if(uSkinned>.5)gl_Position=uVP*uModel*skinMatrix()*vec4(bend(aPosition,aWind,uKind),1.0);else gl_Position=uVP*uModel*vec4(bend(aPosition,aWind,uKind),1.0);}\`;
const shadowFS=\`#version 300 es
precision highp float;
uniform float uVisible;
void main(){if(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)>uVisible)discard;}\`;
const tone=\`
vec3 tone(vec3 x){x=max(x,vec3(0.0));return clamp((x*(2.51*x+.03))/(x*(2.43*x+.59)+.14),0.0,1.0);}
vec3 outputColor(vec3 c){return pow(tone(c),vec3(1.0/2.2));}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.0,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=mat2(1.6,-1.2,1.2,1.6)*p+3.1;a*=.5;}return v;}
\`;
const meshFS=\`#version 300 es
precision highp float;
in vec2 vUV;
in vec3 vPos,vNormal,vColor;
in vec4 vShadow,vWind;
uniform sampler2D uShadow,uBaseMap,uNormalMap,uRoughMap;
uniform float uTextured,uNormalScale;
uniform vec3 uEye,uSun;
uniform float uTime,uKind,uAlpha,uRough,uSunset,uShadowTexel,uVisible;
out vec4 outColor;
\${tone}
float getShadow(vec3 normal){
 vec3 c=vShadow.xyz/vShadow.w*.5+.5;
 if(c.x<0.0||c.y<0.0||c.x>1.0||c.y>1.0||c.z>1.0)return 1.0;
 float bias=max(.00032,.0010*(1.0-dot(normal,uSun)));
 float s=0.0;
 for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){
   float d=texture(uShadow,c.xy+vec2(x,y)*uShadowTexel*1.7).r;
   s+=c.z-bias<=d?1.0:0.0;
 }
 return s/9.0;
}
void main(){
 if(hash(gl_FragCoord.xy)>uVisible)discard;
 vec3 N=normalize(vNormal);if(!gl_FrontFacing)N=-N;
 if(uTextured>.5){
  vec3 dp1=dFdx(vPos),dp2=dFdy(vPos);vec2 duv1=dFdx(vUV),duv2=dFdy(vUV);
  vec3 T=cross(dp2,N)*duv1.x+cross(N,dp1)*duv2.x;
  vec3 B=cross(dp2,N)*duv1.y+cross(N,dp1)*duv2.y;
  float inv=inversesqrt(max(max(dot(T,T),dot(B,B)),.00000001));
  vec3 n=texture(uNormalMap,vUV).xyz*2.0-1.0;n.xy*=uNormalScale;
  N=normalize(mat3(T*inv,B*inv,N)*n);
 }
 vec3 V=normalize(uEye-vPos);
 float shadow=getShadow(N);
 float lambert=max(dot(N,uSun),0.0);
 vec3 sunColor=mix(vec3(1.0,.92,.73),vec3(1.0,.60,.30),uSunset);
 vec3 skyColor=mix(vec3(.34,.46,.50),vec3(.26,.30,.49),uSunset);
 float hemi=.52+.48*N.y;
 vec3 ambient=mix(vec3(.20,.23,.14),skyColor,hemi);
 float groundAO=1.0;
 if(vPos.y<1.5&&vPos.y>.5){float rootDist=length(vPos.xz-vec2(.05,-.38));groundAO=.66+.34*smoothstep(.6,2.15,rootDist);}
 float canopyAO=1.0;
 if(vPos.y>4.4&&uKind<1.5){canopyAO=.7+.30*smoothstep(4.4,8.0,vPos.y);}
 vec3 base=vColor;float rough=uRough;
 if(uTextured>.5){base*=pow(texture(uBaseMap,vUV).rgb,vec3(2.2));rough*=texture(uRoughMap,vUV).g;}
 // Fine procedural surface relief only where it is appropriate.
 if(uKind<.5){float grain=noise(vPos.xz*20.0+vPos.y*8.0);base*=.95+.1*grain;}
 if(uKind>4.5&&uKind<5.5){
  float grain=noise(vec2(vWind.z*135.0,vWind.w*39.0));
  float lines=pow(.5+.5*sin(vWind.z*180.0+noise(vec2(vWind.z*28.0,vWind.w*24.0))*3.0),7.0);
  base*=.78+.24*grain+.18*lines;
 }
 if(uKind>5.5&&uKind<6.5){
  float mineral=fbm(vPos.xz*8.0+vPos.y*2.2);
  float strata=noise(vec2(vPos.y*7.0+sin(vPos.x*2.0)*.28,vPos.z*1.2));
  base*=.85+.27*mineral+.12*strata;
  float moss=smoothstep(.35,.83,vPos.y+mineral*.30)*smoothstep(.16,.72,N.y);
  base=mix(base,vec3(.16,.27,.055),moss*.72);
 }
 vec3 col=base*(ambient*groundAO*canopyAO+sunColor*lambert*shadow*2.55);
 if(uKind>.5 && uKind<1.5){
   float translucency=pow(max(dot(-V,uSun),0.0),3.0);
   col+=base*sunColor*(.19+.48*translucency)*(1.0-lambert)*(.5+.5*shadow);
   float rim=pow(1.0-max(dot(N,V),0.0),3.0);
   col+=base*sunColor*rim*.14*shadow;
 }
 float spec=pow(max(dot(N,normalize(V+uSun)),0.0),mix(13.0,90.0,1.0-rough));
 col+=sunColor*spec*shadow*(1.0-rough)*.26;
 float alpha=uAlpha;
 if(uKind>1.5 && uKind<2.5){
   float u=vWind.x,t=vWind.y;float vertical=vWind.w;
   float streak=pow(.5+.5*sin(u*64.0+sin(t*23.0-uTime*3.5+u*9.0)*.65),7.0);
   float flowing=sin(t*130.0-uTime*13.0+u*19.0)*.5+.5;
   float detail=noise(vec2(u*39.0,t*27.0-uTime*3.6));
   float white=clamp(streak*.62+pow(flowing,9.0)*.28+detail*.13,0.0,1.0);
   col=mix(base*1.35+vec3(.025,.18,.21),vec3(.88,1.05,1.02),white);
   if(vColor.r>.5)col=vec3(.9,1.04,1.02)*(.78+flowing*.25);
   float fresnel=pow(1.0-abs(dot(N,V)),3.0);col+=vec3(.10,.25,.30)*fresnel;
   alpha*=smoothstep(0.0,.06,u)*smoothstep(0.0,.06,1.0-u);
   alpha*=1.0-smoothstep(.85,1.0,t)*.6*vertical;
 }
 if(uKind>2.5&&uKind<3.5)col=vec3(2.7,1.28,.35);
 // Warm light from the lantern near the left edge.
 float lamp=exp(-length(vPos-vec3(-3.3,2.03,1.28))*2.8);
 col+=vec3(1.0,.48,.1)*lamp*base*.9;
 if(uKind>3.5&&uKind<4.5){col=base*(.65+.7*lambert);}
 float dist=length(uEye-vPos);
 float fog=1.0-exp(-pow(max(dist-24.0,0.0)*.013,1.38));
 vec3 fogColor=mix(vec3(.19,.42,.54),vec3(.55,.37,.37),uSunset);
 col=mix(col,fogColor,clamp(fog,0.0,.95));
 outColor=vec4(outputColor(col),alpha);
}\`;
const fullVS=\`#version 300 es
precision highp float;
out vec2 vUV;
void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);vUV=p;gl_Position=vec4(p*2.0-1.0,0,1);}\`;
const skyFS=\`#version 300 es
precision highp float;
in vec2 vUV;
uniform vec3 uEye,uRight,uUp,uForward,uSun;
uniform float uAspect,uTan,uTime,uSunset;
out vec4 outColor;
\${tone}
vec3 sky(vec3 rd){
 float t=pow(clamp(rd.y*.75+.17,0.0,1.0),.65);
 vec3 top=mix(vec3(.035,.21,.61),vec3(.09,.115,.32),uSunset);
 vec3 low=mix(vec3(.36,.62,.83),vec3(.85,.45,.26),uSunset);
 vec3 col=mix(low,top,t);
 float sun=max(dot(rd,uSun),0.0);
 col+=vec3(1.0,.81,.44)*pow(sun,18.0)*.18;
 col+=vec3(1.0,.9,.6)*pow(sun,700.0)*2.0;
 // Parallax clouds above the sea; not a fixed background image.
 if(rd.y>-.06){
  vec2 q=rd.xz/max(rd.y+.28,.06)*2.35+vec2(uTime*.008,0.0);
  float n=fbm(q);float edge=smoothstep(.54,.77,n);
  float mask=smoothstep(-.06,.13,rd.y)*(1.0-smoothstep(.63,.95,rd.y));
  vec3 cloud=mix(vec3(.65,.79,.88),vec3(1.20,1.20,1.10),smoothstep(.57,.77,n));
  cloud=mix(cloud,cloud*vec3(1.1,.84,.74),uSunset);
  col=mix(col,cloud,edge*mask*.90);
 }
 return col;
}
void main(){
 vec2 uv=vUV*2.0-1.0;
 vec3 rd=normalize(uForward+uv.x*uAspect*uTan*uRight+uv.y*uTan*uUp);
 vec3 col=sky(rd);
 if(rd.y<-.001){
  float d=(-9.0-uEye.y)/rd.y;
  if(d>0.0){
   vec3 p=uEye+rd*d;
   float a=sin(p.x*.65+p.z*.4+uTime*.85),b=sin(p.z*1.23-p.x*.37-uTime*.6);
   vec3 N=normalize(vec3((a+sin(p.x*2.0+uTime))*.030,1.0,b*.030));
   vec3 reflected=reflect(rd,N);float fresnel=.09+.91*pow(1.0-max(dot(-rd,N),0.0),4.0);
   float shoal=fbm(p.xz*.054);
   vec3 water=mix(vec3(.006,.095,.285),vec3(.015,.35,.43),smoothstep(.33,.79,shoal));
   water=mix(water,water*vec3(.91,.63,.75),uSunset*.5);
   float ripple=pow(max(.0,sin(p.x*2.8+p.z*4.5+uTime)*sin(p.z*2.6-p.x*1.7-uTime*.8)),14.0);
   water+=vec3(.06,.10,.12)*ripple*exp(-d*.035);
   vec3 reflection=mix(vec3(.36,.57,.71),vec3(.09,.32,.60),max(0.0,reflected.y));col=mix(water,reflection,fresnel*.46);
   float spec=pow(max(dot(reflected,uSun),0.0),220.0);
   col+=vec3(1.2,.95,.5)*spec;
   float mist=1.0-exp(-max(d-30.0,0.0)*.0045);
   col=mix(col,sky(vec3(rd.x,.008,rd.z)),mist*.85);
  }
 }
 col=outputColor(col);
 float vignette=1.0-.075*dot(uv*.68,uv*.68);
 outColor=vec4(col*vignette,1.0);
}\`;
const particleVS=\`#version 300 es
precision highp float;
layout(location=0) in vec4 aSeed;
uniform mat4 uVP;
uniform vec3 uEye;
uniform float uTime,uWind,uHeight,uSparkle;
uniform vec3 uVisitor;
out float vAlpha,vType;
void main(){
 float type=aSeed.w;float s=aSeed.x;float a=aSeed.y;float r=aSeed.z;vec3 p;
 if(type>2.5){float a0=s*6.283+uTime*.65;float h=fract(r+uTime*.18);p=uVisitor+vec3(cos(a0)*(.24+.52*a),h*2.9,sin(a0)*(.24+.52*a));vAlpha=sin(h*3.14159)*uSparkle*.85;}
 else if(type<.5){p=vec3(sin(s*37.0)*4.8,1.4+fract(s+uTime*.028)*6.1,cos(s*29.0)*3.0);p.x+=sin(uTime*.5+s*60.0)*.28*uWind;p.z+=cos(uTime*.4+s*40.0)*.22;vAlpha=pow(sin(fract(s+uTime*.028)*3.14159),.6)*.65;}
 else{
  float age=fract(s+uTime*(.30+r*.16));vec3 origin=type<1.5?vec3(4.17,-5.1,3.22):vec3(-4.15,-5.75,2.59);
  p=origin+vec3(cos(a*6.283)*age*(.20+r*.7),-age*1.2+sin(age*3.14)*.40,sin(a*6.283)*age*(.2+r*.8));
  vAlpha=(1.0-age)*.38;
 }
 vType=type;gl_Position=uVP*vec4(p,1.0);float dist=length(uEye-p);
 gl_PointSize=clamp((type>2.5?4.0+r*5.0:type<.5?2.2:11.0+r*23.0)*uHeight/850.0*18.0/dist,1.0,62.0);
}\`;
const particleFS=\`#version 300 es
precision highp float;
in float vAlpha,vType;
out vec4 outColor;
void main(){float d=length(gl_PointCoord-.5)*2.0;if(d>1.0)discard;float a=pow(1.0-d,(vType<.5||vType>2.5)?1.3:2.0)*vAlpha;vec3 c=(vType<.5||vType>2.5)?vec3(1.0,.83,.36):vec3(.86,.97,1.0);outColor=vec4(c,a);}\`;
let main,shadows,background,particles;
try{main=program(meshVS,meshFS);shadows=program(shadowVS,shadowFS);background=program(fullVS,skyFS);particles=program(particleVS,particleFS);}catch(err){fail(err);return;}
let S={time:0,wind:1,auto:false,paused:false,sunset:0,targetSunset:0,quality:'high',ui:true};
let cam={yaw:.32,pitch:.27,dist:28,target:[0,.6,0],tyaw:.32,tpitch:.27,tdist:28};
let meshes=[],env=[],totalTriangles=0,blobBytes=null,loaded=false,lightMatrix;
const sun=V.norm([-6,9,5]);
let shadowSize=2048,shadowTex,shadowFbo;
function setupShadows(){
 if(shadowTex)gl.deleteTexture(shadowTex);if(shadowFbo)gl.deleteFramebuffer(shadowFbo);
 shadowSize=S.quality==='high'?2048:1024;
 shadowTex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,shadowTex);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT24,shadowSize,shadowSize,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,null);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 shadowFbo=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,shadowFbo);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,shadowTex,0);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);
 if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw Error('Не удалось создать буфер теней.');gl.bindFramebuffer(gl.FRAMEBUFFER,null);
 lightMatrix=M.mul(M.ortho(-9,9,-10,10,.1,55),M.look(V.add(V.scale(sun,24),[0,2,0]),[0,2,0]));
}
function makeBuffer(target,data){allocationBytes+=data.byteLength;let b=gl.createBuffer();gl.bindBuffer(target,b);gl.bufferData(target,data,gl.STATIC_DRAW);return b;}
function bindAttr(location,data,size,type=gl.FLOAT,normalized=false){makeBuffer(gl.ARRAY_BUFFER,data);gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,size,type,normalized,0,0);}
function parseGLB(bytes){
 const dv=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 if(dv.getUint32(0,true)!==0x46546c67||dv.getUint32(4,true)!==2)throw Error('Неверный формат модели.');
 const len=dv.getUint32(12,true),json=JSON.parse(new TextDecoder().decode(bytes.subarray(20,20+len)));const binOffset=28+len;
 function attribute(i){const a=json.accessors[i],b=json.bufferViews[a.bufferView];const C={5126:Float32Array,5125:Uint32Array,5123:Uint16Array,5121:Uint8Array}[a.componentType];const n={SCALAR:1,VEC2:2,VEC3:3,VEC4:4}[a.type];return {array:new C(bytes.buffer,bytes.byteOffset+binOffset+(b.byteOffset||0)+(a.byteOffset||0),a.count*n),size:n,type:a.componentType,normalized:a.normalized||false,count:a.count};}
 const cache=[],groundSurfaces=[];
 for(const [meshIndex,mesh] of json.meshes.entries()){let parts=[];for(const [primIndex,prim] of mesh.primitives.entries()){
  allocationBytes=0;
  const material=json.materials[prim.material],vao=gl.createVertexArray();gl.bindVertexArray(vao);
  for(const [key,location] of [['POSITION',0],['NORMAL',1],['COLOR_0',2],['_WIND',3]]){
   if(prim.attributes[key]===undefined){gl.disableVertexAttribArray(location);gl.vertexAttrib4f(location,0,0,0,0);continue;}
   const a=attribute(prim.attributes[key]);bindAttr(location,a.array,a.size,a.type,a.normalized);
  }
  const idx=attribute(prim.indices);makeBuffer(gl.ELEMENT_ARRAY_BUFFER,idx.array);
  const kind=material.extras?.shaderKind||0;
  const resource='glb-'+meshIndex+'-'+primIndex,vertices=attribute(prim.attributes.POSITION).count;
  perf.resource({id:resource,bytes:allocationBytes,vertices});
  const groundGeometry=['Meadow','Sand_and_path_stones'].includes(mesh.name)?{positions:attribute(prim.attributes.POSITION).array,indices:idx.array}:null;
  parts.push({groundGeometry,resource,vertices,materialId:'material-'+prim.material,name:mesh.name,vao,count:idx.count,type:idx.type,kind,alpha:material.pbrMetallicRoughness.baseColorFactor[3],rough:material.pbrMetallicRoughness.roughnessFactor,cast:kind!==2&&kind!==3&&mesh.name!=='Windblown_grass'&&mesh.name!=='Wildflowers'});
 }cache.push(parts);}
 function localMatrix(n){
  if(n.matrix)return new Float32Array(n.matrix);
  const [x,y,z,w]=n.rotation||[0,0,0,1],s=n.scale||[1,1,1],t=n.translation||[0,0,0];
  return new Float32Array([(1-2*(y*y+z*z))*s[0],2*(x*y+z*w)*s[0],2*(x*z-y*w)*s[0],0,2*(x*y-z*w)*s[1],(1-2*(x*x+z*z))*s[1],2*(y*z+x*w)*s[1],0,2*(x*z+y*w)*s[2],2*(y*z-x*w)*s[2],(1-2*(x*x+y*y))*s[2],0,...t,1]);
 }
 function walk(id,parent){const n=json.nodes[id],world=M.mul(parent,localMatrix(n));
  if(n.extras?.birdId!==undefined&&!n.extras.birdPart){birdRoots[n.extras.birdId]={pos:n.translation,yaw:2*Math.atan2((n.rotation||[0,0,0,1])[1],(n.rotation||[0,0,0,1])[3]),scale:n.scale[0],initialPerch:n.extras.initialPerch};}
  if(n.mesh!==undefined)for(const c of cache[n.mesh]){if(c.groundGeometry)groundSurfaces.push({...c.groundGeometry,matrix:world});const m={...c,model:world,birdId:n.extras?.birdId,birdPart:n.extras?.birdPart,boyPart:n.extras?.boyPart};perfInventory.element(m,'node-'+id+'-'+meshes.length,m.resource,m.vertices,m.materialId);meshes.push(m);totalTriangles+=m.count/3;if(m.birdPart)birdMeshes.push(m);if(m.boyPart)boyMeshes.push(m);}
  for(const ch of n.children||[])walk(ch,world);
 }
 for(const id of json.scenes[json.scene||0].nodes)walk(id,IDENTITY);
 groundSampler=SunnyRuntime.createGroundSampler(groundSurfaces);
 let seed;try{const requested=new URLSearchParams(location.search).get('seed')??(window.AERIA_SEED!==undefined?String(window.AERIA_SEED):null);seed=requested!==null?Number(requested)>>>0:crypto.getRandomValues(new Uint32Array(1))[0];}catch(e){seed=(Date.now()^Math.floor(Math.random()*0xffffffff))>>>0;}
 garden=createBirdGarden({perches:json.extras.birdGarden.perches,meshes:birdMeshes,roots:birdRoots,seed,onStatus:s=>{if($('bird-count'))$('bird-count').textContent=\`В небе \${s.flying} · Отдыхают \${s.perched}\`;}});
 visitor=createVisitor({seed,meshes:boyMeshes,garden,onPose:p=>{visitorPose=p},onStatus:s=>{visitorStage=s.label;if($('visitor-status'))$('visitor-status').textContent=s.label;if($('call-boy')){$('call-boy').disabled=s.stage!=='absent';$('call-boy').textContent=s.stage==='absent'?'Позвать мальчика':'Мальчик в гостях';}}});

 gl.bindVertexArray(null);
}
// Far islands are simple geometric silhouettes, faded by atmospheric perspective.
function createEnvironment(){
 allocationBytes=0;
 let pp=[],nn=[],cc=[],ii=[];
 function tri(a,b,c,color){const n=V.norm(V.cross(V.sub(b,a),V.sub(c,a)));let k=pp.length/3;for(const p of[a,b,c]){pp.push(...p);nn.push(...n);cc.push(...color,1)}ii.push(k,k+1,k+2);}
 function peak(x,z,r,height,phase){
 const n=9,levels=[[0,r], [.28*height,r*.85],[.55*height,r*.53],[height,r*.06]];let rings=[];
 for(let k=0;k<levels.length;k++){let [y,rr]=levels[k];let ring=[];for(let i=0;i<n;i++){let a=i*Math.PI*2/n;let q=rr*(1+.16*Math.sin(i*4+phase));ring.push([x+Math.cos(a)*q,-9+y,z+Math.sin(a)*q]);}rings.push(ring)}
 for(let k=0;k<3;k++)for(let j=0;j<n;j++){let next=(j+1)%n;let c=k===2?[.14,.24,.14]:[.20,.27,.28];tri(rings[k][j],rings[k+1][j],rings[k][next],c);tri(rings[k][next],rings[k+1][j],rings[k+1][next],c);}
 }
 for(let i=0;i<17;i++){
  let a=i*2.399,dist=42+(i%4)*14,x=Math.cos(a)*dist,z=Math.sin(a)*dist;
  let r=2.3+(i%3)*1.1,height=4+(i%5)*1.75;
  peak(x,z,r,height,i);peak(x+r*.75,z+r*.5,r*.58,height*.55,i+.7);
 }
 const vao=gl.createVertexArray();gl.bindVertexArray(vao);bindAttr(0,new Float32Array(pp),3);bindAttr(1,new Float32Array(nn),3);bindAttr(2,new Float32Array(cc),4);bindAttr(3,new Float32Array(pp.length/3*4),4);makeBuffer(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(ii));const m={name:'environment',vao,count:ii.length,type:gl.UNSIGNED_INT,kind:4,alpha:1,rough:1,cast:false};env.push(m);perf.resource({id:'environment-buffer',bytes:allocationBytes,vertices:pp.length/3});perfInventory.element(m,'environment-mesh','environment-buffer',pp.length/3,'environment-material','generated');
}
let particleVAO,particleCount=640;
function createParticles(){let data=new Float32Array(particleCount*4),seed=1593;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
 for(let i=0;i<particleCount;i++){data[i*4]=rand();data[i*4+1]=rand();data[i*4+2]=rand();data[i*4+3]=i<90?0:(i<295?1:(i<500?2:3));}
 allocationBytes=0;particleVAO=gl.createVertexArray();gl.bindVertexArray(particleVAO);bindAttr(0,data,4);gl.bindVertexArray(null);
 perf.resource({id:'particle-buffer',bytes:allocationBytes,vertices:particleCount});
 perf.element({id:'particle-points',parent:'particles',label:'Искры, пыльца и брызги',name:'particle-points',triangles:0,vertices:particleCount,instances:1,resources:['particle-buffer'],materials:['particles-material'],source:'generated'});
 perf.element({id:'sky-triangle',parent:'background',label:'Небо и море (шейдер)',name:'sky-triangle',triangles:1,vertices:3,instances:1,resources:[],materials:['sky-material'],source:'generated'});
}
let controlsMobile=null;
function resize(){const mobile=innerWidth<720;if(mobile!==controlsMobile){$('scene-controls').open=!mobile;controlsMobile=mobile;}let dpr=Math.min(window.devicePixelRatio||1,S.quality==='high'?1.6:1);let w=Math.round(innerWidth*dpr),h=Math.round(innerHeight*dpr);if(w!==canvas.width||h!==canvas.height){canvas.width=w;canvas.height=h;} }
function uploadSunny(avatar){
 const textures=new Map();let textureBytesEstimate=0;
 function texture(map){
  if(textures.has(map))return textures.get(map);
  const tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);
  gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,map.image);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT);
  gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  textureBytesEstimate+=map.image.width*map.image.height*4*4/3;
  textures.set(map,tex);return tex;
 }
 for(const [i,mesh]of avatar.parts.entries()){
  if(mesh.skeleton?.bones.length>32)throw Error('Sunny: превышен лимит 32 костей');
  allocationBytes=0;const vao=gl.createVertexArray();gl.bindVertexArray(vao);const geometry=mesh.geometry;
  for(const [key,loc]of [['position',0],['normal',1],['uv',4],['skinIndex',5],['skinWeight',6]]){
   const a=geometry.attributes[key];if(a)bindAttr(loc,new Float32Array(a.array),a.itemSize);
  }
  gl.disableVertexAttribArray(2);gl.vertexAttrib4f(2,1,1,1,1);gl.disableVertexAttribArray(3);gl.vertexAttrib4f(3,0,0,0,0);
  const index=geometry.index;makeBuffer(gl.ELEMENT_ARRAY_BUFFER,index.array);
  const mat=mesh.material,id='sunny-mesh-'+i,resource='sunny-buffer-'+i;
  const m={name:mesh.name,vao,count:index.count,type:index.array instanceof Uint32Array?gl.UNSIGNED_INT:gl.UNSIGNED_SHORT,kind:8,alpha:1,rough:mat.roughness,cast:true,mesh,baseMap:texture(mat.map),normalMap:texture(mat.normalMap),roughMap:texture(mat.roughnessMap),normalScale:mat.normalScale.x,model:IDENTITY,performanceId:id};
  perf.resource({id:resource,bytes:allocationBytes,vertices:geometry.attributes.position.count});
  perf.element({id,parent:'boy-sunny',label:'Тело, лицо, волосы и костюм (единая сетка)',name:mesh.name,triangles:m.count/3,vertices:geometry.attributes.position.count,instances:1,resources:[resource],materials:['sunny-material-'+i],source:'glb'});
  sunnyMeshes.push(m);meshes.push(m);totalTriangles+=m.count/3;
 }
 gl.bindVertexArray(null);
 avatar.textureCount=textures.size;avatar.textureBytesEstimate=Math.ceil(textureBytesEstimate);
}
function updateSunny(dt){
 if(!sunny)return;sunny.update(dt);
 for(const m of sunnyMeshes){m.model=M.mul(sunny.transform.elements,m.mesh.matrixWorld.elements);m.hidden=boyMode!=='sunny';}
 for(const m of boyMeshes)if(boyMode!=='legacy')m.hidden=true;
 if(boyMode==='sunny'){
  const state=sunny.state(),walking=state.mode==='walk';
  visitorStage=state.walkError||('Sunny · '+(walking?'Прогулка':state.clip));$('visitor-status').textContent=visitorStage;visitorPose={pos:state.position,visible:1,sparkle:0};
  $('sunny-mode').value=state.mode;$('sunny-clip').disabled=walking;$('sunny-root-motion').disabled=walking;
  $('sunny-walk-controls').hidden=!walking;$('sunny-correction').value=state.corrected?'corrected':'raw';
  $('sunny-play').textContent=state.playing?(walking?'Пауза':'Пауза клипа'):(walking?'Играть':'Играть клип');
  $('sunny-seek').setAttribute('aria-label',walking?'Время прогулки':'Время клипа');$('sunny-seek').max=state.duration;$('sunny-seek').value=state.time;
  $('sunny-time').textContent=state.time.toFixed(2)+' / '+state.duration.toFixed(2)+' с';
 }
}
function selectBoyMode(mode){
 boyMode=['sunny','legacy','none'].includes(mode)?mode:'sunny';$('boy-model').value=boyMode;
 // Release old hand reservations before freezing the procedural visitor.
 garden?.releaseHand(0);garden?.releaseHand(1);
 $('sunny-controls').hidden=boyMode!=='sunny';$('call-boy').disabled=boyMode!=='legacy';
 $('call-boy').textContent=boyMode==='legacy'?'Позвать мальчика':'Sunny на острове';
 if(boyMode==='legacy')visitor?.update(0);
 else {for(const m of boyMeshes)m.hidden=true;visitorPose={pos:[-.15,1.02,1.98],visible:boyMode==='sunny'?1:0,sparkle:0};}
 if(boyMode==='none'){visitorStage='Без мальчика';$('visitor-status').textContent=visitorStage;}
 $('boy-close').disabled=boyMode==='none';$('export-label').textContent=boyMode==='sunny'?'Sunny .GLB':'Остров .GLB';
 for(const m of sunnyMeshes)m.hidden=boyMode!=='sunny';
 perf.resetTiming();
}
function drawMeshes(p,list,vp){
 gl.useProgram(p);um(p,'uVP',vp);um(p,'uLight',lightMatrix);uf(p,'uTime',S.time);uf(p,'uWind',S.wind);uv(p,'uEye',eye);uv(p,'uSun',sun);uf(p,'uSunset',S.sunset);uf(p,'uShadowTexel',1/shadowSize);
 if(p===main){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,shadowTex);gl.uniform1i(p.u.uShadow,0);}
 for(const m of list){if(m.hidden||!perf.enabled(m.performanceId))continue;uf(p,'uSkinned',m.mesh?.isSkinnedMesh?1:0);
 if(m.mesh?.isSkinnedMesh){gl.uniformMatrix4fv(p.u['uBones[0]'],false,m.mesh.skeleton.boneMatrices);um(p,'uBind',m.mesh.bindMatrix.elements);um(p,'uBindInverse',m.mesh.bindMatrixInverse.elements);}
 if(p===main){uf(p,'uTextured',m.baseMap?1:0);uf(p,'uNormalScale',m.normalScale||1);if(m.baseMap)for(const [unit,key,tex]of [[1,'uBaseMap',m.baseMap],[2,'uNormalMap',m.normalMap],[3,'uRoughMap',m.roughMap]]){gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,tex);gl.uniform1i(p.u[key],unit);}}
 uf(p,'uVisible',m.visible??1);um(p,'uModel',m.model||IDENTITY);uf(p,'uKind',m.kind);uf(p,'uAlpha',m.alpha);uf(p,'uRough',m.rough);gl.bindVertexArray(m.vao);gl.drawElements(gl.TRIANGLES,m.count,m.type,0);perf.draw(m.performanceId,p===shadows?'shadow':'main',m.count/3);}
}
let eye=[0,9,25],VP,last=0,frames=0,fpsTime=0,frameNo=0;let forcedTime=null;
function render(now){
 if(contextLost)return;
 perf.beginFrame(now);
 const elapsed=last?Math.max((now-last)/1000,.001):.016;const dt=Math.min(elapsed,.05);last=now;
 if(!S.paused&&forcedTime===null)S.time+=dt;
 if(forcedTime!==null)S.time=forcedTime;
 if(S.auto&&!dragging)cam.tyaw+=dt*.115;
 const smooth=1-Math.exp(-dt*11);cam.yaw+=(cam.tyaw-cam.yaw)*smooth;cam.pitch+=(cam.tpitch-cam.pitch)*smooth;cam.dist+=(cam.tdist-cam.dist)*smooth;S.sunset+=(S.targetSunset-S.sunset)*smooth;
 const visitorStart=performance.now();
 if(visitor&&boyMode==='legacy')visitor.update(S.paused||forcedTime!==null?0:dt);
 if(sunny&&boyMode==='sunny')updateSunny(S.paused||forcedTime!==null?0:dt);
  const birdsStart=performance.now();
  if(garden)garden.update(S.paused||forcedTime!==null?0:dt,S.wind);
  const updateEnd=performance.now();
  if(visitor&&$('boy-close')?.getAttribute('aria-pressed')==='true'){const p=boyMode==='sunny'?sunny.focus():visitor.debug().pos;const target=[p[0],p[1]+1.45,p[2]];cam.target=cam.target.map((x,i)=>x+(target[i]-x)*smooth);}
 resize();
 eye=[cam.target[0]+Math.sin(cam.yaw)*Math.cos(cam.pitch)*cam.dist,cam.target[1]+Math.sin(cam.pitch)*cam.dist,cam.target[2]+Math.cos(cam.yaw)*Math.cos(cam.pitch)*cam.dist];
 const forward=V.norm(V.sub(cam.target,eye)),right=V.norm(V.cross(forward,[0,1,0])),up=V.cross(right,forward);
 const fov=(innerWidth<650?48:40)*Math.PI/180,asp=canvas.width/canvas.height;
 const bp=cam.pitch-.16,bgForward=[-Math.sin(cam.yaw)*Math.cos(bp),-Math.sin(bp),-Math.cos(cam.yaw)*Math.cos(bp)],bgUp=V.cross(right,bgForward),bgVP=M.mul(M.perspective(fov,asp,.15,250),M.look(eye,V.add(eye,bgForward)));
 VP=M.mul(M.perspective(fov,asp,.15,250),M.look(eye,cam.target));
 const submitStart=performance.now();
 // Coherent animated shadows, updated every other frame in the light preset.
 if(S.quality==='high'||frameNo%3===0){
 gl.bindFramebuffer(gl.FRAMEBUFFER,shadowFbo);gl.viewport(0,0,shadowSize,shadowSize);gl.enable(gl.DEPTH_TEST);gl.depthMask(true);gl.disable(gl.BLEND);gl.disable(gl.CULL_FACE);gl.clear(gl.DEPTH_BUFFER_BIT);
 gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1.5,2.0);drawMeshes(shadows,meshes.filter(m=>m.cast),lightMatrix);gl.disable(gl.POLYGON_OFFSET_FILL);
 }
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(.4,.7,.9,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);gl.bindVertexArray(null);
 if(perf.enabled('sky-triangle')){gl.useProgram(background);uv(background,'uEye',eye);uv(background,'uRight',right);uv(background,'uUp',bgUp);uv(background,'uForward',bgForward);uv(background,'uSun',sun);uf(background,'uAspect',asp);uf(background,'uTan',Math.tan(fov/2));uf(background,'uTime',S.time);uf(background,'uSunset',S.sunset);gl.drawArrays(gl.TRIANGLES,0,3);perf.draw('sky-triangle','main',1);}
 gl.enable(gl.DEPTH_TEST);gl.depthMask(true);gl.disable(gl.CULL_FACE);
 drawMeshes(main,env,bgVP);drawMeshes(main,meshes.filter(m=>m.kind!==2),VP);
 gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
 drawMeshes(main,meshes.filter(m=>m.kind===2),VP);
 if(perf.enabled('particle-points')){gl.useProgram(particles);um(particles,'uVP',VP);uv(particles,'uEye',eye);uf(particles,'uTime',S.time);uf(particles,'uWind',S.wind);uf(particles,'uHeight',canvas.height);uv(particles,'uVisitor',visitorPose.pos);uf(particles,'uSparkle',visitorPose.sparkle);gl.bindVertexArray(particleVAO);gl.drawArrays(gl.POINTS,0,particleCount);perf.draw('particle-points','main',0,particleCount);}
 gl.depthMask(true);gl.disable(gl.BLEND);gl.bindVertexArray(null);
 perf.endFrame(birdsStart-visitorStart,updateEnd-birdsStart,performance.now()-submitStart);
 frames++;frameNo++;fpsTime+=elapsed;if(fpsTime>1){$('fps').textContent=Math.round(frames/fpsTime)+' FPS';frames=0;fpsTime=0;}
 window.__frame=frameNo;
 requestAnimationFrame(render);
}
function fail(err){perf.setStatus('error',String(err.message||err));if(!performanceBridgeReady)fatalPerformance(String(err.message||err));console.error(err);$('loading').style.display='grid';$('loading').innerHTML='<div class="load-title">Не удалось запустить сцену</div><p>'+String(err.message||err).replace(/[<>]/g,'')+'</p><p>Попробуйте открыть файл в другом браузере.</p>';}
let dragging=false,points=new Map(),lastPinch=0;
function stopAuto(){S.auto=false;$('rotate').setAttribute('aria-pressed','false');}
canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);points.set(e.pointerId,{x:e.clientX,y:e.clientY});dragging=true;stopAuto();$('hint').classList.add('hidden');if(points.size===2){let a=[...points.values()];lastPinch=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);}});
canvas.addEventListener('pointermove',e=>{
 if(!points.has(e.pointerId))return;const prev=points.get(e.pointerId);points.set(e.pointerId,{x:e.clientX,y:e.clientY});
 if(points.size===2){let a=[...points.values()],d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);cam.tdist=clamp(cam.tdist*(lastPinch/Math.max(1,d)),4,49);lastPinch=d;}
 else if(e.buttons===2||e.shiftKey){cam.target[1]=clamp(cam.target[1]+(e.clientY-prev.y)*.018,-1,5);}
 else{cam.tyaw-=(e.clientX-prev.x)*.007;cam.tpitch=clamp(cam.tpitch+(e.clientY-prev.y)*.005,-.28,1.28);}
});
function pointerUp(e){points.delete(e.pointerId);dragging=points.size>0;}
canvas.addEventListener('pointerup',pointerUp);canvas.addEventListener('pointercancel',pointerUp);canvas.addEventListener('contextmenu',e=>e.preventDefault());
canvas.addEventListener('wheel',e=>{e.preventDefault();cam.tdist=clamp(cam.tdist*Math.exp(e.deltaY*.001),4,49);$('hint').classList.add('hidden');},{passive:false});
function clamp(x,l,h){return Math.max(l,Math.min(h,x))}
function reset(){if($('boy-close'))$('boy-close').setAttribute('aria-pressed','false');cam.tyaw=.32;cam.tpitch=.24;cam.tdist=innerWidth<650?38:32.5;cam.target=[0,1.8,0];stopAuto();if($('bird-close'))$('bird-close').setAttribute('aria-pressed','false');}
function toast(s){$('toast').textContent=s;$('toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2800)}
function download(data,name,type){const url=URL.createObjectURL(new Blob([data],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);}
$('wind').addEventListener('input',e=>{S.wind=Number(e.target.value)/100;$('wind-value').textContent=Math.round(S.wind*100)+'%';$('wind-label').textContent=S.wind<.05?'Штиль':S.wind<.7?'Лёгкий ветер':S.wind<1.5?'Морской бриз':'Сильный ветер';});
$('rotate').onclick=()=>{S.auto=!S.auto;$('rotate').setAttribute('aria-pressed',String(S.auto));};
$('pause').onclick=()=>{S.paused=!S.paused;$('pause').setAttribute('aria-pressed',String(S.paused));$('pause-label').textContent=S.paused?'Продолжить':'Пауза';};
$('reset').onclick=reset;
$('call-boy').onclick=()=>{if(visitor?.call())toast(S.paused?'Снимите паузу, чтобы встретить гостя':'Гость уже в пути');};
 $('boy-close').onclick=()=>{$('bird-close').setAttribute('aria-pressed','false');if($('boy-close').getAttribute('aria-pressed')==='true'){reset();return;}stopAuto();const p=boyMode==='sunny'?sunny.focus():visitor?.debug().pos||[-.5,1,1.5];cam.target=[p[0],p[1]+1.45,p[2]];cam.tyaw=.12;cam.tpitch=.12;cam.tdist=innerWidth<650?9:7.8;$('boy-close').setAttribute('aria-pressed','true');};
 $('bird-scatter').onclick=()=>{garden?.scatter();toast(S.paused?'Снимите паузу, чтобы стая взлетела':'Стая взлетает — каждая птица своим путём');};
$('bird-close').onclick=()=>{$('boy-close').setAttribute('aria-pressed','false');if($('bird-close').getAttribute('aria-pressed')==='true'){reset();return;}stopAuto();cam.target=[0,6.8,.1];cam.tyaw=.34;cam.tpitch=.11;cam.tdist=innerWidth<650?28:21;$('bird-close').setAttribute('aria-pressed','true');$('hint').classList.add('hidden');};
$('day').onclick=()=>{S.targetSunset=0;$('day').classList.add('active');$('golden').classList.remove('active');};
$('golden').onclick=()=>{S.targetSunset=1;$('golden').classList.add('active');$('day').classList.remove('active');};
$('quality').onclick=()=>{S.quality=S.quality==='high'?'low':'high';$('quality-label').textContent=S.quality==='high'?'Высокое':'Лёгкое';setupShadows();toast(S.quality==='high'?'Высокое качество':'Меньше разрешение и нагрузка на устройство');};
$('export').onclick=()=>{const bytes=boyMode==='sunny'?sunnyBytes:blobBytes;if(bytes)download(bytes,boyMode==='sunny'?'sunny.glb':'ostrov_boy.glb','model/gltf-binary');};
$('photo').onclick=()=>{canvas.toBlob(blob=>{if(blob)download(blob,'ostrov_boy.png','image/png')},'image/png');toast('Кадр сохранён без интерфейса');};
$('fullscreen').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch(e){toast('Полноэкранный режим недоступен в этом просмотрщике');}};
 $('hide-ui').onclick=()=>{document.body.classList.add('clean');toast('Нажмите кнопку в углу или H, чтобы вернуть интерфейс');};
$('show-ui').onclick=()=>document.body.classList.remove('clean');
window.addEventListener('keydown',e=>{if(e.target.matches('input,button,select,textarea,summary'))return;if(e.key.toLowerCase()==='h')document.body.classList.toggle('clean');if(e.key.toLowerCase()==='d')document.body.classList.toggle('diagnostics');if(e.key.toLowerCase()==='r')reset();if(e.code==='Space'){e.preventDefault();$('pause').click();}if(e.key==='ArrowLeft')cam.tyaw-=.16;if(e.key==='ArrowRight')cam.tyaw+=.16;if(e.key==='ArrowUp')cam.tpitch=clamp(cam.tpitch-.09,-.28,1.28);if(e.key==='ArrowDown')cam.tpitch=clamp(cam.tpitch+.09,-.28,1.28);if(e.key==='+'||e.key==='=')cam.tdist=clamp(cam.tdist-1,4,49);if(e.key==='-')cam.tdist=clamp(cam.tdist+1,4,49);});
window.addEventListener('resize',resize);
canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;perf.setStatus('context-lost');perf.resetTiming();toast('Графический контекст потерян. Перезагрузите страницу.');});
function fatalPerformance(message){
 perf.setStatus('error',message);
 let active=false;
 window.addEventListener('message',e=>{if(e.source===window.parent&&e.origin===location.origin&&e.data?.protocol==='devkit-performance-v1'&&e.data.command==='subscribe')active=e.data.active===true;});
 setInterval(()=>{if(active&&!document.hidden)window.parent.postMessage({protocol:'devkit-performance-v1',type:'snapshot',snapshot:perf.snapshot({})},location.origin);},500);
}
// Versioned bridge: no renderer internals cross the iframe boundary.
performanceBridgeReady=true;
let performanceSubscribed=false,htmlBytes=AERIA_HTML_BYTES,htmlSizeSource='точный размер сборки';
const navEntry=performance.getEntriesByType('navigation')[0];
if(navEntry?.decodedBodySize){htmlBytes=navEntry.decodedBodySize;htmlSizeSource='Navigation Timing: decodedBodySize';}
function performanceConditions(){if(navEntry?.decodedBodySize){htmlBytes=navEntry.decodedBodySize;htmlSizeSource='Navigation Timing: decodedBodySize';}return {materialTextures:sunny?.textureCount||0,textureBytesEstimate:sunny?.textureBytesEstimate||0,assets:[{name:'Остров и прежний мальчик',bytes:blobBytes?.length||0},{name:'Sunny · soles-01.glb',bytes:sunnyBytes?.length||0}],animation:boyMode==='sunny'?{kind:'GLB · '+sunny.state().clip,bones:sunny.bones,clips:sunny.clips.length}:{kind:boyMode==='legacy'?'процедурные (JavaScript)':'мальчик выключен',bones:null,clips:null},width:canvas.width,height:canvas.height,cssWidth:innerWidth,cssHeight:innerHeight,dpr:canvas.width/innerWidth,quality:S.quality==='high'?'Высокое':'Лёгкое',shadowSize,shadowBytesEstimate:shadowSize*shadowSize*4,stage:visitorStage,paused:S.paused,simulationTime:S.time,glbBytes:(blobBytes?.length||0)+(sunnyBytes?.length||0),htmlBytes,htmlSizeSource};}
function publishPerformance(){if(performanceSubscribed&&!document.hidden&&window.parent!==window)window.parent.postMessage({protocol:'devkit-performance-v1',type:'snapshot',snapshot:perf.snapshot(performanceConditions())},location.origin);}
window.addEventListener('message',event=>{
 if(event.source!==window.parent||event.origin!==location.origin||event.data?.protocol!=='devkit-performance-v1')return;
 const m=event.data;
 if(m.command==='subscribe'&&typeof m.active==='boolean'){performanceSubscribed=m.active;}
 else if(m.command==='visibility'&&typeof m.id==='string'&&typeof m.enabled==='boolean')perf.setVisible(m.id,m.enabled);
 else if(m.command==='reset')perf.resetVisibility();
});
setInterval(publishPerformance,500);
document.addEventListener('visibilitychange',()=>{perf.resetTiming();last=0;});
window.__island={sunnyDebug:()=>sunny?.debug(),sunny:()=>sunny?.state(),setSunnyMode:mode=>{sunny?.setMode(mode);updateSunny(0);},setSunnyCorrection:value=>{sunny?.setCorrection(value);updateSunny(0);},restartSunnyWalk:()=>{sunny?.restartWalk();updateSunny(0);},sampleGround:(x,z)=>groundSampler?.sample(x,z),selectBoyMode,selectSunnyClip:name=>sunny?.select(name),sunnySeek:t=>sunny?.seek(t),snapshot:()=>perf.snapshot(performanceConditions()),state:S,camera:cam,setTime:t=>{forcedTime=t},releaseTime:()=>{forcedTime=null},setCamera:(yaw,pitch,dist)=>{Object.assign(cam,{yaw,tyaw:yaw,pitch,tpitch:pitch,dist,tdist:dist})},birds:()=>garden?.debug(),visitor:()=>visitor?.debug(),callVisitor:()=>visitor?.call(),advanceWorld:(seconds)=>{if(!Number.isFinite(seconds)||seconds<0||seconds>600)throw Error('0…600 seconds');for(let left=seconds;left>1e-8;left-=1/60){const dt=Math.min(left,1/60);S.time+=dt;if(boyMode==='legacy')visitor.update(dt);if(boyMode==='sunny')updateSunny(dt);garden.update(dt,S.wind);}},scatter:()=>garden?.scatter(),advanceBirds:(seconds)=>garden?.advance(seconds,S.wind),glError:()=>gl.getError(),stats:()=>({triangles:totalTriangles,meshes:meshes.length,webgl:gl.getParameter(gl.VERSION),bytes:blobBytes?.length})};
async function start(){try{
 await new Promise(r=>setTimeout(r,50));
 const base64=$('model-data').textContent.trim(),raw=atob(base64),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
 blobBytes=bytes;
 if(bytes[0]===31&&bytes[1]===139){if(typeof DecompressionStream==='undefined')throw Error('Для этого файла нужен браузер с поддержкой DecompressionStream.');blobBytes=new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());}
 parseGLB(blobBytes);
 const sunnyRaw=atob($('sunny-data').textContent.trim()),compressed=Uint8Array.from(sunnyRaw,c=>c.charCodeAt(0));
 sunnyBytes=new Uint8Array(await new Response(new Blob([compressed]).stream().pipeThrough(new DecompressionStream('gzip'))).arrayBuffer());
 sunny=await SunnyRuntime.createSunnyAvatar(sunnyBytes,{ground:groundSampler});uploadSunny(sunny);
 for(const clip of sunny.clips){const option=document.createElement('option');option.value=clip.name;option.textContent=clip.label;$('sunny-clip').append(option);}
 $('sunny-clip').value='Walking';$('sunny-clip').onchange=e=>{sunny.select(e.target.value);updateSunny(0);perf.resetTiming();};
 $('sunny-seek').oninput=e=>{sunny.seek(e.target.value);updateSunny(0);};
 $('sunny-speed').onchange=e=>sunny.setSpeed(Number(e.target.value));
 $('sunny-play').onclick=()=>{const playing=!sunny.state().playing;sunny.setPlaying(playing);$('sunny-play').textContent=playing?'Пауза клипа':'Играть клип';};
 $('sunny-mode').onchange=e=>{sunny.setMode(e.target.value);updateSunny(0);perf.resetTiming();};
 $('sunny-correction').onchange=e=>{sunny.setCorrection(e.target.value==='corrected');updateSunny(0);};
 $('sunny-restart').onclick=()=>{sunny.restartWalk();updateSunny(0);};
 $('sunny-root-motion').onchange=e=>sunny.setRootMotion(e.target.checked);
 $('boy-model').onchange=e=>selectBoyMode(e.target.value);selectBoyMode(boyMode);updateSunny(0);
 setupShadows();createEnvironment();createParticles();reset();if(innerWidth<650){S.quality='low';$('quality-label').textContent='Лёгкое';setupShadows();}
 cam.dist=cam.tdist;cam.pitch=cam.tpitch;loaded=true;perf.setStatus('ready');$('polycount').textContent=(totalTriangles/1000).toFixed(0)+'k треугольников';$('loading').classList.add('done');setTimeout(()=>$('loading').style.display='none',650);
 window.__ready=true;requestAnimationFrame(render);
}catch(err){fail(err);}}
start();
})();
`,F=`/* Aeria-specific inventory; collection and aggregation live in DevKit. */
function createAeriaPerformanceInventory(perf) {
  const labels={
    island:'Остров',tree:'Дерево',plants:'Растительность',water:'Вода',boy:'Мальчик',birds:'Птицы',environment:'Дальнее окружение',background:'Фон',particles:'Частицы',
    Cliff_and_boulders:'Скалы и камни',Earth_under_the_meadow:'Земля',Meadow:'Луг',Sand_and_path_stones:'Тропинка',Twisted_trunk_and_roots:'Ствол и корни',Living_tree_leaves:'Листья',Windblown_grass:'Трава',Wildflowers:'Цветы',Hanging_vines_and_ferns:'Лианы и папоротники',Fence_and_lantern_post:'Ограда и фонарь',Lantern_bronze:'Корпус фонаря',Lantern_warm_glass:'Стекло фонаря',Waterfalls_and_stream:'Водопады и ручей',Waterfall_foam:'Пена',Perching_branches:'Ветки для птиц',
    torso:'Торс и одежда',head:'Голова',eyes:'Глаза',hair:'Волосы',backpack:'Рюкзак',leftUpperArm:'Левое плечо',leftForearm:'Левое предплечье',leftHand:'Левая кисть',leftGrains:'Зёрна слева',leftThigh:'Левое бедро',leftShin:'Левая голень',leftFoot:'Левый ботинок',rightUpperArm:'Правое плечо',rightForearm:'Правое предплечье',rightHand:'Правая кисть',rightGrains:'Зёрна справа',rightThigh:'Правое бедро',rightShin:'Правая голень',rightFoot:'Правый ботинок',body:'Тело',leftWing:'Левое крыло',rightWing:'Правое крыло',tail:'Хвост',feet:'Лапки'
  };
  const group = (id,parent=null,label=labels[id]||id) => perf.element({id,parent,label,name:id,triangles:0,vertices:0,instances:0,resources:[],materials:[],source:'group'});
  for(const id of ['island','tree','plants','water','boy','birds','environment','background','particles']) group(id);
  group('boy-legacy','boy','Прежний мальчик · процедурный');group('boy-sunny','boy','Sunny · 28 костей, 15 клипов');
  const birdGroups=new Set();
  return {
    element(m,id,resource,vertices,material,source='glb') {
      let parent='island',key=m.name;
      if(m.boyPart){parent='boy-legacy';key=m.boyPart;}
      else if(m.birdPart){parent='bird-'+m.birdId;key=m.birdPart;if(!birdGroups.has(parent)){group(parent,'birds','Птица '+(m.birdId+1));birdGroups.add(parent);}}
      else if(/trunk|tree_leaves|Perching_branches/.test(m.name))parent='tree';
      else if(/grass|Wildflowers|vines/.test(m.name))parent='plants';
      else if(/Water/.test(m.name))parent='water';
      else if(source==='generated')parent=m.name;
      perf.element({id,parent,label:labels[key]||key,name:m.name,triangles:m.count/3,vertices,instances:1,resources:resource?[resource]:[],materials:[material],source});
      m.performanceId=id;
    }
  };
}
`,I="/three-mvp-pages/assets/ostrov_boy-Bm19IaU4.glb";function C(){const c=new Map,m=new Map,g=new Set,e=new Map;let y=null,h=0,w="loading",T,p=[];const f=()=>({calls:0,triangles:0,points:0}),v=(i,a)=>{i.calls+=a.calls,i.triangles+=a.triangles,i.points+=a.points};function S(i){const a=[],r=b=>{for(const u of c.values())u.parent===b&&(u.source!=="group"&&a.push(u),r(u.id))},l=c.get(i);return(l==null?void 0:l.source)!=="group"&&l&&a.push(l),r(i),a}return{resource(i){m.set(i.id,i)},element(i){c.set(i.id,i),e.set(i.id,{main:f(),shadow:f()})},enabled(i){return!g.has(i)},setVisible(i,a){for(const r of S(i))a?g.delete(r.id):g.add(r.id)},resetVisibility(){g.clear()},setStatus(i,a){w=i,T=a},resetTiming(){y=null,p=[]},beginFrame(i){h=i;for(const a of e.values())a.main.calls=a.main.triangles=a.main.points=0,a.shadow.calls=a.shadow.triangles=a.shadow.points=0},draw(i,a,r,l=0){var u;const b=(u=e.get(i))==null?void 0:u[a];b&&(b.calls++,b.triangles+=r,b.points+=l)},endFrame(i,a,r){const l=y===null?null:h-y;for(y=h,p.push({at:h,interval:l,visitor:i,birds:a,submit:r});p.length&&p[0].at<h-5e3;)p.shift()},snapshot(i){const a=[...c.values()].filter(t=>t.source!=="group"),r=new Map;for(const t of a)for(const n of new Set(t.resources))r.set(n,(r.get(n)??0)+1);const l=[...m.values()].map(t=>({...t,shared:(r.get(t.id)??0)>1})),b=[...c.values()].map(t=>{const n=t.source==="group"?S(t.id):[t],k=new Set(n.flatMap(o=>o.resources)),P=f(),B=f();for(const o of n){const d=e.get(o.id);d&&(v(P,d.main),v(B,d.shadow))}const A=n.filter(o=>!g.has(o.id)).length;return{...t,triangles:n.reduce((o,d)=>o+d.triangles,0),vertices:n.reduce((o,d)=>o+d.vertices,0),instances:n.reduce((o,d)=>o+d.instances,0),materials:[...new Set(n.flatMap(o=>o.materials))],resources:[...k],bytes:[...k].reduce((o,d)=>{var R;return o+(((R=m.get(d))==null?void 0:R.bytes)??0)},0),shared:[...k].some(o=>(r.get(o)??0)>1),enabled:A>0,mixed:A>0&&A<n.length,main:P,shadow:B}}),u=f(),z=f();for(const t of a){const n=e.get(t.id);n&&(v(u,n.main),v(z,n.shadow))}const x=p.flatMap(t=>t.interval===null?[]:[t.interval]).filter(t=>t>0),M=x.reduce((t,n)=>t+n,0),E=t=>p.length?p.reduce((n,k)=>n+k[t],0)/p.length:null,_=[...x].sort((t,n)=>t-n);return{schemaVersion:1,capturedAt:new Date().toISOString(),status:w,error:T,elements:b,resources:l,totals:{triangles:a.reduce((t,n)=>t+n.triangles,0),glbTriangles:a.filter(t=>t.source==="glb").reduce((t,n)=>t+n.triangles,0),vertices:l.reduce((t,n)=>t+n.vertices,0),instances:a.reduce((t,n)=>t+n.instances,0),materials:new Set(a.flatMap(t=>t.materials)).size,bufferBytes:l.reduce((t,n)=>t+n.bytes,0),main:u,shadow:z},timing:{samples:x.length,windowMs:5e3,fps:M?x.length*1e3/M:null,meanMs:x.length?M/x.length:null,p95Ms:_.length?_[Math.ceil(_.length*.95)-1]:null,slowFrames:x.filter(t=>t>33.3).length,visitorMs:E("visitor"),birdsMs:E("birds"),submitMs:E("submit")},conditions:i}}}}function s(c,m,g){if(c.split(m).length!==2)throw Error(`AERIA adapter anchor changed: ${m.slice(0,70)}`);return c.replace(m,g)}const V={scale:1,translation:[.05,.86,-.38],rotation:[0,0,0],rule:"Same world unit, no height normalization; source trunk origin (0,0,0) at original AERIA trunk foot"},$={island:{yaw:.32,pitch:.24,dist:32.5,target:[0,1.8,0]},front:{yaw:.025,pitch:.07,dist:23,target:[0,4.4,0]},side:{yaw:Math.PI/2,pitch:.07,dist:23,target:[0,4.4,0]}},U={composition:{yaw:.32,pitch:.24,dist:32.5,target:[0,1.8,0]},terrain:{yaw:.32,pitch:.36,dist:23,target:[0,-.6,0]},reverse:{yaw:Math.PI+.32,pitch:.24,dist:23,target:[0,-.6,0]},surface:{yaw:.32,pitch:.8,dist:18,target:[0,.86,0]},planting:{yaw:.1,pitch:.26,dist:10,target:[0,.86,0]}};function W(c,m=!1,g=!1){var f,v,S;let e=N;e=s(e," groundSampler=SunnyRuntime.createGroundSampler(groundSurfaces);"," // Static comparison: no walking contact queries.");const y=(f=/ let seed;[\s\S]*?visitor=createVisitor\([\s\S]*?\n/.exec(e))==null?void 0:f[0];if(!y)throw Error("AERIA simulation anchor changed");e=s(e,y,` // Static comparison: no bird or visitor simulation.
`);const h=(v=/ const base64=\$\('model-data'\)[\s\S]*?\n parseGLB\(blobBytes\);/.exec(e))==null?void 0:v[0];if(!h)throw Error("AERIA load anchor changed");e=s(e,h,` const response=await fetch(${JSON.stringify(new URL(I,c).href)});
 if(!response.ok)throw Error('AERIA GLB '+response.status);
 blobBytes=new Uint8Array(await response.arrayBuffer());
 parseGLB(blobBytes);`);const w=(S=/ const sunnyRaw=[\s\S]*?selectBoyMode\(boyMode\);updateSunny\(0\);\n/.exec(e))==null?void 0:S[0];if(!w)throw Error("AERIA Sunny anchor changed");e=s(e,w,` // Static comparison: no Sunny avatar.
 selectBoyMode('none');
`),e=s(e,"col+=vec3(1.0,.48,.1)*lamp*base*.9;","// Lantern light disabled for both variants."),e=s(e,"gl.drawArrays(gl.POINTS,0,particleCount);","/* Mist, waterfall spray and visitor sparkles disabled. */");const T=`
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
function view(name){const p=(${JSON.stringify({...$,...U})})[name];if(!p)throw Error('Unknown view');cam.target=[...p.target];window.__island.setCamera(p.yaw,p.pitch,p.dist);}
window.__comparison={
 install(bytes){
  if(oak.length)throw Error('Snapshot already installed');
  original=[...meshes];const start=meshes.length;parseGLB(bytes);oak=meshes.slice(start);
  const placement=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,${V.translation.join(",")},1]);
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
  placement:${JSON.stringify(V)},particles:false,lanternLight:false,
  visible:meshes.filter(m=>!m.hidden).map(m=>({name:m.name,triangles:m.count/3,kind:m.kind,model:Array.from(m.model)})),
  hidden:meshes.filter(m=>m.hidden).map(m=>m.name),oakMeshes:oak.length,glError:gl.getError()})
};
`;return e=s(e,`start();
})();`,T+`
start();
})();`),e=s(e,"window.__ready=true;requestAnimationFrame(render);","window.__ready=true; S.paused=true; S.wind=0; forcedTime=0; requestAnimationFrame(render);"),m&&(e=s(e,"// Lantern light disabled for both variants.","col+=vec3(1.0,.48,.1)*lamp*base*.9;"),e=s(e,"/* Mist, waterfall spray and visitor sparkles disabled. */","gl.drawArrays(gl.POINTS,0,500);"),e=s(e,"const removedNames=new Set(['Waterfalls_and_stream','Waterfall_foam','Fence_and_lantern_post','Lantern_bronze','Lantern_warm_glass']);","const removedNames=new Set();"),e=s(e,"particles:false,lanternLight:false,","particles:true,lanternLight:true,")),g&&(e=s(e,"// Lantern light disabled for both variants.","col+=vec3(1.0,.48,.1)*lamp*base*.9;"),e=s(e,"/* Mist, waterfall spray and visitor sparkles disabled. */","gl.drawArrays(gl.POINTS,0,90);"),e=s(e,"const removedNames=new Set(['Waterfalls_and_stream','Waterfall_foam','Fence_and_lantern_post','Lantern_bronze','Lantern_warm_glass']);","const removedNames=new Set(['Waterfalls_and_stream','Waterfall_foam']);"),e=s(e,"drawMeshes(main,env,bgVP);","/* Distant islands excluded by the agreed scene scope. */"),e=s(e,"particles:false,lanternLight:false,","particles:true,lanternLight:true,waterfalls:false,distantIslands:false,")),e=`const AERIA_HTML_BYTES=0;
const createPerformanceCollector=${String(C)};
${F}
${e}`,L.replace("Объёмный остров с деревом и девятью разноцветными птицами.","Статическое сравнение дерева AERIA и дуба на одном острове.").replace("</head>","<style>header,.intro,.scenebadge,.side-tools,.dock,footer,#hint,.bird-card,#show-ui,#toast{display:none!important}</style>"+"</head>").replace("__MODEL__","").replace("__SUNNY__","").replace("__SUNNY_RUNTIME__","").replace("__SCRIPT__",()=>e.replace(/<\/script/gi,"<\\/script"))}export{U as I,V as P,$ as V,L as _,N as a,W as b,I as c};
