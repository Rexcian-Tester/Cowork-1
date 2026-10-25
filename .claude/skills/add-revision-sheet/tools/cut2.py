from PIL import Image, ImageDraw
import json,sys,os
FILL=(224,244,233)
X0,X1=50,1350
def lum(p): return 0.3*p[0]+0.59*p[1]+0.11*p[2]
def isg(p): return p[1]-p[0]>30 and p[1]>p[2]+10 and p[1]<210
def sanitize(im,top=30):
    px=im.load(); W,H=im.size
    G=[[x for x in range(W) if isg(px[x,y])] for y in range(H)]
    rows=[y for y in range(top,H) if len(G[y])>250]
    cl=[]
    for y in rows:
        if cl and y-cl[-1][1]<=3: cl[-1][1]=y
        else: cl.append([y,y])
    if len(cl)<2: return None
    y0=cl[0][0]; y1=cl[1][1]
    if not 35<y1-y0<170: return ('BAD',cl)
    tx=G[cl[0][1]]; rr=[[tx[0],tx[0]]]
    for x in tx[1:]:
        if x-rr[-1][1]<=3: rr[-1][1]=x
        else: rr.append([x,x])
    tmin,tmax=max(rr,key=lambda r:r[1]-r[0])
    mid=G[(y0+y1)//2]
    L=[x for x in mid if tmin-25<=x<=tmin+5]; R=[x for x in mid if tmax-5<=x<=tmax+25]
    if not L or not R: return ('BAD','sides',tmin,tmax)
    x0=min(L); x1=max(R)
    m=7
    for y in range(y0+m,y1-m+1):
        for x in range(x0+m,x1-m+1):
            p=px[x,y]
            t=max(0.0,min(1.0,(lum(FILL)-lum(p))/(lum(FILL)-40)))
            q=[min(255,max(0,p[i]+(255-FILL[i])*(1-t))) for i in range(3)]; l=int(0.3*q[0]+0.59*q[1]+0.11*q[2]); l=int(l*0.85+ 255*0.15) if l<200 and False else l; px[x,y]=(255,255,255) if l>=238 else (l,l,l)
    d=ImageDraw.Draw(im)
    for (a,b,c,e) in [(x0-3,y0-3,x1+3,y0+m-1),(x0-3,y1-m+1,x1+3,y1+3),(x0-3,y0-3,x0+m-1,y1+3),(x1-m+1,y0-3,x1+3,y1+3)]:
        d.rectangle((a,b,c,e),fill=(255,255,255))
    bw,bh=x1-x0+1,y1-y0+1; K=4
    big=Image.new('RGBA',(bw*K,bh*K),(0,0,0,0)); bd=ImageDraw.Draw(big)
    bd.rounded_rectangle((0,0,bw*K-1,bh*K-1),radius=RAD*K,outline=(211,213,217,255),width=int(2.0*K))
    big=big.resize((bw,bh),Image.LANCZOS)
    im.paste(big,(x0,y0),big)
    cols=[]
    for x in range(x0+m,x1-m):
        if any(lum(px[x,y])<150 for y in range(y0+m,y1-m)): cols.append(x)
    cl=[]
    for x in cols:
        if cl and x-cl[-1][1]<=6: cl[-1][1]=x
        else: cl.append([x,x])
    if len(cl)>=2 and cl[-1][1]-cl[-1][0]<45:
        d.rectangle((cl[-1][0]-3,y0+m,cl[-1][1]+3,y1-m),fill=(255,255,255))
        return (x0,y0,x1,y1,cl[-1])
    return (x0,y0,x1,y1,'NO-CHECK',cl[-3:])
def run(d,key):
    seg=json.load(open(d+'_seg.json'))
    out=f'out/{key}'; os.makedirs(out,exist_ok=True); meta=[]
    for i,c in enumerate(seg,1):
        page=Image.open(c['f']).convert('RGB')
        dash=c['dash'][0]
        pa=c['a']-8 if d!='nm' else c['a']; pb=c['b']+8 if d!='nm' else c['b']
        q=page.crop((X0,pa,X1,dash-4)); a=page.crop((X0,dash+(5 if d!='nm' else -2),X1,pb))
        full=page.crop((X0,pa,X1,pb))
        qs=q.copy(); r=sanitize(qs)
        n=f'c{i:02d}'
        if r and r[0]=='BAD': print(n,'BAD',r); r=None
        if r:
            qs.save(f'{out}/{n}_q.jpg',quality=82); full.save(f'{out}/{n}_full.jpg',quality=82)
            print(n,'mcq',r)
        else:
            q.save(f'{out}/{n}_q.jpg',quality=82)
        a.save(f'{out}/{n}_a.jpg',quality=82)
        meta.append(dict(n=i,q=f'rev/{key}/{n}_q.jpg',a=f'rev/{key}/{n}_a.jpg',full=f'rev/{key}/{n}_full.jpg' if r else None,qs=list(q.size),**{'as':list(a.size)},mcq=bool(r)))
    json.dump(meta,open(f'out/{key}.json','w'))
RAD=int(sys.argv[3]) if len(sys.argv)>3 else 12
run(sys.argv[1],sys.argv[2])
