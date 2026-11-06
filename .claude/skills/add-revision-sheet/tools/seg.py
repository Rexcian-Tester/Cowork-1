from PIL import Image
import numpy as np,glob,json,sys
from lines import hlines
SHADE={'func':(240,243,249),'complex':(237,243,246),'gas':(237,240,246),'thermo':(231,240,249)}
def load(f): return np.asarray(Image.open(f).convert('RGB')).astype(int)
def boxed_cards(a):
    H,W,_=a.shape; nw=a[:,20:W-20].sum(2)<750
    blank=~nw.any(1); runs=[];s=None
    for y in range(H):
        if not blank[y] and s is None: s=y
        if blank[y] and s is not None: runs.append((s,y)); s=None
    if s is not None: runs.append((s,H))
    out=[]
    for s,e in runs:
        if e-s<150: continue
        bord=(a[s:e,40:150].sum(2)<750).any(1).mean()
        if bord>0.9: out.append((s,e))
    return out
def gap_cards(a,first):
    H,W,_=a.shape; blank=~(a[:,20:W-20].sum(2)<735).any(1)
    segs=[];s=None;gap=0
    for y in range(H):
        if not blank[y]:
            if s is None: s=y
            last=y; gap=0
        else:
            gap+=1
            if s is not None and gap>=45: segs.append((s,last+1)); s=None
    if s is not None: segs.append((s,last+1))
    out=[(max(0,s-10),min(H,e+10)) for s,e in segs if e-s>=150]
    if first: out=out[1:] if out and out[0][0]<200 else out
    return out
def rule_cards(a,first):
    H,W,_=a.shape
    L=hlines_arr(a)
    seps=[y for y,t,x0,x1,c in L if t<=6 and x0<=72 and x1>=1328]
    top=0
    if first:
        tt=[y+t for y,t,x0,x1,c in L if y<420 and x0<=72 and x1>=1328]
        top=tt[0] if tt else 0
        seps=[y for y in seps if y>top]
    bounds=[top]+seps+[H]; out=[]
    for i in range(len(bounds)-1):
        s,e=bounds[i]+4,bounds[i+1]-2
        if e-s<100: continue
        seg=a[s:e,20:W-20].sum(2)<735
        rows=np.where(seg.any(1))[0]
        if len(rows)==0: continue
        out.append((s+max(0,rows[0]-14),s+min(e-s,rows[-1]+16)))
    return out
def hlines_arr(a):
    import tempfile
    H,W,_=a.shape; nw=a.sum(2)<748; out=[]
    for y in range(H):
        d=np.diff(np.concatenate([[0],nw[y].astype(int),[0]])); s=np.where(d==1)[0]; e=np.where(d==-1)[0]
        if len(s)==0: continue
        i=np.argmax(e-s)
        if e[i]-s[i]>W*0.7: out.append((y,s[i],e[i]))
    g=[]
    for o in out:
        if g and o[0]-g[-1][-1][0]<=1: g[-1].append(o)
        else: g.append([o])
    return [(x[0][0],len(x),x[0][1],x[0][2],None) for x in g]
def shade_rows(c,col,tol=4):
    m=(np.abs(c-np.array(col)).max(2)<=tol).mean(1)
    return m>0.45
def split(k,c):
    H=c.shape[0]
    if k in SHADE:
        sr=shade_rows(c,SHADE[k]); ys=np.where(sr)[0]
        # runs
        runs=[];s=None
        for y in range(H):
            if sr[y] and s is None:s=y
            if not sr[y] and s is not None:
                if y-s>(8 if k=='complex' else 25): runs.append((s,y))
                s=None
        if s is not None and H-s>25: runs.append((s,H))
        if not runs: return None
        if k=='complex':
            e=runs[0][1]
            for r in runs[1:]:
                if r[0]-e<=60: e=r[1]
                else: break
            return e+12
        return runs[0][0]-14
    # dotted line
    nw=c[:,40:1360].sum(2)<748
    for y in range(60,H-5):
        if nw[y-4].sum()>30 or nw[y+4].sum()>30: continue
        r=nw[y]; t=np.count_nonzero(np.diff(r.astype(int)))
        if t>=260:
            xs=np.where(r)[0]
            if xs[-1]-xs[0]>1000: return y-6
    return None
def run(k):
    fs=sorted(glob.glob(f'pg/{k}/p*.jpg')); cards=[]
    for i,f in enumerate(fs):
        a=load(f)
        cs=rule_cards(a,i==0) if k in('statics','thermo') else gap_cards(a,i==0) if k=='qual' else boxed_cards(a)
        for s,e in cs:
            c=a[s:e]; sp=split(k,c)
            cards.append(dict(page=i+1,s=int(s),e=int(e),sp=None if sp is None else int(sp)))
    return cards
if __name__=='__main__':
    res={k:run(k) for k in sys.argv[1:]}
    json.dump(res,open('cards.json','w'))
    for k,v in res.items(): print(k,len(v),[ (c['page'],c['e']-c['s'],c['sp']) for c in v])
