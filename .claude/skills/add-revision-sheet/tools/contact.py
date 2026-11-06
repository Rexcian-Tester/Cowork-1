from PIL import Image,ImageDraw
import json,sys
C=json.load(open('cards.json'))
TW=280
for k in sys.argv[1:]:
    th=[]
    for i,c in enumerate(C[k]):
        im=Image.open(f'pg/{k}/p{c["page"]:02d}.jpg').crop((50,c['s'],1350,c['e']))
        sc=TW/1300; t=im.resize((TW,int(im.height*sc))); d=ImageDraw.Draw(t)
        if c['sp'] is not None: d.line((0,c['sp']*sc,TW,c['sp']*sc),fill=(255,0,0),width=3)
        d.text((4,4),str(i+1),fill=(255,0,255)); th.append(t)
    cols=8; rows=[th[i:i+cols] for i in range(0,len(th),cols)]
    H=sum(max(x.height for x in r)+6 for r in rows); M=Image.new('RGB',(cols*(TW+6),H),(90,90,90)); y=0
    for r in rows:
        for j,t in enumerate(r): M.paste(t,(j*(TW+6),y))
        y+=max(x.height for x in r)+6
    M.save(f'cs_{k}.jpg',quality=70); print(k,M.size)
