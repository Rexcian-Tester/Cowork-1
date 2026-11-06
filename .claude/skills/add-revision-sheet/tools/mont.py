from PIL import Image, ImageOps, ImageDraw
import sys,glob
def trim(im):
    g=ImageOps.invert(im.convert('L')).point(lambda v:255 if v>25 else 0)
    b=g.getbbox(); return im.crop((max(0,b[0]-8),max(0,b[1]-8),min(im.width,b[2]+8),min(im.height,b[3]+8))) if b else im
out=sys.argv[1]; files=sys.argv[2:]
W=760; ims=[]
for f in files:
    im=trim(Image.open(f).convert('RGB')); im=im.resize((W,int(im.height*W/im.width))); ims.append((f,im))
cols=3; rows=(len(ims)+cols-1)//cols
rh=[max(i.height for _,i in ims[r*cols:(r+1)*cols]) for r in range(rows)]
M=Image.new('RGB',(W*cols+10*(cols-1),sum(rh)+10*(rows-1)),(120,120,120)); d=ImageDraw.Draw(M)
y=0
for r in range(rows):
    for c,(f,im) in enumerate(ims[r*cols:(r+1)*cols]):
        M.paste(im,(c*(W+10),y)); d.text((c*(W+10)+W-90,y+2),f.split('/')[-2]+f.split('/')[-1][:3],fill=(255,0,0))
    y+=rh[r]+10
M.save(out,quality=72)
print(M.size)
