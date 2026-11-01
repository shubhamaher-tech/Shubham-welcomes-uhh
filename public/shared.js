/* shared.js — runs on all portfolio pages */

/* ─── CURSOR ─────────────────────────────── */
/* ─── CURSOR ─────────────────────────────── */
const cDot=document.getElementById('c-dot'),cRing=document.getElementById('c-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cDot.style.left=mx+'px';cDot.style.top=my+'px';});
(function trail(){rx+=(mx-rx)*.13;ry+=(my-ry)*.13;cRing.style.left=rx+'px';cRing.style.top=ry+'px';requestAnimationFrame(trail);})();
// Cursor trails
const trails=[];for(let i=0;i<6;i++){const t=document.createElement('div');t.className='cursor-trail';document.body.appendChild(t);trails.push({el:t,x:0,y:0,op:.4-i*.06});}
let trailPositions=Array(6).fill({x:0,y:0});
document.addEventListener('mousemove',e=>{trailPositions=[{x:e.clientX,y:e.clientY},...trailPositions.slice(0,5)];});
(function animTrails(){trails.forEach((t,i)=>{const p=trailPositions[i]||{x:0,y:0};t.el.style.left=p.x+'px';t.el.style.top=p.y+'px';t.el.style.opacity=t.op;t.el.style.transform=`translate(-50%,-50%) scale(${1-i*.12})`;});requestAnimationFrame(animTrails);})();
document.querySelectorAll('a,button,.sk,.chip,.tl-item,.proj-card').forEach(el=>{el.addEventListener('mouseenter',()=>cRing.classList.add('hover'));el.addEventListener('mouseleave',()=>cRing.classList.remove('hover'));});


/* ─── MAIN BG CANVAS ─────────────────────── */
/* ─── MAIN BG CANVAS ─────────────────────── */
(function(){
  const c=document.getElementById('bg-canvas'),ctx=c.getContext('2d');
  let W,H,t=0,mx=window.innerWidth/2,my=window.innerHeight/2;
  const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
  resize();window.addEventListener('resize',resize);
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});

  const stars=Array.from({length:180},()=>({x:Math.random()*4000,y:Math.random()*4000,r:.4+Math.random()*1.2,op:.1+Math.random()*.4,tw:1+Math.random()*4}));
  const particles=Array.from({length:60},()=>({x:Math.random()*3000,y:Math.random()*3000,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:.4+Math.random()*1.1,h:Math.random()<.5?250:190,op:.06+Math.random()*.2}));
  const blobs=[{bx:.15,by:.2,r:.42,c:[123,47,255]},{bx:.82,by:.58,r:.36,c:[0,212,255]},{bx:.52,by:.88,r:.3,c:[255,59,154]},{bx:.88,by:.18,r:.26,c:[123,47,255]}];

  function draw(){
    ctx.clearRect(0,0,W,H);
    // Mouse parallax offset
    const ox=(mx/W-.5)*.02,oy=(my/H-.5)*.02;
    blobs.forEach((b,i)=>{
      const bx=(b.bx+Math.sin(t*.0003+i*1.5)*0.06+ox)*W;
      const by=(b.by+Math.cos(t*.00022+i*.9)*0.06+oy)*H;
      const gr=b.r*Math.max(W,H);
      const g=ctx.createRadialGradient(bx,by,0,bx,by,gr);
      g.addColorStop(0,`rgba(${b.c},.09)`);g.addColorStop(1,`rgba(${b.c},0)`);
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    });
    stars.forEach(s=>{
      const sx=(s.x+t*.1)%W,sy=s.y%H;
      const f=.65+.35*Math.sin(t*.018*s.tw+s.x*.01);
      ctx.beginPath();ctx.arc(sx,sy,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,220,255,${s.op*f})`;ctx.fill();
    });
    particles.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0)p.x=W;if(p.x>W)p.x=0;
      if(p.y<0)p.y=H;if(p.y>H)p.y=0;
      const f=.55+.45*Math.sin(t*.012+p.x*.008);
      ctx.beginPath();ctx.arc(p.x%W,p.y%H,p.r,0,Math.PI*2);
      ctx.fillStyle=`hsla(${p.h},80%,75%,${p.op*f})`;ctx.fill();
    });
    t++;requestAnimationFrame(draw);
  }draw();
})();

/* ─── SCROLL PROGRESS + NAV ──────────────── */
window.addEventListener('scroll',()=>{
  const s=document.documentElement.scrollTop;
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const prog=document.getElementById('prog');if(prog)prog.style.width=(s/max*100)+'%';
  const nb=document.getElementById('navbar');if(nb)nb.classList.toggle('scrolled',s>60);
});

/* ─── SCROLL REVEAL ──────────────────────── */
const io=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on');});},{threshold:.1});
document.querySelectorAll('.rv,.rl,.rr').forEach(el=>io.observe(el));

/* ─── COUNTER ANIMATION ──────────────────── */
const cntIO=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const el=e.target;const target=+el.dataset.count;
    let cur=0;const step=Math.ceil(target/30);
    const iv=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(iv);}el.textContent=cur+'+';},40);
    cntIO.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('.stat-num[data-count]').forEach(el=>cntIO.observe(el));

/* ─── NAV HAMBURGER ──────────────────────── */
const _ham=document.getElementById('hamburger'),_nl=document.getElementById('navLinks');
if(_ham&&_nl){
  _ham.addEventListener('click',()=>{_nl.classList.toggle('open');_ham.innerHTML=_nl.classList.contains('open')?'<i class="fas fa-times"></i>':'<i class="fas fa-bars"></i>';});
  document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{_nl.classList.remove('open');_ham.innerHTML='<i class="fas fa-bars"></i>';}));
}

/* ─── RIPPLE ─────────────────────────────── */
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const w=btn.querySelector('.rw');if(!w)return;
    const r=document.createElement('span');r.className='rc';
    const rect=btn.getBoundingClientRect();const sz=Math.max(rect.width,rect.height);
    r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px`;
    w.appendChild(r);setTimeout(()=>r.remove(),700);
  });
});

