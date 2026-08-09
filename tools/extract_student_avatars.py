from pathlib import Path
from collections import deque
from PIL import Image
import hashlib, json

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "Student Avater icons.jpg"
OUT = ROOT / "public" / "assets" / "generated" / "student-avatars"
OUT.mkdir(parents=True, exist_ok=True)

im = Image.open(SOURCE).convert("RGBA")
w, h = im.size
px = im.load()

# The supplied checkerboard is part of the JPG. Flood-fill only pale neutral pixels
# connected to the outer edge, preserving pale clothing and eyes inside each portrait.
eligible = [[False] * w for _ in range(h)]
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        eligible[y][x] = max(r, g, b) - min(r, g, b) < 24 and min(r, g, b) > 164

seen = bytearray(w * h)
q = deque()
for x in range(w):
    q.append((x, 0)); q.append((x, h - 1))
for y in range(h):
    q.append((0, y)); q.append((w - 1, y))
while q:
    x, y = q.popleft(); i = y * w + x
    if seen[i] or not eligible[y][x]:
        continue
    seen[i] = 1
    for nx, ny in ((x-1,y),(x+1,y),(x,y-1),(x,y+1)):
        if 0 <= nx < w and 0 <= ny < h:
            q.append((nx, ny))
for y in range(h):
    for x in range(w):
        if seen[y*w+x]:
            r,g,b,_ = px[x,y]
            px[x,y] = (r,g,b,0)

report=[]
for row in range(3):
    for col in range(6):
        i=row*6+col+1
        x0=round(col*w/6); x1=round((col+1)*w/6)
        y0=round(row*h/3); y1=round((row+1)*h/3)
        cell=im.crop((x0,y0,x1,y1))
        # Keep only the largest opaque connected component inside the source cell.
        # This removes any tiny remnant from the neighbouring row/column.
        ca=cell.getchannel("A"); cw,ch=cell.size; visited=bytearray(cw*ch); components=[]
        for sy in range(ch):
            for sx in range(cw):
                si=sy*cw+sx
                if visited[si] or ca.getpixel((sx,sy)) < 24: continue
                points=[]; cq=deque([(sx,sy)]); visited[si]=1
                while cq:
                    cx,cy=cq.popleft(); points.append((cx,cy))
                    for nx,ny in ((cx-1,cy),(cx+1,cy),(cx,cy-1),(cx,cy+1)):
                        ni=ny*cw+nx if 0<=nx<cw and 0<=ny<ch else -1
                        if ni>=0 and not visited[ni] and ca.getpixel((nx,ny))>=24:
                            visited[ni]=1; cq.append((nx,ny))
                components.append(points)
        keep=set(max(components,key=len))
        cp=cell.load()
        for cy in range(ch):
            for cx in range(cw):
                if (cx,cy) not in keep: cp[cx,cy]=(0,0,0,0)
        alpha=cell.getchannel("A")
        box=alpha.getbbox()
        if not box: raise RuntimeError(f"avatar {i} empty")
        subject=cell.crop(box)
        canvas=Image.new("RGBA",(256,256),(0,0,0,0))
        scale=min(218/subject.width,218/subject.height)
        subject=subject.resize((max(1,round(subject.width*scale)),max(1,round(subject.height*scale))),Image.Resampling.LANCZOS)
        canvas.alpha_composite(subject,((256-subject.width)//2,(256-subject.height)//2))
        path=OUT/f"avatar-{i:02}.png"; canvas.save(path)
        a=canvas.getchannel("A"); bbox=a.getbbox()
        report.append({"file":path.name,"bbox":bbox,"corners":[a.getpixel((0,0)),a.getpixel((255,0)),a.getpixel((0,255)),a.getpixel((255,255))],"hash":hashlib.sha256(path.read_bytes()).hexdigest()[:12]})

(OUT/"validation.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
sheet=Image.new("RGBA",(6*256,3*256),(232,250,247,255))
for idx in range(18):
    avatar=Image.open(OUT/f"avatar-{idx+1:02}.png").convert("RGBA")
    sheet.alpha_composite(avatar,((idx%6)*256,(idx//6)*256))
sheet.save(OUT/"contact-sheet.png")
print(json.dumps(report,indent=2))
