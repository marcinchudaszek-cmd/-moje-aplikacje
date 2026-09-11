"""Podmienia domyślne ikony Capacitora na ikony gier.

`npx cap add android` wstawia własną ikonę (biały znak Capacitora), więc bez
tego kroku wszystkie trzy nowe APK wyglądają na ekranie telefonu identycznie.

Generuje komplet, którego oczekuje Android:
  mipmap-*dpi/ic_launcher.png          — ikona klasyczna
  mipmap-*dpi/ic_launcher_round.png    — wariant okrągły (starsze launchery)
  mipmap-*dpi/ic_launcher_foreground.png — warstwa adaptacyjna
  values/ic_launcher_background.xml    — kolor tła warstwy adaptacyjnej
  drawable*/splash.png                 — ekran startowy

Warstwa adaptacyjna ma 108 dp, ale launcher przycina ją do 72 dp w środku,
więc znak zajmuje tam ~60% szerokości — inaczej Android obcina mu brzegi.

Uruchom:  python scripts/ikony-android.py
"""
import os

from PIL import Image

PROJEKTY = r"C:\Users\marci\Desktop\Projekty"
STRONA = os.path.join(PROJEKTY, "moje-aplikacje-strona")

# projekt -> (ikona źródłowa, kolor tła adaptacyjnego i splasha)
GRY = {
    "gra dart": ("darts-master-icon.png", "#0B0F19"),
    "star wars gra": ("asteroids-icon.png", "#0A0A14"),
    "kolko-i-krzyzyk": ("tic-tac-toe-icon.png", "#0B1120"),
}

GESTOSCI = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
SPLASH = {"mdpi": 320, "hdpi": 480, "xhdpi": 720, "xxhdpi": 960, "xxxhdpi": 1280}

XML_TLA = """<?xml version="1.0" encoding="UTF-8"?>
<resources>
    <color name="ic_launcher_background">{kolor}</color>
</resources>
"""


def okragla(im: Image.Image) -> Image.Image:
    maska = Image.new("L", im.size, 0)
    from PIL import ImageDraw

    ImageDraw.Draw(maska).ellipse((0, 0, im.width - 1, im.height - 1), fill=255)
    wynik = im.copy()
    wynik.putalpha(maska)
    return wynik


for projekt, (plik, kolor) in GRY.items():
    zrodlo = os.path.join(STRONA, "img", "hi-res", plik)
    if not os.path.exists(zrodlo):
        zrodlo = os.path.join(STRONA, "img", plik)
    res = os.path.join(PROJEKTY, projekt, "android", "app", "src", "main", "res")
    if not os.path.isdir(res):
        print(f"POMINIETO {projekt}: brak {res}")
        continue

    ikona = Image.open(zrodlo).convert("RGBA")
    rgb = tuple(int(kolor[i : i + 2], 16) for i in (1, 3, 5))

    for gestosc, px in GESTOSCI.items():
        katalog = os.path.join(res, f"mipmap-{gestosc}")
        os.makedirs(katalog, exist_ok=True)
        mala = ikona.resize((px, px), Image.LANCZOS)
        mala.save(os.path.join(katalog, "ic_launcher.png"), "PNG", optimize=True)
        okragla(mala).save(os.path.join(katalog, "ic_launcher_round.png"), "PNG", optimize=True)

        # warstwa adaptacyjna: znak na 60% szerokości, reszta przezroczysta
        fg = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        znak = ikona.resize((int(px * 0.60), int(px * 0.60)), Image.LANCZOS)
        fg.alpha_composite(znak, ((px - znak.width) // 2, (px - znak.height) // 2))
        fg.save(os.path.join(katalog, "ic_launcher_foreground.png"), "PNG", optimize=True)

    with open(
        os.path.join(res, "values", "ic_launcher_background.xml"), "w", encoding="utf8"
    ) as f:
        f.write(XML_TLA.format(kolor=kolor))

    # splash: znak na jednolitym tle marki, zamiast logo Capacitora
    for gestosc, bok in SPLASH.items():
        for katalog in (
            os.path.join(res, f"drawable-{gestosc}"),
            os.path.join(res, f"drawable-land-{gestosc}"),
            os.path.join(res, f"drawable-port-{gestosc}"),
        ):
            if not os.path.isdir(katalog):
                continue
            poziomo = "land" in katalog
            w, h = (bok, int(bok * 0.6)) if poziomo else (int(bok * 0.6), bok)
            plotno = Image.new("RGB", (w, h), rgb)
            z = min(w, h) // 3
            znak = ikona.resize((z, z), Image.LANCZOS)
            plotno.paste(znak, ((w - z) // 2, (h - z) // 2), znak)
            plotno.save(os.path.join(katalog, "splash.png"), "PNG", optimize=True)

    domyslny = os.path.join(res, "drawable", "splash.png")
    if os.path.exists(domyslny):
        plotno = Image.new("RGB", (480, 800), rgb)
        znak = ikona.resize((200, 200), Image.LANCZOS)
        plotno.paste(znak, (140, 300), znak)
        plotno.save(domyslny, "PNG", optimize=True)

    print(f"{projekt}: ikony + splash w kolorze {kolor}")
