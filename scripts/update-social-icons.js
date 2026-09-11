const fs = require('fs');

const htmlPath = 'index.html';
const cssPath = 'styles.css';
let html = fs.readFileSync(htmlPath, 'utf8');

const socialMarkup = `<div class="social-links" aria-label="The Pixel Muses social media">
  <a class="social-card social-linkedin" href="https://www.linkedin.com/company/the-pixel-muses/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
    <span class="social-icon social-icon-linkedin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.7 8.3H3.3V21h3.4V8.3ZM5 3A2 2 0 1 0 5 7 2 2 0 0 0 5 3ZM21 13.7c0-3.8-2-5.7-4.8-5.7-2.2 0-3.2 1.2-3.8 2.1V8.3H9V21h3.4v-6.3c0-1.7.3-3.2 2.3-3.2 1.9 0 1.9 1.8 1.9 3.3V21H21v-7.3Z"/></svg></span><span>LinkedIn</span>
  </a>
  <a class="social-card social-instagram" href="https://www.instagram.com/thepixelmuses/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
    <span class="social-icon social-icon-instagram" aria-hidden="true"><svg viewBox="0 0 24 24"><defs><linearGradient id="igGradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0"/><stop offset=".45"/><stop offset=".72"/><stop offset="1"/></linearGradient></defs><rect x="2.5" y="2.5" width="19" height="19" rx="5.3" fill="url(#igGradient)"/><rect x="6.7" y="6.7" width="10.6" height="10.6" rx="3.2" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="2.55" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="17.1" cy="6.9" r="1" fill="#fff"/></svg></span><span>Instagram</span>
  </a>
  <a class="social-card social-facebook" href="https://www.facebook.com/profile.php?id=61557869420013" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
    <span class="social-icon social-icon-facebook" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path fill="#fff" d="M13.7 20v-7h2.4l.4-2.7h-2.8V8.6c0-.8.3-1.4 1.5-1.4h1.5V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.7v1.9H8.3V13h2.5v7h2.9Z"/></svg></span><span>Facebook</span>
  </a>
  <a class="social-card social-threads" href="https://www.threads.com/@thepixelmuses" target="_blank" rel="noopener noreferrer" aria-label="Threads" title="Threads">
    <span class="social-icon social-icon-threads" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><path d="M17.7 11.2c-.3-3.4-2.2-5.4-5.7-5.4-3.7 0-5.8 2.1-5.8 5.2 0 3.1 2.2 5.1 5.5 5.1 2.1 0 3.6-.8 4.4-2.3.5-1.1 0-2.3-1.1-2.8-1.3-.6-3-.1-3 1.2 0 .8.6 1.3 1.5 1.3 1.6 0 2.5-1.5 2.5-3.6 0-2.9-1.6-4.7-4-4.7-2.3 0-3.9 1.4-3.9 3.7 0 2.3 1.6 3.7 4.1 3.7" fill="none" stroke="#fff" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Threads</span>
  </a>
  <a class="social-card social-x" href="https://x.com/thepixelmuses" target="_blank" rel="noopener noreferrer" aria-label="X" title="X">
    <span class="social-icon social-icon-x" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="#fff" d="M18.2 3H22l-6.9 7.9L23 21h-6.1l-4.8-6-5.2 6H3.1l6.9-7.9L2.3 3h6.2l4.6 5.6L18.2 3Zm-1.1 15.8h1.7L7.2 5.1H5.4l11.7 13.7Z"/></svg></span><span>X</span>
  </a>
</div>`;

html = html.replace(/<div class="social-links"[\s\S]*?<\/div>/, socialMarkup);
fs.writeFileSync(htmlPath, html);

const css = `
/* Social icons — recognizable platform marks */
.social-links{display:flex;justify-content:center;gap:14px;margin:0;flex-wrap:wrap}.social-card{width:96px;min-height:94px;padding:13px 9px 11px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;border:1px solid #30343a;background:#0d0f11;color:#fff;text-decoration:none;transition:transform .25s ease,border-color .25s ease,background .25s ease,box-shadow .25s ease}.social-card>span:last-child{font-size:10px;letter-spacing:.03em;color:#b8bcc2}.social-icon{width:38px;height:38px;display:block}.social-icon svg{display:block;width:100%;height:100%}.social-icon-linkedin svg{background:#0A66C2;border-radius:7px}.social-icon-facebook svg{background:#1877F2;border-radius:50%}.social-icon-threads svg rect{fill:#050505;stroke:#fff;stroke-width:0}.social-icon-x svg{background:#050505;border-radius:7px}.social-card:hover,.social-card:focus-visible{transform:translateY(-4px);border-color:var(--gold);background:#111419;box-shadow:0 10px 28px rgba(0,0,0,.25)}.social-card:focus-visible{outline:2px solid var(--gold);outline-offset:3px}.social-instagram:hover,.social-instagram:focus-visible{border-color:#E4405F}.social-linkedin:hover,.social-linkedin:focus-visible{border-color:#0A66C2}.social-facebook:hover,.social-facebook:focus-visible{border-color:#1877F2}.social-threads:hover,.social-threads:focus-visible,.social-x:hover,.social-x:focus-visible{border-color:#fff}
@media(max-width:640px){.social-links{gap:9px}.social-card{width:76px;min-height:78px;padding:10px 6px;gap:7px}.social-icon{width:32px;height:32px}.social-card>span:last-child{font-size:9px}}
`;
if (!stylesHasMarker()) fs.appendFileSync(cssPath, css);

function stylesHasMarker(){return fs.readFileSync(cssPath,'utf8').includes('/* Social icons — recognizable platform marks */');}
