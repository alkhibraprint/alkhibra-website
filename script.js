document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('.menu');
function closeMenu(){if(!menu||!toggle)return;menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','فتح القائمة');}
if(toggle&&menu){
  toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'إغلاق القائمة':'فتح القائمة');});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();toggle.focus();}});
  document.addEventListener('click',e=>{if(menu.classList.contains('open')&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
}
const back=document.getElementById('back-to-top');
if(back){
 const update=()=>back.classList.toggle('show',window.scrollY>500);
 window.addEventListener('scroll',update,{passive:true});update();
 back.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}));
}


// V9.1: instant filtering in the services directory.
(function () {
  const input = document.getElementById('service-search');
  if (!input) return;
  const clearButton = document.getElementById('service-search-clear');
  const status = document.getElementById('service-search-status');
  const cards = Array.from(document.querySelectorAll('.service-category .service-card'));
  const categories = Array.from(document.querySelectorAll('.service-category'));

  function normalize(value) {
    return value.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/\s+/g, ' ').trim();
  }

  function filterServices() {
    const query = normalize(input.value);
    let visible = 0;
    cards.forEach(function (card) {
      const match = !query || normalize(card.textContent).includes(query);
      card.classList.toggle('is-search-hidden', !match);
      if (match) visible += 1;
    });
    categories.forEach(function (section) {
      const hasVisible = section.querySelector('.service-card:not(.is-search-hidden)');
      section.classList.toggle('is-search-empty', !hasVisible);
    });
    status.textContent = query ? 'عدد الخدمات المطابقة: ' + visible : 'يمكنك البحث باسم الخدمة أو جزء منها.';
  }

  input.addEventListener('input', filterServices);
  clearButton.addEventListener('click', function () {
    input.value = '';
    filterServices();
    input.focus();
  });
})();
