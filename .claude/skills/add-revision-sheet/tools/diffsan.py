from PIL import Image, ImageDraw, ImageFilter
import json,shutil
X={18:[(212,240,119)],45:[(447,476,141)],50:[(303,332,137)]}
meta=json.load(open('out/diff.json'))
for c in meta:
    n=c['n']
    if n not in (13,18,36,45,50): continue
    src=f'out/diff/c{n:02d}_q.jpg'
    full=f'out/diff/c{n:02d}_full.jpg'
    im=Image.open(src).convert('RGB'); im.save(full,quality=82)
    # full card = q + a stacked
    a=Image.open(f'out/diff/c{n:02d}_a.jpg')
    f=Image.new('RGB',(1300,im.size[1]+a.size[1]),'white'); f.paste(im,(0,0)); f.paste(a,(0,im.size[1])); f.save(full,quality=82)
    px=im.load(); W,H=im.size; d=ImageDraw.Draw(im)
    gy=set()
    for y in range(60,H):
        for x in range(W):
            p=px[x,y]
            if p[1]-p[0]>15 and p[1]>p[2]:
                l=0.3*p[0]+0.59*p[1]+0.11*p[2]; v=int(max(0,255-(255-l)*1.45)); px[x,y]=(v,v,min(255,v+4)); gy.add(y)
    # green band -> remove trailing check
    if gy:
        a0,b0=min(gy),max(gy)
        L=im.convert('L').load()
        cols=[x for x in range(W) if any(L[x,y]<150 for y in range(a0,b0+1))]
        cl=[]
        for x in cols:
            if cl and x-cl[-1][1]<=7: cl[-1][1]=x
            else: cl.append([x,x])
        print(n,'green band',a0,b0,cl[-3:])
        if len(cl)>=2 and cl[-1][1]-cl[-1][0]<30: d.rectangle((cl[-1][0]-3,a0-3,cl[-1][1]+3,b0+3),fill='white')
        box=(40,a0-2,W,b0+3); r=im.crop(box)
        r2=r.resize((r.size[0]*3,r.size[1]*3),Image.LANCZOS).filter(ImageFilter.MaxFilter(3)).resize(r.size,Image.LANCZOS)
        im.paste(r2,box[:2]); px=im.load()
    for (a1,b1,x1) in X.get(n,[]): d.rectangle((x1-3,a1-3,W,b1+3),fill='white')
    im.save(src,quality=82)
    c['mcq']=True; c['full']=f'rev/diff/c{n:02d}_full.jpg'
json.dump(meta,open('out/diff.json','w'))
