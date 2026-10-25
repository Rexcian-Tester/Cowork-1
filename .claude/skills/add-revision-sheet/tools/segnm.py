from PIL import Image
import glob,json
cards=[]
for f in sorted(glob.glob('nm/p*.jpg')):
    im=Image.open(f).convert('RGB'); px=im.load(); W,H=im.size
    # find border column: x in 85..105 with most non-white
    bx=max(range(80,110),key=lambda x:sum(1 for y in range(0,H,3) if sum(px[x,y])<600))
    col=[sum(px[bx,y])<650 or sum(px[bx+1,y])<650 for y in range(H)]
    y=0;spans=[]
    while y<H:
        if col[y]:
            s=y
            while y<H and col[y]: y+=1
            if y-s>60: spans.append((s,y))
        y+=1
    for a,b in spans:
        a-=20;b+=20  # rounded corners
        fill=[y for y in range(a,b) if (lambda p:225<p[0]<250 and p[2]-p[0]>=3 and p[1]<=p[2])(px[bx+40,y])]
        st=None
        for y in fill:
            if all(y+k in set(fill) for k in range(0,30,5)): st=y;break
        cards.append(dict(f=f,a=a,b=b,dash=[st] if st else [],bx=bx))
        print(f,bx,a,b,st)
json.dump(cards,open('nm_seg.json','w'))
