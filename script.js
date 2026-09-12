(() => {
  const nav = document.querySelector('.primary-nav');
  const menu = document.querySelector('.menu-toggle');

  const addStyle = (id, css) => {
    if (document.getElementById(id)) return;
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
  };

  addStyle('tpm-header-dropdowns', `
    .nav-dropdown{position:relative;display:flex;align-items:center;height:100%}
    .nav-drop-trigger{appearance:none;border:0;background:transparent;color:inherit;font:inherit;font-size:13px;font-weight:500;display:flex;align-items:center;gap:6px;padding:12px 0;cursor:pointer}
    .nav-drop-trigger span{font-size:13px;line-height:1;transition:transform .2s ease}
    .nav-dropdown-menu{position:absolute;top:calc(100% + 14px);left:50%;width:470px;transform:translate(-50%,-8px);padding:20px;background:#f4f0e8;color:#171716;border:1px solid rgba(20,20,18,.12);border-radius:16px;box-shadow:0 22px 55px rgba(0,0,0,.26);display:grid;grid-template-columns:1fr 1fr;gap:20px;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,transform .2s ease,visibility .2s ease;z-index:80}
    .nav-dropdown:hover .nav-dropdown-menu,.nav-dropdown:focus-within .nav-dropdown-menu,.nav-dropdown.is-open .nav-dropdown-menu{opacity:1;visibility:visible;pointer-events:auto;transform:translate(-50%,0)}
    .nav-dropdown.is-open .nav-drop-trigger span{transform:rotate(180deg)}
    .nav-menu-group{display:flex;flex-direction:column;gap:2px}
    .nav-menu-label{font-size:9px;letter-spacing:.14em;font-weight:800;color:#8b8273;margin:0 0 8px;padding:0 8px}
    .nav-menu-group a{font-size:13px;color:#5c5a55;padding:8px;border-radius:8px;line-height:1.25;transition:background .18s ease,color .18s ease,transform .18s ease}
    .nav-menu-group a:hover{background:#e7e0d4;color:#111;transform:translateX(2px)}
    .nav-menu-cta{grid-column:1/-1;display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:2px;padding:14px 15px;background:#171716;color:#f4f0e8;border-radius:11px}
    .nav-menu-cta strong{display:block;font-size:12px;font-weight:700;margin-bottom:3px}.nav-menu-cta small{display:block;color:#aaa59b;font-size:10px}.nav-menu-cta b{font-size:18px;font-weight:400}
    .nav-industries-menu{width:400px}
    .site-header .nav>.button.button-outline{background:#f1efe9!important;color:#171714!important;border-color:#f1efe9!important;opacity:1!important}
    .site-header .nav>.button.button-outline span{color:#80663e!important}
    .site-header .nav>.button.button-outline:hover{background:#fffdf7!important;color:#171714!important;border-color:#fffdf7!important;transform:translateY(-1px)}
    @media(max-width:1000px){.nav-dropdown{display:block;height:auto;width:100%}.nav-drop-trigger{width:100%;justify-content:space-between;padding:10px 0}.nav-dropdown-menu{position:static;width:100%;transform:none!important;display:none;opacity:1;visibility:visible;pointer-events:auto;box-shadow:none;border-radius:10px;padding:12px;margin:0 0 8px;background:#171a1d;color:#f4f0e8;grid-template-columns:1fr}.nav-dropdown.is-open .nav-dropdown-menu{display:grid}.nav-menu-label{color:#8d918f}.nav-menu-group a{color:#d7d9d6}.nav-menu-group a:hover{background:#22272b;color:#fff}.nav-menu-cta{background:#24292d}.nav-menu-cta small{color:#aeb2b0}}
  `);

  function buildDropdown(label, groups, ctaText, ctaSub, ctaHref, extraClass='') {
    const wrap = document.createElement('div');
    wrap.className = 'nav-dropdown';
    const trigger = document.createElement('button');
    trigger.className = 'nav-drop-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = `${label} <span>⌄</span>`;
    const panel = document.createElement('div');
    panel.className = `nav-dropdown-menu ${extraClass}`;
    groups.forEach(group => {
      const g = document.createElement('div');
      g.className = 'nav-menu-group';
      const title = document.createElement('span');
      title.className = 'nav-menu-label';
      title.textContent = group.title;
      g.appendChild(title);
      group.links.forEach(([text, href]) => {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = text;
        g.appendChild(a);
      });
      panel.appendChild(g);
    });
    const cta = document.createElement('a');
    cta.className = 'nav-menu-cta';
    cta.href = ctaHref;
    cta.innerHTML = `<span><strong>${ctaText}</strong><small>${ctaSub}</small></span><b>↗</b>`;
    panel.appendChild(cta);
    wrap.append(trigger, panel);
    trigger.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      document.querySelectorAll('.nav-dropdown.is-open').forEach(other => {
        if (other !== wrap) {
          other.classList.remove('is-open');
          other.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
      const open = wrap.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    return wrap;
  }

  if (nav) {
    const services = [...nav.children].find(el => el.tagName === 'A' && el.textContent.trim().toLowerCase() === 'services');
    const industries = [...nav.children].find(el => el.tagName === 'A' && el.textContent.trim().toLowerCase() === 'industries');

    if (services) services.replaceWith(buildDropdown('Services', [
      {title:'DIGITAL EXPERIENCE',links:[['Web Design & Development','web-design.html'],['Website Redesign','web-design.html#redesign'],['E-commerce','web-design.html#ecommerce']]},
      {title:'GROWTH & VISIBILITY',links:[['SEO & Search','seo-search.html'],['Local SEO & Business Profiles','seo-search.html#local'],['Digital Growth & CRO','digital-growth.html']]},
      {title:'SOFTWARE & AI',links:[['Custom Software & Platforms','software-platforms.html'],['AI & Automation','ai-automation.html'],['Mobile Products','mobile-products.html']]}
    ], 'Not sure what you need?', 'Tell us what you are trying to improve.', 'contact.html'));

    if (industries) industries.replaceWith(buildDropdown('Industries', [
      {title:'WHO WE WORK WITH',links:[['Trades & Home Services','industries.html#trades'],['Professional Services','industries.html#professional'],['Health & Beauty','industries.html#health']]},
      {title:'SECTORS',links:[['Hospitality & Food','industries.html#hospitality'],['Retail & E-commerce','industries.html#retail'],['Property & Automotive','industries.html#property-automotive']]}
    ], 'Explore all industries', 'See where we can help your business.', 'industries.html', 'nav-industries-menu'));

    const pricing = [...nav.querySelectorAll('a')].find(a => a.textContent.trim().toLowerCase() === 'pricing' || a.textContent.trim().toLowerCase() === 'work with us');
    if (pricing) {
      pricing.textContent = 'Work With Us';
      pricing.href = 'pricing.html';
    }
  }

  document.addEventListener('click', event => {
    if (!event.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.is-open').forEach(drop => {
        drop.classList.remove('is-open');
        drop.querySelector('.nav-drop-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      nav.style.display = !open ? 'flex' : '';
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const work = document.getElementById('workPanels');
  if (work) {
    const names = ['property-adviser','tpm-clothing','qahwa-for-life','revamp-automotive','mooreish-delights','leia-florals','dr-mo','social-luxe','maple','nova-rituals'];
    work.querySelectorAll('.work-project').forEach((card, i) => {
      const img = card.querySelector('.work-project-media img');
      if (img && names[i]) img.src = `assets/work-card/${String(i+1).padStart(2,'0')}-${names[i]}.svg`;
    });
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    const h1 = hero.querySelector('.hero-copy h1');
    if (h1) h1.innerHTML = 'Websites that work <em>harder for your business.</em>';
    const lead = hero.querySelector('.hero-lead');
    if (lead) lead.textContent = 'Websites, search, software and AI — built to help your business get found, win customers and operate better.';
    const trust = hero.querySelector('.hero-trust');
    if (trust) { const spans = trust.querySelectorAll('span'); if (spans[3]) spans[3].textContent = 'WORKING GLOBALLY'; }
    const stack = hero.querySelector('.hero-stack');
    if (stack) {
      const kicker = stack.querySelector('.stack-kicker'), title = stack.querySelector('.stack-main strong'), desc = stack.querySelector('.stack-main p'), labels = stack.querySelectorAll('.stack-lines span');
      if (kicker) kicker.textContent = 'DIGITAL EXPERIENCE';
      if (title) title.innerHTML = 'From first click<br>to <em>customer.</em>';
      if (desc) desc.textContent = 'Strategy → Website → Search → Conversion';
      ['WEBSITE','SEARCH','CONVERSION','SYSTEMS'].forEach((v,i)=>{if(labels[i])labels[i].textContent=v;});
    }
  }

  const industryGrid = document.querySelector('.industry-grid');
  if (industryGrid) {
    const property = [...industryGrid.querySelectorAll('a')].find(a => a.querySelector('strong')?.textContent.trim() === 'Property');
    if (property) {
      property.querySelector('strong').textContent = 'Property & Automotive';
      property.querySelector('small').textContent = 'Estate Agents · Developers · Property Services · Automotive';
    }
  }

  const growth = document.querySelector('.growth-grid');
  if (growth) {
    const copy = growth.querySelector(':scope > div:first-child');
    const map = growth.querySelector(':scope > div:last-child');
    if (copy && map) {
      copy.innerHTML = `<p class="eyebrow">BUILT FOR DISCOVERY</p><h2>Get found beyond <em>Google.</em></h2><p class="growth-lead">Customers now discover businesses through search engines, maps and AI-powered answers. We build the technical, local and content foundations that make your business easier to find, understand and trust.</p><div class="growth-pills"><span>SEO</span><span>LOCAL SEO</span><span>GOOGLE BUSINESS</span><span>APPLE BUSINESS</span><span>BING</span><span>AEO</span><span>GEO</span></div>`;
      map.innerHTML = `<div class="discovery-grid"><div><b>01</b><strong>SEARCH</strong><small>Google · Bing</small></div><div><b>02</b><strong>MAPS</strong><small>Google Maps · Apple Maps</small></div><div><b>03</b><strong>AI SEARCH</strong><small>AI answers · AEO · GEO</small></div><div><b>04</b><strong>LOCAL</strong><small>Business profiles · Local visibility</small></div></div><div class="discovery-foot">BE FOUND WHERE CUSTOMERS LOOK</div>`;
    }
  }

  addStyle('tpm-discovery', `
    .growth-grid{grid-template-columns:1fr 1fr;gap:0;border:1px solid #2c2c28}.growth-grid>div{border:0!important;padding:52px}.growth-copy{border-right:1px solid #2c2c28!important}.growth-grid h2{font-family:var(--serif);font-size:clamp(42px,4.6vw,66px);font-weight:500;line-height:1.02;letter-spacing:-.04em;margin:0 0 26px}.growth-grid h2 em{color:var(--gold);font-style:italic}.growth-lead{color:var(--muted);font-size:15px;line-height:1.7;max-width:560px}.growth-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:28px}.growth-pills span{padding:8px 11px;border:1px solid #34342f;color:#aaa79f;font-size:9px;letter-spacing:.08em}.search-map{display:flex;flex-direction:column;justify-content:space-between}.discovery-grid{display:grid;grid-template-columns:1fr 1fr}.discovery-grid>div{min-height:145px;padding:28px;border-bottom:1px solid #2c2c28}.discovery-grid>div:nth-child(odd){border-right:1px solid #2c2c28}.discovery-grid b{display:block;color:var(--gold);font-size:9px;letter-spacing:.16em;margin-bottom:30px}.discovery-grid strong{display:block;font-family:var(--serif);font-size:25px;font-weight:400}.discovery-grid small{display:block;color:#85827a;font-size:10px;margin-top:9px}.discovery-foot{padding:22px 28px;color:var(--gold);font-size:9px;letter-spacing:.16em}
    @media(max-width:900px){.growth-grid{grid-template-columns:1fr}.growth-copy{border-right:0!important;border-bottom:1px solid #2c2c28!important}.growth-grid>div{padding:42px 34px}.discovery-grid>div{min-height:130px}}
    @media(max-width:600px){.growth-grid>div{padding:32px 24px}.growth-grid h2{font-size:42px}.discovery-grid{grid-template-columns:1fr}.discovery-grid>div,.discovery-grid>div:nth-child(odd){border-right:0;min-height:105px;padding:22px}}
  `);

  addStyle('tpm-master-header', `
    .site-header .nav{height:90px;gap:32px}.site-header .brand{gap:14px}.site-header .brand-mark,.site-header .brand-mark img{width:60px;height:60px}.site-header .brand-mark{flex-basis:60px}.site-header .brand-copy strong{font-size:20px;letter-spacing:.035em;white-space:nowrap}.site-header .brand-copy small{font-size:8px;letter-spacing:.17em;margin-top:6px;white-space:nowrap}.site-header .primary-nav{gap:25px;font-size:13px;align-items:center}
    @media(max-width:1100px){.site-header .nav{gap:18px}.site-header .primary-nav{gap:17px;font-size:12px}.site-header .brand-copy strong{font-size:18px}.site-header .brand-mark,.site-header .brand-mark img{width:56px;height:56px}.site-header .brand-mark{flex-basis:56px}}
    @media(max-width:760px){.site-header .nav{height:72px}.site-header .brand-mark,.site-header .brand-mark img{width:50px;height:50px}.site-header .brand-mark{flex-basis:50px}.site-header .brand-copy strong{font-size:16px}.site-header .brand-copy small{font-size:6.5px}.site-header .primary-nav{top:72px}}
  `);
})();
\n\n/* TPM HEADER REFINEMENT v1 */\n(function(){\n  const style=document.createElement('style');\n  style.textContent=`\n    .site-header .primary-nav{gap:25px;color:#d5d2c9}\n    .site-header .primary-nav a,.site-header .nav-drop-trigger{color:#d5d2c9}\n    .site-header .primary-nav a:hover,.site-header .nav-drop-trigger:hover{color:#f1efe9}\n    .site-header .nav>.button.button-outline{background:#f1efe9;color:#171714;border-color:#f1efe9}\n    .site-header .nav>.button.button-outline:hover{background:#fffdf7;color:#171714;border-color:#fffdf7;transform:translateY(-1px)}\n    .site-header .nav>.button.button-outline span{color:#80663e}\n    @media(max-width:1100px){.site-header .primary-nav{gap:17px}}\n  `;\n  document.head.appendChild(style);\n})();\n(function(){\n  const links=[...document.querySelectorAll('.primary-nav a')];\n  const pricing=links.find(a=>a.textContent.trim().toLowerCase()==='pricing');\n  if(pricing){pricing.textContent='Work With Us';pricing.href='pricing.html';}\n})();\n