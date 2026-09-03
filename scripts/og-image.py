"""Generate public/og.png from the real lockup, 1200×630."""

from pathlib import Path

from PIL import Image

W, H = 1200, 630
ROOT = Path(__file__).resolve().parents[1]
LOCKUP = ROOT / "public" / "brand" / "yophi-lockup.png"
OUT = ROOT / "public" / "og.png"


def content_box(im: Image.Image, paper: tuple[int, int, int], tol: int = 16):
    px = im.load()
    w, h = im.size
    minx, miny, maxx, maxy = w, h, 0, 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 12:
                continue
            if (
                abs(r - paper[0]) > tol
                or abs(g - paper[1]) > tol
                or abs(b - paper[2]) > tol
            ):
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    return (minx, miny, maxx + 1, maxy + 1)


def main() -> None:
    lockup = Image.open(LOCKUP).convert("RGBA")
    paper = lockup.getpixel((0, 0))[:3]
    box = content_box(lockup, paper)
    pad = 48
    crop = (
        max(0, box[0] - pad),
        max(0, box[1] - pad),
        min(lockup.width, box[2] + pad),
        min(lockup.height, box[3] + pad),
    )
    mark = lockup.crop(crop)

    canvas = Image.new("RGB", (W, H), paper)
    max_h = int(H * 0.72)
    max_w = int(W * 0.52)
    scale = min(max_w / mark.width, max_h / mark.height)
    size = (max(1, int(mark.width * scale)), max(1, int(mark.height * scale)))
    placed = mark.resize(size, Image.Resampling.LANCZOS)
    x = (W - placed.width) // 2
    y = (H - placed.height) // 2
    canvas.paste(placed, (x, y), placed)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} {canvas.size}")


if __name__ == "__main__":
    main()
