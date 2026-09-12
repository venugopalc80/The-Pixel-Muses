(() => {
  const addStyle = (id, css) => {
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  };

  const nav = document.querySelector('.primary-nav');
  const menu = document.querySelector('.menu-toggle');

  addStyle('tpm-header', `
    .nav-dropdown{position:relative;display:flex;align-items:center;height:100%}
    .nav-drop-trigger{appearance:none;border:0;background:transparent;color:inherit;font:inherit;font-size:13px;font-weight:500;display:flex;align-items:center;gap:6px;padding:12px 0;cursor:pointer}
    .nav-drop-trigger span{font-size:13px;line-height:1;transition:transform .2s ease}
    .nav-dropdown-menu{position:absolute;top:calc(100% + 14px);left:50%;width:470px;transform:translate(-50%,-8px);padding:20px;background:#f4f0e8;color:#171716;border:1px solid rgba(20,20,18,.12);border-radius:16px;box-shadow:0 22px 55px rgba(0,0,0,.26);display:grid;grid-template-columns:1fr 1fr;gap:20px;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,transform .2s ease;z-index:80}
    .nav-dropdown:hover .nav-dropdown-menu,.nav-dropdown:focus-within .nav-dropdown-menu,.nav-dropdown.is-open .nav-dropdown-menu{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}
    .nav-dropdown.is-open .nav-drop-trigger span{transform:rotate(180deg)}
    .nav-menu-group{display:flex;flex-direction:column;gap:2px}.nav-menu-label{font-size:9px;letter-spacing:.14em;font-weight:800;color:#8b8273;margin:0 0 8px;padding:0 8px}.nav-menu-group a{font-size:13px;color:#5c5a55;padding:8px;border-radius:8px;line-height:1.25;transition:.18s}.nav-menu-group a:hover{background:#e7e0d4;color:#111;transform:translateX(2px)}
    .nav-menu-cta{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:2px;padding:14px 15px;background:#171716;color:#f4f0e8;border-radius:11px}.nav-menu-cta strong{display:block;font-size:12px;margin-bottom:3px}.nav-menu-cta small{display:block;color:#aaa59b;font-size:10px}.nav-menu-cta b{font-size:18px;font-weight:400}.nav-industries-menu{width:400px}
    .site-header .nav>.button.button-outline{background:#f1efe9!important;color:#171714!important;border-color:#f1efe9!important;opacity:1!important}.site-header .nav>.button.button-outline span{color:#80663e!important}.site-header .nav>.button.button-outline:hover{background:#fffdf7!important;color:#171714!important;border-color:#fffdf7!important;transform:translateY(-1px)}
    .site-header .nav{height:90px;gap:32px}.site-header .brand{gap:14px}.site-header .brand-mark,.site-header .brand-mark img{width:60px;height:60px}.site-header .brand-mark{flex-basis:60px}.site-header .brand-copy strong{font-size:20px;white-space:nowrap}.site-header .brand-copy small{font-size:8px;letter-spacing:.17em;margin-top:6px;white-space:nowrap}.site-header .primary-nav{gap:25px;font-size:13px;align-items:center}
    @media(max-width:1000px){.nav-dropdown{display:block;height:auto;width:100%}.nav-drop-trigger{width:100%;justify-content:space-between;padding:10px 0}.nav-dropdown-menu{position:static;width:100%;transform:none!important;display:none;opacity:1;visibility:visible;pointer-events:auto;box-shadow:none;border-radius:10px;padding:12px;margin:0 0 8px;background:#171a1d;color:#f4f0e8;grid-template-columns:1fr}.nav-dropdown.is-open .nav-dropdown-menu{display:grid}.nav-menu-label{color:#8d918f}.nav-menu-group a{color:#d7d9d6}.nav-menu-group a:hover{background:#22272b;color:#fff}.nav-menu-cta{background:#24292d}.nav-menu-cta small{color:#aeb2b0}.site-header .nav{gap:18px}.site-header .primary-nav{gap:17px;font-size:12px}.site-header .brand-copy strong{font-size:18px}.site-header .brand-mark,.site-header .brand-mark img{width:56px;height:56px}.site-header .brand-mark{flex-basis:56px}}
    @media(max-width:760px){.site-header .nav{height:72px}.site-header .brand-mark,.site-header .brand-mark img{width:50px;height:50px}.site-header .brand-mark{flex-basis:50px}.site-header .brand-copy strong{font-size:16px}.site-header .brand-copy small{font-size:6.5px}.site-header .primary-nav{top:72px}}
  `);

  function dropdown(label, groups, cta, sub, href, extra='') {
    const wrap=document.createElement('div'); wrap.className='nav-dropdown';
    const trigger=document.createElement('button'); trigger.className='nav-drop-trigger'; trigger.type='button'; trigger.setAttribute('aria-expanded','false'); trigger.innerHTML=`${label} <span>⌄</span>`;
    const panel=document.createElement('div'); panel.className=`nav-dropdown-menu ${extra}`;
    groups.forEach(group=>{const g=document.createElement('div');g.className='nav-menu-group';const l=document.createElement('span');l.className='nav-menu-label';l.textContent=group.title;g.appendChild(l);group.links.forEach(([text,url])=>{const a=document.createElement('a');a.href=url;a.textContent=text;g.appendChild(a)});panel.appendChild(g)});
    const action=document.createElement('a'); action.className='nav-menu-cta'; action.href=href; action.innerHTML=`<span><strong>${cta}</strong><small>${sub}</small></span><b>↗</b>`; panel.appendChild(action); wrap.append(trigger,panel);
    trigger.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();document.querySelectorAll('.nav-dropdown.is-open').forEach(x=>{if(x!==wrap){x.classList.remove('is-open');x.querySelector('button')?.setAttribute('aria-expanded','false')}});const open=wrap.classList.toggle('is-open');trigger.setAttribute('aria-expanded',String(open))});
    return wrap;
  }

  if(nav){
    const services=[...nav.children].find(x=>x.tagName==='A'&&x.textContent.trim().toLowerCase()==='services');
    const industries=[...nav.children].find(x=>x.tagName==='A'&&x.textContent.trim().toLowerCase()==='industries');
    if(services)services.replaceWith(dropdown('Services',[
      {title:'DIGITAL EXPERIENCE',links:[['Web Design & Development','web-design.html'],['Website Redesign','web-design.html#redesign'],['E-commerce','web-design.html#ecommerce']]},
      {title:'GROWTH & VISIBILITY',links:[['SEO & Search','seo-search.html'],['Local SEO & Business Profiles','seo-search.html#local'],['Digital Growth & CRO','digital-growth.html']]},
      {title:'SOFTWARE & AI',links:[['Custom Software & Platforms','software-platforms.html'],['AI & Automation','ai-automation.html'],['Mobile Products','mobile-products.html']]}
    ],'Not sure what you need?','Tell us what you are trying to improve.','contact.html'));
    if(industries)industries.replaceWith(dropdown('Industries',[
      {title:'WHO WE WORK WITH',links:[['Trades & Home Services','industries.html#trades'],['Professional Services','industries.html#professional'],['Health & Beauty','industries.html#health']]},
      {title:'SECTORS',links:[['Hospitality & Food','industries.html#hospitality'],['Retail & E-commerce','industries.html#retail'],['Property & Automotive','industries.html#property-automotive']]}
    ],'Explore all industries','See where we can help your business.','industries.html','nav-industries-menu'));
    const pricing=[...nav.querySelectorAll('a')].find(a=>['pricing','work with us'].includes(a.textContent.trim().toLowerCase()));
    if(pricing){pricing.textContent='Work With Us';pricing.href='pricing.html'}
  }

  document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))document.querySelectorAll('.nav-dropdown.is-open').forEach(x=>{x.classList.remove('is-open');x.querySelector('button')?.setAttribute('aria-expanded','false')})});
  if(menu&&nav)menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open);nav.style.display=!open?'flex':''});
  const year=document.getElementById('year'); if(year)year.textContent=new Date().getFullYear();

  const work=document.getElementById('workPanels');
  if(work){
    const names=['property-adviser','tpm-clothing','qahwa-for-life','revamp-automotive','mooreish-delights','leia-florals','dr-mo','social-luxe','maple','nova-rituals'];
    work.querySelectorAll('.work-project').forEach((card,i)=>{const img=card.querySelector('.work-project-media img');if(img&&names[i])img.src=`assets/work-card/${String(i+1).padStart(2,'0')}-${names[i]}.svg`});
  }

  const industryGrid=document.querySelector('.industry-grid');
  if(industryGrid){const property=[...industryGrid.querySelectorAll('a')].find(a=>a.querySelector('strong')?.textContent.trim()==='Property');if(property){property.querySelector('strong').textContent='Property & Automotive';property.querySelector('small').textContent='Estate Agents · Developers · Property Services · Automotive'}}

  const growth=document.querySelector('.growth-grid');
  if(growth){const copy=growth.children[0],map=growth.children[1];if(copy&&map){copy.innerHTML='<p class="eyebrow">BUILT FOR DISCOVERY</p><h2>Get found beyond <em>Google.</em></h2><p class="growth-lead">Customers now discover businesses through search engines, maps and AI-powered answers. We build the technical, local and content foundations that make your business easier to find, understand and trust.</p><div class="growth-pills"><span>SEO</span><span>LOCAL SEO</span><span>GOOGLE BUSINESS</span><span>APPLE BUSINESS</span><span>BING</span><span>AEO</span><span>GEO</span></div>';map.innerHTML='<div class="discovery-grid"><div><b>01</b><strong>SEARCH</strong><small>Google · Bing</small></div><div><b>02</b><strong>MAPS</strong><small>Google Maps · Apple Maps</small></div><div><b>03</b><strong>AI SEARCH</strong><small>AI answers · AEO · GEO</small></div><div><b>04</b><strong>LOCAL</strong><small>Business profiles · Local visibility</small></div></div><div class="discovery-foot">BE FOUND WHERE CUSTOMERS LOOK</div>'}}

  addStyle('tpm-discovery',`.growth-grid{grid-template-columns:1fr 1fr;gap:0;border:1px solid #2c2c28}.growth-grid>div{border:0!important;padding:52px}.growth-copy{border-right:1px solid #2c2c28!important}.growth-grid h2{font-family:var(--serif);font-size:clamp(42px,4.6vw,66px);font-weight:500;line-height:1.02;letter-spacing:-.04em;margin:0 0 26px}.growth-grid h2 em{color:var(--gold);font-style:italic}.growth-lead{color:var(--muted);font-size:15px;line-height:1.7;max-width:560px}.growth-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}.growth-pills span{padding:8px 11px;border:1px solid #34342f;color:#aaa79f;font-size:9px;letter-spacing:.08em}.discovery-grid{display:grid;grid-template-columns:1fr 1fr}.discovery-grid>div{min-height:145px;padding:28px;border-bottom:1px solid #2c2c28}.discovery-grid>div:nth-child(odd){border-right:1px solid #2c2c28}.discovery-grid b{display:block;color:var(--gold);font-size:9px;letter-spacing:.16em;margin-bottom:30px}.discovery-grid strong{display:block;font-family:var(--serif);font-size:25px;font-weight:400}.discovery-grid small{display:block;color:#85827a;font-size:10px;margin-top:9px}.discovery-foot{padding:22px 28px;color:var(--gold);font-size:9px;letter-spacing:.16em}@media(max-width:900px){.growth-grid{grid-template-columns:1fr}.growth-copy{border-right:0!important;border-bottom:1px solid #2c2c28!important}.growth-grid>div{padding:42px 34px}}@media(max-width:600px){.growth-grid>div{padding:32px 24px}.growth-grid h2{font-size:42px}.discovery-grid{grid-template-columns:1fr}.discovery-grid>div,.discovery-grid>div:nth-child(odd){border-right:0;min-height:105px;padding:22px}}`);

  addStyle('tpm-work-refinement',`
    .work-panels{gap:5px}
    .work-project{flex-basis:7.33%;transition:flex-basis .62s cubic-bezier(.22,.8,.25,1),border-color .4s,filter .4s}
    .work-project.is-active{flex-basis:34%;border-color:#806f55}
    .work-project:not(.is-active){filter:saturate(.88)}
    .work-project:not(.is-active) .work-project-media img{filter:saturate(.72) brightness(.78);transform:scale(1.04)}
    .work-project.is-active .work-project-media img{filter:saturate(.96) brightness(1);transform:scale(1.015)}
    .work-project-shade{background:linear-gradient(180deg,rgba(5,5,4,.02) 0%,rgba(5,5,4,.03) 42%,rgba(5,5,4,.68) 100%)}
    .work-project:not(.is-active) .work-project-shade{background:linear-gradient(180deg,rgba(5,5,4,.08),rgba(5,5,4,.38))}
    .work-project-info{padding:24px 26px}
    .work-project.is-active .work-project-info{padding:28px 30px}
    .work-project-bottom{max-width:760px}
    .work-project-bottom h3{font-size:clamp(30px,2.8vw,44px);margin-bottom:10px}
    .work-project-bottom p{font-size:13px;line-height:1.55;max-width:600px}
    .work-project-arrow{min-width:46px;height:46px}
    @media(max-width:900px){.work-panels{gap:4px}.work-project{flex-basis:8%}.work-project.is-active{flex-basis:38%}}
    @media(max-width:760px){.work-panels{display:flex;overflow-x:auto;overflow-y:hidden;gap:10px;padding:0 16px;scroll-snap-type:x mandatory}.work-project,.work-project.is-active{flex:0 0 86vw;height:100%;scroll-snap-align:center}.work-project-info,.work-project.is-active .work-project-info{padding:22px}.work-project-bottom{opacity:1;transform:none}.work-project-meta small{opacity:1;transform:none}.work-project-meta span{writing-mode:initial;transform:none;color:var(--gold)}.work-project-shade{background:linear-gradient(180deg,rgba(5,5,4,.04),rgba(5,5,4,.7))}.work-project:not(.is-active) .work-project-shade{background:linear-gradient(180deg,rgba(5,5,4,.04),rgba(5,5,4,.58))}}
  `);

  addStyle('tpm-magnetic',`.tpm-magnetic{--tpm-x:0px;--tpm-y:0px;transition:transform .28s cubic-bezier(.2,.8,.2,1),border-color .25s ease,background-color .25s ease;will-change:transform}.tpm-magnetic.tpm-active{transform:translate3d(var(--tpm-x),var(--tpm-y),0)}.service.tpm-active,.insight-grid article.tpm-active{border-color:#4a4942}.audit-tags span.tpm-active{border-color:#8a7757;background:rgba(209,178,122,.06)}.discovery-grid>div.tpm-active{background:rgba(255,255,255,.018)}.process-list li.tpm-active{background:rgba(20,20,18,.025)}@media(max-width:760px){.tpm-magnetic{transform:none!important;transition:none!important}}@media(prefers-reduced-motion:reduce){.tpm-magnetic{transform:none!important;transition:none!important}}`);

  const selectors=['.services-section .service','.existing-site .audit-tags span','.growth-grid .discovery-grid > div','.insight-grid article','.process-list li'];
  selectors.flatMap(s=>[...document.querySelectorAll(s)]).forEach(el=>{
    el.classList.add('tpm-magnetic');
    el.addEventListener('pointermove',e=>{if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=el.getBoundingClientRect(),x=(e.clientX-(r.left+r.width/2))/r.width,y=(e.clientY-(r.top+r.height/2))/r.height,s=el.matches('.audit-tags span')?3:el.matches('.process-list li')?2:4;el.style.setProperty('--tpm-x',`${(x*s).toFixed(2)}px`);el.style.setProperty('--tpm-y',`${(y*s).toFixed(2)}px`);el.classList.add('tpm-active')});
    el.addEventListener('pointerleave',()=>{el.classList.remove('tpm-active');el.style.removeProperty('--tpm-x');el.style.removeProperty('--tpm-y')});
  });
})();