const fs = require('fs');
const { chromium } = require('playwright');

const projects = [
  ['01','Property Adviser','PROPERTY / DIGITAL PRODUCT','https://property-adviser-co-uk.vercel.app/','A property discovery experience shaped around clearer search, stronger presentation and confident decisions.','property-adviser'],
  ['02','TPM Clothing','FASHION / E-COMMERCE','https://tpm-clothing.vercel.app/','An editorial commerce experience designed to make the collection feel as considered online as it does in the brand world.','tpm-clothing'],
  ['03','Qahwa for Life','HOSPITALITY / BRAND','https://qahwa-for-life.vercel.app/','A story-led café experience built around place, atmosphere, menu discovery and a distinctive visual identity.','qahwa-for-life'],
  ['04','Revamp Automotive','AUTOMOTIVE / LOCAL SERVICE','https://revamp-automotive.vercel.app/','A bold service experience that makes a mobile automotive offer easy to understand, trust and act on.','revamp-automotive'],
  ['05','Mooreish Delights','HOSPITALITY / FOOD','https://mooreish-delights.vercel.app/','A warm, premium hospitality experience connecting menu, ordering, reservations and the brand in one place.','mooreish-delights'],
  ['06','Leia Florals','FLORAL / LIFESTYLE','https://leiaflorals.vercel.app/','An editorial floral studio experience built to let the work, occasions and brand personality lead.','leia-florals'],
  ['07','Dr Mo','HEALTHCARE / EDUCATION','https://drmosobhy.vercel.app/','A structured education experience that makes a specialist preparation journey easier to understand and navigate.','dr-mosobhy'],
  ['08','Social Luxe Studios','BEAUTY / SERVICES','https://social-luxe-studios.vercel.app/','A premium service experience designed to turn a physical studio proposition into a clear digital journey.','social-luxe'],
  ['09','Maple','HOSPITALITY / BRAND','https://maple-dusky-two.vercel.app/','A cinematic hospitality experience built around atmosphere, menu discovery and the personality of the venue.','maple'],
  ['10','Nova Rituals','COMMERCE / WELLNESS','https://e-commerce-seven-murex-83.vercel.app/','A clean commerce experience built around product, ritual, trust and a simple path to purchase.','nova-rituals']
];

const cards = projects.map(([num,title,category,url,description,slug],i) => `<article class="work-project" data-index="${i}" tabindex="0" role="button" aria-label="Open ${title} project">
  <a class="work-project-link" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="View ${title} live demo">
    <div class="work-project-media"><img src="assets/${num}-${slug}.jpg" alt="${title} website preview" loading="lazy" decoding="async"><div class="work-project-shade"></div></div>
    <div class="work-project-info"><div class="work-project-meta"><span>${num}</span><small>${category}</small></div><div class="work-project-bottom"><div><h3>${title}</h3><p>${description}</p></div><span class="work-project-arrow">↗</span></div></div>
  </a>
</article>`).join('\n');

const section = `<section id="work" class="section section-dark work-section work-showcase">
  <div class="container"><div class="section-intro work-intro"><p class="eyebrow">SELECTED WORK</p><h2>Built for different businesses.<br><em>Designed around the problem.</em></h2><p>Ten selected digital experiences across property, commerce, hospitality, services, healthcare and more.</p></div></div>
  <div class="work-stage" aria-label="Selected work showcase"><div class="work-stage-head container"><span>OUR WORK</span><span class="work-stage-count"><b id="workCurrent">01</b> / 10</span></div><div class="work-panels" id="workPanels">${cards}</div><div class="work-stage-foot container"><span>SCROLL TO EXPLORE</span><span class="work-stage-hint">The active project expands as you move through the work.</span></div></div>
</section>`;

const movement = `<script data-work-motion>
(function(){const stage=document.querySelector('.work-showcase'),panels=[...document.querySelectorAll('.work-project')],current=document.getElementById('workCurrent');if(!stage||!panels.length)return;let active=-1,ticking=false;function setActive(i){i=Math.max(0,Math.min(panels.length-1,i));if(i===active)return;active=i;panels.forEach((p,n)=>p.classList.toggle('is-active',n===active));if(current)current.textContent=String(active+1).padStart(2,'0')}function update(){const r=stage.getBoundingClientRect(),travel=Math.max(1,stage.offsetHeight-innerHeight);setActive(Math.floor(Math.max(0,Math.min(.9999,-r.top/travel))*panels.length))}function scroll(){if(ticking)return;ticking=true;requestAnimationFrame(()=>{update();ticking=false})}panels.forEach((p,i)=>{p.addEventListener('click',()=>setActive(i));p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(i)}})});setActive(0);update();addEventListener('scroll',scroll,{passive:true});addEventListener('resize',scroll,{passive:true})})();
</script>`;

