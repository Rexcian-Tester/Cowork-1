(()=>{
const D=window.DATA;
const $=(s,r=document)=>r.querySelector(s);
const app=$('#app');
const BD="০১২৩৪৫৬৭৮৯";
const bn=x=>String(x).replace(/\d/g,d=>BD[d]);
const fmt=x=>bn(+(+x).toFixed(1));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const SUBJ={Phy:"পদার্থবিজ্ঞান",Chem:"রসায়ন",Math:"উচ্চতর গণিত"};
const SHORT={Phy:"পদার্থ",Chem:"রসায়ন",Math:"গণিত"};
const EXAM=new Date("2026-12-19T00:00:00+06:00");
const yr=y=>y.startsWith("MT")?"মডেল টেস্ট-"+bn(y.slice(2).padStart(2,"0")):bn(y);
const qn=q=>{const m=q.match(/^(\d+)([a-z]?)$/);const L={a:"ক",b:"খ",c:"গ",d:"ঘ",e:"ঙ"};return bn(m[1])+(m[2]?"("+L[m[2]]+")":"")};

/* safe storage */
const store={
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
const marks=key=>store.get('mist.rv.'+key,{});
const setMark=(key,n,v)=>{const m=marks(key);if(v)m[n]=v;else delete m[n];store.set('mist.rv.'+key,m)};
const allChapters=()=>Object.entries(D.subjects).flatMap(([s,v])=>v.chapters.map(c=>({...c,sub:s})));
const findCh=id=>allChapters().find(c=>c.id===id);
const revProgress=key=>{const r=D.rev[key];const m=marks(key);const ok=r.cards.filter(c=>m[c.n]==='ok').length;const again=r.cards.filter(c=>m[c.n]==='again').length;return{ok,again,total:r.cards.length}};

/* ---------- lightbox ---------- */
const lb=$('#lb'),lbImg=$('#lb-img'),lbCap=$('#lb-cap');
let lbPage=9,lbSingle=false;
const PAGE_NUMS=Object.keys(D.pages).map(Number);
function pageCaption(p){
  const segs=D.pages[p]||[];
  const parts=segs.map(([y,s,a,b])=>`${bn(y)} · ${SHORT[s]} প্রশ্ন ${bn(a)}${a!==b?'–'+bn(b):''}`);
  return `MIST QB · PDF পৃষ্ঠা ${bn(p)}  |  ${parts.join('  +  ')}`;
}
function openLB(p){
  lbSingle=false;lbPage=p;lb.hidden=false;document.body.style.overflow='hidden';
  lbImg.src=`qb/p${String(p).padStart(2,'0')}.jpg`;lbImg.alt=pageCaption(p);
  lbCap.textContent=pageCaption(p);$('#lb-body').scrollTop=0;
}
function closeLB(){lb.hidden=true;document.body.style.overflow='';lb.classList.remove('zoom')}
function openImg(src,cap){lbSingle=true;lb.hidden=false;document.body.style.overflow='hidden';lbImg.src=src;lbImg.alt=cap;lbCap.textContent=cap;$('#lb-body').scrollTop=0;lb.classList.add('zoom')}
function stepLB(d){if(lbSingle)return;const i=PAGE_NUMS.indexOf(lbPage)+d;if(i>=0&&i<PAGE_NUMS.length)openLB(PAGE_NUMS[i])}
$('#lb-close').onclick=closeLB;$('#lb-prev').onclick=()=>stepLB(-1);$('#lb-next').onclick=()=>stepLB(1);
$('#lb-zoom').onclick=()=>lb.classList.toggle('zoom');
lb.addEventListener('click',e=>{if(e.target===lb||e.target.id==='lb-body')closeLB()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')closeLB();if(e.key==='ArrowRight')stepLB(1);if(e.key==='ArrowLeft')stepLB(-1)});

/* ---------- shared pieces ---------- */
const tierChip=t=>`<span class="tier t${t}" title="স্তর-${bn(t)}">স্তর ${bn(t)}</span>`;
function chapterRow(c,showSub){
  const rv=c.rev?revProgress(c.rev):null;
  const badges=[
    c.rev?`<span class="badge rev">রিভিশন ${bn(rv.ok)}/${bn(rv.total)}</span>`:'',
    c.full?`<span class="badge full">পূর্ণ সিলেবাস</span>`:''
  ].join(' ');
  const sub=`${showSub?SHORT[c.sub]+' · ':''}${esc(c.en)} · ${esc(c.paper)}${c.no?' · অধ্যায় '+bn(c.no):''}`;
  return `<a class="chrow" href="#/c/${encodeURIComponent(c.id)}">
    <div class="rk">${bn(c.rank)}</div>
    <div class="cn"><b>${esc(c.bn)}</b><small>${sub}</small><small class="mobmeta">${bn(c.nreal)} আসল প্রশ্ন · ${bn(c.nmt)} মডেল টেস্ট</small></div>
    <div class="sc"><div class="bar"><i style="width:${Math.min(100,c.score)}%"></i></div><span>${fmt(c.score)}</span></div>
    <div class="num n1">${bn(c.nreal)}</div><div class="num n2">${bn(c.nmt)}</div>
    <div class="st">${tierChip(c.tier)} ${badges}</div></a>`;
}
const chHead=`<div class="chrow head"><div>#</div><div>অধ্যায়</div><div>স্কোর</div><div style="text-align:center">আসল</div><div style="text-align:center">মডেল</div><div>স্তর</div></div>`;

/* ---------- pages ---------- */
function home(){
  const days=Math.max(0,Math.ceil((EXAM-new Date())/86400000));
  const chs=allChapters();
  const revKeys=Object.keys(D.rev);
  const totalCards=revKeys.reduce((a,k)=>a+D.rev[k].cards.length,0);
  const done=revKeys.reduce((a,k)=>a+revProgress(k).ok,0);
  const realQ=Object.keys(window.QS||{}).length;
  const last=store.get('mist.last',null);
  const lc=last&&findCh(last);
  const revChs=chs.filter(c=>c.rev);
  app.innerHTML=`
  <section class="hero fade">
    <div>
      <div class="eyebrow">MIST Unit-A · লিখিত পরীক্ষা · পূর্ণ সিলেবাস</div>
      <h1>রিভিশন হাব</h1>
      <p class="lede">বিষয় ও অধ্যায় ধরে তোমার তৈরি রিভিশন শিট, সমাধান লুকিয়ে নিজেকে যাচাই, আর সেই অধ্যায়ের সব বিগত বছরের MIST প্রশ্ন — একই পাতায়।</p>
      <div class="row" style="margin-top:14px">
        ${lc?`<a class="btn primary" href="#/c/${encodeURIComponent(lc.id)}">▶ আগের জায়গা: ${esc(lc.bn)}</a>`:`<a class="btn primary" href="#/c/${encodeURIComponent('Phy:Vector')}">▶ ভেক্টর দিয়ে শুরু করো</a>`}
        <a class="btn" href="#/map">গুরুত্ব তালিকা</a>
        <a class="btn" href="#/bank">প্রশ্নব্যাংক</a>
      </div>
    </div>
    <div class="card pad">
      <div class="eyebrow">পরীক্ষা ১৯ ডিসেম্বর ২০২৬</div>
      <div class="count"><div><b>${bn(days)}</b><span>দিন বাকি</span></div><div><b>${bn(Math.ceil(days/7))}</b><span>সপ্তাহ</span></div></div>
      <p class="muted" style="margin:10px 0 0;font-size:14.5px">দ্বিতীয়বারের পরীক্ষার্থী · ১০ নম্বর আগেই কাটা · সংক্ষিপ্ত নয়, পূর্ণ সিলেবাস। তাই অধ্যায় ধরে ধরে নিশ্চিন্ত হওয়াই লক্ষ্য।</p>
    </div>
  </section>
  <section class="grid g4" style="margin-top:16px">
    <div class="card stat"><b>${bn(revKeys.length)}</b><span>রিভিশন শিট প্রস্তুত</span></div>
    <div class="card stat"><b>${bn(done)}/${bn(totalCards)}</b><span>প্রশ্ন নিজে পেরেছি</span></div>
    <div class="card stat"><b>${bn(realQ)}</b><span>আসল MIST প্রশ্ন (বিশ্লেষিত)</span></div>
    <div class="card stat"><b>${bn(chs.length)}</b><span>অধ্যায় র‍্যাংক করা</span></div>
  </section>
  <section class="sec"><div class="row"><h2>বিষয় অনুযায়ী</h2></div>
    <div class="grid g3">${Object.entries(D.subjects).map(([s,v])=>`
      <a class="card subj c-${s}" href="#/s/${s}"><h3>${v.name}</h3>
        <div class="muted" style="font-size:14px">সবচেয়ে গুরুত্বপূর্ণ ৩ অধ্যায়</div>
        <ol>${v.chapters.slice(0,3).map(c=>`<li>${esc(c.bn)} <span class="muted">· ${fmt(c.score)}</span></li>`).join('')}</ol>
        <div class="muted" style="font-size:14px">${bn(v.chapters.length)} অধ্যায় · ${bn(v.chapters.filter(c=>c.rev).length)}টিতে রিভিশন শিট আছে</div>
      </a>`).join('')}</div></section>
  <section class="sec"><div class="row"><h2>রিভিশন শিট আছে যেসব অধ্যায়ে</h2></div>
    <div class="card"><div class="tbl">${chHead}${revChs.map(c=>chapterRow(c,true)).join('')}</div></div></section>
  <section class="sec"><div class="note"><b>মনে রাখো:</b> প্রশ্নব্যাংকের স্ক্যানে কিছু পৃষ্ঠা নেই (মুদ্রিত পৃষ্ঠা ১৮–১৯, ২২–২৩, ২৬–২৭, ৩০–৩১)। তাই ২০১৯-২০ এর পদার্থবিজ্ঞান এবং কিছু গণিত ও রসায়ন প্রশ্ন বিশ্লেষণে নেই — আসল প্রশ্নপত্রের প্রায় ৮০% এখানে আছে।</div></section>`;
}

function subjectPage(s){
  const v=D.subjects[s];if(!v)return notFound();
  const chs=[...v.chapters].sort((x,y)=>(x.paper>y.paper?1:x.paper<y.paper?-1:0)||(parseFloat(x.no)||99)-(parseFloat(y.no)||99));
  const withRev=chs.filter(c=>c.rev);
  const cardsDone=withRev.reduce((a,c)=>a+revProgress(c.rev).ok,0);
  const cardsAll=withRev.reduce((a,c)=>a+D.rev[c.rev].cards.length,0);
  app.innerHTML=`<div class="fade c-${s}">
    <div class="crumbs"><a href="#/">হোম</a> › ${v.name}</div>
    <div class="eyebrow">${SHORT[s]} · রিভিশন ম্যাটেরিয়াল</div>
    <h1 style="color:var(--c)">${v.name}</h1>
    <p class="lede"><b>${bn(withRev.length)}/${bn(chs.length)}</b> অধ্যায়ে রিভিশন নোট আপলোড হয়েছে${cardsAll?` · ${bn(cardsDone)}/${bn(cardsAll)} প্রশ্ন নিজে পেরেছি`:''}।</p>
    <section class="sec">
      <div class="row"><h2>রিভিশন ম্যাটেরিয়াল</h2><span class="sp"></span><button class="btn" id="allbtn">📚 সব অধ্যায় দেখো (${bn(chs.length)})</button></div>
      <div id="allwrap" hidden><div class="card"><div class="allch">${chs.map(c=>`<a href="#/c/${encodeURIComponent(c.id)}"><div class="nm"><b>${esc(c.bn)}</b><small>${esc(c.paper)}${c.no?' · অধ্যায় '+bn(c.no):''} · ${esc(c.en)}</small></div>${c.rev?`<span class="badge rev">রিভিশন আছে</span>`:`<span class="badge soon">শীঘ্রই</span>`}</a>`).join('')}</div></div></div>
      ${withRev.length?`<div class="rcards">${withRev.map(c=>{const r=D.rev[c.rev],p=revProgress(c.rev);return `<a class="card rc-card" href="#/c/${encodeURIComponent(c.id)}"><div class="eyebrow">${esc(c.paper)}${c.no?' · অধ্যায় '+bn(c.no):''}</div><h3>${esc(c.bn)}</h3><div class="meta">${esc(r.sub)}</div><div class="bar"><i style="width:${p.ok/p.total*100}%"></i></div><div class="meta">${bn(p.ok)}/${bn(p.total)} প্রশ্ন পেরেছি · বিগত বছরের ${bn(c.nreal)}টি প্রশ্ন সংযুক্ত</div></a>`}).join('')}</div>`:`<div class="card empty"><b>এই বিষয়ে এখনো কোনো রিভিশন নোট আপলোড হয়নি</b>নোট যোগ হলে এখানে দেখা যাবে। এর মধ্যে “সব অধ্যায় দেখো” চেপে অধ্যায়ভিত্তিক বিগত প্রশ্ন অনুশীলন করতে পারো।</div>`}
    </section></div>`;
  $('#allbtn').onclick=()=>{const w=$('#allwrap');w.hidden=!w.hidden;$('#allbtn').textContent=w.hidden?`📚 সব অধ্যায় দেখো (${bn(chs.length)})`:'✕ অধ্যায়ের তালিকা বন্ধ করো'};
}

/* chapter page */
const qstate={view:'topic',f:'all'};
function yearDots(c,sub){
  const miss=D.missing[sub]||[];
  return D.years.map(y=>{
    const has=c.years.includes(y);
    const cls=has?'':miss.includes(y)?'miss':'no';
    return `<div class="dot ${cls}" title="${y}${has?' · প্রশ্ন এসেছে':miss.includes(y)?' · পৃষ্ঠা নেই':' · আসেনি'}"><i></i>${bn(y.slice(2,4))}</div>`;
  }).join('');
}
const qmarks=()=>store.get('mist.q',{});
const setQMark=(k,v)=>{const m=qmarks();if(v)m[k]=v;else delete m[k];store.set('mist.q',m)};
const qkey=(y,sub,q)=>`${y}|${sub}|${parseInt(q,10)}`;
function renderMath(el){
  if(window.renderMathInElement)try{renderMathInElement(el,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}],throwOnError:false,strict:false})}catch(e){}
}
const figs=(arr,cls)=>(arr||[]).map(f=>`<img class="${cls}" loading="lazy" src="${f}" alt="চিত্র">`).join('');
function qItems(c){
  const seen=new Set(),out=[];
  for(const t of c.topics)for(const x of t.subs)for(const q of x.qs){
    if(q.m)continue;
    const k=qkey(q.y,c.sub,q.q);
    if(seen.has(k)){continue}
    seen.add(k);out.push({k,y:q.y,num:parseInt(q.q,10),topic:t.n,sub:x.n,t:q.t,pg:q.pg});
  }
  return out;
}
function qCardHTML(it,st){
  const e=(window.QS||{})[it.k];
  const stb=st==='ok'?'<span class="badge rev">✓ পেরেছি</span>':st==='again'?'<span class="badge full">↻ আবার</span>':'';
  const pg=it.pg?`<div class="src"><button class="pgb" data-pg="${it.pg}">মূল পাতা পৃ.${bn(it.pg)} ↗</button></div>`:'';
  if(!e)return `<article class="rcard qcard ${st}" data-k="${it.k}"><div class="rhead"><span class="yrtag">${bn(it.y)}</span><b>প্রশ্ন ${bn(it.num)}</b><span class="sp"></span>${stb}</div><div class="qbody"><p>${esc(it.t)}</p><p class="muted" style="font-size:14px">এই প্রশ্নের টাইপ করা সমাধান শীঘ্রই আসছে।</p></div>${pg}</article>`;
  return `<article class="rcard qcard ${st}" data-k="${it.k}"><div class="rhead"><span class="yrtag">${bn(it.y)}</span><b>প্রশ্ন ${bn(it.num)}</b><span class="sp"></span>${stb}</div>
    <div class="qbody">${e.q}${figs(e.qf,'qfig')}</div><div class="solslot"></div>
    <div class="ractions"><button class="btn primary reveal-btn" data-act="qreveal">উত্তর দেখো</button><button class="btn sm ok" data-act="qmark" data-v="ok">✓ পারলাম</button><button class="btn sm warn" data-act="qmark" data-v="again">↻ আবার দেখব</button></div>${pg}</article>`;
}
function qAction(act){
  const a=act.dataset.act;if(a!=='qreveal'&&a!=='qmark')return false;
  const card=act.closest('.qcard'),k=card.dataset.k,ent=(window.QS||{})[k];
  if(a==='qreveal'){
    const slot=card.querySelector('.solslot');
    if(card.dataset.open==='1'){slot.innerHTML='';card.dataset.open='0';act.textContent='উত্তর দেখো';act.classList.add('primary')}
    else{slot.innerHTML=`<div class="sbody">${ent.a}${figs(ent.af,'sfig')}</div>`;renderMath(slot);card.dataset.open='1';act.textContent='উত্তর লুকাও';act.classList.remove('primary')}
  }else{
    const cur=qmarks()[k]||'',v=act.dataset.v;setQMark(k,cur===v?'':v);const nv=qmarks()[k]||'';
    card.className='rcard qcard '+nv;const head=card.querySelector('.rhead');head.querySelectorAll('.badge').forEach(x=>x.remove());
    if(nv)head.insertAdjacentHTML('beforeend',nv==='ok'?'<span class="badge rev">✓ পেরেছি</span>':'<span class="badge full">↻ আবার</span>');
  }
  return true;
}
function renderQs(c){
  const box=$('#qs');if(!box)return;
  const m=qmarks();
  const items=qItems(c).filter(it=>{const st=m[it.k]||'';return qstate.f==='all'||(qstate.f==='todo'&&st!=='ok')||(qstate.f==='again'&&st==='again')});
  let html='';
  if(qstate.view==='topic'){
    const order=[];
    for(const t of c.topics)for(const x of t.subs){
      const L=items.filter(it=>it.topic===t.n&&it.sub===x.n);
      if(L.length)order.push([t.n,x.n,L]);
    }
    let lastT=null;
    for(const [tn,sn,L] of order){
      if(tn!==lastT){html+=`<h3 class="tn">${esc(tn)}</h3>`;lastT=tn}
      html+=`<div class="qsub-t">${esc(sn)}</div>`+L.map(it=>qCardHTML(it,m[it.k]||'')).join('');
    }
  }else{
    for(const y of [...D.years].reverse()){
      const L=items.filter(it=>it.y===y).sort((a,b)=>a.num-b.num);if(!L.length)continue;
      html+=`<h3 class="tn">${bn(y)} <small class="muted">${bn(L.length)}টি</small></h3>`+L.map(it=>qCardHTML(it,m[it.k]||'')).join('');
    }
  }
  const mts=c.topics.flatMap(t=>t.subs.flatMap(x=>x.qs.filter(q=>q.m)));
  const mtHtml=mts.length?`<details class="card mtlist"><summary>মডেল টেস্টের প্রশ্ন (${bn(mts.length)}) — শুধু বিবরণ</summary>${mts.map(q=>`<div class="q mt"><span class="yr">${yr(q.y)}</span><div><div class="qt">${esc(q.t)}</div><div class="qn">প্রশ্ন ${qn(q.q)}</div></div><span></span></div>`).join('')}</details>`:'';
  box.innerHTML=(html||`<div class="empty"><b>${c.nreal?'এই ফিল্টারে কোনো প্রশ্ন নেই।':'এই অধ্যায় থেকে এখনো কোনো আসল প্রশ্ন আসেনি'}</b>${c.nreal?'':'৫–৯টি প্রশ্নপত্রের ডেটায় এটি আসেনি — তবু MIST পুরো সিলেবাস থেকে প্রশ্ন করে, তাই বাদ দিও না।'}</div>`)+mtHtml;
  renderMath(box);
}
function revCardHTML(key,cd,idx,total,m){
  const st=m[cd.n]||'';
  return `<article class="rcard ${st}" id="rc-${key}-${cd.n}" data-n="${cd.n}">
    <div class="rhead"><b>প্রশ্ন ${bn(idx)}</b><span>/ ${bn(total)}</span><span class="sp"></span>${st==='ok'?'<span class="badge rev">✓ পেরেছি</span>':st==='again'?'<span class="badge full">↻ আবার</span>':''}</div>
    <div class="rimg"><img class="qimg" loading="lazy" src="${cd.q}" width="${cd.qs[0]}" height="${cd.qs[1]}" alt="প্রশ্ন ${idx}"></div>
    <div class="solslot"></div>
    <div class="ractions">
      <button class="btn primary reveal-btn" data-act="reveal">সমাধান দেখো</button>
      <button class="btn sm ok" data-act="mark" data-v="ok">✓ পারলাম</button>
      <button class="btn sm warn" data-act="mark" data-v="again">↻ আবার দেখব</button>
    </div></article>`;
}
function paintRev(key,filter){
  const r=D.rev[key],m=marks(key);
  const list=$('#rvlist');if(!list)return;
  let html='';let lastSec=null;
  r.cards.forEach((cd,i)=>{
    const st=m[cd.n]||'';
    if(filter==='todo'&&st==='ok')return;
    if(filter==='again'&&st!=='again')return;
    if(r.sections){const s=r.sections.find(x=>cd.n>=x[0]&&cd.n<=x[1]);if(s&&s[2]!==lastSec){html+=`<div class="rv-sec">${esc(s[2])}</div>`;lastSec=s[2]}}
    html+=revCardHTML(key,cd,i+1,r.cards.length,m);
  });
  list.innerHTML=html||'<div class="empty"><b>দারুণ!</b>এই ফিল্টারে আর কোনো প্রশ্ন বাকি নেই।</div>';
  const p=revProgress(key);
  $('#rvprog').innerHTML=`<div class="bar"><i style="width:${p.ok/p.total*100}%"></i></div><div class="row muted" style="font-size:14px"><span>পেরেছি <b style="color:var(--ok)">${bn(p.ok)}</b></span><span>আবার <b style="color:var(--warn)">${bn(p.again)}</b></span><span>বাকি ${bn(p.total-p.ok-p.again)}</span></div>`;
  document.querySelectorAll('[data-rf]').forEach(b=>b.classList.toggle('on',b.dataset.rf===filter));
}
function chapterPage(id){
  const c=findCh(id);if(!c)return notFound();
  store.set('mist.last',c.id);
  const key=c.rev,r=key?D.rev[key]:null;
  let filter='all';
  const sumQ=c.nreal+c.nmt;
  app.innerHTML=`<div class="fade">
    <div class="crumbs"><a href="#/">হোম</a> › <a href="#/s/${c.sub}">${SUBJ[c.sub]}</a> › ${esc(c.bn)}</div>
    <div class="card chead">
      <div class="row"><span class="eyebrow">${SUBJ[c.sub]} · ${esc(c.paper)}${c.no?' · অধ্যায় '+bn(c.no):''} · ${esc(c.en)}</span><span class="sp"></span>${tierChip(c.tier)} ${c.full?'<span class="badge full">পূর্ণ সিলেবাস অধ্যায়</span>':''}</div>
      <h1>${esc(c.bn)}</h1>
      <div class="facts">
        <div class="fact"><b>#${bn(c.rank)}</b><span>${SHORT[c.sub]}-এ র‍্যাংক</span></div>
        <div class="fact"><b>${fmt(c.score)}</b><span>গুরুত্ব স্কোর</span></div>
        <div class="fact"><b>${fmt(c.rate)}</b><span>প্রতি প্রশ্নপত্রে গড়</span></div>
        <div class="fact"><b>${bn(c.nreal)}</b><span>আসল MIST প্রশ্ন</span></div>
        <div class="fact"><b>${bn(c.nmt)}</b><span>মডেল টেস্টে</span></div>
        <div class="fact"><b>${bn(c.years.length)}/${bn(D.years.length)}</b><span>প্রশ্নপত্রে এসেছে</span></div>
      </div>
      <div><div class="dots">${yearDots(c,c.sub)}</div>
      <div class="legend" style="margin-top:8px"><span><i style="background:var(--accent)"></i>প্রশ্ন এসেছে</span><span><i style="border:2px solid var(--line)"></i>আসেনি</span><span><i style="border:2px dashed var(--muted)"></i>ঐ বছরের পৃষ্ঠা স্ক্যানে নেই</span><span>২০১৫-১৬ → ২০২৩-২৪</span></div></div>
      ${c.notin?`<div class="notin"><div class="eyebrow">প্রশ্নপত্রে আসেনি (শেষে পড়বে, বাদ দেবে না)</div><p>${esc(c.notin)}</p></div>`:''}
    </div>
    <div class="tabs"><button class="on" data-tab="rev">রিভিশন শিট</button><button data-tab="qs">বিগত প্রশ্ন (${bn(c.nreal)})</button></div>
    <div class="cols">
      <section class="pane show" id="pane-rev">
        <h2>তোমার রিভিশন শিট ${r?`<small>${bn(r.cards.length)}টি প্রশ্ন</small>`:''}</h2>
        ${r?`<div class="card rv-tools"><div class="row"><b style="font-family:var(--display)">${esc(r.title)}</b><span class="sp"></span><a class="btn sm" href="${r.pdf}" target="_blank" rel="noopener">PDF খোলো ↗</a></div><div class="muted" style="font-size:14px;margin-top:-6px">${esc(r.sub)}</div>
          <div id="rvprog"></div>
          <div class="row"><button class="chip" data-rf="all">সব</button><button class="chip" data-rf="todo">বাকি</button><button class="chip" data-rf="again">↻ আবার</button><span class="sp"></span><button class="btn sm" data-act="hideall">সব সমাধান লুকাও</button><button class="btn sm" data-act="reset">রিসেট</button></div>
          <div class="muted" style="font-size:13.5px">প্রশ্ন পড়ে নিজে করো → “সমাধান দেখো” চাপলে তবেই উত্তর আসবে।</div></div>
          <div id="rvlist"></div>`
        :`<div class="card empty"><b>এই অধ্যায়ের রিভিশন শিট এখনো যোগ হয়নি</b>শিট তৈরি হলে এখানে প্রশ্ন ও লুকানো সমাধান আসবে। ততক্ষণ ডানদিকের বিগত বছরের প্রশ্ন দিয়ে অনুশীলন করো।</div>`}
      </section>
      <section class="pane" id="pane-qs">
        <h2>বিগত বছরের প্রশ্ন <small>${bn(c.nreal)}টি আসল MIST প্রশ্ন · প্রশ্ন আগে, উত্তর পরে</small></h2>
        <div class="row sticky"><button class="chip" data-v="topic">টপিক অনুযায়ী</button><button class="chip" data-v="year">সাল অনুযায়ী</button><span class="sp"></span><button class="chip" data-qf="all">সব</button><button class="chip" data-qf="todo">বাকি</button><button class="chip" data-qf="again">↻ আবার</button></div>
        <div id="qs"></div>
      </section>
    </div></div>`;
  if(r)paintRev(key,filter);
  const paintQ=()=>{renderQs(c);document.querySelectorAll('[data-v]').forEach(b=>b.classList.toggle('on',b.dataset.v===qstate.view));document.querySelectorAll('[data-qf]').forEach(b=>b.classList.toggle('on',b.dataset.qf===qstate.f))};
  paintQ();
  app.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{qstate.view=b.dataset.v;paintQ()});
  app.querySelectorAll('[data-qf]').forEach(b=>b.onclick=()=>{qstate.f=b.dataset.qf;paintQ()});
  app.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{
    app.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('on',x===b));
    $('#pane-rev').classList.toggle('show',b.dataset.tab==='rev');$('#pane-qs').classList.toggle('show',b.dataset.tab==='qs');
  });
  app.querySelectorAll('[data-rf]').forEach(b=>b.onclick=()=>{filter=b.dataset.rf;paintRev(key,filter)});
  app.onclick=e=>{
    const pg=e.target.closest('[data-pg]');if(pg){openLB(+pg.dataset.pg);return}
    const im=e.target.closest('.rimg img,.qfig,.sfig');if(im){openImg(im.currentSrc||im.src,im.alt);return}
    const act=e.target.closest('[data-act]');if(!act)return;
    const a=act.dataset.act;
    if(qAction(act))return;
    if(!r)return;
    if(a==='hideall'){app.querySelectorAll('.rcard:not(.qcard)').forEach(hideSol);return}
    if(a==='reset'){if(confirm('এই অধ্যায়ের সব ✓ ও ↻ চিহ্ন মুছে ফেলবে?')){store.set('mist.rv.'+key,{});paintRev(key,filter)}return}
    const card=act.closest('.rcard');if(!card)return;
    const n=+card.dataset.n,cd=r.cards.find(x=>x.n===n);
    if(a==='reveal'){card.dataset.open==='1'?hideSol(card):showSol(card,cd,act)}
    if(a==='mark'){
      const cur=(marks(key)[n]||'');const v=act.dataset.v;setMark(key,n,cur===v?'':v);
      const m=marks(key);card.className='rcard '+(m[n]||'');
      const head=card.querySelector('.rhead');head.innerHTML=head.innerHTML.replace(/<span class="badge[^>]*>.*?<\/span>/,'');
      if(m[n])head.insertAdjacentHTML('beforeend',m[n]==='ok'?'<span class="badge rev">✓ পেরেছি</span>':'<span class="badge full">↻ আবার</span>');
      const p=revProgress(key);
      $('#rvprog').innerHTML=`<div class="bar"><i style="width:${p.ok/p.total*100}%"></i></div><div class="row muted" style="font-size:14px"><span>পেরেছি <b style="color:var(--ok)">${bn(p.ok)}</b></span><span>আবার <b style="color:var(--warn)">${bn(p.again)}</b></span><span>বাকি ${bn(p.total-p.ok-p.again)}</span></div>`;
    }
  };
  function showSol(card,cd,btn){
    card.dataset.open='1';
    if(cd.full){card.querySelector('.qimg').src=cd.full;card.querySelector('.qimg').height=0}
    else card.querySelector('.solslot').innerHTML=`<div class="rimg sol"><img src="${cd.a}" width="${cd.as[0]}" height="${cd.as[1]}" alt="সমাধান"></div>`;
    btn.textContent='সমাধান লুকাও';btn.classList.remove('primary');
  }
  function hideSol(card){
    if(card.dataset.open!=='1')return;
    const n=+card.dataset.n,cd=r.cards.find(x=>x.n===n);
    card.dataset.open='0';
    if(cd.full){const im=card.querySelector('.qimg');im.src=cd.q;im.height=cd.qs[1]}
    card.querySelector('.solslot').innerHTML='';
    const b=card.querySelector('.reveal-btn');b.textContent='সমাধান দেখো';b.classList.add('primary');
  }
}