/* ─── MAGNETIC BUTTONS ───────────────────── */
document.querySelectorAll('.btn-p').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{
    const r=btn.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)*.22,dy=(e.clientY-r.top-r.height/2)*.22;
    btn.style.transform=`translate(${dx}px,${dy}px) scale(1.04)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';});
});

/* ─── 3D TILT CARDS ──────────────────────── */
document.querySelectorAll('.proj-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const r=card.getBoundingClientRect();
    const rx=((e.clientY-r.top)/r.height-.5)*14;
    const ry=(-(e.clientX-r.left)/r.width+.5)*14;
    card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    card.style.transition='transform .1s ease';
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform='perspective(800px) rotateX(0) rotateY(0) scale(1)';
    card.style.transition='transform .5s var(--spring)';
  });
});

/* ─── SKILL CARD RIPPLE ──────────────────── */
document.querySelectorAll('.sk').forEach(sk=>{
  sk.addEventListener('click',e=>{
    const r=document.createElement('div');
    r.style.cssText=`position:absolute;border-radius:50%;background:rgba(0,212,255,.2);
      width:80px;height:80px;transform:translate(-50%,-50%) scale(0);
      left:${e.offsetX}px;top:${e.offsetY}px;pointer-events:none;
      animation:ripout .5s ease forwards;`;
    sk.style.position='relative';sk.style.overflow='hidden';
    sk.appendChild(r);setTimeout(()=>r.remove(),600);
  });
});

/* ─── CURSOR HOVER STATES ────────────────── */
const _cRing=document.getElementById('c-ring');
if(_cRing){
  document.querySelectorAll('a,button,.sk,.chip,.tl-item,.proj-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>_cRing.classList.add('hover'));
    el.addEventListener('mouseleave',()=>_cRing.classList.remove('hover'));
  });
}
