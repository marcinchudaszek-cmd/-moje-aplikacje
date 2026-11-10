"""Buduje poziome logo do navbara i stopki: sam znak (przezroczyste tlo)
plus napis "Beagle / Apps Studio" w wersji na ciemne tlo.

Zrodlo: BeagleAppsStudio-BrandKit (_generator.py + znak_hq.py). Od wersji 2
(10.11.2026) znak jest odtwarzany ostro w wysokiej rozdzielczosci, wiec tu
juz nie wycinamy go recznie z pliku zrodlowego.

Uruchom:  python scripts/logo-navbar.py
"""
import importlib.util
import os
import sys

from PIL import Image, ImageDraw

TU = os.path.dirname(os.path.abspath(__file__))
BRANDKIT = os.path.normpath(os.path.join(TU, "..", "..", "BeagleAppsStudio-BrandKit"))
CEL = os.path.join(TU, "..", "img", "logo-navbar.png")
ZNAK = os.path.join(TU, "..", "img", "znak-beagle.png")

WYSOKOSC = 152          # 4x wysokosci w navbarze (38 px)
ODSTEP = 0.16           # odstep znak-napis, jako ulamek wysokosci znaku

sys.path.insert(0, BRANDKIT)
spec = importlib.util.spec_from_file_location("brandkit", os.path.join(BRANDKIT, "_generator.py"))
bk = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bk)      # main() jest pod if __name__, wiec sie nie odpali

# --- znak: kafel z glowa beagle'a (jak favikona). Sama granatowa glowa
# na ciemnym pasku strony (#0b1120) byla prawie niewidoczna. ---
znak = bk.build_head(S=WYSOKOSC * 4, wielkosc=0.80, promien=0.24).resize(
    (WYSOKOSC, WYSOKOSC), Image.LANCZOS)

# --- napisy w wersji na ciemne tlo (paleta z BRAND.md) ---
tytul_px = int(WYSOKOSC * 0.46)
f_t = bk.font(bk.F_BOLD, tytul_px)
f_s = bk.font(bk.F_REG, int(tytul_px * 0.52))

pomiar = ImageDraw.Draw(Image.new("RGBA", (1, 1)))
sz_tekstu = int(max(pomiar.textlength(bk.NAME, f_t),
                    pomiar.textlength(bk.TAGLINE, f_s))) + 4
odstep = int(znak.width * ODSTEP)

plotno = Image.new("RGBA", (znak.width + odstep + sz_tekstu, WYSOKOSC), (0, 0, 0, 0))
plotno.alpha_composite(znak, (0, (WYSOKOSC - znak.height) // 2))

d = ImageDraw.Draw(plotno)
tx = znak.width + odstep
blok = tytul_px * 1.34 + tytul_px * 0.62
ty = (WYSOKOSC - blok) / 2
d.text((tx, ty), bk.NAME, font=f_t, fill=bk.WHITE)
d.text((tx, ty + tytul_px * 1.30), bk.TAGLINE, font=f_s, fill=bk.BLUE_L)

plotno = plotno.crop(plotno.split()[3].getbbox())
plotno.save(CEL, "PNG", optimize=True)
print("%s  %dx%d  %d KB" % (os.path.basename(CEL), plotno.width, plotno.height,
                            os.path.getsize(CEL) // 1024))

# --- sam znak, bez napisu: do stopki (wyswietlany na 32 px -> 4x zapasu) ---
maly = bk.fit(znak, h=128)
maly.save(ZNAK, "PNG", optimize=True)
print("%s  %dx%d  %d KB" % (os.path.basename(ZNAK), maly.width, maly.height,
                            os.path.getsize(ZNAK) // 1024))