const css = `
/* Our Work — expanding project showcase */
.work-showcase{padding-bottom:0;overflow:clip}.work-intro{padding-bottom:30px}.work-stage{height:calc(100vh + 1800px);position:relative;margin-top:18px}.work-stage-head{height:48px;display:flex;justify-content:space-between;align-items:center;color:#8f8f8b;font-size:9px;letter-spacing:.18em;font-weight:700}.work-stage-count{color:#777;letter-spacing:.12em}.work-stage-count b{color:var(--gold);font-size:11px}.work-panels{position:sticky;top:calc(50vh - 310px);height:min(620px,calc(100vh - 170px));display:flex;gap:4px;padding:0 max(16px,calc((100vw - 1240px)/2));overflow:hidden}.work-project{position:relative;flex:1 1 6.1%;min-width:0;height:100%;border:1px solid #343434;background:#151515;overflow:hidden;transition:flex-basis .72s cubic-bezier(.22,.8,.25,1),border-color .45s ease;cursor:pointer;outline:none}.work-project.is-active{flex-basis:42%;border-color:#655a49}.work-project-link{display:block;height:100%;color:inherit;position:relative}.work-project-media{position:absolute;inset:0;background:#111;overflow:hidden}.work-project-media img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;filter:saturate(.9);transform:scale(1.015);transition:transform 1.1s cubic-bezier(.22,.8,.25,1),filter .6s ease}.work-project:not(.is-active) .work-project-media img{filter:saturate(.65) brightness(.68);transform:scale(1.08)}.work-project.is-active .work-project-media img{filter:saturate(.92) brightness(.84);transform:scale(1)}.work-project-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,6,7,.15) 0%,rgba(5,6,7,.05) 35%,rgba(5,6,7,.88) 100%);transition:background .5s ease}.work-project:not(.is-active) .work-project-shade{background:linear-gradient(180deg,rgba(5,6,7,.18),rgba(5,6,7,.58))}.work-project-info{position:absolute;inset:0;padding:22px;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none}.work-project-meta{display:flex;flex-direction:column;gap:7px;white-space:nowrap}.work-project-meta span{font-size:10px;color:var(--gold);letter-spacing:.12em}.work-project-meta small{font-size:8px;letter-spacing:.12em;color:#d3d0c8;opacity:0;transform:translateY(-5px);transition:opacity .45s ease,transform .45s ease}.work-project:not(.is-active) .work-project-meta span{writing-mode:vertical-rl;transform:rotate(180deg);color:#aaa}.work-project-bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;opacity:0;transform:translateY(18px);transition:opacity .45s ease .08s,transform .6s cubic-bezier(.22,.8,.25,1) .08s}.work-project.is-active .work-project-bottom{opacity:1;transform:translateY(0)}.work-project.is-active .work-project-meta small{opacity:1;transform:none}.work-project-bottom h3{font-family:var(--serif);font-size:clamp(30px,3vw,46px);font-weight:400;line-height:1;margin:0 0 12px;letter-spacing:-.025em}.work-project-bottom p{max-width:560px;color:#d0cec8;font-size:13px;line-height:1.55;margin:0}.work-project-arrow{width:48px;height:48px;border:1px solid #aaa39a;border-radius:50%;display:grid;place-items:center;font-size:20px;color:#f5f3ee;flex:0 0 auto}.work-project:focus-visible{box-shadow:inset 0 0 0 2px var(--gold)}.work-stage-foot{height:58px;display:flex;align-items:center;justify-content:space-between;color:#777;font-size:8px;letter-spacing:.15em}.work-stage-hint{letter-spacing:.04em;color:#6f6f6b;text-transform:none;font-size:10px}@media(max-width:900px){.work-stage{height:auto;margin-top:10px;padding-bottom:70px}.work-panels{position:relative;top:auto;height:560px;padding:0 17px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.work-panels::-webkit-scrollbar{display:none}.work-project{flex:0 0 76vw;scroll-snap-align:start}.work-project.is-active{flex-basis:76vw}.work-project-bottom{opacity:1;transform:none}.work-project-meta small{opacity:1;transform:none}.work-project:not(.is-active) .work-project-media img{filter:saturate(.8) brightness(.75);transform:scale(1.03)}.work-stage-foot{padding:0 17px}.work-stage-hint{display:none}}@media(max-width:560px){.work-panels{height:500px}.work-project{flex-basis:86vw}.work-project.is-active{flex-basis:86vw}.work-project-info{padding:18px}.work-project-bottom h3{font-size:32px}.work-project-bottom p{font-size:12px}.work-project-arrow{width:42px;height:42px}}@media(prefers-reduced-motion:reduce){.work-project,.work-project-media img,.work-project-bottom,.work-project-meta small{transition:none!important}}
`;

let html = fs.readFileSync('index.html','utf8');
html = html.replace(/<section id="work"[\s\S]*?(?=<section id="growth")/, section + '\n\n');
html = html.replace(/<script data-work-motion>[\s\S]*?<\/script>/, '');
html = html.replace('</body>', movement + '\n</body>');
fs.writeFileSync('index.html', html);

let styles = fs.readFileSync('styles.css','utf8');
if (!styles.includes('/* Our Work — expanding project showcase */')) fs.appendFileSync('styles.css', css);

(async()=>{
  fs.mkdirSync('assets',{recursive:true});
  const browser=await chromium.launch({headless:true});
  const page=await browser.newPage({viewport:{width:1767,height:819},deviceScaleFactor:1});
  for(const [num,title,category,url,description,slug] of projects){
    try{await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(1800);await page.screenshot({path:`assets/${num}-${slug}.jpg`,type:'jpeg',quality:72,fullPage:false});console.log('Captured',num,title)}
    catch(e){console.error('Failed',num,title,e.message)}
  }
  await browser.close();
})();
