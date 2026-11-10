"""Ujednolica ikony aplikacji na stronie (img/<nazwa>-icon.png, 192 px).

Strona sama przycina ikone do zaokraglonego kwadratu (.app-icon,
.wachlarz-karta img: border-radius + overflow hidden). Dlatego kazda ikona
musi byc pelnym kwadratem "do krawedzi":
  * ikony z wlasnymi zaokraglonymi rogami / marginesem -> kadr do kafla,
    a przezroczyste narozniki dopelnione kolorem z sasiedztwa (inaczej
    w rogach przeswituje kolor karty i wychodzi podwojne zaokraglenie),
  * ikony z ramka (czarna, biala) -> ramka obcieta,
  * ikony bez tla (sam rysunek) -> rysunek na nowym kaflu z gradientem.

Zrodla: oryginaly w img/hi-res/ (nie sa zmieniane). Wynik: img/<nazwa>-icon.png.
Uruchom:  python scripts/ikony-ujednolic.py   (z katalogu repo strony)
"""
import glob
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

TU = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(TU, '..', 'img')
HIRES = os.path.join(IMG, 'hi-res')
ROZMIAR = 192
ROBOCZY = 512

# ikony z ramka w kolorze tla pliku: obcinamy wszystko, co ma ten kolor przy krawedzi
RAMKA = {'plantcare-icon.png', 'toonblast-icon.png', 'deutsch-lernen-icon.png'}

# ikony z polprzezroczystym wnetrzem, projektowane pod ciemne tlo:
# kladziemy je na jednolitym kolorze tla ikony (rozlewanie koloru robi z nich plame)
PODKLAD = {'musicstudio-pro-icon.png': (8, 8, 15)}

# sam rysunek bez tla -> nowy kafel: (gradient od, do, wielkosc rysunku, usun biale tlo)
KAFEL = {
    'discarchiver-icon.png': ('#0f172a', '#1e3a8a', 0.80, False),
    'voice-cloner-icon.png': ('#0b3d47', '#11998e', 0.74, False),
    'volleystats-icon.png': ('#1e3a8a', '#2563eb', 0.72, False),
    'dart-score-pro-icon.png': ('#111827', '#374151', 0.88, True),
}


def hex2rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def gradient(s, od, do):
    """Gradient po przekatnej (135deg, jak w CSS kart): lewy gorny -> prawy dolny."""
    a, b = np.array(hex2rgb(od), np.float32), np.array(hex2rgb(do), np.float32)
    y, x = np.mgrid[0:s, 0:s].astype(np.float32)
    t = ((x + y) / (2 * (s - 1)))[..., None]
    rgb = a * (1 - t) + b * t
    # delikatne swiatlo z gory, jak na pozostalych ikonach
    swiatlo = np.clip(1 - y / (s * 0.9), 0, 1)[..., None] * 18
    rgb = np.clip(rgb + swiatlo, 0, 255).astype(np.uint8)
    return Image.fromarray(rgb, 'RGB').convert('RGBA')


def dopelnij(im):
    """Przezroczyste piksele wypelnia kolorem rozlanym z sasiedztwa."""
    a = np.asarray(im, np.float32)
    alfa = a[..., 3:4] / 255.0
    pre = a[..., :3] * alfa
    tlo = None
    for r in (6, 18, 48):
        p = Image.fromarray(np.clip(pre, 0, 255).astype(np.uint8), 'RGB').filter(ImageFilter.GaussianBlur(r))
        m = Image.fromarray((alfa[..., 0] * 255).astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(r))
        pn = np.asarray(p, np.float32)
        mn = np.asarray(m, np.float32)[..., None] / 255.0
        kol = pn / np.maximum(mn, 1e-3)
        if tlo is None:
            tlo, waga = kol, mn
        else:  # tam, gdzie mniejszy promien nic nie dal, bierz wiekszy
            tlo = np.where(waga > 0.02, tlo, kol)
            waga = np.maximum(waga, mn)
    tlo = np.clip(tlo, 0, 255)
    out = tlo * (1 - alfa) + a[..., :3] * alfa
    return Image.fromarray(out.astype(np.uint8), 'RGB').convert('RGBA')


def usun_biale_tlo(im):
    """Biale tlo polaczone z krawedzia -> przezroczyste (wnetrze rysunku zostaje)."""
    rgb = im.convert('RGB')
    w, h = rgb.size
    znacznik = (255, 0, 255)
    for xy in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)):
        ImageDraw.floodfill(rgb, xy, znacznik, thresh=40)
    a = np.asarray(rgb)
    tlo = (a[..., 0] == 255) & (a[..., 1] == 0) & (a[..., 2] == 255)
    alfa = Image.fromarray(np.where(tlo, 0, 255).astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(0.7))
    out = im.convert('RGBA')
    out.putalpha(alfa)
    return out


