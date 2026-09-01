"""Generate public/og.png — 1200×630 share card."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
PAPER = (0xE8, 0xE6, 0xE1)
INK = (0x0D, 0x1F, 0x33)
OUT = Path(__file__).resolve().parents[1] / "public" / "og.png"

GEORGIA = "/System/Library/Fonts/Supplemental/Georgia.ttf"
ARIAL = "/System/Library/Fonts/Supplemental/Arial.ttf"


def mix(a: tuple[int, int, int], b: tuple[int, int, int], t: float):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def tracked_width(font: ImageFont.FreeTypeFont, text: str, extra: float) -> float:
    return sum(font.getlength(ch) for ch in text) + extra * (len(text) - 1)


def draw_tracked(
    draw: ImageDraw.ImageDraw,
    text: str,
    font: ImageFont.FreeTypeFont,
    cx: float,
    y: float,
    fill: tuple[int, int, int],
    extra: float,
) -> None:
    x = cx - tracked_width(font, text, extra) / 2
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += font.getlength(ch) + extra


def main() -> None:
    img = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(img)

    scale = 92 / 72
    mark_w, mark_h = 72 * scale, 92 * scale
    word_size, studio_size = 72, 18
    gap_mark, gap_word = 28, 16

    serif = ImageFont.truetype(GEORGIA, word_size)
    sans = ImageFont.truetype(ARIAL, studio_size)

    word_extra = 0.18 * word_size
    studio_extra = 0.46 * studio_size
    word_h = serif.getbbox("YOPHI")[3] - serif.getbbox("YOPHI")[1]
    studio_h = sans.getbbox("STUDIO")[3] - sans.getbbox("STUDIO")[1]

    stack_h = mark_h + gap_mark + word_h + gap_word + studio_h
    top = (H - stack_h) / 2
    ox = (W - mark_w) / 2
    oy = top

    def pt(x: float, y: float) -> tuple[float, float]:
        return (ox + x * scale, oy + y * scale)

    draw.polygon([pt(10, 12), pt(40, 20), pt(40, 74), pt(10, 82)], fill=INK)
    frame = [pt(40, 18), pt(64, 14), pt(64, 80), pt(40, 76)]
    draw.line(
        frame + [frame[0]],
        fill=INK,
        width=max(2, round(2.4 * scale)),
        joint="miter",
    )

    word_y = oy + mark_h + gap_mark
    draw_tracked(draw, "YOPHI", serif, W / 2, word_y, INK, word_extra)

    studio_y = word_y + word_h + gap_word
    studio_fill = mix(PAPER, INK, 0.7)
    draw_tracked(draw, "STUDIO", sans, W / 2, studio_y, studio_fill, studio_extra)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT}")


if __name__ == "__main__":
    main()
