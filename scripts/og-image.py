"""Buduje grafike podgladu linku (Open Graph, 1200x630) w wersji z nazwiskiem.

Oficjalne og-image-1200x630.png z brand kitu ma tylko logo, nazwe studia i
adres. Na stronie autorstwo jest podpisane (stopka, sekcja "O mnie"), wiec
podglad linku tez je niesie. Poza dodatkowym wierszem grafika jest zbudowana
tak samo jak w brand kicie: tym samym kodem, paleta i typografia.

Od wersji 2 brand kitu (10.11.2026) obok napisu stoi kafel ze znakiem, a nie
karta z drugim napisem "Beagle" i ikona Google Play.

Uruchom:  python scripts/og-image.py
"""
import importlib.util
import os
import sys

from PIL import ImageDraw

TU = os.path.dirname(os.path.abspath(__file__))
BRANDKIT = os.path.normpath(os.path.join(TU, "..", "..", "BeagleAppsStudio-BrandKit"))
CEL = os.path.join(TU, "..", "img", "og-beagleapps.png")

AUTOR = "Marcin Chudaszek"
W, H = 1200, 630
KAFEL_W = 330
CX, CY = 600, 315
TYTUL_PX = 112
ODSTEP = 70

sys.path.insert(0, BRANDKIT)
spec = importlib.util.spec_from_file_location("brandkit", os.path.join(BRANDKIT, "_generator.py"))
bk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bk)      # main() jest pod if __name__, wiec sie nie odpali

kafel = bk.fit(bk.build_head(), w=KAFEL_W)

plotno = bk.gradient(W, H)
plotno = bk.glow(plotno, CX, CY, 340)

f_tytul = bk.font(bk.F_BOLD, TYTUL_PX)
f_pod = bk.font(bk.F_REG, int(TYTUL_PX * 0.50))
f_autor = bk.font(bk.F_REG, int(TYTUL_PX * 0.38))
f_url = bk.font(bk.F_SEMI, int(TYTUL_PX * 0.40))

d = ImageDraw.Draw(plotno)
sz_tekstu = max(d.textlength(bk.NAME, f_tytul), d.textlength(bk.TAGLINE, f_pod),
                d.textlength(AUTOR, f_autor), d.textlength(bk.URL, f_url))

razem = kafel.width + ODSTEP + sz_tekstu
x = int(CX - razem / 2)
plotno.alpha_composite(kafel, (x, int(CY - kafel.height / 2)))
tx = int(x + kafel.width + ODSTEP)

# 1.34 * rozmiar = pelna interlinia Segoe UI; ponizej tego ogonek "g" w slowie
# Beagle wchodzi na "Apps Studio"
wiersze = [
    (bk.NAME, f_tytul, bk.WHITE, TYTUL_PX * 1.34),
    (bk.TAGLINE, f_pod, bk.BLUE_L, TYTUL_PX * 0.72),
    (AUTOR, f_autor, (168, 198, 240), TYTUL_PX * 0.62),
    (bk.URL, f_url, (110, 175, 255), 0),
]
ty = CY - sum(w[3] for w in wiersze) / 2 - TYTUL_PX * 0.12
for tekst, fnt, kolor, dalej in wiersze:
    d.text((tx, ty), tekst, font=fnt, fill=kolor)
    ty += dalej

plotno.convert("RGB").save(CEL, "PNG", optimize=True)
print("%s  %dx%d  %d KB" % (os.path.basename(CEL), W, H,
                            os.path.getsize(CEL) // 1024))
