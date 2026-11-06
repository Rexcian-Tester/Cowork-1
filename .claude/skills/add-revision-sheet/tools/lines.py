from PIL import Image
import numpy as np,sys,glob
def hlines(f,minfrac=0.7):
    a=np.asarray(Image.open(f).convert('RGB')).astype(int); H,W,_=a.shape
    nw=a.sum(2)<738
    out=[]
    for y in range(H):
        r=nw[y]
        # longest run
        d=np.diff(np.concatenate([[0],r.astype(int),[0]]))
        s=np.where(d==1)[0]; e=np.where(d==-1)[0]
        if len(s)==0: continue
        i=np.argmax(e-s)
        if e[i]-s[i]>W*minfrac: out.append((y,s[i],e[i],tuple(a[y,(s[i]+e[i])//2])))
    # group consecutive
    g=[]
    for o in out:
        if g and o[0]-g[-1][-1][0]<=1: g[-1].append(o)
        else: g.append([o])
    return [(x[0][0],len(x),x[0][1],x[0][2],x[0][3]) for x in g]
if __name__=='__main__':
    for f in sys.argv[1:]:
        print(f.split('/')[-2:],[(y,t,x0,x1,c) for y,t,x0,x1,c in hlines(f) if t<=6])
