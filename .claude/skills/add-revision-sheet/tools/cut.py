from PIL import Image,ImageDraw,ImageFilter
import numpy as np,json,os,sys
C=json.load(open('cards.json'))
OUT=sys.argv[1]
X0,X1=50,1350
def clusters(g,gap=6,thr=160):
    col=(g<thr).any(0); out=[];s=None;cnt=0;last=0
    for x in range(len(col)):
        if col[x]:
            if s is None:s=x
            last=x;cnt=0
        else:
            cnt+=1
            if s is not None and cnt>gap: out.append([s,last]); s=None
    if s is not None: out.append([s,last])
    return out
def text_lines(g,x0,x1,thr=160,mingap=3):
    rows=(g[:,x0:x1]<thr).any(1); out=[];s=None
    for y in range(len(rows)):
        if rows[y] and s is None: s=y
        if not rows[y] and s is not None:
            if y-s>=8: out.append([s,y])
            s=None
    return out
# ---- thermo
CIRC=None
_t=None
def tick_tmpl():
    global _t
    if _t is None:
        c=C['thermo'][0]; pg=Image.open('pg/thermo/p01.jpg').convert('L')
        cr=pg.crop((50+46,c['s']+243,50+71,c['s']+271)); _t=(np.asarray(cr)<150)
    return _t
def is_tick(g,x0,x1,y0,y1):
    t=tick_tmpl(); cr=Image.fromarray((g[y0:y1,x0:x1+1]).astype(np.uint8)).resize((t.shape[1],t.shape[0]))
    b=np.asarray(cr)<150; inter=(b&t).sum(); uni=(b|t).sum()
    return uni>0 and inter/uni>0.45
def thermo_fix(im,log):
    global CIRC
    g=np.asarray(im.convert('L')).astype(int); d=ImageDraw.Draw(im)
    for y0,y1 in text_lines(g,0,1300,thr=200):
        cl=clusters(g[y0:y1],thr=200)
        if not cl or not (42<=cl[0][0]<=53) or y0<50: continue   # option marker column (page x 90-110 => crop 40-60)
        w=cl[0][1]-cl[0][0]
        if w<=14 and CIRC is None: CIRC=im.crop((cl[0][0]-1,y0,cl[0][1]+2,y1)).copy()
        tk=18<=w<=34 and is_tick(g,cl[0][0],cl[0][1],y0,y1)
        if not(tk or w<=14): continue
        if tk:   # check mark
            d.rectangle((cl[0][0]-2,y0-1,cl[0][1]+2,y1+1),fill='white')
            log.append(('tick',y0))
            pend=(cl[0][0],y0,y1); im.info.setdefault('ticks',[]).append(pend)
        if len(cl)>=3 and 110<=cl[-1][1]-cl[-1][0]<=170 and cl[-2][1]-cl[-2][0]<=22 and cl[-1][0]-cl[-2][1]<=20:
            d.rectangle((cl[-2][0]-3,y0-2,cl[-1][1]+3,y1+2),fill='white'); log.append(('your',y0))