/* question bank */
const BANK=(()=>{
  const idx={};
  for(const [sub,v] of Object.entries(D.subjects))for(const c of v.chapters)for(const t of c.topics)for(const x of t.subs)for(const q of x.qs){
    if(q.m)continue;const k=qkey(q.y,sub,q.q);
    if(!idx[k])idx[k]={k,y:q.y,sub,num:parseInt(q.q,10),topic:t.n,subt:x.n,t:q.t,pg:q.pg,ch:c.bn,chId:c.id};
  }
  return Object.values(idx);
})();
const bstate={y:null,s:'all'};
function bankPage(){
  const years=[...D.years].reverse();
  if(!bstate.y)bstate.y=years[0];
  const m=qmarks();
  const doneY=y=>BANK.filter(it=>it.y===y&&m[it.k]==='ok').length;
  const paint=()=>{
    const mm=qmarks();
    const L=BANK.filter(it=>it.y===bstate.y&&(bstate.s==='all'||it.sub===bstate.s)).sort((a,b)=>['Phy','Chem','Math'].indexOf(a.sub)-['Phy','Chem','Math'].indexOf(b.sub)||a.num-b.num);
    let html='',last=null;
    for(const it of L){
      if(it.sub!==last){html+=`<h3 class="tn c-${it.sub}" style="color:var(--c)">${SUBJ[it.sub]}</h3>`;last=it.sub}
      html+=qCardHTML(it,mm[it.k]||'').replace('<div class="rhead">',`<div class="rhead"><a class="chtag" href="#/c/${encodeURIComponent(it.chId)}">${esc(it.ch)}</a>`);
    }
    const miss=(D.missing[bstate.s]||[]).includes(bstate.y)||(bstate.s==='all'&&Object.values(D.missing).some(a=>a.includes(bstate.y)));
    $('#bq').innerHTML=(miss?`<div class="note" style="margin-bottom:12px">এই সালের কিছু প্রশ্ন স্ক্যান করা প্রশ্নব্যাংকে নেই (অনুপস্থিত পৃষ্ঠা)। যা আছে সব এখানে।</div>`:'')+(html||'<div class="card empty"><b>এই সাল ও বিষয়ের প্রশ্ন স্ক্যানে নেই</b>প্রশ্নব্যাংকের এই পৃষ্ঠাগুলো অনুপস্থিত।</div>');
    renderMath($('#bq'));
    app.querySelectorAll('[data-by]').forEach(b=>b.classList.toggle('on',b.dataset.by===bstate.y));
    app.querySelectorAll('[data-bs]').forEach(b=>b.classList.toggle('on',b.dataset.bs===bstate.s));
  };
  app.innerHTML=`<div class="fade">
    <div class="crumbs"><a href="#/">হোম</a> › প্রশ্নব্যাংক</div>
    <div class="eyebrow">MIST লিখিত · ২০১৫-১৬ → ২০২৩-২৪ · ${bn(BANK.length)}টি আসল প্রশ্ন</div>
    <h1>প্রশ্নব্যাংক</h1>
    <p class="lede">প্রতিটি প্রশ্ন টাইপ করা — নিজে করো, তারপর “উত্তর দেখো” চেপে ধাপে ধাপে সমাধান মিলাও। অধ্যায়ের নাম চাপলে সেই অধ্যায়ের রিভিশন পাতায় যাবে।</p>
    <section class="sec">
      <div class="row sticky" style="flex-direction:column;align-items:stretch;gap:8px">
        <div class="row">${years.map(y=>`<button class="chip" data-by="${y}">${bn(y)} <span style="opacity:.7">${bn(doneY(y))}/${bn(BANK.filter(it=>it.y===y).length)}</span></button>`).join('')}</div>
        <div class="row"><button class="chip" data-bs="all">সব বিষয়</button>${['Phy','Chem','Math'].map(s=>`<button class="chip" data-bs="${s}">${SUBJ[s]}</button>`).join('')}</div>
      </div>
      <div id="bq"></div>
    </section></div>`;
  paint();
  app.querySelectorAll('[data-by]').forEach(b=>b.onclick=()=>{bstate.y=b.dataset.by;paint();window.scrollTo(0,0)});
  app.querySelectorAll('[data-bs]').forEach(b=>b.onclick=()=>{bstate.s=b.dataset.bs;paint()});
  app.onclick=e=>{
    const pg=e.target.closest('[data-pg]');if(pg){openLB(+pg.dataset.pg);return}
    const im=e.target.closest('.qfig,.sfig');if(im){openImg(im.currentSrc||im.src,im.alt);return}
    const act=e.target.closest('[data-act]');if(act)qAction(act);
  };
}

