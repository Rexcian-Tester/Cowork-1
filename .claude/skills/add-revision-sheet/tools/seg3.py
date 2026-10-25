from PIL import Image
import glob,sys,json
def feats(px,W,y):
    best=0;run=0;tr=0;prev=False;n=0
    for x in range(20,W-20,1):
        nw=sum(px[x,y])<740
        if nw: run+=1;n+=1
        else: run=0
        if run>best: best=run
        if nw!=prev: tr+=1
        prev=nw
    dark=any(sum(px[x,y])<450 for x in range(20,W-20,2))
    return best,tr,n,dark
def runs(ys,gap=2):
    out=[]
    for y in ys:
        if out and y-out[-1][1]<=gap: out[-1][1]=y
        else: out.append([y,y])
    return out
def page(f):
    im=Image.open(f).convert('RGB'); px=im.load(); W,H=im.size
    F=[feats(px,W,y) for y in range(H)]
    solid=[r for r in runs([y for y in range(H) if F[y][0]>1240],6) if r[1]-r[0]<=5]
    dash=[r for r in runs([y for y in range(H) if F[y][1]>=240 and 550<F[y][2]<1100 and not F[y][3]]) if r[1]-r[0]<=5]
    ink=[y for y in range(H) if F[y][2]>0]
    return solid,dash,ink,H
def seg(d,skip_title=True):
    cards=[];open_=False
    for i,f in enumerate(sorted(glob.glob(f'{d}/p*.jpg'))):
        solid,dash,ink,H=page(f)
        cuts=[(r[0],r[1]) for r in solid]
        if i==0 and skip_title: start=cuts[0][1]+1; cuts=cuts[1:]
        else: start=0
        bounds=[start]+[c for r in cuts for c in r]+[H]
        regs=[(bounds[k]+ (1 if k else 0),bounds[k+1]-1) for k in range(0,len(bounds),2)]
        for a,b in regs:
            iy=[y for y in ink if a+2<=y<=b-2 and not any(r[0]-2<=y<=r[1]+2 for r in solid)]
            if not iy: continue
            a2,b2=iy[0],iy[-1]
            ds=[r[0] for r in dash if a2<=r[0]<=b2]
            closed= b<H-1
            cards.append(dict(f=f,a=a2,b=b2,dash=ds,closed=closed))
    return cards
if __name__=='__main__':
    d=sys.argv[1]; c=seg(d); json.dump(c,open(d+'_seg.json','w'))
    for x in c: print(x['f'],x['a'],x['b'],x['dash'],x['closed'])
