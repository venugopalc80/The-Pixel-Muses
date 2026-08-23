const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.primary-nav');
if(menu){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.style.display=open?'none':'flex';if(!open){Object.assign(nav.style,{position:'absolute',top:'70px',left:'17px',right:'17px',flexDirection:'column',padding:'18px',background:'#111418',border:'1px solid #2a2f36'});}})}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{if(innerWidth<=1000&&nav)nav.style.display='none'}));
document.getElementById('year').textContent=new Date().getFullYear();