/* priority map */
function mapPage(){
  const st={sub:'all',tier:0,rev:false};
  const paint=()=>{
    const list=allChapters().filter(c=>(st.sub==='all'||c.sub===st.sub)&&(!st.tier||c.tier===st.tier)&&(!st.rev||c.rev)).sort((a,b)=>b.score-a.score);
    $('#ml').innerHTML=chHead+list.map(c=>chapterRow(c,true)).join('');
    app.querySelectorAll('[data-s]').forEach(b=>b.classList.toggle('on',b.dataset.s===st.sub));
    app.querySelectorAll('[data-t]').forEach(b=>b.classList.toggle('on',+b.dataset.t===st.tier));
    $('#mrev').classList.toggle('on',st.rev);
    $('#mc').textContent=bn(list.length)+'টি অধ্যায়';
  };
  app.innerHTML=`<div class="fade">
    <div class="crumbs"><a href="#/">হোম</a> › গুরুত্ব তালিকা</div>
    <div class="eyebrow">৯টি প্রশ্নপত্র · ২৩৪টি প্রশ্ন · ৫টি মডেল টেস্ট</div>
    <h1>অধ্যায়ভিত্তিক গুরুত্ব তালিকা</h1>
    <p class="lede">জয়কলি প্রশ্নব্যাংকের ২০১৫-১৬ থেকে ২০২৩-২৪ এর সব প্রশ্ন ও ৫টি মডেল টেস্ট অধ্যায় ধরে মাপা। পূর্ণ সিলেবাসের অধ্যায়গুলো শুধু সেই বছরগুলোর প্রশ্নপত্র দিয়ে মাপা হয়েছে যখন সেগুলো সিলেবাসে ছিল।</p>
    <section class="sec">
      <div class="mfilters"><button class="chip" data-s="all">সব বিষয়</button>${['Phy','Chem','Math'].map(s=>`<button class="chip" data-s="${s}">${SUBJ[s]}</button>`).join('')}<span class="sp"></span>${[1,2,3,4].map(t=>`<button class="chip" data-t="${t}">স্তর ${bn(t)}</button>`).join('')}<button class="chip" data-t="0">সব স্তর</button><button class="chip" id="mrev">রিভিশন আছে</button><span class="muted" id="mc"></span></div>
      <div class="card"><div class="tbl" id="ml"></div></div>
      <div class="card pad method"><b>র‍্যাংকিং যেভাবে হয়েছে:</b> ৮৫% আসল প্রশ্নপত্র, ১৫% মডেল টেস্ট। স্কোর = প্রতি প্রশ্নপত্রে গড় ৫৫% + যোগ্য প্রশ্নপত্রগুলোর কতটিতে এসেছে ৩০% + মডেল টেস্টে কতবার এসেছে ১৫%। প্রতিটি অংশ ঐ বিষয়ের সর্বোচ্চ অধ্যায়ের সাপেক্ষে মাপা। স্তর-১: ৬০+, স্তর-২: ৪০–৬০, স্তর-৩: ২০–৪০, স্তর-৪: ২০ এর নিচে। “প্রশ্নপত্রে আসেনি” অংশ শেষে পড়বে, কিন্তু বাদ দেবে না — MIST পুরো সিলেবাস থেকে প্রশ্ন করে।</div>
    </section></div>`;
  paint();
  app.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{st.sub=b.dataset.s;paint()});
  app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{st.tier=+b.dataset.t;paint()});
  $('#mrev').onclick=()=>{st.rev=!st.rev;paint()};
}

function notFound(){app.innerHTML=`<div class="card empty"><b>পাতাটি পাওয়া যায়নি</b><a class="btn primary" href="#/">হোমে ফিরে যাও</a></div>`}

/* router */
function route(){
  const h=decodeURIComponent(location.hash.replace(/^#/,'')||'/');
  const [,a,b]=h.split('/');
  const rest=h.split('/').slice(2).join('/');
  app.onclick=null;
  document.querySelectorAll('#nav a').forEach(x=>x.classList.remove('on'));
  let nav='home';
  if(a==='s'){nav=b;subjectPage(b)}
  else if(a==='c'){const c=findCh(rest);nav=c?c.sub:'home';chapterPage(rest)}
  else if(a==='bank'){nav='bank';bankPage()}
  else if(a==='map'){nav='map';mapPage()}
  else home();
  const el=document.querySelector(`#nav a[data-r="${nav}"]`);if(el)el.classList.add('on');
  window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);
route();
})();
