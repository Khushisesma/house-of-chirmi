import os
from PIL import Image, ImageDraw, ImageFont


def load_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


INK = (20, 16, 14)
PAPER = (231, 224, 210)
SCARLET = (195, 39, 43)

serif_candidates = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf",
]


def seed(draw, cx, cy, r):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=SCARLET)
    er = r * 0.38
    # off-centre eye (top 12% / left 26% of the bounding box)
    ex = cx - r + (0.26 * 2 * r) + er
    ey = cy - r + (0.12 * 2 * r) + er
    draw.ellipse([ex - er, ey - er, ex + er, ey + er], fill=INK)


# ---- og.jpg 1200x630 ----
og = Image.new("RGB", (1200, 630), INK)
d = ImageDraw.Draw(og)
font = load_font(serif_candidates, 84)
text = "House of Chirmi"
bbox = d.textbbox((0, 0), text, font=font)
tw = bbox[2] - bbox[0]
th = bbox[3] - bbox[1]
d.text(((1200 - tw) / 2, (630 - th) / 2 - 10), text, font=font, fill=PAPER)
seed(d, 600, 200, 26)
og.save("/app/frontend/public/og.jpg", "JPEG", quality=88)

# ---- apple-touch-icon.png 180x180 ----
icon = Image.new("RGB", (180, 180), INK)
di = ImageDraw.Draw(icon)
seed(di, 90, 90, 74)
icon.save("/app/frontend/public/apple-touch-icon.png", "PNG")

print("assets written")
