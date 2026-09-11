const fs = require('fs');

const htmlPath = 'index.html';
const cssPath = 'styles.css';
let html = fs.readFileSync(htmlPath, 'utf8');

// Use the real Simple Icons brand artwork from a pinned CDN release.
const iconUrls = {
  linkedin: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/linkedin.svg',
  instagram: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/instagram.svg',
  facebook: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/facebook.svg',
  threads: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/threads.svg',
  x: 'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/x.svg'
};

for (const [name, url] of Object.entries(iconUrls)) {
  const re = new RegExp(`<span class="social-icon(?: [^"]+)?">[\\s\\S]*?<\\/span>`);
  const replacement = `<span class="social-icon social-icon-${name}" aria-hidden="true"><img src="${url}" alt="" loading="lazy" decoding="async"></span>`;
  html = html.replace(re, replacement);
}

fs.writeFileSync(htmlPath, html);

const base = fs.readFileSync(cssPath, 'utf8').split('\n/* Social icons —')[0].trimEnd();
const css = `
/* Social icons — real Simple Icons brand artwork */
.social-links{display:flex;justify-content:center;gap:14px;margin:0;flex-wrap:wrap}.social-card{width:96px;min-height:94px;padding:13px 9px 11px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px solid #30343a;background:#0d0f11;color:#fff;text-decoration:none;transition:transform .25s ease,border-color .25s ease,background .25s ease,box-shadow .25s ease}.social-card>span:last-child{font-size:10px;letter-spacing:.03em;color:#b8bcc2}.social-icon{width:36px;height:36px;display:grid;place-items:center}.social-icon img{display:block;width:100%;height:100%;object-fit:contain}.social-icon-linkedin img{width:32px;height:32px}.social-icon-facebook img{width:32px;height:32px}.social-icon-instagram img{width:35px;height:35px}.social-icon-threads img{width:31px;height:31px}.social-icon-x img{width:31px;height:31px}.social-card:hover,.social-card:focus-visible{transform:translateY(-4px);border-color:var(--gold);background:#111419;box-shadow:0 10px 28px rgba(0,0,0,.25)}.social-card:focus-visible{outline:2px solid var(--gold);outline-offset:3px}.social-instagram:hover,.social-instagram:focus-visible{border-color:#E4405F}.social-linkedin:hover,.social-linkedin:focus-visible{border-color:#0A66C2}.social-facebook:hover,.social-facebook:focus-visible{border-color:#1877F2}.social-threads:hover,.social-threads:focus-visible,.social-x:hover,.social-x:focus-visible{border-color:#fff}
@media(max-width:640px){.social-links{gap:9px}.social-card{width:76px;min-height:78px;padding:10px 6px;gap:7px}.social-icon{width:30px;height:30px}.social-card>span:last-child{font-size:9px}}
`;
fs.writeFileSync(cssPath, `${base}\n${css}\n`);