def thermo_paste(im):
    for x,y0,y1 in im.info.get('ticks',[]):
        if CIRC: im.paste(CIRC,(x+1,y0+(y1-y0-CIRC.height)//2))
# ---- green box
def green_fix(im,log,bold=False,yans=None):
    a=np.asarray(im).astype(int); r,g,b=a[...,0],a[...,1],a[...,2]
    fill=(g-r>=10)&(g-b>=4)&(g>215)
    rows=fill.sum(1)>250; runs=[];s=None
    for y in range(len(rows)):
        if rows[y] and s is None:s=y
        if not rows[y] and s is not None:
            if y-s>15: runs.append((s,y))
            s=None
    d=ImageDraw.Draw(im)
    for s,e in runs:
        xs=np.where(fill[s:e].any(0))[0]; x0,x1=xs[0],xs[-1]
        y0,y1=s-7,e+7; bx0,bx1=x0-7,x1+7
        sub=im.crop((bx0,y0,bx1+1,y1+1)); sa=np.asarray(sub).astype(int)
        l=(0.3*sa[...,0]+0.59*sa[...,1]+0.11*sa[...,2])
        L=np.clip((l-40)/(225-40),0,1); v=(255-(1-L)*(255-55))
        v[l>205]=255
        hh,ww=l.shape; yy,xx=np.mgrid[0:hh,0:ww]
        ring=(yy<13)|(yy>=hh-13)|(xx<13)|(xx>=ww-13)
        al=np.clip((240-l)/(240-130),0,1); rv=255-al*(255-212)
        v=np.where(ring,rv,v).astype(np.uint8)
        sub=Image.fromarray(np.stack([v,v,v],-1))
        sg=np.asarray(sub.convert('L')).astype(int)
        inner=sg[14:-14,20:-20]; cl=clusters(inner,gap=7)
        if len(cl)>=2 and cl[-1][1]-cl[-1][0]<40:
            ImageDraw.Draw(sub).rectangle((cl[-1][0]+20-3,12,cl[-1][1]+20+3,sub.height-13),fill='white')
        im.paste(sub,(bx0,y0))
        # wipe any leftover green halo just outside
        for yy in range(y0-3,y1+4):
            for xx in list(range(bx0-4,bx0+1))+list(range(bx1,bx1+5)):
                if not(0<=xx<im.width and 0<=yy<im.height): continue
                p=im.getpixel((xx,yy))
                if p[1]-p[0]>12: im.putpixel((xx,yy),(255,255,255))
        for xx in range(bx0-3,bx1+4):
            for yy in list(range(y0-4,y0+1))+list(range(y1,y1+5)):
                if not(0<=xx<im.width and 0<=yy<im.height): continue
                p=im.getpixel((xx,yy))
                if p[1]-p[0]>12: im.putpixel((xx,yy),(255,255,255))
        log.append(('green',s))
def gas_your(im,log):
    g=np.asarray(im.convert('L')).astype(int); d=ImageDraw.Draw(im)
    for y0,y1 in text_lines(g,60,1240):
        cl=clusters(g[y0:y1,60:1240])
        if len(cl)>=3:
            last=cl[-1]; prev=cl[-2]
            if 110<=last[1]-last[0]<=170 and prev[1]-prev[0]<=18 and last[0]-prev[1]<=16:
                d.rectangle((prev[0]+60-3,y0-2,last[1]+60+3,y1+2),fill='white'); log.append(('your',y0))
def run(k,key):
    os.makedirs(f'{OUT}/{key}',exist_ok=True); cards=[]
    for i,c in enumerate(C[k]):
        n=i+1; pg=Image.open(f'pg/{k}/p{c["page"]:02d}.jpg').convert('RGB')
        card=pg.crop((X0,c['s'],X1,c['e'])); sp=c['sp']
        q=card.crop((0,0,1300,sp)); a=card.crop((0,sp,1300,card.height))
        log=[]
        if k=='thermo': thermo_fix(q,log)
        if k in('gas','statics','qual'): green_fix(q,log,bold=(k=='gas'))
        if k=='gas': gas_your(q,log)
        mcq=bool(log)
        base=f'{OUT}/{key}/c{n:02d}'
        if k=='thermo' and mcq: pass
        cards.append(dict(n=n,q=q,a=a,card=card,mcq=mcq,log=log))
    if k=='thermo':
        for c in cards: thermo_paste(c['q'])
    res=[]
    for c in cards:
        n=c['n'];base=f'rev/{key}/c{n:02d}'
        c['q'].save(f'{OUT}/{base[4:]}_q.jpg',quality=80); c['a'].save(f'{OUT}/{base[4:]}_a.jpg',quality=80)
        full=None
        if c['mcq']: c['card'].save(f'{OUT}/{base[4:]}_full.jpg',quality=80); full=base+'_full.jpg'
        res.append(dict(n=n,q=base+'_q.jpg',a=base+'_a.jpg',full=full,qs=list(c['q'].size),**{'as':list(c['a'].size)},mcq=c['mcq']))
        if c['log']: print(key,n,c['log'])
    json.dump(res,open(f'{OUT}/{key}.json','w'))
    print(key,len(res))
for k in ['func','complex','statics','thermo','gas','qual']: run(k,k)