def kadr_bez_ramki(im):
    """Obcina ramke w kolorze naroznika (pas jednolitego koloru przy krawedzi)."""
    a = np.asarray(im.convert('RGB'), np.int32)
    rog = a[2, 2]
    inne = np.abs(a - rog).sum(axis=2) > 60
    ys, xs = np.where(inne)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    bok = max(x1 - x0, y1 - y0)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    # kafel wewnatrz ramki ma zwykle zaokraglone rogi w kolorze ramki ->
    # dopelniamy je jak przezroczystosc
    kad = im.convert('RGBA').crop((int(cx - bok / 2), int(cy - bok / 2),
                                   int(cx + bok / 2), int(cy + bok / 2)))
    k = np.asarray(kad, np.int32).copy()
    ramka = np.abs(k[..., :3] - rog).sum(axis=2) <= 60
    # tylko piksele ramki polaczone z naroznikami, nie srodek rysunku
    maska = Image.fromarray(np.where(ramka, 255, 0).astype(np.uint8), 'L')
    zal = Image.new('L', maska.size, 0)
    for xy in ((0, 0), (maska.width - 1, 0), (0, maska.height - 1), (maska.width - 1, maska.height - 1)):
        if maska.getpixel(xy) == 255:
            tmp = maska.copy()
            ImageDraw.floodfill(tmp, xy, 128)
            zal = Image.fromarray(np.maximum(np.asarray(zal), np.where(np.asarray(tmp) == 128, 255, 0)).astype(np.uint8))
    k[..., 3] = np.where(np.asarray(zal) == 255, 0, k[..., 3])
    return dopelnij(Image.fromarray(k.astype(np.uint8), 'RGBA'))


def kadr_alfa(im):
    """Ikona z przezroczystym marginesem / rogami -> kadr do kafla + dopelnienie."""
    im = im.convert('RGBA')
    alfa = im.split()[3]
    bb = alfa.point(lambda v: 255 if v > 200 else 0).getbbox()
    if bb:
        x0, y0, x1, y1 = bb
        bok = max(x1 - x0, y1 - y0)
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        im = im.crop((int(cx - bok / 2), int(cy - bok / 2), int(cx + bok / 2), int(cy + bok / 2)))
    return dopelnij(im)


def na_kafel(im, od, do, wielkosc, biale):
    if biale:
        im = usun_biale_tlo(im)
    im = im.convert('RGBA')
    im = im.crop(im.split()[3].point(lambda v: 255 if v > 20 else 0).getbbox())
    kafel = gradient(ROBOCZY, od, do)
    s = ROBOCZY * wielkosc / max(im.size)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    # miekki cien pod rysunkiem, zeby nie "plywal"
    cien = Image.new('RGBA', kafel.size, (0, 0, 0, 0))
    a = Image.new('L', kafel.size, 0)
    a.paste(im.split()[3], ((ROBOCZY - im.width) // 2, (ROBOCZY - im.height) // 2 + 8))
    cien.putalpha(a.filter(ImageFilter.GaussianBlur(14)).point(lambda v: v * 0.45))
    kafel.alpha_composite(cien)
    kafel.alpha_composite(im, ((ROBOCZY - im.width) // 2, (ROBOCZY - im.height) // 2))
    return kafel


def main():
    for src in sorted(glob.glob(os.path.join(HIRES, '*-icon.png'))):
        n = os.path.basename(src)
        if not os.path.exists(os.path.join(IMG, n)):
            continue
        im = Image.open(src)
        if n in KAFEL:
            wynik, tryb = na_kafel(im, *KAFEL[n]), 'nowy kafel'
        elif n in PODKLAD:
            wynik = Image.new('RGBA', im.size, PODKLAD[n] + (255,))
            wynik.alpha_composite(im.convert('RGBA'))
            tryb = 'podklad'
        elif n in RAMKA:
            wynik, tryb = kadr_bez_ramki(im), 'bez ramki'
        elif im.mode in ('RGBA', 'LA', 'P') and im.convert('RGBA').getextrema()[3][0] < 250:
            wynik, tryb = kadr_alfa(im), 'kadr + rogi'
        else:
            wynik, tryb = im.convert('RGBA'), 'bez zmian'
        wynik = wynik.convert('RGB').resize((ROZMIAR, ROZMIAR), Image.LANCZOS)
        cel = os.path.join(IMG, n)
        wynik.save(cel, optimize=True)
        print('%-28s %-12s %3d KB' % (n, tryb, os.path.getsize(cel) // 1024))


if __name__ == '__main__':
    main()
